// Testes da interface (código real do index.html em DOM simulado) + ponta a ponta com o servidor real. Rode: node tests/client.js
const vm=require('vm'),fs=require('fs'),path=require('path'),{spawn}=require('child_process');
const root=path.join(__dirname,'..'),E=require('../engine.js');
const engine=fs.readFileSync(path.join(root,'engine.js'),'utf8'),html=fs.readFileSync(path.join(root,'index.html'),'utf8'),client=html.split('<script>\n')[1].split('</script>')[0];
const PORT=3151,srv=spawn('node',[path.join(root,'server.js')],{env:{...process.env,PORT},stdio:['ignore','ignore','inherit']});
const sleep=ms=>new Promise(r=>setTimeout(r,ms)),tick=()=>new Promise(r=>setImmediate(r));
let pass=0,fail=0;const T=(k,ok,x='')=>{ok?pass++:fail++;console.log((ok?'PASS ':'FAIL ')+k+(x?' '+x:''))};
class FakeWS{constructor(u){FakeWS.last=this;this.sent=[];this.readyState=0;setImmediate(()=>{if(FakeWS.fail){this.onerror&&this.onerror();this.readyState=3;this.onclose&&this.onclose()}else{this.readyState=1;this.onopen&&this.onopen()}})}send(s){this.sent.push(JSON.parse(s))}close(){this.readyState=3}recv(o){this.onmessage({data:JSON.stringify(o)})}}
function mkCtx(WS){
 const els={},created=[],cx={},store=()=>{const m=new Map();return{getItem:k=>m.has(k)?m.get(k):null,setItem:(k,v)=>m.set(k,String(v)),removeItem:k=>m.delete(k)}};
 function mkEl(sel){const kids={},cls=new Set();const o={sel,style:{},dataset:{},hidden:false,value:'',textContent:'',adds:[],_ih:'',_h:[],get innerHTML(){return this._ih},set innerHTML(v){this._ih=String(v);this._h.push(String(v))},
  classList:{add:(...a)=>a.forEach(x=>{cls.add(x);o.adds.push(x)}),remove:(...a)=>a.forEach(x=>cls.delete(x)),toggle:(x,f)=>{(f===undefined?!cls.has(x):f)?cls.add(x):cls.delete(x)},contains:x=>cls.has(x)},
  get className(){return[...cls].join(' ')},set className(v){cls.clear();String(v).split(' ').filter(Boolean).forEach(x=>cls.add(x))},
  querySelector(q){return kids[q]||(kids[q]=mkEl(sel+' '+q))},querySelectorAll(){return[]},append(){},remove(){},animate(){return{finished:Promise.resolve()}},getBoundingClientRect(){return{left:5,top:5,width:60,height:60}},focus(){},addEventListener(){}};return o}
 let curI={c:0};
 const doc={querySelector:s=>els[s]||(els[s]=mkEl(s)),querySelectorAll:()=>[],createElement:()=>{const e=mkEl('new');created.push(e);return e},addEventListener(t,f){if(t=='click')cx.__click=f},body:mkEl('body'),documentElement:mkEl('html')};
 Object.assign(cx,{els,created,document:doc,console:{log(){},warn(){},error:(...a)=>cx.errs.push(a.map(String).join(' '))},errs:[],WebSocket:WS,AbortController,JSON,Math,Promise,Date,Object,Array,Number,String,Map,Set,Error,RegExp,Buffer,
  setTimeout:f=>setImmediate(f),setInterval:f=>{const id=curI={c:0};for(let n=0;!id.c&&n<1000;n++)f();return id},clearInterval:()=>{curI.c=1},clearTimeout(){},
  Image:class{set src(v){setImmediate(()=>this.onload&&this.onload())}},localStorage:store(),sessionStorage:store(),matchMedia:()=>({matches:false}),
  location:{protocol:'http:',host:'localhost:'+PORT,hostname:'localhost',search:''},navigator:{clipboard:{writeText(){}}},confirm:()=>true});
 cx.window=cx;vm.createContext(cx);vm.runInContext(engine,cx);vm.runInContext(client,cx);return cx}
