
const R=n=>Math.floor(Math.random()*n),pick=a=>a[R(a.length)];
const CH={nor:{roc:.5,ste:.5,gho:0},fir:{fir:.5,wat:.5,gra:2,ice:2,bug:2,roc:.5,dra:.5,ste:2},wat:{fir:2,wat:.5,gra:.5,gro:2,roc:2,dra:.5},ele:{wat:2,ele:.5,gra:.5,gro:0,fly:2,dra:.5},gra:{fir:.5,wat:2,gra:.5,poi:.5,gro:2,fly:.5,bug:.5,roc:2,dra:.5,ste:.5},ice:{fir:.5,wat:.5,gra:2,ice:.5,gro:2,fly:2,dra:2,ste:.5},fig:{nor:2,ice:2,poi:.5,fly:.5,psy:.5,bug:.5,roc:2,gho:0,dar:2,ste:2,fai:.5},poi:{gra:2,poi:.5,gro:.5,roc:.5,gho:.5,ste:0,fai:2},gro:{fir:2,ele:2,gra:.5,poi:2,fly:0,bug:.5,roc:2,ste:2},fly:{ele:.5,gra:2,fig:2,bug:2,roc:.5,ste:.5},psy:{fig:2,poi:2,psy:.5,dar:0,ste:.5},bug:{fir:.5,gra:2,fig:.5,poi:.5,fly:.5,psy:2,gho:.5,dar:2,ste:.5,fai:.5},roc:{fir:2,ice:2,fig:.5,gro:.5,fly:2,bug:2,ste:.5},gho:{nor:0,psy:2,gho:2,dar:.5},dra:{dra:2,ste:.5,fai:0},dar:{fig:.5,psy:2,gho:2,dar:.5,fai:.5},ste:{fir:.5,wat:.5,ele:.5,ice:2,roc:2,ste:.5,fai:2},fai:{fir:.5,fig:2,poi:.5,dra:2,dar:2,ste:.5}};
const TYS=Object.keys(CH),TN='Normal,Fogo,Água,Elétrico,Planta,Gelo,Lutador,Veneno,Terra,Voador,Psíquico,Inseto,Pedra,Fantasma,Dragão,Sombrio,Aço,Fada'.split(',');
const COL={nor:'#a8a77a',fir:'#ee8130',wat:'#6390f0',ele:'#d4a90c',gra:'#7ac74c',ice:'#5bb8b4',fig:'#c22e28',poi:'#a33ea1',gro:'#c9a43d',fly:'#8f7be0',psy:'#f95587',bug:'#a6b91a',roc:'#b6a136',gho:'#735797',dra:'#6f35fc',dar:'#705746',ste:'#8e8ea8',fai:'#d685ad'};
const tag=t=>`<span class="ty" style="background:${COL[t]}">${TN[TYS.indexOf(t)]}</span>`;
const eff=(t,ds)=>ds.reduce((m,d)=>m*(CH[t][d]??1),1);
const NAT='Hardy,Lonely,Brave,Adamant,Naughty,Bold,Docile,Relaxed,Impish,Lax,Timid,Hasty,Serious,Jolly,Naive,Modest,Mild,Quiet,Bashful,Rash,Calm,Gentle,Sassy,Careful,Quirky'.split(',');
const STN={par:'foi paralisado',brn:'foi queimado',frz:'foi congelado',psn:'foi envenenado',tox:'foi gravemente envenenado',slp:'adormeceu'};
const MV={},SP={};
`Body Slam|nor|p|85|100|15|par30
Quick Attack|nor|p|40|100|30|pr1
Extreme Speed|nor|p|80|100|5|pr2
Giga Impact|nor|p|150|90|5|rch
Swift|nor|s|60|101|20
Slash|nor|p|70|100|20
Snore|nor|s|50|100|15|snore
Swords Dance|nor|-|0|101|20|sb:atk2
Recover|nor|-|0|101|10|heal
Slack Off|nor|-|0|101|10|heal
Calm Mind|psy|-|0|101|20|sb:spa1+spd1
Amnesia|psy|-|0|101|20|sb:spd2
Reflect|psy|-|0|101|20|refl
Rest|psy|-|0|101|10|rest
Psychic|psy|s|90|100|10
Charm|fai|-|0|100|20|tb:atk-2
Play Rough|fai|p|90|90|10
Waterfall|wat|p|80|100|15
Aqua Jet|wat|p|40|100|20|pr1
Surf|wat|s|90|100|15
Brine|wat|s|65|100|10|brine
Hydro Cannon|wat|s|150|90|5|rch
Whirlpool|wat|s|35|85|15|ni
Rain Dance|wat|-|0|101|5|ni
Flamethrower|fir|s|90|100|15|brn10
Fire Punch|fir|p|75|100|15|brn10
Flare Blitz|fir|p|120|100|15|rec33
Blast Burn|fir|s|150|90|5|rch
Fire Spin|fir|s|35|85|15|ni
Sunny Day|fir|-|0|101|5|ni
Will-O-Wisp|fir|-|0|85|15|brn
Thunderbolt|ele|s|90|100|15|par10
Thunder|ele|s|110|70|10|par30
Volt Tackle|ele|p|120|100|15|rec33
Thunder Wave|ele|-|0|90|20|par
Giga Drain|gra|s|75|100|10|drain
Energy Ball|gra|s|90|100|10
Solar Beam|gra|s|120|100|10|chg
Frenzy Plant|gra|s|150|90|5|rch
Sleep Powder|gra|-|0|75|15|slp
Synthesis|gra|-|0|101|5|heal
Blizzard|ice|s|110|70|5|frz10
Ice Beam|ice|s|90|100|10|frz10
Ice Punch|ice|p|75|100|15|frz10
Mach Punch|fig|p|40|100|30|pr1
Brick Break|fig|p|75|100|15
Focus Blast|fig|s|120|70|5
Sludge Bomb|poi|s|90|100|10|psn30
Toxic|poi|-|0|90|10|tox
Earthquake|gro|p|100|100|10
Earth Power|gro|s|90|100|10
Mud-Slap|gro|s|20|100|10|ni
Brave Bird|fly|p|120|100|15|rec33
Aerial Ace|fly|p|60|101|20
Wing Attack|fly|p|60|100|35
Air Slash|fly|s|75|95|15
Aeroblast|fly|s|100|95|5
Bug Buzz|bug|s|90|100|10
Stone Edge|roc|p|100|80|5
Rock Slide|roc|p|75|90|10
Shadow Ball|gho|s|80|100|15
Dragon Claw|dra|p|80|100|15
Dragon Pulse|dra|s|85|100|10
Crunch|dar|p|80|100|15
Dark Pulse|dar|s|80|100|15
Iron Head|ste|p|80|100|15
Iron Tail|ste|p|100|75|15
Flash Cannon|ste|s|80|100|10`.split('\n').forEach(l=>{const[n,t,c,p,a,pp,fx]=l.split('|');MV[n]={n,t,c,p:+p,a:+a,pp:+pp,fx:fx||''}});
const STR={n:'Struggle',t:'nor',c:'p',p:50,a:101,pp:1,fx:'rec25'};
`Marill|183|wat/fai|70,20,50,20,50,40|Huge Power|Waterfall,Aqua Jet,Play Rough,Body Slam,Surf|0
Azumarill|184|wat/fai|100,50,80,60,80,50|Huge Power|Waterfall,Play Rough,Aqua Jet,Ice Punch,Body Slam,Surf|0
Gastly|92|gho/poi|30,35,30,100,35,80|Levitate|Shadow Ball,Sludge Bomb,Thunderbolt,Will-O-Wisp,Dark Pulse|0
Gengar|94|gho/poi|60,65,60,130,75,110|Levitate|Shadow Ball,Sludge Bomb,Focus Blast,Thunderbolt,Will-O-Wisp,Energy Ball|0
Weezing|110|poi|65,90,120,85,70,60|Levitate|Sludge Bomb,Will-O-Wisp,Flamethrower,Thunderbolt,Toxic|0
Ninetales|38|fir|73,76,75,81,100,100|Flash Fire|Flamethrower,Will-O-Wisp,Energy Ball,Dark Pulse,Shadow Ball,Psychic|0
Arcanine|59|fir|90,110,80,100,80,95|Intimidate/Flash Fire|Flare Blitz,Extreme Speed,Crunch,Flamethrower,Will-O-Wisp,Iron Head|1
Gyarados|130|wat/fly|95,125,79,60,100,81|Intimidate|Waterfall,Earthquake,Crunch,Stone Edge,Ice Beam,Surf|1
Slowbro|80|wat/psy|95,75,110,100,80,30|Regenerator|Surf,Psychic,Ice Beam,Thunder Wave,Slack Off,Flamethrower|0
Skarmory|227|ste/fly|65,80,140,40,70,70|Sturdy|Brave Bird,Iron Head,Aerial Ace,Stone Edge,Toxic,Swords Dance|0
Steelix|208|ste/gro|75,85,200,55,65,30|Sturdy|Iron Head,Earthquake,Stone Edge,Crunch,Toxic,Rock Slide|0
Aggron|306|ste/roc|70,110,180,60,60,50|Sturdy|Iron Head,Earthquake,Rock Slide,Stone Edge,Fire Punch,Ice Punch|1
Golem|76|roc/gro|80,120,130,55,65,45|Sturdy|Earthquake,Stone Edge,Rock Slide,Fire Punch,Ice Punch,Brick Break|0
Medicham|308|fig/psy|60,60,75,60,75,80|Huge Power|Mach Punch,Brick Break,Ice Punch,Fire Punch,Psychic|0
Dragonite|149|dra/fly|91,134,95,100,100,80|Multiscale|Extreme Speed,Dragon Claw,Earthquake,Fire Punch,Ice Punch,Aerial Ace|1
Flygon|330|gro/dra|80,100,80,80,80,100|Levitate|Earthquake,Dragon Claw,Rock Slide,Fire Punch,Bug Buzz,Earth Power|1
Salamence|373|dra/fly|95,135,80,110,80,100|Intimidate|Dragon Claw,Earthquake,Flamethrower,Crunch,Aerial Ace,Iron Head|1
Tangrowth|465|gra|100,100,125,110,50,50|Regenerator|Giga Drain,Earthquake,Sludge Bomb,Energy Ball|0
Toxapex|748|poi/wat|50,63,152,53,142,35|Regenerator|Sludge Bomb,Surf,Recover,Toxic,Ice Beam|0
Latios|381|dra/psy|80,90,80,130,110,110|Levitate|Dragon Pulse,Psychic,Shadow Ball,Thunderbolt,Recover,Calm Mind|2
Heatran|485|fir/ste|91,90,106,130,106,77|Flash Fire|Flamethrower,Flash Cannon,Earth Power,Stone Edge,Toxic|2
Lugia|249|psy/fly|106,90,130,90,154,110|Multiscale|Aeroblast,Psychic,Ice Beam,Earthquake,Recover,Calm Mind|2
Landorus-T|645|gro/fly|89,145,90,105,80,91|Intimidate|Earthquake,Stone Edge,Rock Slide,Earth Power,Sludge Bomb,Swords Dance|2
Pikachu|25|ele|35,55,40,50,50,90|Static|-|9
Espeon|196|psy|65,65,60,130,95,110|Synchronize|-|9
Lapras|131|wat/ice|130,85,80,85,95,60|Shell Armor|-|9
Snorlax|143|nor|160,110,65,65,110,30|Thick Fat|-|9
Venusaur|3|gra/poi|80,82,83,100,100,80|Overgrow|-|9
Charizard|6|fir/fly|78,84,78,109,85,100|Blaze|-|9
Blastoise|9|wat|79,83,100,85,105,78|Torrent|-|9`.split('\n').forEach(l=>{const[n,d,t,b,a,m,k]=l.split('|');SP[n]={n,d:+d,t:t.split('/'),b:b.split(',').map(Number),a:a.split('/'),m:m.split(','),k:+k}});
const RED={gsc:{n:'Gold/Silver/Crystal',h:0,t:[['Pikachu',81,'','',['Charm','Quick Attack','Thunder','Thunderbolt']],['Espeon',73,'','',['Mud-Slap','Swift','Reflect','Psychic']],['Snorlax',75,'','',['Amnesia','Snore','Rest','Body Slam']],['Venusaur',77,'','',['Sunny Day','Giga Drain','Synthesis','Solar Beam']],['Charizard',77,'','',['Flamethrower','Wing Attack','Slash','Fire Spin']],['Blastoise',77,'','',['Rain Dance','Blizzard','Surf','Whirlpool']]]},
hgss:{n:'HeartGold/SoulSilver',h:1,t:[['Pikachu',88,'Static','Light Ball',['Volt Tackle','Iron Tail','Thunderbolt','Quick Attack']],['Lapras',80,'Shell Armor','',['Blizzard','Brine','Psychic','Body Slam']],['Snorlax',82,'Thick Fat','',['Blizzard','Shadow Ball','Crunch','Giga Impact']],['Venusaur',84,'Overgrow','',['Sleep Powder','Giga Drain','Sludge Bomb','Frenzy Plant']],['Charizard',84,'Blaze','',['Flare Blitz','Air Slash','Dragon Pulse','Blast Burn']],['Blastoise',84,'Torrent','',['Hydro Cannon','Blizzard','Flash Cannon','Focus Blast']]]}};
let last='';
const calc=(b,L,iv,ev,n)=>{const u=[1,2,5,3,4][n/5|0],d=[1,2,5,3,4][n%5];return b.map((x,i)=>{const v=Math.floor((2*x+iv[i]+(ev[i]>>2))*L/100);return i?Math.floor((v+5)*(u==d?1:i==u?1.1:i==d?.9:1)):v+L+10})};
const build=(o,sd)=>{const m={...o,sd};m.st=calc(o.s.b,o.lv,o.iv,o.ev,o.nat);m.mhp=m.hp=m.st[0];m.mv=o.mv.map(n=>({n,pp:MV[n].pp}));m.sg={atk:0,def:0,spa:0,spd:0,spe:0};m.stt=null;m.age=0;return m};
const redO=r=>({s:SP[r[0]],lv:r[1],ab:r[2]||null,it:r[3]||null,nat:0,iv:Array(6).fill(31),ev:Array(6).fill(0),mv:r[4]});
const sh=a=>{a=[...a];for(let i=a.length;i>1;){const j=R(i--);[a[i],a[j]]=[a[j],a[i]]}return a};
const wp=l=>{let r=Math.random()*l.reduce((a,x)=>a+x[1],0);for(const x of l)if((r-=x[1])<=0)return x[0];return l[l.length-1][0]};
function lvFor(s){const b=s.b.reduce((x,y)=>x+y),[lo,hi]=b<420?[85,100]:b<520?[80,95]:b<600?[75,90]:[70,85];let l=lo+R(hi-lo+1);if(!R(5))l+=R(7)-3;return Math.max(70,Math.min(100,l))}
function mk(s,mv0,ab0,lv0){
 const ab=ab0||pick(s.a),iv=s.b.map(()=>R(32)),ev=[0,0,0,0,0,0],ix=[0,1,2,3,4,5];
 ev[ix.splice(R(6),1)[0]]=252;ev[ix.splice(R(5),1)[0]]=252;ev[pick(ix)]=4;
 let mv=mv0;if(!mv)for(let t=0;t<20;t++){mv=sh(s.m).slice(0,4);if(mv.filter(n=>MV[n].c!='-').length>=2)break}
 const dm=mv.filter(n=>MV[n].c!='-'),ph=dm.filter(n=>MV[n].c=='p').length,its=['Leftovers','Life Orb','Rocky Helmet','Sitrus Berry','Choice Scarf'];
 if(ph>=2&&s.b[1]>=s.b[3])its.push('Choice Band');if(dm.length-ph>=2&&s.b[3]>s.b[1])its.push('Choice Specs');
 if(dm.length>=3)its.push('Assault Vest');if(ab!='Sturdy')its.push('Focus Sash');
 return{s,lv:lv0||lvFor(s),ab,it:pick(its),nat:R(25),iv,ev,mv}}
