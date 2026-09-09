(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=[`corn`,`turnip`,`pumpkin`,`kabumorokoshi`],t={corn:{name:`トウモロコシ`,seconds:18,yield:3,price:5,size:1},turnip:{name:`カブ`,seconds:11,yield:2,price:4,size:.72},kabumorokoshi:{name:`かぶもろこし`,seconds:11,yield:3,price:5,size:.8},pumpkin:{name:`カボチャ`,seconds:90,yield:1,price:42,size:.82}},n={x:-2.8,z:4.8},r=[{id:`pantry`,title:`街の共同台所`,detail:`戻ってきた人たちの食卓へ。`,needs:{corn:6,turnip:0,pumpkin:0,kabumorokoshi:0},coins:50},{id:`soup`,title:`あたたかいスープ`,detail:`片付けを手伝うみんなの昼ごはん。`,needs:{corn:0,turnip:4,pumpkin:0,kabumorokoshi:0},coins:28},{id:`autumn`,title:`秋色の食卓`,detail:`じっくり育てたカボチャを、街の食卓へ。`,needs:{corn:0,turnip:0,pumpkin:3,kabumorokoshi:0},coins:150},{id:`builders`,title:`港の準備隊のお弁当`,detail:`港を調べる人たちへ、畑からの差し入れ。`,needs:{corn:3,turnip:3,pumpkin:0,kabumorokoshi:0},coins:45}],i=[`apple`,`pear`],a={apple:{name:`リンゴ`,seconds:75,yield:4,price:7},pear:{name:`ナシ`,seconds:105,yield:3,price:14}},o=e=>e<3?`apple`:`pear`,s=[`E`,`D`,`C`,`B`,`A`,`S`],c=[1,1.25,1.65,2.2,3.1,4.5],l=[0,40,180,650,1400,3e3];function u(e,t=3){return Math.min(t,l.filter(t=>e>=t).length-1)}var d=class{counts;lots;ids;constructor(e,t){this.ids=e,this.lots=Object.fromEntries(e.map(e=>[e,[t?.[e]??0,0,0,0,0,0]])),this.counts={};for(let t of e)Object.defineProperty(this.counts,t,{enumerable:!0,get:()=>this.lots[t].reduce((e,t)=>e+t,0),set:e=>{let n=e-this.counts[t];n>0?this.add(t,n,0):n<0&&this.take(t,-n)}})}add(e,t,n){this.lots[e][n]+=t}take(e,t){let n=[0,0,0,0,0,0],r=Math.min(t,this.counts[e]);for(let t=0;t<6;t++){let i=Math.min(r,this.lots[e][t]);n[t]=i,this.lots[e][t]-=i,r-=i}return n}moveTo(e,t,n){this.take(t,n).forEach((n,r)=>e.add(t,n,r))}peek(e,t=this.counts[e]){let n=Math.min(t,this.counts[e]);return this.lots[e].map(e=>{let t=Math.min(e,n);return n-=t,t})}value(e,t,n=this.counts[e]){return this.peek(e,n).reduce((e,n,r)=>e+n*Math.round(t*c[r]),0)}save(){return Object.fromEntries(this.ids.map(e=>[e,[...this.lots[e]]]))}restore(e,t){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let n=e;return Object.keys(n).length!==this.ids.length||!this.ids.every(e=>Array.isArray(n[e])&&n[e].length===6&&n[e].every(e=>Number.isSafeInteger(e)&&e>=0)&&n[e].reduce((e,t)=>e+t,0)===t[e])?!1:(this.lots=Object.fromEntries(this.ids.map(e=>[e,[...n[e]]])),!0)}},f=class{crops;people={player:0,mina:0,ren:0};best=0;ids;constructor(e){this.ids=e,this.crops=Object.fromEntries(e.map(e=>[e,0]))}cropGrade(e,t){return u(this.crops[e],3+t)}personGrade(e){return u(this.people[e]??0,5)}harvest(e,t,n){let r=Math.min(this.cropGrade(e,n),this.personGrade(t));return this.crops[e]++,this.people[t]=(this.people[t]??0)+1,this.best=Math.max(this.best,r),r}machineHarvest(e,t,n){let r=Math.max(0,this.cropGrade(e,t)-(2-n));return this.crops[e]++,r}save(){return{crops:{...this.crops},people:{...this.people},best:this.best}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0;return!t.crops||!t.people||Object.keys(t.crops).length!==this.ids.length||!this.ids.every(e=>n(t.crops[e]))||![`player`,`mina`,`ren`].every(e=>n(t.people[e]))||Object.keys(t.people).length!==3||!n(t.best)||t.best>5?!1:(this.crops={...t.crops},this.people={...t.people},this.best=t.best,!0)}},p={x:-7.3,z:1.4,capacity:36},m=[`bread`,`soup`,`pumpkinSoup`,`pumpkinPie`,`appleJam`,`pearCompote`,`fruitTart`,`hybridGratin`],h=(e={})=>Object.fromEntries(m.map(t=>[t,e[t]??0])),g={bread:{name:`コーンパン`,needs:{corn:6,turnip:0,pumpkin:0,kabumorokoshi:0},seconds:8,yield:2,price:22},pumpkinSoup:{name:`カボチャポタージュ`,needs:{corn:2,turnip:0,pumpkin:2,kabumorokoshi:0},seconds:14,yield:3,price:42},pumpkinPie:{name:`カボチャパイ`,needs:{corn:4,turnip:0,pumpkin:1,kabumorokoshi:0},seconds:20,yield:2,price:48},appleJam:{name:`リンゴジャム`,needs:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{apple:6},seconds:18,yield:3,price:21},pearCompote:{name:`ナシのコンポート`,needs:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{pear:6},seconds:22,yield:3,price:42},fruitTart:{name:`果樹園のタルト`,needs:{corn:3,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{apple:3,pear:3},seconds:26,yield:3,price:42},hybridGratin:{name:`かぶもろこしグラタン`,needs:{corn:0,turnip:2,pumpkin:0,kabumorokoshi:6},seconds:16,yield:2,price:30},soup:{name:`野菜スープ`,needs:{corn:2,turnip:4,pumpkin:0,kabumorokoshi:0},seconds:12,yield:2,price:30}},_=[{id:`harvestTable`,title:`秋の収穫の食卓`,detail:`農園で育ったカボチャを、二つのおいしさに。`,needs:h({pumpkinSoup:2,pumpkinPie:2}),coins:220},{id:`teaTime`,title:`果樹園のお茶会`,detail:`リンゴとナシを使った、街の午後のお楽しみ。`,needs:h({appleJam:1,pearCompote:1,fruitTart:2}),coins:185},{id:`newFlavor`,title:`新しい実りの試食会`,detail:`新しい品種の味を、近所のみんなに。`,needs:h({hybridGratin:3,fruitTart:1}),coins:160},{id:`breakfast`,title:`街の朝ごはん`,detail:`帰ってきた家族に、焼きたてのパンを。`,needs:h({bread:3,soup:1}),coins:110},{id:`workers`,title:`畑仕事のお昼`,detail:`作業の合間に温かいスープを囲もう。`,needs:h({soup:4}),coins:138},{id:`gathering`,title:`週末の集まり`,detail:`久しぶりの顔も集まる、にぎやかな食卓へ。`,needs:h({bread:4,soup:4}),coins:240}],v=class{plan=`none`;quality=new d(m);get goods(){return this.quality.counts}set goods(e){this.quality=new d(m,e)}crafted=0;orders={breakfast:0,workers:0,gathering:0,harvestTable:0,teaTime:0,newFlavor:0};progress=0;get stored(){return m.reduce((e,t)=>e+this.goods[t],0)}get hasProgress(){return this.plan!==`none`||this.crafted>0||this.stored>0||Object.values(this.orders).some(e=>e>0)}unlocked(t,n){let r=g[t];return e.every(e=>r.needs[e]===0||n.cropUnlocked(e))&&i.every(e=>!r.fruit?.[e]||n.investments.has(e===`apple`?`orchard`:`pear-grove`))}reason(t){if(!t.investments.has(`kitchen`))return`納屋の加工台を導入すると使えます`;if(this.plan===`none`)return`加工をお休みしています`;let n=g[this.plan];if(this.stored+n.yield>p.capacity)return`食品棚がいっぱいです。売り先へ届けよう`;let r=e.filter(e=>t.stock[e]<n.needs[e]),a=i.filter(e=>t.orchard.fruit[e]<(n.fruit?.[e]??0));return r.length?`倉庫の材料を待っています`:a.length?`果樹園の集荷箱の材料を待っています`:``}setPlan(e,t){return!t.investments.has(`kitchen`)||![`none`,...m].includes(e)||e!==`none`&&!this.unlocked(e,t)?!1:this.plan===e||(this.plan=e,this.progress=0,t.revision++,!0)}step(t,n){if(this.reason(n)){this.progress=0;return}let r=this.plan,a=g[r];if(this.progress+=t/a.seconds,this.progress<1)return;let o=e.flatMap(e=>n.stockQuality.peek(e,a.needs[e]).flatMap((e,t)=>e?[t]:[]));for(let e of i)o.push(...n.orchard.quality.peek(e,a.fruit?.[e]??0).flatMap((e,t)=>e?[t]:[]));let s=Math.min(...o);for(let e of i){let t=a.fruit?.[e]??0;n.orchard.fruit[e]-=t,n.orchard.processed+=t}for(let t of e)n.stock[t]-=a.needs[t];this.quality.add(r,a.yield,s),this.crafted+=a.yield,this.progress=0,n.revision++}salePrice(e,t){return Math.round(g[e].price*(1+t.enterprises.level(`canteen`)*.05))}orderCoins(e){let t=_.find(t=>t.id===e),n=m.reduce((e,n)=>e+t.needs[n]*g[n].price,0),r=m.reduce((e,n)=>e+this.quality.value(n,g[n].price,t.needs[n])+Math.max(0,t.needs[n]-this.goods[n])*g[n].price,0);return Math.round(t.coins*r/n)}deliveryReason(e,t){if(!t.investments.has(`kitchen`))return`先に加工台を導入しよう`;if(e===`all`)return this.stored===0?`食品棚が空です`:``;if(!t.investments.has(`truck`))return`販売車を購入すると配達できます`;let n=_.find(t=>t.id===e);return n?m.filter(e=>this.goods[e]<n.needs[e]).map(e=>`${g[e].name} あと${n.needs[e]-this.goods[e]}個`).join(`・`):`見つからない注文です`}deliver(e,t){let r=e===`all`?p:n;if(this.deliveryReason(e,t)||Math.hypot(r.x-t.player.x,r.z-t.player.z)>1.35)return!1;let i=0;if(e===`all`)for(let e of m)i+=this.quality.value(e,this.salePrice(e,t)),this.goods[e]=0;else{let t=_.find(t=>t.id===e),n=m.reduce((e,n)=>e+t.needs[n]*g[n].price,0),r=m.reduce((e,n)=>e+this.quality.value(n,g[n].price,t.needs[n]),0);i=Math.round(t.coins*r/n);for(let e of m)this.goods[e]-=t.needs[e];this.orders[e]++}return t.coins+=i,t.revision++,t.message=`農園の味を届けて +${i} メニー！`,!0}save(){return{quality:this.quality.save(),plan:this.plan,goods:{...this.goods},crafted:this.crafted,orders:{...this.orders}}}restore(e,t=!1,n=!1){if(!e||typeof e!=`object`)return!1;let r=e,i=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,a=m.filter(e=>e!==`bread`&&e!==`soup`),o=n?{...r.goods,...Object.fromEntries(a.map(e=>[e,0]))}:r.goods,s=n?{...r.orders,harvestTable:0,teaTime:0,newFlavor:0}:r.orders,c=n?{...r.quality,...Object.fromEntries(a.map(e=>[e,[0,0,0,0,0,0]]))}:r.quality;if(![`none`,...m].includes(r.plan)||n&&r.plan!==`none`&&a.includes(r.plan)||!o||m.some(e=>!i(o[e]))||m.reduce((e,t)=>e+o[t],0)>p.capacity||!i(r.crafted)||r.crafted<m.reduce((e,t)=>e+o[t],0)||!s||_.some(e=>!i(s[e.id])))return!1;let l=new d(m,o);return!t&&!l.restore(c,o)?!1:(this.plan=r.plan,this.crafted=r.crafted,this.orders={...s},this.progress=0,this.quality=l,!0)}},y=[{id:`canteen`,title:`街の共同食堂`,detail:`農園の実りを囲んで、人が集まる場所をつくろう。`,x:18,z:-3.5,targets:[2400,9600,24e3],chapters:[`持ち寄りの台所`,`毎日開く食堂`,`街の食卓`],benefits:[`食品の通常売値 +5%`,`食品の通常売値 +10%`,`食品の通常売値 +15%`]},{id:`depot`,title:`北の共同集荷所`,detail:`広がった農地の近くに、実りを集める場所を。`,x:-5,z:-11.2,targets:[2400,9600,24e3],chapters:[`仮設の集荷箱`,`農道の集荷所`,`地域の出荷拠点`],benefits:[`共同倉庫の入口に。住民・コンベアも利用`,`共同倉庫の容量 +48個`,`入口の出荷箱で通常出荷も可能`]},{id:`seed-garden`,title:`種の保存園`,detail:`育ててきた作物の種を残し、次の実りにつなげよう。`,x:17,z:-9,targets:[2400,9600,24e3],chapters:[`小さな育苗棚`,`種を守る温室`,`実りをつなぐ園`],benefits:[`新しくまく作物の成長時間 -3%`,`新しくまく作物の成長時間 -6%`,`新しくまく作物の成長時間 -10%`]},{id:`harbor-link`,title:`港への供給協定`,detail:`育てた農業で、眠っている港の暮らしを支えよう。`,x:21,z:1.2,targets:[12e3,3e4,6e4],chapters:[`港へ続く道`,`港の生活物資`,`農業と海をつなぐ協定`],benefits:[`港の入口に案内板を設置`,`港へ届ける生活物資が揃います`,`海産地区へ進めます。農園は残ります`]}],b={x:-5,z:-8.2},x=e=>y.find(t=>t.id===e),S=[...e,...i,...m,`coins`],C=n=>n===`coins`?`メニー`:e.includes(n)?t[n].name:i.includes(n)?a[n].name:g[n].name,w=class{states=Object.fromEntries(y.map(e=>[e.id,{cleared:!1,level:0,contributed:0}]));active=null;progress=0;get workPoint(){return this.active?x(this.active):void 0}get finished(){return y.filter(e=>e.id!==`harbor-link`&&this.states[e.id].level===3).length}level(e){return this.states[e].level}fraction(e){let t=this.states[e],n=x(e);return t.level===3?1:(t.level+(t.cleared?.05:0)+t.contributed/n.targets[t.level]*.9)/3}get districtProgress(){return y.filter(e=>e.id!==`harbor-link`).map(e=>this.fraction(e.id)).sort((e,t)=>t-e).slice(0,2).reduce((e,t)=>e+t,0)/2}reason(e,t){return!t.residentsArrived||!t.projects.has(`barn-open`)?`納屋を再開し、家族の移住を終えよう`:e===`harbor-link`&&(!t.foundationComplete||this.finished<2)?`農園の基盤と、好きな2つの復興事業を完成させよう`:``}nearby(e){return y.find(t=>Math.hypot(t.x-e.player.x,t.z-e.player.z)<1.35)}interrupt(){this.active=null,this.progress=0}startNearby(e){let t=this.nearby(e);if(!t||this.reason(t.id,e))return!1;let n=this.states[t.id];return n.level===3||n.cleared&&n.contributed<t.targets[n.level]?!1:(this.active=t.id,this.progress=0,e.action=n.cleared?`repairing`:`cleaning`,!0)}step(e,t){if(!this.active)return;let n=t.agricultureComplete,r=this.active,i=this.states[r],a=x(r);if(this.reason(r,t)){this.interrupt();return}t.action=i.cleared?`repairing`:`cleaning`,this.progress+=e/(i.cleared?8:6),t.progress=this.progress,!(this.progress<1)&&(i.cleared?i.contributed===a.targets[i.level]&&(i.level++,i.contributed=0,t.message=`${a.chapters[i.level-1]}が完成！ ${a.benefits[i.level-1]}`):(i.cleared=!0,t.message=`${a.title}の敷地を片付けた！ 実りを持ち寄ろう。`),this.interrupt(),t.progress=0,t.action=`idle`,t.revision++,t.settleTasks(),!n&&t.agricultureComplete&&(t.message=`農業地区が復興！ この実りを、次は港の暮らしへ。`))}stock(t,n){return e.includes(t)?n.cargoQuality:i.includes(t)?n.orchard.quality:n.kitchen.quality}available(e,t){return e===`coins`?t.coins:this.stock(e,t).counts[e]}unitPrice(t,n){return e.includes(t)?n.salePrice(t):i.includes(t)?a[t].price:g[t].price}offer(e,t,n){if(!S.includes(t)||this.reason(e,n))return null;let r=this.states[e],i=x(e).targets[r.level]-r.contributed;if(!r.cleared||r.level===3||i<=0)return null;if(t===`coins`){let e=Math.min(i,n.coins);return e>0?{amount:e,value:e}:null}let a=this.stock(t,n).save()[t],o=0,s=0;for(let e=0;e<a.length&&s<i;e++){let r=Math.round(this.unitPrice(t,n)*c[e]),l=Math.min(a[e],Math.ceil((i-s)/r));o+=l,s+=l*r}return o>0?{amount:o,value:Math.min(s,i)}:null}donate(t,n,r){if(!y.some(e=>e.id===t)||this.nearby(r)?.id!==t)return!1;let a=this.offer(t,n,r);return a?(n===`coins`?r.coins-=a.amount:e.includes(n)?r.cargo[n]-=a.amount:i.includes(n)?(r.orchard.fruit[n]-=a.amount,r.orchard.donated+=a.amount):r.kitchen.goods[n]-=a.amount,this.states[t].contributed+=a.value,r.revision++,r.message=`${C(n)}を届けて、復興の準備 +${a.value}！`,!0):!1}save(){return Object.fromEntries(y.map(e=>[e.id,{...this.states[e.id]}]))}restore(e,t){if(!e||typeof e!=`object`||Array.isArray(e)||Object.keys(e).length!==y.length)return!1;let n=e;for(let e of y){let r=n[e.id];if(!r||typeof r.cleared!=`boolean`||!Number.isInteger(r.level)||r.level<0||r.level>3||!Number.isSafeInteger(r.contributed)||r.contributed<0||!r.cleared&&(r.level>0||r.contributed>0)||(r.level===3?r.contributed!==0:r.contributed>e.targets[r.level])||(r.cleared||r.level>0||r.contributed>0)&&(!t.residentsArrived||!t.projects.has(`barn-open`)))return!1}let r=y.filter(e=>e.id!==`harbor-link`&&n[e.id].level===3).length;return(n[`harbor-link`].cleared||n[`harbor-link`].level>0)&&(!t.foundationComplete||r<2)?!1:(this.states=Object.fromEntries(y.map(e=>[e.id,{...n[e.id]}])),this.interrupt(),!0)}},T={x:10.5,z:-7.6},E=[`corn`,`turnip`,`pumpkin`],D=[{crop:`kabumorokoshi`,parents:[`corn`,`turnip`],samples:12}];function O(e,t){if(e!==t&&E.includes(e)&&E.includes(t))return D.find(n=>n.parents.includes(e)&&n.parents.includes(t))}function k(e){return`<p class="note-intro">育ててきた作物から、新しい種を。実験台を導入したら、親の実りを倉庫へ預けよう。配合種は親にできません。</p>${D.map(n=>`<article class="investment-card"><h3>${t[n.crop].name}</h3><p>${n.parents.map(e=>t[e].name).join(` × `)}<br>${t[n.crop].seconds}秒で${t[n.crop].yield}個。コーンの収量と、カブの育つ速さを受け継ぎます。</p><p>${n.parents.map(r=>`${t[r].name}：栽培経験 ${e.expertise.crops[r]} / 40回・倉庫 ${e.stock[r]} / ${n.samples}個`).join(`<br>`)}</p><small>発見時に倉庫から各${n.samples}個を使います。発見後の種は無料。新しい品種の栽培経験はEから育てます。基本作物の注文や料理の原料を置き換えることはできません。</small><button data-breed="${n.crop}" id="breed-${n.crop}" ${e.breedReason(...n.parents)?`disabled`:``}>${e.breedReason(...n.parents)||`この組み合わせで種をつくる`}</button></article>`).join(``)}`}var A={pumpkin:`カボチャ`,corn:`コーン`,turnip:`カブ`,bread:`コーンパン`,soup:`野菜スープ`,apple:`リンゴ`,coins:`メニー`},j=[{id:`family`,name:`ユイと家族`,requires:`cottage-welcome`,x:16,z:1,chapters:[{title:`朝ごはんのある家`,detail:`「帰ってきた朝に、温かいごはんを。農園の実りを少し分けてもらえますか？」`,thanks:`ユイ「窓辺に花も飾ったの。また寄ってね！」`,target:80,accepts:{pumpkin:48,corn:6,turnip:5,bread:30,soup:40,coins:1}},{title:`庭で、ひと休み`,detail:`「庭にテーブルを置いて、ご近所さんと実りを分け合いたいの。」`,thanks:`ユイ「次はみんなで、この庭を囲みましょう。」`,target:180,accepts:{pumpkin:48,corn:6,apple:9,bread:30,coins:1}},{title:`ただいまが聞こえる庭`,detail:`「昔の友達も帰ってくるって。みんなを迎える食卓を、もう一度。」`,thanks:`ユイ「この街に帰ってきて、よかった！」`,target:360,accepts:{turnip:5,apple:9,soup:40,coins:1}}]},{id:`market`,name:`青果商のハル`,requires:`town-market`,x:-6.5,z:1,chapters:[{title:`色の並ぶ青果市`,detail:`「再開した売り場に、農園の色を並べよう。小さな納品からで大丈夫！」`,thanks:`ハル「通りがかった人が、足を止めてくれたよ。」`,target:100,accepts:{pumpkin:48,corn:6,turnip:5,apple:9,coins:1}},{title:`買い物帰りの休憩所`,detail:`「立ち話のできる場所があるといいね。売り上げでも実りでも、力を貸してほしい。」`,thanks:`ハル「ここで話していると、街のことが見えてくるね。」`,target:250,accepts:{pumpkin:48,corn:6,bread:30,apple:9,coins:1}},{title:`週末の小さな市`,detail:`「近くの家からも出店したいって。食べ物と花が並ぶ市にしよう！」`,thanks:`ハル「農園の実りが、人を呼ぶ市になった！」`,target:500,accepts:{pumpkin:48,corn:6,turnip:5,bread:30,soup:40,apple:9,coins:1}}]},{id:`cooperative`,name:`納屋番のソラ`,requires:`barn-open`,x:-2.2,z:-.4,chapters:[{title:`働いたあとのひと皿`,detail:`「納屋を使うみんなで、ひと休みできる場所をつくろう。」`,thanks:`ソラ「仕事の合間にも、顔を合わせられるね。」`,target:100,accepts:{pumpkin:48,corn:6,turnip:5,soup:40,coins:1}},{title:`仲間と囲む昼ごはん`,detail:`「それぞれの畑の話をしながら食べたいな。少しずつ持ち寄ろう。」`,thanks:`ソラ「農園の工夫を話せる仲間が増えたよ。」`,target:220,accepts:{pumpkin:48,corn:6,bread:30,soup:40,coins:1}},{title:`実りを持ち寄る日`,detail:`「家族も青果市の人も呼んで、農園で育ったものを分け合いたい。」`,thanks:`ソラ「ひとりの畑から、みんなの農園になったね！」`,target:420,accepts:{pumpkin:48,corn:6,turnip:5,apple:9,bread:30,soup:40,coins:1}}]}],ee=class{progress={family:{chapter:0,contributed:0},market:{chapter:0,contributed:0},cooperative:{chapter:0,contributed:0}};get hasProgress(){return Object.values(this.progress).some(e=>e.chapter>0||e.contributed>0)}available(e,t){return e===`coins`?t.coins:e===`apple`?t.orchard.fruit.apple:e===`bread`||e===`soup`?t.kitchen.goods[e]:t.cargo[e]}offer(e,t,n){let r=j.find(t=>t.id===e);if(!r||!n.residentsArrived||!n.projects.has(r.requires))return null;let i=this.progress[e],a=r.chapters[i.chapter],o=a?.accepts[t];if(!o)return null;let s=Math.min(this.available(t,n),Math.ceil((a.target-i.contributed)/o));return s>0?{resident:e,chapter:i.chapter,kind:t,amount:s}:null}deliver(e,t){let n=j.find(t=>t.id===e.resident);if(!n||Math.hypot(t.player.x-n.x,t.player.z-n.z)>1.35||!Number.isSafeInteger(e.amount)||e.amount<=0)return!1;let r=this.offer(e.resident,e.kind,t);if(!r||r.chapter!==e.chapter||e.amount>r.amount)return!1;let i=this.progress[e.resident],a=n.chapters[i.chapter];return e.kind===`coins`?t.coins-=e.amount:e.kind===`apple`?(t.orchard.fruit.apple-=e.amount,t.orchard.donated+=e.amount):e.kind===`bread`||e.kind===`soup`?t.kitchen.goods[e.kind]-=e.amount:t.cargo[e.kind]-=e.amount,i.contributed=Math.min(a.target,i.contributed+e.amount*a.accepts[e.kind]),t.revision++,t.message=`${n.name}へ ${A[e.kind]} ${e.amount}${e.kind===`coins`?`メニー`:`個`}を届けた！`,i.contributed>=a.target&&(i.chapter++,i.contributed=0,t.settleTasks(),t.message=a.thanks),!0}save(){return Object.fromEntries(j.map(e=>[e.id,{...this.progress[e.id]}]))}restore(e){if(!e||typeof e!=`object`)return!1;let t=e;return j.every(e=>{let n=t[e.id];return n&&Number.isInteger(n.chapter)&&n.chapter>=0&&n.chapter<=e.chapters.length&&Number.isSafeInteger(n.contributed)&&n.contributed>=0&&(n.chapter===e.chapters.length?n.contributed===0:n.contributed<e.chapters[n.chapter].target)})?(this.progress=Object.fromEntries(j.map(e=>[e.id,{chapter:t[e.id].chapter,contributed:t[e.id].contributed}])),!0):!1}},M={x:-1.3,z:3.9},te={x:8.5,z:.8},ne=[{ids:[`expansion`],x:-3.4,z:-8.3},{ids:[`north-meadow`],x:-3.4,z:-11.2},{ids:[`north-ridge`],x:-3.4,z:-17.4},{ids:[`pasture`],x:-3.4,z:7.2},{ids:[`harvester`,`harvester-precision`,`harvester-premium`],x:9.5,z:-4.8},{ids:[`harvester-second`,`harvester-second-precision`,`harvester-second-premium`],x:8.4,z:7.3},{ids:[`harvester-third`,`harvester-third-precision`,`harvester-third-premium`],x:9.5,z:-11.2},{ids:[`breeding`],x:9.5,z:-8.3},{ids:[`breeding-a`,`breeding-s`],x:11,z:-8.3},{ids:[`tools`],x:-.5,z:5},{ids:[`basket`],x:1.5,z:5},{ids:[`truck`,`driver`],x:-2.8,z:6.1},{ids:[`seeder`,`seeder-area`],x:8.4,z:-2},{ids:[`seeder-second`],x:8.4,z:5.3},{ids:[`seeder-third`],x:8.4,z:-13.2},{ids:[`pumpkin-seeds`],x:8.4,z:-6.4},{ids:[`helper`,`helper-area`],x:4.7,z:6.1},{ids:[`warehouse`],x:-7.7,z:.3},{ids:[`kitchen`],x:-7.7,z:2.2},{ids:[`orchard`,`pear-grove`],x:19,z:5.3}],N=ne.flatMap(e=>e.ids.map(t=>({id:t,x:e.x,z:e.z})));function re(e){return ne.flatMap(t=>{let n=t.ids.find(t=>!e.investments.has(t));return n&&!e.investmentReason(n,!0)&&(e.coins>0||(e.funding.paid[n]??0)>0)?[{id:n,x:t.x,z:t.z}]:[]})}var P=(e,t,n=2.6)=>Math.hypot(e.x-t.x,e.z-t.z)<n;function ie(e){let t=e.player,n=[...y.filter(t=>!e.enterprises.reason(t.id,e)).map(e=>({...e,id:`enterprises`})),{id:`breeding`,title:`品種配合の実験台`,...T},{id:`restoration`,title:`掃除用具`,...M},{id:`investments`,title:`機械置き場`,...te},{id:`orders`,title:`販売車`,x:-2.8,z:4.8},{id:`storage`,title:`共同倉庫`,x:-5.5,z:.3},{id:`kitchen`,title:`加工台`,x:-7.3,z:1.4},{id:`orchard`,title:`果樹園`,x:12.6,z:2.8},...j.filter(t=>e.projects.has(t.requires)).map(e=>({...e,id:`residents`,title:e.name})),...re(e).map(e=>({...e,id:`investments`,title:`設備の強化`}))].filter(n=>P(t,n)&&!(n.id===`residents`&&!e.residentsArrived)&&!(n.id===`storage`&&!e.projects.has(`barn-open`))&&!(n.id===`kitchen`&&!e.investments.has(`kitchen`))&&!(n.id===`orchard`&&!e.investments.has(`orchard`))&&!(n.id===`orders`&&!e.investments.has(`truck`))).sort((e,n)=>Math.hypot(t.x-e.x,t.z-e.z)-Math.hypot(t.x-n.x,t.z-n.z))[0];if(n)return n;let r=e.plots.findIndex((n,r)=>e.isUnlocked(r)&&P(t,n,1.7));return r>=0?{id:`crops`,title:`畑 ${r+1} の作付け`,...e.plots[r]}:null}var ae=class{pointer=null;origin={x:0,y:0};offset={x:0,y:0};begin(e,t,n){return this.pointer===null&&(this.pointer=e,this.origin={x:t,y:n},this.offset={x:0,y:0},!0)}move(e,t,n){if(this.pointer!==e)return;let r=t-this.origin.x,i=n-this.origin.y,a=Math.hypot(r,i),o=a>64?64/a:1;this.offset={x:r*o,y:i*o}}end(e=this.pointer){e===this.pointer&&(this.pointer=null,this.offset={x:0,y:0})}get input(){let e=Math.hypot(this.offset.x,this.offset.y);if(e<=8)return{x:0,z:0};let t=Math.min(1,(e-8)/40),n=this.offset.x/e*t,r=this.offset.y/e*t;return{x:n*.8575+r*.5145,z:-n*.5145+r*.8575}}},oe=[{x:11.2,z:5},{x:14.1,z:5.2},{x:17,z:5.5},{x:20,z:4.8},{x:22.2,z:3.5}],se={sales:{x:12.6,z:2.8},seconds:75,pruneSeconds:4,pickSeconds:2.2,yield:4,capacity:24,price:7},ce=e=>({x:oe[e].x,z:oe[e].z+.8}),le=class{trees=oe.map(()=>({tended:!1,readyAt:0}));quality=new d(i);get fruit(){return this.quality.counts}get box(){return i.reduce((e,t)=>e+this.fruit[t],0)}set box(e){let t=e-this.box;if(t>0)this.fruit.apple+=t;else for(let e of i){let n=Math.min(this.fruit[e],-t);this.fruit[e]-=n,t+=n}}harvested=0;sold=0;donated=0;processed=0;active=-1;progress=0;get workPoint(){return this.active>=0?oe[this.active]:void 0}get hasProgress(){return this.box>0||this.harvested>0||this.sold>0||this.donated>0||this.processed>0||this.trees.some(e=>e.tended)}unlocked(e,t){return t.investments.has(`orchard`)&&(o(e)===`apple`||t.investments.has(`pear-grove`))}ripe(e,t){return this.trees[e].tended&&this.trees[e].readyAt<=t}interrupt(){this.active=-1,this.progress=0}startNearby(e,t){let n=oe.map((t,n)=>({i:n,distance:Math.hypot(t.x-e.player.x,t.z-e.player.z)})).filter(({i:n,distance:r})=>this.unlocked(n,e)&&r<1.35&&(!this.trees[n].tended||this.ripe(n,t)&&this.box+a[o(n)].yield<=se.capacity)).sort((e,t)=>e.distance-t.distance);return n[0]?(this.active=n[0].i,this.progress=0,!0):!1}step(e,t,n){if(this.active<0)return;let r=this.trees[this.active],i=r.tended,c=o(this.active),l=a[c];if(t.action=i?`picking`:`pruning`,this.progress+=e/((i?se.pickSeconds:se.pruneSeconds)*(t.investments.has(`tools`)?.65:1)),t.progress=this.progress,!(this.progress<1)){if(i){if(!this.ripe(this.active,n)||this.box+l.yield>se.capacity){this.interrupt(),t.progress=0,t.action=`idle`;return}let e=t.expertise.harvest(c,`player`,t.research);this.quality.add(c,l.yield,e),this.harvested+=l.yield,t.message=`${l.name}${l.yield}個を集荷箱へ！ 品質 ${s[e]}`}else r.tended=!0,t.message=`枝を整えた！ この木から、何度でも実りを。`;r.readyAt=Math.round(n+l.seconds*1e3),t.revision++,this.interrupt(),t.progress=0,t.action=`idle`,t.settleTasks()}}sell(e){if(!e.investments.has(`orchard`)||this.box===0||Math.hypot(e.player.x-se.sales.x,e.player.z-se.sales.z)>1.35)return!1;let t=this.box,n=i.reduce((e,t)=>e+this.quality.value(t,a[t].price),0);return e.coins+=n,e.shipped+=t,this.sold+=t,this.box=0,e.revision++,e.message=`果実${t}個を届けて +${n} メニー！`,e.settleTasks(),!0}save(){return{quality:this.quality.save(),fruit:{...this.fruit},trees:this.trees.map(e=>({...e})),box:this.box,harvested:this.harvested,sold:this.sold,donated:this.donated,processed:this.processed}}restore(e,t=!1,n=t,r=!1){if(!e||typeof e!=`object`)return!1;let a=e,o=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,s=t?0:a.donated,c=r?0:a.processed,l=r?{apple:a.box,pear:0}:a.fruit;if(!o(s)||!o(c)||!l||i.some(e=>!o(l[e]))||!Array.isArray(a.trees)||!r&&a.trees.length!==5||r&&!(a.trees.length===3||a.trees.length===5&&a.trees.slice(3).every(e=>e&&!e.tended&&e.readyAt===0))||a.trees.some(e=>!e||typeof e.tended!=`boolean`||!o(e.readyAt)||(e.tended?e.readyAt===0:e.readyAt!==0))||!o(a.box)||a.box>se.capacity||a.box!==l.apple+l.pear||!o(a.harvested)||!o(a.sold)||a.harvested!==a.box+a.sold+s+c||a.harvested>0&&!a.trees.some(e=>e.tended))return!1;let u=new d(i,l),f=r?{...a.quality,pear:[0,0,0,0,0,0]}:a.quality;return!n&&!u.restore(f,l)?!1:(this.trees=r?[...a.trees.slice(0,3).map(e=>({...e})),{tended:!1,readyAt:0},{tended:!1,readyAt:0}]:a.trees.map(e=>({...e})),this.harvested=a.harvested,this.sold=a.sold,this.donated=s,this.processed=c,this.quality=u,this.interrupt(),!0)}},F=[{title:`中央の農地`,first:0,last:9,station:{x:7.8,z:-5.2}},{title:`南の草地`,first:9,last:15,station:{x:7.8,z:10.7}},{title:`北の農地`,first:15,last:27,station:{x:7.8,z:-14.2}}];function ue(e,t){let n=F[e];return t.plots.map((e,t)=>t).filter(e=>e>=n.first&&e<n.last&&t.isUnlocked(e)&&t.plots[e].land===`tilled`)}var de=[`seeder-second`,`seeder-third`],fe=class{slot;anchor=-1;paused=!1;planted=0;active=-1;progress=0;cursor=-1;constructor(e){this.slot=e}owned(e){return e.investments.has(de[this.slot-1])}get hasProgress(){return this.anchor>=0||this.paused||this.planted>0}plots(e){return this.owned(e)?ue(this.slot,e):[]}reset(){this.active=-1,this.progress=0,this.cursor=-1}configure(e,t,n){return!this.owned(n)||typeof t!=`boolean`||!Number.isInteger(e)||e<-1||e>=n.plots.length||e>=0&&(!n.isUnlocked(e)||n.plots[e].land!==`tilled`||n.seedRowTaken(e,this.slot))?!1:(this.anchor=e,this.paused=t,this.reset(),n.revision++,!0)}step(e,t,n){if(!this.owned(n))return;this.paused=!1,this.anchor=this.plots(n)[0]??-1;let r=this.plots(n),i=e=>n.plots[e].stage===`empty`&&n.active!==e&&n.playerPriorityPlot!==e&&!n.workers.busy(e)&&!n.machineBusy(e);if(this.active>=0&&(!r.includes(this.active)||!i(this.active))&&this.reset(),this.active<0){let e=r.indexOf(this.cursor)+1;this.active=[...r.slice(e),...r.slice(0,e)].find(i)??-1}if(this.active<0||(this.progress+=e/2.4,this.progress<1))return;let a=n.plots[this.active];a.crop=a.nextCrop,a.stage=`growing`,a.readyAt=t+Math.round(n.growSeconds(a.crop)*1e3),this.planted++,this.cursor=this.active,this.active=-1,this.progress=0,n.revision++}save(){return{anchor:this.anchor,paused:this.paused,planted:this.planted}}restore(e,t){if(!e||typeof e!=`object`)return!1;let n=e;return!Number.isInteger(n.anchor)||n.anchor<-1||n.anchor>=t.plots.length||typeof n.paused!=`boolean`||!Number.isSafeInteger(n.planted)||n.planted<0||n.anchor>=0&&(!t.isUnlocked(n.anchor)||t.plots[n.anchor].land!==`tilled`)||!this.owned(t)&&(n.anchor>=0||n.paused||n.planted>0)?!1:(this.anchor=this.plots(t)[0]??-1,this.paused=!1,this.planted=n.planted,this.reset(),!0)}},I=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z);function pe(e,t,n,r){if(!n(e)||!n(t))return null;let i=(e,t)=>{let r=Math.max(1,Math.ceil(I(e,t)/.1));for(let i=1;i<=r;i++)if(!n({x:e.x+(t.x-e.x)*i/r,z:e.z+(t.z-e.z)*i/r}))return!1;return!0};if(i(e,t))return I(e,t)<.03?[]:[t];let a=.4,o=Math.floor((r.maxX-r.minX)/a)+1,s=Math.floor((r.maxZ-r.minZ)/a)+1,c=e=>({x:r.minX+e%o*a,z:r.minZ+Math.floor(e/o)*a}),l=new Map,u=(e,t)=>{if(e<0||e>=o||t<0||t>=s)return!1;let r=t*o+e;if(!l.has(r)){let e=c(r);l.set(r,n(e)&&[{x:e.x-.12,z:e.z},{x:e.x+.12,z:e.z},{x:e.x,z:e.z-.12},{x:e.x,z:e.z+.12}].every(n))}return l.get(r)},d=e=>{let t=Math.round((e.x-r.minX)/a),n=Math.round((e.z-r.minZ)/a),s=[];for(let e=-2;e<=2;e++)for(let r=-2;r<=2;r++)u(t+r,n+e)&&s.push((n+e)*o+t+r);return s.sort((t,n)=>I(c(t),e)-I(c(n),e)).find(t=>i(e,c(t)))},f=d(e),p=d(t);if(f===void 0||p===void 0)return null;let m=new Float64Array(o*s).fill(1/0),h=new Int32Array(o*s).fill(-1),g=new Set,_=e=>{let t=Math.abs(e%o-p%o),n=Math.abs(Math.floor(e/o)-Math.floor(p/o));return Math.max(t,n)+(Math.SQRT2-1)*Math.min(t,n)},v=[],y=(e,t)=>{let n=v.length;for(v.push({id:e,score:t});n>0;){let e=n-1>>1;if(v[e].score<=t)break;[v[e],v[n]]=[v[n],v[e]],n=e}},b=()=>{let e=v[0],t=v.pop();if(v.length){v[0]=t;let e=0;for(;;){let t=e*2+1;if(t>=v.length||(t+1<v.length&&v[t+1].score<v[t].score&&t++,v[e].score<=v[t].score))break;[v[e],v[t]]=[v[t],v[e]],e=t}}return e.id};m[f]=0,y(f,_(f));let x=!1;for(;v.length;){let e=b();if(g.has(e))continue;if(e===p){x=!0;break}g.add(e);let t=e%o,n=Math.floor(e/o);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(i===0&&r===0||!u(t+i,n+r)||i!==0&&r!==0&&(!u(t+i,n)||!u(t,n+r)))continue;let a=(n+r)*o+t+i,s=m[e]+(i&&r?Math.SQRT2:1);s<m[a]&&(m[a]=s,h[a]=e,y(a,s+_(a)))}}if(!x)return null;let S=[t];for(let e=p;e!==-1;e=h[e])S.push(c(e));S.reverse();let C=[],w=e,T=0;for(;T<S.length;){let e=S.length-1;for(;e>T&&!i(w,S[e]);)e--;if(!i(w,S[e]))return null;C.push(S[e]),w=S[e],T=e+1}return C}var me={x:14,z:-2,halfX:1.6,halfZ:1.6},he={x:14.5,z:1},ge={x:-.6,z:2.5},_e={minX:-9,maxX:35,minZ:-22,maxZ:15.5},ve=e=>e===`depot`?`北の集荷所`:`納屋の倉庫`,ye=e=>e===`depot`?x(`depot`):Ue,be=e=>e.enterprises.level(`depot`)>=1?[`barn`,`depot`]:[`barn`];function L(e,t){return be(t).map(n=>({id:n,route:pe(e,ye(n),e=>t.canStand(e),_e)})).filter(e=>e.route!==null).map(t=>({...t,length:t.route.reduce((n,r,i)=>{let a=i?t.route[i-1]:e;return n+Math.hypot(r.x-a.x,r.z-a.z)},0)})).sort((e,t)=>e.length-t.length)[0]}var xe=class{id;position;bag=new d(e);harvested=0;planted=0;seed;destination=`barn`;target=-1;route=[];progress=0;action=`idle`;heading=0;constructor(e){this.id=e,this.position={x:14.5,z:1.5},this.seed=e===`mina`?8731:4973}get count(){return e.reduce((e,t)=>e+this.bag.counts[t],0)}reset(){this.target=-1,this.route=[],this.progress=0,this.action=`idle`}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}save(){return{position:{...this.position},goods:this.bag.save(),harvested:this.harvested,planted:this.planted,seed:this.seed}}restore(t,n){if(!t||typeof t!=`object`)return!1;let r=t,i=e=>Number.isSafeInteger(e)&&e>=0;if(!r.position||!Number.isFinite(r.position.x)||!Number.isFinite(r.position.z)||!n.canStand(r.position)||r.position.x>=23||!i(r.harvested)||!i(r.planted)||!i(r.seed)||r.seed>4294967295||!r.goods)return!1;let a=Object.fromEntries(e.map(e=>[e,Array.isArray(r.goods[e])?r.goods[e].reduce((e,t)=>e+t,0):-1])),o=new d(e);return!o.restore(r.goods,a)||Object.values(a).reduce((e,t)=>e+t,0)>12||Object.values(a).some(e=>!i(e))||e.some(e=>a[e]>0&&!n.cropUnlocked(e))||r.harvested<Object.values(a).reduce((e,t)=>e+t,0)?!1:(this.position={...r.position},this.bag=o,this.harvested=r.harvested,this.planted=r.planted,this.seed=r.seed,this.reset(),!0)}},Se=class{people=[new xe(`mina`),new xe(`ren`)];enabled(e,t){return t.residentsArrived&&t.investments.has(e.id===`mina`?`helper`:`helper-area`)}busy(e,t){return this.people.some(n=>n!==t&&n.target===e)}cancel(){for(let e of this.people)e.reset()}step(n,r,i){for(let a of this.people){if(!this.enabled(a,i)){a.reset();continue}let o=e=>{let n=i.plots[e];return i.isUnlocked(e)&&n.land===`tilled`&&i.active!==e&&i.playerPriorityPlot!==e&&!i.machineBusy(e)&&!i.seedingBusy(e)&&!this.busy(e,a)&&(n.stage===`empty`||n.stage===`ready`&&a.count+t[n.crop].yield<=12)};if(a.target>=0&&!o(a.target)&&a.reset(),i.helperPlot<0&&a.action!==`returning`&&a.reset(),a.action===`idle`){let e=i.helperPlot<0?[]:i.plots.map((e,t)=>t).filter(o).map(e=>({i:e,score:Math.hypot(i.plots[e].x-a.position.x,i.plots[e].z-a.position.z)*(.6+a.random()*.8)})).sort((e,t)=>e.score-t.score);if(a.count>=9||a.count>0&&!e.length||i.helperPlot<0&&a.count>0){let e=L(a.position,i);if(!e)continue;a.route=e.route,a.destination=e.id,a.action=`returning`}else if(e.length)for(let{i:t}of e){let e=i.plots[t],n=pe(a.position,{x:e.x,z:e.z+1.02},e=>i.canStand(e),_e);if(n){a.target=t,a.route=n,a.action=`walking`;break}}}if(a.route.length){let e=n*2.6*i.movementFactor(a.position);for(;e>0&&a.route.length;){let t=a.route[0],n=t.x-a.position.x,r=t.z-a.position.z,i=Math.hypot(n,r),o=Math.min(i,e);i>0&&(a.heading=Math.atan2(n,r),a.position.x+=n/i*o,a.position.z+=r/i*o),e-=o,i<=o&&a.route.shift()}continue}if(a.action===`returning`){let t=ye(a.destination);if(Math.hypot(a.position.x-t.x,a.position.z-t.z)>1.35){a.reset();continue}let n=i.storageCapacity-i.stored;for(let t of e){let e=Math.min(n,a.bag.counts[t]);e&&(a.bag.moveTo(i.stockQuality,t,e),n-=e,i.revision++)}a.count===0&&a.reset();continue}if(a.target<0)continue;let s=i.plots[a.target];if(a.action=s.stage===`empty`?`planting`:`harvesting`,a.progress+=n/(a.action===`planting`?2:3),!(a.progress<1)){if(a.action===`planting`)s.crop=s.nextCrop,s.stage=`growing`,s.readyAt=r+Math.round(i.growSeconds(s.crop)*1e3),a.planted++;else{let e=t[s.crop].yield;a.bag.add(s.crop,e,i.expertise.harvest(s.crop,a.id,i.research)),s.stage=`empty`,a.harvested+=e,i.helperHarvested+=e}i.revision++,a.reset()}}}save(){return Object.fromEntries(this.people.map(e=>[e.id,e.save()]))}restore(e,t){if(!e||typeof e!=`object`||Object.keys(e).length!==2)return!1;let n=e,r=[new xe(`mina`),new xe(`ren`)];return!r.some(e=>!e.restore(n[e.id],t)||!t.investments.has(e.id===`mina`?`helper`:`helper-area`)&&(e.count>0||e.harvested>0||e.planted>0))&&(this.people=r,!0)}},Ce=[{title:`小さな収穫ロボット`,seconds:6,speed:.65,penalty:2},{title:`精密収穫ユニット`,seconds:3,speed:1.25,penalty:1},{title:`高性能収穫ユニット`,seconds:1.2,speed:2.5,penalty:0}],R=[[`harvester`,`harvester-precision`,`harvester-premium`],[`harvester-second`,`harvester-second-precision`,`harvester-second-premium`],[`harvester-third`,`harvester-third-precision`,`harvester-third-premium`]],we=(e,t=`barn`)=>{let n=ye(t);return[{x:e.x,z:e.z+1.4},{x:-2,z:e.z+1.4},{x:-2,z:n.z},{x:n.x,z:n.z}]},z=(e,t)=>be(t).sort((t,n)=>B(we(e,t))-B(we(e,n)))[0];function B(e){return e.slice(1).reduce((t,n,r)=>t+Math.hypot(n.x-e[r].x,n.z-e[r].z),0)}function Te(e,t){for(let n=1;n<e.length;n++){let r=e[n-1],i=e[n],a=Math.hypot(i.x-r.x,i.z-r.z);if(!(a<1e-6)){if(t<=a)return{x:r.x+(i.x-r.x)*t/a,z:r.z+(i.z-r.z)*t/a};t-=a}}return{...e.at(-1)}}var Ee=class{slot;constructor(e=0){this.slot=e}owned(e){return e.investments.has(R[this.slot][0])}anchor=-1;paused=!1;harvested=0;delivered=0;loads=[];active=-1;progress=0;cursor=-1;tier(e){return e.investments.has(R[this.slot][2])?2:+!!e.investments.has(R[this.slot][1])}get inTransit(){return this.loads.reduce((e,t)=>e+t.count,0)}get hasProgress(){return this.anchor!==-1||this.paused||this.harvested>0||this.delivered>0||this.loads.length>0}plots(e){return this.owned(e)?ue(this.slot,e):[]}configure(e,t,n){return!this.owned(n)||!Number.isInteger(e)||e<-1||e>=n.plots.length||e>=0&&(!n.isUnlocked(e)||n.plots[e].land!==`tilled`)||e>=0&&n.machineLines.some(t=>t!==this&&t.owned(n)&&t.anchor>=0&&Math.floor(t.anchor/3)===Math.floor(e/3))?!1:(this.anchor=e,this.paused=t,this.active=-1,this.progress=0,this.cursor=-1,n.revision++,!0)}step(e,n){if(!this.owned(n))return;this.paused=!1,this.anchor=this.plots(n)[0]??-1;let r=Ce[this.tier(n)];for(let t of this.loads){let i=B(we(n.plots[t.plot],t.destination));t.travelled=Math.min(i,t.travelled+e*r.speed)}this.loads=this.loads.filter(e=>e.travelled<B(we(n.plots[e.plot],e.destination))||n.stored+e.count>n.storageCapacity||(n.stockQuality.add(e.crop,e.count,e.grade),this.delivered+=e.count,n.revision++,!1));let i=e=>{let r=n.plots[e];return r.stage===`ready`&&n.active!==e&&n.playerPriorityPlot!==e&&!n.machineBusy(e,this)&&!n.workers.busy(e)&&this.inTransit+t[r.crop].yield<=12},a=this.plots(n);if(this.active>=0&&(!a.includes(this.active)||!i(this.active))&&(this.active=-1,this.progress=0),this.active<0){let e=a.indexOf(this.cursor)+1;this.active=[...a.slice(e),...a.slice(0,e)].find(i)??-1}if(this.active<0||(this.progress+=e/r.seconds,this.progress<1))return;let o=n.plots[this.active],s=t[o.crop].yield,c=n.expertise.machineHarvest(o.crop,n.research,this.tier(n));this.loads.push({plot:this.active,crop:o.crop,count:s,grade:c,travelled:0,destination:z(o,n)}),o.stage=`empty`,this.harvested+=s,this.cursor=this.active,this.active=-1,this.progress=0,n.revision++}save(){return{anchor:this.anchor,paused:this.paused,harvested:this.harvested,delivered:this.delivered,loads:this.loads.map(e=>({...e}))}}restore(n,r){if(!n||typeof n!=`object`)return!1;let i=n,a=e=>Number.isSafeInteger(e)&&e>=0;if(!Number.isInteger(i.anchor)||i.anchor<-1||i.anchor>=r.plots.length||typeof i.paused!=`boolean`||!a(i.harvested)||!a(i.delivered)||!Array.isArray(i.loads)||i.loads.length>12||i.anchor>=0&&(!r.isUnlocked(i.anchor)||r.plots[i.anchor].land!==`tilled`)||i.loads.some(n=>!n||!be(r).includes(n.destination)||!a(n.plot)||n.plot>=r.plots.length||!r.isUnlocked(n.plot)||!e.includes(n.crop)||!r.cropUnlocked(n.crop)||!a(n.grade)||n.grade>5||!a(n.count)||n.count!==t[n.crop].yield||!Number.isFinite(n.travelled)||n.travelled<0||n.travelled>B(we(r.plots[n.plot],n.destination))))return!1;let o=i.loads.reduce((e,t)=>e+t.count,0);return o>12||i.harvested!==i.delivered+o||!this.owned(r)&&(i.anchor!==-1||i.paused||i.harvested>0)?!1:(this.anchor=this.plots(r)[0]??-1,this.paused=!1,this.harvested=i.harvested,this.delivered=i.delivered,this.loads=i.loads.map(e=>({...e})),this.active=-1,this.progress=0,this.cursor=-1,!0)}},De=class{paid={};target=null;dwell=0;fraction=0;reset(){this.target=null,this.dwell=0,this.fraction=0}step(e,t,n,r){if(t||!n||e<=0)return this.reset(),{charged:0,complete:!1};n.id!==this.target&&(this.reset(),this.target=n.id);let i=this.dwell;this.dwell+=e;let a=Math.max(0,this.dwell-1)-Math.max(0,i-1),o=Math.max(0,n.cost-(this.paid[n.id]??0));if(r<=0||o<=0)return this.fraction=0,{charged:0,complete:o===0};this.fraction+=a*n.cost/3;let s=Math.min(r,o,Math.floor(this.fraction));return this.fraction-=s,s>0&&(this.paid[n.id]=(this.paid[n.id]??0)+s),s===r&&(this.fraction=0),{charged:s,complete:s===o}}save(){return{...this.paid}}restore(e,t,n){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let r=Object.entries(e);return r.every(([e,r])=>{let i=t.find(t=>t.id===e);return i&&!n(e)&&Number.isSafeInteger(r)&&r>0&&r<i.cost})?(this.paid=Object.fromEntries(r),this.reset(),!0):!1}},Oe=[`moving`,`working`,`looking`,`notebook`,`idle`,`unobserved`],ke={shipment:`最初の出荷`,investment:`最初の投資`,automation:`初めて作業を任せた日`,"phase-2":`手入れの始まった街`,"phase-3":`農園が育つ街`,"phase-4":`暮らしの戻る街`,complete:`農業地区の復興`},Ae=class{seconds={moving:0,working:0,looking:0,notebook:0,idle:0,unobserved:0};milestones={};partial=!1;previous=null;activity=`excluded`;inputAt=-1/0;get activeSeconds(){return this.seconds.moving+this.seconds.working+this.seconds.looking}sample(e,t){if(!(!Number.isFinite(e)||e<0||this.previous!==null&&e<this.previous)){if(this.previous!==null&&this.activity!==`excluded`){let t=e-this.previous;if(t>2e3)this.seconds.unobserved+=t/1e3;else{let n=Math.max(0,Math.min(e,this.inputAt+3e4)-this.previous)/1e3;this.seconds[this.activity]+=n,this.seconds.idle+=t/1e3-n}}this.previous=e,this.activity=t}}interact(e,t){this.sample(e,t),Number.isFinite(e)&&e>=0&&this.previous===e&&(this.inputAt=e)}observe(e,t=!1){for(let n of e)Object.hasOwn(this.milestones,n)||(this.milestones[n]=t?null:{active:this.activeSeconds,notebook:this.seconds.notebook})}save(){return{seconds:{...this.seconds},partial:this.partial,milestones:Object.fromEntries(Object.entries(this.milestones).map(([e,t])=>[e,t?{...t}:null]))}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>typeof e==`number`&&Number.isFinite(e)&&e>=0&&e<=2**53-1;if(!t.seconds||Oe.some(e=>!n(t.seconds[e]))||typeof t.partial!=`boolean`||!t.milestones||typeof t.milestones!=`object`||Array.isArray(t.milestones))return!1;let r=t.seconds.moving+t.seconds.working+t.seconds.looking;return Object.entries(t.milestones).every(([e,i])=>Object.hasOwn(ke,e)&&(i===null||typeof i==`object`&&n(i.active)&&i.active<=r&&n(i.notebook)&&i.notebook<=t.seconds.notebook))?(this.seconds={...t.seconds},this.milestones=Object.fromEntries(Object.entries(t.milestones).map(([e,t])=>[e,t?{...t}:null])),this.partial=t.partial,this.previous=null,this.activity=`excluded`,this.inputAt=-1/0,!0):!1}},je={all:{title:`余りをすべて出荷する`,keep:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}},custom:{title:`作物ごとに数を決める`,keep:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}},kitchen:{title:`選んだ料理の材料を残す`,keep:{corn:6,turnip:4,pumpkin:0,kabumorokoshi:0}},pantry:{title:`街への納品分を残す`,keep:{corn:12,turnip:12,pumpkin:0,kabumorokoshi:0}}},Me={seconds:12,load:12,fee:1},Ne=class{enabled=!1;policy=`kitchen`;custom={corn:0,turnip:0,pumpkin:0,kabumorokoshi:0};sold=0;earned=0;progress=0;get hasProgress(){return this.enabled||this.sold>0||this.earned>0||this.policy!==`kitchen`||e.some(e=>this.custom[e]>0)}configure(e,t,n){return!n.residentsArrived||!n.investments.has(`driver`)||typeof e!=`boolean`||!Object.hasOwn(je,t)?!1:(this.enabled=e,this.policy=t,this.progress=0,n.revision++,!0)}reserves(e){return this.policy===`custom`?{...this.custom}:this.policy===`kitchen`&&e.kitchen.plan!==`none`?{...g[e.kitchen.plan].needs}:{...je[this.policy].keep}}setReserve(t,n,r){return!r.residentsArrived||!r.investments.has(`driver`)||!e.includes(t)||!Number.isSafeInteger(n)||n<0||n>240?!1:(this.custom[t]=n,this.progress=0,r.revision++,!0)}available(t){let n=this.reserves(t);return e.reduce((e,r)=>e+Math.max(0,t.stock[r]-n[r]),0)}step(t,n){if(!n.residentsArrived||!this.enabled||!n.investments.has(`driver`)||this.available(n)===0){this.progress=0;return}if(this.progress+=t/Me.seconds,this.progress<1)return;let r=this.reserves(n),i=Me.load,a=0,o=0;for(let t of e){let e=Math.min(i,Math.max(0,n.stock[t]-r[t]));o+=n.stockQuality.value(t,n.salePrice(t),e)-e*Me.fee,n.stock[t]-=e,i-=e,a+=e}n.coins+=o,n.shipped+=a,this.sold+=a,this.earned+=o,this.progress=0,n.revision++}save(){return{enabled:this.enabled,policy:this.policy,custom:{...this.custom},sold:this.sold,earned:this.earned}}restore(t){if(!t||typeof t!=`object`)return!1;let n=t;return typeof n.enabled!=`boolean`||!Object.hasOwn(je,n.policy)||!Number.isSafeInteger(n.sold)||n.sold<0||!Number.isSafeInteger(n.earned)||n.earned<0||n.sold===0&&n.earned!==0||!n.custom||typeof n.custom!=`object`||Array.isArray(n.custom)||Object.keys(n.custom).length!==e.length||e.some(e=>!Number.isSafeInteger(n.custom[e])||n.custom[e]<0||n.custom[e]>240)?!1:(this.custom={...n.custom},this.enabled=n.enabled,this.policy=n.policy,this.sold=n.sold,this.earned=n.earned,this.progress=0,!0)}},Pe={entry:{x:26,z:3},nets:{x:29,z:3},sales:{x:26,z:.5},pier:{x:29,z:3},capacity:24,price:8},Fe=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z)<1.2,Ie=class{cleaned=!1;pier=!1;boat=!1;fish=0;sold=0;supplied=0;supply=`none`;active=null;progress=0;boatProgress=0;get workPoint(){return this.active?Pe.nets:void 0}get points(){return(this.cleaned?20:0)+(this.pier?60:0)+(this.boat?30:0)+(this.sold>=12?20:0)+(this.supplied>=6?30:0)}get percent(){return Math.min(100,Math.floor(this.points/10))}get hasProgress(){return this.cleaned||this.pier||this.boat||this.fish>0||this.sold>0||this.supplied>0||this.supply!==`none`}interrupt(){this.active=null,this.progress=0}reason(e,t){return t.agricultureComplete?e===`nets`?this.cleaned?`片付け済み`:``:this.pier?`修理済み`:this.cleaned?this.sold<12?`魚をあと${12-this.sold}匹出荷しよう`:t.coins<200?`あと${200-t.coins}メニー`:``:`先に浜の網を片付けよう`:`農業地区を復興すると港へ進めます`}start(e,t){return this.reason(e,t)||!Fe(t.player,Pe.nets)?!1:(t.interrupt(),this.active=e===`nets`?`cleaning`:`repairing`,!0)}buyBoat(e){return!e.agricultureComplete||!this.pier||this.boat||e.coins<400?!1:(e.coins-=400,this.boat=!0,e.revision++,e.message=`小さな漁船を迎えました！`,!0)}setSupply(t,n){return!n.agricultureComplete||t!==`none`&&!e.includes(t)?!1:(this.supply=t,n.revision++,!0)}catchFish(e){let t=Pe.capacity-this.fish;if(t<=0)return!1;let n=this.supply!==`none`&&e.stock[this.supply]>0&&t>=2;return n&&(e.stock[this.supply]--,this.supplied++),this.fish+=n?2:1,e.revision++,!0}automate(e,t){if(!t.agricultureComplete||!this.boat||this.fish>=Pe.capacity){this.boatProgress=0;return}this.boatProgress+=e/8,this.boatProgress>=1&&(this.catchFish(t),this.boatProgress=0)}step(e,t){if(t.agricultureComplete){if(this.active){this.progress+=e/(this.active===`cleaning`?3:this.active===`repairing`?5:4),this.progress>=1&&(this.active===`cleaning`?(this.cleaned=!0,t.message=`浜が片付いた！ ここで網を引いてみよう。`,t.revision++):this.active===`repairing`?this.reason(`pier`,t)||(t.coins-=200,this.pier=!0,t.revision++,t.message=`桟橋が直った！ 漁船を迎えられます。`):this.catchFish(t)&&(t.message=`魚が揚がった！ 水揚げ箱に集めよう。`),this.interrupt());return}if(Fe(t.player,Pe.sales)&&this.fish>0){let e=this.fish;this.sold+=e,t.coins+=e*Pe.price,this.fish=0,t.revision++,t.message=`魚を${e}匹出荷して +${e*Pe.price} メニー！`;return}Fe(t.player,Pe.nets)&&this.fish<Pe.capacity&&(this.active=this.cleaned?`fishing`:`cleaning`)}}save(){return{cleaned:this.cleaned,pier:this.pier,boat:this.boat,fish:this.fish,sold:this.sold,supplied:this.supplied,supply:this.supply}}restore(t){if(!t||typeof t!=`object`)return!1;let n=t;return[`cleaned`,`pier`,`boat`].some(e=>typeof n[e]!=`boolean`)||[n.fish,n.sold,n.supplied].some(e=>!Number.isSafeInteger(e)||e<0)||n.fish>Pe.capacity||n.supply!==`none`&&!e.includes(n.supply)||n.pier&&(!n.cleaned||n.sold<12)||n.boat&&!n.pier||(n.fish>0||n.sold>0||n.supplied>0)&&!n.cleaned?!1:(Object.assign(this,{cleaned:n.cleaned,pier:n.pier,boat:n.boat,fish:n.fish,sold:n.sold,supplied:n.supplied,supply:n.supply}),this.interrupt(),this.boatProgress=0,!0)}},Le=[{id:`lane-west`,title:`出荷道の草を片付ける`,detail:`木箱へ続く道を、歩きやすく。`,x:-5.8,z:2.2,seconds:3,cost:0,kind:`cleaning`},{id:`lane-east`,title:`畑の通り道を整える`,detail:`畑と南の土地を結ぶ道に日差しを。`,x:4.7,z:4.9,seconds:3,cost:0,kind:`cleaning`},{id:`barn-walls`,title:`納屋の外壁を掃除する`,detail:`赤い壁を洗い、入口のがれきを片付ける。`,x:-5.5,z:.3,seconds:4,cost:0,kind:`cleaning`},{id:`barn-roof`,title:`納屋の屋根を修理する`,detail:`雨をしのげる納屋へ。まずは屋根を直す。`,x:-5.5,z:.3,seconds:60,cost:600,kind:`repairing`,requires:`barn-walls`,shipped:24},{id:`fence`,title:`道沿いの柵を直す`,detail:`出荷道に、小さな白い柵を。`,x:-6.8,z:4.3,seconds:3.5,cost:240,kind:`repairing`,requires:`lane-west`},{id:`barn-open`,title:`納屋を再開する`,detail:`扉と売り場を直し、収穫を蓄える共同倉庫を開こう。`,x:-5.5,z:.3,seconds:60,cost:1800,kind:`repairing`,requires:`barn-roof`,shipped:60},{id:`cottage-yard`,title:`空き家の庭を片付ける`,detail:`農園の隣で、帰ってこられる場所を整えよう。`,x:14.5,z:.2,seconds:4,cost:0,kind:`cleaning`},{id:`cottage-repair`,title:`空き家の屋根と窓を直す`,detail:`農場の収入で、暮らせる家に。`,x:14.5,z:.2,seconds:60,cost:1500,kind:`repairing`,requires:`cottage-yard`},{id:`cottage-welcome`,title:`帰ってくる家族を迎える`,detail:`修復した家へ、かごに入れた食料を届けよう。`,x:14.5,z:.2,seconds:3,cost:0,kind:`cleaning`,requires:`cottage-repair`,supplies:{corn:6,turnip:6,pumpkin:0,kabumorokoshi:0}},{id:`town-well`,title:`街の共同井戸を整える`,detail:`毎日の水仕事を楽に。これから植える作物が15%早く育ちます。`,x:11.2,z:1.7,seconds:60,cost:2400,kind:`repairing`,requires:`cottage-yard`},{id:`town-orchard`,title:`街路樹を手入れする`,detail:`枝を整え、農園と住宅地の緑を取り戻そう。`,x:17,z:4,seconds:5,cost:720,kind:`cleaning`,requires:`cottage-yard`},{id:`town-market`,title:`青果市を開く`,detail:`納屋に街の売り場を。通常出荷の単価が1メニー増えます。`,x:-5.5,z:.3,seconds:60,cost:3600,kind:`repairing`,requires:`barn-open`},{id:`town-pantry`,title:`街の食料庫を満たす`,detail:`家族が安心して暮らせるように、農園の実りを蓄えよう。`,x:14.5,z:.2,seconds:3,cost:0,kind:`cleaning`,requires:`cottage-welcome`,supplies:{corn:12,turnip:12,pumpkin:0,kabumorokoshi:0}}],Re=e=>Le.find(t=>t.id===e),ze=[`barn-open`,`cottage-welcome`,`town-market`],Be=[`忘れられた農園`,`手入れの始まった街`,`暮らしの準備`,`人の戻る街`,`実りを分け合う街`],Ve={speed:3.3,range:1.35,clearSeconds:1.8,tillSeconds:1.5,plantSeconds:.8,harvestSeconds:1.1,growSeconds:18,capacity:24,price:5,stagePoints:1e3},He=[{id:`expansion`,title:`北の土地を開く`,price:600,detail:`畑を6区画から9区画へ。新しい土地は自分で片付けます。`,tradeoff:`収量を増やせるぶん、手入れと運搬が増えます。`},{id:`north-meadow`,title:`北の草原を開く`,price:3600,detail:`北の通り沿いに6区画を開きます。既存の農地と独立して購入できます。`,tradeoff:`土地から片付け、新しい生産拠点を育てます。`},{id:`north-ridge`,title:`北の奥地を開く`,price:7200,detail:`さらに北へ6区画。広い農園の奥にも拠点を作れます。`,tradeoff:`運ぶ距離が長くなります。大きなかごや運搬への投資も考えよう。`},{id:`harvester`,title:`小さな収穫ロボット`,price:3600,minimumGrade:2,requires:`barn-open`,detail:`中央の最大9区画を6秒ずつ収穫し、コンベアで倉庫へ運びます。作物の到達品質から2ランク下がります（下限E）。`,tradeoff:`種まきは別の担当。移動中も働きますが、運搬はゆっくりです。`},{id:`harvester-precision`,title:`精密収穫ユニット`,price:9e3,equipment:`harvester`,detail:`収穫を3秒に短縮。品質低下を1ランクに抑え、運搬も速くします。`,tradeoff:`手作業の品質に近づけたいときの設備更新。`},{id:`harvester-premium`,title:`高性能収穫ユニット`,price:18e3,equipment:`harvester-precision`,detail:`1.2秒で収穫し、作物の到達品質を維持。コンベアも最速になります。`,tradeoff:`設備投資は大きめ。品種の熟練は作物を育てて磨きます。`},{id:`harvester-second`,title:`南の収穫設備`,price:7200,minimumGrade:2,requires:`barn-open`,detail:`南の農地に2台目の収穫ロボットを設置します。6秒で収穫、品質は2ランク低下。`,tradeoff:`既存ラインの更新とは別の投資。種まきや運搬の量も考えて増設しよう。`},{id:`harvester-second-precision`,title:`第2ラインの精密ユニット`,price:9e3,equipment:`harvester-second`,detail:`第2ラインを3秒収穫・品質低下1ランクへ更新します。`,tradeoff:`ほかのラインの性能は変わりません。`},{id:`harvester-second-premium`,title:`第2ラインの高性能ユニット`,price:18e3,equipment:`harvester-second-precision`,detail:`第2ラインを1.2秒収穫・品質維持・高速運搬へ更新します。`,tradeoff:`高品質を育てた列に集中投資できます。`},{id:`harvester-third`,title:`北の収穫設備`,price:14400,minimumGrade:2,requires:`barn-open`,detail:`北の草原・奥地の最大12区画を常時担当します。`,tradeoff:`最初は6秒収穫・品質低下2ランク。全ラインを買う必要はありません。`},{id:`harvester-third-precision`,title:`第3ラインの精密ユニット`,price:9e3,equipment:`harvester-third`,detail:`第3ラインを3秒収穫・品質低下1ランクへ更新します。`,tradeoff:`ほかのラインの性能は変わりません。`},{id:`harvester-third-premium`,title:`第3ラインの高性能ユニット`,price:18e3,equipment:`harvester-third-precision`,detail:`第3ラインを1.2秒収穫・品質維持・高速運搬へ更新します。`,tradeoff:`作物の熟練と加工・販売を組み合わせる後半の設備です。`},{id:`breeding`,title:`品種配合の実験台`,price:3600,minimumGrade:2,requires:`barn-open`,detail:`基本の作物を掛け合わせ、新しい種を見つけます。各親作物の栽培経験と倉庫の実りを使います。`,tradeoff:`配合種をもう一度親にすることはできません。基本作物は注文や料理にも必要です。`},{id:`breeding-a`,title:`品種改良の研究台`,price:7200,minimumGrade:3,detail:`Bランクの収穫を経験したら、作物の品質上限をAへ広げます。`,tradeoff:`良い品種を育てるには、作物の熟練と収穫する人の技能も必要です。`},{id:`breeding-s`,title:`選抜育種の研究設備`,price:18e3,minimumGrade:4,equipment:`breeding-a`,detail:`Aランクの収穫を経験したら、品質上限をSへ広げます。`,tradeoff:`設備だけでは高品質になりません。経験を積んだ作物と人を育てよう。`},{id:`tools`,title:`使いやすい農具`,price:180,detail:`草刈り・耕作・種まき・収穫の手作業時間を35%短縮します。`,tradeoff:`広い土地を手作業で育てたいときに。`},{id:`seeder`,minimumGrade:2,title:`中央の種まき設備`,price:1200,detail:`中央の最大9区画へ、2.4秒ずつ自動で種をまきます。耕した畑が自動で対象になります。`,tradeoff:`収穫は自分で。空いた時間を次の開拓に使えます。`},{id:`helper`,title:`ミナを農園に迎える`,price:2400,requires:`barn-open`,detail:`ミナが整えた農地を歩き回り、種まき・収穫・倉庫への運搬を手伝います。`,tradeoff:`初心者から経験を積み、自分の収穫技能を育てていきます。`},{id:`truck`,title:`小さな販売車`,price:1500,detail:`街の注文へ作物を届けられるようになります。通常出荷も続けられます。`,tradeoff:`作物を揃える手間のぶん、注文は高く買い取ってもらえます。`},{id:`pasture`,title:`南の草地を開拓する`,price:1800,detail:`道の先に6区画を追加します。草刈りと耕作から、新しい農園を育てよう。`,tradeoff:`近くの3区画を買わずに、こちらを先に開くこともできます。出荷までの距離が長くなります。`},{id:`basket`,title:`大きな収穫かご`,price:360,detail:`かごの容量が24個から48個に。まとめて収穫し、出荷の往復を減らせます。`,tradeoff:`手作業中心でも、倉庫からまとめて運ぶときにも役立ちます。`},{id:`warehouse`,title:`納屋に収納棚を増やす`,price:2400,requires:`barn-open`,detail:`共同倉庫が96個から192個に。別の仕事中も、収穫を多く蓄えられます。`,tradeoff:`生産量は変わりません。倉庫がよく満杯になる農園向けです。`},{id:`seeder-area`,minimumGrade:2,title:`中央の高速種まき装置`,price:3600,equipment:`seeder`,detail:`中央の種まきを2.4秒から1.6秒へ短縮します。`,tradeoff:`中央の農地で常時稼働。自分や住人も同じ畑を手伝えます。`},{id:`seeder-second`,title:`南の種まき設備`,price:3600,minimumGrade:2,detail:`南の草地の最大6区画へ、2.4秒ずつ種をまく常設設備。`,tradeoff:`収穫機とは別の設備です。住民や自分の種まきを置き換え、別の仕事へ向かえます。`},{id:`seeder-third`,title:`北の種まき設備`,price:7200,minimumGrade:2,detail:`北の草原・奥地の最大12区画へ、2.4秒ずつ種をまく常設設備。`,tradeoff:`収穫物が増えたら、倉庫・販売・加工への配分も考えよう。`},{id:`helper-area`,title:`レンを農園に迎える`,price:6600,equipment:`helper`,detail:`二人目の仲間レンも農園を歩き回り、ミナとは別の畑を手伝います。`,tradeoff:`レンの技能もEから育ちます。人ごとの経験は別々に記録します。`},{id:`kitchen`,title:`納屋に加工台をつくる`,price:3600,requires:`barn-open`,detail:`作物と果実から、パンやスープ、ジャムなどを作れます。食品は専用の棚へ。`,tradeoff:`原料をそのまま売るか、加工して街へ届けるかを選べます。`},{id:`driver`,title:`配達の仲間を迎える`,price:4800,requires:`barn-open`,equipment:`truck`,detail:`倉庫の作物を販売車で定期出荷します。加工や街への納品分を残せます。`,tradeoff:`12秒ごとに最大12個。1個1メニーの運搬手数料がかかります。手運びの出荷や注文も続けられます。`},{id:`pumpkin-seeds`,title:`カボチャの栽培を始める`,price:1200,detail:`作付けにカボチャを追加。90秒で1個、通常出荷は1個42メニーです。`,tradeoff:`見回りと運搬は少なく、収穫までの時間は長め。短周期の畑と混ぜて育てられます。購入後の種は無料です。`},{id:`pear-grove`,title:`東のナシ園を開く`,price:3600,equipment:`orchard`,detail:`東側のナシの木2本を手入れできます。105秒ごとに3個。果実を売るか、お菓子にするか選べます。`,tradeoff:`リンゴと同じ集荷箱を使います。果実ごとに栽培経験を積みます。`},{id:`orchard`,title:`住宅地の果樹園を再開する`,price:1800,requires:`town-orchard`,detail:`3本のリンゴの木を手入れして、繰り返し収穫できます。`,tradeoff:`75秒ごとに1本4個。種まきは不要ですが、収穫と集荷箱からの出荷は自分で行います。`}],Ue={x:-5.5,z:.3,capacity:96},We={x:-3.9,z:1.3},Ge={x:-5,z:-2.2,halfX:1.6,halfZ:1.7},Ke=[{x:.5,z:-3.5},{x:3.3,z:-3.5},{x:6.1,z:-3.5},{x:.5,z:-.4},{x:3.3,z:-.4},{x:6.1,z:-.4},{x:.5,z:-6.6},{x:3.3,z:-6.6},{x:6.1,z:-6.6},{x:.5,z:9.1},{x:3.3,z:9.1},{x:6.1,z:9.1},{x:.5,z:12.2},{x:3.3,z:12.2},{x:6.1,z:12.2},{x:.5,z:-9.7},{x:3.3,z:-9.7},{x:6.1,z:-9.7},{x:.5,z:-12.8},{x:3.3,z:-12.8},{x:6.1,z:-12.8},{x:.5,z:-15.9},{x:3.3,z:-15.9},{x:6.1,z:-15.9},{x:.5,z:-19},{x:3.3,z:-19},{x:6.1,z:-19}],qe=e=>e<6?null:e<9?`expansion`:e<15?`pasture`:e<21?`north-meadow`:`north-ridge`,Je=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Ye={idle:`ひと休み`,walking:`移動中`,clearing:`草を刈っています`,tilling:`土を耕しています`,planting:`種をまいています`,harvesting:`収穫しています`,cleaning:`片付けています`,repairing:`修理しています`,fishing:`網を引いています`,pruning:`枝を整えています`,picking:`果実を摘んでいます`},Xe=[{id:`clear-two`,title:`土に日差しを`,detail:`草のない区画を4つにする（残っていた畑2つを含む）`,target:4,coins:10,points:10,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land!==`overgrown`).length},{id:`till-two`,title:`種を迎える準備`,detail:`耕作済みの区画を4つにする`,target:4,coins:10,points:10,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land===`tilled`).length},{id:`ship-twelve`,title:`街へ、最初の贈りもの`,detail:`作物を累計12個出荷する`,target:12,coins:20,points:20,count:e=>e.shipped},{id:`first-investment`,title:`わたしの農園の育て方`,detail:`好きな投資を1つ選ぶ`,target:1,coins:0,points:10,count:e=>e.investments.size},{id:`six-fields`,title:`広がる土の香り`,detail:`好きな6区画を耕作済みにする`,target:6,coins:20,points:20,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land===`tilled`).length},{id:`ship-sixty`,title:`街の食卓を支える`,detail:`作物を累計60個出荷する`,target:60,coins:30,points:30,count:e=>e.shipped},{id:`west-path`,title:`街へ続く道`,detail:`出荷道の草を片付ける`,target:1,coins:15,points:20,count:e=>Number(e.projects.has(`lane-west`))},{id:`east-path`,title:`畑に風を通そう`,detail:`畑の通り道を整える`,target:1,coins:15,points:20,count:e=>Number(e.projects.has(`lane-east`))},{id:`clean-barn`,title:`赤い壁、もう一度`,detail:`納屋の外壁を掃除する`,target:1,coins:20,points:30,count:e=>Number(e.projects.has(`barn-walls`))},{id:`repair-roof`,title:`雨の日も働ける`,detail:`納屋の屋根を修理する`,target:1,coins:0,points:60,count:e=>Number(e.projects.has(`barn-roof`))},{id:`repair-fence`,title:`帰り道の目印`,detail:`道沿いの柵を直す`,target:1,coins:0,points:20,count:e=>Number(e.projects.has(`fence`))},{id:`first-order`,title:`名前のある届け先`,detail:`好きな注文を1回届ける`,target:1,coins:0,points:30,count:e=>e.orderCount},{id:`varied-orders`,title:`食卓を彩る畑`,detail:`異なる3種類の注文を届ける`,target:3,coins:0,points:40,count:e=>Object.values(e.orders).filter(e=>e>0).length},{id:`six-orders`,title:`またお願いしたい農園`,detail:`注文を累計6回届ける`,target:6,coins:0,points:30,count:e=>e.orderCount},{id:`reopen-barn`,title:`ただいま、と言える納屋`,detail:`納屋を再開する`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`barn-open`))},{id:`first-helper`,title:`ひとりから、ふたりへ`,detail:`収穫の仲間に作物を12個集めてもらう`,target:12,coins:0,points:30,count:e=>e.helperHarvested},{id:`cottage-yard`,title:`帰り道をつくる`,detail:`住宅地の空き家の庭を片付ける`,target:1,coins:20,points:20,count:e=>Number(e.projects.has(`cottage-yard`))},{id:`cottage-repair`,title:`雨の入らない家`,detail:`空き家の屋根と窓を直す`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`cottage-repair`))},{id:`cottage-welcome`,title:`おかえり、わたしたちの街へ`,detail:`修復した家へ食料を届け、家族を迎える`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`cottage-welcome`))},{id:`town-well`,title:`暮らしを潤す水`,detail:`街の共同井戸を整える`,target:1,coins:0,points:100,count:e=>Number(e.projects.has(`town-well`))},{id:`town-orchard`,title:`緑の帰る街`,detail:`街路樹を手入れする`,target:1,coins:0,points:100,count:e=>Number(e.projects.has(`town-orchard`))},{id:`town-market`,title:`農園から、地域の産業へ`,detail:`納屋に青果市を開く`,target:1,coins:0,points:140,count:e=>Number(e.projects.has(`town-market`))},{id:`town-pantry`,title:`実りを分け合う暮らし`,detail:`街の食料庫を満たす`,target:1,coins:0,points:120,count:e=>Number(e.projects.has(`town-pantry`))},{id:`ship-240`,title:`毎日の食卓へ`,detail:`作物を累計240個出荷する`,target:240,coins:60,points:150,count:e=>e.shipped},{id:`nine-fields`,title:`畑いっぱいの可能性`,detail:`9区画を耕作済みにする`,target:9,coins:0,points:60,count:e=>e.plots.filter(e=>e.land===`tilled`).length},{id:`farm-taste`,title:`農園の味をつくろう`,detail:`加工台で食品を累計12個作る`,target:12,coins:0,points:40,count:e=>e.kitchen.crafted},{id:`shared-meals`,title:`また集まりたくなる食卓`,detail:`異なる2種類の食品の注文を届ける`,target:2,coins:0,points:60,count:e=>Object.values(e.kitchen.orders).filter(e=>e>0).length},{id:`orchard-tended`,title:`枝の向こうに、次の春`,detail:`果樹園の3本の木を手入れする`,target:3,coins:0,points:40,count:e=>e.orchard.trees.filter(e=>e.tended).length},{id:`orchard-fruit`,title:`街に果実の香りを`,detail:`果樹園から果実を累計24個出荷する`,target:24,coins:0,points:50,count:e=>e.orchard.sold}];Xe.push(...j.flatMap(e=>e.chapters.map((t,n)=>({id:`resident-${e.id}-${n+1}`,title:t.title,detail:`${e.name}の依頼を進める`,target:n+1,coins:0,points:[20,30,50][n],count:t=>t.requests.progress[e.id].chapter}))));var Ze=class a{enterprises=new w;legacyCompletion=!1;appearanceFloor=1;workers=new Se;machinery=new Ee;extraMachinery=[new Ee(1),new Ee(2)];plantingLines=[new fe(1),new fe(2)];seedRowTaken(e,t=0){return t!==0&&this.seederPlot>=0&&Math.floor(this.seederPlot/3)===Math.floor(e/3)||this.plantingLines.some(n=>n.slot!==t&&n.owned(this)&&n.anchor>=0&&Math.floor(n.anchor/3)===Math.floor(e/3))}seedingBusy(e){return this.seederWorkingPlot===e||this.plantingLines.some(t=>t.active===e)}get seededPlots(){return[...this.assignedPlots(`seeder`),...this.plantingLines.filter(e=>!e.paused).flatMap(e=>e.plots(this))]}get machineLines(){return[this.machinery,...this.extraMachinery]}get harvesters(){return this.machineLines.filter(e=>e.owned(this))}machineBusy(e,t){return this.machineLines.some(n=>n!==t&&n.active===e)}hybrids=new Set;funding=new De;expertise=new f([...e,...i]);cargoQuality=new d(e);stockQuality=new d(e);get research(){return this.investments.has(`breeding-s`)?2:+!!this.investments.has(`breeding-a`)}harvestGrade(e,t=`player`){return Math.min(this.expertise.cropGrade(e,this.research),this.expertise.personGrade(t))}get residentsArrived(){return this.projects.has(`cottage-welcome`)}requests=new ee;journal=new Ae;orchard=new le;courier=new Ne;kitchen=new v;harbor=new Ie;player={x:-.6,z:2.5};plots=Ke.map((e,t)=>({...e,stage:t===0||t===4?`ready`:`empty`,readyAt:0,crop:`corn`,nextCrop:`corn`,land:t===0||t===4?`tilled`:`overgrown`,cultivated:t===0||t===4}));projects=new Set;activeProject=null;projectWork={};get workPoint(){return this.enterprises.workPoint??this.orchard.workPoint??this.harbor.workPoint??(this.activeProject?Re(this.activeProject):this.plots[this.active])}get isWorking(){return this.enterprises.active!==null||this.orchard.active>=0||this.active>=0||this.activeProject!==null||this.harbor.active!==null}get stock(){return this.stockQuality.counts}set stock(t){this.stockQuality=new d(e,t)}helperPlot=-1;helperArea=!1;seederArea=!1;helperWorkingPlot=-1;seederWorkingPlot=-1;helperCursor=-1;seederCursor=-1;helperProgress=0;helperHarvested=0;get capacity(){return this.investments.has(`basket`)?48:Ve.capacity}get storageCapacity(){return(this.investments.has(`warehouse`)?192:Ue.capacity)+(this.enterprises.level(`depot`)>=2?48:0)}get stored(){return e.reduce((e,t)=>e+this.stock[t],0)}coins=0;get cargo(){return this.cargoQuality.counts}set cargo(t){this.cargoQuality=new d(e,t)}orders={pantry:0,soup:0,builders:0,autumn:0};get orderCount(){return Object.values(this.orders).reduce((e,t)=>e+t,0)}get inventory(){return e.reduce((e,t)=>e+this.cargo[t],0)}set inventory(e){this.cargo={corn:e,turnip:0,pumpkin:0,kabumorokoshi:0}}shipped=0;investments=new Set;completedTasks=new Set;seederPlot=-1;seederProgress=0;action=`idle`;active=-1;progress=0;message=``;revision=0;get restorationPoints(){return Xe.filter(e=>this.completedTasks.has(e.id)).reduce((e,t)=>e+t.points,0)}get agricultureComplete(){return this.legacyCompletion||this.foundationComplete&&this.enterprises.level(`harbor-link`)===3}get restorationPercent(){return this.agricultureComplete?100:Math.min(99,Math.floor(Math.min(1,this.restorationPoints/Ve.stagePoints)*30+this.enterprises.districtProgress*50+this.enterprises.fraction(`harbor-link`)*20))}get foundationComplete(){return this.restorationPoints>=Ve.stagePoints&&ze.every(e=>this.projects.has(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>this.completedTasks.has(e))}get restorationPhase(){return this.agricultureComplete?5:Math.max(this.appearanceFloor,this.restorationPercent>=60?4:this.restorationPercent>=30?3:this.restorationPercent>=10?2:1)}growSeconds(e){return Math.round(t[e].seconds*(this.projects.has(`town-well`)?85:100)*[1,.97,.94,.9][this.enterprises.level(`seed-garden`)])/100}salePrice(e){return t[e].price+ +!!this.projects.has(`town-market`)}isUnlocked(e){return e>=0&&e<this.plots.length&&(!qe(e)||this.investments.has(qe(e)))}interrupt(){this.enterprises.interrupt(),this.orchard.interrupt(),this.harbor.interrupt(),this.activeProject=null,this.active=-1,this.progress=0,this.action=`idle`}movementFactor(e=this.player){return this.plots.some(t=>t.land===`overgrown`&&Math.abs(e.x-t.x)<1.18&&Math.abs(e.z-t.z)<1.3)?.22:1}canStand(e){return!oe.some(t=>Math.hypot(t.x-e.x,t.z-e.z)<.32)&&(e.z<6.5||e.x>-3.5&&e.x<9.5)&&(e.x<23||this.agricultureComplete)&&(e.x<29.5||this.harbor.pier&&e.z>2&&e.z<4)&&!(e.x>25.1&&e.x<27.9&&e.z>-4.5&&e.z<-.9)&&e.x>_e.minX&&e.x<_e.maxX&&e.z>_e.minZ&&e.z<_e.maxZ&&!(Math.abs(e.x-me.x)<me.halfX&&Math.abs(e.z-me.z)<me.halfZ)&&!(Math.abs(e.x-Ge.x)<Ge.halfX&&Math.abs(e.z-Ge.z)<Ge.halfZ)}projectReason(n){let r=Le.find(e=>e.id===n);if(!r)return`見つからない仕事です`;if(this.projects.has(n))return`完了済み`;if(r.requires&&!this.projects.has(r.requires))return`先に「${Re(r.requires).title}」`;if(r.shipped&&this.shipped<r.shipped)return`累計${r.shipped}個の出荷まであと${r.shipped-this.shipped}個`;if(r.supplies){let n=e.filter(e=>this.cargo[e]<r.supplies[e]).map(e=>`${t[e].name} あと${r.supplies[e]-this.cargo[e]}個`);if(n.length)return n.join(`・`)}return this.coins<r.cost?`あと ${r.cost-this.coins} メニー`:``}startProject(e){return this.projectReason(e)||Je(this.player,Re(e))>Ve.range?!1:(this.interrupt(),this.activeProject=e,this.progress=this.projectWork[e]??0,this.action=Re(e).kind,!0)}duration(e){return(this.activeProject?Re(this.activeProject).seconds:e===`clearing`?Ve.clearSeconds:e===`tilling`?Ve.tillSeconds:e===`planting`?Ve.plantSeconds:Ve.harvestSeconds)*(!this.activeProject&&this.investments.has(`tools`)?.65:1)}settleTasks(){let e=this.agricultureComplete,t=Xe.filter(e=>!this.completedTasks.has(e.id)&&e.count(this)>=e.target);for(let e of t)this.completedTasks.add(e.id),this.coins+=e.coins,this.revision++;if(t.length){let e=t.reduce((e,t)=>e+t.coins,0);this.message=`${t[0].title}、達成！${e?` +${e} メニー`:` 農園が一歩前へ。`}`}!e&&this.agricultureComplete&&(this.message=`農業地区が復興！ この実りを、次は港の暮らしへ。`)}investmentReason(e,t=!1){let n=He.find(t=>t.id===e);if(!n)return`見つからない投資です`;if(this.investments.has(e))return`導入済み`;if([`helper`,`helper-area`,`driver`].includes(e)&&!this.residentsArrived)return`先に家族の移住を終えよう`;if([`harvester-second`,`seeder-second`].includes(e)&&!this.investments.has(`pasture`))return`先に南の草地を広げよう`;if([`harvester-third`,`seeder-third`].includes(e)&&!this.investments.has(`north-meadow`)&&!this.investments.has(`north-ridge`))return`先に北の農地を広げよう`;if(n.minimumGrade!==void 0&&this.expertise.best<n.minimumGrade)return`${s[n.minimumGrade]}ランクの収穫を経験しよう`;if(n.requires&&!this.projects.has(n.requires))return`先に「${Re(n.requires).title}」`;if(n.equipment&&!this.investments.has(n.equipment))return`先に「${He.find(e=>e.id===n.equipment).title}」`;let r=n.price-(this.funding.paid[e]??0);return!t&&this.coins<r?`あと ${r-this.coins} メニー`:``}buy(e){let t=He.find(t=>t.id===e);if(!t||this.investmentReason(e))return!1;this.coins-=t.price-(this.funding.paid[e]??0),delete this.funding.paid[e],this.investments.add(e),this.revision++;let n=R.findIndex(t=>t[0]===e);n>=0&&this.machineLines[n].configure(ue(n,this)[0]??-1,!1,this);let r=de.findIndex(t=>t===e);if(r>=0){let e=this.plantingLines[r];e.configure(ue(e.slot,this)[0]??-1,!1,this)}return e===`driver`&&(this.courier.enabled=!0),e===`seeder-area`&&(this.seederArea=!0),e===`helper-area`&&(this.helperArea=!0),e===`helper`&&(this.helperPlot=this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`)),e===`seeder`&&(this.seederPlot=this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`)),this.message=`${t.title}を購入しました！`,this.settleTasks(),!0}completedPaymentPad=null;get paymentPad(){return re(this).find(e=>P(e,this.player,.72)&&!(this.completedPaymentPad&&P(this.player,this.completedPaymentPad,.95)))??null}payForEquipment(e,t){this.completedPaymentPad&&!P(this.player,this.completedPaymentPad,.95)&&(this.completedPaymentPad=null);let n=this.paymentPad,r=n?He.find(e=>e.id===n.id):null,i=this.funding.step(e,Math.hypot(t.x,t.z)>.08,r?{id:r.id,cost:r.price}:null,this.coins);return i.charged&&(this.coins-=i.charged,this.revision++),i.complete&&r&&this.buy(r.id)&&(this.completedPaymentPad=n),!!r}breedReason(e,t){let n=O(e,t);return n?this.hybrids.has(n.crop)?`この種は発見済み`:this.investments.has(`breeding`)?n.parents.some(e=>this.expertise.crops[e]<40)?`親になる作物を、それぞれ40回収穫しよう`:n.parents.some(e=>this.stock[e]<n.samples)?`倉庫に親の作物をそれぞれ${n.samples}個用意しよう`:``:`先に品種配合の実験台を導入しよう`:`配合できるのは、組み合わせのある基本作物同士だけです`}breed(e,n){if(this.breedReason(e,n)||!P(this.player,T,1.8))return!1;let r=O(e,n);for(let e of r.parents)this.stock[e]-=r.samples;return this.hybrids.add(r.crop),this.revision++,this.message=`${t[r.crop].name}の種を発見！ 畑の作付けで選べます。`,!0}cropUnlocked(t){return e.includes(t)&&(t!==`pumpkin`||this.investments.has(`pumpkin-seeds`))&&(t!==`kabumorokoshi`||this.hybrids.has(t))}planCrop(e,t){return!Number.isInteger(e)||!this.isUnlocked(e)||!this.cropUnlocked(t)?!1:(this.plots[e].nextCrop=t,this.revision++,!0)}order(t){let n=r.find(e=>e.id===t);if(!n)return;let i=Math.min(3,1+Math.floor(this.orderCount/6)),a={corn:n.needs.corn*i,turnip:n.needs.turnip*i,pumpkin:n.needs.pumpkin*i,kabumorokoshi:0},o=e.reduce((e,t)=>e+a[t]*this.salePrice(t),0),s=e.reduce((e,t)=>e+this.cargoQuality.value(t,this.salePrice(t),a[t])+Math.max(0,a[t]-this.cargo[t])*this.salePrice(t),0);return{...n,needs:a,coins:Math.round(n.coins*i*s/o)}}orderReason(n){if(!this.investments.has(`truck`))return`販売車を購入すると配達できます`;let r=this.order(n);return r?e.filter(e=>this.cargo[e]<r.needs[e]).map(e=>`${t[e].name} あと${r.needs[e]-this.cargo[e]}個`).join(`・`):`見つからない注文です`}deliver(t){if(this.orderReason(t)||Je(this.player,n)>Ve.range)return!1;let r=this.order(t);for(let t of e)this.cargo[t]-=r.needs[t],this.shipped+=r.needs[t];return this.coins+=r.coins,this.orders[t]++,this.revision++,this.message=`${r.title}へ届けて +${r.coins} メニー！`,this.settleTasks(),!0}assignSeeder(e){return!this.investments.has(`seeder`)||e>=0&&this.seedRowTaken(e,0)||!Number.isInteger(e)||e!==-1&&(!this.isUnlocked(e)||this.plots[e].land!==`tilled`)?!1:(this.seederPlot=e,this.seederProgress=0,this.seederWorkingPlot=-1,this.seederCursor=-1,this.revision++,!0)}transferReason(t){return this.projects.has(`barn-open`)?t===`deposit`?this.inventory===0?`かごが空です`:this.stored+this.inventory>this.storageCapacity?`倉庫の空きを増やそう`:``:e.includes(t)?this.stock[t]===0?`倉庫にありません`:this.inventory>=this.capacity?`かごがいっぱいです`:``:`見つからない作物です`:`納屋を再開すると使えます`}transfer(n){if(this.transferReason(n)||Je(this.player,Ue)>Ve.range&&!(this.enterprises.level(`depot`)>=1&&Je(this.player,x(`depot`))<Ve.range))return!1;if(n===`deposit`){for(let t of e)this.cargoQuality.moveTo(this.stockQuality,t,this.cargo[t]);this.message=`収穫を倉庫に預けました。`}else{let e=Math.min(6,this.stock[n],this.capacity-this.inventory);this.stockQuality.moveTo(this.cargoQuality,n,e),this.message=`${t[n].name}を ${e} 個かごへ。`}return this.revision++,!0}assignHelper(e){return!this.investments.has(`helper`)||!Number.isInteger(e)||e!==-1&&(!this.isUnlocked(e)||this.plots[e].land!==`tilled`)?!1:(this.workers.cancel(),this.helperPlot=e,this.helperProgress=0,this.helperWorkingPlot=-1,this.helperCursor=-1,this.revision++,!0)}setArea(e,t){return this.investments.has(e+`-area`)?(e===`seeder`?(this.seederArea=t,this.assignSeeder(this.seederPlot)):(this.helperArea=t,this.assignHelper(this.helperPlot)),!0):!1}assignedPlots(e){return e===`helper`?this.residentsArrived&&this.investments.has(`helper`)&&this.helperPlot>=0?this.plots.map((e,t)=>t).filter(e=>this.isUnlocked(e)&&this.plots[e].land===`tilled`):[]:this.investments.has(`seeder`)?ue(0,this):[]}choosePlot(e){let n=this.assignedPlots(e),r=e===`seeder`?this.seederCursor:this.helperCursor,i=n=>{let r=this.plots[n];return this.active!==n&&this.playerPriorityPlot!==n&&!this.workers.busy(n)&&!this.machineBusy(n)&&(e===`seeder`?r.stage===`empty`:r.stage===`ready`&&this.stored+t[r.crop].yield<=this.storageCapacity)},a=n.indexOf(r)+1;return[...n.slice(a),...n.slice(0,a)].find(i)??-1}collect(e,t){this.workers.step(e,t,this);let n=this.workers.people[0];this.helperWorkingPlot=n.target,this.helperProgress=n.progress}automate(e,t){for(let n of this.plantingLines)n.step(e,t,this);this.seederWorkingPlot<0&&(this.seederWorkingPlot=this.choosePlot(`seeder`));let n=this.seederWorkingPlot,r=this.plots[n];if(!r||r.land!==`tilled`||r.stage!==`empty`||this.active===n||this.playerPriorityPlot===n){this.seederProgress=0,this.seederWorkingPlot=-1;return}this.seederProgress+=e/(this.investments.has(`seeder-area`)?1.6:2.4),this.seederProgress>=1&&(r.crop=r.nextCrop,r.stage=`growing`,r.readyAt=t+Math.round(this.growSeconds(r.crop)*1e3),this.seederProgress=0,this.seederCursor=n,this.seederWorkingPlot=-1,this.revision++)}playerPriorityPlot=-1;nearestWorkPlot(){let e=-1,n=Ve.range;return this.plots.forEach((r,i)=>{if(!this.isUnlocked(i)||r.stage===`growing`||r.stage===`ready`&&this.inventory+t[r.crop].yield>this.capacity)return;let a=Je(this.player,r);a<n&&(n=a,e=i)}),e}get blockedWorkReason(){if(this.isWorking||this.action===`walking`)return``;let e=this.plots.find((e,t)=>this.isUnlocked(t)&&Je(this.player,e)<Ve.range);return e?.stage===`ready`&&this.inventory+t[e.crop].yield>this.capacity?`かごがいっぱいです · 出荷すると収穫できます`:e?.stage===`growing`?`作物は成長中です · 実るまで待とう`:``}step(n,r,i){for(let e of this.plots)e.stage===`growing`&&i>=e.readyAt&&(e.stage=`ready`,this.revision++);this.playerPriorityPlot=Math.hypot(r.x,r.z)>.08||this.activeProject||this.orchard.active>=0||this.enterprises.active||this.paymentPad?-1:this.active>=0?this.active:this.nearestWorkPlot(),this.kitchen.step(n,this),this.courier.step(n,this),this.harbor.automate(n,this);for(let e of this.harvesters)e.step(n,this);this.collect(n,i);let a=this.payForEquipment(n,r);this.automate(n,i),this.settleTasks();let o=Math.hypot(r.x,r.z);if(o>.08){this.interrupt();let e=Math.max(1,o),t=Ve.speed*this.movementFactor(),i=this.player.x+r.x/e*t*n,a=this.player.z+r.z/e*t*n,s={...this.player};this.canStand({x:i,z:this.player.z})&&(this.player.x=i),this.canStand({x:this.player.x,z:a})&&(this.player.z=a),this.action=Je(s,this.player)>1e-4?`walking`:`idle`;return}if(a){this.interrupt();return}if(this.player.x>=23){this.harbor.step(n,this),this.action=this.harbor.active??`idle`,this.progress=this.harbor.progress;return}if(this.enterprises.active){this.enterprises.step(n,this);return}if(this.orchard.active>=0){this.orchard.step(n,this,i);return}if(this.isWorking){if(this.progress+=n/this.duration(this.action),this.activeProject&&this.action===`repairing`&&(this.projectWork[this.activeProject]=Math.min(1,this.progress)),this.progress>=1){if(this.activeProject){let t=Re(this.activeProject);if(!this.projectReason(t.id)){if(this.coins-=t.cost,t.supplies)for(let n of e)this.cargo[n]-=t.supplies[n];this.projects.add(t.id),delete this.projectWork[t.id],this.revision++,this.message=`${t.title}、完了！`,this.settleTasks()}this.interrupt();return}let n=this.plots[this.active];if(this.action===`clearing`)n.land=`cleared`,this.message=`草を片付けた！ 次は土を耕そう。`;else if(this.action===`tilling`)n.land=`tilled`,n.cultivated=!0,this.message=`ふかふかの土になった！`;else if(this.action===`planting`)n.crop=n.nextCrop,n.stage=`growing`,n.readyAt=i+Math.round(this.growSeconds(n.crop)*1e3);else{n.stage=`empty`;let e=this.expertise.harvest(n.crop,`player`,this.research);this.cargoQuality.add(n.crop,t[n.crop].yield,e),this.message=`${t[n.crop].name}を ${t[n.crop].yield} 個収穫！ 品質 ${s[e]}`}this.revision++,this.settleTasks(),this.interrupt()}return}if(this.action=`idle`,(Je(this.player,We)<Ve.range||this.enterprises.level(`depot`)===3&&Je(this.player,b)<Ve.range)&&this.inventory>0){let t=this.inventory,n=e.reduce((e,t)=>e+this.cargoQuality.value(t,this.salePrice(t)),0);this.coins+=n,this.shipped+=t,this.inventory=0,this.message=`${t} 個を出荷して +${n} メニー！`,this.revision++,this.settleTasks();return}if(this.enterprises.startNearby(this)){this.progress=0;return}if(this.orchard.startNearby(this,i)){this.action=this.orchard.trees[this.orchard.active].tended?`picking`:`pruning`,this.progress=0;return}let c=Ve.range;if(this.plots.forEach((e,n)=>{if(!this.isUnlocked(n)||e.stage===`growing`||e.stage===`ready`&&this.inventory+t[e.crop].yield>this.capacity)return;let r=Je(this.player,e);r<c&&(c=r,this.active=n)}),this.active>=0){let e=this.plots[this.active];this.action=e.land===`overgrown`?`clearing`:e.land===`cleared`?`tilling`:e.stage===`empty`?`planting`:`harvesting`}}shiftGrowth(e){for(let t of this.plots)t.stage===`growing`&&(t.readyAt+=e);for(let t of this.orchard.trees)t.tended&&(t.readyAt+=e)}save(){return{version:26,projectWork:{...this.projectWork},enterprises:this.enterprises.save(),legacyCompletion:this.legacyCompletion,appearanceFloor:this.appearanceFloor,workers:this.workers.save(),machinery:this.machinery.save(),extraMachinery:this.extraMachinery.map(e=>e.save()),plantingLines:this.plantingLines.map(e=>e.save()),hybrids:[...this.hybrids],quality:{expertise:this.expertise.save(),cargo:this.cargoQuality.save(),stock:this.stockQuality.save()},funding:this.funding.save(),requests:this.requests.save(),journal:this.journal.save(),orchard:this.orchard.save(),courier:this.courier.save(),kitchen:this.kitchen.save(),seederArea:this.seederArea,helperArea:this.helperArea,harbor:this.harbor.save(),stock:{...this.stock},helperPlot:this.helperPlot,helperHarvested:this.helperHarvested,cargo:{...this.cargo},orders:{...this.orders},projects:[...this.projects],coins:this.coins,inventory:this.inventory,shipped:this.shipped,plots:this.plots.map(({stage:e,readyAt:t,land:n,crop:r,nextCrop:i})=>({stage:e,readyAt:t,land:n,crop:r,nextCrop:i})),investments:[...this.investments],completedTasks:[...this.completedTasks],seederPlot:this.seederPlot}}restore(t){if(!t||typeof t!=`object`)return!1;let n=t,o=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,s=n.version;if(typeof s!=`number`||!Number.isInteger(s)||s<1||s>26||!Array.isArray(n.plots)||n.plots.length!==(s===1?6:s<7?9:s<14?15:Ke.length)||!o(n.coins)||!o(n.inventory)||!o(n.shipped)||!n.plots.every(t=>t&&[`empty`,`growing`,`ready`].includes(t.stage)&&o(t.readyAt)&&(n.version===1?t.cultivated===void 0||typeof t.cultivated==`boolean`:[`overgrown`,`cleared`,`tilled`].includes(t.land))&&(s<4||e.includes(t.crop)&&e.includes(t.nextCrop))))return!1;let c=s>=4?s>=13?n.cargo:{...n.cargo,pumpkin:0}:{corn:n.inventory,turnip:0,pumpkin:0,kabumorokoshi:0},l=s<17?{...c,kabumorokoshi:0}:c,u=s>=4?s>=13?n.orders:{...n.orders,autumn:0}:{pantry:0,soup:0,builders:0,autumn:0};if(!l||e.some(e=>!o(l[e]))||e.reduce((e,t)=>e+l[t],0)!==n.inventory||!u||r.some(e=>!o(u[e.id])))return!1;let p=s>=3?n.projects:[];if(!Array.isArray(p)||!p.every(e=>Le.some(t=>t.id===e))||new Set(p).size!==p.length||p.some(e=>{let t=Re(e);return t.requires&&!p.includes(t.requires)}))return!1;let m=n.version===1?[]:n.investments,h=n.version===1?[]:n.completedTasks;if(!Array.isArray(m)||!m.every(e=>He.some(t=>t.id===e))||new Set(m).size!==m.length||m.some(e=>{let t=He.find(t=>t.id===e);return t.requires&&!p.includes(t.requires)||t.equipment&&!m.includes(t.equipment)})||n.inventory>(m.includes(`basket`)?48:Ve.capacity))return!1;let g=s>=7&&n.seederArea,_=s>=7&&n.helperArea;if(typeof g!=`boolean`||typeof _!=`boolean`||g&&!m.includes(`seeder-area`)||_&&!m.includes(`helper-area`))return!1;let y=e=>!qe(e)||m.includes(qe(e));if(!Array.isArray(h)||!h.every(e=>Xe.some(t=>t.id===e))||new Set(h).size!==h.length)return!1;let b=this.plots.map((e,t)=>{let r=n.plots[t];if(!r)return{...Ke[t],stage:`empty`,readyAt:0,land:`overgrown`,crop:`corn`,nextCrop:`corn`,cultivated:!1};let i=n.version===1?r.stage!==`empty`||(r.cultivated??!0)?`tilled`:`overgrown`:r.land;return{...e,stage:r.stage,readyAt:r.readyAt,crop:s>=4?r.crop:`corn`,nextCrop:s>=4?r.nextCrop:`corn`,land:i,cultivated:i===`tilled`}});if(b.some((e,t)=>e.stage!==`empty`&&e.land!==`tilled`||!y(t)&&(e.land!==`overgrown`||e.stage!==`empty`)))return!1;let x=n.version===1?-1:n.seederPlot;if(typeof x!=`number`||!Number.isInteger(x)||x<-1||x>=b.length)return!1;let S=x;if(S!==-1&&(!m.includes(`seeder`)||b[S].land!==`tilled`||!y(S)))return!1;let C=s>=5?s>=13?n.stock:{...n.stock,pumpkin:0}:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},T=s<17?{...C,kabumorokoshi:0}:C,E=s>=5?n.helperPlot:-1,O=s>=5?n.helperHarvested:0;if(!T||e.some(e=>!o(T[e]))||e.reduce((e,t)=>e+T[t],0)>(m.includes(`warehouse`)?192:Ue.capacity)+(s>=21&&[2,3].includes(n.enterprises?.depot?.level)?48:0)||!o(O)||(e.reduce((e,t)=>e+T[t],0)>0||m.includes(`helper`))&&!p.includes(`barn-open`)||O>0&&!m.includes(`helper`)||typeof E!=`number`||!Number.isInteger(E)||E<-1||E>=b.length||E!==-1&&(!m.includes(`helper`)||b[E].land!==`tilled`||!y(E))||!m.includes(`pumpkin-seeds`)&&(l.pumpkin>0||T.pumpkin>0||u.autumn>0||b.some(e=>e.crop===`pumpkin`||e.nextCrop===`pumpkin`)))return!1;let k=new Ie;if(s>=6&&!k.restore(n.harbor))return!1;let A=Xe.filter(e=>h.includes(e.id)).reduce((e,t)=>e+t.points,0)>=Ve.stagePoints&&ze.every(e=>p.includes(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>h.includes(e)),M=s<21?A:n.legacyCompletion;if(typeof M!=`boolean`||M&&!A)return!1;let te=Math.min(100,Xe.filter(e=>h.includes(e.id)).reduce((e,t)=>e+t.points,0)/Ve.stagePoints*100),ne=s<21?te>=60?4:te>=30?3:te>=10?2:1:n.appearanceFloor;if(typeof ne!=`number`||!Number.isInteger(ne)||ne<1||ne>4)return!1;let N=new w;if(s>=21){let e=new a;if(e.projects=new Set(p),e.completedTasks=new Set(h),!N.restore(n.enterprises,e))return!1}if(k.hasProgress&&!(M||A&&N.level(`harbor-link`)===3))return!1;let re=new v;if(s>=8&&!re.restore(n.kitchen,s<16,s<20)||re.hasProgress&&!m.includes(`kitchen`))return!1;let P=new Ne;if(s>=9&&!P.restore(s<25&&n.courier?{...n.courier,custom:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}}:n.courier)||P.hasProgress&&!m.includes(`driver`))return!1;let ie=new le;if(s>=10&&!ie.restore(n.orchard,s<12,s<16,s<20)||ie.hasProgress&&!m.includes(`orchard`)||!m.includes(`pear-grove`)&&(ie.fruit.pear>0||ie.trees.slice(3).some(e=>e.tended)))return!1;let ae=new Ae;if(s>=11&&!ae.restore(n.journal))return!1;s<11&&(ae.partial=!0);let oe=new ee;if(s>=12&&!oe.restore(n.requests)||j.some(e=>(oe.progress[e.id].chapter>0||oe.progress[e.id].contributed>0)&&!p.includes(e.requires)))return!1;let se=new De;if(s>=15&&!se.restore(n.funding,He.map(e=>({id:e.id,cost:e.price})),e=>m.includes(e)))return!1;let ce=new f([...e,...i]),F=new d(e,l),ue=new d(e,T);if(s>=16){let e=n.quality;if(!e?.expertise?.crops||!e.cargo||!e.stock)return!1;let t=e=>s<17?{...e,kabumorokoshi:[0,0,0,0,0,0]}:e,r={...e.expertise,crops:{...e.expertise.crops,...s<17?{kabumorokoshi:0}:{},...s<20?{pear:0}:{}}};if(!ce.restore(r)||!F.restore(t(e.cargo),l)||!ue.restore(t(e.stock),T))return!1}let I=s>=17?n.hybrids:[];if(!Array.isArray(I)||new Set(I).size!==I.length||I.some(e=>!D.some(t=>t.crop===e))||I.length>0&&!m.includes(`breeding`)||D.some(e=>!I.includes(e.crop)&&(l[e.crop]>0||T[e.crop]>0||ce.crops[e.crop]>0||b.some(t=>t.crop===e.crop||t.nextCrop===e.crop))))return!1;let pe=new Ee;if(s>=18){let e=new a;e.plots=b,e.investments=new Set(m),e.hybrids=new Set(I),e.enterprises=N;let t=n.machinery,r=s<22&&t&&Array.isArray(t.loads)?{...t,loads:t.loads.map(e=>e&&{...e,destination:`barn`})}:t;if(!pe.restore(r,e))return!1}let me=[new Ee(1),new Ee(2)];if(s>=23){if(!Array.isArray(n.extraMachinery)||n.extraMachinery.length!==2)return!1;let e=new a;if(e.plots=b,e.investments=new Set(m),e.hybrids=new Set(I),e.enterprises=N,me.some((t,r)=>!t.restore(n.extraMachinery[r],e)))return!1}else if(m.some(e=>R.slice(1).some(t=>t.some(t=>t===e))))return!1;let he=[n.machinery,...Array.isArray(n.extraMachinery)?n.extraMachinery:[]].filter(e=>e&&e.anchor>=0).map(e=>Math.floor(e.anchor/3));if(new Set(he).size!==he.length)return!1;let ge=[pe,...me].filter(e=>e.anchor>=0).map(e=>Math.floor(e.anchor/3));if(new Set(ge).size!==ge.length)return!1;let _e=[new fe(1),new fe(2)];if(s>=24){if(!Array.isArray(n.plantingLines)||n.plantingLines.length!==2)return!1;let e=new a;if(e.plots=b,e.investments=new Set(m),_e.some((t,r)=>!t.restore(n.plantingLines[r],e)))return!1}else if(m.some(e=>de.some(t=>t===e)))return!1;let ve=[S,...Array.isArray(n.plantingLines)?n.plantingLines.map(e=>e?.anchor??-1):[]].filter(e=>e>=0).map(e=>Math.floor(e/3));if(new Set(ve).size!==ve.length)return!1;m.includes(`seeder`)&&(S=b.findIndex((e,t)=>t<9&&e.land===`tilled`&&(!qe(t)||m.includes(qe(t)))));let ye=[S,..._e.map(e=>e.anchor)].filter(e=>e>=0).map(e=>Math.floor(e/3));if(new Set(ye).size!==ye.length)return!1;let be=new Se;if(s>=19){let e=new a;if(e.plots=b,e.projects=new Set(p),e.investments=new Set(m),e.hybrids=new Set(I),!be.restore(n.workers,e))return!1}if(re.plan!==`none`){let e=new a;if(e.investments=new Set(m),e.hybrids=new Set(I),!re.unlocked(re.plan,e))return!1}let L=s>=26?n.projectWork:{};return!L||typeof L!=`object`||Array.isArray(L)||Object.entries(L).some(([e,t])=>!Le.some(t=>t.id===e&&t.kind===`repairing`)||p.includes(e)||typeof t!=`number`||!Number.isFinite(t)||t<=0||t>1)?!1:(this.projectWork={...L},this.enterprises=N,this.legacyCompletion=M,this.appearanceFloor=ne,this.workers=be,this.machinery=pe,this.extraMachinery=me,this.plantingLines=_e,this.hybrids=new Set(I),this.expertise=ce,this.funding=se,this.requests=oe,this.journal=ae,this.orchard=ie,this.courier=P,this.kitchen=re,this.seederArea=g,this.helperArea=_,this.seederWorkingPlot=-1,this.helperWorkingPlot=-1,this.seederCursor=-1,this.helperCursor=-1,this.harbor=k,this.stock={...T},this.helperPlot=E,this.helperHarvested=O,this.helperProgress=0,this.projects=new Set(p),this.coins=n.coins,this.cargo={...l},this.orders={...u},this.shipped=n.shipped,this.plots=b,this.investments=new Set(m),this.completedTasks=new Set(h),this.seederPlot=S,this.seederProgress=0,this.cargoQuality=F,this.stockQuality=ue,this.interrupt(),this.revision++,!0)}};function Qe(e,t=new Date){return JSON.stringify({format:`farmer-mate-save`,version:1,exportedAt:t.toISOString(),farm:e},null,2)}function $e(e){if(e.length>1048576)throw Error(`このファイルは大きすぎます。農園の記録ファイルを選んでください。`);let t;try{t=JSON.parse(e)}catch{throw Error(`記録を読めませんでした。農園から書き出したファイルを選んでください。`)}if(t&&typeof t==`object`&&`format`in t){let e=t;if(e.format!==`farmer-mate-save`||e.version!==1)throw Error(`この形式の記録は読み込めません。`);t=e.farm}let n=new Ze;if(!n.restore(t))throw Error(`この農園の記録は読み込めません。内容や対応するゲームの版を確認してください。`);return n.save()}function et(e,t,n,r){e.setItem(t+`:before-import`,JSON.stringify(n)),e.setItem(t,JSON.stringify(r))}var tt=class{previous=null;remainder=0;stepSeconds=1/60;advance(e,t,n){if(this.previous===null)return this.previous=e,0;let r=Math.max(0,Math.min((e-this.previous)/1e3,.5));if(this.previous=e,t)return this.remainder=0,0;this.remainder+=r;let i=0;for(;this.remainder+1e-9>=this.stepSeconds;)n(this.stepSeconds),this.remainder=Math.max(0,this.remainder-this.stepSeconds),i++;return i}reset(e){this.previous=e,this.remainder=0}},nt=1e3,rt=1001,it=1002,at=1003,ot=1004,st=1005,ct=1006,lt=1007,ut=1008,dt=1009,ft=1010,pt=1011,mt=1012,ht=1013,gt=1014,_t=1015,vt=1016,yt=1017,bt=1018,xt=1020,St=35902,Ct=35899,wt=1021,Tt=1022,Et=1023,Dt=1026,Ot=1027,kt=1028,At=1029,jt=1030,Mt=1031,Nt=1033,Pt=33776,Ft=33777,It=33778,Lt=33779,Rt=35840,zt=35841,Bt=35842,Vt=35843,Ht=36196,Ut=37492,Wt=37496,Gt=37488,Kt=37489,qt=37490,Jt=37491,Yt=37808,Xt=37809,Zt=37810,Qt=37811,$t=37812,en=37813,tn=37814,nn=37815,rn=37816,an=37817,on=37818,sn=37819,cn=37820,ln=37821,un=36492,dn=36494,fn=36495,pn=36283,mn=36284,hn=36285,gn=36286,_n=2300,vn=2301,yn=2302,bn=2303,xn=2400,Sn=2401,Cn=2402,wn=3200,Tn=`srgb`,En=`srgb-linear`,Dn=`linear`,On=`srgb`,kn=7680,An=35044,jn=35048,Mn=2e3;function Nn(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function Pn(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function Fn(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function In(){let e=Fn(`canvas`);return e.style.display=`block`,e}var Ln={};function Rn(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function zn(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function V(...e){e=zn(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function H(...e){e=zn(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function Bn(...e){let t=e.join(` `);t in Ln||(Ln[t]=!0,V(...e))}function Vn(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var Hn={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Un=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Wn=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),Gn=1234567,Kn=Math.PI/180,qn=180/Math.PI;function Jn(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Wn[e&255]+Wn[e>>8&255]+Wn[e>>16&255]+Wn[e>>24&255]+`-`+Wn[t&255]+Wn[t>>8&255]+`-`+Wn[t>>16&15|64]+Wn[t>>24&255]+`-`+Wn[n&63|128]+Wn[n>>8&255]+`-`+Wn[n>>16&255]+Wn[n>>24&255]+Wn[r&255]+Wn[r>>8&255]+Wn[r>>16&255]+Wn[r>>24&255]).toLowerCase()}function U(e,t,n){return Math.max(t,Math.min(n,e))}function Yn(e,t){return(e%t+t)%t}function Xn(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function Zn(e,t,n){return e===t?0:(n-e)/(t-e)}function Qn(e,t,n){return(1-n)*e+n*t}function $n(e,t,n,r){return Qn(e,t,1-Math.exp(-n*r))}function er(e,t=1){return t-Math.abs(Yn(e,t*2)-t)}function tr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function nr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function rr(e,t){return e+Math.floor(Math.random()*(t-e+1))}function ir(e,t){return e+Math.random()*(t-e)}function ar(e){return e*(.5-Math.random())}function or(e){e!==void 0&&(Gn=e);let t=Gn+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function sr(e){return e*Kn}function cr(e){return e*qn}function lr(e){return!(e&e-1)&&e!==0}function ur(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function dr(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function fr(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:V(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function pr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function mr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var hr={DEG2RAD:Kn,RAD2DEG:qn,generateUUID:Jn,clamp:U,euclideanModulo:Yn,mapLinear:Xn,inverseLerp:Zn,lerp:Qn,damp:$n,pingpong:er,smoothstep:tr,smootherstep:nr,randInt:rr,randFloat:ir,randFloatSpread:ar,seededRandom:or,degToRad:sr,radToDeg:cr,isPowerOfTwo:lr,ceilPowerOfTwo:ur,floorPowerOfTwo:dr,setQuaternionFromProperEuler:fr,normalize:mr,denormalize:pr},W=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(U(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},gr=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:V(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(U(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},G=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(vr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(vr.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this.z=U(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this.z=U(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return _r.copy(this).projectOnVector(e),this.sub(_r)}reflect(e){return this.sub(_r.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(U(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},_r=new G,vr=new gr,K=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return Bn(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply(yr.makeScale(e,t)),this}rotate(e){return Bn(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply(yr.makeRotation(-e)),this}translate(e,t){return Bn(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply(yr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},yr=new K,br=new K().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),xr=new K().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Sr(){let e={enabled:!0,workingColorSpace:En,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=wr(e.r),e.g=wr(e.g),e.b=wr(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=Tr(e.r),e.g=Tr(e.g),e.b=Tr(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?Dn:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return Bn(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return Bn(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[En]:{primaries:t,whitePoint:r,transfer:Dn,toXYZ:br,fromXYZ:xr,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:Tn},outputColorSpaceConfig:{drawingBufferColorSpace:Tn}},[Tn]:{primaries:t,whitePoint:r,transfer:On,toXYZ:br,fromXYZ:xr,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:Tn}}}),e}var Cr=Sr();function wr(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function Tr(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var Er,Dr=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Er===void 0&&(Er=Fn(`canvas`)),Er.width=e.width,Er.height=e.height;let t=Er.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=Er}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=Fn(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=wr(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(wr(t[e]/255)*255):t[e]=wr(t[e]);return{data:t,width:e.width,height:e.height}}return V(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},Or=0,kr=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Or++}),this.uuid=Jn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(Ar(r[t].image)):e.push(Ar(r[t]))}else e=Ar(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function Ar(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?Dr.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(V(`Texture: Unable to serialize Texture.`),{})}var jr=0,Mr=new G,Nr=class e extends Un{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=rt,i=rt,a=ct,o=ut,s=Et,c=dt,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:jr++}),this.uuid=Jn(),this.name=``,this.source=new kr(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new W(0,0),this.repeat=new W(1,1),this.center=new W(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new K,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Mr).x}get height(){return this.source.getSize(Mr).y}get depth(){return this.source.getSize(Mr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){V(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){V(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case nt:e.x-=Math.floor(e.x);break;case rt:e.x=e.x<0?0:1;break;case it:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case nt:e.y-=Math.floor(e.y);break;case rt:e.y=e.y<0?0:1;break;case it:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Nr.DEFAULT_IMAGE=null,Nr.DEFAULT_MAPPING=300,Nr.DEFAULT_ANISOTROPY=1;var Pr=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=U(this.x,e.x,t.x),this.y=U(this.y,e.y,t.y),this.z=U(this.z,e.z,t.z),this.w=U(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=U(this.x,e,t),this.y=U(this.y,e,t),this.z=U(this.z,e,t),this.w=U(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(U(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Fr=class extends Un{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ct,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Pr(0,0,e,t),this.scissorTest=!1,this.viewport=new Pr(0,0,e,t),this.textures=[];let r=new Nr({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new kr(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ir=class extends Fr{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Lr=class extends Nr{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=at,this.minFilter=at,this.wrapR=rt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},Rr=class extends Nr{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=at,this.minFilter=at,this.wrapR=rt,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},zr=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/Br.setFromMatrixColumn(e,0).length(),i=1/Br.setFromMatrixColumn(e,1).length(),a=1/Br.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Hr,e,Ur)}lookAt(e,t,n){let r=this.elements;return Kr.subVectors(e,t),Kr.lengthSq()===0&&(Kr.z=1),Kr.normalize(),Wr.crossVectors(n,Kr),Wr.lengthSq()===0&&(Math.abs(n.z)===1?Kr.x+=1e-4:Kr.z+=1e-4,Kr.normalize(),Wr.crossVectors(n,Kr)),Wr.normalize(),Gr.crossVectors(Kr,Wr),r[0]=Wr.x,r[4]=Gr.x,r[8]=Kr.x,r[1]=Wr.y,r[5]=Gr.y,r[9]=Kr.y,r[2]=Wr.z,r[6]=Gr.z,r[10]=Kr.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],te=r[7],ne=r[11],N=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*te,i[8]=a*C+o*D+s*j+c*ne,i[12]=a*w+o*O+s*ee+c*N,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*te,i[9]=l*C+u*D+d*j+f*ne,i[13]=l*w+u*O+d*ee+f*N,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*te,i[10]=p*C+m*D+h*j+g*ne,i[14]=p*w+m*O+h*ee+g*N,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*te,i[11]=_*C+v*D+y*j+b*ne,i[15]=_*w+v*O+y*ee+b*N,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=Br.set(r[0],r[1],r[2]).length(),o=Br.set(r[4],r[5],r[6]).length(),s=Br.set(r[8],r[9],r[10]).length();i<0&&(a=-a),Vr.copy(this);let c=1/a,l=1/o,u=1/s;return Vr.elements[0]*=c,Vr.elements[1]*=c,Vr.elements[2]*=c,Vr.elements[4]*=l,Vr.elements[5]*=l,Vr.elements[6]*=l,Vr.elements[8]*=u,Vr.elements[9]*=u,Vr.elements[10]*=u,t.setFromRotationMatrix(Vr),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=Mn,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=Mn,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Br=new G,Vr=new zr,Hr=new G(0,0,0),Ur=new G(1,1,1),Wr=new G,Gr=new G,Kr=new G,qr=new zr,Jr=new gr,Yr=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(U(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-U(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(U(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-U(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(U(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-U(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:V(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return qr.makeRotationFromQuaternion(e),this.setFromRotationMatrix(qr,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Jr.setFromEuler(this),this.setFromQuaternion(Jr,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yr.DEFAULT_ORDER=`XYZ`;var Xr=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},Zr=0,Qr=new G,$r=new gr,ei=new zr,ti=new G,ni=new G,ri=new G,ii=new gr,ai=new G(1,0,0),oi=new G(0,1,0),si=new G(0,0,1),ci={type:`added`},li={type:`removed`},ui={type:`childadded`,child:null},di={type:`childremoved`,child:null},fi=class e extends Un{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Zr++}),this.uuid=Jn(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new G,n=new Yr,r=new gr,i=new G(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new zr},normalMatrix:{value:new K}}),this.matrix=new zr,this.matrixWorld=new zr,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Xr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $r.setFromAxisAngle(e,t),this.quaternion.multiply($r),this}rotateOnWorldAxis(e,t){return $r.setFromAxisAngle(e,t),this.quaternion.premultiply($r),this}rotateX(e){return this.rotateOnAxis(ai,e)}rotateY(e){return this.rotateOnAxis(oi,e)}rotateZ(e){return this.rotateOnAxis(si,e)}translateOnAxis(e,t){return Qr.copy(e).applyQuaternion(this.quaternion),this.position.add(Qr.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(ai,e)}translateY(e){return this.translateOnAxis(oi,e)}translateZ(e){return this.translateOnAxis(si,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ei.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ti.copy(e):ti.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ei.lookAt(ni,ti,this.up):ei.lookAt(ti,ni,this.up),this.quaternion.setFromRotationMatrix(ei),r&&(ei.extractRotation(r.matrixWorld),$r.setFromRotationMatrix(ei),this.quaternion.premultiply($r.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(H(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(ci),ui.child=e,this.dispatchEvent(ui),ui.child=null):H(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(li),di.child=e,this.dispatchEvent(di),di.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ei.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ei.multiply(e.parent.matrixWorld)),e.applyMatrix4(ei),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(ci),ui.child=e,this.dispatchEvent(ui),ui.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ni,e,ri),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ni,ii,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};fi.DEFAULT_UP=new G(0,1,0),fi.DEFAULT_MATRIX_AUTO_UPDATE=!0,fi.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var q=class extends fi{constructor(){super(),this.isGroup=!0,this.type=`Group`}},pi={type:`move`},mi=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new q,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new q,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new G,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new G),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new q,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new G,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new G,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(pi)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new q;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},hi={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},gi={h:0,s:0,l:0},_i={h:0,s:0,l:0};function vi(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var J=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Cr.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=Cr.workingColorSpace){return this.r=e,this.g=t,this.b=n,Cr.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=Cr.workingColorSpace){if(e=Yn(e,1),t=U(t,0,1),n=U(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=vi(i,r,e+1/3),this.g=vi(i,r,e),this.b=vi(i,r,e-1/3)}return Cr.colorSpaceToWorking(this,r),this}setStyle(e,t=Tn){function n(t){t!==void 0&&parseFloat(t)<1&&V(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:V(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);V(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Tn){let n=hi[e.toLowerCase()];return n===void 0?V(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=wr(e.r),this.g=wr(e.g),this.b=wr(e.b),this}copyLinearToSRGB(e){return this.r=Tr(e.r),this.g=Tr(e.g),this.b=Tr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Tn){return Cr.workingToColorSpace(yi.copy(this),e),Math.round(U(yi.r*255,0,255))*65536+Math.round(U(yi.g*255,0,255))*256+Math.round(U(yi.b*255,0,255))}getHexString(e=Tn){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Cr.workingColorSpace){Cr.workingToColorSpace(yi.copy(this),t);let n=yi.r,r=yi.g,i=yi.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=Cr.workingColorSpace){return Cr.workingToColorSpace(yi.copy(this),t),e.r=yi.r,e.g=yi.g,e.b=yi.b,e}getStyle(e=Tn){Cr.workingToColorSpace(yi.copy(this),e);let t=yi.r,n=yi.g,r=yi.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(gi),this.setHSL(gi.h+e,gi.s+t,gi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(gi),e.getHSL(_i);let n=Qn(gi.h,_i.h,t),r=Qn(gi.s,_i.s,t),i=Qn(gi.l,_i.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},yi=new J;J.NAMES=hi;var bi=class extends fi{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yr,this.environmentIntensity=1,this.environmentRotation=new Yr,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},xi=new G,Si=new G,Ci=new G,wi=new G,Ti=new G,Ei=new G,Di=new G,Oi=new G,ki=new G,Ai=new G,ji=new Pr,Mi=new Pr,Ni=new Pr,Pi=class e{constructor(e=new G,t=new G,n=new G){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),xi.subVectors(e,t),r.cross(xi);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){xi.subVectors(r,t),Si.subVectors(n,t),Ci.subVectors(e,t);let a=xi.dot(xi),o=xi.dot(Si),s=xi.dot(Ci),c=Si.dot(Si),l=Si.dot(Ci),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,wi)!==null&&wi.x>=0&&wi.y>=0&&wi.x+wi.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,wi)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,wi.x),s.addScaledVector(a,wi.y),s.addScaledVector(o,wi.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return ji.setScalar(0),Mi.setScalar(0),Ni.setScalar(0),ji.fromBufferAttribute(e,t),Mi.fromBufferAttribute(e,n),Ni.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(ji,i.x),a.addScaledVector(Mi,i.y),a.addScaledVector(Ni,i.z),a}static isFrontFacing(e,t,n,r){return xi.subVectors(n,t),Si.subVectors(e,t),xi.cross(Si).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return xi.subVectors(this.c,this.b),Si.subVectors(this.a,this.b),xi.cross(Si).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;Ti.subVectors(r,n),Ei.subVectors(i,n),Oi.subVectors(e,n);let s=Ti.dot(Oi),c=Ei.dot(Oi);if(s<=0&&c<=0)return t.copy(n);ki.subVectors(e,r);let l=Ti.dot(ki),u=Ei.dot(ki);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(Ti,a);Ai.subVectors(e,i);let f=Ti.dot(Ai),p=Ei.dot(Ai);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(Ei,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return Di.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(Di,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(Ti,a).addScaledVector(Ei,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Fi=class{constructor(e=new G(1/0,1/0,1/0),t=new G(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Li.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Li.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Li.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,Li):Li.fromBufferAttribute(r,t),Li.applyMatrix4(e.matrixWorld),this.expandByPoint(Li);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),Ri.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),Ri.copy(e.boundingBox)),Ri.applyMatrix4(e.matrixWorld),this.union(Ri)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Li),Li.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Gi),Ki.subVectors(this.max,Gi),zi.subVectors(e.a,Gi),Bi.subVectors(e.b,Gi),Vi.subVectors(e.c,Gi),Hi.subVectors(Bi,zi),Ui.subVectors(Vi,Bi),Wi.subVectors(zi,Vi);let t=[0,-Hi.z,Hi.y,0,-Ui.z,Ui.y,0,-Wi.z,Wi.y,Hi.z,0,-Hi.x,Ui.z,0,-Ui.x,Wi.z,0,-Wi.x,-Hi.y,Hi.x,0,-Ui.y,Ui.x,0,-Wi.y,Wi.x,0];return!Yi(t,zi,Bi,Vi,Ki)||(t=[1,0,0,0,1,0,0,0,1],!Yi(t,zi,Bi,Vi,Ki))?!1:(qi.crossVectors(Hi,Ui),t=[qi.x,qi.y,qi.z],Yi(t,zi,Bi,Vi,Ki))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Li).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Li).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Ii[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Ii[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Ii[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Ii[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Ii[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Ii[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Ii[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Ii[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Ii),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Ii=[new G,new G,new G,new G,new G,new G,new G,new G],Li=new G,Ri=new Fi,zi=new G,Bi=new G,Vi=new G,Hi=new G,Ui=new G,Wi=new G,Gi=new G,Ki=new G,qi=new G,Ji=new G;function Yi(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Ji.fromArray(e,a);let o=i.x*Math.abs(Ji.x)+i.y*Math.abs(Ji.y)+i.z*Math.abs(Ji.z),s=t.dot(Ji),c=n.dot(Ji),l=r.dot(Ji);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Xi=new G,Zi=new W,Qi=0,$i=class extends Un{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Qi++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=An,this.updateRanges=[],this.gpuType=_t,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Zi.fromBufferAttribute(this,t),Zi.applyMatrix3(e),this.setXY(t,Zi.x,Zi.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.applyMatrix3(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.applyMatrix4(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.applyNormalMatrix(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xi.fromBufferAttribute(this,t),Xi.transformDirection(e),this.setXYZ(t,Xi.x,Xi.y,Xi.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=pr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mr(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=pr(t,this.array)),t}setX(e,t){return this.normalized&&(t=mr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=pr(t,this.array)),t}setY(e,t){return this.normalized&&(t=mr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=pr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=mr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=pr(t,this.array)),t}setW(e,t){return this.normalized&&(t=mr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=mr(t,this.array),n=mr(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=mr(t,this.array),n=mr(n,this.array),r=mr(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=mr(t,this.array),n=mr(n,this.array),r=mr(r,this.array),i=mr(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},ea=class extends $i{constructor(e,t,n){super(new Uint16Array(e),t,n)}},ta=class extends $i{constructor(e,t,n){super(new Uint32Array(e),t,n)}},na=class extends $i{constructor(e,t,n){super(new Float32Array(e),t,n)}},ra=new Fi,ia=new G,aa=new G,oa=class{constructor(e=new G,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?ra.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ia.subVectors(e,this.center);let t=ia.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(ia,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(aa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ia.copy(e.center).add(aa)),this.expandByPoint(ia.copy(e.center).sub(aa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},sa=0,ca=new zr,la=new fi,ua=new G,da=new Fi,fa=new Fi,pa=new G,ma=class e extends Un{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:sa++}),this.uuid=Jn(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(Nn(e)?ta:ea)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new K().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ca.makeRotationFromQuaternion(e),this.applyMatrix4(ca),this}rotateX(e){return ca.makeRotationX(e),this.applyMatrix4(ca),this}rotateY(e){return ca.makeRotationY(e),this.applyMatrix4(ca),this}rotateZ(e){return ca.makeRotationZ(e),this.applyMatrix4(ca),this}translate(e,t,n){return ca.makeTranslation(e,t,n),this.applyMatrix4(ca),this}scale(e,t,n){return ca.makeScale(e,t,n),this.applyMatrix4(ca),this}lookAt(e){return la.lookAt(e),la.updateMatrix(),this.applyMatrix4(la.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ua).negate(),this.translate(ua.x,ua.y,ua.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new na(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&V(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Fi);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){H(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new G(-1/0,-1/0,-1/0),new G(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];da.setFromBufferAttribute(n),this.morphTargetsRelative?(pa.addVectors(this.boundingBox.min,da.min),this.boundingBox.expandByPoint(pa),pa.addVectors(this.boundingBox.max,da.max),this.boundingBox.expandByPoint(pa)):(this.boundingBox.expandByPoint(da.min),this.boundingBox.expandByPoint(da.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&H(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new oa);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){H(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new G,1/0);return}if(e){let n=this.boundingSphere.center;if(da.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];fa.setFromBufferAttribute(n),this.morphTargetsRelative?(pa.addVectors(da.min,fa.min),da.expandByPoint(pa),pa.addVectors(da.max,fa.max),da.expandByPoint(pa)):(da.expandByPoint(fa.min),da.expandByPoint(fa.max))}da.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)pa.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(pa));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)pa.fromBufferAttribute(a,t),o&&(ua.fromBufferAttribute(e,t),pa.add(ua)),r=Math.max(r,n.distanceToSquared(pa))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&H(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){H(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new $i(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new G,s[e]=new G;let c=new G,l=new G,u=new G,d=new W,f=new W,p=new W,m=new G,h=new G;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new G,y=new G,b=new G,x=new G;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new $i(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new G,i=new G,a=new G,o=new G,s=new G,c=new G,l=new G,u=new G;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pa.fromBufferAttribute(e,t),pa.normalize(),e.setXYZ(t,pa.x,pa.y,pa.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new $i(a,r,i)}if(this.index===null)return V(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},ha=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=An,this.updateRanges=[],this.version=0,this.uuid=Jn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Jn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},ga=new G,_a=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)ga.fromBufferAttribute(this,t),ga.applyMatrix4(e),this.setXYZ(t,ga.x,ga.y,ga.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ga.fromBufferAttribute(this,t),ga.applyNormalMatrix(e),this.setXYZ(t,ga.x,ga.y,ga.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ga.fromBufferAttribute(this,t),ga.transformDirection(e),this.setXYZ(t,ga.x,ga.y,ga.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=pr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=mr(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=mr(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=mr(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=mr(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=mr(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=pr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=pr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=pr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=pr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=mr(t,this.array),n=mr(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=mr(t,this.array),n=mr(n,this.array),r=mr(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=mr(t,this.array),n=mr(n,this.array),r=mr(r,this.array),i=mr(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){Rn(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new $i(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Rn(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},va=0,ya=class extends Un{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:va++}),this.uuid=Jn(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new J(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=kn,this.stencilZFail=kn,this.stencilZPass=kn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){V(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){V(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new J().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new W().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new W().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},ba=class extends ya{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new J(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},xa,Sa=new G,Ca=new G,wa=new G,Ta=new W,Ea=new W,Da=new zr,Oa=new G,ka=new G,Aa=new G,ja=new W,Ma=new W,Na=new W,Pa=class extends fi{constructor(e=new ba){if(super(),this.isSprite=!0,this.type=`Sprite`,xa===void 0){xa=new ma;let e=new ha(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);xa.setIndex([0,1,2,0,2,3]),xa.setAttribute(`position`,new _a(e,3,0,!1)),xa.setAttribute(`uv`,new _a(e,2,3,!1))}this.geometry=xa,this.material=e,this.center=new W(.5,.5),this.count=1}raycast(e,t){e.camera===null&&H(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),Ca.setFromMatrixScale(this.matrixWorld),Da.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wa.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ca.multiplyScalar(-wa.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;Fa(Oa.set(-.5,-.5,0),wa,a,Ca,r,i),Fa(ka.set(.5,-.5,0),wa,a,Ca,r,i),Fa(Aa.set(.5,.5,0),wa,a,Ca,r,i),ja.set(0,0),Ma.set(1,0),Na.set(1,1);let o=e.ray.intersectTriangle(Oa,ka,Aa,!1,Sa);if(o===null&&(Fa(ka.set(-.5,.5,0),wa,a,Ca,r,i),Ma.set(0,1),o=e.ray.intersectTriangle(Oa,Aa,ka,!1,Sa),o===null))return;let s=e.ray.origin.distanceTo(Sa);s<e.near||s>e.far||t.push({distance:s,point:Sa.clone(),uv:Pi.getInterpolation(Sa,Oa,ka,Aa,ja,Ma,Na,new W),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function Fa(e,t,n,r,i,a){Ta.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?Ea.copy(Ta):(Ea.x=a*Ta.x-i*Ta.y,Ea.y=i*Ta.x+a*Ta.y),e.copy(t),e.x+=Ea.x,e.y+=Ea.y,e.applyMatrix4(Da)}var Ia=new G,La=new G,Ra=new G,za=new G,Ba=new G,Va=new G,Ha=new G,Ua=class{constructor(e=new G,t=new G(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Ia)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Ia.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Ia.copy(this.origin).addScaledVector(this.direction,t),Ia.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){La.copy(e).add(t).multiplyScalar(.5),Ra.copy(t).sub(e).normalize(),za.copy(this.origin).sub(La);let i=e.distanceTo(t)*.5,a=-this.direction.dot(Ra),o=za.dot(this.direction),s=-za.dot(Ra),c=za.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(La).addScaledVector(Ra,d),f}intersectSphere(e,t){Ia.subVectors(e.center,this.origin);let n=Ia.dot(this.direction),r=Ia.dot(Ia)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,Ia)!==null}intersectTriangle(e,t,n,r,i){Ba.subVectors(t,e),Va.subVectors(n,e),Ha.crossVectors(Ba,Va);let a=this.direction.dot(Ha),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;za.subVectors(this.origin,e);let s=o*this.direction.dot(Va.crossVectors(za,Va));if(s<0)return null;let c=o*this.direction.dot(Ba.cross(za));if(c<0||s+c>a)return null;let l=-o*za.dot(Ha);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Wa=class extends ya{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yr,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Ga=new zr,Ka=new Ua,qa=new oa,Ja=new G,Ya=new G,Xa=new G,Za=new G,Qa=new G,$a=new G,eo=new G,to=new G,Y=class extends fi{constructor(e=new ma,t=new Wa){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){$a.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(Qa.fromBufferAttribute(s,e),a?$a.addScaledVector(Qa,r):$a.addScaledVector(Qa.sub(t),r))}t.add($a)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),qa.copy(n.boundingSphere),qa.applyMatrix4(i),Ka.copy(e.ray).recast(e.near),!(qa.containsPoint(Ka.origin)===!1&&(Ka.intersectSphere(qa,Ja)===null||Ka.origin.distanceToSquared(Ja)>(e.far-e.near)**2))&&(Ga.copy(i).invert(),Ka.copy(e.ray).applyMatrix4(Ga),(n.boundingBox===null||Ka.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Ka)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=ro(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=ro(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=ro(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=ro(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function no(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;to.copy(s),to.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(to);return l<n.near||l>n.far?null:{distance:l,point:to.clone(),object:e}}function ro(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ya),e.getVertexPosition(c,Xa),e.getVertexPosition(l,Za);let u=no(e,t,n,r,Ya,Xa,Za,eo);if(u){let e=new G;Pi.getBarycoord(eo,Ya,Xa,Za,e),i&&(u.uv=Pi.getInterpolatedAttribute(i,s,c,l,e,new W)),a&&(u.uv1=Pi.getInterpolatedAttribute(a,s,c,l,e,new W)),o&&(u.normal=Pi.getInterpolatedAttribute(o,s,c,l,e,new G),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new G,materialIndex:0};Pi.getNormal(Ya,Xa,Za,t.normal),u.face=t,u.barycoord=e}return u}var io=class extends Nr{constructor(e=null,t=1,n=1,r,i,a,o,s,c=at,l=at,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},ao=class extends $i{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},oo=new zr,so=new zr,co=[],lo=new Fi,uo=new zr,fo=new Y,po=new oa,mo=class extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ao(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,uo)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Fi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,oo),lo.copy(e.boundingBox).applyMatrix4(oo),this.boundingBox.union(lo)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new oa),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,oo),po.copy(e.boundingSphere).applyMatrix4(oo),this.boundingSphere.union(po)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(fo.geometry=this.geometry,fo.material=this.material,fo.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),po.copy(this.boundingSphere),po.applyMatrix4(n),e.ray.intersectsSphere(po)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,oo),so.multiplyMatrices(n,oo),fo.matrixWorld=so,fo.raycast(e,co);for(let e=0,n=co.length;e<n;e++){let n=co[e];n.instanceId=i,n.object=this,t.push(n)}co.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ao(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new io(new Float32Array(r*this.count),r,this.count,kt,_t));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},ho=new G,go=new G,_o=new K,vo=class{constructor(e=new G(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=ho.subVectors(n,t).cross(go.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(ho),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||_o.getNormalMatrix(e),r=this.coplanarPoint(ho).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},yo=new oa,bo=new W(.5,.5),xo=new G,So=class{constructor(e=new vo,t=new vo,n=new vo,r=new vo,i=new vo,a=new vo){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Mn,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yo.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yo.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yo)}intersectsSprite(e){return yo.center.set(0,0,0),yo.radius=.7071067811865476+bo.distanceTo(e.center),yo.applyMatrix4(e.matrixWorld),this.intersectsSphere(yo)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(xo.x=r.normal.x>0?e.max.x:e.min.x,xo.y=r.normal.y>0?e.max.y:e.min.y,xo.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(xo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},Co=class extends Nr{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},wo=class extends Nr{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},To=class extends Nr{constructor(e,t,n=gt,r,i,a,o=at,s=at,c,l=Dt,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new kr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},Eo=class extends To{constructor(e,t=gt,n=301,r,i,a=at,o=at,s,c=Dt){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Do=class extends Nr{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Oo=class e extends ma{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new na(c,3)),this.setAttribute(`normal`,new na(l,3)),this.setAttribute(`uv`,new na(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new G;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ko=class e extends ma{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new G,l=new W;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new na(a,3)),this.setAttribute(`normal`,new na(o,3)),this.setAttribute(`uv`,new na(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},Ao=class e extends ma{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new na(u,3)),this.setAttribute(`normal`,new na(d,3)),this.setAttribute(`uv`,new na(f,2));function _(){let a=new G,_=new G,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new W,m=new G,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},jo=class e extends Ao{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},Mo=class e extends ma{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new na(i,3)),this.setAttribute(`normal`,new na(i.slice(),3)),this.setAttribute(`uv`,new na(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new G,r=new G,i=new G;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new G;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new G;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new G,t=new G,n=new G,r=new G,o=new W,s=new W,c=new W;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},No=class e extends Mo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Po=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){V(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new W:new G);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new G,r=[],i=[],a=[],o=new G,s=new zr;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new G)}i[0]=new G,a[0]=new G;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(U(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(U(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},Fo=class extends Po{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new W){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},Io=class extends Fo{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function Lo(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var Ro=new G,zo=new G,Bo=new Lo,Vo=new Lo,Ho=new Lo,Uo=class extends Po{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new G){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(zo.subVectors(r[0],r[1]).add(r[0]),c=zo);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(Ro.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=Ro),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),Bo.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),Vo.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ho.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(Bo.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),Vo.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ho.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(Bo.calc(s),Vo.calc(s),Ho.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function Wo(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Go(e,t){let n=1-e;return n*n*t}function Ko(e,t){return 2*(1-e)*e*t}function qo(e,t){return e*e*t}function Jo(e,t,n,r){return Go(e,t)+Ko(e,n)+qo(e,r)}function Yo(e,t){let n=1-e;return n*n*n*t}function Xo(e,t){let n=1-e;return 3*n*n*e*t}function Zo(e,t){return 3*(1-e)*e*e*t}function Qo(e,t){return e*e*e*t}function $o(e,t,n,r,i){return Yo(e,t)+Xo(e,n)+Zo(e,r)+Qo(e,i)}var es=class extends Po{constructor(e=new W,t=new W,n=new W,r=new W){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set($o(e,r.x,i.x,a.x,o.x),$o(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ts=class extends Po{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set($o(e,r.x,i.x,a.x,o.x),$o(e,r.y,i.y,a.y,o.y),$o(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},ns=class extends Po{constructor(e=new W,t=new W){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new W){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new W){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},rs=class extends Po{constructor(e=new G,t=new G){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},is=class extends Po{constructor(e=new W,t=new W,n=new W){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new W){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Jo(e,r.x,i.x,a.x),Jo(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},as=class extends Po{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Jo(e,r.x,i.x,a.x),Jo(e,r.y,i.y,a.y),Jo(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},os=Object.freeze({__proto__:null,ArcCurve:Io,CatmullRomCurve3:Uo,CubicBezierCurve:es,CubicBezierCurve3:ts,EllipseCurve:Fo,LineCurve:ns,LineCurve3:rs,QuadraticBezierCurve:is,QuadraticBezierCurve3:as,SplineCurve:class extends Po{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new W){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(Wo(o,s.x,c.x,l.x,u.x),Wo(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new W().fromArray(n))}return this}}}),ss=class e extends Mo{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},cs=class e extends ma{constructor(e=[new W(0,-.5),new W(.5,0),new W(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=U(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new G,d=new W,f=new G,p=new G,m=new G,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new na(a,3)),this.setAttribute(`uv`,new na(o,2)),this.setAttribute(`normal`,new na(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},ls=class e extends ma{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new na(p,3)),this.setAttribute(`normal`,new na(m,3)),this.setAttribute(`uv`,new na(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},us=class e extends ma{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new G,p=new W;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new na(s,3)),this.setAttribute(`normal`,new na(c,3)),this.setAttribute(`uv`,new na(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},ds=class e extends ma{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new G,d=new G,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new na(p,3)),this.setAttribute(`normal`,new na(m,3)),this.setAttribute(`uv`,new na(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},fs=class e extends ma{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new G,f=new G,p=new G;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new na(c,3)),this.setAttribute(`normal`,new na(l,3)),this.setAttribute(`uv`,new na(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},ps=class e extends ma{constructor(e=new as(new G(-1,-1,0),new G(-1,1,0),new G(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new G,s=new G,c=new W,l=new G,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new na(u,3)),this.setAttribute(`normal`,new na(d,3)),this.setAttribute(`uv`,new na(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new os[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function ms(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(gs(i))i.isRenderTargetTexture?(V(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(gs(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function hs(e){let t={};for(let n=0;n<e.length;n++){let r=ms(e[n]);for(let e in r)t[e]=r[e]}return t}function gs(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function _s(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function vs(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Cr.workingColorSpace}var ys={clone:ms,merge:hs},bs=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,xs=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ss=class extends ya{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=bs,this.fragmentShader=xs,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ms(e.uniforms),this.uniformsGroups=_s(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new J().setHex(r.value);break;case`v2`:this.uniforms[n].value=new W().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new Pr().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new zr().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Cs=class extends Ss{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ws=class extends ya{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new J(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yr,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ts=class extends ya{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new J(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new J(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new W(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yr,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Es=class extends ya{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=wn,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ds=class extends ya{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Os(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var ks=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},As=class extends ks{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:xn,endingEnd:xn}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case Sn:i=e,o=2*t-n;break;case Cn:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case Sn:a=e,s=2*n-t;break;case Cn:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},js=class extends ks{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},Ms=class extends ks{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},Ns=class extends ks{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},Ps=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=Os(t,this.TimeBufferType),this.values=Os(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Os(e.times,Array),values:Os(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ms(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new js(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new As(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Ns(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case _n:t=this.InterpolantFactoryMethodDiscrete;break;case vn:t=this.InterpolantFactoryMethodLinear;break;case yn:t=this.InterpolantFactoryMethodSmooth;break;case bn:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return V(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _n;case this.InterpolantFactoryMethodLinear:return vn;case this.InterpolantFactoryMethodSmooth:return yn;case this.InterpolantFactoryMethodBezier:return bn}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(H(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(H(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){H(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){H(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&Pn(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){H(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===yn,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Ps.prototype.ValueTypeName=``,Ps.prototype.TimeBufferType=Float32Array,Ps.prototype.ValueBufferType=Float32Array,Ps.prototype.DefaultInterpolation=vn;var Fs=class extends Ps{constructor(e,t,n){super(e,t,n)}};Fs.prototype.ValueTypeName=`bool`,Fs.prototype.ValueBufferType=Array,Fs.prototype.DefaultInterpolation=_n,Fs.prototype.InterpolantFactoryMethodLinear=void 0,Fs.prototype.InterpolantFactoryMethodSmooth=void 0;var Is=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}};Is.prototype.ValueTypeName=`color`;var Ls=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}};Ls.prototype.ValueTypeName=`number`;var Rs=class extends ks{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)gr.slerpFlat(i,0,a,c-o,a,c,s);return i}},zs=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new Rs(this.times,this.values,this.getValueSize(),e)}};zs.prototype.ValueTypeName=`quaternion`,zs.prototype.InterpolantFactoryMethodSmooth=void 0;var Bs=class extends Ps{constructor(e,t,n){super(e,t,n)}};Bs.prototype.ValueTypeName=`string`,Bs.prototype.ValueBufferType=Array,Bs.prototype.DefaultInterpolation=_n,Bs.prototype.InterpolantFactoryMethodLinear=void 0,Bs.prototype.InterpolantFactoryMethodSmooth=void 0;var Vs=class extends Ps{constructor(e,t,n,r){super(e,t,n,r)}};Vs.prototype.ValueTypeName=`vector`;var Hs={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Us(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Us(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Us(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var Ws=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Gs=class{constructor(e){this.manager=e===void 0?Ws:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Gs.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Ks=new WeakMap,qs=class extends Gs{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Hs.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Ks.get(a);e===void 0&&(e=[],Ks.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=Fn(`img`);function s(){l(),t&&t(this);let n=Ks.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Ks.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Hs.remove(`image:${e}`);let n=Ks.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Ks.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Hs.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Js=class extends Gs{constructor(e){super(e)}load(e,t,n,r){let i=new Nr,a=new qs(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},Ys=class extends fi{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new J(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Xs=class extends Ys{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(fi.DEFAULT_UP),this.updateMatrix(),this.groundColor=new J(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},Zs=new zr,Qs=new G,$s=new G,ec=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new W(512,512),this.mapType=dt,this.map=null,this.mapPass=null,this.matrix=new zr,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new So,this._frameExtents=new W(1,1),this._viewportCount=1,this._viewports=[new Pr(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Qs.setFromMatrixPosition(e.matrixWorld),t.position.copy(Qs),$s.setFromMatrixPosition(e.target.matrixWorld),t.lookAt($s),t.updateMatrixWorld(),Zs.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Zs,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Zs)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},tc=new G,nc=new gr,rc=new G,ic=class extends fi{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new zr,this.projectionMatrix=new zr,this.projectionMatrixInverse=new zr,this.coordinateSystem=Mn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(tc,nc,rc),rc.x===1&&rc.y===1&&rc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tc,nc,rc.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(tc,nc,rc),rc.x===1&&rc.y===1&&rc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(tc,nc,rc.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},ac=new G,oc=new W,sc=new W,cc=class extends ic{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=qn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Kn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return qn*2*Math.atan(Math.tan(Kn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){ac.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(ac.x,ac.y).multiplyScalar(-e/ac.z),ac.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(ac.x,ac.y).multiplyScalar(-e/ac.z)}getViewSize(e,t){return this.getViewBounds(e,oc,sc),t.subVectors(sc,oc)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Kn*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},lc=class extends ic{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},uc=class extends ec{constructor(){super(new lc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},dc=class extends Ys{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(fi.DEFAULT_UP),this.updateMatrix(),this.target=new fi,this.shadow=new uc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},fc=-90,pc=1,mc=class extends fi{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new cc(fc,pc,e,t);r.layers=this.layers,this.add(r);let i=new cc(fc,pc,e,t);i.layers=this.layers,this.add(i);let a=new cc(fc,pc,e,t);a.layers=this.layers,this.add(a);let o=new cc(fc,pc,e,t);o.layers=this.layers,this.add(o);let s=new cc(fc,pc,e,t);s.layers=this.layers,this.add(s);let c=new cc(fc,pc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},hc=class extends cc{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},gc=`\\[\\]\\.:\\/`,_c=RegExp(`[\\[\\]\\.:\\/]`,`g`),vc=`[^\\[\\]\\.:\\/]`,yc=`[^`+gc.replace(`\\.`,``)+`]`,bc=`((?:WC+[\\/:])*)`.replace(`WC`,vc),xc=`(WCOD+)?`.replace(`WCOD`,yc),Sc=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,vc),Cc=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,vc),wc=RegExp(`^`+bc+xc+Sc+Cc+`$`),Tc=[`material`,`materials`,`bones`,`map`],Ec=class{constructor(e,t,n){let r=n||Dc.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},Dc=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(_c,``)}static parseTrackName(e){let t=wc.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);Tc.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){V(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){H(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){H(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){H(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){H(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){H(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){H(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;H(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){H(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Dc.Composite=Ec,Dc.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},Dc.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},Dc.prototype.GetterByBindingType=[Dc.prototype._getValue_direct,Dc.prototype._getValue_array,Dc.prototype._getValue_arrayElement,Dc.prototype._getValue_toArray],Dc.prototype.SetterByBindingTypeAndVersioning=[[Dc.prototype._setValue_direct,Dc.prototype._setValue_direct_setNeedsUpdate,Dc.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Dc.prototype._setValue_array,Dc.prototype._setValue_array_setNeedsUpdate,Dc.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Dc.prototype._setValue_arrayElement,Dc.prototype._setValue_arrayElement_setNeedsUpdate,Dc.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Dc.prototype._setValue_fromArray,Dc.prototype._setValue_fromArray_setNeedsUpdate,Dc.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Oc=new zr,kc=class{constructor(e,t,n=0,r=1/0){this.ray=new Ua(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Xr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):H(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return Oc.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Oc),this}intersectObject(e,t=!0,n=[]){return jc(e,this,n,t),n.sort(Ac),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)jc(e[r],this,n,t);return n.sort(Ac),n}};function Ac(e,t){return e.distance-t.distance}function jc(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)jc(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function Mc(e,t,n,r){let i=Nc(r);switch(n){case wt:return e*t;case kt:return e*t/i.components*i.byteLength;case At:return e*t/i.components*i.byteLength;case jt:return e*t*2/i.components*i.byteLength;case Mt:return e*t*2/i.components*i.byteLength;case Tt:return e*t*3/i.components*i.byteLength;case Et:return e*t*4/i.components*i.byteLength;case Nt:return e*t*4/i.components*i.byteLength;case Pt:case Ft:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case It:case Lt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case zt:case Vt:return Math.max(e,16)*Math.max(t,8)/4;case Rt:case Bt:return Math.max(e,8)*Math.max(t,8)/2;case Ht:case Ut:case Gt:case Kt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case Wt:case qt:case Jt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Yt:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case Xt:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case Zt:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Qt:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case $t:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case en:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case tn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case nn:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case rn:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case an:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case on:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case sn:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case cn:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case ln:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case un:case dn:case fn:return Math.ceil(e/4)*Math.ceil(t/4)*16;case pn:case mn:return Math.ceil(e/4)*Math.ceil(t/4)*8;case hn:case gn:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function Nc(e){switch(e){case dt:case ft:return{byteLength:1,components:1};case mt:case pt:case vt:return{byteLength:2,components:1};case yt:case bt:return{byteLength:2,components:4};case gt:case ht:case _t:return{byteLength:4,components:1};case St:case Ct:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?V(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function Pc(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function Fc(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var X={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Z={common:{diffuse:{value:new J(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new K}},envmap:{envMap:{value:null},envMapRotation:{value:new K},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new K}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new K}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new K},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new K},normalScale:{value:new W(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new K},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new K}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new K}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new K}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new J(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new G},probesMax:{value:new G},probesResolution:{value:new G}},points:{diffuse:{value:new J(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0},uvTransform:{value:new K}},sprite:{diffuse:{value:new J(16777215)},opacity:{value:1},center:{value:new W(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new K},alphaMap:{value:null},alphaMapTransform:{value:new K},alphaTest:{value:0}}},Ic={basic:{uniforms:hs([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:X.meshbasic_vert,fragmentShader:X.meshbasic_frag},lambert:{uniforms:hs([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},envMapIntensity:{value:1}}]),vertexShader:X.meshlambert_vert,fragmentShader:X.meshlambert_frag},phong:{uniforms:hs([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new J(0)},specular:{value:new J(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:X.meshphong_vert,fragmentShader:X.meshphong_frag},standard:{uniforms:hs([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new J(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag},toon:{uniforms:hs([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new J(0)}}]),vertexShader:X.meshtoon_vert,fragmentShader:X.meshtoon_frag},matcap:{uniforms:hs([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:X.meshmatcap_vert,fragmentShader:X.meshmatcap_frag},points:{uniforms:hs([Z.points,Z.fog]),vertexShader:X.points_vert,fragmentShader:X.points_frag},dashed:{uniforms:hs([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:X.linedashed_vert,fragmentShader:X.linedashed_frag},depth:{uniforms:hs([Z.common,Z.displacementmap]),vertexShader:X.depth_vert,fragmentShader:X.depth_frag},normal:{uniforms:hs([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:X.meshnormal_vert,fragmentShader:X.meshnormal_frag},sprite:{uniforms:hs([Z.sprite,Z.fog]),vertexShader:X.sprite_vert,fragmentShader:X.sprite_frag},background:{uniforms:{uvTransform:{value:new K},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:X.background_vert,fragmentShader:X.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new K}},vertexShader:X.backgroundCube_vert,fragmentShader:X.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:X.cube_vert,fragmentShader:X.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:X.equirect_vert,fragmentShader:X.equirect_frag},distance:{uniforms:hs([Z.common,Z.displacementmap,{referencePosition:{value:new G},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:X.distance_vert,fragmentShader:X.distance_frag},shadow:{uniforms:hs([Z.lights,Z.fog,{color:{value:new J(0)},opacity:{value:1}}]),vertexShader:X.shadow_vert,fragmentShader:X.shadow_frag}};Ic.physical={uniforms:hs([Ic.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new K},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new K},clearcoatNormalScale:{value:new W(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new K},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new K},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new K},sheen:{value:0},sheenColor:{value:new J(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new K},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new K},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new K},transmissionSamplerSize:{value:new W},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new K},attenuationDistance:{value:0},attenuationColor:{value:new J(0)},specularColor:{value:new J(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new K},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new K},anisotropyVector:{value:new W},anisotropyMap:{value:null},anisotropyMapTransform:{value:new K}}]),vertexShader:X.meshphysical_vert,fragmentShader:X.meshphysical_frag};var Lc={r:0,b:0,g:0},Rc=new zr,zc=new K;zc.set(-1,0,0,0,1,0,0,0,1);function Bc(e,t,n,r,i,a){let o=new J(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new Y(new Oo(1,1,1),new Ss({name:`BackgroundCubeMaterial`,uniforms:ms(Ic.backgroundCube.uniforms),vertexShader:Ic.backgroundCube.vertexShader,fragmentShader:Ic.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(Rc.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(zc),l.material.toneMapped=Cr.getTransfer(i.colorSpace)!==On,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new Y(new ls(2,2),new Ss({name:`BackgroundMaterial`,uniforms:ms(Ic.background.uniforms),vertexShader:Ic.background.vertexShader,fragmentShader:Ic.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=Cr.getTransfer(i.colorSpace)!==On,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(Lc,vs(e)),n.buffers.color.setClear(Lc.r,Lc.g,Lc.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Vc(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Hc(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function Uc(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(V(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&V(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Wc(e){let t=this,n=null,r=0,i=!1,a=!1,o=new vo,s=new K,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var Gc=4,Kc=[.125,.215,.35,.446,.526,.582],qc=20,Jc=256,Yc=new lc,Xc=new J,Zc=null,Qc=0,$c=0,el=!1,tl=new G,nl=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=tl}=i;Zc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),el=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=ll(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=cl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Zc,Qc,$c),this._renderer.xr.enabled=el,e.scissorTest=!1,al(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Zc=this._renderer.getRenderTarget(),Qc=this._renderer.getActiveCubeFace(),$c=this._renderer.getActiveMipmapLevel(),el=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ct,minFilter:ct,generateMipmaps:!1,type:vt,format:Et,colorSpace:En,depthBuffer:!1},r=il(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=il(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=rl(r)),this._blurMaterial=sl(r,e,t),this._ggxMaterial=ol(r,e,t)}return r}_compileMaterial(e){let t=new Y(new ma,e);this._renderer.compile(t,Yc)}_sceneToCubeUV(e,t,n,r,i){let a=new cc(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(Xc),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Y(new Oo,new Wa({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(Xc),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;al(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=ll()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=cl());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;al(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Yc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-Gc?n-d+Gc:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,al(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Yc),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,al(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Yc)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&H(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):qc;m>qc&&V(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${qc}`);let h=[],g=0;for(let e=0;e<qc;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];al(t,3*v*(r>_-Gc?r-_+Gc:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Yc)}};function rl(e){let t=[],n=[],r=[],i=e,a=e-Gc+1+Kc.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-Gc?s=Kc[o-e+Gc-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new ma;h.setAttribute(`position`,new $i(f,3)),h.setAttribute(`uv`,new $i(p,2)),h.setAttribute(`faceIndex`,new $i(m,1)),r.push(new Y(h,null)),i>Gc&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function il(e,t,n){let r=new Ir(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function al(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function ol(e,t,n){return new Ss({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:Jc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ul(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function sl(e,t,n){let r=new Float32Array(qc),i=new G(0,1,0);return new Ss({name:`SphericalGaussianBlur`,defines:{n:qc,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ul(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function cl(){return new Ss({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:ul(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function ll(){return new Ss({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ul(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function ul(){return`

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
	`}var dl=class extends Ir{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new Co(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Oo(5,5,5),i=new Ss({name:`CubemapFromEquirect`,uniforms:ms(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new Y(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=ct),new mc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function fl(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new dl(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new nl(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new nl(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function pl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&Bn(`WebGLRenderer: `+e+` extension not supported.`),t}}}function ml(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?ta:ea)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function hl(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function gl(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:H(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function _l(e,t,n){let r=new WeakMap,i=new Pr;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new Lr(h,p,m,u);g.type=_t,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new W(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function vl(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var yl={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function bl(e,t,n,r,i,a){let o=new Ir(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new To(t,n):void 0}),s=new Ir(t,n,{type:vt,depthBuffer:!1,stencilBuffer:!1}),c=new ma;c.setAttribute(`position`,new na([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new na([0,2,0,0,2,0],2));let l=new Cs({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new Y(c,l),d=new lc(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},Cr.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=yl[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var xl=new Nr,Sl=new To(1,1),Cl=new Lr,wl=new Rr,Tl=new Co,El=[],Dl=[],Ol=new Float32Array(16),kl=new Float32Array(9),Al=new Float32Array(4);function jl(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=El[i];if(a===void 0&&(a=new Float32Array(i),El[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function Ml(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function Nl(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function Pl(e,t){let n=Dl[t];n===void 0&&(n=new Int32Array(t),Dl[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function Fl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function Il(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ml(n,t))return;e.uniform2fv(this.addr,t),Nl(n,t)}}function Ll(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(Ml(n,t))return;e.uniform3fv(this.addr,t),Nl(n,t)}}function Rl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ml(n,t))return;e.uniform4fv(this.addr,t),Nl(n,t)}}function zl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ml(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),Nl(n,t)}else{if(Ml(n,r))return;Al.set(r),e.uniformMatrix2fv(this.addr,!1,Al),Nl(n,r)}}function Bl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ml(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),Nl(n,t)}else{if(Ml(n,r))return;kl.set(r),e.uniformMatrix3fv(this.addr,!1,kl),Nl(n,r)}}function Vl(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(Ml(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),Nl(n,t)}else{if(Ml(n,r))return;Ol.set(r),e.uniformMatrix4fv(this.addr,!1,Ol),Nl(n,r)}}function Hl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function Ul(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ml(n,t))return;e.uniform2iv(this.addr,t),Nl(n,t)}}function Wl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ml(n,t))return;e.uniform3iv(this.addr,t),Nl(n,t)}}function Gl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ml(n,t))return;e.uniform4iv(this.addr,t),Nl(n,t)}}function Kl(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function ql(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(Ml(n,t))return;e.uniform2uiv(this.addr,t),Nl(n,t)}}function Jl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(Ml(n,t))return;e.uniform3uiv(this.addr,t),Nl(n,t)}}function Yl(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(Ml(n,t))return;e.uniform4uiv(this.addr,t),Nl(n,t)}}function Xl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(Sl.compareFunction=n.isReversedDepthBuffer()?518:515,a=Sl):a=xl,n.setTexture2D(t||a,i)}function Zl(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||wl,i)}function Ql(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||Tl,i)}function $l(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||Cl,i)}function eu(e){switch(e){case 5126:return Fl;case 35664:return Il;case 35665:return Ll;case 35666:return Rl;case 35674:return zl;case 35675:return Bl;case 35676:return Vl;case 5124:case 35670:return Hl;case 35667:case 35671:return Ul;case 35668:case 35672:return Wl;case 35669:case 35673:return Gl;case 5125:return Kl;case 36294:return ql;case 36295:return Jl;case 36296:return Yl;case 35678:case 36198:case 36298:case 36306:case 35682:return Xl;case 35679:case 36299:case 36307:return Zl;case 35680:case 36300:case 36308:case 36293:return Ql;case 36289:case 36303:case 36311:case 36292:return $l}}function tu(e,t){e.uniform1fv(this.addr,t)}function nu(e,t){let n=jl(t,this.size,2);e.uniform2fv(this.addr,n)}function ru(e,t){let n=jl(t,this.size,3);e.uniform3fv(this.addr,n)}function iu(e,t){let n=jl(t,this.size,4);e.uniform4fv(this.addr,n)}function au(e,t){let n=jl(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function ou(e,t){let n=jl(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function su(e,t){let n=jl(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function cu(e,t){e.uniform1iv(this.addr,t)}function lu(e,t){e.uniform2iv(this.addr,t)}function uu(e,t){e.uniform3iv(this.addr,t)}function du(e,t){e.uniform4iv(this.addr,t)}function fu(e,t){e.uniform1uiv(this.addr,t)}function pu(e,t){e.uniform2uiv(this.addr,t)}function mu(e,t){e.uniform3uiv(this.addr,t)}function hu(e,t){e.uniform4uiv(this.addr,t)}function gu(e,t,n){let r=this.cache,i=t.length,a=Pl(n,i);Ml(r,a)||(e.uniform1iv(this.addr,a),Nl(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?Sl:xl;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function _u(e,t,n){let r=this.cache,i=t.length,a=Pl(n,i);Ml(r,a)||(e.uniform1iv(this.addr,a),Nl(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||wl,a[e])}function vu(e,t,n){let r=this.cache,i=t.length,a=Pl(n,i);Ml(r,a)||(e.uniform1iv(this.addr,a),Nl(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||Tl,a[e])}function yu(e,t,n){let r=this.cache,i=t.length,a=Pl(n,i);Ml(r,a)||(e.uniform1iv(this.addr,a),Nl(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||Cl,a[e])}function bu(e){switch(e){case 5126:return tu;case 35664:return nu;case 35665:return ru;case 35666:return iu;case 35674:return au;case 35675:return ou;case 35676:return su;case 5124:case 35670:return cu;case 35667:case 35671:return lu;case 35668:case 35672:return uu;case 35669:case 35673:return du;case 5125:return fu;case 36294:return pu;case 36295:return mu;case 36296:return hu;case 35678:case 36198:case 36298:case 36306:case 35682:return gu;case 35679:case 36299:case 36307:return _u;case 35680:case 36300:case 36308:case 36293:return vu;case 36289:case 36303:case 36311:case 36292:return yu}}var xu=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=eu(t.type)}},Su=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=bu(t.type)}},Cu=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},wu=/(\w+)(\])?(\[|\.)?/g;function Tu(e,t){e.seq.push(t),e.map[t.id]=t}function Eu(e,t,n){let r=e.name,i=r.length;for(wu.lastIndex=0;;){let a=wu.exec(r),o=wu.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){Tu(n,l===void 0?new xu(s,e,t):new Su(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new Cu(s),Tu(n,e)),n=e}}}var Du=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);Eu(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function Ou(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var ku=37297,Au=0;function ju(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var Mu=new K;function Nu(e){Cr._getMatrix(Mu,Cr.workingColorSpace,e);let t=`mat3( ${Mu.elements.map(e=>e.toFixed(4))} )`;switch(Cr.getTransfer(e)){case Dn:return[t,`LinearTransferOETF`];case On:return[t,`sRGBTransferOETF`];default:return V(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function Pu(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+ju(e.getShaderSource(t),r)}return i}function Fu(e,t){let n=Nu(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var Iu={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function Lu(e,t){let n=Iu[t];return n===void 0?(V(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var Ru=new G;function zu(){return Cr.getLuminanceCoefficients(Ru),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${Ru.x.toFixed(4)}, ${Ru.y.toFixed(4)}, ${Ru.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function Bu(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(Uu).join(`
`)}function Vu(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Hu(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function Uu(e){return e!==``}function Wu(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gu(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Ku=/^[ \t]*#include +<([\w\d./]+)>/gm;function qu(e){return e.replace(Ku,Yu)}var Ju=new Map;function Yu(e,t){let n=X[t];if(n===void 0){let e=Ju.get(t);if(e!==void 0)n=X[e],V(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return qu(n)}var Xu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Zu(e){return e.replace(Xu,Qu)}function Qu(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function $u(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var ed={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function td(e){return ed[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var nd={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function rd(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:nd[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var id={302:`ENVMAP_MODE_REFRACTION`};function ad(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:id[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var od={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function sd(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:od[e.combine]||`ENVMAP_BLENDING_NONE`}function cd(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function ld(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=td(n),l=rd(n),u=ad(n),d=sd(n),f=cd(n),p=Bu(n),m=Vu(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Uu).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(Uu).join(`
`),_.length>0&&(_+=`
`)):(g=[$u(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(Uu).join(`
`),_=[$u(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:X.tonemapping_pars_fragment,n.toneMapping===0?``:Lu(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,X.colorspace_pars_fragment,Fu(`linearToOutputTexel`,n.outputColorSpace),zu(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(Uu).join(`
`)),o=qu(o),o=Wu(o,n),o=Gu(o,n),s=qu(s),s=Wu(s,n),s=Gu(s,n),o=Zu(o),s=Zu(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=Ou(i,i.VERTEX_SHADER,y),S=Ou(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=Pu(i,x,`vertex`),n=Pu(i,S,`fragment`);H(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):V(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new Du(i,h),T=Hu(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,ku)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=Au++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var ud=0,dd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new fd(e),t.set(e,n)),n}},fd=class{constructor(e){this.id=ud++,this.code=e,this.usedTimes=0}};function pd(e){return e===1030||e===37490||e===36285}function md(e,t,n,r,i,a){let o=new Xr,s=new dd,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&V(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=Ic[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,te=h.isBatchedMesh===!0,ne=!!i.map,N=!!i.matcap,re=!!x,P=!!i.aoMap,ie=!!i.lightMap,ae=!!i.bumpMap&&i.wireframe===!1,oe=!!i.normalMap,se=!!i.displacementMap,ce=!!i.emissiveMap,le=!!i.metalnessMap,F=!!i.roughnessMap,ue=i.anisotropy>0,de=i.clearcoat>0,fe=i.dispersion>0,I=i.iridescence>0,pe=i.sheen>0,me=i.transmission>0,he=ue&&!!i.anisotropyMap,ge=de&&!!i.clearcoatMap,_e=de&&!!i.clearcoatNormalMap,ve=de&&!!i.clearcoatRoughnessMap,ye=I&&!!i.iridescenceMap,be=I&&!!i.iridescenceThicknessMap,L=pe&&!!i.sheenColorMap,xe=pe&&!!i.sheenRoughnessMap,Se=!!i.specularMap,Ce=!!i.specularColorMap,R=!!i.specularIntensityMap,we=me&&!!i.transmissionMap,z=me&&!!i.thicknessMap,B=!!i.gradientMap,Te=!!i.alphaMap,Ee=i.alphaTest>0,De=!!i.alphaHash,Oe=!!i.extensions,ke=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(ke=e.toneMapping);let Ae={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:te,batchingColor:te&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:Cr.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:ne,matcap:N,envMap:re,envMapMode:re&&x.mapping,envMapCubeUVHeight:S,aoMap:P,lightMap:ie,bumpMap:ae,normalMap:oe,displacementMap:se,emissiveMap:ce,normalMapObjectSpace:oe&&i.normalMapType===1,normalMapTangentSpace:oe&&i.normalMapType===0,packedNormalMap:oe&&i.normalMapType===0&&pd(i.normalMap.format),metalnessMap:le,roughnessMap:F,anisotropy:ue,anisotropyMap:he,clearcoat:de,clearcoatMap:ge,clearcoatNormalMap:_e,clearcoatRoughnessMap:ve,dispersion:fe,iridescence:I,iridescenceMap:ye,iridescenceThicknessMap:be,sheen:pe,sheenColorMap:L,sheenRoughnessMap:xe,specularMap:Se,specularColorMap:Ce,specularIntensityMap:R,transmission:me,transmissionMap:we,thicknessMap:z,gradientMap:B,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Te,alphaTest:Ee,alphaHash:De,combine:i.combine,mapUv:ne&&m(i.map.channel),aoMapUv:P&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:ae&&m(i.bumpMap.channel),normalMapUv:oe&&m(i.normalMap.channel),displacementMapUv:se&&m(i.displacementMap.channel),emissiveMapUv:ce&&m(i.emissiveMap.channel),metalnessMapUv:le&&m(i.metalnessMap.channel),roughnessMapUv:F&&m(i.roughnessMap.channel),anisotropyMapUv:he&&m(i.anisotropyMap.channel),clearcoatMapUv:ge&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:_e&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ve&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:ye&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:be&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:L&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:xe&&m(i.sheenRoughnessMap.channel),specularMapUv:Se&&m(i.specularMap.channel),specularColorMapUv:Ce&&m(i.specularColorMap.channel),specularIntensityMapUv:R&&m(i.specularIntensityMap.channel),transmissionMapUv:we&&m(i.transmissionMap.channel),thicknessMapUv:z&&m(i.thicknessMap.channel),alphaMapUv:Te&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(oe||ue),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(ne||Te),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&oe===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:ke,decodeVideoTexture:ne&&i.map.isVideoTexture===!0&&Cr.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ce&&i.emissiveMap.isVideoTexture===!0&&Cr.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Oe&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Oe&&i.extensions.multiDraw===!0||te)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Ae.vertexUv1s=c.has(1),Ae.vertexUv2s=c.has(2),Ae.vertexUv3s=c.has(3),c.clear(),Ae}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=Ic[t];n=ys.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new ld(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function hd(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function gd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function _d(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function vd(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||gd),r.length>1&&r.sort(t||_d),i.length>1&&i.sort(t||_d),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function yd(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new vd,e.set(t,[i])):n>=r.length?(i=new vd,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function bd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new G,color:new J};break;case`SpotLight`:n={position:new G,direction:new G,color:new J,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new G,color:new J,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new G,skyColor:new J,groundColor:new J};break;case`RectAreaLight`:n={color:new J,position:new G,halfWidth:new G,halfHeight:new G}}return e[t.id]=n,n}}}function xd(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new W,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var Sd=0;function Cd(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function wd(e){let t=new bd,n=xd(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new G);let i=new G,a=new zr,o=new zr;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(Cd);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=Sd++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function Td(e){let t=new wd(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function Ed(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new Td(e),t.set(n,[a])):r>=i.length?(a=new Td(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var Dd=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Od=`uniform sampler2D shadow_pass;
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
}`,kd=[new G(1,0,0),new G(-1,0,0),new G(0,1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1)],Ad=[new G(0,-1,0),new G(0,-1,0),new G(0,0,1),new G(0,0,-1),new G(0,-1,0),new G(0,-1,0)],jd=new zr,Md=new G,Nd=new G;function Pd(e,t,n){let r=new So,i=new W,a=new W,o=new Pr,s=new Es,c=new Ds,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new Ss({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new W},radius:{value:4}},vertexShader:Dd,fragmentShader:Od}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new ma;m.setAttribute(`position`,new $i(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new Y(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(V(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){V(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){V(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new Ir(i.x,i.y,{format:jt,type:vt,minFilter:ct,magFilter:ct,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new To(i.x,i.y,_t),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=Dt,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=at,d.map.depthTexture.magFilter=at}else l.isPointLight?(d.map=new dl(i.x),d.map.depthTexture=new Eo(i.x,gt)):(d.map=new Ir(i.x,i.y),d.map.depthTexture=new To(i.x,i.y,gt)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=Dt,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=ct,d.map.depthTexture.magFilter=ct):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=at,d.map.depthTexture.magFilter=at);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),Md.setFromMatrixPosition(l.matrixWorld),e.position.copy(Md),Nd.copy(e.position),Nd.add(kd[t]),e.up.copy(Ad[t]),e.lookAt(Nd),e.updateMatrixWorld(),n.makeTranslation(-Md.x,-Md.y,-Md.z),jd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(jd,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new Ir(i.x,i.y,{format:jt,type:vt})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function Fd(e,t){function n(){let t=!1,n=new Pr,r=null,i=new Pr(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?le(e.DEPTH_TEST):F(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=Hn[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?le(e.STENCIL_TEST):F(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,te=0,ne=e.getParameter(e.VERSION);ne.indexOf(`WebGL`)===-1?ne.indexOf(`OpenGL ES`)!==-1&&(te=parseFloat(/^OpenGL ES (\d)/.exec(ne)[1]),M=te>=2):(te=parseFloat(/^WebGL (\d)/.exec(ne)[1]),M=te>=1);let N=null,re={},P=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),ae=new Pr().fromArray(P),oe=new Pr().fromArray(ie);function se(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ce={};ce[e.TEXTURE_2D]=se(e.TEXTURE_2D,e.TEXTURE_2D,1),ce[e.TEXTURE_CUBE_MAP]=se(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[e.TEXTURE_2D_ARRAY]=se(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ce[e.TEXTURE_3D]=se(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),le(e.DEPTH_TEST),o.setFunc(3),ge(!1),_e(1),le(e.CULL_FACE),me(0);function le(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function F(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ue(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function de(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function fe(t){return h!==t&&(e.useProgram(t),h=t,!0)}let I={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};I[103]=e.MIN,I[104]=e.MAX;let pe={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function me(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(F(e.BLEND),g=!1);return}if(g===!1&&(le(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:H(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:H(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:H(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:H(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(I[n],I[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(pe[r],pe[i],pe[o],pe[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function he(t,n){t.side===2?F(e.CULL_FACE):le(e.CULL_FACE);let r=t.side===1;n&&(r=!r),ge(r),t.blending===1&&t.transparent===!1?me(0):me(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),ye(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?le(e.SAMPLE_ALPHA_TO_COVERAGE):F(e.SAMPLE_ALPHA_TO_COVERAGE)}function ge(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function _e(t){t===0?F(e.CULL_FACE):(le(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ve(t){t!==k&&(M&&e.lineWidth(t),k=t)}function ye(t,n,r){t?(le(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):F(e.POLYGON_OFFSET_FILL)}function be(t){t?le(e.SCISSOR_TEST):F(e.SCISSOR_TEST)}function L(t){t===void 0&&(t=e.TEXTURE0+ee-1),N!==t&&(e.activeTexture(t),N=t)}function xe(t,n,r){r===void 0&&(r=N===null?e.TEXTURE0+ee-1:N);let i=re[r];i===void 0&&(i={type:void 0,texture:void 0},re[r]=i),(i.type!==t||i.texture!==n)&&(N!==r&&(e.activeTexture(r),N=r),e.bindTexture(t,n||ce[t]),i.type=t,i.texture=n)}function Se(){let t=re[N];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function Ce(){try{e.compressedTexImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function R(){try{e.compressedTexImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function we(){try{e.texSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function z(){try{e.texSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function B(){try{e.compressedTexSubImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Te(){try{e.compressedTexSubImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ee(){try{e.texStorage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function De(){try{e.texStorage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Oe(){try{e.texImage2D(...arguments)}catch(e){H(`WebGLState:`,e)}}function ke(){try{e.texImage3D(...arguments)}catch(e){H(`WebGLState:`,e)}}function Ae(t){return d[t]===void 0?e.getParameter(t):d[t]}function je(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Me(t){ae.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),ae.copy(t))}function Ne(t){oe.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),oe.copy(t))}function Pe(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Fe(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Ie(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},N=null,re={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new J(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ae.set(0,0,e.canvas.width,e.canvas.height),oe.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:le,disable:F,bindFramebuffer:ue,drawBuffers:de,useProgram:fe,setBlending:me,setMaterial:he,setFlipSided:ge,setCullFace:_e,setLineWidth:ve,setPolygonOffset:ye,setScissorTest:be,activeTexture:L,bindTexture:xe,unbindTexture:Se,compressedTexImage2D:Ce,compressedTexImage3D:R,texImage2D:Oe,texImage3D:ke,pixelStorei:je,getParameter:Ae,updateUBOMapping:Pe,uniformBlockBinding:Fe,texStorage2D:Ee,texStorage3D:De,texSubImage2D:we,texSubImage3D:z,compressedTexSubImage2D:B,compressedTexSubImage3D:Te,scissor:Me,viewport:Ne,reset:Ie}}function Id(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new W,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):Fn(`canvas`)}function g(e,t,n){let r=1,i=Ce(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),V(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&V(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];V(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||V(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?Dn:Cr.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,V(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&V(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function te(t,i){let a=r.get(t);if(t.isVideoTexture&&xe(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)V(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)V(`WebGLRenderer: Texture marked for update but image is incomplete`);else{F(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){F(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function N(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){F(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function re(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ue(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let P={[nt]:e.REPEAT,[rt]:e.CLAMP_TO_EDGE,[it]:e.MIRRORED_REPEAT},ie={[at]:e.NEAREST,[ot]:e.NEAREST_MIPMAP_NEAREST,[st]:e.NEAREST_MIPMAP_LINEAR,[ct]:e.LINEAR,[lt]:e.LINEAR_MIPMAP_NEAREST,[ut]:e.LINEAR_MIPMAP_LINEAR},ae={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function oe(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&V(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,P[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,P[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,P[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,ae[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function se(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ce(e,t,n){return Math.floor(Math.floor(e/n)/t)}function le(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ce(n.start,r.width,4),c=ce(t.start,r.width,4);n.start<=i+1&&a===c&&ce(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function F(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=se(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=Cr.getPrimaries(Cr.workingColorSpace),r=o.colorSpace===``?null:Cr.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=Se(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);oe(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===Ot,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&le(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=Mc(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=Mc(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=Ce(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=Ce(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ue(t,o,s){if(o.image.length!==6)return;let c=se(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=Cr.getPrimaries(Cr.workingColorSpace),r=o.colorSpace===``?null:Cr.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=Se(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);oe(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?V(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=Ce(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function de(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),L(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,be(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function fe(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;L(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,be(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,be(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);L(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,be(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,be(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function I(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),oe(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else te(i.depthTexture,0);let u=l.__webglTexture,d=be(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)L(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)L(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function pe(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)I(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?I(i.__webglFramebuffer[0],t,0):I(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),fe(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),fe(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function me(t,n,i){let a=r.get(t);n!==void 0&&de(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&pe(t)}function he(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&L(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=be(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),fe(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),oe(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)de(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else de(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),oe(c,a),de(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),oe(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)de(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else de(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&pe(t)}function ge(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let _e=[],ve=[];function ye(t){if(t.samples>0){if(L(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(_e.length=0,ve.length=0,_e.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(_e.push(l),ve.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ve)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,_e))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function be(e){return Math.min(i.maxSamples,e.samples)}function L(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function xe(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function Se(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(Cr.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&V(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):H(`WebGLTextures: Unsupported texture color space:`,n)),t}function Ce(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=te,this.setTexture2DArray=ne,this.setTexture3D=N,this.setTextureCube=re,this.rebindTextures=me,this.setupRenderTarget=he,this.updateRenderTargetMipmap=ge,this.updateMultisampleRenderTarget=ye,this.setupDepthRenderbuffer=pe,this.setupFrameBufferTexture=de,this.useMultisampledRTT=L,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function Ld(e,t){function n(n,r=``){let i,a=Cr.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var Rd=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zd=`
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

}`,Bd=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new Do(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new Ss({vertexShader:Rd,fragmentShader:zd,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new ls(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Vd=class extends Un{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Bd,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new W,C=null,w=new cc;w.viewport=new Pr;let T=new cc;T.viewport=new Pr;let E=[w,T],D=new hc,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new mi,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new mi,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new mi,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function j(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,j),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,ae.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&V(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,j),r.addEventListener(`inputsourceschange`,ee),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?Ot:Dt,a=_.stencil?xt:gt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new Ir(d.textureWidth,d.textureHeight,{format:Et,type:dt,depthTexture:new To(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Ir(f.framebufferWidth,f.framebufferHeight,{format:Et,type:dt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),ae.setContext(r),ae.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let M=new G,te=new G;function ne(e,t,n){M.setFromMatrixPosition(t.matrixWorld),te.setFromMatrixPosition(n.matrixWorld);let r=M.distanceTo(te),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function N(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;N(D,i);for(let e=0;e<a.length;e++)N(a[e],i);a.length===2?ne(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),re(e,D,i)};function re(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=qn*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let P=null;function ie(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new cc,o.layers.enable(n),o.viewport=new Pr,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new Do,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}P&&P(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let ae=new Pc;ae.setAnimationLoop(ie),this.setAnimationLoop=function(e){P=e},this.dispose=function(){}}},Hd=new zr,Ud=new K;Ud.set(-1,0,0,0,1,0,0,0,1);function Wd(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,vs(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(Hd.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Ud),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Gd(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return H(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?V(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):V(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Kd=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),qd=null;function Jd(){return qd===null&&(qd=new io(Kd,16,16,jt,vt),qd.name=`DFG_LUT`,qd.minFilter=ct,qd.magFilter=ct,qd.wrapS=rt,qd.wrapT=rt,qd.generateMipmaps=!1,qd.needsUpdate=!0),qd}var Yd=class{constructor(e={}){let{canvas:t=In(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=dt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([Nt,Mt,At]),g=new Set([dt,gt,mt,xt,yt,bt]),_=new Uint32Array(4),v=new Int32Array(4),y=new G,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=Tn;let j=0,ee=0,M=null,te=-1,ne=null,N=new Pr,re=new Pr,P=null,ie=new J(0),ae=0,oe=t.width,se=t.height,ce=1,le=null,F=null,ue=new Pr(0,0,oe,se),de=new Pr(0,0,oe,se),fe=!1,I=new So,pe=!1,me=!1,he=new zr,ge=new G,_e=new Pr,ve={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ye=!1;function be(){return M===null?ce:1}let L=n;function xe(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,We,!1),t.addEventListener(`webglcontextrestored`,Ge,!1),t.addEventListener(`webglcontextcreationerror`,Ke,!1),L===null){let t=`webgl2`;if(L=xe(t,e),L===null)throw xe(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw H(`WebGLRenderer: `+e.message),e}let Se,Ce,R,we,z,B,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze,Be,Ve;function He(){Se=new pl(L),Se.init(),ze=new Ld(L,Se),Ce=new Uc(L,Se,e,ze),R=new Fd(L,Se),Ce.reversedDepthBuffer&&d&&R.buffers.depth.setReversed(!0),O=L.createFramebuffer(),k=L.createFramebuffer(),A=L.createFramebuffer(),we=new gl(L),z=new hd,B=new Id(L,Se,R,z,Ce,ze,we),Te=new fl(T),Ee=new Fc(L),Be=new Vc(L,Ee),De=new ml(L,Ee,we,Be),Oe=new vl(L,De,Ee,Be,we),Ie=new _l(L,Ce,B),Ne=new Wc(z),ke=new md(T,Te,Se,Ce,Be,Ne),Ae=new Wd(T,z),je=new yd,Me=new Ed(Se),Fe=new Bc(T,Te,R,Oe,p,s),Pe=new Pd(T,Oe,Ce),Ve=new Gd(L,we,Ce,R),Le=new Hc(L,Se,we),Re=new hl(L,Se,we),we.programs=ke.programs,T.capabilities=Ce,T.extensions=Se,T.properties=z,T.renderLists=je,T.shadowMap=Pe,T.state=R,T.info=we}He(),m!==1009&&(w=new bl(m,t.width,t.height,o,r,i));let Ue=new Vd(T,L);this.xr=Ue,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=Se.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(e){e!==void 0&&(ce=e,this.setSize(oe,se,!1))},this.getSize=function(e){return e.set(oe,se)},this.setSize=function(e,n,r=!0){if(Ue.isPresenting){V(`WebGLRenderer: Can't change size while VR device is presenting.`);return}oe=e,se=n,t.width=Math.floor(e*ce),t.height=Math.floor(n*ce),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(oe*ce,se*ce).floor()},this.setDrawingBufferSize=function(e,n,r){oe=e,se=n,ce=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){H(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){V(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(N)},this.getViewport=function(e){return e.copy(ue)},this.setViewport=function(e,t,n,r){e.isVector4?ue.set(e.x,e.y,e.z,e.w):ue.set(e,t,n,r),R.viewport(N.copy(ue).multiplyScalar(ce).round())},this.getScissor=function(e){return e.copy(de)},this.setScissor=function(e,t,n,r){e.isVector4?de.set(e.x,e.y,e.z,e.w):de.set(e,t,n,r),R.scissor(re.copy(de).multiplyScalar(ce).round())},this.getScissorTest=function(){return fe},this.setScissorTest=function(e){R.setScissorTest(fe=e)},this.setOpaqueSort=function(e){le=e},this.setTransparentSort=function(e){F=e},this.getClearColor=function(e){return e.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Fe.getClearColor(),r=Fe.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,L.clearBufferuiv(L.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,L.clearBufferiv(L.COLOR,0,v))}else r|=L.COLOR_BUFFER_BIT}t&&(r|=L.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&L.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,We,!1),t.removeEventListener(`webglcontextrestored`,Ge,!1),t.removeEventListener(`webglcontextcreationerror`,Ke,!1),Fe.dispose(),je.dispose(),Me.dispose(),z.dispose(),Te.dispose(),Oe.dispose(),Be.dispose(),Ve.dispose(),ke.dispose(),Ue.dispose(),Ue.removeEventListener(`sessionstart`,$e),Ue.removeEventListener(`sessionend`,et),tt.stop()};function We(e){e.preventDefault(),Rn(`WebGLRenderer: Context Lost.`),E=!0}function Ge(){Rn(`WebGLRenderer: Context Restored.`),E=!1;let e=we.autoReset,t=Pe.enabled,n=Pe.autoUpdate,r=Pe.needsUpdate,i=Pe.type;He(),we.autoReset=e,Pe.enabled=t,Pe.autoUpdate=n,Pe.needsUpdate=r,Pe.type=i}function Ke(e){H(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function qe(e){let t=e.target;t.removeEventListener(`dispose`,qe),Je(t)}function Je(e){Ye(e),z.remove(e)}function Ye(e){let t=z.get(e).programs;t!==void 0&&(t.forEach(function(e){ke.releaseProgram(e)}),e.isShaderMaterial&&ke.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ve);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=pt(e,t,n,r,i);R.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=De.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Be.setup(i,r,s,n,c);let h,g=Le;if(c!==null&&(h=Ee.get(c),g=Re,g.setIndex(h)),i.isMesh)r.wireframe===!0?(R.setLineWidth(r.wireframeLinewidth*be()),g.setMode(L.LINES)):g.setMode(L.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),R.setLineWidth(e*be()),i.isLineSegments?g.setMode(L.LINES):i.isLineLoop?g.setMode(L.LINE_LOOP):g.setMode(L.LINE_STRIP)}else i.isPoints?g.setMode(L.POINTS):i.isSprite&&g.setMode(L.TRIANGLES);if(i.isBatchedMesh){if(Se.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?Ee.get(c).bytesPerElement:1,o=z.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(L,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Xe(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,st(e,t,n),e.side=0,e.needsUpdate=!0,st(e,t,n),e.side=2):st(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Me.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Xe(a,n,e),r.add(a)}else Xe(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){z.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}Se.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ze=null;function Qe(e){Ze&&Ze(e)}function $e(){tt.stop()}function et(){tt.start()}let tt=new Pc;tt.setAnimationLoop(Qe),typeof self<`u`&&tt.setContext(self),this.setAnimationLoop=function(e){Ze=e,Ue.setAnimationLoop(e),e===null?tt.stop():tt.start()},Ue.addEventListener(`sessionstart`,$e),Ue.addEventListener(`sessionend`,et),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){H(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ue.enabled===!0&&Ue.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ue.enabled===!0&&Ue.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ue.cameraAutoUpdate===!0&&Ue.updateCamera(t),t=Ue.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Me.get(e,C.length),x.init(t),x.state.textureUnits=B.getTextureUnits(),C.push(x),he.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),I.setFromProjectionMatrix(he,Mn,t.reversedDepth),me=this.localClippingEnabled,pe=Ne.init(this.clippingPlanes,me),b=je.get(e,S.length),b.init(),S.push(b),Ue.enabled===!0&&Ue.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&nt(e,t,-1/0,T.sortObjects)}nt(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(le,F,t.reversedDepth),ye=Ue.enabled===!1||Ue.isPresenting===!1||Ue.hasDepthSensing()===!1,ye&&Fe.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),pe===!0&&Ne.beginShadows();let i=x.state.shadowsArray;if(Pe.render(i,e,t),pe===!0&&Ne.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];it(n,r,e,a)}ye&&Fe.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];rt(b,e,n,n.viewport)}}else r.length>0&&it(n,r,e,t),ye&&Fe.render(e),rt(b,e,t)}M!==null&&ee===0&&(B.updateMultisampleRenderTarget(M),B.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Be.resetDefaultState(),te=-1,ne=null,C.pop(),C.length>0?(x=C[C.length-1],B.setTextureUnits(x.state.textureUnits),pe===!0&&Ne.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function nt(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||I.intersectsSprite(e)){r&&_e.setFromMatrixPosition(e.matrixWorld).applyMatrix4(he);let t=Oe.update(e),i=e.material;i.visible&&b.push(e,t,i,n,_e.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||I.intersectsObject(e))){let t=Oe.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),_e.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),_e.copy(e.boundingSphere.center)),_e.applyMatrix4(e.matrixWorld).applyMatrix4(he)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,_e.z,o)}}else i.visible&&b.push(e,t,i,n,_e.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)nt(i[e],t,n,r)}function rt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),pe===!0&&Ne.setGlobalState(T.clippingPlanes,n),r&&R.viewport(N.copy(r)),i.length>0&&at(i,t,n),a.length>0&&at(a,t,n),o.length>0&&at(o,t,n),R.buffers.depth.setTest(!0),R.buffers.depth.setMask(!0),R.buffers.color.setMask(!0),R.setPolygonOffset(!1)}function it(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=Se.has(`EXT_color_buffer_half_float`)||Se.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new Ir(1,1,{generateMipmaps:!0,type:e?vt:dt,minFilter:ut,samples:Math.max(4,Ce.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Cr.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||N;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),ae=T.getClearAlpha(),ae<1&&T.setClearColor(16777215,.5),T.clear(),ye&&Fe.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),pe===!0&&Ne.setGlobalState(T.clippingPlanes,r),at(e,n,r),B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a),Se.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,ot(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(B.updateMultisampleRenderTarget(a),B.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,ae),d!==void 0&&(r.viewport=d),T.toneMapping=u}function at(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&ot(o,t,n,s,l,c)}}function ot(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function st(e,t,n){t.isScene!==!0&&(t=ve);let r=z.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=ke.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=ke.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Te.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,qe),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return lt(e,s),d}else s.uniforms=ke.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=ke.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=Ne.uniform),lt(e,s),r.needsLights=_t(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function ct(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=Du.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function lt(e,t){let n=z.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ft(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function pt(e,t,n,r,i){t.isScene!==!0&&(t=ve),B.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:Cr.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Te.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=z.get(r),y=x.state.lights;if(pe===!0&&(me===!0||e!==ne)){let t=e===ne&&r.id===te;Ne.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==Ne.numPlanes||v.numIntersection!==Ne.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=st(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(R.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==te&&(te=r.id,w=!0),v.needsLights){let e=ft(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||ne!==e){R.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(L,`projectionMatrix`,e.projectionMatrix),O.setValue(L,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(L,ge.setFromMatrixPosition(e.matrixWorld)),Ce.logarithmicDepthBuffer&&O.setValue(L,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(L,`isOrthographic`,e.isOrthographicCamera===!0),ne!==e&&(ne=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(L,`directionalShadowMap`,y.state.directionalShadowMap,B),y.state.spotShadowMap.length>0&&O.setValue(L,`spotShadowMap`,y.state.spotShadowMap,B),y.state.pointShadowMap.length>0&&O.setValue(L,`pointShadowMap`,y.state.pointShadowMap,B)),i.isSkinnedMesh){O.setOptional(L,i,`bindMatrix`),O.setOptional(L,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(L,`boneTexture`,e.boneTexture,B))}i.isBatchedMesh&&(O.setOptional(L,i,`batchingTexture`),O.setValue(L,`batchingTexture`,i._matricesTexture,B),O.setOptional(L,i,`batchingIdTexture`),O.setValue(L,`batchingIdTexture`,i._indirectTexture,B),O.setOptional(L,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(L,`batchingColorTexture`,i._colorsTexture,B));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Ie.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(L,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Jd()),w){if(O.setValue(L,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&ht(k,E),a&&r.fog===!0&&Ae.refreshFogUniforms(k,a),Ae.refreshMaterialUniforms(k,r,ce,se,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}Du.upload(L,ct(v),k,B)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(Du.upload(L,ct(v),k,B),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(L,`center`,i.center),O.setValue(L,`modelViewMatrix`,i.modelViewMatrix),O.setValue(L,`normalMatrix`,i.normalMatrix),O.setValue(L,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];Ve.update(n,S),Ve.bind(n,S)}}return S}function ht(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function _t(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=z.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),z.get(e.texture).__webglTexture=t,z.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=z.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=z.get(e);if(o.__useDefaultFramebuffer!==void 0){R.bindFramebuffer(L.FRAMEBUFFER,o.__webglFramebuffer),N.copy(e.viewport),re.copy(e.scissor),P=e.scissorTest,R.viewport(N),R.scissor(re),R.setScissorTest(P),te=-1;return}if(o.__webglFramebuffer===void 0)B.setupRenderTarget(e);else if(o.__hasExternalTextures)B.rebindTextures(e,z.get(e.texture).__webglTexture,z.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&z.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);B.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=z.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&B.useMultisampledRTT(e)===!1?z.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,N.copy(e.viewport),re.copy(e.scissor),P=e.scissorTest}else N.copy(ue).multiplyScalar(ce).floor(),re.copy(de).multiplyScalar(ce).floor(),P=fe;if(n!==0&&(r=O),R.bindFramebuffer(L.FRAMEBUFFER,r)&&R.drawBuffers(e,r),R.viewport(N),R.scissor(re),R.setScissorTest(P),i){let r=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=z.get(e.textures[t]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=z.get(e.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,t.__webglTexture,n)}te=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){R.bindFramebuffer(L.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s),!Ce.textureFormatReadable(c)){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!Ce.textureTypeReadable(l)){H(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&L.readPixels(t,n,r,i,ze.convert(c),ze.convert(l),a)}finally{let e=M===null?null:z.get(M).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=z.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){R.bindFramebuffer(L.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+s),!Ce.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!Ce.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,d),L.bufferData(L.PIXEL_PACK_BUFFER,a.byteLength,L.STREAM_READ),L.readPixels(t,n,r,i,ze.convert(l),ze.convert(u),0);let f=M===null?null:z.get(M).__webglFramebuffer;R.bindFramebuffer(L.FRAMEBUFFER,f);let p=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await Vn(L,p,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,d),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,a),L.deleteBuffer(d),L.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;B.setTexture2D(e,0),L.copyTexSubImage2D(L.TEXTURE_2D,n,0,0,o,s,i,a),R.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=ze.convert(t.format),_=ze.convert(t.type),v;t.isData3DTexture?(B.setTexture3D(t,0),v=L.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(B.setTexture2DArray(t,0),v=L.TEXTURE_2D_ARRAY):(B.setTexture2D(t,0),v=L.TEXTURE_2D),R.activeTexture(L.TEXTURE0),R.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,t.flipY),R.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),R.pixelStorei(L.UNPACK_ALIGNMENT,t.unpackAlignment);let y=R.getParameter(L.UNPACK_ROW_LENGTH),b=R.getParameter(L.UNPACK_IMAGE_HEIGHT),x=R.getParameter(L.UNPACK_SKIP_PIXELS),S=R.getParameter(L.UNPACK_SKIP_ROWS),C=R.getParameter(L.UNPACK_SKIP_IMAGES);R.pixelStorei(L.UNPACK_ROW_LENGTH,h.width),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,h.height),R.pixelStorei(L.UNPACK_SKIP_PIXELS,l),R.pixelStorei(L.UNPACK_SKIP_ROWS,u),R.pixelStorei(L.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=z.get(e),r=z.get(t),h=z.get(n.__renderTarget),g=z.get(r.__renderTarget);R.bindFramebuffer(L.READ_FRAMEBUFFER,h.__webglFramebuffer),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(e).__webglTexture,i,d+n),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,z.get(t).__webglTexture,a,m+n)),L.blitFramebuffer(l,u,o,s,f,p,o,s,L.DEPTH_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||z.has(e)){let n=z.get(e),r=z.get(t);R.bindFramebuffer(L.READ_FRAMEBUFFER,k),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,n.__webglTexture,i),T?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,r.__webglTexture,a),i===0?T?L.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):L.copyTexSubImage2D(v,a,f,p,l,u,o,s):L.blitFramebuffer(l,u,o,s,f,p,o,s,L.COLOR_BUFFER_BIT,L.NEAREST);R.bindFramebuffer(L.READ_FRAMEBUFFER,null),R.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?L.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):L.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):L.texSubImage2D(L.TEXTURE_2D,a,f,p,o,s,g,_,h);R.pixelStorei(L.UNPACK_ROW_LENGTH,y),R.pixelStorei(L.UNPACK_IMAGE_HEIGHT,b),R.pixelStorei(L.UNPACK_SKIP_PIXELS,x),R.pixelStorei(L.UNPACK_SKIP_ROWS,S),R.pixelStorei(L.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&L.generateMipmap(v),R.unbindTexture()},this.initRenderTarget=function(e){z.get(e).__webglFramebuffer===void 0&&B.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?B.setTextureCube(e,0):e.isData3DTexture?B.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?B.setTexture2DArray(e,0):B.setTexture2D(e,0),R.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,R.reset(),Be.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return Mn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=Cr._getDrawingBufferColorSpace(e),t.unpackColorSpace=Cr._getUnpackColorSpace()}};function Xd(e){let t=new Ts({color:`#759b84`}),n=new Ts({color:`#ead6a0`}),r=new Ts({color:`#6b8d8b`}),i=new Ts({color:`#e8ba50`}),a=new Oo(1,1,1);function o(e,t,n,r,i,o,s,c){let l=new Y(a,c);return l.position.set(t,n,r),l.scale.set(i,o,s),e.add(l),l}let s=[1,2].map(a=>{let s=new q;e.add(s),o(s,7.35,.38,-1.1,.6,.65,.55,t),o(s,7.35,.83,-1.1,.8,.35,.75,n),o(s,7.35,1.01,-1.1,.55,.025,.5,i),o(s,3.9,1.03,-1.1,7,.06,.08,r);for(let e of[.4,7.4])o(s,e,.52,-1.1,.06,1,.06,r);let c=new q;return s.add(c),o(c,0,.96,-1.1,.22,.2,.3,t),o(c,0,.71,-.87,.1,.36,.12,n),{slot:a,root:s,head:c,grains:Array.from({length:6},()=>{let e=new Y(new ds(.035,5,4),i);return s.add(e),e})}});return{update(e,t,n,r){for(let i of s){let a=e.plantingLines[i.slot-1],o=e.plots[a.active]??e.plots[a.plots(e)[0]];if(i.root.visible=!t&&a.owned(e)&&!!o,!i.root.visible)continue;i.root.position.z=o.z;let s=e.plots[a.active]??o;i.head.position.x=hr.damp(i.head.position.x,s.x,7,n),i.grains.forEach((e,t)=>{e.visible=!a.paused&&a.active>=0,e.position.set(s.x+Math.sin(t*7)*.12,.12+(1-(r*2+t/6)%1)*.5,-.85+Math.cos(t*3)*.1)})}}}}function Zd(e){let t=y.map(t=>{let n=new q;n.position.set(t.x,0,t.z),e.add(n);let r=(e,t,n,r,i,a,o,s)=>{let c=new Y(new Oo(i,a,o),new Ts({color:s}));return c.position.set(t,n,r),e.add(c),c},i=new Y(new ko(1.8,16),new Wa({color:`#b5a778`,transparent:!0,opacity:.48,depthWrite:!1}));i.scale.y=.78,i.rotation.x=-Math.PI/2,i.position.set(0,.009,-.8),n.add(i);let a=new q;n.add(a);for(let e=0;e<9;e++){let t=r(a,-1.2+e%3,.06+e%2*.05,-.5-Math.floor(e/3)*.45,.8,.1,.13,e%2?`#837a50`:`#a59868`);t.rotation.y=e*.83}let o=new q;n.add(o),r(o,-1.3,.4,.3,.055,.8,.055,`#997349`),r(o,-1.3,.8,.3,.6,.36,.05,`#f5e1a3`);let s=Array.from({length:3},(e,i)=>{let a=new q;if(n.add(a),i===0)for(let e=0;e<3;e++)r(a,-.8+e*.65,.21,-1.8,.48,.42,.45,`#bd955e`),r(a,-.8+e*.65,.43,-1.8,.4,.025,.37,`#7c6543`);if(i===1)for(let e of[-1.15,1.15]){r(a,e,.2,-.8,.45,.4,.65,`#bd935d`);for(let t=0;t<3;t++){let n=new Y(new ss(.17,0),new Ts({color:[`#8caa60`,`#a9bd67`,`#e9bf63`][t]}));n.position.set(e,.53+t*.04,-1+t*.2),a.add(n)}}if(i===2&&t.id===`depot`&&(r(a,b.x-t.x,.3,b.z-t.z,1,.6,.7,`#b88a4c`),r(a,b.x-t.x,.62,b.z-t.z,.8,.03,.5,`#e4c790`)),i===2){for(let e of[-1.3,1.3])r(a,e,.72,-2,.04,1.44,.04,`#d5b880`);r(a,0,1.4,-2,2.6,.025,.025,`#f3dfb6`);for(let e=0;e<7;e++){let t=new Y(new jo(.13,.25,3),new Ts({color:[`#e69c65`,`#ead879`,`#83b897`][e%3]}));t.rotation.z=Math.PI,t.position.set(-1.1+e*.36,1.26,-2),a.add(t)}}return a});return{id:t.id,rubble:a,stages:s,ground:i}});return{update(e,n){for(let r of t){let t=e.enterprises.states[r.id];r.rubble.visible=!n&&!t.cleared,r.ground.material.color.set(n||t.cleared?`#d6c295`:`#a49b6f`),r.stages.forEach((e,r)=>e.visible=n||t.level>r)}}}}function Qd(e,t=0){let n=new q;e.add(n);let r=new Ts({color:`#799696`}),i=new Ts({color:`#465959`}),a=new Ts({color:`#e2b95f`}),o=new Ts({color:`#e9d8a9`}),s=new Wa({color:`#80d3d2`}),c=new Oo(1,1,1);function l(e,t,n,r,i,a,o,s){let l=new Y(c,s);return l.position.set(t,n,r),l.scale.set(i,a,o),e.add(l),l}let u=new q;n.add(u),l(u,0,.32,0,.68,.55,.52,r),l(u,0,.76,0,.74,.43,.56,o),l(u,0,.79,.285,.48,.18,.025,s);for(let e of[-.18,.18])l(u,e,.81,.305,.055,.055,.015,i);l(u,0,1.08,0,.06,.25,.06,a);let d=new q;n.add(d);let f=new q;n.add(f),l(f,0,.85,0,.3,.22,.34,r),l(f,0,.55,0,.055,.5,.055,a);for(let e of[-.14,.14])l(f,e,.3,0,.05,.2,.15,o);let p=new q;n.add(p);let m=``,h=Array.from({length:12},()=>{let e=new q;l(e,0,.27,0,.23,.23,.23,o);let t=l(e,0,.395,0,.25,.025,.25,new Ts({color:`#e7b53f`}));return n.add(e),{g:e,lid:t}});function g(e,t){let n=Math.hypot(e.x-t.x,e.z-t.z);if(n<.001)return;let o=new q;o.position.set((e.x+t.x)/2,0,(e.z+t.z)/2),o.rotation.y=Math.atan2(t.x-e.x,t.z-e.z),p.add(o),l(o,0,.11,0,.38,.15,n,i);for(let e of[-.23,.23])l(o,e,.16,0,.05,.12,n,a);for(let e=-n/2+.12;e<n/2;e+=.35)l(o,0,.193,e,.35,.025,.035,r)}return{update(e,i,o,c){let _=e.machineLines[t].owned(e);if(n.visible=!i&&(_||t===0&&e.harvesters.length>0),u.visible=_,!n.visible)return;let v=e.machineLines[t],y=e.plots[v.plots(e)[0]],b=F[t].station;u.position.set(b.x,0,b.z),s.color.set(v.paused?`#89928c`:v.active>=0?`#8be5d0`:`#88babb`);let x=t===0?e.harvesters.flatMap(t=>[...t.plots(e).map(t=>({z:e.plots[t].z,destination:z(e.plots[t],e)})),...t.loads.map(t=>({z:e.plots[t.plot].z,destination:t.destination}))]):[],S=[...new Set(x.map(e=>e.z))].sort((e,t)=>e-t),C=[...new Set(x.map(e=>e.destination))].sort(),w=S.join(`,`)+`/`+C.join(`,`);if(w!==m){m=w,p.clear();for(let e of S)g({x:6.1,z:e+1.4},{x:-2,z:e+1.4});if(S.length){let e=[...S.map(e=>e+1.4),...C.map(e=>ye(e).z)];g({x:-2,z:Math.min(...e)},{x:-2,z:Math.max(...e)});for(let e of C){let t=ye(e);g({x:-2,z:t.z},t)}}}if(d.visible=f.visible=!!y,y){d.position.set(2.05,.95,y.z+1.4),d.children.length||(l(d,0,0,0,8.1,.08,.1,a),l(d,4.05,-.45,0,.09,.9,.09,r));let t=e.plots[v.active]??y;f.position.x=hr.damp(f.position.x,t.x,4,o),f.position.z=hr.damp(f.position.z,t.z+1.4,4,o),d.position.z=f.position.z,f.position.y=v.active>=0?-Math.sin(v.progress*Math.PI)*.2:0}h.forEach(({g:t,lid:n},r)=>{let i=v.loads[r];if(t.visible=!!i,!i)return;let a=Te(we(e.plots[i.plot],i.destination),i.travelled);t.position.set(a.x,Math.sin(c*4+r)*.005,a.z),n.material.color.set([`#c9bc9a`,`#a1ba7e`,`#79beb5`,`#82a8d3`,`#b08ada`,`#edc552`][i.grade])})}}}function $d(e){let t=new q;e.add(t);function n(e,t,n,r,i,a,o,s){let c=new Y(new Oo(i,a,o),new Ts({color:s}));return c.position.set(t,n,r),e.add(c),c}let r=new q;r.position.set(M.x,0,M.z-.4),t.add(r),n(r,0,.85,0,1.1,.1,.12,`#b19059`);for(let e of[-.48,.48])n(r,e,.48,0,.1,.95,.12,`#887344`);for(let[e,t]of[[-.3,`#d4b369`],[.12,`#a6afb0`]])n(r,e,.53,.12,.055,.9,.055,`#d6bc84`),n(r,e,.14,.12,.28,.22,.13,t);for(let e=0;e<5;e++)n(r,.01+e*.055,.09,.12,.026,.16,.03,`#79898b`);let i=new Y(new Ao(.16,.13,.24,12),new Ts({color:`#75a3a2`}));i.position.set(.65,.12,.08),r.add(i);let a=new q;a.position.set(te.x,0,te.z-.4),t.add(a),n(a,0,.6,0,1.25,.16,.65,`#b38b50`);for(let e of[-.5,.5])for(let t of[-.23,.23])n(a,e,.27,t,.1,.54,.1,`#89764f`);n(a,.1,.79,0,.45,.25,.32,`#778e84`),n(a,-.37,.71,.09,.3,.06,.13,`#d7c27d`);let o=new q;o.position.set(T.x,0,T.z-.55),t.add(o),n(o,0,.65,0,1.5,.15,.7,`#b99159`);for(let e of[-.6,.6])for(let t of[-.25,.25])n(o,e,.29,t,.12,.58,.12,`#806c47`);for(let e of[-.45,0,.45]){let t=new Y(new Ao(.16,.11,.23,12),new Ts({color:`#d69661`}));t.position.set(e,.85,0),o.add(t),n(o,e,1.03,0,.035,.23,.035,`#619348`);let r=new Y(new ds(.11,8,6),new Ts({color:`#a4c85b`}));r.scale.set(1,.35,.6),r.position.set(e+.05,1.1,0),o.add(r)}let s=N.map(e=>{let n=He.find(t=>t.id===e.id),r=document.createElement(`canvas`);r.width=256,r.height=256;let i=r.getContext(`2d`);i.fillStyle=`#e4be62`,i.beginPath(),i.roundRect(8,8,240,240,42),i.fill(),i.strokeStyle=`#fff0b7`,i.lineWidth=8,i.stroke(),i.strokeStyle=`#9d7130`,i.lineWidth=9,i.beginPath(),i.arc(128,128,66,0,Math.PI*2),i.stroke(),i.font=`bold 100px sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillStyle=`#9d7130`,i.fillText(`M`,128,130);let a=new wo(r);a.colorSpace=Tn;let o=new Y(new ls(1.08,1.08),new Wa({map:a,transparent:!0,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.set(e.x,.04,e.z),t.add(o);let s=document.createElement(`canvas`);s.width=512,s.height=110;let c=s.getContext(`2d`);c.fillStyle=`#fff7df`,c.beginPath(),c.roundRect(4,4,504,102,24),c.fill(),c.textAlign=`center`,c.fillStyle=`#655738`,c.font=`bold 25px sans-serif`,c.fillText(n.title,256,44),c.font=`22px sans-serif`,c.fillText(`${n.price.toLocaleString()} メニー`,256,80);let l=new wo(s);l.colorSpace=Tn;let u=new Pa(new ba({map:l,depthTest:!1}));return u.position.set(e.x,1.9,e.z),u.scale.set(2.5,.54,1),t.add(u),{p:e,mesh:o,label:u}});return{update(e,n){t.visible=!n;let r=new Set(re(e).map(e=>e.id));for(let{p:t,mesh:n,label:i}of s)n.visible=r.has(t.id),n.material.opacity=1,n.material.color.set(e.paymentPad?.id===t.id?`#efffa8`:`#d4ffc0`),i.visible=!1,n.scale.setScalar(e.paymentPad?.id===t.id?1.12:1)}}}function ef(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new ma,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=tf(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=tf(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function tf(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new $i(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}function nf(e){let t=j.map(t=>{let n=new q,r=t.id===`family`?[17.5,.8]:t.id===`market`?[-8.2,3.4]:[-1.5,-.6];n.position.set(r[0],0,r[1]),e.add(n);let i=Array.from({length:3},(e,t)=>{let r=[];function i(e,t,n,i,a){let o=e.toNonIndexed();e.dispose(),o.translate(n,i,a);let s=new J(t),c=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<c.length;e+=3)c[e]=s.r,c[e+1]=s.g,c[e+2]=s.b;o.setAttribute(`color`,new $i(c,3)),r.push(o)}if(t===0){i(new Oo(.85,.28,.38),`#c19561`,0,.15,0),i(new Oo(.76,.035,.3),`#816847`,0,.31,0);for(let e=0;e<5;e++){let t=-.3+e*.15;i(new Ao(.015,.02,.24,5),`#628f48`,t,.4,0),i(new ds(.11,7,5),e%2?`#f4c867`:`#e58b80`,t,.55,0)}}else if(t===1){i(new Oo(1.05,.1,.7),`#bf955c`,0,.6,-.85),i(new Oo(.52,.02,.65),`#eae3b0`,0,.665,-.85);for(let e of[-.4,.4])for(let t of[-1.1,-.6])i(new Oo(.085,.58,.085),`#a37a49`,e,.29,t);for(let e of[-.28,.28])i(new Ao(.12,.12,.03,12),`#f8efcf`,e,.69,-.85);i(new ds(.11,8,6),`#c9603c`,0,.76,-.85)}else{for(let e of[-.65,.65])i(new Ao(.03,.045,1.5,6),`#b89764`,e,.75,-1.45);let e=new Ao(.012,.012,1.3,5);e.rotateZ(Math.PI/2),i(e,`#dfd4a6`,0,1.45,-1.45);for(let e=0;e<5;e++){let t=new jo(.11,.25,3);t.rotateZ(Math.PI),i(t,[`#d98563`,`#ecce77`,`#84ab85`][e%3],-.5+e*.25,1.32,-1.45)}}let a=ef(r);r.forEach(e=>e.dispose());let o=new Y(a,new Ts({vertexColors:!0}));return n.add(o),o});return{id:t.id,stages:i}});return{update(e,n){for(let{id:r,stages:i}of t)i.forEach((t,i)=>t.visible=n||e.requests.progress[r].chapter>i)}}}function rf(){let e=[];function t(t,n,r,i,a){let o=t.toNonIndexed();t.dispose(),o.translate(r,i,a);let s=new J(n),c=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<c.length;e+=3)c[e]=s.r,c[e+1]=s.g,c[e+2]=s.b;o.setAttribute(`color`,new $i(c,3)),e.push(o)}let n=`#b6894f`,r=`#e1bd7c`;t(new Oo(.58,.08,.65),n,0,.27,0);for(let e of[.36,.48]){for(let n of[-.28,.28])t(new Oo(.045,.08,.68),r,n,e,0);for(let n of[-.32,.32])t(new Oo(.6,.08,.045),r,0,e,n)}for(let e of[-.32,.32]){let n=new Ao(.16,.16,.055,12);n.rotateZ(Math.PI/2),t(n,`#5e6759`,e,.16,.08);let r=new Ao(.07,.07,.061,8);r.rotateZ(Math.PI/2),t(r,`#d3ae6c`,e,.16,.08)}for(let e of[-.23,.23]){let r=new Oo(.035,.04,.65);r.rotateX(-.35),t(r,n,e,.41,-.57)}let i=ef(e);return e.forEach(e=>e.dispose()),new Y(i,new Ts({vertexColors:!0}))}function af(e,t,n){let r=document.createElement(`canvas`);r.width=r.height=512;let i=r.getContext(`2d`),a=i.createLinearGradient(0,0,512,0);a.addColorStop(0,`#badfc8`),a.addColorStop(.035,`#77c9bd`),a.addColorStop(.3,`#419fba`),a.addColorStop(1,`#347faf`),i.fillStyle=a,i.fillRect(0,0,512,512);for(let e=0;e<55;e++){i.strokeStyle=e%3?`#d8f5db22`:`#e5fbd640`,i.lineWidth=1,i.beginPath();for(let t=0;t<512;t+=3){let n=e*10+Math.sin(t*.045+e)*2.5;t?i.lineTo(t,n):i.moveTo(t,n)}i.stroke()}let o=new wo(r);o.colorSpace=Tn,o.wrapT=nt,o.repeat.y=3;let s=e=>Math.sin(e*.6)*.22+Math.sin(e*1.4)*.07,c=new ls(50,40,1,100),l=c.getAttribute(`position`);for(let e=0;e<l.count;e++)l.getX(e)<0&&l.setX(e,l.getX(e)+s(-l.getY(e)));let u=new Y(c,new Wa({map:o}));u.rotation.x=-Math.PI/2,u.position.set(54.5,-.016,0),e.add(u);let d=document.createElement(`canvas`);d.width=d.height=256;let f=d.getContext(`2d`),p=f.createLinearGradient(0,0,256,0);p.addColorStop(0,`#d4c49c00`),p.addColorStop(.16,`#d4c49c`),p.addColorStop(1,`#e4d6b4`),f.fillStyle=p,f.fillRect(0,0,256,256),f.globalCompositeOperation=`source-atop`;for(let e=0;e<2800;e++)f.fillStyle=e%2?`#9c8d6e30`:`#fff9dd50`,f.fillRect(e*73.7%256,e*37.3%256,1.1,1.3);let m=new wo(d);m.colorSpace=Tn,m.wrapT=nt,m.repeat.y=8;let h=new ls(3.4,32,1,80),g=h.getAttribute(`position`);for(let e=0;e<g.count;e++)g.setX(e,g.getX(e)+s(-g.getY(e)));let _=new Y(h,new Wa({map:m,transparent:!0,depthWrite:!1}));_.rotation.x=-Math.PI/2,_.position.set(29,-.022,0),e.add(_);let v=(t,n,r,i)=>{let a=new Pa(new ba({map:t,alphaTest:.3,transparent:!1}));return a.center.set(.5,.035),a.position.set(n,.025,r),a.scale.set(i,i,1),e.add(a),a};v(t,26.5,-2.7,4.3);let y=v(n,31.5,5.5,3.4),b=document.createElement(`canvas`);b.width=64,b.height=256;let x=b.getContext(`2d`);x.fillStyle=`#ffffff`,x.fillRect(0,0,64,256);for(let e=0;e<90;e++)x.strokeStyle=e%2?`#73502533`:`#fff4ce66`,x.beginPath(),x.moveTo(e*.73,0),x.bezierCurveTo(e*.73+3,80,e*.73-3,180,e*.73+1,256),x.stroke();let S=new wo(b);S.colorSpace=Tn;let C=new q,w=new q,T=new q;e.add(C,w,T);let E=(e,t,n,r,i,a,o,s)=>{let c=new Y(new Oo(i,a,o),new Ts({color:s,map:S}));return c.position.set(t,n,r),e.add(c),c};for(let[e,t]of[[C,!0],[w,!1]]){for(let n=0;n<17;n++){if(t&&n%5==2)continue;let r=E(e,29.25+n*.29,.08,3,.27,.16,2,t?`#877b60`:n%3?`#bb965e`:`#c9a976`);t&&(r.rotation.x=(n%3-1)*.08)}for(let n of[29.3,31.4,33.6])for(let r of[2,4])E(e,n,.15,r,.16,.8,.16,t?`#817861`:`#947447`),E(e,n,.6,r,.2,.08,.2,t?`#b0a183`:`#dfc696`)}for(let e=0;e<8;e++){let t=E(T,28.2+e%3*.4,.09,2.6+Math.floor(e/3)*.4,.65,.12,.15,e%2?`#82785d`:`#a49977`);t.rotation.y=e*.8}let D=new q;e.add(D),E(D,26,.25,.5,.8,.5,.65,`#887f62`);for(let e of[.1,.3,.48])E(D,26,e,.84,.86,.035,.03,`#c6b795`);let O=new q;e.add(O);for(let e=0;e<6;e++){let t=new Y(new ds(.13,8,5),new Ts({color:e%2?`#9ebfc2`:`#bcd8ce`}));t.scale.set(1.7,.55,.6),t.position.set(25.78+e%3*.2,.52,.32+Math.floor(e/3)*.24),O.add(t)}return{update:(e,t,n,r)=>{o.offset.y=t*.003,C.visible=!r&&!n.pier,w.visible=r||n.pier,T.visible=!r&&!n.cleaned,y.visible=r||n.boat,y.position.y=.02+Math.sin(t*1.1)*.035,y.material.rotation=Math.sin(t*.8)*.009,O.visible=r||n.fish>0}}}function of(e,t,n,r,i){let a=e-t,o=Math.cos(a)<0,s=Math.sin(a)>0,c=`walk`,l=0,u=Math.floor(Math.max(0,i)*6)%2;switch(r){case`walking`:l=[0,1,0,2][Math.floor(n*8)%4];break;case`planting`:case`clearing`:case`cleaning`:c=`work`,l=u;break;case`harvesting`:c=`work`,l=i<.52?2:3;break;case`tilling`:case`repairing`:c=`tools`,l=u;break;case`fishing`:c=`tools`,l=2;break;case`pruning`:case`picking`:c=`tools`,l=3}return{sheet:c,index:l+(o?c===`walk`?3:4:0),flip:s}}var sf={walk:[[168,14,375,512,270,510],[628,14,872,510,750,502],[1100,14,1368,510,1244,502],[170,518,372,1015,270,1008],[624,515,874,1011,750,1005],[1130,517,1387,1010,1260,1005]],work:[[79,44,389,423,304,418],[477,48,844,423,754,418],[944,65,1246,435,1165,430],[1414,18,1651,442,1555,436],[96,472,378,870,285,864],[485,472,839,863,738,858],[964,493,1254,862,1152,857],[1442,455,1685,866,1560,861]],tools:[[103,4,365,432,235,428],[492,68,796,428,690,424],[904,52,1291,432,1190,427],[1434,19,1660,432,1580,427],[96,432,358,862,228,857],[482,499,797,857,685,852],[887,488,1290,856,1190,851],[1466,453,1679,862,1573,857]]},cf={walk:1.65/495,work:.0028,tools:.004};async function lf(e=new Js){let t=[`walk`,`work`,`tools`],n=await Promise.all(t.map(t=>e.loadAsync(`./art/characters/farmer-${t}.png`)));return n.forEach(e=>{e.colorSpace=Tn,e.generateMipmaps=!1,e.minFilter=ct,e.magFilter=ct}),Object.fromEntries(t.map((e,t)=>[e,n[t]]))}function uf(e,t=Math.atan2(12,20)){let n=new q;n.name=`painted-farmer`;let r=Object.fromEntries(Object.entries(e).map(([e,t])=>[e,t.clone()])),i=new ba({map:r.walk,alphaTest:.4,transparent:!1,depthWrite:!0,toneMapped:!1});i.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float key = min(diffuseColor.r, diffuseColor.b) - diffuseColor.g;
      if(key > 0.10) discard;
      if(key > 0.015) {
        diffuseColor.r = min(diffuseColor.r, diffuseColor.g * 1.8);
        diffuseColor.b = min(diffuseColor.b, diffuseColor.g * 0.65);
      }
    `)},i.customProgramCacheKey=()=>`painted-farmer-magenta-v1`;let a=new Pa(i);n.add(a);let o=``;function s(e,s,c,l){let u=of(n.rotation.y,t,s,c,l),d=`${u.sheet}:${u.index}:${u.flip}`;if(d!==o){let[e,t,s,c,l,f]=sf[u.sheet][u.index],p=r[u.sheet],{width:m,height:h}=p.image;p.repeat.set((u.flip?-1:1)*(s-e)/m,(c-t)/h),p.offset.set((u.flip?s:e)/m,1-c/h),i.map=p,a.center.set(u.flip?1-(l-e)/(s-e):(l-e)/(s-e),(c-f)/(c-t)),a.scale.set((s-e)*cf[u.sheet],(c-t)*cf[u.sheet],1),n.userData.frame=u,o=d}let f=c===`walking`;a.position.y=.025+(f?Math.abs(Math.sin(s*Math.PI*4))*.025:0),i.rotation=c===`fishing`||c===`pruning`||c===`picking`?Math.sin(l*Math.PI*4)*.035:0}return s(0,0,`idle`,0),{root:n,animate:s}}var df=new G;function ff(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;df.copy(t),df[r]=0,df.normalize();let l=.5*o/(o+s),u=1-df.angleTo(e)/c;return Math.sign(df[n])===1?u*l:s/(o+s)+l+l*(1-u)}var pf=class e extends Oo{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new G,c=new G,l=new G(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new G,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=ff(m,c,`z`,`y`,i,n),f[a+1]=1-ff(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-ff(m,c,`z`,`y`,i,n),f[a+1]=1-ff(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-ff(m,c,`x`,`z`,i,e),f[a+1]=ff(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-ff(m,c,`x`,`z`,i,e),f[a+1]=1-ff(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-ff(m,c,`x`,`y`,i,e),f[a+1]=1-ff(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=ff(m,c,`x`,`y`,i,e),f[a+1]=1-ff(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},mf=new ds(1,24,16),hf=new pf(1,1,1,4,.16),gf=new ds(1,24,12,0,Math.PI*2,0,Math.PI*.4),_f=new Float32Array(mf.attributes.position.count*3);for(let e=0;e<mf.attributes.position.count;e++){let t=.84+.16*(mf.attributes.position.getY(e)+1)/2;_f.set([t,t,t],e*3)}mf.setAttribute(`color`,new $i(_f,3));function vf(e=!1){let t=e=>new ws({color:e,roughness:.95,metalness:0,vertexColors:!0}),n=t(`#eeb58b`),r=t(`#d9917d`),i=t(`#6b3e29`),a=t(`#855337`),o=t(e?`#65987b`:`#ce624d`),s=t(e?`#80674f`:`#527b91`),c=t(e?`#ab9272`:`#8aa6af`),l=t(`#d6b66f`),u=t(`#b99352`),d=t(e?`#647f66`:`#986049`),f=t(`#d7a343`),p=t(`#bb853c`),m=t(`#815735`),h=t(`#574634`),g=t(`#fff2d6`),_=t(`#423328`),v=t(`#69482b`),y=t(`#e8c470`);function b(e,t,n,r,i,a=mf){a.hasAttribute(`color`)||a.setAttribute(`color`,new na(new Float32Array(a.attributes.position.count*3).fill(1),3));let o=new Y(a,n);return o.name=t,o.position.fromArray(r),o.scale.fromArray(i),e.add(o),o}function x(e,t,n){let r=new q;return r.name=t,r.position.fromArray(n),e.add(r),r}function S(e,t,n,r,i){return b(e,t,n,[0,0,0],[1,1,1],new ps(new Uo(r.map(e=>new G(...e))),16,i,6,!1))}let C=new q;C.name=`farmer-storybook`,C.scale.setScalar(.68);let w=x(C,`body`,[0,.73,0]);b(w,`soft-shirt`,o,[0,.32,0],[.32,.3,.22]),b(w,`overalls-seat`,s,[0,.09,0],[.32,.24,.24]),b(w,`bib`,s,[0,.26,.193],[.46,.37,.11],hf),b(w,`bib-pocket`,s,[0,.2,.259],[.21,.15,.04],hf),S(w,`pocket-stitch`,c,[[-.085,.24,.284],[-.085,.15,.287],[.085,.15,.287],[.085,.24,.284]],.006);for(let e of[-1,1])S(w,`overall-strap`,s,[[e*.19,.29,.24],[e*.19,.49,.18],[e*.19,.55,0],[e*.19,.38,-.21]],.032),b(w,`brass-button`,y,[e*.19,.35,.267],[.032,.032,.018]);b(w,`neck`,n,[0,.6,0],[.115,.15,.11]);let T=x(w,`head`,[0,.96,0]);b(T,`cheeks-and-face`,n,[0,0,.015],[.425,.405,.365]),b(T,`hair-back`,i,[0,.035,-.11],[.441,.413,.285]),b(T,`hair-crown`,i,[0,.02,.01],[.443,.416,.38],gf);for(let e of[-1,1])b(T,`ear`,n,[e*.408,-.035,.01],[.083,.116,.067]),b(T,`ear-inner`,r,[e*.442,-.035,.052],[.023,.064,.018]),b(T,`side-lock`,i,[e*.367,.06,.15],[.076,.21,.11]),b(T,`warm-cheek`,r,[e*.239,-.105,.302],[.084,.045,.023]),b(T,`eye-white`,g,[e*.148,.012,.341],[.074,.096,.032]),b(T,`eye-iris`,v,[e*.148,.008,.371],[.046,.068,.018]),b(T,`eye-pupil`,_,[e*.148,.009,.385],[.025,.048,.009]),b(T,`eye-catchlight`,g,[e*.148-.012,.039,.394],[.013,.018,.008]),S(T,`brow`,i,[[e*.21,.143,.324],[e*.15,.157,.353],[e*.1,.144,.35]],.018);let E=b(T,`swept-fringe`,a,[-.12,.246,.278],[.245,.11,.112]);E.rotation.z=-.24;let D=b(T,`fringe-tip`,i,[.18,.257,.272],[.135,.1,.1]);D.rotation.z=.3,b(T,`nose`,n,[0,-.066,.377],[.059,.057,.059]),S(T,`smile`,_,[[-.095,-.178,.326],[0,-.2,.35],[.095,-.178,.326]],.009);let O=x(T,`straw-hat`,[0,.06,0]);b(O,`straw-brim`,l,[0,0,-.015],[1,1,.9],new cs([[0,.335],[.34,.335],[.45,.315],[.6,.29],[.65,.31],[.65,.335],[.59,.32],[.45,.345],[.34,.36],[0,.36]].map(e=>new W(e[0],e[1])),40)),b(O,`straw-crown`,l,[0,.39,-.03],[.413,.235,.345]),b(O,`hat-ribbon`,d,[0,.379,-.03],[1,1,.85],new Ao(.423,.431,.077,40,1,!0));for(let e of[.47,.54,.605]){let t=b(O,`woven-brim`,u,[0,.339-(e-.47)*.12,-.015],[1,.9,1],new fs(e,.004,4,40));t.rotation.x=Math.PI/2}let k=x(w,`backpack`,[0,.25,-.28]);return b(k,`canvas-pack`,f,[0,0,-.06],[.47,.51,.25],hf),b(k,`canvas-flap`,f,[0,.145,-.175],[.46,.18,.065],hf),b(k,`pack-buckle`,y,[0,.028,-.212],[.07,.09,.025],hf),S(k,`pack-handle`,p,[[-.08,.25,-.06],[-.07,.31,-.06],[.07,.31,-.06],[.08,.25,-.06]],.016),{root:C,body:w,head:T,arms:[-1,1].map(e=>{let t=x(w,e<0?`left-arm`:`right-arm`,[e*.33,.43,0]);return b(t,`round-sleeve`,o,[e*.025,-.08,0],[.142,.18,.15]),b(t,`sleeve-cuff`,o,[e*.032,-.19,0],[.126,.052,.135]),b(t,`forearm`,n,[e*.04,-.29,0],[.09,.16,.096]),b(t,`mitten-hand`,n,[e*.04,-.43,.02],[.1,.111,.1]),b(t,`thumb`,n,[e*-.032,-.412,.06],[.043,.067,.052]),t}),legs:[-1,1].map(e=>{let t=x(C,e<0?`left-leg`:`right-leg`,[e*.165,.73,0]);return b(t,`trouser-leg`,s,[0,-.24,0],[.153,.295,.163]),b(t,`rolled-hem`,c,[0,-.46,.005],[.16,.07,.174]),b(t,`rounded-boot`,m,[0,-.59,.055],[.166,.132,.236]),b(t,`boot-sole`,h,[0,-.685,.058],[.171,.041,.24]),t})}}function yf(e=!0){let{root:t,body:n,head:r,arms:i,legs:a}=vf(e),o=new q;i[1].add(o);let s=new Y(new Ao(.025,.025,1,16),new Ts({color:`#b79056`}));s.position.set(0,-.55,.05),o.add(s);let c=new Y(new pf(.3,.07,.19,3,.025),new Ts({color:`#89978a`}));c.position.set(0,-1.02,.12),o.add(c);let l=new q;i[1].add(l);let u=new Y(new Ao(.025,.025,1.05,16),new Ts({color:`#b79056`}));u.position.y=-.55,l.add(u);let d=new Y(new fs(.3,.023,5,18),new Ts({color:`#b39463`}));d.position.y=-1.2,l.add(d);let f=new Y(new ds(.29,8,6),new Wa({color:`#d9d4b5`,wireframe:!0,transparent:!0,opacity:.65}));f.scale.z=.6,f.position.set(0,-1.2,.12),l.add(f);function p(e,t,s,c){let u=s===`walking`?Math.sin(t*12)*.65:0,d=s===`pruning`||s===`picking`,f=s===`planting`,p=s===`harvesting`||s===`fishing`,m=s===`clearing`||s===`cleaning`,h=s===`tilling`||s===`repairing`;o.visible=h,l.visible=s===`fishing`;let g=Math.sin(c*Math.PI*4);n.rotation.y=hr.lerp(n.rotation.y,m?g*.28:0,1-Math.exp(-18*e));let _=Math.sin(Math.min(c,1)*Math.PI),v=1-Math.exp(-18*e);n.position.y=hr.lerp(n.position.y,.73+(u?Math.abs(u)*.065:0)-(p?_*.2:0),v),n.rotation.x=hr.lerp(n.rotation.x,d?-.06:h?.25+Math.max(0,g)*.3:m?.35:f?_*.65:p?_*.28:0,v),r.rotation.x=hr.lerp(r.rotation.x,d?-.18:f?_*.12:p?-_*.15:0,v),i.forEach((e,t)=>{let n=d?t?-1.5-_*.7:-.35-_*.4:h?-.6-g*.7:m?-.5+Math.sin(c*Math.PI*4+t)*.45:f?-.4-_*.5+Math.sin(c*Math.PI*4+t)*.16:p?-_*(t?1.6:1.2):u*(t?-1:1);e.rotation.x=hr.lerp(e.rotation.x,n,v),e.rotation.z=hr.lerp(e.rotation.z,(t?1:-1)*(m?.3+Math.abs(g)*.3:f?.12+_*.22:.13),v)}),a.forEach((e,t)=>{e.rotation.x=hr.lerp(e.rotation.x,u*(t?1:-1)+(p?_*.35:0),v)})}return{root:t,animate:p}}var bf=e=>`./art/${e}`;function xf(e){return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}function Sf(e,t){let n=document.createElement(`canvas`);n.width=n.height=e,t(n.getContext(`2d`));let r=new wo(n);return r.colorSpace=Tn,r}var Cf=()=>Sf(64,e=>{let t=e.createRadialGradient(32,32,2,32,32,32);t.addColorStop(0,`rgba(31,53,19,.45)`),t.addColorStop(.4,`rgba(31,53,19,.27)`),t.addColorStop(1,`rgba(31,53,19,0)`),e.fillStyle=t,e.fillRect(0,0,64,64)});async function wf(e,r){let i=new Yd({canvas:e,antialias:!0,alpha:!1});i.setPixelRatio(Math.min(devicePixelRatio,2)),i.outputColorSpace=Tn;let a=new bi;a.background=new J(`#82a64c`);let s=new lc(-10,10,7,-7,.1,100),c=new G(0,1.8,.5),l=new G(12,16,20);s.position.copy(c).add(l),s.lookAt(c),a.add(new Xs(`#fff7d5`,`#73904d`,2.3));let u=new dc(`#fff2cf`,2);u.position.set(-8,14,10),a.add(u);let d=new Js,f=lf(d),[m,h,g,_,v,b,x,S,C,w,T,E,D,O,k,A,j,ee,M,te,ne]=await Promise.all([`barn.png`,`apple-tree.png`,`corn.png`,`grass.png`,`barn-neglected.png`,`tree-neglected.png`,`weeds.png`,`barn-cleaned-keyed.png`,`barn-roof-keyed.png`,`turnip-keyed.png`,`delivery-truck.png`,`cottage-neglected.png`,`cottage-restored-keyed.png`,`town-well.png`,`fishing-shed.png`,`fishing-boat.png`,`farm-kitchen.png`,`apple-tree-picked.png`,`pumpkin.png`,`kabumorokoshi.png`,`pear-tree-keyed.png`].map(e=>d.loadAsync(bf(e))));for(let e of[m,h,g,_,v,b,x,S,C,w,T,E,D,O,k,A,j,ee,M,te,ne])e.colorSpace=Tn,e.anisotropy=Math.min(8,i.capabilities.getMaxAnisotropy());_.wrapS=_.wrapT=nt,_.repeat.set(105/6.5,105/6.5);let N=new Y(new ls(105,105),new Wa({map:_,color:`#c7e3d3`}));N.rotation.x=-Math.PI/2,N.position.y=-.035,a.add(N);let re=af(a,k,A),P=Cf(),ie=[],ae=new q,ce=new q;a.add(ae,ce);let le=`both`;function F(e,t,n,r){let i=new Y(new ls(n,r),new Wa({map:P,transparent:!0,depthWrite:!1}));return i.rotation.x=-Math.PI/2,i.position.set(e,.013,t),a.add(i),i}let ue=[];function de(e,t,n,r){let i=new Pa(new ba({map:e,transparent:!1,alphaTest:.3,depthWrite:!0}));return i.center.set(.5,.035),i.position.set(t,.025,n),i.scale.set(r,r,1),a.add(i),ue.push(i),i}function fe(e,t,n,r,i,o,s){let c=new Y(new Oo(r,i,o),new Ts({color:s}));return c.position.set(e,t,n),c.userData.condition=le,a.add(c),ie.push(c),c}let I=xf(302),pe=Sf(1024,e=>{let t=e=>(e+32)*16;e.lineCap=`round`,e.lineJoin=`round`;let n=(n,r)=>{e.strokeStyle=r,e.lineWidth=n*16,e.beginPath(),e.moveTo(t(-15),t(7)),e.bezierCurveTo(t(-9),t(6),t(-7),t(2),t(-3),t(2.2)),e.bezierCurveTo(t(0),t(2.5),t(5),t(2.2),t(15),t(4)),e.stroke(),e.beginPath(),e.moveTo(t(14.5),t(3.6)),e.lineTo(t(14.5),t(.2)),e.stroke(),e.beginPath(),e.moveTo(t(-5),t(-11.2)),e.lineTo(t(-2),t(-11.2)),e.stroke(),e.beginPath(),e.moveTo(t(18),t(3.8)),e.lineTo(t(18),t(-3.5)),e.lineTo(t(17),t(-9)),e.stroke(),e.beginPath(),e.moveTo(t(-2),t(2.2)),e.lineTo(t(-2),t(-21)),e.stroke(),e.beginPath(),e.moveTo(t(-2),t(2.2)),e.lineTo(t(-2),t(10.6)),e.lineTo(t(7.8),t(10.6)),e.stroke()};e.filter=`blur(5px)`,n(1.7,`#749349`),e.filter=`none`,n(1.52,`#c2af70`),n(1.34,`#dbc58d`),n(1.1,`#e1cf98`),e.globalCompositeOperation=`source-atop`;for(let t=0;t<18e3;t++)e.fillStyle=t%2?`rgba(136,107,55,.12)`:`rgba(255,247,196,.26)`,e.fillRect(I()*1024,I()*1024,1+I()*4,1+I()*2)}),he=new Y(new ls(64,64),new Wa({map:pe,transparent:!0,depthWrite:!1}));he.rotation.x=-Math.PI/2,he.position.y=.004,a.add(he),F(Ge.x,Ge.z,6.2,4.8);let ge=de(v,Ge.x,Ge.z,5.8),_e={value:0};ge.material.onBeforeCompile=e=>{e.uniforms.barnKey=_e,e.fragmentShader=`uniform float barnKey;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta = min(diffuseColor.r, diffuseColor.b);
      if(barnKey > 0.5 && magenta > 0.12 && diffuseColor.g < magenta * 0.8) discard;`)};let ve=de(E,me.x,me.z,4.8);F(me.x,me.z,4.8,3.3);let ye={value:0};ve.material.onBeforeCompile=e=>{e.uniforms.cottageKey=ye,e.fragmentShader=`uniform float cottageKey;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta=min(diffuseColor.r,diffuseColor.b);
      if(cottageKey>0.5&&magenta>0.12&&diffuseColor.g<magenta*0.8)discard;`)};let be=Xd(a),L=[0,1,2].map(e=>Qd(a,e)),xe=$d(a),Se=nf(a),Ce=Zd(a),R=y.filter(e=>e.id!==`harbor-link`).map(e=>({id:e.id,prop:de(e.id===`canteen`?j:e.id===`depot`?m:h,e.x,e.z-1.5,e.id===`depot`?3.4:2.7)})),we=yf(!0);we.root.position.set(-2.2,0,-1.2),we.root.rotation.y=.7,a.add(we.root);let z=F(-2.2,-1.2,.9,.65),B=new q;a.add(B);let Te=yf(!0);Te.root.position.set(16,0,0),Te.root.rotation.y=-.6,B.add(Te.root);let Ee=F(16,0,.9,.65),De=new Y(new Oo(1.1,.12,.4),new Ts({color:`#c29b60`}));De.position.set(12,.45,.3),B.add(De);for(let e of[11.6,12.4]){let t=new Y(new Oo(.12,.4,.35),new Ts({color:`#98794c`}));t.position.set(e,.2,.3),B.add(t)}let Oe=de(O,11.2,.5,2.25),ke=F(11.2,.5,1.8,1.4),Ae=yf(!0);Ae.root.position.set(-6.5,0,.2),Ae.root.rotation.y=1.3,a.add(Ae.root);let je=F(-6.5,.2,.9,.65),Me=de(T,n.x,n.z,2.9),Ne=F(n.x,n.z,2.6,1.3),Pe=yf(!0);Pe.root.position.set(n.x+.9,0,n.z-.3),Pe.root.rotation.y=-1.6,a.add(Pe.root);let Fe=F(n.x+.9,n.z-.3,.85,.65),Ie=de(j,p.x,p.z-.9,2.35),Le=F(p.x,p.z-.9,2.2,1.6),Re=oe.map((e,t)=>{F(e.x,e.z,2.5,1.8);let n=de(b,e.x,e.z,2.9);return o(t)===`pear`&&(n.material.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta=min(diffuseColor.r,diffuseColor.b);
      if(magenta>0.12&&diffuseColor.g<magenta*0.8)discard;`)}),n}),ze=new q;a.add(ze);let Be=new Y(new Oo(.65,.45,.55),new Ts({color:`#bb9159`}));Be.position.set(se.sales.x,.23,se.sales.z),ze.add(Be);for(let e=0;e<6;e++){let t=new Y(new ds(.09,8,6),new Ts({color:`#ce6843`}));t.position.set(se.sales.x-.2+e%3*.2,.49,se.sales.z-.13+Math.floor(e/3)*.22),ze.add(t)}let Ve=new q,He=new q;a.add(Ve,He);let Ue=new Map;for(let[e,t,n,r,i]of[[`lane-west`,-11,-2,0,7],[`lane-east`,-2,12,1.4,7],[`cottage-yard`,12,16,-1,7]]){let o=new ls(n-t,i-r),s=o.getAttribute(`uv`);for(let e=0;e<s.count;e++)s.setXY(e,(t+s.getX(e)*(n-t)+32)/64,(32-i+s.getY(e)*(i-r))/64);let c=new Y(o,new Wa({map:pe,transparent:!0,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set((t+n)/2,.009,(r+i)/2),a.add(c),Ue.set(e,c)}let qe=[[-9,-8,4],[-6.8,-8.8,3.5],[-5,-14,3.8],[-5,-20,3.3],[0,-23.5,3.3],[3.4,-23.5,3.9],[6.7,-23.5,3.7],[10,-10,3.5],[10,-16,3.7],[10,-21,3.6],[19.6,-7.2,4.2],[14,-8,3.8],[17,-8.7,3.6],[-10,-4,3.9],[-9.7,0,3.5],[21,-3,3.7],[21,1,4.3],[-8,7.5,4.4],[22,8.5,3.4],[20.2,10.5,3.5],[-5.1,11.8,3.3],[-2.8,16.5,3.5],[1,17.5,3.9],[4.8,17.2,3.5],[8.6,16.2,3.7],[11.8,13,3.5]],Je=[];for(let[e,t,n]of qe.filter(([e,t])=>!y.some(n=>Math.hypot(n.x-e,n.z-1.2-t)<2.8))){F(e,t,n*.8,n*.5);let r=de(b,e,t,n);r.material.rotation=(I()-.5)*.04,Je.push(r)}function Ye(e,t,n,r){let i=Math.hypot(n-e,r-t),a=Math.ceil(i/.8);for(let i=0;i<=a;i++){let o=e+(n-e)*i/a,s=t+(r-t)*i/a,c=le===`neglected`;if(c&&i%5==2)continue;let l=fe(o,c?.25:.3,s,.1,c?.5:.6,.1,c?`#948168`:`#f9edc7`);c&&(l.rotation.z=(i%3-1)*.22)}for(let o of[.22,.46]){if(le===`neglected`){for(let s=0;s<a;s++){if(s%3==1||o>.3&&s%4==0)continue;let c=(s+.5)/a,l=fe(e+(n-e)*c,o*.8,t+(r-t)*c,i/a*.9,.075,.075,`#a59375`);l.rotation.y=-Math.atan2(r-t,n-e),l.rotation.z=(s%2?1:-1)*.22}continue}let s=fe((e+n)/2,o,(t+r)/2,i,.075,.075,`#eee1b4`);s.rotation.y=-Math.atan2(r-t,n-e)}}for(let e of[`restored`,`neglected`]){le=e,Ye(-8.3,-6.4,-3,-6.4),Ye(-1,-20.7,8.2,-20.7),Ye(8.2,-20.7,8.2,1.2),Ye(-8.3,-6.4,-8.3,-.5);let t=ie.length;Ye(-7.6,3.6,-4.9,4.9);for(let e of ie.slice(t))e.userData.localFence=!0}le=`both`;let Xe=new ls(1,1);Xe.translate(0,.465,0);let Ze=new Wa({map:x,alphaTest:.3});function Qe(e,t){let n=new mo(Xe,Ze,e.length),r=new zr;e.forEach((e,t)=>{let i=.45+I()*.42;r.compose(new G(e.x,.11,e.z),s.quaternion,new G(i,i,1)),n.setMatrixAt(t,r),n.setColorAt(t,new J(t%3?`#ffffff`:`#d7d1ab`))}),n.computeBoundingSphere(),t.add(n)}let $e=new q;a.add($e),Qe(Array.from({length:100},()=>({x:11+I()*7,z:.3+I()*4.8})),$e);let et=[];for(let e=0;e<210;e++){let e=I()*19-9.5,t=I()*14-6;Ke.some(n=>Math.abs(e-n.x)<1.5&&Math.abs(t-n.z)<1.5)||Math.hypot(e-We.x,t-We.z)<1||Math.abs(e+2)<.45&&t<2||et.push({x:e,z:t})}let tt=new Map,rt=e=>e.x<-2&&e.z<.8?`barn-walls`:e.x<-2&&e.z<6?`lane-west`:e.x>=-2&&e.z>1.3?`lane-east`:void 0;Qe(et.filter(e=>!rt(e)),ae);for(let e of[`barn-walls`,`lane-west`,`lane-east`]){let t=new q;a.add(t),Qe(et.filter(t=>rt(t)===e),t),tt.set(e,t)}let it=Sf(512,e=>{for(let t=0;t<130;t++){let n=I()*512,r=I()*512,i=8+I()*38,a=e.createRadialGradient(n,r,0,n,r,i);a.addColorStop(0,t%2?`#a6976688`:`#baa47b88`),a.addColorStop(1,`#a6976600`),e.fillStyle=a,e.fillRect(n-i,r-i,i*2,i*2)}}),at=new Y(new ls(26,26),new Wa({map:it,transparent:!0,depthWrite:!1}));at.rotation.x=-Math.PI/2,at.position.y=.007,ae.add(at);let ot=Sf(256,e=>{e.fillStyle=`#90612f`,e.fillRect(0,0,256,256);for(let t=0;t<6;t++){let n=t*43,r=e.createLinearGradient(0,n,0,n+43);r.addColorStop(0,`#765029`),r.addColorStop(.35,`#b78b4c`),r.addColorStop(.57,`#c39859`),r.addColorStop(1,`#83522b`),e.fillStyle=r,e.fillRect(0,n,256,43)}for(let t=0;t<6e3;t++)e.fillStyle=t%2?`rgba(61,35,16,.18)`:`rgba(255,226,163,.21)`,e.fillRect(I()*256,I()*256,1+I()*3,1+I()*2)}),st=Sf(256,e=>{e.fillStyle=`#b59a6b`,e.fillRect(0,0,256,256);for(let t=0;t<4500;t++)e.fillStyle=t%2?`#a28b6744`:`#dbc39966`,e.fillRect(I()*256,I()*256,1+I()*4,1+I()*3)}),ct=[],lt=new ls(1,1);lt.translate(0,.465,0);let ut=new mo(lt,new Wa({map:g,alphaTest:.3}),Ke.length*12);ut.frustumCulled=!1,ut.instanceMatrix.setUsage(jn),a.add(ut);let dt=new Wa({map:w,alphaTest:.3});dt.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta = min(sampledDiffuseColor.r, sampledDiffuseColor.b);
      if(magenta > 0.12 && sampledDiffuseColor.g < magenta * 0.8) discard;`)};let ft=new mo(lt,dt,Ke.length*12);ft.frustumCulled=!1,ft.instanceMatrix.setUsage(jn),a.add(ft);let pt=new mo(lt,new Wa({map:te,alphaTest:.3}),Ke.length*12);pt.frustumCulled=!1,pt.instanceMatrix.setUsage(jn),a.add(pt);let mt=new mo(lt,new Wa({map:M,alphaTest:.3}),Ke.length*12);mt.frustumCulled=!1,mt.instanceMatrix.setUsage(jn),a.add(mt);let ht=0,gt=[],_t=[],vt=Ke.map(e=>{let t=new Y(new Oo(2.48,.1,2.62),new Ts({color:`#785c32`}));t.position.set(e.x,.04,e.z),a.add(t),ct.push(t);let n=new Y(new ls(2.4,2.54),new Wa({map:ot}));n.rotation.x=-Math.PI/2,n.position.set(e.x,.097,e.z),a.add(n),_t.push(n);let r=new q;a.add(r),gt.push(r),Qe(Array.from({length:38},()=>({x:e.x+(I()-.5)*2.25,z:e.z+(I()-.5)*2.4})),r);for(let t of[-1.25,1.25])for(let n of[-1.32,1.32])fe(e.x+t,.18,e.z+n,.065,.32,.065,`#e2c38b`);let i=[];for(let t=0;t<3;t++)for(let n=0;n<4;n++)i.push({index:ht++,position:new G(e.x-.89+n*.59,.025,e.z-.86+t*.84),size:1.22+(I()-.5)*.09,phase:I()*Math.PI*2});return i}),yt=[`#fff5d4`,`#f7d854`,`#e6aa86`];le=`restored`;let bt=new ds(.033,5,3);for(let e=0;e<150;e++){let t=I()*21-10.5,n=I()*17-8;if(t>-7&&t<8&&n>-6&&n<4.5)continue;let r=fe(t,.07,n,.015,.12,.015,`#678f38`),i=new Y(bt,new Wa({color:yt[e%3]}));i.position.copy(r.position).y=.15,i.userData.condition=`restored`,a.add(i),ie.push(i)}le=`both`;for(let[e,t,n]of[[-7,2.8,.35],[8.8,2.9,.3],[-3.5,5,.24],[7,-7,.3]]){let r=new Y(new No(n,1),new Ts({color:`#a5a58a`}));r.scale.set(1,.65,.8),r.position.set(e,n*.4,t),a.add(r),ie.push(r),F(e,t,n*2,n*1.5)}fe(We.x,.25,We.z,.72,.5,.62,`#a67436`);for(let e of[.08,.24,.42])for(let t of[-.32,.32])fe(We.x,e,We.z+t,.77,.035,.02,`#e3b86f`);for(let e of ie.filter(e=>e.userData.localFence))(e.userData.condition===`restored`?Ve:He).attach(e);for(let e of[`both`,`neglected`,`restored`]){let t=ie.filter(t=>!t.userData.localFence&&(t.userData.condition??`both`)===e).map(e=>{e.updateMatrix();let t=e.geometry.clone().applyMatrix4(e.matrix),n=e.material.color,r=new Float32Array(t.getAttribute(`position`).count*3);for(let e=0;e<r.length;e+=3)r[e]=n.r,r[e+1]=n.g,r[e+2]=n.b;t.setAttribute(`color`,new $i(r,3));let i=t.index?t.toNonIndexed():t;return a.remove(e),e.geometry.dispose(),e.material.dispose(),i}),n=ef(t);n&&(e===`neglected`?ae:e===`restored`?ce:a).add(new Y(n,new Ts({vertexColors:!0})));for(let e of t)e.dispose()}let xt=new Y(new us(.66,.71,48),new Wa({color:`#fff4b9`,transparent:!0,opacity:.9,side:2}));xt.rotation.x=-Math.PI/2,xt.position.set(We.x,.02,We.z),a.add(xt);let St=new q;a.add(St);let Ct=(e,t,n,r,i,a,o)=>{let s=new Y(new Oo(e,t,n),new Ts({color:r}));return s.position.set(i,a,o),St.add(s),s};Ct(.46,.3,.4,`#8fa374`,0,.36,0),Ct(.52,.06,.46,`#e1c796`,0,.52,0),Ct(.32,.035,.26,`#dfb865`,0,.56,0);for(let e of[-.3,.3]){let t=new Y(new Ao(.17,.17,.08,12),new Ts({color:`#6b654b`}));t.rotation.z=Math.PI/2,t.position.set(e,.17,.04),St.add(t)}Ct(.035,.5,.035,`#ad8750`,-.2,.62,.27).rotation.x=-.35,Ct(.035,.5,.035,`#ad8750`,.2,.62,.27).rotation.x=-.35,Ct(.45,.045,.045,`#ad8750`,0,.84,.36);let wt=F(0,0,.9,.7),Tt=rf();a.add(Tt);let Et=F(0,0,.8,.9),Dt=yf(!0);a.add(Dt.root);let Ot=F(0,0,.85,.65),kt=yf(!0);a.add(kt.root),Dt.root.name=`worker-mina`,kt.root.name=`worker-ren`,kt.root.traverse(e=>{e instanceof Y&&e.material instanceof Ts&&e.material.color.getHex()===6658171&&e.material.color.set(`#a28cb5`)});let At=F(0,0,.85,.65),jt=uf(await f,Math.atan2(l.x,l.z));a.add(jt.root);let Mt=F(0,0,.95,.75),Nt=new Y(new us(1.23,1.29,4),new Wa({color:`#fff6b0`,side:2,transparent:!0,opacity:.9}));Nt.rotation.set(-Math.PI/2,0,Math.PI/4),Nt.scale.set(1.38,1.45,1),a.add(Nt),Nt.visible=!1;let Pt=new Y(new us(.15,.19,32),new Wa({color:`#fff9cf`,transparent:!0,opacity:.9}));Pt.rotation.x=-Math.PI/2,a.add(Pt),Pt.visible=!1;let Ft=0,It=0;function Lt(){Ft=e.clientWidth,It=e.clientHeight,i.setSize(Ft,It,!1);let t=Ft/It,n=t<.8?15.5:13.3;s.left=-n*t/2,s.right=n*t/2,s.top=n/2,s.bottom=-n/2,s.updateProjectionMatrix()}Lt();let Rt=new ResizeObserver(Lt);Rt.observe(e);let zt=new kc,Bt=new vo(new G(0,1,0),0);function Vt(t,n){let r=e.getBoundingClientRect();zt.setFromCamera(new W((t-r.left)/r.width*2-1,-(n-r.top)/r.height*2+1),s);let i=zt.ray.intersectPlane(Bt,new G);return i?{x:i.x,z:i.z}:null}function Ht(e,t=0){let n=new G(e.x,t,e.z).project(s);return{x:(n.x+1)/2*Ft,y:(1-n.y)/2*It}}let Ut=new zr,Wt=new G,Gt=new gr,Kt=new gr,qt=new J,Jt;function Yt(e,n,u,d,f=!1){let p=`${f}/${r.restorationPhase}/${r.projects.has(`town-orchard`)}`;if(Jt!==p){Jt=p,ae.visible=!f,ce.visible=f;for(let e of Je)e.material.map=f||r.projects.has(`town-orchard`)?h:b;N.material.color.set(f?`#c7e3d3`:[`#cfbfaa`,`#cecaaf`,`#c8d0b7`,`#c7dac3`,`#c7e3d3`][r.restorationPhase-1]),he.material.opacity=f?1:[.56,.6,.65,.72,.8][r.restorationPhase-1],he.material.color.set(f?`#ffffff`:`#c8b997`)}ze.visible=f||r.investments.has(`orchard`),ze.children.slice(1).forEach((e,t)=>{e.visible=f||r.orchard.box>0,e.material.color.set(!f&&r.orchard.fruit.pear>0&&(r.orchard.fruit.apple===0||t>=3)?`#ddce56`:`#ce6843`)}),Re.forEach((e,t)=>{e.material.map=f||r.orchard.ripe(t,u)?o(t)===`pear`?ne:h:r.orchard.trees[t].tended?ee:b}),Pe.root.visible=Fe.visible=!f&&r.investments.has(`driver`)&&r.residentsArrived,Pe.animate(e,n,r.courier.progress>0?`harvesting`:`idle`,r.courier.progress),Ie.visible=Le.visible=f||r.investments.has(`kitchen`),Oe.visible=ke.visible=f||r.projects.has(`town-well`),Ae.root.visible=je.visible=f||r.residentsArrived&&r.projects.has(`town-market`),Ae.animate(e,n,`idle`,0),Se.update(r,f),Ce.update(r,f);for(let{id:e,prop:t}of R)t.visible=f||r.enterprises.level(e)>0;we.root.visible=z.visible=f||r.residentsArrived&&r.projects.has(`barn-open`),we.animate(e,n,`idle`,0);let g=f||r.projects.has(`cottage-repair`);ve.material.map=g?D:E,ye.value=+!!g,$e.visible=!f&&!r.projects.has(`cottage-yard`),B.visible=Ee.visible=f||r.projects.has(`cottage-welcome`),Te.animate(e,n,`idle`,0),ge.material.map=f||r.projects.has(`barn-open`)?m:r.projects.has(`barn-roof`)?C:r.projects.has(`barn-walls`)?S:v,_e.value=!f&&!r.projects.has(`barn-open`)&&r.projects.has(`barn-walls`)?1:0;for(let[e,t]of tt)t.visible=!f&&!r.projects.has(e);for(let[e,t]of Ue)t.visible=!f&&r.projects.has(e);if(Ve.visible=f||r.projects.has(`fence`),He.visible=!f&&!r.projects.has(`fence`),Ft/It<.8){let t=new G(r.player.x,1.8,r.player.z-.3);c.lerp(t,1-Math.exp(-3*e))}else r.player.z<-3.5?c.lerp(new G(r.player.x,1.8,r.player.z+.5),1-Math.exp(-3*e)):r.player.x>9.5&&r.player.x<23&&r.player.z>2.4?c.lerp(new G(r.player.x,1.8,r.player.z-.7),1-Math.exp(-3*e)):c.lerp(new G(r.player.z>6&&r.player.x<9.5?2:Math.max(0,Math.min(28,(r.player.x-7)*1.7)),1.8,Math.min(12.5,.5+Math.max(0,r.player.z-5)*1.5)),1-Math.exp(-3*e));s.position.copy(c).add(l),s.lookAt(c),s.updateMatrixWorld(),jt.root.position.set(r.player.x,0,r.player.z),Mt.position.set(r.player.x,.013,r.player.z),jt.animate(e,n,f?`idle`:r.action,r.progress),vt.forEach((e,i)=>{let a=r.plots[i],o=r.isUnlocked(i);gt[i].visible=!f&&a.land===`overgrown`,_t[i].visible=f||o,ct[i].visible=f||o,_t[i].material.map=f||a.land===`tilled`?ot:st,_t[i].material.color.set(!f&&a.land===`overgrown`?`#a6a07b`:`#ffffff`);let c=a.stage===`ready`?1:Math.max(.14,1-(a.readyAt-u)/(r.growSeconds(a.crop)*1e3));for(let r of e){let e=f?r.size:a.stage===`empty`?0:r.size*t[a.crop].size*(a.stage===`ready`?1:.22+c*.64);Wt.setScalar(f||a.crop===`corn`?e:0),qt.set(f||a.stage===`ready`?`#ffffff`:`#91b65c`),Kt.setFromAxisAngle(new G(0,0,1),Math.sin(n*1.3+r.phase)*.015),Gt.copy(s.quaternion).multiply(Kt),ut.setMatrixAt(r.index,Ut.compose(r.position,Gt,Wt)),ut.setColorAt(r.index,qt),Wt.setScalar(!f&&a.crop===`turnip`?e:0),ft.setMatrixAt(r.index,Ut.compose(r.position,Gt,Wt)),ft.setColorAt(r.index,qt),Wt.setScalar(!f&&a.crop===`kabumorokoshi`?e:0),pt.setMatrixAt(r.index,Ut.compose(r.position,Gt,Wt)),pt.setColorAt(r.index,qt),Wt.setScalar(!f&&a.crop===`pumpkin`?e:0),mt.setMatrixAt(r.index,Ut.compose(r.position,Gt,Wt)),mt.setColorAt(r.index,qt)}}),ut.instanceMatrix.needsUpdate=!0,ut.instanceColor&&(ut.instanceColor.needsUpdate=!0),ft.instanceMatrix.needsUpdate=!0,ft.instanceColor&&(ft.instanceColor.needsUpdate=!0),pt.instanceMatrix.needsUpdate=!0,pt.instanceColor&&(pt.instanceColor.needsUpdate=!0),mt.instanceMatrix.needsUpdate=!0,mt.instanceColor&&(mt.instanceColor.needsUpdate=!0),Me.visible=Ne.visible=r.investments.has(`truck`)||f,St.visible=wt.visible=!f&&r.investments.has(`seeder`);let _=r.plots[r.seederWorkingPlot]??r.plots[r.assignedPlots(`seeder`)[0]],y=_?{x:_.x-1.05,z:_.z+1.1}:{x:We.x+.9,z:We.z-.5};St.position.lerp(new G(y.x,r.seederProgress>0?Math.sin(n*18)*.015:0,y.z),1-Math.exp(-3*e)),wt.position.set(St.position.x,.014,St.position.z);for(let[t,i,a]of[[0,Dt,Ot],[1,kt,At]]){let o=r.workers.people[t];i.root.visible=a.visible=!f&&r.workers.enabled(o,r),i.root.position.set(o.position.x,0,o.position.z),i.root.rotation.y=o.heading,a.position.set(o.position.x,.013,o.position.z),i.animate(e,n,o.action===`returning`?o.route.length?`walking`:`idle`:o.action,o.progress)}if(Tt.visible=Et.visible=!1,Nt.scale.set(r.harbor.active?.7:1.38,r.harbor.active?.7:1.45,1),Nt.visible=!f&&r.isWorking,r.workPoint){let e=r.workPoint;Nt.position.set(e.x,.12,e.z)}Pt.visible=!!d,d&&Pt.position.set(d.x,.14,d.z),re.update(e,n,r.harbor,f),xe.update(r,f),be.update(r,f,e,n),L.forEach(t=>t.update(r,f,e,n));let x=Ht(r.player,.75),w=new G(r.player.x,.75,r.player.z).applyMatrix4(s.matrixWorldInverse).z;for(let t of ue){let n=Ht(t.position,t.position.y),r=t.scale.y*It/(s.top-s.bottom),i=t.position.clone().applyMatrix4(s.matrixWorldInverse).z,a=!f&&t.visible&&i>w+.05&&Math.abs(x.x-n.x)<r*.4&&x.y>n.y-r*.91&&x.y<n.y+r*.04?.24:1;t.material.opacity=hr.lerp(t.material.opacity,a,1-Math.exp(-12*e));let o=t.material.opacity<.99;t.material.transparent!==o&&(t.material.transparent=o,t.material.needsUpdate=!0),t.material.depthWrite=!o,t.material.alphaTest=o?.03:.3}i.render(a,s)}return{update:Yt,groundPoint:Vt,screenPoint:Ht,farmer:jt,renderer:i,scene:a,camera:s,dispose:()=>{Rt.disconnect(),i.dispose()}}}function Tf(e){let t=`/${e.split(`/`).filter(Boolean).join(`/`)}/`;return t===`//`?`farmer-mate:web:v1`:`farmer-mate:web:v1:${t}`}var Ef=e=>[`expansion`,`pasture`,`north-meadow`,`north-ridge`].includes(e)?`land`:e.startsWith(`seeder`)||e.startsWith(`harvester`)?`machines`:e.startsWith(`helper`)?`people`:[`tools`,`basket`].includes(e)?`hands`:[`truck`,`driver`,`warehouse`].includes(e)?`sales`:`crops`,Df=e=>e.z<-8?e.x<0?`北の農道`:e.x<9?`北の農地`:`北東の設備置き場`:e.z>6?`南の土地`:e.x<0?`納屋と出荷道`:e.x>9?`住宅地のそば`:`畑の周辺`;function Of(i){let a=[],o=[],s=[],c=[],l=i.plots.map((e,t)=>({p:e,i:t})).filter(({i:e})=>i.isUnlocked(e)).sort((e,t)=>Je(e.p,i.player)-Je(t.p,i.player)),u=[{id:`harvest`,title:`実った作物を収穫する`,detail:`収穫の経験を積んで、作物と自分の品質を育てよう。`,find:({p:e})=>e.land===`tilled`&&e.stage===`ready`&&i.inventory+t[e.crop].yield<=i.capacity},{id:`clear`,title:`次の畑の草を刈る`,detail:`費用なしで片付けられます。歩きやすい土地へ。`,find:({p:e})=>e.land===`overgrown`},{id:`till`,title:`片付いた畑を耕す`,detail:`種をまける土地を増やそう。費用はかかりません。`,find:({p:e})=>e.land===`cleared`},{id:`plant`,title:`空いた畑に種をまく`,detail:`畑のそばで作物を選び、止まると種をまきます。`,find:({p:e,i:t})=>e.land===`tilled`&&e.stage===`empty`}];for(let e of u){let t=l.find(e.find);t&&a.push({id:e.id,title:e.title,detail:e.detail,place:`畑 ${t.i+1} · ${Df(t.p)}`,point:{x:t.p.x,z:t.p.z+1.02}})}if(i.inventory>0&&o.push({id:`shipping`,title:`かごの実りを出荷する`,detail:`${i.inventory}個を通常出荷。売り上げは ${e.reduce((e,t)=>e+i.cargoQuality.value(t,i.salePrice(t)),0)}メニー。`,place:`${Df(We)}の出荷箱`}),i.investments.has(`truck`)){let e=r.find(e=>!i.orderReason(e.id));e&&o.push({id:`order`,title:`「${e.title}」へ届ける`,detail:`揃っている作物を注文へ。通常出荷と売り先を選べます。`,place:`南の販売車`})}i.investments.has(`kitchen`)&&o.push({id:`cooking`,title:i.kitchen.stored?`食品の売り先を選ぶ`:`次に作る料理を選ぶ`,detail:i.kitchen.stored?`食品棚に${i.kitchen.stored}個。販売・食品注文・復興への持ち寄りに使えます。`:`原料を加工へ回すか、そのまま売るかを選ぼう。`,place:i.kitchen.stored?`販売車／復興事業の案内板`:`納屋の加工台`}),i.investments.has(`orchard`)&&a.push({id:`orchard`,title:`果樹園を見回る`,detail:`木の手入れと果実の収穫、集荷箱の出荷を選べます。`,place:`住宅地の南の果樹園`});for(let e of Le.filter(e=>!i.projectReason(e.id)))s.push({id:e.id,title:e.title,detail:e.cost?`${e.cost.toLocaleString()}メニー。${e.detail}`:e.detail,place:`掃除用具で仕事を選び、現地へ`});for(let e of y){let t=i.enterprises.states[e.id];if(i.enterprises.reason(e.id,i)||t.level===3)continue;let n=e.targets[t.level];t.cleared&&t.contributed<n&&!S.some(t=>i.enterprises.offer(e.id,t,i))||s.push({id:e.id,title:`${e.title} · ${t.cleared?t.contributed===n?`建築を進める`:`実りを持ち寄る`:`敷地の片付け`}`,detail:e.detail,place:e.id===`depot`?`北の集荷所の案内板`:e.id===`harbor-link`?`港の入口の案内板`:`住宅地の北・東の案内板`})}for(let e of He.filter(e=>!i.investmentReason(e.id,!0)).sort((e,t)=>e.price-(i.funding.paid[e.id]??0)-(t.price-(i.funding.paid[t.id]??0)))){if(i.coins<=0)break;let t=re(i).find(t=>t.id===e.id);if(!t)continue;let n=e.price-(i.funding.paid[e.id]??0);c.push({id:e.id,title:e.title,detail:`あと ${n.toLocaleString()}メニー${n>i.coins?` · 今は途中まで納付できます`:``}。${e.detail}`,place:`${Df(t)}のMマス`})}let d=new Set,f=[],m=[];for(let e of c){let t=Ef(e.id);d.has(t)?m.push(e):(f.push(e),d.add(t))}c.splice(0,c.length,...f,...m),(i.harvesters.length||i.residentsArrived&&i.investments.has(`helper`)||i.investments.has(`seeder`))&&c.push({id:`assignments`,title:`自動化の稼働状況を見る`,detail:`購入した地域の設備は常時稼働。品質や運搬状況を確認できます。`,place:`畑の東の機械置き場`});for(let e of[...a,...o,...s,...c])e.point??=Le.find(t=>t.id===e.id)??y.find(t=>t.id===e.id)??N.find(t=>t.id===e.id)??{shipping:We,order:n,cooking:i.kitchen.stored?n:p,orchard:se.sales,assignments:te}[e.id];return[{id:`hands`,title:`手を動かす`,options:a},{id:`sales`,title:`実りを届ける`,options:o},{id:`town`,title:`街を育てる`,options:s},{id:`investments`,title:`投資・分担を選ぶ`,options:c}].filter(e=>e.options.length>0)}function kf(e){return`<div class="stage-requirements"><h3>農園から、街の産業へ</h3><p>農園の基盤30%・好きな2つの復興事業50%・港への供給協定20%。3つの事業を全部完成させる必要はありません。</p>${y.map(t=>{let n=e.enterprises.states[t.id];return`<p><strong>${n.level===3?`✓`:`○`} ${t.title}</strong> · ${n.level}/3段階<br><small>${t.detail} ${t.id===`depot`?`北の農道の西側`:t.id===`seed-garden`?`住宅地の北側`:t.id===`canteen`?`住宅地の東側`:`港の入口`}に案内板があります。</small></p>`}).join(``)}</div>`}function Af(n){let r=n.enterprises.nearby(n);if(!r)return``;let i=n.enterprises.states[r.id],a=n.enterprises.reason(r.id,n),o=r.targets[i.level];return`<div class="restoration-summary"><small>農園の実りで、暮らしを戻そう</small><strong>${r.title}</strong><p>${r.detail}</p></div>
 <div class="seeder-assignment"><h3>${i.level===3?`完成しました！`:r.chapters[i.level]}</h3><p>${a||(i.cleared?i.level===3?`街の新しい場所が使えます。`:i.contributed===o?`準備が整いました。画面を閉じ、この場所で止まると建築します。`:`準備 ${i.contributed.toLocaleString()} / ${o.toLocaleString()} · 少しずつ持ち寄れます。`:`画面を閉じて、この場所で止まると敷地を片付けます。`)}</p>
 ${r.benefits.map((e,t)=>`<p>${i.level>t?`✓`:`○`} 第${t+1}段階：${e}</p>`).join(``)}</div>
 ${i.cleared&&i.level<3&&!a&&i.contributed<o?`<p class="note-intro">作物はかご、果実は集荷箱、食品は加工台の棚から使います。低い品質から渡し、高品質ほど準備が進みます。残りを満たす最小個数を渡し、端数は次の段階に繰り越しません。</p><div class="investment-list">${S.filter(e=>n.enterprises.available(e,n)>0).map(e=>{let t=n.enterprises.offer(r.id,e,n);return t?`<button class="harbor-travel" data-enterprise="${r.id}" data-donation="${e}">${C(e)} ${t.amount.toLocaleString()}${e===`coins`?`メニー`:`個`}を届ける · 準備 +${t.value.toLocaleString()}</button>`:``}).join(``)||`<p>かごに実りを集めるか、出荷してメニーを用意しよう。</p>`}</div>`:``}
 ${r.id===`depot`&&i.level>=1?`<div class="seeder-assignment"><h3>共同倉庫 · ${n.stored}/${n.storageCapacity}個</h3><button id="depot-deposit" ${n.transferReason(`deposit`)?`disabled`:``}>${n.transferReason(`deposit`)||`かごの作物を共同倉庫へ預ける`}</button>${e.filter(e=>n.stock[e]>0).map(e=>`<button data-depot-crop="${e}" ${n.transferReason(e)?`disabled`:``}>${t[e].name}をかごへ · 倉庫 ${n.stock[e]}個</button>`).join(``)}${i.level===3?`<p>通常出荷は南側の入口にある出荷箱へ。倉庫への預け入れと売却を選べます。</p>`:``}</div>`:``}`}var jf=e=>`<article class="work-option" data-work-option="${e.id}"><h4>${e.title}</h4><p>${e.detail}</p><small>${e.place}</small>${e.point?`<button data-work-travel="${e.id}">ここへ歩く</button>`:``}</article>`,Mf=(e,t)=>{let n=t.completedTasks.has(e.id);return`<article class="task-card ${n?`done`:``}"><span class="task-check" aria-hidden="true">${n?`✓`:`○`}</span><div><h3>${e.title}</h3><p>${e.detail}</p><small>${n?`達成済み`:`${Math.min(e.target,e.count(t))} / ${e.target}`} · 基盤 +${e.points}ポイント${e.coins?` · ${e.coins} メニー`:``}</small></div></article>`};function Nf(e){let t=e.restorationPercent,n=Xe.filter(t=>e.completedTasks.has(t.id)),r=Xe.filter(t=>!e.completedTasks.has(t.id));return`<div class="restoration-summary"><small>第1ステージ · 農業地区</small><strong>街の復興 ${t}%</strong><p>${e.restorationPhase} / 5 · ${Be[e.restorationPhase-1]}</p><div class="progress-track"><i style="width:${t}%"></i></div><p>${e.agricultureComplete?`農業地区が復興しました。農園を残したまま、港の入口から次の産業へ進めます。`:e.foundationComplete?`基盤が整いました。好きな2つの復興事業を育て、港への供給協定へ。`:`農園の基盤を整え、好きな2つの復興事業を育てよう。すべての設備を買う必要はありません。`}</p></div>
 <h3 class="work-guide-title">いま、どこから進めよう？</h3><p class="note-intro">どれを先に進めても大丈夫。施設や畑へ歩いて、現地で操作します。</p><div class="work-guide">${Of(e).map(e=>`<section class="work-group" data-work-group="${e.id}"><h3>${e.title}</h3>${e.options.slice(0,e.id===`investments`?3:2).map(jf).join(``)}${e.options.length>(e.id===`investments`?3:2)?`<details class="work-more"><summary>ほかの選択肢 ${e.options.length-(e.id===`investments`?3:2)}件</summary>${e.options.slice(e.id===`investments`?3:2).map(jf).join(``)}</details>`:``}</section>`).join(``)||`<p>作物の成長を待つ間、各施設の分担や次の作付けを見回ろう。</p>`}</div>
 <details class="work-records" id="stage-requirements"><summary>ステージ全体の目標</summary><div class="stage-requirements"><h3>農園の基盤 ${Math.min(Ve.stagePoints,e.restorationPoints)} / ${Ve.stagePoints}ポイント</h3><p>基盤の仕事を選んでポイントをため、次の3つを整えます。基盤は全体の30%です。</p>${ze.map(t=>`<div>${e.projects.has(t)?`✓`:`○`} ${Re(t).title}</div>`).join(``)}</div>${kf(e)}</details>
 <details class="work-records" id="pending-tasks"><summary>これからの達成記録 · ${r.length}件</summary><p class="note-intro">条件が整った仕事から達成できます。この順に進める必要はありません。</p><div class="task-list">${r.map(t=>Mf(t,e)).join(``)||`<p>基盤の仕事はすべて達成しました。</p>`}</div></details>
 <details class="work-records" id="completed-tasks"><summary>達成した仕事 · ${n.length}件</summary><div class="task-list">${n.map(t=>Mf(t,e)).join(``)||`<p>最初の仕事を終えると、ここに記録されます。</p>`}</div></details>
 <button id="task-records" class="harbor-travel">プレイ記録・セーブ</button>`}function Pf(e){return F.map((t,n)=>(n===0?e.investments.has(`seeder`):e.plantingLines[n-1].owned(e))?`<section class="seeder-assignment" data-planting-line="${n}"><h3>${t.title}の種まき設備</h3><p>畑 ${t.first+1}〜${t.last}の耕した区画に常時種をまきます。土地を広げると自動で対象が増えます。</p><p>${n===0&&e.investments.has(`seeder-area`)?`1.6`:`2.4`}秒で種まき。作物は畑のそばで選べます。自分や住人も同じ畑を手伝えます。</p></section>`:``).join(``)}function Ff(e){return!e.investments.has(`helper`)||!e.residentsArrived?``:`<div class="seeder-assignment"><h3>農園の仲間</h3><p>耕作した畑を歩き回り、種まき・収穫を手伝います。収穫物はかごに持ち、近い倉庫入口へ運びます。北の集荷所が開くと、北の農地から納屋まで往復せずに預けられます。人ごとに収穫経験を積んで、品質を磨きます。</p><label class="area-control"><input id="helpers-enabled" type="checkbox" ${e.helperPlot>=0?`checked`:``}> 農園の手伝いをお願いする</label>${e.workers.people.filter(t=>e.workers.enabled(t,e)).map(t=>`<p><strong>${t.id===`mina`?`ミナ`:`レン`} · 技能 ${s[e.expertise.personGrade(t.id)]}</strong><br>種まき ${t.planted}回 · 収穫 ${t.harvested}個 · 運搬中 ${t.count} / 12個${t.action===`returning`?` · ${ve(t.destination)}へ`:``}</p>`).join(``)}<small>休みにすると新しい作業を止め、持っている収穫物を先に倉庫へ届けます。倉庫が満杯なら品物を保って待ちます。</small></div>`}function If(n){let r=n.kitchen;if(!n.investments.has(`kitchen`)||r.plan===`none`)return null;let o=g[r.plan],s=[],l=0,u=[];for(let r of e){let e=o.needs[r];e&&(s.push({id:r,name:t[r].name,required:e,available:n.stock[r],missing:Math.max(0,e-n.stock[r]),inBasket:n.cargo[r],source:`共同倉庫`}),l+=n.stockQuality.value(r,n.salePrice(r),e),n.stockQuality.peek(r,e).forEach((e,t)=>{e&&u.push(t)}))}for(let e of i){let t=o.fruit?.[e]??0;t&&(s.push({id:e,name:a[e].name,required:t,available:n.orchard.fruit[e],missing:Math.max(0,t-n.orchard.fruit[e]),inBasket:0,source:`果樹園の集荷箱`}),l+=n.orchard.quality.value(e,a[e].price,t),n.orchard.quality.peek(e,t).forEach((e,t)=>{e&&u.push(t)}))}let d=s.some(e=>e.missing>0),f=r.stored+o.yield>p.capacity,m=Math.min(...s.map(e=>Math.floor(e.available/e.required))),h=d?null:Math.min(...u),_=h===null?null:o.yield*Math.round(r.salePrice(r.plan,n)*c[h]);return{ingredients:s,batches:m,shelfFree:p.capacity-r.stored,output:o.yield,grade:h,rawValue:d?null:l,foodValue:_,difference:_===null?null:_-l,state:f?`shelf-full`:d?`ingredients`:`processing`,secondsLeft:Math.max(0,Math.ceil(o.seconds*(1-r.progress)))}}function Lf(e,n){let r=n.plots(e),i=r.filter(t=>e.plots[t].stage===`empty`).length,a=r.filter(t=>e.plots[t].stage===`growing`).length,o=r.length-i-a,s=n.loads.filter(t=>t.travelled>=B(we(e.plots[t.plot],t.destination))&&e.stored+t.count>e.storageCapacity).reduce((e,t)=>e+t.count,0),c,l;return s?(c=`倉庫の空き待ち`,l=`出口で${s}個が待っています。倉庫から出荷・加工するか、収納を増やすと運べます。`):r.length?n.active>=0?(c=`収穫中`,l=`畑 ${n.active+1} · あと約${Math.max(0,Math.ceil(Ce[n.tier(e)].seconds*(1-n.progress)))}秒。収穫後はコンベアへ流します。`):o&&n.inTransit+Math.min(...r.filter(t=>e.plots[t].stage===`ready`).map(n=>t[e.plots[n].crop].yield))>12?(c=`コンベアの空き待ち`,l=`運搬中の荷物が倉庫へ届くと、次を収穫できます。設備を更新すると運搬も速くなります。`):o?(c=`次の収穫へ`,l=`自分や住民が作業している畑は、その作業が終わってから担当します。`):i?(c=`種まき待ち`,l=`空いた畑に種をまこう。住民や種まき設備へ任せることもできます。`):(c=`作物の成長待ち`,l=`育つまで別の作業を進められます。収穫できる状態になると動きます。`):(c=`農地の準備待ち`,l=`この地域の土地を開き、草刈りと耕作を終えると自動で動きます。`),{label:c,detail:l,empty:i,growing:a,ready:o,blocked:s}}function Rf(e){let t=If(e);return t?`<section class="production-status" id="kitchen-supply"><h3>${t.state===`shelf-full`?`食品棚を空けよう`:t.state===`ingredients`?`次の料理の材料を集めよう`:`加工中 · あと約${t.secondsLeft}秒`}</h3><p>今ある材料で ${t.batches}回分 · 食品棚の空き ${t.shelfFree}個（1回で${t.output}個）</p><div class="ingredient-status">${t.ingredients.map(e=>`<div data-ingredient="${e.id}"><strong>${e.name}</strong><span>${e.source} ${e.available} / 必要 ${e.required}個</span><small>${e.missing?`あと${e.missing}個${e.inBasket?` · かごには${e.inBasket}個あります。共同倉庫へ預けよう。`:``}`:`次の1回分が揃っています`}</small></div>`).join(``)}</div>
 ${t.state===`shelf-full`?`<p>加工台で食品を売るか、販売車で注文に届けると、次の料理を作れます。</p>`:``}
 ${t.grade===null?`<p class="batch-value">材料が揃うと、次の料理の品質と売値を確認できます。</p>`:`<div class="batch-value"><strong>次の料理は ${s[t.grade]}ランクの見込み</strong><p>材料を通常出荷：${t.rawValue}メニー<br>料理を通常販売：${t.foodValue}メニー<br>加工による差額 ${t.difference>=0?`+`:``}${t.difference}メニー</p>${t.difference<0?`<small>今回は品質の組み合わせにより、材料をそのまま売る方が高くなります。</small>`:``}<small>現在の在庫を低い品質から使う計算です。ほかの担当者が在庫を使うと変わります。注文の報酬・定期便の手数料は含みません。</small></div>`}
 </section>`:``}function zf(e,t){let n=Lf(e,t);return`<section class="production-status" data-machine-status="${t.slot}"><h4>${n.label}</h4><p>${n.detail}</p><small>担当列：空き ${n.empty}区画 · 生育中 ${n.growing}区画 · 収穫待ち ${n.ready}区画<br>共同倉庫 ${e.stored} / ${e.storageCapacity}個</small></section>`}function Bf(e){return e.harvesters.map(t=>{let n=Ce[t.tier(e)],r=F[t.slot];return`<section class="seeder-assignment" data-machine-line="${t.slot}"><h3>${r.title} · ${n.title}</h3><p>畑 ${r.first+1}〜${r.last}の耕した区画で常時稼働。${n.seconds}秒で収穫し、コンベアで倉庫へ運びます。</p><p>品質は到達品質から${n.penalty}ランク低下（下限E）。自分も種まき・収穫でき、近くで止まると自分の作業が優先されます。</p>${zf(e,t)}<p>運搬中 ${t.inTransit}個 · 搬入済み ${t.delivered}個</p></section>`}).join(``)}var Vf=e=>e.map((e,t)=>e?`<span class="quality-badge grade-${t}" data-grade="${s[t]}">${s[t]} · ${e}個</span>`:``).reverse().join(` `)||`—`;function Hf(e){return`<div class="quality-guide"><h3>人は経験で、作物は育てるほどに。</h3><p>収穫時の品質は、作物の熟練と収穫する人の技能の低い方です。設備で上限を解放し、経験を積んで磨きます。</p>${[{id:`player`,name:`あなた`},...e.investments.has(`helper`)&&e.residentsArrived?[{id:`mina`,name:`ミナ`},...e.investments.has(`helper-area`)?[{id:`ren`,name:`レン`}]:[]]:[]].map(t=>{let n=e.expertise.personGrade(t.id),r=e.expertise.people[t.id],i=l[n+1];return`<p><strong>${t.name}の収穫技能 ${s[n]}</strong> · 経験 ${r}回${i===void 0?``:` · 次まで${Math.max(0,i-r)}回`}</p>`}).join(``)}<p>育てるだけではBまで。A・Sには品種改良の研究設備が必要です。Cランクを収穫すると、最初の機械を導入できます。</p></div>`}function Uf(e,t){let n=e.harvestGrade(t),r=e.expertise.cropGrade(t,e.research);return`収穫見込み <strong>${s[n]}ランク</strong> · ${Math.round(e.salePrice(t)*c[n])}メニー/個<br>作物の熟練 ${s[r]} · 栽培経験 ${e.expertise.crops[t]}回`}function Wf(n){return`<div class="restoration-summary"><small>品質は収穫したときのまま</small><strong>収穫かご · ${n.inventory} / ${n.capacity}個</strong><p>納屋前の出荷箱で止まると売れます。倉庫へ預けても品質は変わりません。取り出し・注文・贈りものには低い品質から使います。</p></div>${e.filter(e=>n.cropUnlocked(e)).map(e=>`<article class="quality-stock"><h3>${t[e].name}</h3><p>${Vf(n.cargoQuality.peek(e))}</p><small>通常出荷の合計 ${n.cargoQuality.value(e,n.salePrice(e))}メニー</small></article>`).join(``)}<h3>加工台の食品棚</h3>${m.filter(e=>n.kitchen.goods[e]>0).map(e=>`<p>${g[e].name} ${Vf(n.kitchen.quality.peek(e))}</p>`).join(``)}<h3>果樹園の集荷箱</h3>${i.map(e=>`<p>${a[e].name} ${Vf(n.orchard.quality.peek(e))}</p>`).join(``)}${Hf(n)}`}function Gf(e){return`<div class="restoration-summary"><small>実りの先に、誰かの暮らし。</small><strong>住人からのお願い</strong><p>家族、青果市、納屋の仲間。気になる人から、少しずつ。途中で別のお願いへ向かっても、届けた分は残ります。</p></div><p class="note-intro">作物・食品・リンゴを届けるか、メニーで準備を手伝えます。どの方法を組み合わせても同じ景観が戻ります。通常の出荷とは別の、街への贈りものです。</p>${j.filter(t=>Math.hypot(e.player.x-t.x,e.player.z-t.z)<1.8).map(t=>{let n=e.requests.progress[t.id],r=t.chapters[n.chapter],i=e.residentsArrived&&e.projects.has(t.requires),a=r?Math.floor(n.contributed/r.target*100):100;return`<article class="investment-card resident-request" id="resident-${t.id}"><small>${t.name} · ${n.chapter} / ${t.chapters.length} のお願い</small><h3>${r?.title??`みんなの暮らす場所に`}</h3><p>${r?.detail??`この場所に、実りを分け合う暮らしが戻りました。`}</p>
   ${n.chapter>0?`<p class="resident-thanks">${t.chapters[n.chapter-1].thanks}</p>`:``}
   ${i?r?`<div class="progress-track"><i style="width:${a}%"></i></div><p>準備 ${a}% · 完了すると、この場所に${[`花が飾られます`,`食卓ができます`,`お祝いの飾りがつきます`][n.chapter]}。</p><div class="resident-offers">${Object.keys(r.accepts).map(i=>{let a=i,o=e.requests.offer(t.id,a,e),s=o?.amount??0,c=Math.min(100,Math.floor((n.contributed+s*r.accepts[a])/r.target*100));return`<button data-resident="${t.id}" data-contribution="${a}" ${o?``:`disabled`}>${o?`${A[a]} ${s}${a===`coins`?`メニーで支援`:`個を届ける`} · 準備 ${c}%へ`:`${A[a]}がありません`}</button>`}).join(``)}</div>`:`<p>この場所へのお願いは、すべて叶いました。</p>`:`<p class="order-hint">「${Re(t.requires).title}」を終えたら、お話しできます。</p>`}
   <small>作物はかご、食品は加工台の棚、リンゴは果樹園の箱から。現地で渡した時に使います。移動中に取りやめても減りません。</small></article>`}).join(``)}`}function Kf(e){let t=Math.floor(e);return t<60?`${t}秒`:t<3600?`${Math.floor(t/60)}分 ${t%60}秒`:`${Math.floor(t/3600)}時間 ${Math.floor(t%3600/60)}分`}function qf(e){return`<article class="investment-card play-journal"><h3>農園での歩み</h3><p>畑を育て、街を整えてきた記録です。時間の長さで仕事や次の地区が開くことはありません。</p>
    <strong id="journal-total">農園で遊んだ時間の目安 · ${Kf(e.activeSeconds)}</strong>
    ${e.partial?`<p class="order-hint">この農園は途中から計測しています。以前に遊んだ時間は含みません。</p>`:``}
    <dl class="journal-times">${Object.entries({moving:`移動`,working:`手作業`,looking:`農園を見渡す時間の目安`,notebook:`ノートを読む・選ぶ時間の目安`,idle:`しばらく操作がなかった時間`,unobserved:`画面更新が止まり、確認できない時間`}).map(([t,n])=>`<div><dt>${n}</dt><dd>${Kf(e.seconds[t])}</dd></div>`).join(``)}</dl>
    <p class="note-intro">最後の操作から30秒以内を目安にしています。考え中と放置は完全には区別できません。ノートの時間は別枠で、比較画面・別タブ・オフラインは合計に含みません。</p>
    <h4>農園の節目</h4><ol class="journal-milestones">${Object.entries(ke).map(([t,n])=>{let r=e.milestones[t];return`<li><strong>${n}</strong><span>${r===void 0?`これから`:r===null?`計測前に達成`:`${Kf(r.active)} · ノート ${Kf(r.notebook)}`}</span></li>`}).join(``)}</ol><p class="note-intro">記録ファイルにも含まれます。外部への自動送信はありません。</p></article>`}function Jf(e,t){let n=e.orchard;return`<section id="orchard-section"><div class="restoration-summary"><small>植え直さずに、次の実りを待つ。</small><strong>住宅地の小さな果樹園</strong><p>枝を手入れすると何度でも実ります。リンゴは75秒で4個、ナシは105秒で3個。果実のまま出荷するか、加工台でお菓子にします。</p></div><div class="plot-grid">${n.trees.map((r,i)=>`<button data-tree="${i}" ${n.unlocked(i,e)?``:`disabled`}><strong>${a[o(i)].name}の木 ${i+1}</strong><small>${n.unlocked(i,e)?r.tended?n.ripe(i,t)?`収穫できます`:`実りまで ${Math.max(0,Math.ceil((r.readyAt-t)/1e3))}秒`:`枝の手入れから`:`園の再開から`}</small></button>`).join(``)}</div><div class="seeder-assignment"><h3>果樹園の集荷箱 · ${n.box} / ${se.capacity}個</h3>${i.map(e=>`<p>${a[e].name} ${Vf(n.quality.peek(e))} · 合計 ${n.quality.value(e,a[e].price)}メニー</p>`).join(``)}<p>累計収穫 ${n.harvested}個 · 出荷 ${n.sold}個 · 加工 ${n.processed}個</p><button id="orchard-sell" ${n.box>0?``:`disabled`}>箱の果実をまとめて出荷する</button><small>加工台は必要な果実をこの箱から使います。出荷すると原料もなくなるので、加工したい分は先に料理へ。定期便は共同倉庫の作物を担当します。</small></div></section>`}function Yf(n){if(!n.investments.has(`driver`))return`<p class="order-hint">販売車と納屋が揃ったら、配達の仲間を迎えて倉庫の作物の出荷を任せられます。</p>`;let r=n.courier,i=r.reserves(n),a=e.reduce((e,t)=>e+i[t],0);return`<div class="seeder-assignment"><h3>販売車の定期便</h3><p>倉庫の作物を${Me.seconds}秒ごとに最大${Me.load}個出荷します。手数料は1個${Me.fee}メニー。かごと食品棚、果実の集荷箱は使いません。</p><label class="area-control"><input id="courier-enabled" type="checkbox" ${r.enabled?`checked`:``}> 定期便を動かす</label><label for="courier-policy">倉庫に残しておく作物</label><select id="courier-policy">${Object.keys(je).map(e=>`<option value="${e}" ${r.policy===e?`selected`:``}>${je[e].title}</option>`).join(``)}</select>
 ${r.policy===`custom`?`<p>0個なら、その作物はすべて出荷できます。1種類0〜240個で指定します。</p><div class="reserve-fields">${e.filter(e=>n.cropUnlocked(e)).map(e=>`<div class="reserve-field"><label for="reserve-${e}">${t[e].name}を残す数</label><input id="reserve-${e}" data-reserve-crop="${e}" type="number" inputmode="numeric" min="0" max="240" step="1" value="${r.custom[e]}"></div>`).join(``)}</div>`:``}
 ${r.policy===`kitchen`?`<p>${n.kitchen.plan===`none`?`加工がお休みの間は、コーン6個・カブ4個を残します。`:`${g[n.kitchen.plan].name}の材料1回分を確保します。加工台で料理を変えると、この確保数も変わります。`}</p>`:``}
 <p>残す作物：${e.filter(e=>i[e]>0).map(e=>`${t[e].name} ${i[e]}個`).join(`・`)||`なし`}<br>出荷できる余剰 ${r.available(n)}個 · 累計出荷 ${r.sold}個</p>${a>n.storageCapacity?`<p class="order-hint">確保数の合計が倉庫容量を超えています。全部を同時には蓄えられません。残す数を減らすか、収納を増やそう。</p>`:``}
 <small>低い品質から出荷し、残った高品質の作物を保管します。定期便の受取額 ${r.earned}メニー（手数料差引後）。設定変更や再開時は、途中の配達をはじめからやり直します。</small></div>`}function Xf(e,t,n){let r=document.createElement(`section`);r.id=`saves-panel`,r.setAttribute(`role`,`tabpanel`),r.setAttribute(`aria-labelledby`,`saves-tab`),r.hidden=!0,r.innerHTML=`<div class="restoration-summary"><small>育てた農園を、これからも。</small><strong>農園の記録</strong><p>このブラウザーには自動で保存しています。ファイルに書き出すと、別の端末や新しい試遊版へ農園を持っていけます。</p></div>
 <div id="play-journal"></div>
 <article class="investment-card"><h3>今の農園を書き出す</h3><p>畑・作物・所持品・購入した設備・街の復興を、ひとつのファイルにまとめます。</p><button id="export-save">記録ファイルを保存する</button></article>
 <article class="investment-card"><h3>記録から再開する</h3><p>ファイルを選ぶと、先に農園の内容を確認できます。再開を決めるまでは、今の農園は変わりません。</p><label class="save-file-label" for="import-save">農園の記録ファイル</label><input id="import-save" type="file" accept=".json,application/json"><button id="restore-import-backup">読み込み前の農園を確認する</button></article>
 <article id="import-preview" class="investment-card" hidden><h3>この農園を引き継ぎますか？</h3><p id="import-summary"></p><p>今の農園と置き換わります。読み込み前の農園も、このブラウザーに1つ残します。</p><button id="confirm-import">この記録で再開する</button><button id="cancel-import">今の農園を続ける</button></article>
 <p id="save-status" role="status" aria-live="polite"></p><p class="note-intro">端末間の自動同期はありません。ファイルは手元で保管してください。</p>`;let i=null,a=0,o=e=>r.querySelector(`#`+e),s=e=>{let t=o(`save-status`);t.textContent=e,t.scrollIntoView({block:`nearest`})};function c(){i=null,o(`import-preview`).hidden=!0,o(`import-save`).value=``,a++}function l(e){i=$e(e);let t=new Ze;t.restore(i),o(`import-summary`).textContent=`${t.coins.toLocaleString(`ja-JP`)} メニー · 畑 ${t.plots.filter((e,n)=>t.isUnlocked(n)).length}区画 · 復興 ${t.restorationPercent}% · 累計出荷 ${t.shipped}個`,o(`import-preview`).hidden=!1,s(`内容を確認してから、再開を選んでください。`),o(`confirm-import`).focus()}return o(`export-save`).addEventListener(`click`,()=>{let t=URL.createObjectURL(new Blob([Qe(e())],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`farmer-mate-${new Date().toISOString().slice(0,10)}.json`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4),s(`今の農園を記録ファイルに書き出しました。`)}),o(`import-save`).addEventListener(`change`,async()=>{let e=o(`import-save`).files?.[0],t=++a;if(i=null,o(`import-preview`).hidden=!0,e){if(e.size>1048576){s(`このファイルは大きすぎます。農園の記録ファイルを選んでください。`);return}try{let n=await e.text();t===a&&l(n)}catch(e){t===a&&s(e instanceof Error?e.message:`記録を読めませんでした。`)}}}),o(`cancel-import`).addEventListener(`click`,()=>{c(),s(`今の農園を続けます。`)}),o(`confirm-import`).addEventListener(`click`,()=>{if(i)try{t(i),c(),s(`農園の記録を引き継ぎました。`)}catch{s(`記録を書き込めませんでした。今の農園は変更していません。`)}}),o(`restore-import-backup`).addEventListener(`click`,()=>{c();try{let e=n();e?l(e):s(`読み込み前の記録は、まだありません。`)}catch{s(`読み込み前の記録を確認できませんでした。`)}}),{panel:r,reset:c}}function Zf(n,r=!1){let o=n.kitchen,s=n.investments.has(`kitchen`),c=n=>[...e.filter(e=>n.needs[e]>0).map(e=>`${t[e].name} ${n.needs[e]}個`),...i.filter(e=>(n.fruit?.[e]??0)>0).map(e=>`${a[e].name} ${n.fruit[e]}個`)].join(` + `),l=o.plan===`none`?null:g[o.plan],u=`<div class="restoration-summary"><small>農園から、街の食卓へ</small><strong>納屋の加工台</strong><p>作物をそのまま売るか、農園の味にするか。加工は作業台に任せて、別の仕事を進められます。</p></div>
 ${s?``:`<p class="order-hint">納屋を再開したら「農園への投資」から加工台を導入できます。</p>`}
 <div class="seeder-assignment"><label for="kitchen-plan">作り続ける食品</label><select id="kitchen-plan" ${s?``:`disabled`}><option value="none">加工をお休みする</option>${m.map(e=>`<option value="${e}" ${o.plan===e?`selected`:``} ${o.unlocked(e,n)?``:`disabled`}>${g[e].name}</option>`).join(``)}</select>${l?`<p>${c(l)} → ${l.seconds}秒で${l.yield}個</p>`:``}<p>${o.reason(n)||`${g[o.plan].name}を作っています · ${Math.floor(o.progress*100)}%`}</p><small>材料は低い品質から使い、料理の品質は使った材料の最低ランクになります。材料は完成時に倉庫と果樹園の集荷箱から使います。変更・お休み・再開時は、途中の加工をはじめからやり直します。</small></div>
 ${Rf(n)}
 <details class="recipe-list"><summary>すべてのレシピ（8品）</summary><div class="crop-guide">${m.map(n=>{let r=g[n];return`<div><strong>${r.name}</strong><small>${[...e.filter(e=>r.needs[e]>0).map(e=>`${t[e].name} ${r.needs[e]}個`),...i.filter(e=>(r.fruit?.[e]??0)>0).map(e=>`${a[e].name} ${r.fruit[e]}個`)].join(` + `)}<br>${r.seconds}秒で${r.yield}個 · Eランクの販売 ${r.price}メニー/個</small></div>`}).join(``)}</div></details>
 <div class="seeder-assignment"><h3>食品棚 · ${o.stored} / ${p.capacity}個</h3><p>${m.filter(e=>o.goods[e]>0).map(e=>`${g[e].name} ${Vf(o.quality.peek(e))} · 合計 ${o.quality.value(e,o.salePrice(e,n))}メニー`).join(`<br>`)||`食品はまだありません`}</p><p>これまでに作った食品 ${o.crafted}個</p><button id="kitchen-sell" data-food="all" ${o.deliveryReason(`all`,n)?`disabled`:``}>${o.deliveryReason(`all`,n)||`加工台へ向かい、食品をまとめて売る`}</button></div>
`,d=` <h3 class="section-label">街からの食品の注文</h3><p class="note-intro">食品棚から必要な分を販売車へ積んで届けます。普通に売る場合は、販売車は必要ありません。</p>${_.filter(e=>m.every(t=>e.needs[t]===0||o.unlocked(t,n))).map(e=>`<article class="investment-card"><div class="investment-heading"><h3>${e.title}</h3><span>+${o.orderCoins(e.id)} メニー</span></div><p>${e.detail}</p><small>${m.filter(t=>e.needs[t]>0).map(t=>`${g[t].name} ${e.needs[t]}個`).join(` / `)} · 納品 ${o.orders[e.id]}回</small><button id="food-${e.id}" data-food="${e.id}" ${o.deliveryReason(e.id,n)?`disabled`:``}>${o.deliveryReason(e.id,n)||`販売車で届ける`}</button></article>`).join(``)}`;return r?d:u}function Qf({farm:i,visitResident:a,pause:o,navigate:s,notify:c,visitProject:l,visitOrder:u,visitStore:d,visitSea:f,visitFood:m,snapshot:h,importSave:g,importBackup:_,now:v,visitOrchardSale:y}){let b=document.createElement(`dialog`);b.className=`notebook`,b.setAttribute(`aria-labelledby`,`notebook-title`),b.innerHTML=`<header class="notebook-heading"><div><small>ひだまり農園の記録</small><h2 id="notebook-title">農園ノート</h2></div><button class="close-note" aria-label="農園ノートを閉じる">×</button></header>
    <div class="note-tabs" hidden role="tablist" aria-label="農園ノート"><button id="tasks-tab" role="tab" aria-controls="tasks-panel" data-tab="tasks">できる仕事</button><button id="crops-tab" role="tab" aria-controls="crops-panel" data-tab="crops">作付け</button><button id="orders-tab" role="tab" aria-controls="orders-panel" data-tab="orders">注文</button><button id="restoration-tab" role="tab" aria-controls="restoration-panel" data-tab="restoration">街の手入れ</button><button id="investments-tab" role="tab" aria-controls="investments-panel" data-tab="investments">農園への投資</button><button id="kitchen-tab" role="tab" aria-controls="kitchen-panel" data-tab="kitchen">加工と食品</button><button id="residents-tab" role="tab" aria-controls="residents-panel" data-tab="residents">住人のお願い</button><button id="saves-tab" role="tab" aria-controls="saves-panel" data-tab="saves">記録</button><button id="harbor-tab" role="tab" aria-controls="harbor-panel" data-tab="harbor" hidden>港</button></div>
    <div class="note-content"><section id="enterprises-panel" hidden></section><section id="breeding-panel" hidden></section><section id="basket-panel" hidden></section><section id="storage-panel" hidden></section><section id="orchard-panel" hidden></section><section id="residents-panel" role="tabpanel" aria-labelledby="residents-tab" hidden></section><section id="kitchen-panel" role="tabpanel" aria-labelledby="kitchen-tab" hidden></section><section id="harbor-panel" role="tabpanel" aria-labelledby="harbor-tab" hidden></section><section id="tasks-panel" role="tabpanel" aria-labelledby="tasks-tab"></section><section id="crops-panel" role="tabpanel" aria-labelledby="crops-tab" hidden></section><section id="orders-panel" role="tabpanel" aria-labelledby="orders-tab" hidden></section><section id="restoration-panel" role="tabpanel" aria-labelledby="restoration-tab" hidden></section><section id="investments-panel" role="tabpanel" aria-labelledby="investments-tab" hidden></section></div>
    <p class="note-foot">施設や記録を開いている間、作業と成長はお休みです。</p>`,document.querySelector(`#app`).append(b);let x=Xf(h,e=>{g(e),b.close(),o(!1),c(`農園の記録を引き継ぎました。`)},_);b.querySelector(`.note-content`).append(x.panel);let S=`tasks`,C={enterprises:`街の復興事業`,breeding:`品種配合の実験台`,basket:`収穫かごと品質`,tasks:`街の目標`,saves:`農園の記録`,restoration:`掃除用具`,orders:`販売車の注文`,storage:`共同倉庫`,investments:`農園の設備`,crops:`この畑の作付け`,orchard:`果樹園`,kitchen:`加工台`,residents:`住人のお願い`,harbor:`港の仕事`};function w(e){return[`tasks`,`saves`,`basket`].includes(e)?!0:e===`enterprises`?!!i.enterprises.nearby(i):e===`breeding`?P(i.player,T):e===`restoration`?P(i.player,M):e===`orders`?P(i.player,n):e===`storage`?P(i.player,Ue)&&i.projects.has(`barn-open`):e===`kitchen`?P(i.player,p)&&i.investments.has(`kitchen`):e===`orchard`?P(i.player,se.sales)&&i.investments.has(`orchard`):e===`crops`?i.plots.some((e,t)=>i.isUnlocked(t)&&P(i.player,e,1.7)):e===`investments`?P(i.player,te)||N.some(e=>P(i.player,e)):e===`residents`?i.residentsArrived&&j.some(e=>i.projects.has(e.requires)&&P(i.player,e)):e===`harbor`&&i.agricultureComplete&&i.player.x>=23}function E(){b.querySelector(`[data-tab="${S}"]`)?.scrollIntoView({block:`nearest`,inline:`nearest`})}function O(e){S=e,b.querySelector(`#notebook-title`).textContent=C[S]??`農園`,b.querySelector(`.note-content`).scrollTop=0,S===`saves`&&(b.querySelector(`#play-journal`).innerHTML=qf(i.journal)),b.querySelectorAll(`[data-tab]`).forEach(e=>{e.setAttribute(`aria-selected`,String(e.dataset.tab===S)),e.tabIndex=e.dataset.tab===S?0:-1});for(let e of[`enterprises`,`crops`,`orders`,`harbor`,`kitchen`,`residents`,`saves`,`storage`,`orchard`,`basket`,`breeding`])b.querySelector(`#`+e+`-panel`).hidden=S!==e;b.querySelector(`#restoration-panel`).hidden=S!==`restoration`,b.querySelector(`#tasks-panel`).hidden=S!==`tasks`,b.querySelector(`#investments-panel`).hidden=S!==`investments`,b.open&&E()}function A(){b.querySelector(`#harbor-tab`).hidden=!i.agricultureComplete;let n=document.activeElement?.id;b.querySelector(`#breeding-panel`).innerHTML=k(i),b.querySelector(`#enterprises-panel`).innerHTML=Af(i),b.querySelector(`#basket-panel`).innerHTML=Wf(i),b.querySelector(`#tasks-panel`).innerHTML=Nf(i),b.querySelector(`#investments-panel`).innerHTML=`<p class="note-intro">かご ${i.inventory} / ${i.capacity}個 · 倉庫 ${i.stored} / ${i.storageCapacity}個<br>広げる、手作業を磨く、任せる。<br>どれを先に選んでも、ほかの投資をあとから組み合わせられます。</p><div class="investment-list">${He.filter(e=>N.some(t=>t.id===e.id&&P(i.player,t,4.2))).map(e=>{let t=i.investments.has(e.id),n=i.investmentReason(e.id,!0);return`<article class="investment-card ${t?`owned`:``}"><div class="investment-heading"><span class="investment-symbol" aria-hidden="true">${e.id===`expansion`?`▦`:e.id===`tools`?`✧`:e.id===`truck`?`▰`:`❧`}</span><h3>${e.title}</h3><span>${e.price} メニー</span></div><p>${e.detail}</p><small>${e.tradeoff}</small><p class="funding-detail">${n||`納付済み ${i.funding.paid[e.id]??0} / ${e.price} メニー。床のMマスで1秒止まると、3秒で納付します（足りない分は後から続けられます）。`}</p></article>`}).join(``)}</div>`,b.querySelector(`#investments-panel`).insertAdjacentHTML(`afterbegin`,Bf(i)+Pf(i));let a=b.querySelector(`#harvester-plot`);if(a&&(a.value=String(i.machinery.plots(i)[0]??-1)),b.querySelector(`#restoration-panel`).innerHTML=`<p class="note-intro">一か所ずつ、暮らしの戻る場所を増やそう。<br>片付けは無料。修理代は作業を終えたときに使います。仕事を選ぶと現地まで歩きます。長い修理は途中で離れても続きから再開できます。</p>${Le.filter(e=>!i.projects.has(e.id)&&(!e.requires||i.projects.has(e.requires))).map(n=>{let r=i.projectReason(n.id);return`<article class="investment-card ${i.projects.has(n.id)?`owned`:``}"><div class="investment-heading"><h3>${n.title}</h3><span>${n.cost?n.cost+` メニー`:`無料`}</span></div><p>${n.detail}</p><small>作業 ${n.seconds}秒${i.projectWork[n.id]?` · ${Math.floor(i.projectWork[n.id]*100)}%まで修理済み`:``}</small>${n.supplies?`<small>かごから ${e.filter(e=>n.supplies[e]>0).map(e=>t[e].name+` `+n.supplies[e]+`個`).join(` / `)}（完了時に渡します）</small>`:``}<button id="project-${n.id}" data-project="${n.id}" ${r?`disabled`:``}>${r||`ここへ歩いて作業する`}</button></article>`}).join(``)}`,b.querySelector(`#crops-panel`).innerHTML=`${Hf(i)}<p class="note-intro">種は無料です。育っている作物はそのままに、次の種まきから変更します。種まき機も、この作付けに従います。</p><div class="crop-guide">${e.map(e=>`<div><strong>${t[e].name}${i.cropUnlocked(e)?``:`（栽培未開始）`}</strong><small>${i.growSeconds(e)}秒で成長 · ${t[e].yield}個収穫<br>${Uf(i,e)}</small></div>`).join(``)}</div><div class="crop-plans">${i.plots.map((n,r)=>!i.isUnlocked(r)||!P(i.player,n,1.7)?``:`<label for="crop-${r}" class="crop-plan"><span><strong>${r>=15?`北の草原 · `:r>=9?`南の草地 · `:r>=6?`北の土地 · `:``}畑 ${r+1}</strong><small>${i.isUnlocked(r)?n.stage===`empty`?`次の種まきから`:t[n.crop].name+`を育てています`:`未購入`}</small></span><select id="crop-${r}" data-crop="${r}" ${i.isUnlocked(r)?``:`disabled`}>${e.map(e=>`<option value="${e}" ${i.cropUnlocked(e)?``:`disabled`} ${n.nextCrop===e?`selected`:``}>${t[e].name}</option>`).join(``)}</select></label>`).join(``)}</div>`,b.querySelector(`#orchard-panel`).innerHTML=Jf(i,v()),b.querySelector(`#orders-panel`).innerHTML=`${Yf(i)}<p class="note-intro">かごの中：${e.map(e=>t[e].name+` `+i.cargo[e]+`個`).join(` / `)}<br>通常出荷と注文、どちらに届けても構いません。注文に必要な分だけを渡します。</p>${i.investments.has(`truck`)?``:`<p class="order-hint">「農園への投資」で販売車を購入すると、ここへ配達できます。</p>`}${r.map(n=>{let r=i.order(n.id),a=i.orderReason(n.id);return`<article class="investment-card"><div class="investment-heading"><h3>${r.title}</h3><span>+${r.coins} メニー</span></div><p>${r.detail}</p><small>${e.filter(e=>r.needs[e]>0).map(e=>t[e].name+` `+r.needs[e]+`個`).join(` / `)}</small><button id="order-${n.id}" data-order="${n.id}" ${a?`disabled`:``}>${a||`販売車へ届ける`}</button></article>`}).join(``)}${Zf(i,!0)}<p class="note-intro">納品実績 ${i.orderCount}回。6回ごとに注文が大きくなります（最大3倍）。</p>`,i.projects.has(`barn-open`)){let n=document.createElement(`div`);n.className=`seeder-assignment`,n.innerHTML=`<h3>納屋の共同倉庫 · ${i.stored} / ${i.storageCapacity}</h3><p>必要な作物をかごに入れて、出荷や注文に使えます。受け渡しは納屋の前で行います。</p><button id="store-deposit" data-store="deposit" ${i.transferReason(`deposit`)?`disabled`:``}>${i.transferReason(`deposit`)||`かごの作物を預けに行く`}</button>${e.map(e=>`<p>${t[e].name} ${i.stock[e]}個 · ${Vf(i.stockQuality.peek(e))}</p><button id="store-${e}" data-store="${e}" ${i.transferReason(e)?`disabled`:``}>${i.transferReason(e)||t[e].name+`をかごへ（6個まで）`}</button>`).join(``)}`,b.querySelector(`#storage-panel`).replaceChildren(n)}b.querySelector(`#investments-panel`).insertAdjacentHTML(`afterbegin`,Ff(i)),b.querySelector(`#residents-panel`).innerHTML=Gf(i),b.querySelector(`#kitchen-panel`).innerHTML=Zf(i);let o=i.harbor;b.querySelector(`#harbor-panel`).innerHTML=`<div class="restoration-summary"><small>第2ステージ · 海産</small><strong>港の復興 ${o.percent}%</strong><p>農園の実りを、海で働く力へ。農園と住宅地にはいつでも戻れます。</p></div><button id="visit-harbor" class="harbor-travel">港へ向かう</button><p class="note-intro">水揚げ箱 ${o.fish} / ${Pe.capacity}匹 · 累計出荷 ${o.sold}匹<br>浜で止まると4秒で1匹。出荷は1匹${Pe.price}メニーです。</p><article class="investment-card"><h3>浜の網を片付ける</h3><p>まずは無料の片付けから。漁船がなくても漁を始められます。</p><button id="sea-nets" data-sea="nets" ${o.reason(`nets`,i)?`disabled`:``}>${o.reason(`nets`,i)||`浜へ向かう`}</button><button id="sea-fishing" data-fishing ${o.cleaned?``:`disabled`}>網を引く場所へ</button></article><article class="investment-card"><h3>桟橋を直す · 200メニー</h3><p>魚を12匹出荷したら、漁船を迎える準備を。</p><button id="sea-pier" data-sea="pier" ${o.reason(`pier`,i)?`disabled`:``}>${o.reason(`pier`,i)||`現地で修理する`}</button><button id="buy-boat" ${!o.pier||o.boat||i.coins<400?`disabled`:``}>${o.boat?`漁船を導入済み`:o.pier?i.coins<400?`漁船まであと`+(400-i.coins)+`メニー`:`400メニーで漁船を迎える`:`先に桟橋を直そう`}</button><p>漁船は8秒ごとに水揚げ。農園にいる間も働き、箱が満杯なら休みます。</p></article><div class="seeder-assignment"><h3>農園からの差し入れ</h3><p>倉庫の作物1個を使うと、1回の水揚げが1匹から2匹に。手作業も漁船も対象です。作物がない時は、使わずに1匹ずつ続けます。</p><label for="sea-supply">使う作物</label><select id="sea-supply"><option value="none">差し入れを休む</option>${e.map(e=>`<option value="${e}">${t[e].name}（倉庫 ${i.stock[e]}個）</option>`).join(``)}</select><p>これまでの差し入れ ${o.supplied}個</p></div>`,b.querySelector(`#sea-supply`).value=o.supply;let s=b.querySelector(`#seeder-plot`);s&&(s.value=String(i.seederPlot)),b.querySelector(`#play-journal`).innerHTML=qf(i.journal),n&&b.querySelector(`#${n}`)?.focus()}return b.querySelector(`.close-note`).addEventListener(`click`,()=>b.close()),b.addEventListener(`close`,()=>{x.reset(),o(!1)}),b.addEventListener(`click`,e=>{let t=e.target.closest(`button`);if(t&&!t.disabled){if(t.dataset.resident&&t.dataset.contribution){let e=i.requests.offer(t.dataset.resident,t.dataset.contribution,i);e&&(b.close(),o(!1),a(e))}if(t.dataset.breed){let e=D.find(e=>e.crop===t.dataset.breed);e&&i.breed(...e.parents)&&(c(i.message),i.message=``,A())}if(t.id===`task-records`&&O(`saves`),t.dataset.tab&&w(t.dataset.tab)&&O(t.dataset.tab),t.id===`visit-harbor`&&(b.close(),o(!1),s(Pe.entry)),t.id===`sea-fishing`&&(b.close(),o(!1),s(Pe.nets)),t.id===`buy-boat`&&i.harbor.buyBoat(i)&&(c(i.message),i.message=``,A()),t.dataset.tree!==void 0&&(b.close(),o(!1),s(ce(Number(t.dataset.tree)))),t.dataset.workTravel){let e=Of(i).flatMap(e=>e.options).find(e=>e.id===t.dataset.workTravel);e?.point&&(b.close(),o(!1),Le.some(t=>t.id===e.id)?l(e.id):s(e.point))}if(t.id===`orchard-sell`&&(b.close(),o(!1),y()),t.dataset.enterprise&&i.enterprises.donate(t.dataset.enterprise,t.dataset.donation,i)&&(c(i.message),i.message=``,A()),t.dataset.depotCrop&&i.transfer(t.dataset.depotCrop)&&(c(i.message),i.message=``,A()),t.id===`depot-deposit`&&i.transfer(`deposit`)&&(c(i.message),i.message=``,A()),t.dataset.food&&(b.close(),o(!1),m(t.dataset.food)),t.dataset.sea&&(b.close(),o(!1),f(t.dataset.sea)),t.dataset.store&&(b.close(),o(!1),d(t.dataset.store)),t.dataset.order&&(b.close(),o(!1),u(t.dataset.order)),t.dataset.project&&(b.close(),o(!1),l(t.dataset.project)),t.dataset.plot){let e=i.plots[Number(t.dataset.plot)];b.close(),o(!1),s({x:e.x,z:e.z+1.02})}}}),b.querySelector(`.note-tabs`).addEventListener(`keydown`,e=>{let t=e;if(![`ArrowLeft`,`ArrowRight`].includes(t.key))return;t.preventDefault();let n=[`tasks`,`crops`,`orders`,`restoration`,`investments`,`kitchen`,`residents`,`saves`,...i.agricultureComplete?[`harbor`]:[]];O(n[(n.indexOf(S)+(t.key===`ArrowRight`?1:n.length-1))%n.length]),b.querySelector(`[data-tab="${S}"]`).focus()}),b.addEventListener(`change`,e=>{let t=e.target;t.id===`helpers-enabled`&&(i.assignHelper(e.target.checked?i.plots.findIndex((e,t)=>i.isUnlocked(t)&&e.land===`tilled`):-1),A()),t.dataset.reserveCrop&&(i.courier.setReserve(t.dataset.reserveCrop,Number(t.value),i)||c(`残す数は0〜240個の整数で指定しよう。`),A()),t.id===`courier-enabled`&&(i.courier.configure(e.target.checked,i.courier.policy,i),A()),t.id===`courier-policy`&&(i.courier.configure(i.courier.enabled,t.value,i),A()),t.id===`kitchen-plan`&&(i.kitchen.setPlan(t.value,i),A()),t.id===`sea-supply`&&i.harbor.setSupply(t.value,i),t.id===`helper-plot`&&i.assignHelper(Number(t.value)),t.dataset.crop&&i.planCrop(Number(t.dataset.crop),t.value)}),{dialog:b,render:A,open:(e=`tasks`)=>{if(!w(e)){c(`${C[e]??`施設`}のそばまで歩いて利用しよう。`);return}o(!0),A(),O(e),b.showModal()}}}var $f={leaf:`<path d="M19 4C9 3 3 7 5 14c2 7 14 5 14-10Z"/><path d="m5 21 9-12M9 15l-1-5"/>`,coin:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M12 8v8m-2-7h4m-4 6h4"/>`,basket:`<path d="m3 10 2 10h14l2-10ZM7 10l5-7 5 7M9 13v4m6-4v4M2 10h20"/>`,arrow:`<path d="M5 12h14m-6-6 6 6-6 6"/>`,sun:`<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>`,home:`<path d="m3 10 9-7 9 7v11H3Zm6 11v-9h6v9M6 8h12"/>`},ep=e=>`<svg viewBox="0 0 24 24" aria-hidden="true">${$f[e]}</svg>`;document.querySelector(`#app`).innerHTML=`
  <canvas id="farm" aria-label="ひだまり農園。スワイプまたはドラッグで移動し、離すと止まります。キーボードのWASDまたは矢印キーでも移動できます。" tabindex="0"></canvas>
  <div id="movement-stick" hidden aria-hidden="true"><i></i></div>
  <div class="vignette"></div>
  <header class="topbar">
    <button id="menu-toggle" aria-expanded="false" aria-controls="farm-menu" aria-label="メニューを開く">☰ <span>メニュー</span></button>
    <div class="wallet" aria-label="所持メニー"><span class="coin">${ep(`coin`)}</span><div><small>メニー</small><strong id="coins">0</strong></div></div>
  </header>
  <nav id="farm-menu" class="farm-tools" aria-label="農園のメニュー" hidden>
    <h1>ひだまり農園</h1><div class="season"><span id="industry-label">第1ステージ：農業</span><span id="phase-label"></span></div>
    <button id="open-tasks">できる仕事・街の目標</button><button id="open-records">記録・セーブ</button>
    <button id="district-toggle">街の場所へ歩く</button><button id="pasture-toggle">農地へ歩く</button><button id="harbor-toggle" hidden>港へ歩く</button>
  </nav>
  <button id="open-investments" class="context-action" hidden>施設を使う</button>
  <button id="upgrade-nearby" class="world-label" hidden></button><button id="project-nearby" class="world-label" hidden></button>
  <button id="sea-marker" class="world-label" hidden>港の仕事</button>
  <div id="ground-notice" class="ground-notice" role="status" hidden>草むらで足が遅くなっています · 草を刈ると歩きやすくなります</div>
  <button id="ship-marker" class="world-label">${ep(`basket`)} 出荷する</button>
  <button id="truck-marker" class="world-label" hidden>注文を届ける</button>
  <button id="orchard-marker" class="world-label" hidden>果樹園</button>
  <button id="kitchen-marker" class="world-label" hidden>加工台</button>
  <button id="cottage-marker" class="world-label restoration-marker">住宅地の手入れ</button>
  <button id="restoration-marker" class="world-label restoration-marker">掃除用具</button><button id="storage-marker" class="world-label" hidden>共同倉庫</button><button id="workshop-marker" class="world-label">機械置き場</button><div id="payment" class="payment" hidden></div><div id="job-marker" class="world-label job-marker" hidden></div>
  <div id="action" class="action-label" hidden><span id="action-text"></span><div class="progress-track"><i id="action-fill"></i></div></div>
  <div id="toast" role="status" aria-live="polite"></div>
  <footer class="bottom-bar">
    <button id="quest-button" class="quest" aria-label="農園の仕事と復興を見る"><span class="quest-icon">${ep(`home`)}</span><div><small>人のいなくなった街に、もう一度暮らしを。</small><h2 id="quest-title">好きな畑から、片付けよう。</h2><p id="quest-description">草刈り → 耕作 → 種まき → 出荷</p><div class="quest-track"><i id="quest-fill"></i></div></div><span id="quest-count">0%</span></button>
    <button id="ship-button" class="basket-button"><span class="basket-icon">${ep(`basket`)}</span><span><small id="basket-title">収穫かご</small><strong><span id="inventory">0</span><em> / ${Ve.capacity}</em></strong><small id="cargo-summary"></small></span><span class="ship-action">かごを見る ${ep(`arrow`)}</span></button>
  </footer>

  <div id="loading" class="loading"><span class="loading-leaf">${ep(`leaf`)}</span><h2>農園に朝がやってきます</h2><p>草木と畑の準備をしています…</p></div>
`;var Q=e=>document.getElementById(e),tp=Q(`farm`),$=new Ze,np=Tf(new URL(`./`,document.baseURI).pathname),rp=!0;try{let e=localStorage.getItem(np);e&&$.restore(JSON.parse(e))}catch{rp=!1}var ip=0,ap=()=>{},op=performance.now();function sp(){ap();let e=$.save();if(ip){let t=Date.now()-ip;for(let n of e.plots)n.stage===`growing`&&(n.readyAt+=t);for(let n of e.orchard.trees)n.tended&&(n.readyAt+=t)}return e}function cp(){try{localStorage.setItem(np,JSON.stringify(sp())),op=performance.now()}catch{rp=!1}}var lp=0;function up(e){Q(`toast`).textContent=e,Q(`toast`).classList.add(`visible`),lp=performance.now()+4e3}async function dp(){let e=await wf(tp,$);Q(`loading`).remove();let t=new ae,r=Q(`movement-stick`);function i(){t.end(),r.hidden=!0,$.funding.reset()}let a=null,c=[],l=new tt,u=null,d=null,f=null,m=null,h=null,g=null,_=!1,v=null,x=null,S=!1,C=document.hasFocus(),w=()=>document.hidden||!C||$.player.x>=23?`excluded`:S?`notebook`:$.action===`walking`?`moving`:$.isWorking?`working`:`looking`,T=()=>[...$.shipped>0?[`shipment`]:[],...$.investments.size?[`investment`]:[],...[`seeder`,`helper`,`driver`,`harvester`].some(e=>$.investments.has(e))?[`automation`]:[],...[2,3,4].filter(e=>$.restorationPhase>=e).map(e=>`phase-${e}`),...$.agricultureComplete?[`complete`]:[]];$.journal.observe(T(),!0),ap=()=>{$.journal.sample(performance.now(),w()),$.journal.observe(T())},ap();for(let e of[`pointerdown`,`keydown`,`wheel`])document.addEventListener(e,()=>{$.journal.interact(performance.now(),w())},{capture:!0,passive:!0});addEventListener(`focus`,()=>{C=!0,ap()});function E(){x=null,a=null,c=[],d=null,f=null,m=null,h=null,g=null,_=!1,v=null}function D(e){S!==e&&(S=e,ap(),N.clear(),i(),E(),$.interrupt(),l.reset(performance.now()),e?ip=Date.now():O())}function O(){ip&&$.shiftGrowth(Date.now()-ip),ip=0,cp()}let k=document.createElement(`div`);k.id=`depot-shipping-marker`,k.className=`world-label`,k.textContent=`北の出荷箱`,document.querySelector(`#app`).append(k);for(let e of y){let t=document.createElement(`button`);t.id=`enterprise-`+e.id,t.className=`world-label`,t.textContent=e.title,t.addEventListener(`click`,()=>{ee(`enterprises`,e)}),document.querySelector(`#app`).append(t)}let A=Q(`farm-menu`),j=()=>{A.hidden=!0,Q(`menu-toggle`).setAttribute(`aria-expanded`,`false`)};Q(`menu-toggle`).addEventListener(`click`,()=>{A.hidden=!A.hidden,Q(`menu-toggle`).setAttribute(`aria-expanded`,String(!A.hidden)),N.clear(),i(),E()}),A.addEventListener(`click`,e=>{e.target.closest(`button`)&&j()});function ee(e,t){j(),P($.player,t,1.25)?ne.open(e):le(t)&&(x=e)}let ne=Qf({farm:$,visitResident:F,pause:D,navigate:le,notify:up,visitProject:ue,visitOrder:be,visitStore:ye,visitSea:ve,visitFood:me,snapshot:sp,importSave:de,importBackup:()=>localStorage.getItem(np+`:before-import`),now:()=>ip||Date.now(),visitOrchardSale:I});Q(`open-tasks`).addEventListener(`click`,()=>{ne.open($.player.x>=23?`harbor`:`tasks`)}),Q(`quest-button`).addEventListener(`click`,()=>{ne.open($.player.x>=23?`harbor`:`tasks`)}),Q(`open-investments`).addEventListener(`click`,()=>{{let e=ie($);e?ee(e.id,e):up(`掃除用具・畑・販売車など、使う場所へ近づこう。`)}}),Q(`upgrade-nearby`).addEventListener(`click`,()=>{let e=re($).sort((e,t)=>Je($.player,e)-Je($.player,t))[0];e&&le(e)}),Q(`project-nearby`).addEventListener(`click`,()=>{let e=Q(`project-nearby`).dataset.project;if(e){let t=$.projectReason(e);t?up(t):ue(e)}}),Q(`open-records`).addEventListener(`click`,()=>{ne.open(`saves`)}),Q(`storage-marker`).addEventListener(`click`,()=>ee(`storage`,Ue)),Q(`workshop-marker`).addEventListener(`click`,()=>ee(`investments`,te));let N=new Set,oe=[`w`,`a`,`s`,`d`,`arrowup`,`arrowleft`,`arrowdown`,`arrowright`];addEventListener(`keydown`,e=>{S||!oe.includes(e.key.toLowerCase())||e.ctrlKey||e.metaKey||e.altKey||(e.preventDefault(),i(),N.add(e.key.toLowerCase()),E(),$.interrupt(),l.advance(performance.now(),!1,we))}),addEventListener(`keyup`,e=>{N.delete(e.key.toLowerCase())&&l.advance(performance.now(),S||document.hidden,we)});function ce(){N.clear(),i(),E(),$.interrupt(),l.reset(performance.now()),cp()}addEventListener(`blur`,()=>{C=!1,ap(),ce()}),addEventListener(`pagehide`,()=>{C=!1,ap(),ce()}),document.addEventListener(`visibilitychange`,()=>{ap(),l.reset(performance.now()),document.hidden&&ce()});function le(e){if(S)return!1;l.advance(performance.now(),document.hidden,we);let t={x:Math.max(_e.minX+.2,Math.min(_e.maxX-.2,e.x)),z:Math.max(_e.minZ+.2,Math.min(_e.maxZ-.2,e.z))};if(!$.canStand(t))return up(`建物や海を避けて、地面を選ぼう。`),!1;let n=pe($.player,t,e=>$.canStand(e),_e);return n?(E(),c=n,a=c.shift()??null,a&&$.interrupt(),tp.focus({preventScroll:!0}),!0):(up(`そこへ続く道が見つかりません。`),!1)}tp.addEventListener(`pointerdown`,e=>{e.button===0&&!S&&t.begin(e.pointerId,e.clientX,e.clientY)&&(e.preventDefault(),j(),E(),N.clear(),$.interrupt(),l.advance(performance.now(),document.hidden,we),tp.setPointerCapture(e.pointerId),tp.focus({preventScroll:!0}))}),tp.addEventListener(`pointermove`,e=>{t.pointer===e.pointerId&&(t.move(e.pointerId,e.clientX,e.clientY),l.advance(performance.now(),S||document.hidden,we),r.hidden=Math.hypot(t.offset.x,t.offset.y)<=8,r.style.left=`${t.origin.x}px`,r.style.top=`${t.origin.y}px`,r.firstElementChild.setAttribute(`style`,`transform:translate(${t.offset.x}px,${t.offset.y}px)`),$.journal.interact(performance.now(),w()),e.preventDefault())});for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])tp.addEventListener(e,e=>{t.pointer===e.pointerId&&(i(),l.advance(performance.now(),S||document.hidden,we))});document.addEventListener(`touchcancel`,i,{passive:!0}),tp.addEventListener(`contextmenu`,e=>e.preventDefault()),document.addEventListener(`selectstart`,e=>{(e.target instanceof Element?e.target:e.target?.parentElement)?.closest(`input,textarea`)||e.preventDefault()});function F(e){$.requests.deliver(e,$)||up(`住人のそばで、必要な品を渡そう。`)}function ue(e){let t=$.projectReason(e);if(t){up(t);return}le(Re(e))&&(u=e,d=e,up(`仕事の場所へ向かっています。`))}function de(e){let t=new Ze;if(!t.restore(e))throw Error(`Invalid farm`);et(localStorage,np,sp(),t.save()),$.restore(t.save()),$.journal.observe(T(),!0),$.player={...ge},N.clear(),i(),E(),$.interrupt(),l.reset(performance.now()),ip=Date.now(),rp=!0}let fe=()=>$.investments.has(`orchard`)&&$.player.x>9&&$.player.x<23&&$.player.z>2.4;function I(){$.orchard.sell($)||up(`果樹園の集荷箱のそばで出荷しよう。`)}function me(e){$.kitchen.deliver(e,$)||up($.kitchen.deliveryReason(e,$)||`届け先のそばまで歩こう。`)}function ve(e){$.harbor.start(e,$)||up($.harbor.reason(e,$)||`浜へ近づこう。`)}function ye(e){$.transfer(e)||up($.transferReason(e)||`共同倉庫のそばで受け渡ししよう。`)}function be(e){$.deliver(e)||up($.orderReason(e)||`販売車のそばで届けよう。`)}Q(`orchard-marker`).addEventListener(`click`,()=>ee(`orchard`,se.sales)),Q(`kitchen-marker`).addEventListener(`click`,()=>ee(`kitchen`,p)),Q(`pasture-toggle`).addEventListener(`click`,()=>le(ge)),Q(`harbor-toggle`).addEventListener(`click`,()=>le(Pe.entry)),Q(`sea-marker`).addEventListener(`click`,()=>ee(`harbor`,Pe.sales)),Q(`district-toggle`).addEventListener(`click`,()=>le(he)),Q(`truck-marker`).addEventListener(`click`,()=>ee(`orders`,n)),Q(`cottage-marker`).addEventListener(`click`,()=>{$.residentsArrived?ee(`residents`,he):ee(`restoration`,M)}),Q(`restoration-marker`).addEventListener(`click`,()=>ee(`restoration`,M)),Q(`ship-button`).addEventListener(`click`,()=>{ne.open(`basket`)}),Q(`ship-marker`).addEventListener(`click`,()=>{if(fe()){I();return}le($.player.x>=23?Pe.sales:We)});let L=performance.now(),xe=0,Se=-1,Ce=0,R=(...e)=>+!!e.some(e=>N.has(e));function we(n){let r=R(`d`,`arrowright`)-R(`a`,`arrowleft`),i=R(`w`,`arrowup`)-R(`s`,`arrowdown`),o=t.pointer===null?{x:r*.8575-i*.5145,z:-r*.5145-i*.8575}:t.input;for(;a&&Je($.player,a)<.075;)a=c.shift()??null;if(a){let e=Je($.player,a),t=Math.min(1,e/(Ve.speed*n));o={x:(a.x-$.player.x)/e*t,z:(a.z-$.player.z)/e*t}}if(x&&!a){let e=x;x=null,ne.open(e);return}d&&!a&&($.startProject(d)||up($.projectReason(d)||`仕事の場所へ近づこう。`),d=null),f&&!a&&($.deliver(f)||up($.orderReason(f)||`販売車へ近づこう。`),f=null),m&&!a&&($.transfer(m)||up($.transferReason(m)||`納屋へ近づこう。`),m=null),h&&!a&&($.harbor.start(h,$)||up($.harbor.reason(h,$)||`浜へ近づこう。`),h=null),g&&!a&&($.kitchen.deliver(g,$)||up($.kitchen.deliveryReason(g,$)||`届け先へ近づこう。`),g=null,_=!1,v=null),_&&!a&&($.orchard.sell($)||up(`集荷箱へ近づこう。`),_=!1),v&&!a&&($.requests.deliver(v,$)||up(`届ける品が変わりました。住人のお願いで、もう一度選ぼう。`),v=null),u&&$.projects.has(u)&&(u=null),u&&!$.isWorking&&Math.hypot(o.x,o.z)<=.08&&P($.player,Re(u),Ve.range)&&$.startProject(u);let s={...$.player};$.step(n,o,Date.now());let l=Je(s,$.player);a&&l<1e-4?(Ce+=n,Ce>.3&&(E(),Ce=0,up(`ここからは進めません。近くの地面を選ぼう。`))):Ce=0;let p=$.movementFactor()<1?`草むらで足が遅くなっています · 草を刈ると歩きやすくなります`:$.blockedWorkReason;if(Q(`ground-notice`).hidden=!p||S,Q(`ground-notice`).textContent=p,$.action===`walking`)e.farmer.root.rotation.y=Math.atan2($.player.x-s.x,$.player.z-s.z);else if($.workPoint){let t=$.workPoint;e.farmer.root.rotation.y=Math.atan2(t.x-$.player.x,t.z-$.player.z)}}function z(t){let r=Math.max(0,Math.min((t-L)/1e3,.5));L=t,xe+=r,l.advance(t,S||document.hidden,we),ap(),t-op>15e3&&cp();let i=c.length?c[c.length-1]:a;e.update(Math.min(r,.1),xe,ip||Date.now(),i,!1);let d=$.player.x>=23;Q(`industry-label`).textContent=d?`第2ステージ：海産`:`第1ステージ：農業`,Q(`harbor-toggle`).hidden=!$.agricultureComplete,Q(`basket-title`).textContent=d?`水揚げ箱`:fe()?`果樹園の箱`:`収穫かご`,Q(`ship-button`).querySelector(`em`).textContent=` / ${d?Pe.capacity:fe()?se.capacity:$.capacity}`,Q(`inventory`).textContent=String(d?$.harbor.fish:fe()?$.orchard.box:$.inventory),Q(`cargo-summary`).textContent=d?`魚 ${$.harbor.fish}匹 · 出荷${$.harbor.sold}匹`:fe()?`リンゴ ${$.orchard.fruit.apple} · ナシ ${$.orchard.fruit.pear}`:`コーン ${$.cargo.corn} · カブ ${$.cargo.turnip}${$.investments.has(`pumpkin-seeds`)?` · カボチャ ${$.cargo.pumpkin}`:``}${$.hybrids.has(`kabumorokoshi`)?` · 配合 ${$.cargo.kabumorokoshi}`:``}`;let f=e.screenPoint(se.sales,1);Q(`orchard-marker`).style.left=`${f.x}px`,Q(`orchard-marker`).style.top=`${f.y}px`,Q(`orchard-marker`).hidden=!$.investments.has(`orchard`);let m=e.screenPoint(p,1.8);Q(`kitchen-marker`).style.left=`${m.x}px`,Q(`kitchen-marker`).style.top=`${m.y}px`,Q(`kitchen-marker`).hidden=!$.investments.has(`kitchen`),Q(`kitchen-marker`).textContent=$.kitchen.progress>0?`食品を加工中`:`加工台`;let h=e.screenPoint(Pe.sales,1.4);Q(`sea-marker`).style.left=`${h.x}px`,Q(`sea-marker`).style.top=`${h.y}px`,Q(`sea-marker`).hidden=!$.agricultureComplete,Q(`phase-label`).textContent=d?$.harbor.pier?`漁の戻る港`:$.harbor.cleaned?`網を引く浜`:`忘れられた浜`:`${$.restorationPhase}/5 · ${Be[$.restorationPhase-1]}`;let g=d?$.harbor.percent:$.restorationPercent;Q(`quest-count`).textContent=`${g}%`,Q(`quest-fill`).style.width=`${g}%`,Q(`pasture-toggle`).textContent=`農地へ歩く`,Q(`pasture-toggle`).hidden=d,Q(`district-toggle`).textContent=`街の場所へ歩く`;let _=e.screenPoint(We,.92);Q(`ship-marker`).style.left=`${_.x}px`,Q(`ship-marker`).style.top=`${_.y}px`;let v=e.screenPoint(n,1.8);Q(`truck-marker`).style.left=`${v.x}px`,Q(`truck-marker`).style.top=`${v.y}px`,Q(`truck-marker`).hidden=!$.investments.has(`truck`);let x=e.screenPoint({x:14.5,z:.2},1.2);Q(`cottage-marker`).style.left=`${x.x}px`,Q(`cottage-marker`).style.top=`${x.y}px`,Q(`cottage-marker`).hidden=!1;let C=e.screenPoint(M,1.3);Q(`restoration-marker`).style.left=`${C.x}px`,Q(`restoration-marker`).style.top=`${C.y}px`,Q(`restoration-marker`).hidden=!1;for(let[t,n]of[[`storage-marker`,Ue],[`workshop-marker`,te]]){let r=e.screenPoint(n,1.3);Q(t).style.left=`${r.x}px`,Q(t).style.top=`${r.y}px`,Q(t).hidden=t===`storage-marker`&&!$.projects.has(`barn-open`)}let w=e.screenPoint(b,.7);k.style.left=w.x+`px`,k.style.top=w.y+`px`,k.hidden=$.enterprises.level(`depot`)<3||Je($.player,b)>12;for(let t of y){let n=e.screenPoint(t,.8),r=Q(`enterprise-`+t.id);r.style.left=n.x+`px`,r.style.top=n.y+`px`,r.hidden=S||Je($.player,t)>12,r.textContent=t.title+` · `+$.enterprises.level(t.id)+`/3`}let T=ie($);Q(`open-investments`).hidden=!T||S||!A.hidden,Q(`open-investments`).textContent=T?T.title+` →`:`施設を使う`;let E=[[`ship-marker`,We,$.inventory>0,`出荷する`],[`truck-marker`,n,$.investments.has(`truck`),`注文を届ける`],[`orchard-marker`,se.sales,$.investments.has(`orchard`),`果実を出荷・手入れ`],[`kitchen-marker`,p,$.investments.has(`kitchen`),`料理をつくる`],[`storage-marker`,Ue,$.projects.has(`barn-open`),`作物を預ける・受け取る`],[`restoration-marker`,M,!0,`掃除・修理を選ぶ`],[`workshop-marker`,te,$.expertise.best>=1||$.investments.size>0,$.expertise.best===1?`Cランクの収穫で自動化を解放`:`設備を確認・強化`],[`cottage-marker`,he,$.projects.has(`cottage-yard`),`家の修理・住人のお願い`],[`sea-marker`,Pe.sales,$.agricultureComplete,`港の仕事`]],D=E.filter(([,e,t])=>t&&Je($.player,e)<3.8).sort((e,t)=>Je($.player,e[1])-Je($.player,t[1]))[0];for(let[e,,t,n]of E)Q(e).hidden=S||!A.hidden||!t||D?.[0]!==e,Q(e).textContent=n;k.hidden=S||$.enterprises.level(`depot`)<3||Je($.player,b)>3.8;for(let e of y){let t=Q(`enterprise-`+e.id),n=$.enterprises.reason(e.id,$);t.hidden=S||!A.hidden||Je($.player,e)>3.8||!!n,t.textContent=e.title+` · `+($.enterprises.level(e.id)===3?`復興済み`:`復興の仕事を見る`)}let O=re($).sort((e,t)=>Je($.player,e)-Je($.player,t))[0],j=Q(`upgrade-nearby`);if(j.hidden=S||!A.hidden||!O||Je($.player,O)>2.6||!!$.paymentPad||$.coins<=0,O){let t=He.find(e=>e.id===O.id),n=e.screenPoint(O,1);j.style.left=n.x+`px`,j.style.top=n.y+`px`,j.textContent=t.title+` · `+(t.price-($.funding.paid[t.id]??0)).toLocaleString()+`メニー`}let ee=Le.filter(e=>!$.projects.has(e.id)&&(!e.requires||$.projects.has(e.requires))).sort((e,t)=>Je($.player,e)-Je($.player,t))[0],N=Q(`project-nearby`);if(N.hidden=S||!A.hidden||!ee||Je($.player,ee)>3.2||$.isWorking,ee){let t=e.screenPoint(ee,1);N.style.left=t.x+`px`,N.style.top=t.y+`px`,N.dataset.project=ee.id,N.textContent=ee.title+` · `+($.projectReason(ee.id)||`ここへ歩いて作業`)}if(!N.hidden||!j.hidden)for(let[e]of E)Q(e).hidden=!0;let P=[...document.querySelectorAll(`.world-label`)].filter(e=>!e.hidden&&e.id!==`job-marker`);if(P.length>1){let e=N.hidden?j.hidden?P[0]:j:N;for(let t of P)t.hidden=t!==e}for(let e of P.filter(e=>!e.hidden)){let t=e.offsetWidth/2+12;e.style.left=Math.max(t,Math.min(innerWidth-t,parseFloat(e.style.left)||innerWidth/2))+`px`,e.style.top=Math.max(150,Math.min(innerHeight-175,parseFloat(e.style.top)||150))+`px`}let ae=e.screenPoint($.player,1.6),oe=e.screenPoint($.player,0);for(let e of P.filter(e=>!e.hidden)){let t=e.getBoundingClientRect();t.left<oe.x+28&&t.right>oe.x-28&&t.bottom>ae.y&&t.top<oe.y&&(e.style.top=Math.max(150,ae.y-14)+`px`)}P.some(e=>!e.hidden)&&(Q(`open-investments`).hidden=!0);let ce=$.paymentPad;if(Q(`payment`).hidden=S||!ce,ce){let e=He.find(e=>e.id===ce.id);Q(`payment`).textContent=`${e.title} · ${$.funding.paid[e.id]??0} / ${e.price} メニー${$.coins===0?` · メニー不足。続きは後から納付できます`:$.funding.dwell<1?` · 1秒止まると納付`:` · 納付中（移動で停止）`}`}if(Q(`job-marker`).hidden=!0,u){let t=Re(u),n=e.screenPoint(t,1.5);Q(`job-marker`).style.left=`${n.x}px`,Q(`job-marker`).style.top=`${n.y}px`,Q(`job-marker`).textContent=t.title}let le=Q(`action`);if(le.hidden=S||!$.isWorking,$.isWorking){let t=e.screenPoint($.player,1.8);le.style.left=`${t.x}px`,le.style.top=`${t.y}px`,Q(`action-text`).textContent=Ye[$.action]+($.action===`harvesting`?` · ${s[$.harvestGrade($.plots[$.active].crop)]}見込み`:$.action===`picking`?` · ${s[$.harvestGrade(o($.orchard.active))]}見込み`:``),Q(`action-fill`).style.width=`${Math.min(100,$.progress*100)}%`}$.message&&=(up($.message),``),Q(`quest-title`).textContent=d?`港の復興`:$.agricultureComplete?`実りを次の街へ`:`農園と街の復興`,Q(`quest-description`).textContent=d?`浜の片付け → 漁 → 出荷 → 桟橋と漁船`:$.agricultureComplete?`農業地区の復興、達成！ 実りを次の街へ。`:`仕事は掃除用具へ · 設備は床のMマスへ`,t>lp&&Q(`toast`).classList.remove(`visible`),Se!==$.revision&&(Se=$.revision,cp(),Q(`coins`).textContent=$.coins.toLocaleString(`ja-JP`),S&&ne.render()),requestAnimationFrame(z)}requestAnimationFrame(z),rp||up(`このブラウザーでは保存を利用できません。`)}dp().catch(e=>{console.error(e),Q(`loading`).innerHTML=`<h2>農園を開けませんでした</h2><p>ブラウザーの再読み込みをお試しください。</p><button id="retry">もう一度開く</button>`,Q(`retry`).addEventListener(`click`,()=>location.reload())});