'use strict';
// Servidor autoritativo: salas, sessões, validação, IA de Red/Blue, reconexão. Sem dependências (HTTP + WebSocket nativo).
const http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto');
const E=require('./engine.js');
const PORT=process.env.PORT||3000,GUID='258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
const GRACE_BATTLE=+process.env.GRACE_MS||90000,GRACE_LOBBY=30000;
const rooms=new Map(),toks=new Map(),FILES={'/':'index.html','/index.html':'index.html','/engine.js':'engine.js'};
const srv=http.createServer((q,r)=>{
 const u=q.url.split('?')[0];if(u=='/health'){r.writeHead(200);return r.end('ok')}
 const f=FILES[u];if(!f){r.writeHead(404);return r.end('404')}
 r.writeHead(200,{'Content-Type':f.endsWith('.js')?'text/javascript; charset=utf-8':'text/html; charset=utf-8'});r.end(fs.readFileSync(path.join(__dirname,f)))});
function frame(str){const b=Buffer.from(str),l=b.length;let h;if(l<126)h=Buffer.from([0x81,l]);else if(l<65536)h=Buffer.from([0x81,126,l>>8,l&255]);else{h=Buffer.alloc(10);h[0]=0x81;h[1]=127;h.writeBigUInt64BE(BigInt(l),2)}return Buffer.concat([h,b])}
const send=(ws,m)=>{if(ws&&ws.s&&ws.s.writable&&!ws.s.destroyed)ws.s.write(frame(JSON.stringify(m)))};
function parse(ws,chunk){
 ws.buf=Buffer.concat([ws.buf,chunk]);
 for(;;){const b=ws.buf;if(b.length<2)return;let l=b[1]&127,o=2;
  if(l==126){if(b.length<4)return;l=b.readUInt16BE(2);o=4}else if(l==127){if(b.length<10)return;l=Number(b.readBigUInt64BE(2));o=10}
  const mk=b[1]&128;if(b.length<o+(mk?4:0)+l)return;
  const k=mk?b.subarray(o,o+4):null;o+=mk?4:0;const d=Buffer.from(b.subarray(o,o+l));if(k)for(let i=0;i<l;i++)d[i]^=k[i%4];
  ws.buf=b.subarray(o+l);const op=b[0]&15;
  if(op==8){ws.s.end();return}
  if(op==9)ws.s.write(Buffer.concat([Buffer.from([0x8a,Math.min(l,125)]),d.subarray(0,125)]));
  else if(op==1){let m=null;try{m=JSON.parse(d.toString())}catch(e){}if(m)onMsg(ws,m).catch(e=>console.error(e))}}}
srv.on('upgrade',(req,s)=>{
 const k=req.headers['sec-websocket-key'];if(!k)return s.destroy();
 s.write('HTTP/1.1 101 Switching Protocols\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Accept: '+crypto.createHash('sha1').update(k+GUID).digest('base64')+'\r\n\r\n');
 const ws={s,buf:Buffer.alloc(0),tok:null};s.on('data',c=>parse(ws,c));s.on('close',()=>drop(ws));s.on('error',()=>{})});