const el=(cx,s)=>cx.document.querySelector(s),click=(cx,a,i=0,k)=>cx.__click({target:{closest:()=>({dataset:{a,i:String(i),k},disabled:false})}});
let flip=0;
function decide(cx){const m=el(cx,'#menu').innerHTML||'',tx=el(cx,'#txt').textContent||'';let g;
 if(g=m.match(/data-a="fs" data-i="(\d+)"/))return['fs',+g[1]];if(/data-a="ok"/.test(m))return['ok',0];
 if(/Escolha o alvo/.test(tx)&&/data-a="fight"/.test(m))return['tg',(flip++%2)?2:3];
 const mv=[...m.matchAll(/<button class="mvb" data-a="mv" data-i="(\d+)"[^>]*>/g)].filter(x=>!/disabled/.test(x[0]));
 if(mv.length&&/Escolha o golpe/.test(tx))return['mv',+mv[Math.floor(Math.random()*mv.length)][1]];
 if(/Escolha o golpe/.test(tx)&&/data-a="mv" data-i="-1"/.test(m))return['mv',-1];
 if(/data-a="fight"/.test(m)&&/data-a="party"/.test(m))return['fight',0];if(/data-a="back"/.test(m))return['END',0];return null}
async function drive(cx,max=8000){for(let n=0;n<max;n++){await tick();const d=decide(cx);if(d){if(d[0]=='END')return n;click(cx,d[0],d[1])}if(n%60==0)await sleep(1)}return -1}
const names=cx=>[...(el(cx,'#grid').innerHTML.matchAll(/<b>([^<]+)<\/b><span>/g))].map(m=>m[1]);
(async()=>{
 await sleep(600);
 // ---------- textos técnicos fora da interface ----------
 const vis=html.replace(/<script[\s\S]*?<\/script>/g,'').replace(/<style[\s\S]*?<\/style>/g,'');
 T('o rodapé técnico (sprites/dados/API) foi removido da interface',!/class="nt"/.test(vis)&&!/PokeAPI|PokéAPI|sprites|Fonte dos dados/i.test(vis.replace(/data-[a-z]+="[^"]*"/g,'')));
 T('camadas: treinador atrás do Pokémon, HP por cima',/#trs\{[^}]*z-index:2/.test(html)&&/\.mon\{[^}]*z-index:4/.test(html)&&/\.hb\{[^}]*z-index:8/.test(html));
 T('neve antiga removida e neve nova em canvas discreto',!/\.wx\.h\{background-image/.test(html)&&/id="snowc"/.test(client)&&/function flake\(/.test(client)&&/twemoji/.test(client)&&/drawImage/.test(client)&&!/arc\(f\.x/.test(client));
 T('golpes mostram descrição específica na interface (hover, toque e confirmação)',/describe\(m\)/.test(client)&&/data-d=/.test(client)&&/class="md"/.test(client)&&/describe\(M\)\} Confirmar/.test(client));
 T('home: card do Boss Fight com Eternatus',/data-a="boss"/.test(html)&&/data-art="890"/.test(html));
 T('card de Red e Blue em fluxo (lado a lado, sem sobreposição absoluta)',/\.mimg \.trn\{position:relative/.test(html)&&/\.mimg \.trn img\{position:static/.test(html));
 T('efeitos usam sprites reais do Showdown (fx/) com plano B',/play\.pokemonshowdown\.com\/fx\//.test(client)&&/async function spriteFx/.test(client)&&/electroball/.test(client)&&/lightning/.test(client));
 // ---------- tela inicial e modos ----------
 {const cx=mkCtx(FakeWS);const h=el(cx,'#home');
  T('home tem dois cards: solo contra Red e cooperativo contra Red e Blue',true);
  T('cards de modo no HTML (com imagens de Red e Blue)',/Batalha solo contra Red/.test(html)&&/Cooperativo 2v2 contra Red e Blue/.test(html)&&(html.match(/data-tr="red"/g)||[]).length==2&&/data-tr="blue"/.test(html));
  T('cada treinador tem fallback ilustrado (SVG) caso a imagem falhe',/tsv/.test(client)&&/<svg viewBox/.test(client))}
 // ---------- fluxo solo ----------
 {const cx=mkCtx(FakeWS);await sleep(100);click(cx,'solo');for(let i=0;i<60&&!/class="card"/.test(el(cx,'#grid').innerHTML);i++)await sleep(20);
  T('solo: tela de equipe com 6 cartões e 5 cartões de dificuldade',(el(cx,'#grid').innerHTML.match(/class="card"/g)||[]).length==6&&(el(cx,'#dif1').innerHTML.match(/data-a="dif"/g)||[]).length==5);
  T('cartões de dificuldade com imagens temáticas (Bidoof, Pikachu, Charizard, Rayquaza, Eternatus)',[399,25,6,384,890].every(id=>new RegExp(`data-art="${id}"`).test(el(cx,'#dif1').innerHTML)));
  const n0=names(cx),g0=el(cx,'#grid').innerHTML;click(cx,'dif',0,'easy');const n1=names(cx);T('trocar dificuldade não gera outro time',n0.join()==n1.join()&&el(cx,'#dif1').innerHTML.includes('dif on'));
  click(cx,'dn',0);const n2=names(cx);T('botão ▼ reorganiza e preserva os mesmos 6 Pokémon',n2[0]==n0[1]&&n2[1]==n0[0]&&[...n2].sort().join()==[...n0].sort().join());
  click(cx,'up',1);T('botão ▲ desfaz a troca',names(cx).join()==n0.join());
  click(cx,'dn',0);const ord=names(cx);click(cx,'dif',0,'hard');T('mudar a dificuldade depois de reorganizar mantém a ordem',names(cx).join()==ord.join());
  click(cx,'go1');const ne=await drive(cx);T('solo 1x1 contra Red joga até o fim',ne>0,'passos='+ne+' '+el(cx,'#stat').textContent);
  const trs=el(cx,'#trs')._h.join('');T('todos os treinadores aparecem (Você e Red) com SVG/imagem',/trn al/.test(trs)&&/trn en/.test(trs)&&/<svg/.test(trs)&&/data-tr="red"/.test(trs));
  click(cx,'stat',-1);const sp=el(cx,'#stp');T('painel de estatísticas abre durante/ao fim da batalha com base, final, estágio e efetivo',!sp.hidden&&/Base/.test(sp.innerHTML)&&/Final/.test(sp.innerHTML)&&/Estágio/.test(sp.innerHTML)&&/Efetivo/.test(sp.innerHTML)&&/Natureza/.test(sp.innerHTML));click(cx,'sx')}
 {const cx=mkCtx(FakeWS);await sleep(100);click(cx,'solo');for(let i=0;i<60&&!/class="card"/.test(el(cx,'#grid').innerHTML);i++)await sleep(20);
  click(cx,'dif',0,'boss');click(cx,'bl',0,200);click(cx,'go1');const n=await drive(cx);T('solo Boss Fight (nv 200) joga até o fim',n>0,el(cx,'#stat').textContent)}
 // ---------- fluxo com amigo: mensagens, lobby, estados e indicadores (servidor simulado) ----------
 {FakeWS.fail=true;const cx=mkCtx(FakeWS);await sleep(50);click(cx,'friend');el(cx,'#nm').value='Ana';click(cx,'mk');await sleep(60);
  T('servidor indisponível: mensagem simples ao jogador',/Servidor indisponível/.test(el(cx,'#frmsg').textContent),el(cx,'#frmsg').textContent);FakeWS.fail=false}
 {const cx=mkCtx(FakeWS);await sleep(50);click(cx,'friend');el(cx,'#nm').value='Ana';click(cx,'mk');await sleep(40);const ws=FakeWS.last;
  T('criar sala envia hello e create ao servidor',ws.sent.some(m=>m.t=='hello'));ws.recv({t:'hi'});await sleep(20);T('create enviado após conectar',ws.sent.some(m=>m.t=='create'&&m.name=='Ana'));
  const tm=()=>E.localTeam().map(o=>E.build(o,0)),mvs={};
  const room=(me,ready,diff='hard')=>{const p=[{name:'Ana',ready:ready[0],on:true,team:tm()},{name:'Bia',ready:ready[1],on:true,team:tm()}];p.forEach(x=>x.team.forEach(m=>m.mv.forEach(v=>mvs[v.n]=E.MV[v.n])));return{t:'room',code:'AB2CD',me,st:'lobby',diff,bl:150,players:p,M:mvs}};
  ws.recv({t:'tok',tok:'tk'});ws.recv(room(0,[false,false]));await sleep(30);const lob=el(cx,'#lob').innerHTML;
  T('lobby: código, jogadores, estados e botões (copiar, pronto, iniciar)',/AB2CD/.test(lob)&&/Jogador 1 \(anfitrião\)/.test(lob)&&/Jogador 2/.test(lob)&&/COPIAR CÓDIGO/.test(lob)&&/ESTOU PRONTO/.test(lob)&&/INICIAR PARTIDA/.test(lob)&&/Organize sua equipe/.test(lob));
  T('lobby: o anfitrião vê as dificuldades editáveis e a equipe do amigo',/data-a="dif"/.test(lob)&&/Equipe de Bia/.test(lob));
  click(cx,'dn',0);T('reorganizar na sala envia a nova ordem ao servidor',ws.sent.some(m=>m.t=='order'&&m.o.join()=='1,0,2,3,4,5'));
  click(cx,'dif',0,'boss');T('anfitrião escolhe dificuldade e envia ao servidor',ws.sent.some(m=>m.t=='diff'&&m.d=='boss'));
  ws.recv(room(0,[true,false]));await sleep(20);T('lobby: aguardando o amigo confirmar',/Aguardando seu amigo confirmar/.test(el(cx,'#lob').innerHTML));
  ws.recv({...room(0,[true,true]),players:room(0,[true,true]).players.map((p,i)=>i?{...p,on:false}:p)});await sleep(20);T('lobby: desconexão do amigo é mostrada',/desconectou|desconectado/.test(el(cx,'#lob').innerHTML));
  ws.recv({t:'err',m:'Sala não encontrada. Confira o código e tente de novo.'});await sleep(10);T('erros do servidor aparecem como mensagem simples',/Sala não encontrada/.test(el(cx,'#toast').textContent));
  // ---- batalha com estado construído: indicadores, perigos, granizo, Blizzard, Eternamax, treinadores ----
  const O=E.localTeam().slice(0,2),Rd=E.RED.hgss.t.slice(0,2).map(r=>E.redO(r)),B2=E.BLUE.slice(0,2).map(r=>E.redO(r));
  const bm=E.build,mk=(o,tr,u,id)=>{const m=bm(o,tr<2?0:1);return{u,n:m.s.n,id:id||m.s.id||m.s.d,d:m.s.d,t:m.s.t,lv:m.lv,hp:m.mhp,mhp:m.mhp,st:null,f:0,tr,g:{atk:0,def:0,spa:0,spd:0,spe:0},rev:1,ab:m.ab,it:m.it,nat:m.nat,sa:m.st,bs:m.s.b,iv:m.iv,ev:m.ev,mv:m.mv,lock:null,spe:m.st[5],bo:0,xd:0}};
  const mons=[mk(O[0],0,1),mk(O[1],1,2),mk(Rd[0],2,3),mk(B2[0],3,4)];
  mons.forEach(m=>m.mv.forEach(v=>mvs[v.n]=E.MV[v.n]));mvs.Blizzard=E.MV.Blizzard;
  const V=(o={})=>({sl:mons.map(m=>({...m})),hail:0,refl:[0,0],ls:[0,0],hz:[{rock:0,spk:0,tsp:0,web:0},{rock:0,spk:0,tsp:0,web:0}],...o});
  const ST=(v,o={})=>({kind:'o',n:2,turn:1,end:null,rs:null,ask:[0,1],acts:[],refl:v.refl,ls:v.ls,hail:v.hail,hz:v.hz,dk:'hard',bl:150,T:[{nm:'Ana',ai:0,sd:0,ss:[0],party:[v.sl[0]]},{nm:'Bia',ai:0,sd:0,ss:[1],party:[v.sl[1]]},{nm:'Red',ai:1,sd:1,ss:[2],party:[v.sl[2]]},{nm:'Blue',ai:1,sd:1,ss:[3],party:[v.sl[3]]}],sl:[[0,0],[1,0],[2,0],[3,0]],...o});
  ws.recv({t:'init',M:mvs,n:2,boss:false});await sleep(20);
  const v0=V({sl:[null,null,null,null]}),v1=V();
  ws.recv({t:'ev',evs:[{k:'say',x:'Red e Blue querem batalhar!',v:v0},{k:'say',x:'Vai, X!',v:v1}],st:ST(v1)});await sleep(80);
  const trs=el(cx,'#trs')._h.join('');T('multiplayer: os 4 treinadores (Ana, Bia, Red, Blue) aparecem com sprite/fallback',(trs.match(/class="trn al"/g)||[]).length==2&&(trs.match(/class="trn en"/g)||[]).length==2&&/data-tr="red"/.test(trs)&&/data-tr="blue"/.test(trs)&&(trs.match(/<svg/g)||[]).length>=4);
  T('treinador do jogador em pixel art nítida (muitos pixels, crispEdges)',/crispEdges/.test(trs)&&(trs.match(/<rect /g)||[]).length>=150);
  T('multiplayer: 4 Pokémon ativos na arena',[0,1,2,3].every(s=>el(cx,'#m'+s).style.visibility=='visible'));
  const stg=s=>el(cx,'#h'+s).querySelector('.stg').innerHTML;
  const g1=V();g1.sl[0].g={atk:1,def:0,spa:0,spd:0,spe:1};ws.recv({t:'ev',evs:[{k:'say',x:'Dragon Dance',v:g1}],st:ST(g1)});await sleep(40);
  T('indicador mostra "ATK +1 | SPE +1" abaixo do nome',/ATK \+1/.test(stg(0))&&/SPE \+1/.test(stg(0))&&/\|/.test(stg(0)));
  const g2=V();g2.sl[0].g={atk:-1,def:-2,spa:0,spd:0,spe:0};ws.recv({t:'ev',evs:[{k:'say',x:'x',v:g2}],st:ST(g2)});await sleep(40);T('indicador mostra "ATK -1 | DEF -2"',/ATK -1/.test(stg(0))&&/DEF -2/.test(stg(0)));
  const g3=V();ws.recv({t:'ev',evs:[{k:'say',x:'y',v:g3}],st:ST(g3)});await sleep(40);T('indicadores somem quando os efeitos acabam',stg(0)=='');
  const hz=V({hail:1,hz:[{rock:0,spk:0,tsp:0,web:1},{rock:1,spk:2,tsp:1,web:0}]});ws.recv({t:'ev',evs:[{k:'say',x:'z',v:hz}],st:ST(hz)});await sleep(40);
  T('perigos de entrada aparecem no lado correto',/Pedras/.test(el(cx,'#hzE').textContent)&&/Espinhos ×2/.test(el(cx,'#hzE').textContent)&&/Teia/.test(el(cx,'#hzA').textContent));
  T('granizo aparece na arena',/ h/.test(' '+el(cx,'#wx').className));
  const c0=cx.created.length;const ice=V();ws.recv({t:'ev',evs:[{k:'fx',s:0,ts:[2,3],n:'Blizzard',t:'ice',c:'s',f:'frz10',v:ice},{k:'hit',s:2,d:90,e:2,cr:0,v:ice},{k:'hit',s:3,d:60,e:1,cr:0,v:ice}],st:ST(ice)});await sleep(120);
  T('Blizzard: animação em etapas (partículas, vento, neve, cristais) para todos os alvos',cx.created.length-c0>=60&&el(cx,'#m2').adds.includes('frost')&&el(cx,'#m3').adds.includes('frost'),`${cx.created.length-c0} elementos`);
  {const types=['nor','fir','wat','ele','gra','ice','fig','poi','gro','fly','psy','bug','roc','gho','dra','dar','ste','fai'],vv=V(),evs=[],c0=cx.created.length,e0=cx.errs.length;
   for(const t of types)for(const k of['p','s'])evs.push({k:'fx',s:0,ts:[2,3],n:'Golpe '+t+k,t,c:k,f:'',v:vv});
   for(const n of['Flamethrower','Surf','Thunderbolt','Earthquake'])evs.push({k:'fx',s:0,ts:[2],n,t:'nor',c:'s',f:'',v:vv});
   for(const f of['sb:atk2','tb:spe-1','heal50','par','brn','slp','tox','hz:rock','prot','lscr'])evs.push({k:'fx',s:1,ts:/^(tb|par|brn|slp|tox)/.test(f)?[2]:[1],n:'Status',t:'nor',c:'-',f,v:vv});
   ws.recv({t:'ev',evs,st:ST(vv)});await sleep(500);
   T('animações: 18 tipos (físico/especial), golpes nomeados e de status rodam sem erro',cx.errs.length==e0&&cx.created.length-c0>300,`${cx.created.length-c0} elementos, ${cx.errs.length-e0} erros`)}
  {const im=el(cx,'#m0').querySelector('img'),fit=(w,h)=>{im.naturalWidth=w;im.naturalHeight=h;im.style.width='';im.onload&&im.onload();return[parseInt(im.style.width),parseInt(im.style.height)]};
   const r=[[40,40],[96,96],[160,160],[120,60],[60,120]].map(([w,h])=>({w,h,o:fit(w,h)}));
   T('sprites: proporção original preservada e escala inteira (pixel art nítida), sem deformar',r.every(x=>x.o[0]%x.w==0&&x.o[1]%x.h==0&&x.o[0]/x.w==x.o[1]/x.h),JSON.stringify(r.map(x=>x.o)));
   T('sprites: espécies de tamanhos diferentes continuam com tamanhos diferentes',r[0].o[1]<r[1].o[1]||r[0].o[1]<=r[2].o[1])}
  const xa=V(),xb=V();xb.sl[2]={...xb.sl[2],n:'Eternamax Eternatus',id:10190,hp:100,mhp:400};
  ws.recv({t:'ev',evs:[{k:'xf0',s:2,v:xa},{k:'xf',s:2,v:xb},{k:'say',x:'Eternamax!',v:xb}],st:ST(xb)});await sleep(120);
  T('Eternamax: animação especial, sprite trocado e arena restaurada',el(cx,'#arena').adds.includes('dark')&&!el(cx,'#arena').classList.contains('dark')&&el(cx,'#m2').classList.contains('xm'));
  click(cx,'stat',2);const sp=el(cx,'#stp');T('multiplayer: painel de estatísticas funciona',!sp.hidden&&/Estágio/.test(sp.innerHTML));click(cx,'sx')}
 // ---------- ponta a ponta com o servidor real ----------
 {const A=mkCtx(WebSocket),B=mkCtx(WebSocket);await sleep(100);
  click(A,'friend');el(A,'#nm').value='Ana';click(A,'mk');
  for(let i=0;i<150&&!/class="code">/.test(el(A,'#lob').innerHTML);i++)await sleep(30);
  const code=(el(A,'#lob').innerHTML.match(/class="code">([A-Z0-9]+)</)||[])[1];T('e2e: Jogador 1 cria a sala e recebe código',!!code,code);
  click(B,'friend');el(B,'#nm').value='Bia';click(B,'showjoin');el(B,'#code').value=code.toLowerCase();click(B,'jn');
  for(let i=0;i<150&&!/Jogador 2/.test(el(A,'#lob').innerHTML);i++)await sleep(30);
  T('e2e: Jogador 2 entra com o código e ambos veem o estado da sala',/Jogador 2/.test(el(A,'#lob').innerHTML)&&/Jogador 2/.test(el(B,'#lob').innerHTML)&&/Equipe de Bia/.test(el(A,'#lob').innerHTML)&&/Equipe de Ana/.test(el(B,'#lob').innerHTML));
  const ids=cx=>[...el(cx,'#lob').innerHTML.split('id="mine"')[1].matchAll(/data-id="(\d+)"/g)].map(m=>m[1]).slice(0,6);
  const i0=ids(A);click(A,'dn',0);await sleep(200);const i1=ids(A);T('e2e: reorganizar a equipe na sala é validado pelo servidor e preservado',i1[0]==i0[1]&&i1[1]==i0[0]);
  click(A,'dif',0,'ultra');await sleep(200);T('e2e: dificuldade escolhida pelo anfitrião aparece para o amigo',/class="dif on"[^>]*>\s*<img data-art="384"/.test(el(B,'#lob').innerHTML));
  click(A,'rdy');click(B,'rdy');await sleep(300);click(A,'go');
  const [na,nb]=await Promise.all([drive(A),drive(B)]);T('e2e: cooperativo 2v2 (Ultra Difícil) termina nos dois clientes',na>0&&nb>0,`${na}/${nb}`);
  T('e2e: os dois veem o mesmo resultado final',(el(A,'#txt').textContent||'')===(el(B,'#txt').textContent||''),el(A,'#txt').textContent)}
 console.log(`\n${pass} passaram, ${fail} falharam`);srv.kill();process.exit(fail?1:0)})().catch(e=>{console.log('EXC',e.stack);srv.kill();process.exit(1)});
