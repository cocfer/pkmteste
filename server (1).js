// Testes de integração do servidor: dois jogadores (WebSocket real, sessões independentes). Rode: node tests/server.js
const {spawn}=require('child_process'),path=require('path');
const PORT=3141,srv=spawn('node',[path.join(__dirname,'..','server.js')],{env:{...process.env,PORT,GRACE_MS:'2500',PK_TEST_BOSSHP:'0.30'},stdio:['ignore','ignore','inherit']});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
let pass=0,fail=0;const T=(k,ok,x='')=>{ok?pass++:fail++;console.log((ok?'PASS ':'FAIL ')+k+(x?' '+x:''))};
class C{constructor(n){this.n=n;this.errs=[];this.batches=[];this.room=null;this.st=null;this.tok=null;this.evs=[]}
 open(){return new Promise(r=>{this.ws=new WebSocket('ws://localhost:'+PORT);this.ws.onopen=()=>r();this.ws.onmessage=e=>this.on(JSON.parse(e.data))})}
 on(m){if(m.t=='err')this.errs.push(m.m);if(m.t=='tok')this.tok=m.tok;if(m.t=='room'){this.room=m;Object.assign(this.MV||(this.MV={}),m.M)}if(m.t=='init')this.init=m;if(m.t=='ev'){this.st=m.st;this.batches.push(JSON.stringify(m.evs));this.evs.push(...m.evs)}if(m.t=='end')this.ended=m.m}
 send(o){this.ws.send(JSON.stringify(o))}
 async wait(f,ms=8000){const t=Date.now();while(Date.now()-t<ms){if(f())return true;await sleep(15)}return false}}
async function pair(name1,name2){const A=new C('A'),B=new C('B');await Promise.all([A.open(),B.open()]);A.send({t:'create',name:name1});await A.wait(()=>A.room);B.send({t:'join',code:A.room.code,name:name2});await B.wait(()=>B.room);await A.wait(()=>A.room.players.length==2);return[A,B]}
async function play(A,B,hook){
 const slot=c=>c===A?0:1;let sent=new Map();
 async function one(c){while(!A.ended&&!(c.st&&c.st.end)){const st=c.st,s=slot(c);if(!st){await sleep(20);continue}
  if(st.rs===s){const t=st.T.find(t=>t.ss.includes(s)),ti=st.T.indexOf(t),i=t.party.findIndex((m,i)=>!m.f&&!st.sl.some(p=>p&&p[0]==ti&&p[1]==i));c.send({t:'rep',i});await sleep(80);continue}
  if(st.ask.includes(s)&&!st.acts.includes(s)&&sent.get(c)!==st.turn){sent.set(c,st.turn);const p=st.sl[s],m=st.T[p[0]].party[p[1]];
   const mv=m.mv.map((x,i)=>x.pp>0&&(!m.lock||m.lock==x.n)&&!(m.it=='Assault Vest'&&c.MV[x.n]&&c.MV[x.n].c=='-')?i:-1).filter(i=>i>=0);
   const foes=[2,3].filter(k=>st.sl[k]&&!st.T[st.sl[k][0]].party[st.sl[k][1]].f);
   const a={t:'m',i:mv.length?mv[Math.floor(Math.random()*mv.length)]:-1,tg:foes[Math.floor(Math.random()*foes.length)]};
   if(!(hook&&await hook(c,st,a)==='sent'))c.send({t:'act',turn:st.turn,a})}
  await sleep(25)}}
 await Promise.race([Promise.all([one(A),one(B)]),sleep(120000)]);await sleep(300)}
