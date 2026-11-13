// Testes automatizados do motor (regras de batalha, dados, dificuldades, Boss Fight). Rode: node tests/unit.js
const E=require('../engine.js');
let pass=0,fail=0;const T=(n,ok,x='')=>{ok?pass++:fail++;console.log((ok?'PASS ':'FAIL ')+n+(x?'  '+x:''))};
const tick=()=>new Promise(r=>setImmediate(r));
const near=(a,b,t)=>Math.abs(a-b)<=t;
const O=(name,lv,ab,it,nat,mv)=>({s:E.SP[name],lv,ab,it,nat:E.NAT.indexOf(nat),iv:Array(6).fill(31),ev:Array(6).fill(0),mv});
const FILL=['Gyarados','Skarmory','Steelix','Golem','Medicham'].map(n=>O(n,80,null,null,'Hardy',['Earthquake','Waterfall','Iron Head','Crunch']));
async function battle(first,o={}){
 const st={last:null,evs:[]},eng=E.Eng({send:(e,s)=>{st.last=s;st.evs.push(...e)}});
 eng.init({kind:o.kind||'s',teams:[[first,...FILL.slice(0,5)],...(o.t2?[[o.t2,...FILL.slice(0,5)]]:[])],names:['A','B'],diff:o.diff,bl:o.bl});
 await eng.start();await tick();st.eng=eng;st.B=()=>eng.dbg.B;return st}