function localTeam(){
 const pool=Object.values(SP).filter(s=>s.k<9);let tm,k;
 for(let t=0;t<8;t++){const ch=[];while(ch.length<6)ch.push(wp(pool.filter(s=>!ch.includes(s)).map(s=>[s,[1,.7,.25][s.k]])));tm=ch.map(s=>mk(s));k=tm.map(o=>o.s.n).sort().join();if(k!=last)break}
 return tm}
const tc=s=>s.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const TK={normal:'nor',fire:'fir',water:'wat',electric:'ele',grass:'gra',ice:'ice',fighting:'fig',poison:'poi',ground:'gro',flying:'fly',psychic:'psy',bug:'bug',rock:'roc',ghost:'gho',dragon:'dra',dark:'dar',steel:'ste',fairy:'fai'};
const PIN={Blaze:'fir',Torrent:'wat',Overgrow:'gra',Swarm:'bug'},IM={Levitate:'gro','Flash Fire':'fir','Water Absorb':'wat','Volt Absorb':'ele','Sap Sipper':'gra','Motor Drive':'ele'},CTA={Static:'par','Flame Body':'brn','Poison Point':'psn'};
const IMPL=new Set(['Intimidate','Levitate','Flash Fire','Huge Power','Pure Power','Sturdy','Regenerator','Multiscale','Thick Fat','Heatproof','Static','Flame Body','Poison Point','Rough Skin','Iron Barbs','Shell Armor','Battle Armor','Blaze','Torrent','Overgrow','Swarm','Water Absorb','Volt Absorb','Sap Sipper','Motor Drive','Technician','Adaptability','Guts','Filter','Solid Rock','Prism Armor']);
const VGP='scarlet-violet,sword-shield,ultra-sun-ultra-moon,sun-moon,omega-ruby-alpha-sapphire,x-y,black-2-white-2,black-white,heartgold-soulsilver,platinum,diamond-pearl,emerald,ruby-sapphire,crystal,gold-silver,yellow,red-blue'.split(',');
const SUP=/^(damage|ailment|net-good-stats|heal|damage\+ailment|damage\+lower|damage\+raise|damage\+heal)$/,BAD=/recharge|charge|first turn|next turn|only |fail|faint|switch|protect|weather|sunny|rain|sand|hail|terrain|trap|spike|stealth|bypass|copy|swap|random|screen|ignore|multiple|twice|2-5|accuracy|evasion|form|power|weigh|depend|based|double/i;
const AM={paralysis:'par',burn:'brn',poison:'psn',sleep:'slp',freeze:'frz'},SN={attack:'atk',defense:'def','special-attack':'spa','special-defense':'spd',speed:'spe'};
const STO=typeof localStorage!='undefined'?localStorage:(m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)}))(new Map());
const cache=(k,v)=>{try{if(v===undefined){const x=STO.getItem('pk2:'+k);return x?JSON.parse(x):null}STO.setItem('pk2:'+k,JSON.stringify(v))}catch(_){return null}};
const cached=async(k,f)=>{let v=cache(k);if(v)return v;v=await f();cache(k,v);return v};
const api=async p=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);try{const r=await fetch('https://pokeapi.co/api/v2/'+p,{signal:c.signal});if(!r.ok)throw Error(r.status);return await r.json()}finally{clearTimeout(t)}};
const spc=id=>cached('s'+id,async()=>{const j=await api('pokemon-species/'+id);return{l:j.is_legendary||j.is_mythical,v:j.varieties.map(x=>x.pokemon.name)}});
const pk=n=>cached('p'+n,async()=>{const j=await api('pokemon/'+n),all=j.moves.flatMap(x=>x.version_group_details.map(d=>d.version_group.name)),vg=VGP.find(v=>all.includes(v)),o=j.sprites.other;
 return{n:tc(j.name),id:j.id,d:+j.species.url.split('/').filter(Boolean).pop(),t:j.types.map(x=>TK[x.type.name]),b:j.stats.map(x=>x.base_stat),a:j.abilities.map(x=>tc(x.ability.name)),img:(o&&o['official-artwork']&&o['official-artwork'].front_default)||j.sprites.front_default,
 m:j.moves.map(x=>{const ds=x.version_group_details.filter(d=>d.version_group.name==vg&&d.move_learn_method.name!='form-change');return ds.length&&[x.move.name,Math.min(...ds.map(d=>d.move_learn_method.name=='level-up'?d.level_learned_at:0))]}).filter(Boolean)}});
