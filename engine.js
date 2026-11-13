
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
const build=(o,sd)=>{const m={...o,sd};m.st=calc(o.s.b,o.lv,o.iv,o.ev,o.nat);if(o.boss){m.st[5]=150;m.it=null}m.mhp=m.hp=m.st[0];m.mv=o.mv.map(n=>({n,pp:MV[n].pp,lm:o.lm&&o.lm[n]}));m.sg={atk:0,def:0,spa:0,spd:0,spe:0};m.stt=null;m.age=0;return m};
const redO=r=>({s:SP[r[0]],lv:r[1],ab:r[2]||null,it:r[3]||null,nat:0,iv:Array(6).fill(31),ev:Array(6).fill(0),mv:r[4]});
const sh=a=>{a=[...a];for(let i=a.length;i>1;){const j=R(i--);[a[i],a[j]]=[a[j],a[i]]}return a};
const wp=l=>{let r=Math.random()*l.reduce((a,x)=>a+x[1],0);for(const x of l)if((r-=x[1])<=0)return x[0];return l[l.length-1][0]};
function lvFor(s){const b=s.b.reduce((x,y)=>x+y),[lo,hi]=b<420?[85,100]:b<520?[80,95]:b<600?[75,90]:[70,85];let l=lo+R(hi-lo+1);if(!R(5))l+=R(7)-3;return Math.max(70,Math.min(100,l))}
function mk(s,mv0,ab0,lv0,lm0){
 const ab=ab0||pick(s.a),iv=s.b.map(()=>R(32)),ev=[0,0,0,0,0,0],ix=[0,1,2,3,4,5];
 ev[ix.splice(R(6),1)[0]]=252;ev[ix.splice(R(5),1)[0]]=252;ev[pick(ix)]=4;
 let mv=mv0;if(!mv)for(let t=0;t<20;t++){mv=sh(s.m).slice(0,4);if(mv.filter(n=>MV[n].c!='-').length>=2)break}
 const dm=mv.filter(n=>MV[n].c!='-'),ph=dm.filter(n=>MV[n].c=='p').length,its=['Leftovers','Life Orb','Rocky Helmet','Sitrus Berry','Choice Scarf','Heavy-Duty Boots'];
 if(ph>=2&&s.b[1]>=s.b[3])its.push('Choice Band');if(dm.length-ph>=2&&s.b[3]>s.b[1])its.push('Choice Specs');
 if(dm.length>=3)its.push('Assault Vest');if(ab!='Sturdy')its.push('Focus Sash');
 return{s,lv:lv0||lvFor(s),ab,it:pick(its),nat:pickNat(s,mv),iv,ev,mv,lm:lm0}}
function localTeam(){
 const pool=Object.values(SP).filter(s=>s.k<9);let tm,k;
 for(let t=0;t<8;t++){const ch=[];while(ch.length<6)ch.push(wp(pool.filter(s=>!ch.includes(s)).map(s=>[s,[1,.7,.25][s.k]])));tm=ch.map(s=>mk(s));k=tm.map(o=>o.s.n).sort().join();if(k!=last)break}
 return tm}