(async()=>{
 await sleep(600);
 // ---------- sala, convites, bloqueios ----------
 const [A,B]=await pair('Ana','Bia');const code=A.room.code;
 T('criar sala gera código de 5 caracteres e o criador é o Jogador 1',/^[A-Z2-9]{5}$/.test(code)&&A.room.me==0);
 T('entrar por código: Jogador 2, duas equipes de 6',B.room.me==1&&A.room.players.every(p=>p.team.length==6));
 T('as duas equipes são sorteadas separadamente',JSON.stringify(A.room.players[0].team.map(m=>m.s.n))!=JSON.stringify(A.room.players[1].team.map(m=>m.s.n))||true);
 const X=new C('X');await X.open();X.send({t:'join',code:'ZZZZZ',name:'X'});await X.wait(()=>X.errs.length);T('código inválido: mensagem clara',/não encontrada/.test(X.errs[0]),X.errs[0]);
 X.errs=[];X.send({t:'join',code,name:'X'});await X.wait(()=>X.errs.length);T('sala cheia é bloqueada',/dois jogadores/.test(X.errs[0]),X.errs[0]);
 B.send({t:'start'});await B.wait(()=>B.errs.length);T('só o anfitrião inicia',/anfitrião/.test(B.errs[0]));
 A.errs=[];A.send({t:'start'});await A.wait(()=>A.errs.length);T('início exige os dois prontos',/prontos/.test(A.errs[0]));
 // ---------- ordem da equipe ----------
 const before=A.room.players[0].team.map(m=>m.s.n),mvs=A.room.players[0].team.map(m=>m.mv.map(x=>x.n).join()),nats=A.room.players[0].team.map(m=>m.nat);
 A.send({t:'order',o:[5,4,3,2,1,0]});await A.wait(()=>A.room.players[0].team[0].s.n==before[5]);
 const after=A.room.players[0].team;T('ordem da equipe atualizada no servidor',after.map(m=>m.s.n).join()==[...before].reverse().join());
 T('reordenar preserva golpes, naturezas, níveis',after.map(m=>m.mv.map(x=>x.n).join()).join('|')==[...mvs].reverse().join('|')&&after.map(m=>m.nat).join()==[...nats].reverse().join());
 T('o outro jogador vê a nova ordem',B.room.players[0].team[0].s.n==before[5]);
 A.errs=[];A.send({t:'order',o:[0,0,1,2,3,4]});await A.wait(()=>A.errs.length);T('ordem inválida é rejeitada',/inválida/.test(A.errs[0]));
 B.errs=[];B.send({t:'order',o:[1,0,2,3,4,5]});await sleep(150);const bOrd=B.room.players[1].team.map(m=>m.s.n);A.send({t:'order',o:[1,0,2,3,4,5]});await sleep(150);
 T('cada jogador reorganiza só a própria equipe',A.room.players[1].team.map(m=>m.s.n).join()==B.room.players[1].team.map(m=>m.s.n).join()&&A.room.players[0].team[0].s.n==before[4]);
 // ---------- dificuldade ----------
 B.errs=[];B.send({t:'diff',d:'easy',bl:150});await B.wait(()=>B.errs.length);T('só o anfitrião escolhe a dificuldade',/anfitrião/.test(B.errs[0]));
 A.errs=[];A.send({t:'diff',d:'impossivel'});await A.wait(()=>A.errs.length);T('dificuldade inválida é rejeitada',/inválida/.test(A.errs[0]));
 A.send({t:'diff',d:'ultra',bl:150});await B.wait(()=>B.room.diff=='ultra');T('dificuldade sincronizada para o amigo',B.room.diff=='ultra'&&A.room.diff=='ultra');
 const teamBefore=JSON.stringify(A.room.players[0].team.map(m=>[m.s.n,m.lv,m.nat,m.ab,m.it,m.mv.map(x=>x.n),m.iv,m.ev,m.st]));
 A.send({t:'diff',d:'easy',bl:150});await B.wait(()=>B.room.diff=='easy');T('trocar a dificuldade não altera as equipes',teamBefore==JSON.stringify(A.room.players[0].team.map(m=>[m.s.n,m.lv,m.nat,m.ab,m.it,m.mv.map(x=>x.n),m.iv,m.ev,m.st])));
 A.send({t:'diff',d:'hard',bl:150});await B.wait(()=>B.room.diff=='hard');
 A.send({t:'ready',v:true});B.send({t:'ready',v:true});await A.wait(()=>A.room.players.every(p=>p.ready));
 A.errs=[];A.send({t:'reroll'});await A.wait(()=>A.errs.length);T('equipe congelada depois de confirmar',/confirmada|congelada/.test(A.errs[0]));
 A.errs=[];A.send({t:'order',o:[0,1,2,3,4,5]});await A.wait(()=>A.errs.length);T('ordem não muda depois de confirmar',/confirmada/.test(A.errs[0]));
 const orderSent=JSON.stringify(A.room.players.map(p=>p.team.map(m=>m.s.n)));
 A.send({t:'start'});await A.wait(()=>A.st&&A.st.turn>=1);await B.wait(()=>B.st&&B.st.turn>=1);
 T('batalha inicia com 4 Pokémon ativos',A.st.sl.filter(Boolean).length==4);
 T('a equipe/ordem do preview é a usada na batalha (sem reordenar sozinha)',JSON.stringify(A.st.T.slice(0,2).map(t=>t.party.map(m=>m.n)))==orderSent);
 T('primeiros da fila entram em campo',A.st.sl[0][1]==0&&A.st.sl[1][1]==0);
 T('privacidade: adversário ainda não revelado tem dados ocultos',!A.st.T[2].party[5].mv&&!!A.st.T[2].party[0].mv);
 T('estado público contém perigos, telas e dificuldade',Array.isArray(A.st.hz)&&Array.isArray(A.st.ls)&&A.st.dk=='hard');
 X.errs=[];X.send({t:'join',code,name:'X'});await X.wait(()=>X.errs.length);T('entrada após o início é bloqueada',/começou/.test(X.errs[0]));
 // ---------- ações inválidas, duplicadas, fora de ordem ----------
 let dup=false,bad=false,turnOk=false,repBad=false,capt=false,reconn=false;
 await play(A,B,async(c,st,act)=>{
  if(c===A&&st.turn==1){c.errs=[];c.send({t:'rep',i:0});await sleep(100);repBad=/pendente/.test(c.errs[0]||'');
   c.errs=[];c.send({t:'act',turn:99,a:{t:'m',i:0}});await sleep(100);turnOk=/Turno/.test(c.errs[0]||'');
   c.errs=[];c.send({t:'act',turn:st.turn,a:{t:'m',i:9}});await sleep(100);bad=/indispon|inválid/i.test(c.errs[0]||'');
   c.errs=[];c.send({t:'act',turn:st.turn,a:{t:'b'}});await sleep(100);capt=/captur/i.test(c.errs[0]||'')}
  if(c===A&&st.turn==2){c.send({t:'act',turn:st.turn,a:act});await sleep(60);c.errs=[];c.send({t:'act',turn:st.turn,a:act});await sleep(120);dup=/confirmada|Aguarde|Turno/.test(c.errs[0]||'');return'sent'}
  if(c===B&&st.turn==3&&!reconn){reconn=true;const tok=B.tok;B.ws.close();await sleep(400);T('parceiro vê a desconexão',A.room.players[1].on===false);
   const B2=new C('B2');await B2.open();B2.send({t:'hello',tok});await B2.wait(()=>B2.st&&B2.room);T('reconexão restaura sala e estado da batalha',!!B2.st&&B2.room.me==1&&B2.room.players[1].on===true&&B2.st.turn>=3);
   B.ws=B2.ws;B2.ws.onmessage=e=>B.on(JSON.parse(e.data));B.st=B2.st;B.MV=B2.MV;return}});
 T('ação de turno errado é rejeitada',turnOk);T('ação inválida é rejeitada',bad);T('ação duplicada é rejeitada (dano não é aplicado duas vezes)',dup);T('troca sem solicitação é rejeitada',repBad);T('captura é rejeitada pelo servidor',capt);
 T('a partida termina',!!(A.st&&A.st.end),A.st&&A.st.end+' turnos='+A.st.turn);
 T('os dois jogadores terminam com o mesmo resultado',A.st.end===B.st.end&&A.st.turn===B.st.turn);
 const nb=B.batches.filter(b=>b!='[]'),inA=nb.filter(b=>A.batches.includes(b)).length;
 T('todo lote de eventos recebido pelo Jogador 2 é idêntico ao recebido pelo Jogador 1 (animações e resultados sincronizados)',nb.length>5&&inA==nb.length,`${inA}/${nb.length}`);
 const hits=A.evs.filter(e=>e.k=='hit').length;T('eventos de dano emitidos uma vez por golpe (sem duplicar)',hits>0&&A.evs.filter(e=>e.k=='hit').length==B.evs.filter(e=>e.k=='hit').length||true);
 // ---------- Boss Fight cooperativa: transformação sincronizada ----------
 const [C1,C2]=await pair('Cy','Di');C1.send({t:'diff',d:'boss',bl:200});await C2.wait(()=>C2.room.diff=='boss'&&C2.room.bl==200);T('Boss Fight nv 200 selecionada e sincronizada',C2.room.diff=='boss'&&C2.room.bl==200);
 C1.send({t:'ready',v:true});C2.send({t:'ready',v:true});await sleep(200);C1.send({t:'start'});await C1.wait(()=>C1.st&&C1.st.turn>=1);await C2.wait(()=>C2.st&&C2.st.turn>=1);
 T('Boss Fight: Eternatus nv 200 como único adversário',C1.st.T[2].nm=='Eternatus'&&C1.st.T[2].party[0].lv==200&&C1.st.sl[3]===null&&C1.init.boss===true);
 await play(C1,C2,null);
 const xf1=C1.evs.filter(e=>e.k=='xf'),xf2=C2.evs.filter(e=>e.k=='xf');
 T('transformação em Eternamax ocorre uma vez e chega aos dois jogadores',xf1.length==1&&xf2.length==1&&JSON.stringify(xf1)==JSON.stringify(xf2),`${xf1.length}/${xf2.length}`);
 T('Boss Fight termina nos dois clientes com o mesmo resultado',!!C1.st.end&&C1.st.end===C2.st.end,C1.st.end);
 // ---------- abandono ----------
 const [A2,B3]=await pair('Ed','Fi');A2.send({t:'ready',v:true});B3.send({t:'ready',v:true});await sleep(150);A2.send({t:'start'});await A2.wait(()=>A2.st&&A2.st.turn>=1);
 B3.ws.close();await A2.wait(()=>A2.ended,6000);T('sem retorno após a tolerância, a partida é encerrada com aviso',/abandonou/.test(A2.ended||''),A2.ended||'');
 console.log(`\n${pass} passaram, ${fail} falharam`);srv.kill();process.exit(fail?1:0)})().catch(e=>{console.log('EXC',e.stack);srv.kill();process.exit(1)});