const mj=n=>cached('m'+n,async()=>{
 const j=await api('move/'+n),me=j.meta||{},c={physical:'p',special:'s',status:'-'}[j.damage_class.name],t=j.target.name,cat=(me.category||{}).name||'',ail=(me.ailment||{}).name||'none',st=j.stat_changes||[],
  ef=((j.effect_entries||[]).find(x=>x.language.name=='en')||{}).short_effect||'',foe=/selected-pokemon|all-opponents|all-other-pokemon|random-opponent/.test(t);
 let ok=c&&n!='roost'&&TK[j.type.name]&&SUP.test(cat)&&!BAD.test(ef)&&j.pp&&j.priority>=0&&!me.min_hits&&!me.flinch_chance&&!me.max_turns&&(ail=='none'||(AM[ail]&&!(c!='-'&&ail=='sleep')))&&st.every(x=>SN[x.stat.name]);
 ok=ok&&(c=='-'?(t=='user'||foe)&&(cat!='heal'||t=='user'):j.power&&foe);
 if(!ok)return{x:1};
 const f=[];if(j.priority>0)f.push('pr'+j.priority);if(me.crit_rate)f.push('cr'+me.crit_rate);
 if(AM[ail])f.push(c=='-'?(ail=='poison'&&/badly/i.test(ef)?'tox':AM[ail]):AM[ail]+(me.ailment_chance||100));
 if(me.drain>0)f.push('drn'+me.drain);if(me.drain<0)f.push('rec'+-me.drain);if(me.healing>0&&c=='-')f.push('heal'+me.healing);
 st.forEach(x=>f.push(c=='-'?(t=='user'?'sb:':'tb:')+SN[x.stat.name]+x.change:`ds${me.stat_chance||100}${cat=='damage+raise'||(cat=='damage+lower'&&!me.stat_chance)?'u':'t'}${SN[x.stat.name]}${x.change}`));
 return{n:tc(n),t:TK[j.type.name],c,p:j.power||0,a:j.accuracy??101,pp:j.pp,tg:t,fx:f.join(',')}});