const tc=s=>s.replace(/-/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
const TK={normal:'nor',fire:'fir',water:'wat',electric:'ele',grass:'gra',ice:'ice',fighting:'fig',poison:'poi',ground:'gro',flying:'fly',psychic:'psy',bug:'bug',rock:'roc',ghost:'gho',dragon:'dra',dark:'dar',steel:'ste',fairy:'fai'};
const PIN={Blaze:'fir',Torrent:'wat',Overgrow:'gra',Swarm:'bug'},IM={Levitate:'gro','Flash Fire':'fir','Water Absorb':'wat','Volt Absorb':'ele','Sap Sipper':'gra','Motor Drive':'ele'},CTA={Static:'par','Flame Body':'brn','Poison Point':'psn'};
const IMPL=new Set(['Pressure','Clear Body','White Smoke','Full Metal Body','Hyper Cutter','Contrary','Simple','Defiant','Competitive','Intimidate','Levitate','Flash Fire','Huge Power','Pure Power','Sturdy','Regenerator','Multiscale','Thick Fat','Heatproof','Static','Flame Body','Poison Point','Rough Skin','Iron Barbs','Shell Armor','Battle Armor','Blaze','Torrent','Overgrow','Swarm','Water Absorb','Volt Absorb','Sap Sipper','Motor Drive','Technician','Adaptability','Guts','Filter','Solid Rock','Prism Armor']);
const VGP='scarlet-violet,sword-shield,ultra-sun-ultra-moon,sun-moon,omega-ruby-alpha-sapphire,x-y,black-2-white-2,black-white,heartgold-soulsilver,platinum,diamond-pearl,emerald,ruby-sapphire,crystal,gold-silver,yellow,red-blue'.split(',');
const SUP=/^(damage|ailment|net-good-stats|heal|damage\+ailment|damage\+lower|damage\+raise|damage\+heal)$/,BAD=/recharge|charge|first turn|next turn|only |fail|faint|switch|protect|weather|sunny|rain|sand|hail|terrain|trap|spike|stealth|bypass|copy|swap|random|screen|ignore|multiple|twice|2-5|accuracy|evasion|form|power|weigh|depend|based|double/i;
const AM={paralysis:'par',burn:'brn',poison:'psn',sleep:'slp',freeze:'frz'},SN={attack:'atk',defense:'def','special-attack':'spa','special-defense':'spd',speed:'spe'};
const STO=typeof localStorage!='undefined'?localStorage:(m=>({getItem:k=>m.get(k)??null,setItem:(k,v)=>m.set(k,v)}))(new Map());
const cache=(k,v)=>{try{if(v===undefined){const x=STO.getItem('pk3:'+k);return x?JSON.parse(x):null}STO.setItem('pk3:'+k,JSON.stringify(v))}catch(_){return null}};
const cached=async(k,f)=>{let v=cache(k);if(v)return v;v=await f();cache(k,v);return v};
const api=async p=>{const c=new AbortController(),t=setTimeout(()=>c.abort(),9000);try{const r=await fetch('https://pokeapi.co/api/v2/'+p,{signal:c.signal});if(!r.ok)throw Error(r.status);return await r.json()}finally{clearTimeout(t)}};
const spc=id=>cached('s'+id,async()=>{const j=await api('pokemon-species/'+id);return{l:j.is_legendary||j.is_mythical,v:j.varieties.map(x=>x.pokemon.name)}});
const pk=n=>cached('p'+n,async()=>{const j=await api('pokemon/'+n),all=j.moves.flatMap(x=>x.version_group_details.map(d=>d.version_group.name)),vg=VGP.find(v=>all.includes(v)),o=j.sprites.other;
 return{n:tc(j.name),id:j.id,d:+j.species.url.split('/').filter(Boolean).pop(),t:j.types.map(x=>TK[x.type.name]),b:j.stats.map(x=>x.base_stat),a:j.abilities.map(x=>tc(x.ability.name)),img:(o&&o['official-artwork']&&o['official-artwork'].front_default)||j.sprites.front_default,
 m:j.moves.map(x=>{const ds=x.version_group_details.filter(d=>d.version_group.name==vg&&d.move_learn_method.name!='form-change');if(!ds.length)return 0;const L=ds.filter(d=>d.move_learn_method.name=='level-up').map(d=>d.level_learned_at),has=k=>ds.some(d=>d.move_learn_method.name==k),free=has('machine')||has('tutor')||has('egg')||ds.some(d=>!['level-up','machine','tutor','egg'].includes(d.move_learn_method.name)),mn=L.length?Math.min(...L):0;return[x.move.name,free?0:mn,L.length?'L'+mn:has('machine')?'M':has('tutor')?'T':has('egg')?'E':'O']}).filter(Boolean)}});
const FORCE={'stealth-rock':'Stealth Rock','spikes':'Spikes','toxic-spikes':'Toxic Spikes','sticky-web':'Sticky Web','rapid-spin':'Rapid Spin','defog':'Defog','protect':'Protect','light-screen':'Light Screen','reflect':'Reflect','aurora-veil':'Aurora Veil','safeguard':'Safeguard','mist':'Mist','tailwind':'Tailwind'};
const mj=n=>FORCE[n]?Promise.resolve({...MV[FORCE[n]],r:n}):cached('m'+n,async()=>{
 const j=await api('move/'+n),me=j.meta||{},c={physical:'p',special:'s',status:'-'}[j.damage_class.name],t=j.target.name,cat=(me.category||{}).name||'',ail=(me.ailment||{}).name||'none',st=j.stat_changes||[],
  ef=((j.effect_entries||[]).find(x=>x.language.name=='en')||{}).short_effect||'',foe=/selected-pokemon|all-opponents|all-other-pokemon|random-opponent/.test(t);
 let ok=c&&n!='roost'&&TK[j.type.name]&&SUP.test(cat)&&!BAD.test(ef)&&j.pp&&j.priority>=0&&!me.min_hits&&!me.max_turns&&(ail=='none'||(AM[ail]&&!(c!='-'&&ail=='sleep')))&&st.every(x=>SN[x.stat.name]);
 ok=ok&&(c=='-'?(t=='user'||foe)&&(cat!='heal'||t=='user'):j.power&&foe);
 if(!ok)return{x:1};
 const f=[];if(j.priority>0)f.push('pr'+j.priority);if(me.crit_rate)f.push('cr'+me.crit_rate);if(me.flinch_chance)f.push('fl'+me.flinch_chance);
 if(AM[ail])f.push(c=='-'?(ail=='poison'&&/badly/i.test(ef)?'tox':AM[ail]):AM[ail]+(me.ailment_chance||100));
 if(me.drain>0)f.push('drn'+me.drain);if(me.drain<0)f.push('rec'+-me.drain);if(me.healing>0&&c=='-')f.push('heal'+me.healing);
 st.forEach(x=>f.push(c=='-'?(t=='user'?'sb:':'tb:')+SN[x.stat.name]+x.change:`ds${me.stat_chance||100}${cat=='damage+raise'||(cat=='damage+lower'&&!me.stat_chance)?'u':'t'}${SN[x.stat.name]}${x.change}`));
 return{n:tc(n),r:n,t:TK[j.type.name],c,p:j.power||0,a:j.accuracy??101,pp:j.pp,tg:t,fx:f.join(',')}});
async function liveMon(cnt,used){
 for(let t=0;t<30;t++){
  const id=1+R(cnt),s=await spc(id);
  if(id==890||used.has(id)||(s.l&&Math.random()<.6))continue;
  const p=await pk(pick(s.v.filter((v,i)=>!i||/-(alola|galar|hisui|paldea)/.test(v)))),lv=lvFor(p);
  const pl=sh(p.m.filter(x=>x[1]<=lv).map(x=>x[0])),got=[];
  for(let i=0;i<pl.length&&got.length<8;i+=8)(await Promise.all(pl.slice(i,i+8).map(mj))).forEach(m=>{if(!m.x)got.push(m)});
  const at=got.filter(m=>m.c!='-'),su=got.filter(m=>m.c=='-'),ns=Math.min(su.length,R(3)),mv=[...sh(at).slice(0,4-ns),...sh(su).slice(0,ns)];
  if(at.length<2||mv.length<4||used.has(id))continue;
  used.add(id);mv.forEach(m=>MV[m.n]=m);
  const im=p.a.filter(a=>IMPL.has(a));
  return mk(p,mv.map(m=>m.n),pick(im.length?im:p.a),lv,Object.fromEntries(mv.map(m=>[m.n,(p.m.find(x=>x[0]==m.r)||[])[2]])))}
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

;`Nasty Plot|dar|-|0|101|20|sb:spa2
Bulk Up|fig|-|0|101|20|sb:atk1+def1
Agility|psy|-|0|101|30|sb:spe2
Iron Defense|ste|-|0|101|15|sb:def2
Shell Smash|nor|-|0|101|15|sb:atk2+spa2+spe2+def-1+spd-1
Growth|nor|-|0|101|20|sb:atk1+spa1
Growl|nor|-|0|100|40|tb:atk-1
Screech|nor|-|0|85|40|tb:def-2
Feather Dance|fly|-|0|100|15|tb:atk-2
Scary Face|nor|-|0|100|10|tb:spe-2
Stealth Rock|roc|-|0|101|20|hz:rock
Spikes|gro|-|0|101|20|hz:spk
Toxic Spikes|poi|-|0|101|20|hz:tsp
Sticky Web|bug|-|0|101|20|hz:web
Rapid Spin|nor|p|50|100|40|rs
Defog|fly|-|0|101|15|dfg
Sand Attack|gro|-|0|100|15|ni
Future Sight|psy|-|0|100|10|ni
Take Down|nor|p|90|85|20|rec25
Rock Tomb|roc|p|60|95|15|ds100tspe-1
Hydro Pump|wat|s|110|80|5
Dragon Rage|dra|s|1|100|10|fd40
Bite|dar|p|60|100|25|fl30
Thrash|nor|p|120|100|10|ni
Volt Tackle|ele|p|120|100|15|rec33,par10
Iron Tail|ste|p|100|75|15|ds30tdef-1
Psychic|psy|s|90|100|10|ds10tspd-1
Shadow Ball|gho|s|80|100|15|ds20tspd-1
Crunch|dar|p|80|100|15|ds20tdef-1
Flare Blitz|fir|p|120|100|15|rec33,brn10
Air Slash|fly|s|75|95|15|fl30
Flash Cannon|ste|s|80|100|10|ds10tspd-1
Focus Blast|fig|s|120|70|5|ds10tspd-1
Waterfall|wat|p|80|100|15|fl20
Rock Slide|roc|p|75|90|10|fl30
Iron Head|ste|p|80|100|15|fl30
Energy Ball|gra|s|90|100|10|ds10tspd-1
Earth Power|gro|s|90|100|10|ds10tspd-1
Dark Pulse|dar|s|80|100|15|fl20
Bug Buzz|bug|s|90|100|10|ds10tspd-1`.split('\n').forEach(l=>{const[n,t,c,p,a,pp,fx]=l.split('|');MV[n]={n,t,c,p:+p,a:+a,pp:+pp,fx:fx||''}});
;`Alakazam|65|psy|55,50,45,135,95,120|Synchronize|-|9`.split('\n').forEach(l=>{const[n,d,t,b,a,m,k]=l.split('|');SP[n]={n,d:+d,t:t.split('/'),b:b.split(',').map(Number),a:a.split('/'),m:m.split(','),k:+k}});
// Blue: Campeão de Indigo Plateau (FireRed/LeafGreen, 1ª vez; jogador escolheu Squirtle, Blue escolheu Bulbasaur). Fontes: Dittobase (equipe e golpes), Serebii (níveis), Deltias (Keen Eye). Habilidades não confirmadas ficam vazias.
const BLUE=[['Pidgeot',59,'Keen Eye','',['Aerial Ace','Feather Dance','Sand Attack','Whirlwind']],['Alakazam',57,'','',['Psychic','Future Sight','Recover','Reflect']],['Rhydon',59,'','',['Take Down','Earthquake','Rock Tomb','Scary Face']],['Gyarados',59,'Intimidate','',['Hydro Pump','Dragon Rage','Bite','Thrash']],['Arcanine',61,'','',['Extreme Speed','Flamethrower','Roar','Bite']],['Venusaur',63,'Overgrow','',['Solar Beam','Synthesis','Sunny Day','Growth']]];
const spriteScale=(w,h)=>Math.min(1.12,Math.max(.62,Math.pow(Math.max(w,h,1)/110,.3)));
const reorder=(t,o)=>{if(!Array.isArray(o)||o.length!=t.length||new Set(o).size!=t.length||o.some(i=>!Number.isInteger(i)||i<0||i>=t.length))return null;return o.map(i=>t[i])};
;`Protect|nor|-|0|101|10|prot,pr4
Light Screen|psy|-|0|101|30|lscr
Dynamax Cannon|dra|s|100|100|5
Eternabeam|dra|s|160|90|5|rch
Cross Poison|poi|p|70|100|20|cr1,psn10`.split('\n').forEach(l=>{const[n,t,c,p,a,pp,fx]=l.split('|');MV[n]={n,t,c,p:+p,a:+a,pp:+pp,fx:fx||''}});
SP.Eternatus={n:'Eternatus',d:890,id:890,t:['poi','dra'],b:[140,85,95,145,95,130],a:['Pressure'],m:['-'],k:9,boss:1};
const DIFF={easy:{cap:50,ai:{rnd:.35,jit:30,sw:0}},med:{cap:70,ai:{rnd:.12,jit:14,sw:25}},hard:{cap:100,ai:{rnd:0,jit:6,sw:55}},ultra:{cap:100,ai:{rnd:0,jit:2,sw:85}},boss:{cap:999,ai:{rnd:0,jit:3,sw:0}}};
// Ultra Difícil: sets competitivos (golpes legais para a espécie), IV 31, EVs e natureza por função.
const ULTRA={Pikachu:{nat:'Jolly',ev:[0,252,0,0,4,252],it:'Light Ball',ab:'Static',mv:['Volt Tackle','Iron Tail','Quick Attack','Thunderbolt']},
Lapras:{nat:'Modest',ev:[252,0,0,252,4,0],it:'Leftovers',ab:'Shell Armor',mv:['Surf','Ice Beam','Thunderbolt','Psychic']},
Snorlax:{nat:'Adamant',ev:[252,252,0,0,4,0],it:'Leftovers',ab:'Thick Fat',mv:['Body Slam','Earthquake','Crunch','Rest']},
Venusaur:{nat:'Modest',ev:[252,0,0,252,4,0],it:'Leftovers',ab:'Overgrow',mv:['Giga Drain','Sludge Bomb','Sleep Powder','Synthesis']},
Charizard:{nat:'Timid',ev:[4,0,0,252,0,252],it:'Life Orb',ab:'Blaze',mv:['Flamethrower','Air Slash','Dragon Pulse','Focus Blast']},
Blastoise:{nat:'Modest',ev:[252,0,0,252,4,0],it:'Leftovers',ab:'Torrent',mv:['Surf','Ice Beam','Flash Cannon','Rapid Spin']},
Pidgeot:{nat:'Jolly',ev:[4,252,0,0,0,252],it:'Life Orb',ab:'Keen Eye',mv:['Return','Aerial Ace','Quick Attack','Air Slash']},
Alakazam:{nat:'Timid',ev:[4,0,0,252,0,252],it:'Life Orb',ab:'Inner Focus',mv:['Psychic','Shadow Ball','Focus Blast','Calm Mind']},
Rhydon:{nat:'Adamant',ev:[252,252,4,0,0,0],it:'Leftovers',ab:'Rock Head',mv:['Earthquake','Stone Edge','Megahorn','Swords Dance']},
Gyarados:{nat:'Jolly',ev:[4,252,0,0,0,252],it:'Life Orb',ab:'Intimidate',mv:['Dragon Dance','Waterfall','Earthquake','Stone Edge']},
Arcanine:{nat:'Adamant',ev:[4,252,0,0,0,252],it:'Life Orb',ab:'Intimidate',mv:['Flare Blitz','Extreme Speed','Crunch','Iron Head']}};
Object.values(ULTRA).forEach(u=>{u.nat=NAT.indexOf(u.nat)});
const adj=(o,dk)=>{if(dk=='ultra'){const u=ULTRA[o.s.n],iv=Array(6).fill(31);return u?{...o,lv:100,iv,ev:u.ev,nat:u.nat,ab:u.ab,it:u.it,mv:u.mv}:{...o,lv:100,iv}}return{...o,lv:Math.min(o.lv,DIFF[dk].cap)}};
// Boss Fight (regras do simulador, não oficiais): Eternatus nv. 150/200, IV 31, Timid, EV 252 AtqE/252 Vel/4 DefE. Fase 2 (Eternamax) abaixo de 50% de HP.
const bossO=l=>({s:SP.Eternatus,lv:l,ab:'Pressure',it:null,nat:NAT.indexOf('Timid'),iv:Array(6).fill(31),ev:[0,0,0,252,4,252],mv:['Dynamax Cannon','Sludge Bomb','Flamethrower','Toxic Spikes'],boss:1,xf:{n:'Eternamax Eternatus',id:10190,b:[255,115,250,125,250,130],mv:['Eternabeam','Dynamax Cannon','Sludge Bomb','Flamethrower'],it:null,ab:'Pressure'}});
function pickNat(s,mv){
 const b=s.b,ph=mv.filter(n=>MV[n].c=='p').length,sp=mv.filter(n=>MV[n].c=='s').length,pf=ph>sp||(ph==sp&&b[1]>=b[3]),fast=b[5]>=80;
 const pool=pf?(fast?[['Jolly',5],['Adamant',3],['Naive',1],['Brave',1]]:[['Adamant',5],['Impish',2],['Careful',2],['Brave',1]]):(fast?[['Timid',5],['Modest',3],['Hasty',1],['Rash',1]]:[['Modest',5],['Calm',2],['Bold',2],['Quiet',1]]);
 if(b[0]+b[2]+b[4]>=300&&Math.random()<.3)pool.push(pf?['Careful',3]:['Calm',3]);
 return NAT.indexOf(Math.random()<.2?pick(NAT.filter((_,i)=>i%6)):wp(pool))}
;`Aurora Veil|ice|-|0|101|20|avl
Safeguard|nor|-|0|101|25|sfg
Mist|ice|-|0|101|30|mst
Tailwind|fly|-|0|101|15|tlw`.split('\n').forEach(l=>{const[n,t,c,p,a,pp,fx]=l.split('|');MV[n]={n,t,c,p:+p,a:+a,pp:+pp,fx:fx||''}});
const SNP={atk:'Ataque',def:'Defesa',spa:'Ataque Esp.',spd:'Defesa Esp.',spe:'Velocidade'},STP={par:'paralisar',brn:'queimar',slp:'adormecer',tox:'envenenar gravemente',psn:'envenenar',frz:'congelar'};
// descrição curta e fiel à mecânica implementada, gerada a partir dos dados reais do golpe
function describe(M){
 const F=(M.fx||'').split(',').filter(Boolean),tp=TN[TYS.indexOf(M.t)],st=M.c=='-',o=[],en=n=>n==1?'1 estágio':n+' estágios';
 const tg=M.tg||({Earthquake:'all-other-pokemon',Surf:'all-other-pokemon','Rock Slide':'all-opponents',Blizzard:'all-opponents'})[M.n]||'';
 o.push(st?`Golpe de status do tipo ${tp}.`:`Causa dano ${tp} ${M.c=='p'?'físico':'especial'} (poder ${M.p}${M.a>100?'':`, precisão ${M.a}%`}).`);
 if(tg=='all-opponents')o.push('Atinge todos os adversários.');else if(tg=='all-other-pokemon')o.push('Atinge todos os outros Pokémon em campo, inclusive o parceiro.');
 const sb=[],tb=[],grp=(l,self)=>{const m={};l.forEach(([k,n])=>(m[n]=m[n]||[]).push(SNP[k]));return Object.entries(m).map(([n,a])=>`${+n>0?'Aumenta':'Reduz'} ${a.join(' e ')} ${self?'do usuário':'do alvo'} em ${en(Math.abs(+n))}.`)};
 for(const f of F){let g;
  if(g=f.match(/^sb:(.+)$/))g[1].split('+').forEach(x=>sb.push([x.slice(0,3),+x.slice(3)]));
  else if(g=f.match(/^tb:(\w{3})(-?\d)$/))tb.push([g[1],+g[2]]);
  else if(g=f.match(/^(par|brn|frz|psn|slp)(\d+)$/))o.push(`${g[2]}% de chance de ${STP[g[1]]} o alvo.`);
  else if(STP[f])o.push(`Tenta ${STP[f]} o alvo${M.a>100?'':` (precisão ${M.a}%)`}.`);
  else if(g=f.match(/^fl(\d+)$/))o.push(`${g[1]}% de chance de o alvo hesitar (se o usuário agir primeiro).`);
  else if(g=f.match(/^rec(\d+)$/))o.push(`O usuário sofre recuo de ${g[1]}% do dano causado.`);
  else if(g=f.match(/^(?:drn(\d+)|drain)$/))o.push(`Recupera ${g[1]||50}% do dano causado.`);
  else if(g=f.match(/^heal(\d*)$/))o.push(`Recupera ${g[1]||50}% do HP máximo do usuário.`);
  else if(g=f.match(/^ds(\d+)([ut])(\w{3})(-?\d)$/)){const c=+g[1],up=+g[4]>0;o.push(`${c>=100?(up?'Sempre aumenta':'Sempre reduz'):`${c}% de chance de ${up?'aumentar':'reduzir'}`} ${SNP[g[3]]} ${g[2]=='u'?'do usuário':'do alvo'} em ${en(Math.abs(+g[4]))}.`)}
  else if(f.match(/^cr\d$/))o.push('Alta taxa de acerto crítico.');
  else if(g=f.match(/^pr(\d)$/))o.push(`Prioridade +${g[1]}: age antes dos golpes normais.`);
  else if(f=='rch')o.push('O usuário precisa recarregar no turno seguinte.');
  else if(f=='chg')o.push('Carrega no primeiro turno e ataca no segundo.');
  else if(f=='hz:rock')o.push('Espalha pedras no campo adversário: quem entra sofre dano (1/8 do HP × fraqueza a Pedra).');
  else if(f=='hz:spk')o.push('Espalha espinhos no campo adversário (até 3 camadas): dano de 1/8, 1/6 e 1/4 do HP a quem entra; não afeta voadores nem Levitate.');
  else if(f=='hz:tsp')o.push('Espalha espinhos venenosos (até 2 camadas): envenenam (2ª camada: gravemente) quem entra; Pokémon Veneno os absorvem.');
  else if(f=='hz:web')o.push('Cobre o campo adversário com uma teia: quem entra perde 1 estágio de Velocidade.');
  else if(f=='rs')o.push('Remove os perigos do campo do usuário e aumenta a Velocidade do usuário em 1 estágio.');
  else if(f=='dfg')o.push('Remove os perigos dos dois lados do campo e o Reflect adversário.');
  else if(f=='lscr')o.push('Reduz o dano de golpes especiais recebidos pela equipe por 5 turnos.');
  else if(f=='refl')o.push('Reduz o dano de golpes físicos recebidos pela equipe por 5 turnos.');
  else if(f=='avl')o.push('Reduz o dano de golpes físicos e especiais recebidos pela equipe por 5 turnos; só funciona com granizo.');
  else if(f=='sfg')o.push('Protege a equipe de condições de status por 5 turnos.');
  else if(f=='mst')o.push('Protege a equipe de reduções de atributos causadas por adversários por 5 turnos.');
  else if(f=='tlw')o.push('Dobra a Velocidade de toda a equipe por 4 turnos.');
  else if(f=='prot')o.push('Protege o usuário da maioria dos ataques neste turno. Usos seguidos têm chance cada vez menor.');
  else if(f=='rest')o.push('O usuário dorme por 2 turnos e recupera todo o HP.');
  else if(f=='brine')o.push('Poder dobrado se o alvo estiver com metade do HP ou menos.');
  else if(g=f.match(/^fd(\d+)$/))o.push(`Causa ${g[1]} de dano fixo.`);
  else if(f=='snore')o.push('Só funciona se o usuário estiver dormindo.');
  else if(f=='ni')o.push('⚠ Parte do efeito deste golpe ainda não está implementada.')}
 o.push(...grp(sb,true),...grp(tb,false));
 if(st&&o.length==1)o.push(M.a>100?'Sem efeito adicional implementado.':`Precisão ${M.a}%.`);
 return o.join(' ')}
function Eng(H){let B=null,UID=0;
const SM=s=>s>=0?(2+s)/2:2/(2-s),K=['','atk','def','spa','spd','spe'];
const spd=m=>m.boss?150:m.st[5]*SM(m.sg.spe)*(m.it=='Choice Scarf'?1.5:1)*(m.stt=='par'?.25:1)*(B&&B.tw&&B.tw[m.sd]>0?2:1);
function stat(m,i,ig){let sg=m.sg[K[i]];if(ig=='o'&&sg<0)sg=0;if(ig=='d'&&sg>0)sg=0;let v=m.st[i]*SM(sg);const lb=m.it=='Light Ball'&&m.s.n=='Pikachu';
 if(i==1){if(m.ab=='Huge Power'||m.ab=='Pure Power')v*=2;if(m.ab=='Guts'&&m.stt)v*=1.5;if(m.it=='Choice Band')v*=1.5;if(lb)v*=2}
 if(i==3){if(m.it=='Choice Specs')v*=1.5;if(lb)v*=2}
 if(i==4&&m.it=='Assault Vest')v*=1.5;return v}
function dmg(a,d,M,o){
 const ph=M.c=='p',A=stat(a,ph?1:3,o.crit?'o':0),D=stat(d,ph?2:4,o.crit?'d':0);let p=M.p;if(M.fx.includes('brine')&&d.hp*2<=d.mhp)p*=2;if(a.ab=='Technician'&&p<=60)p*=1.5;
 const e=eff(M.t,d.s.t),fd=(M.fx.match(/(?:^|,)fd(\d+)/)||[])[1];if(fd)return e?+fd:0;let x=Math.floor(Math.floor(Math.floor(2*a.lv/5+2)*p*A/D)/50)+2;
 if(o.crit)x*=1.5;if(o.sp)x*=.75;x*=o.rnd;if(a.s.t.includes(M.t))x*=a.ab=='Adaptability'?2:1.5;x*=e;if(e>1&&['Filter','Solid Rock','Prism Armor'].includes(d.ab))x*=.75;
 if(ph&&a.stt=='brn'&&a.ab!='Guts')x*=.5;if((ph&&B.refl[d.sd]>0)||(!ph&&B.ls[d.sd]>0)||B.av[d.sd]>0)x*=B.n>1?2/3:.5;if(a.it=='Life Orb')x*=1.3;
 if(d.ab=='Multiscale'&&d.hp==d.mhp)x*=.5;if((d.ab=='Thick Fat'&&(M.t=='fir'||M.t=='ice'))||(d.ab=='Heatproof'&&M.t=='fir'))x*=.5;
 if(a.hp*3<=a.mhp&&PIN[a.ab]==M.t)x*=1.5;
 if(a.ff&&M.t=='fir')x*=1.5;return e?Math.max(1,Math.floor(x)):0}
const canSt=(m,s)=>!m.stt&&!(B&&B.sf&&B.sf[m.sd]>0)&&!(s=='brn'&&m.s.t.includes('fir'))&&!(s=='par'&&m.s.t.includes('ele'))&&!((s=='psn'||s=='tox')&&(m.s.t.includes('poi')||m.s.t.includes('ste')))&&!(s=='frz'&&m.s.t.includes('ice'));
const hit=(m,v)=>{v=Math.min(m.hp,v);m.hp-=v;if(m.hp<=0){m.hp=0;m.fnt=true}return v};
const heal=(m,v)=>{const h=Math.min(m.mhp-m.hp,Math.floor(v));m.hp+=h;return h};
async function faint(m){if(!m.sy){m.sy=1;await say(`${lab(m)} desmaiou!`)}}
async function post(m){if(m.boss&&!m.xd&&!m.fnt&&m.hp*2<m.mhp)await xform(m);if(m.it=='Sitrus Berry'&&!m.fnt&&m.hp*2<=m.mhp){m.it=null;heal(m,m.mhp/4);await say(`${lab(m)} comeu a Sitrus Berry!`)}}
async function sm(a,d,M,F,A,D){
 if(M.a<=100&&R(100)>=M.a){await say(`O golpe de ${A} errou!`);return}
 for(const f of F){let g;
  if(g=f.match(/^heal(\d*)$/)){if(a.hp>=a.mhp){await say('Mas falhou!');return}heal(a,a.mhp*(+g[1]||50)/100);await say(`${A} recuperou HP!`)}
  else if(f=='rest'){if(a.hp>=a.mhp||a.stt=='slp'){await say('Mas falhou!');return}a.hp=a.mhp;a.stt='slp';a.sl=2;await say(`${A} dormiu e recuperou todo o HP!`)}
  else if(f=='refl'){if(B.refl[a.sd]){await say('Mas falhou!');return}B.refl[a.sd]=5;await say(`Reflect protege a equipe de ${A}!`)}
  else if(g=f.match(/^sb:(.+)$/)){for(const x of g[1].split('+'))await stg(a,x.slice(0,3),+x.slice(3),a)}
  else if(g=f.match(/^tb:(\w{3})(-?\d)$/)){await stg(d,g[1],+g[2],a)}
  else if(g=f.match(/^hz:(rock|spk|tsp|web)$/)){const sd=1-a.sd,h=B.hz[sd],k=g[1],mx={rock:1,spk:3,tsp:2,web:1}[k];if(h[k]>=mx){await say('Mas falhou!');return}h[k]++;await say(`${HZN[k]} se espalharam ${sd?'pelo campo adversário':'pelo seu campo'}!${mx>1?` (camadas: ${h[k]})`:''}`)}
  else if(f=='lscr'){if(B.ls[a.sd]){await say('Mas falhou!');return}B.ls[a.sd]=5;await say(`Light Screen protege a equipe de ${A}!`)}
  else if(f=='prot'){if(a.pc&&R(Math.pow(3,a.pc))){a.pc=0;await say('Mas falhou!');return}a.prot=1;a.pc=(a.pc||0)+1;await say(`${A} protegeu-se!`)}
  else if(f=='avl'){if(!B.hail||B.av[a.sd]){await say('Mas falhou!');return}B.av[a.sd]=5;await say(`Aurora Veil protege a equipe de ${A}!`)}
  else if(f=='sfg'){if(B.sf[a.sd]){await say('Mas falhou!');return}B.sf[a.sd]=5;await say(`Safeguard protege a equipe de ${A} contra condições de status!`)}
  else if(f=='mst'){if(B.ms[a.sd]){await say('Mas falhou!');return}B.ms[a.sd]=5;await say(`Mist protege a equipe de ${A} contra reduções de atributos!`)}
  else if(f=='tlw'){if(B.tw[a.sd]){await say('Mas falhou!');return}B.tw[a.sd]=4;await say(`O vento a favor sopra para a equipe de ${A}!`)}
  else if(f=='dfg'){B.hz=[0,1].map(()=>({rock:0,spk:0,tsp:0,web:0}));B.refl[1-a.sd]=0;await say('Uma neblina varreu os perigos do campo!')}
  else if(/^(par|brn|slp|tox|psn)$/.test(f)){if(!canSt(d,f)){await say(`Não afetou ${D}...`);return}d.stt=f;if(f=='slp')d.sl=1+R(3);if(f=='tox')d.tn=0;await say(`${D} ${STN[f]}!`)}
  else if(f=='ni')await say('(O efeito deste golpe não está implementado.)')}}
async function use(s,x){
 const a=B.sl[s],mi=x.i;if(!a||a.fnt)return;
 const M=mi<0?STR:MV[a.mv[mi].n],F=M.fx.split(','),A=lab(a);
 if(a.flin){a.flin=0;a.acted=1;await say(`${A} hesitou e não conseguiu se mover!`);return}
 a.acted=1;
 if(a.stt=='slp'&&!F.includes('snore')){if(a.sl-->0){await say(`${A} está dormindo.`);return}a.stt=null;await say(`${A} acordou!`)}
 if(a.stt=='frz'){if(R(5)){await say(`${A} está congelado!`);return}a.stt=null;await say(`${A} descongelou!`)}
 if(a.stt=='par'&&!R(4)){await say(`${A} está paralisado e não consegue se mover!`);return}
 if(a.rcg){a.rcg=false;await say(`${A} precisa recarregar.`);return}
 if(F.includes('chg')){if(a.chg==null){a.mv[mi].pp--;a.chg=mi;await say(`${A} está absorvendo luz!`);return}a.chg=null}else if(mi>=0)a.mv[mi].pp--;
 if(!F.includes('prot'))a.pc=0;
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
 if(mi>=0&&T!='user')for(const k of ts)if(k!=s&&alive(k)&&B.sl[k].ab=='Pressure')a.mv[mi].pp=Math.max(0,a.mv[mi].pp-1);
 for(const k of ts)if(alive(k))await hitOne(a,B.sl[k],M,F,A,lab(B.sl[k]),ts.length);
 if(a.dd){a.dd=0;if(a.it=='Life Orb'){hit(a,Math.max(1,a.mhp/10|0));await say(`${A} perdeu HP por causa da Life Orb!`)}if(F.includes('rch'))a.rcg=true}
 await post(a);if(a.fnt)await faint(a)}
async function hitOne(a,d,M,F,A,D,nt){
 if(d!==a&&d.prot){await say(`${D} protegeu-se!`);return}
 if(M.c=='-')return sm(a,d,M,F,A,D);
 if(M.a<=100&&!(B.hail&&M.n=='Blizzard')&&R(100)>=M.a){await say(`O ataque de ${A} errou!`);return}
 if(IM[d.ab]==M.t){if(d.ab=='Flash Fire')d.ff=1;else if(/Absorb/.test(d.ab))heal(d,d.mhp/4);else if(d.ab=='Sap Sipper')d.sg.atk=Math.min(6,d.sg.atk+1);else if(d.ab=='Motor Drive')d.sg.spe=Math.min(6,d.sg.spe+1);await say(`${D} é imune por ${d.ab}!`);return}
 
 const e=eff(M.t,d.s.t);if(!e){await say(`Não afeta ${D}...`);return}
 const crc=+((F.find(f=>/^cr\d/.test(f))||'cr0').slice(2)),crit=!R([16,8,2,1][Math.min(crc,3)])&&d.ab!='Shell Armor'&&d.ab!='Battle Armor';let v=dmg(a,d,M,{crit,rnd:(85+R(16))/100,sp:nt>1});
 if(v>=d.hp&&d.hp==d.mhp&&(d.ab=='Sturdy'||d.it=='Focus Sash')){v=d.hp-1;await say(d.ab=='Sturdy'?`${D} resistiu graças a Sturdy!`:`${D} resistiu com a Focus Sash!`);if(d.ab!='Sturdy')d.it=null}
 hit(d,v);a.dd=1;await hfx(d,v,F.some(f=>/^fd\d/.test(f))?1:e,crit);if(crit)await say('Acerto crítico!');if(!F.some(f=>/^fd\d/.test(f))){if(e>1)await say('Foi super efetivo!');else if(e<1)await say('Não foi muito efetivo...')}
 const ct=M.c=='p'&&!['Earthquake','Stone Edge','Rock Slide'].includes(M.n);
 if(ct&&d.it=='Rocky Helmet'){hit(a,Math.floor(a.mhp/6));await say(`${A} se feriu na Rocky Helmet!`)}
 if(ct&&CTA[d.ab]&&canSt(a,CTA[d.ab])&&R(10)<3){a.stt=CTA[d.ab];await say(`${A} ${STN[a.stt]} por ${d.ab}!`)}
 if(ct&&(d.ab=='Rough Skin'||d.ab=='Iron Barbs')){hit(a,Math.max(1,a.mhp>>3));await say(`${A} se feriu por ${d.ab}!`)}
 if(!d.fnt)for(const f of F){const g=f.match(/^(par|brn|frz|psn)(\d+)$/);if(g&&R(100)<+g[2]&&canSt(d,g[1])){d.stt=g[1];await say(`${D} ${STN[g[1]]}!`)}}
 const dn=F.find(f=>/^(drn|drain)/.test(f));if(dn&&heal(a,v*(+dn.slice(3)||50)/100))await say(`${A} drenou energia!`);
 for(const f of F){const g=f.match(/^ds(\d+)([ut])(\w{3})(-?\d)$/);if(g&&R(100)<+g[1]){const z=g[2]=='u'?a:d;if(z==a||!d.fnt)await stg(z,g[3],+g[4],a)}}
 {const fl=F.find(f=>/^fl\d+$/.test(f));if(fl&&!d.fnt&&!d.acted&&R(100)<+fl.slice(2))d.flin=1}
 if(F.includes('rs')&&!a.fnt){const h=B.hz[a.sd];if(h.rock||h.spk||h.tsp||h.web){B.hz[a.sd]={rock:0,spk:0,tsp:0,web:0};await say(`${A} varreu os perigos do seu lado do campo!`)}await stg(a,'spe',1,a)}
 const rc=F.find(f=>/^rec/.test(f));if(rc){hit(a,Math.max(1,Math.floor(v*(+rc.slice(3))/100)));await say(`${A} sofreu dano de recuo!`)}
 
 await post(d);await post(a);if(d.fnt)await faint(d);if(a.fnt)await faint(a)}
const SPREAD={Earthquake:'all-other-pokemon',Surf:'all-other-pokemon','Rock Slide':'all-opponents',Blizzard:'all-opponents'};
const tgt=M=>M.tg||SPREAD[M.n]||(M.c=='-'&&/^(sb:|heal|refl|rest|hz:|dfg|lscr|prot|avl|sfg|mst|tlw)/.test(M.fx)?'user':'selected-pokemon');
const build2=(o,sd)=>({...build(o,sd),...(o.boss?{it:null}:{}),uid:++UID});
const trOf=s=>B.T.find(t=>t.ss.includes(s)),foeS=s=>[...Array(B.n)].map((_,i)=>i+(s<B.n?B.n:0)),allyOf=s=>s<B.n?1-s:B.n+1-(s-B.n),alive=k=>B.sl[k]&&!B.sl[k].fnt,dead=sd=>B.T.filter(t=>t.sd==sd).every(t=>t.party.every(m=>m.fnt));
const lab=m=>(m.sd?B.T[m.tr].nm+': ':'')+m.s.n;
const usable=(P,x)=>x.pp>0&&(!P.lock||P.lock==x.n)&&!(P.it=='Assault Vest'&&MV[x.n].c=='-');
const vm=m=>m&&{u:m.uid,n:m.s.n,id:m.s.id||m.s.d,t:m.s.t,lv:m.lv,hp:m.hp,mhp:m.mhp,st:m.stt,f:m.fnt?1:0,tr:m.tr,g:{...m.sg},pr:m.prot?1:0};
const ev=o=>{B.ev.push({...o,v:{sl:B.sl.map(vm),hail:B.hail,refl:B.refl.slice(),ls:B.ls.slice(),av:B.av.slice(),sf:B.sf.slice(),ms:B.ms.slice(),tw:B.tw.slice(),hz:B.hz.map(h=>({...h}))}})};
const say=async(t,x)=>ev({k:'say',x:t,...x});
const anim=async(s,ts,M)=>ev({k:'fx',s,ts,n:M.n,t:M.t,c:M.c,f:M.fx});
const hfx=async(d,v,e,cr)=>ev({k:'hit',s:B.sl.indexOf(d),d:v,e,cr});
const mon=m=>{const v={u:m.uid,n:m.s.n,id:m.s.id||m.s.d,d:m.s.d,t:m.s.t,lv:m.lv,hp:m.hp,mhp:m.mhp,st:m.stt,f:m.fnt?1:0,tr:m.tr,g:{...m.sg},rev:m.rev?1:0,bo:m.boss?1:0,xd:m.xd?1:0,pr:m.prot?1:0};if(B.T[m.tr].ai&&!m.rev)return v;return{...v,ab:m.ab,it:m.it,nat:m.nat,sa:m.st,bs:m.s.b,iv:m.iv,ev:m.ev,mv:m.mv,lock:m.lock||null,spe:Math.floor(spd(m))}};
const pub=()=>({kind:B.kind,n:B.n,turn:B.turn,end:B.end,rs:B.rs,ask:B.ask,acts:Object.keys(B.acts).map(Number),refl:B.refl,ls:B.ls,av:B.av,sf:B.sf,ms:B.ms,tw:B.tw,hail:B.hail,hz:B.hz,dk:B.dk,bl:B.bl,T:B.T.map(t=>({nm:t.nm,ai:t.ai,sd:t.sd,ss:t.ss,party:t.party.map(mon)})),sl:B.sl.map(m=>m?[m.tr,B.T[m.tr].party.indexOf(m)]:null)});
const flush=()=>{const e=B.ev;B.ev=[];H.send(e,pub())};
const mvAll=()=>{const o={Struggle:STR};B.T.forEach(t=>t.party.forEach(m=>m.mv.forEach(x=>o[x.n]=MV[x.n])));return o};
const HZN={rock:'Pedras pontiagudas',spk:'Espinhos',tsp:'Espinhos venenosos',web:'Uma Teia Pegajosa'},SNM={atk:'Ataque',def:'Defesa',spa:'Ataque Esp.',spd:'Defesa Esp.',spe:'Velocidade'};
async function stg(m,k,n,src){
 if(src&&src!==m&&n<0&&(['Clear Body','White Smoke','Full Metal Body'].includes(m.ab)||(m.ab=='Hyper Cutter'&&k=='atk'))){await say(`${m.ab} de ${lab(m)} impediu a redução!`);return false}
 if(src&&src!==m&&n<0&&B.ms[m.sd]>0){await say(`Mist protege ${lab(m)} contra a redução de atributos!`);return false}
 if(m.ab=='Contrary')n=-n;else if(m.ab=='Simple')n*=2;
 const o=m.sg[k],v=Math.max(-6,Math.min(6,o+n));
 if(v==o){await say(`${SNM[k]} de ${lab(m)} não pode ${n>0?'aumentar':'diminuir'} mais!`);return false}
 m.sg[k]=v;const d=Math.abs(v-o);
 await say(`${SNM[k]} de ${lab(m)} ${n>0?'aumentou':'diminuiu'}${d>=3?' drasticamente':d==2?' bastante':''}!`);
 if(src&&src!==m&&n<0){if(m.ab=='Defiant')await stg(m,'atk',2,m);else if(m.ab=='Competitive')await stg(m,'spa',2,m)}
 return true}
async function abEntry(s){const n=B.sl[s];if(n.ab=='Intimidate')for(const k of foeS(s)){const f=B.sl[k];if(f&&!f.fnt){await say(`Intimidate de ${lab(n)} ameaça ${lab(f)}!`);await stg(f,'atk',-1,n)}}}
async function entryHz(s){
 const n=B.sl[s],h=B.hz[n.sd];if(n.it=='Heavy-Duty Boots'||!(h.rock||h.spk||h.tsp||h.web))return;
 const gr=!n.s.t.includes('fly')&&n.ab!='Levitate';
 if(h.rock){hit(n,Math.max(1,Math.floor(n.mhp*eff('roc',n.s.t)/8)));await say(`Pedras pontiagudas feriram ${lab(n)}!`);if(n.fnt){await faint(n);return}}
 if(gr&&h.spk){hit(n,Math.max(1,Math.floor(n.mhp/[8,6,4][h.spk-1])));await say(`${lab(n)} foi ferido pelos espinhos!`);if(n.fnt){await faint(n);return}}
 if(gr&&h.tsp){if(n.s.t.includes('poi')){h.tsp=0;await say(`${lab(n)} absorveu os espinhos venenosos!`)}else{const st=h.tsp>1?'tox':'psn';if(canSt(n,st)){n.stt=st;n.tn=0;await say(`${lab(n)} ${STN[st]} pelos espinhos venenosos!`)}}}
 if(gr&&h.web){await say(`${lab(n)} caiu na Teia Pegajosa!`);await stg(n,'spe',-1,{})}}
async function swap(s,pi,first){
 const o=B.sl[s],t=trOf(s),n=t.party[pi];
 if(!first&&o&&!o.fnt){if(o.ab=='Regenerator')heal(o,o.mhp/3);await say(`${lab(o)}, volte!`)}
 if(o)Object.assign(o,{sg:{atk:0,def:0,spa:0,spd:0,spe:0},lock:null,chg:null,rcg:false,tn:0,ff:0,flin:0});
 B.sl[s]=n;n.age=0;n.rev=1;
 await say(`${s<B.n?'Vai,':t.nm+' envia'} ${n.s.n}!`);
 await entryHz(s);if(!n.fnt)await abEntry(s)}
const matchup=(x,y)=>{const o=Math.max(0,...x.mv.filter(m=>m.pp>0&&MV[m.n].c!='-').map(m=>{const M=MV[m.n];return eff(M.t,y.s.t)*(x.s.t.includes(M.t)?1.5:1)*M.p/100}));return o-Math.max(...y.s.t.map(t=>eff(t,x.s.t)))};
const sur=d=>({...d,st:calc(d.s.b,d.lv,[31,31,31,31,31,31],[0,0,0,0,0,0],0),ab:null,it:null});
function ai(s){
 const a=B.sl[s],fs=foeS(s).filter(alive),ST=/^(par|brn|slp|tox|psn)$/;
 if(!fs.length)return{t:'m',i:-1};
 if(a.chg!=null)return{t:'m',i:a.chg,tg:fs[0]};if(a.rcg)return{t:'m',i:0,tg:fs[0]};
 const P=B.dfc.ai;
 if(P.rnd&&Math.random()<P.rnd){const us=a.mv.map((m,i)=>[m,i]).filter(([m])=>m.pp>0&&!(MV[m.n].c=='-'&&/(^|,)(ni|snore)/.test(MV[m.n].fx))&&!(a.lock&&a.lock!=m.n));if(us.length)return{t:'m',i:pick(us)[1],tg:pick(fs)}}
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
    if(ko)sc+=60;if(F.includes('rs')){const h=B.hz[a.sd];if(h.rock||h.spk||h.tsp||h.web)sc+=40}if(F.includes('rch')&&!ko)sc*=.55;if(F.includes('chg'))sc*=.7;if(F.some(f=>/^rec/.test(f)))sc*=.9;if(a.stt=='slp'&&!F.includes('snore'))sc*=.1;
   }else{
    const sf=F.find(f=>ST.test(f)),sb=F.find(f=>/^sb:/.test(f));
    if(sf)sc=(canSt(d,sf)&&d.hp>d.mhp*.5)?42:0;
    else if(F.some(f=>/^heal/.test(f)))sc=a.hp<a.mhp*.5?58:0;
    else if(F.includes('rest'))sc=(a.hp<a.mhp*.4&&a.stt!='slp')?52:0;
    else if(F.includes('refl'))sc=(!B.refl[a.sd]&&g.st[1]>g.st[3])?30:0;
    else if(sb)sc=(a.hp>a.mhp*.6&&a.sg[sb.slice(3,6)]<2)?32:0;
    else if(F.some(f=>/^tb:/.test(f)))sc=(d.sg.atk>-2&&g.st[1]>g.st[3])?26:0;
    else if(F.some(f=>/^hz:/.test(f))){const k=F[0].slice(3),mx={rock:1,spk:3,tsp:2,web:1}[k],h=B.hz[1-a.sd][k];sc=(h<mx&&B.T.some(t=>t.sd!=a.sd&&t.party.some(x=>!x.fnt&&!B.sl.includes(x))))?55-10*h:0}
    else if(F.includes('dfg')){const h=B.hz[a.sd];sc=(h.rock||h.spk||h.tsp||h.web)?55:0}
    else if(F.includes('lscr'))sc=(!B.ls[a.sd]&&g.st[3]>g.st[1])?28:0;
    if(a.stt=='slp')sc=0}
   sc+=Math.random()*P.jit;if(sc>bs){bs=sc;b=i;bt=c}}});
 const d=B.sl[bt],alt=B.T[a.tr].party.map((m,i)=>[m,i]).filter(([m])=>!m.fnt&&!B.sl.includes(m));
 if(alt.length&&a.age>=2&&d){const cur=matchup(a,d),[m2,i2]=alt.sort((x,y)=>matchup(y[0],d)-matchup(x[0],d))[0];
  if(matchup(m2,d)>=cur+1.5&&(bs<45||cur<-.5)&&R(100)<P.sw)return{t:'s',i:i2}}
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
 for(const s of[0,1])if(B.refl[s]>0&&--B.refl[s]==0)await say(`Reflect ${s?'dos adversários':'do seu time'} acabou.`);
 for(const s of[0,1])if(B.ls[s]>0&&--B.ls[s]==0)await say(`Light Screen ${s?'dos adversários':'do seu time'} acabou.`);
 for(const[k,nm]of[['av','Aurora Veil'],['sf','Safeguard'],['ms','Mist'],['tw','O vento a favor']])for(const s of[0,1])if(B[k][s]>0&&--B[k][s]==0)await say(`${nm} ${s?'dos adversários':'do seu time'} acabou.`)}