const mkCode=()=>{let c;do{c=Array.from({length:5},()=>'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[crypto.randomInt(32)]).join('')}while(rooms.has(c));return c};
async function newTeam(){try{return await E.liveTeam()}catch(e){return E.localTeam()}}
const mvOfT=t=>{const o={};t.forEach(x=>x.mv.forEach(n=>o[n]=E.MV[n]));return o};
const roomMsg=(r,i)=>({t:'room',code:r.code,me:i,st:r.st,players:r.pl.map(p=>({name:p.name,ready:p.ready,on:p.on,team:p.team.map(o=>E.build(o,0))})),M:Object.assign({},...r.pl.map(p=>mvOfT(p.team)))});
const sync=r=>r.pl.forEach((p,i)=>p.on&&send(p.ws,roomMsg(r,i)));
const bcast=(r,m)=>r.pl.forEach(p=>send(p.ws,m));
function gone(r,i){
 const p=r.pl[i];if(!p||r.dead)return;clearTimeout(p.to);toks.delete(p.tok);
 if(r.st=='lobby'){if(i==0){bcast(r,{t:'closed',m:'O anfitrião saiu: sala encerrada.'});r.pl.forEach(q=>toks.delete(q.tok));rooms.delete(r.code);r.dead=1}else{r.pl.splice(i,1);sync(r)}}
 else if(r.st=='battle'){r.st='ended';bcast(r,{t:'end',m:`${p.name} abandonou a partida (sem retorno em ${GRACE_BATTLE/1000}s).`});r.endAt=Date.now()}}
function drop(ws){const x=toks.get(ws.tok);if(!x)return;const r=x.r,i=r.pl.indexOf(x.p);if(i<0||x.p.ws!==ws)return;
 x.p.on=false;x.p.ws=null;sync(r);x.p.to=setTimeout(()=>gone(r,r.pl.indexOf(x.p)),r.st=='battle'?GRACE_BATTLE:GRACE_LOBBY)}
function attach(ws,r,p){p.ws=ws;p.on=true;clearTimeout(p.to);ws.tok=p.tok;send(ws,{t:'tok',tok:p.tok});sync(r)}
async function onMsg(ws,m){
 const err=s=>send(ws,{t:'err',m:s}),name=String(m.name||'Jogador').replace(/[<>&]/g,'').slice(0,16)||'Jogador';
 if(m.t=='ping')return send(ws,{t:'pong'});
 if(m.t=='hello'){const x=toks.get(m.tok);send(ws,{t:'hi'});if(x&&!x.r.dead&&x.r.st!='ended'||x&&x.r.st=='ended'){const{r,p}=x;if(p.on&&p.ws&&p.ws!==ws){try{p.ws.s.end()}catch(e){}}attach(ws,r,p);
  if(r.st=='battle'||r.st=='ended'){send(ws,{t:'init',M:r.eng.mvAll()});send(ws,{t:'ev',evs:[],st:r.eng.pub()})}}return}
 if(m.t=='create'){if(toks.has(ws.tok))return err('Você já está em uma sala.');
  const r={code:mkCode(),st:'lobby',pl:[],eng:null,born:Date.now()};rooms.set(r.code,r);
  const p={name,tok:crypto.randomBytes(16).toString('hex'),ready:false,on:true,team:await newTeam()};r.pl.push(p);toks.set(p.tok,{r,p});return attach(ws,r,p)}
 if(m.t=='join'){if(toks.has(ws.tok))return err('Você já está em uma sala.');
  const r=rooms.get(String(m.code||'').toUpperCase().trim());if(!r||r.dead)return err('Sala não encontrada.');
  if(r.st!='lobby')return err('A partida desta sala já começou.');if(r.pl.length>=2)return err('Sala cheia.');
  const p={name,tok:crypto.randomBytes(16).toString('hex'),ready:false,on:true,team:await newTeam()};
  if(r.pl.length>=2||r.st!='lobby')return err('Sala cheia.');
  r.pl.push(p);toks.set(p.tok,{r,p});return attach(ws,r,p)}
 const x=toks.get(ws.tok);if(!x)return err('Entre ou crie uma sala primeiro.');
 const{r,p}=x,i=r.pl.indexOf(p);
 if(m.t=='leave'){gone(r,i);ws.tok=null;return send(ws,{t:'closed',m:'Você saiu da sala.'})}
 if(m.t=='reroll'){if(r.st!='lobby'||p.ready)return err('Equipe congelada.');p.team=await newTeam();return sync(r)}
 if(m.t=='ready'){if(r.st!='lobby')return;p.ready=!!m.v;return sync(r)}
 if(m.t=='start'){if(i!=0)return err('Só o anfitrião pode iniciar.');if(r.st!='lobby')return err('Partida já iniciada.');
  if(r.pl.length<2||!r.pl.every(q=>q.ready&&q.on))return err('Os dois jogadores precisam estar conectados e prontos.');
  r.st='battle';r.eng=E.Eng({send:(evs,st)=>{bcast(r,{t:'ev',evs,st});if(st.end){r.st='ended';r.endAt=Date.now()}}});
  r.eng.init({kind:'o',teams:r.pl.map(q=>q.team),names:r.pl.map(q=>q.name)});sync(r);bcast(r,{t:'init',M:r.eng.mvAll()});return r.eng.start()}
 if(r.st!='battle')return err('A batalha não está em andamento.');
 if(m.t=='act'){const e=r.eng.act(i,m.a,m.turn);if(e)err(e)}
 else if(m.t=='rep'){const e=r.eng.rep(i,m.i);if(e)err(e)}}
setInterval(()=>{for(const[c,r]of rooms)if(r.dead||(r.endAt&&Date.now()-r.endAt>6e5)||Date.now()-r.born>108e5){r.pl.forEach(p=>toks.delete(p.tok));rooms.delete(c)}},60000).unref();
process.on('uncaughtException',e=>console.error('uncaught',e));
srv.listen(PORT,()=>console.log('Servidor em http://localhost:'+PORT));
module.exports={srv};
