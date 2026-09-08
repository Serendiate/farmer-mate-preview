(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`apple`,`pear`],t={apple:{name:`リンゴ`,seconds:75,yield:4,price:7},pear:{name:`ナシ`,seconds:105,yield:3,price:14}},n=e=>e<3?`apple`:`pear`,r=[`E`,`D`,`C`,`B`,`A`,`S`],i=[1,1.25,1.65,2.2,3.1,4.5],a=[0,40,180,650,1400,3e3];function o(e,t=3){return Math.min(t,a.filter(t=>e>=t).length-1)}var s=class{counts;lots;ids;constructor(e,t){this.ids=e,this.lots=Object.fromEntries(e.map(e=>[e,[t?.[e]??0,0,0,0,0,0]])),this.counts={};for(let t of e)Object.defineProperty(this.counts,t,{enumerable:!0,get:()=>this.lots[t].reduce((e,t)=>e+t,0),set:e=>{let n=e-this.counts[t];n>0?this.add(t,n,0):n<0&&this.take(t,-n)}})}add(e,t,n){this.lots[e][n]+=t}take(e,t){let n=[0,0,0,0,0,0],r=Math.min(t,this.counts[e]);for(let t=0;t<6;t++){let i=Math.min(r,this.lots[e][t]);n[t]=i,this.lots[e][t]-=i,r-=i}return n}moveTo(e,t,n){this.take(t,n).forEach((n,r)=>e.add(t,n,r))}peek(e,t=this.counts[e]){let n=Math.min(t,this.counts[e]);return this.lots[e].map(e=>{let t=Math.min(e,n);return n-=t,t})}value(e,t,n=this.counts[e]){return this.peek(e,n).reduce((e,n,r)=>e+n*Math.round(t*i[r]),0)}save(){return Object.fromEntries(this.ids.map(e=>[e,[...this.lots[e]]]))}restore(e,t){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let n=e;return Object.keys(n).length!==this.ids.length||!this.ids.every(e=>Array.isArray(n[e])&&n[e].length===6&&n[e].every(e=>Number.isSafeInteger(e)&&e>=0)&&n[e].reduce((e,t)=>e+t,0)===t[e])?!1:(this.lots=Object.fromEntries(this.ids.map(e=>[e,[...n[e]]])),!0)}},c=class{crops;people={player:0,mina:0,ren:0};best=0;ids;constructor(e){this.ids=e,this.crops=Object.fromEntries(e.map(e=>[e,0]))}cropGrade(e,t){return o(this.crops[e],3+t)}personGrade(e){return o(this.people[e]??0,5)}harvest(e,t,n){let r=Math.min(this.cropGrade(e,n),this.personGrade(t));return this.crops[e]++,this.people[t]=(this.people[t]??0)+1,this.best=Math.max(this.best,r),r}machineHarvest(e,t,n){let r=Math.max(0,this.cropGrade(e,t)-(2-n));return this.crops[e]++,r}save(){return{crops:{...this.crops},people:{...this.people},best:this.best}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0;return!t.crops||!t.people||Object.keys(t.crops).length!==this.ids.length||!this.ids.every(e=>n(t.crops[e]))||![`player`,`mina`,`ren`].every(e=>n(t.people[e]))||Object.keys(t.people).length!==3||!n(t.best)||t.best>5?!1:(this.crops={...t.crops},this.people={...t.people},this.best=t.best,!0)}},l=[`corn`,`turnip`,`pumpkin`,`kabumorokoshi`],u={corn:{name:`トウモロコシ`,seconds:18,yield:3,price:5,size:1},turnip:{name:`カブ`,seconds:11,yield:2,price:4,size:.72},kabumorokoshi:{name:`かぶもろこし`,seconds:11,yield:3,price:5,size:.8},pumpkin:{name:`カボチャ`,seconds:90,yield:1,price:42,size:.82}},d={x:-2.8,z:4.8},f=[{id:`pantry`,title:`街の共同台所`,detail:`戻ってきた人たちの食卓へ。`,needs:{corn:6,turnip:0,pumpkin:0,kabumorokoshi:0},coins:50},{id:`soup`,title:`あたたかいスープ`,detail:`片付けを手伝うみんなの昼ごはん。`,needs:{corn:0,turnip:4,pumpkin:0,kabumorokoshi:0},coins:28},{id:`autumn`,title:`秋色の食卓`,detail:`じっくり育てたカボチャを、街の食卓へ。`,needs:{corn:0,turnip:0,pumpkin:3,kabumorokoshi:0},coins:150},{id:`builders`,title:`港の準備隊のお弁当`,detail:`港を調べる人たちへ、畑からの差し入れ。`,needs:{corn:3,turnip:3,pumpkin:0,kabumorokoshi:0},coins:45}],p={x:10.5,z:-7.6},m=[`corn`,`turnip`,`pumpkin`],h=[{crop:`kabumorokoshi`,parents:[`corn`,`turnip`],samples:12}];function g(e,t){if(e!==t&&m.includes(e)&&m.includes(t))return h.find(n=>n.parents.includes(e)&&n.parents.includes(t))}function _(e){return`<p class="note-intro">育ててきた作物から、新しい種を。実験台を導入したら、親の実りを倉庫へ預けよう。配合種は親にできません。</p>${h.map(t=>`<article class="investment-card"><h3>${u[t.crop].name}</h3><p>${t.parents.map(e=>u[e].name).join(` × `)}<br>${u[t.crop].seconds}秒で${u[t.crop].yield}個。コーンの収量と、カブの育つ速さを受け継ぎます。</p><p>${t.parents.map(n=>`${u[n].name}：栽培経験 ${e.expertise.crops[n]} / 40回・倉庫 ${e.stock[n]} / ${t.samples}個`).join(`<br>`)}</p><small>発見時に倉庫から各${t.samples}個を使います。発見後の種は無料。新しい品種の栽培経験はEから育てます。基本作物の注文や料理の原料を置き換えることはできません。</small><button data-breed="${t.crop}" id="breed-${t.crop}" ${e.breedReason(...t.parents)?`disabled`:``}>${e.breedReason(...t.parents)||`この組み合わせで種をつくる`}</button></article>`).join(``)}`}var v={pumpkin:`カボチャ`,corn:`コーン`,turnip:`カブ`,bread:`コーンパン`,soup:`野菜スープ`,apple:`リンゴ`,coins:`メニー`},y=[{id:`family`,name:`ユイと家族`,requires:`cottage-welcome`,x:16,z:1,chapters:[{title:`朝ごはんのある家`,detail:`「帰ってきた朝に、温かいごはんを。農園の実りを少し分けてもらえますか？」`,thanks:`ユイ「窓辺に花も飾ったの。また寄ってね！」`,target:80,accepts:{pumpkin:48,corn:6,turnip:5,bread:30,soup:40,coins:1}},{title:`庭で、ひと休み`,detail:`「庭にテーブルを置いて、ご近所さんと実りを分け合いたいの。」`,thanks:`ユイ「次はみんなで、この庭を囲みましょう。」`,target:180,accepts:{pumpkin:48,corn:6,apple:9,bread:30,coins:1}},{title:`ただいまが聞こえる庭`,detail:`「昔の友達も帰ってくるって。みんなを迎える食卓を、もう一度。」`,thanks:`ユイ「この街に帰ってきて、よかった！」`,target:360,accepts:{turnip:5,apple:9,soup:40,coins:1}}]},{id:`market`,name:`青果商のハル`,requires:`town-market`,x:-6.5,z:1,chapters:[{title:`色の並ぶ青果市`,detail:`「再開した売り場に、農園の色を並べよう。小さな納品からで大丈夫！」`,thanks:`ハル「通りがかった人が、足を止めてくれたよ。」`,target:100,accepts:{pumpkin:48,corn:6,turnip:5,apple:9,coins:1}},{title:`買い物帰りの休憩所`,detail:`「立ち話のできる場所があるといいね。売り上げでも実りでも、力を貸してほしい。」`,thanks:`ハル「ここで話していると、街のことが見えてくるね。」`,target:250,accepts:{pumpkin:48,corn:6,bread:30,apple:9,coins:1}},{title:`週末の小さな市`,detail:`「近くの家からも出店したいって。食べ物と花が並ぶ市にしよう！」`,thanks:`ハル「農園の実りが、人を呼ぶ市になった！」`,target:500,accepts:{pumpkin:48,corn:6,turnip:5,bread:30,soup:40,apple:9,coins:1}}]},{id:`cooperative`,name:`納屋番のソラ`,requires:`barn-open`,x:-2.2,z:-.4,chapters:[{title:`働いたあとのひと皿`,detail:`「納屋を使うみんなで、ひと休みできる場所をつくろう。」`,thanks:`ソラ「仕事の合間にも、顔を合わせられるね。」`,target:100,accepts:{pumpkin:48,corn:6,turnip:5,soup:40,coins:1}},{title:`仲間と囲む昼ごはん`,detail:`「それぞれの畑の話をしながら食べたいな。少しずつ持ち寄ろう。」`,thanks:`ソラ「農園の工夫を話せる仲間が増えたよ。」`,target:220,accepts:{pumpkin:48,corn:6,bread:30,soup:40,coins:1}},{title:`実りを持ち寄る日`,detail:`「家族も青果市の人も呼んで、農園で育ったものを分け合いたい。」`,thanks:`ソラ「ひとりの畑から、みんなの農園になったね！」`,target:420,accepts:{pumpkin:48,corn:6,turnip:5,apple:9,bread:30,soup:40,coins:1}}]}],b=class{progress={family:{chapter:0,contributed:0},market:{chapter:0,contributed:0},cooperative:{chapter:0,contributed:0}};get hasProgress(){return Object.values(this.progress).some(e=>e.chapter>0||e.contributed>0)}available(e,t){return e===`coins`?t.coins:e===`apple`?t.orchard.fruit.apple:e===`bread`||e===`soup`?t.kitchen.goods[e]:t.cargo[e]}offer(e,t,n){let r=y.find(t=>t.id===e);if(!r||!n.residentsArrived||!n.projects.has(r.requires))return null;let i=this.progress[e],a=r.chapters[i.chapter],o=a?.accepts[t];if(!o)return null;let s=Math.min(this.available(t,n),Math.ceil((a.target-i.contributed)/o));return s>0?{resident:e,chapter:i.chapter,kind:t,amount:s}:null}deliver(e,t){let n=y.find(t=>t.id===e.resident);if(!n||Math.hypot(t.player.x-n.x,t.player.z-n.z)>1.35||!Number.isSafeInteger(e.amount)||e.amount<=0)return!1;let r=this.offer(e.resident,e.kind,t);if(!r||r.chapter!==e.chapter||e.amount>r.amount)return!1;let i=this.progress[e.resident],a=n.chapters[i.chapter];return e.kind===`coins`?t.coins-=e.amount:e.kind===`apple`?(t.orchard.fruit.apple-=e.amount,t.orchard.donated+=e.amount):e.kind===`bread`||e.kind===`soup`?t.kitchen.goods[e.kind]-=e.amount:t.cargo[e.kind]-=e.amount,i.contributed=Math.min(a.target,i.contributed+e.amount*a.accepts[e.kind]),t.revision++,t.message=`${n.name}へ ${v[e.kind]} ${e.amount}${e.kind===`coins`?`メニー`:`個`}を届けた！`,i.contributed>=a.target&&(i.chapter++,i.contributed=0,t.settleTasks(),t.message=a.thanks),!0}save(){return Object.fromEntries(y.map(e=>[e.id,{...this.progress[e.id]}]))}restore(e){if(!e||typeof e!=`object`)return!1;let t=e;return y.every(e=>{let n=t[e.id];return n&&Number.isInteger(n.chapter)&&n.chapter>=0&&n.chapter<=e.chapters.length&&Number.isSafeInteger(n.contributed)&&n.contributed>=0&&(n.chapter===e.chapters.length?n.contributed===0:n.contributed<e.chapters[n.chapter].target)})?(this.progress=Object.fromEntries(y.map(e=>[e.id,{chapter:t[e.id].chapter,contributed:t[e.id].contributed}])),!0):!1}},x={x:-1.3,z:3.9},S={x:8.5,z:.8},C=[{id:`expansion`,x:-2,z:-6.6},{id:`north-meadow`,x:-2,z:-11.2},{id:`north-ridge`,x:-2,z:-17.4},{id:`pasture`,x:-2,z:7.2},{id:`pear-grove`,x:22.2,z:5.5},{id:`harvester`,x:10.5,z:.8},{id:`harvester-precision`,x:10.5,z:-1.4},{id:`harvester-premium`,x:10.5,z:-3.6},{id:`breeding`,x:10.5,z:-5.8},{id:`breeding-a`,x:8.1,z:-8.6},{id:`breeding-s`,x:8.1,z:-10.8},{id:`tools`,x:-.5,z:5},{id:`basket`,x:1.5,z:5},{id:`truck`,x:-2.8,z:6.1},{id:`seeder`,x:8.1,z:-2},{id:`seeder-area`,x:8.1,z:-4.2},{id:`pumpkin-seeds`,x:8.1,z:-6.4},{id:`helper`,x:4.7,z:6.1},{id:`helper-area`,x:6.7,z:6.1},{id:`driver`,x:-.6,z:6.4},{id:`warehouse`,x:-7.7,z:.3},{id:`kitchen`,x:-7.7,z:2.2},{id:`orchard`,x:18.8,z:4.8}],w=(e,t,n=1.8)=>Math.hypot(e.x-t.x,e.z-t.z)<n;function T(e){let t=e.player,n=[{id:`breeding`,title:`品種配合の実験台`,...p},{id:`restoration`,title:`掃除用具`,...x},{id:`investments`,title:`機械置き場`,...S},{id:`orders`,title:`販売車`,x:-2.8,z:4.8},{id:`storage`,title:`共同倉庫`,x:-5.5,z:.3},{id:`kitchen`,title:`加工台`,x:-7.3,z:1.4},{id:`orchard`,title:`果樹園`,x:12.6,z:2.8},...y.filter(t=>e.projects.has(t.requires)).map(e=>({...e,id:`residents`,title:e.name})),...C.map(e=>({...e,id:`investments`,title:`設備の案内`}))].filter(n=>w(t,n)&&!(n.id===`residents`&&!e.residentsArrived)&&!(n.id===`storage`&&!e.projects.has(`barn-open`))&&!(n.id===`kitchen`&&!e.investments.has(`kitchen`))&&!(n.id===`orchard`&&!e.investments.has(`orchard`))&&!(n.id===`orders`&&!e.investments.has(`truck`))).sort((e,n)=>Math.hypot(t.x-e.x,t.z-e.z)-Math.hypot(t.x-n.x,t.z-n.z))[0];if(n)return n;let r=e.plots.findIndex((n,r)=>e.isUnlocked(r)&&w(t,n,1.7));return r>=0?{id:`crops`,title:`畑 ${r+1} の作付け`,...e.plots[r]}:null}var E=class{pointer=null;origin={x:0,y:0};offset={x:0,y:0};begin(e,t,n){return this.pointer===null&&(this.pointer=e,this.origin={x:t,y:n},this.offset={x:0,y:0},!0)}move(e,t,n){if(this.pointer!==e)return;let r=t-this.origin.x,i=n-this.origin.y,a=Math.hypot(r,i),o=a>64?64/a:1;this.offset={x:r*o,y:i*o}}end(e=this.pointer){e===this.pointer&&(this.pointer=null,this.offset={x:0,y:0})}get input(){let e=Math.hypot(this.offset.x,this.offset.y);if(e<=8)return{x:0,z:0};let t=Math.min(1,(e-8)/40),n=this.offset.x/e*t,r=this.offset.y/e*t;return{x:n*.8575+r*.5145,z:-n*.5145+r*.8575}}},D=[{x:11.2,z:5},{x:14.1,z:5.2},{x:17,z:5.5},{x:20,z:4.8},{x:22.2,z:3.5}],O={sales:{x:12.6,z:2.8},seconds:75,pruneSeconds:4,pickSeconds:2.2,yield:4,capacity:24,price:7},k=class{trees=D.map(()=>({tended:!1,readyAt:0}));quality=new s(e);get fruit(){return this.quality.counts}get box(){return e.reduce((e,t)=>e+this.fruit[t],0)}set box(t){let n=t-this.box;if(n>0)this.fruit.apple+=n;else for(let t of e){let e=Math.min(this.fruit[t],-n);this.fruit[t]-=e,n+=e}}harvested=0;sold=0;donated=0;processed=0;active=-1;progress=0;get workPoint(){return this.active>=0?D[this.active]:void 0}get hasProgress(){return this.box>0||this.harvested>0||this.sold>0||this.donated>0||this.processed>0||this.trees.some(e=>e.tended)}unlocked(e,t){return t.investments.has(`orchard`)&&(n(e)===`apple`||t.investments.has(`pear-grove`))}ripe(e,t){return this.trees[e].tended&&this.trees[e].readyAt<=t}interrupt(){this.active=-1,this.progress=0}startNearby(e,r){let i=D.map((t,n)=>({i:n,distance:Math.hypot(t.x-e.player.x,t.z-e.player.z)})).filter(({i,distance:a})=>this.unlocked(i,e)&&a<1.35&&(!this.trees[i].tended||this.ripe(i,r)&&this.box+t[n(i)].yield<=O.capacity)).sort((e,t)=>e.distance-t.distance);return i[0]?(this.active=i[0].i,this.progress=0,!0):!1}step(e,i,a){if(this.active<0)return;let o=this.trees[this.active],s=o.tended,c=n(this.active),l=t[c];if(i.action=s?`picking`:`pruning`,this.progress+=e/((s?O.pickSeconds:O.pruneSeconds)*(i.investments.has(`tools`)?.65:1)),i.progress=this.progress,!(this.progress<1)){if(s){if(!this.ripe(this.active,a)||this.box+l.yield>O.capacity){this.interrupt(),i.progress=0,i.action=`idle`;return}let e=i.expertise.harvest(c,`player`,i.research);this.quality.add(c,l.yield,e),this.harvested+=l.yield,i.message=`${l.name}${l.yield}個を集荷箱へ！ 品質 ${r[e]}`}else o.tended=!0,i.message=`枝を整えた！ この木から、何度でも実りを。`;o.readyAt=Math.round(a+l.seconds*1e3),i.revision++,this.interrupt(),i.progress=0,i.action=`idle`,i.settleTasks()}}sell(n){if(!n.investments.has(`orchard`)||this.box===0||Math.hypot(n.player.x-O.sales.x,n.player.z-O.sales.z)>1.35)return!1;let r=this.box,i=e.reduce((e,n)=>e+this.quality.value(n,t[n].price),0);return n.coins+=i,n.shipped+=r,this.sold+=r,this.box=0,n.revision++,n.message=`果実${r}個を届けて +${i} メニー！`,n.settleTasks(),!0}save(){return{quality:this.quality.save(),fruit:{...this.fruit},trees:this.trees.map(e=>({...e})),box:this.box,harvested:this.harvested,sold:this.sold,donated:this.donated,processed:this.processed}}restore(t,n=!1,r=n,i=!1){if(!t||typeof t!=`object`)return!1;let a=t,o=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,c=n?0:a.donated,l=i?0:a.processed,u=i?{apple:a.box,pear:0}:a.fruit;if(!o(c)||!o(l)||!u||e.some(e=>!o(u[e]))||!Array.isArray(a.trees)||!i&&a.trees.length!==5||i&&!(a.trees.length===3||a.trees.length===5&&a.trees.slice(3).every(e=>e&&!e.tended&&e.readyAt===0))||a.trees.some(e=>!e||typeof e.tended!=`boolean`||!o(e.readyAt)||(e.tended?e.readyAt===0:e.readyAt!==0))||!o(a.box)||a.box>O.capacity||a.box!==u.apple+u.pear||!o(a.harvested)||!o(a.sold)||a.harvested!==a.box+a.sold+c+l||a.harvested>0&&!a.trees.some(e=>e.tended))return!1;let d=new s(e,u),f=i?{...a.quality,pear:[0,0,0,0,0,0]}:a.quality;return!r&&!d.restore(f,u)?!1:(this.trees=i?[...a.trees.slice(0,3).map(e=>({...e})),{tended:!1,readyAt:0},{tended:!1,readyAt:0}]:a.trees.map(e=>({...e})),this.harvested=a.harvested,this.sold=a.sold,this.donated=c,this.processed=l,this.quality=d,this.interrupt(),!0)}},A=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z);function ee(e,t,n,r){if(!n(e)||!n(t))return null;let i=(e,t)=>{let r=Math.max(1,Math.ceil(A(e,t)/.1));for(let i=1;i<=r;i++)if(!n({x:e.x+(t.x-e.x)*i/r,z:e.z+(t.z-e.z)*i/r}))return!1;return!0};if(i(e,t))return A(e,t)<.03?[]:[t];let a=.4,o=Math.floor((r.maxX-r.minX)/a)+1,s=Math.floor((r.maxZ-r.minZ)/a)+1,c=e=>({x:r.minX+e%o*a,z:r.minZ+Math.floor(e/o)*a}),l=new Map,u=(e,t)=>{if(e<0||e>=o||t<0||t>=s)return!1;let r=t*o+e;if(!l.has(r)){let e=c(r);l.set(r,n(e)&&[{x:e.x-.12,z:e.z},{x:e.x+.12,z:e.z},{x:e.x,z:e.z-.12},{x:e.x,z:e.z+.12}].every(n))}return l.get(r)},d=e=>{let t=Math.round((e.x-r.minX)/a),n=Math.round((e.z-r.minZ)/a),s=[];for(let e=-2;e<=2;e++)for(let r=-2;r<=2;r++)u(t+r,n+e)&&s.push((n+e)*o+t+r);return s.sort((t,n)=>A(c(t),e)-A(c(n),e)).find(t=>i(e,c(t)))},f=d(e),p=d(t);if(f===void 0||p===void 0)return null;let m=new Float64Array(o*s).fill(1/0),h=new Int32Array(o*s).fill(-1),g=new Set,_=e=>{let t=Math.abs(e%o-p%o),n=Math.abs(Math.floor(e/o)-Math.floor(p/o));return Math.max(t,n)+(Math.SQRT2-1)*Math.min(t,n)},v=[],y=(e,t)=>{let n=v.length;for(v.push({id:e,score:t});n>0;){let e=n-1>>1;if(v[e].score<=t)break;[v[e],v[n]]=[v[n],v[e]],n=e}},b=()=>{let e=v[0],t=v.pop();if(v.length){v[0]=t;let e=0;for(;;){let t=e*2+1;if(t>=v.length||(t+1<v.length&&v[t+1].score<v[t].score&&t++,v[e].score<=v[t].score))break;[v[e],v[t]]=[v[t],v[e]],e=t}}return e.id};m[f]=0,y(f,_(f));let x=!1;for(;v.length;){let e=b();if(g.has(e))continue;if(e===p){x=!0;break}g.add(e);let t=e%o,n=Math.floor(e/o);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(i===0&&r===0||!u(t+i,n+r)||i!==0&&r!==0&&(!u(t+i,n)||!u(t,n+r)))continue;let a=(n+r)*o+t+i,s=m[e]+(i&&r?Math.SQRT2:1);s<m[a]&&(m[a]=s,h[a]=e,y(a,s+_(a)))}}if(!x)return null;let S=[t];for(let e=p;e!==-1;e=h[e])S.push(c(e));S.reverse();let C=[],w=e,T=0;for(;T<S.length;){let e=S.length-1;for(;e>T&&!i(w,S[e]);)e--;if(!i(w,S[e]))return null;C.push(S[e]),w=S[e],T=e+1}return C}var te={x:14,z:-2,halfX:1.6,halfZ:1.6},j={x:-.6,z:2.5},M={minX:-9,maxX:35,minZ:-22,maxZ:15.5},N=class{id;position;bag=new s(l);harvested=0;planted=0;seed;target=-1;route=[];progress=0;action=`idle`;heading=0;constructor(e){this.id=e,this.position={x:14.5,z:1.5},this.seed=e===`mina`?8731:4973}get count(){return l.reduce((e,t)=>e+this.bag.counts[t],0)}reset(){this.target=-1,this.route=[],this.progress=0,this.action=`idle`}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}save(){return{position:{...this.position},goods:this.bag.save(),harvested:this.harvested,planted:this.planted,seed:this.seed}}restore(e,t){if(!e||typeof e!=`object`)return!1;let n=e,r=e=>Number.isSafeInteger(e)&&e>=0;if(!n.position||!Number.isFinite(n.position.x)||!Number.isFinite(n.position.z)||!t.canStand(n.position)||n.position.x>=23||!r(n.harvested)||!r(n.planted)||!r(n.seed)||n.seed>4294967295||!n.goods)return!1;let i=Object.fromEntries(l.map(e=>[e,Array.isArray(n.goods[e])?n.goods[e].reduce((e,t)=>e+t,0):-1])),a=new s(l);return!a.restore(n.goods,i)||Object.values(i).reduce((e,t)=>e+t,0)>12||Object.values(i).some(e=>!r(e))||l.some(e=>i[e]>0&&!t.cropUnlocked(e))||n.harvested<Object.values(i).reduce((e,t)=>e+t,0)?!1:(this.position={...n.position},this.bag=a,this.harvested=n.harvested,this.planted=n.planted,this.seed=n.seed,this.reset(),!0)}},P=class{people=[new N(`mina`),new N(`ren`)];enabled(e,t){return t.residentsArrived&&t.investments.has(e.id===`mina`?`helper`:`helper-area`)}busy(e,t){return this.people.some(n=>n!==t&&n.target===e)}cancel(){for(let e of this.people)e.reset()}step(e,t,n){for(let r of this.people){if(!this.enabled(r,n)){r.reset();continue}let i=e=>{let t=n.plots[e];return n.isUnlocked(e)&&t.land===`tilled`&&n.active!==e&&n.machinery.active!==e&&n.seederWorkingPlot!==e&&!this.busy(e,r)&&(t.stage===`empty`||t.stage===`ready`&&r.count+u[t.crop].yield<=12)};if(r.target>=0&&!i(r.target)&&r.reset(),n.helperPlot<0&&r.action!==`returning`&&r.reset(),r.action===`idle`){let e=n.helperPlot<0?[]:n.plots.map((e,t)=>t).filter(i).map(e=>({i:e,score:Math.hypot(n.plots[e].x-r.position.x,n.plots[e].z-r.position.z)*(.6+r.random()*.8)})).sort((e,t)=>e.score-t.score);if(r.count>=9||r.count>0&&!e.length||n.helperPlot<0&&r.count>0)r.route=ee(r.position,{x:-5.5,z:.3},e=>n.canStand(e),M)??[],r.action=`returning`;else if(e.length)for(let{i:t}of e){let e=n.plots[t],i=ee(r.position,{x:e.x,z:e.z+1.02},e=>n.canStand(e),M);if(i){r.target=t,r.route=i,r.action=`walking`;break}}}if(r.route.length){let t=e*2.6*n.movementFactor(r.position);for(;t>0&&r.route.length;){let e=r.route[0],n=e.x-r.position.x,i=e.z-r.position.z,a=Math.hypot(n,i),o=Math.min(a,t);a>0&&(r.heading=Math.atan2(n,i),r.position.x+=n/a*o,r.position.z+=i/a*o),t-=o,a<=o&&r.route.shift()}continue}if(r.action===`returning`){if(Math.hypot(r.position.x+5.5,r.position.z-.3)>1.35){r.reset();continue}let e=n.storageCapacity-n.stored;for(let t of l){let i=Math.min(e,r.bag.counts[t]);i&&(r.bag.moveTo(n.stockQuality,t,i),e-=i,n.revision++)}r.count===0&&r.reset();continue}if(r.target<0)continue;let a=n.plots[r.target];if(r.action=a.stage===`empty`?`planting`:`harvesting`,r.progress+=e/(r.action===`planting`?2:3),!(r.progress<1)){if(r.action===`planting`)a.crop=a.nextCrop,a.stage=`growing`,a.readyAt=t+Math.round(n.growSeconds(a.crop)*1e3),r.planted++;else{let e=u[a.crop].yield;r.bag.add(a.crop,e,n.expertise.harvest(a.crop,r.id,n.research)),a.stage=`empty`,r.harvested+=e,n.helperHarvested+=e}n.revision++,r.reset()}}}save(){return Object.fromEntries(this.people.map(e=>[e.id,e.save()]))}restore(e,t){if(!e||typeof e!=`object`||Object.keys(e).length!==2)return!1;let n=e,r=[new N(`mina`),new N(`ren`)];return!r.some(e=>!e.restore(n[e.id],t)||!t.investments.has(e.id===`mina`?`helper`:`helper-area`)&&(e.count>0||e.harvested>0||e.planted>0))&&(this.people=r,!0)}},ne=[{title:`小さな収穫ロボット`,seconds:6,speed:.65,penalty:2},{title:`精密収穫ユニット`,seconds:3,speed:1.25,penalty:1},{title:`高性能収穫ユニット`,seconds:1.2,speed:2.5,penalty:0}],re=e=>[{x:e.x,z:e.z+1.4},{x:-2,z:e.z+1.4},{x:-2,z:.3},{x:-5.5,z:.3}];function ie(e){return e.slice(1).reduce((t,n,r)=>t+Math.hypot(n.x-e[r].x,n.z-e[r].z),0)}function ae(e,t){for(let n=1;n<e.length;n++){let r=e[n-1],i=e[n],a=Math.hypot(i.x-r.x,i.z-r.z);if(!(a<1e-6)){if(t<=a)return{x:r.x+(i.x-r.x)*t/a,z:r.z+(i.z-r.z)*t/a};t-=a}}return{...e.at(-1)}}var oe=class{anchor=-1;paused=!1;harvested=0;delivered=0;loads=[];active=-1;progress=0;cursor=-1;tier(e){return e.investments.has(`harvester-premium`)?2:+!!e.investments.has(`harvester-precision`)}get inTransit(){return this.loads.reduce((e,t)=>e+t.count,0)}get hasProgress(){return this.anchor!==-1||this.paused||this.harvested>0||this.delivered>0||this.loads.length>0}plots(e){return this.anchor<0?[]:e.plots.map((e,t)=>t).filter(t=>Math.floor(t/3)===Math.floor(this.anchor/3)&&e.isUnlocked(t)&&e.plots[t].land===`tilled`)}configure(e,t,n){return!n.investments.has(`harvester`)||!Number.isInteger(e)||e<-1||e>=n.plots.length||e>=0&&(!n.isUnlocked(e)||n.plots[e].land!==`tilled`)?!1:(this.anchor=e,this.paused=t,this.active=-1,this.progress=0,this.cursor=-1,n.revision++,!0)}step(e,t){if(!t.investments.has(`harvester`)||this.paused)return;let n=ne[this.tier(t)];for(let r of this.loads){let i=ie(re(t.plots[r.plot]));r.travelled=Math.min(i,r.travelled+e*n.speed)}this.loads=this.loads.filter(e=>e.travelled<ie(re(t.plots[e.plot]))||t.stored+e.count>t.storageCapacity||(t.stockQuality.add(e.crop,e.count,e.grade),this.delivered+=e.count,t.revision++,!1));let r=e=>{let n=t.plots[e];return n.stage===`ready`&&t.active!==e&&!t.workers.busy(e)&&this.inTransit+u[n.crop].yield<=12},i=this.plots(t);if(this.active>=0&&(!i.includes(this.active)||!r(this.active))&&(this.active=-1,this.progress=0),this.active<0){let e=i.indexOf(this.cursor)+1;this.active=[...i.slice(e),...i.slice(0,e)].find(r)??-1}if(this.active<0||(this.progress+=e/n.seconds,this.progress<1))return;let a=t.plots[this.active],o=u[a.crop].yield,s=t.expertise.machineHarvest(a.crop,t.research,this.tier(t));this.loads.push({plot:this.active,crop:a.crop,count:o,grade:s,travelled:0}),a.stage=`empty`,this.harvested+=o,this.cursor=this.active,this.active=-1,this.progress=0,t.revision++}save(){return{anchor:this.anchor,paused:this.paused,harvested:this.harvested,delivered:this.delivered,loads:this.loads.map(e=>({...e}))}}restore(e,t){if(!e||typeof e!=`object`)return!1;let n=e,r=e=>Number.isSafeInteger(e)&&e>=0;if(!Number.isInteger(n.anchor)||n.anchor<-1||n.anchor>=t.plots.length||typeof n.paused!=`boolean`||!r(n.harvested)||!r(n.delivered)||!Array.isArray(n.loads)||n.loads.length>12||n.anchor>=0&&(!t.isUnlocked(n.anchor)||t.plots[n.anchor].land!==`tilled`)||n.loads.some(e=>!e||!r(e.plot)||e.plot>=t.plots.length||!t.isUnlocked(e.plot)||!l.includes(e.crop)||!t.cropUnlocked(e.crop)||!r(e.grade)||e.grade>5||!r(e.count)||e.count!==u[e.crop].yield||!Number.isFinite(e.travelled)||e.travelled<0||e.travelled>ie(re(t.plots[e.plot]))))return!1;let i=n.loads.reduce((e,t)=>e+t.count,0);return i>12||n.harvested!==n.delivered+i||!t.investments.has(`harvester`)&&(n.anchor!==-1||n.paused||n.harvested>0)?!1:(this.anchor=n.anchor,this.paused=n.paused,this.harvested=n.harvested,this.delivered=n.delivered,this.loads=n.loads.map(e=>({...e})),this.active=-1,this.progress=0,this.cursor=-1,!0)}},se=class{paid={};target=null;dwell=0;fraction=0;reset(){this.target=null,this.dwell=0,this.fraction=0}step(e,t,n,r){if(t||!n||e<=0)return this.reset(),{charged:0,complete:!1};n.id!==this.target&&(this.reset(),this.target=n.id);let i=this.dwell;this.dwell+=e;let a=Math.max(0,this.dwell-1)-Math.max(0,i-1),o=Math.max(0,n.cost-(this.paid[n.id]??0));if(r<=0||o<=0)return this.fraction=0,{charged:0,complete:o===0};this.fraction+=a*Math.max(5,n.cost/10);let s=Math.min(r,o,Math.floor(this.fraction));return this.fraction-=s,s>0&&(this.paid[n.id]=(this.paid[n.id]??0)+s),s===r&&(this.fraction=0),{charged:s,complete:s===o}}save(){return{...this.paid}}restore(e,t,n){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let r=Object.entries(e);return r.every(([e,r])=>{let i=t.find(t=>t.id===e);return i&&!n(e)&&Number.isSafeInteger(r)&&r>0&&r<i.cost})?(this.paid=Object.fromEntries(r),this.reset(),!0):!1}},F=[`moving`,`working`,`looking`,`notebook`,`idle`,`unobserved`],ce={shipment:`最初の出荷`,investment:`最初の投資`,automation:`初めて作業を任せた日`,"phase-2":`手入れの始まった街`,"phase-3":`農園が育つ街`,"phase-4":`暮らしの戻る街`,complete:`農業地区の復興`},le=class{seconds={moving:0,working:0,looking:0,notebook:0,idle:0,unobserved:0};milestones={};partial=!1;previous=null;activity=`excluded`;inputAt=-1/0;get activeSeconds(){return this.seconds.moving+this.seconds.working+this.seconds.looking}sample(e,t){if(!(!Number.isFinite(e)||e<0||this.previous!==null&&e<this.previous)){if(this.previous!==null&&this.activity!==`excluded`){let t=e-this.previous;if(t>2e3)this.seconds.unobserved+=t/1e3;else{let n=Math.max(0,Math.min(e,this.inputAt+3e4)-this.previous)/1e3;this.seconds[this.activity]+=n,this.seconds.idle+=t/1e3-n}}this.previous=e,this.activity=t}}interact(e,t){this.sample(e,t),Number.isFinite(e)&&e>=0&&this.previous===e&&(this.inputAt=e)}observe(e,t=!1){for(let n of e)Object.hasOwn(this.milestones,n)||(this.milestones[n]=t?null:{active:this.activeSeconds,notebook:this.seconds.notebook})}save(){return{seconds:{...this.seconds},partial:this.partial,milestones:Object.fromEntries(Object.entries(this.milestones).map(([e,t])=>[e,t?{...t}:null]))}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>typeof e==`number`&&Number.isFinite(e)&&e>=0&&e<=2**53-1;if(!t.seconds||F.some(e=>!n(t.seconds[e]))||typeof t.partial!=`boolean`||!t.milestones||typeof t.milestones!=`object`||Array.isArray(t.milestones))return!1;let r=t.seconds.moving+t.seconds.working+t.seconds.looking;return Object.entries(t.milestones).every(([e,i])=>Object.hasOwn(ce,e)&&(i===null||typeof i==`object`&&n(i.active)&&i.active<=r&&n(i.notebook)&&i.notebook<=t.seconds.notebook))?(this.seconds={...t.seconds},this.milestones=Object.fromEntries(Object.entries(t.milestones).map(([e,t])=>[e,t?{...t}:null])),this.partial=t.partial,this.previous=null,this.activity=`excluded`,this.inputAt=-1/0,!0):!1}},ue={all:{title:`余りをすべて出荷する`,keep:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}},kitchen:{title:`加工1回分を残す`,keep:{corn:6,turnip:4,pumpkin:0,kabumorokoshi:0}},pantry:{title:`街への納品分を残す`,keep:{corn:12,turnip:12,pumpkin:0,kabumorokoshi:0}}},I={seconds:12,load:12,fee:1},de=class{enabled=!1;policy=`kitchen`;sold=0;earned=0;progress=0;get hasProgress(){return this.enabled||this.sold>0||this.earned>0||this.policy!==`kitchen`}configure(e,t,n){return!n.residentsArrived||!n.investments.has(`driver`)||typeof e!=`boolean`||!Object.hasOwn(ue,t)?!1:(this.enabled=e,this.policy=t,this.progress=0,n.revision++,!0)}available(e){let t=ue[this.policy].keep;return l.reduce((n,r)=>n+Math.max(0,e.stock[r]-t[r]),0)}step(e,t){if(!t.residentsArrived||!this.enabled||!t.investments.has(`driver`)||this.available(t)===0){this.progress=0;return}if(this.progress+=e/I.seconds,this.progress<1)return;let n=I.load,r=0,i=0;for(let e of l){let a=Math.min(n,Math.max(0,t.stock[e]-ue[this.policy].keep[e]));i+=t.stockQuality.value(e,t.salePrice(e),a)-a*I.fee,t.stock[e]-=a,n-=a,r+=a}t.coins+=i,t.shipped+=r,this.sold+=r,this.earned+=i,this.progress=0,t.revision++}save(){return{enabled:this.enabled,policy:this.policy,sold:this.sold,earned:this.earned}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.enabled!=`boolean`||!Object.hasOwn(ue,t.policy)||!Number.isSafeInteger(t.sold)||t.sold<0||!Number.isSafeInteger(t.earned)||t.earned<0||t.sold===0&&t.earned!==0?!1:(this.enabled=t.enabled,this.policy=t.policy,this.sold=t.sold,this.earned=t.earned,this.progress=0,!0)}},fe={x:-7.3,z:1.4,capacity:36},L=[`bread`,`soup`,`pumpkinSoup`,`pumpkinPie`,`appleJam`,`pearCompote`,`fruitTart`,`hybridGratin`],pe=(e={})=>Object.fromEntries(L.map(t=>[t,e[t]??0])),me={bread:{name:`コーンパン`,needs:{corn:6,turnip:0,pumpkin:0,kabumorokoshi:0},seconds:8,yield:2,price:22},pumpkinSoup:{name:`カボチャポタージュ`,needs:{corn:2,turnip:0,pumpkin:2,kabumorokoshi:0},seconds:14,yield:3,price:42},pumpkinPie:{name:`カボチャパイ`,needs:{corn:4,turnip:0,pumpkin:1,kabumorokoshi:0},seconds:20,yield:2,price:48},appleJam:{name:`リンゴジャム`,needs:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{apple:6},seconds:18,yield:3,price:21},pearCompote:{name:`ナシのコンポート`,needs:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{pear:6},seconds:22,yield:3,price:42},fruitTart:{name:`果樹園のタルト`,needs:{corn:3,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{apple:3,pear:3},seconds:26,yield:3,price:42},hybridGratin:{name:`かぶもろこしグラタン`,needs:{corn:0,turnip:2,pumpkin:0,kabumorokoshi:6},seconds:16,yield:2,price:30},soup:{name:`野菜スープ`,needs:{corn:2,turnip:4,pumpkin:0,kabumorokoshi:0},seconds:12,yield:2,price:30}},he=[{id:`harvestTable`,title:`秋の収穫の食卓`,detail:`農園で育ったカボチャを、二つのおいしさに。`,needs:pe({pumpkinSoup:2,pumpkinPie:2}),coins:220},{id:`teaTime`,title:`果樹園のお茶会`,detail:`リンゴとナシを使った、街の午後のお楽しみ。`,needs:pe({appleJam:1,pearCompote:1,fruitTart:2}),coins:185},{id:`newFlavor`,title:`新しい実りの試食会`,detail:`新しい品種の味を、近所のみんなに。`,needs:pe({hybridGratin:3,fruitTart:1}),coins:160},{id:`breakfast`,title:`街の朝ごはん`,detail:`帰ってきた家族に、焼きたてのパンを。`,needs:pe({bread:3,soup:1}),coins:110},{id:`workers`,title:`畑仕事のお昼`,detail:`作業の合間に温かいスープを囲もう。`,needs:pe({soup:4}),coins:138},{id:`gathering`,title:`週末の集まり`,detail:`久しぶりの顔も集まる、にぎやかな食卓へ。`,needs:pe({bread:4,soup:4}),coins:240}],ge=class{plan=`none`;quality=new s(L);get goods(){return this.quality.counts}set goods(e){this.quality=new s(L,e)}crafted=0;orders={breakfast:0,workers:0,gathering:0,harvestTable:0,teaTime:0,newFlavor:0};progress=0;get stored(){return L.reduce((e,t)=>e+this.goods[t],0)}get hasProgress(){return this.plan!==`none`||this.crafted>0||this.stored>0||Object.values(this.orders).some(e=>e>0)}unlocked(t,n){let r=me[t];return l.every(e=>r.needs[e]===0||n.cropUnlocked(e))&&e.every(e=>!r.fruit?.[e]||n.investments.has(e===`apple`?`orchard`:`pear-grove`))}reason(t){if(!t.investments.has(`kitchen`))return`納屋の加工台を導入すると使えます`;if(this.plan===`none`)return`加工をお休みしています`;let n=me[this.plan];if(this.stored+n.yield>fe.capacity)return`食品棚がいっぱいです。売り先へ届けよう`;let r=l.filter(e=>t.stock[e]<n.needs[e]),i=e.filter(e=>t.orchard.fruit[e]<(n.fruit?.[e]??0));return r.length?`倉庫の材料を待っています`:i.length?`果樹園の集荷箱の材料を待っています`:``}setPlan(e,t){return!t.investments.has(`kitchen`)||![`none`,...L].includes(e)||e!==`none`&&!this.unlocked(e,t)?!1:this.plan===e||(this.plan=e,this.progress=0,t.revision++,!0)}step(t,n){if(this.reason(n)){this.progress=0;return}let r=this.plan,i=me[r];if(this.progress+=t/i.seconds,this.progress<1)return;let a=l.flatMap(e=>n.stockQuality.peek(e,i.needs[e]).flatMap((e,t)=>e?[t]:[]));for(let t of e)a.push(...n.orchard.quality.peek(t,i.fruit?.[t]??0).flatMap((e,t)=>e?[t]:[]));let o=Math.min(...a);for(let t of e){let e=i.fruit?.[t]??0;n.orchard.fruit[t]-=e,n.orchard.processed+=e}for(let e of l)n.stock[e]-=i.needs[e];this.quality.add(r,i.yield,o),this.crafted+=i.yield,this.progress=0,n.revision++}orderCoins(e){let t=he.find(t=>t.id===e),n=L.reduce((e,n)=>e+t.needs[n]*me[n].price,0),r=L.reduce((e,n)=>e+this.quality.value(n,me[n].price,t.needs[n])+Math.max(0,t.needs[n]-this.goods[n])*me[n].price,0);return Math.round(t.coins*r/n)}deliveryReason(e,t){if(!t.investments.has(`kitchen`))return`先に加工台を導入しよう`;if(e===`all`)return this.stored===0?`食品棚が空です`:``;if(!t.investments.has(`truck`))return`販売車を購入すると配達できます`;let n=he.find(t=>t.id===e);return n?L.filter(e=>this.goods[e]<n.needs[e]).map(e=>`${me[e].name} あと${n.needs[e]-this.goods[e]}個`).join(`・`):`見つからない注文です`}deliver(e,t){let n=e===`all`?fe:d;if(this.deliveryReason(e,t)||Math.hypot(n.x-t.player.x,n.z-t.player.z)>1.35)return!1;let r=0;if(e===`all`)for(let e of L)r+=this.quality.value(e,me[e].price),this.goods[e]=0;else{let t=he.find(t=>t.id===e),n=L.reduce((e,n)=>e+t.needs[n]*me[n].price,0),i=L.reduce((e,n)=>e+this.quality.value(n,me[n].price,t.needs[n]),0);r=Math.round(t.coins*i/n);for(let e of L)this.goods[e]-=t.needs[e];this.orders[e]++}return t.coins+=r,t.revision++,t.message=`農園の味を届けて +${r} メニー！`,!0}save(){return{quality:this.quality.save(),plan:this.plan,goods:{...this.goods},crafted:this.crafted,orders:{...this.orders}}}restore(e,t=!1,n=!1){if(!e||typeof e!=`object`)return!1;let r=e,i=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,a=L.filter(e=>e!==`bread`&&e!==`soup`),o=n?{...r.goods,...Object.fromEntries(a.map(e=>[e,0]))}:r.goods,c=n?{...r.orders,harvestTable:0,teaTime:0,newFlavor:0}:r.orders,l=n?{...r.quality,...Object.fromEntries(a.map(e=>[e,[0,0,0,0,0,0]]))}:r.quality;if(![`none`,...L].includes(r.plan)||n&&r.plan!==`none`&&a.includes(r.plan)||!o||L.some(e=>!i(o[e]))||L.reduce((e,t)=>e+o[t],0)>fe.capacity||!i(r.crafted)||r.crafted<L.reduce((e,t)=>e+o[t],0)||!c||he.some(e=>!i(c[e.id])))return!1;let u=new s(L,o);return!t&&!u.restore(l,o)?!1:(this.plan=r.plan,this.crafted=r.crafted,this.orders={...c},this.progress=0,this.quality=u,!0)}},_e={entry:{x:26,z:3},nets:{x:29,z:3},sales:{x:26,z:.5},pier:{x:29,z:3},capacity:24,price:8},ve=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z)<1.2,ye=class{cleaned=!1;pier=!1;boat=!1;fish=0;sold=0;supplied=0;supply=`none`;active=null;progress=0;boatProgress=0;get workPoint(){return this.active?_e.nets:void 0}get points(){return(this.cleaned?20:0)+(this.pier?60:0)+(this.boat?30:0)+(this.sold>=12?20:0)+(this.supplied>=6?30:0)}get percent(){return Math.min(100,Math.floor(this.points/10))}get hasProgress(){return this.cleaned||this.pier||this.boat||this.fish>0||this.sold>0||this.supplied>0||this.supply!==`none`}interrupt(){this.active=null,this.progress=0}reason(e,t){return t.agricultureComplete?e===`nets`?this.cleaned?`片付け済み`:``:this.pier?`修理済み`:this.cleaned?this.sold<12?`魚をあと${12-this.sold}匹出荷しよう`:t.coins<200?`あと${200-t.coins}メニー`:``:`先に浜の網を片付けよう`:`農業地区を復興すると港へ進めます`}start(e,t){return this.reason(e,t)||!ve(t.player,_e.nets)?!1:(t.interrupt(),this.active=e===`nets`?`cleaning`:`repairing`,!0)}buyBoat(e){return!e.agricultureComplete||!this.pier||this.boat||e.coins<400?!1:(e.coins-=400,this.boat=!0,e.revision++,e.message=`小さな漁船を迎えました！`,!0)}setSupply(e,t){return!t.agricultureComplete||e!==`none`&&!l.includes(e)?!1:(this.supply=e,t.revision++,!0)}catchFish(e){let t=_e.capacity-this.fish;if(t<=0)return!1;let n=this.supply!==`none`&&e.stock[this.supply]>0&&t>=2;return n&&(e.stock[this.supply]--,this.supplied++),this.fish+=n?2:1,e.revision++,!0}automate(e,t){if(!t.agricultureComplete||!this.boat||this.fish>=_e.capacity){this.boatProgress=0;return}this.boatProgress+=e/8,this.boatProgress>=1&&(this.catchFish(t),this.boatProgress=0)}step(e,t){if(t.agricultureComplete){if(this.active){this.progress+=e/(this.active===`cleaning`?3:this.active===`repairing`?5:4),this.progress>=1&&(this.active===`cleaning`?(this.cleaned=!0,t.message=`浜が片付いた！ ここで網を引いてみよう。`,t.revision++):this.active===`repairing`?this.reason(`pier`,t)||(t.coins-=200,this.pier=!0,t.revision++,t.message=`桟橋が直った！ 漁船を迎えられます。`):this.catchFish(t)&&(t.message=`魚が揚がった！ 水揚げ箱に集めよう。`),this.interrupt());return}if(ve(t.player,_e.sales)&&this.fish>0){let e=this.fish;this.sold+=e,t.coins+=e*_e.price,this.fish=0,t.revision++,t.message=`魚を${e}匹出荷して +${e*_e.price} メニー！`;return}ve(t.player,_e.nets)&&this.fish<_e.capacity&&(this.active=this.cleaned?`fishing`:`cleaning`)}}save(){return{cleaned:this.cleaned,pier:this.pier,boat:this.boat,fish:this.fish,sold:this.sold,supplied:this.supplied,supply:this.supply}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e;return[`cleaned`,`pier`,`boat`].some(e=>typeof t[e]!=`boolean`)||[t.fish,t.sold,t.supplied].some(e=>!Number.isSafeInteger(e)||e<0)||t.fish>_e.capacity||t.supply!==`none`&&!l.includes(t.supply)||t.pier&&(!t.cleaned||t.sold<12)||t.boat&&!t.pier||(t.fish>0||t.sold>0||t.supplied>0)&&!t.cleaned?!1:(Object.assign(this,{cleaned:t.cleaned,pier:t.pier,boat:t.boat,fish:t.fish,sold:t.sold,supplied:t.supplied,supply:t.supply}),this.interrupt(),this.boatProgress=0,!0)}},R=[{id:`lane-west`,title:`出荷道の草を片付ける`,detail:`木箱へ続く道を、歩きやすく。`,x:-5.8,z:2.2,seconds:3,cost:0,kind:`cleaning`},{id:`lane-east`,title:`畑の通り道を整える`,detail:`畑と南の土地を結ぶ道に日差しを。`,x:4.7,z:4.9,seconds:3,cost:0,kind:`cleaning`},{id:`barn-walls`,title:`納屋の外壁を掃除する`,detail:`赤い壁を洗い、入口のがれきを片付ける。`,x:-5.5,z:.3,seconds:4,cost:0,kind:`cleaning`},{id:`barn-roof`,title:`納屋の屋根を修理する`,detail:`雨をしのげる納屋へ。まずは屋根を直す。`,x:-5.5,z:.3,seconds:5,cost:120,kind:`repairing`,requires:`barn-walls`,shipped:24},{id:`fence`,title:`道沿いの柵を直す`,detail:`出荷道に、小さな白い柵を。`,x:-6.8,z:4.3,seconds:3.5,cost:60,kind:`repairing`,requires:`lane-west`},{id:`barn-open`,title:`納屋を再開する`,detail:`扉と売り場を直し、収穫を蓄える共同倉庫を開こう。`,x:-5.5,z:.3,seconds:6,cost:200,kind:`repairing`,requires:`barn-roof`,shipped:60},{id:`cottage-yard`,title:`空き家の庭を片付ける`,detail:`農園の隣で、帰ってこられる場所を整えよう。`,x:14.5,z:.2,seconds:4,cost:0,kind:`cleaning`},{id:`cottage-repair`,title:`空き家の屋根と窓を直す`,detail:`農場の収入で、暮らせる家に。`,x:14.5,z:.2,seconds:6,cost:250,kind:`repairing`,requires:`cottage-yard`},{id:`cottage-welcome`,title:`帰ってくる家族を迎える`,detail:`修復した家へ、かごに入れた食料を届けよう。`,x:14.5,z:.2,seconds:3,cost:0,kind:`cleaning`,requires:`cottage-repair`,supplies:{corn:6,turnip:6,pumpkin:0,kabumorokoshi:0}},{id:`town-well`,title:`街の共同井戸を整える`,detail:`毎日の水仕事を楽に。これから植える作物が15%早く育ちます。`,x:11.2,z:1.7,seconds:5,cost:300,kind:`repairing`,requires:`cottage-yard`},{id:`town-orchard`,title:`街路樹を手入れする`,detail:`枝を整え、農園と住宅地の緑を取り戻そう。`,x:17,z:4,seconds:5,cost:180,kind:`cleaning`,requires:`cottage-yard`},{id:`town-market`,title:`青果市を開く`,detail:`納屋に街の売り場を。通常出荷の単価が1メニー増えます。`,x:-5.5,z:.3,seconds:5,cost:400,kind:`repairing`,requires:`barn-open`},{id:`town-pantry`,title:`街の食料庫を満たす`,detail:`家族が安心して暮らせるように、農園の実りを蓄えよう。`,x:14.5,z:.2,seconds:3,cost:0,kind:`cleaning`,requires:`cottage-welcome`,supplies:{corn:12,turnip:12,pumpkin:0,kabumorokoshi:0}}],be=e=>R.find(t=>t.id===e),xe=[`barn-open`,`cottage-welcome`,`town-market`],Se=[`忘れられた農園`,`手入れの始まった街`,`暮らしの準備`,`人の戻る街`,`実りを分け合う街`],z={speed:3.3,range:1.35,clearSeconds:1.8,tillSeconds:1.5,plantSeconds:.8,harvestSeconds:1.1,growSeconds:18,capacity:24,price:5,stagePoints:1e3},Ce=[{id:`expansion`,title:`北の土地を開く`,price:90,detail:`畑を6区画から9区画へ。新しい土地は自分で片付けます。`,tradeoff:`収量を増やせるぶん、手入れと運搬が増えます。`},{id:`north-meadow`,title:`北の草原を開く`,price:900,detail:`北の通り沿いに6区画を開きます。既存の農地と独立して購入できます。`,tradeoff:`土地から片付け、新しい生産拠点を育てます。`},{id:`north-ridge`,title:`北の奥地を開く`,price:1500,detail:`さらに北へ6区画。広い農園の奥にも拠点を作れます。`,tradeoff:`運ぶ距離が長くなります。大きなかごや運搬への投資も考えよう。`},{id:`harvester`,title:`小さな収穫ロボット`,price:1200,minimumGrade:2,requires:`barn-open`,detail:`1列を6秒ずつ収穫し、コンベアで倉庫へ運びます。作物の到達品質から2ランク下がります（下限E）。`,tradeoff:`種まきは別の担当。移動中も働きますが、運搬はゆっくりです。`},{id:`harvester-precision`,title:`精密収穫ユニット`,price:4200,equipment:`harvester`,detail:`収穫を3秒に短縮。品質低下を1ランクに抑え、運搬も速くします。`,tradeoff:`手作業の品質に近づけたいときの設備更新。`},{id:`harvester-premium`,title:`高性能収穫ユニット`,price:12500,equipment:`harvester-precision`,detail:`1.2秒で収穫し、作物の到達品質を維持。コンベアも最速になります。`,tradeoff:`設備投資は大きめ。品種の熟練は作物を育てて磨きます。`},{id:`breeding`,title:`品種配合の実験台`,price:2400,minimumGrade:2,requires:`barn-open`,detail:`基本の作物を掛け合わせ、新しい種を見つけます。各親作物の栽培経験と倉庫の実りを使います。`,tradeoff:`配合種をもう一度親にすることはできません。基本作物は注文や料理にも必要です。`},{id:`breeding-a`,title:`品種改良の研究台`,price:3600,minimumGrade:3,detail:`Bランクの収穫を経験したら、作物の品質上限をAへ広げます。`,tradeoff:`良い品種を育てるには、作物の熟練と収穫する人の技能も必要です。`},{id:`breeding-s`,title:`選抜育種の研究設備`,price:12e3,minimumGrade:4,equipment:`breeding-a`,detail:`Aランクの収穫を経験したら、品質上限をSへ広げます。`,tradeoff:`設備だけでは高品質になりません。経験を積んだ作物と人を育てよう。`},{id:`tools`,title:`使いやすい農具`,price:60,detail:`草刈り・耕作・種まき・収穫の手作業時間を35%短縮します。`,tradeoff:`広い土地を手作業で育てたいときに。`},{id:`seeder`,minimumGrade:2,title:`小さな種まき機`,price:90,detail:`選んだ耕作済みの1区画に、2.4秒で自動で種をまきます。`,tradeoff:`収穫は自分で。空いた時間を次の開拓に使えます。`},{id:`helper`,title:`ミナを農園に迎える`,price:240,requires:`barn-open`,detail:`ミナが整えた農地を歩き回り、種まき・収穫・倉庫への運搬を手伝います。`,tradeoff:`初心者から経験を積み、自分の収穫技能を育てていきます。`},{id:`truck`,title:`小さな販売車`,price:180,detail:`街の注文へ作物を届けられるようになります。通常出荷も続けられます。`,tradeoff:`作物を揃える手間のぶん、注文は高く買い取ってもらえます。`},{id:`pasture`,title:`南の草地を開拓する`,price:360,detail:`道の先に6区画を追加します。草刈りと耕作から、新しい農園を育てよう。`,tradeoff:`近くの3区画を買わずに、こちらを先に開くこともできます。出荷までの距離が長くなります。`},{id:`basket`,title:`大きな収穫かご`,price:120,detail:`かごの容量が24個から48個に。まとめて収穫し、出荷の往復を減らせます。`,tradeoff:`手作業中心でも、倉庫からまとめて運ぶときにも役立ちます。`},{id:`warehouse`,title:`納屋に収納棚を増やす`,price:220,requires:`barn-open`,detail:`共同倉庫が96個から192個に。別の仕事中も、収穫を多く蓄えられます。`,tradeoff:`生産量は変わりません。倉庫がよく満杯になる農園向けです。`},{id:`seeder-area`,minimumGrade:2,title:`種まき機の巡回装置`,price:180,equipment:`seeder`,detail:`選んだ畑と同じ列の最大3区画を順番に担当できます。`,tradeoff:`1台で巡回するので、同時には種をまけません。担当の切り替えもできます。`},{id:`helper-area`,title:`レンを農園に迎える`,price:280,equipment:`helper`,detail:`二人目の仲間レンも農園を歩き回り、ミナとは別の畑を手伝います。`,tradeoff:`レンの技能もEから育ちます。人ごとの経験は別々に記録します。`},{id:`kitchen`,title:`納屋に加工台をつくる`,price:360,requires:`barn-open`,detail:`倉庫の作物から、コーンパンや野菜スープを作れます。食品は専用の棚へ。`,tradeoff:`原料をそのまま売るか、加工して街へ届けるかを選べます。`},{id:`driver`,title:`配達の仲間を迎える`,price:350,requires:`barn-open`,equipment:`truck`,detail:`倉庫の作物を販売車で定期出荷します。加工や街への納品分を残せます。`,tradeoff:`12秒ごとに最大12個。1個1メニーの運搬手数料がかかります。手運びの出荷や注文も続けられます。`},{id:`pumpkin-seeds`,title:`カボチャの栽培を始める`,price:240,detail:`作付けにカボチャを追加。90秒で1個、通常出荷は1個42メニーです。`,tradeoff:`見回りと運搬は少なく、収穫までの時間は長め。短周期の畑と混ぜて育てられます。購入後の種は無料です。`},{id:`pear-grove`,title:`東のナシ園を開く`,price:1800,equipment:`orchard`,detail:`東側のナシの木2本を手入れできます。105秒ごとに3個。果実を売るか、お菓子にするか選べます。`,tradeoff:`リンゴと同じ集荷箱を使います。果実ごとに栽培経験を積みます。`},{id:`orchard`,title:`住宅地の果樹園を再開する`,price:240,requires:`town-orchard`,detail:`3本のリンゴの木を手入れして、繰り返し収穫できます。`,tradeoff:`75秒ごとに1本4個。種まきは不要ですが、収穫と集荷箱からの出荷は自分で行います。`}],B={x:-5.5,z:.3,capacity:96},V={x:-3.9,z:1.3},we={x:-5,z:-2.2,halfX:1.6,halfZ:1.7},Te=[{x:.5,z:-3.5},{x:3.3,z:-3.5},{x:6.1,z:-3.5},{x:.5,z:-.4},{x:3.3,z:-.4},{x:6.1,z:-.4},{x:.5,z:-6.6},{x:3.3,z:-6.6},{x:6.1,z:-6.6},{x:.5,z:9.1},{x:3.3,z:9.1},{x:6.1,z:9.1},{x:.5,z:12.2},{x:3.3,z:12.2},{x:6.1,z:12.2},{x:.5,z:-9.7},{x:3.3,z:-9.7},{x:6.1,z:-9.7},{x:.5,z:-12.8},{x:3.3,z:-12.8},{x:6.1,z:-12.8},{x:.5,z:-15.9},{x:3.3,z:-15.9},{x:6.1,z:-15.9},{x:.5,z:-19},{x:3.3,z:-19},{x:6.1,z:-19}],Ee=e=>e<6?null:e<9?`expansion`:e<15?`pasture`:e<21?`north-meadow`:`north-ridge`,De=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Oe={idle:`ひと休み`,walking:`移動中`,clearing:`草を刈っています`,tilling:`土を耕しています`,planting:`種をまいています`,harvesting:`収穫しています`,cleaning:`片付けています`,repairing:`修理しています`,fishing:`網を引いています`,pruning:`枝を整えています`,picking:`果実を摘んでいます`},ke=[{id:`clear-two`,title:`土に日差しを`,detail:`草のない区画を4つにする（残っていた畑2つを含む）`,target:4,coins:10,points:10,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land!==`overgrown`).length},{id:`till-two`,title:`種を迎える準備`,detail:`耕作済みの区画を4つにする`,target:4,coins:10,points:10,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land===`tilled`).length},{id:`ship-twelve`,title:`街へ、最初の贈りもの`,detail:`作物を累計12個出荷する`,target:12,coins:20,points:20,count:e=>e.shipped},{id:`first-investment`,title:`わたしの農園の育て方`,detail:`好きな投資を1つ選ぶ`,target:1,coins:0,points:10,count:e=>e.investments.size},{id:`six-fields`,title:`広がる土の香り`,detail:`好きな6区画を耕作済みにする`,target:6,coins:20,points:20,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land===`tilled`).length},{id:`ship-sixty`,title:`街の食卓を支える`,detail:`作物を累計60個出荷する`,target:60,coins:30,points:30,count:e=>e.shipped},{id:`west-path`,title:`街へ続く道`,detail:`出荷道の草を片付ける`,target:1,coins:15,points:20,count:e=>Number(e.projects.has(`lane-west`))},{id:`east-path`,title:`畑に風を通そう`,detail:`畑の通り道を整える`,target:1,coins:15,points:20,count:e=>Number(e.projects.has(`lane-east`))},{id:`clean-barn`,title:`赤い壁、もう一度`,detail:`納屋の外壁を掃除する`,target:1,coins:20,points:30,count:e=>Number(e.projects.has(`barn-walls`))},{id:`repair-roof`,title:`雨の日も働ける`,detail:`納屋の屋根を修理する`,target:1,coins:0,points:60,count:e=>Number(e.projects.has(`barn-roof`))},{id:`repair-fence`,title:`帰り道の目印`,detail:`道沿いの柵を直す`,target:1,coins:0,points:20,count:e=>Number(e.projects.has(`fence`))},{id:`first-order`,title:`名前のある届け先`,detail:`好きな注文を1回届ける`,target:1,coins:0,points:30,count:e=>e.orderCount},{id:`varied-orders`,title:`食卓を彩る畑`,detail:`異なる3種類の注文を届ける`,target:3,coins:0,points:40,count:e=>Object.values(e.orders).filter(e=>e>0).length},{id:`six-orders`,title:`またお願いしたい農園`,detail:`注文を累計6回届ける`,target:6,coins:0,points:30,count:e=>e.orderCount},{id:`reopen-barn`,title:`ただいま、と言える納屋`,detail:`納屋を再開する`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`barn-open`))},{id:`first-helper`,title:`ひとりから、ふたりへ`,detail:`収穫の仲間に作物を12個集めてもらう`,target:12,coins:0,points:30,count:e=>e.helperHarvested},{id:`cottage-yard`,title:`帰り道をつくる`,detail:`住宅地の空き家の庭を片付ける`,target:1,coins:20,points:20,count:e=>Number(e.projects.has(`cottage-yard`))},{id:`cottage-repair`,title:`雨の入らない家`,detail:`空き家の屋根と窓を直す`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`cottage-repair`))},{id:`cottage-welcome`,title:`おかえり、わたしたちの街へ`,detail:`修復した家へ食料を届け、家族を迎える`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`cottage-welcome`))},{id:`town-well`,title:`暮らしを潤す水`,detail:`街の共同井戸を整える`,target:1,coins:0,points:100,count:e=>Number(e.projects.has(`town-well`))},{id:`town-orchard`,title:`緑の帰る街`,detail:`街路樹を手入れする`,target:1,coins:0,points:100,count:e=>Number(e.projects.has(`town-orchard`))},{id:`town-market`,title:`農園から、地域の産業へ`,detail:`納屋に青果市を開く`,target:1,coins:0,points:140,count:e=>Number(e.projects.has(`town-market`))},{id:`town-pantry`,title:`実りを分け合う暮らし`,detail:`街の食料庫を満たす`,target:1,coins:0,points:120,count:e=>Number(e.projects.has(`town-pantry`))},{id:`ship-240`,title:`毎日の食卓へ`,detail:`作物を累計240個出荷する`,target:240,coins:60,points:150,count:e=>e.shipped},{id:`nine-fields`,title:`畑いっぱいの可能性`,detail:`9区画を耕作済みにする`,target:9,coins:0,points:60,count:e=>e.plots.filter(e=>e.land===`tilled`).length},{id:`farm-taste`,title:`農園の味をつくろう`,detail:`加工台で食品を累計12個作る`,target:12,coins:0,points:40,count:e=>e.kitchen.crafted},{id:`shared-meals`,title:`また集まりたくなる食卓`,detail:`異なる2種類の食品の注文を届ける`,target:2,coins:0,points:60,count:e=>Object.values(e.kitchen.orders).filter(e=>e>0).length},{id:`orchard-tended`,title:`枝の向こうに、次の春`,detail:`果樹園の3本の木を手入れする`,target:3,coins:0,points:40,count:e=>e.orchard.trees.filter(e=>e.tended).length},{id:`orchard-fruit`,title:`街に果実の香りを`,detail:`果樹園から果実を累計24個出荷する`,target:24,coins:0,points:50,count:e=>e.orchard.sold}];ke.push(...y.flatMap(e=>e.chapters.map((t,n)=>({id:`resident-${e.id}-${n+1}`,title:t.title,detail:`${e.name}の依頼を進める`,target:n+1,coins:0,points:[20,30,50][n],count:t=>t.requests.progress[e.id].chapter}))));var Ae=class t{workers=new P;machinery=new oe;hybrids=new Set;funding=new se;expertise=new c([...l,...e]);cargoQuality=new s(l);stockQuality=new s(l);get research(){return this.investments.has(`breeding-s`)?2:+!!this.investments.has(`breeding-a`)}harvestGrade(e,t=`player`){return Math.min(this.expertise.cropGrade(e,this.research),this.expertise.personGrade(t))}get residentsArrived(){return this.projects.has(`cottage-welcome`)}requests=new b;journal=new le;orchard=new k;courier=new de;kitchen=new ge;harbor=new ye;player={x:-.6,z:2.5};plots=Te.map((e,t)=>({...e,stage:t===0||t===4?`ready`:`empty`,readyAt:0,crop:`corn`,nextCrop:`corn`,land:t===0||t===4?`tilled`:`overgrown`,cultivated:t===0||t===4}));projects=new Set;activeProject=null;get workPoint(){return this.orchard.workPoint??this.harbor.workPoint??(this.activeProject?be(this.activeProject):this.plots[this.active])}get isWorking(){return this.orchard.active>=0||this.active>=0||this.activeProject!==null||this.harbor.active!==null}get stock(){return this.stockQuality.counts}set stock(e){this.stockQuality=new s(l,e)}helperPlot=-1;helperArea=!1;seederArea=!1;helperWorkingPlot=-1;seederWorkingPlot=-1;helperCursor=-1;seederCursor=-1;helperProgress=0;helperHarvested=0;get capacity(){return this.investments.has(`basket`)?48:z.capacity}get storageCapacity(){return this.investments.has(`warehouse`)?192:B.capacity}get stored(){return l.reduce((e,t)=>e+this.stock[t],0)}coins=0;get cargo(){return this.cargoQuality.counts}set cargo(e){this.cargoQuality=new s(l,e)}orders={pantry:0,soup:0,builders:0,autumn:0};get orderCount(){return Object.values(this.orders).reduce((e,t)=>e+t,0)}get inventory(){return l.reduce((e,t)=>e+this.cargo[t],0)}set inventory(e){this.cargo={corn:e,turnip:0,pumpkin:0,kabumorokoshi:0}}shipped=0;investments=new Set;completedTasks=new Set;seederPlot=-1;seederProgress=0;action=`idle`;active=-1;progress=0;message=``;revision=0;get restorationPoints(){return ke.filter(e=>this.completedTasks.has(e.id)).reduce((e,t)=>e+t.points,0)}get restorationPercent(){return Math.min(100,Math.floor(this.restorationPoints/z.stagePoints*100))}get agricultureComplete(){return this.restorationPoints>=z.stagePoints&&xe.every(e=>this.projects.has(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>this.completedTasks.has(e))}get restorationPhase(){return this.agricultureComplete?5:this.restorationPercent>=60?4:this.restorationPercent>=30?3:this.restorationPercent>=10?2:1}growSeconds(e){return Math.round(u[e].seconds*(this.projects.has(`town-well`)?85:100))/100}salePrice(e){return u[e].price+ +!!this.projects.has(`town-market`)}isUnlocked(e){return e>=0&&e<this.plots.length&&(!Ee(e)||this.investments.has(Ee(e)))}interrupt(){this.orchard.interrupt(),this.harbor.interrupt(),this.activeProject=null,this.active=-1,this.progress=0,this.action=`idle`}movementFactor(e=this.player){return this.plots.some(t=>t.land===`overgrown`&&Math.abs(e.x-t.x)<1.18&&Math.abs(e.z-t.z)<1.3)?.22:1}canStand(e){return!D.some(t=>Math.hypot(t.x-e.x,t.z-e.z)<.32)&&(e.z<6.5||e.x>-3.5&&e.x<9.5)&&(e.x<23||this.agricultureComplete)&&(e.x<29.5||this.harbor.pier&&e.z>2&&e.z<4)&&!(e.x>25.1&&e.x<27.9&&e.z>-4.5&&e.z<-.9)&&e.x>M.minX&&e.x<M.maxX&&e.z>M.minZ&&e.z<M.maxZ&&!(Math.abs(e.x-te.x)<te.halfX&&Math.abs(e.z-te.z)<te.halfZ)&&!(Math.abs(e.x-we.x)<we.halfX&&Math.abs(e.z-we.z)<we.halfZ)}projectReason(e){let t=R.find(t=>t.id===e);if(!t)return`見つからない仕事です`;if(this.projects.has(e))return`完了済み`;if(t.requires&&!this.projects.has(t.requires))return`先に「${be(t.requires).title}」`;if(t.shipped&&this.shipped<t.shipped)return`累計${t.shipped}個の出荷まであと${t.shipped-this.shipped}個`;if(t.supplies){let e=l.filter(e=>this.cargo[e]<t.supplies[e]).map(e=>`${u[e].name} あと${t.supplies[e]-this.cargo[e]}個`);if(e.length)return e.join(`・`)}return this.coins<t.cost?`あと ${t.cost-this.coins} メニー`:``}startProject(e){return this.projectReason(e)||De(this.player,be(e))>z.range?!1:(this.interrupt(),this.activeProject=e,this.action=be(e).kind,!0)}duration(e){return(this.activeProject?be(this.activeProject).seconds:e===`clearing`?z.clearSeconds:e===`tilling`?z.tillSeconds:e===`planting`?z.plantSeconds:z.harvestSeconds)*(this.investments.has(`tools`)?.65:1)}settleTasks(){let e=this.agricultureComplete,t=ke.filter(e=>!this.completedTasks.has(e.id)&&e.count(this)>=e.target);for(let e of t)this.completedTasks.add(e.id),this.coins+=e.coins,this.revision++;if(t.length){let e=t.reduce((e,t)=>e+t.coins,0);this.message=`${t[0].title}、達成！${e?` +${e} メニー`:` 農園が一歩前へ。`}`}!e&&this.agricultureComplete&&(this.message=`農業地区が復興！ この実りを、次は港の暮らしへ。`)}investmentReason(e,t=!1){let n=Ce.find(t=>t.id===e);if(!n)return`見つからない投資です`;if(this.investments.has(e))return`導入済み`;if([`helper`,`helper-area`,`driver`].includes(e)&&!this.residentsArrived)return`先に家族の移住を終えよう`;if(n.minimumGrade!==void 0&&this.expertise.best<n.minimumGrade)return`${r[n.minimumGrade]}ランクの収穫を経験しよう`;if(n.requires&&!this.projects.has(n.requires))return`先に「${be(n.requires).title}」`;if(n.equipment&&!this.investments.has(n.equipment))return`先に「${Ce.find(e=>e.id===n.equipment).title}」`;let i=n.price-(this.funding.paid[e]??0);return!t&&this.coins<i?`あと ${i-this.coins} メニー`:``}buy(e){let t=Ce.find(t=>t.id===e);return!t||this.investmentReason(e)?!1:(this.coins-=t.price-(this.funding.paid[e]??0),delete this.funding.paid[e],this.investments.add(e),this.revision++,e===`harvester`&&this.machinery.configure(this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`),!1,this),e===`driver`&&(this.courier.enabled=!0),e===`seeder-area`&&(this.seederArea=!0),e===`helper-area`&&(this.helperArea=!0),e===`helper`&&(this.helperPlot=this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`)),e===`seeder`&&(this.seederPlot=this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`)),this.message=`${t.title}を購入しました！`,this.settleTasks(),!0)}get paymentPad(){return C.find(e=>w(e,this.player,.58)&&!this.investmentReason(e.id,!0))??null}payForEquipment(e,t){let n=this.paymentPad,r=n?Ce.find(e=>e.id===n.id):null,i=this.funding.step(e,Math.hypot(t.x,t.z)>.08,r?{id:r.id,cost:r.price}:null,this.coins);return i.charged&&(this.coins-=i.charged,this.revision++),i.complete&&r&&this.buy(r.id),!!r}breedReason(e,t){let n=g(e,t);return n?this.hybrids.has(n.crop)?`この種は発見済み`:this.investments.has(`breeding`)?n.parents.some(e=>this.expertise.crops[e]<40)?`親になる作物を、それぞれ40回収穫しよう`:n.parents.some(e=>this.stock[e]<n.samples)?`倉庫に親の作物をそれぞれ${n.samples}個用意しよう`:``:`先に品種配合の実験台を導入しよう`:`配合できるのは、組み合わせのある基本作物同士だけです`}breed(e,t){if(this.breedReason(e,t)||!w(this.player,p,1.8))return!1;let n=g(e,t);for(let e of n.parents)this.stock[e]-=n.samples;return this.hybrids.add(n.crop),this.revision++,this.message=`${u[n.crop].name}の種を発見！ 畑の作付けで選べます。`,!0}cropUnlocked(e){return l.includes(e)&&(e!==`pumpkin`||this.investments.has(`pumpkin-seeds`))&&(e!==`kabumorokoshi`||this.hybrids.has(e))}planCrop(e,t){return!Number.isInteger(e)||!this.isUnlocked(e)||!this.cropUnlocked(t)?!1:(this.plots[e].nextCrop=t,this.revision++,!0)}order(e){let t=f.find(t=>t.id===e);if(!t)return;let n=Math.min(3,1+Math.floor(this.orderCount/6)),r={corn:t.needs.corn*n,turnip:t.needs.turnip*n,pumpkin:t.needs.pumpkin*n,kabumorokoshi:0},i=l.reduce((e,t)=>e+r[t]*this.salePrice(t),0),a=l.reduce((e,t)=>e+this.cargoQuality.value(t,this.salePrice(t),r[t])+Math.max(0,r[t]-this.cargo[t])*this.salePrice(t),0);return{...t,needs:r,coins:Math.round(t.coins*n*a/i)}}orderReason(e){if(!this.investments.has(`truck`))return`販売車を購入すると配達できます`;let t=this.order(e);return t?l.filter(e=>this.cargo[e]<t.needs[e]).map(e=>`${u[e].name} あと${t.needs[e]-this.cargo[e]}個`).join(`・`):`見つからない注文です`}deliver(e){if(this.orderReason(e)||De(this.player,d)>z.range)return!1;let t=this.order(e);for(let e of l)this.cargo[e]-=t.needs[e],this.shipped+=t.needs[e];return this.coins+=t.coins,this.orders[e]++,this.revision++,this.message=`${t.title}へ届けて +${t.coins} メニー！`,this.settleTasks(),!0}assignSeeder(e){return!this.investments.has(`seeder`)||!Number.isInteger(e)||e!==-1&&(!this.isUnlocked(e)||this.plots[e].land!==`tilled`)?!1:(this.seederPlot=e,this.seederProgress=0,this.seederWorkingPlot=-1,this.seederCursor=-1,this.revision++,!0)}transferReason(e){return this.projects.has(`barn-open`)?e===`deposit`?this.inventory===0?`かごが空です`:this.stored+this.inventory>this.storageCapacity?`倉庫の空きを増やそう`:``:l.includes(e)?this.stock[e]===0?`倉庫にありません`:this.inventory>=this.capacity?`かごがいっぱいです`:``:`見つからない作物です`:`納屋を再開すると使えます`}transfer(e){if(this.transferReason(e)||De(this.player,B)>z.range)return!1;if(e===`deposit`){for(let e of l)this.cargoQuality.moveTo(this.stockQuality,e,this.cargo[e]);this.message=`収穫を倉庫に預けました。`}else{let t=Math.min(6,this.stock[e],this.capacity-this.inventory);this.stockQuality.moveTo(this.cargoQuality,e,t),this.message=`${u[e].name}を ${t} 個かごへ。`}return this.revision++,!0}assignHelper(e){return!this.investments.has(`helper`)||!Number.isInteger(e)||e!==-1&&(!this.isUnlocked(e)||this.plots[e].land!==`tilled`)?!1:(this.workers.cancel(),this.helperPlot=e,this.helperProgress=0,this.helperWorkingPlot=-1,this.helperCursor=-1,this.revision++,!0)}setArea(e,t){return this.investments.has(e+`-area`)?(e===`seeder`?(this.seederArea=t,this.assignSeeder(this.seederPlot)):(this.helperArea=t,this.assignHelper(this.helperPlot)),!0):!1}assignedPlots(e){if(e===`helper`)return this.residentsArrived&&this.investments.has(`helper`)&&this.helperPlot>=0?this.plots.map((e,t)=>t).filter(e=>this.isUnlocked(e)&&this.plots[e].land===`tilled`):[];let t=e===`seeder`?this.seederPlot:this.helperPlot;if(t<0||!this.investments.has(e))return[];let n=e===`seeder`?this.seederArea:this.helperArea,r=n?Math.floor(t/3)*3:t;return Array.from({length:n?3:1},(e,t)=>r+t).filter(e=>this.isUnlocked(e)&&this.plots[e].land===`tilled`)}choosePlot(e){let t=this.assignedPlots(e),n=e===`seeder`?this.seederCursor:this.helperCursor,r=t=>{let n=this.plots[t];return this.active!==t&&!this.workers.busy(t)&&this.machinery.active!==t&&(e===`seeder`?n.stage===`empty`:n.stage===`ready`&&this.stored+u[n.crop].yield<=this.storageCapacity)},i=t.indexOf(n)+1;return[...t.slice(i),...t.slice(0,i)].find(r)??-1}collect(e,t){this.workers.step(e,t,this);let n=this.workers.people[0];this.helperWorkingPlot=n.target,this.helperProgress=n.progress}automate(e,t){this.seederWorkingPlot<0&&(this.seederWorkingPlot=this.choosePlot(`seeder`));let n=this.seederWorkingPlot,r=this.plots[n];if(!r||r.land!==`tilled`||r.stage!==`empty`||this.active===n){this.seederProgress=0,this.seederWorkingPlot=-1;return}this.seederProgress+=e/(z.plantSeconds*3),this.seederProgress>=1&&(r.crop=r.nextCrop,r.stage=`growing`,r.readyAt=t+Math.round(this.growSeconds(r.crop)*1e3),this.seederProgress=0,this.seederCursor=n,this.seederWorkingPlot=-1,this.revision++)}step(e,t,n){for(let e of this.plots)e.stage===`growing`&&n>=e.readyAt&&(e.stage=`ready`,this.revision++);this.kitchen.step(e,this),this.courier.step(e,this),this.harbor.automate(e,this),this.machinery.step(e,this),this.collect(e,n);let i=this.payForEquipment(e,t);this.automate(e,n),this.settleTasks();let a=Math.hypot(t.x,t.z);if(a>.08){this.interrupt();let n=Math.max(1,a),r=z.speed*this.movementFactor(),i=this.player.x+t.x/n*r*e,o=this.player.z+t.z/n*r*e,s={...this.player};this.canStand({x:i,z:this.player.z})&&(this.player.x=i),this.canStand({x:this.player.x,z:o})&&(this.player.z=o),this.action=De(s,this.player)>1e-4?`walking`:`idle`;return}if(i){this.interrupt();return}if(this.player.x>=23){this.harbor.step(e,this),this.action=this.harbor.active??`idle`,this.progress=this.harbor.progress;return}if(this.orchard.active>=0){this.orchard.step(e,this,n);return}if(this.isWorking){if(this.progress+=e/this.duration(this.action),this.progress>=1){if(this.activeProject){let e=be(this.activeProject);if(!this.projectReason(e.id)){if(this.coins-=e.cost,e.supplies)for(let t of l)this.cargo[t]-=e.supplies[t];this.projects.add(e.id),this.revision++,this.message=`${e.title}、完了！`,this.settleTasks()}this.interrupt();return}let e=this.plots[this.active];if(this.action===`clearing`)e.land=`cleared`,this.message=`草を片付けた！ 次は土を耕そう。`;else if(this.action===`tilling`)e.land=`tilled`,e.cultivated=!0,this.message=`ふかふかの土になった！`;else if(this.action===`planting`)e.crop=e.nextCrop,e.stage=`growing`,e.readyAt=n+Math.round(this.growSeconds(e.crop)*1e3);else{e.stage=`empty`;let t=this.expertise.harvest(e.crop,`player`,this.research);this.cargoQuality.add(e.crop,u[e.crop].yield,t),this.message=`${u[e.crop].name}を ${u[e.crop].yield} 個収穫！ 品質 ${r[t]}`}this.revision++,this.settleTasks(),this.interrupt()}return}if(this.action=`idle`,De(this.player,V)<z.range&&this.inventory>0){let e=this.inventory,t=l.reduce((e,t)=>e+this.cargoQuality.value(t,this.salePrice(t)),0);this.coins+=t,this.shipped+=e,this.inventory=0,this.message=`${e} 個を出荷して +${t} メニー！`,this.revision++,this.settleTasks();return}if(this.orchard.startNearby(this,n)){this.action=this.orchard.trees[this.orchard.active].tended?`picking`:`pruning`,this.progress=0;return}let o=z.range;if(this.plots.forEach((e,t)=>{if(!this.isUnlocked(t)||e.stage===`growing`||e.stage===`ready`&&this.inventory+u[e.crop].yield>this.capacity||this.assignedPlots(`helper`).includes(t)&&e.stage===`ready`||this.assignedPlots(`seeder`).includes(t)&&e.stage===`empty`)return;let n=De(this.player,e);n<o&&(o=n,this.active=t)}),this.active>=0){let e=this.plots[this.active];this.action=e.land===`overgrown`?`clearing`:e.land===`cleared`?`tilling`:e.stage===`empty`?`planting`:`harvesting`}}shiftGrowth(e){for(let t of this.plots)t.stage===`growing`&&(t.readyAt+=e);for(let t of this.orchard.trees)t.tended&&(t.readyAt+=e)}save(){return{version:20,workers:this.workers.save(),machinery:this.machinery.save(),hybrids:[...this.hybrids],quality:{expertise:this.expertise.save(),cargo:this.cargoQuality.save(),stock:this.stockQuality.save()},funding:this.funding.save(),requests:this.requests.save(),journal:this.journal.save(),orchard:this.orchard.save(),courier:this.courier.save(),kitchen:this.kitchen.save(),seederArea:this.seederArea,helperArea:this.helperArea,harbor:this.harbor.save(),stock:{...this.stock},helperPlot:this.helperPlot,helperHarvested:this.helperHarvested,cargo:{...this.cargo},orders:{...this.orders},projects:[...this.projects],coins:this.coins,inventory:this.inventory,shipped:this.shipped,plots:this.plots.map(({stage:e,readyAt:t,land:n,crop:r,nextCrop:i})=>({stage:e,readyAt:t,land:n,crop:r,nextCrop:i})),investments:[...this.investments],completedTasks:[...this.completedTasks],seederPlot:this.seederPlot}}restore(n){if(!n||typeof n!=`object`)return!1;let r=n,i=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,a=r.version;if(typeof a!=`number`||!Number.isInteger(a)||a<1||a>20||!Array.isArray(r.plots)||r.plots.length!==(a===1?6:a<7?9:a<14?15:Te.length)||!i(r.coins)||!i(r.inventory)||!i(r.shipped)||!r.plots.every(e=>e&&[`empty`,`growing`,`ready`].includes(e.stage)&&i(e.readyAt)&&(r.version===1?e.cultivated===void 0||typeof e.cultivated==`boolean`:[`overgrown`,`cleared`,`tilled`].includes(e.land))&&(a<4||l.includes(e.crop)&&l.includes(e.nextCrop))))return!1;let o=a>=4?a>=13?r.cargo:{...r.cargo,pumpkin:0}:{corn:r.inventory,turnip:0,pumpkin:0,kabumorokoshi:0},u=a<17?{...o,kabumorokoshi:0}:o,d=a>=4?a>=13?r.orders:{...r.orders,autumn:0}:{pantry:0,soup:0,builders:0,autumn:0};if(!u||l.some(e=>!i(u[e]))||l.reduce((e,t)=>e+u[t],0)!==r.inventory||!d||f.some(e=>!i(d[e.id])))return!1;let p=a>=3?r.projects:[];if(!Array.isArray(p)||!p.every(e=>R.some(t=>t.id===e))||new Set(p).size!==p.length||p.some(e=>{let t=be(e);return t.requires&&!p.includes(t.requires)}))return!1;let m=r.version===1?[]:r.investments,g=r.version===1?[]:r.completedTasks;if(!Array.isArray(m)||!m.every(e=>Ce.some(t=>t.id===e))||new Set(m).size!==m.length||m.some(e=>{let t=Ce.find(t=>t.id===e);return t.requires&&!p.includes(t.requires)||t.equipment&&!m.includes(t.equipment)})||r.inventory>(m.includes(`basket`)?48:z.capacity))return!1;let _=a>=7&&r.seederArea,v=a>=7&&r.helperArea;if(typeof _!=`boolean`||typeof v!=`boolean`||_&&!m.includes(`seeder-area`)||v&&!m.includes(`helper-area`))return!1;let x=e=>!Ee(e)||m.includes(Ee(e));if(!Array.isArray(g)||!g.every(e=>ke.some(t=>t.id===e))||new Set(g).size!==g.length)return!1;let S=this.plots.map((e,t)=>{let n=r.plots[t];if(!n)return{...Te[t],stage:`empty`,readyAt:0,land:`overgrown`,crop:`corn`,nextCrop:`corn`,cultivated:!1};let i=r.version===1?n.stage!==`empty`||(n.cultivated??!0)?`tilled`:`overgrown`:n.land;return{...e,stage:n.stage,readyAt:n.readyAt,crop:a>=4?n.crop:`corn`,nextCrop:a>=4?n.nextCrop:`corn`,land:i,cultivated:i===`tilled`}});if(S.some((e,t)=>e.stage!==`empty`&&e.land!==`tilled`||!x(t)&&(e.land!==`overgrown`||e.stage!==`empty`)))return!1;let C=r.version===1?-1:r.seederPlot;if(typeof C!=`number`||!Number.isInteger(C)||C<-1||C>=S.length||C!==-1&&(!m.includes(`seeder`)||S[C].land!==`tilled`||!x(C)))return!1;let w=a>=5?a>=13?r.stock:{...r.stock,pumpkin:0}:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},T=a<17?{...w,kabumorokoshi:0}:w,E=a>=5?r.helperPlot:-1,D=a>=5?r.helperHarvested:0;if(!T||l.some(e=>!i(T[e]))||l.reduce((e,t)=>e+T[t],0)>(m.includes(`warehouse`)?192:B.capacity)||!i(D)||(l.reduce((e,t)=>e+T[t],0)>0||m.includes(`helper`))&&!p.includes(`barn-open`)||D>0&&!m.includes(`helper`)||typeof E!=`number`||!Number.isInteger(E)||E<-1||E>=S.length||E!==-1&&(!m.includes(`helper`)||S[E].land!==`tilled`||!x(E))||!m.includes(`pumpkin-seeds`)&&(u.pumpkin>0||T.pumpkin>0||d.autumn>0||S.some(e=>e.crop===`pumpkin`||e.nextCrop===`pumpkin`)))return!1;let O=new ye;if(a>=6&&!O.restore(r.harbor)||O.hasProgress&&!(ke.filter(e=>g.includes(e.id)).reduce((e,t)=>e+t.points,0)>=z.stagePoints&&xe.every(e=>p.includes(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>g.includes(e))))return!1;let A=new ge;if(a>=8&&!A.restore(r.kitchen,a<16,a<20)||A.hasProgress&&!m.includes(`kitchen`))return!1;let ee=new de;if(a>=9&&!ee.restore(r.courier)||ee.hasProgress&&!m.includes(`driver`))return!1;let te=new k;if(a>=10&&!te.restore(r.orchard,a<12,a<16,a<20)||te.hasProgress&&!m.includes(`orchard`)||!m.includes(`pear-grove`)&&(te.fruit.pear>0||te.trees.slice(3).some(e=>e.tended)))return!1;let j=new le;if(a>=11&&!j.restore(r.journal))return!1;a<11&&(j.partial=!0);let M=new b;if(a>=12&&!M.restore(r.requests)||y.some(e=>(M.progress[e.id].chapter>0||M.progress[e.id].contributed>0)&&!p.includes(e.requires)))return!1;let N=new se;if(a>=15&&!N.restore(r.funding,Ce.map(e=>({id:e.id,cost:e.price})),e=>m.includes(e)))return!1;let ne=new c([...l,...e]),re=new s(l,u),ie=new s(l,T);if(a>=16){let e=r.quality;if(!e?.expertise?.crops||!e.cargo||!e.stock)return!1;let t=e=>a<17?{...e,kabumorokoshi:[0,0,0,0,0,0]}:e,n={...e.expertise,crops:{...e.expertise.crops,...a<17?{kabumorokoshi:0}:{},...a<20?{pear:0}:{}}};if(!ne.restore(n)||!re.restore(t(e.cargo),u)||!ie.restore(t(e.stock),T))return!1}let ae=a>=17?r.hybrids:[];if(!Array.isArray(ae)||new Set(ae).size!==ae.length||ae.some(e=>!h.some(t=>t.crop===e))||ae.length>0&&!m.includes(`breeding`)||h.some(e=>!ae.includes(e.crop)&&(u[e.crop]>0||T[e.crop]>0||ne.crops[e.crop]>0||S.some(t=>t.crop===e.crop||t.nextCrop===e.crop))))return!1;let F=new oe;if(a>=18){let e=new t;if(e.plots=S,e.investments=new Set(m),e.hybrids=new Set(ae),!F.restore(r.machinery,e))return!1}let ce=new P;if(a>=19){let e=new t;if(e.plots=S,e.projects=new Set(p),e.investments=new Set(m),e.hybrids=new Set(ae),!ce.restore(r.workers,e))return!1}if(A.plan!==`none`){let e=new t;if(e.investments=new Set(m),e.hybrids=new Set(ae),!A.unlocked(A.plan,e))return!1}return this.workers=ce,this.machinery=F,this.hybrids=new Set(ae),this.expertise=ne,this.funding=N,this.requests=M,this.journal=j,this.orchard=te,this.courier=ee,this.kitchen=A,this.seederArea=_,this.helperArea=v,this.seederWorkingPlot=-1,this.helperWorkingPlot=-1,this.seederCursor=-1,this.helperCursor=-1,this.harbor=O,this.stock={...T},this.helperPlot=E,this.helperHarvested=D,this.helperProgress=0,this.projects=new Set(p),this.coins=r.coins,this.cargo={...u},this.orders={...d},this.shipped=r.shipped,this.plots=S,this.investments=new Set(m),this.completedTasks=new Set(g),this.seederPlot=C,this.seederProgress=0,this.cargoQuality=re,this.stockQuality=ie,this.interrupt(),this.revision++,!0}};function je(e,t=new Date){return JSON.stringify({format:`farmer-mate-save`,version:1,exportedAt:t.toISOString(),farm:e},null,2)}function Me(e){if(e.length>1048576)throw Error(`このファイルは大きすぎます。農園の記録ファイルを選んでください。`);let t;try{t=JSON.parse(e)}catch{throw Error(`記録を読めませんでした。農園から書き出したファイルを選んでください。`)}if(t&&typeof t==`object`&&`format`in t){let e=t;if(e.format!==`farmer-mate-save`||e.version!==1)throw Error(`この形式の記録は読み込めません。`);t=e.farm}let n=new Ae;if(!n.restore(t))throw Error(`この農園の記録は読み込めません。内容や対応するゲームの版を確認してください。`);return n.save()}function Ne(e,t,n,r){e.setItem(t+`:before-import`,JSON.stringify(n)),e.setItem(t,JSON.stringify(r))}var Pe=class{previous=null;remainder=0;stepSeconds=1/60;advance(e,t,n){if(this.previous===null)return this.previous=e,0;let r=Math.max(0,Math.min((e-this.previous)/1e3,.5));if(this.previous=e,t)return this.remainder=0,0;this.remainder+=r;let i=0;for(;this.remainder+1e-9>=this.stepSeconds;)n(this.stepSeconds),this.remainder=Math.max(0,this.remainder-this.stepSeconds),i++;return i}reset(e){this.previous=e,this.remainder=0}},Fe=1e3,Ie=1001,Le=1002,Re=1003,ze=1004,Be=1005,Ve=1006,He=1007,Ue=1008,We=1009,Ge=1010,Ke=1011,qe=1012,Je=1013,Ye=1014,Xe=1015,Ze=1016,Qe=1017,$e=1018,et=1020,tt=35902,nt=35899,rt=1021,it=1022,at=1023,ot=1026,st=1027,ct=1028,lt=1029,ut=1030,dt=1031,ft=1033,pt=33776,mt=33777,ht=33778,gt=33779,_t=35840,vt=35841,yt=35842,bt=35843,xt=36196,St=37492,Ct=37496,wt=37488,Tt=37489,Et=37490,Dt=37491,Ot=37808,kt=37809,At=37810,jt=37811,Mt=37812,Nt=37813,Pt=37814,Ft=37815,It=37816,Lt=37817,Rt=37818,zt=37819,Bt=37820,Vt=37821,Ht=36492,Ut=36494,Wt=36495,Gt=36283,Kt=36284,qt=36285,Jt=36286,Yt=2300,Xt=2301,Zt=2302,Qt=2303,$t=2400,en=2401,tn=2402,nn=3200,rn=`srgb`,an=`srgb-linear`,on=`linear`,sn=`srgb`,cn=7680,ln=35044,un=35048,dn=2e3;function fn(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function pn(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function mn(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function hn(){let e=mn(`canvas`);return e.style.display=`block`,e}var gn={};function _n(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function vn(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function H(...e){e=vn(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function U(...e){e=vn(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function yn(...e){let t=e.join(` `);t in gn||(gn[t]=!0,H(...e))}function bn(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var xn={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Sn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Cn=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),wn=1234567,Tn=Math.PI/180,En=180/Math.PI;function Dn(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Cn[e&255]+Cn[e>>8&255]+Cn[e>>16&255]+Cn[e>>24&255]+`-`+Cn[t&255]+Cn[t>>8&255]+`-`+Cn[t>>16&15|64]+Cn[t>>24&255]+`-`+Cn[n&63|128]+Cn[n>>8&255]+`-`+Cn[n>>16&255]+Cn[n>>24&255]+Cn[r&255]+Cn[r>>8&255]+Cn[r>>16&255]+Cn[r>>24&255]).toLowerCase()}function W(e,t,n){return Math.max(t,Math.min(n,e))}function On(e,t){return(e%t+t)%t}function kn(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function An(e,t,n){return e===t?0:(n-e)/(t-e)}function jn(e,t,n){return(1-n)*e+n*t}function Mn(e,t,n,r){return jn(e,t,1-Math.exp(-n*r))}function Nn(e,t=1){return t-Math.abs(On(e,t*2)-t)}function Pn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Fn(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function In(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Ln(e,t){return e+Math.random()*(t-e)}function Rn(e){return e*(.5-Math.random())}function zn(e){e!==void 0&&(wn=e);let t=wn+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Bn(e){return e*Tn}function Vn(e){return e*En}function Hn(e){return!(e&e-1)&&e!==0}function Un(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Wn(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Gn(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:H(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function Kn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function qn(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Jn={DEG2RAD:Tn,RAD2DEG:En,generateUUID:Dn,clamp:W,euclideanModulo:On,mapLinear:kn,inverseLerp:An,lerp:jn,damp:Mn,pingpong:Nn,smoothstep:Pn,smootherstep:Fn,randInt:In,randFloat:Ln,randFloatSpread:Rn,seededRandom:zn,degToRad:Bn,radToDeg:Vn,isPowerOfTwo:Hn,ceilPowerOfTwo:Un,floorPowerOfTwo:Wn,setQuaternionFromProperEuler:Gn,normalize:qn,denormalize:Kn},G=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Yn=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:H(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(W(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Zn.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Zn.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Xn.copy(this).projectOnVector(e),this.sub(Xn)}reflect(e){return this.sub(Xn.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(W(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Xn=new K,Zn=new Yn,q=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return yn(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(Qn.makeScale(e,t)),this}rotate(e){return yn(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(Qn.makeRotation(-e)),this}translate(e,t){return yn(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(Qn.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Qn=new q,$n=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),er=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function tr(){let e={enabled:!0,workingColorSpace:an,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=rr(e.r),e.g=rr(e.g),e.b=rr(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=ir(e.r),e.g=ir(e.g),e.b=ir(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?on:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return yn(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return yn(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[an]:{primaries:t,whitePoint:r,transfer:on,toXYZ:$n,fromXYZ:er,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:rn},outputColorSpaceConfig:{drawingBufferColorSpace:rn}},[rn]:{primaries:t,whitePoint:r,transfer:sn,toXYZ:$n,fromXYZ:er,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:rn}}}),e}var nr=tr();function rr(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function ir(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var ar,or=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{ar===void 0&&(ar=mn(`canvas`)),ar.width=e.width,ar.height=e.height;let t=ar.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=ar}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=mn(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=rr(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(rr(t[e]/255)*255):t[e]=rr(t[e]);return{data:t,width:e.width,height:e.height}}return H(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},sr=0,cr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:sr++}),this.uuid=Dn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(lr(r[t].image)):e.push(lr(r[t]))}else e=lr(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function lr(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?or.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(H(`Texture: Unable to serialize Texture.`),{})}var ur=0,dr=new K,fr=class e extends Sn{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=Ie,i=Ie,a=Ve,o=Ue,s=at,c=We,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ur++}),this.uuid=Dn(),this.name=``,this.source=new cr(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(dr).x}get height(){return this.source.getSize(dr).y}get depth(){return this.source.getSize(dr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){H(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fe:e.x-=Math.floor(e.x);break;case Ie:e.x=e.x<0?0:1;break;case Le:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Fe:e.y-=Math.floor(e.y);break;case Ie:e.y=e.y<0?0:1;break;case Le:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};fr.DEFAULT_IMAGE=null,fr.DEFAULT_MAPPING=300,fr.DEFAULT_ANISOTROPY=1;var pr=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=W(this.x,e.x,t.x),this.y=W(this.y,e.y,t.y),this.z=W(this.z,e.z,t.z),this.w=W(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=W(this.x,e,t),this.y=W(this.y,e,t),this.z=W(this.z,e,t),this.w=W(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(W(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},mr=class extends Sn{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ve,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new pr(0,0,e,t),this.scissorTest=!1,this.viewport=new pr(0,0,e,t),this.textures=[];let r=new fr({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ve,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new cr(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},hr=class extends mr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},gr=class extends fr{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Re,this.minFilter=Re,this.wrapR=Ie,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},_r=class extends fr{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Re,this.minFilter=Re,this.wrapR=Ie,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},vr=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/yr.setFromMatrixColumn(e,0).length(),i=1/yr.setFromMatrixColumn(e,1).length(),a=1/yr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(xr,e,Sr)}lookAt(e,t,n){let r=this.elements;return Tr.subVectors(e,t),Tr.lengthSq()===0&&(Tr.z=1),Tr.normalize(),Cr.crossVectors(n,Tr),Cr.lengthSq()===0&&(Math.abs(n.z)===1?Tr.x+=1e-4:Tr.z+=1e-4,Tr.normalize(),Cr.crossVectors(n,Tr)),Cr.normalize(),wr.crossVectors(Tr,Cr),r[0]=Cr.x,r[4]=wr.x,r[8]=Tr.x,r[1]=Cr.y,r[5]=wr.y,r[9]=Tr.y,r[2]=Cr.z,r[6]=wr.z,r[10]=Tr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],ee=r[10],te=r[14],j=r[3],M=r[7],N=r[11],P=r[15];return i[0]=a*x+o*T+s*k+c*j,i[4]=a*S+o*E+s*A+c*M,i[8]=a*C+o*D+s*ee+c*N,i[12]=a*w+o*O+s*te+c*P,i[1]=l*x+u*T+d*k+f*j,i[5]=l*S+u*E+d*A+f*M,i[9]=l*C+u*D+d*ee+f*N,i[13]=l*w+u*O+d*te+f*P,i[2]=p*x+m*T+h*k+g*j,i[6]=p*S+m*E+h*A+g*M,i[10]=p*C+m*D+h*ee+g*N,i[14]=p*w+m*O+h*te+g*P,i[3]=_*x+v*T+y*k+b*j,i[7]=_*S+v*E+y*A+b*M,i[11]=_*C+v*D+y*ee+b*N,i[15]=_*w+v*O+y*te+b*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=yr.set(r[0],r[1],r[2]).length(),o=yr.set(r[4],r[5],r[6]).length(),s=yr.set(r[8],r[9],r[10]).length();i<0&&(a=-a),br.copy(this);let c=1/a,l=1/o,u=1/s;return br.elements[0]*=c,br.elements[1]*=c,br.elements[2]*=c,br.elements[4]*=l,br.elements[5]*=l,br.elements[6]*=l,br.elements[8]*=u,br.elements[9]*=u,br.elements[10]*=u,t.setFromRotationMatrix(br),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=dn,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=dn,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},yr=new K,br=new vr,xr=new K(0,0,0),Sr=new K(1,1,1),Cr=new K,wr=new K,Tr=new K,Er=new vr,Dr=new Yn,Or=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(W(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-W(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(W(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-W(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(W(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-W(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:H(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Er.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Er,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Dr.setFromEuler(this),this.setFromQuaternion(Dr,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Or.DEFAULT_ORDER=`XYZ`;var kr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Ar=0,jr=new K,Mr=new Yn,Nr=new vr,Pr=new K,Fr=new K,Ir=new K,Lr=new Yn,Rr=new K(1,0,0),zr=new K(0,1,0),Br=new K(0,0,1),Vr={type:`added`},Hr={type:`removed`},Ur={type:`childadded`,child:null},Wr={type:`childremoved`,child:null},Gr=class e extends Sn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Ar++}),this.uuid=Dn(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new Or,r=new Yn,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new vr},normalMatrix:{value:new q}}),this.matrix=new vr,this.matrixWorld=new vr,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new kr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Mr.setFromAxisAngle(e,t),this.quaternion.multiply(Mr),this}rotateOnWorldAxis(e,t){return Mr.setFromAxisAngle(e,t),this.quaternion.premultiply(Mr),this}rotateX(e){return this.rotateOnAxis(Rr,e)}rotateY(e){return this.rotateOnAxis(zr,e)}rotateZ(e){return this.rotateOnAxis(Br,e)}translateOnAxis(e,t){return jr.copy(e).applyQuaternion(this.quaternion),this.position.add(jr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Rr,e)}translateY(e){return this.translateOnAxis(zr,e)}translateZ(e){return this.translateOnAxis(Br,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Nr.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Pr.copy(e):Pr.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Fr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Nr.lookAt(Fr,Pr,this.up):Nr.lookAt(Pr,Fr,this.up),this.quaternion.setFromRotationMatrix(Nr),r&&(Nr.extractRotation(r.matrixWorld),Mr.setFromRotationMatrix(Nr),this.quaternion.premultiply(Mr.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(U(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Vr),Ur.child=e,this.dispatchEvent(Ur),Ur.child=null):U(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Hr),Wr.child=e,this.dispatchEvent(Wr),Wr.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Nr.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Nr.multiply(e.parent.matrixWorld)),e.applyMatrix4(Nr),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Vr),Ur.child=e,this.dispatchEvent(Ur),Ur.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,e,Ir),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Fr,Lr,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Gr.DEFAULT_UP=new K(0,1,0),Gr.DEFAULT_MATRIX_AUTO_UPDATE=!0,Gr.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Kr=class extends Gr{constructor(){super(),this.isGroup=!0,this.type=`Group`}},qr={type:`move`},Jr=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qr)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Kr;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Yr={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xr={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function Qr(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=rn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,nr.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=nr.workingColorSpace){return this.r=e,this.g=t,this.b=n,nr.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=nr.workingColorSpace){if(e=On(e,1),t=W(t,0,1),n=W(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Qr(i,r,e+1/3),this.g=Qr(i,r,e),this.b=Qr(i,r,e-1/3)}return nr.colorSpaceToWorking(this,r),this}setStyle(e,t=rn){function n(t){t!==void 0&&parseFloat(t)<1&&H(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:H(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);H(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=rn){let n=Yr[e.toLowerCase()];return n===void 0?H(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=rr(e.r),this.g=rr(e.g),this.b=rr(e.b),this}copyLinearToSRGB(e){return this.r=ir(e.r),this.g=ir(e.g),this.b=ir(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=rn){return nr.workingToColorSpace($r.copy(this),e),Math.round(W($r.r*255,0,255))*65536+Math.round(W($r.g*255,0,255))*256+Math.round(W($r.b*255,0,255))}getHexString(e=rn){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nr.workingColorSpace){nr.workingToColorSpace($r.copy(this),t);let n=$r.r,r=$r.g,i=$r.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=nr.workingColorSpace){return nr.workingToColorSpace($r.copy(this),t),e.r=$r.r,e.g=$r.g,e.b=$r.b,e}getStyle(e=rn){nr.workingToColorSpace($r.copy(this),e);let t=$r.r,n=$r.g,r=$r.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Xr),this.setHSL(Xr.h+e,Xr.s+t,Xr.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xr),e.getHSL(Zr);let n=jn(Xr.h,Zr.h,t),r=jn(Xr.s,Zr.s,t),i=jn(Xr.l,Zr.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$r=new J;J.NAMES=Yr;var ei=class extends Gr{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Or,this.environmentIntensity=1,this.environmentRotation=new Or,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ti=new K,ni=new K,ri=new K,ii=new K,ai=new K,oi=new K,si=new K,ci=new K,li=new K,ui=new K,di=new pr,fi=new pr,pi=new pr,mi=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ti.subVectors(e,t),r.cross(ti);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){ti.subVectors(r,t),ni.subVectors(n,t),ri.subVectors(e,t);let a=ti.dot(ti),o=ti.dot(ni),s=ti.dot(ri),c=ni.dot(ni),l=ni.dot(ri),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ii)!==null&&ii.x>=0&&ii.y>=0&&ii.x+ii.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,ii)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,ii.x),s.addScaledVector(a,ii.y),s.addScaledVector(o,ii.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return di.setScalar(0),fi.setScalar(0),pi.setScalar(0),di.fromBufferAttribute(e,t),fi.fromBufferAttribute(e,n),pi.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(di,i.x),a.addScaledVector(fi,i.y),a.addScaledVector(pi,i.z),a}static isFrontFacing(e,t,n,r){return ti.subVectors(n,t),ni.subVectors(e,t),ti.cross(ni).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ti.subVectors(this.c,this.b),ni.subVectors(this.a,this.b),ti.cross(ni).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;ai.subVectors(r,n),oi.subVectors(i,n),ci.subVectors(e,n);let s=ai.dot(ci),c=oi.dot(ci);if(s<=0&&c<=0)return t.copy(n);li.subVectors(e,r);let l=ai.dot(li),u=oi.dot(li);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(ai,a);ui.subVectors(e,i);let f=ai.dot(ui),p=oi.dot(ui);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(oi,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return si.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(si,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(ai,a).addScaledVector(oi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},hi=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_i.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_i.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_i.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,_i):_i.fromBufferAttribute(r,t),_i.applyMatrix4(e.matrixWorld),this.expandByPoint(_i);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),vi.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),vi.copy(e.boundingBox)),vi.applyMatrix4(e.matrixWorld),this.union(vi)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_i),_i.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ti),Ei.subVectors(this.max,Ti),yi.subVectors(e.a,Ti),bi.subVectors(e.b,Ti),xi.subVectors(e.c,Ti),Si.subVectors(bi,yi),Ci.subVectors(xi,bi),wi.subVectors(yi,xi);let t=[0,-Si.z,Si.y,0,-Ci.z,Ci.y,0,-wi.z,wi.y,Si.z,0,-Si.x,Ci.z,0,-Ci.x,wi.z,0,-wi.x,-Si.y,Si.x,0,-Ci.y,Ci.x,0,-wi.y,wi.x,0];return!ki(t,yi,bi,xi,Ei)||(t=[1,0,0,0,1,0,0,0,1],!ki(t,yi,bi,xi,Ei))?!1:(Di.crossVectors(Si,Ci),t=[Di.x,Di.y,Di.z],ki(t,yi,bi,xi,Ei))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_i).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_i).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},gi=[new K,new K,new K,new K,new K,new K,new K,new K],_i=new K,vi=new hi,yi=new K,bi=new K,xi=new K,Si=new K,Ci=new K,wi=new K,Ti=new K,Ei=new K,Di=new K,Oi=new K;function ki(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Oi.fromArray(e,a);let o=i.x*Math.abs(Oi.x)+i.y*Math.abs(Oi.y)+i.z*Math.abs(Oi.z),s=t.dot(Oi),c=n.dot(Oi),l=r.dot(Oi);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Ai=new K,ji=new G,Mi=0,Ni=class extends Sn{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Mi++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=ln,this.updateRanges=[],this.gpuType=Xe,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ji.fromBufferAttribute(this,t),ji.applyMatrix3(e),this.setXY(t,ji.x,ji.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ai.fromBufferAttribute(this,t),Ai.applyMatrix3(e),this.setXYZ(t,Ai.x,Ai.y,Ai.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ai.fromBufferAttribute(this,t),Ai.applyMatrix4(e),this.setXYZ(t,Ai.x,Ai.y,Ai.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ai.fromBufferAttribute(this,t),Ai.applyNormalMatrix(e),this.setXYZ(t,Ai.x,Ai.y,Ai.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ai.fromBufferAttribute(this,t),Ai.transformDirection(e),this.setXYZ(t,Ai.x,Ai.y,Ai.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qn(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Kn(t,this.array)),t}setX(e,t){return this.normalized&&(t=qn(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Kn(t,this.array)),t}setY(e,t){return this.normalized&&(t=qn(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Kn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=qn(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Kn(t,this.array)),t}setW(e,t){return this.normalized&&(t=qn(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=qn(t,this.array),n=qn(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=qn(t,this.array),n=qn(n,this.array),r=qn(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=qn(t,this.array),n=qn(n,this.array),r=qn(r,this.array),i=qn(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},Pi=class extends Ni{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Fi=class extends Ni{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ii=class extends Ni{constructor(e,t,n){super(new Float32Array(e),t,n)}},Li=new hi,Ri=new K,zi=new K,Bi=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?Li.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ri.subVectors(e,this.center);let t=Ri.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ri,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zi.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ri.copy(e.center).add(zi)),this.expandByPoint(Ri.copy(e.center).sub(zi))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Vi=0,Hi=new vr,Ui=new Gr,Wi=new K,Gi=new hi,Ki=new hi,qi=new K,Ji=class e extends Sn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Vi++}),this.uuid=Dn(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(fn(e)?Fi:Pi)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Hi.makeRotationFromQuaternion(e),this.applyMatrix4(Hi),this}rotateX(e){return Hi.makeRotationX(e),this.applyMatrix4(Hi),this}rotateY(e){return Hi.makeRotationY(e),this.applyMatrix4(Hi),this}rotateZ(e){return Hi.makeRotationZ(e),this.applyMatrix4(Hi),this}translate(e,t,n){return Hi.makeTranslation(e,t,n),this.applyMatrix4(Hi),this}scale(e,t,n){return Hi.makeScale(e,t,n),this.applyMatrix4(Hi),this}lookAt(e){return Ui.lookAt(e),Ui.updateMatrix(),this.applyMatrix4(Ui.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wi).negate(),this.translate(Wi.x,Wi.y,Wi.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Ii(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&H(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new hi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Gi.setFromBufferAttribute(n),this.morphTargetsRelative?(qi.addVectors(this.boundingBox.min,Gi.min),this.boundingBox.expandByPoint(qi),qi.addVectors(this.boundingBox.max,Gi.max),this.boundingBox.expandByPoint(qi)):(this.boundingBox.expandByPoint(Gi.min),this.boundingBox.expandByPoint(Gi.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&U(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Bi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){U(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);return}if(e){let n=this.boundingSphere.center;if(Gi.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ki.setFromBufferAttribute(n),this.morphTargetsRelative?(qi.addVectors(Gi.min,Ki.min),Gi.expandByPoint(qi),qi.addVectors(Gi.max,Ki.max),Gi.expandByPoint(qi)):(Gi.expandByPoint(Ki.min),Gi.expandByPoint(Ki.max))}Gi.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)qi.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(qi));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)qi.fromBufferAttribute(a,t),o&&(Wi.fromBufferAttribute(e,t),qi.add(Wi)),r=Math.max(r,n.distanceToSquared(qi))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&U(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){U(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Ni(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let c=new K,l=new K,u=new K,d=new G,f=new G,p=new G,m=new K,h=new K;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new K,y=new K,b=new K,x=new K;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Ni(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qi.fromBufferAttribute(e,t),qi.normalize(),e.setXYZ(t,qi.x,qi.y,qi.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Ni(a,r,i)}if(this.index===null)return H(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Yi=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=ln,this.updateRanges=[],this.version=0,this.uuid=Dn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xi=new K,Zi=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.applyMatrix4(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.applyNormalMatrix(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.transformDirection(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Kn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=qn(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=qn(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=qn(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=qn(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=qn(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Kn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Kn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Kn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Kn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=qn(t,this.array),n=qn(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=qn(t,this.array),n=qn(n,this.array),r=qn(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=qn(t,this.array),n=qn(n,this.array),r=qn(r,this.array),i=qn(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){_n(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Ni(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_n(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Qi=0,$i=class extends Sn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qi++}),this.uuid=Dn(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cn,this.stencilZFail=cn,this.stencilZPass=cn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){H(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){H(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ea=class extends $i{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},ta,na=new K,ra=new K,ia=new K,aa=new G,oa=new G,sa=new vr,ca=new K,la=new K,ua=new K,da=new G,fa=new G,pa=new G,ma=class extends Gr{constructor(e=new ea){if(super(),this.isSprite=!0,this.type=`Sprite`,ta===void 0){ta=new Ji;let e=new Yi(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);ta.setIndex([0,1,2,0,2,3]),ta.setAttribute(`position`,new Zi(e,3,0,!1)),ta.setAttribute(`uv`,new Zi(e,2,3,!1))}this.geometry=ta,this.material=e,this.center=new G(.5,.5),this.count=1}raycast(e,t){e.camera===null&&U(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ra.setFromMatrixScale(this.matrixWorld),sa.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ia.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ra.multiplyScalar(-ia.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;ha(ca.set(-.5,-.5,0),ia,a,ra,r,i),ha(la.set(.5,-.5,0),ia,a,ra,r,i),ha(ua.set(.5,.5,0),ia,a,ra,r,i),da.set(0,0),fa.set(1,0),pa.set(1,1);let o=e.ray.intersectTriangle(ca,la,ua,!1,na);if(o===null&&(ha(la.set(-.5,.5,0),ia,a,ra,r,i),fa.set(0,1),o=e.ray.intersectTriangle(ca,ua,la,!1,na),o===null))return;let s=e.ray.origin.distanceTo(na);s<e.near||s>e.far||t.push({distance:s,point:na.clone(),uv:mi.getInterpolation(na,ca,la,ua,da,fa,pa,new G),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function ha(e,t,n,r,i,a){aa.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?oa.copy(aa):(oa.x=a*aa.x-i*aa.y,oa.y=i*aa.x+a*aa.y),e.copy(t),e.x+=oa.x,e.y+=oa.y,e.applyMatrix4(sa)}var ga=new K,_a=new K,va=new K,ya=new K,ba=new K,xa=new K,Sa=new K,Ca=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ga)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ga.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ga.copy(this.origin).addScaledVector(this.direction,t),ga.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){_a.copy(e).add(t).multiplyScalar(.5),va.copy(t).sub(e).normalize(),ya.copy(this.origin).sub(_a);let i=e.distanceTo(t)*.5,a=-this.direction.dot(va),o=ya.dot(this.direction),s=-ya.dot(va),c=ya.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(_a).addScaledVector(va,d),f}intersectSphere(e,t){ga.subVectors(e.center,this.origin);let n=ga.dot(this.direction),r=ga.dot(ga)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,ga)!==null}intersectTriangle(e,t,n,r,i){ba.subVectors(t,e),xa.subVectors(n,e),Sa.crossVectors(ba,xa);let a=this.direction.dot(Sa),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ya.subVectors(this.origin,e);let s=o*this.direction.dot(xa.crossVectors(ya,xa));if(s<0)return null;let c=o*this.direction.dot(ba.cross(ya));if(c<0||s+c>a)return null;let l=-o*ya.dot(Sa);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},wa=class extends $i{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Or,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ta=new vr,Ea=new Ca,Da=new Bi,Oa=new K,ka=new K,Aa=new K,ja=new K,Ma=new K,Na=new K,Pa=new K,Fa=new K,Y=class extends Gr{constructor(e=new Ji,t=new wa){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Na.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Ma.fromBufferAttribute(s,e),a?Na.addScaledVector(Ma,r):Na.addScaledVector(Ma.sub(t),r))}t.add(Na)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Da.copy(n.boundingSphere),Da.applyMatrix4(i),Ea.copy(e.ray).recast(e.near),!(Da.containsPoint(Ea.origin)===!1&&(Ea.intersectSphere(Da,Oa)===null||Ea.origin.distanceToSquared(Oa)>(e.far-e.near)**2))&&(Ta.copy(i).invert(),Ea.copy(e.ray).applyMatrix4(Ta),(n.boundingBox===null||Ea.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Ea)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=La(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=La(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=La(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=La(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Ia(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Fa.copy(s),Fa.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Fa);return l<n.near||l>n.far?null:{distance:l,point:Fa.clone(),object:e}}function La(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,ka),e.getVertexPosition(c,Aa),e.getVertexPosition(l,ja);let u=Ia(e,t,n,r,ka,Aa,ja,Pa);if(u){let e=new K;mi.getBarycoord(Pa,ka,Aa,ja,e),i&&(u.uv=mi.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=mi.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=mi.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};mi.getNormal(ka,Aa,ja,t.normal),u.face=t,u.barycoord=e}return u}var Ra=class extends fr{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Re,l=Re,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},za=class extends Ni{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Ba=new vr,Va=new vr,Ha=[],Ua=new hi,Wa=new vr,Ga=new Y,Ka=new Bi,qa=class extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new za(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Wa)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new hi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ba),Ua.copy(e.boundingBox).applyMatrix4(Ba),this.boundingBox.union(Ua)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Bi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ba),Ka.copy(e.boundingSphere).applyMatrix4(Ba),this.boundingSphere.union(Ka)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ga.geometry=this.geometry,Ga.material=this.material,Ga.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ka.copy(this.boundingSphere),Ka.applyMatrix4(n),e.ray.intersectsSphere(Ka)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Ba),Va.multiplyMatrices(n,Ba),Ga.matrixWorld=Va,Ga.raycast(e,Ha);for(let e=0,n=Ha.length;e<n;e++){let n=Ha[e];n.instanceId=i,n.object=this,t.push(n)}Ha.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new za(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ra(new Float32Array(r*this.count),r,this.count,ct,Xe));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Ja=new K,Ya=new K,Xa=new q,Za=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Ja.subVectors(n,t).cross(Ya.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Ja),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Xa.getNormalMatrix(e),r=this.coplanarPoint(Ja).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},Qa=new Bi,$a=new G(.5,.5),eo=new K,to=class{constructor(e=new Za,t=new Za,n=new Za,r=new Za,i=new Za,a=new Za){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dn,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Qa.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Qa.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Qa)}intersectsSprite(e){return Qa.center.set(0,0,0),Qa.radius=.7071067811865476+$a.distanceTo(e.center),Qa.applyMatrix4(e.matrixWorld),this.intersectsSphere(Qa)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(eo.x=r.normal.x>0?e.max.x:e.min.x,eo.y=r.normal.y>0?e.max.y:e.min.y,eo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(eo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},no=class extends fr{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},ro=class extends fr{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},io=class extends fr{constructor(e,t,n=Ye,r,i,a,o=Re,s=Re,c,l=ot,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new cr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ao=class extends io{constructor(e,t=Ye,n=301,r,i,a=Re,o=Re,s,c=ot){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},oo=class extends fr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},so=class e extends Ji{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Ii(c,3)),this.setAttribute(`normal`,new Ii(l,3)),this.setAttribute(`uv`,new Ii(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},co=class e extends Ji{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Ii(u,3)),this.setAttribute(`normal`,new Ii(d,3)),this.setAttribute(`uv`,new Ii(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},lo=class e extends co{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},uo=class e extends Ji{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Ii(i,3)),this.setAttribute(`normal`,new Ii(i.slice(),3)),this.setAttribute(`uv`,new Ii(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},fo=class e extends uo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},po=class e extends Ji{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Ii(p,3)),this.setAttribute(`normal`,new Ii(m,3)),this.setAttribute(`uv`,new Ii(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},mo=class e extends Ji{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new K,p=new G;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Ii(s,3)),this.setAttribute(`normal`,new Ii(c,3)),this.setAttribute(`uv`,new Ii(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ho=class e extends Ji{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Ii(p,3)),this.setAttribute(`normal`,new Ii(m,3)),this.setAttribute(`uv`,new Ii(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},go=class e extends Ji{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new K,f=new K,p=new K;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Ii(c,3)),this.setAttribute(`normal`,new Ii(l,3)),this.setAttribute(`uv`,new Ii(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}};function _o(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(yo(i))i.isRenderTargetTexture?(H(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(yo(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function vo(e){let t={};for(let n=0;n<e.length;n++){let r=_o(e[n]);for(let e in r)t[e]=r[e]}return t}function yo(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function bo(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function xo(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:nr.workingColorSpace}var So={clone:_o,merge:vo},Co=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,wo=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,To=class extends $i{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Co,this.fragmentShader=wo,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=_o(e.uniforms),this.uniformsGroups=bo(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new pr().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new vr().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Eo=class extends To{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},Do=class extends $i{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Or,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Oo=class extends $i{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=nn,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},ko=class extends $i{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Ao(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var jo=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},Mo=class extends jo{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:$t,endingEnd:$t}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case en:i=e,o=2*t-n;break;case tn:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case en:a=e,s=2*n-t;break;case tn:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},No=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Po=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Fo=class extends jo{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Io=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Ao(t,this.TimeBufferType),this.values=Ao(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Ao(e.times,Array),values:Ao(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Po(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new No(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Mo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Fo(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Yt:t=this.InterpolantFactoryMethodDiscrete;break;case Xt:t=this.InterpolantFactoryMethodLinear;break;case Zt:t=this.InterpolantFactoryMethodSmooth;break;case Qt:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return H(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Yt;case this.InterpolantFactoryMethodLinear:return Xt;case this.InterpolantFactoryMethodSmooth:return Zt;case this.InterpolantFactoryMethodBezier:return Qt}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(U(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(U(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){U(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){U(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&pn(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){U(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Zt,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Io.prototype.ValueTypeName=``,Io.prototype.TimeBufferType=Float32Array,Io.prototype.ValueBufferType=Float32Array,Io.prototype.DefaultInterpolation=Xt;var Lo=class extends Io{constructor(e,t,n){super(e,t,n)}};Lo.prototype.ValueTypeName=`bool`,Lo.prototype.ValueBufferType=Array,Lo.prototype.DefaultInterpolation=Yt,Lo.prototype.InterpolantFactoryMethodLinear=void 0,Lo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ro=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Ro.prototype.ValueTypeName=`color`;var zo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};zo.prototype.ValueTypeName=`number`;var Bo=class extends jo{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Yn.slerpFlat(i,0,a,c-o,a,c,s);return i}},Vo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Bo(this.times,this.values,this.getValueSize(),e)}};Vo.prototype.ValueTypeName=`quaternion`,Vo.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends Io{constructor(e,t,n){super(e,t,n)}};Ho.prototype.ValueTypeName=`string`,Ho.prototype.ValueBufferType=Array,Ho.prototype.DefaultInterpolation=Yt,Ho.prototype.InterpolantFactoryMethodLinear=void 0,Ho.prototype.InterpolantFactoryMethodSmooth=void 0;var Uo=class extends Io{constructor(e,t,n,r){super(e,t,n,r)}};Uo.prototype.ValueTypeName=`vector`;var Wo={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Go(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Go(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Go(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Ko=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},qo=class{constructor(e){this.manager=e===void 0?Ko:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};qo.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Jo=new WeakMap,Yo=class extends qo{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Wo.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Jo.get(a);e===void 0&&(e=[],Jo.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=mn(`img`);function s(){l(),t&&t(this);let n=Jo.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Jo.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Wo.remove(`image:${e}`);let n=Jo.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Jo.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Wo.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Xo=class extends qo{constructor(e){super(e)}load(e,t,n,r){let i=new fr,a=new Yo(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Zo=class extends Gr{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Qo=class extends Zo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Gr.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},$o=new vr,es=new K,ts=new K,ns=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=We,this.map=null,this.mapPass=null,this.matrix=new vr,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new to,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new pr(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;es.setFromMatrixPosition(e.matrixWorld),t.position.copy(es),ts.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ts),t.updateMatrixWorld(),$o.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix($o,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply($o)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},rs=new K,is=new Yn,as=new K,os=class extends Gr{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new vr,this.projectionMatrix=new vr,this.projectionMatrixInverse=new vr,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(rs,is,as),as.x===1&&as.y===1&&as.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rs,is,as.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(rs,is,as),as.x===1&&as.y===1&&as.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(rs,is,as.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ss=new K,cs=new G,ls=new G,us=class extends os{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=En*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Tn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return En*2*Math.atan(Math.tan(Tn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ss.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ss.x,ss.y).multiplyScalar(-e/ss.z),ss.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ss.x,ss.y).multiplyScalar(-e/ss.z)}getViewSize(e,t){return this.getViewBounds(e,cs,ls),t.subVectors(ls,cs)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Tn*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},ds=class extends os{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},fs=class extends ns{constructor(){super(new ds(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},ps=class extends Zo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Gr.DEFAULT_UP),this.updateMatrix(),this.target=new Gr,this.shadow=new fs}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},ms=-90,hs=1,gs=class extends Gr{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new us(ms,hs,e,t);r.layers=this.layers,this.add(r);let i=new us(ms,hs,e,t);i.layers=this.layers,this.add(i);let a=new us(ms,hs,e,t);a.layers=this.layers,this.add(a);let o=new us(ms,hs,e,t);o.layers=this.layers,this.add(o);let s=new us(ms,hs,e,t);s.layers=this.layers,this.add(s);let c=new us(ms,hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},_s=class extends us{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},vs=`\\[\\]\\.:\\/`,ys=RegExp(`[\\[\\]\\.:\\/]`,`g`),bs=`[^\\[\\]\\.:\\/]`,xs=`[^`+vs.replace(`\\.`,``)+`]`,Ss=`((?:WC+[\\/:])*)`.replace(`WC`,bs),Cs=`(WCOD+)?`.replace(`WCOD`,xs),ws=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,bs),Ts=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,bs),Es=RegExp(`^`+Ss+Cs+ws+Ts+`$`),Ds=[`material`,`materials`,`bones`,`map`],Os=class{constructor(e,t,n){let r=n||ks.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},ks=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(ys,``)}static parseTrackName(e){let t=Es.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Ds.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){H(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){U(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){U(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){U(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){U(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){U(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){U(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;U(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){U(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};ks.Composite=Os,ks.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},ks.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},ks.prototype.GetterByBindingType=[ks.prototype._getValue_direct,ks.prototype._getValue_array,ks.prototype._getValue_arrayElement,ks.prototype._getValue_toArray],ks.prototype.SetterByBindingTypeAndVersioning=[[ks.prototype._setValue_direct,ks.prototype._setValue_direct_setNeedsUpdate,ks.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[ks.prototype._setValue_array,ks.prototype._setValue_array_setNeedsUpdate,ks.prototype._setValue_array_setMatrixWorldNeedsUpdate],[ks.prototype._setValue_arrayElement,ks.prototype._setValue_arrayElement_setNeedsUpdate,ks.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[ks.prototype._setValue_fromArray,ks.prototype._setValue_fromArray_setNeedsUpdate,ks.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var As=new vr,js=class{constructor(e,t,n=0,r=1/0){this.ray=new Ca(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new kr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):U(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return As.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(As),this}intersectObject(e,t=!0,n=[]){return Ns(e,this,n,t),n.sort(Ms),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)Ns(e[r],this,n,t);return n.sort(Ms),n}};function Ms(e,t){return e.distance-t.distance}function Ns(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)Ns(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Ps(e,t,n,r){let i=Fs(r);switch(n){case rt:return e*t;case ct:return e*t/i.components*i.byteLength;case lt:return e*t/i.components*i.byteLength;case ut:return e*t*2/i.components*i.byteLength;case dt:return e*t*2/i.components*i.byteLength;case it:return e*t*3/i.components*i.byteLength;case at:return e*t*4/i.components*i.byteLength;case ft:return e*t*4/i.components*i.byteLength;case pt:case mt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case ht:case gt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case vt:case bt:return Math.max(e,16)*Math.max(t,8)/4;case _t:case yt:return Math.max(e,8)*Math.max(t,8)/2;case xt:case St:case wt:case Tt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Ct:case Et:case Dt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Ot:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case kt:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case At:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case jt:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Mt:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Nt:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Pt:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case Ft:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case It:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Lt:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case Rt:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case zt:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Bt:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Vt:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Ht:case Ut:case Wt:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Gt:case Kt:return Math.ceil(e/4)*Math.ceil(t/4)*8;case qt:case Jt:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Fs(e){switch(e){case We:case Ge:return{byteLength:1,components:1};case qe:case Ke:case Ze:return{byteLength:2,components:1};case Qe:case $e:return{byteLength:2,components:4};case Ye:case Je:case Xe:return{byteLength:4,components:1};case tt:case nt:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?H(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function Is(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Ls(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:`gl_FragColor = linearToOutputTexel( gl_FragColor );`,colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,lightprobes_pars_fragment:`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distance_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distance_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},Z={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},Rs={basic:{uniforms:vo([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:vo([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:vo([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:vo([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:vo([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new J(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:vo([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:vo([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:vo([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:vo([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:vo([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:vo([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:vo([Z.common,Z.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:vo([Z.lights,Z.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};Rs.physical={uniforms:vo([Rs.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var zs={r:0,b:0,g:0},Bs=new vr,Vs=new q;Vs.set(-1,0,0,0,1,0,0,0,1);function Hs(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Y(new so(1,1,1),new To({name:`BackgroundCubeMaterial`,uniforms:_o(Rs.backgroundCube.uniforms),vertexShader:Rs.backgroundCube.vertexShader,fragmentShader:Rs.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Bs.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Vs),l.material.toneMapped=nr.getTransfer(i.colorSpace)!==sn,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new po(2,2),new To({name:`BackgroundMaterial`,uniforms:_o(Rs.background.uniforms),vertexShader:Rs.background.vertexShader,fragmentShader:Rs.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=nr.getTransfer(i.colorSpace)!==sn,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(zs,xo(e)),n.buffers.color.setClear(zs.r,zs.g,zs.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Us(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Ws(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Gs(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(H(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&H(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Ks(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Za,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var qs=4,Js=[.125,.215,.35,.446,.526,.582],Ys=20,Xs=256,Zs=new ds,Qs=new J,$s=null,ec=0,tc=0,nc=!1,rc=new K,ic=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=rc}=i;$s=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=dc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=uc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($s,ec,tc),this._renderer.xr.enabled=nc,e.scissorTest=!1,sc(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$s=this._renderer.getRenderTarget(),ec=this._renderer.getActiveCubeFace(),tc=this._renderer.getActiveMipmapLevel(),nc=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Ve,minFilter:Ve,generateMipmaps:!1,type:Ze,format:at,colorSpace:an,depthBuffer:!1},r=oc(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=oc(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=ac(r)),this._blurMaterial=lc(r,e,t),this._ggxMaterial=cc(r,e,t)}return r}_compileMaterial(e){let t=new Y(new Ji,e);this._renderer.compile(t,Zs)}_sceneToCubeUV(e,t,n,r,i){let a=new us(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Qs),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Y(new so,new wa({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Qs),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;sc(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=dc()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=uc());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;sc(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Zs)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-qs?n-d+qs:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,sc(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Zs),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,sc(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Zs)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&U(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Ys;m>Ys&&H(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ys}`);let h=[],g=0;for(let e=0;e<Ys;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];sc(t,3*v*(r>_-qs?r-_+qs:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Zs)}};function ac(e){let t=[],n=[],r=[],i=e,a=e-qs+1+Js.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-qs?s=Js[o-e+qs-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Ji;h.setAttribute(`position`,new Ni(f,3)),h.setAttribute(`uv`,new Ni(p,2)),h.setAttribute(`faceIndex`,new Ni(m,1)),r.push(new Y(h,null)),i>qs&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function oc(e,t,n){let r=new hr(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function sc(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function cc(e,t,n){return new To({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Xs,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function lc(e,t,n){let r=new Float32Array(Ys),i=new K(0,1,0);return new To({name:`SphericalGaussianBlur`,defines:{n:Ys,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function uc(){return new To({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function dc(){return new To({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function fc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}var pc=class extends hr{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new no(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new so(5,5,5),i=new To({name:`CubemapFromEquirect`,uniforms:_o(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Ve),new gs(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function mc(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new pc(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new ic(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new ic(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function hc(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&yn(`WebGLRenderer: `+e+` extension not supported.`),t}}}function gc(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Fi:Pi)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function _c(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function vc(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:U(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function yc(e,t,n){let r=new WeakMap,i=new pr;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new gr(h,p,m,u);g.type=Xe,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function bc(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var xc={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function Sc(e,t,n,r,i,a){let o=new hr(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new io(t,n):void 0}),s=new hr(t,n,{type:Ze,depthBuffer:!1,stencilBuffer:!1}),c=new Ji;c.setAttribute(`position`,new Ii([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new Ii([0,2,0,0,2,0],2));let l=new Eo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Y(c,l),d=new ds(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},nr.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=xc[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var Cc=new fr,wc=new io(1,1),Tc=new gr,Ec=new _r,Dc=new no,Oc=[],kc=[],Ac=new Float32Array(16),jc=new Float32Array(9),Mc=new Float32Array(4);function Nc(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=Oc[i];if(a===void 0&&(a=new Float32Array(i),Oc[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Pc(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Fc(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Ic(e,t){let n=kc[t];n===void 0&&(n=new Int32Array(t),kc[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Lc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Rc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pc(n,t))return;e.uniform2fv(this.addr,t),Fc(n,t)}}function zc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Pc(n,t))return;e.uniform3fv(this.addr,t),Fc(n,t)}}function Bc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pc(n,t))return;e.uniform4fv(this.addr,t),Fc(n,t)}}function Vc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Pc(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Fc(n,t)}else{if(Pc(n,r))return;Mc.set(r),e.uniformMatrix2fv(this.addr,!1,Mc),Fc(n,r)}}function Hc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Pc(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Fc(n,t)}else{if(Pc(n,r))return;jc.set(r),e.uniformMatrix3fv(this.addr,!1,jc),Fc(n,r)}}function Uc(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Pc(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Fc(n,t)}else{if(Pc(n,r))return;Ac.set(r),e.uniformMatrix4fv(this.addr,!1,Ac),Fc(n,r)}}function Wc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Gc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pc(n,t))return;e.uniform2iv(this.addr,t),Fc(n,t)}}function Kc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pc(n,t))return;e.uniform3iv(this.addr,t),Fc(n,t)}}function qc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pc(n,t))return;e.uniform4iv(this.addr,t),Fc(n,t)}}function Jc(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Yc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Pc(n,t))return;e.uniform2uiv(this.addr,t),Fc(n,t)}}function Xc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Pc(n,t))return;e.uniform3uiv(this.addr,t),Fc(n,t)}}function Zc(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Pc(n,t))return;e.uniform4uiv(this.addr,t),Fc(n,t)}}function Qc(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(wc.compareFunction=n.isReversedDepthBuffer()?518:515,a=wc):a=Cc,n.setTexture2D(t||a,i)}function $c(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||Ec,i)}function el(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Dc,i)}function tl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Tc,i)}function nl(e){switch(e){case 5126:return Lc;case 35664:return Rc;case 35665:return zc;case 35666:return Bc;case 35674:return Vc;case 35675:return Hc;case 35676:return Uc;case 5124:case 35670:return Wc;case 35667:case 35671:return Gc;case 35668:case 35672:return Kc;case 35669:case 35673:return qc;case 5125:return Jc;case 36294:return Yc;case 36295:return Xc;case 36296:return Zc;case 35678:case 36198:case 36298:case 36306:case 35682:return Qc;case 35679:case 36299:case 36307:return $c;case 35680:case 36300:case 36308:case 36293:return el;case 36289:case 36303:case 36311:case 36292:return tl}}function rl(e,t){e.uniform1fv(this.addr,t)}function il(e,t){let n=Nc(t,this.size,2);e.uniform2fv(this.addr,n)}function al(e,t){let n=Nc(t,this.size,3);e.uniform3fv(this.addr,n)}function ol(e,t){let n=Nc(t,this.size,4);e.uniform4fv(this.addr,n)}function sl(e,t){let n=Nc(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function cl(e,t){let n=Nc(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function ll(e,t){let n=Nc(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function ul(e,t){e.uniform1iv(this.addr,t)}function dl(e,t){e.uniform2iv(this.addr,t)}function fl(e,t){e.uniform3iv(this.addr,t)}function pl(e,t){e.uniform4iv(this.addr,t)}function ml(e,t){e.uniform1uiv(this.addr,t)}function hl(e,t){e.uniform2uiv(this.addr,t)}function gl(e,t){e.uniform3uiv(this.addr,t)}function _l(e,t){e.uniform4uiv(this.addr,t)}function vl(e,t,n){let r=this.cache,i=t.length,a=Ic(n,i);Pc(r,a)||(e.uniform1iv(this.addr,a),Fc(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?wc:Cc;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function yl(e,t,n){let r=this.cache,i=t.length,a=Ic(n,i);Pc(r,a)||(e.uniform1iv(this.addr,a),Fc(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||Ec,a[e])}function bl(e,t,n){let r=this.cache,i=t.length,a=Ic(n,i);Pc(r,a)||(e.uniform1iv(this.addr,a),Fc(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Dc,a[e])}function xl(e,t,n){let r=this.cache,i=t.length,a=Ic(n,i);Pc(r,a)||(e.uniform1iv(this.addr,a),Fc(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Tc,a[e])}function Sl(e){switch(e){case 5126:return rl;case 35664:return il;case 35665:return al;case 35666:return ol;case 35674:return sl;case 35675:return cl;case 35676:return ll;case 5124:case 35670:return ul;case 35667:case 35671:return dl;case 35668:case 35672:return fl;case 35669:case 35673:return pl;case 5125:return ml;case 36294:return hl;case 36295:return gl;case 36296:return _l;case 35678:case 36198:case 36298:case 36306:case 35682:return vl;case 35679:case 36299:case 36307:return yl;case 35680:case 36300:case 36308:case 36293:return bl;case 36289:case 36303:case 36311:case 36292:return xl}}var Cl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=nl(t.type)}},wl=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Sl(t.type)}},Tl=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},El=/(\w+)(\])?(\[|\.)?/g;function Dl(e,t){e.seq.push(t),e.map[t.id]=t}function Ol(e,t,n){let r=e.name,i=r.length;for(El.lastIndex=0;;){let a=El.exec(r),o=El.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Dl(n,l===void 0?new Cl(s,e,t):new wl(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Tl(s),Dl(n,e)),n=e}}}var kl=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Ol(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Al(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var jl=37297,Ml=0;function Nl(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Pl=new q;function Fl(e){nr._getMatrix(Pl,nr.workingColorSpace,e);let t=`mat3( ${Pl.elements.map(e=>e.toFixed(4))} )`;switch(nr.getTransfer(e)){case on:return[t,`LinearTransferOETF`];case sn:return[t,`sRGBTransferOETF`];default:return H(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Il(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+Nl(e.getShaderSource(t),r)}return i}function Ll(e,t){let n=Fl(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Rl={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function zl(e,t){let n=Rl[t];return n===void 0?(H(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Bl=new K;function Vl(){return nr.getLuminanceCoefficients(Bl),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Bl.x.toFixed(4)}, ${Bl.y.toFixed(4)}, ${Bl.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Hl(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Gl).join(`
`)}function Ul(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Wl(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Gl(e){return e!==``}function Kl(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ql(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Jl=/^[ \t]*#include +<([\w\d./]+)>/gm;function Yl(e){return e.replace(Jl,Zl)}var Xl=new Map;function Zl(e,t){let n=X[t];if(n===void 0){let e=Xl.get(t);if(e!==void 0)n=X[e],H(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Yl(n)}var Ql=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $l(e){return e.replace(Ql,eu)}function eu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function tu(e){let t=`precision ${e.precision} float;
	precision ${e.precision} int;
	precision ${e.precision} sampler2D;
	precision ${e.precision} samplerCube;
	precision ${e.precision} sampler3D;
	precision ${e.precision} sampler2DArray;
	precision ${e.precision} sampler2DShadow;
	precision ${e.precision} samplerCubeShadow;
	precision ${e.precision} sampler2DArrayShadow;
	precision ${e.precision} isampler2D;
	precision ${e.precision} isampler3D;
	precision ${e.precision} isamplerCube;
	precision ${e.precision} isampler2DArray;
	precision ${e.precision} usampler2D;
	precision ${e.precision} usampler3D;
	precision ${e.precision} usamplerCube;
	precision ${e.precision} usampler2DArray;
	`;return e.precision===`highp`?t+=`
#define HIGH_PRECISION`:e.precision===`mediump`?t+=`
#define MEDIUM_PRECISION`:e.precision===`lowp`&&(t+=`
#define LOW_PRECISION`),t}var nu={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function ru(e){return nu[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var iu={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function au(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:iu[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var ou={302:`ENVMAP_MODE_REFRACTION`};function su(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:ou[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var cu={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function lu(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:cu[e.combine]||`ENVMAP_BLENDING_NONE`}function uu(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function du(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=ru(n),l=au(n),u=su(n),d=lu(n),f=uu(n),p=Hl(n),m=Ul(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Gl).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Gl).join(`
`),_.length>0&&(_+=`
`)):(g=[tu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Gl).join(`
`),_=[tu(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:zl(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,Ll(`linearToOutputTexel`,n.outputColorSpace),Vl(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Gl).join(`
`)),o=Yl(o),o=Kl(o,n),o=ql(o,n),s=Yl(s),s=Kl(s,n),s=ql(s,n),o=$l(o),s=$l(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Al(i,i.VERTEX_SHADER,y),S=Al(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Il(i,x,`vertex`),n=Il(i,S,`fragment`);U(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):H(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new kl(i,h),T=Wl(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,jl)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Ml++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var fu=0,pu=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new mu(e),t.set(e,n)),n}},mu=class{constructor(e){this.id=fu++,this.code=e,this.usedTimes=0}};function hu(e){return e===1030||e===37490||e===36285}function gu(e,t,n,r,i,a){let o=new kr,s=new pu,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&H(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Rs[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let ee=e.getRenderTarget(),te=e.state.buffers.depth.getReversed(),j=h.isInstancedMesh===!0,M=h.isBatchedMesh===!0,N=!!i.map,P=!!i.matcap,ne=!!x,re=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,F=!!i.emissiveMap,ce=!!i.metalnessMap,le=!!i.roughnessMap,ue=i.anisotropy>0,I=i.clearcoat>0,de=i.dispersion>0,fe=i.iridescence>0,L=i.sheen>0,pe=i.transmission>0,me=ue&&!!i.anisotropyMap,he=I&&!!i.clearcoatMap,ge=I&&!!i.clearcoatNormalMap,_e=I&&!!i.clearcoatRoughnessMap,ve=fe&&!!i.iridescenceMap,ye=fe&&!!i.iridescenceThicknessMap,R=L&&!!i.sheenColorMap,be=L&&!!i.sheenRoughnessMap,xe=!!i.specularMap,Se=!!i.specularColorMap,z=!!i.specularIntensityMap,Ce=pe&&!!i.transmissionMap,B=pe&&!!i.thicknessMap,V=!!i.gradientMap,we=!!i.alphaMap,Te=i.alphaTest>0,Ee=!!i.alphaHash,De=!!i.extensions,Oe=0;i.toneMapped&&(ee===null||ee.isXRRenderTarget===!0)&&(Oe=e.toneMapping);let ke={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:M,batchingColor:M&&h._colorsTexture!==null,instancing:j,instancingColor:j&&h.instanceColor!==null,instancingMorph:j&&h.morphTexture!==null,outputColorSpace:ee===null?e.outputColorSpace:ee.isXRRenderTarget===!0?ee.texture.colorSpace:nr.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:N,matcap:P,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:F,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&hu(i.normalMap.format),metalnessMap:ce,roughnessMap:le,anisotropy:ue,anisotropyMap:me,clearcoat:I,clearcoatMap:he,clearcoatNormalMap:ge,clearcoatRoughnessMap:_e,dispersion:de,iridescence:fe,iridescenceMap:ve,iridescenceThicknessMap:ye,sheen:L,sheenColorMap:R,sheenRoughnessMap:be,specularMap:xe,specularColorMap:Se,specularIntensityMap:z,transmission:pe,transmissionMap:Ce,thicknessMap:B,gradientMap:V,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:we,alphaTest:Te,alphaHash:Ee,combine:i.combine,mapUv:N&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:F&&m(i.emissiveMap.channel),metalnessMapUv:ce&&m(i.metalnessMap.channel),roughnessMapUv:le&&m(i.roughnessMap.channel),anisotropyMapUv:me&&m(i.anisotropyMap.channel),clearcoatMapUv:he&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:ge&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:_e&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ve&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:ye&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:R&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:be&&m(i.sheenRoughnessMap.channel),specularMapUv:xe&&m(i.specularMap.channel),specularColorMapUv:Se&&m(i.specularColorMap.channel),specularIntensityMapUv:z&&m(i.specularIntensityMap.channel),transmissionMapUv:Ce&&m(i.transmissionMap.channel),thicknessMapUv:B&&m(i.thicknessMap.channel),alphaMapUv:we&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(oe||ue),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(N||we),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:te,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:Oe,decodeVideoTexture:N&&i.map.isVideoTexture===!0&&nr.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:F&&i.emissiveMap.isVideoTexture===!0&&nr.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:De&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(De&&i.extensions.multiDraw===!0||M)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return ke.vertexUv1s=c.has(1),ke.vertexUv2s=c.has(2),ke.vertexUv3s=c.has(3),c.clear(),ke}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Rs[t];n=So.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new du(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function _u(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function vu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function yu(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function bu(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||vu),r.length>1&&r.sort(t||yu),i.length>1&&i.sort(t||yu),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function xu(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new bu,e.set(t,[i])):n>=r.length?(i=new bu,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function Su(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new K,color:new J};break;case`SpotLight`:n={position:new K,direction:new K,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function Cu(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var wu=0;function Tu(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function Eu(e){let t=new Su,n=Cu(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new vr,o=new vr;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(Tu);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=wu++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Du(e){let t=new Eu(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ou(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Du(e),t.set(n,[a])):r>=i.length?(a=new Du(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var ku=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Au=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,ju=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],Mu=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],Nu=new vr,Pu=new K,Fu=new K;function Iu(e,t,n){let r=new to,i=new G,a=new G,o=new pr,s=new Oo,c=new ko,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new To({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:ku,fragmentShader:Au}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ji;m.setAttribute(`position`,new Ni(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Y(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(H(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){H(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){H(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new hr(i.x,i.y,{format:ut,type:Ze,minFilter:Ve,magFilter:Ve,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new io(i.x,i.y,Xe),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=ot,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Re,d.map.depthTexture.magFilter=Re}else l.isPointLight?(d.map=new pc(i.x),d.map.depthTexture=new ao(i.x,Ye)):(d.map=new hr(i.x,i.y),d.map.depthTexture=new io(i.x,i.y,Ye)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=ot,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Ve,d.map.depthTexture.magFilter=Ve):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Re,d.map.depthTexture.magFilter=Re);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Pu.setFromMatrixPosition(l.matrixWorld),e.position.copy(Pu),Fu.copy(e.position),Fu.add(ju[t]),e.up.copy(Mu[t]),e.lookAt(Fu),e.updateMatrixWorld(),n.makeTranslation(-Pu.x,-Pu.y,-Pu.z),Nu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(Nu,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new hr(i.x,i.y,{format:ut,type:Ze})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Lu(e,t){function n(){let t=!1,n=new pr,r=null,i=new pr(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?ce(e.DEPTH_TEST):le(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=xn[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?ce(e.STENCIL_TEST):le(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,te=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),j=!1,M=0,N=e.getParameter(e.VERSION);N.indexOf(`WebGL`)===-1?N.indexOf(`OpenGL ES`)!==-1&&(M=parseFloat(/^OpenGL ES (\d)/.exec(N)[1]),j=M>=2):(M=parseFloat(/^WebGL (\d)/.exec(N)[1]),j=M>=1);let P=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new pr().fromArray(re),oe=new pr().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let F={};F[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),F[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),F[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),F[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),ce(e.DEPTH_TEST),o.setFunc(3),he(!1),ge(1),ce(e.CULL_FACE),pe(0);function ce(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function le(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function I(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function de(t){return h!==t&&(e.useProgram(t),h=t,!0)}let fe={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};fe[103]=e.MIN,fe[104]=e.MAX;let L={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function pe(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(le(e.BLEND),g=!1);return}if(g===!1&&(ce(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:U(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:U(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:U(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:U(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(fe[n],fe[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(L[r],L[i],L[o],L[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function me(t,n){t.side===2?le(e.CULL_FACE):ce(e.CULL_FACE);let r=t.side===1;n&&(r=!r),he(r),t.blending===1&&t.transparent===!1?pe(0):pe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ve(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?ce(e.SAMPLE_ALPHA_TO_COVERAGE):le(e.SAMPLE_ALPHA_TO_COVERAGE)}function he(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function ge(t){t===0?le(e.CULL_FACE):(ce(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function _e(t){t!==k&&(j&&e.lineWidth(t),k=t)}function ve(t,n,r){t?(ce(e.POLYGON_OFFSET_FILL),(A!==n||ee!==r)&&(A=n,ee=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):le(e.POLYGON_OFFSET_FILL)}function ye(t){t?ce(e.SCISSOR_TEST):le(e.SCISSOR_TEST)}function R(t){t===void 0&&(t=e.TEXTURE0+te-1),P!==t&&(e.activeTexture(t),P=t)}function be(t,n,r){r===void 0&&(r=P===null?e.TEXTURE0+te-1:P);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(P!==r&&(e.activeTexture(r),P=r),e.bindTexture(t,n||F[t]),i.type=t,i.texture=n)}function xe(){let t=ne[P];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Se(){try{e.compressedTexImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function z(){try{e.compressedTexImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ce(){try{e.texSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function B(){try{e.texSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function V(){try{e.compressedTexSubImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function we(){try{e.compressedTexSubImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Te(){try{e.texStorage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Ee(){try{e.texStorage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function De(){try{e.texImage2D(...arguments)}catch(e){U(`WebGLState:`,e)}}function Oe(){try{e.texImage3D(...arguments)}catch(e){U(`WebGLState:`,e)}}function ke(t){return d[t]===void 0?e.getParameter(t):d[t]}function Ae(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function je(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Me(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Ne(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Pe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Fe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},P=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,ee=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:ce,disable:le,bindFramebuffer:ue,drawBuffers:I,useProgram:de,setBlending:pe,setMaterial:me,setFlipSided:he,setCullFace:ge,setLineWidth:_e,setPolygonOffset:ve,setScissorTest:ye,activeTexture:R,bindTexture:be,unbindTexture:xe,compressedTexImage2D:Se,compressedTexImage3D:z,texImage2D:De,texImage3D:Oe,pixelStorei:Ae,getParameter:ke,updateUBOMapping:Ne,uniformBlockBinding:Pe,texStorage2D:Te,texStorage3D:Ee,texSubImage2D:Ce,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:we,scissor:je,viewport:Me,reset:Fe}}function Ru(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):mn(`canvas`)}function g(e,t,n){let r=1,i=Se(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),H(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&H(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];H(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||H(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?on:nr.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,H(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function ee(e){O=e}function te(){let e=O;return e>=i.maxTextures&&H(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function j(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function M(t,i){let a=r.get(t);if(t.isVideoTexture&&be(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)H(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)H(`WebGLRenderer: Texture marked for update but image is incomplete`);else{le(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function N(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){le(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){le(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ue(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[Fe]:e.REPEAT,[Ie]:e.CLAMP_TO_EDGE,[Le]:e.MIRRORED_REPEAT},ie={[Re]:e.NEAREST,[ze]:e.NEAREST_MIPMAP_NEAREST,[Be]:e.NEAREST_MIPMAP_LINEAR,[Ve]:e.LINEAR,[He]:e.LINEAR_MIPMAP_NEAREST,[Ue]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function oe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&H(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function se(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=j(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function F(e,t,n){return Math.floor(Math.floor(e/n)/t)}function ce(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=F(n.start,r.width,4),c=F(t.start,r.width,4);n.start<=i+1&&a===c&&F(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function le(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=se(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=nr.getPrimaries(nr.workingColorSpace),r=o.colorSpace===``?null:nr.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=xe(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);oe(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===st,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&ce(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Ps(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Ps(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Se(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Se(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,o,s){if(o.image.length!==6)return;let c=se(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=nr.getPrimaries(nr.workingColorSpace),r=o.colorSpace===``?null:nr.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=xe(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);oe(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?H(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Se(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function I(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,ye(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function de(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;R(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ye(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ye(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);R(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,ye(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,ye(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function fe(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),oe(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else M(i.depthTexture,0);let u=l.__webglTexture,d=ye(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)R(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function L(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)fe(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?fe(i.__webglFramebuffer[0],t,0):fe(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),de(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),de(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function pe(t,n,i){let a=r.get(t);n!==void 0&&I(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&L(t)}function me(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&R(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=ye(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),de(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),oe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)I(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else I(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),oe(c,a),I(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),oe(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)I(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else I(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&L(t)}function he(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let ge=[],_e=[];function ve(t){if(t.samples>0){if(R(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(ge.length=0,_e.length=0,ge.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(ge.push(l),_e.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,_e)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,ge))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function ye(e){return Math.min(i.maxSamples,e.samples)}function R(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function be(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function xe(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(nr.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&H(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):U(`WebGLTextures: Unsupported texture color space:`,n)),t}function Se(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=te,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=ee,this.setTexture2D=M,this.setTexture2DArray=N,this.setTexture3D=P,this.setTextureCube=ne,this.rebindTextures=pe,this.setupRenderTarget=me,this.updateRenderTargetMipmap=he,this.updateMultisampleRenderTarget=ve,this.setupDepthRenderbuffer=L,this.setupFrameBufferTexture=I,this.useMultisampledRTT=R,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function zu(e,t){function n(n,r=``){let i,a=nr.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Bu=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Vu=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,Hu=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new oo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new To({vertexShader:Bu,fragmentShader:Vu,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new po(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Uu=class extends Sn{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Hu,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=new us;w.viewport=new pr;let T=new us;T.viewport=new pr;let E=[w,T],D=new _s,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Jr,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Jr,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Jr,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function ee(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,ee),r.removeEventListener(`inputsourceschange`,te);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&H(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,ee),r.addEventListener(`inputsourceschange`,te),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?st:ot,a=_.stencil?et:Ye);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new hr(d.textureWidth,d.textureHeight,{format:at,type:We,depthTexture:new io(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new hr(f.framebufferWidth,f.framebufferHeight,{format:at,type:We,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ae.setContext(r),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function te(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let j=new K,M=new K;function N(e,t,n){j.setFromMatrixPosition(t.matrixWorld),M.setFromMatrixPosition(n.matrixWorld);let r=j.distanceTo(M),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function P(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;P(D,i);for(let e=0;e<a.length;e++)P(a[e],i);a.length===2?N(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ne(e,D,i)};function ne(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=En*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let re=null;function ie(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new us,o.layers.enable(n),o.viewport=new pr,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new oo,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}re&&re(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ae=new Is;ae.setAnimationLoop(ie),this.setAnimationLoop=function(e){re=e},this.dispose=function(){}}},Wu=new vr,Gu=new q;Gu.set(-1,0,0,0,1,0,0,0,1);function Ku(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,xo(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Wu.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Gu),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function qu(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return U(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?H(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):H(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Ju=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Yu=null;function Xu(){return Yu===null&&(Yu=new Ra(Ju,16,16,ut,Ze),Yu.name=`DFG_LUT`,Yu.minFilter=Ve,Yu.magFilter=Ve,Yu.wrapS=Ie,Yu.wrapT=Ie,Yu.generateMipmaps=!1,Yu.needsUpdate=!0),Yu}var Zu=class{constructor(e={}){let{canvas:t=hn(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=We}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([ft,dt,lt]),g=new Set([We,Ye,qe,et,Qe,$e]),_=new Uint32Array(4),v=new Int32Array(4),y=new K,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=rn;let ee=0,te=0,j=null,M=-1,N=null,P=new pr,ne=new pr,re=null,ie=new J(0),ae=0,oe=t.width,se=t.height,F=1,ce=null,le=null,ue=new pr(0,0,oe,se),I=new pr(0,0,oe,se),de=!1,fe=new to,L=!1,pe=!1,me=new vr,he=new K,ge=new pr,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ve=!1;function ye(){return j===null?F:1}let R=n;function be(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,Ge,!1),t.addEventListener(`webglcontextrestored`,Ke,!1),t.addEventListener(`webglcontextcreationerror`,Je,!1),R===null){let t=`webgl2`;if(R=be(t,e),R===null)throw be(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw U(`WebGLRenderer: `+e.message),e}let xe,Se,z,Ce,B,V,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be;function Ve(){xe=new hc(R),xe.init(),Re=new zu(R,xe),Se=new Gs(R,xe,e,Re),z=new Lu(R,xe),Se.reversedDepthBuffer&&d&&z.buffers.depth.setReversed(!0),O=R.createFramebuffer(),k=R.createFramebuffer(),A=R.createFramebuffer(),Ce=new vc(R),B=new _u,V=new Ru(R,xe,z,B,Se,Re,Ce),we=new mc(T),Te=new Ls(R),ze=new Us(R,Te),Ee=new gc(R,Te,Ce,ze),De=new bc(R,Ee,Te,ze,Ce),Fe=new yc(R,Se,V),Me=new Ks(B),Oe=new gu(T,we,xe,Se,ze,Me),ke=new Ku(T,B),Ae=new xu,je=new Ou(xe),Pe=new Hs(T,we,z,De,p,s),Ne=new Iu(T,De,Se),Be=new qu(R,Ce,Se,z),Ie=new Ws(R,xe,Ce),Le=new _c(R,xe,Ce),Ce.programs=Oe.programs,T.capabilities=Se,T.extensions=xe,T.properties=B,T.renderLists=Ae,T.shadowMap=Ne,T.state=z,T.info=Ce}Ve(),m!==1009&&(w=new Sc(m,t.width,t.height,o,r,i));let He=new Uu(T,R);this.xr=He,this.getContext=function(){return R},this.getContextAttributes=function(){return R.getContextAttributes()},this.forceContextLoss=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=xe.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return F},this.setPixelRatio=function(e){e!==void 0&&(F=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){if(He.isPresenting){H(`WebGLRenderer: Can't change size while VR device is presenting.`);return}oe=e,se=n,t.width=Math.floor(e*F),t.height=Math.floor(n*F),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(oe*F,se*F).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,F=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){U(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){H(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(P)},this.getViewport=function(e){return e.copy(ue)},this.setViewport=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),z.viewport(P.copy(ue).multiplyScalar(F).round())},this.getScissor=function(e){return e.copy(I)},this.setScissor=function(e,t,n,r){e.isVector4?I.set(e.x,e.y,e.z,e.w):I.set(e,t,n,r),z.scissor(ne.copy(I).multiplyScalar(F).round())},this.getScissorTest=function(){return de},this.setScissorTest=function(e){z.setScissorTest(de=e)},this.setOpaqueSort=function(e){ce=e},this.setTransparentSort=function(e){le=e},this.getClearColor=function(e){return e.copy(Pe.getClearColor())},this.setClearColor=function(){Pe.setClearColor(...arguments)},this.getClearAlpha=function(){return Pe.getClearAlpha()},this.setClearAlpha=function(){Pe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(j!==null){let t=j.texture.format;e=h.has(t)}if(e){let e=j.texture.type,t=g.has(e),n=Pe.getClearColor(),r=Pe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,R.clearBufferuiv(R.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,R.clearBufferiv(R.COLOR,0,v))}else r|=R.COLOR_BUFFER_BIT}t&&(r|=R.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=R.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&R.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,Ge,!1),t.removeEventListener(`webglcontextrestored`,Ke,!1),t.removeEventListener(`webglcontextcreationerror`,Je,!1),Pe.dispose(),Ae.dispose(),je.dispose(),B.dispose(),we.dispose(),De.dispose(),ze.dispose(),Be.dispose(),Oe.dispose(),He.dispose(),He.removeEventListener(`sessionstart`,ot),He.removeEventListener(`sessionend`,st),ct.stop()};function Ge(e){e.preventDefault(),_n(`WebGLRenderer: Context Lost.`),E=!0}function Ke(){_n(`WebGLRenderer: Context Restored.`),E=!1;let e=Ce.autoReset,t=Ne.enabled,n=Ne.autoUpdate,r=Ne.needsUpdate,i=Ne.type;Ve(),Ce.autoReset=e,Ne.enabled=t,Ne.autoUpdate=n,Ne.needsUpdate=r,Ne.type=i}function Je(e){U(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Xe(e){let t=e.target;t.removeEventListener(`dispose`,Xe),tt(t)}function tt(e){nt(e),B.remove(e)}function nt(e){let t=B.get(e).programs;t!==void 0&&(t.forEach(function(e){Oe.releaseProgram(e)}),e.isShaderMaterial&&Oe.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=_e);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=xt(e,t,n,r,i);z.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Ee.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;ze.setup(i,r,s,n,c);let h,g=Ie;if(c!==null&&(h=Te.get(c),g=Le,g.setIndex(h)),i.isMesh)r.wireframe===!0?(z.setLineWidth(r.wireframeLinewidth*ye()),g.setMode(R.LINES)):g.setMode(R.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),z.setLineWidth(e*ye()),i.isLineSegments?g.setMode(R.LINES):i.isLineLoop?g.setMode(R.LINE_LOOP):g.setMode(R.LINE_STRIP)}else i.isPoints?g.setMode(R.POINTS):i.isSprite&&g.setMode(R.TRIANGLES);if(i.isBatchedMesh){if(xe.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Te.get(c).bytesPerElement:1,o=B.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(R,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function rt(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,_t(e,t,n),e.side=0,e.needsUpdate=!0,_t(e,t,n),e.side=2):_t(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=je.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];rt(a,n,e),r.add(a)}else rt(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){B.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}xe.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let it=null;function at(e){it&&it(e)}function ot(){ct.stop()}function st(){ct.start()}let ct=new Is;ct.setAnimationLoop(at),typeof self<`u`&&ct.setContext(self),this.setAnimationLoop=function(e){it=e,He.setAnimationLoop(e),e===null?ct.stop():ct.start()},He.addEventListener(`sessionstart`,ot),He.addEventListener(`sessionend`,st),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){U(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=He.enabled===!0&&He.isPresenting===!0,r=w!==null&&(j===null||n)&&w.begin(T,j);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),He.enabled===!0&&He.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(He.cameraAutoUpdate===!0&&He.updateCamera(t),t=He.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,j),x=je.get(e,C.length),x.init(t),x.state.textureUnits=V.getTextureUnits(),C.push(x),me.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),fe.setFromProjectionMatrix(me,dn,t.reversedDepth),pe=this.localClippingEnabled,L=Me.init(this.clippingPlanes,pe),b=Ae.get(e,S.length),b.init(),S.push(b),He.enabled===!0&&He.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&ut(e,t,-1/0,T.sortObjects)}ut(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(ce,le,t.reversedDepth),ve=He.enabled===!1||He.isPresenting===!1||He.hasDepthSensing()===!1,ve&&Pe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),L===!0&&Me.beginShadows();let i=x.state.shadowsArray;if(Ne.render(i,e,t),L===!0&&Me.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];mt(n,r,e,a)}ve&&Pe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];pt(b,e,n,n.viewport)}}else r.length>0&&mt(n,r,e,t),ve&&Pe.render(e),pt(b,e,t)}j!==null&&te===0&&(V.updateMultisampleRenderTarget(j),V.updateRenderTargetMipmap(j)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),ze.resetDefaultState(),M=-1,N=null,C.pop(),C.length>0?(x=C[C.length-1],V.setTextureUnits(x.state.textureUnits),L===!0&&Me.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function ut(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||fe.intersectsSprite(e)){r&&ge.setFromMatrixPosition(e.matrixWorld).applyMatrix4(me);let t=De.update(e),i=e.material;i.visible&&b.push(e,t,i,n,ge.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||fe.intersectsObject(e))){let t=De.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),ge.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),ge.copy(e.boundingSphere.center)),ge.applyMatrix4(e.matrixWorld).applyMatrix4(me)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,ge.z,o)}}else i.visible&&b.push(e,t,i,n,ge.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)ut(i[e],t,n,r)}function pt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),L===!0&&Me.setGlobalState(T.clippingPlanes,n),r&&z.viewport(P.copy(r)),i.length>0&&ht(i,t,n),a.length>0&&ht(a,t,n),o.length>0&&ht(o,t,n),z.buffers.depth.setTest(!0),z.buffers.depth.setMask(!0),z.buffers.color.setMask(!0),z.setPolygonOffset(!1)}function mt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=xe.has(`EXT_color_buffer_half_float`)||xe.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new hr(1,1,{generateMipmaps:!0,type:e?Ze:We,minFilter:Ue,samples:Math.max(4,Se.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nr.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||P;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),ve&&Pe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),L===!0&&Me.setGlobalState(T.clippingPlanes,r),ht(e,n,r),V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a),xe.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,gt(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(V.updateMultisampleRenderTarget(a),V.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function ht(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&gt(o,t,n,s,l,c)}}function gt(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function _t(e,t,n){t.isScene!==!0&&(t=_e);let r=B.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=Oe.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=Oe.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=we.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Xe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return yt(e,s),d}else s.uniforms=Oe.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=Oe.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Me.uniform),yt(e,s),r.needsLights=Ct(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function vt(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=kl.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function yt(e,t){let n=B.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function bt(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function xt(e,t,n,r,i){t.isScene!==!0&&(t=_e),V.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=j===null?T.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:nr.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=we.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=B.get(r),y=x.state.lights;if(L===!0&&(pe===!0||e!==N)){let t=e===N&&r.id===M;Me.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Me.numPlanes||v.numIntersection!==Me.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=_t(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(z.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==M&&(M=r.id,w=!0),v.needsLights){let e=bt(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||N!==e){z.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(R,`projectionMatrix`,e.projectionMatrix),O.setValue(R,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(R,he.setFromMatrixPosition(e.matrixWorld)),Se.logarithmicDepthBuffer&&O.setValue(R,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(R,`isOrthographic`,e.isOrthographicCamera===!0),N!==e&&(N=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(R,`directionalShadowMap`,y.state.directionalShadowMap,V),y.state.spotShadowMap.length>0&&O.setValue(R,`spotShadowMap`,y.state.spotShadowMap,V),y.state.pointShadowMap.length>0&&O.setValue(R,`pointShadowMap`,y.state.pointShadowMap,V)),i.isSkinnedMesh){O.setOptional(R,i,`bindMatrix`),O.setOptional(R,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(R,`boneTexture`,e.boneTexture,V))}i.isBatchedMesh&&(O.setOptional(R,i,`batchingTexture`),O.setValue(R,`batchingTexture`,i._matricesTexture,V),O.setOptional(R,i,`batchingIdTexture`),O.setValue(R,`batchingIdTexture`,i._indirectTexture,V),O.setOptional(R,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(R,`batchingColorTexture`,i._colorsTexture,V));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Fe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(R,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Xu()),w){if(O.setValue(R,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&St(k,E),a&&r.fog===!0&&ke.refreshFogUniforms(k,a),ke.refreshMaterialUniforms(k,r,F,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}kl.upload(R,vt(v),k,V)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(kl.upload(R,vt(v),k,V),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(R,`center`,i.center),O.setValue(R,`modelViewMatrix`,i.modelViewMatrix),O.setValue(R,`normalMatrix`,i.normalMatrix),O.setValue(R,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Be.update(n,S),Be.bind(n,S)}}return S}function St(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function Ct(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return ee},this.getActiveMipmapLevel=function(){return te},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(e,t,n){let r=B.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),B.get(e.texture).__webglTexture=t,B.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=B.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){j=e,ee=t,te=n;let r=null,i=!1,a=!1;if(e){let o=B.get(e);if(o.__useDefaultFramebuffer!==void 0){z.bindFramebuffer(R.FRAMEBUFFER,o.__webglFramebuffer),P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,z.viewport(P),z.scissor(ne),z.setScissorTest(re),M=-1;return}if(o.__webglFramebuffer===void 0)V.setupRenderTarget(e);else if(o.__hasExternalTextures)V.rebindTextures(e,B.get(e.texture).__webglTexture,B.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&B.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);V.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=B.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&V.useMultisampledRTT(e)===!1?B.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,P.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else P.copy(ue).multiplyScalar(F).floor(),ne.copy(I).multiplyScalar(F).floor(),re=de;if(n!==0&&(r=O),z.bindFramebuffer(R.FRAMEBUFFER,r)&&z.drawBuffers(e,r),z.viewport(P),z.scissor(ne),z.setScissorTest(re),i){let r=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=B.get(e.textures[t]);R.framebufferTextureLayer(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=B.get(e.texture);R.framebufferTexture2D(R.FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,t.__webglTexture,n)}M=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){z.bindFramebuffer(R.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s),!Se.textureFormatReadable(c)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Se.textureTypeReadable(l)){U(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&R.readPixels(t,n,r,i,Re.convert(c),Re.convert(l),a)}finally{let e=j===null?null:B.get(j).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=B.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){z.bindFramebuffer(R.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&R.readBuffer(R.COLOR_ATTACHMENT0+s),!Se.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Se.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=R.createBuffer();R.bindBuffer(R.PIXEL_PACK_BUFFER,d),R.bufferData(R.PIXEL_PACK_BUFFER,a.byteLength,R.STREAM_READ),R.readPixels(t,n,r,i,Re.convert(l),Re.convert(u),0);let f=j===null?null:B.get(j).__webglFramebuffer;z.bindFramebuffer(R.FRAMEBUFFER,f);let p=R.fenceSync(R.SYNC_GPU_COMMANDS_COMPLETE,0);return R.flush(),await bn(R,p,4),R.bindBuffer(R.PIXEL_PACK_BUFFER,d),R.getBufferSubData(R.PIXEL_PACK_BUFFER,0,a),R.deleteBuffer(d),R.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;V.setTexture2D(e,0),R.copyTexSubImage2D(R.TEXTURE_2D,n,0,0,o,s,i,a),z.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Re.convert(t.format),_=Re.convert(t.type),v;t.isData3DTexture?(V.setTexture3D(t,0),v=R.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(V.setTexture2DArray(t,0),v=R.TEXTURE_2D_ARRAY):(V.setTexture2D(t,0),v=R.TEXTURE_2D),z.activeTexture(R.TEXTURE0),z.pixelStorei(R.UNPACK_FLIP_Y_WEBGL,t.flipY),z.pixelStorei(R.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),z.pixelStorei(R.UNPACK_ALIGNMENT,t.unpackAlignment);let y=z.getParameter(R.UNPACK_ROW_LENGTH),b=z.getParameter(R.UNPACK_IMAGE_HEIGHT),x=z.getParameter(R.UNPACK_SKIP_PIXELS),S=z.getParameter(R.UNPACK_SKIP_ROWS),C=z.getParameter(R.UNPACK_SKIP_IMAGES);z.pixelStorei(R.UNPACK_ROW_LENGTH,h.width),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,h.height),z.pixelStorei(R.UNPACK_SKIP_PIXELS,l),z.pixelStorei(R.UNPACK_SKIP_ROWS,u),z.pixelStorei(R.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=B.get(e),r=B.get(t),h=B.get(n.__renderTarget),g=B.get(r.__renderTarget);z.bindFramebuffer(R.READ_FRAMEBUFFER,h.__webglFramebuffer),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(e).__webglTexture,i,d+n),R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,B.get(t).__webglTexture,a,m+n)),R.blitFramebuffer(l,u,o,s,f,p,o,s,R.DEPTH_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||B.has(e)){let n=B.get(e),r=B.get(t);z.bindFramebuffer(R.READ_FRAMEBUFFER,k),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?R.framebufferTextureLayer(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):R.framebufferTexture2D(R.READ_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,n.__webglTexture,i),T?R.framebufferTextureLayer(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):R.framebufferTexture2D(R.DRAW_FRAMEBUFFER,R.COLOR_ATTACHMENT0,R.TEXTURE_2D,r.__webglTexture,a),i===0?T?R.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):R.copyTexSubImage2D(v,a,f,p,l,u,o,s):R.blitFramebuffer(l,u,o,s,f,p,o,s,R.COLOR_BUFFER_BIT,R.NEAREST);z.bindFramebuffer(R.READ_FRAMEBUFFER,null),z.bindFramebuffer(R.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?R.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):R.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?R.compressedTexSubImage2D(R.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):R.texSubImage2D(R.TEXTURE_2D,a,f,p,o,s,g,_,h);z.pixelStorei(R.UNPACK_ROW_LENGTH,y),z.pixelStorei(R.UNPACK_IMAGE_HEIGHT,b),z.pixelStorei(R.UNPACK_SKIP_PIXELS,x),z.pixelStorei(R.UNPACK_SKIP_ROWS,S),z.pixelStorei(R.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&R.generateMipmap(v),z.unbindTexture()},this.initRenderTarget=function(e){B.get(e).__webglFramebuffer===void 0&&V.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?V.setTextureCube(e,0):e.isData3DTexture?V.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?V.setTexture2DArray(e,0):V.setTexture2D(e,0),z.unbindTexture()},this.resetState=function(){ee=0,te=0,j=null,z.reset(),ze.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=nr._getDrawingBufferColorSpace(e),t.unpackColorSpace=nr._getUnpackColorSpace()}};function Qu(e){let t=new Kr;e.add(t);let n=new Do({color:`#799696`}),r=new Do({color:`#465959`}),i=new Do({color:`#e2b95f`}),a=new Do({color:`#e9d8a9`}),o=new wa({color:`#80d3d2`}),s=new so(1,1,1);function c(e,t,n,r,i,a,o,c){let l=new Y(s,c);return l.position.set(t,n,r),l.scale.set(i,a,o),e.add(l),l}let l=new Kr;t.add(l),c(l,0,.32,0,.68,.55,.52,n),c(l,0,.76,0,.74,.43,.56,a),c(l,0,.79,.285,.48,.18,.025,o);for(let e of[-.18,.18])c(l,e,.81,.305,.055,.055,.015,r);c(l,0,1.08,0,.06,.25,.06,i);let u=new Kr;t.add(u);let d=new Kr;t.add(d),c(d,0,.85,0,.3,.22,.34,n),c(d,0,.55,0,.055,.5,.055,i);for(let e of[-.14,.14])c(d,e,.3,0,.05,.2,.15,a);let f=new Kr;t.add(f);let p=``,m=Array.from({length:12},()=>{let e=new Kr;c(e,0,.27,0,.23,.23,.23,a);let n=c(e,0,.395,0,.25,.025,.25,new Do({color:`#e7b53f`}));return t.add(e),{g:e,lid:n}});function h(e,t){let a=Math.hypot(e.x-t.x,e.z-t.z);if(a<.001)return;let o=new Kr;o.position.set((e.x+t.x)/2,0,(e.z+t.z)/2),o.rotation.y=Math.atan2(t.x-e.x,t.z-e.z),f.add(o),c(o,0,.11,0,.38,.15,a,r);for(let e of[-.23,.23])c(o,e,.16,0,.05,.12,a,i);for(let e=-a/2+.12;e<a/2;e+=.35)c(o,0,.193,e,.35,.025,.035,n)}return{update(e,r,a,s){if(t.visible=!r&&e.investments.has(`harvester`),!t.visible)return;let g=e.machinery,_=e.plots[g.anchor],v=_?{x:-2,z:_.z+1.4}:{x:8.7,z:.1};l.position.set(v.x,0,v.z),o.color.set(g.paused?`#89928c`:g.active>=0?`#8be5d0`:`#88babb`);let y=[...new Set([..._?[_.z]:[],...g.loads.map(t=>e.plots[t.plot].z)])].sort((e,t)=>e-t),b=y.join(`,`);if(b!==p){p=b,f.clear();for(let e of y)h({x:6.1,z:e+1.4},{x:-2,z:e+1.4});y.length&&(h({x:-2,z:Math.min(.3,...y.map(e=>e+1.4))},{x:-2,z:Math.max(.3,...y.map(e=>e+1.4))}),h({x:-2,z:.3},{x:-5.5,z:.3}))}if(u.visible=d.visible=!!_,_){u.position.set(2.05,.95,_.z+1.4),u.children.length||(c(u,0,0,0,8.1,.08,.1,i),c(u,4.05,-.45,0,.09,.9,.09,n));let t=e.plots[g.active]??_;d.position.x=Jn.damp(d.position.x,t.x,4,a),d.position.z=_.z+1.4,d.position.y=g.active>=0?-Math.sin(g.progress*Math.PI)*.2:0}m.forEach(({g:t,lid:n},r)=>{let i=g.loads[r];if(t.visible=!!i,!i)return;let a=ae(re(e.plots[i.plot]),i.travelled);t.position.set(a.x,Math.sin(s*4+r)*.005,a.z),n.material.color.set([`#c9bc9a`,`#a1ba7e`,`#79beb5`,`#82a8d3`,`#b08ada`,`#edc552`][i.grade])})}}}function $u(e){let t=new Kr;e.add(t);function n(e,t,n,r,i,a,o,s){let c=new Y(new so(i,a,o),new Do({color:s}));return c.position.set(t,n,r),e.add(c),c}let r=new Kr;r.position.set(x.x,0,x.z-.4),t.add(r),n(r,0,.85,0,1.1,.1,.12,`#b19059`);for(let e of[-.48,.48])n(r,e,.48,0,.1,.95,.12,`#887344`);for(let[e,t]of[[-.3,`#d4b369`],[.12,`#a6afb0`]])n(r,e,.53,.12,.055,.9,.055,`#d6bc84`),n(r,e,.14,.12,.28,.22,.13,t);for(let e=0;e<5;e++)n(r,.01+e*.055,.09,.12,.026,.16,.03,`#79898b`);let i=new Y(new co(.16,.13,.24,12),new Do({color:`#75a3a2`}));i.position.set(.65,.12,.08),r.add(i);let a=new Kr;a.position.set(S.x,0,S.z-.4),t.add(a),n(a,0,.6,0,1.25,.16,.65,`#b38b50`);for(let e of[-.5,.5])for(let t of[-.23,.23])n(a,e,.27,t,.1,.54,.1,`#89764f`);n(a,.1,.79,0,.45,.25,.32,`#778e84`),n(a,-.37,.71,.09,.3,.06,.13,`#d7c27d`);let o=new Kr;o.position.set(p.x,0,p.z-.55),t.add(o),n(o,0,.65,0,1.5,.15,.7,`#b99159`);for(let e of[-.6,.6])for(let t of[-.25,.25])n(o,e,.29,t,.12,.58,.12,`#806c47`);for(let e of[-.45,0,.45]){let t=new Y(new co(.16,.11,.23,12),new Do({color:`#d69661`}));t.position.set(e,.85,0),o.add(t),n(o,e,1.03,0,.035,.23,.035,`#619348`);let r=new Y(new ho(.11,8,6),new Do({color:`#a4c85b`}));r.scale.set(1,.35,.6),r.position.set(e+.05,1.1,0),o.add(r)}let s=C.map(e=>{let n=Ce.find(t=>t.id===e.id),r=document.createElement(`canvas`);r.width=256,r.height=256;let i=r.getContext(`2d`);i.fillStyle=`#e4be62`,i.beginPath(),i.roundRect(8,8,240,240,42),i.fill(),i.strokeStyle=`#fff0b7`,i.lineWidth=8,i.stroke(),i.strokeStyle=`#9d7130`,i.lineWidth=9,i.beginPath(),i.arc(128,128,66,0,Math.PI*2),i.stroke(),i.font=`bold 100px sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillStyle=`#9d7130`,i.fillText(`M`,128,130);let a=new ro(r);a.colorSpace=rn;let o=new Y(new po(1.08,1.08),new wa({map:a,transparent:!0,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.set(e.x,.025,e.z),t.add(o);let s=document.createElement(`canvas`);s.width=512,s.height=110;let c=s.getContext(`2d`);c.fillStyle=`#fff7df`,c.beginPath(),c.roundRect(4,4,504,102,24),c.fill(),c.textAlign=`center`,c.fillStyle=`#655738`,c.font=`bold 25px sans-serif`,c.fillText(n.title,256,44),c.font=`22px sans-serif`,c.fillText(`${n.price.toLocaleString()} メニー`,256,80);let l=new ro(s);l.colorSpace=rn;let u=new ma(new ea({map:l,depthTest:!1}));return u.position.set(e.x,1.9,e.z),u.scale.set(2.5,.54,1),t.add(u),{p:e,mesh:o,label:u}});return{update(e,n){t.visible=!n;let r=s.filter(({p:t})=>!e.investments.has(t.id)).sort((t,n)=>Math.hypot(e.player.x-t.p.x,e.player.z-t.p.z)-Math.hypot(e.player.x-n.p.x,e.player.z-n.p.z))[0];for(let{p:t,mesh:n,label:i}of s){let a=e.investments.has(t.id),o=!!e.investmentReason(t.id,!0);n.visible=!a,n.material.opacity=o?.32:.86;let s=Math.hypot(e.player.x-t.x,e.player.z-t.z);i.visible=!a&&r?.p.id===t.id&&s<2.5&&e.paymentPad?.id!==t.id,n.scale.setScalar(e.paymentPad?.id===t.id?1.08:1)}}}}function ed(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ji,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=td(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=td(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function td(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Ni(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function nd(e){let t=y.map(t=>{let n=new Kr,r=t.id===`family`?[17.5,.8]:t.id===`market`?[-8.2,3.4]:[-1.5,-.6];n.position.set(r[0],0,r[1]),e.add(n);let i=Array.from({length:3},(e,t)=>{let r=[];function i(e,t,n,i,a){let o=e.toNonIndexed();e.dispose(),o.translate(n,i,a);let s=new J(t),c=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<c.length;e+=3)c[e]=s.r,c[e+1]=s.g,c[e+2]=s.b;o.setAttribute(`color`,new Ni(c,3)),r.push(o)}if(t===0){i(new so(.85,.28,.38),`#c19561`,0,.15,0),i(new so(.76,.035,.3),`#816847`,0,.31,0);for(let e=0;e<5;e++){let t=-.3+e*.15;i(new co(.015,.02,.24,5),`#628f48`,t,.4,0),i(new ho(.11,7,5),e%2?`#f4c867`:`#e58b80`,t,.55,0)}}else if(t===1){i(new so(1.05,.1,.7),`#bf955c`,0,.6,-.85),i(new so(.52,.02,.65),`#eae3b0`,0,.665,-.85);for(let e of[-.4,.4])for(let t of[-1.1,-.6])i(new so(.085,.58,.085),`#a37a49`,e,.29,t);for(let e of[-.28,.28])i(new co(.12,.12,.03,12),`#f8efcf`,e,.69,-.85);i(new ho(.11,8,6),`#c9603c`,0,.76,-.85)}else{for(let e of[-.65,.65])i(new co(.03,.045,1.5,6),`#b89764`,e,.75,-1.45);let e=new co(.012,.012,1.3,5);e.rotateZ(Math.PI/2),i(e,`#dfd4a6`,0,1.45,-1.45);for(let e=0;e<5;e++){let t=new lo(.11,.25,3);t.rotateZ(Math.PI),i(t,[`#d98563`,`#ecce77`,`#84ab85`][e%3],-.5+e*.25,1.32,-1.45)}}let a=ed(r);r.forEach(e=>e.dispose());let o=new Y(a,new Do({vertexColors:!0}));return n.add(o),o});return{id:t.id,stages:i}});return{update(e,n){for(let{id:r,stages:i}of t)i.forEach((t,i)=>t.visible=n||e.requests.progress[r].chapter>i)}}}function rd(){let e=[];function t(t,n,r,i,a){let o=t.toNonIndexed();t.dispose(),o.translate(r,i,a);let s=new J(n),c=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<c.length;e+=3)c[e]=s.r,c[e+1]=s.g,c[e+2]=s.b;o.setAttribute(`color`,new Ni(c,3)),e.push(o)}let n=`#b6894f`,r=`#e1bd7c`;t(new so(.58,.08,.65),n,0,.27,0);for(let e of[.36,.48]){for(let n of[-.28,.28])t(new so(.045,.08,.68),r,n,e,0);for(let n of[-.32,.32])t(new so(.6,.08,.045),r,0,e,n)}for(let e of[-.32,.32]){let n=new co(.16,.16,.055,12);n.rotateZ(Math.PI/2),t(n,`#5e6759`,e,.16,.08);let r=new co(.07,.07,.061,8);r.rotateZ(Math.PI/2),t(r,`#d3ae6c`,e,.16,.08)}for(let e of[-.23,.23]){let r=new so(.035,.04,.65);r.rotateX(-.35),t(r,n,e,.41,-.57)}let i=ed(e);return e.forEach(e=>e.dispose()),new Y(i,new Do({vertexColors:!0}))}function id(e,t,n){let r=document.createElement(`canvas`);r.width=r.height=512;let i=r.getContext(`2d`),a=i.createLinearGradient(0,0,512,0);a.addColorStop(0,`#badfc8`),a.addColorStop(.035,`#77c9bd`),a.addColorStop(.3,`#419fba`),a.addColorStop(1,`#347faf`),i.fillStyle=a,i.fillRect(0,0,512,512);for(let e=0;e<55;e++){i.strokeStyle=e%3?`#d8f5db22`:`#e5fbd640`,i.lineWidth=1,i.beginPath();for(let t=0;t<512;t+=3){let n=e*10+Math.sin(t*.045+e)*2.5;t?i.lineTo(t,n):i.moveTo(t,n)}i.stroke()}let o=new ro(r);o.colorSpace=rn,o.wrapT=Fe,o.repeat.y=3;let s=e=>Math.sin(e*.6)*.22+Math.sin(e*1.4)*.07,c=new po(50,40,1,100),l=c.getAttribute(`position`);for(let e=0;e<l.count;e++)l.getX(e)<0&&l.setX(e,l.getX(e)+s(-l.getY(e)));let u=new Y(c,new wa({map:o}));u.rotation.x=-Math.PI/2,u.position.set(54.5,-.016,0),e.add(u);let d=document.createElement(`canvas`);d.width=d.height=256;let f=d.getContext(`2d`),p=f.createLinearGradient(0,0,256,0);p.addColorStop(0,`#d4c49c00`),p.addColorStop(.16,`#d4c49c`),p.addColorStop(1,`#e4d6b4`),f.fillStyle=p,f.fillRect(0,0,256,256),f.globalCompositeOperation=`source-atop`;for(let e=0;e<2800;e++)f.fillStyle=e%2?`#9c8d6e30`:`#fff9dd50`,f.fillRect(e*73.7%256,e*37.3%256,1.1,1.3);let m=new ro(d);m.colorSpace=rn,m.wrapT=Fe,m.repeat.y=8;let h=new po(3.4,32,1,80),g=h.getAttribute(`position`);for(let e=0;e<g.count;e++)g.setX(e,g.getX(e)+s(-g.getY(e)));let _=new Y(h,new wa({map:m,transparent:!0,depthWrite:!1}));_.rotation.x=-Math.PI/2,_.position.set(29,-.022,0),e.add(_);let v=(t,n,r,i)=>{let a=new ma(new ea({map:t,alphaTest:.3,transparent:!1}));return a.center.set(.5,.035),a.position.set(n,.025,r),a.scale.set(i,i,1),e.add(a),a};v(t,26.5,-2.7,4.3);let y=v(n,31.5,5.5,3.4),b=document.createElement(`canvas`);b.width=64,b.height=256;let x=b.getContext(`2d`);x.fillStyle=`#ffffff`,x.fillRect(0,0,64,256);for(let e=0;e<90;e++)x.strokeStyle=e%2?`#73502533`:`#fff4ce66`,x.beginPath(),x.moveTo(e*.73,0),x.bezierCurveTo(e*.73+3,80,e*.73-3,180,e*.73+1,256),x.stroke();let S=new ro(b);S.colorSpace=rn;let C=new Kr,w=new Kr,T=new Kr;e.add(C,w,T);let E=(e,t,n,r,i,a,o,s)=>{let c=new Y(new so(i,a,o),new Do({color:s,map:S}));return c.position.set(t,n,r),e.add(c),c};for(let[e,t]of[[C,!0],[w,!1]]){for(let n=0;n<17;n++){if(t&&n%5==2)continue;let r=E(e,29.25+n*.29,.08,3,.27,.16,2,t?`#877b60`:n%3?`#bb965e`:`#c9a976`);t&&(r.rotation.x=(n%3-1)*.08)}for(let n of[29.3,31.4,33.6])for(let r of[2,4])E(e,n,.15,r,.16,.8,.16,t?`#817861`:`#947447`),E(e,n,.6,r,.2,.08,.2,t?`#b0a183`:`#dfc696`)}for(let e=0;e<8;e++){let t=E(T,28.2+e%3*.4,.09,2.6+Math.floor(e/3)*.4,.65,.12,.15,e%2?`#82785d`:`#a49977`);t.rotation.y=e*.8}let D=new Kr;e.add(D),E(D,26,.25,.5,.8,.5,.65,`#887f62`);for(let e of[.1,.3,.48])E(D,26,e,.84,.86,.035,.03,`#c6b795`);let O=new Kr;e.add(O);for(let e=0;e<6;e++){let t=new Y(new ho(.13,8,5),new Do({color:e%2?`#9ebfc2`:`#bcd8ce`}));t.scale.set(1.7,.55,.6),t.position.set(25.78+e%3*.2,.52,.32+Math.floor(e/3)*.24),O.add(t)}return{update:(e,t,n,r)=>{o.offset.y=t*.003,C.visible=!r&&!n.pier,w.visible=r||n.pier,T.visible=!r&&!n.cleaned,y.visible=r||n.boat,y.position.y=.02+Math.sin(t*1.1)*.035,y.material.rotation=Math.sin(t*.8)*.009,O.visible=r||n.fish>0}}}var ad={version:1,sourceHash:`ad291e4d2ca1fb78198eddf1ce900b3a5f8f2e9a0cbee866e087efbad66a9a2c`,geometries:[{positions:[-.809017,.5,-.309017,-.309017,.809017,-.5,-.525731,.850651,0,-.809017,.5,-.309017,-.5,.309017,-.809017,-.309017,.809017,-.5,-.850651,0,-.525731,-.5,.309017,-.809017,-.809017,.5,-.309017,-.5,.309017,-.809017,0,.525731,-.850651,-.309017,.809017,-.5,-.309017,.809017,-.5,0,1,0,-.525731,.850651,0,-.309017,.809017,-.5,.309017,.809017,-.5,0,1,0,0,.525731,-.850651,.309017,.809017,-.5,-.309017,.809017,-.5,.309017,.809017,-.5,.525731,.850651,0,0,1,0,0,1,0,-.309017,.809017,.5,-.525731,.850651,0,0,1,0,.309017,.809017,.5,-.309017,.809017,.5,.525731,.850651,0,.309017,.809017,.5,0,1,0,.309017,.809017,.5,0,.525731,.850651,-.309017,.809017,.5,-.309017,.809017,.5,-.809017,.5,.309017,-.525731,.850651,0,-.309017,.809017,.5,-.5,.309017,.809017,-.809017,.5,.309017,0,.525731,.850651,-.5,.309017,.809017,-.309017,.809017,.5,-.5,.309017,.809017,-.850651,0,.525731,-.809017,.5,.309017,-.809017,.5,.309017,-.809017,.5,-.309017,-.525731,.850651,0,-.809017,.5,.309017,-1,0,0,-.809017,.5,-.309017,-.850651,0,.525731,-1,0,0,-.809017,.5,.309017,-1,0,0,-.850651,0,-.525731,-.809017,.5,-.309017,.309017,.809017,-.5,.809017,.5,-.309017,.525731,.850651,0,.309017,.809017,-.5,.5,.309017,-.809017,.809017,.5,-.309017,0,.525731,-.850651,.5,.309017,-.809017,.309017,.809017,-.5,.5,.309017,-.809017,.850651,0,-.525731,.809017,.5,-.309017,-.5,.309017,-.809017,0,0,-1,0,.525731,-.850651,-.5,.309017,-.809017,-.5,-.309017,-.809017,0,0,-1,-.850651,0,-.525731,-.5,-.309017,-.809017,-.5,.309017,-.809017,-.5,-.309017,-.809017,0,-.525731,-.850651,0,0,-1,-1,0,0,-.809017,-.5,-.309017,-.850651,0,-.525731,-1,0,0,-.809017,-.5,.309017,-.809017,-.5,-.309017,-.850651,0,.525731,-.809017,-.5,.309017,-1,0,0,-.809017,-.5,.309017,-.525731,-.850651,0,-.809017,-.5,-.309017,-.5,.309017,.809017,-.5,-.309017,.809017,-.850651,0,.525731,-.5,.309017,.809017,0,0,1,-.5,-.309017,.809017,0,.525731,.850651,0,0,1,-.5,.309017,.809017,0,0,1,0,-.525731,.850651,-.5,-.309017,.809017,.309017,.809017,.5,.5,.309017,.809017,0,.525731,.850651,.309017,.809017,.5,.809017,.5,.309017,.5,.309017,.809017,.525731,.850651,0,.809017,.5,.309017,.309017,.809017,.5,.809017,.5,.309017,.850651,0,.525731,.5,.309017,.809017,.809017,-.5,-.309017,.309017,-.809017,-.5,.525731,-.850651,0,.809017,-.5,-.309017,.5,-.309017,-.809017,.309017,-.809017,-.5,.850651,0,-.525731,.5,-.309017,-.809017,.809017,-.5,-.309017,.5,-.309017,-.809017,0,-.525731,-.850651,.309017,-.809017,-.5,.309017,-.809017,-.5,0,-1,0,.525731,-.850651,0,.309017,-.809017,-.5,-.309017,-.809017,-.5,0,-1,0,0,-.525731,-.850651,-.309017,-.809017,-.5,.309017,-.809017,-.5,-.309017,-.809017,-.5,-.525731,-.850651,0,0,-1,0,0,-1,0,.309017,-.809017,.5,.525731,-.850651,0,0,-1,0,-.309017,-.809017,.5,.309017,-.809017,.5,-.525731,-.850651,0,-.309017,-.809017,.5,0,-1,0,-.309017,-.809017,.5,0,-.525731,.850651,.309017,-.809017,.5,.309017,-.809017,.5,.809017,-.5,.309017,.525731,-.850651,0,.309017,-.809017,.5,.5,-.309017,.809017,.809017,-.5,.309017,0,-.525731,.850651,.5,-.309017,.809017,.309017,-.809017,.5,.5,-.309017,.809017,.850651,0,.525731,.809017,-.5,.309017,.809017,-.5,.309017,.809017,-.5,-.309017,.525731,-.850651,0,.809017,-.5,.309017,1,0,0,.809017,-.5,-.309017,.850651,0,.525731,1,0,0,.809017,-.5,.309017,1,0,0,.850651,0,-.525731,.809017,-.5,-.309017,.5,-.309017,-.809017,0,0,-1,0,-.525731,-.850651,.5,-.309017,-.809017,.5,.309017,-.809017,0,0,-1,.850651,0,-.525731,.5,.309017,-.809017,.5,-.309017,-.809017,.5,.309017,-.809017,0,.525731,-.850651,0,0,-1,-.309017,-.809017,-.5,-.809017,-.5,-.309017,-.525731,-.850651,0,-.309017,-.809017,-.5,-.5,-.309017,-.809017,-.809017,-.5,-.309017,0,-.525731,-.850651,-.5,-.309017,-.809017,-.309017,-.809017,-.5,-.5,-.309017,-.809017,-.850651,0,-.525731,-.809017,-.5,-.309017,-.309017,-.809017,.5,-.5,-.309017,.809017,0,-.525731,.850651,-.309017,-.809017,.5,-.809017,-.5,.309017,-.5,-.309017,.809017,-.525731,-.850651,0,-.809017,-.5,.309017,-.309017,-.809017,.5,-.809017,-.5,.309017,-.850651,0,.525731,-.5,-.309017,.809017,.5,-.309017,.809017,.5,.309017,.809017,.850651,0,.525731,.5,-.309017,.809017,0,0,1,.5,.309017,.809017,0,-.525731,.850651,0,0,1,.5,-.309017,.809017,0,0,1,0,.525731,.850651,.5,.309017,.809017,1,0,0,.809017,.5,-.309017,.850651,0,-.525731,1,0,0,.809017,.5,.309017,.809017,.5,-.309017,.850651,0,.525731,.809017,.5,.309017,1,0,0,.809017,.5,.309017,.525731,.850651,0,.809017,.5,-.309017],normals:[-.809017,.5,-.309017,-.309017,.809017,-.5,-.525731,.850651,0,-.809017,.5,-.309017,-.5,.309017,-.809017,-.309017,.809017,-.5,-.850651,0,-.525731,-.5,.309017,-.809017,-.809017,.5,-.309017,-.5,.309017,-.809017,0,.525731,-.850651,-.309017,.809017,-.5,-.309017,.809017,-.5,0,1,0,-.525731,.850651,0,-.309017,.809017,-.5,.309017,.809017,-.5,0,1,0,0,.525731,-.850651,.309017,.809017,-.5,-.309017,.809017,-.5,.309017,.809017,-.5,.525731,.850651,0,0,1,0,0,1,0,-.309017,.809017,.5,-.525731,.850651,0,0,1,0,.309017,.809017,.5,-.309017,.809017,.5,.525731,.850651,0,.309017,.809017,.5,0,1,0,.309017,.809017,.5,0,.525731,.850651,-.309017,.809017,.5,-.309017,.809017,.5,-.809017,.5,.309017,-.525731,.850651,0,-.309017,.809017,.5,-.5,.309017,.809017,-.809017,.5,.309017,0,.525731,.850651,-.5,.309017,.809017,-.309017,.809017,.5,-.5,.309017,.809017,-.850651,0,.525731,-.809017,.5,.309017,-.809017,.5,.309017,-.809017,.5,-.309017,-.525731,.850651,0,-.809017,.5,.309017,-1,0,0,-.809017,.5,-.309017,-.850651,0,.525731,-1,0,0,-.809017,.5,.309017,-1,0,0,-.850651,0,-.525731,-.809017,.5,-.309017,.309017,.809017,-.5,.809017,.5,-.309017,.525731,.850651,0,.309017,.809017,-.5,.5,.309017,-.809017,.809017,.5,-.309017,0,.525731,-.850651,.5,.309017,-.809017,.309017,.809017,-.5,.5,.309017,-.809017,.850651,0,-.525731,.809017,.5,-.309017,-.5,.309017,-.809017,0,0,-1,0,.525731,-.850651,-.5,.309017,-.809017,-.5,-.309017,-.809017,0,0,-1,-.850651,0,-.525731,-.5,-.309017,-.809017,-.5,.309017,-.809017,-.5,-.309017,-.809017,0,-.525731,-.850651,0,0,-1,-1,0,0,-.809017,-.5,-.309017,-.850651,0,-.525731,-1,0,0,-.809017,-.5,.309017,-.809017,-.5,-.309017,-.850651,0,.525731,-.809017,-.5,.309017,-1,0,0,-.809017,-.5,.309017,-.525731,-.850651,0,-.809017,-.5,-.309017,-.5,.309017,.809017,-.5,-.309017,.809017,-.850651,0,.525731,-.5,.309017,.809017,0,0,1,-.5,-.309017,.809017,0,.525731,.850651,0,0,1,-.5,.309017,.809017,0,0,1,0,-.525731,.850651,-.5,-.309017,.809017,.309017,.809017,.5,.5,.309017,.809017,0,.525731,.850651,.309017,.809017,.5,.809017,.5,.309017,.5,.309017,.809017,.525731,.850651,0,.809017,.5,.309017,.309017,.809017,.5,.809017,.5,.309017,.850651,0,.525731,.5,.309017,.809017,.809017,-.5,-.309017,.309017,-.809017,-.5,.525731,-.850651,0,.809017,-.5,-.309017,.5,-.309017,-.809017,.309017,-.809017,-.5,.850651,0,-.525731,.5,-.309017,-.809017,.809017,-.5,-.309017,.5,-.309017,-.809017,0,-.525731,-.850651,.309017,-.809017,-.5,.309017,-.809017,-.5,0,-1,0,.525731,-.850651,0,.309017,-.809017,-.5,-.309017,-.809017,-.5,0,-1,0,0,-.525731,-.850651,-.309017,-.809017,-.5,.309017,-.809017,-.5,-.309017,-.809017,-.5,-.525731,-.850651,0,0,-1,0,0,-1,0,.309017,-.809017,.5,.525731,-.850651,0,0,-1,0,-.309017,-.809017,.5,.309017,-.809017,.5,-.525731,-.850651,0,-.309017,-.809017,.5,0,-1,0,-.309017,-.809017,.5,0,-.525731,.850651,.309017,-.809017,.5,.309017,-.809017,.5,.809017,-.5,.309017,.525731,-.850651,0,.309017,-.809017,.5,.5,-.309017,.809017,.809017,-.5,.309017,0,-.525731,.850651,.5,-.309017,.809017,.309017,-.809017,.5,.5,-.309017,.809017,.850651,0,.525731,.809017,-.5,.309017,.809017,-.5,.309017,.809017,-.5,-.309017,.525731,-.850651,0,.809017,-.5,.309017,1,0,0,.809017,-.5,-.309017,.850651,0,.525731,1,0,0,.809017,-.5,.309017,1,0,0,.850651,0,-.525731,.809017,-.5,-.309017,.5,-.309017,-.809017,0,0,-1,0,-.525731,-.850651,.5,-.309017,-.809017,.5,.309017,-.809017,0,0,-1,.850651,0,-.525731,.5,.309017,-.809017,.5,-.309017,-.809017,.5,.309017,-.809017,0,.525731,-.850651,0,0,-1,-.309017,-.809017,-.5,-.809017,-.5,-.309017,-.525731,-.850651,0,-.309017,-.809017,-.5,-.5,-.309017,-.809017,-.809017,-.5,-.309017,0,-.525731,-.850651,-.5,-.309017,-.809017,-.309017,-.809017,-.5,-.5,-.309017,-.809017,-.850651,0,-.525731,-.809017,-.5,-.309017,-.309017,-.809017,.5,-.5,-.309017,.809017,0,-.525731,.850651,-.309017,-.809017,.5,-.809017,-.5,.309017,-.5,-.309017,.809017,-.525731,-.850651,0,-.809017,-.5,.309017,-.309017,-.809017,.5,-.809017,-.5,.309017,-.850651,0,.525731,-.5,-.309017,.809017,.5,-.309017,.809017,.5,.309017,.809017,.850651,0,.525731,.5,-.309017,.809017,0,0,1,.5,.309017,.809017,0,-.525731,.850651,0,0,1,.5,-.309017,.809017,0,0,1,0,.525731,.850651,.5,.309017,.809017,1,0,0,.809017,.5,-.309017,.850651,0,-.525731,1,0,0,.809017,.5,.309017,.809017,.5,-.309017,.850651,0,.525731,.809017,.5,.309017,1,0,0,.809017,.5,.309017,.525731,.850651,0,.809017,.5,-.309017],triangles:[0,2,1,3,5,4,6,8,7,9,11,10,12,14,13,15,17,16,18,20,19,21,23,22,24,26,25,27,29,28,30,32,31,33,35,34,36,38,37,39,41,40,42,44,43,45,47,46,48,50,49,51,53,52,54,56,55,57,59,58,60,62,61,63,65,64,66,68,67,69,71,70,72,74,73,75,77,76,78,80,79,81,83,82,84,86,85,87,89,88,90,92,91,93,95,94,96,98,97,99,101,100,102,104,103,105,107,106,108,110,109,111,113,112,114,116,115,117,119,118,120,122,121,123,125,124,126,128,127,129,131,130,132,134,133,135,137,136,138,140,139,141,143,142,144,146,145,147,149,148,150,152,151,153,155,154,156,158,157,159,161,160,162,164,163,165,167,166,168,170,169,171,173,172,174,176,175,177,179,178,180,182,181,183,185,184,186,188,187,189,191,190,192,194,193,195,197,196,198,200,199,201,203,202,204,206,205,207,209,208,210,212,211,213,215,214,216,218,217,219,221,220,222,224,223,225,227,226,228,230,229,231,233,232,234,236,235,237,239,238]},{positions:[-.850651,0,-.525731,0,.525731,-.850651,-.525731,.850651,0,0,.525731,-.850651,.525731,.850651,0,-.525731,.850651,0,.525731,.850651,0,0,.525731,.850651,-.525731,.850651,0,0,.525731,.850651,-.850651,0,.525731,-.525731,.850651,0,-.850651,0,.525731,-.850651,0,-.525731,-.525731,.850651,0,0,.525731,-.850651,.850651,0,-.525731,.525731,.850651,0,-.850651,0,-.525731,0,-.525731,-.850651,0,.525731,-.850651,-.850651,0,.525731,-.525731,-.850651,0,-.850651,0,-.525731,0,.525731,.850651,0,-.525731,.850651,-.850651,0,.525731,.525731,.850651,0,.850651,0,.525731,0,.525731,.850651,.850651,0,-.525731,0,-.525731,-.850651,.525731,-.850651,0,0,-.525731,-.850651,-.525731,-.850651,0,.525731,-.850651,0,-.525731,-.850651,0,0,-.525731,.850651,.525731,-.850651,0,0,-.525731,.850651,.850651,0,.525731,.525731,-.850651,0,.850651,0,.525731,.850651,0,-.525731,.525731,-.850651,0,.850651,0,-.525731,0,.525731,-.850651,0,-.525731,-.850651,0,-.525731,-.850651,-.850651,0,-.525731,-.525731,-.850651,0,-.525731,-.850651,0,-.850651,0,.525731,0,-.525731,.850651,0,-.525731,.850651,0,.525731,.850651,.850651,0,.525731,.850651,0,.525731,.525731,.850651,0,.850651,0,-.525731],normals:[-.57735,.57735,-.57735,-.57735,.57735,-.57735,-.57735,.57735,-.57735,0,.934172,-.356822,0,.934172,-.356822,0,.934172,-.356822,0,.934172,.356822,0,.934172,.356822,0,.934172,.356822,-.57735,.57735,.57735,-.57735,.57735,.57735,-.57735,.57735,.57735,-.934172,.356822,0,-.934172,.356822,0,-.934172,.356822,0,.57735,.57735,-.57735,.57735,.57735,-.57735,.57735,.57735,-.57735,-.356822,0,-.934172,-.356822,0,-.934172,-.356822,0,-.934172,-.934172,-.356822,0,-.934172,-.356822,0,-.934172,-.356822,0,-.356822,0,.934172,-.356822,0,.934172,-.356822,0,.934172,.57735,.57735,.57735,.57735,.57735,.57735,.57735,.57735,.57735,.57735,-.57735,-.57735,.57735,-.57735,-.57735,.57735,-.57735,-.57735,0,-.934172,-.356822,0,-.934172,-.356822,0,-.934172,-.356822,0,-.934172,.356822,0,-.934172,.356822,0,-.934172,.356822,.57735,-.57735,.57735,.57735,-.57735,.57735,.57735,-.57735,.57735,.934172,-.356822,0,.934172,-.356822,0,.934172,-.356822,0,.356822,0,-.934172,.356822,0,-.934172,.356822,0,-.934172,-.57735,-.57735,-.57735,-.57735,-.57735,-.57735,-.57735,-.57735,-.57735,-.57735,-.57735,.57735,-.57735,-.57735,.57735,-.57735,-.57735,.57735,.356822,0,.934172,.356822,0,.934172,.356822,0,.934172,.934172,.356822,0,.934172,.356822,0,.934172,.356822,0],triangles:[0,2,1,3,5,4,6,8,7,9,11,10,12,14,13,15,17,16,18,20,19,21,23,22,24,26,25,27,29,28,30,32,31,33,35,34,36,38,37,39,41,40,42,44,43,45,47,46,48,50,49,51,53,52,54,56,55,57,59,58]},{positions:[.5,.5,-.5,.5,.5,.5,.5,-.5,-.5,.5,-.5,.5,-.5,.5,.5,-.5,.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,.5,.5,.5,.5,.5,-.5,.5,-.5,.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,-.5,-.5,.5,.5,-.5,.5,-.5,.5,-.5,.5,.5,-.5,-.5,-.5,-.5,.5,-.5,-.5,.5,.5,.5,-.5,.5,.5,.5,-.5,.5,-.5,-.5,.5],normals:[1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,1],triangles:[0,1,2,2,1,3,4,5,6,6,5,7,8,9,10,10,9,11,12,13,14,14,13,15,16,17,18,18,17,19,20,21,22,22,21,23]},{positions:[-.730026,.652955,-.201774,-.403548,.854729,-.326477,-.525731,.850651,0,-.730026,.652955,-.201774,-.57735,.57735,-.57735,-.403548,.854729,-.326477,-.854729,.326477,-.403548,-.57735,.57735,-.57735,-.730026,.652955,-.201774,-.854729,.326477,-.403548,-.652955,.201774,-.730026,-.57735,.57735,-.57735,-.850651,0,-.525731,-.652955,.201774,-.730026,-.854729,.326477,-.403548,-.57735,.57735,-.57735,-.201774,.730026,-.652955,-.403548,.854729,-.326477,-.57735,.57735,-.57735,-.326477,.403548,-.76,-.201774,.730026,-.652955,-.652955,.201774,-.730026,-.326477,.403548,-.76,-.57735,.57735,-.57735,-.326477,.403548,-.76,0,.525731,-.76,-.201774,.730026,-.652955,-.403548,.854729,-.326477,-.201774,.979432,0,-.525731,.850651,0,-.403548,.854729,-.326477,0,.934172,-.356822,-.201774,.979432,0,-.201774,.730026,-.652955,0,.934172,-.356822,-.403548,.854729,-.326477,-.201774,.730026,-.652955,.201774,.730026,-.652955,0,.934172,-.356822,0,.525731,-.76,.201774,.730026,-.652955,-.201774,.730026,-.652955,0,.934172,-.356822,.201774,.979432,0,-.201774,.979432,0,0,.934172,-.356822,.403548,.854729,-.326477,.201774,.979432,0,.201774,.730026,-.652955,.403548,.854729,-.326477,0,.934172,-.356822,.403548,.854729,-.326477,.525731,.850651,0,.201774,.979432,0,-.201774,.979432,0,-.403548,.854729,.326477,-.525731,.850651,0,-.201774,.979432,0,0,.934172,.356822,-.403548,.854729,.326477,.201774,.979432,0,0,.934172,.356822,-.201774,.979432,0,.201774,.979432,0,.403548,.854729,.326477,0,.934172,.356822,.525731,.850651,0,.403548,.854729,.326477,.201774,.979432,0,0,.934172,.356822,-.201774,.730026,.652955,-.403548,.854729,.326477,0,.934172,.356822,.201774,.730026,.652955,-.201774,.730026,.652955,.403548,.854729,.326477,.201774,.730026,.652955,0,.934172,.356822,.201774,.730026,.652955,0,.525731,.850651,-.201774,.730026,.652955,-.403548,.854729,.326477,-.730026,.652955,.201774,-.525731,.850651,0,-.403548,.854729,.326477,-.57735,.57735,.57735,-.730026,.652955,.201774,-.201774,.730026,.652955,-.57735,.57735,.57735,-.403548,.854729,.326477,-.201774,.730026,.652955,-.326477,.403548,.854729,-.57735,.57735,.57735,0,.525731,.850651,-.326477,.403548,.854729,-.201774,.730026,.652955,-.57735,.57735,.57735,-.854729,.326477,.403548,-.730026,.652955,.201774,-.57735,.57735,.57735,-.652955,.201774,.730026,-.854729,.326477,.403548,-.326477,.403548,.854729,-.652955,.201774,.730026,-.57735,.57735,.57735,-.652955,.201774,.730026,-.850651,0,.525731,-.854729,.326477,.403548,-.730026,.652955,.201774,-.730026,.652955,-.201774,-.525731,.850651,0,-.730026,.652955,.201774,-.934172,.356822,0,-.730026,.652955,-.201774,-.854729,.326477,.403548,-.934172,.356822,0,-.730026,.652955,.201774,-.854729,.326477,.403548,-.979432,0,.201774,-.934172,.356822,0,-.850651,0,.525731,-.979432,0,.201774,-.854729,.326477,.403548,-.934172,.356822,0,-.854729,.326477,-.403548,-.730026,.652955,-.201774,-.934172,.356822,0,-.979432,0,-.201774,-.854729,.326477,-.403548,-.979432,0,.201774,-.979432,0,-.201774,-.934172,.356822,0,-.979432,0,-.201774,-.850651,0,-.525731,-.854729,.326477,-.403548,.403548,.854729,-.326477,.730026,.652955,-.201774,.525731,.850651,0,.403548,.854729,-.326477,.57735,.57735,-.57735,.730026,.652955,-.201774,.201774,.730026,-.652955,.57735,.57735,-.57735,.403548,.854729,-.326477,.201774,.730026,-.652955,.326477,.403548,-.76,.57735,.57735,-.57735,0,.525731,-.76,.326477,.403548,-.76,.201774,.730026,-.652955,.57735,.57735,-.57735,.854729,.326477,-.403548,.730026,.652955,-.201774,.57735,.57735,-.57735,.652955,.201774,-.730026,.854729,.326477,-.403548,.326477,.403548,-.76,.652955,.201774,-.730026,.57735,.57735,-.57735,.652955,.201774,-.730026,.850651,0,-.525731,.854729,.326477,-.403548,-.326477,.403548,-.76,0,.201774,-.76,0,.525731,-.76,-.326477,.403548,-.76,-.356822,0,-.76,0,.201774,-.76,-.652955,.201774,-.730026,-.356822,0,-.76,-.326477,.403548,-.76,-.652955,.201774,-.730026,-.652955,-.201774,-.730026,-.356822,0,-.76,-.850651,0,-.525731,-.652955,-.201774,-.730026,-.652955,.201774,-.730026,-.356822,0,-.76,0,-.201774,-.76,0,.201774,-.76,-.356822,0,-.76,-.326477,-.403548,-.76,0,-.201774,-.76,-.652955,-.201774,-.730026,-.326477,-.403548,-.76,-.356822,0,-.76,-.326477,-.403548,-.76,0,-.525731,-.76,0,-.201774,-.76,-.979432,0,-.201774,-.854729,-.326477,-.403548,-.850651,0,-.525731,-.979432,0,-.201774,-.934172,-.356822,0,-.854729,-.326477,-.403548,-.979432,0,.201774,-.934172,-.356822,0,-.979432,0,-.201774,-.979432,0,.201774,-.854729,-.326477,.403548,-.934172,-.356822,0,-.850651,0,.525731,-.854729,-.326477,.403548,-.979432,0,.201774,-.934172,-.356822,0,-.730026,-.652955,-.201774,-.854729,-.326477,-.403548,-.934172,-.356822,0,-.730026,-.652955,.201774,-.730026,-.652955,-.201774,-.854729,-.326477,.403548,-.730026,-.652955,.201774,-.934172,-.356822,0,-.730026,-.652955,.201774,-.525731,-.850651,0,-.730026,-.652955,-.201774,-.652955,.201774,.730026,-.652955,-.201774,.730026,-.850651,0,.525731,-.652955,.201774,.730026,-.356822,0,.934172,-.652955,-.201774,.730026,-.326477,.403548,.854729,-.356822,0,.934172,-.652955,.201774,.730026,-.326477,.403548,.854729,0,.201774,.979432,-.356822,0,.934172,0,.525731,.850651,0,.201774,.979432,-.326477,.403548,.854729,-.356822,0,.934172,-.326477,-.403548,.854729,-.652955,-.201774,.730026,-.356822,0,.934172,0,-.201774,.979432,-.326477,-.403548,.854729,0,.201774,.979432,0,-.201774,.979432,-.356822,0,.934172,0,-.201774,.979432,0,-.525731,.850651,-.326477,-.403548,.854729,.201774,.730026,.652955,.326477,.403548,.854729,0,.525731,.850651,.201774,.730026,.652955,.57735,.57735,.57735,.326477,.403548,.854729,.403548,.854729,.326477,.57735,.57735,.57735,.201774,.730026,.652955,.403548,.854729,.326477,.730026,.652955,.201774,.57735,.57735,.57735,.525731,.850651,0,.730026,.652955,.201774,.403548,.854729,.326477,.57735,.57735,.57735,.652955,.201774,.730026,.326477,.403548,.854729,.57735,.57735,.57735,.854729,.326477,.403548,.652955,.201774,.730026,.730026,.652955,.201774,.854729,.326477,.403548,.57735,.57735,.57735,.854729,.326477,.403548,.850651,0,.525731,.652955,.201774,.730026,.730026,-.652955,-.201774,.403548,-.854729,-.326477,.525731,-.850651,0,.730026,-.652955,-.201774,.57735,-.57735,-.57735,.403548,-.854729,-.326477,.854729,-.326477,-.403548,.57735,-.57735,-.57735,.730026,-.652955,-.201774,.854729,-.326477,-.403548,.652955,-.201774,-.730026,.57735,-.57735,-.57735,.850651,0,-.525731,.652955,-.201774,-.730026,.854729,-.326477,-.403548,.57735,-.57735,-.57735,.201774,-.730026,-.652955,.403548,-.854729,-.326477,.57735,-.57735,-.57735,.326477,-.403548,-.76,.201774,-.730026,-.652955,.652955,-.201774,-.730026,.326477,-.403548,-.76,.57735,-.57735,-.57735,.326477,-.403548,-.76,0,-.525731,-.76,.201774,-.730026,-.652955,.403548,-.854729,-.326477,.201774,-.979432,0,.525731,-.850651,0,.403548,-.854729,-.326477,0,-.934172,-.356822,.201774,-.979432,0,.201774,-.730026,-.652955,0,-.934172,-.356822,.403548,-.854729,-.326477,.201774,-.730026,-.652955,-.201774,-.730026,-.652955,0,-.934172,-.356822,0,-.525731,-.76,-.201774,-.730026,-.652955,.201774,-.730026,-.652955,0,-.934172,-.356822,-.201774,-.979432,0,.201774,-.979432,0,0,-.934172,-.356822,-.403548,-.854729,-.326477,-.201774,-.979432,0,-.201774,-.730026,-.652955,-.403548,-.854729,-.326477,0,-.934172,-.356822,-.403548,-.854729,-.326477,-.525731,-.850651,0,-.201774,-.979432,0,.201774,-.979432,0,.403548,-.854729,.326477,.525731,-.850651,0,.201774,-.979432,0,0,-.934172,.356822,.403548,-.854729,.326477,-.201774,-.979432,0,0,-.934172,.356822,.201774,-.979432,0,-.201774,-.979432,0,-.403548,-.854729,.326477,0,-.934172,.356822,-.525731,-.850651,0,-.403548,-.854729,.326477,-.201774,-.979432,0,0,-.934172,.356822,.201774,-.730026,.652955,.403548,-.854729,.326477,0,-.934172,.356822,-.201774,-.730026,.652955,.201774,-.730026,.652955,-.403548,-.854729,.326477,-.201774,-.730026,.652955,0,-.934172,.356822,-.201774,-.730026,.652955,0,-.525731,.850651,.201774,-.730026,.652955,.403548,-.854729,.326477,.730026,-.652955,.201774,.525731,-.850651,0,.403548,-.854729,.326477,.57735,-.57735,.57735,.730026,-.652955,.201774,.201774,-.730026,.652955,.57735,-.57735,.57735,.403548,-.854729,.326477,.201774,-.730026,.652955,.326477,-.403548,.854729,.57735,-.57735,.57735,0,-.525731,.850651,.326477,-.403548,.854729,.201774,-.730026,.652955,.57735,-.57735,.57735,.854729,-.326477,.403548,.730026,-.652955,.201774,.57735,-.57735,.57735,.652955,-.201774,.730026,.854729,-.326477,.403548,.326477,-.403548,.854729,.652955,-.201774,.730026,.57735,-.57735,.57735,.652955,-.201774,.730026,.850651,0,.525731,.854729,-.326477,.403548,.730026,-.652955,.201774,.730026,-.652955,-.201774,.525731,-.850651,0,.730026,-.652955,.201774,.934172,-.356822,0,.730026,-.652955,-.201774,.854729,-.326477,.403548,.934172,-.356822,0,.730026,-.652955,.201774,.854729,-.326477,.403548,.979432,0,.201774,.934172,-.356822,0,.850651,0,.525731,.979432,0,.201774,.854729,-.326477,.403548,.934172,-.356822,0,.854729,-.326477,-.403548,.730026,-.652955,-.201774,.934172,-.356822,0,.979432,0,-.201774,.854729,-.326477,-.403548,.979432,0,.201774,.979432,0,-.201774,.934172,-.356822,0,.979432,0,-.201774,.850651,0,-.525731,.854729,-.326477,-.403548,.326477,-.403548,-.76,0,-.201774,-.76,0,-.525731,-.76,.326477,-.403548,-.76,.356822,0,-.76,0,-.201774,-.76,.652955,-.201774,-.730026,.356822,0,-.76,.326477,-.403548,-.76,.652955,-.201774,-.730026,.652955,.201774,-.730026,.356822,0,-.76,.850651,0,-.525731,.652955,.201774,-.730026,.652955,-.201774,-.730026,.356822,0,-.76,0,.201774,-.76,0,-.201774,-.76,.356822,0,-.76,.326477,.403548,-.76,0,.201774,-.76,.652955,.201774,-.730026,.326477,.403548,-.76,.356822,0,-.76,.326477,.403548,-.76,0,.525731,-.76,0,.201774,-.76,-.403548,-.854729,-.326477,-.730026,-.652955,-.201774,-.525731,-.850651,0,-.403548,-.854729,-.326477,-.57735,-.57735,-.57735,-.730026,-.652955,-.201774,-.201774,-.730026,-.652955,-.57735,-.57735,-.57735,-.403548,-.854729,-.326477,-.201774,-.730026,-.652955,-.326477,-.403548,-.76,-.57735,-.57735,-.57735,0,-.525731,-.76,-.326477,-.403548,-.76,-.201774,-.730026,-.652955,-.57735,-.57735,-.57735,-.854729,-.326477,-.403548,-.730026,-.652955,-.201774,-.57735,-.57735,-.57735,-.652955,-.201774,-.730026,-.854729,-.326477,-.403548,-.326477,-.403548,-.76,-.652955,-.201774,-.730026,-.57735,-.57735,-.57735,-.652955,-.201774,-.730026,-.850651,0,-.525731,-.854729,-.326477,-.403548,-.201774,-.730026,.652955,-.326477,-.403548,.854729,0,-.525731,.850651,-.201774,-.730026,.652955,-.57735,-.57735,.57735,-.326477,-.403548,.854729,-.403548,-.854729,.326477,-.57735,-.57735,.57735,-.201774,-.730026,.652955,-.403548,-.854729,.326477,-.730026,-.652955,.201774,-.57735,-.57735,.57735,-.525731,-.850651,0,-.730026,-.652955,.201774,-.403548,-.854729,.326477,-.57735,-.57735,.57735,-.652955,-.201774,.730026,-.326477,-.403548,.854729,-.57735,-.57735,.57735,-.854729,-.326477,.403548,-.652955,-.201774,.730026,-.730026,-.652955,.201774,-.854729,-.326477,.403548,-.57735,-.57735,.57735,-.854729,-.326477,.403548,-.850651,0,.525731,-.652955,-.201774,.730026,.652955,-.201774,.730026,.652955,.201774,.730026,.850651,0,.525731,.652955,-.201774,.730026,.356822,0,.934172,.652955,.201774,.730026,.326477,-.403548,.854729,.356822,0,.934172,.652955,-.201774,.730026,.326477,-.403548,.854729,0,-.201774,.979432,.356822,0,.934172,0,-.525731,.850651,0,-.201774,.979432,.326477,-.403548,.854729,.356822,0,.934172,.326477,.403548,.854729,.652955,.201774,.730026,.356822,0,.934172,0,.201774,.979432,.326477,.403548,.854729,0,-.201774,.979432,0,.201774,.979432,.356822,0,.934172,0,.201774,.979432,0,.525731,.850651,.326477,.403548,.854729,.979432,0,-.201774,.854729,.326477,-.403548,.850651,0,-.525731,.979432,0,-.201774,.934172,.356822,0,.854729,.326477,-.403548,.979432,0,.201774,.934172,.356822,0,.979432,0,-.201774,.979432,0,.201774,.854729,.326477,.403548,.934172,.356822,0,.850651,0,.525731,.854729,.326477,.403548,.979432,0,.201774,.934172,.356822,0,.730026,.652955,-.201774,.854729,.326477,-.403548,.934172,.356822,0,.730026,.652955,.201774,.730026,.652955,-.201774,.854729,.326477,.403548,.730026,.652955,.201774,.934172,.356822,0,.730026,.652955,.201774,.525731,.850651,0,.730026,.652955,-.201774],normals:[-.569768,.796265,-.203287,-.569768,.796265,-.203287,-.569768,.796265,-.203287,-.587051,.7136,-.382291,-.587051,.7136,-.382291,-.587051,.7136,-.382291,-.73967,.53491,-.408362,-.73967,.53491,-.408362,-.73967,.53491,-.408362,-.7136,.382291,-.587051,-.7136,.382291,-.587051,-.7136,.382291,-.587051,-.796265,.203287,-.569768,-.796265,.203287,-.569768,-.796265,.203287,-.569768,-.408362,.73967,-.53491,-.408362,.73967,-.53491,-.408362,.73967,-.53491,-.336384,.406943,-.84926,-.336384,.406943,-.84926,-.336384,.406943,-.84926,-.332422,.411827,-.848466,-.332422,.411827,-.848466,-.332422,.411827,-.848466,-.132543,.35416,-.925745,-.132543,.35416,-.925745,-.132543,.35416,-.925745,-.366481,.921904,-.125638,-.366481,.921904,-.125638,-.366481,.921904,-.125638,-.20476,.949869,-.236269,-.20476,.949869,-.236269,-.20476,.949869,-.236269,-.20476,.865503,-.457141,-.20476,.865503,-.457141,-.20476,.865503,-.457141,0,.82332,-.567577,0,.82332,-.567577,0,.82332,-.567577,0,.464122,-.885771,0,.464122,-.885771,0,.464122,-.885771,0,.992051,-.125833,0,.992051,-.125833,0,.992051,-.125833,.20476,.949869,-.236269,.20476,.949869,-.236269,.20476,.949869,-.236269,.20476,.865503,-.457141,.20476,.865503,-.457141,.20476,.865503,-.457141,.366481,.921904,-.125638,.366481,.921904,-.125638,.366481,.921904,-.125638,-.366481,.921904,.125638,-.366481,.921904,.125638,-.366481,.921904,.125638,-.20476,.949869,.236269,-.20476,.949869,.236269,-.20476,.949869,.236269,0,.992051,.125833,0,.992051,.125833,0,.992051,.125833,.20476,.949869,.236269,.20476,.949869,.236269,.20476,.949869,.236269,.366481,.921904,.125638,.366481,.921904,.125638,.366481,.921904,.125638,-.20476,.865503,.457141,-.20476,.865503,.457141,-.20476,.865503,.457141,0,.82332,.567577,0,.82332,.567577,0,.82332,.567577,.20476,.865503,.457141,.20476,.865503,.457141,.20476,.865503,.457141,0,.695406,.718617,0,.695406,.718617,0,.695406,.718617,-.569768,.796265,.203287,-.569768,.796265,.203287,-.569768,.796265,.203287,-.587051,.7136,.382291,-.587051,.7136,.382291,-.587051,.7136,.382291,-.408362,.73967,.53491,-.408362,.73967,.53491,-.408362,.73967,.53491,-.382291,.587051,.7136,-.382291,.587051,.7136,-.382291,.587051,.7136,-.203287,.569768,.796265,-.203287,.569768,.796265,-.203287,.569768,.796265,-.73967,.53491,.408362,-.73967,.53491,.408362,-.73967,.53491,.408362,-.7136,.382291,.587051,-.7136,.382291,.587051,-.7136,.382291,.587051,-.53491,.408362,.73967,-.53491,.408362,.73967,-.53491,.408362,.73967,-.796265,.203287,.569768,-.796265,.203287,.569768,-.796265,.203287,.569768,-.695406,.718617,0,-.695406,.718617,0,-.695406,.718617,0,-.82332,.567577,0,-.82332,.567577,0,-.82332,.567577,0,-.865503,.457141,.20476,-.865503,.457141,.20476,-.865503,.457141,.20476,-.949869,.236269,.20476,-.949869,.236269,.20476,-.949869,.236269,.20476,-.921904,.125638,.366481,-.921904,.125638,.366481,-.921904,.125638,.366481,-.865503,.457141,-.20476,-.865503,.457141,-.20476,-.865503,.457141,-.20476,-.949869,.236269,-.20476,-.949869,.236269,-.20476,-.949869,.236269,-.20476,-.992051,.125833,0,-.992051,.125833,0,-.992051,.125833,0,-.921904,.125638,-.366481,-.921904,.125638,-.366481,-.921904,.125638,-.366481,.569768,.796265,-.203287,.569768,.796265,-.203287,.569768,.796265,-.203287,.587051,.7136,-.382291,.587051,.7136,-.382291,.587051,.7136,-.382291,.408362,.73967,-.53491,.408362,.73967,-.53491,.408362,.73967,-.53491,.336384,.406943,-.84926,.336384,.406943,-.84926,.336384,.406943,-.84926,.132543,.35416,-.925745,.132543,.35416,-.925745,.132543,.35416,-.925745,.73967,.53491,-.408362,.73967,.53491,-.408362,.73967,.53491,-.408362,.7136,.382291,-.587051,.7136,.382291,-.587051,.7136,.382291,-.587051,.332422,.411827,-.848466,.332422,.411827,-.848466,.332422,.411827,-.848466,.796265,.203287,-.569768,.796265,.203287,-.569768,.796265,.203287,-.569768,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-.095841,.007207,-.995371,-.095841,.007207,-.995371,-.095841,.007207,-.995371,-.100705,0,-.994916,-.100705,0,-.994916,-.100705,0,-.994916,-.718617,0,-.695406,-.718617,0,-.695406,-.718617,0,-.695406,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,-.095841,-.007207,-.995371,-.095841,-.007207,-.995371,-.095841,-.007207,-.995371,0,0,-1,0,0,-1,0,0,-1,-.921904,-.125638,-.366481,-.921904,-.125638,-.366481,-.921904,-.125638,-.366481,-.949869,-.236269,-.20476,-.949869,-.236269,-.20476,-.949869,-.236269,-.20476,-.992051,-.125833,0,-.992051,-.125833,0,-.992051,-.125833,0,-.949869,-.236269,.20476,-.949869,-.236269,.20476,-.949869,-.236269,.20476,-.921904,-.125638,.366481,-.921904,-.125638,.366481,-.921904,-.125638,.366481,-.865503,-.457141,-.20476,-.865503,-.457141,-.20476,-.865503,-.457141,-.20476,-.82332,-.567577,0,-.82332,-.567577,0,-.82332,-.567577,0,-.865503,-.457141,.20476,-.865503,-.457141,.20476,-.865503,-.457141,.20476,-.695406,-.718617,0,-.695406,-.718617,0,-.695406,-.718617,0,-.718617,0,.695406,-.718617,0,.695406,-.718617,0,.695406,-.567577,0,.82332,-.567577,0,.82332,-.567577,0,.82332,-.457141,.20476,.865503,-.457141,.20476,.865503,-.457141,.20476,.865503,-.236269,.20476,.949869,-.236269,.20476,.949869,-.236269,.20476,.949869,-.125638,.366481,.921904,-.125638,.366481,.921904,-.125638,.366481,.921904,-.457141,-.20476,.865503,-.457141,-.20476,.865503,-.457141,-.20476,.865503,-.236269,-.20476,.949869,-.236269,-.20476,.949869,-.236269,-.20476,.949869,-.125833,0,.992051,-.125833,0,.992051,-.125833,0,.992051,-.125638,-.366481,.921904,-.125638,-.366481,.921904,-.125638,-.366481,.921904,.203287,.569768,.796265,.203287,.569768,.796265,.203287,.569768,.796265,.382291,.587051,.7136,.382291,.587051,.7136,.382291,.587051,.7136,.408362,.73967,.53491,.408362,.73967,.53491,.408362,.73967,.53491,.587051,.7136,.382291,.587051,.7136,.382291,.587051,.7136,.382291,.569768,.796265,.203287,.569768,.796265,.203287,.569768,.796265,.203287,.53491,.408362,.73967,.53491,.408362,.73967,.53491,.408362,.73967,.7136,.382291,.587051,.7136,.382291,.587051,.7136,.382291,.587051,.73967,.53491,.408362,.73967,.53491,.408362,.73967,.53491,.408362,.796265,.203287,.569768,.796265,.203287,.569768,.796265,.203287,.569768,.569768,-.796265,-.203287,.569768,-.796265,-.203287,.569768,-.796265,-.203287,.587051,-.7136,-.382291,.587051,-.7136,-.382291,.587051,-.7136,-.382291,.73967,-.53491,-.408362,.73967,-.53491,-.408362,.73967,-.53491,-.408362,.7136,-.382291,-.587051,.7136,-.382291,-.587051,.7136,-.382291,-.587051,.796265,-.203287,-.569768,.796265,-.203287,-.569768,.796265,-.203287,-.569768,.408362,-.73967,-.53491,.408362,-.73967,-.53491,.408362,-.73967,-.53491,.336384,-.406943,-.84926,.336384,-.406943,-.84926,.336384,-.406943,-.84926,.332422,-.411827,-.848466,.332422,-.411827,-.848466,.332422,-.411827,-.848466,.132543,-.35416,-.925745,.132543,-.35416,-.925745,.132543,-.35416,-.925745,.366481,-.921904,-.125638,.366481,-.921904,-.125638,.366481,-.921904,-.125638,.20476,-.949869,-.236269,.20476,-.949869,-.236269,.20476,-.949869,-.236269,.20476,-.865503,-.457141,.20476,-.865503,-.457141,.20476,-.865503,-.457141,0,-.82332,-.567577,0,-.82332,-.567577,0,-.82332,-.567577,0,-.464122,-.885771,0,-.464122,-.885771,0,-.464122,-.885771,0,-.992051,-.125833,0,-.992051,-.125833,0,-.992051,-.125833,-.20476,-.949869,-.236269,-.20476,-.949869,-.236269,-.20476,-.949869,-.236269,-.20476,-.865503,-.457141,-.20476,-.865503,-.457141,-.20476,-.865503,-.457141,-.366481,-.921904,-.125638,-.366481,-.921904,-.125638,-.366481,-.921904,-.125638,.366481,-.921904,.125638,.366481,-.921904,.125638,.366481,-.921904,.125638,.20476,-.949869,.236269,.20476,-.949869,.236269,.20476,-.949869,.236269,0,-.992051,.125833,0,-.992051,.125833,0,-.992051,.125833,-.20476,-.949869,.236269,-.20476,-.949869,.236269,-.20476,-.949869,.236269,-.366481,-.921904,.125638,-.366481,-.921904,.125638,-.366481,-.921904,.125638,.20476,-.865503,.457141,.20476,-.865503,.457141,.20476,-.865503,.457141,0,-.82332,.567577,0,-.82332,.567577,0,-.82332,.567577,-.20476,-.865503,.457141,-.20476,-.865503,.457141,-.20476,-.865503,.457141,0,-.695406,.718617,0,-.695406,.718617,0,-.695406,.718617,.569768,-.796265,.203287,.569768,-.796265,.203287,.569768,-.796265,.203287,.587051,-.7136,.382291,.587051,-.7136,.382291,.587051,-.7136,.382291,.408362,-.73967,.53491,.408362,-.73967,.53491,.408362,-.73967,.53491,.382291,-.587051,.7136,.382291,-.587051,.7136,.382291,-.587051,.7136,.203287,-.569768,.796265,.203287,-.569768,.796265,.203287,-.569768,.796265,.73967,-.53491,.408362,.73967,-.53491,.408362,.73967,-.53491,.408362,.7136,-.382291,.587051,.7136,-.382291,.587051,.7136,-.382291,.587051,.53491,-.408362,.73967,.53491,-.408362,.73967,.53491,-.408362,.73967,.796265,-.203287,.569768,.796265,-.203287,.569768,.796265,-.203287,.569768,.695406,-.718617,0,.695406,-.718617,0,.695406,-.718617,0,.82332,-.567577,0,.82332,-.567577,0,.82332,-.567577,0,.865503,-.457141,.20476,.865503,-.457141,.20476,.865503,-.457141,.20476,.949869,-.236269,.20476,.949869,-.236269,.20476,.949869,-.236269,.20476,.921904,-.125638,.366481,.921904,-.125638,.366481,.921904,-.125638,.366481,.865503,-.457141,-.20476,.865503,-.457141,-.20476,.865503,-.457141,-.20476,.949869,-.236269,-.20476,.949869,-.236269,-.20476,.949869,-.236269,-.20476,.992051,-.125833,0,.992051,-.125833,0,.992051,-.125833,0,.921904,-.125638,-.366481,.921904,-.125638,-.366481,.921904,-.125638,-.366481,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,.095841,-.007207,-.995371,.095841,-.007207,-.995371,.095841,-.007207,-.995371,.100705,0,-.994916,.100705,0,-.994916,.100705,0,-.994916,.718617,0,-.695406,.718617,0,-.695406,.718617,0,-.695406,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,.095841,.007207,-.995371,.095841,.007207,-.995371,.095841,.007207,-.995371,0,0,-1,0,0,-1,0,0,-1,-.569768,-.796265,-.203287,-.569768,-.796265,-.203287,-.569768,-.796265,-.203287,-.587051,-.7136,-.382291,-.587051,-.7136,-.382291,-.587051,-.7136,-.382291,-.408362,-.73967,-.53491,-.408362,-.73967,-.53491,-.408362,-.73967,-.53491,-.336384,-.406943,-.84926,-.336384,-.406943,-.84926,-.336384,-.406943,-.84926,-.132543,-.35416,-.925745,-.132543,-.35416,-.925745,-.132543,-.35416,-.925745,-.73967,-.53491,-.408362,-.73967,-.53491,-.408362,-.73967,-.53491,-.408362,-.7136,-.382291,-.587051,-.7136,-.382291,-.587051,-.7136,-.382291,-.587051,-.332422,-.411827,-.848466,-.332422,-.411827,-.848466,-.332422,-.411827,-.848466,-.796265,-.203287,-.569768,-.796265,-.203287,-.569768,-.796265,-.203287,-.569768,-.203287,-.569768,.796265,-.203287,-.569768,.796265,-.203287,-.569768,.796265,-.382291,-.587051,.7136,-.382291,-.587051,.7136,-.382291,-.587051,.7136,-.408362,-.73967,.53491,-.408362,-.73967,.53491,-.408362,-.73967,.53491,-.587051,-.7136,.382291,-.587051,-.7136,.382291,-.587051,-.7136,.382291,-.569768,-.796265,.203287,-.569768,-.796265,.203287,-.569768,-.796265,.203287,-.53491,-.408362,.73967,-.53491,-.408362,.73967,-.53491,-.408362,.73967,-.7136,-.382291,.587051,-.7136,-.382291,.587051,-.7136,-.382291,.587051,-.73967,-.53491,.408362,-.73967,-.53491,.408362,-.73967,-.53491,.408362,-.796265,-.203287,.569768,-.796265,-.203287,.569768,-.796265,-.203287,.569768,.718617,0,.695406,.718617,0,.695406,.718617,0,.695406,.567577,0,.82332,.567577,0,.82332,.567577,0,.82332,.457141,-.20476,.865503,.457141,-.20476,.865503,.457141,-.20476,.865503,.236269,-.20476,.949869,.236269,-.20476,.949869,.236269,-.20476,.949869,.125638,-.366481,.921904,.125638,-.366481,.921904,.125638,-.366481,.921904,.457141,.20476,.865503,.457141,.20476,.865503,.457141,.20476,.865503,.236269,.20476,.949869,.236269,.20476,.949869,.236269,.20476,.949869,.125833,0,.992051,.125833,0,.992051,.125833,0,.992051,.125638,.366481,.921904,.125638,.366481,.921904,.125638,.366481,.921904,.921904,.125638,-.366481,.921904,.125638,-.366481,.921904,.125638,-.366481,.949869,.236269,-.20476,.949869,.236269,-.20476,.949869,.236269,-.20476,.992051,.125833,0,.992051,.125833,0,.992051,.125833,0,.949869,.236269,.20476,.949869,.236269,.20476,.949869,.236269,.20476,.921904,.125638,.366481,.921904,.125638,.366481,.921904,.125638,.366481,.865503,.457141,-.20476,.865503,.457141,-.20476,.865503,.457141,-.20476,.82332,.567577,0,.82332,.567577,0,.82332,.567577,0,.865503,.457141,.20476,.865503,.457141,.20476,.865503,.457141,.20476,.695406,.718617,0,.695406,.718617,0,.695406,.718617,0],triangles:[0,2,1,3,5,4,6,8,7,9,11,10,12,14,13,15,17,16,18,20,19,21,23,22,24,26,25,27,29,28,30,32,31,33,35,34,36,38,37,39,41,40,42,44,43,45,47,46,48,50,49,51,53,52,54,56,55,57,59,58,60,62,61,63,65,64,66,68,67,69,71,70,72,74,73,75,77,76,78,80,79,81,83,82,84,86,85,87,89,88,90,92,91,93,95,94,96,98,97,99,101,100,102,104,103,105,107,106,108,110,109,111,113,112,114,116,115,117,119,118,120,122,121,123,125,124,126,128,127,129,131,130,132,134,133,135,137,136,138,140,139,141,143,142,144,146,145,147,149,148,150,152,151,153,155,154,156,158,157,159,161,160,162,164,163,165,167,166,168,170,169,171,173,172,174,176,175,177,179,178,180,182,181,183,185,184,186,188,187,189,191,190,192,194,193,195,197,196,198,200,199,201,203,202,204,206,205,207,209,208,210,212,211,213,215,214,216,218,217,219,221,220,222,224,223,225,227,226,228,230,229,231,233,232,234,236,235,237,239,238,240,242,241,243,245,244,246,248,247,249,251,250,252,254,253,255,257,256,258,260,259,261,263,262,264,266,265,267,269,268,270,272,271,273,275,274,276,278,277,279,281,280,282,284,283,285,287,286,288,290,289,291,293,292,294,296,295,297,299,298,300,302,301,303,305,304,306,308,307,309,311,310,312,314,313,315,317,316,318,320,319,321,323,322,324,326,325,327,329,328,330,332,331,333,335,334,336,338,337,339,341,340,342,344,343,345,347,346,348,350,349,351,353,352,354,356,355,357,359,358,360,362,361,363,365,364,366,368,367,369,371,370,372,374,373,375,377,376,378,380,379,381,383,382,384,386,385,387,389,388,390,392,391,393,395,394,396,398,397,399,401,400,402,404,403,405,407,406,408,410,409,411,413,412,414,416,415,417,419,418,420,422,421,423,425,424,426,428,427,429,431,430,432,434,433,435,437,436,438,440,439,441,443,442,444,446,445,447,449,448,450,452,451,453,455,454,456,458,457,459,461,460,462,464,463,465,467,466,468,470,469,471,473,472,474,476,475,477,479,478,480,482,481,483,485,484,486,488,487,489,491,490,492,494,493,495,497,496,498,500,499,501,503,502,504,506,505,507,509,508,510,512,511,513,515,514,516,518,517,519,521,520,522,524,523,525,527,526,528,530,529,531,533,532,534,536,535,537,539,538]},{positions:[0,.55,-.0064,.070206,.46,-.280455,.212027,.46,-.221191,0,.55,-.0064,.212027,.46,-.221191,.019525,.55,-.0023,.019525,.55,-.0023,.212027,.46,-.221191,.035182,.55,.009188,.035182,.55,.009188,.212027,.46,-.221191,.311852,.46,-.111185,.035182,.55,.009188,.311852,.46,-.111185,.349912,.46,.027775,.035182,.55,.009188,.349912,.46,.027775,.043872,.55,.025788,.043872,.55,.025788,.349912,.46,.027775,.043872,.55,.044212,.043872,.55,.044212,.349912,.46,.027775,.318667,.46,.168166,.043872,.55,.044212,.318667,.46,.168166,.224306,.46,.282182,.043872,.55,.044212,.224306,.46,.282182,.035182,.55,.060812,.035182,.55,.060812,.224306,.46,.282182,.019525,.55,.0723,.019525,.55,.0723,.224306,.46,.282182,.085519,.46,.34724,.019525,.55,.0723,.085519,.46,.34724,-.070206,.46,.350455,.019525,.55,.0723,-.070206,.46,.350455,0,.55,.0764,0,.55,.0764,-.070206,.46,.350455,-.019525,.55,.0723,-.019525,.55,.0723,-.070206,.46,.350455,-.212027,.46,.291191,-.019525,.55,.0723,-.212027,.46,.291191,-.311852,.46,.181185,-.019525,.55,.0723,-.311852,.46,.181185,-.035182,.55,.060812,-.035182,.55,.060812,-.311852,.46,.181185,-.043872,.55,.044212,-.043872,.55,.044212,-.311852,.46,.181185,-.349912,.46,.042225,-.043872,.55,.044212,-.349912,.46,.042225,-.318667,.46,-.098166,-.043872,.55,.044212,-.318667,.46,-.098166,-.043872,.55,.025788,-.043872,.55,.025788,-.318667,.46,-.098166,-.035182,.55,.009188,-.035182,.55,.009188,-.318667,.46,-.098166,-.224306,.46,-.212182,-.035182,.55,.009188,-.224306,.46,-.212182,-.085519,.46,-.27724,-.035182,.55,.009188,-.085519,.46,-.27724,-.019525,.55,-.0023,-.019525,.55,-.0023,-.085519,.46,-.27724,0,.55,-.0064,0,.55,-.0064,-.085519,.46,-.27724,.070206,.46,-.280455,.070206,.46,-.280455,0,.25,-.4342,.221281,.25,-.387735,.070206,.46,-.280455,.221281,.25,-.387735,.212027,.46,-.221191,.212027,.46,-.221191,.221281,.25,-.387735,.311852,.46,-.111185,.311852,.46,-.111185,.221281,.25,-.387735,.398734,.25,-.257541,.311852,.46,-.111185,.398734,.25,-.257541,.497213,.25,-.069407,.311852,.46,-.111185,.497213,.25,-.069407,.349912,.46,.027775,.349912,.46,.027775,.497213,.25,-.069407,.318667,.46,.168166,.318667,.46,.168166,.497213,.25,-.069407,.497213,.25,.139407,.318667,.46,.168166,.497213,.25,.139407,.398734,.25,.327541,.318667,.46,.168166,.398734,.25,.327541,.224306,.46,.282182,.224306,.46,.282182,.398734,.25,.327541,.085519,.46,.34724,.085519,.46,.34724,.398734,.25,.327541,.221281,.25,.457735,.085519,.46,.34724,.221281,.25,.457735,0,.25,.5042,.085519,.46,.34724,0,.25,.5042,-.070206,.46,.350455,-.070206,.46,.350455,0,.25,.5042,-.212027,.46,.291191,-.212027,.46,.291191,0,.25,.5042,-.221281,.25,.457735,-.212027,.46,.291191,-.221281,.25,.457735,-.398734,.25,.327541,-.212027,.46,.291191,-.398734,.25,.327541,-.311852,.46,.181185,-.311852,.46,.181185,-.398734,.25,.327541,-.349912,.46,.042225,-.349912,.46,.042225,-.398734,.25,.327541,-.497213,.25,.139407,-.349912,.46,.042225,-.497213,.25,.139407,-.497213,.25,-.069407,-.349912,.46,.042225,-.497213,.25,-.069407,-.318667,.46,-.098166,-.318667,.46,-.098166,-.497213,.25,-.069407,-.224306,.46,-.212182,-.224306,.46,-.212182,-.497213,.25,-.069407,-.398734,.25,-.257541,-.224306,.46,-.212182,-.398734,.25,-.257541,-.221281,.25,-.387735,-.224306,.46,-.212182,-.221281,.25,-.387735,-.085519,.46,-.27724,-.085519,.46,-.27724,-.221281,.25,-.387735,.070206,.46,-.280455,.070206,.46,-.280455,-.221281,.25,-.387735,0,.25,-.4342,0,.25,-.4342,.107315,.248815,-.447196,.324098,.049593,-.356606,0,.25,-.4342,.324098,.049593,-.356606,.221281,.25,-.387735,.221281,.25,-.387735,.324098,.049593,-.356606,.398734,.25,-.257541,.398734,.25,-.257541,.324098,.049593,-.356606,.476689,-.087539,-.188454,.398734,.25,-.257541,.476689,-.087539,-.188454,.534865,-.1038,.023956,.398734,.25,-.257541,.534865,-.1038,.023956,.497213,.25,-.069407,.497213,.25,-.069407,.534865,-.1038,.023956,.497213,.25,.139407,.497213,.25,.139407,.534865,-.1038,.023956,.487105,-.1038,.238553,.497213,.25,.139407,.487105,-.1038,.238553,.342868,-.1038,.412835,.497213,.25,.139407,.342868,-.1038,.412835,.398734,.25,.327541,.398734,.25,.327541,.342868,-.1038,.412835,.221281,.25,.457735,.221281,.25,.457735,.342868,-.1038,.412835,.130722,-.1038,.512281,.221281,.25,.457735,.130722,-.1038,.512281,-.107315,-.1038,.517196,.221281,.25,.457735,-.107315,-.1038,.517196,0,.25,.5042,0,.25,.5042,-.107315,-.1038,.517196,-.221281,.25,.457735,-.221281,.25,.457735,-.107315,-.1038,.517196,-.324098,-.1038,.426606,-.221281,.25,.457735,-.324098,-.1038,.426606,-.476689,-.1038,.258454,-.221281,.25,.457735,-.476689,-.1038,.258454,-.398734,.25,.327541,-.398734,.25,.327541,-.476689,-.1038,.258454,-.497213,.25,.139407,-.497213,.25,.139407,-.476689,-.1038,.258454,-.534865,-.1038,.046044,-.497213,.25,.139407,-.534865,-.1038,.046044,-.487105,-.092603,-.168554,-.497213,.25,.139407,-.487105,-.092603,-.168554,-.497213,.25,-.069407,-.497213,.25,-.069407,-.487105,-.092603,-.168554,-.398734,.25,-.257541,-.398734,.25,-.257541,-.487105,-.092603,-.168554,-.342868,.029127,-.342835,-.398734,.25,-.257541,-.342868,.029127,-.342835,-.130722,.234656,-.442281,-.398734,.25,-.257541,-.130722,.234656,-.442281,-.221281,.25,-.387735,-.221281,.25,-.387735,-.130722,.234656,-.442281,0,.25,-.4342,0,.25,-.4342,-.130722,.234656,-.442281,.107315,.248815,-.447196,.107315,.248815,-.447196,0,.3,-.3836,.197417,.074894,-.342146,.107315,.248815,-.447196,.197417,.074894,-.342146,.324098,.049593,-.356606,.324098,.049593,-.356606,.197417,.074894,-.342146,.476689,-.087539,-.188454,.476689,-.087539,-.188454,.197417,.074894,-.342146,.355733,-.260262,-.225993,.476689,-.087539,-.188454,.355733,-.260262,-.225993,.443592,-.358382,-.058147,.476689,-.087539,-.188454,.443592,-.358382,-.058147,.534865,-.1038,.023956,.534865,-.1038,.023956,.443592,-.358382,-.058147,.487105,-.1038,.238553,.487105,-.1038,.238553,.443592,-.358382,-.058147,.443592,-.36,.128147,.487105,-.1038,.238553,.443592,-.36,.128147,.355733,-.36,.295993,.487105,-.1038,.238553,.355733,-.36,.295993,.342868,-.1038,.412835,.342868,-.1038,.412835,.355733,-.36,.295993,.130722,-.1038,.512281,.130722,-.1038,.512281,.355733,-.36,.295993,.197417,-.36,.412146,.130722,-.1038,.512281,.197417,-.36,.412146,0,-.36,.4536,.130722,-.1038,.512281,0,-.36,.4536,-.107315,-.1038,.517196,-.107315,-.1038,.517196,0,-.36,.4536,-.324098,-.1038,.426606,-.324098,-.1038,.426606,0,-.36,.4536,-.197417,-.36,.412146,-.324098,-.1038,.426606,-.197417,-.36,.412146,-.355733,-.36,.295993,-.324098,-.1038,.426606,-.355733,-.36,.295993,-.476689,-.1038,.258454,-.476689,-.1038,.258454,-.355733,-.36,.295993,-.534865,-.1038,.046044,-.534865,-.1038,.046044,-.355733,-.36,.295993,-.443592,-.36,.128147,-.534865,-.1038,.046044,-.443592,-.36,.128147,-.443592,-.358382,-.058147,-.534865,-.1038,.046044,-.443592,-.358382,-.058147,-.487105,-.092603,-.168554,-.487105,-.092603,-.168554,-.443592,-.358382,-.058147,-.342868,.029127,-.342835,-.342868,.029127,-.342835,-.443592,-.358382,-.058147,-.355733,-.260262,-.225993,-.342868,.029127,-.342835,-.355733,-.260262,-.225993,-.197417,.074894,-.342146,-.342868,.029127,-.342835,-.197417,.074894,-.342146,-.130722,.234656,-.442281,-.130722,.234656,-.442281,-.197417,.074894,-.342146,.107315,.248815,-.447196,.107315,.248815,-.447196,-.197417,.074894,-.342146,0,.3,-.3836,0,.553,.035,0,.55,-.0064,.019525,.55,-.0023,0,.553,.035,.019525,.55,-.0023,.035182,.55,.009188,0,.553,.035,.035182,.55,.009188,.043872,.55,.025788,0,.553,.035,.043872,.55,.025788,.043872,.55,.044212,0,.553,.035,.043872,.55,.044212,.035182,.55,.060812,0,.553,.035,.035182,.55,.060812,.019525,.55,.0723,0,.553,.035,.019525,.55,.0723,0,.55,.0764,0,.553,.035,0,.55,.0764,-.019525,.55,.0723,0,.553,.035,-.019525,.55,.0723,-.035182,.55,.060812,0,.553,.035,-.035182,.55,.060812,-.043872,.55,.044212,0,.553,.035,-.043872,.55,.044212,-.043872,.55,.025788,0,.553,.035,-.043872,.55,.025788,-.035182,.55,.009188,0,.553,.035,-.035182,.55,.009188,-.019525,.55,-.0023,0,.553,.035,-.019525,.55,-.0023,0,.55,-.0064],normals:[.118014,.952008,-.282408,.118014,.952008,-.282408,.118014,.952008,-.282408,.068688,.942487,-.327109,.068688,.942487,-.327109,.068688,.942487,-.327109,.175135,.955168,-.238709,.175135,.955168,-.238709,.175135,.955168,-.238709,.222449,.953818,-.201863,.222449,.953818,-.201863,.222449,.953818,-.201863,.278298,.957465,-.076223,.278298,.957465,-.076223,.278298,.957465,-.076223,.279962,.94876,-.146546,.279962,.94876,-.146546,.279962,.94876,-.146546,.282132,.959376,0,.282132,.959376,0,.282132,.959376,0,.284696,.956522,.063361,.284696,.956522,.063361,.284696,.956522,.063361,.22782,.955274,.188546,.22782,.955274,.188546,.22782,.955274,.188546,.279962,.94876,.146546,.279962,.94876,.146546,.279962,.94876,.146546,.175135,.955168,.238709,.175135,.955168,.238709,.175135,.955168,.238709,.131175,.951045,.279833,.131175,.951045,.279833,.131175,.951045,.279833,.006395,.95081,.309707,.006395,.95081,.309707,.006395,.95081,.309707,.068688,.942487,.327109,.068688,.942487,.327109,.068688,.942487,.327109,-.062354,.952857,.296945,-.062354,.952857,.296945,-.062354,.952857,.296945,-.119461,.950792,.285872,-.119461,.950792,.285872,-.119461,.950792,.285872,-.219736,.954963,.199401,-.219736,.954963,.199401,-.219736,.954963,.199401,-.193026,.945263,.263094,-.193026,.945263,.263094,-.193026,.945263,.263094,-.253847,.958074,.132877,-.253847,.958074,.132877,-.253847,.958074,.132877,-.281752,.956379,.077169,-.281752,.956379,.077169,-.281752,.956379,.077169,-.281205,.957605,-.062584,-.281205,.957605,-.062584,-.281205,.957605,-.062584,-.311248,.950329,0,-.311248,.950329,0,-.311248,.950329,0,-.253847,.958074,-.132877,-.253847,.958074,-.132877,-.253847,.958074,-.132877,-.230634,.954136,-.190875,-.230634,.954136,-.190875,-.230634,.954136,-.190875,-.129585,.952255,-.27644,-.129585,.952255,-.27644,-.129585,.952255,-.27644,-.193026,.945263,-.263094,-.193026,.945263,-.263094,-.193026,.945263,-.263094,-.062354,.952857,-.296945,-.062354,.952857,-.296945,-.062354,.952857,-.296945,-.006473,.949567,-.313497,-.006473,.949567,-.313497,-.006473,.949567,-.313497,.172476,.543683,-.821378,.172476,.543683,-.821378,.172476,.543683,-.821378,.308645,.599351,-.738591,.308645,.599351,-.738591,.308645,.599351,-.738591,.644588,.492297,-.584936,.644588,.492297,-.584936,.644588,.492297,-.584936,.460419,.627849,-.627551,.460419,.627849,-.627551,.460419,.627849,-.627551,.729302,.567787,-.381754,.729302,.567787,-.381754,.729302,.567787,-.381754,.753585,.624106,-.206399,.753585,.624106,-.206399,.753585,.624106,-.206399,.84285,.504398,.187581,.84285,.504398,.187581,.84285,.504398,.187581,.761857,.647745,0,.761857,.647745,0,.761857,.647745,0,.729302,.567787,.381754,.729302,.567787,.381754,.729302,.567787,.381754,.608156,.613855,.503317,.608156,.613855,.503317,.608156,.613855,.503317,.372199,.480655,.794002,.372199,.480655,.794002,.372199,.480655,.794002,.460419,.627849,.627551,.460419,.627849,.627551,.460419,.627849,.627551,.172476,.543683,.821378,.172476,.543683,.821378,.172476,.543683,.821378,.016603,.594252,.804108,.016603,.594252,.804108,.016603,.594252,.804108,-.338328,.47963,.809623,-.338328,.47963,.809623,-.338328,.47963,.809623,-.161631,.617568,.76973,-.161631,.617568,.76973,-.161631,.617568,.76973,-.49246,.554024,.671223,-.49246,.554024,.671223,-.49246,.554024,.671223,-.585413,.612437,.531237,-.585413,.612437,.531237,-.585413,.612437,.531237,-.83317,.50374,.228196,-.83317,.50374,.228196,-.83317,.50374,.228196,-.679703,.641417,.355791,-.679703,.641417,.355791,-.679703,.641417,.355791,-.81868,.574251,0,-.81868,.574251,0,-.81868,.574251,0,-.762159,.624773,-.169622,-.762159,.624773,-.169622,-.762159,.624773,-.169622,-.66996,.49368,-.554466,-.66996,.49368,-.554466,-.66996,.49368,-.554466,-.679703,.641417,-.355791,-.679703,.641417,-.355791,-.679703,.641417,-.355791,-.49246,.554024,-.671223,-.49246,.554024,-.671223,-.49246,.554024,-.671223,-.339422,.600416,-.72408,-.339422,.600416,-.72408,-.339422,.600416,-.72408,-.018169,.474739,-.879939,-.018169,.474739,-.879939,-.018169,.474739,-.879939,-.161631,.617568,-.76973,-.161631,.617568,-.76973,-.161631,.617568,-.76973,.109118,.507413,.854766,.109118,.507413,.854766,.109118,.507413,.854766,.20528,-.046528,-.977597,.20528,-.046528,-.977597,.20528,-.046528,-.977597,.582364,.175485,-.793762,.582364,.175485,-.793762,.582364,.175485,-.793762,.756349,.041048,-.652879,.756349,.041048,-.652879,.756349,.041048,-.652879,.953759,.169458,-.248251,.953759,.169458,-.248251,.953759,.169458,-.248251,.885613,-.028082,-.463575,.885613,-.028082,-.463575,.885613,-.028082,-.463575,.994385,.105824,0,.994385,.105824,0,.994385,.105824,0,.975587,.032973,.217122,.975587,.032973,.217122,.975587,.032973,.217122,.761102,.154774,.629896,.761102,.154774,.629896,.761102,.154774,.629896,.885613,-.028082,.463575,.885613,-.028082,.463575,.885613,-.028082,.463575,.588551,.100458,.802195,.588551,.100458,.802195,.588551,.100458,.802195,.424241,.030942,.905021,.424241,.030942,.905021,.424241,.030942,.905021,.020419,.147234,.988891,.020419,.147234,.988891,.020419,.147234,.988891,.205431,-.026375,.978316,.205431,-.026375,.978316,.205431,-.026375,.978316,-.204517,.097811,.973964,-.204517,.097811,.973964,-.204517,.097811,.973964,-.385388,.030856,.922238,-.385388,.030856,.922238,-.385388,.030856,.922238,-.731683,.154215,.663971,-.731683,.154215,.663971,-.731683,.154215,.663971,-.591326,-.027095,.805977,-.591326,-.027095,.805977,-.591326,-.027095,.805977,-.88115,.104081,.461239,-.88115,.104081,.461239,-.88115,.104081,.461239,-.963956,.032916,.264017,-.963956,.032916,.264017,-.963956,.032916,.264017,-.965673,.157316,-.206707,-.965673,.157316,-.206707,-.965673,.157316,-.206707,-.999565,-.02949,0,-.999565,-.02949,0,-.999565,-.02949,0,-.880833,.107444,-.461073,-.880833,.107444,-.461073,-.880833,.107444,-.461073,-.783659,.041144,-.619827,-.783659,.041144,-.619827,-.783659,.041144,-.619827,-.551932,.175228,-.815271,-.551932,.175228,-.815271,-.551932,.175228,-.815271,-.501626,-.530002,-.683717,-.501626,-.530002,-.683717,-.501626,-.530002,-.683717,-.082962,.91489,-.395086,-.082962,.91489,-.395086,-.082962,.91489,-.395086,-.060435,.816953,-.573529,-.060435,.816953,-.573529,-.060435,.816953,-.573529,-.59752,-.618091,-.510817,-.59752,-.618091,-.510817,-.59752,-.618091,-.510817,-.206028,-.581921,-.786715,-.206028,-.581921,-.786715,-.206028,-.581921,-.786715,-.224187,-.844934,-.485619,-.224187,-.844934,-.485619,-.224187,-.844934,-.485619,.430884,-.107,-.896041,.430884,-.107,-.896041,.430884,-.107,-.896041,.715042,-.372109,-.591819,.715042,-.372109,-.591819,.715042,-.372109,-.591819,.930078,-.245245,-.273513,.930078,-.245245,-.273513,.930078,-.245245,-.273513,.899957,-.387248,.20029,.899957,-.387248,.20029,.899957,-.387248,.20029,.985984,-.166836,-.001449,.985984,-.166836,-.001449,.985984,-.166836,-.001449,.836138,-.330622,.437677,.836138,-.330622,.437677,.836138,-.330622,.437677,.747015,-.244441,.618237,.747015,-.244441,.618237,.747015,-.244441,.618237,.395217,-.364659,.843106,.395217,-.364659,.843106,.395217,-.364659,.843106,.58401,-.159087,.796005,.58401,-.159087,.796005,.58401,-.159087,.796005,.195208,-.312529,.929634,.195208,-.312529,.929634,.195208,-.312529,.929634,.020076,-.23294,.972284,.020076,-.23294,.972284,.020076,-.23294,.972284,-.359154,-.363783,.859459,-.359154,-.363783,.859459,-.359154,-.363783,.859459,-.20302,-.154957,.966836,-.20302,-.154957,.966836,-.20302,-.154957,.966836,-.560397,-.320207,.763821,-.560397,-.320207,.763821,-.560397,-.320207,.763821,-.718236,-.24359,.651768,-.718236,-.24359,.651768,-.718236,-.24359,.651768,-.890297,-.384592,.243843,-.890297,-.384592,.243843,-.890297,-.384592,.243843,-.873859,-.164731,.457422,-.873859,-.164731,.457422,-.873859,-.164731,.457422,-.941705,-.336426,-.002922,-.941705,-.336426,-.002922,-.941705,-.336426,-.002922,-.943076,-.246941,-.222772,-.943076,-.246941,-.222772,-.943076,-.246941,-.222772,-.552828,-.395248,-.733594,-.552828,-.395248,-.733594,-.552828,-.395248,-.733594,-.824304,-.18007,-.536748,-.824304,-.18007,-.536748,-.824304,-.18007,-.536748,.122738,-.376246,-.918354,.122738,-.376246,-.918354,.122738,-.376246,-.918354,.185081,-.576219,-.796063,.185081,-.576219,-.796063,.185081,-.576219,-.796063,.014404,-.535336,-.844516,.014404,-.535336,-.844516,.014404,-.535336,-.844516,.423041,-.208623,.881767,.423041,-.208623,.881767,.423041,-.208623,.881767,.015174,.99727,-.072265,.015174,.99727,-.072265,.015174,.99727,-.072265,.042524,.997413,-.05796,.042524,.997413,-.05796,.042524,.997413,-.05796,.06146,.997591,-.032171,.06146,.997591,-.032171,.06146,.997591,-.032171,.068221,.99767,0,.068221,.99767,0,.068221,.99767,0,.06146,.997591,.032171,.06146,.997591,.032171,.06146,.997591,.032171,.042524,.997413,.05796,.042524,.997413,.05796,.042524,.997413,.05796,.015174,.99727,.072265,.015174,.99727,.072265,.015174,.99727,.072265,-.015174,.99727,.072265,-.015174,.99727,.072265,-.015174,.99727,.072265,-.042524,.997413,.05796,-.042524,.997413,.05796,-.042524,.997413,.05796,-.06146,.997591,.032171,-.06146,.997591,.032171,-.06146,.997591,.032171,-.068221,.99767,0,-.068221,.99767,0,-.068221,.99767,0,-.06146,.997591,-.032171,-.06146,.997591,-.032171,-.06146,.997591,-.032171,-.042524,.997413,-.05796,-.042524,.997413,-.05796,-.042524,.997413,-.05796,-.015174,.99727,-.072265,-.015174,.99727,-.072265,-.015174,.99727,-.072265],triangles:[0,2,1,3,5,4,6,8,7,9,11,10,12,14,13,15,17,16,18,20,19,21,23,22,24,26,25,27,29,28,30,32,31,33,35,34,36,38,37,39,41,40,42,44,43,45,47,46,48,50,49,51,53,52,54,56,55,57,59,58,60,62,61,63,65,64,66,68,67,69,71,70,72,74,73,75,77,76,78,80,79,81,83,82,84,86,85,87,89,88,90,92,91,93,95,94,96,98,97,99,101,100,102,104,103,105,107,106,108,110,109,111,113,112,114,116,115,117,119,118,120,122,121,123,125,124,126,128,127,129,131,130,132,134,133,135,137,136,138,140,139,141,143,142,144,146,145,147,149,148,150,152,151,153,155,154,156,158,157,159,161,160,162,164,163,165,167,166,168,170,169,171,173,172,174,176,175,177,179,178,180,182,181,183,185,184,186,188,187,189,191,190,192,194,193,195,197,196,198,200,199,201,203,202,204,206,205,207,209,208,210,212,211,213,215,214,216,218,217,219,221,220,222,224,223,225,227,226,228,230,229,231,233,232,234,236,235,237,239,238,240,242,241,243,245,244,246,248,247,249,251,250,252,254,253,255,257,256,258,260,259,261,263,262,264,266,265,267,269,268,270,272,271,273,275,274,276,278,277,279,281,280,282,284,283,285,287,286,288,290,289,291,293,292,294,296,295,297,299,298,300,302,301,303,305,304,306,308,307,309,311,310,312,314,313,315,317,316,318,320,319,321,323,322,324,326,325,327,329,328,330,332,331,333,335,334,336,338,337,339,341,340,342,344,343,345,347,346,348,350,349,351,353,352,354,356,355,357,359,358,360,362,361,363,365,364,366,368,367,369,371,370,372,374,373,375,377,376]},{positions:[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,-.309017,.951057,0,-.285494,.951057,-.118256,-.218508,.951057,-.218508,-.118256,.951057,-.285494,0,.951057,-.309017,.118256,.951057,-.285494,.218508,.951057,-.218508,.285494,.951057,-.118256,.309017,.951057,0,.285494,.951057,.118256,.218508,.951057,.218508,.118256,.951057,.285494,0,.951057,.309017,-.118256,.951057,.285494,-.218508,.951057,.218508,-.285494,.951057,.118256,-.309017,.951057,0,-.587785,.809017,0,-.543043,.809017,-.224936,-.415627,.809017,-.415627,-.224936,.809017,-.543043,0,.809017,-.587785,.224936,.809017,-.543043,.415627,.809017,-.415627,.543043,.809017,-.224936,.587785,.809017,0,.543043,.809017,.224936,.415627,.809017,.415627,.224936,.809017,.543043,0,.809017,.587785,-.224936,.809017,.543043,-.415627,.809017,.415627,-.543043,.809017,.224936,-.587785,.809017,0,-.809017,.587785,0,-.747434,.587785,-.309597,-.572061,.587785,-.572061,-.309597,.587785,-.747434,0,.587785,-.809017,.309597,.587785,-.747434,.572061,.587785,-.572061,.747434,.587785,-.309597,.809017,.587785,0,.747434,.587785,.309597,.572061,.587785,.572061,.309597,.587785,.747434,0,.587785,.809017,-.309597,.587785,.747434,-.572061,.587785,.572061,-.747434,.587785,.309597,-.809017,.587785,0,-.951057,.309017,0,-.878662,.309017,-.363954,-.672499,.309017,-.672499,-.363954,.309017,-.878662,0,.309017,-.951057,.363954,.309017,-.878662,.672499,.309017,-.672499,.878662,.309017,-.363954,.951057,.309017,0,.878662,.309017,.363954,.672499,.309017,.672499,.363954,.309017,.878662,0,.309017,.951057,-.363954,.309017,.878662,-.672499,.309017,.672499,-.878662,.309017,.363954,-.951057,.309017,0,-1,0,0,-.92388,0,-.382683,-.707107,0,-.707107,-.382683,0,-.92388,0,0,-1,.382683,0,-.92388,.707107,0,-.707107,.92388,0,-.382683,1,0,0,.92388,0,.382683,.707107,0,.707107,.382683,0,.92388,0,0,1,-.382683,0,.92388,-.707107,0,.707107,-.92388,0,.382683,-1,0,0,-.951057,-.309017,0,-.878662,-.309017,-.363954,-.672499,-.309017,-.672499,-.363954,-.309017,-.878662,0,-.309017,-.951057,.363954,-.309017,-.878662,.672499,-.309017,-.672499,.878662,-.309017,-.363954,.951057,-.309017,0,.878662,-.309017,.363954,.672499,-.309017,.672499,.363954,-.309017,.878662,0,-.309017,.951057,-.363954,-.309017,.878662,-.672499,-.309017,.672499,-.878662,-.309017,.363954,-.951057,-.309017,0,-.809017,-.587785,0,-.747434,-.587785,-.309597,-.572061,-.587785,-.572061,-.309597,-.587785,-.747434,0,-.587785,-.809017,.309597,-.587785,-.747434,.572061,-.587785,-.572061,.747434,-.587785,-.309597,.809017,-.587785,0,.747434,-.587785,.309597,.572061,-.587785,.572061,.309597,-.587785,.747434,0,-.587785,.809017,-.309597,-.587785,.747434,-.572061,-.587785,.572061,-.747434,-.587785,.309597,-.809017,-.587785,0,-.587785,-.809017,0,-.543043,-.809017,-.224936,-.415627,-.809017,-.415627,-.224936,-.809017,-.543043,0,-.809017,-.587785,.224936,-.809017,-.543043,.415627,-.809017,-.415627,.543043,-.809017,-.224936,.587785,-.809017,0,.543043,-.809017,.224936,.415627,-.809017,.415627,.224936,-.809017,.543043,0,-.809017,.587785,-.224936,-.809017,.543043,-.415627,-.809017,.415627,-.543043,-.809017,.224936,-.587785,-.809017,0,-.309017,-.951057,0,-.285494,-.951057,-.118256,-.218508,-.951057,-.218508,-.118256,-.951057,-.285494,0,-.951057,-.309017,.118256,-.951057,-.285494,.218508,-.951057,-.218508,.285494,-.951057,-.118256,.309017,-.951057,0,.285494,-.951057,.118256,.218508,-.951057,.218508,.118256,-.951057,.285494,0,-.951057,.309017,-.118256,-.951057,.285494,-.218508,-.951057,.218508,-.285494,-.951057,.118256,-.309017,-.951057,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0],normals:[0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,-.309017,.951057,0,-.285494,.951057,-.118256,-.218508,.951057,-.218508,-.118256,.951057,-.285494,0,.951057,-.309017,.118256,.951057,-.285494,.218508,.951057,-.218508,.285494,.951057,-.118256,.309017,.951057,0,.285494,.951057,.118256,.218508,.951057,.218508,.118256,.951057,.285494,0,.951057,.309017,-.118256,.951057,.285494,-.218508,.951057,.218508,-.285494,.951057,.118256,-.309017,.951057,0,-.587785,.809017,0,-.543043,.809017,-.224936,-.415627,.809017,-.415627,-.224936,.809017,-.543043,0,.809017,-.587785,.224936,.809017,-.543043,.415627,.809017,-.415627,.543043,.809017,-.224936,.587785,.809017,0,.543043,.809017,.224936,.415627,.809017,.415627,.224936,.809017,.543043,0,.809017,.587785,-.224936,.809017,.543043,-.415627,.809017,.415627,-.543043,.809017,.224936,-.587785,.809017,0,-.809017,.587785,0,-.747434,.587785,-.309597,-.572061,.587785,-.572061,-.309597,.587785,-.747434,0,.587785,-.809017,.309597,.587785,-.747434,.572061,.587785,-.572061,.747434,.587785,-.309597,.809017,.587785,0,.747434,.587785,.309597,.572061,.587785,.572061,.309597,.587785,.747434,0,.587785,.809017,-.309597,.587785,.747434,-.572061,.587785,.572061,-.747434,.587785,.309597,-.809017,.587785,0,-.951057,.309017,0,-.878662,.309017,-.363954,-.672499,.309017,-.672499,-.363954,.309017,-.878662,0,.309017,-.951057,.363954,.309017,-.878662,.672499,.309017,-.672499,.878662,.309017,-.363954,.951057,.309017,0,.878662,.309017,.363954,.672499,.309017,.672499,.363954,.309017,.878662,0,.309017,.951057,-.363954,.309017,.878662,-.672499,.309017,.672499,-.878662,.309017,.363954,-.951057,.309017,0,-1,0,0,-.92388,0,-.382683,-.707107,0,-.707107,-.382683,0,-.92388,0,0,-1,.382683,0,-.92388,.707107,0,-.707107,.92388,0,-.382683,1,0,0,.92388,0,.382683,.707107,0,.707107,.382683,0,.92388,0,0,1,-.382683,0,.92388,-.707107,0,.707107,-.92388,0,.382683,-1,0,0,-.951057,-.309017,0,-.878662,-.309017,-.363954,-.672499,-.309017,-.672499,-.363954,-.309017,-.878662,0,-.309017,-.951057,.363954,-.309017,-.878662,.672499,-.309017,-.672499,.878662,-.309017,-.363954,.951057,-.309017,0,.878662,-.309017,.363954,.672499,-.309017,.672499,.363954,-.309017,.878662,0,-.309017,.951057,-.363954,-.309017,.878662,-.672499,-.309017,.672499,-.878662,-.309017,.363954,-.951057,-.309017,0,-.809017,-.587785,0,-.747434,-.587785,-.309597,-.572061,-.587785,-.572061,-.309597,-.587785,-.747434,0,-.587785,-.809017,.309597,-.587785,-.747434,.572061,-.587785,-.572061,.747434,-.587785,-.309597,.809017,-.587785,0,.747434,-.587785,.309597,.572061,-.587785,.572061,.309597,-.587785,.747434,0,-.587785,.809017,-.309597,-.587785,.747434,-.572061,-.587785,.572061,-.747434,-.587785,.309597,-.809017,-.587785,0,-.587785,-.809017,0,-.543043,-.809017,-.224936,-.415627,-.809017,-.415627,-.224936,-.809017,-.543043,0,-.809017,-.587785,.224936,-.809017,-.543043,.415627,-.809017,-.415627,.543043,-.809017,-.224936,.587785,-.809017,0,.543043,-.809017,.224936,.415627,-.809017,.415627,.224936,-.809017,.543043,0,-.809017,.587785,-.224936,-.809017,.543043,-.415627,-.809017,.415627,-.543043,-.809017,.224936,-.587785,-.809017,0,-.309017,-.951057,0,-.285494,-.951057,-.118256,-.218508,-.951057,-.218508,-.118256,-.951057,-.285494,0,-.951057,-.309017,.118256,-.951057,-.285494,.218508,-.951057,-.218508,.285494,-.951057,-.118256,.309017,-.951057,0,.285494,-.951057,.118256,.218508,-.951057,.218508,.118256,-.951057,.285494,0,-.951057,.309017,-.118256,-.951057,.285494,-.218508,-.951057,.218508,-.285494,-.951057,.118256,-.309017,-.951057,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0],triangles:[0,18,17,1,19,18,2,20,19,3,21,20,4,22,21,5,23,22,6,24,23,7,25,24,8,26,25,9,27,26,10,28,27,11,29,28,12,30,29,13,31,30,14,32,31,15,33,32,18,35,17,17,35,34,19,36,18,18,36,35,20,37,19,19,37,36,21,38,20,20,38,37,22,39,21,21,39,38,23,40,22,22,40,39,24,41,23,23,41,40,25,42,24,24,42,41,26,43,25,25,43,42,27,44,26,26,44,43,28,45,27,27,45,44,29,46,28,28,46,45,30,47,29,29,47,46,31,48,30,30,48,47,32,49,31,31,49,48,33,50,32,32,50,49,35,52,34,34,52,51,36,53,35,35,53,52,37,54,36,36,54,53,38,55,37,37,55,54,39,56,38,38,56,55,40,57,39,39,57,56,41,58,40,40,58,57,42,59,41,41,59,58,43,60,42,42,60,59,44,61,43,43,61,60,45,62,44,44,62,61,46,63,45,45,63,62,47,64,46,46,64,63,48,65,47,47,65,64,49,66,48,48,66,65,50,67,49,49,67,66,52,69,51,51,69,68,53,70,52,52,70,69,54,71,53,53,71,70,55,72,54,54,72,71,56,73,55,55,73,72,57,74,56,56,74,73,58,75,57,57,75,74,59,76,58,58,76,75,60,77,59,59,77,76,61,78,60,60,78,77,62,79,61,61,79,78,63,80,62,62,80,79,64,81,63,63,81,80,65,82,64,64,82,81,66,83,65,65,83,82,67,84,66,66,84,83,69,86,68,68,86,85,70,87,69,69,87,86,71,88,70,70,88,87,72,89,71,71,89,88,73,90,72,72,90,89,74,91,73,73,91,90,75,92,74,74,92,91,76,93,75,75,93,92,77,94,76,76,94,93,78,95,77,77,95,94,79,96,78,78,96,95,80,97,79,79,97,96,81,98,80,80,98,97,82,99,81,81,99,98,83,100,82,82,100,99,84,101,83,83,101,100,86,103,85,85,103,102,87,104,86,86,104,103,88,105,87,87,105,104,89,106,88,88,106,105,90,107,89,89,107,106,91,108,90,90,108,107,92,109,91,91,109,108,93,110,92,92,110,109,94,111,93,93,111,110,95,112,94,94,112,111,96,113,95,95,113,112,97,114,96,96,114,113,98,115,97,97,115,114,99,116,98,98,116,115,100,117,99,99,117,116,101,118,100,100,118,117,103,120,102,102,120,119,104,121,103,103,121,120,105,122,104,104,122,121,106,123,105,105,123,122,107,124,106,106,124,123,108,125,107,107,125,124,109,126,108,108,126,125,110,127,109,109,127,126,111,128,110,110,128,127,112,129,111,111,129,128,113,130,112,112,130,129,114,131,113,113,131,130,115,132,114,114,132,131,116,133,115,115,133,132,117,134,116,116,134,133,118,135,117,117,135,134,120,137,119,119,137,136,121,138,120,120,138,137,122,139,121,121,139,138,123,140,122,122,140,139,124,141,123,123,141,140,125,142,124,124,142,141,126,143,125,125,143,142,127,144,126,126,144,143,128,145,127,127,145,144,129,146,128,128,146,145,130,147,129,129,147,146,131,148,130,130,148,147,132,149,131,131,149,148,133,150,132,132,150,149,134,151,133,133,151,150,135,152,134,134,152,151,137,154,136,136,154,153,138,155,137,137,155,154,139,156,138,138,156,155,140,157,139,139,157,156,141,158,140,140,158,157,142,159,141,141,159,158,143,160,142,142,160,159,144,161,143,143,161,160,145,162,144,144,162,161,146,163,145,145,163,162,147,164,146,146,164,163,148,165,147,147,165,164,149,166,148,148,166,165,150,167,149,149,167,166,151,168,150,150,168,167,152,169,151,151,169,168,154,171,153,155,172,154,156,173,155,157,174,156,158,175,157,159,176,158,160,177,159,161,178,160,162,179,161,163,180,162,164,181,163,165,182,164,166,183,165,167,184,166,168,185,167,169,186,168]},{positions:[-.116432,-.204128,-.355882,-.108761,-.194749,-.344,-.113568,-.205872,-.332118,-.121239,-.215251,-.344,-.116432,-.204128,-.355882,-.095021,-.215959,-.359094,-.088443,-.205978,-.347048,-.092564,-.217478,-.335268,-.099143,-.227459,-.347314,-.095021,-.215959,-.359094,-.07252,-.225804,-.361766,-.067267,-.215245,-.349563,-.070558,-.227107,-.337882,-.075811,-.237667,-.350084,-.07252,-.225804,-.361766,-.049017,-.23326,-.363789,-.045333,-.222205,-.351452,-.047642,-.234377,-.339855,-.051326,-.245432,-.352192,-.049017,-.23326,-.363789,-.024728,-.237933,-.365058,-.022823,-.226537,-.352628,-.024017,-.238923,-.341089,-.025922,-.250319,-.353519,-.024728,-.237933,-.365058,0,-.239528,-.365491,0,-.228009,-.353028,0,-.240472,-.341509,0,-.251991,-.353972,0,-.239528,-.365491,.024728,-.237933,-.365058,.022823,-.226537,-.352628,.024017,-.238923,-.341089,.025922,-.250319,-.353519,.024728,-.237933,-.365058,.049017,-.23326,-.363789,.045333,-.222205,-.351452,.047642,-.234377,-.339855,.051326,-.245432,-.352192,.049017,-.23326,-.363789,.07252,-.225804,-.361766,.067267,-.215245,-.349563,.070558,-.227107,-.337882,.075811,-.237667,-.350084,.07252,-.225804,-.361766,.095021,-.215959,-.359094,.088443,-.205978,-.347048,.092564,-.217478,-.335268,.099143,-.227459,-.347314,.095021,-.215959,-.359094,.116432,-.204128,-.355882,.108761,-.194749,-.344,.113568,-.205872,-.332118,.121239,-.215251,-.344,.116432,-.204128,-.355882],normals:[-.119364,.072649,-.990189,.519909,.854222,0,.119364,-.072649,.990189,-.519909,-.854222,0,-.119364,.072649,-.990189,-.102357,.063276,-.992733,.445835,.895047,.011081,.102357,-.063276,.992733,-.445835,-.895047,-.011081,-.102357,.063276,-.992733,-.081729,.054278,-.995175,.355987,.934238,.021719,.081729,-.054278,.995175,-.355987,-.934238,-.021719,-.081729,.054278,-.995175,-.057332,.046567,-.997269,.249719,.967827,.030836,.057332,-.046567,.997269,-.249719,-.967827,-.030836,-.057332,.046567,-.997269,-.029647,.041262,-.998708,.129133,.990933,.037107,.029647,-.041262,.998708,-.129133,-.990933,-.037107,-.029647,.041262,-.998708,0,.039358,-.999225,0,.999225,.039358,0,-.039358,.999225,0,-.999225,-.039358,0,.039358,-.999225,.029647,.041262,-.998708,-.129133,.990933,.037107,-.029647,-.041262,.998708,.129133,-.990933,-.037107,.029647,.041262,-.998708,.057332,.046567,-.997269,-.249719,.967827,.030836,-.057332,-.046567,.997269,.249719,-.967827,-.030836,.057332,.046567,-.997269,.081729,.054278,-.995175,-.355987,.934238,.021719,-.081729,-.054278,.995175,.355987,-.934238,-.021719,.081729,.054278,-.995175,.102357,.063276,-.992733,-.445835,.895047,.011081,-.102357,-.063276,.992733,.445835,-.895047,-.011081,.102357,.063276,-.992733,.119364,.072649,-.990189,-.519909,.854222,0,-.119364,-.072649,.990189,.519909,-.854222,0,.119364,.072649,-.990189],triangles:[0,1,5,5,1,6,1,2,6,6,2,7,2,3,7,7,3,8,3,4,8,8,4,9,5,6,10,10,6,11,6,7,11,11,7,12,7,8,12,12,8,13,8,9,13,13,9,14,10,11,15,15,11,16,11,12,16,16,12,17,12,13,17,17,13,18,13,14,18,18,14,19,15,16,20,20,16,21,16,17,21,21,17,22,17,18,22,22,18,23,18,19,23,23,19,24,20,21,25,25,21,26,21,22,26,26,22,27,22,23,27,27,23,28,23,24,28,28,24,29,25,26,30,30,26,31,26,27,31,31,27,32,27,28,32,32,28,33,28,29,33,33,29,34,30,31,35,35,31,36,31,32,36,36,32,37,32,33,37,37,33,38,33,34,38,38,34,39,35,36,40,40,36,41,36,37,41,41,37,42,37,38,42,42,38,43,38,39,43,43,39,44,40,41,45,45,41,46,41,42,46,46,42,47,42,43,47,47,43,48,43,44,48,48,44,49,45,46,50,50,46,51,46,47,51,51,47,52,47,48,52,52,48,53,48,49,53,53,49,54]}],materials:[{hex:`d9543e`,flat:!0},{hex:`f2bb83`,flat:!0},{hex:`32658a`,flat:!0},{hex:`c68a22`,flat:!0},{hex:`f3bc31`,flat:!0},{hex:`754022`,flat:!0},{hex:`824a28`,flat:!0},{hex:`fff7e8`,flat:!0},{hex:`78421e`,flat:!0},{hex:`302218`,flat:!0},{hex:`6286a2`,flat:!0},{hex:`724626`,flat:!0},{hex:`49321f`,flat:!0}],nodes:[{name:`farmer-concept-c`,parent:-1,position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:-1,material:-1},{name:`body`,parent:0,position:[0,.73,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:-1,material:-1},{name:`left-arm`,parent:1,position:[-.34,.45,0],rotation:[0,0,-.064954,.997888],scale:[1,1,1],geometry:-1,material:-1},{name:`part-3`,parent:2,position:[-.045,-.09,0],rotation:[0,0,0,1],scale:[.15,.185,.17],geometry:0,material:0},{name:`part-4`,parent:2,position:[-.065,-.3,-.005],rotation:[0,0,0,1],scale:[.095,.18,.105],geometry:0,material:1},{name:`part-5`,parent:2,position:[-.08,-.46,-.02],rotation:[0,0,0,1],scale:[.108,.12,.1],geometry:0,material:1},{name:`part-6`,parent:2,position:[-.005,-.435,-.085],rotation:[0,0,0,1],scale:[.06,.075,.065],geometry:1,material:1},{name:`right-arm`,parent:1,position:[.34,.45,0],rotation:[0,0,.064954,.997888],scale:[1,1,1],geometry:-1,material:-1},{name:`part-8`,parent:7,position:[.045,-.09,0],rotation:[0,0,0,1],scale:[.15,.185,.17],geometry:0,material:0},{name:`part-9`,parent:7,position:[.065,-.3,-.005],rotation:[0,0,0,1],scale:[.095,.18,.105],geometry:0,material:1},{name:`part-10`,parent:7,position:[.08,-.46,-.02],rotation:[0,0,0,1],scale:[.108,.12,.1],geometry:0,material:1},{name:`part-11`,parent:7,position:[.005,-.435,-.085],rotation:[0,0,0,1],scale:[.06,.075,.065],geometry:1,material:1},{name:`part-12`,parent:1,position:[0,.35,0],rotation:[0,0,0,1],scale:[.36,.285,.24],geometry:0,material:0},{name:`part-13`,parent:1,position:[0,.12,0],rotation:[0,0,0,1],scale:[.34,.25,.255],geometry:0,material:2},{name:`part-14`,parent:1,position:[0,.29,-.228],rotation:[0,0,0,1],scale:[.4,.32,.035],geometry:2,material:2},{name:`part-15`,parent:1,position:[0,.245,-.257],rotation:[0,0,0,1],scale:[.14,.115,.035],geometry:0,material:2},{name:`part-16`,parent:1,position:[-.195,.435,-.191],rotation:[.17903,0,0,.983844],scale:[.066,.26,.045],geometry:2,material:2},{name:`part-17`,parent:1,position:[-.195,.375,-.252],rotation:[0,0,0,1],scale:[.041,.041,.023],geometry:1,material:3},{name:`part-18`,parent:1,position:[-.273,.425,-.117],rotation:[.20846,0,0,.978031],scale:[.047,.29,.043],geometry:2,material:4},{name:`part-19`,parent:1,position:[-.18,.405,.212],rotation:[0,0,0,1],scale:[.06,.23,.045],geometry:2,material:2},{name:`part-20`,parent:1,position:[.195,.435,-.191],rotation:[.17903,0,0,.983844],scale:[.066,.26,.045],geometry:2,material:2},{name:`part-21`,parent:1,position:[.195,.375,-.252],rotation:[0,0,0,1],scale:[.041,.041,.023],geometry:1,material:3},{name:`part-22`,parent:1,position:[.273,.425,-.117],rotation:[.20846,0,0,.978031],scale:[.047,.29,.043],geometry:2,material:4},{name:`part-23`,parent:1,position:[.18,.405,.212],rotation:[0,0,0,1],scale:[.06,.23,.045],geometry:2,material:2},{name:`backpack`,parent:1,position:[0,.24,.3],rotation:[0,0,0,1],scale:[1,1,1],geometry:-1,material:-1},{name:`part-25`,parent:24,position:[0,0,.015],rotation:[0,0,0,1],scale:[.29,.32,.17],geometry:0,material:4},{name:`part-26`,parent:24,position:[0,.14,.145],rotation:[0,0,0,1],scale:[.275,.16,.065],geometry:0,material:4},{name:`part-27`,parent:24,position:[0,-.065,.175],rotation:[0,0,0,1],scale:[.065,.105,.022],geometry:2,material:3},{name:`part-28`,parent:24,position:[-.072,.3,0],rotation:[0,0,0,1],scale:[.032,.095,.037],geometry:2,material:3},{name:`part-29`,parent:24,position:[.072,.3,0],rotation:[0,0,0,1],scale:[.032,.095,.037],geometry:2,material:3},{name:`part-30`,parent:24,position:[0,.34,0],rotation:[0,0,0,1],scale:[.17,.035,.04],geometry:2,material:4},{name:`part-31`,parent:1,position:[0,.57,0],rotation:[0,0,0,1],scale:[.115,.12,.12],geometry:0,material:1},{name:`head`,parent:1,position:[0,.97,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:-1,material:-1},{name:`part-33`,parent:32,position:[0,0,0],rotation:[0,0,0,1],scale:[.46,.45,.46],geometry:3,material:1},{name:`part-34`,parent:32,position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:4,material:5},{name:`part-35`,parent:32,position:[-.155,.31,-.315],rotation:[0,0,.159318,.987227],scale:[.31,.145,.15],geometry:0,material:6},{name:`part-36`,parent:32,position:[.255,.285,-.29],rotation:[0,0,-.237703,.971338],scale:[.2,.145,.15],geometry:0,material:5},{name:`part-37`,parent:32,position:[-.445,-.115,-.03],rotation:[0,0,0,1],scale:[.105,.265,.2],geometry:0,material:5},{name:`part-38`,parent:32,position:[-.175,.015,-.354],rotation:[0,0,0,1],scale:[.112,.126,.027],geometry:5,material:7},{name:`part-39`,parent:32,position:[-.17,.012,-.378],rotation:[0,0,0,1],scale:[.073,.093,.019],geometry:5,material:8},{name:`part-40`,parent:32,position:[-.17,.012,-.394],rotation:[0,0,0,1],scale:[.043,.063,.01],geometry:5,material:9},{name:`part-41`,parent:32,position:[-.19,.05,-.404],rotation:[0,0,0,1],scale:[.023,.026,.008],geometry:5,material:7},{name:`part-42`,parent:32,position:[-.18,.18,-.345],rotation:[0,0,.044985,.998988],scale:[.105,.026,.025],geometry:0,material:5},{name:`part-43`,parent:32,position:[.445,-.115,-.03],rotation:[0,0,0,1],scale:[.105,.265,.2],geometry:0,material:5},{name:`part-44`,parent:32,position:[.175,.015,-.354],rotation:[0,0,0,1],scale:[.112,.126,.027],geometry:5,material:7},{name:`part-45`,parent:32,position:[.17,.012,-.378],rotation:[0,0,0,1],scale:[.073,.093,.019],geometry:5,material:8},{name:`part-46`,parent:32,position:[.17,.012,-.394],rotation:[0,0,0,1],scale:[.043,.063,.01],geometry:5,material:9},{name:`part-47`,parent:32,position:[.15,.05,-.404],rotation:[0,0,0,1],scale:[.023,.026,.008],geometry:5,material:7},{name:`part-48`,parent:32,position:[.18,.18,-.345],rotation:[0,0,-.044985,.998988],scale:[.105,.026,.025],geometry:0,material:5},{name:`part-49`,parent:32,position:[0,-.1,-.372],rotation:[0,0,0,1],scale:[.057,.053,.065],geometry:1,material:1},{name:`part-50`,parent:32,position:[0,0,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:6,material:9},{name:`left-leg`,parent:0,position:[-.17,.73,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:-1,material:-1},{name:`part-52`,parent:51,position:[0,-.23,0],rotation:[0,0,0,1],scale:[.165,.3,.18],geometry:0,material:2},{name:`part-53`,parent:51,position:[0,-.47,0],rotation:[0,0,0,1],scale:[.174,.09,.185],geometry:0,material:10},{name:`part-54`,parent:51,position:[0,-.59,-.06],rotation:[0,0,0,1],scale:[.18,.13,.25],geometry:0,material:11},{name:`part-55`,parent:51,position:[0,-.685,-.06],rotation:[0,0,0,1],scale:[.184,.045,.255],geometry:0,material:12},{name:`right-leg`,parent:0,position:[.17,.73,0],rotation:[0,0,0,1],scale:[1,1,1],geometry:-1,material:-1},{name:`part-57`,parent:56,position:[0,-.23,0],rotation:[0,0,0,1],scale:[.165,.3,.18],geometry:0,material:2},{name:`part-58`,parent:56,position:[0,-.47,0],rotation:[0,0,0,1],scale:[.174,.09,.185],geometry:0,material:10},{name:`part-59`,parent:56,position:[0,-.59,-.06],rotation:[0,0,0,1],scale:[.18,.13,.25],geometry:0,material:11},{name:`part-60`,parent:56,position:[0,-.685,-.06],rotation:[0,0,0,1],scale:[.184,.045,.255],geometry:0,material:12}]};function od(e=!1){let t=ad.geometries.map(e=>{let t=new Ji;return t.setAttribute(`position`,new Ii(e.positions.map((e,t)=>t%3==2?-e:e),3)),t.setAttribute(`normal`,new Ii(e.normals.map((e,t)=>t%3==2?-e:e),3)),t.setIndex(e.triangles.map((t,n)=>e.triangles[n%3==1?n+1:n%3==2?n-1:n])),t}),n=ad.materials.map(t=>new Do({color:`#${e&&t.hex===`d9543e`?`65987b`:e&&t.hex===`32658a`?`80674f`:t.hex}`,flatShading:t.flat})),r=ad.nodes.map(e=>{let r=e.geometry>=0?new Y(t[e.geometry],n[e.material]):new Kr;return r.name=e.name,r.position.set(e.position[0],e.position[1],-e.position[2]),r.quaternion.set(-e.rotation[0],-e.rotation[1],e.rotation[2],e.rotation[3]),r.scale.fromArray(e.scale),r});ad.nodes.forEach((e,t)=>{e.parent>=0&&r[e.parent].add(r[t])});let i=r[0];i.scale.setScalar(.68);let a=i.getObjectByName(`body`),o=i.getObjectByName(`head`),s=[`left-arm`,`right-arm`].map(e=>i.getObjectByName(e)),c=[`left-leg`,`right-leg`].map(e=>i.getObjectByName(e)),l=new Kr;s[1].add(l);let u=new Y(new co(.025,.025,1,6),new Do({color:`#b79056`}));u.position.set(0,-.55,.05),l.add(u);let d=new Y(new so(.3,.07,.19),new Do({color:`#89978a`}));d.position.set(0,-1.02,.12),l.add(d);let f=new Kr;s[1].add(f);let p=new Y(new co(.025,.025,1.05,6),new Do({color:`#b79056`}));p.position.y=-.55,f.add(p);let m=new Y(new go(.3,.023,5,18),new Do({color:`#b39463`}));m.position.y=-1.2,f.add(m);let h=new Y(new ho(.29,8,6),new wa({color:`#d9d4b5`,wireframe:!0,transparent:!0,opacity:.65}));h.scale.z=.6,h.position.set(0,-1.2,.12),f.add(h);function g(e,t,n,r){let i=n===`walking`?Math.sin(t*12)*.65:0,u=n===`pruning`||n===`picking`,d=n===`planting`,p=n===`harvesting`||n===`fishing`,m=n===`clearing`||n===`cleaning`,h=n===`tilling`||n===`repairing`;l.visible=h,f.visible=n===`fishing`;let g=Math.sin(r*Math.PI*4);a.rotation.y=Jn.lerp(a.rotation.y,m?g*.28:0,1-Math.exp(-18*e));let _=Math.sin(Math.min(r,1)*Math.PI),v=1-Math.exp(-18*e);a.position.y=Jn.lerp(a.position.y,.73+(i?Math.abs(i)*.065:0)-(p?_*.2:0),v),a.rotation.x=Jn.lerp(a.rotation.x,u?-.06:h?.25+Math.max(0,g)*.3:m?.35:d?_*.65:p?_*.28:0,v),o.rotation.x=Jn.lerp(o.rotation.x,u?-.18:d?_*.12:p?-_*.15:0,v),s.forEach((e,t)=>{let n=u?t?-1.5-_*.7:-.35-_*.4:h?-.6-g*.7:m?-.5+Math.sin(r*Math.PI*4+t)*.45:d?-.4-_*.5+Math.sin(r*Math.PI*4+t)*.16:p?-_*(t?1.6:1.2):i*(t?-1:1);e.rotation.x=Jn.lerp(e.rotation.x,n,v),e.rotation.z=Jn.lerp(e.rotation.z,(t?1:-1)*(m?.3+Math.abs(g)*.3:d?.12+_*.22:.13),v)}),c.forEach((e,t)=>{e.rotation.x=Jn.lerp(e.rotation.x,i*(t?1:-1)+(p?_*.35:0),v)})}return{root:i,animate:g}}var sd=e=>`./art/${e}`;function cd(e){return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}function ld(e,t){let n=document.createElement(`canvas`);n.width=n.height=e,t(n.getContext(`2d`));let r=new ro(n);return r.colorSpace=rn,r}var ud=()=>ld(64,e=>{let t=e.createRadialGradient(32,32,2,32,32,32);t.addColorStop(0,`rgba(31,53,19,.45)`),t.addColorStop(.4,`rgba(31,53,19,.27)`),t.addColorStop(1,`rgba(31,53,19,0)`),e.fillStyle=t,e.fillRect(0,0,64,64)});async function dd(e,t){let r=new Zu({canvas:e,antialias:!0,alpha:!1});r.setPixelRatio(Math.min(devicePixelRatio,2)),r.outputColorSpace=rn;let i=new ei;i.background=new J(`#82a64c`);let a=new ds(-10,10,7,-7,.1,100),o=new K(0,1.8,.5),s=new K(12,16,20);a.position.copy(o).add(s),a.lookAt(o),i.add(new Qo(`#fff7d5`,`#73904d`,2.3));let c=new ps(`#fff2cf`,2);c.position.set(-8,14,10),i.add(c);let l=new Xo,[f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,k,A,ee,j,M,N]=await Promise.all([`barn.png`,`apple-tree.png`,`corn.png`,`grass.png`,`barn-neglected.png`,`tree-neglected.png`,`weeds.png`,`barn-cleaned-keyed.png`,`barn-roof-keyed.png`,`turnip-keyed.png`,`delivery-truck.png`,`cottage-neglected.png`,`cottage-restored-keyed.png`,`town-well.png`,`fishing-shed.png`,`fishing-boat.png`,`farm-kitchen.png`,`apple-tree-picked.png`,`pumpkin.png`,`kabumorokoshi.png`,`pear-tree-keyed.png`].map(e=>l.loadAsync(sd(e))));for(let e of[f,p,m,h,g,_,v,y,b,x,S,C,w,T,E,k,A,ee,j,M,N])e.colorSpace=rn,e.anisotropy=Math.min(8,r.capabilities.getMaxAnisotropy());h.wrapS=h.wrapT=Fe,h.repeat.set(105/6.5,105/6.5);let P=new Y(new po(105,105),new wa({map:h,color:`#c7e3d3`}));P.rotation.x=-Math.PI/2,P.position.y=-.035,i.add(P);let ne=id(i,E,k),re=ud(),ie=[],ae=new Kr,oe=new Kr;i.add(ae,oe);let se=`both`;function F(e,t,n,r){let a=new Y(new po(n,r),new wa({map:re,transparent:!0,depthWrite:!1}));return a.rotation.x=-Math.PI/2,a.position.set(e,.013,t),i.add(a),a}let ce=[];function le(e,t,n,r){let a=new ma(new ea({map:e,transparent:!1,alphaTest:.3,depthWrite:!0}));return a.center.set(.5,.035),a.position.set(t,.025,n),a.scale.set(r,r,1),i.add(a),ce.push(a),a}function ue(e,t,n,r,a,o,s){let c=new Y(new so(r,a,o),new Do({color:s}));return c.position.set(e,t,n),c.userData.condition=se,i.add(c),ie.push(c),c}let I=cd(302),de=ld(1024,e=>{let t=e=>(e+32)*16;e.lineCap=`round`,e.lineJoin=`round`;let n=(n,r)=>{e.strokeStyle=r,e.lineWidth=n*16,e.beginPath(),e.moveTo(t(-15),t(7)),e.bezierCurveTo(t(-9),t(6),t(-7),t(2),t(-3),t(2.2)),e.bezierCurveTo(t(0),t(2.5),t(5),t(2.2),t(15),t(4)),e.stroke(),e.beginPath(),e.moveTo(t(14.5),t(3.6)),e.lineTo(t(14.5),t(.2)),e.stroke(),e.beginPath(),e.moveTo(t(-2),t(2.2)),e.lineTo(t(-2),t(-21)),e.stroke(),e.beginPath(),e.moveTo(t(-2),t(2.2)),e.lineTo(t(-2),t(10.6)),e.lineTo(t(7.8),t(10.6)),e.stroke()};e.filter=`blur(5px)`,n(1.7,`#749349`),e.filter=`none`,n(1.52,`#c2af70`),n(1.34,`#dbc58d`),n(1.1,`#e1cf98`),e.globalCompositeOperation=`source-atop`;for(let t=0;t<18e3;t++)e.fillStyle=t%2?`rgba(136,107,55,.12)`:`rgba(255,247,196,.26)`,e.fillRect(I()*1024,I()*1024,1+I()*4,1+I()*2)}),L=new Y(new po(64,64),new wa({map:de,transparent:!0,depthWrite:!1}));L.rotation.x=-Math.PI/2,L.position.y=.004,i.add(L),F(we.x,we.z,6.2,4.8);let pe=le(g,we.x,we.z,5.8),me={value:0};pe.material.onBeforeCompile=e=>{e.uniforms.barnKey=me,e.fragmentShader=`uniform float barnKey;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta = min(diffuseColor.r, diffuseColor.b);
      if(barnKey > 0.5 && magenta > 0.12 && diffuseColor.g < magenta * 0.8) discard;`)};let he=le(C,te.x,te.z,4.8);F(te.x,te.z,4.8,3.3);let ge={value:0};he.material.onBeforeCompile=e=>{e.uniforms.cottageKey=ge,e.fragmentShader=`uniform float cottageKey;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta=min(diffuseColor.r,diffuseColor.b);
      if(cottageKey>0.5&&magenta>0.12&&diffuseColor.g<magenta*0.8)discard;`)};let _e=Qu(i),ve=$u(i),ye=nd(i),R=od(!0);R.root.position.set(-2.2,0,-1.2),R.root.rotation.y=.7,i.add(R.root);let be=F(-2.2,-1.2,.9,.65),xe=new Kr;i.add(xe);let Se=od(!0);Se.root.position.set(16,0,0),Se.root.rotation.y=-.6,xe.add(Se.root);let z=F(16,0,.9,.65),Ce=new Y(new so(1.1,.12,.4),new Do({color:`#c29b60`}));Ce.position.set(12,.45,.3),xe.add(Ce);for(let e of[11.6,12.4]){let t=new Y(new so(.12,.4,.35),new Do({color:`#98794c`}));t.position.set(e,.2,.3),xe.add(t)}let B=le(T,11.2,.5,2.25),Ee=F(11.2,.5,1.8,1.4),De=od(!0);De.root.position.set(-6.5,0,.2),De.root.rotation.y=1.3,i.add(De.root);let Oe=F(-6.5,.2,.9,.65),ke=le(S,d.x,d.z,2.9),Ae=F(d.x,d.z,2.6,1.3),je=od(!0);je.root.position.set(d.x+.9,0,d.z-.3),je.root.rotation.y=-1.6,i.add(je.root);let Me=F(d.x+.9,d.z-.3,.85,.65),Ne=le(A,fe.x,fe.z-.9,2.35),Pe=F(fe.x,fe.z-.9,2.2,1.6),Ie=D.map((e,t)=>{F(e.x,e.z,2.5,1.8);let r=le(_,e.x,e.z,2.9);return n(t)===`pear`&&(r.material.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta=min(diffuseColor.r,diffuseColor.b);
      if(magenta>0.12&&diffuseColor.g<magenta*0.8)discard;`)}),r}),Le=new Kr;i.add(Le);let Re=new Y(new so(.65,.45,.55),new Do({color:`#bb9159`}));Re.position.set(O.sales.x,.23,O.sales.z),Le.add(Re);for(let e=0;e<6;e++){let t=new Y(new ho(.09,8,6),new Do({color:`#ce6843`}));t.position.set(O.sales.x-.2+e%3*.2,.49,O.sales.z-.13+Math.floor(e/3)*.22),Le.add(t)}let ze=new Kr,Be=new Kr;i.add(ze,Be);let Ve=new Map;for(let[e,t,n,r,a]of[[`lane-west`,-11,-2,0,7],[`lane-east`,-2,12,1.4,7],[`cottage-yard`,12,16,-1,7]]){let o=new po(n-t,a-r),s=o.getAttribute(`uv`);for(let e=0;e<s.count;e++)s.setXY(e,(t+s.getX(e)*(n-t)+32)/64,(32-a+s.getY(e)*(a-r))/64);let c=new Y(o,new wa({map:de,transparent:!0,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set((t+n)/2,.009,(r+a)/2),i.add(c),Ve.set(e,c)}let He=[[-9,-8,4],[-6.8,-8.8,3.5],[-5,-14,3.8],[-5,-20,3.3],[0,-23.5,3.3],[3.4,-23.5,3.9],[6.7,-23.5,3.7],[10,-10,3.5],[10,-16,3.7],[10,-21,3.6],[19.6,-7.2,4.2],[14,-8,3.8],[17,-8.7,3.6],[-10,-4,3.9],[-9.7,0,3.5],[21,-3,3.7],[21,1,4.3],[-8,7.5,4.4],[22,8.5,3.4],[20.2,10.5,3.5],[-5.1,11.8,3.3],[-2.8,16.5,3.5],[1,17.5,3.9],[4.8,17.2,3.5],[8.6,16.2,3.7],[11.8,13,3.5]],Ue=[];for(let[e,t,n]of He){F(e,t,n*.8,n*.5);let r=le(_,e,t,n);r.material.rotation=(I()-.5)*.04,Ue.push(r)}function We(e,t,n,r){let i=Math.hypot(n-e,r-t),a=Math.ceil(i/.8);for(let i=0;i<=a;i++){let o=e+(n-e)*i/a,s=t+(r-t)*i/a,c=se===`neglected`;if(c&&i%5==2)continue;let l=ue(o,c?.25:.3,s,.1,c?.5:.6,.1,c?`#948168`:`#f9edc7`);c&&(l.rotation.z=(i%3-1)*.22)}for(let o of[.22,.46]){if(se===`neglected`){for(let s=0;s<a;s++){if(s%3==1||o>.3&&s%4==0)continue;let c=(s+.5)/a,l=ue(e+(n-e)*c,o*.8,t+(r-t)*c,i/a*.9,.075,.075,`#a59375`);l.rotation.y=-Math.atan2(r-t,n-e),l.rotation.z=(s%2?1:-1)*.22}continue}let s=ue((e+n)/2,o,(t+r)/2,i,.075,.075,`#eee1b4`);s.rotation.y=-Math.atan2(r-t,n-e)}}for(let e of[`restored`,`neglected`]){se=e,We(-8.3,-6.4,-3,-6.4),We(-1,-6.4,8.2,-6.4),We(8.2,-6.4,8.2,1.2),We(-8.3,-6.4,-8.3,-.5);let t=ie.length;We(-7.6,3.6,-4.9,4.9);for(let e of ie.slice(t))e.userData.localFence=!0}se=`both`;let Ge=new po(1,1);Ge.translate(0,.465,0);let Ke=new wa({map:v,alphaTest:.3});function qe(e,t){let n=new qa(Ge,Ke,e.length),r=new vr;e.forEach((e,t)=>{let i=.45+I()*.42;r.compose(new K(e.x,.11,e.z),a.quaternion,new K(i,i,1)),n.setMatrixAt(t,r),n.setColorAt(t,new J(t%3?`#ffffff`:`#d7d1ab`))}),n.computeBoundingSphere(),t.add(n)}let Je=new Kr;i.add(Je),qe(Array.from({length:100},()=>({x:11+I()*7,z:.3+I()*4.8})),Je);let Ye=[];for(let e=0;e<210;e++){let e=I()*19-9.5,t=I()*14-6;Te.some(n=>Math.abs(e-n.x)<1.5&&Math.abs(t-n.z)<1.5)||Math.hypot(e-V.x,t-V.z)<1||Math.abs(e+2)<.45&&t<2||Ye.push({x:e,z:t})}let Xe=new Map,Ze=e=>e.x<-2&&e.z<.8?`barn-walls`:e.x<-2&&e.z<6?`lane-west`:e.x>=-2&&e.z>1.3?`lane-east`:void 0;qe(Ye.filter(e=>!Ze(e)),ae);for(let e of[`barn-walls`,`lane-west`,`lane-east`]){let t=new Kr;i.add(t),qe(Ye.filter(t=>Ze(t)===e),t),Xe.set(e,t)}let Qe=ld(512,e=>{for(let t=0;t<130;t++){let n=I()*512,r=I()*512,i=8+I()*38,a=e.createRadialGradient(n,r,0,n,r,i);a.addColorStop(0,t%2?`#a6976688`:`#baa47b88`),a.addColorStop(1,`#a6976600`),e.fillStyle=a,e.fillRect(n-i,r-i,i*2,i*2)}}),$e=new Y(new po(26,26),new wa({map:Qe,transparent:!0,depthWrite:!1}));$e.rotation.x=-Math.PI/2,$e.position.y=.007,ae.add($e);let et=ld(256,e=>{e.fillStyle=`#90612f`,e.fillRect(0,0,256,256);for(let t=0;t<6;t++){let n=t*43,r=e.createLinearGradient(0,n,0,n+43);r.addColorStop(0,`#765029`),r.addColorStop(.35,`#b78b4c`),r.addColorStop(.57,`#c39859`),r.addColorStop(1,`#83522b`),e.fillStyle=r,e.fillRect(0,n,256,43)}for(let t=0;t<6e3;t++)e.fillStyle=t%2?`rgba(61,35,16,.18)`:`rgba(255,226,163,.21)`,e.fillRect(I()*256,I()*256,1+I()*3,1+I()*2)}),tt=ld(256,e=>{e.fillStyle=`#b59a6b`,e.fillRect(0,0,256,256);for(let t=0;t<4500;t++)e.fillStyle=t%2?`#a28b6744`:`#dbc39966`,e.fillRect(I()*256,I()*256,1+I()*4,1+I()*3)}),nt=[],rt=new po(1,1);rt.translate(0,.465,0);let it=new qa(rt,new wa({map:m,alphaTest:.3}),Te.length*12);it.frustumCulled=!1,it.instanceMatrix.setUsage(un),i.add(it);let at=new wa({map:x,alphaTest:.3});at.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta = min(sampledDiffuseColor.r, sampledDiffuseColor.b);
      if(magenta > 0.12 && sampledDiffuseColor.g < magenta * 0.8) discard;`)};let ot=new qa(rt,at,Te.length*12);ot.frustumCulled=!1,ot.instanceMatrix.setUsage(un),i.add(ot);let st=new qa(rt,new wa({map:M,alphaTest:.3}),Te.length*12);st.frustumCulled=!1,st.instanceMatrix.setUsage(un),i.add(st);let ct=new qa(rt,new wa({map:j,alphaTest:.3}),Te.length*12);ct.frustumCulled=!1,ct.instanceMatrix.setUsage(un),i.add(ct);let lt=0,ut=[],dt=[],ft=Te.map(e=>{let t=new Y(new so(2.48,.1,2.62),new Do({color:`#785c32`}));t.position.set(e.x,.04,e.z),i.add(t),nt.push(t);let n=new Y(new po(2.4,2.54),new wa({map:et}));n.rotation.x=-Math.PI/2,n.position.set(e.x,.097,e.z),i.add(n),dt.push(n);let r=new Kr;i.add(r),ut.push(r),qe(Array.from({length:38},()=>({x:e.x+(I()-.5)*2.25,z:e.z+(I()-.5)*2.4})),r);for(let t of[-1.25,1.25])for(let n of[-1.32,1.32])ue(e.x+t,.18,e.z+n,.065,.32,.065,`#e2c38b`);let a=[];for(let t=0;t<3;t++)for(let n=0;n<4;n++)a.push({index:lt++,position:new K(e.x-.89+n*.59,.025,e.z-.86+t*.84),size:1.22+(I()-.5)*.09,phase:I()*Math.PI*2});return a}),pt=[`#fff5d4`,`#f7d854`,`#e6aa86`];se=`restored`;let mt=new ho(.033,5,3);for(let e=0;e<150;e++){let t=I()*21-10.5,n=I()*17-8;if(t>-7&&t<8&&n>-6&&n<4.5)continue;let r=ue(t,.07,n,.015,.12,.015,`#678f38`),a=new Y(mt,new wa({color:pt[e%3]}));a.position.copy(r.position).y=.15,a.userData.condition=`restored`,i.add(a),ie.push(a)}se=`both`;for(let[e,t,n]of[[-7,2.8,.35],[8.8,2.9,.3],[-3.5,5,.24],[7,-7,.3]]){let r=new Y(new fo(n,1),new Do({color:`#a5a58a`}));r.scale.set(1,.65,.8),r.position.set(e,n*.4,t),i.add(r),ie.push(r),F(e,t,n*2,n*1.5)}ue(V.x,.25,V.z,.72,.5,.62,`#a67436`);for(let e of[.08,.24,.42])for(let t of[-.32,.32])ue(V.x,e,V.z+t,.77,.035,.02,`#e3b86f`);for(let e of ie.filter(e=>e.userData.localFence))(e.userData.condition===`restored`?ze:Be).attach(e);for(let e of[`both`,`neglected`,`restored`]){let t=ie.filter(t=>!t.userData.localFence&&(t.userData.condition??`both`)===e).map(e=>{e.updateMatrix();let t=e.geometry.clone().applyMatrix4(e.matrix),n=e.material.color,r=new Float32Array(t.getAttribute(`position`).count*3);for(let e=0;e<r.length;e+=3)r[e]=n.r,r[e+1]=n.g,r[e+2]=n.b;t.setAttribute(`color`,new Ni(r,3));let a=t.index?t.toNonIndexed():t;return i.remove(e),e.geometry.dispose(),e.material.dispose(),a}),n=ed(t);n&&(e===`neglected`?ae:e===`restored`?oe:i).add(new Y(n,new Do({vertexColors:!0})));for(let e of t)e.dispose()}let ht=new Y(new mo(.66,.71,48),new wa({color:`#fff4b9`,transparent:!0,opacity:.9,side:2}));ht.rotation.x=-Math.PI/2,ht.position.set(V.x,.02,V.z),i.add(ht);let gt=new Kr;i.add(gt);let _t=(e,t,n,r,i,a,o)=>{let s=new Y(new so(e,t,n),new Do({color:r}));return s.position.set(i,a,o),gt.add(s),s};_t(.46,.3,.4,`#8fa374`,0,.36,0),_t(.52,.06,.46,`#e1c796`,0,.52,0),_t(.32,.035,.26,`#dfb865`,0,.56,0);for(let e of[-.3,.3]){let t=new Y(new co(.17,.17,.08,12),new Do({color:`#6b654b`}));t.rotation.z=Math.PI/2,t.position.set(e,.17,.04),gt.add(t)}_t(.035,.5,.035,`#ad8750`,-.2,.62,.27).rotation.x=-.35,_t(.035,.5,.035,`#ad8750`,.2,.62,.27).rotation.x=-.35,_t(.45,.045,.045,`#ad8750`,0,.84,.36);let vt=F(0,0,.9,.7),yt=rd();i.add(yt);let bt=F(0,0,.8,.9),xt=od(!0);i.add(xt.root);let St=F(0,0,.85,.65),Ct=od(!0);i.add(Ct.root),xt.root.name=`worker-mina`,Ct.root.name=`worker-ren`,Ct.root.traverse(e=>{e instanceof Y&&e.material instanceof Do&&e.material.color.getHex()===6658171&&e.material.color.set(`#a28cb5`)});let wt=F(0,0,.85,.65),Tt=od();i.add(Tt.root);let Et=F(0,0,.95,.75),Dt=new Y(new mo(1.23,1.29,4),new wa({color:`#fff6b0`,side:2,transparent:!0,opacity:.9}));Dt.rotation.set(-Math.PI/2,0,Math.PI/4),Dt.scale.set(1.38,1.45,1),i.add(Dt),Dt.visible=!1;let Ot=new Y(new mo(.15,.19,32),new wa({color:`#fff9cf`,transparent:!0,opacity:.9}));Ot.rotation.x=-Math.PI/2,i.add(Ot),Ot.visible=!1;let kt=0,At=0;function jt(){kt=e.clientWidth,At=e.clientHeight,r.setSize(kt,At,!1);let t=kt/At,n=t<.8?15.5:13.3;a.left=-n*t/2,a.right=n*t/2,a.top=n/2,a.bottom=-n/2,a.updateProjectionMatrix()}jt();let Mt=new ResizeObserver(jt);Mt.observe(e);let Nt=new js,Pt=new Za(new K(0,1,0),0);function Ft(t,n){let r=e.getBoundingClientRect();Nt.setFromCamera(new G((t-r.left)/r.width*2-1,-(n-r.top)/r.height*2+1),a);let i=Nt.ray.intersectPlane(Pt,new K);return i?{x:i.x,z:i.z}:null}function It(e,t=0){let n=new K(e.x,t,e.z).project(a);return{x:(n.x+1)/2*kt,y:(1-n.y)/2*At}}let Lt=new vr,Rt=new K,zt=new Yn,Bt=new Yn,Vt=new J,Ht;function Ut(e,c,l,d,m=!1){let h=`${m}/${t.restorationPhase}/${t.projects.has(`town-orchard`)}`;if(Ht!==h){Ht=h,ae.visible=!m,oe.visible=m;for(let e of Ue)e.material.map=m||t.projects.has(`town-orchard`)?p:_;P.material.color.set(m?`#c7e3d3`:[`#cfbfaa`,`#cecaaf`,`#c8d0b7`,`#c7dac3`,`#c7e3d3`][t.restorationPhase-1]),L.material.opacity=m?1:[.56,.6,.65,.72,.8][t.restorationPhase-1],L.material.color.set(m?`#ffffff`:`#c8b997`)}Le.visible=m||t.investments.has(`orchard`),Le.children.slice(1).forEach((e,n)=>{e.visible=m||t.orchard.box>0,e.material.color.set(!m&&t.orchard.fruit.pear>0&&(t.orchard.fruit.apple===0||n>=3)?`#ddce56`:`#ce6843`)}),Ie.forEach((e,r)=>{e.material.map=m||t.orchard.ripe(r,l)?n(r)===`pear`?N:p:t.orchard.trees[r].tended?ee:_}),je.root.visible=Me.visible=!m&&t.investments.has(`driver`)&&t.residentsArrived,je.animate(e,c,t.courier.progress>0?`harvesting`:`idle`,t.courier.progress),Ne.visible=Pe.visible=m||t.investments.has(`kitchen`),B.visible=Ee.visible=m||t.projects.has(`town-well`),De.root.visible=Oe.visible=m||t.residentsArrived&&t.projects.has(`town-market`),De.animate(e,c,`idle`,0),ye.update(t,m),R.root.visible=be.visible=m||t.residentsArrived&&t.projects.has(`barn-open`),R.animate(e,c,`idle`,0);let v=m||t.projects.has(`cottage-repair`);he.material.map=v?w:C,ge.value=+!!v,Je.visible=!m&&!t.projects.has(`cottage-yard`),xe.visible=z.visible=m||t.projects.has(`cottage-welcome`),Se.animate(e,c,`idle`,0),pe.material.map=m||t.projects.has(`barn-open`)?f:t.projects.has(`barn-roof`)?b:t.projects.has(`barn-walls`)?y:g,me.value=!m&&!t.projects.has(`barn-open`)&&t.projects.has(`barn-walls`)?1:0;for(let[e,n]of Xe)n.visible=!m&&!t.projects.has(e);for(let[e,n]of Ve)n.visible=!m&&t.projects.has(e);if(ze.visible=m||t.projects.has(`fence`),Be.visible=!m&&!t.projects.has(`fence`),kt/At<.8){let n=new K(t.player.x,1.8,t.player.z-.3);o.lerp(n,1-Math.exp(-3*e))}else t.player.z<-3.5?o.lerp(new K(t.player.x,1.8,t.player.z+.5),1-Math.exp(-3*e)):t.player.x>9.5&&t.player.x<23&&t.player.z>2.4?o.lerp(new K(t.player.x,1.8,t.player.z-.7),1-Math.exp(-3*e)):o.lerp(new K(t.player.z>6&&t.player.x<9.5?2:Math.max(0,Math.min(28,(t.player.x-7)*1.7)),1.8,Math.min(12.5,.5+Math.max(0,t.player.z-5)*1.5)),1-Math.exp(-3*e));a.position.copy(o).add(s),a.lookAt(o),a.updateMatrixWorld(),Tt.root.position.set(t.player.x,0,t.player.z),Et.position.set(t.player.x,.013,t.player.z),Tt.animate(e,c,m?`idle`:t.action,t.progress),ft.forEach((e,n)=>{let r=t.plots[n],i=t.isUnlocked(n);ut[n].visible=!m&&r.land===`overgrown`,dt[n].visible=m||i,nt[n].visible=m||i,dt[n].material.map=m||r.land===`tilled`?et:tt,dt[n].material.color.set(!m&&r.land===`overgrown`?`#a6a07b`:`#ffffff`);let o=r.stage===`ready`?1:Math.max(.14,1-(r.readyAt-l)/(t.growSeconds(r.crop)*1e3));for(let t of e){let e=m?t.size:r.stage===`empty`?0:t.size*u[r.crop].size*(r.stage===`ready`?1:.22+o*.64);Rt.setScalar(m||r.crop===`corn`?e:0),Vt.set(m||r.stage===`ready`?`#ffffff`:`#91b65c`),Bt.setFromAxisAngle(new K(0,0,1),Math.sin(c*1.3+t.phase)*.015),zt.copy(a.quaternion).multiply(Bt),it.setMatrixAt(t.index,Lt.compose(t.position,zt,Rt)),it.setColorAt(t.index,Vt),Rt.setScalar(!m&&r.crop===`turnip`?e:0),ot.setMatrixAt(t.index,Lt.compose(t.position,zt,Rt)),ot.setColorAt(t.index,Vt),Rt.setScalar(!m&&r.crop===`kabumorokoshi`?e:0),st.setMatrixAt(t.index,Lt.compose(t.position,zt,Rt)),st.setColorAt(t.index,Vt),Rt.setScalar(!m&&r.crop===`pumpkin`?e:0),ct.setMatrixAt(t.index,Lt.compose(t.position,zt,Rt)),ct.setColorAt(t.index,Vt)}}),it.instanceMatrix.needsUpdate=!0,it.instanceColor&&(it.instanceColor.needsUpdate=!0),ot.instanceMatrix.needsUpdate=!0,ot.instanceColor&&(ot.instanceColor.needsUpdate=!0),st.instanceMatrix.needsUpdate=!0,st.instanceColor&&(st.instanceColor.needsUpdate=!0),ct.instanceMatrix.needsUpdate=!0,ct.instanceColor&&(ct.instanceColor.needsUpdate=!0),ke.visible=Ae.visible=t.investments.has(`truck`)||m,gt.visible=vt.visible=!m&&t.investments.has(`seeder`);let x=t.plots[t.seederPlot],S=x?{x:x.x-1.05,z:x.z+1.1}:{x:V.x+.9,z:V.z-.5};gt.position.lerp(new K(S.x,t.seederProgress>0?Math.sin(c*18)*.015:0,S.z),1-Math.exp(-3*e)),vt.position.set(gt.position.x,.014,gt.position.z);for(let[n,r,i]of[[0,xt,St],[1,Ct,wt]]){let a=t.workers.people[n];r.root.visible=i.visible=!m&&t.workers.enabled(a,t),r.root.position.set(a.position.x,0,a.position.z),r.root.rotation.y=a.heading,i.position.set(a.position.x,.013,a.position.z),r.animate(e,c,a.action===`returning`?a.route.length?`walking`:`idle`:a.action,a.progress)}if(yt.visible=bt.visible=!1,Dt.scale.set(t.harbor.active?.7:1.38,t.harbor.active?.7:1.45,1),Dt.visible=!m&&t.isWorking,t.workPoint){let e=t.workPoint;Dt.position.set(e.x,.12,e.z)}Ot.visible=!!d,d&&Ot.position.set(d.x,.14,d.z),ne.update(e,c,t.harbor,m),ve.update(t,m),_e.update(t,m,e,c);let T=It(t.player,.75),E=new K(t.player.x,.75,t.player.z).applyMatrix4(a.matrixWorldInverse).z;for(let t of ce){let n=It(t.position,t.position.y),r=t.scale.y*At/(a.top-a.bottom),i=t.position.clone().applyMatrix4(a.matrixWorldInverse).z,o=!m&&t.visible&&i>E+.05&&Math.abs(T.x-n.x)<r*.4&&T.y>n.y-r*.91&&T.y<n.y+r*.04?.24:1;t.material.opacity=Jn.lerp(t.material.opacity,o,1-Math.exp(-12*e));let s=t.material.opacity<.99;t.material.transparent!==s&&(t.material.transparent=s,t.material.needsUpdate=!0),t.material.depthWrite=!s,t.material.alphaTest=s?.03:.3}r.render(i,a)}return{update:Ut,groundPoint:Ft,screenPoint:It,farmer:Tt,renderer:r,scene:i,camera:a,dispose:()=>{Mt.disconnect(),r.dispose()}}}function fd(e){let t=`/${e.split(`/`).filter(Boolean).join(`/`)}/`;return t===`//`?`farmer-mate:web:v1`:`farmer-mate:web:v1:${t}`}function pd(e){return!e.investments.has(`helper`)||!e.residentsArrived?``:`<div class="seeder-assignment"><h3>農園の仲間</h3><p>耕作した畑を歩き回り、種まき・収穫を手伝います。収穫物はかごに持ち、倉庫へ運びます。人ごとに収穫経験を積んで、品質を磨きます。</p><label class="area-control"><input id="helpers-enabled" type="checkbox" ${e.helperPlot>=0?`checked`:``}> 農園の手伝いをお願いする</label>${e.workers.people.filter(t=>e.workers.enabled(t,e)).map(t=>`<p><strong>${t.id===`mina`?`ミナ`:`レン`} · 技能 ${r[e.expertise.personGrade(t.id)]}</strong><br>種まき ${t.planted}回 · 収穫 ${t.harvested}個 · 運搬中 ${t.count} / 12個</p>`).join(``)}<small>休みにすると新しい作業を止め、持っている収穫物を先に倉庫へ届けます。倉庫が満杯なら品物を保って待ちます。</small></div>`}function md(e){if(!e.investments.has(`harvester`))return``;let t=e.machinery,n=ne[t.tier(e)];return`<div class="seeder-assignment"><h3>${n.title}</h3><p>${n.seconds}秒で収穫 · 品質は作物の到達品質から${n.penalty}ランク低下（Eが下限）。コンベアが倉庫まで運びます。人の技能には経験が入りません。</p><label for="harvester-plot">担当する列</label><select id="harvester-plot"><option value="-1">新しい収穫を休む</option>${e.plots.map((t,n)=>n%3==0&&e.isUnlocked(n)&&e.plots.slice(n,n+3).some(e=>e.land===`tilled`)?`<option value="${e.plots.findIndex((e,t)=>Math.floor(t/3)===n/3&&e.land===`tilled`)}">畑 ${n+1}〜${n+3}</option>`:``).join(``)}</select><label class="area-control"><input type="checkbox" id="harvester-paused" ${t.paused?`checked`:``}> 収穫とコンベアを一時停止</label><p>運搬中 ${t.inTransit} / 12個 · 倉庫へ搬入 ${t.delivered}個<br>倉庫が満杯なら出口で待ちます。担当を変えても、収穫済みの荷物は元の列から運ばれます。</p>${t.loads.map(e=>`<small>${u[e.crop].name} ${e.count}個 · ${r[e.grade]}</small>`).join(`<br>`)}</div>`}var hd=e=>e.map((e,t)=>e?`<span class="quality-badge grade-${t}" data-grade="${r[t]}">${r[t]} · ${e}個</span>`:``).reverse().join(` `)||`—`;function gd(e){return`<div class="quality-guide"><h3>人は経験で、作物は育てるほどに。</h3><p>収穫時の品質は、作物の熟練と収穫する人の技能の低い方です。設備で上限を解放し、経験を積んで磨きます。</p>${[{id:`player`,name:`あなた`},...e.investments.has(`helper`)&&e.residentsArrived?[{id:`mina`,name:`ミナ`},...e.investments.has(`helper-area`)?[{id:`ren`,name:`レン`}]:[]]:[]].map(t=>{let n=e.expertise.personGrade(t.id),i=e.expertise.people[t.id],o=a[n+1];return`<p><strong>${t.name}の収穫技能 ${r[n]}</strong> · 経験 ${i}回${o===void 0?``:` · 次まで${Math.max(0,o-i)}回`}</p>`}).join(``)}<p>育てるだけではBまで。A・Sには品種改良の研究設備が必要です。Cランクを収穫すると、最初の機械を導入できます。</p></div>`}function _d(e,t){let n=e.harvestGrade(t),a=e.expertise.cropGrade(t,e.research);return`収穫見込み <strong>${r[n]}ランク</strong> · ${Math.round(e.salePrice(t)*i[n])}メニー/個<br>作物の熟練 ${r[a]} · 栽培経験 ${e.expertise.crops[t]}回`}function vd(n){return`<div class="restoration-summary"><small>品質は収穫したときのまま</small><strong>収穫かご · ${n.inventory} / ${n.capacity}個</strong><p>納屋前の出荷箱で止まると売れます。倉庫へ預けても品質は変わりません。取り出し・注文・贈りものには低い品質から使います。</p></div>${l.filter(e=>n.cropUnlocked(e)).map(e=>`<article class="quality-stock"><h3>${u[e].name}</h3><p>${hd(n.cargoQuality.peek(e))}</p><small>通常出荷の合計 ${n.cargoQuality.value(e,n.salePrice(e))}メニー</small></article>`).join(``)}<h3>加工台の食品棚</h3>${L.filter(e=>n.kitchen.goods[e]>0).map(e=>`<p>${me[e].name} ${hd(n.kitchen.quality.peek(e))}</p>`).join(``)}<h3>果樹園の集荷箱</h3>${e.map(e=>`<p>${t[e].name} ${hd(n.orchard.quality.peek(e))}</p>`).join(``)}${gd(n)}`}function yd(e){return`<div class="restoration-summary"><small>実りの先に、誰かの暮らし。</small><strong>住人からのお願い</strong><p>家族、青果市、納屋の仲間。気になる人から、少しずつ。途中で別のお願いへ向かっても、届けた分は残ります。</p></div><p class="note-intro">作物・食品・リンゴを届けるか、メニーで準備を手伝えます。どの方法を組み合わせても同じ景観が戻ります。通常の出荷とは別の、街への贈りものです。</p>${y.filter(t=>Math.hypot(e.player.x-t.x,e.player.z-t.z)<1.8).map(t=>{let n=e.requests.progress[t.id],r=t.chapters[n.chapter],i=e.residentsArrived&&e.projects.has(t.requires),a=r?Math.floor(n.contributed/r.target*100):100;return`<article class="investment-card resident-request" id="resident-${t.id}"><small>${t.name} · ${n.chapter} / ${t.chapters.length} のお願い</small><h3>${r?.title??`みんなの暮らす場所に`}</h3><p>${r?.detail??`この場所に、実りを分け合う暮らしが戻りました。`}</p>
   ${n.chapter>0?`<p class="resident-thanks">${t.chapters[n.chapter-1].thanks}</p>`:``}
   ${i?r?`<div class="progress-track"><i style="width:${a}%"></i></div><p>準備 ${a}% · 完了すると、この場所に${[`花が飾られます`,`食卓ができます`,`お祝いの飾りがつきます`][n.chapter]}。</p><div class="resident-offers">${Object.keys(r.accepts).map(i=>{let a=i,o=e.requests.offer(t.id,a,e),s=o?.amount??0,c=Math.min(100,Math.floor((n.contributed+s*r.accepts[a])/r.target*100));return`<button data-resident="${t.id}" data-contribution="${a}" ${o?``:`disabled`}>${o?`${v[a]} ${s}${a===`coins`?`メニーで支援`:`個を届ける`} · 準備 ${c}%へ`:`${v[a]}がありません`}</button>`}).join(``)}</div>`:`<p>この場所へのお願いは、すべて叶いました。</p>`:`<p class="order-hint">「${be(t.requires).title}」を終えたら、お話しできます。</p>`}
   <small>作物はかご、食品は加工台の棚、リンゴは果樹園の箱から。現地で渡した時に使います。移動中に取りやめても減りません。</small></article>`}).join(``)}`}function bd(e){let t=Math.floor(e);return t<60?`${t}秒`:t<3600?`${Math.floor(t/60)}分 ${t%60}秒`:`${Math.floor(t/3600)}時間 ${Math.floor(t%3600/60)}分`}function xd(e){return`<article class="investment-card play-journal"><h3>農園での歩み</h3><p>畑を育て、街を整えてきた記録です。時間の長さで仕事や次の地区が開くことはありません。</p>
    <strong id="journal-total">農園で遊んだ時間の目安 · ${bd(e.activeSeconds)}</strong>
    ${e.partial?`<p class="order-hint">この農園は途中から計測しています。以前に遊んだ時間は含みません。</p>`:``}
    <dl class="journal-times">${Object.entries({moving:`移動`,working:`手作業`,looking:`農園を見渡す時間の目安`,notebook:`ノートを読む・選ぶ時間の目安`,idle:`しばらく操作がなかった時間`,unobserved:`画面更新が止まり、確認できない時間`}).map(([t,n])=>`<div><dt>${n}</dt><dd>${bd(e.seconds[t])}</dd></div>`).join(``)}</dl>
    <p class="note-intro">最後の操作から30秒以内を目安にしています。考え中と放置は完全には区別できません。ノートの時間は別枠で、比較画面・別タブ・オフラインは合計に含みません。</p>
    <h4>農園の節目</h4><ol class="journal-milestones">${Object.entries(ce).map(([t,n])=>{let r=e.milestones[t];return`<li><strong>${n}</strong><span>${r===void 0?`これから`:r===null?`計測前に達成`:`${bd(r.active)} · ノート ${bd(r.notebook)}`}</span></li>`}).join(``)}</ol><p class="note-intro">記録ファイルにも含まれます。外部への自動送信はありません。</p></article>`}function Sd(r,i){let a=r.orchard;return`<section id="orchard-section"><div class="restoration-summary"><small>植え直さずに、次の実りを待つ。</small><strong>住宅地の小さな果樹園</strong><p>枝を手入れすると何度でも実ります。リンゴは75秒で4個、ナシは105秒で3個。果実のまま出荷するか、加工台でお菓子にします。</p></div><div class="plot-grid">${a.trees.map((e,o)=>`<button data-tree="${o}" ${a.unlocked(o,r)?``:`disabled`}><strong>${t[n(o)].name}の木 ${o+1}</strong><small>${a.unlocked(o,r)?e.tended?a.ripe(o,i)?`収穫できます`:`実りまで ${Math.max(0,Math.ceil((e.readyAt-i)/1e3))}秒`:`枝の手入れから`:`園の再開から`}</small></button>`).join(``)}</div><div class="seeder-assignment"><h3>果樹園の集荷箱 · ${a.box} / ${O.capacity}個</h3>${e.map(e=>`<p>${t[e].name} ${hd(a.quality.peek(e))} · 合計 ${a.quality.value(e,t[e].price)}メニー</p>`).join(``)}<p>累計収穫 ${a.harvested}個 · 出荷 ${a.sold}個 · 加工 ${a.processed}個</p><button id="orchard-sell" ${a.box>0?``:`disabled`}>箱の果実をまとめて出荷する</button><small>加工台は必要な果実をこの箱から使います。出荷すると原料もなくなるので、加工したい分は先に料理へ。定期便は共同倉庫の作物を担当します。</small></div></section>`}function Cd(e){if(!e.investments.has(`driver`))return`<p class="order-hint">販売車と納屋が揃ったら、配達の仲間を迎えて倉庫の作物の出荷を任せられます。</p>`;let t=e.courier,n=ue[t.policy].keep;return`<div class="seeder-assignment"><h3>販売車の定期便</h3><p>倉庫の作物を${I.seconds}秒ごとに最大${I.load}個出荷します。手数料は1個${I.fee}メニー。かごと食品棚は使いません。</p><label class="area-control"><input id="courier-enabled" type="checkbox" ${t.enabled?`checked`:``}> 定期便を動かす</label><label for="courier-policy">倉庫に残しておく作物</label><select id="courier-policy">${Object.keys(ue).map(e=>`<option value="${e}" ${t.policy===e?`selected`:``}>${ue[e].title}</option>`).join(``)}</select><p>コーン${n.corn}個・カブ${n.turnip}個を残します。<br>出荷できる余剰 ${t.available(e)}個 · 累計出荷 ${t.sold}個</p><small>定期便の受取額 ${t.earned}メニー（手数料差引後）。設定変更や再開時は、途中の配達をはじめからやり直します。</small></div>`}function wd(e,t,n){let r=document.createElement(`section`);r.id=`saves-panel`,r.setAttribute(`role`,`tabpanel`),r.setAttribute(`aria-labelledby`,`saves-tab`),r.hidden=!0,r.innerHTML=`<div class="restoration-summary"><small>育てた農園を、これからも。</small><strong>農園の記録</strong><p>このブラウザーには自動で保存しています。ファイルに書き出すと、別の端末や新しい試遊版へ農園を持っていけます。</p></div>
 <div id="play-journal"></div>
 <article class="investment-card"><h3>今の農園を書き出す</h3><p>畑・作物・所持品・購入した設備・街の復興を、ひとつのファイルにまとめます。</p><button id="export-save">記録ファイルを保存する</button></article>
 <article class="investment-card"><h3>記録から再開する</h3><p>ファイルを選ぶと、先に農園の内容を確認できます。再開を決めるまでは、今の農園は変わりません。</p><label class="save-file-label" for="import-save">農園の記録ファイル</label><input id="import-save" type="file" accept=".json,application/json"><button id="restore-import-backup">読み込み前の農園を確認する</button></article>
 <article id="import-preview" class="investment-card" hidden><h3>この農園を引き継ぎますか？</h3><p id="import-summary"></p><p>今の農園と置き換わります。読み込み前の農園も、このブラウザーに1つ残します。</p><button id="confirm-import">この記録で再開する</button><button id="cancel-import">今の農園を続ける</button></article>
 <p id="save-status" role="status" aria-live="polite"></p><p class="note-intro">端末間の自動同期はありません。ファイルは手元で保管してください。</p>`;let i=null,a=0,o=e=>r.querySelector(`#`+e),s=e=>{let t=o(`save-status`);t.textContent=e,t.scrollIntoView({block:`nearest`})};function c(){i=null,o(`import-preview`).hidden=!0,o(`import-save`).value=``,a++}function l(e){i=Me(e);let t=new Ae;t.restore(i),o(`import-summary`).textContent=`${t.coins.toLocaleString(`ja-JP`)} メニー · 畑 ${t.plots.filter((e,n)=>t.isUnlocked(n)).length}区画 · 復興 ${t.restorationPercent}% · 累計出荷 ${t.shipped}個`,o(`import-preview`).hidden=!1,s(`内容を確認してから、再開を選んでください。`),o(`confirm-import`).focus()}return o(`export-save`).addEventListener(`click`,()=>{let t=URL.createObjectURL(new Blob([je(e())],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`farmer-mate-${new Date().toISOString().slice(0,10)}.json`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4),s(`今の農園を記録ファイルに書き出しました。`)}),o(`import-save`).addEventListener(`change`,async()=>{let e=o(`import-save`).files?.[0],t=++a;if(i=null,o(`import-preview`).hidden=!0,e){if(e.size>1048576){s(`このファイルは大きすぎます。農園の記録ファイルを選んでください。`);return}try{let n=await e.text();t===a&&l(n)}catch(e){t===a&&s(e instanceof Error?e.message:`記録を読めませんでした。`)}}}),o(`cancel-import`).addEventListener(`click`,()=>{c(),s(`今の農園を続けます。`)}),o(`confirm-import`).addEventListener(`click`,()=>{if(i)try{t(i),c(),s(`農園の記録を引き継ぎました。`)}catch{s(`記録を書き込めませんでした。今の農園は変更していません。`)}}),o(`restore-import-backup`).addEventListener(`click`,()=>{c();try{let e=n();e?l(e):s(`読み込み前の記録は、まだありません。`)}catch{s(`読み込み前の記録を確認できませんでした。`)}}),{panel:r,reset:c}}function Td(n,r=!1){let i=n.kitchen,a=n.investments.has(`kitchen`),o=n=>[...l.filter(e=>n.needs[e]>0).map(e=>`${u[e].name} ${n.needs[e]}個`),...e.filter(e=>(n.fruit?.[e]??0)>0).map(e=>`${t[e].name} ${n.fruit[e]}個`)].join(` + `),s=i.plan===`none`?null:me[i.plan],c=`<div class="restoration-summary"><small>農園から、街の食卓へ</small><strong>納屋の加工台</strong><p>作物をそのまま売るか、農園の味にするか。加工は作業台に任せて、別の仕事を進められます。</p></div>
 ${a?``:`<p class="order-hint">納屋を再開したら「農園への投資」から加工台を導入できます。</p>`}
 <div class="seeder-assignment"><label for="kitchen-plan">作り続ける食品</label><select id="kitchen-plan" ${a?``:`disabled`}><option value="none">加工をお休みする</option>${L.map(e=>`<option value="${e}" ${i.plan===e?`selected`:``} ${i.unlocked(e,n)?``:`disabled`}>${me[e].name}</option>`).join(``)}</select>${s?`<p>${o(s)} → ${s.seconds}秒で${s.yield}個</p>`:``}<p>${i.reason(n)||`${me[i.plan].name}を作っています · ${Math.floor(i.progress*100)}%`}</p><small>材料は低い品質から使い、料理の品質は使った材料の最低ランクになります。材料は完成時に倉庫と果樹園の集荷箱から使います。変更・お休み・再開時は、途中の加工をはじめからやり直します。</small></div>
 <details class="recipe-list"><summary>すべてのレシピ（8品）</summary><div class="crop-guide">${L.map(n=>{let r=me[n];return`<div><strong>${r.name}</strong><small>${[...l.filter(e=>r.needs[e]>0).map(e=>`${u[e].name} ${r.needs[e]}個`),...e.filter(e=>(r.fruit?.[e]??0)>0).map(e=>`${t[e].name} ${r.fruit[e]}個`)].join(` + `)}<br>${r.seconds}秒で${r.yield}個 · Eランクの販売 ${r.price}メニー/個</small></div>`}).join(``)}</div></details>
 <div class="seeder-assignment"><h3>食品棚 · ${i.stored} / ${fe.capacity}個</h3><p>${L.filter(e=>i.goods[e]>0).map(e=>`${me[e].name} ${hd(i.quality.peek(e))} · 合計 ${i.quality.value(e,me[e].price)}メニー`).join(`<br>`)||`食品はまだありません`}</p><p>これまでに作った食品 ${i.crafted}個</p><button id="kitchen-sell" data-food="all" ${i.deliveryReason(`all`,n)?`disabled`:``}>${i.deliveryReason(`all`,n)||`加工台へ向かい、食品をまとめて売る`}</button></div>
`,d=` <h3 class="section-label">街からの食品の注文</h3><p class="note-intro">食品棚から必要な分を販売車へ積んで届けます。普通に売る場合は、販売車は必要ありません。</p>${he.filter(e=>L.every(t=>e.needs[t]===0||i.unlocked(t,n))).map(e=>`<article class="investment-card"><div class="investment-heading"><h3>${e.title}</h3><span>+${i.orderCoins(e.id)} メニー</span></div><p>${e.detail}</p><small>${L.filter(t=>e.needs[t]>0).map(t=>`${me[t].name} ${e.needs[t]}個`).join(` / `)} · 納品 ${i.orders[e.id]}回</small><button id="food-${e.id}" data-food="${e.id}" ${i.deliveryReason(e.id,n)?`disabled`:``}>${i.deliveryReason(e.id,n)||`販売車で届ける`}</button></article>`).join(``)}`;return r?d:c}function Ed({farm:e,visitResident:t,pause:n,navigate:r,notify:i,visitProject:a,visitOrder:o,visitStore:s,visitSea:c,visitFood:m,snapshot:g,importSave:v,importBackup:b,now:T,visitOrchardSale:E}){let D=document.createElement(`dialog`);D.className=`notebook`,D.setAttribute(`aria-labelledby`,`notebook-title`),D.innerHTML=`<header class="notebook-heading"><div><small>ひだまり農園の記録</small><h2 id="notebook-title">農園ノート</h2></div><button class="close-note" aria-label="農園ノートを閉じる">×</button></header>
    <div class="note-tabs" hidden role="tablist" aria-label="農園ノート"><button id="tasks-tab" role="tab" aria-controls="tasks-panel" data-tab="tasks">できる仕事</button><button id="crops-tab" role="tab" aria-controls="crops-panel" data-tab="crops">作付け</button><button id="orders-tab" role="tab" aria-controls="orders-panel" data-tab="orders">注文</button><button id="restoration-tab" role="tab" aria-controls="restoration-panel" data-tab="restoration">街の手入れ</button><button id="investments-tab" role="tab" aria-controls="investments-panel" data-tab="investments">農園への投資</button><button id="kitchen-tab" role="tab" aria-controls="kitchen-panel" data-tab="kitchen">加工と食品</button><button id="residents-tab" role="tab" aria-controls="residents-panel" data-tab="residents">住人のお願い</button><button id="saves-tab" role="tab" aria-controls="saves-panel" data-tab="saves">記録</button><button id="harbor-tab" role="tab" aria-controls="harbor-panel" data-tab="harbor" hidden>港</button></div>
    <div class="note-content"><section id="breeding-panel" hidden></section><section id="basket-panel" hidden></section><section id="storage-panel" hidden></section><section id="orchard-panel" hidden></section><section id="residents-panel" role="tabpanel" aria-labelledby="residents-tab" hidden></section><section id="kitchen-panel" role="tabpanel" aria-labelledby="kitchen-tab" hidden></section><section id="harbor-panel" role="tabpanel" aria-labelledby="harbor-tab" hidden></section><section id="tasks-panel" role="tabpanel" aria-labelledby="tasks-tab"></section><section id="crops-panel" role="tabpanel" aria-labelledby="crops-tab" hidden></section><section id="orders-panel" role="tabpanel" aria-labelledby="orders-tab" hidden></section><section id="restoration-panel" role="tabpanel" aria-labelledby="restoration-tab" hidden></section><section id="investments-panel" role="tabpanel" aria-labelledby="investments-tab" hidden></section></div>
    <p class="note-foot">施設や記録を開いている間、作業と成長はお休みです。</p>`,document.querySelector(`#app`).append(D);let k=wd(g,e=>{v(e),D.close(),n(!1),i(`農園の記録を引き継ぎました。`)},b);D.querySelector(`.note-content`).append(k.panel);let A=`tasks`,ee={breeding:`品種配合の実験台`,basket:`収穫かごと品質`,tasks:`街の目標`,saves:`農園の記録`,restoration:`掃除用具`,orders:`販売車の注文`,storage:`共同倉庫`,investments:`農園の設備`,crops:`この畑の作付け`,orchard:`果樹園`,kitchen:`加工台`,residents:`住人のお願い`,harbor:`港の仕事`};function te(t){return[`tasks`,`saves`,`basket`].includes(t)?!0:t===`breeding`?w(e.player,p):t===`restoration`?w(e.player,x):t===`orders`?w(e.player,d):t===`storage`?w(e.player,B)&&e.projects.has(`barn-open`):t===`kitchen`?w(e.player,fe)&&e.investments.has(`kitchen`):t===`orchard`?w(e.player,O.sales)&&e.investments.has(`orchard`):t===`crops`?e.plots.some((t,n)=>e.isUnlocked(n)&&w(e.player,t,1.7)):t===`investments`?w(e.player,S)||C.some(t=>w(e.player,t)):t===`residents`?e.residentsArrived&&y.some(t=>e.projects.has(t.requires)&&w(e.player,t)):t===`harbor`&&e.agricultureComplete&&e.player.x>=23}function j(){D.querySelector(`[data-tab="${A}"]`)?.scrollIntoView({block:`nearest`,inline:`nearest`})}function M(t){A=t,D.querySelector(`#notebook-title`).textContent=ee[A]??`農園`,D.querySelector(`.note-content`).scrollTop=0,A===`saves`&&(D.querySelector(`#play-journal`).innerHTML=xd(e.journal)),D.querySelectorAll(`[data-tab]`).forEach(e=>{e.setAttribute(`aria-selected`,String(e.dataset.tab===A)),e.tabIndex=e.dataset.tab===A?0:-1});for(let e of[`crops`,`orders`,`harbor`,`kitchen`,`residents`,`saves`,`storage`,`orchard`,`basket`,`breeding`])D.querySelector(`#`+e+`-panel`).hidden=A!==e;D.querySelector(`#restoration-panel`).hidden=A!==`restoration`,D.querySelector(`#tasks-panel`).hidden=A!==`tasks`,D.querySelector(`#investments-panel`).hidden=A!==`investments`,D.open&&j()}function N(){D.querySelector(`#harbor-tab`).hidden=!e.agricultureComplete;let t=document.activeElement?.id;D.querySelector(`#breeding-panel`).innerHTML=_(e);let n=e.restorationPercent;D.querySelector(`#basket-panel`).innerHTML=vd(e),D.querySelector(`#tasks-panel`).innerHTML=`<div class="restoration-summary"><small>第1ステージ · 農業地区</small><strong>街の復興 ${n}%</strong><p>${e.restorationPhase} / 5 · ${Se[e.restorationPhase-1]}</p><div class="progress-track"><i style="width:${n}%"></i></div><p>この農園を、街の食卓へ。育てた産業は、次の地区の暮らしも支えていきます。</p></div>
      <p class="note-intro">掃除は用具置き場へ、注文は販売車へ。住人が戻ったら、そばで話しかけてみよう。</p><button id="task-records" class="harbor-travel">プレイ記録・セーブ</button><div class="stage-requirements"><h3>${e.agricultureComplete?`農業地区の復興、達成！`:`農業地区の達成条件`}</h3><p>復興100%と、次の3つの成果。ほかの仕事は選んで進められます。すべての設備を買う必要はありません。</p>${xe.map(t=>`<div>${e.projects.has(t)?`✓`:`○`} ${be(t).title}</div>`).join(``)}</div><p class="note-intro">どの仕事からでも。報酬は達成時に受け取れます。</p><div class="task-list">${ke.map(t=>{let n=e.completedTasks.has(t.id),r=Math.min(t.target,t.count(e));return`<article class="task-card ${n?`done`:``}"><span class="task-check" aria-hidden="true">${n?`✓`:`○`}</span><div><h3>${t.title}</h3><p>${t.detail}</p><small>${n?`達成済み`:`${r} / ${t.target}`} · 復興 +${t.points/z.stagePoints*100}%${t.coins?` · ${t.coins} メニー`:``}</small></div></article>`}).join(``)}</div>`,D.querySelector(`#investments-panel`).innerHTML=`<p class="note-intro">かご ${e.inventory} / ${e.capacity}個 · 倉庫 ${e.stored} / ${e.storageCapacity}個<br>広げる、手作業を磨く、任せる。<br>どれを先に選んでも、ほかの投資をあとから組み合わせられます。</p><div class="investment-list">${Ce.filter(t=>C.some(n=>n.id===t.id&&w(e.player,n,4.2))).map(t=>{let n=e.investments.has(t.id),r=e.investmentReason(t.id,!0);return`<article class="investment-card ${n?`owned`:``}"><div class="investment-heading"><span class="investment-symbol" aria-hidden="true">${t.id===`expansion`?`▦`:t.id===`tools`?`✧`:t.id===`truck`?`▰`:`❧`}</span><h3>${t.title}</h3><span>${t.price} メニー</span></div><p>${t.detail}</p><small>${t.tradeoff}</small><p class="funding-detail">${r||`納付済み ${e.funding.paid[t.id]??0} / ${t.price} メニー。床のMマスで1秒止まると、少しずつ納付します。`}</p></article>`}).join(``)}</div>${e.investments.has(`seeder`)?`<div class="seeder-assignment"><h3>種まき機の担当</h3>${e.investments.has(`seeder-area`)?`<label class="area-control"><input id="seeder-area-mode" type="checkbox" ${e.seederArea?`checked`:``}> 同じ列を巡回する（最大3区画）</label>`:``}<p>担当はいつでも変更できます。草刈り・耕作を終えた畑から選びましょう。<br>いまの担当：${e.assignedPlots(`seeder`).map(e=>`畑 `+(e+1)).join(`・`)||`お休み`}</p><label for="seeder-plot">担当する畑</label><select id="seeder-plot"><option value="-1">お休みする</option>${e.plots.map((t,n)=>e.isUnlocked(n)&&t.land===`tilled`?`<option value="${n}">畑 ${n+1}</option>`:``).join(``)}</select></div>`:``}`,D.querySelector(`#investments-panel`).insertAdjacentHTML(`afterbegin`,md(e));let r=D.querySelector(`#harvester-plot`);if(r&&(r.value=String(e.machinery.plots(e)[0]??-1)),D.querySelector(`#restoration-panel`).innerHTML=`<p class="note-intro">一か所ずつ、暮らしの戻る場所を増やそう。<br>片付けは無料。修理代は作業を終えたときに使います。仕事を選んでから、印の場所まで歩こう。</p>${R.map(t=>{let n=e.projectReason(t.id);return`<article class="investment-card ${e.projects.has(t.id)?`owned`:``}"><div class="investment-heading"><h3>${t.title}</h3><span>${t.cost?t.cost+` メニー`:`無料`}</span></div><p>${t.detail}</p>${t.supplies?`<small>かごから ${l.filter(e=>t.supplies[e]>0).map(e=>u[e].name+` `+t.supplies[e]+`個`).join(` / `)}（完了時に渡します）</small>`:``}<button id="project-${t.id}" data-project="${t.id}" ${n?`disabled`:``}>${n||`この仕事の場所を示す`}</button></article>`}).join(``)}`,D.querySelector(`#crops-panel`).innerHTML=`${gd(e)}<p class="note-intro">種は無料です。育っている作物はそのままに、次の種まきから変更します。種まき機も、この作付けに従います。</p><div class="crop-guide">${l.map(t=>`<div><strong>${u[t].name}${e.cropUnlocked(t)?``:`（栽培未開始）`}</strong><small>${e.growSeconds(t)}秒で成長 · ${u[t].yield}個収穫<br>${_d(e,t)}</small></div>`).join(``)}</div><div class="crop-plans">${e.plots.map((t,n)=>!e.isUnlocked(n)||!w(e.player,t,1.7)?``:`<label for="crop-${n}" class="crop-plan"><span><strong>${n>=15?`北の草原 · `:n>=9?`南の草地 · `:n>=6?`北の土地 · `:``}畑 ${n+1}</strong><small>${e.isUnlocked(n)?t.stage===`empty`?`次の種まきから`:u[t.crop].name+`を育てています`:`未購入`}</small></span><select id="crop-${n}" data-crop="${n}" ${e.isUnlocked(n)?``:`disabled`}>${l.map(n=>`<option value="${n}" ${e.cropUnlocked(n)?``:`disabled`} ${t.nextCrop===n?`selected`:``}>${u[n].name}</option>`).join(``)}</select></label>`).join(``)}</div>`,D.querySelector(`#orchard-panel`).innerHTML=Sd(e,T()),D.querySelector(`#orders-panel`).innerHTML=`${Cd(e)}<p class="note-intro">かごの中：${l.map(t=>u[t].name+` `+e.cargo[t]+`個`).join(` / `)}<br>通常出荷と注文、どちらに届けても構いません。注文に必要な分だけを渡します。</p>${e.investments.has(`truck`)?``:`<p class="order-hint">「農園への投資」で販売車を購入すると、ここへ配達できます。</p>`}${f.map(t=>{let n=e.order(t.id),r=e.orderReason(t.id);return`<article class="investment-card"><div class="investment-heading"><h3>${n.title}</h3><span>+${n.coins} メニー</span></div><p>${n.detail}</p><small>${l.filter(e=>n.needs[e]>0).map(e=>u[e].name+` `+n.needs[e]+`個`).join(` / `)}</small><button id="order-${t.id}" data-order="${t.id}" ${r?`disabled`:``}>${r||`販売車へ届ける`}</button></article>`}).join(``)}${Td(e,!0)}<p class="note-intro">納品実績 ${e.orderCount}回。6回ごとに注文が大きくなります（最大3倍）。</p>`,e.projects.has(`barn-open`)){let t=document.createElement(`div`);t.className=`seeder-assignment`,t.innerHTML=`<h3>納屋の共同倉庫 · ${e.stored} / ${e.storageCapacity}</h3><p>必要な作物をかごに入れて、出荷や注文に使えます。受け渡しは納屋の前で行います。</p><button id="store-deposit" data-store="deposit" ${e.transferReason(`deposit`)?`disabled`:``}>${e.transferReason(`deposit`)||`かごの作物を預けに行く`}</button>${l.map(t=>`<p>${u[t].name} ${e.stock[t]}個 · ${hd(e.stockQuality.peek(t))}</p><button id="store-${t}" data-store="${t}" ${e.transferReason(t)?`disabled`:``}>${e.transferReason(t)||u[t].name+`をかごへ（6個まで）`}</button>`).join(``)}`,D.querySelector(`#storage-panel`).replaceChildren(t)}D.querySelector(`#investments-panel`).insertAdjacentHTML(`afterbegin`,pd(e)),D.querySelector(`#residents-panel`).innerHTML=yd(e),D.querySelector(`#kitchen-panel`).innerHTML=Td(e);let i=e.harbor;D.querySelector(`#harbor-panel`).innerHTML=`<div class="restoration-summary"><small>第2ステージ · 海産</small><strong>港の復興 ${i.percent}%</strong><p>農園の実りを、海で働く力へ。農園と住宅地にはいつでも戻れます。</p></div><button id="visit-harbor" class="harbor-travel">港へ向かう</button><p class="note-intro">水揚げ箱 ${i.fish} / ${_e.capacity}匹 · 累計出荷 ${i.sold}匹<br>浜で止まると4秒で1匹。出荷は1匹${_e.price}メニーです。</p><article class="investment-card"><h3>浜の網を片付ける</h3><p>まずは無料の片付けから。漁船がなくても漁を始められます。</p><button id="sea-nets" data-sea="nets" ${i.reason(`nets`,e)?`disabled`:``}>${i.reason(`nets`,e)||`浜へ向かう`}</button><button id="sea-fishing" data-fishing ${i.cleaned?``:`disabled`}>網を引く場所へ</button></article><article class="investment-card"><h3>桟橋を直す · 200メニー</h3><p>魚を12匹出荷したら、漁船を迎える準備を。</p><button id="sea-pier" data-sea="pier" ${i.reason(`pier`,e)?`disabled`:``}>${i.reason(`pier`,e)||`現地で修理する`}</button><button id="buy-boat" ${!i.pier||i.boat||e.coins<400?`disabled`:``}>${i.boat?`漁船を導入済み`:i.pier?e.coins<400?`漁船まであと`+(400-e.coins)+`メニー`:`400メニーで漁船を迎える`:`先に桟橋を直そう`}</button><p>漁船は8秒ごとに水揚げ。農園にいる間も働き、箱が満杯なら休みます。</p></article><div class="seeder-assignment"><h3>農園からの差し入れ</h3><p>倉庫の作物1個を使うと、1回の水揚げが1匹から2匹に。手作業も漁船も対象です。作物がない時は、使わずに1匹ずつ続けます。</p><label for="sea-supply">使う作物</label><select id="sea-supply"><option value="none">差し入れを休む</option>${l.map(t=>`<option value="${t}">${u[t].name}（倉庫 ${e.stock[t]}個）</option>`).join(``)}</select><p>これまでの差し入れ ${i.supplied}個</p></div>`,D.querySelector(`#sea-supply`).value=i.supply;let a=D.querySelector(`#seeder-plot`);a&&(a.value=String(e.seederPlot)),D.querySelector(`#play-journal`).innerHTML=xd(e.journal),t&&D.querySelector(`#${t}`)?.focus()}return D.querySelector(`.close-note`).addEventListener(`click`,()=>D.close()),D.addEventListener(`close`,()=>{k.reset(),n(!1)}),D.addEventListener(`click`,l=>{let u=l.target.closest(`button`);if(u&&!u.disabled){if(u.dataset.resident&&u.dataset.contribution){let r=e.requests.offer(u.dataset.resident,u.dataset.contribution,e);r&&(D.close(),n(!1),t(r))}if(u.dataset.breed){let t=h.find(e=>e.crop===u.dataset.breed);t&&e.breed(...t.parents)&&(i(e.message),e.message=``,N())}if(u.id===`task-records`&&M(`saves`),u.dataset.tab&&te(u.dataset.tab)&&M(u.dataset.tab),u.id===`visit-harbor`&&(D.close(),n(!1),r(_e.entry)),u.id===`sea-fishing`&&(D.close(),n(!1),r(_e.nets)),u.id===`buy-boat`&&e.harbor.buyBoat(e)&&(i(e.message),e.message=``,N()),u.dataset.tree!==void 0&&(D.close(),n(!1),i(`手入れする木のそばまで歩いて、止まろう。`)),u.id===`orchard-sell`&&(D.close(),n(!1),E()),u.dataset.food&&(D.close(),n(!1),m(u.dataset.food)),u.dataset.sea&&(D.close(),n(!1),c(u.dataset.sea)),u.dataset.store&&(D.close(),n(!1),s(u.dataset.store)),u.dataset.order&&(D.close(),n(!1),o(u.dataset.order)),u.dataset.project&&(D.close(),n(!1),a(u.dataset.project)),u.dataset.plot){let t=e.plots[Number(u.dataset.plot)];D.close(),n(!1),r({x:t.x,z:t.z+1.02})}}}),D.querySelector(`.note-tabs`).addEventListener(`keydown`,t=>{let n=t;if(![`ArrowLeft`,`ArrowRight`].includes(n.key))return;n.preventDefault();let r=[`tasks`,`crops`,`orders`,`restoration`,`investments`,`kitchen`,`residents`,`saves`,...e.agricultureComplete?[`harbor`]:[]];M(r[(r.indexOf(A)+(n.key===`ArrowRight`?1:r.length-1))%r.length]),D.querySelector(`[data-tab="${A}"]`).focus()}),D.addEventListener(`change`,t=>{let n=t.target;n.id===`helpers-enabled`&&(e.assignHelper(t.target.checked?e.plots.findIndex((t,n)=>e.isUnlocked(n)&&t.land===`tilled`):-1),N()),n.id===`harvester-plot`&&(e.machinery.configure(Number(n.value),e.machinery.paused,e),N()),n.id===`harvester-paused`&&(e.machinery.configure(e.machinery.anchor,t.target.checked,e),N()),n.id===`courier-enabled`&&(e.courier.configure(t.target.checked,e.courier.policy,e),N()),n.id===`courier-policy`&&(e.courier.configure(e.courier.enabled,n.value,e),N()),n.id===`kitchen-plan`&&(e.kitchen.setPlan(n.value,e),N()),n.id===`seeder-area-mode`&&(e.setArea(`seeder`,t.target.checked),N()),n.id===`helper-area-mode`&&(e.setArea(`helper`,t.target.checked),N()),n.id===`sea-supply`&&e.harbor.setSupply(n.value,e),n.id===`helper-plot`&&e.assignHelper(Number(n.value)),n.id===`seeder-plot`&&e.assignSeeder(Number(n.value)),n.dataset.crop&&e.planCrop(Number(n.dataset.crop),n.value)}),{dialog:D,render:N,open:(e=`tasks`)=>{if(!te(e)){i(`${ee[e]??`施設`}のそばまで歩いて利用しよう。`);return}n(!0),N(),M(e),D.showModal()}}}var Dd={leaf:`<path d="M19 4C9 3 3 7 5 14c2 7 14 5 14-10Z"/><path d="m5 21 9-12M9 15l-1-5"/>`,coin:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M12 8v8m-2-7h4m-4 6h4"/>`,basket:`<path d="m3 10 2 10h14l2-10ZM7 10l5-7 5 7M9 13v4m6-4v4M2 10h20"/>`,arrow:`<path d="M5 12h14m-6-6 6 6-6 6"/>`,sun:`<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>`,home:`<path d="m3 10 9-7 9 7v11H3Zm6 11v-9h6v9M6 8h12"/>`},Od=e=>`<svg viewBox="0 0 24 24" aria-hidden="true">${Dd[e]}</svg>`;document.querySelector(`#app`).innerHTML=`
  <canvas id="farm" aria-label="ひだまり農園。スワイプまたはドラッグで移動し、離すと止まります。キーボードのWASDまたは矢印キーでも移動できます。" tabindex="0"></canvas>
  <div id="movement-stick" hidden aria-hidden="true"><i></i></div>
  <div class="vignette"></div>
  <header class="topbar">
    <div class="identity"><span class="brand-icon">${Od(`leaf`)}</span><div><span class="wordmark">FARMER MATE</span><h1>ひだまり農園</h1></div></div>
    <div class="wallet" aria-label="所持メニー"><span class="coin">${Od(`coin`)}</span><div><small>メニー</small><strong id="coins">0</strong></div></div>
  </header>
  <div class="season">${Od(`sun`)} <span id="industry-label">第1ステージ：農業</span> <span>・</span> <span id="phase-label">忘れられた農園</span></div>
  <button id="harbor-toggle" class="harbor-toggle" hidden>港へ →</button>
  <button id="sea-marker" class="world-label" hidden>港の仕事</button>
  <button id="pasture-toggle" class="pasture-toggle">南の草地へ ↓</button>
  <button id="district-toggle" class="district-toggle">住宅地へ →</button>
  <button id="future-toggle" class="future-toggle" aria-pressed="false">${Od(`home`)} 復興後のイメージを見る</button>
  <nav class="farm-tools" aria-label="農園の管理"><button id="open-tasks">${Od(`home`)} できる仕事</button><button id="open-investments">${Od(`leaf`)} 施設を使う</button><button id="open-records">記録</button></nav>
  <div id="future-caption" class="future-caption" hidden><strong>この農園が、もう一度にぎわう日。</strong><span>復興後のイメージを表示中 · 作業は一時停止しています</span></div>
  <button id="ship-marker" class="world-label">${Od(`basket`)} 出荷する</button>
  <button id="truck-marker" class="world-label" hidden>注文を届ける</button>
  <button id="orchard-marker" class="world-label" hidden>果樹園</button>
  <button id="kitchen-marker" class="world-label" hidden>加工台</button>
  <button id="cottage-marker" class="world-label restoration-marker">住宅地の手入れ</button>
  <button id="restoration-marker" class="world-label restoration-marker">掃除用具</button><button id="storage-marker" class="world-label" hidden>共同倉庫</button><button id="workshop-marker" class="world-label">機械置き場</button><div id="payment" class="payment" hidden></div><div id="job-marker" class="world-label job-marker" hidden></div>
  <div id="action" class="action-label" hidden><span id="action-text"></span><div class="progress-track"><i id="action-fill"></i></div></div>
  <div id="toast" role="status" aria-live="polite"></div>
  <footer class="bottom-bar">
    <button id="quest-button" class="quest" aria-label="農園の仕事と復興を見る"><span class="quest-icon">${Od(`home`)}</span><div><small>人のいなくなった街に、もう一度暮らしを。</small><h2 id="quest-title">好きな畑から、片付けよう。</h2><p id="quest-description">草刈り → 耕作 → 種まき → 出荷</p><div class="quest-track"><i id="quest-fill"></i></div></div><span id="quest-count">0%</span></button>
    <button id="ship-button" class="basket-button"><span class="basket-icon">${Od(`basket`)}</span><span><small id="basket-title">収穫かご</small><strong><span id="inventory">0</span><em> / ${z.capacity}</em></strong><small id="cargo-summary"></small></span><span class="ship-action">かごを見る ${Od(`arrow`)}</span></button>
  </footer>
  <div class="help"><span class="desktop-help">ドラッグ / WASD で移動</span><span class="mobile-help">スワイプで移動 · 離すと停止</span><b>畑の近くで止まると作業 · 移動で中断</b></div>
  <div id="loading" class="loading"><span class="loading-leaf">${Od(`leaf`)}</span><h2>農園に朝がやってきます</h2><p>草木と畑の準備をしています…</p></div>
`;var Q=e=>document.getElementById(e),kd=Q(`farm`),$=new Ae,Ad=fd(new URL(`./`,document.baseURI).pathname),jd=!0;try{let e=localStorage.getItem(Ad);e&&$.restore(JSON.parse(e))}catch{jd=!1}var Md=0,Nd=()=>{},Pd=performance.now();function Fd(){Nd();let e=$.save();if(Md){let t=Date.now()-Md;for(let n of e.plots)n.stage===`growing`&&(n.readyAt+=t);for(let n of e.orchard.trees)n.tended&&(n.readyAt+=t)}return e}function Id(){try{localStorage.setItem(Ad,JSON.stringify(Fd())),Pd=performance.now()}catch{jd=!1}}var Ld=0;function Rd(e){Q(`toast`).textContent=e,Q(`toast`).classList.add(`visible`),Ld=performance.now()+4e3}async function zd(){let e=await dd(kd,$);Q(`loading`).remove();let t=new E,i=Q(`movement-stick`);function a(){t.end(),i.hidden=!0,$.funding.reset()}let o=null,s=[],c=new Pe,l=!1,u=null,f=null,p=null,m=null,h=null,g=null,_=!1,v=null,y=!1,b=document.hasFocus(),C=()=>l||document.hidden||!b||$.player.x>=23?`excluded`:y?`notebook`:$.action===`walking`?`moving`:$.isWorking?`working`:`looking`,D=()=>[...$.shipped>0?[`shipment`]:[],...$.investments.size?[`investment`]:[],...[`seeder`,`helper`,`driver`].some(e=>$.investments.has(e))?[`automation`]:[],...[2,3,4].filter(e=>$.restorationPhase>=e).map(e=>`phase-${e}`),...$.agricultureComplete?[`complete`]:[]];$.journal.observe(D(),!0),Nd=()=>{$.journal.sample(performance.now(),C()),$.journal.observe(D())},Nd();for(let e of[`pointerdown`,`keydown`,`wheel`])document.addEventListener(e,()=>{$.journal.interact(performance.now(),C())},{capture:!0,passive:!0});addEventListener(`focus`,()=>{b=!0,Nd()});function k(){o=null,s=[],f=null,p=null,m=null,h=null,g=null,_=!1,v=null}function A(e){y!==e&&(y=e,Nd(),P.clear(),a(),k(),$.interrupt(),c.reset(performance.now()),e?Md=Date.now():te())}function te(){Md&&$.shiftGrowth(Date.now()-Md),Md=0,Id()}let N=Ed({farm:$,visitResident:ae,pause:A,navigate:ie,notify:Rd,visitProject:oe,visitOrder:de,visitStore:I,visitSea:ue,visitFood:le,snapshot:Fd,importSave:se,importBackup:()=>localStorage.getItem(Ad+`:before-import`),now:()=>Md||Date.now(),visitOrchardSale:ce});Q(`open-tasks`).addEventListener(`click`,()=>{l||N.open($.player.x>=23?`harbor`:`tasks`)}),Q(`quest-button`).addEventListener(`click`,()=>{l||N.open($.player.x>=23?`harbor`:`tasks`)}),Q(`open-investments`).addEventListener(`click`,()=>{if(!l){let e=T($);e?N.open(e.id):Rd(`掃除用具・畑・販売車など、使う場所へ近づこう。`)}}),Q(`open-records`).addEventListener(`click`,()=>{l||N.open(`saves`)}),Q(`storage-marker`).addEventListener(`click`,()=>{l||N.open(`storage`)}),Q(`workshop-marker`).addEventListener(`click`,()=>{l||N.open(`investments`)});let P=new Set,ne=[`w`,`a`,`s`,`d`,`arrowup`,`arrowleft`,`arrowdown`,`arrowright`];addEventListener(`keydown`,e=>{l||y||!ne.includes(e.key.toLowerCase())||e.ctrlKey||e.metaKey||e.altKey||(e.preventDefault(),a(),P.add(e.key.toLowerCase()),k(),$.interrupt(),c.advance(performance.now(),!1,ve))}),addEventListener(`keyup`,e=>{P.delete(e.key.toLowerCase())&&c.advance(performance.now(),l||y||document.hidden,ve)});function re(){P.clear(),a(),k(),$.interrupt(),c.reset(performance.now()),Id()}addEventListener(`blur`,()=>{b=!1,Nd(),re()}),addEventListener(`pagehide`,()=>{b=!1,Nd(),re()}),document.addEventListener(`visibilitychange`,()=>{Nd(),c.reset(performance.now()),document.hidden&&re()});function ie(e){if(l||y)return!1;c.advance(performance.now(),document.hidden,ve);let t={x:Math.max(M.minX+.2,Math.min(M.maxX-.2,e.x)),z:Math.max(M.minZ+.2,Math.min(M.maxZ-.2,e.z))};if(!$.canStand(t))return Rd(`建物や海を避けて、地面を選ぼう。`),!1;let n=ee($.player,t,e=>$.canStand(e),M);return n?(k(),s=n,o=s.shift()??null,o&&$.interrupt(),kd.focus({preventScroll:!0}),!0):(Rd(`そこへ続く道が見つかりません。`),!1)}kd.addEventListener(`pointerdown`,e=>{e.button!==0||l||y||!t.begin(e.pointerId,e.clientX,e.clientY)||(k(),P.clear(),$.interrupt(),c.advance(performance.now(),document.hidden,ve),kd.setPointerCapture(e.pointerId),kd.focus({preventScroll:!0}))}),kd.addEventListener(`pointermove`,e=>{t.pointer===e.pointerId&&(t.move(e.pointerId,e.clientX,e.clientY),c.advance(performance.now(),l||y||document.hidden,ve),i.hidden=Math.hypot(t.offset.x,t.offset.y)<=8,i.style.left=`${t.origin.x}px`,i.style.top=`${t.origin.y}px`,i.firstElementChild.setAttribute(`style`,`transform:translate(${t.offset.x}px,${t.offset.y}px)`),$.journal.interact(performance.now(),C()),e.preventDefault())});for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])kd.addEventListener(e,e=>{t.pointer===e.pointerId&&(a(),c.advance(performance.now(),l||y||document.hidden,ve))});document.addEventListener(`touchcancel`,a,{passive:!0});function ae(e){$.requests.deliver(e,$)||Rd(`住人のそばで、必要な品を渡そう。`)}function oe(e){let t=$.projectReason(e);if(t){Rd(t);return}u=e,Rd(`仕事の印をつけました。現地まで歩いて止まろう。`)}function se(e){let t=new Ae;if(!t.restore(e))throw Error(`Invalid farm`);Ne(localStorage,Ad,Fd(),t.save()),$.restore(t.save()),$.journal.observe(D(),!0),$.player={...j},P.clear(),a(),k(),$.interrupt(),c.reset(performance.now()),Md=Date.now(),jd=!0}let F=()=>$.investments.has(`orchard`)&&$.player.x>9&&$.player.x<23&&$.player.z>2.4;function ce(){$.orchard.sell($)||Rd(`果樹園の集荷箱のそばで出荷しよう。`)}function le(e){$.kitchen.deliver(e,$)||Rd($.kitchen.deliveryReason(e,$)||`届け先のそばまで歩こう。`)}function ue(e){$.harbor.start(e,$)||Rd($.harbor.reason(e,$)||`浜へ近づこう。`)}function I(e){$.transfer(e)||Rd($.transferReason(e)||`共同倉庫のそばで受け渡ししよう。`)}function de(e){$.deliver(e)||Rd($.orderReason(e)||`販売車のそばで届けよう。`)}Q(`orchard-marker`).addEventListener(`click`,()=>{l||N.open(`orchard`)}),Q(`kitchen-marker`).addEventListener(`click`,()=>{l||N.open(`kitchen`)}),Q(`pasture-toggle`).addEventListener(`click`,()=>Rd(`南の草地は道を南へ。北の農地は納屋の横の道を北へ進もう。`)),Q(`harbor-toggle`).addEventListener(`click`,()=>{l||N.open(`harbor`)}),Q(`sea-marker`).addEventListener(`click`,()=>{l||N.open(`harbor`)}),Q(`district-toggle`).addEventListener(`click`,()=>Rd($.player.x>8?`農園は道を西へ。`:`住宅地は畑の道を東へ進もう。`)),Q(`truck-marker`).addEventListener(`click`,()=>{l||N.open(`orders`)}),Q(`cottage-marker`).addEventListener(`click`,()=>{l||($.residentsArrived?N.open(`residents`):Rd(`掃除用具で空き家の仕事を選び、現地で片付けよう。`))}),Q(`restoration-marker`).addEventListener(`click`,()=>{l||N.open(`restoration`)}),Q(`ship-button`).addEventListener(`click`,()=>{l||N.open(`basket`)}),Q(`ship-marker`).addEventListener(`click`,()=>{if(F()){ce();return}Rd($.player.x>=23?`港の集荷箱のそばで止まると出荷します。`:`納屋の前の木箱へ歩いて、止まると出荷します。`)}),Q(`future-toggle`).addEventListener(`click`,()=>{l=!l,Nd(),P.clear(),a(),k(),$.interrupt(),c.reset(performance.now()),l?Md=Date.now():te();for(let e of[`open-tasks`,`open-investments`,`open-records`,`quest-button`,`district-toggle`,`harbor-toggle`,`pasture-toggle`])Q(e).disabled=l;Q(`future-toggle`).setAttribute(`aria-pressed`,String(l)),Q(`future-toggle`).innerHTML=Od(`home`)+(l?`現在の農園に戻る`:`復興後のイメージを見る`),Q(`future-caption`).hidden=!l,Q(`ship-marker`).hidden=l,Q(`ship-button`).disabled=l,document.getElementById(`app`).classList.toggle(`future`,l)});let L=performance.now(),pe=0,me=-1,he=0,ge=(...e)=>+!!e.some(e=>P.has(e));function ve(n){let r=ge(`d`,`arrowright`)-ge(`a`,`arrowleft`),i=ge(`w`,`arrowup`)-ge(`s`,`arrowdown`),a=t.pointer===null?{x:r*.8575-i*.5145,z:-r*.5145-i*.8575}:t.input;for(;o&&De($.player,o)<.075;)o=s.shift()??null;if(o){let e=De($.player,o),t=Math.min(1,e/(z.speed*n));a={x:(o.x-$.player.x)/e*t,z:(o.z-$.player.z)/e*t}}f&&!o&&($.startProject(f)||Rd($.projectReason(f)||`仕事の場所へ近づこう。`),f=null),p&&!o&&($.deliver(p)||Rd($.orderReason(p)||`販売車へ近づこう。`),p=null),m&&!o&&($.transfer(m)||Rd($.transferReason(m)||`納屋へ近づこう。`),m=null),h&&!o&&($.harbor.start(h,$)||Rd($.harbor.reason(h,$)||`浜へ近づこう。`),h=null),g&&!o&&($.kitchen.deliver(g,$)||Rd($.kitchen.deliveryReason(g,$)||`届け先へ近づこう。`),g=null,_=!1,v=null),_&&!o&&($.orchard.sell($)||Rd(`集荷箱へ近づこう。`),_=!1),v&&!o&&($.requests.deliver(v,$)||Rd(`届ける品が変わりました。住人のお願いで、もう一度選ぼう。`),v=null),u&&$.projects.has(u)&&(u=null),u&&!$.isWorking&&Math.hypot(a.x,a.z)<=.08&&w($.player,be(u),z.range)&&$.startProject(u);let c={...$.player};$.step(n,a,Date.now());let l=De(c,$.player);if(o&&l<1e-4?(he+=n,he>.3&&(k(),he=0,Rd(`ここからは進めません。近くの地面を選ぼう。`))):he=0,Q(`farm`).classList.toggle(`rough-ground`,$.movementFactor()<1),$.action===`walking`)e.farmer.root.rotation.y=Math.atan2($.player.x-c.x,$.player.z-c.z);else if($.workPoint){let t=$.workPoint;e.farmer.root.rotation.y=Math.atan2(t.x-$.player.x,t.z-$.player.z)}}function ye(t){let i=Math.max(0,Math.min((t-L)/1e3,.5));L=t,pe+=i,c.advance(t,l||y||document.hidden,ve),Nd(),t-Pd>15e3&&Id();let a=s.length?s[s.length-1]:o;e.update(Math.min(i,.1),pe,Md||Date.now(),a,l);let f=$.player.x>=23;Q(`industry-label`).textContent=f?`第2ステージ：海産`:`第1ステージ：農業`,Q(`harbor-toggle`).hidden=!$.agricultureComplete,Q(`basket-title`).textContent=f?`水揚げ箱`:F()?`果樹園の箱`:`収穫かご`,Q(`ship-button`).querySelector(`em`).textContent=` / ${f?_e.capacity:F()?O.capacity:$.capacity}`,Q(`inventory`).textContent=String(f?$.harbor.fish:F()?$.orchard.box:$.inventory),Q(`cargo-summary`).textContent=f?`魚 ${$.harbor.fish}匹 · 出荷${$.harbor.sold}匹`:F()?`リンゴ ${$.orchard.fruit.apple} · ナシ ${$.orchard.fruit.pear}`:`コーン ${$.cargo.corn} · カブ ${$.cargo.turnip}${$.investments.has(`pumpkin-seeds`)?` · カボチャ ${$.cargo.pumpkin}`:``}${$.hybrids.has(`kabumorokoshi`)?` · 配合 ${$.cargo.kabumorokoshi}`:``}`;let p=e.screenPoint(O.sales,1);Q(`orchard-marker`).style.left=`${p.x}px`,Q(`orchard-marker`).style.top=`${p.y}px`,Q(`orchard-marker`).hidden=l||!$.investments.has(`orchard`);let m=e.screenPoint(fe,1.8);Q(`kitchen-marker`).style.left=`${m.x}px`,Q(`kitchen-marker`).style.top=`${m.y}px`,Q(`kitchen-marker`).hidden=l||!$.investments.has(`kitchen`),Q(`kitchen-marker`).textContent=$.kitchen.progress>0?`食品を加工中`:`加工台`;let h=e.screenPoint(_e.sales,1.4);Q(`sea-marker`).style.left=`${h.x}px`,Q(`sea-marker`).style.top=`${h.y}px`,Q(`sea-marker`).hidden=l||!$.agricultureComplete,Q(`phase-label`).textContent=f?$.harbor.pier?`漁の戻る港`:$.harbor.cleaned?`網を引く浜`:`忘れられた浜`:`${$.restorationPhase}/5 · ${Se[$.restorationPhase-1]}`;let g=f?$.harbor.percent:$.restorationPercent;Q(`quest-count`).textContent=`${g}%`,Q(`quest-fill`).style.width=`${g}%`,Q(`pasture-toggle`).textContent=`農地の場所`,Q(`pasture-toggle`).hidden=f,Q(`district-toggle`).textContent=`街の場所`;let _=e.screenPoint(V,.92);Q(`ship-marker`).style.left=`${_.x}px`,Q(`ship-marker`).style.top=`${_.y}px`;let v=e.screenPoint(d,1.8);Q(`truck-marker`).style.left=`${v.x}px`,Q(`truck-marker`).style.top=`${v.y}px`,Q(`truck-marker`).hidden=l||!$.investments.has(`truck`);let b=e.screenPoint({x:14.5,z:.2},1.2);Q(`cottage-marker`).style.left=`${b.x}px`,Q(`cottage-marker`).style.top=`${b.y}px`,Q(`cottage-marker`).hidden=l;let C=e.screenPoint(x,1.3);Q(`restoration-marker`).style.left=`${C.x}px`,Q(`restoration-marker`).style.top=`${C.y}px`,Q(`restoration-marker`).hidden=l;for(let[t,n]of[[`storage-marker`,B],[`workshop-marker`,S]]){let r=e.screenPoint(n,1.3);Q(t).style.left=`${r.x}px`,Q(t).style.top=`${r.y}px`,Q(t).hidden=l||t===`storage-marker`&&!$.projects.has(`barn-open`)}let w=T($);Q(`open-investments`).textContent=w?w.title+`を使う`:`施設を使う`;let E=$.paymentPad;if(Q(`payment`).hidden=l||y||!E,E){let e=Ce.find(e=>e.id===E.id);Q(`payment`).textContent=`${e.title} · ${$.funding.paid[e.id]??0} / ${e.price} メニー${$.coins===0?` · メニーを集めよう`:$.funding.dwell<1?` · 1秒止まると納付`:` · 納付中（移動で停止）`}`}if(Q(`job-marker`).hidden=l||!u,u){let t=be(u),n=e.screenPoint(t,1.5);Q(`job-marker`).style.left=`${n.x}px`,Q(`job-marker`).style.top=`${n.y}px`,Q(`job-marker`).textContent=t.title}let D=Q(`action`);if(D.hidden=l||y||!$.isWorking,$.isWorking){let t=e.screenPoint($.player,1.8);D.style.left=`${t.x}px`,D.style.top=`${t.y}px`,Q(`action-text`).textContent=Oe[$.action]+($.action===`harvesting`?` · ${r[$.harvestGrade($.plots[$.active].crop)]}見込み`:$.action===`picking`?` · ${r[$.harvestGrade(n($.orchard.active))]}見込み`:``),Q(`action-fill`).style.width=`${Math.min(100,$.progress*100)}%`}$.message&&=(Rd($.message),``),Q(`quest-title`).textContent=f?`港の再出発`:$.completedTasks.size?`農園の再出発 · ${$.completedTasks.size} / ${ke.length} の仕事`:`好きな畑から、片付けよう。`,Q(`quest-description`).textContent=f?`浜の片付け → 漁 → 出荷 → 桟橋と漁船`:$.agricultureComplete?`農業地区の復興、達成！ 実りを次の街へ。`:`仕事は掃除用具へ · 設備は床のMマスへ`,t>Ld&&Q(`toast`).classList.remove(`visible`),me!==$.revision&&(me=$.revision,Id(),Q(`coins`).textContent=$.coins.toLocaleString(`ja-JP`),y&&N.render()),requestAnimationFrame(ye)}requestAnimationFrame(ye),jd||Rd(`このブラウザーでは保存を利用できません。`)}zd().catch(e=>{console.error(e),Q(`loading`).innerHTML=`<h2>農園を開けませんでした</h2><p>ブラウザーの再読み込みをお試しください。</p><button id="retry">もう一度開く</button>`,Q(`retry`).addEventListener(`click`,()=>location.reload())});