const askSwitch=s=>new Promise(r=>{B.rs=s;B.pr=r;B.run=0;flush()});
async function finish(r){B.end=r;B.run=0;await say(r=='win'?'Vocês venceram a batalha!':'Vocês perderam a batalha...',{end:r});flush()}
function newTurn(){B.turn++;B.run=0;B.acts={};B.ask=[];B.sl.forEach(m=>{if(m){m.acted=0;m.flin=0;m.prot=0}});for(const t of B.T)if(!t.ai)for(const s of t.ss)if(alive(s))B.ask.push(s);flush()}
async function runTurn(){
 if(B.run)return;B.run=1;
 const q=[];for(const t of B.T)for(const s of t.ss)if(alive(s))q.push([s,t.ai?ai(s):B.acts[s]]);
 const key=([s,x])=>[x.t=='s'?9:x.i<0?0:+((MV[B.sl[s].mv[x.i].n].fx.match(/pr(\d)/)||[])[1]||0),x.t=='s'?0:spd(B.sl[s])+Math.random()*.5];
 q.sort((u,v)=>{const a=key(u),b=key(v);return b[0]-a[0]||b[1]-a[1]});
 for(const[s,x]of q){if(!alive(s)||!x)continue;if(x.t=='s')await swap(s,x.i);else await use(s,x);if(dead(0)||dead(1))break}
 await eot();
 if(dead(1))return finish('win');if(dead(0))return finish('lose');
 for(let did=1;did;){did=0;
  for(let s=0;s<2*B.n;s++){const m=B.sl[s];if(!m||!m.fnt)continue;const t=B.T[m.tr],rs=t.party.filter(x=>!x.fnt&&!B.sl.includes(x));
   if(!rs.length){B.sl[s]=null;did=1;continue}
   let pi;if(t.ai)pi=t.party.indexOf(bestRep(rs,s));else{pi=await askSwitch(s);B.rs=null;B.pr=null;B.run=1}
   await swap(s,pi,1);did=1}
  if(dead(1))return finish('win');if(dead(0))return finish('lose')}
 newTurn()}