async function liveMon(cnt,used){
 for(let t=0;t<30;t++){
  const id=1+R(cnt),s=await spc(id);
  if(used.has(id)||(s.l&&Math.random()<.6))continue;
  const p=await pk(pick(s.v.filter((v,i)=>!i||/-(alola|galar|hisui|paldea)/.test(v)))),lv=lvFor(p);
  const pl=sh(p.m.filter(x=>x[1]<=lv).map(x=>x[0])),got=[];
  for(let i=0;i<pl.length&&got.length<8;i+=8)(await Promise.all(pl.slice(i,i+8).map(mj))).forEach(m=>{if(!m.x)got.push(m)});
  const at=got.filter(m=>m.c!='-'),su=got.filter(m=>m.c=='-'),ns=Math.min(su.length,R(3)),mv=[...sh(at).slice(0,4-ns),...sh(su).slice(0,ns)];
  if(at.length<2||mv.length<4||used.has(id))continue;
  used.add(id);mv.forEach(m=>MV[m.n]=m);
  const im=p.a.filter(a=>IMPL.has(a));
  return mk(p,mv.map(m=>m.n),pick(im.length?im:p.a),lv)}
 throw Error('sem espécie válida')}
const liveTeam=async()=>{const c=await cached('cnt',async()=>(await api('pokemon-species?limit=1')).count),u=new Set();return Promise.all(Array.from({length:6},()=>liveMon(c,u)))};
;`Hypnosis|psy|-|0|60|20|slp
Leaf Storm|gra|s|130|90|5|ds100uspa-2
Trick Room|psy|-|0|101|5|ni
Megahorn|bug|p|120|85|10
Thunder Fang|ele|p|65|95|15|par10,ni
Thunder Punch|ele|p|75|100|15|par10
Dynamic Punch|fig|p|100|50|5|ni
Ice Fang|ice|p|65|95|15|frz10,ni
Dragon Dance|dra|-|0|101|20|sb:atk1+spe1
Return|nor|p|102|100|20
Roar|nor|-|0|101|20|ni
Whirlwind|nor|-|0|101|20|ni
Mirror Move|fly|-|0|101|20|ni`.split('\n').forEach(l=>{const[n,t,c,p,a,pp,fx]=l.split('|');MV[n]={n,t,c,p:+p,a:+a,pp:+pp,fx:fx||''}});
;`Exeggutor|103|gra/psy|95,95,85,125,75,55|Chlorophyll|-|9
Rhydon|112|gro/roc|105,130,120,45,45,40|Rock Head|-|9
Machamp|68|fig|90,130,80,65,85,55|No Guard|-|9
Pidgeot|18|nor/fly|83,80,75,70,70,101|Tangled Feet|-|9`.split('\n').forEach(l=>{const[n,d,t,b,a,m,k]=l.split('|');SP[n]={n,d:+d,t:t.split('/'),b:b.split(',').map(Number),a:a.split('/'),m:m.split(','),k:+k}});
const BLUE=[['Exeggutor',55,'Chlorophyll','',['Psychic','Hypnosis','Leaf Storm','Trick Room']],['Rhydon',58,'Rock Head','',['Earthquake','Stone Edge','Megahorn','Thunder Fang']],['Machamp',56,'No Guard','',['Thunder Punch','Dynamic Punch','Stone Edge','Earthquake']],['Gyarados',52,'Intimidate','',['Waterfall','Ice Fang','Dragon Dance','Return']],['Arcanine',58,'Intimidate','',['Extreme Speed','Flare Blitz','Dragon Pulse','Roar']],['Pidgeot',60,'Tangled Feet','Sitrus Berry',['Whirlwind','Mirror Move','Return','Air Slash']]];