const rnd=Math.random;
(async()=>{
// ===== Estágios: 8 golpes obrigatórios =====
Math.random=()=>.5;
const EXP={'Dragon Dance':{atk:1,spe:1},'Swords Dance':{atk:2},'Nasty Plot':{spa:2},'Calm Mind':{spa:1,spd:1},'Bulk Up':{atk:1,def:1},'Agility':{spe:2},'Iron Defense':{def:2},'Shell Smash':{atk:2,spa:2,spe:2,def:-1,spd:-1}};
for(const [mv,exp] of Object.entries(EXP)){
 const b=await battle(O('Salamence',80,null,null,'Hardy',[mv,'Earthquake','Flamethrower','Crunch']));
 b.eng.act(0,{t:'m',i:0,tg:1},b.last.turn);await tick();
 const g=b.last.T[0].party[0].g,real=b.B().T[0].party[0].sg,want={atk:0,def:0,spa:0,spd:0,spe:0,...exp};
 T(`estágios: ${mv}`,JSON.stringify(g)==JSON.stringify(want)&&JSON.stringify(g)==JSON.stringify(real),JSON.stringify(g))}
// ===== estágios afetam dano e ordem =====
{const b=await battle(O('Salamence',80,null,null,'Hardy',['Return','Earthquake','Flamethrower','Crunch'])),d=b.B(),a=d.T[0].party[0],f=d.sl[1];const M=E.MV.Return,dm=()=>b.eng.dbg.dmg(a,f,M,{rnd:1,crit:false});
 const base=dm();a.sg.atk=2;const up=dm();a.sg.atk=-2;const dn=dm();a.sg.atk=0;f.sg.def=2;const def=dm();f.sg.def=0;
 T('+2 Ataque dobra o dano',near(up/base,2,.12),`${base}->${up}`);T('-2 Ataque reduz o dano pela metade',near(dn/base,.5,.08),`${base}->${dn}`);T('+2 Defesa do alvo reduz o dano pela metade',near(def/base,.5,.08),`${base}->${def}`);
 const sp0=b.eng.dbg.spd(a);a.sg.spe=2;const sp2=b.eng.dbg.spd(a);a.sg.spe=0;a.stt='par';const spp=b.eng.dbg.spd(a);a.stt=null;
 T('+2 Velocidade dobra a velocidade efetiva',near(sp2/sp0,2,.01));T('paralisia reduz a velocidade a 1/4 (Gen VI)',near(spp/sp0,.25,.01))}
// ordem dos turnos em dupla (dois Pokémon do jogador): o mais veloz age primeiro; Agility inverte
{const st={last:null,evs:[]},eng=E.Eng({send:(e,s)=>{st.last=s;st.evs.push(...e)}});
 eng.init({kind:'d',teams:[[O('Skarmory',80,null,null,'Hardy',['Agility','Aerial Ace','Iron Head','Toxic']),O('Gengar',80,null,null,'Hardy',['Shadow Ball','Sludge Bomb','Thunderbolt','Will-O-Wisp']),...FILL.slice(0,4)]]});
 await eng.start();await tick();
 const heal=()=>{const B=eng.dbg.B;B.T[0].party.forEach(m=>{m.hp=m.mhp;m.fnt=false});[2,3].forEach(q=>{const m=B.sl[q];if(m){m.stt='slp';m.sl=99}})};
 const order=()=>{const x=st.evs.filter(e=>e.k=='say'&&/usou/.test(e.x)).map(e=>e.x);return x};
 heal();st.evs=[];eng.act(0,{t:'m',i:2,tg:2},st.last.turn);eng.act(1,{t:'m',i:0,tg:2},st.last.turn);await tick();
 const o1=order().filter(x=>/Skarmory|Gengar/.test(x));T('Gengar (mais rápido) age antes de Skarmory',/Gengar/.test(o1[0]),o1.join(' | '));
 heal();st.evs=[];eng.act(0,{t:'m',i:0},st.last.turn);eng.act(1,{t:'m',i:0,tg:2},st.last.turn);await tick();
 heal();st.evs=[];eng.act(0,{t:'m',i:2,tg:2},st.last.turn);eng.act(1,{t:'m',i:0,tg:2},st.last.turn);await tick();
 const o2=order().filter(x=>/Skarmory|Gengar/.test(x));T('após Agility (+2 Vel), Skarmory passa a agir antes de Gengar',/Skarmory/.test(o2[0]),o2.join(' | ')+' | efetiva '+JSON.stringify(st.last.T[0].party.slice(0,2).map(m=>[m.n,m.spe,m.hp])))}
// limites -6/+6
{const b=await battle(O('Salamence',80,null,null,'Hardy',['Swords Dance','Earthquake','Flamethrower','Crunch'])),a=b.B().T[0].party[0],d=b.eng.dbg;
 a.sg.atk=5;await d.stg(a,'atk',2,a);T('estágio sobe até +6',a.sg.atk==6);const r=await d.stg(a,'atk',1,a);T('+7 não existe (limite +6)',a.sg.atk==6&&r===false);
 a.sg.def=-5;await d.stg(a,'def',-3,{});T('estágio desce até -6',a.sg.def==-6);
 a.ab='Clear Body';a.sg.spa=0;const rr=await d.stg(a,'spa',-1,{});T('Clear Body impede redução causada por outro',rr===false&&a.sg.spa==0);
 a.ab='Contrary';await d.stg(a,'atk',-1,{});T('Contrary inverte a redução',a.sg.atk==6&&true);a.sg.atk=0;await d.stg(a,'atk',1,a);T('Contrary inverte o aumento',a.sg.atk==-1);
 a.ab='Defiant';a.sg.atk=0;a.sg.spd=0;await d.stg(a,'spd',-1,{});T('Defiant: redução por outro dá +2 Ataque',a.sg.atk==2)}
Math.random=rnd;
// ===== Naturezas =====
{const s=E.SP.Garchomp||E.SP.Salamence,c=(n)=>E.calc(s.b,80,Array(6).fill(31),Array(6).fill(0),E.NAT.indexOf(n)),h=c('Hardy');
 const ad=c('Adamant');T('Adamant: +10% Ataque, -10% Ataque Esp.',ad[1]==Math.floor((h[1]-5)*1.1)+5&&ad[3]==Math.floor((h[3]-5)*.9)+5||(ad[1]>h[1]&&ad[3]<h[3]));
 const ti=c('Timid'),mo=c('Modest'),jo=c('Jolly'),im=c('Impish'),ca=c('Careful');
 T('Timid: +Vel -Atq',ti[5]>h[5]&&ti[1]<h[1]);T('Modest: +AtqE -Atq',mo[3]>h[3]&&mo[1]<h[1]);T('Jolly: +Vel -AtqE',jo[5]>h[5]&&jo[3]<h[3]);T('Impish: +Def -AtqE',im[2]>h[2]&&im[3]<h[3]);T('Careful: +DefE -AtqE',ca[4]>h[4]&&ca[3]<h[3]);
 T('HP não é afetado pela natureza',[ad,ti,mo,jo,im,ca].every(x=>x[0]==h[0]))}
{const seen=new Set();let neutral=0,n=0;for(let i=0;i<40;i++)for(const o of E.localTeam()){seen.add(o.nat);n++;if(o.nat%6==0)neutral++}
 T('naturezas sorteadas nunca são neutras',neutral==0,`${n} Pokémon`);T('naturezas sorteadas são variadas',seen.size>=10,`${seen.size} diferentes`)}
// ===== Movesets (roster local) e equipes =====
{let ok=true,six=true,lv=true,four=true;for(let i=0;i<40;i++){const t=E.localTeam();if(t.length!=6||new Set(t.map(o=>o.s.n)).size!=6)six=false;
  for(const o of t){if(!o.mv.every(m=>o.s.m.includes(m)))ok=false;if(o.mv.length!=4||new Set(o.mv).size!=4)four=false;if(o.lv<70||o.lv>100)lv=false}}
 T('equipe com 6 espécies distintas',six);T('golpes do roster local só da lista da espécie',ok);T('exatamente 4 golpes distintos',four);T('níveis entre 70 e 100',lv)}
// ===== Movesets (PokéAPI simulada): só golpes que a espécie aprende, respeitando o nível =====
{const N=60,MOVES=Array.from({length:36},(_,k)=>k<4?['stealth-rock','spikes','rapid-spin','defog'][k]:'mv'+k);
 const learn=i=>MOVES.map((m,j)=>((j*7+i)%3==0?null:{m,lvl:j%9==0?100:(j%4==1?0:30+j),how:j%4==1?'machine':'level-up'})).filter(Boolean);
 global.fetch=async(url)=>{const u=url.replace('https://pokeapi.co/api/v2/','');const J=o=>({ok:true,json:async()=>o});
  if(u.startsWith('pokemon-species?'))return J({count:N});
  let m;if(m=u.match(/^pokemon-species\/(\d+)$/))return J({is_legendary:+m[1]%11==0,is_mythical:false,varieties:[{pokemon:{name:'mon'+m[1]}}]});
  if(m=u.match(/^pokemon\/mon(\d+)$/)){const i=+m[1];return J({id:i,name:'mon'+i,species:{url:'x/pokemon-species/'+i+'/'},types:[{type:{name:'normal'}}],stats:[70,70,70,70,70,70].map(v=>({base_stat:v+i})),abilities:[{ability:{name:'sturdy'}},{ability:{name:'unaware'}}],sprites:{other:{'official-artwork':{front_default:'a'}},front_default:'f'},
   moves:learn(i).map(x=>({move:{name:x.m},version_group_details:[{version_group:{name:'x-y'},move_learn_method:{name:x.how},level_learned_at:x.how=='machine'?0:x.lvl}]}))})}
  if(m=u.match(/^move\/(.+)$/)){const k=MOVES.indexOf(m[1]),cat=['damage','damage+ailment','ailment','net-good-stats','damage+lower','damage+heal','heal','unique'][k%8];
   return J({name:m[1],accuracy:k%5==0?null:100,power:['ailment','net-good-stats','heal','unique'].includes(cat)?null:60+k,pp:15,priority:0,damage_class:{name:['ailment','net-good-stats','heal','unique'].includes(cat)?'status':k%2?'physical':'special'},type:{name:['normal','fire','water'][k%3]},target:{name:['ailment','net-good-stats','heal','unique'].includes(cat)?(cat=='ailment'?'selected-pokemon':'user'):'selected-pokemon'},
    meta:{category:{name:cat},ailment:{name:cat.includes('ailment')?'burn':'none'},ailment_chance:k%3?20:0,crit_rate:0,drain:cat=='damage+heal'?50:0,flinch_chance:k%6==0?30:0,healing:cat=='heal'?50:0,min_hits:null,max_turns:null,stat_chance:cat=='damage+lower'?10:0},
    stat_changes:cat=='net-good-stats'?[{change:2,stat:{name:'attack'}}]:cat=='damage+lower'?[{change:-1,stat:{name:'special-defense'}}]:[],effect_entries:[{language:{name:'en'},short_effect:'Does something.'}]})}
  return{ok:false,status:404}};
 let bad=0,n=0,hz=0,sizes=true,lvOk=true;const names=new Set();
 for(let r=0;r<25;r++){const t=await E.liveTeam();if(t.length!=6||new Set(t.map(o=>o.s.n)).size!=6)sizes=false;
  for(const o of t){n++;if(o.mv.length!=4||new Set(o.mv).size!=4)sizes=false;if(o.lv<70||o.lv>100)lvOk=false;names.add(o.nat);
   for(const mv of o.mv){const raw=mv.toLowerCase().replace(/ /g,'-'),x=o.s.m.find(q=>q[0]==raw);if(!x||x[1]>o.lv){bad++}if(['Stealth Rock','Spikes','Rapid Spin','Defog'].includes(mv))hz++}}}
 T('PokéAPI simulada: todo golpe está no aprendizado da espécie e respeita o nível',bad==0&&n==150,`${n} Pokémon, ${bad} inválidos`);
 T('PokéAPI simulada: equipes com 6 espécies, 4 golpes distintos, nv 70-100',sizes&&lvOk);T('golpes de campo (Stealth Rock etc.) aparecem quando a espécie os aprende',hz>0,`${hz} ocorrências`);
 delete global.fetch}
// ===== Efeitos de campo =====
async function rock(setup,idx,hz=1,extra){const b=await battle(O('Salamence',80,null,null,'Hardy',['Stealth Rock','Spikes','Rapid Spin','Defog']));const B=b.B(),d=b.eng.dbg;Object.assign(B.hz[1],setup);const m=B.T[1].party[idx];if(extra)extra(m);const before=m.hp;await d.swap(1,idx,false);return{m,loss:before-m.hp,B,d}}
{const exp=(m,e)=>Math.max(1,Math.floor(m.mhp*e/8));
 for(const [i,name,e] of [[4,'Charizard (Fogo/Voador, 4x)',4],[1,'Lapras (Água/Gelo, 2x)',2],[2,'Snorlax (1x)',1],[5,'Blastoise (1x)',1]]){const r=await rock({rock:1},i);T(`Stealth Rock em ${name}`,r.loss==exp(r.m,e),`perdeu ${r.loss}`)}
 for(const L of[1,2,3]){const r=await rock({spk:L},2);T(`Spikes ${L} camada(s)`,r.loss==Math.max(1,Math.floor(r.m.mhp/[8,6,4][L-1])),`perdeu ${r.loss}`)}
 {const r=await rock({spk:3},4);T('Spikes não afeta Pokémon voador',r.loss==0)}
 {const r=await rock({spk:1},2,1,m=>m.it='Heavy-Duty Boots');T('Heavy-Duty Boots ignora perigos',r.loss==0)}
 {const r=await rock({tsp:1},2);T('Toxic Spikes (1 camada) envenena',r.m.stt=='psn')}
 {const r=await rock({tsp:2},2);T('Toxic Spikes (2 camadas) envenena gravemente',r.m.stt=='tox')}
 {const r=await rock({tsp:2},3);T('tipo Veneno absorve Toxic Spikes (sem status, camadas removidas)',!r.m.stt&&r.B.hz[1].tsp==0)}
 {const r=await rock({tsp:1},4);T('Toxic Spikes não afeta Pokémon voador',!r.m.stt)}
 {const r=await rock({web:1},2);T('Sticky Web: -1 Velocidade ao entrar',r.m.sg.spe==-1)}
 {const r=await rock({web:1},4);T('Sticky Web não afeta Pokémon voador',r.m.sg.spe==0)}
 // golpes de campo: colocar, empilhar, remover
 const b=await battle(O('Salamence',80,null,null,'Hardy',['Stealth Rock','Spikes','Rapid Spin','Defog'])),B=b.B(),d=b.eng.dbg;
 await d.use(0,{t:'m',i:0,tg:1});T('Stealth Rock é colocado no lado adversário',B.hz[1].rock==1&&B.hz[0].rock==0);await d.use(0,{t:'m',i:0,tg:1});T('Stealth Rock não empilha',B.hz[1].rock==1);
 for(let k=0;k<4;k++)await d.use(0,{t:'m',i:1,tg:1});T('Spikes empilham até 3 camadas',B.hz[1].spk==3);
 B.hz[0]={rock:1,spk:2,tsp:1,web:1};await d.use(0,{t:'m',i:2,tg:1});T('Rapid Spin remove os perigos do próprio lado e dá +1 Velocidade',JSON.stringify(B.hz[0])==JSON.stringify({rock:0,spk:0,tsp:0,web:0})&&B.hz[1].rock==1&&B.T[0].party[0].sg.spe==1);
 B.hz[0].rock=1;B.refl[1]=3;await d.use(0,{t:'m',i:3,tg:1});T('Defog remove perigos dos dois lados e Reflect adversário',B.hz.every(h=>!h.rock&&!h.spk&&!h.tsp&&!h.web)&&B.refl[1]==0);
 T('perigos aparecem no estado público (sincronizado)',Array.isArray(b.eng.pub().hz)&&b.eng.pub().hz.length==2)}
// ===== outros efeitos =====
{const b=await battle(O('Salamence',80,null,null,'Hardy',['Bite','Protect','Light Screen','Flamethrower'])),B=b.B(),d=b.eng.dbg,a=B.T[0].party[0],f=B.sl[1];
 Math.random=()=>0;f.acted=0;await d.use(0,{t:'m',i:0,tg:1});T('Bite pode causar flinch (30%)',f.flin==1);Math.random=()=>.5;
 const base=d.dmg(a,f,E.MV.Flamethrower,{rnd:1});B.ls[1]=5;const ls=d.dmg(a,f,E.MV.Flamethrower,{rnd:1});B.ls[1]=0;T('Light Screen reduz dano especial pela metade',near(ls/base,.5,.08));
 const hp=f.hp;f.prot=1;await d.use(0,{t:'m',i:3,tg:1});T('Protect bloqueia o golpe',f.hp==hp);f.prot=0}
// ===== Difícil/dificuldades e equipes fixas =====
{const mk=async(diff,kind='s')=>{const eng=E.Eng({send(){}});const tm=[...FILL,O('Salamence',77,'Intimidate','Life Orb','Adamant',['Earthquake','Crunch','Iron Head','Waterfall'])].slice(0,6);eng.init({kind,teams:kind=='o'?[tm,tm]:[tm],names:['A','B'],diff});return eng.dbg.B};
 const lv=B=>B.T.filter(t=>t.ai).flatMap(t=>t.party.map(m=>m.lv)),base=await mk('hard'),orig=lv(base);
 for(const [d,cap] of [['easy',50],['med',70],['hard',100]]){const B=await mk(d);const l=lv(B);T(`${d}: níveis dos adversários respeitam o limite ${cap}`,l.every((x,i)=>x==Math.min(orig[i],cap)),l.join(','))}
 {const B=await mk('ultra');const en=B.T.filter(t=>t.ai).flatMap(t=>t.party);T('ultra: nível 100, IVs 31, EVs otimizados, natureza e set competitivos',en.every(m=>m.lv==100&&m.iv.every(v=>v==31)&&m.ev.reduce((a,b)=>a+b,0)>=500&&m.nat%6!=0&&m.mv.length==4),en.map(m=>m.s.n+':'+E.NAT[m.nat]).join(' '))}
 const snap=B=>JSON.stringify(B.T.filter(t=>!t.ai).map(t=>t.party.map(m=>[m.s.n,m.lv,m.nat,m.ab,m.it,m.mv.map(x=>x.n),m.iv,m.ev,m.st])));
 const sb=snap(base);let same=true;for(const d of['easy','med','ultra','boss'])if(snap(await mk(d))!=sb)same=false;T('nenhuma dificuldade altera o time do jogador',same);
 const names=B=>JSON.stringify(B.T.filter(t=>t.ai).map(t=>t.party.map(m=>m.s.n)));const n0=names(base);let fx=true;for(const d of['easy','med','ultra'])if(names(await mk(d))!=n0)fx=false;
 T('Red mantém a mesma equipe e ordem em qualquer dificuldade',fx);{const x1=names(await mk('easy','o')),x2=names(await mk('ultra','o')),x3=names(await mk('hard','o'));T('Red e Blue (2x2) mantêm equipes e ordem em qualquer dificuldade',x1==x2&&x2==x3)}
 const B2=await mk('hard','o');T('Red (HGSS) fixo: Pikachu 88 Light Ball primeiro',JSON.stringify(B2.T[2].party.map(m=>[m.s.n,m.lv]))==JSON.stringify([['Pikachu',88],['Lapras',80],['Snorlax',82],['Venusaur',84],['Charizard',84],['Blastoise',84]])&&B2.T[2].party[0].it=='Light Ball'&&B2.T[2].party[0].ab=='Static');
 T('Blue (FireRed/LeafGreen, Campeão) fixo',JSON.stringify(B2.T[3].party.map(m=>[m.s.n,m.lv]))==JSON.stringify([['Pidgeot',59],['Alakazam',57],['Rhydon',59],['Gyarados',59],['Arcanine',61],['Venusaur',63]]));
 const mv=t=>JSON.stringify(t.party.map(m=>m.mv.map(x=>x.n)));
 T('golpes de Red (HGSS) conforme a referência',mv(B2.T[2])==JSON.stringify([['Volt Tackle','Iron Tail','Thunderbolt','Quick Attack'],['Blizzard','Brine','Psychic','Body Slam'],['Blizzard','Shadow Ball','Crunch','Giga Impact'],['Sleep Powder','Giga Drain','Sludge Bomb','Frenzy Plant'],['Flare Blitz','Air Slash','Dragon Pulse','Blast Burn'],['Hydro Cannon','Blizzard','Flash Cannon','Focus Blast']]));
 T('golpes de Blue conforme a referência',mv(B2.T[3])==JSON.stringify([['Aerial Ace','Feather Dance','Sand Attack','Whirlwind'],['Psychic','Future Sight','Recover','Reflect'],['Take Down','Earthquake','Rock Tomb','Scary Face'],['Hydro Pump','Dragon Rage','Bite','Thrash'],['Extreme Speed','Flamethrower','Roar','Bite'],['Solar Beam','Synthesis','Sunny Day','Growth']]));
 const B1=await mk('hard','s');T('1x1: granizo constante (Monte Silver) ativo',B1.hail==1);T('2x2: sem granizo',B2.hail==0)}
// ===== Boss Fight: Eternatus -> Eternamax =====
{for(const bl of[150,200]){const b=await battle(O('Salamence',80,null,null,'Hardy',['Earthquake','Flamethrower','Crunch','Iron Head']),{diff:'boss',bl});const B=b.B(),boss=B.T[1].party[0];
  T(`Boss nv ${bl}: sem item e Speed exatamente 150`,boss.it===null&&boss.st[5]==150&&b.eng.dbg.spd(boss)==150&&b.eng.pub().T[1].party[0].spe==150);
  T(`Boss Fight nv ${bl}: Eternatus começa na forma normal`,boss.s.n=='Eternatus'&&boss.lv==bl&&!boss.xd&&boss.iv.every(v=>v==31)&&boss.nat==E.NAT.indexOf('Timid'),`mhp ${boss.mhp}`);}
 const b=await battle(O('Salamence',80,null,null,'Hardy',['Earthquake','Flamethrower','Crunch','Iron Head']),{diff:'boss',bl:150}),B=b.B(),boss=B.T[1].party[0],d=b.eng.dbg;
 boss.hp=Math.floor(boss.mhp*.5);await d.post(boss);T('50% exatos não transforma (só abaixo de 50%)',!boss.xd);
 boss.hp=Math.floor(boss.mhp*.51);await d.post(boss);T('51% não transforma',!boss.xd);
 const ratio=(boss.mhp-1)/boss.mhp;boss.hp=Math.floor(boss.mhp*.49);const r0=boss.hp/boss.mhp,oldMhp=boss.mhp,hpBefore=boss.hp;boss.sg.atk=2;boss.stt='psn';await d.post(boss);
 T('abaixo de 50% transforma em Eternamax',boss.xd==1&&boss.s.n=='Eternamax Eternatus'&&boss.s.id==10190);
 T('atributos da 2ª fase: base 255/115/250/125/250/130',JSON.stringify(boss.s.b)==JSON.stringify([255,115,250,125,250,130])&&boss.mhp==oldMhp);
 T('a transformação não restaura nem altera o HP (HP e HP máximo mantidos)',boss.hp==hpBefore&&boss.mhp==oldMhp&&boss.hp<boss.mhp/2);
 T('após Eternamax: Speed segue 150 e continua sem item',boss.st[5]==150&&d.spd(boss)==150&&boss.it===null);boss.sg.spe=-6;boss.stt='par';T('Speed do chefe não muda com estágios nem paralisia',d.spd(boss)==150);boss.sg.spe=0;boss.stt='psn';
 T('golpes da 2ª fase e item removido',JSON.stringify(boss.mv.map(x=>x.n))==JSON.stringify(['Eternabeam','Dynamax Cannon','Sludge Bomb','Flamethrower'])&&boss.it==null);
 T('efeitos de batalha preservados (estágios, status)',boss.sg.atk==2&&boss.stt=='psn');
 d.flush();const c1=b.evs.filter(e=>e.k=='xf0').length,c2=b.evs.filter(e=>e.k=='xf').length;await d.post(boss);boss.hp=1;await d.post(boss);d.flush();
 T('a transformação ocorre uma única vez',b.evs.filter(e=>e.k=='xf').length==c2&&c2==1&&c1==1);
 T('eventos de transformação são emitidos (sincronizados)',b.evs.some(e=>e.k=='xf'&&e.v.sl.some(m=>m&&m.id==10190)));
 const acts=b.eng.act(0,{t:'b'},b.last.turn);T('captura é rejeitada pelo motor',/captur/i.test(acts||''),acts);
 let thrown=false;try{const e2=E.Eng({send(){}});e2.init({kind:'s',teams:[[{...O('Salamence',80,null,null,'Hardy',['Earthquake','Crunch','Iron Head','Waterfall']),s:E.SP.Eternatus},...FILL.slice(0,5)]]})}catch(e){thrown=/exclusivo/.test(e.message)}
 T('Eternatus não pode entrar na equipe do jogador',thrown);
 // Pressure
 const pp0=B.T[0].party[0].mv[0].pp;await d.use(0,{t:'m',i:0,tg:1});T('Pressure gasta 1 PP extra',B.T[0].party[0].mv[0].pp==pp0-2||B.T[0].party[0].mv[0].pp==pp0-2,`${pp0}->${B.T[0].party[0].mv[0].pp}`)}
// ===== Boss: batalha completa (derrota e vitória) =====
async function play(diff,kind,force){const st={last:null},eng=E.Eng({send:(e,s)=>{st.last=s}});const teams=[E.localTeam(),E.localTeam()];eng.init({kind,teams,names:['A','B'],diff,bl:150});await eng.start();await tick();
 if(force){const b=eng.dbg.B;b.T.filter(t=>t.ai).forEach(t=>t.party.forEach(m=>{m.hp=1;if(m.boss)m.mhp=m.mhp}))}
 let n=0;Math.random=rnd;
 while(!st.last.end&&n++<600){const s=st.last;
  if(s.rs!=null){const t=s.T.find(t=>t.ss.includes(s.rs)),ti=s.T.indexOf(t),i=t.party.findIndex((m,i)=>!m.f&&!s.sl.some(p=>p&&p[0]==ti&&p[1]==i));eng.rep(s.rs,i)}
  else for(const q of s.ask.filter(q=>!s.acts.includes(q))){const p=s.sl[q],m=s.T[p[0]].party[p[1]],mv=m.mv.map((x,i)=>x.pp>0&&(!m.lock||m.lock==x.n)?i:-1).filter(i=>i>=0);const foes=[...Array(s.n)].map((_,k)=>k+s.n).filter(k=>s.sl[k]&&!s.T[s.sl[k][0]].party[s.sl[k][1]].f);eng.act(q,{t:'m',i:mv.length?mv[Math.floor(Math.random()*mv.length)]:-1,tg:foes[0]},s.turn)}
  await tick()}
 return st.last.end}
{const r1=await play('boss','s'),r2=await play('boss','o'),r3=await play('boss','s',true),r4=await play('ultra','o'),r5=await play('easy','s',true);
 T('Boss Fight 1x1 termina corretamente',!!r1,r1);T('Boss Fight cooperativa 2v1 termina corretamente',!!r2,r2);T('Boss Fight: vitória quando o chefe cai',r3=='win',r3);T('Ultra Difícil 2x2 termina corretamente',!!r4,r4);T('Fácil: vitória quando os adversários caem',r5=='win',r5)}
// ===== privacidade e utilidades =====
{const b=await battle(O('Salamence',80,null,null,'Hardy',['Earthquake','Flamethrower','Crunch','Iron Head']),{kind:'o',t2:O('Gengar',80,null,null,'Hardy',['Shadow Ball','Sludge Bomb','Thunderbolt','Will-O-Wisp'])});
 const p=b.eng.pub(),hid=p.T[2].party[5],shown=p.T[2].party[0];T('dados de adversários ainda não revelados ficam ocultos',!hid.mv&&!hid.sa&&!hid.ab&&hid.n&&hid.hp>0);T('adversários em campo têm dados visíveis',!!shown.mv&&!!shown.sa);
 T('equipes dos jogadores ficam disponíveis aos dois (cooperativo)',!!p.T[0].party[3].mv&&!!p.T[1].party[3].mv)}
{const t=E.localTeam();const r=E.reorder(t,[5,4,3,2,1,0]);T('reorganizar preserva os 6 Pokémon e seus dados',JSON.stringify(r.map(o=>o.s.n).sort())==JSON.stringify(t.map(o=>o.s.n).sort())&&r[0]===t[5]&&r[0].nat===t[5].nat&&r[0].mv===t[5].mv);
 T('ordem inválida é rejeitada',E.reorder(t,[0,0,1,2,3,4])===null&&E.reorder(t,[0,1,2])===null&&E.reorder(t,[0,1,2,3,4,9])===null)}
{const k=[[20,20],[96,96],[160,160],[300,300],[400,100],[40,120]].map(([w,h])=>E.spriteScale(w,h));T('escala de sprites sempre entre 0,62 e 1,12',k.every(x=>x>=.62&&x<=1.12),k.map(x=>x.toFixed(2)).join(' '));T('sprites maiores ficam maiores, com compressão',k[0]<k[1]&&k[1]<=k[2]&&k[3]<=1.12&&k[3]/k[0]<2)}
{const bad=Object.values(E.MV).filter(M=>!E.describe(M)||E.describe(M).length<25);
 T('todos os golpes têm descrição específica',bad.length==0,bad.map(m=>m.n).join()||`${Object.keys(E.MV).length} golpes`);
 T('descrições fiéis: Thunderbolt, Dragon Dance, Protect, Light Screen',/Elétrico especial.*10% de chance de paralisar/.test(E.describe(E.MV.Thunderbolt))&&/Aumenta Ataque e Velocidade do usuário em 1 estágio/.test(E.describe(E.MV['Dragon Dance']))&&/Protege o usuário da maioria dos ataques/.test(E.describe(E.MV.Protect))&&/golpes especiais.*5 turnos/.test(E.describe(E.MV['Light Screen'])))}
{Math.random=()=>.5;const b=await battle(O('Salamence',80,null,null,'Hardy',['Aurora Veil','Safeguard','Mist','Tailwind'])),B=b.B(),d=b.eng.dbg,a=B.T[0].party[0],f=B.sl[1];
 const base=d.dmg(f,a,E.MV.Flamethrower,{rnd:1});await d.use(0,{t:'m',i:0,tg:1});const av=d.dmg(f,a,E.MV.Flamethrower,{rnd:1});
 T('Aurora Veil (com granizo) reduz o dano à metade e dura 5 turnos',B.av[0]==5&&near(av/base,.5,.08));B.av[0]=0;B.hail=0;await d.use(0,{t:'m',i:0,tg:1});T('Aurora Veil falha sem granizo',B.av[0]==0);B.hail=1;
 await d.use(0,{t:'m',i:3,tg:1});const s0=d.spd(B.T[0].party[0]);T('Tailwind dura 4 turnos e dobra a Velocidade da equipe',B.tw[0]==4&&true);B.tw[0]=0;const s1=d.spd(B.T[0].party[0]);T('Tailwind: velocidade efetiva dobrada',near(s0/s1,2,.01));
 await d.use(0,{t:'m',i:2,tg:1});B.ms[1]=5;const r=await d.stg(f,'atk',-1,a);T('Mist impede reduções de atributos causadas por adversários',r===false&&f.sg.atk==0&&B.ms[0]==5);
 B.sf[1]=5;const b2=await battle(O('Salamence',80,null,null,'Hardy',['Will-O-Wisp','Thunder Wave','Safeguard','Toxic'])),B2=b2.B(),d2=b2.eng.dbg;B2.sf[1]=5;await d2.use(0,{t:'m',i:0,tg:1});T('Safeguard impede condições de status no lado protegido',!B2.sl[1].stt);Math.random=rnd}
Math.random=rnd;
console.log(`\n${pass} passaram, ${fail} falharam`);process.exit(fail?1:0)})().catch(e=>{console.log('EXC',e.stack);process.exit(1)});