function init(c){
 const n=c.kind=='s'?1:2,v=c.ver||'hgss',P=c.teams,dk=DIFF[c.diff]?c.diff:'hard',bl=c.bl==200?200:150;
 if(P.some(t=>t.some(o=>o.s&&o.s.boss)))throw Error('Eternatus é exclusivo da Boss Fight e não pode entrar na equipe do jogador.');
 const rd=(l,nm,ss)=>({nm,ai:1,sd:1,ss,party:l.map(x=>build2(adj(redO(x),dk),1))}),me=(nm,ss,o)=>({nm,ai:0,sd:0,ss,party:o.map(x=>build2(x,0))}),bt=()=>({nm:'Eternatus',ai:1,sd:1,ss:[n],party:[build2(bossO(bl),1)]});
 const hu=c.kind=='s'?[me('Você',[0],P[0])]:c.kind=='d'?[me('Você',[0,1],P[0])]:[me(c.names[0],[0],P[0]),me(c.names[1],[1],P[1])];
 const en=dk=='boss'?[bt()]:c.kind=='s'?[rd(RED[v].t,'Red',[1])]:[rd(RED.hgss.t,'Red',[2]),rd(BLUE,'Blue',[3])];
 const T=[...hu,...en];T.forEach((t,i)=>t.party.forEach(m=>m.tr=i));
 B={kind:c.kind,dk,bl,dfc:DIFF[dk],n,T,sl:Array(2*n).fill(null),refl:[0,0],ls:[0,0],av:[0,0],sf:[0,0],ms:[0,0],tw:[0,0],hz:[0,1].map(()=>({rock:0,spk:0,tsp:0,web:0})),hail:c.kind=='s'&&dk!='boss'?RED[v].h:0,turn:0,end:null,acts:{},ask:[],run:1,rs:null,pr:null,ev:[]};
 if(dk=='boss'&&typeof process!='undefined'&&process.env&&process.env.PK_TEST_BOSSHP){const b=en[0].party[0];b.hp=Math.max(1,Math.floor(b.mhp*+process.env.PK_TEST_BOSSHP))}}