function Eng(H){let B=null,UID=0;
const SM=s=>s>=0?(2+s)/2:2/(2-s),K=['','atk','def','spa','spd','spe'];
const spd=m=>m.st[5]*SM(m.sg.spe)*(m.it=='Choice Scarf'?1.5:1)*(m.stt=='par'?.25:1);
function stat(m,i){let v=m.st[i]*SM(m.sg[K[i]]);const lb=m.it=='Light Ball'&&m.s.n=='Pikachu';
 if(i==1){if(m.ab=='Huge Power'||m.ab=='Pure Power')v*=2;if(m.ab=='Guts'&&m.stt)v*=1.5;if(m.it=='Choice Band')v*=1.5;if(lb)v*=2}
 if(i==3){if(m.it=='Choice Specs')v*=1.5;if(lb)v*=2}
 if(i==4&&m.it=='Assault Vest')v*=1.5;return v}
function dmg(a,d,M,o){
 const ph=M.c=='p',A=stat(a,ph?1:3),D=stat(d,ph?2:4);let p=M.p;if(M.fx.includes('brine')&&d.hp*2<=d.mhp)p*=2;if(a.ab=='Technician'&&p<=60)p*=1.5;
 const e=eff(M.t,d.s.t);let x=Math.floor(Math.floor(Math.floor(2*a.lv/5+2)*p*A/D)/50)+2;
 if(o.crit)x*=1.5;if(o.sp)x*=.75;x*=o.rnd;if(a.s.t.includes(M.t))x*=a.ab=='Adaptability'?2:1.5;x*=e;if(e>1&&['Filter','Solid Rock','Prism Armor'].includes(d.ab))x*=.75;
 if(ph&&a.stt=='brn'&&a.ab!='Guts')x*=.5;if(ph&&B.refl[d.sd]>0)x*=.5;if(a.it=='Life Orb')x*=1.3;
 if(d.ab=='Multiscale'&&d.hp==d.mhp)x*=.5;if((d.ab=='Thick Fat'&&(M.t=='fir'||M.t=='ice'))||(d.ab=='Heatproof'&&M.t=='fir'))x*=.5;
 if(a.hp*3<=a.mhp&&PIN[a.ab]==M.t)x*=1.5;
 if(a.ff&&M.t=='fir')x*=1.5;return e?Math.max(1,Math.floor(x)):0}
const canSt=(m,s)=>!m.stt&&!(s=='brn'&&m.s.t.includes('fir'))&&!(s=='par'&&m.s.t.includes('ele'))&&!((s=='psn'||s=='tox')&&(m.s.t.includes('poi')||m.s.t.includes('ste')))&&!(s=='frz'&&m.s.t.includes('ice'));
const hit=(m,v)=>{v=Math.min(m.hp,v);m.hp-=v;if(m.hp<=0){m.hp=0;m.fnt=true}return v};
const heal=(m,v)=>{const h=Math.min(m.mhp-m.hp,Math.floor(v));m.hp+=h;return h};
async function faint(m){if(!m.sy){m.sy=1;await say(`${lab(m)} desmaiou!`)}}
async function post(m){if(m.it=='Sitrus Berry'&&!m.fnt&&m.hp*2<=m.mhp){m.it=null;heal(m,m.mhp/4);await say(`${lab(m)} comeu a Sitrus Berry!`)}}
async function sm(a,d,M,F,A,D){
 if(M.a<=100&&R(100)>=M.a){await say(`O golpe de ${A} errou!`);return}
 for(const f of F){let g;
  if(g=f.match(/^heal(\d*)$/)){if(a.hp>=a.mhp){await say('Mas falhou!');return}heal(a,a.mhp*(+g[1]||50)/100);await say(`${A} recuperou HP!`)}
  else if(f=='rest'){if(a.hp>=a.mhp||a.stt=='slp'){await say('Mas falhou!');return}a.hp=a.mhp;a.stt='slp';a.sl=2;await say(`${A} dormiu e recuperou todo o HP!`)}
  else if(f=='refl'){if(B.refl[a.sd]){await say('Mas falhou!');return}B.refl[a.sd]=5;await say(`Reflect protege a equipe de ${A}!`)}
  else if(g=f.match(/^sb:(.+)$/)){g[1].split('+').forEach(x=>{const k=x.slice(0,3);a.sg[k]=Math.max(-6,Math.min(6,a.sg[k]+ +x.slice(3)))});await say(`Os atributos de ${A} subiram!`)}
  else if(g=f.match(/^tb:(\w{3})(-?\d)$/)){d.sg[g[1]]=Math.max(-6,Math.min(6,d.sg[g[1]]+ +g[2]));await say(`${g[1].toUpperCase()} de ${D} ${+g[2]>0?'subiu':'caiu'}!`)}
  else if(/^(par|brn|slp|tox|psn)$/.test(f)){if(!canSt(d,f)){await say(`Não afetou ${D}...`);return}d.stt=f;if(f=='slp')d.sl=1+R(3);if(f=='tox')d.tn=0;await say(`${D} ${STN[f]}!`)}
  else if(f=='ni')await say('(O efeito deste golpe não está implementado.)')}}
async function use(s,x){
 const a=B.sl[s],mi=x.i;if(!a||a.fnt)return;
 const M=mi<0?STR:MV[a.mv[mi].n],F=M.fx.split(','),A=lab(a);
 if(a.stt=='slp'&&!F.includes('snore')){if(a.sl-->0){await say(`${A} está dormindo.`);return}a.stt=null;await say(`${A} acordou!`)}
 if(a.stt=='frz'){if(R(5)){await say(`${A} está congelado!`);return}a.stt=null;await say(`${A} descongelou!`)}
 if(a.stt=='par'&&!R(4)){await say(`${A} está paralisado e não consegue se mover!`);return}
 if(a.rcg){a.rcg=false;await say(`${A} precisa recarregar.`);return}
 if(F.includes('chg')){if(a.chg==null){a.mv[mi].pp--;a.chg=mi;await say(`${A} está absorvendo luz!`);return}a.chg=null}else if(mi>=0)a.mv[mi].pp--;
 if(mi>=0&&a.it&&a.it.startsWith('Choice'))a.lock=M.n;
 await say(`${A} usou ${M.n}!`);
 if(F.includes('snore')&&a.stt!='slp'){await say('Mas falhou!');return}
  const T=tgt(M),fs=foeS(s);let ts;
 if(T=='user')ts=[s];
 else if(T=='all-opponents')ts=fs.filter(alive);
 else if(T=='all-other-pokemon')ts=B.sl.map((_,k)=>k).filter(k=>k!=s&&alive(k));
 else{let k=x.tg;if(!alive(k))k=fs.find(alive);ts=k==null?[]:[k]}
 if(!ts.length){await say('Mas falhou!');return}
 await anim(s,ts,M);
 for(const k of ts)if(alive(k))await hitOne(a,B.sl[k],M,F,A,lab(B.sl[k]),ts.length);
 if(a.dd){a.dd=0;if(a.it=='Life Orb'){hit(a,Math.max(1,a.mhp/10|0));await say(`${A} perdeu HP por causa da Life Orb!`)}if(F.includes('rch'))a.rcg=true}
 await post(a);if(a.fnt)await faint(a)}
async function hitOne(a,d,M,F,A,D,nt){
 if(M.c=='-')return sm(a,d,M,F,A,D);
 if(M.a<=100&&!(B.hail&&M.n=='Blizzard')&&R(100)>=M.a){await say(`O ataque de ${A} errou!`);return}
 if(IM[d.ab]==M.t){if(d.ab=='Flash Fire')d.ff=1;else if(/Absorb/.test(d.ab))heal(d,d.mhp/4);else if(d.ab=='Sap Sipper')d.sg.atk=Math.min(6,d.sg.atk+1);else if(d.ab=='Motor Drive')d.sg.spe=Math.min(6,d.sg.spe+1);await say(`${D} é imune por ${d.ab}!`);return}
 
 const e=eff(M.t,d.s.t);if(!e){await say(`Não afeta ${D}...`);return}
 const crc=+((F.find(f=>/^cr\d/.test(f))||'cr0').slice(2)),crit=!R([16,8,2,1][Math.min(crc,3)])&&d.ab!='Shell Armor'&&d.ab!='Battle Armor';let v=dmg(a,d,M,{crit,rnd:(85+R(16))/100,sp:nt>1});
 if(v>=d.hp&&d.hp==d.mhp&&(d.ab=='Sturdy'||d.it=='Focus Sash')){v=d.hp-1;await say(d.ab=='Sturdy'?`${D} resistiu graças a Sturdy!`:`${D} resistiu com a Focus Sash!`);if(d.ab!='Sturdy')d.it=null}
 hit(d,v);a.dd=1;await hfx(d,v,e,crit);if(crit)await say('Acerto crítico!');if(e>1)await say('Foi super efetivo!');else if(e<1)await say('Não foi muito efetivo...');
 const ct=M.c=='p'&&!['Earthquake','Stone Edge','Rock Slide'].includes(M.n);
 if(ct&&d.it=='Rocky Helmet'){hit(a,Math.floor(a.mhp/6));await say(`${A} se feriu na Rocky Helmet!`)}
 if(ct&&CTA[d.ab]&&canSt(a,CTA[d.ab])&&R(10)<3){a.stt=CTA[d.ab];await say(`${A} ${STN[a.stt]} por ${d.ab}!`)}
 if(ct&&(d.ab=='Rough Skin'||d.ab=='Iron Barbs')){hit(a,Math.max(1,a.mhp>>3));await say(`${A} se feriu por ${d.ab}!`)}
 if(!d.fnt)for(const f of F){const g=f.match(/^(par|brn|frz|psn)(\d+)$/);if(g&&R(100)<+g[2]&&canSt(d,g[1])){d.stt=g[1];await say(`${D} ${STN[g[1]]}!`)}}
 const dn=F.find(f=>/^(drn|drain)/.test(f));if(dn&&heal(a,v*(+dn.slice(3)||50)/100))await say(`${A} drenou energia!`);
 for(const f of F){const g=f.match(/^ds(\d+)([ut])(\w{3})(-?\d)$/);if(g&&R(100)<+g[1]){const z=g[2]=='u'?a:d;if(z==a||!d.fnt){z.sg[g[3]]=Math.max(-6,Math.min(6,z.sg[g[3]]+ +g[4]));await say(`${g[3].toUpperCase()} de ${lab(z)} ${+g[4]>0?'subiu':'caiu'}!`)}}}
 const rc=F.find(f=>/^rec/.test(f));if(rc){hit(a,Math.max(1,Math.floor(v*(+rc.slice(3))/100)));await say(`${A} sofreu dano de recuo!`)}
 
 await post(d);await post(a);if(d.fnt)await faint(d);if(a.fnt)await faint(a)}
const SPREAD={Earthquake:'all-other-pokemon',Surf:'all-other-pokemon','Rock Slide':'all-opponents',Blizzard:'all-opponents'};
const tgt=M=>M.tg||SPREAD[M.n]||(M.c=='-'&&/^(sb:|heal|refl|rest)/.test(M.fx)?'user':'selected-pokemon');
const build2=(o,sd)=>({...build(o,sd),uid:++UID});
const trOf=s=>B.T.find(t=>t.ss.includes(s)),foeS=s=>[...Array(B.n)].map((_,i)=>i+(s<B.n?B.n:0)),allyOf=s=>s<B.n?1-s:B.n+1-(s-B.n),alive=k=>B.sl[k]&&!B.sl[k].fnt,dead=sd=>B.T.filter(t=>t.sd==sd).every(t=>t.party.every(m=>m.fnt));
const lab=m=>(m.sd?B.T[m.tr].nm+': ':'')+m.s.n;
const usable=(P,x)=>x.pp>0&&(!P.lock||P.lock==x.n)&&!(P.it=='Assault Vest'&&MV[x.n].c=='-');
const vm=m=>m&&{u:m.uid,n:m.s.n,id:m.s.id||m.s.d,t:m.s.t,lv:m.lv,hp:m.hp,mhp:m.mhp,st:m.stt,f:m.fnt?1:0,tr:m.tr};
const ev=o=>{B.ev.push({...o,v:{sl:B.sl.map(vm),hail:B.hail,refl:B.refl.slice()}})};
const say=async(t,x)=>ev({k:'say',x:t,...x});
const anim=async(s,ts,M)=>ev({k:'fx',s,ts,n:M.n,t:M.t,c:M.c,f:M.fx});
const hfx=async(d,v,e,cr)=>ev({k:'hit',s:B.sl.indexOf(d),d:v,e,cr});
const mon=m=>({u:m.uid,n:m.s.n,id:m.s.id||m.s.d,d:m.s.d,t:m.s.t,lv:m.lv,hp:m.hp,mhp:m.mhp,st:m.stt,f:m.fnt?1:0,ab:m.ab,it:m.it,nat:m.nat,sa:m.st,mv:m.mv,lock:m.lock||null,tr:m.tr});
const pub=()=>({kind:B.kind,n:B.n,turn:B.turn,end:B.end,rs:B.rs,ask:B.ask,acts:Object.keys(B.acts).map(Number),refl:B.refl,hail:B.hail,T:B.T.map(t=>({nm:t.nm,ai:t.ai,sd:t.sd,ss:t.ss,party:t.party.map(mon)})),sl:B.sl.map(m=>m?[m.tr,B.T[m.tr].party.indexOf(m)]:null)});
const flush=()=>{const e=B.ev;B.ev=[];H.send(e,pub())};
const mvAll=()=>{const o={Struggle:STR};B.T.forEach(t=>t.party.forEach(m=>m.mv.forEach(x=>o[x.n]=MV[x.n])));return o};
async function abEntry(s){const n=B.sl[s];if(n.ab=='Intimidate')for(const k of foeS(s)){const f=B.sl[k];if(f&&!f.fnt){f.sg.atk=Math.max(-6,f.sg.atk-1);await say(`Intimidate de ${lab(n)} reduziu o Ataque de ${lab(f)}!`)}}}
async function swap(s,pi,first){
 const o=B.sl[s],t=trOf(s),n=t.party[pi];
 if(!first&&o&&!o.fnt){if(o.ab=='Regenerator')heal(o,o.mhp/3);await say(`${lab(o)}, volte!`)}
 if(o)Object.assign(o,{sg:{atk:0,def:0,spa:0,spd:0,spe:0},lock:null,chg:null,rcg:false,tn:0,ff:0});
 B.sl[s]=n;n.age=0;
 await say(`${s<B.n?'Vai,':t.nm+' envia'} ${n.s.n}!`);await abEntry(s)}
const matchup=(x,y)=>{const o=Math.max(0,...x.mv.filter(m=>m.pp>0&&MV[m.n].c!='-').map(m=>{const M=MV[m.n];return eff(M.t,y.s.t)*(x.s.t.includes(M.t)?1.5:1)*M.p/100}));return o-Math.max(...y.s.t.map(t=>eff(t,x.s.t)))};
const sur=d=>({...d,st:calc(d.s.b,d.lv,[31,31,31,31,31,31],[0,0,0,0,0,0],0),ab:null,it:null});
function ai(s){
 const a=B.sl[s],fs=foeS(s).filter(alive),ST=/^(par|brn|slp|tox|psn)$/;
 if(!fs.length)return{t:'m',i:-1};
 if(a.chg!=null)return{t:'m',i:a.chg,tg:fs[0]};if(a.rcg)return{t:'m',i:0,tg:fs[0]};
 let b=null,bs=-1,bt=fs[0];
 a.mv.forEach((m,i)=>{
  const M=MV[m.n],F=M.fx.split(','),T=tgt(M),sp=T=='all-opponents'||T=='all-other-pokemon';if(m.pp<=0)return;
  for(const c of(sp||T=='user'?[fs[0]]:fs)){
   const d=B.sl[c],g=sur(d);let sc=0;
   if(M.c!='-'){
    if(F.includes('snore')&&a.stt!='slp')return;
    let tot=0,ko=false;
    for(const k of(sp?fs:[c])){const dd=B.sl[k],x=dmg(a,sur(dd),M,{rnd:.925,sp:sp&&fs.length>1});tot+=x/dd.hp*100;if(x>=dd.hp)ko=true}
    sc=tot*((M.a>100||(B.hail&&M.n=='Blizzard'))?1:M.a/100);
    if(T=='all-other-pokemon'&&B.n>1&&alive(allyOf(s)))sc-=dmg(a,sur(B.sl[allyOf(s)]),M,{rnd:.925,sp:1})/B.sl[allyOf(s)].hp*100;
    if(ko)sc+=60;if(F.includes('rch')&&!ko)sc*=.55;if(F.includes('chg'))sc*=.7;if(F.some(f=>/^rec/.test(f)))sc*=.9;if(a.stt=='slp'&&!F.includes('snore'))sc*=.1;
   }else{
    const sf=F.find(f=>ST.test(f)),sb=F.find(f=>/^sb:/.test(f));
    if(sf)sc=(canSt(d,sf)&&d.hp>d.mhp*.5)?42:0;
    else if(F.some(f=>/^heal/.test(f)))sc=a.hp<a.mhp*.5?58:0;
    else if(F.includes('rest'))sc=(a.hp<a.mhp*.4&&a.stt!='slp')?52:0;
    else if(F.includes('refl'))sc=(!B.refl[a.sd]&&g.st[1]>g.st[3])?30:0;
    else if(sb)sc=(a.hp>a.mhp*.6&&a.sg[sb.slice(3,6)]<2)?32:0;
    else if(F.some(f=>/^tb:/.test(f)))sc=(d.sg.atk>-2&&g.st[1]>g.st[3])?26:0;
    if(a.stt=='slp')sc=0}
   sc+=Math.random()*6;if(sc>bs){bs=sc;b=i;bt=c}}});
 const d=B.sl[bt],alt=B.T[a.tr].party.map((m,i)=>[m,i]).filter(([m])=>!m.fnt&&!B.sl.includes(m));
 if(alt.length&&a.age>=2&&d){const cur=matchup(a,d),[m2,i2]=alt.sort((x,y)=>matchup(y[0],d)-matchup(x[0],d))[0];
  if(matchup(m2,d)>=cur+1.5&&(bs<45||cur<-.5)&&R(100)<55)return{t:'s',i:i2}}
 return{t:'m',i:b===null?-1:b,tg:bt}}
const bestRep=(rs,s)=>{const f=foeS(s).find(alive),d=B.sl[f]||B.sl.find(x=>x&&!x.fnt);return rs.reduce((b,m)=>matchup(m,d)+m.hp/m.mhp>matchup(b,d)+b.hp/b.mhp?m:b)};
async function eot(){
 for(const m of B.sl.filter(x=>x&&!x.fnt)){
  if(B.hail&&!m.s.t.includes('ice')){hit(m,Math.max(1,m.mhp>>4));await say(`O granizo castiga ${lab(m)}!`)}
  if(!m.fnt&&m.stt=='brn'){hit(m,Math.max(1,m.mhp>>3));await say(`${lab(m)} sofre com a queimadura!`)}
  if(!m.fnt&&m.stt=='psn'){hit(m,Math.max(1,m.mhp>>3));await say(`${lab(m)} sofre com o veneno!`)}
  if(!m.fnt&&m.stt=='tox'){m.tn=Math.min((m.tn||0)+1,15);hit(m,Math.max(1,m.mhp*m.tn/16|0));await say(`${lab(m)} sofre com o veneno!`)}
  if(!m.fnt&&m.it=='Leftovers'&&m.hp<m.mhp){heal(m,Math.max(1,m.mhp/16));await say(`${lab(m)} recuperou HP com Leftovers.`)}
  if(!m.fnt)await post(m);if(m.fnt)await faint(m)}
 for(const s of[0,1])if(B.refl[s]>0&&--B.refl[s]==0)await say(`Reflect ${s?'dos adversários':'do seu time'} acabou.`)}
const askSwitch=s=>new Promise(r=>{B.rs=s;B.pr=r;B.run=0;flush()});
async function finish(r){B.end=r;B.run=0;await say(r=='win'?'Vocês venceram a batalha!':'Vocês perderam a batalha...',{end:r});flush()}
function newTurn(){B.turn++;B.run=0;B.acts={};B.ask=[];for(const t of B.T)if(!t.ai)for(const s of t.ss)if(alive(s))B.ask.push(s);flush()}
async function runTurn(){
 if(B.run)return;B.run=1;
 const q=[];for(const t of B.T)for(const s of t.ss)if(alive(s))q.push([s,t.ai?ai(s):B.acts[s]]);
 const key=([s,x])=>[x.t=='s'?9:x.i<0?0:+((MV[B.sl[s].mv[x.i].n].fx.match(/pr(\d)/)||[])[1]||0),x.t=='s'?0:spd(B.sl[s])+Math.random()*.5];
 q.sort((u,v)=>{const a=key(u),b=key(v);return b[0]-a[0]||b[1]-a[1]});
 for(const[s,x]of q){if(!alive(s)||!x)continue;if(x.t=='s')await swap(s,x.i);else await use(s,x);if(dead(0)||dead(1))break}
 await eot();
 if(dead(1))return finish('win');if(dead(0))return finish('lose');
 for(let s=0;s<2*B.n;s++){const m=B.sl[s];if(!m||!m.fnt)continue;const t=B.T[m.tr],rs=t.party.filter(x=>!x.fnt&&!B.sl.includes(x));
  if(!rs.length){B.sl[s]=null;continue}
  let pi;if(t.ai)pi=t.party.indexOf(bestRep(rs,s));else{pi=await askSwitch(s);B.rs=null;B.pr=null;B.run=1}
  await swap(s,pi,1)}
 newTurn()}
function init(c){
 const n=c.kind=='s'?1:2,v=c.ver||'hgss',P=c.teams,rd=(l,nm,ss)=>({nm,ai:1,sd:1,ss,party:l.map(x=>build2(redO(x),1))}),me=(nm,ss,o)=>({nm,ai:0,sd:0,ss,party:o.map(x=>build2(x,0))});
 const T=c.kind=='s'?[me('Você',[0],P[0]),rd(RED[v].t,'Red',[1])]:c.kind=='d'?[me('Você',[0,1],P[0]),rd(RED.hgss.t,'Red',[2]),rd(BLUE,'Blue',[3])]:[me(c.names[0],[0],P[0]),me(c.names[1],[1],P[1]),rd(RED.hgss.t,'Red',[2]),rd(BLUE,'Blue',[3])];
 T.forEach((t,i)=>t.party.forEach(m=>m.tr=i));
 B={kind:c.kind,n,T,sl:Array(2*n).fill(null),refl:[0,0],hail:c.kind=='s'?RED[v].h:0,turn:0,end:null,acts:{},ask:[],run:1,rs:null,pr:null,ev:[]}}
async function start(){
 const tr=B.T.filter(t=>t.ai);
 await say(`${tr.map(t=>t.nm).join(' e ')} quer${tr.length>1?'em':''} batalhar!`,{tr:tr.map(t=>t.nm.toLowerCase())});
 for(let s=0;s<2*B.n;s++)await swap(s,trOf(s).ss.indexOf(s),1);
 newTurn()}
function act(s,a,turn){
 if(!B||B.end||B.run)return'Aguarde a resolução do turno.';
 if(turn!=null&&turn!==B.turn)return'Turno inválido.';
 if(!B.ask.includes(s))return'Esse Pokémon não precisa de ação.';
 if(B.acts[s]!=null)return'Ação já confirmada.';
 const P=B.sl[s];if(!a||!P)return'Ação inválida.';
 if(a.t=='m'){
  const mv=P.mv[a.i],ok=a.i<0?!P.mv.some(x=>usable(P,x)):mv&&usable(P,mv);if(!ok)return'Movimento indisponível.';
  const M=a.i<0?STR:MV[mv.n],fs=foeS(s).filter(alive);a={t:'m',i:a.i,tg:fs.includes(a.tg)?a.tg:fs[0]};if(!fs.length)return'Sem alvo.'}
 else if(a.t=='s'){const t=B.T[P.tr],m=t.party[a.i];if(!m||m.fnt||B.sl.includes(m)||Object.entries(B.acts).some(([q,x])=>x.t=='s'&&x.i==a.i&&B.sl[q].tr==P.tr))return'Troca inválida.';a={t:'s',i:a.i}}
 else return'Ação inválida.';
 B.acts[s]=a;
 if(B.ask.every(q=>B.acts[q]!=null))runTurn().catch(e=>console.error(e));else flush();
 return null}
function rep(s,i){
 if(!B||B.rs!==s||!B.pr)return'Nenhuma troca pendente para este Pokémon.';
 const m=trOf(s).party[i];if(!m||m.fnt||B.sl.includes(m))return'Pokémon inválido.';
 const r=B.pr;B.pr=null;r(i);return null}
return{init,start,act,rep,pub,mvAll}}

if(typeof module!='undefined')module.exports={Eng,liveTeam,localTeam,build,MV,SP,RED,BLUE};