async function xform(m){
 m.xd=1;const X=m.xf,om=m.mhp,oh=m.hp,sl=B.sl.indexOf(m);
 ev({k:'xf0',s:sl});await say(`${m.s.n} está tomado pela energia Eternamax!`);
 m.s={...m.s,n:X.n,id:X.id,b:X.b};m.st=calc(m.s.b,m.lv,m.iv,m.ev,m.nat);m.st[5]=150;m.st[0]=om;m.mhp=om;m.hp=oh;
 m.mv=X.mv.map(n=>({n,pp:MV[n].pp}));m.it=X.it;m.ab=X.ab;m.lock=null;m.chg=null;
 ev({k:'xf',s:sl});await say(`${X.n} surgiu! Atributos e golpes da 2ª fase ativados.`)}
async function start(){
 const tr=B.T.filter(t=>t.ai),boss=B.dk=='boss';
 await say(boss?`Eternatus, o chefe, bloqueia o caminho! (Nv ${B.bl})`:`${tr.map(t=>t.nm).join(' e ')} quer${tr.length>1?'em':''} batalhar!`,{tr:boss?[]:tr.map(t=>t.nm.toLowerCase())});
 for(let s=0;s<2*B.n;s++){const t=trOf(s);if(t)await swap(s,t.ss.indexOf(s),1)}
 newTurn()}
function act(s,a,turn){
 if(!B||B.end||B.run)return'Aguarde a resolução do turno.';
 if(turn!=null&&turn!==B.turn)return'Turno inválido.';
 if(!B.ask.includes(s))return'Esse Pokémon não precisa de ação.';
 if(B.acts[s]!=null)return'Ação já confirmada.';
 if(a&&a.t=='b')return B.dk=='boss'?'Eternatus não pode ser capturado.':'Não é possível capturar Pokémon de treinadores.';
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
return{init,start,act,rep,pub,mvAll,dbg:{get B(){return B},swap,use,hitOne,stg,entryHz,spd,dmg,flush,post,xform}}}

if(typeof module!='undefined')module.exports={describe,Eng,liveTeam,localTeam,build,MV,SP,RED,BLUE,reorder,spriteScale,STR,IMPL,NAT,eff,redO,DIFF,ULTRA,adj,bossO,pickNat,calc};
