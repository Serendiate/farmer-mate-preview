(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function e(e=localStorage){return{async read(t){return e.getItem(t)},async write(t,n){e.setItem(t,n)}}}var t=class{available=!0;#e;#t=Promise.resolve();#n=0;constructor(t=e()){this.#e=t}async read(e){try{return await this.#e.read(e)}catch{return this.available=!1,null}}write(e,t){let n=()=>{try{return this.#e.write(e,t)}catch(e){return Promise.reject(e)}},r=this.#n?this.#t.then(n):n();return this.#n++,this.#t=r.then(()=>{this.available=!0},()=>{this.available=!1}).finally(()=>{this.#n--}),r}};function n(e,n,r,i){let a=new t,o=document.createElement(`dialog`);o.className=`notebook keepsakes`,o.setAttribute(`aria-label`,`復興アルバムと音`);let s=[],c=``,l=!1,u=``,d=.35,f=!1,p,m=-1,h=n+`:sound`,g=n+`:album`;a.read(h).then(e=>{try{let t=JSON.parse(e??`null`);t&&typeof t.muted==`boolean`&&Number.isFinite(t.volume)&&t.volume>=0&&t.volume<=1&&(d=t.volume,f=t.muted)}catch{}}),document.addEventListener(`pointerdown`,e=>{try{p??=new AudioContext,p.resume().catch(()=>{}),e.target.closest(`[data-next]`)&&_(0)}catch{}},{passive:!0});function _(e){if(!p||p.state!==`running`||f||d===0)return;let t=p.currentTime;for(let n=0;n<(e===2?3:2);n++){let r=p.createOscillator(),i=p.createGain();r.type=e===0?`sine`:`triangle`,r.frequency.value=[440,660,523][e]*[1,1.25,1.5][n],i.gain.setValueAtTime(0,t+n*.08),i.gain.linearRampToValueAtTime(d*.09,t+n*.08+.012),i.gain.exponentialRampToValueAtTime(1e-4,t+n*.08+.2),r.connect(i),i.connect(p.destination),r.start(t+n*.08),r.stop(t+n*.08+.22),r.onended=()=>{r.disconnect(),i.disconnect()}}}let v=e.expertise.people.player,y=e.shipped,b=e.projects.size+e.episodes.finished+Number(e.episodes.festival)+e.restorationPhase;function x(){o.innerHTML=`<header class="notebook-heading"><h2>復興アルバムと音</h2><button class="close-note" aria-label="閉じる">×</button></header><div class="note-content"><section><h3>農園の音</h3><label><input id="sound-muted" type="checkbox" ${f?`checked`:``}> 効果音を消す</label><label for="sound-volume">音量 <output>${Math.round(d*100)}%</output></label><input id="sound-volume" aria-label="効果音の音量" type="range" min="0" max="100" value="${Math.round(d*100)}"><button id="sound-test">音を確かめる</button></section><section><h3>暮らしが戻った日の景色</h3><p>実際に到達した復興度を、同じ場所から記録します。過ぎた段階の写真は作りません。写真はこの端末だけに保存され、農園の引き継ぎファイルには含まれません。</p><p role="status">${u}</p>${s.length?s.map(e=>`<figure><img src="${e.image}" alt="実際の農園・復興度${e.stage}%の記録"><figcaption>復興度 ${e.stage}% · この街で過ごした日</figcaption></figure>`).join(``):`<p>農園を歩き始めると、最初の写真が残ります。</p>`}</section></div>`,o.querySelector(`.close-note`).addEventListener(`click`,()=>o.close()),o.querySelector(`#sound-test`).addEventListener(`click`,()=>_(2)),o.querySelector(`#sound-muted`).addEventListener(`change`,e=>{f=e.target.checked,S()}),o.querySelector(`#sound-volume`).addEventListener(`input`,e=>{d=Number(e.target.value)/100,o.querySelector(`output`).textContent=Math.round(d*100)+`%`,S()})}function S(){a.write(h,JSON.stringify({muted:f,volume:d})).catch(()=>{u=`この端末に音の設定を保存できませんでした。`})}return o.addEventListener(`close`,()=>{o.remove(),i(!1)}),{open(){i(!0),x(),document.querySelector(`#app`).append(o),o.showModal()},tick(){let t=e.projects.size+e.episodes.finished+Number(e.episodes.festival)+e.restorationPhase;t>b?_(2):e.expertise.people.player>v?_(0):e.shipped>y&&_(1),v=e.expertise.people.player,y=e.shipped,b=t;let n=e.episodes.memoryId;if(c!==n){if(l)return;c=n,s=[],u=``,m=-1,l=!0,a.read(g).then(e=>{try{let t=JSON.parse(e??`null`);t?.id===n&&Array.isArray(t.photos)&&t.photos.length<=6&&(s=t.photos.filter(e=>Number.isInteger(e.stage)&&e.stage>=0&&e.stage<=100&&e.stage%20==0&&typeof e.image==`string`&&e.image.length<18e4&&/^data:image\/jpeg;base64,[a-zA-Z0-9+/=]+$/.test(e.image)))}catch{}}).finally(()=>{l=!1});return}if(l||!n)return;let i=Math.floor(e.restorationPercent/20)*20;if(!(i===m||s.some(e=>e.stage>=i)))try{let e=r();if(e===null)return;if(e.length>=18e4)throw Error(`Photo too large`);s.push({stage:i,image:e}),s=s.slice(-6),l=!0,a.write(g,JSON.stringify({id:n,photos:s})).catch(()=>{u=`写真を保存できませんでした。農園の記録は別に保存されます。`}).finally(()=>{l=!1})}catch{m=i,u=`この端末では写真を撮影できませんでした。`}}}}function r(e){return[...e.replace(/[\u0000-\u001f\u007f]/g,``).trim()].slice(0,20).join(``)}function i(e,t){let n=document.createElement(`dialog`);n.className=`story-dialog name-dialog`,n.setAttribute(`aria-label`,`主人公の名前`),n.innerHTML=`<form><h2>あなたの名前は？</h2><p>物語の中で、この名前を使います。</p><label for="player-name">名前（20文字まで）</label><input id="player-name" name="player-name" autocomplete="off" maxlength="40" required placeholder="名前を入力"><p class="name-error" role="status"></p><div class="story-controls"><button type="button" data-default>主人公ではじめる</button><button type="submit">この名前で進む</button></div></form>`;let i=n.querySelector(`input`);i.value=e===`主人公`?``:e;let a=e=>{n.close(),n.remove(),t(e)};n.querySelector(`form`).addEventListener(`submit`,e=>{e.preventDefault();let t=r(i.value);t?a(t):n.querySelector(`.name-error`).textContent=`名前を入力してください。`}),n.querySelector(`[data-default]`).addEventListener(`click`,()=>a(e||`主人公`)),n.addEventListener(`cancel`,e=>e.preventDefault()),document.body.append(n),n.showModal()}function a(e,t,n,r=()=>`主人公`){let i=document.createElement(`dialog`);i.className=`story-dialog`,i.setAttribute(`aria-label`,`街の物語`),i.innerHTML=`<div class="story-portrait" hidden><img alt=""></div><div class="story-speech" aria-live="polite"><small></small><h2></h2><p></p></div><div class="story-controls"><button data-skip>閉じる</button><button data-next>次へ</button></div>`;let a=()=>{let t=e(),n=t.current,a=n?.lines[t.active?.line??0];if(!n||!a)return;i.querySelector(`small`).textContent=`${n.title} · ${(t.active?.line??0)+1}/${n.lines.length}`;let o=a.speaker===`{player}`?r()||`主人公`:a.speaker;i.classList.toggle(`story-paper`,!!a.paper),i.querySelector(`h2`).textContent=o,i.querySelector(`p`).textContent=a.text;let s=i.querySelector(`img`),c=i.querySelector(`.story-portrait`);c.hidden=!a.portrait,a.portrait&&(s.src=`./`+a.portrait,s.alt=o),i.querySelector(`[data-next]`).textContent=t.active.line===n.lines.length-1?`読み終える`:`次へ`},o=()=>i.open||!e().active&&e().cooldownSeconds>0||!e().next()?!1:(t(!0),a(),document.body.append(i),i.showModal(),n(),!0);return i.querySelector(`[data-next]`).setAttribute(`autofocus`,``),i.querySelector(`[data-next]`).addEventListener(`click`,()=>{e().advance()?a():i.close(),n()}),i.querySelector(`[data-skip]`).addEventListener(`click`,()=>{e().finish(),i.close(),n()}),i.addEventListener(`cancel`,()=>{e().finish(),n()}),i.addEventListener(`close`,()=>{i.remove(),t(!1)}),{show:o,replay(t){e().replay(t)&&o()}}}var o=(e,t)=>({x:e,z:t}),s=(e,t,n,r)=>({x:e,z:t,halfX:n,halfZ:r}),c={festival:o(24,3.8),festivalSign:o(24,6.6),sign:o(26,3.3),barn:s(-5,-2.2,1.6,1.7),store:o(-5.5,.3),shipping:o(-3.9,1.3),cottage:s(18,-3,1.6,1.6),neighborhood:o(18.5,-.8),family:o(20,-.2),market:o(-6.5,1),cooperative:o(-2.2,-.4),well:o(14,0),canteen:o(24,-1.5),depot:o(-5,-11.2),"seed-garden":o(12,-11.5),"harbor-link":o(29,1.2),"depot-sales":o(-5,-8.2),cleaning:o(-1.3,3.9),workshop:o(8.5,.8),breeding:o(10.5,-7.6),truck:o(-2.8,4.8),kitchen:o(-7.3,1.4),orchard:o(12.6,2.8),pasture:o(3.3,7.2),"farm-return":o(-.6,2.5),"lane-west":o(-5.8,2.2),"lane-east":o(4.7,4.9),fence:o(-6.8,4.3),"town-orchard":o(17,4),"harbor-entry":o(34,3),"harbor-nets":o(36.5,6),"harbor-sales":o(34,.5),"harbor-pier":o(36.8,3),"harbor-shed":s(34.5,-2.7,1.4,1.8),"harbor-boat":o(39.5,5.5)},l={minX:-9,maxX:43,minZ:-22,maxZ:15.5},u={districtX:31,waterX:37.5,pierMinZ:2,pierMaxZ:4},d=e=>e.x>9&&e.x<23.5&&e.z>2.4&&e.z<9,f=e=>e.x>=u.districtX,p=[c.barn,c.cottage,c[`harbor-shed`]],m=(e,t)=>Math.abs(e.x-t.x)<t.halfX&&Math.abs(e.z-t.z)<t.halfZ,h={"lane-west":c[`lane-west`],"lane-east":c[`lane-east`],"barn-walls":c.store,"barn-roof":c.store,fence:c.fence,"barn-open":c.store,"cottage-yard":c.neighborhood,"cottage-repair":c.neighborhood,"cottage-welcome":c.neighborhood,"town-well":c.well,"town-orchard":c[`town-orchard`],"town-market":c.store,"town-pantry":c.neighborhood},g=[[{x:-8,z:5},c.shipping,{x:-2,z:2.2},{x:9,z:3},c.orchard,{x:18.5,z:2.5},{x:24,z:2.5},c[`harbor-link`],c[`harbor-entry`],c[`harbor-pier`]],[{x:-2,z:2.2},{x:-2,z:-21}],[c.depot,{x:-2,z:-11.2}],[{x:-2,z:2.2},{x:-2,z:10.6},{x:7.8,z:10.6}],[{x:9,z:3},c.well,c.neighborhood,c.family,{x:24,z:2.5},c.canteen],[{x:9,z:3},{x:11.8,z:-5},c.breeding,c[`seed-garden`]],[c[`harbor-entry`],c[`harbor-sales`]],[c[`harbor-entry`],c[`harbor-nets`]],[{x:18.5,z:2.5},{x:24,z:7.5},{x:29,z:7.5},{x:29,z:1.2}],[{x:7.8,z:10.6},{x:10.5,z:10.6},{x:14,z:8.5},{x:24,z:7.5}]],_=[{x:.5,z:-3.5},{x:3.3,z:-3.5},{x:6.1,z:-3.5},{x:.5,z:-.4},{x:3.3,z:-.4},{x:6.1,z:-.4},{x:.5,z:-6.6},{x:3.3,z:-6.6},{x:6.1,z:-6.6},{x:.5,z:9.1},{x:3.3,z:9.1},{x:6.1,z:9.1},{x:.5,z:12.2},{x:3.3,z:12.2},{x:6.1,z:12.2},{x:.5,z:-9.7},{x:3.3,z:-9.7},{x:6.1,z:-9.7},{x:.5,z:-12.8},{x:3.3,z:-12.8},{x:6.1,z:-12.8},{x:.5,z:-15.9},{x:3.3,z:-15.9},{x:6.1,z:-15.9},{x:.5,z:-19},{x:3.3,z:-19},{x:6.1,z:-19}],v=[{ids:[`expansion`],x:-3.4,z:-8.3},{ids:[`north-meadow`],x:-3.4,z:-11.2},{ids:[`north-ridge`],x:-3.4,z:-17.4},{ids:[`pasture`],x:-3.4,z:7.2},{ids:[`harvester`,`harvester-precision`,`harvester-premium`],x:9.5,z:-4.8},{ids:[`harvester-second`,`harvester-second-precision`,`harvester-second-premium`],x:8.4,z:7.3},{ids:[`harvester-third`,`harvester-third-precision`,`harvester-third-premium`],x:9.5,z:-11.2},{ids:[`breeding`],x:9.5,z:-8.3},{ids:[`breeding-a`,`breeding-s`],x:11,z:-8.3},{ids:[`tools`],x:-.5,z:5},{ids:[`basket`],x:1.5,z:5},{ids:[`truck`,`driver`],x:-2.8,z:6.1},{ids:[`seeder`,`seeder-area`],x:8.4,z:-2},{ids:[`seeder-second`],x:8.4,z:5.3},{ids:[`seeder-third`],x:8.4,z:-13.2},{ids:[`pumpkin-seeds`],x:8.4,z:-6.4},{ids:[`helper`,`helper-area`],x:4.7,z:6.1},{ids:[`warehouse`],x:-7.7,z:.3},{ids:[`kitchen`],x:-7.7,z:2.2},{ids:[`orchard`,`pear-grove`],x:19,z:5.3}],y=[{x:11.2,z:5},{x:14.1,z:5.2},{x:17,z:5.5},{x:20,z:4.8},{x:22.2,z:3.5}],b=[{id:`lane-west`,title:`出荷道の草を片付ける`,detail:`木箱へ続く道を、歩きやすく。`,...h[`lane-west`],seconds:3,cost:0,kind:`cleaning`},{id:`lane-east`,title:`畑の通り道を整える`,detail:`畑と南の土地を結ぶ道に日差しを。`,...h[`lane-east`],seconds:3,cost:0,kind:`cleaning`},{id:`barn-walls`,title:`納屋の外壁を掃除する`,detail:`赤い壁を洗い、入口のがれきを片付ける。`,...h[`barn-walls`],seconds:4,cost:0,kind:`cleaning`},{id:`barn-roof`,title:`納屋の屋根を修理する`,detail:`雨をしのげる納屋へ。まずは屋根を直す。`,...h[`barn-roof`],seconds:60,cost:600,kind:`repairing`,requires:`barn-walls`,shipped:300},{id:`fence`,title:`道沿いの柵を直す`,detail:`出荷道に、小さな白い柵を。`,...h.fence,seconds:3.5,cost:240,kind:`repairing`,requires:`lane-west`},{id:`barn-open`,title:`納屋を再開する`,detail:`扉と売り場を直し、収穫を蓄える共同倉庫を開こう。`,...h[`barn-open`],seconds:60,cost:1800,kind:`repairing`,requires:`barn-roof`,shipped:500},{id:`cottage-yard`,title:`空き家の庭を片付ける`,detail:`農園の隣で、帰ってこられる場所を整えよう。`,...h[`cottage-yard`],seconds:4,cost:0,kind:`cleaning`},{id:`cottage-repair`,title:`空き家の屋根と窓を直す`,detail:`農場の収入で、暮らせる家に。`,...h[`cottage-repair`],seconds:60,cost:1500,kind:`repairing`,requires:`cottage-yard`},{id:`cottage-welcome`,title:`帰ってくる家族を迎える`,detail:`修復した家へ、かごに入れた食料を届けよう。`,...h[`cottage-welcome`],seconds:3,cost:0,kind:`cleaning`,requires:`cottage-repair`,supplies:{corn:6,turnip:6,pumpkin:0,kabumorokoshi:0}},{id:`town-well`,title:`街の共同井戸を整える`,detail:`毎日の水仕事を楽に。これから植える作物が15%早く育ちます。`,...h[`town-well`],seconds:60,cost:2400,kind:`repairing`,requires:`cottage-yard`},{id:`town-orchard`,title:`街路樹を手入れする`,detail:`枝を整え、農園と住宅地の緑を取り戻そう。`,...h[`town-orchard`],seconds:5,cost:720,kind:`cleaning`,requires:`cottage-yard`},{id:`town-market`,title:`青果市を開く`,detail:`納屋に街の売り場を。通常出荷の単価が1メニー増えます。`,...h[`town-market`],seconds:60,cost:3600,kind:`repairing`,requires:`barn-open`},{id:`town-pantry`,title:`街の食料庫を満たす`,detail:`家族が安心して暮らせるように、農園の実りを蓄えよう。`,...h[`town-pantry`],seconds:3,cost:0,kind:`cleaning`,requires:`cottage-welcome`,supplies:{corn:12,turnip:12,pumpkin:0,kabumorokoshi:0}}],x=e=>b.find(t=>t.id===e),S=[`barn-open`,`cottage-welcome`,`town-market`],C=[`忘れられた農園`,`手入れの始まった街`,`暮らしの準備`,`人の戻る街`,`にぎわう広場`,`実りを分け合う街`],w=[`barn-walls`,`barn-roof`,`barn-open`,`cottage-yard`,`cottage-repair`,`cottage-welcome`,`town-market`];function T(e){if(e.episodes.festival)return{title:`農業地区、みんなの収穫祭`,detail:`すべての仕事を達成しました。この農園から、また次の暮らしへ。`};if(e.agricultureComplete)return{title:`街の実りを、港へ`,detail:`農業地区の復興を達成！ 農園を残して港へ進もう。`};let t=w.find(t=>!e.projects.has(t));if(t){let n=x(t);return{title:n.title,detail:e.projectReason(t)||n.detail}}return e.enterprises.finished<2?{title:`街の拠点を2つ育てよう`,detail:`食堂・集荷所・保存園から好きな2つを完成へ · ${e.enterprises.finished}/2`}:{title:`港へ実りを届けよう`,detail:`港への供給協定を完成させる · ${e.enterprises.level(`harbor-link`)}/3`}}var E=[`corn`,`turnip`,`pumpkin`,`kabumorokoshi`],D={corn:{name:`トウモロコシ`,seconds:18,yield:3,price:5,size:1},turnip:{name:`カブ`,seconds:11,yield:2,price:4,size:.72},kabumorokoshi:{name:`かぶもろこし`,seconds:11,yield:3,price:5,size:.8},pumpkin:{name:`カボチャ`,seconds:90,yield:1,price:42,size:.82}},O=c.truck,k=[{id:`pantry`,title:`街の共同台所`,detail:`戻ってきた人たちの食卓へ。`,needs:{corn:6,turnip:0,pumpkin:0,kabumorokoshi:0},coins:50},{id:`soup`,title:`あたたかいスープ`,detail:`片付けを手伝うみんなの昼ごはん。`,needs:{corn:0,turnip:4,pumpkin:0,kabumorokoshi:0},coins:28},{id:`autumn`,title:`秋色の食卓`,detail:`じっくり育てたカボチャを、街の食卓へ。`,needs:{corn:0,turnip:0,pumpkin:3,kabumorokoshi:0},coins:150},{id:`builders`,title:`港の準備隊のお弁当`,detail:`港を調べる人たちへ、畑からの差し入れ。`,needs:{corn:3,turnip:3,pumpkin:0,kabumorokoshi:0},coins:45}],A=[`apple`,`pear`],j={apple:{name:`リンゴ`,seconds:75,yield:4,price:7},pear:{name:`ナシ`,seconds:105,yield:3,price:14}},ee=e=>e<3?`apple`:`pear`,M=[`E`,`D`,`C`,`B`,`A`,`S`],N=[1,1.25,1.65,2.2,3.1,4.5],P=[0,40,180,650,1400,3e3];function te(e,t=3){return Math.min(t,P.filter(t=>e>=t).length-1)}var ne=class{counts;lots;ids;constructor(e,t){this.ids=e,this.lots=Object.fromEntries(e.map(e=>[e,[t?.[e]??0,0,0,0,0,0]])),this.counts={};for(let t of e)Object.defineProperty(this.counts,t,{enumerable:!0,get:()=>this.lots[t].reduce((e,t)=>e+t,0),set:e=>{let n=e-this.counts[t];n>0?this.add(t,n,0):n<0&&this.take(t,-n)}})}add(e,t,n){this.lots[e][n]+=t}take(e,t){let n=[0,0,0,0,0,0],r=Math.min(t,this.counts[e]);for(let t=0;t<6;t++){let i=Math.min(r,this.lots[e][t]);n[t]=i,this.lots[e][t]-=i,r-=i}return n}moveTo(e,t,n){this.take(t,n).forEach((n,r)=>e.add(t,n,r))}peek(e,t=this.counts[e]){let n=Math.min(t,this.counts[e]);return this.lots[e].map(e=>{let t=Math.min(e,n);return n-=t,t})}value(e,t,n=this.counts[e]){return this.peek(e,n).reduce((e,n,r)=>e+n*Math.round(t*N[r]),0)}save(){return Object.fromEntries(this.ids.map(e=>[e,[...this.lots[e]]]))}restore(e,t){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let n=e;return Object.keys(n).length!==this.ids.length||!this.ids.every(e=>Array.isArray(n[e])&&n[e].length===6&&n[e].every(e=>Number.isSafeInteger(e)&&e>=0)&&n[e].reduce((e,t)=>e+t,0)===t[e])?!1:(this.lots=Object.fromEntries(this.ids.map(e=>[e,[...n[e]]])),!0)}},re=class{crops;people={player:0,mina:0,ren:0};best=0;ids;constructor(e){this.ids=e,this.crops=Object.fromEntries(e.map(e=>[e,0]))}cropGrade(e,t){return te(this.crops[e],3+t)}personGrade(e){return te(this.people[e]??0,5)}harvest(e,t,n){let r=Math.min(this.cropGrade(e,n),this.personGrade(t));return this.crops[e]++,this.people[t]=(this.people[t]??0)+1,this.best=Math.max(this.best,r),r}machineHarvest(e,t,n){let r=Math.max(0,this.cropGrade(e,t)-(2-n));return this.crops[e]++,r}save(){return{crops:{...this.crops},people:{...this.people},best:this.best}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0;return!t.crops||!t.people||Object.keys(t.crops).length!==this.ids.length||!this.ids.every(e=>n(t.crops[e]))||![`player`,`mina`,`ren`].every(e=>n(t.people[e]))||Object.keys(t.people).length!==3||!n(t.best)||t.best>5?!1:(this.crops={...t.crops},this.people={...t.people},this.best=t.best,!0)}},ie={...c.kitchen,capacity:36},F=[`bread`,`soup`,`pumpkinSoup`,`pumpkinPie`,`appleJam`,`pearCompote`,`fruitTart`,`hybridGratin`],I=(e={})=>Object.fromEntries(F.map(t=>[t,e[t]??0])),L={bread:{name:`コーンパン`,needs:{corn:6,turnip:0,pumpkin:0,kabumorokoshi:0},seconds:8,yield:2,price:22},pumpkinSoup:{name:`カボチャポタージュ`,needs:{corn:2,turnip:0,pumpkin:2,kabumorokoshi:0},seconds:14,yield:3,price:42},pumpkinPie:{name:`カボチャパイ`,needs:{corn:4,turnip:0,pumpkin:1,kabumorokoshi:0},seconds:20,yield:2,price:48},appleJam:{name:`リンゴジャム`,needs:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{apple:6},seconds:18,yield:3,price:21},pearCompote:{name:`ナシのコンポート`,needs:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{pear:6},seconds:22,yield:3,price:42},fruitTart:{name:`果樹園のタルト`,needs:{corn:3,turnip:0,pumpkin:0,kabumorokoshi:0},fruit:{apple:3,pear:3},seconds:26,yield:3,price:42},hybridGratin:{name:`かぶもろこしグラタン`,needs:{corn:0,turnip:2,pumpkin:0,kabumorokoshi:6},seconds:16,yield:2,price:30},soup:{name:`野菜スープ`,needs:{corn:2,turnip:4,pumpkin:0,kabumorokoshi:0},seconds:12,yield:2,price:30}},ae=[{id:`harvestTable`,title:`秋の収穫の食卓`,detail:`農園で育ったカボチャを、二つのおいしさに。`,needs:I({pumpkinSoup:2,pumpkinPie:2}),coins:220},{id:`teaTime`,title:`果樹園のお茶会`,detail:`リンゴとナシを使った、街の午後のお楽しみ。`,needs:I({appleJam:1,pearCompote:1,fruitTart:2}),coins:185},{id:`newFlavor`,title:`新しい実りの試食会`,detail:`新しい品種の味を、近所のみんなに。`,needs:I({hybridGratin:3,fruitTart:1}),coins:160},{id:`breakfast`,title:`街の朝ごはん`,detail:`帰ってきた家族に、焼きたてのパンを。`,needs:I({bread:3,soup:1}),coins:110},{id:`workers`,title:`畑仕事のお昼`,detail:`作業の合間に温かいスープを囲もう。`,needs:I({soup:4}),coins:138},{id:`gathering`,title:`週末の集まり`,detail:`久しぶりの顔も集まる、にぎやかな食卓へ。`,needs:I({bread:4,soup:4}),coins:240}],oe=class{plan=`none`;quality=new ne(F);get goods(){return this.quality.counts}set goods(e){this.quality=new ne(F,e)}crafted=0;orders={breakfast:0,workers:0,gathering:0,harvestTable:0,teaTime:0,newFlavor:0};progress=0;get stored(){return F.reduce((e,t)=>e+this.goods[t],0)}get hasProgress(){return this.plan!==`none`||this.crafted>0||this.stored>0||Object.values(this.orders).some(e=>e>0)}unlocked(e,t){let n=L[e];return E.every(e=>n.needs[e]===0||t.cropUnlocked(e))&&A.every(e=>!n.fruit?.[e]||t.investments.has(e===`apple`?`orchard`:`pear-grove`))}reason(e){if(!e.investments.has(`kitchen`))return`納屋の加工台を導入すると使えます`;if(this.plan===`none`)return`加工をお休みしています`;let t=L[this.plan];if(this.stored+t.yield>ie.capacity)return`食品棚がいっぱいです。売り先へ届けよう`;let n=E.filter(n=>e.stock[n]<t.needs[n]),r=A.filter(n=>e.orchard.fruit[n]<(t.fruit?.[n]??0));return n.length?`倉庫の材料を待っています`:r.length?`果樹園の集荷箱の材料を待っています`:``}setPlan(e,t){return!t.investments.has(`kitchen`)||![`none`,...F].includes(e)||e!==`none`&&!this.unlocked(e,t)?!1:this.plan===e||(this.plan=e,this.progress=0,t.revision++,!0)}step(e,t){if(this.reason(t)){this.progress=0;return}let n=this.plan,r=L[n];if(this.progress+=e/r.seconds,this.progress<1)return;let i=E.flatMap(e=>t.stockQuality.peek(e,r.needs[e]).flatMap((e,t)=>e?[t]:[]));for(let e of A)i.push(...t.orchard.quality.peek(e,r.fruit?.[e]??0).flatMap((e,t)=>e?[t]:[]));let a=Math.min(...i);for(let e of A){let n=r.fruit?.[e]??0;t.orchard.fruit[e]-=n,t.orchard.processed+=n}for(let e of E)t.stock[e]-=r.needs[e];this.quality.add(n,r.yield,a),this.crafted+=r.yield,t.episodes.crafted[n]+=r.yield,this.progress=0,t.revision++}salePrice(e,t){return Math.round(L[e].price*(1+t.enterprises.level(`canteen`)*.05+(t.episodes.done(`meal`)?.05:0)))}orderCoins(e){let t=ae.find(t=>t.id===e),n=F.reduce((e,n)=>e+t.needs[n]*L[n].price,0),r=F.reduce((e,n)=>e+this.quality.value(n,L[n].price,t.needs[n])+Math.max(0,t.needs[n]-this.goods[n])*L[n].price,0);return Math.round(t.coins*r/n)}deliveryReason(e,t){if(!t.investments.has(`kitchen`))return`先に加工台を導入しよう`;if(e===`all`)return this.stored===0?`食品棚が空です`:``;if(!t.investments.has(`truck`))return`販売車を購入すると配達できます`;let n=ae.find(t=>t.id===e);return n?F.filter(e=>this.goods[e]<n.needs[e]).map(e=>`${L[e].name} あと${n.needs[e]-this.goods[e]}個`).join(`・`):`見つからない注文です`}deliver(e,t){let n=e===`all`?ie:O;if(this.deliveryReason(e,t)||Math.hypot(n.x-t.player.x,n.z-t.player.z)>1.35)return!1;let r=0;if(e===`all`)for(let e of F)r+=this.quality.value(e,this.salePrice(e,t)),this.goods[e]=0;else{let t=ae.find(t=>t.id===e),n=F.reduce((e,n)=>e+t.needs[n]*L[n].price,0),i=F.reduce((e,n)=>e+this.quality.value(n,L[n].price,t.needs[n]),0);r=Math.round(t.coins*i/n);for(let e of F)this.goods[e]-=t.needs[e];this.orders[e]++}return t.coins+=r,t.revision++,t.message=`農園の味を届けて +${r} メニー！`,!0}save(){return{quality:this.quality.save(),plan:this.plan,goods:{...this.goods},crafted:this.crafted,orders:{...this.orders}}}restore(e,t=!1,n=!1){if(!e||typeof e!=`object`)return!1;let r=e,i=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,a=F.filter(e=>e!==`bread`&&e!==`soup`),o=n?{...r.goods,...Object.fromEntries(a.map(e=>[e,0]))}:r.goods,s=n?{...r.orders,harvestTable:0,teaTime:0,newFlavor:0}:r.orders,c=n?{...r.quality,...Object.fromEntries(a.map(e=>[e,[0,0,0,0,0,0]]))}:r.quality;if(![`none`,...F].includes(r.plan)||n&&r.plan!==`none`&&a.includes(r.plan)||!o||F.some(e=>!i(o[e]))||F.reduce((e,t)=>e+o[t],0)>ie.capacity||!i(r.crafted)||r.crafted<F.reduce((e,t)=>e+o[t],0)||!s||ae.some(e=>!i(s[e.id])))return!1;let l=new ne(F,o);return!t&&!l.restore(c,o)?!1:(this.plan=r.plan,this.crafted=r.crafted,this.orders={...s},this.progress=0,this.quality=l,!0)}},se=[{id:`canteen`,title:`街の共同食堂`,detail:`農園の実りを囲んで、人が集まる場所をつくろう。`,...c.canteen,targets:[2400,9600,24e3],chapters:[`持ち寄りの台所`,`毎日開く食堂`,`街の食卓`],benefits:[`食品の通常売値 +5%`,`食品の通常売値 +10%`,`食品の通常売値 +15%`]},{id:`depot`,title:`北の共同集荷所`,detail:`広がった農地の近くに、実りを集める場所を。`,...c.depot,targets:[2400,9600,24e3],chapters:[`仮設の集荷箱`,`農道の集荷所`,`地域の出荷拠点`],benefits:[`共同倉庫の入口に。住民・コンベアも利用`,`共同倉庫の容量 +48個`,`入口の出荷箱で通常出荷も可能`]},{id:`seed-garden`,title:`種の保存園`,detail:`育ててきた作物の種を残し、次の実りにつなげよう。`,...c[`seed-garden`],targets:[2400,9600,24e3],chapters:[`小さな育苗棚`,`種を守る温室`,`実りをつなぐ園`],benefits:[`新しくまく作物の成長時間 -3%`,`新しくまく作物の成長時間 -6%`,`新しくまく作物の成長時間 -10%`]},{id:`harbor-link`,title:`港への供給協定`,detail:`育てた農業で、眠っている港の暮らしを支えよう。`,...c[`harbor-link`],targets:[12e3,3e4,6e4],chapters:[`港へ続く道`,`港の生活物資`,`農業と海をつなぐ協定`],benefits:[`港の入口に案内板を設置`,`港へ届ける生活物資が揃います`,`海産地区へ進めます。農園は残ります`]}],ce=c[`depot-sales`],R=e=>se.find(t=>t.id===e),le=[...E,...A,...F,`coins`],ue=e=>e===`coins`?`メニー`:E.includes(e)?D[e].name:A.includes(e)?j[e].name:L[e].name,de=class{states=Object.fromEntries(se.map(e=>[e.id,{cleared:!1,level:0,contributed:0}]));active=null;progress=0;get workPoint(){return this.active?R(this.active):void 0}get finished(){return se.filter(e=>e.id!==`harbor-link`&&this.states[e.id].level===3).length}level(e){return this.states[e].level}fraction(e){let t=this.states[e],n=R(e);return t.level===3?1:(t.level+(t.cleared?.05:0)+t.contributed/n.targets[t.level]*.9)/3}get districtProgress(){return se.filter(e=>e.id!==`harbor-link`).map(e=>this.fraction(e.id)).sort((e,t)=>t-e).slice(0,2).reduce((e,t)=>e+t,0)/2}reason(e,t){return!t.residentsArrived||!t.projects.has(`barn-open`)?`納屋を再開し、家族の移住を終えよう`:e===`harbor-link`&&(!t.foundationComplete||this.finished<2)?`農園の基盤と、好きな2つの復興事業を完成させよう`:``}nearby(e){return se.find(t=>Math.hypot(t.x-e.player.x,t.z-e.player.z)<1.35)}interrupt(){this.active=null,this.progress=0}startNearby(e){let t=this.nearby(e);if(!t||this.reason(t.id,e))return!1;let n=this.states[t.id];return n.level===3||n.cleared&&n.contributed<t.targets[n.level]?!1:(this.active=t.id,this.progress=0,e.action=n.cleared?`repairing`:`cleaning`,!0)}step(e,t){if(!this.active)return;let n=t.agricultureComplete,r=this.active,i=this.states[r],a=R(r);if(this.reason(r,t)){this.interrupt();return}t.action=i.cleared?`repairing`:`cleaning`,this.progress+=e/(i.cleared?8:6),t.progress=this.progress,!(this.progress<1)&&(i.cleared?i.contributed===a.targets[i.level]&&(i.level++,i.contributed=0,t.message=`${a.chapters[i.level-1]}が完成！ ${a.benefits[i.level-1]}`):(i.cleared=!0,t.message=`${a.title}の敷地を片付けた！ 実りを持ち寄ろう。`),this.interrupt(),t.progress=0,t.action=`idle`,t.revision++,t.settleTasks(),!n&&t.agricultureComplete&&(t.message=`農業地区が復興！ この実りを、次は港の暮らしへ。`))}stock(e,t){return E.includes(e)?t.cargoQuality:A.includes(e)?t.orchard.quality:t.kitchen.quality}available(e,t){return e===`coins`?t.coins:this.stock(e,t).counts[e]}unitPrice(e,t){return E.includes(e)?t.salePrice(e):A.includes(e)?j[e].price:L[e].price}offer(e,t,n){if(!le.includes(t)||this.reason(e,n))return null;let r=this.states[e],i=R(e).targets[r.level]-r.contributed;if(!r.cleared||r.level===3||i<=0)return null;if(t===`coins`){let e=Math.min(i,n.coins);return e>0?{amount:e,value:e}:null}let a=this.stock(t,n).save()[t],o=0,s=0;for(let e=0;e<a.length&&s<i;e++){let r=Math.round(this.unitPrice(t,n)*N[e]),c=Math.min(a[e],Math.ceil((i-s)/r));o+=c,s+=c*r}return o>0?{amount:o,value:Math.min(s,i)}:null}donate(e,t,n){if(!se.some(t=>t.id===e)||this.nearby(n)?.id!==e)return!1;let r=this.offer(e,t,n);return r?(t===`coins`?n.coins-=r.amount:E.includes(t)?n.cargo[t]-=r.amount:A.includes(t)?(n.orchard.fruit[t]-=r.amount,n.orchard.donated+=r.amount):n.kitchen.goods[t]-=r.amount,this.states[e].contributed+=r.value,n.revision++,n.message=`${ue(t)}を届けて、復興の準備 +${r.value}！`,!0):!1}save(){return Object.fromEntries(se.map(e=>[e.id,{...this.states[e.id]}]))}restore(e,t){if(!e||typeof e!=`object`||Array.isArray(e)||Object.keys(e).length!==se.length)return!1;let n=e;for(let e of se){let r=n[e.id];if(!r||typeof r.cleared!=`boolean`||!Number.isInteger(r.level)||r.level<0||r.level>3||!Number.isSafeInteger(r.contributed)||r.contributed<0||!r.cleared&&(r.level>0||r.contributed>0)||(r.level===3?r.contributed!==0:r.contributed>e.targets[r.level])||(r.cleared||r.level>0||r.contributed>0)&&(!t.residentsArrived||!t.projects.has(`barn-open`)))return!1}let r=se.filter(e=>e.id!==`harbor-link`&&n[e.id].level===3).length;return(n[`harbor-link`].cleared||n[`harbor-link`].level>0)&&(!t.foundationComplete||r<2)?!1:(this.states=Object.fromEntries(se.map(e=>[e.id,{...n[e.id]}])),this.interrupt(),!0)}},fe=c.breeding,pe=[`corn`,`turnip`,`pumpkin`],me=[{crop:`kabumorokoshi`,parents:[`corn`,`turnip`],samples:12}];function he(e,t){if(e!==t&&pe.includes(e)&&pe.includes(t))return me.find(n=>n.parents.includes(e)&&n.parents.includes(t))}function ge(e){return`<p class="note-intro">育ててきた作物から、新しい種を。実験台を導入したら、親の実りを倉庫へ預けよう。配合種は親にできません。</p>${me.map(t=>`<article class="investment-card"><h3>${D[t.crop].name}</h3><p>${t.parents.map(e=>D[e].name).join(` × `)}<br>${D[t.crop].seconds}秒で${D[t.crop].yield}個。コーンの収量と、カブの育つ速さを受け継ぎます。</p><p>${t.parents.map(n=>`${D[n].name}：栽培経験 ${e.expertise.crops[n]} / 40回・倉庫 ${e.stock[n]} / ${t.samples}個`).join(`<br>`)}</p><small>発見時に倉庫から各${t.samples}個を使います。発見後の種は無料。新しい品種の栽培経験はEから育てます。基本作物の注文や料理の原料を置き換えることはできません。</small><button data-breed="${t.crop}" id="breed-${t.crop}" ${e.breedReason(...t.parents)?`disabled`:``}>${e.breedReason(...t.parents)||`この組み合わせで種をつくる`}</button></article>`).join(``)}`}var z={pumpkin:`カボチャ`,corn:`コーン`,turnip:`カブ`,bread:`コーンパン`,soup:`野菜スープ`,apple:`リンゴ`,coins:`メニー`},_e=[{id:`family`,name:`ユイと家族`,requires:`cottage-welcome`,...c.family,chapters:[{title:`朝ごはんのある家`,detail:`「帰ってきた朝に、温かいごはんを。農園の実りを少し分けてもらえますか？」`,thanks:`ユイ「窓辺に花も飾ったの。また寄ってね！」`,target:80,accepts:{pumpkin:48,corn:6,turnip:5,bread:30,soup:40,coins:1}},{title:`庭で、ひと休み`,detail:`「庭にテーブルを置いて、ご近所さんと実りを分け合いたいの。」`,thanks:`ユイ「次はみんなで、この庭を囲みましょう。」`,target:180,accepts:{pumpkin:48,corn:6,apple:9,bread:30,coins:1}},{title:`ただいまが聞こえる庭`,detail:`「昔の友達も帰ってくるって。みんなを迎える食卓を、もう一度。」`,thanks:`ユイ「この街に帰ってきて、よかった！」`,target:360,accepts:{turnip:5,apple:9,soup:40,coins:1}}]},{id:`market`,name:`青果商のハル`,requires:`town-market`,...c.market,chapters:[{title:`色の並ぶ青果市`,detail:`「再開した売り場に、農園の色を並べよう。小さな納品からで大丈夫！」`,thanks:`ハル「通りがかった人が、足を止めてくれたよ。」`,target:100,accepts:{pumpkin:48,corn:6,turnip:5,apple:9,coins:1}},{title:`買い物帰りの休憩所`,detail:`「立ち話のできる場所があるといいね。売り上げでも実りでも、力を貸してほしい。」`,thanks:`ハル「ここで話していると、街のことが見えてくるね。」`,target:250,accepts:{pumpkin:48,corn:6,bread:30,apple:9,coins:1}},{title:`週末の小さな市`,detail:`「近くの家からも出店したいって。食べ物と花が並ぶ市にしよう！」`,thanks:`ハル「農園の実りが、人を呼ぶ市になった！」`,target:500,accepts:{pumpkin:48,corn:6,turnip:5,bread:30,soup:40,apple:9,coins:1}}]},{id:`cooperative`,name:`納屋番のソラ`,requires:`barn-open`,...c.cooperative,chapters:[{title:`働いたあとのひと皿`,detail:`「納屋を使うみんなで、ひと休みできる場所をつくろう。」`,thanks:`ソラ「仕事の合間にも、顔を合わせられるね。」`,target:100,accepts:{pumpkin:48,corn:6,turnip:5,soup:40,coins:1}},{title:`仲間と囲む昼ごはん`,detail:`「それぞれの畑の話をしながら食べたいな。少しずつ持ち寄ろう。」`,thanks:`ソラ「農園の工夫を話せる仲間が増えたよ。」`,target:220,accepts:{pumpkin:48,corn:6,bread:30,soup:40,coins:1}},{title:`実りを持ち寄る日`,detail:`「家族も青果市の人も呼んで、農園で育ったものを分け合いたい。」`,thanks:`ソラ「ひとりの畑から、みんなの農園になったね！」`,target:420,accepts:{pumpkin:48,corn:6,turnip:5,apple:9,bread:30,soup:40,coins:1}}]}],B=class{progress={family:{chapter:0,contributed:0},market:{chapter:0,contributed:0},cooperative:{chapter:0,contributed:0}};get hasProgress(){return Object.values(this.progress).some(e=>e.chapter>0||e.contributed>0)}available(e,t){return e===`coins`?t.coins:e===`apple`?t.orchard.fruit.apple:e===`bread`||e===`soup`?t.kitchen.goods[e]:t.cargo[e]}offer(e,t,n){let r=_e.find(t=>t.id===e);if(!r||!n.residentsArrived||!n.projects.has(r.requires))return null;let i=this.progress[e],a=r.chapters[i.chapter],o=a?.accepts[t];if(!o)return null;let s=Math.min(this.available(t,n),Math.ceil((a.target-i.contributed)/o));return s>0?{resident:e,chapter:i.chapter,kind:t,amount:s}:null}deliver(e,t){let n=_e.find(t=>t.id===e.resident);if(!n||Math.hypot(t.player.x-n.x,t.player.z-n.z)>1.35||!Number.isSafeInteger(e.amount)||e.amount<=0)return!1;let r=this.offer(e.resident,e.kind,t);if(!r||r.chapter!==e.chapter||e.amount>r.amount)return!1;let i=this.progress[e.resident],a=n.chapters[i.chapter];return e.kind===`coins`?t.coins-=e.amount:e.kind===`apple`?(t.orchard.fruit.apple-=e.amount,t.orchard.donated+=e.amount):e.kind===`bread`||e.kind===`soup`?t.kitchen.goods[e.kind]-=e.amount:t.cargo[e.kind]-=e.amount,i.contributed=Math.min(a.target,i.contributed+e.amount*a.accepts[e.kind]),t.revision++,t.message=`${n.name}へ ${z[e.kind]} ${e.amount}${e.kind===`coins`?`メニー`:`個`}を届けた！`,i.contributed>=a.target&&(i.chapter++,i.contributed=0,t.settleTasks(),t.message=a.thanks),!0}save(){return Object.fromEntries(_e.map(e=>[e.id,{...this.progress[e.id]}]))}restore(e){if(!e||typeof e!=`object`)return!1;let t=e;return _e.every(e=>{let n=t[e.id];return n&&Number.isInteger(n.chapter)&&n.chapter>=0&&n.chapter<=e.chapters.length&&Number.isSafeInteger(n.contributed)&&n.contributed>=0&&(n.chapter===e.chapters.length?n.contributed===0:n.contributed<e.chapters[n.chapter].target)})?(this.progress=Object.fromEntries(_e.map(e=>[e.id,{chapter:t[e.id].chapter,contributed:t[e.id].contributed}])),!0):!1}},ve=c.cleaning,ye=c.workshop,be=v,V=be.flatMap(e=>e.ids.map(t=>({id:t,x:e.x,z:e.z})));function xe(e){return be.flatMap(t=>{let n=t.ids.find(t=>!e.investments.has(t));return n&&!e.investmentReason(n,!0)&&(e.coins>0||(e.funding.paid[n]??0)>0)?[{id:n,x:t.x,z:t.z}]:[]})}var H=(e,t,n=2.6)=>Math.hypot(e.x-t.x,e.z-t.z)<n;function Se(e){let t=e.player,n=[...se.filter(t=>!e.enterprises.reason(t.id,e)).map(e=>({...e,id:`enterprises`})),{id:`breeding`,title:`品種配合の実験台`,...fe},{id:`restoration`,title:`掃除用具`,...ve},{id:`investments`,title:`機械置き場`,...ye},{id:`orders`,title:`販売車`,...c.truck},{id:`storage`,title:`共同倉庫`,...c.store},{id:`kitchen`,title:`加工台`,...c.kitchen},{id:`orchard`,title:`果樹園`,...c.orchard},..._e.filter(t=>e.projects.has(t.requires)).map(e=>({...e,id:`residents`,title:e.name})),...xe(e).map(e=>({...e,id:`investments`,title:`設備の強化`}))].filter(n=>H(t,n)&&!(n.id===`residents`&&!e.residentsArrived)&&!(n.id===`storage`&&!e.projects.has(`barn-open`))&&!(n.id===`kitchen`&&!e.investments.has(`kitchen`))&&!(n.id===`orchard`&&!e.investments.has(`orchard`))&&!(n.id===`orders`&&!e.investments.has(`truck`))).sort((e,n)=>Math.hypot(t.x-e.x,t.z-e.z)-Math.hypot(t.x-n.x,t.z-n.z))[0];if(n)return n;let r=e.plots.findIndex((n,r)=>e.isUnlocked(r)&&H(t,n,1.7));return r>=0?{id:`crops`,title:`畑 ${r+1} の作付け`,...e.plots[r]}:null}var Ce=class{pointer=null;origin={x:0,y:0};offset={x:0,y:0};begin(e,t,n){return this.pointer===null&&(this.pointer=e,this.origin={x:t,y:n},this.offset={x:0,y:0},!0)}move(e,t,n){if(this.pointer!==e)return;let r=t-this.origin.x,i=n-this.origin.y,a=Math.hypot(r,i),o=a>64?64/a:1;this.offset={x:r*o,y:i*o}}end(e=this.pointer){e===this.pointer&&(this.pointer=null,this.offset={x:0,y:0})}get input(){let e=Math.hypot(this.offset.x,this.offset.y);if(e<=8)return{x:0,z:0};let t=Math.min(1,(e-8)/40),n=this.offset.x/e*t,r=this.offset.y/e*t;return{x:n*.8575+r*.5145,z:-n*.5145+r*.8575}}},we={sales:c.orchard,seconds:75,pruneSeconds:4,pickSeconds:2.2,yield:4,capacity:24,price:7},Te=e=>({x:y[e].x,z:y[e].z+.8}),Ee=class{trees=y.map(()=>({tended:!1,readyAt:0}));quality=new ne(A);get fruit(){return this.quality.counts}get box(){return A.reduce((e,t)=>e+this.fruit[t],0)}set box(e){let t=e-this.box;if(t>0)this.fruit.apple+=t;else for(let e of A){let n=Math.min(this.fruit[e],-t);this.fruit[e]-=n,t+=n}}harvested=0;sold=0;donated=0;processed=0;active=-1;progress=0;get workPoint(){return this.active>=0?y[this.active]:void 0}get hasProgress(){return this.box>0||this.harvested>0||this.sold>0||this.donated>0||this.processed>0||this.trees.some(e=>e.tended)}unlocked(e,t){return t.investments.has(`orchard`)&&(ee(e)===`apple`||t.investments.has(`pear-grove`))}ripe(e,t){return this.trees[e].tended&&this.trees[e].readyAt<=t}interrupt(){this.active=-1,this.progress=0}startNearby(e,t){let n=y.map((t,n)=>({i:n,distance:Math.hypot(t.x-e.player.x,t.z-e.player.z)})).filter(({i:n,distance:r})=>this.unlocked(n,e)&&r<1.35&&(!this.trees[n].tended||this.ripe(n,t)&&this.box+j[ee(n)].yield<=we.capacity)).sort((e,t)=>e.distance-t.distance);return n[0]?(this.active=n[0].i,this.progress=0,!0):!1}step(e,t,n){if(this.active<0)return;let r=this.trees[this.active],i=r.tended,a=ee(this.active),o=j[a];if(t.action=i?`picking`:`pruning`,this.progress+=e/((i?we.pickSeconds:we.pruneSeconds)*(t.investments.has(`tools`)?.65:1)*(i&&t.episodes.done(`orchard`)?.8:1)),t.progress=this.progress,!(this.progress<1)){if(i){if(!this.ripe(this.active,n)||this.box+o.yield>we.capacity){this.interrupt(),t.progress=0,t.action=`idle`;return}let e=t.expertise.harvest(a,`player`,t.research);this.quality.add(a,o.yield,e),this.harvested+=o.yield,t.message=`${o.name}${o.yield}個を集荷箱へ！ 品質 ${M[e]}`}else r.tended=!0,t.message=`枝を整えた！ この木から、何度でも実りを。`;r.readyAt=Math.round(n+o.seconds*1e3),t.revision++,this.interrupt(),t.progress=0,t.action=`idle`,t.settleTasks()}}sell(e){if(!e.investments.has(`orchard`)||this.box===0||Math.hypot(e.player.x-we.sales.x,e.player.z-we.sales.z)>1.35)return!1;let t=this.box,n=A.reduce((e,t)=>e+this.quality.value(t,j[t].price),0);return e.coins+=n,e.shipped+=t,this.sold+=t,this.box=0,e.revision++,e.message=`果実${t}個を届けて +${n} メニー！`,e.settleTasks(),!0}save(){return{quality:this.quality.save(),fruit:{...this.fruit},trees:this.trees.map(e=>({...e})),box:this.box,harvested:this.harvested,sold:this.sold,donated:this.donated,processed:this.processed}}restore(e,t=!1,n=t,r=!1){if(!e||typeof e!=`object`)return!1;let i=e,a=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,o=t?0:i.donated,s=r?0:i.processed,c=r?{apple:i.box,pear:0}:i.fruit;if(!a(o)||!a(s)||!c||A.some(e=>!a(c[e]))||!Array.isArray(i.trees)||!r&&i.trees.length!==5||r&&!(i.trees.length===3||i.trees.length===5&&i.trees.slice(3).every(e=>e&&!e.tended&&e.readyAt===0))||i.trees.some(e=>!e||typeof e.tended!=`boolean`||!a(e.readyAt)||(e.tended?e.readyAt===0:e.readyAt!==0))||!a(i.box)||i.box>we.capacity||i.box!==c.apple+c.pear||!a(i.harvested)||!a(i.sold)||i.harvested!==i.box+i.sold+o+s||i.harvested>0&&!i.trees.some(e=>e.tended))return!1;let l=new ne(A,c),u=r?{...i.quality,pear:[0,0,0,0,0,0]}:i.quality;return!n&&!l.restore(u,c)?!1:(this.trees=r?[...i.trees.slice(0,3).map(e=>({...e})),{tended:!1,readyAt:0},{tended:!1,readyAt:0}]:i.trees.map(e=>({...e})),this.harvested=i.harvested,this.sold=i.sold,this.donated=o,this.processed=s,this.quality=l,this.interrupt(),!0)}},De=[`market`,`meal`,`orchard`,`mina`,`ren`,`family`],Oe=[{id:`market`,title:`青果市に、最初のお客さんを`,person:`ハル`,portrait:`haru`,point:c.market,chapters:[`初市の看板を選ぶ`,`売り場を整える`,`看板の作物をそろえる`,`初市を開く`],reward:`選んだ作物の通常売値 +1メニー・市場の屋台`,letter:`最初は木箱ひとつだった売り場に、常連さんができたよ。あんたの作物の名前を覚えて、買いに来てくれる。明日の分も、よろしくね。`,choices:[{id:`corn`,title:`コーンの市`,detail:`コーン24個。毎日の実りを看板に。`},{id:`turnip`,title:`カブの市`,detail:`カブ24個。小さな畑から賑わいを。`},{id:`pumpkin`,title:`カボチャの市`,detail:`カボチャ6個。大きな実りを看板に。`}]},{id:`meal`,title:`街の食堂に、思い出の味を`,person:`ユイ`,portrait:`yui`,point:c.canteen,chapters:[`思い出の献立を聞く`,`台所を整える`,`試作を持ち寄る`,`みんなで味わう`],reward:`食品の通常売値 +5%・食堂の看板メニュー`,letter:`あなたの畑でよく採れる作物が、この街のいつもの味になりました。あの鍋の前なら、初めて会う人とも話せるの。また食べに来てね。`,choices:[]},{id:`orchard`,title:`忘れられた果樹園`,person:`ソラ`,portrait:`sora`,point:c.orchard,chapters:[`古い果樹の記録を読む`,`木陰の道を整える`,`果実のジャムを用意する`,`木陰の売店を開く`],reward:`果樹の収穫時間 -20%・木陰の売店とベンチ`,letter:`古い帳面を捨てなくてよかった。木の名前と、手を入れた人の名前が残っていた。今度は、あんたの年をその続きに書いておく。`,choices:[]},{id:`mina`,title:`ミナの、はじめての担当`,person:`ミナ`,portrait:`mina`,point:c.workshop,chapters:[`育てたい畑の相談`,`農具を一緒に整える`,`ミナの収穫を見届ける`,`自分の農具を渡す`],reward:`ミナの種まき・収穫を20%短縮・専用農具`,letter:`自分の手で収穫した箱を、ちゃんと納屋へ運べたよ。次に何をすればいいか、少しわかってきた。あなたが街へ出ている間も、畑を見ているね。`,choices:[]},{id:`ren`,title:`レンとつくる運びやすい道`,person:`レン`,portrait:`ren`,point:c.workshop,chapters:[`整える道を選ぶ`,`道の段差をならす`,`荷置き場の準備`,`新しい道を確かめる`],reward:`選んだ通路の歩行速度 +15%・道と荷置き場`,letter:`重い箱を抱えても、足元を気にせず歩けるようになった。帰りにすれ違う人も増えたよ。荷物のために直した道が、みんなの帰り道になったね。`,choices:[{id:`north`,title:`北の集荷道`,detail:`北の農地へ向かう道を整える。`},{id:`south`,title:`南の農道`,detail:`南の畑へ向かう道を整える。`}]},{id:`family`,title:`この街で、初めての食卓を`,person:`ユイ`,portrait:`yui`,point:c.family,chapters:[`食卓の献立を選ぶ`,`庭の食卓を仕上げる`,`料理を持ち寄る`,`家族と食卓を囲む`],reward:`かご容量 +6個・庭の料理と花`,letter:`久しぶりに、この庭で「いただきます」が聞こえました。昔と同じではないけれど、新しい思い出を重ねていける。あなたの席も、ここにあるからね。`,choices:[{id:`soup`,title:`野菜料理の食卓`,detail:`野菜スープ4個を囲む。`},{id:`appleJam`,title:`果実のおやつ`,detail:`リンゴジャム4個を囲む。`}]}],ke=e=>Oe.find(t=>t.id===e),Ae=e=>Object.fromEntries(e.map(e=>[e,0])),je=class e{states=Object.fromEntries(De.map(e=>[e,{stage:0,choice:``,work:0,delivered:{},baseline:0}]));memoryId=``;shipped=Ae(E);crafted=Ae(F);festival=!1;active=null;done(e){return this.states[e].stage===4}get finished(){return De.filter(e=>this.done(e)).length}get workPoint(){return this.active?ke(this.active).point:void 0}reason(e,t){return t.residentsArrived?e===`market`?t.projects.has(`town-market`)?t.requests.progress.market.chapter<1?`ハルの「色の並ぶ青果市」を終えよう`:``:`青果市を再開しよう`:e===`family`?t.requests.progress.family.chapter<3?`ユイと家族の3つのお願いを叶えよう`:``:e===`meal`?t.enterprises.level(`canteen`)<1?`共同食堂を第1段階まで育てよう`:t.investments.has(`kitchen`)?``:`納屋に加工台をつくろう`:e===`orchard`?t.investments.has(`orchard`)?``:`住宅地の果樹園を再開しよう`:t.investments.has(e===`mina`?`helper`:`helper-area`)?``:`${e===`mina`?`ミナ`:`レン`}を農園に迎えよう`:`家族が街へ戻ると始まります`}near(e,t){let n=ke(e).point;return Math.hypot(n.x-t.player.x,n.z-t.player.z)<=1.35}kind(e){let t=this.states[e];return t.stage===0?`choice`:t.stage===1?`work`:t.stage===2?e===`mina`?`observe`:`deliver`:t.stage===3?`celebrate`:`done`}recipe(){return{corn:`bread`,turnip:`soup`,pumpkin:`pumpkinSoup`}[E.filter(e=>e!==`kabumorokoshi`).sort((e,t)=>this.shipped[t]-this.shipped[e])[0]]}requirements(e){let t=this.states[e].choice;return e===`market`?{[t||`corn`]:t===`pumpkin`?6:24}:e===`meal`?{[t||`bread`]:6}:e===`orchard`?{appleJam:3}:e===`ren`?{bread:4}:e===`family`?{[t||`soup`]:4}:{}}available(e,t){return E.includes(e)?t.cargo[e]+t.stock[e]:A.includes(e)?t.orchard.fruit[e]:t.kitchen.goods[e]}choose(e,t,n){let r=this.states[e],i=ke(e);return r.stage!==0||this.reason(e,n)||!this.near(e,n)||i.choices.length&&!i.choices.some(e=>e.id===t)||e===`market`&&!n.cropUnlocked(t)||e===`family`&&t===`appleJam`&&!n.investments.has(`orchard`)?!1:(r.choice=e===`meal`?this.recipe():i.choices.length?t:`agreed`,this.advance(e,n),!0)}start(e,t){return this.kind(e)!==`work`||this.reason(e,t)||!this.near(e,t)?!1:(t.interrupt(),this.active=e,t.action=`repairing`,t.progress=this.states[e].work/30,!0)}step(e,t){let n=this.active;if(!n)return;if(!this.near(n,t)){this.active=null;return}let r=this.states[n];r.work=Math.min(30,r.work+e),t.action=`repairing`,t.progress=r.work/30,r.work>=30&&(n===`mina`&&(r.baseline=t.workers.people[0].harvested),this.active=null,t.interrupt(),this.advance(n,t))}deliver(e,t){let n=this.states[e];if(this.kind(e)!==`deliver`||this.reason(e,t)||!this.near(e,t))return!1;let r=!1;for(let[i,a]of Object.entries(this.requirements(e))){let e=Math.min(a-(n.delivered[i]??0),this.available(i,t));if(!(e<=0)){if(n.delivered[i]=(n.delivered[i]??0)+e,r=!0,E.includes(i)){let n=i,r=Math.min(e,t.cargo[n]);t.cargo[n]-=r,e-=r,t.stock[n]-=e}else A.includes(i)?(t.orchard.fruit[i]-=e,t.orchard.donated+=e):t.kitchen.goods[i]-=e}}return r&&(t.revision++,t.message=`実りを届けました。途中の準備も残ります。`),Object.entries(this.requirements(e)).every(([e,t])=>(n.delivered[e]??0)>=t)&&this.advance(e,t),r}observeMina(e){let t=this.states.mina;t.stage===2&&e.workers.people[0].harvested-t.baseline>=24&&this.advance(`mina`,e)}celebrate(e,t){return this.kind(e)!==`celebrate`||this.reason(e,t)||!this.near(e,t)?!1:(this.advance(e,t),!0)}advance(e,t){let n=this.states[e];n.stage++,n.work=0,t.revision++,t.message=n.stage===4?`${ke(e).title} · 完結！ ${ke(e).reward}`:`${ke(e).chapters[n.stage-1]}を終えました`}save(){return{memoryId:this.memoryId,states:structuredClone(this.states),shipped:{...this.shipped},crafted:{...this.crafted},festival:this.festival}}restore(t){if(!t||typeof t!=`object`)return!1;let n=t,r=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0;if(typeof n.memoryId!=`string`||n.memoryId.length>64||!/^[-a-zA-Z0-9]*$/.test(n.memoryId)||!n.states||Object.keys(n.states).length!==De.length||typeof n.festival!=`boolean`||!n.shipped||!n.crafted||Object.keys(n.shipped).length!==E.length||Object.keys(n.crafted).length!==F.length||E.some(e=>!r(n.shipped[e]))||F.some(e=>!r(n.crafted[e])))return!1;for(let t of De){let i=n.states[t],a=ke(t);if(!i||!r(i.stage)||i.stage>4||typeof i.choice!=`string`||!Number.isFinite(i.work)||i.work<0||i.work>=30||!r(i.baseline)||!i.delivered||typeof i.delivered!=`object`||Array.isArray(i.delivered)||(i.stage===0?i.choice!==``||i.work!==0||i.baseline!==0||Object.keys(i.delivered).length>0:a.choices.length?!a.choices.some(e=>e.id===i.choice):t===`meal`?![`bread`,`soup`,`pumpkinSoup`].includes(i.choice):i.choice!==`agreed`)||i.stage!==1&&i.work!==0||t!==`mina`&&i.baseline!==0||t===`mina`&&i.stage<2&&i.baseline!==0)return!1;let o=new e;o.states[t]=i;let s=o.requirements(t);if(Object.entries(i.delivered).some(([e,t])=>!Object.hasOwn(s,e)||!r(t)||t>(s[e]??0))||i.stage<2&&Object.keys(i.delivered).length||i.stage>=3&&t!==`mina`&&Object.entries(s).some(([e,t])=>(i.delivered[e]??0)!==t))return!1}return n.festival&&De.some(e=>n.states[e].stage!==4)?!1:(this.memoryId=n.memoryId,this.states=structuredClone(n.states),this.shipped={...n.shipped},this.crafted={...n.crafted},this.festival=n.festival,this.active=null,!0)}};function Me(e){return[...b.map(t=>({id:`project:${t.id}`,title:t.title,done:e.projects.has(t.id)})),...Dt.filter(e=>!e.id.startsWith(`resident-`)&&!b.some(t=>t.id===e.id)).map(t=>({id:`task:${t.id}`,title:t.title,done:e.completedTasks.has(t.id)})),...se.flatMap(t=>t.chapters.map((n,r)=>({id:`enterprise:${t.id}:${r+1}`,title:`${t.title} · ${n}`,done:e.enterprises.level(t.id)>r}))),...Oe.flatMap(t=>t.chapters.map((n,r)=>({id:`episode:${t.id}:${r+1}`,title:`${t.person} · ${n}`,done:e.episodes.states[t.id].stage>r}))),...F.map(t=>({id:`recipe:${t}`,title:`料理帖 · ${L[t].name}`,done:e.episodes.crafted[t]>0})),...ae.map(t=>({id:`food-order:${t.id}`,title:t.title,done:e.kitchen.orders[t.id]>0})),...E.map(t=>({id:`harvest:${t}`,title:`種の記録 · ${D[t].name}`,done:e.expertise.crops[t]>0})),{id:`breeding:hybrid`,title:`次の実りをつなぐ配合種`,done:e.hybrids.has(`kabumorokoshi`)},..._e.flatMap(t=>t.chapters.map((n,r)=>({id:`request:${t.id}:${r+1}`,title:`${t.name} · ${n.title}`,done:e.requests.progress[t.id].chapter>r})))]}var Ne=e=>{let t=Me(e);return{done:t.filter(e=>e.done).length,total:t.length,complete:t.every(e=>e.done)}},Pe={market:[`初市に、ちゃんとお客さんが来たよ。`,`看板を見て、畑の場所まで聞かれた。売り物の向こうに、作る人が見えるんだね。`,`この作物は、これから少し高く買い取るよ。うちの看板だからね。`],meal:[`今日の献立、あなたの農園でよく採れる実りから考えたの。`,`昔の味を思い出そうとしていたのに、新しい思い出までできちゃった。`,`明日も同じ鍋を火にかけるわ。いつもの味があると、人は帰ってこられるから。`],orchard:[`帳面に書いてあった木が、まだ実をつけたな。`,`ジャムの瓶を並べたら、木陰で足を止める人がいた。道を整えた甲斐があった。`,`古い実りを、次の年へ渡す。農園の仕事は、畑の外にも続いているんだな。`],mina:[`見て、わたしが収穫した分。ちゃんと数えておいたの。`,`最初は種を落とす場所も迷ってたのに、いまは葉を見れば分かるんだ。`,`この農具、大事にするね。あなたが出かけている間も、任せて。`],ren:[`段差がなくなるだけで、こんなに楽に運べるんだね。`,`荷置き場でひと息ついてたら、買い物帰りの人が声をかけてくれたよ。`,`箱を運ぶための道が、みんなの通り道になった。もう少し先まで、歩いてみようか。`],family:[`みんな、席について。今日は庭でいただきましょう。`,`お皿を運んでいたら、うちの子が「明日もここで食べたい」って。`,`あなたにも少し大きなかごを用意したの。次は、あなたの好きなものを持って来てね。`]},Fe=Oe.map(e=>({id:`ep-${e.id}-complete`,title:e.title,condition:{episode:e.id,stage:4},once:!0,priority:30,lines:[...Pe[e.id].map(t=>({speaker:e.person,portrait:`art/story/${e.portrait}.jpg`,text:t})),{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`ここにも、暮らしが戻りましたね。`}]}));Fe.push({id:`agriculture-harvest-festival`,title:`農業地区・収穫祭`,condition:{festival:!0},once:!0,priority:110,lines:[{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`畑も食卓も、みんなの仕事も。こんなにたくさんの場所へ、実りが届いたのね。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`今日は店番もひと休みだ。作った人も、運んだ人も、いっしょに食べよう。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`これで農業地区の仕事はひと区切りだ。木札に、今日の日を刻んでおく。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`一度だけ、種をまくつもりだったのに。……来年の分まで、考えています。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`その続きは、あんたの好きにしな。海へ出ても、ここはいつでも帰れる農園だ。`}]});var Ie=[...Fe,{id:`ms-01-letter`,title:`はじまりの手紙`,condition:{restoration:0},once:!0,priority:100,lines:[{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`……ここが、手紙に書いてあった畑。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`街には、だれもいない。よく育ってるのは、草だけ。`},{speaker:`手紙`,paper:!0,text:`この土地を継ぐ人へ。草に埋もれていても、土はまだ生きています。`},{speaker:`手紙`,paper:!0,text:`一度だけ、種をまいてみてください。続けられるかどうかは、それで分かります。`},{speaker:`手紙`,paper:!0,text:`もし合わなければ、荷物をまとめて構いません。誰も責めません。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`……一度だけ、やってみます。`}]},{id:`ms-02-first-shipment`,title:`はじめての出荷`,condition:{shipped:12},once:!0,priority:95,lines:[{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`木箱がいっぱいになった。これが、ちゃんとお金になるんだ。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`集荷の記録をめくったら、前の日付は四年前だった。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`四年、だれも出荷しなかった街。今日の欄に、わたしの数字が入る。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`かごに入る量は、これで全部。運ぶ回数ばかり増えてる。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`……納屋を直そう。実りを置ける場所が、先だ。`}]},{id:`ms-03-barn-opens`,title:`納屋がひらく`,condition:{project:`barn-open`},once:!0,priority:60,lines:[{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`扉が開いた。中は、思ったより広い。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`棚に、名前を書いた木札がいくつも残ってる。ぜんぶ違う字だ。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`みんな、ここに実りを持ち寄ってたんだ。一軒ずつ、順番に。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`札の裏には、収穫の数まで書いてある。だれかの一年分。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`……この納屋は、わたし一人ぶんには大きすぎる。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`埋まるところを、見てみたい。`}]},{id:`ms-04-welcome-home`,title:`ただいまの声`,condition:{project:`cottage-welcome`},once:!0,priority:80,lines:[{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`ただいま……って、言っていいのかな。ずっと空き家だったのに。`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`屋根も窓も直ってる。庭の草まで刈ってある。あなたが？`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`畑のついでに、少しずつ。`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`この家で、うちの子が育ったの。もう戻れないと思ってた。`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`荷物を解いたら、台所から始めるわ。あの窓、朝がよく入るの。`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`これから、よろしくね。`}]},{id:`ms-05-market-opens`,title:`青果市がひらく`,condition:{projects:[`town-market`,`cottage-welcome`]},once:!0,priority:70,lines:[{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`看板を掛けたよ。青果市、再開だ。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`とはいえ、並べる物がなけりゃ、ただの木箱だがね。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`作るのは、任せてください。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`頼もしいね。売り場があると、人はまず足を止める。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`足を止めた人が、そのうち買い物に来る。買い物に来た人が、住みはじめる。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`順番はいつもそれだ。四年前は、逆に減っていっただけでね。`}]},{id:`ms-06-canteen`,title:`共同食堂がそろう`,condition:{enterprise:`canteen`,level:3},once:!0,priority:50,lines:[{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`食堂に、灯りがついたわ。`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`一人ぶんの夕飯って、どうしても味気なくてね。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`今日は、何人来ました？`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`七人。となりの家の人が、鍋を持って来てくれたの。`},{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`来週はもっと増えるって。椅子が足りないかもしれない。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`椅子なら、納屋に木札と一緒に眠ってます。`}]},{id:`ms-06-depot`,title:`北の集荷所がそろう`,condition:{enterprise:`depot`,level:3},once:!0,priority:50,lines:[{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`北の集荷所、動きだしたぞ。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`畑からここまで担いで往復してたのが、嘘みたいだ。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`荷が要る場所に、道ができる。街ってのは、そうやって形になる。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`まだ、道の途中ですけどね。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`上等だよ。途中の道は、通う奴がいるって意味だ。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`四年前は、その逆をやってた。通う奴が減って、道が消えた。`}]},{id:`ms-06-seed-garden`,title:`種の保存園がそろう`,condition:{enterprise:`seed-garden`,level:3},once:!0,priority:50,lines:[{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`保存園を見てきたよ。棚がびっしりだ。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`うちの婆さんが残した袋も、名前のまま並んでた。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`売って終わりじゃないんだな。次の年に、つながる。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`来年も、ここで作りますから。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`その一言が聞きたかった。種ってのは、居座る気のある奴が撒くものだ。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`わたしも、店をたたむのはやめにするよ。`}]},{id:`ms-07-harbor-road`,title:`港へ続く道`,condition:{enterprise:`harbor-link`,level:1},once:!0,priority:40,lines:[{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`道の草を刈ったのか。海の匂いがする、久しぶりに。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`まだ、道が通っただけです。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`十分さ。道が通れば荷が動く。荷が動けば、人が来る。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`あんたが畑でやったことと、同じだよ。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`今度は、こっちが売り場になる番かもしれん。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`港にも、木札の残った納屋があるといいですね。`}]},{id:`ms-08-why-the-town-emptied`,title:`街が空いたわけ`,condition:{enterprise:`harbor-link`,level:2},once:!0,priority:40,lines:[{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`港へ運ぶ物資が、ひと通り揃ったな。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`船が止まって、荷が止まって、それから人が減った。順番はそれだ。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`あんたは畑から直しはじめた。原因とは、まるで逆の順番だよ。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`遠回りでしたか。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`いや。食う物がなけりゃ、誰も戻ってこられん。順番は合ってた。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`次は、あんたが港へ行く番だ。`}]},{id:`ms-09-our-farm`,title:`みんなの農園`,condition:{enterprise:`harbor-link`,level:3},once:!0,priority:90,lines:[{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`農園の実りが、港まで届くのね。`},{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`市の売り上げは、去年の三倍だ。去年は誰も居なかったがね。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`納屋の棚、埋まってきたぞ。木札も、書き足した分が増えた。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`ひとりの畑から、みんなの農園になったな。`},{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`……まだ、畑ですけど。`},{speaker:`ソラ`,portrait:`art/story/sora.jpg`,text:`その畑が、街を戻したんだ。行っといで、海が待ってる。`}]},{id:`ap-20`,title:`街の変化 · 20%`,condition:{restoration:20},once:!0,priority:10,lines:[{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`道が見えてきた。歩くたびに草を分けなくていい。`}]},{id:`ap-40`,title:`街の変化 · 40%`,condition:{restoration:40},once:!0,priority:10,lines:[{speaker:`{player}`,portrait:`art/story/player.jpg`,text:`案内板の字が読める。穂ノ浦。この街、こんな名前だったんだ。`}]},{id:`ap-60`,title:`街の変化 · 60%`,condition:{restoration:60},once:!0,priority:10,lines:[{speaker:`ユイ`,portrait:`art/story/yui.jpg`,text:`夜に、窓の灯りが二つ増えたの。`}]},{id:`ap-80`,title:`街の変化 · 80%`,condition:{restoration:80},once:!0,priority:10,lines:[{speaker:`ハル`,portrait:`art/story/haru.jpg`,text:`店先に椅子を出したよ。座る人がいるからね。`}]}];function Le(e,t){let n={ユイ:`cottage-welcome`,ハル:`town-market`,ソラ:`barn-open`,ミナ:`cottage-welcome`,レン:`cottage-welcome`};if(e.lines.some(e=>n[e.speaker]&&(!t.residentsArrived||!t.projects.has(n[e.speaker]))))return!1;let r=e.condition;return`episode`in r?t.episodes.states[r.episode].stage>=r.stage:`festival`in r?t.episodes.festival:`shipped`in r?t.shipped>=r.shipped:`projects`in r?r.projects.every(e=>t.projects.has(e)):`project`in r?t.projects.has(r.project):`enterprise`in r?t.enterprises.level(r.enterprise)>=r.level:t.restorationPercent>=r.restoration}var Re=class{cooldownSeconds=0;scripts;known=new Set;eligibleLastTime=new Set;unlocked=new Set;read=new Set;queue=[];active=null;constructor(e=Ie){this.scripts=e,this.known=new Set(e.map(e=>e.id))}observe(e,t=!1){let n=this.scripts.filter(t=>Le(t,e)),r=!1;for(let t of this.scripts)this.known.has(t.id)||(this.known.add(t.id),r=!0,Le(t,e)&&(this.unlocked.add(t.id),this.read.add(t.id),this.eligibleLastTime.add(t.id)));for(let e of n.sort((e,t)=>t.priority-e.priority||e.id.localeCompare(t.id))){let n=!this.unlocked.has(e.id)||!e.once&&!this.eligibleLastTime.has(e.id);this.unlocked.has(e.id)||(this.unlocked.add(e.id),r=!0),t&&this.read.add(e.id),n&&!t&&this.active?.id!==e.id&&!this.queue.includes(e.id)&&(this.queue.push(e.id),r=!0)}return this.eligibleLastTime=new Set(n.map(e=>e.id)),r}get current(){return this.scripts.find(e=>e.id===this.active?.id)}next(){if(this.active&&this.current)return!0;this.active=null;let e=this.queue.findIndex(e=>this.scripts.some(t=>t.id===e));return e<0?!1:(this.active={id:this.queue.splice(e,1)[0],line:0},!0)}advance(){return!this.active||!this.current?!1:++this.active.line>=this.current.lines.length?(this.finish(),!1):!0}step(e){this.cooldownSeconds=Math.max(0,this.cooldownSeconds-e)}finish(){this.active&&(this.read.add(this.active.id),this.active=null,this.cooldownSeconds=20)}replay(e){return!this.unlocked.has(e)||!this.scripts.some(t=>t.id===e)||this.active?!1:(this.queue=this.queue.filter(t=>t!==e),this.active={id:e,line:0},!0)}save(){return{cooldownSeconds:this.cooldownSeconds,known:[...this.known],unlocked:[...this.unlocked],read:[...this.read],queue:[...this.queue],active:this.active?{...this.active}:null}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>Array.isArray(e)&&e.length<=1e3&&e.every(e=>typeof e==`string`&&/^[a-z0-9-]+$/.test(e))&&new Set(e).size===e.length;if(!n(t.known)||!n(t.unlocked)||!n(t.read)||!n(t.queue)||t.unlocked.some(e=>!t.known.includes(e))||[...t.read,...t.queue].some(e=>!t.unlocked.includes(e))||t.active!==null&&(!t.active||!t.unlocked.includes(t.active.id)||t.queue.includes(t.active.id)||!Number.isInteger(t.active.line)||t.active.line<0||t.active.line>=100))return!1;let r=this.scripts.find(e=>e.id===t.active?.id);return r&&t.active.line>=r.lines.length||t.cooldownSeconds!==void 0&&(!Number.isFinite(t.cooldownSeconds)||t.cooldownSeconds<0||t.cooldownSeconds>20)?!1:(this.cooldownSeconds=t.cooldownSeconds??0,this.known=new Set(t.known),this.unlocked=new Set(t.unlocked),this.read=new Set(t.read),this.queue=[...t.queue],this.active=t.active?{...t.active}:null,!0)}};function ze(e,t){if(t>=28||!e||typeof e!=`object`)return e;let n=structuredClone(e);for(let e of Object.values(n)){let t=e?.position;t&&Number.isFinite(t.x)&&Number.isFinite(t.z)&&p.some(e=>m(t,e))&&t.x>16.4&&t.x<19.6&&t.z>-4.6&&t.z<-1.4&&(e.position={x:c.neighborhood.x,z:c.neighborhood.z})}return n}var Be=[{title:`中央の農地`,first:0,last:9,station:{x:7.8,z:-5.2}},{title:`南の草地`,first:9,last:15,station:{x:7.8,z:10.7}},{title:`北の農地`,first:15,last:27,station:{x:7.8,z:-14.2}}];function Ve(e,t){let n=Be[e];return t.plots.map((e,t)=>t).filter(e=>e>=n.first&&e<n.last&&t.isUnlocked(e)&&t.plots[e].land===`tilled`)}var He=[`seeder-second`,`seeder-third`],Ue=class{slot;anchor=-1;paused=!1;planted=0;active=-1;progress=0;cursor=-1;constructor(e){this.slot=e}owned(e){return e.investments.has(He[this.slot-1])}get hasProgress(){return this.anchor>=0||this.paused||this.planted>0}plots(e){return this.owned(e)?Ve(this.slot,e):[]}reset(){this.active=-1,this.progress=0,this.cursor=-1}configure(e,t,n){return!this.owned(n)||typeof t!=`boolean`||!Number.isInteger(e)||e<-1||e>=n.plots.length||e>=0&&(!n.isUnlocked(e)||n.plots[e].land!==`tilled`||n.seedRowTaken(e,this.slot))?!1:(this.anchor=e,this.paused=t,this.reset(),n.revision++,!0)}step(e,t,n){if(!this.owned(n))return;this.paused=!1,this.anchor=this.plots(n)[0]??-1;let r=this.plots(n),i=e=>n.plots[e].stage===`empty`&&n.active!==e&&n.playerPriorityPlot!==e&&!n.workers.busy(e)&&!n.machineBusy(e);if(this.active>=0&&(!r.includes(this.active)||!i(this.active))&&this.reset(),this.active<0){let e=r.indexOf(this.cursor)+1;this.active=[...r.slice(e),...r.slice(0,e)].find(i)??-1}if(this.active<0||(this.progress+=e/2.4,this.progress<1))return;let a=n.plots[this.active];a.crop=a.nextCrop,a.stage=`growing`,a.readyAt=t+Math.round(n.growSeconds(a.crop)*1e3),this.planted++,this.cursor=this.active,this.active=-1,this.progress=0,n.revision++}save(){return{anchor:this.anchor,paused:this.paused,planted:this.planted}}restore(e,t){if(!e||typeof e!=`object`)return!1;let n=e;return!Number.isInteger(n.anchor)||n.anchor<-1||n.anchor>=t.plots.length||typeof n.paused!=`boolean`||!Number.isSafeInteger(n.planted)||n.planted<0||n.anchor>=0&&(!t.isUnlocked(n.anchor)||t.plots[n.anchor].land!==`tilled`)||!this.owned(t)&&(n.anchor>=0||n.paused||n.planted>0)?!1:(this.anchor=this.plots(t)[0]??-1,this.paused=!1,this.planted=n.planted,this.reset(),!0)}},We=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z);function Ge(e,t,n,r){if(!n(e)||!n(t))return null;let i=(e,t)=>{let r=Math.max(1,Math.ceil(We(e,t)/.1));for(let i=1;i<=r;i++)if(!n({x:e.x+(t.x-e.x)*i/r,z:e.z+(t.z-e.z)*i/r}))return!1;return!0};if(i(e,t))return We(e,t)<.03?[]:[t];let a=.4,o=Math.floor((r.maxX-r.minX)/a)+1,s=Math.floor((r.maxZ-r.minZ)/a)+1,c=e=>({x:r.minX+e%o*a,z:r.minZ+Math.floor(e/o)*a}),l=new Map,u=(e,t)=>{if(e<0||e>=o||t<0||t>=s)return!1;let r=t*o+e;if(!l.has(r)){let e=c(r);l.set(r,n(e)&&[{x:e.x-.12,z:e.z},{x:e.x+.12,z:e.z},{x:e.x,z:e.z-.12},{x:e.x,z:e.z+.12}].every(n))}return l.get(r)},d=e=>{let t=Math.round((e.x-r.minX)/a),n=Math.round((e.z-r.minZ)/a),s=[];for(let e=-2;e<=2;e++)for(let r=-2;r<=2;r++)u(t+r,n+e)&&s.push((n+e)*o+t+r);return s.sort((t,n)=>We(c(t),e)-We(c(n),e)).find(t=>i(e,c(t)))},f=d(e),p=d(t);if(f===void 0||p===void 0)return null;let m=new Float64Array(o*s).fill(1/0),h=new Int32Array(o*s).fill(-1),g=new Set,_=e=>{let t=Math.abs(e%o-p%o),n=Math.abs(Math.floor(e/o)-Math.floor(p/o));return Math.max(t,n)+(Math.SQRT2-1)*Math.min(t,n)},v=[],y=(e,t)=>{let n=v.length;for(v.push({id:e,score:t});n>0;){let e=n-1>>1;if(v[e].score<=t)break;[v[e],v[n]]=[v[n],v[e]],n=e}},b=()=>{let e=v[0],t=v.pop();if(v.length){v[0]=t;let e=0;for(;;){let t=e*2+1;if(t>=v.length||(t+1<v.length&&v[t+1].score<v[t].score&&t++,v[e].score<=v[t].score))break;[v[e],v[t]]=[v[t],v[e]],e=t}}return e.id};m[f]=0,y(f,_(f));let x=!1;for(;v.length;){let e=b();if(g.has(e))continue;if(e===p){x=!0;break}g.add(e);let t=e%o,n=Math.floor(e/o);for(let r=-1;r<=1;r++)for(let i=-1;i<=1;i++){if(i===0&&r===0||!u(t+i,n+r)||i!==0&&r!==0&&(!u(t+i,n)||!u(t,n+r)))continue;let a=(n+r)*o+t+i,s=m[e]+(i&&r?Math.SQRT2:1);s<m[a]&&(m[a]=s,h[a]=e,y(a,s+_(a)))}}if(!x)return null;let S=[t];for(let e=p;e!==-1;e=h[e])S.push(c(e));S.reverse();let C=[],w=e,T=0;for(;T<S.length;){let e=S.length-1;for(;e>T&&!i(w,S[e]);)e--;if(!i(w,S[e]))return null;C.push(S[e]),w=S[e],T=e+1}return C}var Ke=c.cottage,qe=c.neighborhood,Je=c[`farm-return`],Ye=e=>e===`depot`?`北の集荷所`:`納屋の倉庫`,Xe=e=>e===`depot`?R(`depot`):xt,Ze=e=>e.enterprises.level(`depot`)>=1?[`barn`,`depot`]:[`barn`];function Qe(e,t){return Ze(t).map(n=>({id:n,route:Ge(e,Xe(n),e=>t.canStand(e),l)})).filter(e=>e.route!==null).map(t=>({...t,length:t.route.reduce((n,r,i)=>{let a=i?t.route[i-1]:e;return n+Math.hypot(r.x-a.x,r.z-a.z)},0)})).sort((e,t)=>e.length-t.length)[0]}var $e=class{id;position;bag=new ne(E);harvested=0;planted=0;seed;destination=`barn`;target=-1;route=[];progress=0;action=`idle`;heading=0;constructor(e){this.id=e,this.position={x:14.5,z:1.5},this.seed=e===`mina`?8731:4973}get count(){return E.reduce((e,t)=>e+this.bag.counts[t],0)}reset(){this.target=-1,this.route=[],this.progress=0,this.action=`idle`}random(){return this.seed=Math.imul(this.seed,1664525)+1013904223>>>0,this.seed/4294967296}save(){return{position:{...this.position},goods:this.bag.save(),harvested:this.harvested,planted:this.planted,seed:this.seed}}restore(e,t){if(!e||typeof e!=`object`)return!1;let n=e,r=e=>Number.isSafeInteger(e)&&e>=0;if(!n.position||!Number.isFinite(n.position.x)||!Number.isFinite(n.position.z)||!t.canStand(n.position)||f(n.position)||!r(n.harvested)||!r(n.planted)||!r(n.seed)||n.seed>4294967295||!n.goods)return!1;let i=Object.fromEntries(E.map(e=>[e,Array.isArray(n.goods[e])?n.goods[e].reduce((e,t)=>e+t,0):-1])),a=new ne(E);return!a.restore(n.goods,i)||Object.values(i).reduce((e,t)=>e+t,0)>12||Object.values(i).some(e=>!r(e))||E.some(e=>i[e]>0&&!t.cropUnlocked(e))||n.harvested<Object.values(i).reduce((e,t)=>e+t,0)?!1:(this.position={...n.position},this.bag=a,this.harvested=n.harvested,this.planted=n.planted,this.seed=n.seed,this.reset(),!0)}},et=class{people=[new $e(`mina`),new $e(`ren`)];enabled(e,t){return t.residentsArrived&&t.investments.has(e.id===`mina`?`helper`:`helper-area`)}busy(e,t){return this.people.some(n=>n!==t&&n.target===e)}cancel(){for(let e of this.people)e.reset()}step(e,t,n){for(let r of this.people){if(!this.enabled(r,n)){r.reset();continue}let i=e=>{let t=n.plots[e];return n.isUnlocked(e)&&t.land===`tilled`&&n.active!==e&&n.playerPriorityPlot!==e&&!n.machineBusy(e)&&!n.seedingBusy(e)&&!this.busy(e,r)&&(t.stage===`empty`||t.stage===`ready`&&r.count+D[t.crop].yield<=12)};if(r.target>=0&&!i(r.target)&&r.reset(),n.helperPlot<0&&r.action!==`returning`&&r.reset(),r.action===`idle`){let e=n.helperPlot<0?[]:n.plots.map((e,t)=>t).filter(i).map(e=>({i:e,score:Math.hypot(n.plots[e].x-r.position.x,n.plots[e].z-r.position.z)*(.6+r.random()*.8)})).sort((e,t)=>e.score-t.score);if(r.count>=9||r.count>0&&!e.length||n.helperPlot<0&&r.count>0){let e=Qe(r.position,n);if(!e)continue;r.route=e.route,r.destination=e.id,r.action=`returning`}else if(e.length)for(let{i:t}of e){let e=n.plots[t],i=Ge(r.position,{x:e.x,z:e.z+1.02},e=>n.canStand(e),l);if(i){r.target=t,r.route=i,r.action=`walking`;break}}}if(r.route.length){let t=e*2.6*n.movementFactor(r.position);for(;t>0&&r.route.length;){let e=r.route[0],n=e.x-r.position.x,i=e.z-r.position.z,a=Math.hypot(n,i),o=Math.min(a,t);a>0&&(r.heading=Math.atan2(n,i),r.position.x+=n/a*o,r.position.z+=i/a*o),t-=o,a<=o&&r.route.shift()}continue}if(r.action===`returning`){let e=Xe(r.destination);if(Math.hypot(r.position.x-e.x,r.position.z-e.z)>1.35){r.reset();continue}let t=n.storageCapacity-n.stored;for(let e of E){let i=Math.min(t,r.bag.counts[e]);i&&(r.bag.moveTo(n.stockQuality,e,i),t-=i,n.revision++)}r.count===0&&r.reset();continue}if(r.target<0)continue;let a=n.plots[r.target];if(r.action=a.stage===`empty`?`planting`:`harvesting`,r.progress+=e/((r.action===`planting`?2:3)*(r.id===`mina`&&n.episodes.done(`mina`)?.8:1)),!(r.progress<1)){if(r.action===`planting`)a.crop=a.nextCrop,a.stage=`growing`,a.readyAt=t+Math.round(n.growSeconds(a.crop)*1e3),r.planted++;else{let e=D[a.crop].yield;r.bag.add(a.crop,e,n.expertise.harvest(a.crop,r.id,n.research)),a.stage=`empty`,r.harvested+=e,n.helperHarvested+=e}n.revision++,r.reset()}}}save(){return Object.fromEntries(this.people.map(e=>[e.id,e.save()]))}restore(e,t){if(!e||typeof e!=`object`||Object.keys(e).length!==2)return!1;let n=e,r=[new $e(`mina`),new $e(`ren`)];return!r.some(e=>!e.restore(n[e.id],t)||!t.investments.has(e.id===`mina`?`helper`:`helper-area`)&&(e.count>0||e.harvested>0||e.planted>0))&&(this.people=r,!0)}},tt=[{title:`小さな収穫ロボット`,seconds:6,speed:.65,penalty:2},{title:`精密収穫ユニット`,seconds:3,speed:1.25,penalty:1},{title:`高性能収穫ユニット`,seconds:1.2,speed:2.5,penalty:0}],nt=[[`harvester`,`harvester-precision`,`harvester-premium`],[`harvester-second`,`harvester-second-precision`,`harvester-second-premium`],[`harvester-third`,`harvester-third-precision`,`harvester-third-premium`]],rt=(e,t=`barn`)=>{let n=Xe(t);return[{x:e.x,z:e.z+1.4},{x:-2,z:e.z+1.4},{x:-2,z:n.z},{x:n.x,z:n.z}]},it=(e,t)=>Ze(t).sort((t,n)=>at(rt(e,t))-at(rt(e,n)))[0];function at(e){return e.slice(1).reduce((t,n,r)=>t+Math.hypot(n.x-e[r].x,n.z-e[r].z),0)}function ot(e,t){for(let n=1;n<e.length;n++){let r=e[n-1],i=e[n],a=Math.hypot(i.x-r.x,i.z-r.z);if(!(a<1e-6)){if(t<=a)return{x:r.x+(i.x-r.x)*t/a,z:r.z+(i.z-r.z)*t/a};t-=a}}return{...e.at(-1)}}var st=class{slot;constructor(e=0){this.slot=e}owned(e){return e.investments.has(nt[this.slot][0])}anchor=-1;paused=!1;harvested=0;delivered=0;loads=[];active=-1;progress=0;cursor=-1;tier(e){return e.investments.has(nt[this.slot][2])?2:+!!e.investments.has(nt[this.slot][1])}get inTransit(){return this.loads.reduce((e,t)=>e+t.count,0)}get hasProgress(){return this.anchor!==-1||this.paused||this.harvested>0||this.delivered>0||this.loads.length>0}plots(e){return this.owned(e)?Ve(this.slot,e):[]}configure(e,t,n){return!this.owned(n)||!Number.isInteger(e)||e<-1||e>=n.plots.length||e>=0&&(!n.isUnlocked(e)||n.plots[e].land!==`tilled`)||e>=0&&n.machineLines.some(t=>t!==this&&t.owned(n)&&t.anchor>=0&&Math.floor(t.anchor/3)===Math.floor(e/3))?!1:(this.anchor=e,this.paused=t,this.active=-1,this.progress=0,this.cursor=-1,n.revision++,!0)}step(e,t){if(!this.owned(t))return;this.paused=!1,this.anchor=this.plots(t)[0]??-1;let n=tt[this.tier(t)];for(let r of this.loads){let i=at(rt(t.plots[r.plot],r.destination));r.travelled=Math.min(i,r.travelled+e*n.speed)}this.loads=this.loads.filter(e=>e.travelled<at(rt(t.plots[e.plot],e.destination))||t.stored+e.count>t.storageCapacity||(t.stockQuality.add(e.crop,e.count,e.grade),this.delivered+=e.count,t.revision++,!1));let r=e=>{let n=t.plots[e];return n.stage===`ready`&&t.active!==e&&t.playerPriorityPlot!==e&&!t.machineBusy(e,this)&&!t.workers.busy(e)&&this.inTransit+D[n.crop].yield<=12},i=this.plots(t);if(this.active>=0&&(!i.includes(this.active)||!r(this.active))&&(this.active=-1,this.progress=0),this.active<0){let e=i.indexOf(this.cursor)+1;this.active=[...i.slice(e),...i.slice(0,e)].find(r)??-1}if(this.active<0||(this.progress+=e/n.seconds,this.progress<1))return;let a=t.plots[this.active],o=D[a.crop].yield,s=t.expertise.machineHarvest(a.crop,t.research,this.tier(t));this.loads.push({plot:this.active,crop:a.crop,count:o,grade:s,travelled:0,destination:it(a,t)}),a.stage=`empty`,this.harvested+=o,this.cursor=this.active,this.active=-1,this.progress=0,t.revision++}save(){return{anchor:this.anchor,paused:this.paused,harvested:this.harvested,delivered:this.delivered,loads:this.loads.map(e=>({...e}))}}restore(e,t){if(!e||typeof e!=`object`)return!1;let n=e,r=e=>Number.isSafeInteger(e)&&e>=0;if(!Number.isInteger(n.anchor)||n.anchor<-1||n.anchor>=t.plots.length||typeof n.paused!=`boolean`||!r(n.harvested)||!r(n.delivered)||!Array.isArray(n.loads)||n.loads.length>12||n.anchor>=0&&(!t.isUnlocked(n.anchor)||t.plots[n.anchor].land!==`tilled`)||n.loads.some(e=>!e||!Ze(t).includes(e.destination)||!r(e.plot)||e.plot>=t.plots.length||!t.isUnlocked(e.plot)||!E.includes(e.crop)||!t.cropUnlocked(e.crop)||!r(e.grade)||e.grade>5||!r(e.count)||e.count!==D[e.crop].yield||!Number.isFinite(e.travelled)||e.travelled<0||e.travelled>at(rt(t.plots[e.plot],e.destination))))return!1;let i=n.loads.reduce((e,t)=>e+t.count,0);return i>12||n.harvested!==n.delivered+i||!this.owned(t)&&(n.anchor!==-1||n.paused||n.harvested>0)?!1:(this.anchor=this.plots(t)[0]??-1,this.paused=!1,this.harvested=n.harvested,this.delivered=n.delivered,this.loads=n.loads.map(e=>({...e})),this.active=-1,this.progress=0,this.cursor=-1,!0)}},ct=class{paid={};target=null;dwell=0;fraction=0;reset(){this.target=null,this.dwell=0,this.fraction=0}step(e,t,n,r){if(t||!n||e<=0)return this.reset(),{charged:0,complete:!1};n.id!==this.target&&(this.reset(),this.target=n.id);let i=this.dwell;this.dwell+=e;let a=Math.max(0,this.dwell-1)-Math.max(0,i-1),o=Math.max(0,n.cost-(this.paid[n.id]??0));if(r<=0||o<=0)return this.fraction=0,{charged:0,complete:o===0};this.fraction+=a*n.cost/2;let s=Math.min(r,o,Math.floor(this.fraction));return this.fraction-=s,s>0&&(this.paid[n.id]=(this.paid[n.id]??0)+s),s===r&&(this.fraction=0),{charged:s,complete:s===o}}save(){return{...this.paid}}restore(e,t,n){if(!e||typeof e!=`object`||Array.isArray(e))return!1;let r=Object.entries(e);return r.every(([e,r])=>{let i=t.find(t=>t.id===e);return i&&!n(e)&&Number.isSafeInteger(r)&&r>0&&r<i.cost})?(this.paid=Object.fromEntries(r),this.reset(),!0):!1}},lt=[`moving`,`working`,`looking`,`notebook`,`idle`,`unobserved`],ut={shipment:`最初の出荷`,investment:`最初の投資`,automation:`初めて作業を任せた日`,"phase-2":`手入れの始まった街`,"phase-3":`農園が育つ街`,"phase-4":`暮らしの戻る街`,complete:`農業地区の復興`},dt=class{seconds={moving:0,working:0,looking:0,notebook:0,idle:0,unobserved:0};milestones={};partial=!1;previous=null;activity=`excluded`;inputAt=-1/0;get activeSeconds(){return this.seconds.moving+this.seconds.working+this.seconds.looking}sample(e,t){if(!(!Number.isFinite(e)||e<0||this.previous!==null&&e<this.previous)){if(this.previous!==null&&this.activity!==`excluded`){let t=e-this.previous;if(t>2e3)this.seconds.unobserved+=t/1e3;else{let n=Math.max(0,Math.min(e,this.inputAt+3e4)-this.previous)/1e3;this.seconds[this.activity]+=n,this.seconds.idle+=t/1e3-n}}this.previous=e,this.activity=t}}interact(e,t){this.sample(e,t),Number.isFinite(e)&&e>=0&&this.previous===e&&(this.inputAt=e)}observe(e,t=!1){for(let n of e)Object.hasOwn(this.milestones,n)||(this.milestones[n]=t?null:{active:this.activeSeconds,notebook:this.seconds.notebook})}save(){return{seconds:{...this.seconds},partial:this.partial,milestones:Object.fromEntries(Object.entries(this.milestones).map(([e,t])=>[e,t?{...t}:null]))}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e,n=e=>typeof e==`number`&&Number.isFinite(e)&&e>=0&&e<=2**53-1;if(!t.seconds||lt.some(e=>!n(t.seconds[e]))||typeof t.partial!=`boolean`||!t.milestones||typeof t.milestones!=`object`||Array.isArray(t.milestones))return!1;let r=t.seconds.moving+t.seconds.working+t.seconds.looking;return Object.entries(t.milestones).every(([e,i])=>Object.hasOwn(ut,e)&&(i===null||typeof i==`object`&&n(i.active)&&i.active<=r&&n(i.notebook)&&i.notebook<=t.seconds.notebook))?(this.seconds={...t.seconds},this.milestones=Object.fromEntries(Object.entries(t.milestones).map(([e,t])=>[e,t?{...t}:null])),this.partial=t.partial,this.previous=null,this.activity=`excluded`,this.inputAt=-1/0,!0):!1}},ft={all:{title:`余りをすべて出荷する`,keep:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}},custom:{title:`作物ごとに数を決める`,keep:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}},kitchen:{title:`選んだ料理の材料を残す`,keep:{corn:6,turnip:4,pumpkin:0,kabumorokoshi:0}},pantry:{title:`街への納品分を残す`,keep:{corn:12,turnip:12,pumpkin:0,kabumorokoshi:0}}},pt={seconds:12,load:12,fee:1},mt=class{enabled=!1;policy=`kitchen`;custom={corn:0,turnip:0,pumpkin:0,kabumorokoshi:0};sold=0;earned=0;progress=0;get hasProgress(){return this.enabled||this.sold>0||this.earned>0||this.policy!==`kitchen`||E.some(e=>this.custom[e]>0)}configure(e,t,n){return!n.residentsArrived||!n.investments.has(`driver`)||typeof e!=`boolean`||!Object.hasOwn(ft,t)?!1:(this.enabled=e,this.policy=t,this.progress=0,n.revision++,!0)}reserves(e){return this.policy===`custom`?{...this.custom}:this.policy===`kitchen`&&e.kitchen.plan!==`none`?{...L[e.kitchen.plan].needs}:{...ft[this.policy].keep}}setReserve(e,t,n){return!n.residentsArrived||!n.investments.has(`driver`)||!E.includes(e)||!Number.isSafeInteger(t)||t<0||t>240?!1:(this.custom[e]=t,this.progress=0,n.revision++,!0)}available(e){let t=this.reserves(e);return E.reduce((n,r)=>n+Math.max(0,e.stock[r]-t[r]),0)}step(e,t){if(!t.residentsArrived||!this.enabled||!t.investments.has(`driver`)||this.available(t)===0){this.progress=0;return}if(this.progress+=e/pt.seconds,this.progress<1)return;let n=this.reserves(t),r=pt.load,i=0,a=0;for(let e of E){let o=Math.min(r,Math.max(0,t.stock[e]-n[e]));a+=t.stockQuality.value(e,t.salePrice(e),o)-o*pt.fee,t.stock[e]-=o,t.episodes.shipped[e]+=o,r-=o,i+=o}t.coins+=a,t.shipped+=i,this.sold+=i,this.earned+=a,this.progress=0,t.revision++}save(){return{enabled:this.enabled,policy:this.policy,custom:{...this.custom},sold:this.sold,earned:this.earned}}restore(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.enabled!=`boolean`||!Object.hasOwn(ft,t.policy)||!Number.isSafeInteger(t.sold)||t.sold<0||!Number.isSafeInteger(t.earned)||t.earned<0||t.sold===0&&t.earned!==0||!t.custom||typeof t.custom!=`object`||Array.isArray(t.custom)||Object.keys(t.custom).length!==E.length||E.some(e=>!Number.isSafeInteger(t.custom[e])||t.custom[e]<0||t.custom[e]>240)?!1:(this.custom={...t.custom},this.enabled=t.enabled,this.policy=t.policy,this.sold=t.sold,this.earned=t.earned,this.progress=0,!0)}},ht={entry:c[`harbor-entry`],nets:c[`harbor-nets`],sales:c[`harbor-sales`],pier:c[`harbor-pier`],capacity:600,handCapacity:24,price:8,voyageSeconds:600,catch:120,supplyPerVoyage:6,bonusPerSupply:10},gt=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z)<1.2,_t=e=>e===`pier`?ht.pier:ht.nets,vt=class{cleaned=!1;pier=!1;boat=!1;fish=0;sold=0;supplied=0;supply=`none`;enabled=!1;voyageElapsed=0;boatCargo=0;trips=0;lastCatch=0;landed=0;donated=0;unloadSeconds=0;active=null;progress=0;get capacity(){return this.boat?ht.capacity:ht.handCapacity}get boatProgress(){return this.voyageElapsed/ht.voyageSeconds}get secondsLeft(){return Math.max(0,Math.ceil(ht.voyageSeconds-this.voyageElapsed))}get voyageState(){return this.boat?this.voyageElapsed>=ht.voyageSeconds?`水揚げ待ち`:this.boatCargo>0?this.voyageElapsed<8?`出港中`:this.secondsLeft<=8?`帰港中`:`漁に出ています`:this.enabled?this.fish>=this.capacity?`保管場所の空き待ち`:`出港準備中`:`停泊中`:`未導入`}get workPoint(){return this.active===`repairing`?ht.pier:this.active?ht.nets:void 0}get points(){return(this.cleaned?20:0)+(this.pier?60:0)+(this.boat?30:0)+(this.sold>=12?20:0)+(this.supplied>=6?30:0)}get percent(){return Math.min(100,Math.floor(this.points/10))}get hasProgress(){return this.cleaned||this.pier||this.boat||this.fish>0||this.sold>0||this.supplied>0||this.supply!==`none`}interrupt(){this.active=null,this.progress=0}reason(e,t){return t.agricultureComplete?e===`nets`?this.cleaned?`片付け済み`:``:this.pier?`修理済み`:this.cleaned?this.sold<12?`魚をあと${12-this.sold}匹出荷しよう`:t.coins<200?`あと${200-t.coins}メニー`:``:`先に浜の網を片付けよう`:`農業地区を復興すると港へ進めます`}start(e,t){return this.reason(e,t)||!gt(t.player,_t(e))?!1:(t.interrupt(),this.active=e===`nets`?`cleaning`:`repairing`,!0)}buyBoat(e){return!e.agricultureComplete||!this.pier||this.boat||e.coins<400?!1:(e.coins-=400,this.boat=!0,this.enabled=!0,e.revision++,e.message=`漁船が出漁します！ 約10分ごとに120匹を水揚げします。`,!0)}configure(e,t){return typeof e!=`boolean`||!this.boat||!t.agricultureComplete?!1:(this.enabled=e,t.revision++,!0)}setSupply(e,t){return!t.agricultureComplete||e!==`none`&&!E.includes(e)?!1:(this.supply=e,t.revision++,!0)}catchFish(e){let t=this.capacity-this.fish;if(t<=0)return!1;let n=this.supply!==`none`&&e.stock[this.supply]>0&&t>=2;return n&&(e.stock[this.supply]--,this.supplied++),this.fish+=n?2:1,e.revision++,!0}automate(e,t){if(!Number.isFinite(e)||e<=0||!t.agricultureComplete||!this.boat)return;this.unloadSeconds=Math.max(0,this.unloadSeconds-e);let n=e;for(;n>0;){if(this.boatCargo===0){if(!this.enabled||this.fish>=this.capacity)return;let e=this.supply===`none`?0:Math.min(ht.supplyPerVoyage,t.stock[this.supply]);e&&(t.stock[this.supply]-=e,this.supplied+=e),this.boatCargo=ht.catch+e*ht.bonusPerSupply,this.voyageElapsed=0,t.revision++}if(this.voyageElapsed<ht.voyageSeconds){let e=Math.min(n,ht.voyageSeconds-this.voyageElapsed);if(this.voyageElapsed+=e,n-=e,this.voyageElapsed<ht.voyageSeconds)return;this.trips++,this.lastCatch=this.boatCargo,t.revision++}let e=Math.min(this.boatCargo,this.capacity-this.fish);if(e>0&&(this.fish+=e,this.boatCargo-=e,this.landed+=e,this.unloadSeconds=8,t.revision++,t.message=`漁船が帰港！ ${e}匹を水揚げしました。`),this.boatCargo>0)return;this.voyageElapsed=0}}canteenOffer(e){let t=e.enterprises.states.canteen;return!this.pier||!t.cleared||t.level===3||e.enterprises.reason(`canteen`,e)?0:Math.min(20,this.fish,Math.ceil((R(`canteen`).targets[t.level]-t.contributed)/ht.price))}deliverToCanteen(e){let t=this.canteenOffer(e);if(!t||!gt(e.player,ht.sales))return!1;let n=e.enterprises.states.canteen,r=R(`canteen`).targets[n.level];return this.fish-=t,this.donated+=t,n.contributed=Math.min(r,n.contributed+t*ht.price),e.revision++,e.message=`食堂に魚を${t}匹届けました。街の共同食堂の復興が進みます。`,!0}sell(e){if(!gt(e.player,ht.sales)||!this.fish)return!1;let t=this.fish;return this.sold+=t,e.coins+=t*ht.price,this.fish=0,e.revision++,e.message=`魚を${t}匹出荷して +${t*ht.price} メニー！`,!0}step(e,t){if(t.agricultureComplete){if(this.active){this.progress+=e/(this.active===`cleaning`?3:this.active===`repairing`?5:4),this.progress>=1&&(this.active===`cleaning`?(this.cleaned=!0,t.message=`浜が片付いた！ ここで網を引いてみよう。`,t.revision++):this.active===`repairing`?this.reason(`pier`,t)||(t.coins-=200,this.pier=!0,t.revision++,t.message=`桟橋が直った！ 漁船を迎えられます。`):this.catchFish(t)&&(t.message=`魚が揚がった！ 水揚げ箱に集めよう。`),this.interrupt());return}(this.pier||!this.sell(t))&&gt(t.player,ht.nets)&&this.fish<this.capacity&&(this.active=this.cleaned?`fishing`:`cleaning`)}}save(){return{cleaned:this.cleaned,pier:this.pier,boat:this.boat,fish:this.fish,sold:this.sold,supplied:this.supplied,supply:this.supply,enabled:this.enabled,voyageElapsed:this.voyageElapsed,boatCargo:this.boatCargo,trips:this.trips,lastCatch:this.lastCatch,landed:this.landed,donated:this.donated}}restore(e,t=!1){if(!e||typeof e!=`object`)return!1;let n=e,r=t?{...n,enabled:n.boat,voyageElapsed:0,boatCargo:0,trips:0,lastCatch:0,landed:0,donated:0}:n;return[`cleaned`,`pier`,`boat`,`enabled`].some(e=>typeof r[e]!=`boolean`)||[r.fish,r.sold,r.supplied,r.boatCargo,r.trips,r.lastCatch,r.landed,r.donated].some(e=>!Number.isSafeInteger(e)||e<0)||r.fish>(r.boat?ht.capacity:ht.handCapacity)||r.supply!==`none`&&!E.includes(r.supply)||r.pier&&(!r.cleaned||r.sold<12)||r.boat&&!r.pier||(r.fish>0||r.sold>0||r.supplied>0)&&!r.cleaned||!Number.isFinite(r.voyageElapsed)||r.voyageElapsed<0||r.voyageElapsed>ht.voyageSeconds||r.boatCargo>180||r.lastCatch>180||!r.boat&&(r.enabled||r.voyageElapsed||r.boatCargo||r.trips||r.lastCatch||r.landed)||r.voyageElapsed>0&&r.boatCargo===0||r.trips===0&&(r.lastCatch||r.landed)||r.donated>0&&!r.pier||r.voyageElapsed===ht.voyageSeconds&&r.trips===0||r.boatCargo>0&&r.voyageElapsed<ht.voyageSeconds&&(r.boatCargo<120||r.boatCargo%10!=0)||r.landed>r.trips*180||r.trips>0&&r.lastCatch<120?!1:(Object.assign(this,Object.fromEntries(Object.keys(this.save()).map(e=>[e,r[e]]))),this.interrupt(),this.unloadSeconds=0,!0)}},yt={speed:3.3,range:1.35,clearSeconds:1.8,tillSeconds:1.5,plantSeconds:.8,harvestSeconds:1.1,growSeconds:18,capacity:24,price:5,stagePoints:1e3},bt=[{id:`expansion`,title:`北の土地を開く`,price:600,detail:`畑を6区画から9区画へ。新しい土地は自分で片付けます。`,tradeoff:`収量を増やせるぶん、手入れと運搬が増えます。`},{id:`north-meadow`,title:`北の草原を開く`,price:3600,detail:`北の通り沿いに6区画を開きます。既存の農地と独立して購入できます。`,tradeoff:`土地から片付け、新しい生産拠点を育てます。`},{id:`north-ridge`,title:`北の奥地を開く`,price:7200,detail:`さらに北へ6区画。広い農園の奥にも拠点を作れます。`,tradeoff:`運ぶ距離が長くなります。大きなかごや運搬への投資も考えよう。`},{id:`harvester`,title:`小さな収穫ロボット`,price:3600,minimumGrade:2,requires:`barn-open`,detail:`中央の最大9区画を6秒ずつ収穫し、コンベアで倉庫へ運びます。作物の到達品質から2ランク下がります（下限E）。`,tradeoff:`種まきは別の担当。移動中も働きますが、運搬はゆっくりです。`},{id:`harvester-precision`,title:`精密収穫ユニット`,price:9e3,equipment:`harvester`,detail:`収穫を3秒に短縮。品質低下を1ランクに抑え、運搬も速くします。`,tradeoff:`手作業の品質に近づけたいときの設備更新。`},{id:`harvester-premium`,title:`高性能収穫ユニット`,price:18e3,equipment:`harvester-precision`,detail:`1.2秒で収穫し、作物の到達品質を維持。コンベアも最速になります。`,tradeoff:`設備投資は大きめ。品種の熟練は作物を育てて磨きます。`},{id:`harvester-second`,title:`南の収穫設備`,price:7200,minimumGrade:2,requires:`barn-open`,detail:`南の農地に2台目の収穫ロボットを設置します。6秒で収穫、品質は2ランク低下。`,tradeoff:`既存ラインの更新とは別の投資。種まきや運搬の量も考えて増設しよう。`},{id:`harvester-second-precision`,title:`第2ラインの精密ユニット`,price:9e3,equipment:`harvester-second`,detail:`第2ラインを3秒収穫・品質低下1ランクへ更新します。`,tradeoff:`ほかのラインの性能は変わりません。`},{id:`harvester-second-premium`,title:`第2ラインの高性能ユニット`,price:18e3,equipment:`harvester-second-precision`,detail:`第2ラインを1.2秒収穫・品質維持・高速運搬へ更新します。`,tradeoff:`高品質を育てた列に集中投資できます。`},{id:`harvester-third`,title:`北の収穫設備`,price:14400,minimumGrade:2,requires:`barn-open`,detail:`北の草原・奥地の最大12区画を常時担当します。`,tradeoff:`最初は6秒収穫・品質低下2ランク。全ラインを買う必要はありません。`},{id:`harvester-third-precision`,title:`第3ラインの精密ユニット`,price:9e3,equipment:`harvester-third`,detail:`第3ラインを3秒収穫・品質低下1ランクへ更新します。`,tradeoff:`ほかのラインの性能は変わりません。`},{id:`harvester-third-premium`,title:`第3ラインの高性能ユニット`,price:18e3,equipment:`harvester-third-precision`,detail:`第3ラインを1.2秒収穫・品質維持・高速運搬へ更新します。`,tradeoff:`作物の熟練と加工・販売を組み合わせる後半の設備です。`},{id:`breeding`,title:`品種配合の実験台`,price:3600,minimumGrade:2,requires:`barn-open`,detail:`基本の作物を掛け合わせ、新しい種を見つけます。各親作物の栽培経験と倉庫の実りを使います。`,tradeoff:`配合種をもう一度親にすることはできません。基本作物は注文や料理にも必要です。`},{id:`breeding-a`,title:`品種改良の研究台`,price:7200,minimumGrade:3,detail:`Bランクの収穫を経験したら、作物の品質上限をAへ広げます。`,tradeoff:`良い品種を育てるには、作物の熟練と収穫する人の技能も必要です。`},{id:`breeding-s`,title:`選抜育種の研究設備`,price:18e3,minimumGrade:4,equipment:`breeding-a`,detail:`Aランクの収穫を経験したら、品質上限をSへ広げます。`,tradeoff:`設備だけでは高品質になりません。経験を積んだ作物と人を育てよう。`},{id:`tools`,title:`使いやすい農具`,price:180,detail:`草刈り・耕作・種まき・収穫の手作業時間を35%短縮します。`,tradeoff:`広い土地を手作業で育てたいときに。`},{id:`seeder`,minimumGrade:2,title:`中央の種まき設備`,price:1200,detail:`中央の最大9区画へ、2.4秒ずつ自動で種をまきます。耕した畑が自動で対象になります。`,tradeoff:`収穫は自分で。空いた時間を次の開拓に使えます。`},{id:`helper`,title:`ミナを農園に迎える`,price:2400,requires:`barn-open`,detail:`ミナが整えた農地を歩き回り、種まき・収穫・倉庫への運搬を手伝います。`,tradeoff:`初心者から経験を積み、自分の収穫技能を育てていきます。`},{id:`truck`,title:`小さな販売車`,price:1500,detail:`街の注文へ作物を届けられるようになります。通常出荷も続けられます。`,tradeoff:`作物を揃える手間のぶん、注文は高く買い取ってもらえます。`},{id:`pasture`,title:`南の草地を開拓する`,price:1800,detail:`道の先に6区画を追加します。草刈りと耕作から、新しい農園を育てよう。`,tradeoff:`近くの3区画を買わずに、こちらを先に開くこともできます。出荷までの距離が長くなります。`},{id:`basket`,title:`大きな収穫かご`,price:360,detail:`かごの容量が24個から48個に。まとめて収穫し、出荷の往復を減らせます。`,tradeoff:`手作業中心でも、倉庫からまとめて運ぶときにも役立ちます。`},{id:`warehouse`,title:`納屋に収納棚を増やす`,price:2400,requires:`barn-open`,detail:`共同倉庫が96個から192個に。別の仕事中も、収穫を多く蓄えられます。`,tradeoff:`生産量は変わりません。倉庫がよく満杯になる農園向けです。`},{id:`seeder-area`,minimumGrade:2,title:`中央の高速種まき装置`,price:3600,equipment:`seeder`,detail:`中央の種まきを2.4秒から1.6秒へ短縮します。`,tradeoff:`中央の農地で常時稼働。自分や住人も同じ畑を手伝えます。`},{id:`seeder-second`,title:`南の種まき設備`,price:3600,minimumGrade:2,detail:`南の草地の最大6区画へ、2.4秒ずつ種をまく常設設備。`,tradeoff:`収穫機とは別の設備です。住民や自分の種まきを置き換え、別の仕事へ向かえます。`},{id:`seeder-third`,title:`北の種まき設備`,price:7200,minimumGrade:2,detail:`北の草原・奥地の最大12区画へ、2.4秒ずつ種をまく常設設備。`,tradeoff:`収穫物が増えたら、倉庫・販売・加工への配分も考えよう。`},{id:`helper-area`,title:`レンを農園に迎える`,price:6600,equipment:`helper`,detail:`二人目の仲間レンも農園を歩き回り、ミナとは別の畑を手伝います。`,tradeoff:`レンの技能もEから育ちます。人ごとの経験は別々に記録します。`},{id:`kitchen`,title:`納屋に加工台をつくる`,price:3600,requires:`barn-open`,detail:`作物と果実から、パンやスープ、ジャムなどを作れます。食品は専用の棚へ。`,tradeoff:`原料をそのまま売るか、加工して街へ届けるかを選べます。`},{id:`driver`,title:`配達の仲間を迎える`,price:4800,requires:`barn-open`,equipment:`truck`,detail:`倉庫の作物を販売車で定期出荷します。加工や街への納品分を残せます。`,tradeoff:`12秒ごとに最大12個。1個1メニーの運搬手数料がかかります。手運びの出荷や注文も続けられます。`},{id:`pumpkin-seeds`,title:`カボチャの栽培を始める`,price:1200,detail:`作付けにカボチャを追加。90秒で1個、通常出荷は1個42メニーです。`,tradeoff:`見回りと運搬は少なく、収穫までの時間は長め。短周期の畑と混ぜて育てられます。購入後の種は無料です。`},{id:`pear-grove`,title:`東のナシ園を開く`,price:3600,equipment:`orchard`,detail:`東側のナシの木2本を手入れできます。105秒ごとに3個。果実を売るか、お菓子にするか選べます。`,tradeoff:`リンゴと同じ集荷箱を使います。果実ごとに栽培経験を積みます。`},{id:`orchard`,title:`住宅地の果樹園を再開する`,price:1800,requires:`town-orchard`,detail:`3本のリンゴの木を手入れして、繰り返し収穫できます。`,tradeoff:`75秒ごとに1本4個。種まきは不要ですが、収穫と集荷箱からの出荷は自分で行います。`}];c.pasture;var xt={...c.store,capacity:96},St=c.shipping,Ct=c.barn,wt=e=>e<6?null:e<9?`expansion`:e<15?`pasture`:e<21?`north-meadow`:`north-ridge`,Tt=(e,t)=>Math.hypot(e.x-t.x,e.z-t.z),Et={idle:`ひと休み`,walking:`移動中`,clearing:`草を刈っています`,tilling:`土を耕しています`,planting:`種をまいています`,harvesting:`収穫しています`,cleaning:`片付けています`,repairing:`修理しています`,fishing:`網を引いています`,pruning:`枝を整えています`,picking:`果実を摘んでいます`},Dt=[{id:`clear-two`,title:`土に日差しを`,detail:`草のない区画を4つにする（残っていた畑2つを含む）`,target:4,coins:10,points:10,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land!==`overgrown`).length},{id:`till-two`,title:`種を迎える準備`,detail:`耕作済みの区画を4つにする`,target:4,coins:10,points:10,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land===`tilled`).length},{id:`ship-twelve`,title:`街へ、最初の贈りもの`,detail:`作物を累計12個出荷する`,target:12,coins:20,points:20,count:e=>e.shipped},{id:`first-investment`,title:`わたしの農園の育て方`,detail:`好きな投資を1つ選ぶ`,target:1,coins:0,points:10,count:e=>e.investments.size},{id:`six-fields`,title:`広がる土の香り`,detail:`好きな6区画を耕作済みにする`,target:6,coins:20,points:20,count:e=>e.plots.filter((t,n)=>e.isUnlocked(n)&&t.land===`tilled`).length},{id:`ship-sixty`,title:`街の食卓を支える`,detail:`作物を累計60個出荷する`,target:60,coins:30,points:30,count:e=>e.shipped},{id:`west-path`,title:`街へ続く道`,detail:`出荷道の草を片付ける`,target:1,coins:15,points:20,count:e=>Number(e.projects.has(`lane-west`))},{id:`east-path`,title:`畑に風を通そう`,detail:`畑の通り道を整える`,target:1,coins:15,points:20,count:e=>Number(e.projects.has(`lane-east`))},{id:`clean-barn`,title:`赤い壁、もう一度`,detail:`納屋の外壁を掃除する`,target:1,coins:20,points:30,count:e=>Number(e.projects.has(`barn-walls`))},{id:`repair-roof`,title:`雨の日も働ける`,detail:`納屋の屋根を修理する`,target:1,coins:0,points:60,count:e=>Number(e.projects.has(`barn-roof`))},{id:`repair-fence`,title:`帰り道の目印`,detail:`道沿いの柵を直す`,target:1,coins:0,points:20,count:e=>Number(e.projects.has(`fence`))},{id:`first-order`,title:`名前のある届け先`,detail:`好きな注文を1回届ける`,target:1,coins:0,points:30,count:e=>e.orderCount},{id:`varied-orders`,title:`食卓を彩る畑`,detail:`異なる3種類の注文を届ける`,target:3,coins:0,points:40,count:e=>Object.values(e.orders).filter(e=>e>0).length},{id:`six-orders`,title:`またお願いしたい農園`,detail:`注文を累計6回届ける`,target:6,coins:0,points:30,count:e=>e.orderCount},{id:`reopen-barn`,title:`ただいま、と言える納屋`,detail:`納屋を再開する`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`barn-open`))},{id:`first-helper`,title:`ひとりから、ふたりへ`,detail:`収穫の仲間に作物を12個集めてもらう`,target:12,coins:0,points:30,count:e=>e.helperHarvested},{id:`cottage-yard`,title:`帰り道をつくる`,detail:`住宅地の空き家の庭を片付ける`,target:1,coins:20,points:20,count:e=>Number(e.projects.has(`cottage-yard`))},{id:`cottage-repair`,title:`雨の入らない家`,detail:`空き家の屋根と窓を直す`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`cottage-repair`))},{id:`cottage-welcome`,title:`おかえり、わたしたちの街へ`,detail:`修復した家へ食料を届け、家族を迎える`,target:1,coins:0,points:80,count:e=>Number(e.projects.has(`cottage-welcome`))},{id:`town-well`,title:`暮らしを潤す水`,detail:`街の共同井戸を整える`,target:1,coins:0,points:100,count:e=>Number(e.projects.has(`town-well`))},{id:`town-orchard`,title:`緑の帰る街`,detail:`街路樹を手入れする`,target:1,coins:0,points:100,count:e=>Number(e.projects.has(`town-orchard`))},{id:`town-market`,title:`農園から、地域の産業へ`,detail:`納屋に青果市を開く`,target:1,coins:0,points:140,count:e=>Number(e.projects.has(`town-market`))},{id:`town-pantry`,title:`実りを分け合う暮らし`,detail:`街の食料庫を満たす`,target:1,coins:0,points:120,count:e=>Number(e.projects.has(`town-pantry`))},{id:`ship-240`,title:`毎日の食卓へ`,detail:`作物を累計240個出荷する`,target:240,coins:60,points:150,count:e=>e.shipped},{id:`nine-fields`,title:`畑いっぱいの可能性`,detail:`9区画を耕作済みにする`,target:9,coins:0,points:60,count:e=>e.plots.filter(e=>e.land===`tilled`).length},{id:`farm-taste`,title:`農園の味をつくろう`,detail:`加工台で食品を累計12個作る`,target:12,coins:0,points:40,count:e=>e.kitchen.crafted},{id:`shared-meals`,title:`また集まりたくなる食卓`,detail:`異なる2種類の食品の注文を届ける`,target:2,coins:0,points:60,count:e=>Object.values(e.kitchen.orders).filter(e=>e>0).length},{id:`orchard-tended`,title:`枝の向こうに、次の春`,detail:`果樹園の3本の木を手入れする`,target:3,coins:0,points:40,count:e=>e.orchard.trees.filter(e=>e.tended).length},{id:`orchard-fruit`,title:`街に果実の香りを`,detail:`果樹園から果実を累計24個出荷する`,target:24,coins:0,points:50,count:e=>e.orchard.sold}];Dt.push(..._e.flatMap(e=>e.chapters.map((t,n)=>({id:`resident-${e.id}-${n+1}`,title:t.title,detail:`${e.name}の依頼を進める`,target:n+1,coins:0,points:[20,30,50][n],count:t=>t.requests.progress[e.id].chapter}))));var Ot=class e{episodes=new je;enterprises=new de;legacyCompletion=!1;appearanceFloor=1;workers=new et;machinery=new st;extraMachinery=[new st(1),new st(2)];plantingLines=[new Ue(1),new Ue(2)];seedRowTaken(e,t=0){return t!==0&&this.seederPlot>=0&&Math.floor(this.seederPlot/3)===Math.floor(e/3)||this.plantingLines.some(n=>n.slot!==t&&n.owned(this)&&n.anchor>=0&&Math.floor(n.anchor/3)===Math.floor(e/3))}seedingBusy(e){return this.seederWorkingPlot===e||this.plantingLines.some(t=>t.active===e)}get seededPlots(){return[...this.assignedPlots(`seeder`),...this.plantingLines.filter(e=>!e.paused).flatMap(e=>e.plots(this))]}get machineLines(){return[this.machinery,...this.extraMachinery]}get harvesters(){return this.machineLines.filter(e=>e.owned(this))}machineBusy(e,t){return this.machineLines.some(n=>n!==t&&n.active===e)}hybrids=new Set;funding=new ct;expertise=new re([...E,...A]);cargoQuality=new ne(E);stockQuality=new ne(E);get research(){return this.investments.has(`breeding-s`)?2:+!!this.investments.has(`breeding-a`)}harvestGrade(e,t=`player`){return Math.min(this.expertise.cropGrade(e,this.research),this.expertise.personGrade(t))}get residentsArrived(){return this.projects.has(`cottage-welcome`)}requests=new B;journal=new dt;orchard=new Ee;courier=new mt;kitchen=new oe;harbor=new vt;playerName=``;stories=new Re;player={x:-.6,z:2.5};plots=_.map((e,t)=>({...e,stage:t===0||t===4?`ready`:`empty`,readyAt:0,crop:`corn`,nextCrop:`corn`,land:t===0||t===4?`tilled`:`overgrown`,cultivated:t===0||t===4}));projects=new Set;activeProject=null;projectWork={};get workPoint(){return this.episodes.workPoint??this.enterprises.workPoint??this.orchard.workPoint??this.harbor.workPoint??(this.activeProject?x(this.activeProject):this.plots[this.active])}get isWorking(){return this.episodes.active!==null||this.enterprises.active!==null||this.orchard.active>=0||this.active>=0||this.activeProject!==null||this.harbor.active!==null}get stock(){return this.stockQuality.counts}set stock(e){this.stockQuality=new ne(E,e)}helperPlot=-1;helperArea=!1;seederArea=!1;helperWorkingPlot=-1;seederWorkingPlot=-1;helperCursor=-1;seederCursor=-1;helperProgress=0;helperHarvested=0;get capacity(){return(this.investments.has(`basket`)?48:yt.capacity)+(this.episodes.done(`family`)?6:0)}get storageCapacity(){return(this.investments.has(`warehouse`)?192:xt.capacity)+(this.enterprises.level(`depot`)>=2?48:0)}get stored(){return E.reduce((e,t)=>e+this.stock[t],0)}coins=0;get cargo(){return this.cargoQuality.counts}set cargo(e){this.cargoQuality=new ne(E,e)}orders={pantry:0,soup:0,builders:0,autumn:0};get orderCount(){return Object.values(this.orders).reduce((e,t)=>e+t,0)}get inventory(){return E.reduce((e,t)=>e+this.cargo[t],0)}set inventory(e){this.cargo={corn:e,turnip:0,pumpkin:0,kabumorokoshi:0}}shipped=0;investments=new Set;completedTasks=new Set;seederPlot=-1;seederProgress=0;action=`idle`;active=-1;progress=0;message=``;revision=0;get restorationPoints(){return Dt.filter(e=>this.completedTasks.has(e.id)).reduce((e,t)=>e+t.points,0)}get agricultureComplete(){return this.legacyCompletion||this.foundationComplete&&this.enterprises.level(`harbor-link`)===3}get restorationPercent(){return this.agricultureComplete?100:Math.min(99,Math.floor(w.filter(e=>this.projects.has(e)).length/w.length*30+this.enterprises.districtProgress*50+this.enterprises.fraction(`harbor-link`)*20))}get foundationComplete(){return S.every(e=>this.projects.has(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>this.completedTasks.has(e))}get restorationPhase(){return this.agricultureComplete?6:Math.max(this.appearanceFloor,Math.floor(this.restorationPercent/20)+1)}growSeconds(e){return Math.round(D[e].seconds*(this.projects.has(`town-well`)?85:100)*[1,.97,.94,.9][this.enterprises.level(`seed-garden`)])/100}salePrice(e){return D[e].price+ +!!this.projects.has(`town-market`)+(this.episodes.done(`market`)&&this.episodes.states.market.choice===e?1:0)}isUnlocked(e){return e>=0&&e<this.plots.length&&(!wt(e)||this.investments.has(wt(e)))}interrupt(){this.episodes.active=null,this.enterprises.interrupt(),this.orchard.interrupt(),this.harbor.interrupt(),this.activeProject=null,this.active=-1,this.progress=0,this.action=`idle`}movementFactor(e=this.player){return this.plots.some(t=>t.land===`overgrown`&&Math.abs(e.x-t.x)<1.18&&Math.abs(e.z-t.z)<1.3)?.22:this.episodes.done(`ren`)&&Math.abs(e.x+2)<1.2&&(this.episodes.states.ren.choice===`north`?e.z<1:e.z>3)?1.15:1}canStand(e){return!y.some(t=>Math.hypot(t.x-e.x,t.z-e.z)<.32)&&(e.z<6.5||e.x>-3.5&&e.x<9.5||e.x>=9.5&&e.z<11)&&(!f(e)||this.agricultureComplete)&&(e.x<u.waterX||this.harbor.pier&&e.z>u.pierMinZ&&e.z<u.pierMaxZ)&&e.x>l.minX&&e.x<l.maxX&&e.z>l.minZ&&e.z<l.maxZ&&!p.some(t=>m(e,t))}projectReason(e){let t=b.find(t=>t.id===e);if(!t)return`見つからない仕事です`;if(this.projects.has(e))return`完了済み`;if(t.requires&&!this.projects.has(t.requires))return`先に「${x(t.requires).title}」`;if(t.shipped&&this.shipped<t.shipped&&!this.projectWork[e])return`累計${t.shipped}個の出荷まであと${t.shipped-this.shipped}個`;if(t.supplies){let e=E.filter(e=>this.cargo[e]<t.supplies[e]).map(e=>`${D[e].name} あと${t.supplies[e]-this.cargo[e]}個`);if(e.length)return e.join(`・`)}return this.coins<t.cost?`あと ${t.cost-this.coins} メニー`:``}startProject(e){return this.projectReason(e)||Tt(this.player,x(e))>yt.range?!1:(this.interrupt(),this.activeProject=e,this.progress=this.projectWork[e]??0,this.action=x(e).kind,!0)}duration(e){return(this.activeProject?x(this.activeProject).seconds:e===`clearing`?yt.clearSeconds:e===`tilling`?yt.tillSeconds:e===`planting`?yt.plantSeconds:yt.harvestSeconds)*(!this.activeProject&&this.investments.has(`tools`)?.65:1)}settleTasks(){let e=this.agricultureComplete,t=Dt.filter(e=>!this.completedTasks.has(e.id)&&e.count(this)>=e.target);for(let e of t)this.completedTasks.add(e.id),this.coins+=e.coins,this.revision++;if(t.length){let e=t.reduce((e,t)=>e+t.coins,0);this.message=`${t[0].title}、達成！${e?` +${e} メニー`:` 農園が一歩前へ。`}`}!e&&this.agricultureComplete&&(this.message=`農業地区が復興！ この実りを、次は港の暮らしへ。`)}investmentReason(e,t=!1){let n=bt.find(t=>t.id===e);if(!n)return`見つからない投資です`;if(this.investments.has(e))return`導入済み`;if([`helper`,`helper-area`,`driver`].includes(e)&&!this.residentsArrived)return`先に家族の移住を終えよう`;if([`harvester-second`,`seeder-second`].includes(e)&&!this.investments.has(`pasture`))return`先に南の草地を広げよう`;if([`harvester-third`,`seeder-third`].includes(e)&&!this.investments.has(`north-meadow`)&&!this.investments.has(`north-ridge`))return`先に北の農地を広げよう`;if(n.minimumGrade!==void 0&&this.expertise.best<n.minimumGrade)return`${M[n.minimumGrade]}ランクの収穫を経験しよう`;if(n.requires&&!this.projects.has(n.requires))return`先に「${x(n.requires).title}」`;if(n.equipment&&!this.investments.has(n.equipment))return`先に「${bt.find(e=>e.id===n.equipment).title}」`;let r=n.price-(this.funding.paid[e]??0);return!t&&this.coins<r?`あと ${r-this.coins} メニー`:``}buy(e){let t=bt.find(t=>t.id===e);if(!t||this.investmentReason(e))return!1;this.coins-=t.price-(this.funding.paid[e]??0),delete this.funding.paid[e],this.investments.add(e),this.revision++;let n=nt.findIndex(t=>t[0]===e);n>=0&&this.machineLines[n].configure(Ve(n,this)[0]??-1,!1,this);let r=He.findIndex(t=>t===e);if(r>=0){let e=this.plantingLines[r];e.configure(Ve(e.slot,this)[0]??-1,!1,this)}return e===`driver`&&(this.courier.enabled=!0),e===`seeder-area`&&(this.seederArea=!0),e===`helper-area`&&(this.helperArea=!0),e===`helper`&&(this.helperPlot=this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`)),e===`seeder`&&(this.seederPlot=this.plots.findIndex((e,t)=>this.isUnlocked(t)&&e.land===`tilled`)),this.message=`${t.title}を購入しました！`,this.settleTasks(),!0}completedPaymentPad=null;get paymentPad(){return xe(this).find(e=>H(e,this.player,.72)&&!(this.completedPaymentPad&&H(this.player,this.completedPaymentPad,.95)))??null}payForEquipment(e,t){this.completedPaymentPad&&!H(this.player,this.completedPaymentPad,.95)&&(this.completedPaymentPad=null);let n=this.paymentPad,r=n?bt.find(e=>e.id===n.id):null,i=this.funding.step(e,Math.hypot(t.x,t.z)>.08,r?{id:r.id,cost:r.price}:null,this.coins);return i.charged&&(this.coins-=i.charged,this.revision++),i.complete&&r&&this.buy(r.id)&&(this.completedPaymentPad=n),!!r}breedReason(e,t){let n=he(e,t);return n?this.hybrids.has(n.crop)?`この種は発見済み`:this.investments.has(`breeding`)?n.parents.some(e=>this.expertise.crops[e]<40)?`親になる作物を、それぞれ40回収穫しよう`:n.parents.some(e=>this.stock[e]<n.samples)?`倉庫に親の作物をそれぞれ${n.samples}個用意しよう`:``:`先に品種配合の実験台を導入しよう`:`配合できるのは、組み合わせのある基本作物同士だけです`}breed(e,t){if(this.breedReason(e,t)||!H(this.player,fe,1.8))return!1;let n=he(e,t);for(let e of n.parents)this.stock[e]-=n.samples;return this.hybrids.add(n.crop),this.revision++,this.message=`${D[n.crop].name}の種を発見！ 畑の作付けで選べます。`,!0}cropUnlocked(e){return E.includes(e)&&(e!==`pumpkin`||this.investments.has(`pumpkin-seeds`))&&(e!==`kabumorokoshi`||this.hybrids.has(e))}planCrop(e,t){return!Number.isInteger(e)||!this.isUnlocked(e)||!this.cropUnlocked(t)?!1:(this.plots[e].nextCrop=t,this.revision++,!0)}order(e){let t=k.find(t=>t.id===e);if(!t)return;let n=Math.min(3,1+Math.floor(this.orderCount/6)),r={corn:t.needs.corn*n,turnip:t.needs.turnip*n,pumpkin:t.needs.pumpkin*n,kabumorokoshi:0},i=E.reduce((e,t)=>e+r[t]*this.salePrice(t),0),a=E.reduce((e,t)=>e+this.cargoQuality.value(t,this.salePrice(t),r[t])+Math.max(0,r[t]-this.cargo[t])*this.salePrice(t),0);return{...t,needs:r,coins:Math.round(t.coins*n*a/i)}}orderReason(e){if(!this.investments.has(`truck`))return`販売車を購入すると配達できます`;let t=this.order(e);return t?E.filter(e=>this.cargo[e]<t.needs[e]).map(e=>`${D[e].name} あと${t.needs[e]-this.cargo[e]}個`).join(`・`):`見つからない注文です`}deliver(e){if(this.orderReason(e)||Tt(this.player,O)>yt.range)return!1;let t=this.order(e);for(let e of E)this.cargo[e]-=t.needs[e],this.shipped+=t.needs[e],this.episodes.shipped[e]+=t.needs[e];return this.coins+=t.coins,this.orders[e]++,this.revision++,this.message=`${t.title}へ届けて +${t.coins} メニー！`,this.settleTasks(),!0}assignSeeder(e){return!this.investments.has(`seeder`)||e>=0&&this.seedRowTaken(e,0)||!Number.isInteger(e)||e!==-1&&(!this.isUnlocked(e)||this.plots[e].land!==`tilled`)?!1:(this.seederPlot=e,this.seederProgress=0,this.seederWorkingPlot=-1,this.seederCursor=-1,this.revision++,!0)}transferReason(e){return this.projects.has(`barn-open`)?e===`deposit`?this.inventory===0?`かごが空です`:this.stored+this.inventory>this.storageCapacity?`倉庫の空きを増やそう`:``:E.includes(e)?this.stock[e]===0?`倉庫にありません`:this.inventory>=this.capacity?`かごがいっぱいです`:``:`見つからない作物です`:`納屋を再開すると使えます`}transfer(e){if(this.transferReason(e)||Tt(this.player,xt)>yt.range&&!(this.enterprises.level(`depot`)>=1&&Tt(this.player,R(`depot`))<yt.range))return!1;if(e===`deposit`){for(let e of E)this.cargoQuality.moveTo(this.stockQuality,e,this.cargo[e]);this.message=`収穫を倉庫に預けました。`}else{let t=Math.min(6,this.stock[e],this.capacity-this.inventory);this.stockQuality.moveTo(this.cargoQuality,e,t),this.message=`${D[e].name}を ${t} 個かごへ。`}return this.revision++,!0}assignHelper(e){return!this.investments.has(`helper`)||!Number.isInteger(e)||e!==-1&&(!this.isUnlocked(e)||this.plots[e].land!==`tilled`)?!1:(this.workers.cancel(),this.helperPlot=e,this.helperProgress=0,this.helperWorkingPlot=-1,this.helperCursor=-1,this.revision++,!0)}setArea(e,t){return this.investments.has(e+`-area`)?(e===`seeder`?(this.seederArea=t,this.assignSeeder(this.seederPlot)):(this.helperArea=t,this.assignHelper(this.helperPlot)),!0):!1}assignedPlots(e){return e===`helper`?this.residentsArrived&&this.investments.has(`helper`)&&this.helperPlot>=0?this.plots.map((e,t)=>t).filter(e=>this.isUnlocked(e)&&this.plots[e].land===`tilled`):[]:this.investments.has(`seeder`)?Ve(0,this):[]}choosePlot(e){let t=this.assignedPlots(e),n=e===`seeder`?this.seederCursor:this.helperCursor,r=t=>{let n=this.plots[t];return this.active!==t&&this.playerPriorityPlot!==t&&!this.workers.busy(t)&&!this.machineBusy(t)&&(e===`seeder`?n.stage===`empty`:n.stage===`ready`&&this.stored+D[n.crop].yield<=this.storageCapacity)},i=t.indexOf(n)+1;return[...t.slice(i),...t.slice(0,i)].find(r)??-1}collect(e,t){this.workers.step(e,t,this);let n=this.workers.people[0];this.helperWorkingPlot=n.target,this.helperProgress=n.progress}automate(e,t){for(let n of this.plantingLines)n.step(e,t,this);this.seederWorkingPlot<0&&(this.seederWorkingPlot=this.choosePlot(`seeder`));let n=this.seederWorkingPlot,r=this.plots[n];if(!r||r.land!==`tilled`||r.stage!==`empty`||this.active===n||this.playerPriorityPlot===n){this.seederProgress=0,this.seederWorkingPlot=-1;return}this.seederProgress+=e/(this.investments.has(`seeder-area`)?1.6:2.4),this.seederProgress>=1&&(r.crop=r.nextCrop,r.stage=`growing`,r.readyAt=t+Math.round(this.growSeconds(r.crop)*1e3),this.seederProgress=0,this.seederCursor=n,this.seederWorkingPlot=-1,this.revision++)}playerPriorityPlot=-1;nearestWorkPlot(){let e=-1,t=yt.range;return this.plots.forEach((n,r)=>{if(!this.isUnlocked(r)||n.stage===`growing`||n.stage===`ready`&&this.inventory+D[n.crop].yield>this.capacity)return;let i=Tt(this.player,n);i<t&&(t=i,e=r)}),e}get blockedWorkReason(){if(this.isWorking||this.action===`walking`)return``;let e=this.plots.find((e,t)=>this.isUnlocked(t)&&Tt(this.player,e)<yt.range);return e?.stage===`ready`&&this.inventory+D[e.crop].yield>this.capacity?`かごがいっぱいです · 出荷すると収穫できます`:e?.stage===`growing`?`作物は成長中です · 実るまで待とう`:``}step(e,t,n){for(let e of this.plots)e.stage===`growing`&&n>=e.readyAt&&(e.stage=`ready`,this.revision++);this.playerPriorityPlot=Math.hypot(t.x,t.z)>.08||this.activeProject||this.orchard.active>=0||this.enterprises.active||this.episodes.active||this.paymentPad?-1:this.active>=0?this.active:this.nearestWorkPlot(),this.kitchen.step(e,this),this.courier.step(e,this),this.harbor.automate(e,this);for(let t of this.harvesters)t.step(e,this);this.collect(e,n),this.episodes.observeMina(this);let r=!this.episodes.active&&this.payForEquipment(e,t);this.automate(e,n),this.settleTasks();let i=Math.hypot(t.x,t.z);if(i>.08){this.interrupt();let n=Math.max(1,i),r=yt.speed*this.movementFactor(),a=this.player.x+t.x/n*r*e,o=this.player.z+t.z/n*r*e,s={...this.player};this.canStand({x:a,z:this.player.z})&&(this.player.x=a),this.canStand({x:this.player.x,z:o})&&(this.player.z=o),this.action=Tt(s,this.player)>1e-4?`walking`:`idle`;return}if(r){this.interrupt();return}if(f(this.player)){this.harbor.step(e,this),this.action=this.harbor.active??`idle`,this.progress=this.harbor.progress;return}if(this.episodes.active){this.episodes.step(e,this);return}if(this.enterprises.active){this.enterprises.step(e,this);return}if(this.orchard.active>=0){this.orchard.step(e,this,n);return}if(this.isWorking){if(this.progress+=e/this.duration(this.action),this.activeProject&&this.action===`repairing`&&(this.projectWork[this.activeProject]=Math.min(1,this.progress)),this.progress>=1){if(this.activeProject){let e=x(this.activeProject);if(!this.projectReason(e.id)){if(this.coins-=e.cost,e.supplies)for(let t of E)this.cargo[t]-=e.supplies[t];this.projects.add(e.id),delete this.projectWork[e.id],this.revision++,this.message=`${e.title}、完了！`,this.settleTasks()}this.interrupt();return}let e=this.plots[this.active];if(this.action===`clearing`)e.land=`cleared`,this.message=`草を片付けた！ 次は土を耕そう。`;else if(this.action===`tilling`)e.land=`tilled`,e.cultivated=!0,this.message=`ふかふかの土になった！`;else if(this.action===`planting`)e.crop=e.nextCrop,e.stage=`growing`,e.readyAt=n+Math.round(this.growSeconds(e.crop)*1e3);else{e.stage=`empty`;let t=this.expertise.harvest(e.crop,`player`,this.research);this.cargoQuality.add(e.crop,D[e.crop].yield,t),this.message=`${D[e.crop].name}を ${D[e.crop].yield} 個収穫！ 品質 ${M[t]}`}this.revision++,this.settleTasks(),this.interrupt()}return}if(this.action=`idle`,(Tt(this.player,St)<yt.range||this.enterprises.level(`depot`)===3&&Tt(this.player,ce)<yt.range)&&this.inventory>0){let e=this.inventory;for(let e of E)this.episodes.shipped[e]+=this.cargo[e];let t=E.reduce((e,t)=>e+this.cargoQuality.value(t,this.salePrice(t)),0);this.coins+=t,this.shipped+=e,this.inventory=0,this.message=`${e} 個を出荷して +${t} メニー！`,this.revision++,this.settleTasks();return}if(this.enterprises.startNearby(this)){this.progress=0;return}if(this.orchard.startNearby(this,n)){this.action=this.orchard.trees[this.orchard.active].tended?`picking`:`pruning`,this.progress=0;return}let a=yt.range;if(this.plots.forEach((e,t)=>{if(!this.isUnlocked(t)||e.stage===`growing`||e.stage===`ready`&&this.inventory+D[e.crop].yield>this.capacity)return;let n=Tt(this.player,e);n<a&&(a=n,this.active=t)}),this.active>=0){let e=this.plots[this.active];this.action=e.land===`overgrown`?`clearing`:e.land===`cleared`?`tilling`:e.stage===`empty`?`planting`:`harvesting`}}shiftGrowth(e){for(let t of this.plots)t.stage===`growing`&&(t.readyAt+=e);for(let t of this.orchard.trees)t.tended&&(t.readyAt+=e)}save(){return{version:30,episodes:this.episodes.save(),playerName:this.playerName,stories:this.stories.save(),projectWork:{...this.projectWork},enterprises:this.enterprises.save(),legacyCompletion:this.legacyCompletion,appearanceFloor:this.appearanceFloor,workers:this.workers.save(),machinery:this.machinery.save(),extraMachinery:this.extraMachinery.map(e=>e.save()),plantingLines:this.plantingLines.map(e=>e.save()),hybrids:[...this.hybrids],quality:{expertise:this.expertise.save(),cargo:this.cargoQuality.save(),stock:this.stockQuality.save()},funding:this.funding.save(),requests:this.requests.save(),journal:this.journal.save(),orchard:this.orchard.save(),courier:this.courier.save(),kitchen:this.kitchen.save(),seederArea:this.seederArea,helperArea:this.helperArea,harbor:this.harbor.save(),stock:{...this.stock},helperPlot:this.helperPlot,helperHarvested:this.helperHarvested,cargo:{...this.cargo},orders:{...this.orders},projects:[...this.projects],coins:this.coins,inventory:this.inventory,shipped:this.shipped,plots:this.plots.map(({stage:e,readyAt:t,land:n,crop:r,nextCrop:i})=>({stage:e,readyAt:t,land:n,crop:r,nextCrop:i})),investments:[...this.investments],completedTasks:[...this.completedTasks],seederPlot:this.seederPlot}}restore(t){if(!t||typeof t!=`object`)return!1;let n=t,r=e=>typeof e==`number`&&Number.isSafeInteger(e)&&e>=0,i=n.version;if(typeof i!=`number`||!Number.isInteger(i)||i<1||i>30||!Array.isArray(n.plots)||n.plots.length!==(i===1?6:i<7?9:i<14?15:_.length)||!r(n.coins)||!r(n.inventory)||!r(n.shipped)||!n.plots.every(e=>e&&[`empty`,`growing`,`ready`].includes(e.stage)&&r(e.readyAt)&&(n.version===1?e.cultivated===void 0||typeof e.cultivated==`boolean`:[`overgrown`,`cleared`,`tilled`].includes(e.land))&&(i<4||E.includes(e.crop)&&E.includes(e.nextCrop))))return!1;let a=i>=4?i>=13?n.cargo:{...n.cargo,pumpkin:0}:{corn:n.inventory,turnip:0,pumpkin:0,kabumorokoshi:0},o=i<17?{...a,kabumorokoshi:0}:a,s=i>=4?i>=13?n.orders:{...n.orders,autumn:0}:{pantry:0,soup:0,builders:0,autumn:0};if(!o||E.some(e=>!r(o[e]))||E.reduce((e,t)=>e+o[t],0)!==n.inventory||!s||k.some(e=>!r(s[e.id])))return!1;let c=i>=3?n.projects:[];if(!Array.isArray(c)||!c.every(e=>b.some(t=>t.id===e))||new Set(c).size!==c.length||c.some(e=>{let t=x(e);return t.requires&&!c.includes(t.requires)}))return!1;let l=n.version===1?[]:n.investments,u=n.version===1?[]:n.completedTasks;if(!Array.isArray(l)||!l.every(e=>bt.some(t=>t.id===e))||new Set(l).size!==l.length||l.some(e=>{let t=bt.find(t=>t.id===e);return t.requires&&!c.includes(t.requires)||t.equipment&&!l.includes(t.equipment)}))return!1;let d=i>=7&&n.seederArea,f=i>=7&&n.helperArea;if(typeof d!=`boolean`||typeof f!=`boolean`||d&&!l.includes(`seeder-area`)||f&&!l.includes(`helper-area`))return!1;let p=e=>!wt(e)||l.includes(wt(e));if(!Array.isArray(u)||!u.every(e=>Dt.some(t=>t.id===e))||new Set(u).size!==u.length)return!1;let m=this.plots.map((e,t)=>{let r=n.plots[t];if(!r)return{..._[t],stage:`empty`,readyAt:0,land:`overgrown`,crop:`corn`,nextCrop:`corn`,cultivated:!1};let a=n.version===1?r.stage!==`empty`||(r.cultivated??!0)?`tilled`:`overgrown`:r.land;return{...e,stage:r.stage,readyAt:r.readyAt,crop:i>=4?r.crop:`corn`,nextCrop:i>=4?r.nextCrop:`corn`,land:a,cultivated:a===`tilled`}});if(m.some((e,t)=>e.stage!==`empty`&&e.land!==`tilled`||!p(t)&&(e.land!==`overgrown`||e.stage!==`empty`)))return!1;let h=n.version===1?-1:n.seederPlot;if(typeof h!=`number`||!Number.isInteger(h)||h<-1||h>=m.length)return!1;let g=h;if(g!==-1&&(!l.includes(`seeder`)||m[g].land!==`tilled`||!p(g)))return!1;let v=i>=5?i>=13?n.stock:{...n.stock,pumpkin:0}:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0},y=i<17?{...v,kabumorokoshi:0}:v,C=i>=5?n.helperPlot:-1,w=i>=5?n.helperHarvested:0;if(!y||E.some(e=>!r(y[e]))||E.reduce((e,t)=>e+y[t],0)>(l.includes(`warehouse`)?192:xt.capacity)+(i>=21&&[2,3].includes(n.enterprises?.depot?.level)?48:0)||!r(w)||(E.reduce((e,t)=>e+y[t],0)>0||l.includes(`helper`))&&!c.includes(`barn-open`)||w>0&&!l.includes(`helper`)||typeof C!=`number`||!Number.isInteger(C)||C<-1||C>=m.length||C!==-1&&(!l.includes(`helper`)||m[C].land!==`tilled`||!p(C))||!l.includes(`pumpkin-seeds`)&&(o.pumpkin>0||y.pumpkin>0||s.autumn>0||m.some(e=>e.crop===`pumpkin`||e.nextCrop===`pumpkin`)))return!1;let T=new vt;if(i>=6&&!T.restore(n.harbor,i<28))return!1;let D=Dt.filter(e=>u.includes(e.id)).reduce((e,t)=>e+t.points,0)>=yt.stagePoints&&S.every(e=>c.includes(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>u.includes(e)),O=S.every(e=>c.includes(e))&&[`reopen-barn`,`cottage-welcome`,`town-market`].every(e=>u.includes(e)),j=i<21?D:n.legacyCompletion;if(typeof j!=`boolean`||j&&!O)return!1;let ee=Math.min(100,Dt.filter(e=>u.includes(e.id)).reduce((e,t)=>e+t.points,0)/yt.stagePoints*100),M=i<21?ee>=60?4:ee>=30?3:ee>=10?2:1:n.appearanceFloor;if(typeof M!=`number`||!Number.isInteger(M)||M<1||M>(i<28?4:5))return!1;let N=new de;if(i>=21){let t=new e;if(t.projects=new Set(c),t.completedTasks=new Set(u),!N.restore(n.enterprises,t))return!1}if(T.hasProgress&&!(j||O&&N.level(`harbor-link`)===3))return!1;let P=new oe;if(i>=8&&!P.restore(n.kitchen,i<16,i<20)||P.hasProgress&&!l.includes(`kitchen`))return!1;let te=new mt;if(i>=9&&!te.restore(i<25&&n.courier?{...n.courier,custom:{corn:0,turnip:0,pumpkin:0,kabumorokoshi:0}}:n.courier)||te.hasProgress&&!l.includes(`driver`))return!1;let ie=new Ee;if(i>=10&&!ie.restore(n.orchard,i<12,i<16,i<20)||ie.hasProgress&&!l.includes(`orchard`)||!l.includes(`pear-grove`)&&(ie.fruit.pear>0||ie.trees.slice(3).some(e=>e.tended)))return!1;let F=new dt;if(i>=11&&!F.restore(n.journal))return!1;i<11&&(F.partial=!0);let I=new B;if(i>=12&&!I.restore(n.requests)||_e.some(e=>(I.progress[e.id].chapter>0||I.progress[e.id].contributed>0)&&!c.includes(e.requires)))return!1;let L=new ct;if(i>=15&&!L.restore(n.funding,bt.map(e=>({id:e.id,cost:e.price})),e=>l.includes(e)))return!1;let ae=new re([...E,...A]),se=new ne(E,o),ce=new ne(E,y);if(i>=16){let e=n.quality;if(!e?.expertise?.crops||!e.cargo||!e.stock)return!1;let t=e=>i<17?{...e,kabumorokoshi:[0,0,0,0,0,0]}:e,r={...e.expertise,crops:{...e.expertise.crops,...i<17?{kabumorokoshi:0}:{},...i<20?{pear:0}:{}}};if(!ae.restore(r)||!se.restore(t(e.cargo),o)||!ce.restore(t(e.stock),y))return!1}let R=i>=17?n.hybrids:[];if(!Array.isArray(R)||new Set(R).size!==R.length||R.some(e=>!me.some(t=>t.crop===e))||R.length>0&&!l.includes(`breeding`)||me.some(e=>!R.includes(e.crop)&&(o[e.crop]>0||y[e.crop]>0||ae.crops[e.crop]>0||m.some(t=>t.crop===e.crop||t.nextCrop===e.crop))))return!1;let le=new st;if(i>=18){let t=new e;t.plots=m,t.investments=new Set(l),t.hybrids=new Set(R),t.enterprises=N;let r=n.machinery,a=i<22&&r&&Array.isArray(r.loads)?{...r,loads:r.loads.map(e=>e&&{...e,destination:`barn`})}:r;if(!le.restore(a,t))return!1}let ue=[new st(1),new st(2)];if(i>=23){if(!Array.isArray(n.extraMachinery)||n.extraMachinery.length!==2)return!1;let t=new e;if(t.plots=m,t.investments=new Set(l),t.hybrids=new Set(R),t.enterprises=N,ue.some((e,r)=>!e.restore(n.extraMachinery[r],t)))return!1}else if(l.some(e=>nt.slice(1).some(t=>t.some(t=>t===e))))return!1;let fe=[n.machinery,...Array.isArray(n.extraMachinery)?n.extraMachinery:[]].filter(e=>e&&e.anchor>=0).map(e=>Math.floor(e.anchor/3));if(new Set(fe).size!==fe.length)return!1;let pe=[le,...ue].filter(e=>e.anchor>=0).map(e=>Math.floor(e.anchor/3));if(new Set(pe).size!==pe.length)return!1;let he=[new Ue(1),new Ue(2)];if(i>=24){if(!Array.isArray(n.plantingLines)||n.plantingLines.length!==2)return!1;let t=new e;if(t.plots=m,t.investments=new Set(l),he.some((e,r)=>!e.restore(n.plantingLines[r],t)))return!1}else if(l.some(e=>He.some(t=>t===e)))return!1;let ge=[g,...Array.isArray(n.plantingLines)?n.plantingLines.map(e=>e?.anchor??-1):[]].filter(e=>e>=0).map(e=>Math.floor(e/3));if(new Set(ge).size!==ge.length)return!1;l.includes(`seeder`)&&(g=m.findIndex((e,t)=>t<9&&e.land===`tilled`&&(!wt(t)||l.includes(wt(t)))));let z=[g,...he.map(e=>e.anchor)].filter(e=>e>=0).map(e=>Math.floor(e/3));if(new Set(z).size!==z.length)return!1;let ve=new et;if(i>=19){let t=new e;if(t.plots=m,t.projects=new Set(c),t.investments=new Set(l),t.hybrids=new Set(R),!ve.restore(ze(n.workers,i),t))return!1}if(P.plan!==`none`){let t=new e;if(t.investments=new Set(l),t.hybrids=new Set(R),!P.unlocked(P.plan,t))return!1}let ye=i>=26?n.projectWork:{};if(!ye||typeof ye!=`object`||Array.isArray(ye)||Object.entries(ye).some(([e,t])=>!b.some(t=>t.id===e&&t.kind===`repairing`)||c.includes(e)||typeof t!=`number`||!Number.isFinite(t)||t<=0||t>1))return!1;let be=ee*.3+N.districtProgress*50+N.fraction(`harbor-link`)*20,V=be>=60?4:be>=30?3:be>=10?2:1,xe=new Re;if(i>=28&&!xe.restore(n.stories)||i>=29&&(typeof n.playerName!=`string`||[...n.playerName].length>20||/[\u0000-\u001f\u007f]/.test(n.playerName)))return!1;let H=new je;if(i>=30&&!H.restore(n.episodes)||H.states.mina.stage>=2&&H.states.mina.baseline>ve.people[0].harvested)return!1;if(i>=30){let t=new e;if(t.projects=new Set(c),t.investments=new Set(l),t.requests=I,t.enterprises=N,t.episodes=H,t.completedTasks=new Set(u),t.kitchen=P,t.expertise=ae,t.hybrids=new Set(R),t.legacyCompletion=j,De.some(e=>H.states[e].stage>0&&H.reason(e,t))||H.states.market.stage>0&&!t.cropUnlocked(H.states.market.choice)||H.states.family.choice===`appleJam`&&!l.includes(`orchard`)||H.states.mina.stage>=3&&ve.people[0].harvested-H.states.mina.baseline<24||Object.values(H.crafted).reduce((e,t)=>e+t,0)>P.crafted||Object.values(H.shipped).reduce((e,t)=>e+t,0)>n.shipped||H.festival&&(!t.agricultureComplete||!Ne(t).complete))return!1}return n.inventory>(l.includes(`basket`)?48:yt.capacity)+(H.done(`family`)?6:0)?!1:(this.episodes=H,this.playerName=i>=29?n.playerName:`主人公`,this.stories=xe,this.projectWork={...ye},this.enterprises=N,this.legacyCompletion=j,this.appearanceFloor=i<28?Math.max(M,i<27?V:0):M,this.workers=ve,this.machinery=le,this.extraMachinery=ue,this.plantingLines=he,this.hybrids=new Set(R),this.expertise=ae,this.funding=L,this.requests=I,this.journal=F,this.orchard=ie,this.courier=te,this.kitchen=P,this.seederArea=d,this.helperArea=f,this.seederWorkingPlot=-1,this.helperWorkingPlot=-1,this.seederCursor=-1,this.helperCursor=-1,this.harbor=T,this.stock={...y},this.helperPlot=C,this.helperHarvested=w,this.helperProgress=0,this.projects=new Set(c),this.coins=n.coins,this.cargo={...o},this.orders={...s},this.shipped=n.shipped,this.plots=m,this.investments=new Set(l),this.completedTasks=new Set(u),this.seederPlot=g,this.seederProgress=0,this.cargoQuality=se,this.stockQuality=ce,i<29&&this.stories.observe(this,i<28),this.interrupt(),this.revision++,!0)}};function kt(e){let t=`/${e.split(`/`).filter(Boolean).join(`/`)}/`;return t===`//`?`farmer-mate:web:v1`:`farmer-mate:web:v1:${t}`}var At=e=>`${e}:before-import`;function jt(e,t=new Date){return JSON.stringify({format:`farmer-mate-save`,version:1,exportedAt:t.toISOString(),farm:e},null,2)}function Mt(e){if(e.length>1048576)throw Error(`このファイルは大きすぎます。農園の記録ファイルを選んでください。`);let t;try{t=JSON.parse(e)}catch{throw Error(`記録を読めませんでした。農園から書き出したファイルを選んでください。`)}if(t&&typeof t==`object`&&`format`in t){let e=t;if(e.format!==`farmer-mate-save`||e.version!==1)throw Error(`この形式の記録は読み込めません。`);t=e.farm}let n=new Ot;if(!n.restore(t))throw Error(`この農園の記録は読み込めません。内容や対応するゲームの版を確認してください。`);return n.save()}async function Nt(e,t,n,r){await e.write(At(t),JSON.stringify(n)),await e.write(t,JSON.stringify(r))}var Pt=class{previous=null;remainder=0;stepSeconds=1/60;advance(e,t,n){if(this.previous===null)return this.previous=e,0;let r=Math.max(0,Math.min((e-this.previous)/1e3,.5));if(this.previous=e,t)return this.remainder=0,0;this.remainder+=r;let i=0;for(;this.remainder+1e-9>=this.stepSeconds;)n(this.stepSeconds),this.remainder=Math.max(0,this.remainder-this.stepSeconds),i++;return i}reset(e){this.previous=e,this.remainder=0}},Ft=1e3,It=1001,Lt=1002,Rt=1003,zt=1004,Bt=1005,Vt=1006,Ht=1007,Ut=1008,Wt=1009,Gt=1010,Kt=1011,qt=1012,Jt=1013,Yt=1014,Xt=1015,Zt=1016,Qt=1017,$t=1018,en=1020,tn=35902,nn=35899,rn=1021,an=1022,on=1023,sn=1026,cn=1027,ln=1028,un=1029,dn=1030,fn=1031,pn=1033,mn=33776,hn=33777,gn=33778,_n=33779,vn=35840,yn=35841,bn=35842,xn=35843,Sn=36196,Cn=37492,wn=37496,Tn=37488,En=37489,Dn=37490,On=37491,kn=37808,An=37809,jn=37810,Mn=37811,Nn=37812,Pn=37813,Fn=37814,In=37815,Ln=37816,Rn=37817,zn=37818,Bn=37819,Vn=37820,Hn=37821,Un=36492,Wn=36494,Gn=36495,Kn=36283,qn=36284,Jn=36285,Yn=36286,Xn=2300,Zn=2301,Qn=2302,$n=2303,er=2400,tr=2401,nr=2402,rr=3200,ir=`srgb`,ar=`srgb-linear`,or=`linear`,sr=`srgb`,cr=7680,lr=35044,ur=35048,dr=2e3;function fr(e){for(let t=e.length-1;t>=0;--t)if(e[t]>=65535)return!0;return!1}function pr(e){return ArrayBuffer.isView(e)&&!(e instanceof DataView)}function mr(e){return document.createElementNS(`http://www.w3.org/1999/xhtml`,e)}function hr(){let e=mr(`canvas`);return e.style.display=`block`,e}var gr={};function _r(...e){let t=`THREE.`+e.shift();console.log(t,...e)}function vr(e){let t=e[0];if(typeof t==`string`&&t.startsWith(`TSL:`)){let t=e[1];t&&t.isStackTrace?e[0]+=` `+t.getLocation():e[1]=`Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.`}return e}function U(...e){e=vr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.warn(n.getError(t)):console.warn(t,...e)}}function W(...e){e=vr(e);let t=`THREE.`+e.shift();{let n=e[0];n&&n.isStackTrace?console.error(n.getError(t)):console.error(t,...e)}}function yr(...e){let t=e.join(` `);t in gr||(gr[t]=!0,U(...e))}function br(e,t,n){return new Promise(function(r,i){function a(){switch(e.clientWaitSync(t,e.SYNC_FLUSH_COMMANDS_BIT,0)){case e.WAIT_FAILED:i();break;case e.TIMEOUT_EXPIRED:setTimeout(a,n);break;default:r()}}setTimeout(a,n)})}var xr={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3},Sr=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){let n=this._listeners;return n!==void 0&&n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){let n=this._listeners;if(n===void 0)return;let r=n[e];if(r!==void 0){let e=r.indexOf(t);e!==-1&&r.splice(e,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let n=t[e.type];if(n!==void 0){e.target=this;let t=n.slice(0);for(let n=0,r=t.length;n<r;n++)t[n].call(this,e);e.target=null}}},Cr=`00.01.02.03.04.05.06.07.08.09.0a.0b.0c.0d.0e.0f.10.11.12.13.14.15.16.17.18.19.1a.1b.1c.1d.1e.1f.20.21.22.23.24.25.26.27.28.29.2a.2b.2c.2d.2e.2f.30.31.32.33.34.35.36.37.38.39.3a.3b.3c.3d.3e.3f.40.41.42.43.44.45.46.47.48.49.4a.4b.4c.4d.4e.4f.50.51.52.53.54.55.56.57.58.59.5a.5b.5c.5d.5e.5f.60.61.62.63.64.65.66.67.68.69.6a.6b.6c.6d.6e.6f.70.71.72.73.74.75.76.77.78.79.7a.7b.7c.7d.7e.7f.80.81.82.83.84.85.86.87.88.89.8a.8b.8c.8d.8e.8f.90.91.92.93.94.95.96.97.98.99.9a.9b.9c.9d.9e.9f.a0.a1.a2.a3.a4.a5.a6.a7.a8.a9.aa.ab.ac.ad.ae.af.b0.b1.b2.b3.b4.b5.b6.b7.b8.b9.ba.bb.bc.bd.be.bf.c0.c1.c2.c3.c4.c5.c6.c7.c8.c9.ca.cb.cc.cd.ce.cf.d0.d1.d2.d3.d4.d5.d6.d7.d8.d9.da.db.dc.dd.de.df.e0.e1.e2.e3.e4.e5.e6.e7.e8.e9.ea.eb.ec.ed.ee.ef.f0.f1.f2.f3.f4.f5.f6.f7.f8.f9.fa.fb.fc.fd.fe.ff`.split(`.`),wr=1234567,Tr=Math.PI/180,Er=180/Math.PI;function Dr(){let e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0,r=Math.random()*4294967295|0;return(Cr[e&255]+Cr[e>>8&255]+Cr[e>>16&255]+Cr[e>>24&255]+`-`+Cr[t&255]+Cr[t>>8&255]+`-`+Cr[t>>16&15|64]+Cr[t>>24&255]+`-`+Cr[n&63|128]+Cr[n>>8&255]+`-`+Cr[n>>16&255]+Cr[n>>24&255]+Cr[r&255]+Cr[r>>8&255]+Cr[r>>16&255]+Cr[r>>24&255]).toLowerCase()}function Or(e,t,n){return Math.max(t,Math.min(n,e))}function kr(e,t){return(e%t+t)%t}function Ar(e,t,n,r,i){return r+(e-t)*(i-r)/(n-t)}function jr(e,t,n){return e===t?0:(n-e)/(t-e)}function Mr(e,t,n){return(1-n)*e+n*t}function Nr(e,t,n,r){return Mr(e,t,1-Math.exp(-n*r))}function Pr(e,t=1){return t-Math.abs(kr(e,t*2)-t)}function Fr(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*(3-2*e))}function Ir(e,t,n){return e<=t?0:e>=n?1:(e=(e-t)/(n-t),e*e*e*(e*(e*6-15)+10))}function Lr(e,t){return e+Math.floor(Math.random()*(t-e+1))}function Rr(e,t){return e+Math.random()*(t-e)}function zr(e){return e*(.5-Math.random())}function Br(e){e!==void 0&&(wr=e);let t=wr+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Vr(e){return e*Tr}function Hr(e){return e*Er}function Ur(e){return!(e&e-1)&&e!==0}function Wr(e){return 2**Math.ceil(Math.log(e)/Math.LN2)}function Gr(e){return 2**Math.floor(Math.log(e)/Math.LN2)}function Kr(e,t,n,r,i){let a=Math.cos,o=Math.sin,s=a(n/2),c=o(n/2),l=a((t+r)/2),u=o((t+r)/2),d=a((t-r)/2),f=o((t-r)/2),p=a((r-t)/2),m=o((r-t)/2);switch(i){case`XYX`:e.set(s*u,c*d,c*f,s*l);break;case`YZY`:e.set(c*f,s*u,c*d,s*l);break;case`ZXZ`:e.set(c*d,c*f,s*u,s*l);break;case`XZX`:e.set(s*u,c*m,c*p,s*l);break;case`YXY`:e.set(c*p,s*u,c*m,s*l);break;case`ZYZ`:e.set(c*m,c*p,s*u,s*l);break;default:U(`MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: `+i)}}function qr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return e/4294967295;case Uint16Array:return e/65535;case Uint8Array:return e/255;case Int32Array:return Math.max(e/2147483647,-1);case Int16Array:return Math.max(e/32767,-1);case Int8Array:return Math.max(e/127,-1);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}function Jr(e,t){switch(t.constructor){case Float32Array:return e;case Uint32Array:return Math.round(e*4294967295);case Uint16Array:return Math.round(e*65535);case Uint8Array:return Math.round(e*255);case Int32Array:return Math.round(e*2147483647);case Int16Array:return Math.round(e*32767);case Int8Array:return Math.round(e*127);default:throw Error(`THREE.MathUtils: Invalid component type.`)}}var Yr={DEG2RAD:Tr,RAD2DEG:Er,generateUUID:Dr,clamp:Or,euclideanModulo:kr,mapLinear:Ar,inverseLerp:jr,lerp:Mr,damp:Nr,pingpong:Pr,smoothstep:Fr,smootherstep:Ir,randInt:Lr,randFloat:Rr,randFloatSpread:zr,seededRandom:Br,degToRad:Vr,radToDeg:Hr,isPowerOfTwo:Ur,ceilPowerOfTwo:Wr,floorPowerOfTwo:Gr,setQuaternionFromProperEuler:Kr,normalize:Jr,denormalize:qr},G=class e{static{e.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw Error(`THREE.Vector2: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error(`THREE.Vector2: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Or(this.x,e.x,t.x),this.y=Or(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Or(this.x,e,t),this.y=Or(this.y,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Or(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Or(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),r=Math.sin(t),i=this.x-e.x,a=this.y-e.y;return this.x=i*n-a*r+e.x,this.y=i*r+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Xr=class{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,i,a,o){let s=n[r+0],c=n[r+1],l=n[r+2],u=n[r+3],d=i[a+0],f=i[a+1],p=i[a+2],m=i[a+3];if(u!==m||s!==d||c!==f||l!==p){let e=s*d+c*f+l*p+u*m;e<0&&(d=-d,f=-f,p=-p,m=-m,e=-e);let t=1-o;if(e<.9995){let n=Math.acos(e),r=Math.sin(n);t=Math.sin(t*n)/r,o=Math.sin(o*n)/r,s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o}else{s=s*t+d*o,c=c*t+f*o,l=l*t+p*o,u=u*t+m*o;let e=1/Math.sqrt(s*s+c*c+l*l+u*u);s*=e,c*=e,l*=e,u*=e}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,r,i,a){let o=n[r],s=n[r+1],c=n[r+2],l=n[r+3],u=i[a],d=i[a+1],f=i[a+2],p=i[a+3];return e[t]=o*p+l*u+s*f-c*d,e[t+1]=s*p+l*d+c*u-o*f,e[t+2]=c*p+l*f+o*d-s*u,e[t+3]=l*p-o*u-s*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,r=e._y,i=e._z,a=e._order,o=Math.cos,s=Math.sin,c=o(n/2),l=o(r/2),u=o(i/2),d=s(n/2),f=s(r/2),p=s(i/2);switch(a){case`XYZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`YXZ`:this._x=d*l*u+c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`ZXY`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u-d*f*p;break;case`ZYX`:this._x=d*l*u-c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u+d*f*p;break;case`YZX`:this._x=d*l*u+c*f*p,this._y=c*f*u+d*l*p,this._z=c*l*p-d*f*u,this._w=c*l*u-d*f*p;break;case`XZY`:this._x=d*l*u-c*f*p,this._y=c*f*u-d*l*p,this._z=c*l*p+d*f*u,this._w=c*l*u+d*f*p;break;default:U(`Quaternion: .setFromEuler() encountered an unknown order: `+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],r=t[4],i=t[8],a=t[1],o=t[5],s=t[9],c=t[2],l=t[6],u=t[10],d=n+o+u;if(d>0){let e=.5/Math.sqrt(d+1);this._w=.25/e,this._x=(l-s)*e,this._y=(i-c)*e,this._z=(a-r)*e}else if(n>o&&n>u){let e=2*Math.sqrt(1+n-o-u);this._w=(l-s)/e,this._x=.25*e,this._y=(r+a)/e,this._z=(i+c)/e}else if(o>u){let e=2*Math.sqrt(1+o-n-u);this._w=(i-c)/e,this._x=(r+a)/e,this._y=.25*e,this._z=(s+l)/e}else{let e=2*Math.sqrt(1+u-n-o);this._w=(a-r)/e,this._x=(i+c)/e,this._y=(s+l)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Or(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x*=e,this._y*=e,this._z*=e,this._w*=e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+a*o+r*c-i*s,this._y=r*l+a*s+i*o-n*c,this._z=i*l+a*c+n*s-r*o,this._w=a*l-n*o-r*s-i*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,r=e._y,i=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,r=-r,i=-i,a=-a,o=-o);let s=1-t;if(o<.9995){let e=Math.acos(o),c=Math.sin(e);s=Math.sin(s*e)/c,t=Math.sin(t*e)/c,this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this._onChangeCallback()}else this._x=this._x*s+n*t,this._y=this._y*s+r*t,this._z=this._z*s+i*t,this._w=this._w*s+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),i=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),i*Math.sin(t),i*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},K=class e{static{e.prototype.isVector3=!0}constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw Error(`THREE.Vector3: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error(`THREE.Vector3: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Qr.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Qr.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6]*r,this.y=i[1]*t+i[4]*n+i[7]*r,this.z=i[2]*t+i[5]*n+i[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=e.elements,a=1/(i[3]*t+i[7]*n+i[11]*r+i[15]);return this.x=(i[0]*t+i[4]*n+i[8]*r+i[12])*a,this.y=(i[1]*t+i[5]*n+i[9]*r+i[13])*a,this.z=(i[2]*t+i[6]*n+i[10]*r+i[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,r=this.z,i=e.x,a=e.y,o=e.z,s=e.w,c=2*(a*r-o*n),l=2*(o*t-i*r),u=2*(i*n-a*t);return this.x=t+s*c+a*u-o*l,this.y=n+s*l+o*c-i*u,this.z=r+s*u+i*l-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,r=this.z,i=e.elements;return this.x=i[0]*t+i[4]*n+i[8]*r,this.y=i[1]*t+i[5]*n+i[9]*r,this.z=i[2]*t+i[6]*n+i[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Or(this.x,e.x,t.x),this.y=Or(this.y,e.y,t.y),this.z=Or(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Or(this.x,e,t),this.y=Or(this.y,e,t),this.z=Or(this.z,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Or(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,r=e.y,i=e.z,a=t.x,o=t.y,s=t.z;return this.x=r*s-i*o,this.y=i*a-n*s,this.z=n*o-r*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Zr.copy(this).projectOnVector(e),this.sub(Zr)}reflect(e){return this.sub(Zr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Or(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Zr=new K,Qr=new Xr,q=class e{static{e.prototype.isMatrix3=!0}constructor(e,t,n,r,i,a,o,s,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c)}set(e,t,n,r,i,a,o,s,c){let l=this.elements;return l[0]=e,l[1]=r,l[2]=o,l[3]=t,l[4]=i,l[5]=s,l[6]=n,l[7]=a,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[3],s=n[6],c=n[1],l=n[4],u=n[7],d=n[2],f=n[5],p=n[8],m=r[0],h=r[3],g=r[6],_=r[1],v=r[4],y=r[7],b=r[2],x=r[5],S=r[8];return i[0]=a*m+o*_+s*b,i[3]=a*h+o*v+s*x,i[6]=a*g+o*y+s*S,i[1]=c*m+l*_+u*b,i[4]=c*h+l*v+u*x,i[7]=c*g+l*y+u*S,i[2]=d*m+f*_+p*b,i[5]=d*h+f*v+p*x,i[8]=d*g+f*y+p*S,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8];return t*a*l-t*o*c-n*i*l+n*o*s+r*i*c-r*a*s}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=l*a-o*c,d=o*s-l*i,f=c*i-a*s,p=t*u+n*d+r*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);let m=1/p;return e[0]=u*m,e[1]=(r*c-l*n)*m,e[2]=(o*n-r*a)*m,e[3]=d*m,e[4]=(l*t-r*s)*m,e[5]=(r*i-o*t)*m,e[6]=f*m,e[7]=(n*s-c*t)*m,e[8]=(a*t-n*i)*m,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,i,a,o){let s=Math.cos(i),c=Math.sin(i);return this.set(n*s,n*c,-n*(s*a+c*o)+a+e,-r*c,r*s,-r*(-c*a+s*o)+o+t,0,0,1),this}scale(e,t){return yr(`Matrix3: .scale() is deprecated. Use .makeScale() instead.`),this.premultiply($r.makeScale(e,t)),this}rotate(e){return yr(`Matrix3: .rotate() is deprecated. Use .makeRotation() instead.`),this.premultiply($r.makeRotation(-e)),this}translate(e,t){return yr(`Matrix3: .translate() is deprecated. Use .makeTranslation() instead.`),this.premultiply($r.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<9;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},$r=new q,ei=new q().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ti=new q().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function ni(){let e={enabled:!0,workingColorSpace:ar,spaces:{},convert:function(e,t,n){return this.enabled===!1||t===n||!t||!n?e:(this.spaces[t].transfer===`srgb`&&(e.r=ii(e.r),e.g=ii(e.g),e.b=ii(e.b)),this.spaces[t].primaries!==this.spaces[n].primaries&&(e.applyMatrix3(this.spaces[t].toXYZ),e.applyMatrix3(this.spaces[n].fromXYZ)),this.spaces[n].transfer===`srgb`&&(e.r=ai(e.r),e.g=ai(e.g),e.b=ai(e.b)),e)},workingToColorSpace:function(e,t){return this.convert(e,this.workingColorSpace,t)},colorSpaceToWorking:function(e,t){return this.convert(e,t,this.workingColorSpace)},getPrimaries:function(e){return this.spaces[e].primaries},getTransfer:function(e){return e===``?or:this.spaces[e].transfer},getToneMappingMode:function(e){return this.spaces[e].outputColorSpaceConfig.toneMappingMode||`standard`},getLuminanceCoefficients:function(e,t=this.workingColorSpace){return e.fromArray(this.spaces[t].luminanceCoefficients)},define:function(e){Object.assign(this.spaces,e)},_getMatrix:function(e,t,n){return e.copy(this.spaces[t].toXYZ).multiply(this.spaces[n].fromXYZ)},_getDrawingBufferColorSpace:function(e){return this.spaces[e].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(e=this.workingColorSpace){return this.spaces[e].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(t,n){return yr(`ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace().`),e.workingToColorSpace(t,n)},toWorkingColorSpace:function(t,n){return yr(`ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking().`),e.colorSpaceToWorking(t,n)}},t=[.64,.33,.3,.6,.15,.06],n=[.2126,.7152,.0722],r=[.3127,.329];return e.define({[ar]:{primaries:t,whitePoint:r,transfer:or,toXYZ:ei,fromXYZ:ti,luminanceCoefficients:n,workingColorSpaceConfig:{unpackColorSpace:ir},outputColorSpaceConfig:{drawingBufferColorSpace:ir}},[ir]:{primaries:t,whitePoint:r,transfer:sr,toXYZ:ei,fromXYZ:ti,luminanceCoefficients:n,outputColorSpaceConfig:{drawingBufferColorSpace:ir}}}),e}var ri=ni();function ii(e){return e<.04045?e*.0773993808:(e*.9478672986+.0521327014)**2.4}function ai(e){return e<.0031308?e*12.92:1.055*e**.41666-.055}var oi,si=class{static getDataURL(e,t=`image/png`){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>`u`)return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{oi===void 0&&(oi=mr(`canvas`)),oi.width=e.width,oi.height=e.height;let t=oi.getContext(`2d`);e instanceof ImageData?t.putImageData(e,0,0):t.drawImage(e,0,0,e.width,e.height),n=oi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap){let t=mr(`canvas`);t.width=e.width,t.height=e.height;let n=t.getContext(`2d`);n.drawImage(e,0,0,e.width,e.height);let r=n.getImageData(0,0,e.width,e.height),i=r.data;for(let e=0;e<i.length;e++)i[e]=ii(i[e]/255)*255;return n.putImageData(r,0,0),t}if(e.data){let t=e.data.slice(0);for(let e=0;e<t.length;e++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[e]=Math.floor(ii(t[e]/255)*255):t[e]=ii(t[e]);return{data:t,width:e.width,height:e.height}}return U(`ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.`),e}},ci=0,li=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ci++}),this.uuid=Dr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<`u`&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<`u`&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t===null?e.set(0,0,0):e.set(t.width,t.height,t.depth||0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:``},r=this.data;if(r!==null){let e;if(Array.isArray(r)){e=[];for(let t=0,n=r.length;t<n;t++)r[t].isDataTexture?e.push(ui(r[t].image)):e.push(ui(r[t]))}else e=ui(r);n.url=e}return t||(e.images[this.uuid]=n),n}};function ui(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap?si.getDataURL(e):e.data?{data:Array.from(e.data),width:e.width,height:e.height,type:e.data.constructor.name}:(U(`Texture: Unable to serialize Texture.`),{})}var di=0,fi=new K,pi=class e extends Sr{constructor(t=e.DEFAULT_IMAGE,n=e.DEFAULT_MAPPING,r=It,i=It,a=Vt,o=Ut,s=on,c=Wt,l=e.DEFAULT_ANISOTROPY,u=``){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:di++}),this.uuid=Dr(),this.name=``,this.source=new li(t),this.mipmaps=[],this.mapping=n,this.channel=0,this.wrapS=r,this.wrapT=i,this.magFilter=a,this.minFilter=o,this.anisotropy=l,this.format=s,this.internalFormat=null,this.type=c,this.offset=new G(0,0),this.repeat=new G(1,1),this.center=new G(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new q,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(fi).x}get height(){return this.source.getSize(fi).y}get depth(){return this.source.getSize(fi).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let n=e[t];if(n===void 0){U(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Texture.setValues(): property '${t}' does not exist.`);continue}r&&n&&r.isVector2&&n.isVector2||r&&n&&r.isVector3&&n.isVector3||r&&n&&r.isMatrix3&&n.isMatrix3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.7,type:`Texture`,generator:`Texture.toJSON`},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:`dispose`})}transformUv(e){if(this.mapping!==300)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ft:e.x-=Math.floor(e.x);break;case It:e.x=e.x<0?0:1;break;case Lt:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x-=Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ft:e.y-=Math.floor(e.y);break;case It:e.y=e.y<0?0:1;break;case Lt:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y-=Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};pi.DEFAULT_IMAGE=null,pi.DEFAULT_MAPPING=300,pi.DEFAULT_ANISOTROPY=1;var mi=class e{static{e.prototype.isVector4=!0}constructor(e=0,t=0,n=0,r=1){this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw Error(`THREE.Vector4: index is out of range: `+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw Error(`THREE.Vector4: index is out of range: `+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w===void 0?1:e.w,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,r=this.z,i=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r+a[12]*i,this.y=a[1]*t+a[5]*n+a[9]*r+a[13]*i,this.z=a[2]*t+a[6]*n+a[10]*r+a[14]*i,this.w=a[3]*t+a[7]*n+a[11]*r+a[15]*i,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,i,a=.01,o=.1,s=e.elements,c=s[0],l=s[4],u=s[8],d=s[1],f=s[5],p=s[9],m=s[2],h=s[6],g=s[10];if(Math.abs(l-d)<a&&Math.abs(u-m)<a&&Math.abs(p-h)<a){if(Math.abs(l+d)<o&&Math.abs(u+m)<o&&Math.abs(p+h)<o&&Math.abs(c+f+g-3)<o)return this.set(1,0,0,0),this;t=Math.PI;let e=(c+1)/2,s=(f+1)/2,_=(g+1)/2,v=(l+d)/4,y=(u+m)/4,b=(p+h)/4;return e>s&&e>_?e<a?(n=0,r=.707106781,i=.707106781):(n=Math.sqrt(e),r=v/n,i=y/n):s>_?s<a?(n=.707106781,r=0,i=.707106781):(r=Math.sqrt(s),n=v/r,i=b/r):_<a?(n=.707106781,r=.707106781,i=0):(i=Math.sqrt(_),n=y/i,r=b/i),this.set(n,r,i,t),this}let _=Math.sqrt((h-p)*(h-p)+(u-m)*(u-m)+(d-l)*(d-l));return Math.abs(_)<.001&&(_=1),this.x=(h-p)/_,this.y=(u-m)/_,this.z=(d-l)/_,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Or(this.x,e.x,t.x),this.y=Or(this.y,e.y,t.y),this.z=Or(this.z,e.z,t.z),this.w=Or(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Or(this.x,e,t),this.y=Or(this.y,e,t),this.z=Or(this.z,e,t),this.w=Or(this.w,e,t),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Or(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},hi=class extends Sr{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Vt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new mi(0,0,e,t),this.scissorTest=!1,this.viewport=new mi(0,0,e,t),this.textures=[];let r=new pi({width:e,height:t,depth:n.depth}),i=n.count;for(let e=0;e<i;e++)this.textures[e]=r.clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Vt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let e=0;e<this.textures.length;e++)this.textures[e].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,i=this.textures.length;r<i;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n,this.textures[r].isData3DTexture!==!0&&(this.textures[r].isArrayTexture=this.textures[r].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let n=Object.assign({},e.textures[t].image);this.textures[t].source=new li(n)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:`dispose`})}},gi=class extends hi{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},_i=class extends pi{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=It,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},vi=class extends pi{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Rt,this.minFilter=Rt,this.wrapR=It,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},yi=class e{static{e.prototype.isMatrix4=!0}constructor(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h)}set(e,t,n,r,i,a,o,s,c,l,u,d,f,p,m,h){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=r,g[1]=i,g[5]=a,g[9]=o,g[13]=s,g[2]=c,g[6]=l,g[10]=u,g[14]=d,g[3]=f,g[7]=p,g[11]=m,g[15]=h,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new e().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,n=e.elements,r=1/bi.setFromMatrixColumn(e,0).length(),i=1/bi.setFromMatrixColumn(e,1).length(),a=1/bi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*i,t[5]=n[5]*i,t[6]=n[6]*i,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,r=e.y,i=e.z,a=Math.cos(n),o=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(i),u=Math.sin(i);if(e.order===`XYZ`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=-s*u,t[8]=c,t[1]=n+r*c,t[5]=e-i*c,t[9]=-o*s,t[2]=i-e*c,t[6]=r+n*c,t[10]=a*s}else if(e.order===`YXZ`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e+i*o,t[4]=r*o-n,t[8]=a*c,t[1]=a*u,t[5]=a*l,t[9]=-o,t[2]=n*o-r,t[6]=i+e*o,t[10]=a*s}else if(e.order===`ZXY`){let e=s*l,n=s*u,r=c*l,i=c*u;t[0]=e-i*o,t[4]=-a*u,t[8]=r+n*o,t[1]=n+r*o,t[5]=a*l,t[9]=i-e*o,t[2]=-a*c,t[6]=o,t[10]=a*s}else if(e.order===`ZYX`){let e=a*l,n=a*u,r=o*l,i=o*u;t[0]=s*l,t[4]=r*c-n,t[8]=e*c+i,t[1]=s*u,t[5]=i*c+e,t[9]=n*c-r,t[2]=-c,t[6]=o*s,t[10]=a*s}else if(e.order===`YZX`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=i-e*u,t[8]=r*u+n,t[1]=u,t[5]=a*l,t[9]=-o*l,t[2]=-c*l,t[6]=n*u+r,t[10]=e-i*u}else if(e.order===`XZY`){let e=a*s,n=a*c,r=o*s,i=o*c;t[0]=s*l,t[4]=-u,t[8]=c*l,t[1]=e*u+i,t[5]=a*l,t[9]=n*u-r,t[2]=r*u-n,t[6]=o*l,t[10]=i*u+e}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Si,e,Ci)}lookAt(e,t,n){let r=this.elements;return Ei.subVectors(e,t),Ei.lengthSq()===0&&(Ei.z=1),Ei.normalize(),wi.crossVectors(n,Ei),wi.lengthSq()===0&&(Math.abs(n.z)===1?Ei.x+=1e-4:Ei.z+=1e-4,Ei.normalize(),wi.crossVectors(n,Ei)),wi.normalize(),Ti.crossVectors(Ei,wi),r[0]=wi.x,r[4]=Ti.x,r[8]=Ei.x,r[1]=wi.y,r[5]=Ti.y,r[9]=Ei.y,r[2]=wi.z,r[6]=Ti.z,r[10]=Ei.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,r=t.elements,i=this.elements,a=n[0],o=n[4],s=n[8],c=n[12],l=n[1],u=n[5],d=n[9],f=n[13],p=n[2],m=n[6],h=n[10],g=n[14],_=n[3],v=n[7],y=n[11],b=n[15],x=r[0],S=r[4],C=r[8],w=r[12],T=r[1],E=r[5],D=r[9],O=r[13],k=r[2],A=r[6],j=r[10],ee=r[14],M=r[3],N=r[7],P=r[11],te=r[15];return i[0]=a*x+o*T+s*k+c*M,i[4]=a*S+o*E+s*A+c*N,i[8]=a*C+o*D+s*j+c*P,i[12]=a*w+o*O+s*ee+c*te,i[1]=l*x+u*T+d*k+f*M,i[5]=l*S+u*E+d*A+f*N,i[9]=l*C+u*D+d*j+f*P,i[13]=l*w+u*O+d*ee+f*te,i[2]=p*x+m*T+h*k+g*M,i[6]=p*S+m*E+h*A+g*N,i[10]=p*C+m*D+h*j+g*P,i[14]=p*w+m*O+h*ee+g*te,i[3]=_*x+v*T+y*k+b*M,i[7]=_*S+v*E+y*A+b*N,i[11]=_*C+v*D+y*j+b*P,i[15]=_*w+v*O+y*ee+b*te,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[12],a=e[1],o=e[5],s=e[9],c=e[13],l=e[2],u=e[6],d=e[10],f=e[14],p=e[3],m=e[7],h=e[11],g=e[15],_=s*f-c*d,v=o*f-c*u,y=o*d-s*u,b=a*f-c*l,x=a*d-s*l,S=a*u-o*l;return t*(m*_-h*v+g*y)-n*(p*_-h*b+g*x)+r*(p*v-m*b+g*S)-i*(p*y-m*x+h*S)}determinantAffine(){let e=this.elements,t=e[0],n=e[4],r=e[8],i=e[1],a=e[5],o=e[9],s=e[2],c=e[6],l=e[10];return t*(a*l-o*c)-n*(i*l-o*s)+r*(i*c-a*s)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],r=e[2],i=e[3],a=e[4],o=e[5],s=e[6],c=e[7],l=e[8],u=e[9],d=e[10],f=e[11],p=e[12],m=e[13],h=e[14],g=e[15],_=t*o-n*a,v=t*s-r*a,y=t*c-i*a,b=n*s-r*o,x=n*c-i*o,S=r*c-i*s,C=l*m-u*p,w=l*h-d*p,T=l*g-f*p,E=u*h-d*m,D=u*g-f*m,O=d*g-f*h,k=_*O-v*D+y*E+b*T-x*w+S*C;if(k===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/k;return e[0]=(o*O-s*D+c*E)*A,e[1]=(r*D-n*O-i*E)*A,e[2]=(m*S-h*x+g*b)*A,e[3]=(d*x-u*S-f*b)*A,e[4]=(s*T-a*O-c*w)*A,e[5]=(t*O-r*T+i*w)*A,e[6]=(h*y-p*S-g*v)*A,e[7]=(l*S-d*y+f*v)*A,e[8]=(a*D-o*T+c*C)*A,e[9]=(n*T-t*D-i*C)*A,e[10]=(p*x-m*y+g*_)*A,e[11]=(u*y-l*x-f*_)*A,e[12]=(o*w-a*E-s*C)*A,e[13]=(t*E-n*w+r*C)*A,e[14]=(m*v-p*b-h*_)*A,e[15]=(l*b-u*v+d*_)*A,this}scale(e){let t=this.elements,n=e.x,r=e.y,i=e.z;return t[0]*=n,t[4]*=r,t[8]*=i,t[1]*=n,t[5]*=r,t[9]*=i,t[2]*=n,t[6]*=r,t[10]*=i,t[3]*=n,t[7]*=r,t[11]*=i,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),r=Math.sin(t),i=1-n,a=e.x,o=e.y,s=e.z,c=i*a,l=i*o;return this.set(c*a+n,c*o-r*s,c*s+r*o,0,c*o+r*s,l*o+n,l*s-r*a,0,c*s-r*o,l*s+r*a,i*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,i,a){return this.set(1,n,i,0,e,1,a,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){let r=this.elements,i=t._x,a=t._y,o=t._z,s=t._w,c=i+i,l=a+a,u=o+o,d=i*c,f=i*l,p=i*u,m=a*l,h=a*u,g=o*u,_=s*c,v=s*l,y=s*u,b=n.x,x=n.y,S=n.z;return r[0]=(1-(m+g))*b,r[1]=(f+y)*b,r[2]=(p-v)*b,r[3]=0,r[4]=(f-y)*x,r[5]=(1-(d+g))*x,r[6]=(h+_)*x,r[7]=0,r[8]=(p+v)*S,r[9]=(h-_)*S,r[10]=(1-(d+m))*S,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){let r=this.elements;e.x=r[12],e.y=r[13],e.z=r[14];let i=this.determinantAffine();if(i===0)return n.set(1,1,1),t.identity(),this;let a=bi.set(r[0],r[1],r[2]).length(),o=bi.set(r[4],r[5],r[6]).length(),s=bi.set(r[8],r[9],r[10]).length();i<0&&(a=-a),xi.copy(this);let c=1/a,l=1/o,u=1/s;return xi.elements[0]*=c,xi.elements[1]*=c,xi.elements[2]*=c,xi.elements[4]*=l,xi.elements[5]*=l,xi.elements[6]*=l,xi.elements[8]*=u,xi.elements[9]*=u,xi.elements[10]*=u,t.setFromRotationMatrix(xi),n.x=a,n.y=o,n.z=s,this}makePerspective(e,t,n,r,i,a,o=dr,s=!1){let c=this.elements,l=2*i/(t-e),u=2*i/(n-r),d=(t+e)/(t-e),f=(n+r)/(n-r),p,m;if(s)p=i/(a-i),m=a*i/(a-i);else if(o===2e3)p=-(a+i)/(a-i),m=-2*a*i/(a-i);else if(o===2001)p=-a/(a-i),m=-a*i/(a-i);else throw Error(`THREE.Matrix4.makePerspective(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,r,i,a,o=dr,s=!1){let c=this.elements,l=2/(t-e),u=2/(n-r),d=-(t+e)/(t-e),f=-(n+r)/(n-r),p,m;if(s)p=1/(a-i),m=a/(a-i);else if(o===2e3)p=-2/(a-i),m=-(a+i)/(a-i);else if(o===2001)p=-1/(a-i),m=-i/(a-i);else throw Error(`THREE.Matrix4.makeOrthographic(): Invalid coordinate system: `+o);return c[0]=l,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=p,c[14]=m,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let e=0;e<16;e++)if(t[e]!==n[e])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},bi=new K,xi=new yi,Si=new K(0,0,0),Ci=new K(1,1,1),wi=new K,Ti=new K,Ei=new K,Di=new yi,Oi=new Xr,ki=class e{constructor(t=0,n=0,r=0,i=e.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=n,this._z=r,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let r=e.elements,i=r[0],a=r[4],o=r[8],s=r[1],c=r[5],l=r[9],u=r[2],d=r[6],f=r[10];switch(t){case`XYZ`:this._y=Math.asin(Or(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-l,f),this._z=Math.atan2(-a,i)):(this._x=Math.atan2(d,c),this._z=0);break;case`YXZ`:this._x=Math.asin(-Or(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-u,i),this._z=0);break;case`ZXY`:this._x=Math.asin(Or(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(s,i));break;case`ZYX`:this._y=Math.asin(-Or(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(s,i)):(this._x=0,this._z=Math.atan2(-a,c));break;case`YZX`:this._z=Math.asin(Or(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-u,i)):(this._x=0,this._y=Math.atan2(o,f));break;case`XZY`:this._z=Math.asin(-Or(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,i)):(this._x=Math.atan2(-l,f),this._y=0);break;default:U(`Euler: .setFromRotationMatrix() encountered an unknown order: `+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Di.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Di,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Oi.setFromEuler(this),this.setFromQuaternion(Oi,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};ki.DEFAULT_ORDER=`XYZ`;var Ai=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return!!(this.mask&(1<<e|0))}},ji=0,Mi=new K,Ni=new Xr,Pi=new yi,Fi=new K,Ii=new K,Li=new K,Ri=new Xr,zi=new K(1,0,0),Bi=new K(0,1,0),Vi=new K(0,0,1),Hi={type:`added`},Ui={type:`removed`},Wi={type:`childadded`,child:null},Gi={type:`childremoved`,child:null},Ki=class e extends Sr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ji++}),this.uuid=Dr(),this.name=``,this.type=`Object3D`,this.parent=null,this.children=[],this.up=e.DEFAULT_UP.clone();let t=new K,n=new ki,r=new Xr,i=new K(1,1,1);function a(){r.setFromEuler(n,!1)}function o(){n.setFromQuaternion(r,void 0,!1)}n._onChange(a),r._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:n},quaternion:{configurable:!0,enumerable:!0,value:r},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new yi},normalMatrix:{value:new q}}),this.matrix=new yi,this.matrixWorld=new yi,this.matrixAutoUpdate=e.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=e.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ai,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.multiply(Ni),this}rotateOnWorldAxis(e,t){return Ni.setFromAxisAngle(e,t),this.quaternion.premultiply(Ni),this}rotateX(e){return this.rotateOnAxis(zi,e)}rotateY(e){return this.rotateOnAxis(Bi,e)}rotateZ(e){return this.rotateOnAxis(Vi,e)}translateOnAxis(e,t){return Mi.copy(e).applyQuaternion(this.quaternion),this.position.add(Mi.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(zi,e)}translateY(e){return this.translateOnAxis(Bi,e)}translateZ(e){return this.translateOnAxis(Vi,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Pi.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Fi.copy(e):Fi.set(e,t,n);let r=this.parent;this.updateWorldMatrix(!0,!1),Ii.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pi.lookAt(Ii,Fi,this.up):Pi.lookAt(Fi,Ii,this.up),this.quaternion.setFromRotationMatrix(Pi),r&&(Pi.extractRotation(r.matrixWorld),Ni.setFromRotationMatrix(Pi),this.quaternion.premultiply(Ni.invert()))}add(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return e===this?(W(`Object3D.add: object can't be added as a child of itself.`,e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Hi),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null):W(`Object3D.add: object not an instance of THREE.Object3D.`,e),this)}remove(e){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.remove(arguments[e]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Ui),Gi.child=e,this.dispatchEvent(Gi),Gi.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Pi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Pi.multiply(e.parent.matrixWorld)),e.applyMatrix4(Pi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Hi),Wi.child=e,this.dispatchEvent(Wi),Wi.child=null,this}getObjectById(e){return this.getObjectByProperty(`id`,e)}getObjectByName(e){return this.getObjectByProperty(`name`,e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){let r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let r=this.children;for(let i=0,a=r.length;i<a;i++)r[i].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,e,Li),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,Ri,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,n=e.y,r=e.z,i=this.matrix.elements;i[12]+=t-i[0]*t-i[4]*n-i[8]*r,i[13]+=n-i[1]*t-i[5]*n-i[9]*r,i[14]+=r-i[2]*t-i[6]*n-i[10]*r}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){let r=this.parent;if(e===!0&&r!==null&&r.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){let e=this.children;for(let t=0,r=e.length;t<r;t++)e[t].updateWorldMatrix(!1,!0,n)}}toJSON(e){let t=e===void 0||typeof e==`string`,n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:`Object`,generator:`Object3D.toJSON`});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==``&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),this.static!==!1&&(r.static=this.static),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.pivot!==null&&(r.pivot=this.pivot.toArray()),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.morphTargetDictionary!==void 0&&(r.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(r.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(r.type=`InstancedMesh`,r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type=`BatchedMesh`,r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(e=>({...e,boundingBox:e.boundingBox?e.boundingBox.toJSON():void 0,boundingSphere:e.boundingSphere?e.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(e=>({...e})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function i(t,n){return t[n.uuid]===void 0&&(t[n.uuid]=n.toJSON(e)),n.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=i(e.geometries,this.geometry);let t=this.geometry.parameters;if(t!==void 0&&t.shapes!==void 0){let n=t.shapes;if(Array.isArray(n))for(let t=0,r=n.length;t<r;t++){let r=n[t];i(e.shapes,r)}else i(e.shapes,n)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(i(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0){if(Array.isArray(this.material)){let t=[];for(let n=0,r=this.material.length;n<r;n++)t.push(i(e.materials,this.material[n]));r.material=t}else r.material=i(e.materials,this.material)}if(this.children.length>0){r.children=[];for(let t=0;t<this.children.length;t++)r.children.push(this.children[t].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let t=0;t<this.animations.length;t++){let n=this.animations[t];r.animations.push(i(e.animations,n))}}if(t){let t=a(e.geometries),r=a(e.materials),i=a(e.textures),o=a(e.images),s=a(e.shapes),c=a(e.skeletons),l=a(e.animations),u=a(e.nodes);t.length>0&&(n.geometries=t),r.length>0&&(n.materials=r),i.length>0&&(n.textures=i),o.length>0&&(n.images=o),s.length>0&&(n.shapes=s),c.length>0&&(n.skeletons=c),l.length>0&&(n.animations=l),u.length>0&&(n.nodes=u)}return n.object=r,n;function a(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot===null?null:e.pivot.clone(),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let t=0;t<e.children.length;t++){let n=e.children[t];this.add(n.clone())}return this}};Ki.DEFAULT_UP=new K(0,1,0),Ki.DEFAULT_MATRIX_AUTO_UPDATE=!0,Ki.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var J=class extends Ki{constructor(){super(),this.isGroup=!0,this.type=`Group`}},qi={type:`move`},Ji=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new J,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new J,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new K,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new K),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new J,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new K,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new K,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:`connected`,data:e}),this}disconnect(e){return this.dispatchEvent({type:`disconnected`,data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,i=null,a=null,o=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!==`visible-blurred`){if(c&&e.hand){a=!0;for(let r of e.hand.values()){let e=t.getJointPose(r,n),i=this._getHandJoint(c,r);e!==null&&(i.matrix.fromArray(e.transform.matrix),i.matrix.decompose(i.position,i.rotation,i.scale),i.matrixWorldNeedsUpdate=!0,i.jointRadius=e.radius),i.visible=e!==null}let r=c.joints[`index-finger-tip`],i=c.joints[`thumb-tip`],o=r.position.distanceTo(i.position);c.inputState.pinching&&o>.025?(c.inputState.pinching=!1,this.dispatchEvent({type:`pinchend`,handedness:e.handedness,target:this})):!c.inputState.pinching&&o<=.015&&(c.inputState.pinching=!0,this.dispatchEvent({type:`pinchstart`,handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(i=t.getPose(e.gripSpace,n),i!==null&&(s.matrix.fromArray(i.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,i.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(i.linearVelocity)):s.hasLinearVelocity=!1,i.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(i.angularVelocity)):s.hasAngularVelocity=!1,s.eventsEnabled&&s.dispatchEvent({type:`gripUpdated`,data:e,target:this})));o!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&i!==null&&(r=i),r!==null&&(o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,r.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(r.linearVelocity)):o.hasLinearVelocity=!1,r.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(r.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(qi)))}return o!==null&&(o.visible=r!==null),s!==null&&(s.visible=i!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new J;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},Yi={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xi={h:0,s:0,l:0},Zi={h:0,s:0,l:0};function Qi(e,t,n){return n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*6*(2/3-n):e}var Y=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let t=e;t&&t.isColor?this.copy(t):typeof t==`number`?this.setHex(t):typeof t==`string`&&this.setStyle(t)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ir){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ri.colorSpaceToWorking(this,t),this}setRGB(e,t,n,r=ri.workingColorSpace){return this.r=e,this.g=t,this.b=n,ri.colorSpaceToWorking(this,r),this}setHSL(e,t,n,r=ri.workingColorSpace){if(e=kr(e,1),t=Or(t,0,1),n=Or(n,0,1),t===0)this.r=this.g=this.b=n;else{let r=n<=.5?n*(1+t):n+t-n*t,i=2*n-r;this.r=Qi(i,r,e+1/3),this.g=Qi(i,r,e),this.b=Qi(i,r,e-1/3)}return ri.colorSpaceToWorking(this,r),this}setStyle(e,t=ir){function n(t){t!==void 0&&parseFloat(t)<1&&U(`Color: Alpha component of `+e+` will be ignored.`)}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let i,a=r[1],o=r[2];switch(a){case`rgb`:case`rgba`:if(i=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(255,parseInt(i[1],10))/255,Math.min(255,parseInt(i[2],10))/255,Math.min(255,parseInt(i[3],10))/255,t);if(i=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setRGB(Math.min(100,parseInt(i[1],10))/100,Math.min(100,parseInt(i[2],10))/100,Math.min(100,parseInt(i[3],10))/100,t);break;case`hsl`:case`hsla`:if(i=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(i[4]),this.setHSL(parseFloat(i[1])/360,parseFloat(i[2])/100,parseFloat(i[3])/100,t);break;default:U(`Color: Unknown color model `+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let n=r[1],i=n.length;if(i===3)return this.setRGB(parseInt(n.charAt(0),16)/15,parseInt(n.charAt(1),16)/15,parseInt(n.charAt(2),16)/15,t);if(i===6)return this.setHex(parseInt(n,16),t);U(`Color: Invalid hex color `+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ir){let n=Yi[e.toLowerCase()];return n===void 0?U(`Color: Unknown color `+e):this.setHex(n,t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ii(e.r),this.g=ii(e.g),this.b=ii(e.b),this}copyLinearToSRGB(e){return this.r=ai(e.r),this.g=ai(e.g),this.b=ai(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ir){return ri.workingToColorSpace($i.copy(this),e),Math.round(Or($i.r*255,0,255))*65536+Math.round(Or($i.g*255,0,255))*256+Math.round(Or($i.b*255,0,255))}getHexString(e=ir){return(`000000`+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ri.workingColorSpace){ri.workingToColorSpace($i.copy(this),t);let n=$i.r,r=$i.g,i=$i.b,a=Math.max(n,r,i),o=Math.min(n,r,i),s,c,l=(o+a)/2;if(o===a)s=0,c=0;else{let e=a-o;switch(c=l<=.5?e/(a+o):e/(2-a-o),a){case n:s=(r-i)/e+(r<i?6:0);break;case r:s=(i-n)/e+2;break;case i:s=(n-r)/e+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=ri.workingColorSpace){return ri.workingToColorSpace($i.copy(this),t),e.r=$i.r,e.g=$i.g,e.b=$i.b,e}getStyle(e=ir){ri.workingToColorSpace($i.copy(this),e);let t=$i.r,n=$i.g,r=$i.b;return e===`srgb`?`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(r*255)})`:`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`}offsetHSL(e,t,n){return this.getHSL(Xi),this.setHSL(Xi.h+e,Xi.s+t,Xi.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xi),e.getHSL(Zi);let n=Mr(Xi.h,Zi.h,t),r=Mr(Xi.s,Zi.s,t),i=Mr(Xi.l,Zi.l,t);return this.setHSL(n,r,i),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,r=this.b,i=e.elements;return this.r=i[0]*t+i[3]*n+i[6]*r,this.g=i[1]*t+i[4]*n+i[7]*r,this.b=i[2]*t+i[5]*n+i[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},$i=new Y;Y.NAMES=Yi;var ea=class extends Ki{constructor(){super(),this.isScene=!0,this.type=`Scene`,this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ki,this.environmentIntensity=1,this.environmentRotation=new ki,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},ta=new K,na=new K,ra=new K,ia=new K,aa=new K,oa=new K,sa=new K,ca=new K,la=new K,ua=new K,da=new mi,fa=new mi,pa=new mi,ma=class e{constructor(e=new K,t=new K,n=new K){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),ta.subVectors(e,t),r.cross(ta);let i=r.lengthSq();return i>0?r.multiplyScalar(1/Math.sqrt(i)):r.set(0,0,0)}static getBarycoord(e,t,n,r,i){ta.subVectors(r,t),na.subVectors(n,t),ra.subVectors(e,t);let a=ta.dot(ta),o=ta.dot(na),s=ta.dot(ra),c=na.dot(na),l=na.dot(ra),u=a*c-o*o;if(u===0)return i.set(0,0,0),null;let d=1/u,f=(c*s-o*l)*d,p=(a*l-o*s)*d;return i.set(1-f-p,p,f)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,ia)!==null&&ia.x>=0&&ia.y>=0&&ia.x+ia.y<=1}static getInterpolation(e,t,n,r,i,a,o,s){return this.getBarycoord(e,t,n,r,ia)===null?(s.x=0,s.y=0,`z`in s&&(s.z=0),`w`in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(i,ia.x),s.addScaledVector(a,ia.y),s.addScaledVector(o,ia.z),s)}static getInterpolatedAttribute(e,t,n,r,i,a){return da.setScalar(0),fa.setScalar(0),pa.setScalar(0),da.fromBufferAttribute(e,t),fa.fromBufferAttribute(e,n),pa.fromBufferAttribute(e,r),a.setScalar(0),a.addScaledVector(da,i.x),a.addScaledVector(fa,i.y),a.addScaledVector(pa,i.z),a}static isFrontFacing(e,t,n,r){return ta.subVectors(n,t),na.subVectors(e,t),ta.cross(na).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ta.subVectors(this.c,this.b),na.subVectors(this.a,this.b),ta.cross(na).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return e.getNormal(this.a,this.b,this.c,t)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,n){return e.getBarycoord(t,this.a,this.b,this.c,n)}getInterpolation(t,n,r,i,a){return e.getInterpolation(t,this.a,this.b,this.c,n,r,i,a)}containsPoint(t){return e.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return e.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,r=this.b,i=this.c,a,o;aa.subVectors(r,n),oa.subVectors(i,n),ca.subVectors(e,n);let s=aa.dot(ca),c=oa.dot(ca);if(s<=0&&c<=0)return t.copy(n);la.subVectors(e,r);let l=aa.dot(la),u=oa.dot(la);if(l>=0&&u<=l)return t.copy(r);let d=s*u-l*c;if(d<=0&&s>=0&&l<=0)return a=s/(s-l),t.copy(n).addScaledVector(aa,a);ua.subVectors(e,i);let f=aa.dot(ua),p=oa.dot(ua);if(p>=0&&f<=p)return t.copy(i);let m=f*c-s*p;if(m<=0&&c>=0&&p<=0)return o=c/(c-p),t.copy(n).addScaledVector(oa,o);let h=l*p-f*u;if(h<=0&&u-l>=0&&f-p>=0)return sa.subVectors(i,r),o=(u-l)/(u-l+(f-p)),t.copy(r).addScaledVector(sa,o);let g=1/(h+m+d);return a=m*g,o=d*g,t.copy(n).addScaledVector(aa,a).addScaledVector(oa,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},ha=class{constructor(e=new K(1/0,1/0,1/0),t=new K(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_a.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_a.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=_a.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let r=n.getAttribute(`position`);if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let t=0,n=r.count;t<n;t++)e.isMesh===!0?e.getVertexPosition(t,_a):_a.fromBufferAttribute(r,t),_a.applyMatrix4(e.matrixWorld),this.expandByPoint(_a);else e.boundingBox===void 0?(n.boundingBox===null&&n.computeBoundingBox(),va.copy(n.boundingBox)):(e.boundingBox===null&&e.computeBoundingBox(),va.copy(e.boundingBox)),va.applyMatrix4(e.matrixWorld),this.union(va)}let r=e.children;for(let e=0,n=r.length;e<n;e++)this.expandByObject(r[e],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_a),_a.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ta),Ea.subVectors(this.max,Ta),ya.subVectors(e.a,Ta),ba.subVectors(e.b,Ta),xa.subVectors(e.c,Ta),Sa.subVectors(ba,ya),Ca.subVectors(xa,ba),wa.subVectors(ya,xa);let t=[0,-Sa.z,Sa.y,0,-Ca.z,Ca.y,0,-wa.z,wa.y,Sa.z,0,-Sa.x,Ca.z,0,-Ca.x,wa.z,0,-wa.x,-Sa.y,Sa.x,0,-Ca.y,Ca.x,0,-wa.y,wa.x,0];return!ka(t,ya,ba,xa,Ea)||(t=[1,0,0,0,1,0,0,0,1],!ka(t,ya,ba,xa,Ea))?!1:(Da.crossVectors(Sa,Ca),t=[Da.x,Da.y,Da.z],ka(t,ya,ba,xa,Ea))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_a).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_a).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ga[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ga[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ga[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ga[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ga[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ga[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ga[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ga[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ga),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ga=[new K,new K,new K,new K,new K,new K,new K,new K],_a=new K,va=new ha,ya=new K,ba=new K,xa=new K,Sa=new K,Ca=new K,wa=new K,Ta=new K,Ea=new K,Da=new K,Oa=new K;function ka(e,t,n,r,i){for(let a=0,o=e.length-3;a<=o;a+=3){Oa.fromArray(e,a);let o=i.x*Math.abs(Oa.x)+i.y*Math.abs(Oa.y)+i.z*Math.abs(Oa.z),s=t.dot(Oa),c=n.dot(Oa),l=r.dot(Oa);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>o)return!1}return!0}var Aa=new K,ja=new G,Ma=0,Na=class extends Sr{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw TypeError(`THREE.BufferAttribute: array should be a Typed Array.`);this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Ma++}),this.name=``,this.array=e,this.itemSize=t,this.count=e===void 0?0:e.length/t,this.normalized=n,this.usage=lr,this.updateRanges=[],this.gpuType=Xt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,i=this.itemSize;r<i;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ja.fromBufferAttribute(this,t),ja.applyMatrix3(e),this.setXY(t,ja.x,ja.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Aa.fromBufferAttribute(this,t),Aa.applyMatrix3(e),this.setXYZ(t,Aa.x,Aa.y,Aa.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Aa.fromBufferAttribute(this,t),Aa.applyMatrix4(e),this.setXYZ(t,Aa.x,Aa.y,Aa.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Aa.fromBufferAttribute(this,t),Aa.applyNormalMatrix(e),this.setXYZ(t,Aa.x,Aa.y,Aa.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Aa.fromBufferAttribute(this,t),Aa.transformDirection(e),this.setXYZ(t,Aa.x,Aa.y,Aa.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=qr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jr(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=qr(t,this.array)),t}setX(e,t){return this.normalized&&(t=Jr(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=qr(t,this.array)),t}setY(e,t){return this.normalized&&(t=Jr(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=qr(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Jr(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=qr(t,this.array)),t}setW(e,t){return this.normalized&&(t=Jr(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Jr(t,this.array),n=Jr(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Jr(t,this.array),n=Jr(n,this.array),r=Jr(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e*=this.itemSize,this.normalized&&(t=Jr(t,this.array),n=Jr(n,this.array),r=Jr(r,this.array),i=Jr(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=i,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==``&&(e.name=this.name),this.usage!==35044&&(e.usage=this.usage),e}dispose(){this.dispatchEvent({type:`dispose`})}},Pa=class extends Na{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Fa=class extends Na{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Ia=class extends Na{constructor(e,t,n){super(new Float32Array(e),t,n)}},La=new ha,Ra=new K,za=new K,Ba=class{constructor(e=new K,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t===void 0?La.setFromPoints(e).getCenter(n):n.copy(t);let r=0;for(let t=0,i=e.length;t<i;t++)r=Math.max(r,n.distanceToSquared(e[t]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius*=e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ra.subVectors(e,this.center);let t=Ra.lengthSq();if(t>this.radius*this.radius){let e=Math.sqrt(t),n=(e-this.radius)*.5;this.center.addScaledVector(Ra,n/e),this.radius+=n}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(za.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ra.copy(e.center).add(za)),this.expandByPoint(Ra.copy(e.center).sub(za))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Va=0,Ha=new yi,Ua=new Ki,Wa=new K,Ga=new ha,Ka=new ha,qa=new K,Ja=class e extends Sr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Va++}),this.uuid=Dr(),this.name=``,this.type=`BufferGeometry`,this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return this.index=Array.isArray(e)?new(fr(e)?Fa:Pa)(e,1):e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let t=new q().getNormalMatrix(e);n.applyNormalMatrix(t),n.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Ha.makeRotationFromQuaternion(e),this.applyMatrix4(Ha),this}rotateX(e){return Ha.makeRotationX(e),this.applyMatrix4(Ha),this}rotateY(e){return Ha.makeRotationY(e),this.applyMatrix4(Ha),this}rotateZ(e){return Ha.makeRotationZ(e),this.applyMatrix4(Ha),this}translate(e,t,n){return Ha.makeTranslation(e,t,n),this.applyMatrix4(Ha),this}scale(e,t,n){return Ha.makeScale(e,t,n),this.applyMatrix4(Ha),this}lookAt(e){return Ua.lookAt(e),Ua.updateMatrix(),this.applyMatrix4(Ua.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Wa).negate(),this.translate(Wa.x,Wa.y,Wa.z),this}setFromPoints(e){let t=this.getAttribute(`position`);if(t===void 0){let t=[];for(let n=0,r=e.length;n<r;n++){let r=e[n];t.push(r.x,r.y,r.z||0)}this.setAttribute(`position`,new Ia(t,3))}else{let n=Math.min(e.length,t.count);for(let r=0;r<n;r++){let n=e[r];t.setXYZ(r,n.x,n.y,n.z||0)}e.length>t.count&&U(`BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry.`),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ha);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.`,this),this.boundingBox.set(new K(-1/0,-1/0,-1/0),new K(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ga.setFromBufferAttribute(n),this.morphTargetsRelative?(qa.addVectors(this.boundingBox.min,Ga.min),this.boundingBox.expandByPoint(qa),qa.addVectors(this.boundingBox.max,Ga.max),this.boundingBox.expandByPoint(qa)):(this.boundingBox.expandByPoint(Ga.min),this.boundingBox.expandByPoint(Ga.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&W(`BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.`,this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ba);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){W(`BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.`,this),this.boundingSphere.set(new K,1/0);return}if(e){let n=this.boundingSphere.center;if(Ga.setFromBufferAttribute(e),t)for(let e=0,n=t.length;e<n;e++){let n=t[e];Ka.setFromBufferAttribute(n),this.morphTargetsRelative?(qa.addVectors(Ga.min,Ka.min),Ga.expandByPoint(qa),qa.addVectors(Ga.max,Ka.max),Ga.expandByPoint(qa)):(Ga.expandByPoint(Ka.min),Ga.expandByPoint(Ka.max))}Ga.getCenter(n);let r=0;for(let t=0,i=e.count;t<i;t++)qa.fromBufferAttribute(e,t),r=Math.max(r,n.distanceToSquared(qa));if(t)for(let i=0,a=t.length;i<a;i++){let a=t[i],o=this.morphTargetsRelative;for(let t=0,i=a.count;t<i;t++)qa.fromBufferAttribute(a,t),o&&(Wa.fromBufferAttribute(e,t),qa.add(Wa)),r=Math.max(r,n.distanceToSquared(qa))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&W(`BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.`,this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){W(`BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)`);return}let n=t.position,r=t.normal,i=t.uv,a=this.getAttribute(`tangent`);(a===void 0||a.count!==n.count)&&(a=new Na(new Float32Array(4*n.count),4),this.setAttribute(`tangent`,a));let o=[],s=[];for(let e=0;e<n.count;e++)o[e]=new K,s[e]=new K;let c=new K,l=new K,u=new K,d=new G,f=new G,p=new G,m=new K,h=new K;function g(e,t,r){c.fromBufferAttribute(n,e),l.fromBufferAttribute(n,t),u.fromBufferAttribute(n,r),d.fromBufferAttribute(i,e),f.fromBufferAttribute(i,t),p.fromBufferAttribute(i,r),l.sub(c),u.sub(c),f.sub(d),p.sub(d);let a=1/(f.x*p.y-p.x*f.y);isFinite(a)&&(m.copy(l).multiplyScalar(p.y).addScaledVector(u,-f.y).multiplyScalar(a),h.copy(u).multiplyScalar(f.x).addScaledVector(l,-p.x).multiplyScalar(a),o[e].add(m),o[t].add(m),o[r].add(m),s[e].add(h),s[t].add(h),s[r].add(h))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)g(e.getX(t+0),e.getX(t+1),e.getX(t+2))}let v=new K,y=new K,b=new K,x=new K;function S(e){b.fromBufferAttribute(r,e),x.copy(b);let t=o[e];v.copy(t),v.sub(b.multiplyScalar(b.dot(t))).normalize(),y.crossVectors(x,t);let n=y.dot(s[e])<0?-1:1;a.setXYZW(e,v.x,v.y,v.z,n)}for(let t=0,n=_.length;t<n;++t){let n=_[t],r=n.start,i=n.count;for(let t=r,n=r+i;t<n;t+=3)S(e.getX(t+0)),S(e.getX(t+1)),S(e.getX(t+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute(`position`);if(t!==void 0){let n=this.getAttribute(`normal`);if(n===void 0||n.count!==t.count)n=new Na(new Float32Array(t.count*3),3),this.setAttribute(`normal`,n);else for(let e=0,t=n.count;e<t;e++)n.setXYZ(e,0,0,0);let r=new K,i=new K,a=new K,o=new K,s=new K,c=new K,l=new K,u=new K;if(e)for(let d=0,f=e.count;d<f;d+=3){let f=e.getX(d+0),p=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,f),i.fromBufferAttribute(t,p),a.fromBufferAttribute(t,m),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),o.fromBufferAttribute(n,f),s.fromBufferAttribute(n,p),c.fromBufferAttribute(n,m),o.add(l),s.add(l),c.add(l),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(p,s.x,s.y,s.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let e=0,o=t.count;e<o;e+=3)r.fromBufferAttribute(t,e+0),i.fromBufferAttribute(t,e+1),a.fromBufferAttribute(t,e+2),l.subVectors(a,i),u.subVectors(r,i),l.cross(u),n.setXYZ(e+0,l.x,l.y,l.z),n.setXYZ(e+1,l.x,l.y,l.z),n.setXYZ(e+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)qa.fromBufferAttribute(e,t),qa.normalize(),e.setXYZ(t,qa.x,qa.y,qa.z)}toNonIndexed(){function t(e,t){let n=e.array,r=e.itemSize,i=e.normalized,a=new n.constructor(t.length*r),o=0,s=0;for(let i=0,c=t.length;i<c;i++){o=e.isInterleavedBufferAttribute?t[i]*e.data.stride+e.offset:t[i]*r;for(let e=0;e<r;e++)a[s++]=n[o++]}return new Na(a,r,i)}if(this.index===null)return U(`BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.`),this;let n=new e,r=this.index.array,i=this.attributes;for(let e in i){let a=i[e],o=t(a,r);n.setAttribute(e,o)}let a=this.morphAttributes;for(let e in a){let i=[],o=a[e];for(let e=0,n=o.length;e<n;e++){let n=o[e],a=t(n,r);i.push(a)}n.morphAttributes[e]=i}n.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let e=0,t=o.length;e<t;e++){let t=o[e];n.addGroup(t.start,t.count,t.materialIndex)}return n}toJSON(){let e={metadata:{version:4.7,type:`BufferGeometry`,generator:`BufferGeometry.toJSON`}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?`BufferGeometry`:this.type,this.name!==``&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let t=this.parameters;for(let n in t)t[n]!==void 0&&(e[n]=t[n]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let t in n){let r=n[t];e.data.attributes[t]=r.toJSON(e.data)}let r={},i=!1;for(let t in this.morphAttributes){let n=this.morphAttributes[t],a=[];for(let t=0,r=n.length;t<r;t++){let r=n[t];a.push(r.toJSON(e.data))}a.length>0&&(r[t]=a,i=!0)}i&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone());let r=e.attributes;for(let e in r){let n=r[e];this.setAttribute(e,n.clone(t))}let i=e.morphAttributes;for(let e in i){let n=[],r=i[e];for(let e=0,i=r.length;e<i;e++)n.push(r[e].clone(t));this.morphAttributes[e]=n}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let e=0,t=a.length;e<t;e++){let t=a[e];this.addGroup(t.start,t.count,t.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:`dispose`})}},Ya=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e===void 0?0:e.length/t,this.usage=lr,this.updateRanges=[],this.version=0,this.uuid=Dr()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let r=0,i=this.stride;r<i;r++)this.array[e+r]=t.array[n+r];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Dr()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},Xa=new K,Za=class e{constructor(e,t,n,r=!1){this.isInterleavedBufferAttribute=!0,this.name=``,this.data=e,this.itemSize=t,this.offset=n,this.normalized=r}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.applyMatrix4(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.applyNormalMatrix(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Xa.fromBufferAttribute(this,t),Xa.transformDirection(e),this.setXYZ(t,Xa.x,Xa.y,Xa.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=qr(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Jr(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=Jr(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Jr(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Jr(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Jr(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=qr(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=qr(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=qr(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=qr(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=Jr(t,this.array),n=Jr(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Jr(t,this.array),n=Jr(n,this.array),r=Jr(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this}setXYZW(e,t,n,r,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Jr(t,this.array),n=Jr(n,this.array),r=Jr(r,this.array),i=Jr(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=r,this.data.array[e+3]=i,this}clone(t){if(t===void 0){_r(`InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return new Na(new this.array.constructor(e),this.itemSize,this.normalized)}return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new e(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){_r(`InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.`);let e=[];for(let t=0;t<this.count;t++){let n=t*this.data.stride+this.offset;for(let t=0;t<this.itemSize;t++)e.push(this.data.array[n+t])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Qa=0,$a=class extends Sr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qa++}),this.uuid=Dr(),this.name=``,this.type=`Material`,this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=204,this.blendDst=205,this.blendEquation=100,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Y(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cr,this.stencilZFail=cr,this.stencilZPass=cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){U(`Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){U(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(n):r&&r.isVector2&&n&&n.isVector2||r&&r.isEuler&&n&&n.isEuler||r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n}}toJSON(e){let t=e===void 0||typeof e==`string`;t&&(e={textures:{},images:{}});let n={metadata:{version:4.7,type:`Material`,generator:`Material.toJSON`}};n.uuid=this.uuid,n.type=this.type,this.name!==``&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==204&&(n.blendSrc=this.blendSrc),this.blendDst!==205&&(n.blendDst=this.blendDst),this.blendEquation!==100&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==7680&&(n.stencilFail=this.stencilFail),this.stencilZFail!==7680&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==7680&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.allowOverride===!1&&(n.allowOverride=!1),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==`round`&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==`round`&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function r(e){let t=[];for(let n in e){let r=e[n];delete r.metadata,t.push(r)}return t}if(t){let t=r(e.textures),i=r(e.images);t.length>0&&(n.textures=t),i.length>0&&(n.images=i)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Y().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(this.vertexColors=typeof e.vertexColors==`number`?e.vertexColors>0:e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let t=e.normalScale;Array.isArray(t)===!1&&(t=[t,t]),this.normalScale=new G().fromArray(t)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new G().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let e=t.length;n=Array(e);for(let r=0;r!==e;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:`dispose`})}set needsUpdate(e){e===!0&&this.version++}},eo=class extends $a{constructor(e){super(),this.isSpriteMaterial=!0,this.type=`SpriteMaterial`,this.color=new Y(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},to,no=new K,ro=new K,io=new K,ao=new G,oo=new G,so=new yi,co=new K,lo=new K,uo=new K,fo=new G,po=new G,mo=new G,ho=class extends Ki{constructor(e=new eo){if(super(),this.isSprite=!0,this.type=`Sprite`,to===void 0){to=new Ja;let e=new Ya(new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),5);to.setIndex([0,1,2,0,2,3]),to.setAttribute(`position`,new Za(e,3,0,!1)),to.setAttribute(`uv`,new Za(e,2,3,!1))}this.geometry=to,this.material=e,this.center=new G(.5,.5),this.count=1}raycast(e,t){e.camera===null&&W(`Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.`),ro.setFromMatrixScale(this.matrixWorld),so.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),io.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&ro.multiplyScalar(-io.z);let n=this.material.rotation,r,i;n!==0&&(i=Math.cos(n),r=Math.sin(n));let a=this.center;go(co.set(-.5,-.5,0),io,a,ro,r,i),go(lo.set(.5,-.5,0),io,a,ro,r,i),go(uo.set(.5,.5,0),io,a,ro,r,i),fo.set(0,0),po.set(1,0),mo.set(1,1);let o=e.ray.intersectTriangle(co,lo,uo,!1,no);if(o===null&&(go(lo.set(-.5,.5,0),io,a,ro,r,i),po.set(0,1),o=e.ray.intersectTriangle(co,uo,lo,!1,no),o===null))return;let s=e.ray.origin.distanceTo(no);s<e.near||s>e.far||t.push({distance:s,point:no.clone(),uv:ma.getInterpolation(no,co,lo,uo,fo,po,mo,new G),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function go(e,t,n,r,i,a){ao.subVectors(e,n).addScalar(.5).multiply(r),i===void 0?oo.copy(ao):(oo.x=a*ao.x-i*ao.y,oo.y=i*ao.x+a*ao.y),e.copy(t),e.x+=oo.x,e.y+=oo.y,e.applyMatrix4(so)}var _o=new K,vo=new K,yo=new K,bo=new K,xo=new K,So=new K,Co=new K,wo=class{constructor(e=new K,t=new K(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,_o)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=_o.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(_o.copy(this.origin).addScaledVector(this.direction,t),_o.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){vo.copy(e).add(t).multiplyScalar(.5),yo.copy(t).sub(e).normalize(),bo.copy(this.origin).sub(vo);let i=e.distanceTo(t)*.5,a=-this.direction.dot(yo),o=bo.dot(this.direction),s=-bo.dot(yo),c=bo.lengthSq(),l=Math.abs(1-a*a),u,d,f,p;if(l>0){if(u=a*s-o,d=a*o-s,p=i*l,u>=0){if(d>=-p){if(d<=p){let e=1/l;u*=e,d*=e,f=u*(u+a*d+2*o)+d*(a*u+d+2*s)+c}else d=i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d=-i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c}else d<=-p?(u=Math.max(0,-(-a*i+o)),d=u>0?-i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c):d<=p?(u=0,d=Math.min(Math.max(-i,-s),i),f=d*(d+2*s)+c):(u=Math.max(0,-(a*i+o)),d=u>0?i:Math.min(Math.max(-i,-s),i),f=-u*u+d*(d+2*s)+c)}else d=a>0?-i:i,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(vo).addScaledVector(yo,d),f}intersectSphere(e,t){_o.subVectors(e.center,this.origin);let n=_o.dot(this.direction),r=_o.dot(_o)-n*n,i=e.radius*e.radius;if(r>i)return null;let a=Math.sqrt(i-r),o=n-a,s=n+a;return s<0?null:o<0?this.at(s,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,i,a,o,s,c=1/this.direction.x,l=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(i=(e.min.y-d.y)*l,a=(e.max.y-d.y)*l):(i=(e.max.y-d.y)*l,a=(e.min.y-d.y)*l),n>a||i>r||((i>n||isNaN(n))&&(n=i),(a<r||isNaN(r))&&(r=a),u>=0?(o=(e.min.z-d.z)*u,s=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,s=(e.min.z-d.z)*u),n>s||o>r)||((o>n||n!==n)&&(n=o),(s<r||r!==r)&&(r=s),r<0)?null:this.at(n>=0?n:r,t)}intersectsBox(e){return this.intersectBox(e,_o)!==null}intersectTriangle(e,t,n,r,i){xo.subVectors(t,e),So.subVectors(n,e),Co.crossVectors(xo,So);let a=this.direction.dot(Co),o;if(a>0){if(r)return null;o=1}else if(a<0)o=-1,a=-a;else return null;bo.subVectors(this.origin,e);let s=o*this.direction.dot(So.crossVectors(bo,So));if(s<0)return null;let c=o*this.direction.dot(xo.cross(bo));if(c<0||s+c>a)return null;let l=-o*bo.dot(Co);return l<0?null:this.at(l/a,i)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},To=class extends $a{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type=`MeshBasicMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Eo=new yi,Do=new wo,Oo=new Ba,ko=new K,Ao=new K,jo=new K,Mo=new K,No=new K,Po=new K,Fo=new K,Io=new K,X=class extends Ki{constructor(e=new Ja,t=new To){super(),this.isMesh=!0,this.type=`Mesh`,this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let e=0,t=n.length;e<t;e++){let t=n[e].name||String(e);this.morphTargetInfluences.push(0),this.morphTargetDictionary[t]=e}}}}getVertexPosition(e,t){let n=this.geometry,r=n.attributes.position,i=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(r,e);let o=this.morphTargetInfluences;if(i&&o){Po.set(0,0,0);for(let n=0,r=i.length;n<r;n++){let r=o[n],s=i[n];r!==0&&(No.fromBufferAttribute(s,e),a?Po.addScaledVector(No,r):Po.addScaledVector(No.sub(t),r))}t.add(Po)}return t}raycast(e,t){let n=this.geometry,r=this.material,i=this.matrixWorld;r!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Oo.copy(n.boundingSphere),Oo.applyMatrix4(i),Do.copy(e.ray).recast(e.near),!(Oo.containsPoint(Do.origin)===!1&&(Do.intersectSphere(Oo,ko)===null||Do.origin.distanceToSquared(ko)>(e.far-e.near)**2))&&(Eo.copy(i).invert(),Do.copy(e.ray).applyMatrix4(Eo),(n.boundingBox===null||Do.intersectsBox(n.boundingBox)!==!1)&&this._computeIntersections(e,t,Do)))}_computeIntersections(e,t,n){let r,i=this.geometry,a=this.material,o=i.index,s=i.attributes.position,c=i.attributes.uv,l=i.attributes.uv1,u=i.attributes.normal,d=i.groups,f=i.drawRange;if(o!==null){if(Array.isArray(a))for(let i=0,s=d.length;i<s;i++){let s=d[i],p=a[s.materialIndex],m=Math.max(s.start,f.start),h=Math.min(o.count,Math.min(s.start+s.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=o.getX(i),d=o.getX(i+1),f=o.getX(i+2);r=Ro(this,p,e,n,c,l,u,a,d,f),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=s.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),s=Math.min(o.count,f.start+f.count);for(let d=i,f=s;d<f;d+=3){let i=o.getX(d),s=o.getX(d+1),f=o.getX(d+2);r=Ro(this,a,e,n,c,l,u,i,s,f),r&&(r.faceIndex=Math.floor(d/3),t.push(r))}}}else if(s!==void 0){if(Array.isArray(a))for(let i=0,o=d.length;i<o;i++){let o=d[i],p=a[o.materialIndex],m=Math.max(o.start,f.start),h=Math.min(s.count,Math.min(o.start+o.count,f.start+f.count));for(let i=m,a=h;i<a;i+=3){let a=i,s=i+1,d=i+2;r=Ro(this,p,e,n,c,l,u,a,s,d),r&&(r.faceIndex=Math.floor(i/3),r.face.materialIndex=o.materialIndex,t.push(r))}}else{let i=Math.max(0,f.start),o=Math.min(s.count,f.start+f.count);for(let s=i,d=o;s<d;s+=3){let i=s,o=s+1,d=s+2;r=Ro(this,a,e,n,c,l,u,i,o,d),r&&(r.faceIndex=Math.floor(s/3),t.push(r))}}}}};function Lo(e,t,n,r,i,a,o,s){let c;if(c=t.side===1?r.intersectTriangle(o,a,i,!0,s):r.intersectTriangle(i,a,o,t.side===0,s),c===null)return null;Io.copy(s),Io.applyMatrix4(e.matrixWorld);let l=n.ray.origin.distanceTo(Io);return l<n.near||l>n.far?null:{distance:l,point:Io.clone(),object:e}}function Ro(e,t,n,r,i,a,o,s,c,l){e.getVertexPosition(s,Ao),e.getVertexPosition(c,jo),e.getVertexPosition(l,Mo);let u=Lo(e,t,n,r,Ao,jo,Mo,Fo);if(u){let e=new K;ma.getBarycoord(Fo,Ao,jo,Mo,e),i&&(u.uv=ma.getInterpolatedAttribute(i,s,c,l,e,new G)),a&&(u.uv1=ma.getInterpolatedAttribute(a,s,c,l,e,new G)),o&&(u.normal=ma.getInterpolatedAttribute(o,s,c,l,e,new K),u.normal.dot(r.direction)>0&&u.normal.multiplyScalar(-1));let t={a:s,b:c,c:l,normal:new K,materialIndex:0};ma.getNormal(Ao,jo,Mo,t.normal),u.face=t,u.barycoord=e}return u}var zo=class extends pi{constructor(e=null,t=1,n=1,r,i,a,o,s,c=Rt,l=Rt,u,d){super(null,a,o,s,c,l,r,i,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Bo=class extends Na{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Vo=new yi,Ho=new yi,Uo=[],Wo=new ha,Go=new yi,Ko=new X,qo=new Ba,Jo=class extends X{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bo(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let e=0;e<n;e++)this.setMatrixAt(e,Go)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new ha),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vo),Wo.copy(e.boundingBox).applyMatrix4(Vo),this.boundingBox.union(Wo)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ba),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Vo),qo.copy(e.boundingSphere).applyMatrix4(Vo),this.boundingSphere.union(qo)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){let n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,i=e*(n.length+1)+1;for(let e=0;e<n.length;e++)n[e]=r[i+e]}raycast(e,t){let n=this.matrixWorld,r=this.count;if(Ko.geometry=this.geometry,Ko.material=this.material,Ko.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),qo.copy(this.boundingSphere),qo.applyMatrix4(n),e.ray.intersectsSphere(qo)!==!1))for(let i=0;i<r;i++){this.getMatrixAt(i,Vo),Ho.multiplyMatrices(n,Vo),Ko.matrixWorld=Ho,Ko.raycast(e,Uo);for(let e=0,n=Uo.length;e<n;e++){let n=Uo[e];n.instanceId=i,n.object=this,t.push(n)}Uo.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bo(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){let n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new zo(new Float32Array(r*this.count),r,this.count,ln,Xt));let i=this.morphTexture.source.data.data,a=0;for(let e=0;e<n.length;e++)a+=n[e];let o=this.geometry.morphTargetsRelative?1:1-a,s=r*e;return i[s]=o,i.set(n,s+1),this}updateMorphTargets(){}dispose(){this.dispatchEvent({type:`dispose`}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}},Yo=new K,Xo=new K,Zo=new q,Qo=class{constructor(e=new K(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let r=Yo.subVectors(n,t).cross(Xo.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){let r=e.delta(Yo),i=this.normal.dot(r);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/i;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(r,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||Zo.getNormalMatrix(e),r=this.coplanarPoint(Yo).applyMatrix4(e),i=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(i),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},$o=new Ba,es=new G(.5,.5),ts=new K,ns=class{constructor(e=new Qo,t=new Qo,n=new Qo,r=new Qo,i=new Qo,a=new Qo){this.planes=[e,t,n,r,i,a]}set(e,t,n,r,i,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(r),o[4].copy(i),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=dr,n=!1){let r=this.planes,i=e.elements,a=i[0],o=i[1],s=i[2],c=i[3],l=i[4],u=i[5],d=i[6],f=i[7],p=i[8],m=i[9],h=i[10],g=i[11],_=i[12],v=i[13],y=i[14],b=i[15];if(r[0].setComponents(c-a,f-l,g-p,b-_).normalize(),r[1].setComponents(c+a,f+l,g+p,b+_).normalize(),r[2].setComponents(c+o,f+u,g+m,b+v).normalize(),r[3].setComponents(c-o,f-u,g-m,b-v).normalize(),n)r[4].setComponents(s,d,h,y).normalize(),r[5].setComponents(c-s,f-d,g-h,b-y).normalize();else if(r[4].setComponents(c-s,f-d,g-h,b-y).normalize(),t===2e3)r[5].setComponents(c+s,f+d,g+h,b+y).normalize();else if(t===2001)r[5].setComponents(s,d,h,y).normalize();else throw Error(`THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: `+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),$o.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),$o.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere($o)}intersectsSprite(e){return $o.center.set(0,0,0),$o.radius=.7071067811865476+es.distanceTo(e.center),$o.applyMatrix4(e.matrixWorld),this.intersectsSphere($o)}intersectsSphere(e){let t=this.planes,n=e.center,r=-e.radius;for(let e=0;e<6;e++)if(t[e].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let r=t[n];if(ts.x=r.normal.x>0?e.max.x:e.min.x,ts.y=r.normal.y>0?e.max.y:e.min.y,ts.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(ts)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}},rs=class extends pi{constructor(e=[],t=301,n,r,i,a,o,s,c,l){super(e,t,n,r,i,a,o,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},is=class extends pi{constructor(e,t,n,r,i,a,o,s,c){super(e,t,n,r,i,a,o,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},as=class extends pi{constructor(e,t,n=Yt,r,i,a,o=Rt,s=Rt,c,l=sn,u=1){if(l!==1026&&l!==1027)throw Error(`THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat`);super({width:e,height:t,depth:u},r,i,a,o,s,l,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new li(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},os=class extends as{constructor(e,t=Yt,n=301,r,i,a=Rt,o=Rt,s,c=sn){let l={width:e,height:e,depth:1},u=[l,l,l,l,l,l];super(e,e,t,n,r,i,a,o,s,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ss=class extends pi{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},cs=class e extends Ja{constructor(e=1,t=1,n=1,r=1,i=1,a=1){super(),this.type=`BoxGeometry`,this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:i,depthSegments:a};let o=this;r=Math.floor(r),i=Math.floor(i),a=Math.floor(a);let s=[],c=[],l=[],u=[],d=0,f=0;p(`z`,`y`,`x`,-1,-1,n,t,e,a,i,0),p(`z`,`y`,`x`,1,-1,n,t,-e,a,i,1),p(`x`,`z`,`y`,1,1,e,n,t,r,a,2),p(`x`,`z`,`y`,1,-1,e,n,-t,r,a,3),p(`x`,`y`,`z`,1,-1,e,t,n,r,i,4),p(`x`,`y`,`z`,-1,-1,e,t,-n,r,i,5),this.setIndex(s),this.setAttribute(`position`,new Ia(c,3)),this.setAttribute(`normal`,new Ia(l,3)),this.setAttribute(`uv`,new Ia(u,2));function p(e,t,n,r,i,a,p,m,h,g,_){let v=a/h,y=p/g,b=a/2,x=p/2,S=m/2,C=h+1,w=g+1,T=0,E=0,D=new K;for(let a=0;a<w;a++){let o=a*y-x;for(let s=0;s<C;s++)D[e]=(s*v-b)*r,D[t]=o*i,D[n]=S,c.push(D.x,D.y,D.z),D[e]=0,D[t]=0,D[n]=m>0?1:-1,l.push(D.x,D.y,D.z),u.push(s/h),u.push(1-a/g),T+=1}for(let e=0;e<g;e++)for(let t=0;t<h;t++){let n=d+t+C*e,r=d+t+C*(e+1),i=d+(t+1)+C*(e+1),a=d+(t+1)+C*e;s.push(n,r,a),s.push(r,i,a),E+=6}o.addGroup(f,E,_),f+=E,d+=T}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}},ls=class e extends Ja{constructor(e=1,t=32,n=0,r=Math.PI*2){super(),this.type=`CircleGeometry`,this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:r},t=Math.max(3,t);let i=[],a=[],o=[],s=[],c=new K,l=new G;a.push(0,0,0),o.push(0,0,1),s.push(.5,.5);for(let i=0,u=3;i<=t;i++,u+=3){let d=n+i/t*r;c.x=e*Math.cos(d),c.y=e*Math.sin(d),a.push(c.x,c.y,c.z),o.push(0,0,1),l.x=(a[u]/e+1)/2,l.y=(a[u+1]/e+1)/2,s.push(l.x,l.y)}for(let e=1;e<=t;e++)i.push(e,e+1,0);this.setIndex(i),this.setAttribute(`position`,new Ia(a,3)),this.setAttribute(`normal`,new Ia(o,3)),this.setAttribute(`uv`,new Ia(s,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.segments,t.thetaStart,t.thetaLength)}},us=class e extends Ja{constructor(e=1,t=1,n=1,r=32,i=1,a=!1,o=0,s=Math.PI*2){super(),this.type=`CylinderGeometry`,this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:i,openEnded:a,thetaStart:o,thetaLength:s};let c=this;r=Math.floor(r),i=Math.floor(i);let l=[],u=[],d=[],f=[],p=0,m=[],h=n/2,g=0;_(),a===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute(`position`,new Ia(u,3)),this.setAttribute(`normal`,new Ia(d,3)),this.setAttribute(`uv`,new Ia(f,2));function _(){let a=new K,_=new K,v=0,y=(t-e)/n;for(let c=0;c<=i;c++){let l=[],g=c/i,v=g*(t-e)+e;for(let e=0;e<=r;e++){let t=e/r,i=t*s+o,c=Math.sin(i),m=Math.cos(i);_.x=v*c,_.y=-g*n+h,_.z=v*m,u.push(_.x,_.y,_.z),a.set(c,y,m).normalize(),d.push(a.x,a.y,a.z),f.push(t,1-g),l.push(p++)}m.push(l)}for(let n=0;n<r;n++)for(let r=0;r<i;r++){let a=m[r][n],o=m[r+1][n],s=m[r+1][n+1],c=m[r][n+1];(e>0||r!==0)&&(l.push(a,o,c),v+=3),(t>0||r!==i-1)&&(l.push(o,s,c),v+=3)}c.addGroup(g,v,0),g+=v}function v(n){let i=p,a=new G,m=new K,_=0,v=n===!0?e:t,y=n===!0?1:-1;for(let e=1;e<=r;e++)u.push(0,h*y,0),d.push(0,y,0),f.push(.5,.5),p++;let b=p;for(let e=0;e<=r;e++){let t=e/r*s+o,n=Math.cos(t),i=Math.sin(t);m.x=v*i,m.y=h*y,m.z=v*n,u.push(m.x,m.y,m.z),d.push(0,y,0),a.x=n*.5+.5,a.y=i*.5*y+.5,f.push(a.x,a.y),p++}for(let e=0;e<r;e++){let t=i+e,r=b+e;n===!0?l.push(r,r+1,t):l.push(r+1,r,t),_+=3}c.addGroup(g,_,n===!0?1:2),g+=_}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},ds=class e extends us{constructor(e=1,t=1,n=32,r=1,i=!1,a=0,o=Math.PI*2){super(0,e,t,n,r,i,a,o),this.type=`ConeGeometry`,this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:i,thetaStart:a,thetaLength:o}}static fromJSON(t){return new e(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}},fs=class e extends Ja{constructor(e=[],t=[],n=1,r=0){super(),this.type=`PolyhedronGeometry`,this.parameters={vertices:e,indices:t,radius:n,detail:r};let i=[],a=[];o(r),c(n),l(),this.setAttribute(`position`,new Ia(i,3)),this.setAttribute(`normal`,new Ia(i.slice(),3)),this.setAttribute(`uv`,new Ia(a,2)),r===0?this.computeVertexNormals():this.normalizeNormals();function o(e){let n=new K,r=new K,i=new K;for(let a=0;a<t.length;a+=3)f(t[a+0],n),f(t[a+1],r),f(t[a+2],i),s(n,r,i,e)}function s(e,t,n,r){let i=r+1,a=[];for(let r=0;r<=i;r++){a[r]=[];let o=e.clone().lerp(n,r/i),s=t.clone().lerp(n,r/i),c=i-r;for(let e=0;e<=c;e++)e===0&&r===i?a[r][e]=o:a[r][e]=o.clone().lerp(s,e/c)}for(let e=0;e<i;e++)for(let t=0;t<2*(i-e)-1;t++){let n=Math.floor(t/2);t%2==0?(d(a[e][n+1]),d(a[e+1][n]),d(a[e][n])):(d(a[e][n+1]),d(a[e+1][n+1]),d(a[e+1][n]))}}function c(e){let t=new K;for(let n=0;n<i.length;n+=3)t.x=i[n+0],t.y=i[n+1],t.z=i[n+2],t.normalize().multiplyScalar(e),i[n+0]=t.x,i[n+1]=t.y,i[n+2]=t.z}function l(){let e=new K;for(let t=0;t<i.length;t+=3){e.x=i[t+0],e.y=i[t+1],e.z=i[t+2];let n=h(e)/2/Math.PI+.5,r=g(e)/Math.PI+.5;a.push(n,1-r)}p(),u()}function u(){for(let e=0;e<a.length;e+=6){let t=a[e+0],n=a[e+2],r=a[e+4];Math.max(t,n,r)>.9&&Math.min(t,n,r)<.1&&(t<.2&&(a[e+0]+=1),n<.2&&(a[e+2]+=1),r<.2&&(a[e+4]+=1))}}function d(e){i.push(e.x,e.y,e.z)}function f(t,n){let r=t*3;n.x=e[r+0],n.y=e[r+1],n.z=e[r+2]}function p(){let e=new K,t=new K,n=new K,r=new K,o=new G,s=new G,c=new G;for(let l=0,u=0;l<i.length;l+=9,u+=6){e.set(i[l+0],i[l+1],i[l+2]),t.set(i[l+3],i[l+4],i[l+5]),n.set(i[l+6],i[l+7],i[l+8]),o.set(a[u+0],a[u+1]),s.set(a[u+2],a[u+3]),c.set(a[u+4],a[u+5]),r.copy(e).add(t).add(n).divideScalar(3);let d=h(r);m(o,u+0,e,d),m(s,u+2,t,d),m(c,u+4,n,d)}}function m(e,t,n,r){r<0&&e.x===1&&(a[t]=e.x-1),n.x===0&&n.z===0&&(a[t]=r/2/Math.PI+.5)}function h(e){return Math.atan2(e.z,-e.x)}function g(e){return Math.atan2(-e.y,Math.sqrt(e.x*e.x+e.z*e.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.vertices,t.indices,t.radius,t.detail)}},ps=class e extends fs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=1/n,i=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-r,-n,0,-r,n,0,r,-n,0,r,n,-r,-n,0,-r,n,0,r,-n,0,r,n,0,-n,0,-r,n,0,-r,-n,0,r,n,0,r];super(i,[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type=`DodecahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},ms=class{constructor(){this.type=`Curve`,this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){U(`Curve: .getPoint() not implemented.`)}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,r=this.getPoint(0),i=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),i+=n.distanceTo(r),t.push(i),r=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let n=this.getLengths(),r=0,i=n.length,a;a=t||e*n[i-1];let o=0,s=i-1,c;for(;o<=s;)if(r=Math.floor(o+(s-o)/2),c=n[r]-a,c<0)o=r+1;else if(c>0)s=r-1;else{s=r;break}if(r=s,n[r]===a)return r/(i-1);let l=n[r],u=n[r+1]-l,d=(a-l)/u;return(r+d)/(i-1)}getTangent(e,t){let n=1e-4,r=e-n,i=e+n;r<0&&(r=0),i>1&&(i=1);let a=this.getPoint(r),o=this.getPoint(i),s=t||(a.isVector2?new G:new K);return s.copy(o).sub(a).normalize(),s}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){let n=new K,r=[],i=[],a=[],o=new K,s=new yi;for(let t=0;t<=e;t++){let n=t/e;r[t]=this.getTangentAt(n,new K)}i[0]=new K,a[0]=new K;let c=Number.MAX_VALUE,l=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);l<=c&&(c=l,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(r[0],n).normalize(),i[0].crossVectors(r[0],o),a[0].crossVectors(r[0],i[0]);for(let t=1;t<=e;t++){if(i[t]=i[t-1].clone(),a[t]=a[t-1].clone(),o.crossVectors(r[t-1],r[t]),o.length()>2**-52){o.normalize();let e=Math.acos(Or(r[t-1].dot(r[t]),-1,1));i[t].applyMatrix4(s.makeRotationAxis(o,e))}a[t].crossVectors(r[t],i[t])}if(t===!0){let t=Math.acos(Or(i[0].dot(i[e]),-1,1));t/=e,r[0].dot(o.crossVectors(i[0],i[e]))>0&&(t=-t);for(let n=1;n<=e;n++)i[n].applyMatrix4(s.makeRotationAxis(r[n],t*n)),a[n].crossVectors(r[n],i[n])}return{tangents:r,normals:i,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:`Curve`,generator:`Curve.toJSON`}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},hs=class extends ms{constructor(e=0,t=0,n=1,r=1,i=0,a=Math.PI*2,o=!1,s=0){super(),this.isEllipseCurve=!0,this.type=`EllipseCurve`,this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=r,this.aStartAngle=i,this.aEndAngle=a,this.aClockwise=o,this.aRotation=s}getPoint(e,t=new G){let n=t,r=Math.PI*2,i=this.aEndAngle-this.aStartAngle,a=Math.abs(i)<2**-52;for(;i<0;)i+=r;for(;i>r;)i-=r;i<2**-52&&(i=a?0:r),this.aClockwise===!0&&!a&&(i===r?i=-r:i-=r);let o=this.aStartAngle+e*i,s=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let e=Math.cos(this.aRotation),t=Math.sin(this.aRotation),n=s-this.aX,r=c-this.aY;s=n*e-r*t+this.aX,c=n*t+r*e+this.aY}return n.set(s,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},gs=class extends hs{constructor(e,t,n,r,i,a){super(e,t,n,n,r,i,a),this.isArcCurve=!0,this.type=`ArcCurve`}};function _s(){let e=0,t=0,n=0,r=0;function i(i,a,o,s){e=i,t=o,n=-3*i+3*a-2*o-s,r=2*i-2*a+o+s}return{initCatmullRom:function(e,t,n,r,a){i(t,n,a*(n-e),a*(r-t))},initNonuniformCatmullRom:function(e,t,n,r,a,o,s){let c=(t-e)/a-(n-e)/(a+o)+(n-t)/o,l=(n-t)/o-(r-t)/(o+s)+(r-n)/s;c*=o,l*=o,i(t,n,c,l)},calc:function(i){let a=i*i,o=a*i;return e+t*i+n*a+r*o}}}var vs=new K,ys=new K,bs=new _s,xs=new _s,Ss=new _s,Cs=class extends ms{constructor(e=[],t=!1,n=`centripetal`,r=.5){super(),this.isCatmullRomCurve3=!0,this.type=`CatmullRomCurve3`,this.points=e,this.closed=t,this.curveType=n,this.tension=r}getPoint(e,t=new K){let n=t,r=this.points,i=r.length,a=(i-+!this.closed)*e,o=Math.floor(a),s=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/i)+1)*i:s===0&&o===i-1&&(o=i-2,s=1);let c,l;this.closed||o>0?c=r[(o-1)%i]:(ys.subVectors(r[0],r[1]).add(r[0]),c=ys);let u=r[o%i],d=r[(o+1)%i];if(this.closed||o+2<i?l=r[(o+2)%i]:(vs.subVectors(r[i-1],r[i-2]).add(r[i-1]),l=vs),this.curveType===`centripetal`||this.curveType===`chordal`){let e=this.curveType===`chordal`?.5:.25,t=c.distanceToSquared(u)**+e,n=u.distanceToSquared(d)**+e,r=d.distanceToSquared(l)**+e;n<1e-4&&(n=1),t<1e-4&&(t=n),r<1e-4&&(r=n),bs.initNonuniformCatmullRom(c.x,u.x,d.x,l.x,t,n,r),xs.initNonuniformCatmullRom(c.y,u.y,d.y,l.y,t,n,r),Ss.initNonuniformCatmullRom(c.z,u.z,d.z,l.z,t,n,r)}else this.curveType===`catmullrom`&&(bs.initCatmullRom(c.x,u.x,d.x,l.x,this.tension),xs.initCatmullRom(c.y,u.y,d.y,l.y,this.tension),Ss.initCatmullRom(c.z,u.z,d.z,l.z,this.tension));return n.set(bs.calc(s),xs.calc(s),Ss.calc(s)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new K().fromArray(n))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function ws(e,t,n,r,i){let a=(r-t)*.5,o=(i-n)*.5,s=e*e,c=e*s;return(2*n-2*r+a+o)*c+(-3*n+3*r-2*a-o)*s+a*e+n}function Ts(e,t){let n=1-e;return n*n*t}function Es(e,t){return 2*(1-e)*e*t}function Ds(e,t){return e*e*t}function Os(e,t,n,r){return Ts(e,t)+Es(e,n)+Ds(e,r)}function ks(e,t){let n=1-e;return n*n*n*t}function As(e,t){let n=1-e;return 3*n*n*e*t}function js(e,t){return 3*(1-e)*e*e*t}function Ms(e,t){return e*e*e*t}function Ns(e,t,n,r,i){return ks(e,t)+As(e,n)+js(e,r)+Ms(e,i)}var Ps=class extends ms{constructor(e=new G,t=new G,n=new G,r=new G){super(),this.isCubicBezierCurve=!0,this.type=`CubicBezierCurve`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ns(e,r.x,i.x,a.x,o.x),Ns(e,r.y,i.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Fs=class extends ms{constructor(e=new K,t=new K,n=new K,r=new K){super(),this.isCubicBezierCurve3=!0,this.type=`CubicBezierCurve3`,this.v0=e,this.v1=t,this.v2=n,this.v3=r}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2,o=this.v3;return n.set(Ns(e,r.x,i.x,a.x,o.x),Ns(e,r.y,i.y,a.y,o.y),Ns(e,r.z,i.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Is=class extends ms{constructor(e=new G,t=new G){super(),this.isLineCurve=!0,this.type=`LineCurve`,this.v1=e,this.v2=t}getPoint(e,t=new G){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new G){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Ls=class extends ms{constructor(e=new K,t=new K){super(),this.isLineCurve3=!0,this.type=`LineCurve3`,this.v1=e,this.v2=t}getPoint(e,t=new K){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new K){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Rs=class extends ms{constructor(e=new G,t=new G,n=new G){super(),this.isQuadraticBezierCurve=!0,this.type=`QuadraticBezierCurve`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new G){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Os(e,r.x,i.x,a.x),Os(e,r.y,i.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},zs=class extends ms{constructor(e=new K,t=new K,n=new K){super(),this.isQuadraticBezierCurve3=!0,this.type=`QuadraticBezierCurve3`,this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new K){let n=t,r=this.v0,i=this.v1,a=this.v2;return n.set(Os(e,r.x,i.x,a.x),Os(e,r.y,i.y,a.y),Os(e,r.z,i.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Bs=Object.freeze({__proto__:null,ArcCurve:gs,CatmullRomCurve3:Cs,CubicBezierCurve:Ps,CubicBezierCurve3:Fs,EllipseCurve:hs,LineCurve:Is,LineCurve3:Ls,QuadraticBezierCurve:Rs,QuadraticBezierCurve3:zs,SplineCurve:class extends ms{constructor(e=[]){super(),this.isSplineCurve=!0,this.type=`SplineCurve`,this.points=e}getPoint(e,t=new G){let n=t,r=this.points,i=(r.length-1)*e,a=Math.floor(i),o=i-a,s=r[a===0?a:a-1],c=r[a],l=r[a>r.length-2?r.length-1:a+1],u=r[a>r.length-3?r.length-1:a+2];return n.set(ws(o,s.x,c.x,l.x,u.x),ws(o,s.y,c.y,l.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(n.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let n=this.points[t];e.points.push(n.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let n=e.points[t];this.points.push(new G().fromArray(n))}return this}}}),Vs=class e extends fs{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,r=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1];super(r,[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type=`IcosahedronGeometry`,this.parameters={radius:e,detail:t}}static fromJSON(t){return new e(t.radius,t.detail)}},Hs=class e extends Ja{constructor(e=[new G(0,-.5),new G(.5,0),new G(0,.5)],t=12,n=0,r=Math.PI*2){super(),this.type=`LatheGeometry`,this.parameters={points:e,segments:t,phiStart:n,phiLength:r},t=Math.floor(t),r=Or(r,0,Math.PI*2);let i=[],a=[],o=[],s=[],c=[],l=1/t,u=new K,d=new G,f=new K,p=new K,m=new K,h=0,g=0;for(let t=0;t<=e.length-1;t++)switch(t){case 0:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,m.copy(f),f.normalize(),s.push(f.x,f.y,f.z);break;case e.length-1:s.push(m.x,m.y,m.z);break;default:h=e[t+1].x-e[t].x,g=e[t+1].y-e[t].y,f.x=g*1,f.y=-h,f.z=g*0,p.copy(f),f.x+=m.x,f.y+=m.y,f.z+=m.z,f.normalize(),s.push(f.x,f.y,f.z),m.copy(p)}for(let i=0;i<=t;i++){let f=n+i*l*r,p=Math.sin(f),m=Math.cos(f);for(let n=0;n<=e.length-1;n++){u.x=e[n].x*p,u.y=e[n].y,u.z=e[n].x*m,a.push(u.x,u.y,u.z),d.x=i/t,d.y=n/(e.length-1),o.push(d.x,d.y);let r=s[3*n+0]*p,l=s[3*n+1],f=s[3*n+0]*m;c.push(r,l,f)}}for(let n=0;n<t;n++)for(let t=0;t<e.length-1;t++){let r=t+n*e.length,a=r,o=r+e.length,s=r+e.length+1,c=r+1;i.push(a,o,c),i.push(s,c,o)}this.setIndex(i),this.setAttribute(`position`,new Ia(a,3)),this.setAttribute(`uv`,new Ia(o,2)),this.setAttribute(`normal`,new Ia(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.points,t.segments,t.phiStart,t.phiLength)}},Us=class e extends Ja{constructor(e=1,t=1,n=1,r=1){super(),this.type=`PlaneGeometry`,this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};let i=e/2,a=t/2,o=Math.floor(n),s=Math.floor(r),c=o+1,l=s+1,u=e/o,d=t/s,f=[],p=[],m=[],h=[];for(let e=0;e<l;e++){let t=e*d-a;for(let n=0;n<c;n++){let r=n*u-i;p.push(r,-t,0),m.push(0,0,1),h.push(n/o),h.push(1-e/s)}}for(let e=0;e<s;e++)for(let t=0;t<o;t++){let n=t+c*e,r=t+c*(e+1),i=t+1+c*(e+1),a=t+1+c*e;f.push(n,r,a),f.push(r,i,a)}this.setIndex(f),this.setAttribute(`position`,new Ia(p,3)),this.setAttribute(`normal`,new Ia(m,3)),this.setAttribute(`uv`,new Ia(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.width,t.height,t.widthSegments,t.heightSegments)}},Ws=class e extends Ja{constructor(e=.5,t=1,n=32,r=1,i=0,a=Math.PI*2){super(),this.type=`RingGeometry`,this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:r,thetaStart:i,thetaLength:a},n=Math.max(3,n),r=Math.max(1,r);let o=[],s=[],c=[],l=[],u=e,d=(t-e)/r,f=new K,p=new G;for(let e=0;e<=r;e++){for(let e=0;e<=n;e++){let r=i+e/n*a;f.x=u*Math.cos(r),f.y=u*Math.sin(r),s.push(f.x,f.y,f.z),c.push(0,0,1),p.x=(f.x/t+1)/2,p.y=(f.y/t+1)/2,l.push(p.x,p.y)}u+=d}for(let e=0;e<r;e++){let t=e*(n+1);for(let e=0;e<n;e++){let r=e+t,i=r,a=r+n+1,s=r+n+2,c=r+1;o.push(i,a,c),o.push(a,s,c)}}this.setIndex(o),this.setAttribute(`position`,new Ia(s,3)),this.setAttribute(`normal`,new Ia(c,3)),this.setAttribute(`uv`,new Ia(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}},Gs=class e extends Ja{constructor(e=1,t=32,n=16,r=0,i=Math.PI*2,a=0,o=Math.PI){super(),this.type=`SphereGeometry`,this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:i,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let s=Math.min(a+o,Math.PI),c=0,l=[],u=new K,d=new K,f=[],p=[],m=[],h=[];for(let f=0;f<=n;f++){let g=[],_=f/n,v=a+_*o,y=e*Math.cos(v),b=Math.sqrt(e*e-y*y),x=0;f===0&&a===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let e=0;e<=t;e++){let n=e/t,a=r+n*i;u.x=-b*Math.cos(a),u.y=y,u.z=b*Math.sin(a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),m.push(d.x,d.y,d.z),h.push(n+x,1-_),g.push(c++)}l.push(g)}for(let e=0;e<n;e++)for(let r=0;r<t;r++){let t=l[e][r+1],i=l[e][r],o=l[e+1][r],c=l[e+1][r+1];(e!==0||a>0)&&f.push(t,i,c),(e!==n-1||s<Math.PI)&&f.push(i,o,c)}this.setIndex(f),this.setAttribute(`position`,new Ia(p,3)),this.setAttribute(`normal`,new Ia(m,3)),this.setAttribute(`uv`,new Ia(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}},Ks=class e extends Ja{constructor(e=1,t=.4,n=12,r=48,i=Math.PI*2,a=0,o=Math.PI*2){super(),this.type=`TorusGeometry`,this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:i,thetaStart:a,thetaLength:o},n=Math.floor(n),r=Math.floor(r);let s=[],c=[],l=[],u=[],d=new K,f=new K,p=new K;for(let s=0;s<=n;s++){let m=a+s/n*o;for(let a=0;a<=r;a++){let o=a/r*i;f.x=(e+t*Math.cos(m))*Math.cos(o),f.y=(e+t*Math.cos(m))*Math.sin(o),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),d.x=e*Math.cos(o),d.y=e*Math.sin(o),p.subVectors(f,d).normalize(),l.push(p.x,p.y,p.z),u.push(a/r),u.push(s/n)}}for(let e=1;e<=n;e++)for(let t=1;t<=r;t++){let n=(r+1)*e+t-1,i=(r+1)*(e-1)+t-1,a=(r+1)*(e-1)+t,o=(r+1)*e+t;s.push(n,i,o),s.push(i,a,o)}this.setIndex(s),this.setAttribute(`position`,new Ia(c,3)),this.setAttribute(`normal`,new Ia(l,3)),this.setAttribute(`uv`,new Ia(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(t){return new e(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}},qs=class e extends Ja{constructor(e=new zs(new K(-1,-1,0),new K(-1,1,0),new K(1,1,0)),t=64,n=1,r=8,i=!1){super(),this.type=`TubeGeometry`,this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:r,closed:i};let a=e.computeFrenetFrames(t,i);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new K,s=new K,c=new G,l=new K,u=[],d=[],f=[],p=[];m(),this.setIndex(p),this.setAttribute(`position`,new Ia(u,3)),this.setAttribute(`normal`,new Ia(d,3)),this.setAttribute(`uv`,new Ia(f,2));function m(){for(let e=0;e<t;e++)h(e);h(i===!1?t:0),_(),g()}function h(i){l=e.getPointAt(i/t,l);let c=a.normals[i],f=a.binormals[i];for(let e=0;e<=r;e++){let t=e/r*Math.PI*2,i=Math.sin(t),a=-Math.cos(t);s.x=a*c.x+i*f.x,s.y=a*c.y+i*f.y,s.z=a*c.z+i*f.z,s.normalize(),d.push(s.x,s.y,s.z),o.x=l.x+n*s.x,o.y=l.y+n*s.y,o.z=l.z+n*s.z,u.push(o.x,o.y,o.z)}}function g(){for(let e=1;e<=t;e++)for(let t=1;t<=r;t++){let n=(r+1)*(e-1)+(t-1),i=(r+1)*e+(t-1),a=(r+1)*e+t,o=(r+1)*(e-1)+t;p.push(n,i,o),p.push(i,a,o)}}function _(){for(let e=0;e<=t;e++)for(let n=0;n<=r;n++)c.x=e/t,c.y=n/r,f.push(c.x,c.y)}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(t){return new e(new Bs[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}};function Js(e){let t={};for(let n in e){t[n]={};for(let r in e[n]){let i=e[n][r];if(Xs(i))i.isRenderTargetTexture?(U(`UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().`),t[n][r]=null):t[n][r]=i.clone();else if(Array.isArray(i)){if(Xs(i[0])){let e=[];for(let t=0,n=i.length;t<n;t++)e[t]=i[t].clone();t[n][r]=e}else t[n][r]=i.slice()}else t[n][r]=i}}return t}function Ys(e){let t={};for(let n=0;n<e.length;n++){let r=Js(e[n]);for(let e in r)t[e]=r[e]}return t}function Xs(e){return e&&(e.isColor||e.isMatrix3||e.isMatrix4||e.isVector2||e.isVector3||e.isVector4||e.isTexture||e.isQuaternion)}function Zs(e){let t=[];for(let n=0;n<e.length;n++)t.push(e[n].clone());return t}function Qs(e){let t=e.getRenderTarget();return t===null?e.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ri.workingColorSpace}var $s={clone:Js,merge:Ys},ec=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tc=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,nc=class extends $a{constructor(e){super(),this.isShaderMaterial=!0,this.type=`ShaderMaterial`,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=ec,this.fragmentShader=tc,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=Zs(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let n in this.uniforms){let r=this.uniforms[n].value;r&&r.isTexture?t.uniforms[n]={type:`t`,value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[n]={type:`c`,value:r.getHex()}:r&&r.isVector2?t.uniforms[n]={type:`v2`,value:r.toArray()}:r&&r.isVector3?t.uniforms[n]={type:`v3`,value:r.toArray()}:r&&r.isVector4?t.uniforms[n]={type:`v4`,value:r.toArray()}:r&&r.isMatrix3?t.uniforms[n]={type:`m3`,value:r.toArray()}:r&&r.isMatrix4?t.uniforms[n]={type:`m4`,value:r.toArray()}:t.uniforms[n]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let e in this.extensions)this.extensions[e]===!0&&(n[e]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let n in e.uniforms){let r=e.uniforms[n];switch(this.uniforms[n]={},r.type){case`t`:this.uniforms[n].value=t[r.value]||null;break;case`c`:this.uniforms[n].value=new Y().setHex(r.value);break;case`v2`:this.uniforms[n].value=new G().fromArray(r.value);break;case`v3`:this.uniforms[n].value=new K().fromArray(r.value);break;case`v4`:this.uniforms[n].value=new mi().fromArray(r.value);break;case`m3`:this.uniforms[n].value=new q().fromArray(r.value);break;case`m4`:this.uniforms[n].value=new yi().fromArray(r.value);break;default:this.uniforms[n].value=r.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let t in e.extensions)this.extensions[t]=e.extensions[t];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},rc=class extends nc{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type=`RawShaderMaterial`}},ic=class extends $a{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type=`MeshStandardMaterial`,this.defines={STANDARD:``},this.color=new Y(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:``},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},ac=class extends $a{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type=`MeshLambertMaterial`,this.color=new Y(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Y(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new G(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ki,this.combine=0,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap=`round`,this.wireframeLinejoin=`round`,this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},oc=class extends $a{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type=`MeshDepthMaterial`,this.depthPacking=rr,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},sc=class extends $a{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type=`MeshDistanceMaterial`,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function cc(e,t){return!e||e.constructor===t?e:typeof t.BYTES_PER_ELEMENT==`number`?new t(e):Array.prototype.slice.call(e)}var lc=class{constructor(e,t,n,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r===void 0?new t.constructor(n):r,this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,r=t[n],i=t[n-1];validate_interval:{seek:{let a;linear_scan:{forward_scan:if(!(e<r)){for(let a=n+2;;){if(r===void 0){if(e<i)break forward_scan;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(i=r,r=t[++n],e<r)break seek}a=t.length;break linear_scan}if(!(e>=i)){let o=t[1];e<o&&(n=2,i=o);for(let a=n-2;;){if(i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===a)break;if(r=i,i=t[--n-1],e>=i)break seek}a=n,n=0;break linear_scan}break validate_interval}for(;n<a;){let r=n+a>>>1;e<t[r]?a=r:n=r+1}if(r=t[n],i=t[n-1],i===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,i,r)}return this.interpolate_(n,i,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,r=this.valueSize,i=e*r;for(let e=0;e!==r;++e)t[e]=n[i+e];return t}interpolate_(){throw Error(`THREE.Interpolant: Call to abstract method.`)}intervalChanged_(){}},uc=class extends lc{constructor(e,t,n,r){super(e,t,n,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:er,endingEnd:er}}intervalChanged_(e,t,n){let r=this.parameterPositions,i=e-2,a=e+1,o=r[i],s=r[a];if(o===void 0)switch(this.getSettings_().endingStart){case tr:i=e,o=2*t-n;break;case nr:i=r.length-2,o=t+r[i]-r[i+1];break;default:i=e,o=n}if(s===void 0)switch(this.getSettings_().endingEnd){case tr:a=e,s=2*n-t;break;case nr:a=1,s=n+r[1]-r[0];break;default:a=e-1,s=t}let c=(n-t)*.5,l=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(s-n),this._offsetPrev=i*l,this._offsetNext=a*l}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,p=(n-t)/(r-t),m=p*p,h=m*p,g=-d*h+2*d*m-d*p,_=(1+d)*h+(-1.5-2*d)*m+(-.5+d)*p+1,v=(-1-f)*h+(1.5+f)*m+.5*p,y=f*h-f*m;for(let e=0;e!==o;++e)i[e]=g*a[l+e]+_*a[c+e]+v*a[s+e]+y*a[u+e];return i}},dc=class extends lc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=(n-t)/(r-t),u=1-l;for(let e=0;e!==o;++e)i[e]=a[c+e]*u+a[s+e]*l;return i}},fc=class extends lc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e){return this.copySampleValue_(e-1)}},pc=class extends lc{interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=e*o,c=s-o,l=this.inTangents,u=this.outTangents;if(!l||!u){let e=(n-t)/(r-t),l=1-e;for(let t=0;t!==o;++t)i[t]=a[c+t]*l+a[s+t]*e;return i}let d=o*2,f=e-1;for(let p=0;p!==o;++p){let o=a[c+p],m=a[s+p],h=f*d+p*2,g=u[h],_=u[h+1],v=e*d+p*2,y=l[v],b=l[v+1],x=(n-t)/(r-t),S,C,w,T,E;for(let e=0;e<8;e++){S=x*x,C=S*x,w=1-x,T=w*w,E=T*w;let e=E*t+3*T*x*g+3*w*S*y+C*r-n;if(Math.abs(e)<1e-10)break;let i=3*T*(g-t)+6*w*x*(y-g)+3*S*(r-y);if(Math.abs(i)<1e-10)break;x-=e/i,x=Math.max(0,Math.min(1,x))}i[p]=E*o+3*T*x*_+3*w*S*b+C*m}return i}},mc=class{constructor(e,t,n,r){if(e===void 0)throw Error(`THREE.KeyframeTrack: track name is undefined`);if(t===void 0||t.length===0)throw Error(`THREE.KeyframeTrack: no keyframes in track named `+e);this.name=e,this.times=cc(t,this.TimeBufferType),this.values=cc(n,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:cc(e.times,Array),values:cc(e.values,Array)};let t=e.getInterpolation();t!==e.DefaultInterpolation&&(n.interpolation=t)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new fc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new dc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new uc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new pc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Xn:t=this.InterpolantFactoryMethodDiscrete;break;case Zn:t=this.InterpolantFactoryMethodLinear;break;case Qn:t=this.InterpolantFactoryMethodSmooth;break;case $n:t=this.InterpolantFactoryMethodBezier}if(t===void 0){let t=`unsupported interpolation for `+this.ValueTypeName+` keyframe track named `+this.name;if(this.createInterpolant===void 0){if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw Error(t)}return U(`KeyframeTrack:`,t),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Xn;case this.InterpolantFactoryMethodLinear:return Zn;case this.InterpolantFactoryMethodSmooth:return Qn;case this.InterpolantFactoryMethodBezier:return $n}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,r=t.length;n!==r;++n)t[n]*=e}return this}trim(e,t){let n=this.times,r=n.length,i=0,a=r-1;for(;i!==r&&n[i]<e;)++i;for(;a!==-1&&n[a]>t;)--a;if(++a,i!==0||a!==r){i>=a&&(a=Math.max(a,1),i=a-1);let e=this.getValueSize();this.times=n.slice(i,a),this.values=this.values.slice(i*e,a*e)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(W(`KeyframeTrack: Invalid value size in track.`,this),e=!1);let n=this.times,r=this.values,i=n.length;i===0&&(W(`KeyframeTrack: Track is empty.`,this),e=!1);let a=null;for(let t=0;t!==i;t++){let r=n[t];if(typeof r==`number`&&isNaN(r)){W(`KeyframeTrack: Time is not a valid number.`,this,t,r),e=!1;break}if(a!==null&&a>r){W(`KeyframeTrack: Out of order keys.`,this,t,r,a),e=!1;break}a=r}if(r!==void 0&&pr(r))for(let t=0,n=r.length;t!==n;++t){let n=r[t];if(isNaN(n)){W(`KeyframeTrack: Value is not a valid number.`,this,t,n),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),r=this.getInterpolation()===Qn,i=e.length-1,a=1;for(let o=1;o<i;++o){let i=!1,s=e[o];if(s!==e[o+1]&&(o!==1||s!==e[0])){if(r)i=!0;else{let e=o*n,r=e-n,a=e+n;for(let o=0;o!==n;++o){let n=t[e+o];if(n!==t[r+o]||n!==t[a+o]){i=!0;break}}}}if(i){if(o!==a){e[a]=e[o];let r=o*n,i=a*n;for(let e=0;e!==n;++e)t[i+e]=t[r+e]}++a}}if(i>0){e[a]=e[i];for(let e=i*n,r=a*n,o=0;o!==n;++o)t[r+o]=t[e+o];++a}return a===e.length?(this.times=e,this.values=t):(this.times=e.slice(0,a),this.values=t.slice(0,a*n)),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=this.constructor,r=new n(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};mc.prototype.ValueTypeName=``,mc.prototype.TimeBufferType=Float32Array,mc.prototype.ValueBufferType=Float32Array,mc.prototype.DefaultInterpolation=Zn;var hc=class extends mc{constructor(e,t,n){super(e,t,n)}};hc.prototype.ValueTypeName=`bool`,hc.prototype.ValueBufferType=Array,hc.prototype.DefaultInterpolation=Xn,hc.prototype.InterpolantFactoryMethodLinear=void 0,hc.prototype.InterpolantFactoryMethodSmooth=void 0;var gc=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}};gc.prototype.ValueTypeName=`color`;var _c=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}};_c.prototype.ValueTypeName=`number`;var vc=class extends lc{constructor(e,t,n,r){super(e,t,n,r)}interpolate_(e,t,n,r){let i=this.resultBuffer,a=this.sampleValues,o=this.valueSize,s=(n-t)/(r-t),c=e*o;for(let e=c+o;c!==e;c+=4)Xr.slerpFlat(i,0,a,c-o,a,c,s);return i}},yc=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}InterpolantFactoryMethodLinear(e){return new vc(this.times,this.values,this.getValueSize(),e)}};yc.prototype.ValueTypeName=`quaternion`,yc.prototype.InterpolantFactoryMethodSmooth=void 0;var bc=class extends mc{constructor(e,t,n){super(e,t,n)}};bc.prototype.ValueTypeName=`string`,bc.prototype.ValueBufferType=Array,bc.prototype.DefaultInterpolation=Xn,bc.prototype.InterpolantFactoryMethodLinear=void 0,bc.prototype.InterpolantFactoryMethodSmooth=void 0;var xc=class extends mc{constructor(e,t,n,r){super(e,t,n,r)}};xc.prototype.ValueTypeName=`vector`;var Sc={enabled:!1,files:{},add:function(e,t){this.enabled!==!1&&(Cc(e)||(this.files[e]=t))},get:function(e){if(this.enabled!==!1&&!Cc(e))return this.files[e]},remove:function(e){delete this.files[e]},clear:function(){this.files={}}};function Cc(e){try{let t=e.slice(e.indexOf(`:`)+1);return new URL(t).protocol===`blob:`}catch{return!1}}var wc=new class{constructor(e,t,n){let r=this,i=!1,a=0,o=0,s,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(e){o++,i===!1&&r.onStart!==void 0&&r.onStart(e,a,o),i=!0},this.itemEnd=function(e){a++,r.onProgress!==void 0&&r.onProgress(e,a,o),a===o&&(i=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(e){r.onError!==void 0&&r.onError(e)},this.resolveURL=function(e){return e=e.normalize(`NFC`),s?s(e):e},this.setURLModifier=function(e){return s=e,this},this.addHandler=function(e,t){return c.push(e,t),this},this.removeHandler=function(e){let t=c.indexOf(e);return t!==-1&&c.splice(t,2),this},this.getHandler=function(e){for(let t=0,n=c.length;t<n;t+=2){let n=c[t],r=c[t+1];if(n.global&&(n.lastIndex=0),n.test(e))return r}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||=new AbortController,this._abortController}},Tc=class{constructor(e){this.manager=e===void 0?wc:e,this.crossOrigin=`anonymous`,this.withCredentials=!1,this.path=``,this.resourcePath=``,this.requestHeader={},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}load(){}loadAsync(e,t){let n=this;return new Promise(function(r,i){n.load(e,r,t,i)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Tc.DEFAULT_MATERIAL_NAME=`__DEFAULT`;var Ec=new WeakMap,Dc=class extends Tc{constructor(e){super(e)}load(e,t,n,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let i=this,a=Sc.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)i.manager.itemStart(e),setTimeout(function(){t&&t(a),i.manager.itemEnd(e)},0);else{let e=Ec.get(a);e===void 0&&(e=[],Ec.set(a,e)),e.push({onLoad:t,onError:r})}return a}let o=mr(`img`);function s(){l(),t&&t(this);let n=Ec.get(this)||[];for(let e=0;e<n.length;e++){let t=n[e];t.onLoad&&t.onLoad(this)}Ec.delete(this),i.manager.itemEnd(e)}function c(t){l(),r&&r(t),Sc.remove(`image:${e}`);let n=Ec.get(this)||[];for(let e=0;e<n.length;e++){let r=n[e];r.onError&&r.onError(t)}Ec.delete(this),i.manager.itemError(e),i.manager.itemEnd(e)}function l(){o.removeEventListener(`load`,s,!1),o.removeEventListener(`error`,c,!1)}return o.addEventListener(`load`,s,!1),o.addEventListener(`error`,c,!1),e.slice(0,5)!==`data:`&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Sc.add(`image:${e}`,o),i.manager.itemStart(e),o.src=e,o}},Oc=class extends Tc{constructor(e){super(e)}load(e,t,n,r){let i=new pi,a=new Dc(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(e){i.image=e,i.needsUpdate=!0,t!==void 0&&t(i)},n,r),i}},kc=class extends Ki{constructor(e,t=1){super(),this.isLight=!0,this.type=`Light`,this.color=new Y(e),this.intensity=t}dispose(){this.dispatchEvent({type:`dispose`})}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}},Ac=class extends kc{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type=`HemisphereLight`,this.position.copy(Ki.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Y(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){let t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}},jc=new yi,Mc=new K,Nc=new K,Pc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new G(512,512),this.mapType=Wt,this.map=null,this.mapPass=null,this.matrix=new yi,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ns,this._frameExtents=new G(1,1),this._viewportCount=1,this._viewports=[new mi(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Mc.setFromMatrixPosition(e.matrixWorld),t.position.copy(Mc),Nc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Nc),t.updateMatrixWorld(),jc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jc,t.coordinateSystem,t.reversedDepth),t.coordinateSystem===2001||t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(jc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Fc=new K,Ic=new Xr,Lc=new K,Rc=class extends Ki{constructor(){super(),this.isCamera=!0,this.type=`Camera`,this.matrixWorldInverse=new yi,this.projectionMatrix=new yi,this.projectionMatrixInverse=new yi,this.coordinateSystem=dr,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Fc,Ic,Lc),Lc.x===1&&Lc.y===1&&Lc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fc,Ic,Lc.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Fc,Ic,Lc),Lc.x===1&&Lc.y===1&&Lc.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Fc,Ic,Lc.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},zc=new K,Bc=new G,Vc=new G,Hc=class extends Rc{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type=`PerspectiveCamera`,this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Er*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Tr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Er*2*Math.atan(Math.tan(Tr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){zc.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(zc.x,zc.y).multiplyScalar(-e/zc.z),zc.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(zc.x,zc.y).multiplyScalar(-e/zc.z)}getViewSize(e,t){return this.getViewBounds(e,Bc,Vc),t.subVectors(Vc,Bc)}setViewOffset(e,t,n,r,i,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Tr*.5*this.fov)/this.zoom,n=2*t,r=this.aspect*n,i=-.5*r,a=this.view;if(this.view!==null&&this.view.enabled){let e=a.fullWidth,o=a.fullHeight;i+=a.offsetX*r/e,t-=a.offsetY*n/o,r*=a.width/e,n*=a.height/o}let o=this.filmOffset;o!==0&&(i+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(i,i+r,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Uc=class extends Rc{constructor(e=-1,t=1,n=1,r=-1,i=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type=`OrthographicCamera`,this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=i,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,i,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=i,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2,i=n-e,a=n+e,o=r+t,s=r-t;if(this.view!==null&&this.view.enabled){let e=(this.right-this.left)/this.view.fullWidth/this.zoom,t=(this.top-this.bottom)/this.view.fullHeight/this.zoom;i+=e*this.view.offsetX,a=i+e*this.view.width,o-=t*this.view.offsetY,s=o-t*this.view.height}this.projectionMatrix.makeOrthographic(i,a,o,s,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Wc=class extends Pc{constructor(){super(new Uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Gc=class extends kc{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type=`DirectionalLight`,this.position.copy(Ki.DEFAULT_UP),this.updateMatrix(),this.target=new Ki,this.shadow=new Wc}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Kc=-90,qc=1,Jc=class extends Ki{constructor(e,t,n){super(),this.type=`CubeCamera`,this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Hc(Kc,qc,e,t);r.layers=this.layers,this.add(r);let i=new Hc(Kc,qc,e,t);i.layers=this.layers,this.add(i);let a=new Hc(Kc,qc,e,t);a.layers=this.layers,this.add(a);let o=new Hc(Kc,qc,e,t);o.layers=this.layers,this.add(o);let s=new Hc(Kc,qc,e,t);s.layers=this.layers,this.add(s);let c=new Hc(Kc,qc,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,r,i,a,o,s]=t;for(let e of t)this.remove(e);if(e===2e3)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),i.up.set(0,0,-1),i.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else if(e===2001)n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),i.up.set(0,0,1),i.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1);else throw Error(`THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: `+e);for(let e of t)this.add(e),e.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[i,a,o,s,c,l]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),p=e.xr.enabled;e.xr.enabled=!1;let m=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let h=!1;h=e.isWebGLRenderer===!0?e.state.buffers.depth.getReversed():e.reversedDepthBuffer,e.setRenderTarget(n,0,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,i),e.setRenderTarget(n,1,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,4,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.generateMipmaps=m,e.setRenderTarget(n,5,r),h&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(u,d,f),e.xr.enabled=p,n.texture.needsPMREMUpdate=!0}},Yc=class extends Hc{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}},Xc=`\\[\\]\\.:\\/`,Zc=RegExp(`[\\[\\]\\.:\\/]`,`g`),Qc=`[^\\[\\]\\.:\\/]`,$c=`[^`+Xc.replace(`\\.`,``)+`]`,el=`((?:WC+[\\/:])*)`.replace(`WC`,Qc),tl=`(WCOD+)?`.replace(`WCOD`,$c),nl=`(?:\\.(WC+)(?:\\[(.+)\\])?)?`.replace(`WC`,Qc),rl=`\\.(WC+)(?:\\[(.+)\\])?`.replace(`WC`,Qc),il=RegExp(`^`+el+tl+nl+rl+`$`),al=[`material`,`materials`,`bones`,`map`],ol=class{constructor(e,t,n){let r=n||sl.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let n=this._targetGroup.nCachedObjects_,r=this._bindings[n];r!==void 0&&r.getValue(e,t)}setValue(e,t){let n=this._bindings;for(let r=this._targetGroup.nCachedObjects_,i=n.length;r!==i;++r)n[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}},sl=class e{constructor(t,n,r){this.path=n,this.parsedPath=r||e.parseTrackName(n),this.node=e.findNode(t,this.parsedPath.nodeName),this.rootNode=t,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(t,n,r){return t&&t.isAnimationObjectGroup?new e.Composite(t,n,r):new e(t,n,r)}static sanitizeNodeName(e){return e.replace(/\s/g,`_`).replace(Zc,``)}static parseTrackName(e){let t=il.exec(e);if(t===null)throw Error(`THREE.PropertyBinding: Cannot parse trackName: `+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=n.nodeName&&n.nodeName.lastIndexOf(`.`);if(r!==void 0&&r!==-1){let e=n.nodeName.substring(r+1);al.indexOf(e)!==-1&&(n.nodeName=n.nodeName.substring(0,r),n.objectName=e)}if(n.propertyName===null||n.propertyName.length===0)throw Error(`THREE.PropertyBinding: can not parse propertyName from trackName: `+e);return n}static findNode(e,t){if(t===void 0||t===``||t===`.`||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(e){for(let r=0;r<e.length;r++){let i=e[r];if(i.name===t||i.uuid===t)return i;let a=n(i.children);if(a)return a}return null},r=n(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)e[t++]=n[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let r=0,i=n.length;r!==i;++r)n[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let t=this.node,n=this.parsedPath,r=n.objectName,i=n.propertyName,a=n.propertyIndex;if(t||(t=e.findNode(this.rootNode,n.nodeName),this.node=t),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!t){U(`PropertyBinding: No target node found for track: `+this.path+`.`);return}if(r){let e=n.objectIndex;switch(r){case`materials`:if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.materials){W(`PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.`,this);return}t=t.material.materials;break;case`bones`:if(!t.skeleton){W(`PropertyBinding: Can not bind to bones as node does not have a skeleton.`,this);return}t=t.skeleton.bones;for(let n=0;n<t.length;n++)if(t[n].name===e){e=n;break}break;case`map`:if(`map`in t){t=t.map;break}if(!t.material){W(`PropertyBinding: Can not bind to material as node does not have a material.`,this);return}if(!t.material.map){W(`PropertyBinding: Can not bind to material.map as node.material does not have a map.`,this);return}t=t.material.map;break;default:if(t[r]===void 0){W(`PropertyBinding: Can not bind to objectName of node undefined.`,this);return}t=t[r]}if(e!==void 0){if(t[e]===void 0){W(`PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.`,this,t);return}t=t[e]}}let o=t[i];if(o===void 0){let e=n.nodeName;W(`PropertyBinding: Trying to update property for track: `+e+`.`+i+` but it wasn't found.`,t);return}let s=this.Versioning.None;this.targetObject=t,t.isMaterial===!0?s=this.Versioning.NeedsUpdate:t.isObject3D===!0&&(s=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(a!==void 0){if(i===`morphTargetInfluences`){if(!t.geometry){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.`,this);return}if(!t.geometry.morphAttributes){W(`PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.`,this);return}t.morphTargetDictionary[a]!==void 0&&(a=t.morphTargetDictionary[a])}c=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=a}else o.fromArray!==void 0&&o.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(c=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][s]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};sl.Composite=ol,sl.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},sl.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},sl.prototype.GetterByBindingType=[sl.prototype._getValue_direct,sl.prototype._getValue_array,sl.prototype._getValue_arrayElement,sl.prototype._getValue_toArray],sl.prototype.SetterByBindingTypeAndVersioning=[[sl.prototype._setValue_direct,sl.prototype._setValue_direct_setNeedsUpdate,sl.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[sl.prototype._setValue_array,sl.prototype._setValue_array_setNeedsUpdate,sl.prototype._setValue_array_setMatrixWorldNeedsUpdate],[sl.prototype._setValue_arrayElement,sl.prototype._setValue_arrayElement_setNeedsUpdate,sl.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[sl.prototype._setValue_fromArray,sl.prototype._setValue_fromArray_setNeedsUpdate,sl.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var cl=new yi,ll=class{constructor(e,t,n=0,r=1/0){this.ray=new wo(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ai,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):W(`Raycaster: Unsupported camera type: `+t.type)}setFromXRController(e){return cl.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(cl),this}intersectObject(e,t=!0,n=[]){return dl(e,this,n,t),n.sort(ul),n}intersectObjects(e,t=!0,n=[]){for(let r=0,i=e.length;r<i;r++)dl(e[r],this,n,t);return n.sort(ul),n}};function ul(e,t){return e.distance-t.distance}function dl(e,t,n,r){let i=!0;if(e.layers.test(t.layers)&&e.raycast(t,n)===!1&&(i=!1),i===!0&&r===!0){let r=e.children;for(let e=0,i=r.length;e<i;e++)dl(r[e],t,n,!0)}}(class e{static{e.prototype.isMatrix2=!0}constructor(e,t,n,r){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,r)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,r){let i=this.elements;return i[0]=e,i[2]=t,i[1]=n,i[3]=r,this}});function fl(e,t,n,r){let i=pl(r);switch(n){case rn:return e*t;case ln:return e*t/i.components*i.byteLength;case un:return e*t/i.components*i.byteLength;case dn:return e*t*2/i.components*i.byteLength;case fn:return e*t*2/i.components*i.byteLength;case an:return e*t*3/i.components*i.byteLength;case on:return e*t*4/i.components*i.byteLength;case pn:return e*t*4/i.components*i.byteLength;case mn:case hn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case gn:case _n:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case yn:case xn:return Math.max(e,16)*Math.max(t,8)/4;case vn:case bn:return Math.max(e,8)*Math.max(t,8)/2;case Sn:case Cn:case Tn:case En:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*8;case wn:case Dn:case On:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case kn:return Math.floor((e+3)/4)*Math.floor((t+3)/4)*16;case An:return Math.floor((e+4)/5)*Math.floor((t+3)/4)*16;case jn:return Math.floor((e+4)/5)*Math.floor((t+4)/5)*16;case Mn:return Math.floor((e+5)/6)*Math.floor((t+4)/5)*16;case Nn:return Math.floor((e+5)/6)*Math.floor((t+5)/6)*16;case Pn:return Math.floor((e+7)/8)*Math.floor((t+4)/5)*16;case Fn:return Math.floor((e+7)/8)*Math.floor((t+5)/6)*16;case In:return Math.floor((e+7)/8)*Math.floor((t+7)/8)*16;case Ln:return Math.floor((e+9)/10)*Math.floor((t+4)/5)*16;case Rn:return Math.floor((e+9)/10)*Math.floor((t+5)/6)*16;case zn:return Math.floor((e+9)/10)*Math.floor((t+7)/8)*16;case Bn:return Math.floor((e+9)/10)*Math.floor((t+9)/10)*16;case Vn:return Math.floor((e+11)/12)*Math.floor((t+9)/10)*16;case Hn:return Math.floor((e+11)/12)*Math.floor((t+11)/12)*16;case Un:case Wn:case Gn:return Math.ceil(e/4)*Math.ceil(t/4)*16;case Kn:case qn:return Math.ceil(e/4)*Math.ceil(t/4)*8;case Jn:case Yn:return Math.ceil(e/4)*Math.ceil(t/4)*16}throw Error(`Unable to determine texture byte length for ${n} format.`)}function pl(e){switch(e){case Wt:case Gt:return{byteLength:1,components:1};case qt:case Kt:case Zt:return{byteLength:2,components:1};case Qt:case $t:return{byteLength:2,components:4};case Yt:case Jt:case Xt:return{byteLength:4,components:1};case tn:case nn:return{byteLength:4,components:3}}throw Error(`THREE.TextureUtils: Unknown texture type ${e}.`)}typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`register`,{detail:{revision:`185`}})),typeof window<`u`&&(window.__THREE__?U(`WARNING: Multiple instances of Three.js being imported.`):window.__THREE__=`185`);function ml(){let e=null,t=!1,n=null,r=null;function i(t,a){n(t,a),r=e.requestAnimationFrame(i)}return{start:function(){t!==!0&&n!==null&&e!==null&&(r=e.requestAnimationFrame(i),t=!0)},stop:function(){e!==null&&e.cancelAnimationFrame(r),t=!1},setAnimationLoop:function(e){n=e},setContext:function(t){e=t}}}function hl(e){let t=new WeakMap;function n(t,n){let r=t.array,i=t.usage,a=r.byteLength,o=e.createBuffer();e.bindBuffer(n,o),e.bufferData(n,r,i),t.onUploadCallback();let s;if(r instanceof Float32Array)s=e.FLOAT;else if(typeof Float16Array<`u`&&r instanceof Float16Array)s=e.HALF_FLOAT;else if(r instanceof Uint16Array)s=t.isFloat16BufferAttribute?e.HALF_FLOAT:e.UNSIGNED_SHORT;else if(r instanceof Int16Array)s=e.SHORT;else if(r instanceof Uint32Array)s=e.UNSIGNED_INT;else if(r instanceof Int32Array)s=e.INT;else if(r instanceof Int8Array)s=e.BYTE;else if(r instanceof Uint8Array)s=e.UNSIGNED_BYTE;else if(r instanceof Uint8ClampedArray)s=e.UNSIGNED_BYTE;else throw Error(`THREE.WebGLAttributes: Unsupported buffer data format: `+r);return{buffer:o,type:s,bytesPerElement:r.BYTES_PER_ELEMENT,version:t.version,size:a}}function r(t,n,r){let i=n.array,a=n.updateRanges;if(e.bindBuffer(r,t),a.length===0)e.bufferSubData(r,0,i);else{a.sort((e,t)=>e.start-t.start);let t=0;for(let e=1;e<a.length;e++){let n=a[t],r=a[e];r.start<=n.start+n.count+1?n.count=Math.max(n.count,r.start+r.count-n.start):(++t,a[t]=r)}a.length=t+1;for(let t=0,n=a.length;t<n;t++){let n=a[t];e.bufferSubData(r,n.start*i.BYTES_PER_ELEMENT,i,n.start,n.count)}n.clearUpdateRanges()}n.onUploadCallback()}function i(e){return e.isInterleavedBufferAttribute&&(e=e.data),t.get(e)}function a(n){n.isInterleavedBufferAttribute&&(n=n.data);let r=t.get(n);r&&(e.deleteBuffer(r.buffer),t.delete(n))}function o(e,i){if(e.isInterleavedBufferAttribute&&(e=e.data),e.isGLBufferAttribute){let n=t.get(e);(!n||n.version<e.version)&&t.set(e,{buffer:e.buffer,type:e.type,bytesPerElement:e.elementSize,version:e.version});return}let a=t.get(e);if(a===void 0)t.set(e,n(e,i));else if(a.version<e.version){if(a.size!==e.array.byteLength)throw Error(`THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.`);r(a.buffer,e,i),a.version=e.version}}return{get:i,remove:a,update:o}}var gl={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},Z={common:{diffuse:{value:new Y(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new q}},envmap:{envMap:{value:null},envMapRotation:{value:new q},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new q},normalScale:{value:new G(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Y(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new K},probesMax:{value:new K},probesResolution:{value:new K}},points:{diffuse:{value:new Y(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0},uvTransform:{value:new q}},sprite:{diffuse:{value:new Y(16777215)},opacity:{value:1},center:{value:new G(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new q},alphaMap:{value:null},alphaMapTransform:{value:new q},alphaTest:{value:0}}},_l={basic:{uniforms:Ys([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.fog]),vertexShader:gl.meshbasic_vert,fragmentShader:gl.meshbasic_frag},lambert:{uniforms:Ys([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},envMapIntensity:{value:1}}]),vertexShader:gl.meshlambert_vert,fragmentShader:gl.meshlambert_frag},phong:{uniforms:Ys([Z.common,Z.specularmap,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},specular:{value:new Y(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:gl.meshphong_vert,fragmentShader:gl.meshphong_frag},standard:{uniforms:Ys([Z.common,Z.envmap,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.roughnessmap,Z.metalnessmap,Z.fog,Z.lights,{emissive:{value:new Y(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gl.meshphysical_vert,fragmentShader:gl.meshphysical_frag},toon:{uniforms:Ys([Z.common,Z.aomap,Z.lightmap,Z.emissivemap,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.gradientmap,Z.fog,Z.lights,{emissive:{value:new Y(0)}}]),vertexShader:gl.meshtoon_vert,fragmentShader:gl.meshtoon_frag},matcap:{uniforms:Ys([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,Z.fog,{matcap:{value:null}}]),vertexShader:gl.meshmatcap_vert,fragmentShader:gl.meshmatcap_frag},points:{uniforms:Ys([Z.points,Z.fog]),vertexShader:gl.points_vert,fragmentShader:gl.points_frag},dashed:{uniforms:Ys([Z.common,Z.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gl.linedashed_vert,fragmentShader:gl.linedashed_frag},depth:{uniforms:Ys([Z.common,Z.displacementmap]),vertexShader:gl.depth_vert,fragmentShader:gl.depth_frag},normal:{uniforms:Ys([Z.common,Z.bumpmap,Z.normalmap,Z.displacementmap,{opacity:{value:1}}]),vertexShader:gl.meshnormal_vert,fragmentShader:gl.meshnormal_frag},sprite:{uniforms:Ys([Z.sprite,Z.fog]),vertexShader:gl.sprite_vert,fragmentShader:gl.sprite_frag},background:{uniforms:{uvTransform:{value:new q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gl.background_vert,fragmentShader:gl.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new q}},vertexShader:gl.backgroundCube_vert,fragmentShader:gl.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gl.cube_vert,fragmentShader:gl.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gl.equirect_vert,fragmentShader:gl.equirect_frag},distance:{uniforms:Ys([Z.common,Z.displacementmap,{referencePosition:{value:new K},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gl.distance_vert,fragmentShader:gl.distance_frag},shadow:{uniforms:Ys([Z.lights,Z.fog,{color:{value:new Y(0)},opacity:{value:1}}]),vertexShader:gl.shadow_vert,fragmentShader:gl.shadow_frag}};_l.physical={uniforms:Ys([_l.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new q},clearcoatNormalScale:{value:new G(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new q},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new q},sheen:{value:0},sheenColor:{value:new Y(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new q},transmissionSamplerSize:{value:new G},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new q},attenuationDistance:{value:0},attenuationColor:{value:new Y(0)},specularColor:{value:new Y(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new q},anisotropyVector:{value:new G},anisotropyMap:{value:null},anisotropyMapTransform:{value:new q}}]),vertexShader:gl.meshphysical_vert,fragmentShader:gl.meshphysical_frag};var vl={r:0,b:0,g:0},yl=new yi,bl=new q;bl.set(-1,0,0,0,1,0,0,0,1);function xl(e,t,n,r,i,a){let o=new Y(0),s=i===!0?0:1,c,l,u=null,d=0,f=null;function p(e){let n=e.isScene===!0?e.background:null;if(n&&n.isTexture){let r=e.backgroundBlurriness>0;n=t.get(n,r)}return n}function m(t){let r=!1,i=p(t);i===null?g(o,s):i&&i.isColor&&(g(i,1),r=!0);let c=e.xr.getEnvironmentBlendMode();c===`additive`?n.buffers.color.setClear(0,0,0,1,a):c===`alpha-blend`&&n.buffers.color.setClear(0,0,0,0,a),(e.autoClear||r)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil))}function h(t,n){let i=p(n);i&&(i.isCubeTexture||i.mapping===306)?(l===void 0&&(l=new X(new cs(1,1,1),new nc({name:`BackgroundCubeMaterial`,uniforms:Js(_l.backgroundCube.uniforms),vertexShader:_l.backgroundCube.vertexShader,fragmentShader:_l.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute(`normal`),l.geometry.deleteAttribute(`uv`),l.onBeforeRender=function(e,t,n){this.matrixWorld.copyPosition(n.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(l)),l.material.uniforms.envMap.value=i,l.material.uniforms.backgroundBlurriness.value=n.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(yl.makeRotationFromEuler(n.backgroundRotation)).transpose(),i.isCubeTexture&&i.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(bl),l.material.toneMapped=ri.getTransfer(i.colorSpace)!==sr,(u!==i||d!==i.version||f!==e.toneMapping)&&(l.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),l.layers.enableAll(),t.unshift(l,l.geometry,l.material,0,0,null)):i&&i.isTexture&&(c===void 0&&(c=new X(new Us(2,2),new nc({name:`BackgroundMaterial`,uniforms:Js(_l.background.uniforms),vertexShader:_l.background.vertexShader,fragmentShader:_l.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute(`normal`),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=i,c.material.uniforms.backgroundIntensity.value=n.backgroundIntensity,c.material.toneMapped=ri.getTransfer(i.colorSpace)!==sr,i.matrixAutoUpdate===!0&&i.updateMatrix(),c.material.uniforms.uvTransform.value.copy(i.matrix),(u!==i||d!==i.version||f!==e.toneMapping)&&(c.material.needsUpdate=!0,u=i,d=i.version,f=e.toneMapping),c.layers.enableAll(),t.unshift(c,c.geometry,c.material,0,0,null))}function g(t,r){t.getRGB(vl,Qs(e)),n.buffers.color.setClear(vl.r,vl.g,vl.b,r,a)}function _(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return o},setClearColor:function(e,t=1){o.set(e),s=t,g(o,s)},getClearAlpha:function(){return s},setClearAlpha:function(e){s=e,g(o,s)},render:m,addToRenderList:h,dispose:_}}function Sl(e,t){let n=e.getParameter(e.MAX_VERTEX_ATTRIBS),r={},i=f(null),a=i,o=!1;function s(n,r,i,s,c){let u=!1,f=d(n,s,i,r);a!==f&&(a=f,l(a.object)),u=p(n,s,i,c),u&&m(n,s,i,c),c!==null&&t.update(c,e.ELEMENT_ARRAY_BUFFER),(u||o)&&(o=!1,b(n,r,i,s),c!==null&&e.bindBuffer(e.ELEMENT_ARRAY_BUFFER,t.get(c).buffer))}function c(){return e.createVertexArray()}function l(t){return e.bindVertexArray(t)}function u(t){return e.deleteVertexArray(t)}function d(e,t,n,i){let a=i.wireframe===!0,o=r[t.id];o===void 0&&(o={},r[t.id]=o);let s=e.isInstancedMesh===!0?e.id:0,l=o[s];l===void 0&&(l={},o[s]=l);let u=l[n.id];u===void 0&&(u={},l[n.id]=u);let d=u[a];return d===void 0&&(d=f(c()),u[a]=d),d}function f(e){let t=[],r=[],i=[];for(let e=0;e<n;e++)t[e]=0,r[e]=0,i[e]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:t,enabledAttributes:r,attributeDivisors:i,object:e,attributes:{},index:null}}function p(e,t,n,r){let i=a.attributes,o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=i[t],r=o[t];if(r===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(r=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(r=e.instanceColor)),n===void 0||n.attribute!==r||r&&n.data!==r.data)return!0;s++}return a.attributesNum!==s||a.index!==r}function m(e,t,n,r){let i={},o=t.attributes,s=0,c=n.getAttributes();for(let t in c)if(c[t].location>=0){let n=o[t];n===void 0&&(t===`instanceMatrix`&&e.instanceMatrix&&(n=e.instanceMatrix),t===`instanceColor`&&e.instanceColor&&(n=e.instanceColor));let r={};r.attribute=n,n&&n.data&&(r.data=n.data),i[t]=r,s++}a.attributes=i,a.attributesNum=s,a.index=r}function h(){let e=a.newAttributes;for(let t=0,n=e.length;t<n;t++)e[t]=0}function g(e){_(e,0)}function _(t,n){let r=a.newAttributes,i=a.enabledAttributes,o=a.attributeDivisors;r[t]=1,i[t]===0&&(e.enableVertexAttribArray(t),i[t]=1),o[t]!==n&&(e.vertexAttribDivisor(t,n),o[t]=n)}function v(){let t=a.newAttributes,n=a.enabledAttributes;for(let r=0,i=n.length;r<i;r++)n[r]!==t[r]&&(e.disableVertexAttribArray(r),n[r]=0)}function y(t,n,r,i,a,o,s){s===!0?e.vertexAttribIPointer(t,n,r,a,o):e.vertexAttribPointer(t,n,r,i,a,o)}function b(n,r,i,a){h();let o=a.attributes,s=i.getAttributes(),c=r.defaultAttributeValues;for(let r in s){let i=s[r];if(i.location>=0){let s=o[r];if(s===void 0&&(r===`instanceMatrix`&&n.instanceMatrix&&(s=n.instanceMatrix),r===`instanceColor`&&n.instanceColor&&(s=n.instanceColor)),s!==void 0){let r=s.normalized,o=s.itemSize,c=t.get(s);if(c===void 0)continue;let l=c.buffer,u=c.type,d=c.bytesPerElement,f=u===e.INT||u===e.UNSIGNED_INT||s.gpuType===1013;if(s.isInterleavedBufferAttribute){let t=s.data,c=t.stride,p=s.offset;if(t.isInstancedInterleavedBuffer){for(let e=0;e<i.locationSize;e++)_(i.location+e,t.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=t.meshPerAttribute*t.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,c*d,(p+o/i.locationSize*e)*d,f)}else{if(s.isInstancedBufferAttribute){for(let e=0;e<i.locationSize;e++)_(i.location+e,s.meshPerAttribute);n.isInstancedMesh!==!0&&a._maxInstanceCount===void 0&&(a._maxInstanceCount=s.meshPerAttribute*s.count)}else for(let e=0;e<i.locationSize;e++)g(i.location+e);e.bindBuffer(e.ARRAY_BUFFER,l);for(let e=0;e<i.locationSize;e++)y(i.location+e,o/i.locationSize,u,r,o*d,o/i.locationSize*e*d,f)}}else if(c!==void 0){let t=c[r];if(t!==void 0)switch(t.length){case 2:e.vertexAttrib2fv(i.location,t);break;case 3:e.vertexAttrib3fv(i.location,t);break;case 4:e.vertexAttrib4fv(i.location,t);break;default:e.vertexAttrib1fv(i.location,t)}}}}v()}function x(){T();for(let e in r){let t=r[e];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e]}}function S(e){if(r[e.id]===void 0)return;let t=r[e.id];for(let e in t){let n=t[e];for(let e in n){let t=n[e];for(let e in t)u(t[e].object),delete t[e];delete n[e]}}delete r[e.id]}function C(e){for(let t in r){let n=r[t];for(let t in n){let r=n[t];if(r[e.id]===void 0)continue;let i=r[e.id];for(let e in i)u(i[e].object),delete i[e];delete r[e.id]}}}function w(e){for(let t in r){let n=r[t],i=e.isInstancedMesh===!0?e.id:0,a=n[i];if(a!==void 0){for(let e in a){let t=a[e];for(let e in t)u(t[e].object),delete t[e];delete a[e]}delete n[i],Object.keys(n).length===0&&delete r[t]}}}function T(){E(),o=!0,a!==i&&(a=i,l(a.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:s,reset:T,resetDefaultState:E,dispose:x,releaseStatesOfGeometry:S,releaseStatesOfObject:w,releaseStatesOfProgram:C,initAttributes:h,enableAttribute:g,disableUnusedAttributes:v}}function Cl(e,t,n){let r;function i(e){r=e}function a(t,i){e.drawArrays(r,t,i),n.update(i,r,1)}function o(t,i,a){a!==0&&(e.drawArraysInstanced(r,t,i,a),n.update(i,r,a))}function s(e,i,a){if(a===0)return;t.get(`WEBGL_multi_draw`).multiDrawArraysWEBGL(r,e,0,i,0,a);let o=0;for(let e=0;e<a;e++)o+=i[e];n.update(o,r,1)}this.setMode=i,this.render=a,this.renderInstances=o,this.renderMultiDraw=s}function wl(e,t,n,r){let i;function a(){if(i!==void 0)return i;if(t.has(`EXT_texture_filter_anisotropic`)===!0){let n=t.get(`EXT_texture_filter_anisotropic`);i=e.getParameter(n.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(t){return t===1023||r.convert(t)===e.getParameter(e.IMPLEMENTATION_COLOR_READ_FORMAT)}function s(n){let i=n===1016&&(t.has(`EXT_color_buffer_half_float`)||t.has(`EXT_color_buffer_float`));return!(n!==1009&&r.convert(n)!==e.getParameter(e.IMPLEMENTATION_COLOR_READ_TYPE)&&n!==1015&&!i)}function c(t){if(t===`highp`){if(e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.HIGH_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.HIGH_FLOAT).precision>0)return`highp`;t=`mediump`}return t===`mediump`&&e.getShaderPrecisionFormat(e.VERTEX_SHADER,e.MEDIUM_FLOAT).precision>0&&e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT).precision>0?`mediump`:`lowp`}let l=n.precision===void 0?`highp`:n.precision,u=c(l);u!==l&&(U(`WebGLRenderer:`,l,`not supported, using`,u,`instead.`),l=u);let d=n.logarithmicDepthBuffer===!0,f=n.reversedDepthBuffer===!0&&t.has(`EXT_clip_control`);n.reversedDepthBuffer===!0&&f===!1&&U(`WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.`);let p=e.getParameter(e.MAX_TEXTURE_IMAGE_UNITS),m=e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS),h=e.getParameter(e.MAX_TEXTURE_SIZE),g=e.getParameter(e.MAX_CUBE_MAP_TEXTURE_SIZE),_=e.getParameter(e.MAX_VERTEX_ATTRIBS),v=e.getParameter(e.MAX_VERTEX_UNIFORM_VECTORS),y=e.getParameter(e.MAX_VARYING_VECTORS),b=e.getParameter(e.MAX_FRAGMENT_UNIFORM_VECTORS),x=e.getParameter(e.MAX_SAMPLES),S=e.getParameter(e.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:c,textureFormatReadable:o,textureTypeReadable:s,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:m,maxTextureSize:h,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:v,maxVaryings:y,maxFragmentUniforms:b,maxSamples:x,samples:S}}function Tl(e){let t=this,n=null,r=0,i=!1,a=!1,o=new Qo,s=new q,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(e,t){let n=e.length!==0||t||r!==0||i;return i=t,r=e.length,n},this.beginShadows=function(){a=!0,u(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(e,t){n=u(e,t,0)},this.setState=function(t,o,s){let d=t.clippingPlanes,f=t.clipIntersection,p=t.clipShadows,m=e.get(t);if(!i||d===null||d.length===0||a&&!p)a?u(null):l();else{let e=a?0:r,t=e*4,i=m.clippingState||null;c.value=i,i=u(d,o,t,s);for(let e=0;e!==t;++e)i[e]=n[e];m.clippingState=i,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=e}};function l(){c.value!==n&&(c.value=n,c.needsUpdate=r>0),t.numPlanes=r,t.numIntersection=0}function u(e,n,r,i){let a=e===null?0:e.length,l=null;if(a!==0){if(l=c.value,i!==!0||l===null){let t=r+a*4,i=n.matrixWorldInverse;s.getNormalMatrix(i),(l===null||l.length<t)&&(l=new Float32Array(t));for(let t=0,n=r;t!==a;++t,n+=4)o.copy(e[t]).applyMatrix4(i,s),o.normal.toArray(l,n),l[n+3]=o.constant}c.value=l,c.needsUpdate=!0}return t.numPlanes=a,t.numIntersection=0,l}}var El=4,Dl=[.125,.215,.35,.446,.526,.582],Ol=20,kl=256,Al=new Uc,jl=new Y,Ml=null,Nl=0,Pl=0,Fl=!1,Il=new K,Ll=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._sigmas=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,r=100,i={}){let{size:a=256,position:o=Il}=i;Ml=this._renderer.getRenderTarget(),Nl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),Fl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,r,s,o),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=2**this._lodMax}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Ml,Nl,Pl),this._renderer.xr.enabled=Fl,e.scissorTest=!1,Bl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===301||e.mapping===302?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ml=this._renderer.getRenderTarget(),Nl=this._renderer.getActiveCubeFace(),Pl=this._renderer.getActiveMipmapLevel(),Fl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Vt,minFilter:Vt,generateMipmaps:!1,type:Zt,format:on,colorSpace:ar,depthBuffer:!1},r=zl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=zl(e,t,n);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods,sigmas:this._sigmas}=Rl(r)),this._blurMaterial=Hl(r,e,t),this._ggxMaterial=Vl(r,e,t)}return r}_compileMaterial(e){let t=new X(new Ja,e);this._renderer.compile(t,Al)}_sceneToCubeUV(e,t,n,r,i){let a=new Hc(90,1,t,n),o=[1,-1,1,1,1,1],s=[1,1,1,-1,-1,-1],c=this._renderer,l=c.autoClear,u=c.toneMapping;c.getClearColor(jl),c.toneMapping=0,c.autoClear=!1,c.state.buffers.depth.getReversed()&&(c.setRenderTarget(r),c.clearDepth(),c.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new X(new cs,new To({name:`PMREM.Background`,side:1,depthWrite:!1,depthTest:!1})));let d=this._backgroundBox,f=d.material,p=!1,m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,p=!0):(f.color.copy(jl),p=!0);for(let t=0;t<6;t++){let n=t%3;n===0?(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x+s[t],i.y,i.z)):n===1?(a.up.set(0,0,o[t]),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y+s[t],i.z)):(a.up.set(0,o[t],0),a.position.set(i.x,i.y,i.z),a.lookAt(i.x,i.y,i.z+s[t]));let l=this._cubeSize;Bl(r,n*l,t>2?l:0,l,l),c.setRenderTarget(r),p&&c.render(d,a),c.render(e,a)}c.toneMapping=u,c.autoClear=l,e.background=m}_textureToCubeUV(e,t){let n=this._renderer,r=e.mapping===301||e.mapping===302;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());let i=r?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=i;let o=i.uniforms;o.envMap.value=e;let s=this._cubeSize;Bl(t,0,0,3*s,2*s),n.setRenderTarget(t),n.render(a,Al)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let r=this._lodMeshes.length;for(let t=1;t<r;t++)this._applyGGXFilter(e,t-1,t);t.autoClear=n}_applyGGXFilter(e,t,n){let r=this._renderer,i=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;let s=a.uniforms,c=n/(this._lodMeshes.length-1),l=t/(this._lodMeshes.length-1),u=Math.sqrt(c*c-l*l)*(0+c*1.25),{_lodMax:d}=this,f=this._sizeLods[n],p=3*f*(n>d-El?n-d+El:0),m=4*(this._cubeSize-f);s.envMap.value=e.texture,s.roughness.value=u,s.mipInt.value=d-t,Bl(i,p,m,3*f,2*f),r.setRenderTarget(i),r.render(o,Al),s.envMap.value=i.texture,s.roughness.value=0,s.mipInt.value=d-n,Bl(e,p,m,3*f,2*f),r.setRenderTarget(e),r.render(o,Al)}_blur(e,t,n,r,i){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,r,`latitudinal`,i),this._halfBlur(a,e,n,n,r,`longitudinal`,i)}_halfBlur(e,t,n,r,i,a,o){let s=this._renderer,c=this._blurMaterial;a!==`latitudinal`&&a!==`longitudinal`&&W(`blur direction must be either latitudinal or longitudinal!`);let l=this._lodMeshes[r];l.material=c;let u=c.uniforms,d=this._sizeLods[n]-1,f=isFinite(i)?Math.PI/(2*d):2*Math.PI/39,p=i/f,m=isFinite(i)?1+Math.floor(3*p):Ol;m>Ol&&U(`sigmaRadians, ${i}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Ol}`);let h=[],g=0;for(let e=0;e<Ol;++e){let t=e/p,n=Math.exp(-t*t/2);h.push(n),e===0?g+=n:e<m&&(g+=2*n)}for(let e=0;e<h.length;e++)h[e]=h[e]/g;u.envMap.value=e.texture,u.samples.value=m,u.weights.value=h,u.latitudinal.value=a===`latitudinal`,o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=f,u.mipInt.value=_-n;let v=this._sizeLods[r];Bl(t,3*v*(r>_-El?r-_+El:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(l,Al)}};function Rl(e){let t=[],n=[],r=[],i=e,a=e-El+1+Dl.length;for(let o=0;o<a;o++){let a=2**i;t.push(a);let s=1/a;o>e-El?s=Dl[o-e+El-1]:o===0&&(s=0),n.push(s);let c=1/(a-2),l=-c,u=1+c,d=[l,l,u,l,u,u,l,l,u,u,l,u],f=new Float32Array(108),p=new Float32Array(72),m=new Float32Array(36);for(let e=0;e<6;e++){let t=e%3*2/3-1,n=e>2?0:-1,r=[t,n,0,t+2/3,n,0,t+2/3,n+1,0,t,n,0,t+2/3,n+1,0,t,n+1,0];f.set(r,18*e),p.set(d,12*e);let i=[e,e,e,e,e,e];m.set(i,6*e)}let h=new Ja;h.setAttribute(`position`,new Na(f,3)),h.setAttribute(`uv`,new Na(p,2)),h.setAttribute(`faceIndex`,new Na(m,1)),r.push(new X(h,null)),i>El&&i--}return{lodMeshes:r,sizeLods:t,sigmas:n}}function zl(e,t,n){let r=new gi(e,t,n);return r.texture.mapping=306,r.texture.name=`PMREM.cubeUv`,r.scissorTest=!0,r}function Bl(e,t,n,r,i){e.viewport.set(t,n,r,i),e.scissor.set(t,n,r,i)}function Vl(e,t,n){return new nc({name:`PMREMGGXConvolution`,defines:{GGX_SAMPLES:kl,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Gl(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Hl(e,t,n){let r=new Float32Array(Ol),i=new K(0,1,0);return new nc({name:`SphericalGaussianBlur`,defines:{n:Ol,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/n,CUBEUV_MAX_MIP:`${e}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:r},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Gl(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Ul(){return new nc({name:`EquirectangularToCubeUV`,uniforms:{envMap:{value:null}},vertexShader:Gl(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function Wl(){return new nc({name:`CubemapToCubeUV`,uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Gl(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Gl(){return`

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
	`}var Kl=class extends gi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new rs(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new cs(5,5,5),i=new nc({name:`CubemapFromEquirect`,uniforms:Js(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});i.uniforms.tEquirect.value=t;let a=new X(r,i),o=t.minFilter;return t.minFilter===1008&&(t.minFilter=Vt),new Jc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,r=!0){let i=e.getRenderTarget();for(let i=0;i<6;i++)e.setRenderTarget(this,i),e.clear(t,n,r);e.setRenderTarget(i)}};function ql(e){let t=new WeakMap,n=new WeakMap,r=null;function i(e,t=!1){return e==null?null:t?o(e):a(e)}function a(n){if(n&&n.isTexture){let r=n.mapping;if(r===303||r===304){if(t.has(n)){let e=t.get(n).texture;return s(e,n.mapping)}{let r=n.image;if(r&&r.height>0){let i=new Kl(r.height);return i.fromEquirectangularTexture(e,n),t.set(n,i),n.addEventListener(`dispose`,l),s(i.texture,n.mapping)}return null}}}return n}function o(t){if(t&&t.isTexture){let i=t.mapping,a=i===303||i===304,o=i===301||i===302;if(a||o){let i=n.get(t),s=i===void 0?0:i.texture.pmremVersion;if(t.isRenderTargetTexture&&t.pmremVersion!==s)return r===null&&(r=new Ll(e)),i=a?r.fromEquirectangular(t,i):r.fromCubemap(t,i),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),i.texture;if(i!==void 0)return i.texture;{let s=t.image;return a&&s&&s.height>0||o&&s&&c(s)?(r===null&&(r=new Ll(e)),i=a?r.fromEquirectangular(t):r.fromCubemap(t),i.texture.pmremVersion=t.pmremVersion,n.set(t,i),t.addEventListener(`dispose`,u),i.texture):null}}}return t}function s(e,t){return t===303?e.mapping=301:t===304&&(e.mapping=302),e}function c(e){let t=0;for(let n=0;n<6;n++)e[n]!==void 0&&t++;return t===6}function l(e){let n=e.target;n.removeEventListener(`dispose`,l);let r=t.get(n);r!==void 0&&(t.delete(n),r.dispose())}function u(e){let t=e.target;t.removeEventListener(`dispose`,u);let r=n.get(t);r!==void 0&&(n.delete(t),r.dispose())}function d(){t=new WeakMap,n=new WeakMap,r!==null&&(r.dispose(),r=null)}return{get:i,dispose:d}}function Jl(e){let t={};function n(n){if(t[n]!==void 0)return t[n];let r=e.getExtension(n);return t[n]=r,r}return{has:function(e){return n(e)!==null},init:function(){n(`EXT_color_buffer_float`),n(`WEBGL_clip_cull_distance`),n(`OES_texture_float_linear`),n(`EXT_color_buffer_half_float`),n(`WEBGL_multisampled_render_to_texture`),n(`WEBGL_render_shared_exponent`)},get:function(e){let t=n(e);return t===null&&yr(`WebGLRenderer: `+e+` extension not supported.`),t}}}function Yl(e,t,n,r){let i={},a=new WeakMap;function o(e){let s=e.target;s.index!==null&&t.remove(s.index);for(let e in s.attributes)t.remove(s.attributes[e]);s.removeEventListener(`dispose`,o),delete i[s.id];let c=a.get(s);c&&(t.remove(c),a.delete(s)),r.releaseStatesOfGeometry(s),s.isInstancedBufferGeometry===!0&&delete s._maxInstanceCount,n.memory.geometries--}function s(e,t){return i[t.id]===!0?t:(t.addEventListener(`dispose`,o),i[t.id]=!0,n.memory.geometries++,t)}function c(n){let r=n.attributes;for(let n in r)t.update(r[n],e.ARRAY_BUFFER)}function l(e){let n=[],r=e.index,i=e.attributes.position,o=0;if(i===void 0)return;if(r!==null){let e=r.array;o=r.version;for(let t=0,r=e.length;t<r;t+=3){let r=e[t+0],i=e[t+1],a=e[t+2];n.push(r,i,i,a,a,r)}}else{let e=i.array;o=i.version;for(let t=0,r=e.length/3-1;t<r;t+=3){let e=t+0,r=t+1,i=t+2;n.push(e,r,r,i,i,e)}}let s=new(i.count>=65535?Fa:Pa)(n,1);s.version=o;let c=a.get(e);c&&t.remove(c),a.set(e,s)}function u(e){let t=a.get(e);if(t){let n=e.index;n!==null&&t.version<n.version&&l(e)}else l(e);return a.get(e)}return{get:s,update:c,getWireframeAttribute:u}}function Xl(e,t,n){let r;function i(e){r=e}let a,o;function s(e){a=e.type,o=e.bytesPerElement}function c(t,i){e.drawElements(r,i,a,t*o),n.update(i,r,1)}function l(t,i,s){s!==0&&(e.drawElementsInstanced(r,i,a,t*o,s),n.update(i,r,s))}function u(e,i,o){if(o===0)return;t.get(`WEBGL_multi_draw`).multiDrawElementsWEBGL(r,i,0,a,e,0,o);let s=0;for(let e=0;e<o;e++)s+=i[e];n.update(s,r,1)}this.setMode=i,this.setIndex=s,this.render=c,this.renderInstances=l,this.renderMultiDraw=u}function Zl(e){let t={geometries:0,textures:0},n={frame:0,calls:0,triangles:0,points:0,lines:0};function r(t,r,i){switch(n.calls++,r){case e.TRIANGLES:n.triangles+=t/3*i;break;case e.LINES:n.lines+=t/2*i;break;case e.LINE_STRIP:n.lines+=i*(t-1);break;case e.LINE_LOOP:n.lines+=i*t;break;case e.POINTS:n.points+=i*t;break;default:W(`WebGLInfo: Unknown draw mode:`,r)}}function i(){n.calls=0,n.triangles=0,n.points=0,n.lines=0}return{memory:t,render:n,programs:null,autoReset:!0,reset:i,update:r}}function Ql(e,t,n){let r=new WeakMap,i=new mi;function a(a,o,s){let c=a.morphTargetInfluences,l=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=l===void 0?0:l.length,d=r.get(o);if(d===void 0||d.count!==u){d!==void 0&&d.texture.dispose();let e=o.morphAttributes.position!==void 0,n=o.morphAttributes.normal!==void 0,a=o.morphAttributes.color!==void 0,s=o.morphAttributes.position||[],c=o.morphAttributes.normal||[],l=o.morphAttributes.color||[],f=0;e===!0&&(f=1),n===!0&&(f=2),a===!0&&(f=3);let p=o.attributes.position.count*f,m=1;p>t.maxTextureSize&&(m=Math.ceil(p/t.maxTextureSize),p=t.maxTextureSize);let h=new Float32Array(p*m*4*u),g=new _i(h,p,m,u);g.type=Xt,g.needsUpdate=!0;let _=f*4;for(let t=0;t<u;t++){let r=s[t],o=c[t],u=l[t],d=p*m*4*t;for(let t=0;t<r.count;t++){let s=t*_;e===!0&&(i.fromBufferAttribute(r,t),h[d+s+0]=i.x,h[d+s+1]=i.y,h[d+s+2]=i.z,h[d+s+3]=0),n===!0&&(i.fromBufferAttribute(o,t),h[d+s+4]=i.x,h[d+s+5]=i.y,h[d+s+6]=i.z,h[d+s+7]=0),a===!0&&(i.fromBufferAttribute(u,t),h[d+s+8]=i.x,h[d+s+9]=i.y,h[d+s+10]=i.z,h[d+s+11]=u.itemSize===4?i.w:1)}}d={count:u,texture:g,size:new G(p,m)},r.set(o,d);function v(){g.dispose(),r.delete(o),o.removeEventListener(`dispose`,v)}o.addEventListener(`dispose`,v)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)s.getUniforms().setValue(e,`morphTexture`,a.morphTexture,n);else{let t=0;for(let e=0;e<c.length;e++)t+=c[e];let n=o.morphTargetsRelative?1:1-t;s.getUniforms().setValue(e,`morphTargetBaseInfluence`,n),s.getUniforms().setValue(e,`morphTargetInfluences`,c)}s.getUniforms().setValue(e,`morphTargetsTexture`,d.texture,n),s.getUniforms().setValue(e,`morphTargetsTextureSize`,d.size)}return{update:a}}function $l(e,t,n,r,i){let a=new WeakMap;function o(r){let o=i.render.frame,s=r.geometry,l=t.get(r,s);if(a.get(l)!==o&&(t.update(l),a.set(l,o)),r.isInstancedMesh&&(r.hasEventListener(`dispose`,c)===!1&&r.addEventListener(`dispose`,c),a.get(r)!==o&&(n.update(r.instanceMatrix,e.ARRAY_BUFFER),r.instanceColor!==null&&n.update(r.instanceColor,e.ARRAY_BUFFER),a.set(r,o))),r.isSkinnedMesh){let e=r.skeleton;a.get(e)!==o&&(e.update(),a.set(e,o))}return l}function s(){a=new WeakMap}function c(e){let t=e.target;t.removeEventListener(`dispose`,c),r.releaseStatesOfObject(t),n.remove(t.instanceMatrix),t.instanceColor!==null&&n.remove(t.instanceColor)}return{update:o,dispose:s}}var eu={1:`LINEAR_TONE_MAPPING`,2:`REINHARD_TONE_MAPPING`,3:`CINEON_TONE_MAPPING`,4:`ACES_FILMIC_TONE_MAPPING`,6:`AGX_TONE_MAPPING`,7:`NEUTRAL_TONE_MAPPING`,5:`CUSTOM_TONE_MAPPING`};function tu(e,t,n,r,i,a){let o=new gi(t,n,{type:e,depthBuffer:i,stencilBuffer:a,samples:r?4:0,depthTexture:i?new as(t,n):void 0}),s=new gi(t,n,{type:Zt,depthBuffer:!1,stencilBuffer:!1}),c=new Ja;c.setAttribute(`position`,new Ia([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute(`uv`,new Ia([0,2,0,0,2,0],2));let l=new rc({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),u=new X(c,l),d=new Uc(-1,1,1,-1,0,1),f=null,p=null,m=!1,h,g=null,_=[],v=!1;this.setSize=function(e,t){o.setSize(e,t),s.setSize(e,t);for(let n=0;n<_.length;n++){let r=_[n];r.setSize&&r.setSize(e,t)}},this.setEffects=function(e){_=e,v=_.length>0&&_[0].isRenderPass===!0;let t=o.width,n=o.height;for(let e=0;e<_.length;e++){let r=_[e];r.setSize&&r.setSize(t,n)}},this.begin=function(e,t){if(m||e.toneMapping===0&&_.length===0)return!1;if(g=t,t!==null){let e=t.width,n=t.height;(o.width!==e||o.height!==n)&&this.setSize(e,n)}return v===!1&&e.setRenderTarget(o),h=e.toneMapping,e.toneMapping=0,!0},this.hasRenderPass=function(){return v},this.end=function(e,t){e.toneMapping=h,m=!0;let n=o,r=s;for(let i=0;i<_.length;i++){let a=_[i];if(a.enabled!==!1&&(a.render(e,r,n,t),a.needsSwap!==!1)){let e=n;n=r,r=e}}if(f!==e.outputColorSpace||p!==e.toneMapping){f=e.outputColorSpace,p=e.toneMapping,l.defines={},ri.getTransfer(f)===`srgb`&&(l.defines.SRGB_TRANSFER=``);let t=eu[p];t&&(l.defines[t]=``),l.needsUpdate=!0}l.uniforms.tDiffuse.value=n.texture,e.setRenderTarget(g),e.render(u,d),g=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){o.depthTexture&&o.depthTexture.dispose(),o.dispose(),s.dispose(),c.dispose(),l.dispose()}}var nu=new pi,ru=new as(1,1),iu=new _i,au=new vi,ou=new rs,su=[],cu=[],lu=new Float32Array(16),uu=new Float32Array(9),du=new Float32Array(4);function fu(e,t,n){let r=e[0];if(r<=0||r>0)return e;let i=t*n,a=su[i];if(a===void 0&&(a=new Float32Array(i),su[i]=a),t!==0){r.toArray(a,0);for(let r=1,i=0;r!==t;++r)i+=n,e[r].toArray(a,i)}return a}function pu(e,t){if(e.length!==t.length)return!1;for(let n=0,r=e.length;n<r;n++)if(e[n]!==t[n])return!1;return!0}function mu(e,t){for(let n=0,r=t.length;n<r;n++)e[n]=t[n]}function hu(e,t){let n=cu[t];n===void 0&&(n=new Int32Array(t),cu[t]=n);for(let r=0;r!==t;++r)n[r]=e.allocateTextureUnit();return n}function gu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1f(this.addr,t),n[0]=t)}function _u(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2f(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(pu(n,t))return;e.uniform2fv(this.addr,t),mu(n,t)}}function vu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3f(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else if(t.r!==void 0)(n[0]!==t.r||n[1]!==t.g||n[2]!==t.b)&&(e.uniform3f(this.addr,t.r,t.g,t.b),n[0]=t.r,n[1]=t.g,n[2]=t.b);else{if(pu(n,t))return;e.uniform3fv(this.addr,t),mu(n,t)}}function yu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4f(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(pu(n,t))return;e.uniform4fv(this.addr,t),mu(n,t)}}function bu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(pu(n,t))return;e.uniformMatrix2fv(this.addr,!1,t),mu(n,t)}else{if(pu(n,r))return;du.set(r),e.uniformMatrix2fv(this.addr,!1,du),mu(n,r)}}function xu(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(pu(n,t))return;e.uniformMatrix3fv(this.addr,!1,t),mu(n,t)}else{if(pu(n,r))return;uu.set(r),e.uniformMatrix3fv(this.addr,!1,uu),mu(n,r)}}function Su(e,t){let n=this.cache,r=t.elements;if(r===void 0){if(pu(n,t))return;e.uniformMatrix4fv(this.addr,!1,t),mu(n,t)}else{if(pu(n,r))return;lu.set(r),e.uniformMatrix4fv(this.addr,!1,lu),mu(n,r)}}function Cu(e,t){let n=this.cache;n[0]!==t&&(e.uniform1i(this.addr,t),n[0]=t)}function wu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2i(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(pu(n,t))return;e.uniform2iv(this.addr,t),mu(n,t)}}function Tu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3i(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(pu(n,t))return;e.uniform3iv(this.addr,t),mu(n,t)}}function Eu(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4i(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(pu(n,t))return;e.uniform4iv(this.addr,t),mu(n,t)}}function Du(e,t){let n=this.cache;n[0]!==t&&(e.uniform1ui(this.addr,t),n[0]=t)}function Ou(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y)&&(e.uniform2ui(this.addr,t.x,t.y),n[0]=t.x,n[1]=t.y);else{if(pu(n,t))return;e.uniform2uiv(this.addr,t),mu(n,t)}}function ku(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z)&&(e.uniform3ui(this.addr,t.x,t.y,t.z),n[0]=t.x,n[1]=t.y,n[2]=t.z);else{if(pu(n,t))return;e.uniform3uiv(this.addr,t),mu(n,t)}}function Au(e,t){let n=this.cache;if(t.x!==void 0)(n[0]!==t.x||n[1]!==t.y||n[2]!==t.z||n[3]!==t.w)&&(e.uniform4ui(this.addr,t.x,t.y,t.z,t.w),n[0]=t.x,n[1]=t.y,n[2]=t.z,n[3]=t.w);else{if(pu(n,t))return;e.uniform4uiv(this.addr,t),mu(n,t)}}function ju(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i);let a;this.type===e.SAMPLER_2D_SHADOW?(ru.compareFunction=n.isReversedDepthBuffer()?518:515,a=ru):a=nu,n.setTexture2D(t||a,i)}function Mu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture3D(t||au,i)}function Nu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTextureCube(t||ou,i)}function Pu(e,t,n){let r=this.cache,i=n.allocateTextureUnit();r[0]!==i&&(e.uniform1i(this.addr,i),r[0]=i),n.setTexture2DArray(t||iu,i)}function Fu(e){switch(e){case 5126:return gu;case 35664:return _u;case 35665:return vu;case 35666:return yu;case 35674:return bu;case 35675:return xu;case 35676:return Su;case 5124:case 35670:return Cu;case 35667:case 35671:return wu;case 35668:case 35672:return Tu;case 35669:case 35673:return Eu;case 5125:return Du;case 36294:return Ou;case 36295:return ku;case 36296:return Au;case 35678:case 36198:case 36298:case 36306:case 35682:return ju;case 35679:case 36299:case 36307:return Mu;case 35680:case 36300:case 36308:case 36293:return Nu;case 36289:case 36303:case 36311:case 36292:return Pu}}function Iu(e,t){e.uniform1fv(this.addr,t)}function Lu(e,t){let n=fu(t,this.size,2);e.uniform2fv(this.addr,n)}function Ru(e,t){let n=fu(t,this.size,3);e.uniform3fv(this.addr,n)}function zu(e,t){let n=fu(t,this.size,4);e.uniform4fv(this.addr,n)}function Bu(e,t){let n=fu(t,this.size,4);e.uniformMatrix2fv(this.addr,!1,n)}function Vu(e,t){let n=fu(t,this.size,9);e.uniformMatrix3fv(this.addr,!1,n)}function Hu(e,t){let n=fu(t,this.size,16);e.uniformMatrix4fv(this.addr,!1,n)}function Uu(e,t){e.uniform1iv(this.addr,t)}function Wu(e,t){e.uniform2iv(this.addr,t)}function Gu(e,t){e.uniform3iv(this.addr,t)}function Ku(e,t){e.uniform4iv(this.addr,t)}function qu(e,t){e.uniform1uiv(this.addr,t)}function Ju(e,t){e.uniform2uiv(this.addr,t)}function Yu(e,t){e.uniform3uiv(this.addr,t)}function Xu(e,t){e.uniform4uiv(this.addr,t)}function Zu(e,t,n){let r=this.cache,i=t.length,a=hu(n,i);pu(r,a)||(e.uniform1iv(this.addr,a),mu(r,a));let o;o=this.type===e.SAMPLER_2D_SHADOW?ru:nu;for(let e=0;e!==i;++e)n.setTexture2D(t[e]||o,a[e])}function Qu(e,t,n){let r=this.cache,i=t.length,a=hu(n,i);pu(r,a)||(e.uniform1iv(this.addr,a),mu(r,a));for(let e=0;e!==i;++e)n.setTexture3D(t[e]||au,a[e])}function $u(e,t,n){let r=this.cache,i=t.length,a=hu(n,i);pu(r,a)||(e.uniform1iv(this.addr,a),mu(r,a));for(let e=0;e!==i;++e)n.setTextureCube(t[e]||ou,a[e])}function ed(e,t,n){let r=this.cache,i=t.length,a=hu(n,i);pu(r,a)||(e.uniform1iv(this.addr,a),mu(r,a));for(let e=0;e!==i;++e)n.setTexture2DArray(t[e]||iu,a[e])}function td(e){switch(e){case 5126:return Iu;case 35664:return Lu;case 35665:return Ru;case 35666:return zu;case 35674:return Bu;case 35675:return Vu;case 35676:return Hu;case 5124:case 35670:return Uu;case 35667:case 35671:return Wu;case 35668:case 35672:return Gu;case 35669:case 35673:return Ku;case 5125:return qu;case 36294:return Ju;case 36295:return Yu;case 36296:return Xu;case 35678:case 36198:case 36298:case 36306:case 35682:return Zu;case 35679:case 36299:case 36307:return Qu;case 35680:case 36300:case 36308:case 36293:return $u;case 36289:case 36303:case 36311:case 36292:return ed}}var nd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Fu(t.type)}},rd=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=td(t.type)}},id=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let r=this.seq;for(let i=0,a=r.length;i!==a;++i){let a=r[i];a.setValue(e,t[a.id],n)}}},ad=/(\w+)(\])?(\[|\.)?/g;function od(e,t){e.seq.push(t),e.map[t.id]=t}function sd(e,t,n){let r=e.name,i=r.length;for(ad.lastIndex=0;;){let a=ad.exec(r),o=ad.lastIndex,s=a[1],c=a[2]===`]`,l=a[3];if(c&&(s|=0),l===void 0||l===`[`&&o+2===i){od(n,l===void 0?new nd(s,e,t):new rd(s,e,t));break}{let e=n.map[s];e===void 0&&(e=new id(s),od(n,e)),n=e}}}var cd=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){let n=e.getActiveUniform(t,r);sd(n,e.getUniformLocation(t,n.name),this)}let r=[],i=[];for(let t of this.seq)t.type===e.SAMPLER_2D_SHADOW||t.type===e.SAMPLER_CUBE_SHADOW||t.type===e.SAMPLER_2D_ARRAY_SHADOW?r.push(t):i.push(t);r.length>0&&(this.seq=r.concat(i))}setValue(e,t,n,r){let i=this.map[t];i!==void 0&&i.setValue(e,n,r)}setOptional(e,t,n){let r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let i=0,a=t.length;i!==a;++i){let a=t[i],o=n[a.id];o.needsUpdate!==!1&&a.setValue(e,o.value,r)}}static seqWithValue(e,t){let n=[];for(let r=0,i=e.length;r!==i;++r){let i=e[r];i.id in t&&n.push(i)}return n}};function ld(e,t,n){let r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),r}var ud=37297,dd=0;function fd(e,t){let n=e.split(`
`),r=[],i=Math.max(t-6,0),a=Math.min(t+6,n.length);for(let e=i;e<a;e++){let i=e+1;r.push(`${i===t?`>`:` `} ${i}: ${n[e]}`)}return r.join(`
`)}var pd=new q;function md(e){ri._getMatrix(pd,ri.workingColorSpace,e);let t=`mat3( ${pd.elements.map(e=>e.toFixed(4))} )`;switch(ri.getTransfer(e)){case or:return[t,`LinearTransferOETF`];case sr:return[t,`sRGBTransferOETF`];default:return U(`WebGLProgram: Unsupported color space: `,e),[t,`LinearTransferOETF`]}}function hd(e,t,n){let r=e.getShaderParameter(t,e.COMPILE_STATUS),i=(e.getShaderInfoLog(t)||``).trim();if(r&&i===``)return``;let a=/ERROR: 0:(\d+)/.exec(i);if(a){let r=parseInt(a[1]);return n.toUpperCase()+`

`+i+`

`+fd(e.getShaderSource(t),r)}return i}function gd(e,t){let n=md(t);return[`vec4 ${e}( vec4 value ) {`,`	return ${n[1]}( vec4( value.rgb * ${n[0]}, value.a ) );`,`}`].join(`
`)}var _d={1:`Linear`,2:`Reinhard`,3:`Cineon`,4:`ACESFilmic`,6:`AgX`,7:`Neutral`,5:`Custom`};function vd(e,t){let n=_d[t];return n===void 0?(U(`WebGLProgram: Unsupported toneMapping:`,t),`vec3 `+e+`( vec3 color ) { return LinearToneMapping( color ); }`):`vec3 `+e+`( vec3 color ) { return `+n+`ToneMapping( color ); }`}var yd=new K;function bd(){return ri.getLuminanceCoefficients(yd),[`float luminance( const in vec3 rgb ) {`,`	const vec3 weights = vec3( ${yd.x.toFixed(4)}, ${yd.y.toFixed(4)}, ${yd.z.toFixed(4)} );`,`	return dot( weights, rgb );`,`}`].join(`
`)}function xd(e){return[e.extensionClipCullDistance?`#extension GL_ANGLE_clip_cull_distance : require`:``,e.extensionMultiDraw?`#extension GL_ANGLE_multi_draw : require`:``].filter(wd).join(`
`)}function Sd(e){let t=[];for(let n in e){let r=e[n];r!==!1&&t.push(`#define `+n+` `+r)}return t.join(`
`)}function Cd(e,t){let n={},r=e.getProgramParameter(t,e.ACTIVE_ATTRIBUTES);for(let i=0;i<r;i++){let r=e.getActiveAttrib(t,i),a=r.name,o=1;r.type===e.FLOAT_MAT2&&(o=2),r.type===e.FLOAT_MAT3&&(o=3),r.type===e.FLOAT_MAT4&&(o=4),n[a]={type:r.type,location:e.getAttribLocation(t,a),locationSize:o}}return n}function wd(e){return e!==``}function Td(e,t){let n=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return e.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,n).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ed(e,t){return e.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}var Dd=/^[ \t]*#include +<([\w\d./]+)>/gm;function Od(e){return e.replace(Dd,Ad)}var kd=new Map;function Ad(e,t){let n=gl[t];if(n===void 0){let e=kd.get(t);if(e!==void 0)n=gl[e],U(`WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.`,t,e);else throw Error(`THREE.WebGLProgram: Can not resolve #include <`+t+`>`)}return Od(n)}var jd=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Md(e){return e.replace(jd,Nd)}function Nd(e,t,n,r){let i=``;for(let e=parseInt(t);e<parseInt(n);e++)i+=r.replace(/\[\s*i\s*\]/g,`[ `+e+` ]`).replace(/UNROLLED_LOOP_INDEX/g,e);return i}function Pd(e){let t=`precision ${e.precision} float;
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
#define LOW_PRECISION`),t}var Fd={1:`SHADOWMAP_TYPE_PCF`,3:`SHADOWMAP_TYPE_VSM`};function Id(e){return Fd[e.shadowMapType]||`SHADOWMAP_TYPE_BASIC`}var Ld={301:`ENVMAP_TYPE_CUBE`,302:`ENVMAP_TYPE_CUBE`,306:`ENVMAP_TYPE_CUBE_UV`};function Rd(e){return e.envMap===!1?`ENVMAP_TYPE_CUBE`:Ld[e.envMapMode]||`ENVMAP_TYPE_CUBE`}var zd={302:`ENVMAP_MODE_REFRACTION`};function Bd(e){return e.envMap===!1?`ENVMAP_MODE_REFLECTION`:zd[e.envMapMode]||`ENVMAP_MODE_REFLECTION`}var Vd={0:`ENVMAP_BLENDING_MULTIPLY`,1:`ENVMAP_BLENDING_MIX`,2:`ENVMAP_BLENDING_ADD`};function Hd(e){return e.envMap===!1?`ENVMAP_BLENDING_NONE`:Vd[e.combine]||`ENVMAP_BLENDING_NONE`}function Ud(e){let t=e.envMapCubeUVHeight;if(t===null)return null;let n=Math.log2(t)-2,r=1/t;return{texelWidth:1/(3*Math.max(2**n,112)),texelHeight:r,maxMip:n}}function Wd(e,t,n,r){let i=e.getContext(),a=n.defines,o=n.vertexShader,s=n.fragmentShader,c=Id(n),l=Rd(n),u=Bd(n),d=Hd(n),f=Ud(n),p=xd(n),m=Sd(a),h=i.createProgram(),g,_,v=n.glslVersion?`#version `+n.glslVersion+`
`:``;n.isRawShaderMaterial?(g=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wd).join(`
`),g.length>0&&(g+=`
`),_=[`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m].filter(wd).join(`
`),_.length>0&&(_+=`
`)):(g=[Pd(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.extensionClipCullDistance?`#define USE_CLIP_DISTANCE`:``,n.batching?`#define USE_BATCHING`:``,n.batchingColor?`#define USE_BATCHING_COLOR`:``,n.instancing?`#define USE_INSTANCING`:``,n.instancingColor?`#define USE_INSTANCING_COLOR`:``,n.instancingMorph?`#define USE_INSTANCING_MORPH`:``,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.map?`#define USE_MAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+u:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.displacementMap?`#define USE_DISPLACEMENTMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.mapUv?`#define MAP_UV `+n.mapUv:``,n.alphaMapUv?`#define ALPHAMAP_UV `+n.alphaMapUv:``,n.lightMapUv?`#define LIGHTMAP_UV `+n.lightMapUv:``,n.aoMapUv?`#define AOMAP_UV `+n.aoMapUv:``,n.emissiveMapUv?`#define EMISSIVEMAP_UV `+n.emissiveMapUv:``,n.bumpMapUv?`#define BUMPMAP_UV `+n.bumpMapUv:``,n.normalMapUv?`#define NORMALMAP_UV `+n.normalMapUv:``,n.displacementMapUv?`#define DISPLACEMENTMAP_UV `+n.displacementMapUv:``,n.metalnessMapUv?`#define METALNESSMAP_UV `+n.metalnessMapUv:``,n.roughnessMapUv?`#define ROUGHNESSMAP_UV `+n.roughnessMapUv:``,n.anisotropyMapUv?`#define ANISOTROPYMAP_UV `+n.anisotropyMapUv:``,n.clearcoatMapUv?`#define CLEARCOATMAP_UV `+n.clearcoatMapUv:``,n.clearcoatNormalMapUv?`#define CLEARCOAT_NORMALMAP_UV `+n.clearcoatNormalMapUv:``,n.clearcoatRoughnessMapUv?`#define CLEARCOAT_ROUGHNESSMAP_UV `+n.clearcoatRoughnessMapUv:``,n.iridescenceMapUv?`#define IRIDESCENCEMAP_UV `+n.iridescenceMapUv:``,n.iridescenceThicknessMapUv?`#define IRIDESCENCE_THICKNESSMAP_UV `+n.iridescenceThicknessMapUv:``,n.sheenColorMapUv?`#define SHEEN_COLORMAP_UV `+n.sheenColorMapUv:``,n.sheenRoughnessMapUv?`#define SHEEN_ROUGHNESSMAP_UV `+n.sheenRoughnessMapUv:``,n.specularMapUv?`#define SPECULARMAP_UV `+n.specularMapUv:``,n.specularColorMapUv?`#define SPECULAR_COLORMAP_UV `+n.specularColorMapUv:``,n.specularIntensityMapUv?`#define SPECULAR_INTENSITYMAP_UV `+n.specularIntensityMapUv:``,n.transmissionMapUv?`#define TRANSMISSIONMAP_UV `+n.transmissionMapUv:``,n.thicknessMapUv?`#define THICKNESSMAP_UV `+n.thicknessMapUv:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexNormals?`#define HAS_NORMAL`:``,n.vertexColors?`#define USE_COLOR`:``,n.vertexAlphas?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.flatShading?`#define FLAT_SHADED`:``,n.skinning?`#define USE_SKINNING`:``,n.morphTargets?`#define USE_MORPHTARGETS`:``,n.morphNormals&&n.flatShading===!1?`#define USE_MORPHNORMALS`:``,n.morphColors?`#define USE_MORPHCOLORS`:``,n.morphTargetsCount>0?`#define MORPHTARGETS_TEXTURE_STRIDE `+n.morphTextureStride:``,n.morphTargetsCount>0?`#define MORPHTARGETS_COUNT `+n.morphTargetsCount:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.sizeAttenuation?`#define USE_SIZEATTENUATION`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 modelMatrix;`,`uniform mat4 modelViewMatrix;`,`uniform mat4 projectionMatrix;`,`uniform mat4 viewMatrix;`,`uniform mat3 normalMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,`#ifdef USE_INSTANCING`,`	attribute mat4 instanceMatrix;`,`#endif`,`#ifdef USE_INSTANCING_COLOR`,`	attribute vec3 instanceColor;`,`#endif`,`#ifdef USE_INSTANCING_MORPH`,`	uniform sampler2D morphTexture;`,`#endif`,`attribute vec3 position;`,`attribute vec3 normal;`,`attribute vec2 uv;`,`#ifdef USE_UV1`,`	attribute vec2 uv1;`,`#endif`,`#ifdef USE_UV2`,`	attribute vec2 uv2;`,`#endif`,`#ifdef USE_UV3`,`	attribute vec2 uv3;`,`#endif`,`#ifdef USE_TANGENT`,`	attribute vec4 tangent;`,`#endif`,`#if defined( USE_COLOR_ALPHA )`,`	attribute vec4 color;`,`#elif defined( USE_COLOR )`,`	attribute vec3 color;`,`#endif`,`#ifdef USE_SKINNING`,`	attribute vec4 skinIndex;`,`	attribute vec4 skinWeight;`,`#endif`,`
`].filter(wd).join(`
`),_=[Pd(n),`#define SHADER_TYPE `+n.shaderType,`#define SHADER_NAME `+n.shaderName,m,n.useFog&&n.fog?`#define USE_FOG`:``,n.useFog&&n.fogExp2?`#define FOG_EXP2`:``,n.alphaToCoverage?`#define ALPHA_TO_COVERAGE`:``,n.map?`#define USE_MAP`:``,n.matcap?`#define USE_MATCAP`:``,n.envMap?`#define USE_ENVMAP`:``,n.envMap?`#define `+l:``,n.envMap?`#define `+u:``,n.envMap?`#define `+d:``,f?`#define CUBEUV_TEXEL_WIDTH `+f.texelWidth:``,f?`#define CUBEUV_TEXEL_HEIGHT `+f.texelHeight:``,f?`#define CUBEUV_MAX_MIP `+f.maxMip+`.0`:``,n.lightMap?`#define USE_LIGHTMAP`:``,n.aoMap?`#define USE_AOMAP`:``,n.bumpMap?`#define USE_BUMPMAP`:``,n.normalMap?`#define USE_NORMALMAP`:``,n.normalMapObjectSpace?`#define USE_NORMALMAP_OBJECTSPACE`:``,n.normalMapTangentSpace?`#define USE_NORMALMAP_TANGENTSPACE`:``,n.packedNormalMap?`#define USE_PACKED_NORMALMAP`:``,n.emissiveMap?`#define USE_EMISSIVEMAP`:``,n.anisotropy?`#define USE_ANISOTROPY`:``,n.anisotropyMap?`#define USE_ANISOTROPYMAP`:``,n.clearcoat?`#define USE_CLEARCOAT`:``,n.clearcoatMap?`#define USE_CLEARCOATMAP`:``,n.clearcoatRoughnessMap?`#define USE_CLEARCOAT_ROUGHNESSMAP`:``,n.clearcoatNormalMap?`#define USE_CLEARCOAT_NORMALMAP`:``,n.dispersion?`#define USE_DISPERSION`:``,n.iridescence?`#define USE_IRIDESCENCE`:``,n.iridescenceMap?`#define USE_IRIDESCENCEMAP`:``,n.iridescenceThicknessMap?`#define USE_IRIDESCENCE_THICKNESSMAP`:``,n.specularMap?`#define USE_SPECULARMAP`:``,n.specularColorMap?`#define USE_SPECULAR_COLORMAP`:``,n.specularIntensityMap?`#define USE_SPECULAR_INTENSITYMAP`:``,n.roughnessMap?`#define USE_ROUGHNESSMAP`:``,n.metalnessMap?`#define USE_METALNESSMAP`:``,n.alphaMap?`#define USE_ALPHAMAP`:``,n.alphaTest?`#define USE_ALPHATEST`:``,n.alphaHash?`#define USE_ALPHAHASH`:``,n.sheen?`#define USE_SHEEN`:``,n.sheenColorMap?`#define USE_SHEEN_COLORMAP`:``,n.sheenRoughnessMap?`#define USE_SHEEN_ROUGHNESSMAP`:``,n.transmission?`#define USE_TRANSMISSION`:``,n.transmissionMap?`#define USE_TRANSMISSIONMAP`:``,n.thicknessMap?`#define USE_THICKNESSMAP`:``,n.vertexTangents&&n.flatShading===!1?`#define USE_TANGENT`:``,n.vertexColors||n.instancingColor?`#define USE_COLOR`:``,n.vertexAlphas||n.batchingColor?`#define USE_COLOR_ALPHA`:``,n.vertexUv1s?`#define USE_UV1`:``,n.vertexUv2s?`#define USE_UV2`:``,n.vertexUv3s?`#define USE_UV3`:``,n.pointsUvs?`#define USE_POINTS_UV`:``,n.gradientMap?`#define USE_GRADIENTMAP`:``,n.flatShading?`#define FLAT_SHADED`:``,n.doubleSided?`#define DOUBLE_SIDED`:``,n.flipSided?`#define FLIP_SIDED`:``,n.shadowMapEnabled?`#define USE_SHADOWMAP`:``,n.shadowMapEnabled?`#define `+c:``,n.premultipliedAlpha?`#define PREMULTIPLIED_ALPHA`:``,n.numLightProbes>0?`#define USE_LIGHT_PROBES`:``,n.numLightProbeGrids>0?`#define USE_LIGHT_PROBES_GRID`:``,n.decodeVideoTexture?`#define DECODE_VIDEO_TEXTURE`:``,n.decodeVideoTextureEmissive?`#define DECODE_VIDEO_TEXTURE_EMISSIVE`:``,n.logarithmicDepthBuffer?`#define USE_LOGARITHMIC_DEPTH_BUFFER`:``,n.reversedDepthBuffer?`#define USE_REVERSED_DEPTH_BUFFER`:``,`uniform mat4 viewMatrix;`,`uniform vec3 cameraPosition;`,`uniform bool isOrthographic;`,n.toneMapping===0?``:`#define TONE_MAPPING`,n.toneMapping===0?``:gl.tonemapping_pars_fragment,n.toneMapping===0?``:vd(`toneMapping`,n.toneMapping),n.dithering?`#define DITHERING`:``,n.opaque?`#define OPAQUE`:``,gl.colorspace_pars_fragment,gd(`linearToOutputTexel`,n.outputColorSpace),bd(),n.useDepthPacking?`#define DEPTH_PACKING `+n.depthPacking:``,`
`].filter(wd).join(`
`)),o=Od(o),o=Td(o,n),o=Ed(o,n),s=Od(s),s=Td(s,n),s=Ed(s,n),o=Md(o),s=Md(s),n.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,`#define attribute in`,`#define varying out`,`#define texture2D texture`].join(`
`)+`
`+g,_=[`#define varying in`,n.glslVersion===`300 es`?``:`layout(location = 0) out highp vec4 pc_fragColor;`,n.glslVersion===`300 es`?``:`#define gl_FragColor pc_fragColor`,`#define gl_FragDepthEXT gl_FragDepth`,`#define texture2D texture`,`#define textureCube texture`,`#define texture2DProj textureProj`,`#define texture2DLodEXT textureLod`,`#define texture2DProjLodEXT textureProjLod`,`#define textureCubeLodEXT textureLod`,`#define texture2DGradEXT textureGrad`,`#define texture2DProjGradEXT textureProjGrad`,`#define textureCubeGradEXT textureGrad`].join(`
`)+`
`+_);let y=v+g+o,b=v+_+s,x=ld(i,i.VERTEX_SHADER,y),S=ld(i,i.FRAGMENT_SHADER,b);i.attachShader(h,x),i.attachShader(h,S),n.index0AttributeName===void 0?n.hasPositionAttribute===!0&&i.bindAttribLocation(h,0,`position`):i.bindAttribLocation(h,0,n.index0AttributeName),i.linkProgram(h);function C(t){if(e.debug.checkShaderErrors){let n=i.getProgramInfoLog(h)||``,r=i.getShaderInfoLog(x)||``,a=i.getShaderInfoLog(S)||``,o=n.trim(),s=r.trim(),c=a.trim(),l=!0,u=!0;if(i.getProgramParameter(h,i.LINK_STATUS)===!1){if(l=!1,typeof e.debug.onShaderError==`function`)e.debug.onShaderError(i,h,x,S);else{let e=hd(i,x,`vertex`),n=hd(i,S,`fragment`);W(`WebGLProgram: Shader Error `+i.getError()+` - VALIDATE_STATUS `+i.getProgramParameter(h,i.VALIDATE_STATUS)+`

Material Name: `+t.name+`
Material Type: `+t.type+`

Program Info Log: `+o+`
`+e+`
`+n)}}else o===``?(s===``||c===``)&&(u=!1):U(`WebGLProgram: Program Info Log:`,o);u&&(t.diagnostics={runnable:l,programLog:o,vertexShader:{log:s,prefix:g},fragmentShader:{log:c,prefix:_}})}i.deleteShader(x),i.deleteShader(S),w=new cd(i,h),T=Cd(i,h)}let w;this.getUniforms=function(){return w===void 0&&C(this),w};let T;this.getAttributes=function(){return T===void 0&&C(this),T};let E=n.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return E===!1&&(E=i.getProgramParameter(h,ud)),E},this.destroy=function(){r.releaseStatesOfProgram(this),i.deleteProgram(h),this.program=void 0},this.type=n.shaderType,this.name=n.shaderName,this.id=dd++,this.cacheKey=t,this.usedTimes=1,this.program=h,this.vertexShader=x,this.fragmentShader=S,this}var Gd=0,Kd=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){let r=this._getShaderCacheForMaterial(e);return r.has(t)===!1&&(r.add(t),t.usedTimes++),r.has(n)===!1&&(r.add(n),n.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let e of t)e.usedTimes--,e.usedTimes===0&&this.shaderCache.delete(e.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new qd(e),t.set(e,n)),n}},qd=class{constructor(e){this.id=Gd++,this.code=e,this.usedTimes=0}};function Jd(e){return e===1030||e===37490||e===36285}function Yd(e,t,n,r,i,a){let o=new Ai,s=new Kd,c=new Set,l=[],u=new Map,d=r.logarithmicDepthBuffer,f=r.precision,p={MeshDepthMaterial:`depth`,MeshDistanceMaterial:`distance`,MeshNormalMaterial:`normal`,MeshBasicMaterial:`basic`,MeshLambertMaterial:`lambert`,MeshPhongMaterial:`phong`,MeshToonMaterial:`toon`,MeshStandardMaterial:`physical`,MeshPhysicalMaterial:`physical`,MeshMatcapMaterial:`matcap`,LineBasicMaterial:`basic`,LineDashedMaterial:`dashed`,PointsMaterial:`points`,ShadowMaterial:`shadow`,SpriteMaterial:`sprite`};function m(e){return c.add(e),e===0?`uv`:`uv${e}`}function h(i,o,l,u,h,g){let _=u.fog,v=h.geometry,y=i.isMeshStandardMaterial||i.isMeshLambertMaterial||i.isMeshPhongMaterial?u.environment:null,b=i.isMeshStandardMaterial||i.isMeshLambertMaterial&&!i.envMap||i.isMeshPhongMaterial&&!i.envMap,x=t.get(i.envMap||y,b),S=x&&x.mapping===306?x.image.height:null,C=p[i.type];i.precision!==null&&(f=r.getMaxPrecision(i.precision),f!==i.precision&&U(`WebGLProgram.getParameters:`,i.precision,`not supported, using`,f,`instead.`));let w=v.morphAttributes.position||v.morphAttributes.normal||v.morphAttributes.color,T=w===void 0?0:w.length,E=0;v.morphAttributes.position!==void 0&&(E=1),v.morphAttributes.normal!==void 0&&(E=2),v.morphAttributes.color!==void 0&&(E=3);let D,O,k,A;if(C){let e=_l[C];D=e.vertexShader,O=e.fragmentShader}else{D=i.vertexShader,O=i.fragmentShader;let e=s.getVertexShaderStage(i),t=s.getFragmentShaderStage(i);s.update(i,e,t),k=e.id,A=t.id}let j=e.getRenderTarget(),ee=e.state.buffers.depth.getReversed(),M=h.isInstancedMesh===!0,N=h.isBatchedMesh===!0,P=!!i.map,te=!!i.matcap,ne=!!x,re=!!i.aoMap,ie=!!i.lightMap,F=!!i.bumpMap&&i.wireframe===!1,I=!!i.normalMap,L=!!i.displacementMap,ae=!!i.emissiveMap,oe=!!i.metalnessMap,se=!!i.roughnessMap,ce=i.anisotropy>0,R=i.clearcoat>0,le=i.dispersion>0,ue=i.iridescence>0,de=i.sheen>0,fe=i.transmission>0,pe=ce&&!!i.anisotropyMap,me=R&&!!i.clearcoatMap,he=R&&!!i.clearcoatNormalMap,ge=R&&!!i.clearcoatRoughnessMap,z=ue&&!!i.iridescenceMap,_e=ue&&!!i.iridescenceThicknessMap,B=de&&!!i.sheenColorMap,ve=de&&!!i.sheenRoughnessMap,ye=!!i.specularMap,be=!!i.specularColorMap,V=!!i.specularIntensityMap,xe=fe&&!!i.transmissionMap,H=fe&&!!i.thicknessMap,Se=!!i.gradientMap,Ce=!!i.alphaMap,we=i.alphaTest>0,Te=!!i.alphaHash,Ee=!!i.extensions,De=0;i.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(De=e.toneMapping);let Oe={shaderID:C,shaderType:i.type,shaderName:i.name,vertexShader:D,fragmentShader:O,defines:i.defines,customVertexShaderID:k,customFragmentShaderID:A,isRawShaderMaterial:i.isRawShaderMaterial===!0,glslVersion:i.glslVersion,precision:f,batching:N,batchingColor:N&&h._colorsTexture!==null,instancing:M,instancingColor:M&&h.instanceColor!==null,instancingMorph:M&&h.morphTexture!==null,outputColorSpace:j===null?e.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:ri.workingColorSpace,alphaToCoverage:!!i.alphaToCoverage,map:P,matcap:te,envMap:ne,envMapMode:ne&&x.mapping,envMapCubeUVHeight:S,aoMap:re,lightMap:ie,bumpMap:F,normalMap:I,displacementMap:L,emissiveMap:ae,normalMapObjectSpace:I&&i.normalMapType===1,normalMapTangentSpace:I&&i.normalMapType===0,packedNormalMap:I&&i.normalMapType===0&&Jd(i.normalMap.format),metalnessMap:oe,roughnessMap:se,anisotropy:ce,anisotropyMap:pe,clearcoat:R,clearcoatMap:me,clearcoatNormalMap:he,clearcoatRoughnessMap:ge,dispersion:le,iridescence:ue,iridescenceMap:z,iridescenceThicknessMap:_e,sheen:de,sheenColorMap:B,sheenRoughnessMap:ve,specularMap:ye,specularColorMap:be,specularIntensityMap:V,transmission:fe,transmissionMap:xe,thicknessMap:H,gradientMap:Se,opaque:i.transparent===!1&&i.blending===1&&i.alphaToCoverage===!1,alphaMap:Ce,alphaTest:we,alphaHash:Te,combine:i.combine,mapUv:P&&m(i.map.channel),aoMapUv:re&&m(i.aoMap.channel),lightMapUv:ie&&m(i.lightMap.channel),bumpMapUv:F&&m(i.bumpMap.channel),normalMapUv:I&&m(i.normalMap.channel),displacementMapUv:L&&m(i.displacementMap.channel),emissiveMapUv:ae&&m(i.emissiveMap.channel),metalnessMapUv:oe&&m(i.metalnessMap.channel),roughnessMapUv:se&&m(i.roughnessMap.channel),anisotropyMapUv:pe&&m(i.anisotropyMap.channel),clearcoatMapUv:me&&m(i.clearcoatMap.channel),clearcoatNormalMapUv:he&&m(i.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ge&&m(i.clearcoatRoughnessMap.channel),iridescenceMapUv:z&&m(i.iridescenceMap.channel),iridescenceThicknessMapUv:_e&&m(i.iridescenceThicknessMap.channel),sheenColorMapUv:B&&m(i.sheenColorMap.channel),sheenRoughnessMapUv:ve&&m(i.sheenRoughnessMap.channel),specularMapUv:ye&&m(i.specularMap.channel),specularColorMapUv:be&&m(i.specularColorMap.channel),specularIntensityMapUv:V&&m(i.specularIntensityMap.channel),transmissionMapUv:xe&&m(i.transmissionMap.channel),thicknessMapUv:H&&m(i.thicknessMap.channel),alphaMapUv:Ce&&m(i.alphaMap.channel),vertexTangents:!!v.attributes.tangent&&(I||ce),vertexNormals:!!v.attributes.normal,vertexColors:i.vertexColors,vertexAlphas:i.vertexColors===!0&&!!v.attributes.color&&v.attributes.color.itemSize===4,pointsUvs:h.isPoints===!0&&!!v.attributes.uv&&(P||Ce),fog:!!_,useFog:i.fog===!0,fogExp2:!!_&&_.isFogExp2,flatShading:i.wireframe===!1&&(i.flatShading===!0||v.attributes.normal===void 0&&I===!1&&(i.isMeshLambertMaterial||i.isMeshPhongMaterial||i.isMeshStandardMaterial||i.isMeshPhysicalMaterial)),sizeAttenuation:i.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ee,skinning:h.isSkinnedMesh===!0,hasPositionAttribute:v.attributes.position!==void 0,morphTargets:v.morphAttributes.position!==void 0,morphNormals:v.morphAttributes.normal!==void 0,morphColors:v.morphAttributes.color!==void 0,morphTargetsCount:T,morphTextureStride:E,numDirLights:o.directional.length,numPointLights:o.point.length,numSpotLights:o.spot.length,numSpotLightMaps:o.spotLightMap.length,numRectAreaLights:o.rectArea.length,numHemiLights:o.hemi.length,numDirLightShadows:o.directionalShadowMap.length,numPointLightShadows:o.pointShadowMap.length,numSpotLightShadows:o.spotShadowMap.length,numSpotLightShadowsWithMaps:o.numSpotLightShadowsWithMaps,numLightProbes:o.numLightProbes,numLightProbeGrids:g.length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:i.dithering,shadowMapEnabled:e.shadowMap.enabled&&l.length>0,shadowMapType:e.shadowMap.type,toneMapping:De,decodeVideoTexture:P&&i.map.isVideoTexture===!0&&ri.getTransfer(i.map.colorSpace)===`srgb`,decodeVideoTextureEmissive:ae&&i.emissiveMap.isVideoTexture===!0&&ri.getTransfer(i.emissiveMap.colorSpace)===`srgb`,premultipliedAlpha:i.premultipliedAlpha,doubleSided:i.side===2,flipSided:i.side===1,useDepthPacking:i.depthPacking>=0,depthPacking:i.depthPacking||0,index0AttributeName:i.index0AttributeName,extensionClipCullDistance:Ee&&i.extensions.clipCullDistance===!0&&n.has(`WEBGL_clip_cull_distance`),extensionMultiDraw:(Ee&&i.extensions.multiDraw===!0||N)&&n.has(`WEBGL_multi_draw`),rendererExtensionParallelShaderCompile:n.has(`KHR_parallel_shader_compile`),customProgramCacheKey:i.customProgramCacheKey()};return Oe.vertexUv1s=c.has(1),Oe.vertexUv2s=c.has(2),Oe.vertexUv3s=c.has(3),c.clear(),Oe}function g(t){let n=[];if(t.shaderID?n.push(t.shaderID):(n.push(t.customVertexShaderID),n.push(t.customFragmentShaderID)),t.defines!==void 0)for(let e in t.defines)n.push(e),n.push(t.defines[e]);return t.isRawShaderMaterial===!1&&(_(n,t),v(n,t),n.push(e.outputColorSpace)),n.push(t.customProgramCacheKey),n.join()}function _(e,t){e.push(t.precision),e.push(t.outputColorSpace),e.push(t.envMapMode),e.push(t.envMapCubeUVHeight),e.push(t.mapUv),e.push(t.alphaMapUv),e.push(t.lightMapUv),e.push(t.aoMapUv),e.push(t.bumpMapUv),e.push(t.normalMapUv),e.push(t.displacementMapUv),e.push(t.emissiveMapUv),e.push(t.metalnessMapUv),e.push(t.roughnessMapUv),e.push(t.anisotropyMapUv),e.push(t.clearcoatMapUv),e.push(t.clearcoatNormalMapUv),e.push(t.clearcoatRoughnessMapUv),e.push(t.iridescenceMapUv),e.push(t.iridescenceThicknessMapUv),e.push(t.sheenColorMapUv),e.push(t.sheenRoughnessMapUv),e.push(t.specularMapUv),e.push(t.specularColorMapUv),e.push(t.specularIntensityMapUv),e.push(t.transmissionMapUv),e.push(t.thicknessMapUv),e.push(t.combine),e.push(t.fogExp2),e.push(t.sizeAttenuation),e.push(t.morphTargetsCount),e.push(t.morphAttributeCount),e.push(t.numDirLights),e.push(t.numPointLights),e.push(t.numSpotLights),e.push(t.numSpotLightMaps),e.push(t.numHemiLights),e.push(t.numRectAreaLights),e.push(t.numDirLightShadows),e.push(t.numPointLightShadows),e.push(t.numSpotLightShadows),e.push(t.numSpotLightShadowsWithMaps),e.push(t.numLightProbes),e.push(t.shadowMapType),e.push(t.toneMapping),e.push(t.numClippingPlanes),e.push(t.numClipIntersection),e.push(t.depthPacking)}function v(e,t){o.disableAll(),t.instancing&&o.enable(0),t.instancingColor&&o.enable(1),t.instancingMorph&&o.enable(2),t.matcap&&o.enable(3),t.envMap&&o.enable(4),t.normalMapObjectSpace&&o.enable(5),t.normalMapTangentSpace&&o.enable(6),t.clearcoat&&o.enable(7),t.iridescence&&o.enable(8),t.alphaTest&&o.enable(9),t.vertexColors&&o.enable(10),t.vertexAlphas&&o.enable(11),t.vertexUv1s&&o.enable(12),t.vertexUv2s&&o.enable(13),t.vertexUv3s&&o.enable(14),t.vertexTangents&&o.enable(15),t.anisotropy&&o.enable(16),t.alphaHash&&o.enable(17),t.batching&&o.enable(18),t.dispersion&&o.enable(19),t.batchingColor&&o.enable(20),t.gradientMap&&o.enable(21),t.packedNormalMap&&o.enable(22),t.vertexNormals&&o.enable(23),e.push(o.mask),o.disableAll(),t.fog&&o.enable(0),t.useFog&&o.enable(1),t.flatShading&&o.enable(2),t.logarithmicDepthBuffer&&o.enable(3),t.reversedDepthBuffer&&o.enable(4),t.skinning&&o.enable(5),t.morphTargets&&o.enable(6),t.morphNormals&&o.enable(7),t.morphColors&&o.enable(8),t.premultipliedAlpha&&o.enable(9),t.shadowMapEnabled&&o.enable(10),t.doubleSided&&o.enable(11),t.flipSided&&o.enable(12),t.useDepthPacking&&o.enable(13),t.dithering&&o.enable(14),t.transmission&&o.enable(15),t.sheen&&o.enable(16),t.opaque&&o.enable(17),t.pointsUvs&&o.enable(18),t.decodeVideoTexture&&o.enable(19),t.decodeVideoTextureEmissive&&o.enable(20),t.alphaToCoverage&&o.enable(21),t.numLightProbeGrids>0&&o.enable(22),t.hasPositionAttribute&&o.enable(23),e.push(o.mask)}function y(e){let t=p[e.type],n;if(t){let e=_l[t];n=$s.clone(e.uniforms)}else n=e.uniforms;return n}function b(t,n){let r=u.get(n);return r===void 0?(r=new Wd(e,n,t,i),l.push(r),u.set(n,r)):++r.usedTimes,r}function x(e){if(--e.usedTimes===0){let t=l.indexOf(e);l[t]=l[l.length-1],l.pop(),u.delete(e.cacheKey),e.destroy()}}function S(e){s.remove(e)}function C(){s.dispose()}return{getParameters:h,getProgramCacheKey:g,getUniforms:y,acquireProgram:b,releaseProgram:x,releaseShaderCache:S,programs:l,dispose:C}}function Xd(){let e=new WeakMap;function t(t){return e.has(t)}function n(t){let n=e.get(t);return n===void 0&&(n={},e.set(t,n)),n}function r(t){e.delete(t)}function i(t,n,r){e.get(t)[n]=r}function a(){e=new WeakMap}return{has:t,get:n,remove:r,update:i,dispose:a}}function Zd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.material.id===t.material.id?e.materialVariant===t.materialVariant?e.z===t.z?e.id-t.id:e.z-t.z:e.materialVariant-t.materialVariant:e.material.id-t.material.id:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function Qd(e,t){return e.groupOrder===t.groupOrder?e.renderOrder===t.renderOrder?e.z===t.z?e.id-t.id:t.z-e.z:e.renderOrder-t.renderOrder:e.groupOrder-t.groupOrder}function $d(){let e=[],t=0,n=[],r=[],i=[];function a(){t=0,n.length=0,r.length=0,i.length=0}function o(e){let t=0;return e.isInstancedMesh&&(t+=2),e.isSkinnedMesh&&(t+=1),t}function s(n,r,i,a,s,c){let l=e[t];return l===void 0?(l={id:n.id,object:n,geometry:r,material:i,materialVariant:o(n),groupOrder:a,renderOrder:n.renderOrder,z:s,group:c},e[t]=l):(l.id=n.id,l.object=n,l.geometry=r,l.material=i,l.materialVariant=o(n),l.groupOrder=a,l.renderOrder=n.renderOrder,l.z=s,l.group=c),t++,l}function c(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.push(u):a.transparent===!0?i.push(u):n.push(u)}function l(e,t,a,o,c,l){let u=s(e,t,a,o,c,l);a.transmission>0?r.unshift(u):a.transparent===!0?i.unshift(u):n.unshift(u)}function u(e,t,a){n.length>1&&n.sort(e||Zd),r.length>1&&r.sort(t||Qd),i.length>1&&i.sort(t||Qd),a&&(n.reverse(),r.reverse(),i.reverse())}function d(){for(let n=t,r=e.length;n<r;n++){let t=e[n];if(t.id===null)break;t.id=null,t.object=null,t.geometry=null,t.material=null,t.group=null}}return{opaque:n,transmissive:r,transparent:i,init:a,push:c,unshift:l,finish:d,sort:u}}function ef(){let e=new WeakMap;function t(t,n){let r=e.get(t),i;return r===void 0?(i=new $d,e.set(t,[i])):n>=r.length?(i=new $d,r.push(i)):i=r[n],i}function n(){e=new WeakMap}return{get:t,dispose:n}}function tf(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={direction:new K,color:new Y};break;case`SpotLight`:n={position:new K,direction:new K,color:new Y,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case`PointLight`:n={position:new K,color:new Y,distance:0,decay:0};break;case`HemisphereLight`:n={direction:new K,skyColor:new Y,groundColor:new Y};break;case`RectAreaLight`:n={color:new Y,position:new K,halfWidth:new K,halfHeight:new K}}return e[t.id]=n,n}}}function nf(){let e={};return{get:function(t){if(e[t.id]!==void 0)return e[t.id];let n;switch(t.type){case`DirectionalLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`SpotLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G};break;case`PointLight`:n={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new G,shadowCameraNear:1,shadowCameraFar:1e3}}return e[t.id]=n,n}}}var rf=0;function af(e,t){return(t.castShadow?2:0)-(e.castShadow?2:0)+ +!!t.map-!!e.map}function of(e){let t=new tf,n=nf(),r={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let e=0;e<9;e++)r.probe.push(new K);let i=new K,a=new yi,o=new yi;function s(i){let a=0,o=0,s=0;for(let e=0;e<9;e++)r.probe[e].set(0,0,0);let c=0,l=0,u=0,d=0,f=0,p=0,m=0,h=0,g=0,_=0,v=0;i.sort(af);for(let e=0,y=i.length;e<y;e++){let y=i[e],b=y.color,x=y.intensity,S=y.distance,C=null;if(y.shadow&&y.shadow.map&&(C=y.shadow.map.texture.format===1030?y.shadow.map.texture:y.shadow.map.depthTexture||y.shadow.map.texture),y.isAmbientLight)a+=b.r*x,o+=b.g*x,s+=b.b*x;else if(y.isLightProbe){for(let e=0;e<9;e++)r.probe[e].addScaledVector(y.sh.coefficients[e],x);v++}else if(y.isDirectionalLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,r.directionalShadow[c]=t,r.directionalShadowMap[c]=C,r.directionalShadowMatrix[c]=y.shadow.matrix,p++}r.directional[c]=e,c++}else if(y.isSpotLight){let e=t.get(y);e.position.setFromMatrixPosition(y.matrixWorld),e.color.copy(b).multiplyScalar(x),e.distance=S,e.coneCos=Math.cos(y.angle),e.penumbraCos=Math.cos(y.angle*(1-y.penumbra)),e.decay=y.decay,r.spot[u]=e;let i=y.shadow;if(y.map&&(r.spotLightMap[g]=y.map,g++,i.updateMatrices(y),y.castShadow&&_++),r.spotLightMatrix[u]=i.matrix,y.castShadow){let e=n.get(y);e.shadowIntensity=i.intensity,e.shadowBias=i.bias,e.shadowNormalBias=i.normalBias,e.shadowRadius=i.radius,e.shadowMapSize=i.mapSize,r.spotShadow[u]=e,r.spotShadowMap[u]=C,h++}u++}else if(y.isRectAreaLight){let e=t.get(y);e.color.copy(b).multiplyScalar(x),e.halfWidth.set(y.width*.5,0,0),e.halfHeight.set(0,y.height*.5,0),r.rectArea[d]=e,d++}else if(y.isPointLight){let e=t.get(y);if(e.color.copy(y.color).multiplyScalar(y.intensity),e.distance=y.distance,e.decay=y.decay,y.castShadow){let e=y.shadow,t=n.get(y);t.shadowIntensity=e.intensity,t.shadowBias=e.bias,t.shadowNormalBias=e.normalBias,t.shadowRadius=e.radius,t.shadowMapSize=e.mapSize,t.shadowCameraNear=e.camera.near,t.shadowCameraFar=e.camera.far,r.pointShadow[l]=t,r.pointShadowMap[l]=C,r.pointShadowMatrix[l]=y.shadow.matrix,m++}r.point[l]=e,l++}else if(y.isHemisphereLight){let e=t.get(y);e.skyColor.copy(y.color).multiplyScalar(x),e.groundColor.copy(y.groundColor).multiplyScalar(x),r.hemi[f]=e,f++}}d>0&&(e.has(`OES_texture_float_linear`)===!0?(r.rectAreaLTC1=Z.LTC_FLOAT_1,r.rectAreaLTC2=Z.LTC_FLOAT_2):(r.rectAreaLTC1=Z.LTC_HALF_1,r.rectAreaLTC2=Z.LTC_HALF_2)),r.ambient[0]=a,r.ambient[1]=o,r.ambient[2]=s;let y=r.hash;(y.directionalLength!==c||y.pointLength!==l||y.spotLength!==u||y.rectAreaLength!==d||y.hemiLength!==f||y.numDirectionalShadows!==p||y.numPointShadows!==m||y.numSpotShadows!==h||y.numSpotMaps!==g||y.numLightProbes!==v)&&(r.directional.length=c,r.spot.length=u,r.rectArea.length=d,r.point.length=l,r.hemi.length=f,r.directionalShadow.length=p,r.directionalShadowMap.length=p,r.pointShadow.length=m,r.pointShadowMap.length=m,r.spotShadow.length=h,r.spotShadowMap.length=h,r.directionalShadowMatrix.length=p,r.pointShadowMatrix.length=m,r.spotLightMatrix.length=h+g-_,r.spotLightMap.length=g,r.numSpotLightShadowsWithMaps=_,r.numLightProbes=v,y.directionalLength=c,y.pointLength=l,y.spotLength=u,y.rectAreaLength=d,y.hemiLength=f,y.numDirectionalShadows=p,y.numPointShadows=m,y.numSpotShadows=h,y.numSpotMaps=g,y.numLightProbes=v,r.version=rf++)}function c(e,t){let n=0,s=0,c=0,l=0,u=0,d=t.matrixWorldInverse;for(let t=0,f=e.length;t<f;t++){let f=e[t];if(f.isDirectionalLight){let e=r.directional[n];e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),n++}else if(f.isSpotLight){let e=r.spot[c];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),e.direction.setFromMatrixPosition(f.matrixWorld),i.setFromMatrixPosition(f.target.matrixWorld),e.direction.sub(i),e.direction.transformDirection(d),c++}else if(f.isRectAreaLight){let e=r.rectArea[l];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),o.identity(),a.copy(f.matrixWorld),a.premultiply(d),o.extractRotation(a),e.halfWidth.set(f.width*.5,0,0),e.halfHeight.set(0,f.height*.5,0),e.halfWidth.applyMatrix4(o),e.halfHeight.applyMatrix4(o),l++}else if(f.isPointLight){let e=r.point[s];e.position.setFromMatrixPosition(f.matrixWorld),e.position.applyMatrix4(d),s++}else if(f.isHemisphereLight){let e=r.hemi[u];e.direction.setFromMatrixPosition(f.matrixWorld),e.direction.transformDirection(d),u++}}}return{setup:s,setupView:c,state:r}}function sf(e){let t=new of(e),n=[],r=[],i=[];function a(e){d.camera=e,n.length=0,r.length=0,i.length=0}function o(e){n.push(e)}function s(e){r.push(e)}function c(e){i.push(e)}function l(){t.setup(n)}function u(e){t.setupView(n,e)}let d={lightsArray:n,shadowsArray:r,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:u,pushLight:o,pushShadow:s,pushLightProbeGrid:c}}function cf(e){let t=new WeakMap;function n(n,r=0){let i=t.get(n),a;return i===void 0?(a=new sf(e),t.set(n,[a])):r>=i.length?(a=new sf(e),i.push(a)):a=i[r],a}function r(){t=new WeakMap}return{get:n,dispose:r}}var lf=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,uf=`uniform sampler2D shadow_pass;
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
}`,df=[new K(1,0,0),new K(-1,0,0),new K(0,1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1)],ff=[new K(0,-1,0),new K(0,-1,0),new K(0,0,1),new K(0,0,-1),new K(0,-1,0),new K(0,-1,0)],pf=new yi,mf=new K,hf=new K;function gf(e,t,n){let r=new ns,i=new G,a=new G,o=new mi,s=new oc,c=new sc,l={},u=n.maxTextureSize,d={0:1,1:0,2:2},f=new nc({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new G},radius:{value:4}},vertexShader:lf,fragmentShader:uf}),p=f.clone();p.defines.HORIZONTAL_PASS=1;let m=new Ja;m.setAttribute(`position`,new Na(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let h=new X(m,f),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let _=this.type;this.render=function(t,n,s){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||t.length===0)return;this.type===2&&(U(`WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead.`),this.type=1);let c=e.getRenderTarget(),l=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),f=e.state;f.setBlending(0),f.buffers.depth.getReversed()===!0?f.buffers.color.setClear(0,0,0,0):f.buffers.color.setClear(1,1,1,1),f.buffers.depth.setTest(!0),f.setScissorTest(!1);let p=_!==this.type;p&&n.traverse(function(e){e.material&&(Array.isArray(e.material)?e.material.forEach(e=>e.needsUpdate=!0):e.material.needsUpdate=!0)});for(let c=0,l=t.length;c<l;c++){let l=t[c],d=l.shadow;if(d===void 0){U(`WebGLShadowMap:`,l,`has no shadow.`);continue}if(d.autoUpdate===!1&&d.needsUpdate===!1)continue;i.copy(d.mapSize);let m=d.getFrameExtents();i.multiply(m),a.copy(d.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(a.x=Math.floor(u/m.x),i.x=a.x*m.x,d.mapSize.x=a.x),i.y>u&&(a.y=Math.floor(u/m.y),i.y=a.y*m.y,d.mapSize.y=a.y));let h=e.state.buffers.depth.getReversed();if(d.camera._reversedDepth=h,d.map===null||p===!0){if(d.map!==null&&(d.map.depthTexture!==null&&(d.map.depthTexture.dispose(),d.map.depthTexture=null),d.map.dispose()),this.type===3){if(l.isPointLight){U(`WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.`);continue}d.map=new gi(i.x,i.y,{format:dn,type:Zt,minFilter:Vt,magFilter:Vt,generateMipmaps:!1}),d.map.texture.name=l.name+`.shadowMap`,d.map.depthTexture=new as(i.x,i.y,Xt),d.map.depthTexture.name=l.name+`.shadowMapDepth`,d.map.depthTexture.format=sn,d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Rt,d.map.depthTexture.magFilter=Rt}else l.isPointLight?(d.map=new Kl(i.x),d.map.depthTexture=new os(i.x,Yt)):(d.map=new gi(i.x,i.y),d.map.depthTexture=new as(i.x,i.y,Yt)),d.map.depthTexture.name=l.name+`.shadowMap`,d.map.depthTexture.format=sn,this.type===1?(d.map.depthTexture.compareFunction=h?518:515,d.map.depthTexture.minFilter=Vt,d.map.depthTexture.magFilter=Vt):(d.map.depthTexture.compareFunction=null,d.map.depthTexture.minFilter=Rt,d.map.depthTexture.magFilter=Rt);d.camera.updateProjectionMatrix()}let g=d.map.isWebGLCubeRenderTarget?6:1;for(let t=0;t<g;t++){if(d.map.isWebGLCubeRenderTarget)e.setRenderTarget(d.map,t),e.clear();else{t===0&&(e.setRenderTarget(d.map),e.clear());let n=d.getViewport(t);o.set(a.x*n.x,a.y*n.y,a.x*n.z,a.y*n.w),f.viewport(o)}if(l.isPointLight){let e=d.camera,n=d.matrix,r=l.distance||e.far;r!==e.far&&(e.far=r,e.updateProjectionMatrix()),mf.setFromMatrixPosition(l.matrixWorld),e.position.copy(mf),hf.copy(e.position),hf.add(df[t]),e.up.copy(ff[t]),e.lookAt(hf),e.updateMatrixWorld(),n.makeTranslation(-mf.x,-mf.y,-mf.z),pf.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),d._frustum.setFromProjectionMatrix(pf,e.coordinateSystem,e.reversedDepth)}else d.updateMatrices(l);r=d.getFrustum(),b(n,s,d.camera,l,this.type)}d.isPointLightShadow!==!0&&this.type===3&&v(d,s),d.needsUpdate=!1}_=this.type,g.needsUpdate=!1,e.setRenderTarget(c,l,d)};function v(n,r){let a=t.update(h);f.defines.VSM_SAMPLES!==n.blurSamples&&(f.defines.VSM_SAMPLES=n.blurSamples,p.defines.VSM_SAMPLES=n.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),n.mapPass===null&&(n.mapPass=new gi(i.x,i.y,{format:dn,type:Zt})),f.uniforms.shadow_pass.value=n.map.depthTexture,f.uniforms.resolution.value=n.mapSize,f.uniforms.radius.value=n.radius,e.setRenderTarget(n.mapPass),e.clear(),e.renderBufferDirect(r,null,a,f,h,null),p.uniforms.shadow_pass.value=n.mapPass.texture,p.uniforms.resolution.value=n.mapSize,p.uniforms.radius.value=n.radius,e.setRenderTarget(n.map),e.clear(),e.renderBufferDirect(r,null,a,p,h,null)}function y(t,n,r,i){let a=null,o=r.isPointLight===!0?t.customDistanceMaterial:t.customDepthMaterial;if(o!==void 0)a=o;else if(a=r.isPointLight===!0?c:s,e.localClippingEnabled&&n.clipShadows===!0&&Array.isArray(n.clippingPlanes)&&n.clippingPlanes.length!==0||n.displacementMap&&n.displacementScale!==0||n.alphaMap&&n.alphaTest>0||n.map&&n.alphaTest>0||n.alphaToCoverage===!0){let e=a.uuid,t=n.uuid,r=l[e];r===void 0&&(r={},l[e]=r);let i=r[t];i===void 0&&(i=a.clone(),r[t]=i,n.addEventListener(`dispose`,x)),a=i}if(a.visible=n.visible,a.wireframe=n.wireframe,i===3?a.side=n.shadowSide===null?n.side:n.shadowSide:a.side=n.shadowSide===null?d[n.side]:n.shadowSide,a.alphaMap=n.alphaMap,a.alphaTest=n.alphaToCoverage===!0?.5:n.alphaTest,a.map=n.map,a.clipShadows=n.clipShadows,a.clippingPlanes=n.clippingPlanes,a.clipIntersection=n.clipIntersection,a.displacementMap=n.displacementMap,a.displacementScale=n.displacementScale,a.displacementBias=n.displacementBias,a.wireframeLinewidth=n.wireframeLinewidth,a.linewidth=n.linewidth,r.isPointLight===!0&&a.isMeshDistanceMaterial===!0){let t=e.properties.get(a);t.light=r}return a}function b(n,i,a,o,s){if(n.visible===!1)return;if(n.layers.test(i.layers)&&(n.isMesh||n.isLine||n.isPoints)&&(n.castShadow||n.receiveShadow&&s===3)&&(!n.frustumCulled||r.intersectsObject(n))){n.modelViewMatrix.multiplyMatrices(a.matrixWorldInverse,n.matrixWorld);let r=t.update(n),c=n.material;if(Array.isArray(c)){let t=r.groups;for(let l=0,u=t.length;l<u;l++){let u=t[l],d=c[u.materialIndex];if(d&&d.visible){let t=y(n,d,o,s);n.onBeforeShadow(e,n,i,a,r,t,u),e.renderBufferDirect(a,null,r,t,n,u),n.onAfterShadow(e,n,i,a,r,t,u)}}}else if(c.visible){let t=y(n,c,o,s);n.onBeforeShadow(e,n,i,a,r,t,null),e.renderBufferDirect(a,null,r,t,n,null),n.onAfterShadow(e,n,i,a,r,t,null)}}let c=n.children;for(let e=0,t=c.length;e<t;e++)b(c[e],i,a,o,s)}function x(e){e.target.removeEventListener(`dispose`,x);for(let t in l){let n=l[t],r=e.target.uuid;r in n&&(n[r].dispose(),delete n[r])}}}function _f(e,t){function n(){let t=!1,n=new mi,r=null,i=new mi(0,0,0,0);return{setMask:function(n){r!==n&&!t&&(e.colorMask(n,n,n,n),r=n)},setLocked:function(e){t=e},setClear:function(t,r,a,o,s){s===!0&&(t*=o,r*=o,a*=o),n.set(t,r,a,o),i.equals(n)===!1&&(e.clearColor(t,r,a,o),i.copy(n))},reset:function(){t=!1,r=null,i.set(-1,0,0,0)}}}function r(){let n=!1,r=!1,i=null,a=null,o=null;return{setReversed:function(e){if(r!==e){let n=t.get(`EXT_clip_control`);e?n.clipControlEXT(n.LOWER_LEFT_EXT,n.ZERO_TO_ONE_EXT):n.clipControlEXT(n.LOWER_LEFT_EXT,n.NEGATIVE_ONE_TO_ONE_EXT),r=e;let i=o;o=null,this.setClear(i)}},getReversed:function(){return r},setTest:function(t){t?oe(e.DEPTH_TEST):se(e.DEPTH_TEST)},setMask:function(t){i!==t&&!n&&(e.depthMask(t),i=t)},setFunc:function(t){if(r&&(t=xr[t]),a!==t){switch(t){case 0:e.depthFunc(e.NEVER);break;case 1:e.depthFunc(e.ALWAYS);break;case 2:e.depthFunc(e.LESS);break;case 3:e.depthFunc(e.LEQUAL);break;case 4:e.depthFunc(e.EQUAL);break;case 5:e.depthFunc(e.GEQUAL);break;case 6:e.depthFunc(e.GREATER);break;case 7:e.depthFunc(e.NOTEQUAL);break;default:e.depthFunc(e.LEQUAL)}a=t}},setLocked:function(e){n=e},setClear:function(t){o!==t&&(o=t,r&&(t=1-t),e.clearDepth(t))},reset:function(){n=!1,i=null,a=null,o=null,r=!1}}}function i(){let t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null;return{setTest:function(n){t||(n?oe(e.STENCIL_TEST):se(e.STENCIL_TEST))},setMask:function(r){n!==r&&!t&&(e.stencilMask(r),n=r)},setFunc:function(t,n,o){(r!==t||i!==n||a!==o)&&(e.stencilFunc(t,n,o),r=t,i=n,a=o)},setOp:function(t,n,r){(o!==t||s!==n||c!==r)&&(e.stencilOp(t,n,r),o=t,s=n,c=r)},setLocked:function(e){t=e},setClear:function(t){l!==t&&(e.clearStencil(t),l=t)},reset:function(){t=!1,n=null,r=null,i=null,a=null,o=null,s=null,c=null,l=null}}}let a=new n,o=new r,s=new i,c=new WeakMap,l=new WeakMap,u={},d={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,ee=e.getParameter(e.MAX_COMBINED_TEXTURE_IMAGE_UNITS),M=!1,N=0,P=e.getParameter(e.VERSION);P.indexOf(`WebGL`)===-1?P.indexOf(`OpenGL ES`)!==-1&&(N=parseFloat(/^OpenGL ES (\d)/.exec(P)[1]),M=N>=2):(N=parseFloat(/^WebGL (\d)/.exec(P)[1]),M=N>=1);let te=null,ne={},re=e.getParameter(e.SCISSOR_BOX),ie=e.getParameter(e.VIEWPORT),F=new mi().fromArray(re),I=new mi().fromArray(ie);function L(t,n,r,i){let a=new Uint8Array(4),o=e.createTexture();e.bindTexture(t,o),e.texParameteri(t,e.TEXTURE_MIN_FILTER,e.NEAREST),e.texParameteri(t,e.TEXTURE_MAG_FILTER,e.NEAREST);for(let o=0;o<r;o++)t===e.TEXTURE_3D||t===e.TEXTURE_2D_ARRAY?e.texImage3D(n,0,e.RGBA,1,1,i,0,e.RGBA,e.UNSIGNED_BYTE,a):e.texImage2D(n+o,0,e.RGBA,1,1,0,e.RGBA,e.UNSIGNED_BYTE,a);return o}let ae={};ae[e.TEXTURE_2D]=L(e.TEXTURE_2D,e.TEXTURE_2D,1),ae[e.TEXTURE_CUBE_MAP]=L(e.TEXTURE_CUBE_MAP,e.TEXTURE_CUBE_MAP_POSITIVE_X,6),ae[e.TEXTURE_2D_ARRAY]=L(e.TEXTURE_2D_ARRAY,e.TEXTURE_2D_ARRAY,1,1),ae[e.TEXTURE_3D]=L(e.TEXTURE_3D,e.TEXTURE_3D,1,1),a.setClear(0,0,0,1),o.setClear(1),s.setClear(0),oe(e.DEPTH_TEST),o.setFunc(3),me(!1),he(1),oe(e.CULL_FACE),fe(0);function oe(t){u[t]!==!0&&(e.enable(t),u[t]=!0)}function se(t){u[t]!==!1&&(e.disable(t),u[t]=!1)}function ce(t,n){return f[t]!==n&&(e.bindFramebuffer(t,n),f[t]=n,t===e.DRAW_FRAMEBUFFER&&(f[e.FRAMEBUFFER]=n),t===e.FRAMEBUFFER&&(f[e.DRAW_FRAMEBUFFER]=n),!0)}function R(t,n){let r=m,i=!1;if(t){r=p.get(n),r===void 0&&(r=[],p.set(n,r));let a=t.textures;if(r.length!==a.length||r[0]!==e.COLOR_ATTACHMENT0){for(let t=0,n=a.length;t<n;t++)r[t]=e.COLOR_ATTACHMENT0+t;r.length=a.length,i=!0}}else r[0]!==e.BACK&&(r[0]=e.BACK,i=!0);i&&e.drawBuffers(r)}function le(t){return h!==t&&(e.useProgram(t),h=t,!0)}let ue={100:e.FUNC_ADD,101:e.FUNC_SUBTRACT,102:e.FUNC_REVERSE_SUBTRACT};ue[103]=e.MIN,ue[104]=e.MAX;let de={200:e.ZERO,201:e.ONE,202:e.SRC_COLOR,204:e.SRC_ALPHA,210:e.SRC_ALPHA_SATURATE,208:e.DST_COLOR,206:e.DST_ALPHA,203:e.ONE_MINUS_SRC_COLOR,205:e.ONE_MINUS_SRC_ALPHA,209:e.ONE_MINUS_DST_COLOR,207:e.ONE_MINUS_DST_ALPHA,211:e.CONSTANT_COLOR,212:e.ONE_MINUS_CONSTANT_COLOR,213:e.CONSTANT_ALPHA,214:e.ONE_MINUS_CONSTANT_ALPHA};function fe(t,n,r,i,a,o,s,c,l,u){if(t===0){g===!0&&(se(e.BLEND),g=!1);return}if(g===!1&&(oe(e.BLEND),g=!0),t!==5){if(t!==_||u!==E){if((v!==100||x!==100)&&(e.blendEquation(e.FUNC_ADD),v=100,x=100),u)switch(t){case 1:e.blendFuncSeparate(e.ONE,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFunc(e.ONE,e.ONE);break;case 3:e.blendFuncSeparate(e.ZERO,e.ONE_MINUS_SRC_COLOR,e.ZERO,e.ONE);break;case 4:e.blendFuncSeparate(e.DST_COLOR,e.ONE_MINUS_SRC_ALPHA,e.ZERO,e.ONE);break;default:W(`WebGLState: Invalid blending: `,t)}else switch(t){case 1:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE_MINUS_SRC_ALPHA,e.ONE,e.ONE_MINUS_SRC_ALPHA);break;case 2:e.blendFuncSeparate(e.SRC_ALPHA,e.ONE,e.ONE,e.ONE);break;case 3:W(`WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true`);break;case 4:W(`WebGLState: MultiplyBlending requires material.premultipliedAlpha = true`);break;default:W(`WebGLState: Invalid blending: `,t)}y=null,b=null,S=null,C=null,w.set(0,0,0),T=0,_=t,E=u}return}a||=n,o||=r,s||=i,(n!==v||a!==x)&&(e.blendEquationSeparate(ue[n],ue[a]),v=n,x=a),(r!==y||i!==b||o!==S||s!==C)&&(e.blendFuncSeparate(de[r],de[i],de[o],de[s]),y=r,b=i,S=o,C=s),(c.equals(w)===!1||l!==T)&&(e.blendColor(c.r,c.g,c.b,l),w.copy(c),T=l),_=t,E=!1}function pe(t,n){t.side===2?se(e.CULL_FACE):oe(e.CULL_FACE);let r=t.side===1;n&&(r=!r),me(r),t.blending===1&&t.transparent===!1?fe(0):fe(t.blending,t.blendEquation,t.blendSrc,t.blendDst,t.blendEquationAlpha,t.blendSrcAlpha,t.blendDstAlpha,t.blendColor,t.blendAlpha,t.premultipliedAlpha),o.setFunc(t.depthFunc),o.setTest(t.depthTest),o.setMask(t.depthWrite),a.setMask(t.colorWrite);let i=t.stencilWrite;s.setTest(i),i&&(s.setMask(t.stencilWriteMask),s.setFunc(t.stencilFunc,t.stencilRef,t.stencilFuncMask),s.setOp(t.stencilFail,t.stencilZFail,t.stencilZPass)),z(t.polygonOffset,t.polygonOffsetFactor,t.polygonOffsetUnits),t.alphaToCoverage===!0?oe(e.SAMPLE_ALPHA_TO_COVERAGE):se(e.SAMPLE_ALPHA_TO_COVERAGE)}function me(t){D!==t&&(t?e.frontFace(e.CW):e.frontFace(e.CCW),D=t)}function he(t){t===0?se(e.CULL_FACE):(oe(e.CULL_FACE),t!==O&&(t===1?e.cullFace(e.BACK):t===2?e.cullFace(e.FRONT):e.cullFace(e.FRONT_AND_BACK))),O=t}function ge(t){t!==k&&(M&&e.lineWidth(t),k=t)}function z(t,n,r){t?(oe(e.POLYGON_OFFSET_FILL),(A!==n||j!==r)&&(A=n,j=r,o.getReversed()&&(n=-n),e.polygonOffset(n,r))):se(e.POLYGON_OFFSET_FILL)}function _e(t){t?oe(e.SCISSOR_TEST):se(e.SCISSOR_TEST)}function B(t){t===void 0&&(t=e.TEXTURE0+ee-1),te!==t&&(e.activeTexture(t),te=t)}function ve(t,n,r){r===void 0&&(r=te===null?e.TEXTURE0+ee-1:te);let i=ne[r];i===void 0&&(i={type:void 0,texture:void 0},ne[r]=i),(i.type!==t||i.texture!==n)&&(te!==r&&(e.activeTexture(r),te=r),e.bindTexture(t,n||ae[t]),i.type=t,i.texture=n)}function ye(){let t=ne[te];t!==void 0&&t.type!==void 0&&(e.bindTexture(t.type,null),t.type=void 0,t.texture=void 0)}function be(){try{e.compressedTexImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function V(){try{e.compressedTexImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function xe(){try{e.texSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function H(){try{e.texSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Se(){try{e.compressedTexSubImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ce(){try{e.compressedTexSubImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function we(){try{e.texStorage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Te(){try{e.texStorage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Ee(){try{e.texImage2D(...arguments)}catch(e){W(`WebGLState:`,e)}}function De(){try{e.texImage3D(...arguments)}catch(e){W(`WebGLState:`,e)}}function Oe(t){return d[t]===void 0?e.getParameter(t):d[t]}function ke(t,n){d[t]!==n&&(e.pixelStorei(t,n),d[t]=n)}function Ae(t){F.equals(t)===!1&&(e.scissor(t.x,t.y,t.z,t.w),F.copy(t))}function je(t){I.equals(t)===!1&&(e.viewport(t.x,t.y,t.z,t.w),I.copy(t))}function Me(t,n){let r=l.get(n);r===void 0&&(r=new WeakMap,l.set(n,r));let i=r.get(t);i===void 0&&(i=e.getUniformBlockIndex(n,t.name),r.set(t,i))}function Ne(t,n){let r=l.get(n).get(t);c.get(n)!==r&&(e.uniformBlockBinding(n,r,t.__bindingPointIndex),c.set(n,r))}function Pe(){e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.POLYGON_OFFSET_FILL),e.disable(e.SCISSOR_TEST),e.disable(e.STENCIL_TEST),e.disable(e.SAMPLE_ALPHA_TO_COVERAGE),e.blendEquation(e.FUNC_ADD),e.blendFunc(e.ONE,e.ZERO),e.blendFuncSeparate(e.ONE,e.ZERO,e.ONE,e.ZERO),e.blendColor(0,0,0,0),e.colorMask(!0,!0,!0,!0),e.clearColor(0,0,0,0),e.depthMask(!0),e.depthFunc(e.LESS),o.setReversed(!1),e.clearDepth(1),e.stencilMask(4294967295),e.stencilFunc(e.ALWAYS,0,4294967295),e.stencilOp(e.KEEP,e.KEEP,e.KEEP),e.clearStencil(0),e.cullFace(e.BACK),e.frontFace(e.CCW),e.polygonOffset(0,0),e.activeTexture(e.TEXTURE0),e.bindFramebuffer(e.FRAMEBUFFER,null),e.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),e.bindFramebuffer(e.READ_FRAMEBUFFER,null),e.useProgram(null),e.lineWidth(1),e.scissor(0,0,e.canvas.width,e.canvas.height),e.viewport(0,0,e.canvas.width,e.canvas.height),e.pixelStorei(e.PACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_ALIGNMENT,4),e.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,!1),e.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),e.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,e.BROWSER_DEFAULT_WEBGL),e.pixelStorei(e.PACK_ROW_LENGTH,0),e.pixelStorei(e.PACK_SKIP_PIXELS,0),e.pixelStorei(e.PACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_ROW_LENGTH,0),e.pixelStorei(e.UNPACK_IMAGE_HEIGHT,0),e.pixelStorei(e.UNPACK_SKIP_PIXELS,0),e.pixelStorei(e.UNPACK_SKIP_ROWS,0),e.pixelStorei(e.UNPACK_SKIP_IMAGES,0),u={},d={},te=null,ne={},f={},p=new WeakMap,m=[],h=null,g=!1,_=null,v=null,y=null,b=null,x=null,S=null,C=null,w=new Y(0,0,0),T=0,E=!1,D=null,O=null,k=null,A=null,j=null,F.set(0,0,e.canvas.width,e.canvas.height),I.set(0,0,e.canvas.width,e.canvas.height),a.reset(),o.reset(),s.reset()}return{buffers:{color:a,depth:o,stencil:s},enable:oe,disable:se,bindFramebuffer:ce,drawBuffers:R,useProgram:le,setBlending:fe,setMaterial:pe,setFlipSided:me,setCullFace:he,setLineWidth:ge,setPolygonOffset:z,setScissorTest:_e,activeTexture:B,bindTexture:ve,unbindTexture:ye,compressedTexImage2D:be,compressedTexImage3D:V,texImage2D:Ee,texImage3D:De,pixelStorei:ke,getParameter:Oe,updateUBOMapping:Me,uniformBlockBinding:Ne,texStorage2D:we,texStorage3D:Te,texSubImage2D:xe,texSubImage3D:H,compressedTexSubImage2D:Se,compressedTexSubImage3D:Ce,scissor:Ae,viewport:je,reset:Pe}}function vf(e,t,n,r,i,a,o){let s=t.has(`WEBGL_multisampled_render_to_texture`)?t.get(`WEBGL_multisampled_render_to_texture`):null,c=typeof navigator>`u`?!1:/OculusBrowser/g.test(navigator.userAgent),l=new G,u=new WeakMap,d=new Set,f,p=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<`u`&&new OffscreenCanvas(1,1).getContext(`2d`)!==null}catch{}function h(e,t){return m?new OffscreenCanvas(e,t):mr(`canvas`)}function g(e,t,n){let r=1,i=be(e);if((i.width>n||i.height>n)&&(r=n/Math.max(i.width,i.height)),r<1){if(typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<`u`&&e instanceof HTMLCanvasElement||typeof ImageBitmap<`u`&&e instanceof ImageBitmap||typeof VideoFrame<`u`&&e instanceof VideoFrame){let n=Math.floor(r*i.width),a=Math.floor(r*i.height);f===void 0&&(f=h(n,a));let o=t?h(n,a):f;return o.width=n,o.height=a,o.getContext(`2d`).drawImage(e,0,0,n,a),U(`WebGLRenderer: Texture has been resized from (`+i.width+`x`+i.height+`) to (`+n+`x`+a+`).`),o}return`data`in e&&U(`WebGLRenderer: Image in DataTexture is too big (`+i.width+`x`+i.height+`).`),e}return e}function _(e){return e.generateMipmaps}function v(t){e.generateMipmap(t)}function y(t){return t.isWebGLCubeRenderTarget?e.TEXTURE_CUBE_MAP:t.isWebGL3DRenderTarget?e.TEXTURE_3D:t.isWebGLArrayRenderTarget||t.isCompressedArrayTexture?e.TEXTURE_2D_ARRAY:e.TEXTURE_2D}function b(n,r,i,a,o,s=!1){if(n!==null){if(e[n]!==void 0)return e[n];U(`WebGLRenderer: Attempt to use non-existing WebGL internal format '`+n+`'`)}let c;a&&(c=t.get(`EXT_texture_norm16`),c||U(`WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension`));let l=r;if(r===e.RED&&(i===e.FLOAT&&(l=e.R32F),i===e.HALF_FLOAT&&(l=e.R16F),i===e.UNSIGNED_BYTE&&(l=e.R8),i===e.UNSIGNED_SHORT&&c&&(l=c.R16_EXT),i===e.SHORT&&c&&(l=c.R16_SNORM_EXT)),r===e.RED_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.R8UI),i===e.UNSIGNED_SHORT&&(l=e.R16UI),i===e.UNSIGNED_INT&&(l=e.R32UI),i===e.BYTE&&(l=e.R8I),i===e.SHORT&&(l=e.R16I),i===e.INT&&(l=e.R32I)),r===e.RG&&(i===e.FLOAT&&(l=e.RG32F),i===e.HALF_FLOAT&&(l=e.RG16F),i===e.UNSIGNED_BYTE&&(l=e.RG8),i===e.UNSIGNED_SHORT&&c&&(l=c.RG16_EXT),i===e.SHORT&&c&&(l=c.RG16_SNORM_EXT)),r===e.RG_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RG8UI),i===e.UNSIGNED_SHORT&&(l=e.RG16UI),i===e.UNSIGNED_INT&&(l=e.RG32UI),i===e.BYTE&&(l=e.RG8I),i===e.SHORT&&(l=e.RG16I),i===e.INT&&(l=e.RG32I)),r===e.RGB_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGB8UI),i===e.UNSIGNED_SHORT&&(l=e.RGB16UI),i===e.UNSIGNED_INT&&(l=e.RGB32UI),i===e.BYTE&&(l=e.RGB8I),i===e.SHORT&&(l=e.RGB16I),i===e.INT&&(l=e.RGB32I)),r===e.RGBA_INTEGER&&(i===e.UNSIGNED_BYTE&&(l=e.RGBA8UI),i===e.UNSIGNED_SHORT&&(l=e.RGBA16UI),i===e.UNSIGNED_INT&&(l=e.RGBA32UI),i===e.BYTE&&(l=e.RGBA8I),i===e.SHORT&&(l=e.RGBA16I),i===e.INT&&(l=e.RGBA32I)),r===e.RGB&&(i===e.UNSIGNED_SHORT&&c&&(l=c.RGB16_EXT),i===e.SHORT&&c&&(l=c.RGB16_SNORM_EXT),i===e.UNSIGNED_INT_5_9_9_9_REV&&(l=e.RGB9_E5),i===e.UNSIGNED_INT_10F_11F_11F_REV&&(l=e.R11F_G11F_B10F)),r===e.RGBA){let t=s?or:ri.getTransfer(o);i===e.FLOAT&&(l=e.RGBA32F),i===e.HALF_FLOAT&&(l=e.RGBA16F),i===e.UNSIGNED_BYTE&&(l=t===`srgb`?e.SRGB8_ALPHA8:e.RGBA8),i===e.UNSIGNED_SHORT&&c&&(l=c.RGBA16_EXT),i===e.SHORT&&c&&(l=c.RGBA16_SNORM_EXT),i===e.UNSIGNED_SHORT_4_4_4_4&&(l=e.RGBA4),i===e.UNSIGNED_SHORT_5_5_5_1&&(l=e.RGB5_A1)}return(l===e.R16F||l===e.R32F||l===e.RG16F||l===e.RG32F||l===e.RGBA16F||l===e.RGBA32F)&&t.get(`EXT_color_buffer_float`),l}function x(t,n){let r;return t?n===null||n===1014||n===1020?r=e.DEPTH24_STENCIL8:n===1015?r=e.DEPTH32F_STENCIL8:n===1012&&(r=e.DEPTH24_STENCIL8,U(`DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.`)):n===null||n===1014||n===1020?r=e.DEPTH_COMPONENT24:n===1015?r=e.DEPTH_COMPONENT32F:n===1012&&(r=e.DEPTH_COMPONENT16),r}function S(e,t){return _(e)===!0||e.isFramebufferTexture&&e.minFilter!==1003&&e.minFilter!==1006?Math.log2(Math.max(t.width,t.height))+1:e.mipmaps!==void 0&&e.mipmaps.length>0?e.mipmaps.length:e.isCompressedTexture&&Array.isArray(e.image)?t.mipmaps.length:1}function C(e){let t=e.target;t.removeEventListener(`dispose`,C),T(t),t.isVideoTexture&&u.delete(t),t.isHTMLTexture&&d.delete(t)}function w(e){let t=e.target;t.removeEventListener(`dispose`,w),D(t)}function T(e){let t=r.get(e);if(t.__webglInit===void 0)return;let n=e.source,i=p.get(n);if(i){let r=i[t.__cacheKey];r.usedTimes--,r.usedTimes===0&&E(e),Object.keys(i).length===0&&p.delete(n)}r.remove(e)}function E(t){let n=r.get(t);e.deleteTexture(n.__webglTexture);let i=t.source,a=p.get(i);delete a[n.__cacheKey],o.memory.textures--}function D(t){let n=r.get(t);if(t.depthTexture&&(t.depthTexture.dispose(),r.remove(t.depthTexture)),t.isWebGLCubeRenderTarget)for(let t=0;t<6;t++){if(Array.isArray(n.__webglFramebuffer[t]))for(let r=0;r<n.__webglFramebuffer[t].length;r++)e.deleteFramebuffer(n.__webglFramebuffer[t][r]);else e.deleteFramebuffer(n.__webglFramebuffer[t]);n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer[t])}else{if(Array.isArray(n.__webglFramebuffer))for(let t=0;t<n.__webglFramebuffer.length;t++)e.deleteFramebuffer(n.__webglFramebuffer[t]);else e.deleteFramebuffer(n.__webglFramebuffer);if(n.__webglDepthbuffer&&e.deleteRenderbuffer(n.__webglDepthbuffer),n.__webglMultisampledFramebuffer&&e.deleteFramebuffer(n.__webglMultisampledFramebuffer),n.__webglColorRenderbuffer)for(let t=0;t<n.__webglColorRenderbuffer.length;t++)n.__webglColorRenderbuffer[t]&&e.deleteRenderbuffer(n.__webglColorRenderbuffer[t]);n.__webglDepthRenderbuffer&&e.deleteRenderbuffer(n.__webglDepthRenderbuffer)}let i=t.textures;for(let t=0,n=i.length;t<n;t++){let n=r.get(i[t]);n.__webglTexture&&(e.deleteTexture(n.__webglTexture),o.memory.textures--),r.remove(i[t])}r.remove(t)}let O=0;function k(){O=0}function A(){return O}function j(e){O=e}function ee(){let e=O;return e>=i.maxTextures&&U(`WebGLTextures: Trying to use `+e+` texture units while this GPU supports only `+i.maxTextures),O+=1,e}function M(e){let t=[];return t.push(e.wrapS),t.push(e.wrapT),t.push(e.wrapR||0),t.push(e.magFilter),t.push(e.minFilter),t.push(e.anisotropy),t.push(e.internalFormat),t.push(e.format),t.push(e.type),t.push(e.generateMipmaps),t.push(e.premultiplyAlpha),t.push(e.flipY),t.push(e.unpackAlignment),t.push(e.colorSpace),t.join()}function N(t,i){let a=r.get(t);if(t.isVideoTexture&&ve(t),t.isRenderTargetTexture===!1&&t.isExternalTexture!==!0&&t.version>0&&a.__version!==t.version){let e=t.image;if(e===null)U(`WebGLRenderer: Texture marked for update but no image data found.`);else if(e.complete===!1)U(`WebGLRenderer: Texture marked for update but image is incomplete`);else{se(a,t,i);return}}else t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null);n.bindTexture(e.TEXTURE_2D,a.__webglTexture,e.TEXTURE0+i)}function P(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){se(a,t,i);return}t.isExternalTexture&&(a.__webglTexture=t.sourceTexture?t.sourceTexture:null),n.bindTexture(e.TEXTURE_2D_ARRAY,a.__webglTexture,e.TEXTURE0+i)}function te(t,i){let a=r.get(t);if(t.isRenderTargetTexture===!1&&t.version>0&&a.__version!==t.version){se(a,t,i);return}n.bindTexture(e.TEXTURE_3D,a.__webglTexture,e.TEXTURE0+i)}function ne(t,i){let a=r.get(t);if(t.isCubeDepthTexture!==!0&&t.version>0&&a.__version!==t.version){ce(a,t,i);return}n.bindTexture(e.TEXTURE_CUBE_MAP,a.__webglTexture,e.TEXTURE0+i)}let re={[Ft]:e.REPEAT,[It]:e.CLAMP_TO_EDGE,[Lt]:e.MIRRORED_REPEAT},ie={[Rt]:e.NEAREST,[zt]:e.NEAREST_MIPMAP_NEAREST,[Bt]:e.NEAREST_MIPMAP_LINEAR,[Vt]:e.LINEAR,[Ht]:e.LINEAR_MIPMAP_NEAREST,[Ut]:e.LINEAR_MIPMAP_LINEAR},F={512:e.NEVER,519:e.ALWAYS,513:e.LESS,515:e.LEQUAL,514:e.EQUAL,518:e.GEQUAL,516:e.GREATER,517:e.NOTEQUAL};function I(n,a){if(a.type===1015&&t.has(`OES_texture_float_linear`)===!1&&(a.magFilter===1006||a.magFilter===1007||a.magFilter===1005||a.magFilter===1008||a.minFilter===1006||a.minFilter===1007||a.minFilter===1005||a.minFilter===1008)&&U(`WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device.`),e.texParameteri(n,e.TEXTURE_WRAP_S,re[a.wrapS]),e.texParameteri(n,e.TEXTURE_WRAP_T,re[a.wrapT]),(n===e.TEXTURE_3D||n===e.TEXTURE_2D_ARRAY)&&e.texParameteri(n,e.TEXTURE_WRAP_R,re[a.wrapR]),e.texParameteri(n,e.TEXTURE_MAG_FILTER,ie[a.magFilter]),e.texParameteri(n,e.TEXTURE_MIN_FILTER,ie[a.minFilter]),a.compareFunction&&(e.texParameteri(n,e.TEXTURE_COMPARE_MODE,e.COMPARE_REF_TO_TEXTURE),e.texParameteri(n,e.TEXTURE_COMPARE_FUNC,F[a.compareFunction])),t.has(`EXT_texture_filter_anisotropic`)===!0){if(a.magFilter===1003||a.minFilter!==1005&&a.minFilter!==1008||a.type===1015&&t.has(`OES_texture_float_linear`)===!1)return;if(a.anisotropy>1||r.get(a).__currentAnisotropy){let o=t.get(`EXT_texture_filter_anisotropic`);e.texParameterf(n,o.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(a.anisotropy,i.getMaxAnisotropy())),r.get(a).__currentAnisotropy=a.anisotropy}}}function L(t,n){let r=!1;t.__webglInit===void 0&&(t.__webglInit=!0,n.addEventListener(`dispose`,C));let i=n.source,a=p.get(i);a===void 0&&(a={},p.set(i,a));let s=M(n);if(s!==t.__cacheKey){a[s]===void 0&&(a[s]={texture:e.createTexture(),usedTimes:0},o.memory.textures++,r=!0),a[s].usedTimes++;let i=a[t.__cacheKey];i!==void 0&&(a[t.__cacheKey].usedTimes--,i.usedTimes===0&&E(n)),t.__cacheKey=s,t.__webglTexture=a[s].texture}return r}function ae(e,t,n){return Math.floor(Math.floor(e/n)/t)}function oe(t,r,i,a){let o=t.updateRanges;if(o.length===0)n.texSubImage2D(e.TEXTURE_2D,0,0,0,r.width,r.height,i,a,r.data);else{o.sort((e,t)=>e.start-t.start);let s=0;for(let e=1;e<o.length;e++){let t=o[s],n=o[e],i=t.start+t.count,a=ae(n.start,r.width,4),c=ae(t.start,r.width,4);n.start<=i+1&&a===c&&ae(n.start+n.count-1,r.width,4)===a?t.count=Math.max(t.count,n.start+n.count-t.start):(++s,o[s]=n)}o.length=s+1;let c=n.getParameter(e.UNPACK_ROW_LENGTH),l=n.getParameter(e.UNPACK_SKIP_PIXELS),u=n.getParameter(e.UNPACK_SKIP_ROWS);n.pixelStorei(e.UNPACK_ROW_LENGTH,r.width);for(let t=0,s=o.length;t<s;t++){let s=o[t],c=Math.floor(s.start/4),l=Math.ceil(s.count/4),u=c%r.width,d=Math.floor(c/r.width),f=l;n.pixelStorei(e.UNPACK_SKIP_PIXELS,u),n.pixelStorei(e.UNPACK_SKIP_ROWS,d),n.texSubImage2D(e.TEXTURE_2D,0,u,d,f,1,i,a,r.data)}t.clearUpdateRanges(),n.pixelStorei(e.UNPACK_ROW_LENGTH,c),n.pixelStorei(e.UNPACK_SKIP_PIXELS,l),n.pixelStorei(e.UNPACK_SKIP_ROWS,u)}}function se(t,o,s){let c=e.TEXTURE_2D;(o.isDataArrayTexture||o.isCompressedArrayTexture)&&(c=e.TEXTURE_2D_ARRAY),o.isData3DTexture&&(c=e.TEXTURE_3D);let l=L(t,o),u=o.source;n.bindTexture(c,t.__webglTexture,e.TEXTURE0+s);let f=r.get(u);if(u.version!==f.__version||l===!0){if(n.activeTexture(e.TEXTURE0+s),!(typeof ImageBitmap<`u`&&o.image instanceof ImageBitmap)){let t=ri.getPrimaries(ri.workingColorSpace),r=o.colorSpace===``?null:ri.getPrimaries(o.colorSpace),i=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,i)}n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment);let t=g(o.image,!1,i.maxTextureSize);t=ye(o,t);let r=a.convert(o.format,o.colorSpace),p=a.convert(o.type),m=b(o.internalFormat,r,p,o.normalized,o.colorSpace,o.isVideoTexture);I(c,o);let h,y=o.mipmaps,C=o.isVideoTexture!==!0,w=f.__version===void 0||l===!0,T=u.dataReady,E=S(o,t);if(o.isDepthTexture)m=x(o.format===cn,o.type),w&&(C?n.texStorage2D(e.TEXTURE_2D,1,m,t.width,t.height):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,null));else if(o.isDataTexture){if(y.length>0){C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data);o.generateMipmaps=!1}else C?(w&&n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height),T&&oe(o,t,r,p)):n.texImage2D(e.TEXTURE_2D,0,m,t.width,t.height,0,r,p,t.data)}else if(o.isCompressedTexture){if(o.isCompressedArrayTexture){C&&w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,y[0].width,y[0].height,t.depth);for(let i=0,a=y.length;i<a;i++)if(h=y[i],o.format!==1023){if(r!==null){if(C){if(T){if(o.layerUpdates.size>0){let t=fl(h.width,h.height,o.format,o.type);for(let a of o.layerUpdates){let o=h.data.subarray(a*t/h.data.BYTES_PER_ELEMENT,(a+1)*t/h.data.BYTES_PER_ELEMENT);n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,a,h.width,h.height,1,r,o)}o.clearLayerUpdates()}else n.compressedTexSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,h.data)}}else n.compressedTexImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,h.data,0,0)}else U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`)}else C?T&&n.texSubImage3D(e.TEXTURE_2D_ARRAY,i,0,0,0,h.width,h.height,t.depth,r,p,h.data):n.texImage3D(e.TEXTURE_2D_ARRAY,i,m,h.width,h.height,t.depth,0,r,p,h.data)}else{C&&w&&n.texStorage2D(e.TEXTURE_2D,E,m,y[0].width,y[0].height);for(let t=0,i=y.length;t<i;t++)h=y[t],o.format===1023?C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,p,h.data):n.texImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,r,p,h.data):r===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()`):C?T&&n.compressedTexSubImage2D(e.TEXTURE_2D,t,0,0,h.width,h.height,r,h.data):n.compressedTexImage2D(e.TEXTURE_2D,t,m,h.width,h.height,0,h.data)}}else if(o.isDataArrayTexture){if(C){if(w&&n.texStorage3D(e.TEXTURE_2D_ARRAY,E,m,t.width,t.height,t.depth),T){if(o.layerUpdates.size>0){let i=fl(t.width,t.height,o.format,o.type);for(let a of o.layerUpdates){let o=t.data.subarray(a*i/t.data.BYTES_PER_ELEMENT,(a+1)*i/t.data.BYTES_PER_ELEMENT);n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,a,t.width,t.height,1,r,p,o)}o.clearLayerUpdates()}else n.texSubImage3D(e.TEXTURE_2D_ARRAY,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)}}else n.texImage3D(e.TEXTURE_2D_ARRAY,0,m,t.width,t.height,t.depth,0,r,p,t.data)}else if(o.isData3DTexture)C?(w&&n.texStorage3D(e.TEXTURE_3D,E,m,t.width,t.height,t.depth),T&&n.texSubImage3D(e.TEXTURE_3D,0,0,0,0,t.width,t.height,t.depth,r,p,t.data)):n.texImage3D(e.TEXTURE_3D,0,m,t.width,t.height,t.depth,0,r,p,t.data);else if(o.isFramebufferTexture){if(w){if(C)n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height);else{let i=t.width,a=t.height;for(let t=0;t<E;t++)n.texImage2D(e.TEXTURE_2D,t,m,i,a,0,r,p,null),i>>=1,a>>=1}}}else if(o.isHTMLTexture){if(`texElementImage2D`in e){let n=e.canvas;if(n.hasAttribute(`layoutsubtree`)||n.setAttribute(`layoutsubtree`,`true`),t.parentNode!==n){n.appendChild(t),d.add(o),n.onpaint=e=>{let t=e.changedElements;for(let e of d)t.includes(e.image)&&(e.needsUpdate=!0)},n.requestPaint();return}if(e.texElementImage2D.length===3)e.texElementImage2D(e.TEXTURE_2D,e.RGBA8,t);else{let n=e.RGBA,r=e.RGBA,i=e.UNSIGNED_BYTE;e.texElementImage2D(e.TEXTURE_2D,0,n,r,i,t)}e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_S,e.CLAMP_TO_EDGE),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_WRAP_T,e.CLAMP_TO_EDGE)}}else if(y.length>0){if(C&&w){let t=be(y[0]);n.texStorage2D(e.TEXTURE_2D,E,m,t.width,t.height)}for(let t=0,i=y.length;t<i;t++)h=y[t],C?T&&n.texSubImage2D(e.TEXTURE_2D,t,0,0,r,p,h):n.texImage2D(e.TEXTURE_2D,t,m,r,p,h);o.generateMipmaps=!1}else if(C){if(w){let r=be(t);n.texStorage2D(e.TEXTURE_2D,E,m,r.width,r.height)}T&&n.texSubImage2D(e.TEXTURE_2D,0,0,0,r,p,t)}else n.texImage2D(e.TEXTURE_2D,0,m,r,p,t);_(o)&&v(c),f.__version=u.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function ce(t,o,s){if(o.image.length!==6)return;let c=L(t,o),l=o.source;n.bindTexture(e.TEXTURE_CUBE_MAP,t.__webglTexture,e.TEXTURE0+s);let u=r.get(l);if(l.version!==u.__version||c===!0){n.activeTexture(e.TEXTURE0+s);let t=ri.getPrimaries(ri.workingColorSpace),r=o.colorSpace===``?null:ri.getPrimaries(o.colorSpace),d=o.colorSpace===``||t===r?e.NONE:e.BROWSER_DEFAULT_WEBGL;n.pixelStorei(e.UNPACK_FLIP_Y_WEBGL,o.flipY),n.pixelStorei(e.UNPACK_PREMULTIPLY_ALPHA_WEBGL,o.premultiplyAlpha),n.pixelStorei(e.UNPACK_ALIGNMENT,o.unpackAlignment),n.pixelStorei(e.UNPACK_COLORSPACE_CONVERSION_WEBGL,d);let f=o.isCompressedTexture||o.image[0].isCompressedTexture,p=o.image[0]&&o.image[0].isDataTexture,m=[];for(let e=0;e<6;e++)!f&&!p?m[e]=g(o.image[e],!0,i.maxCubemapSize):m[e]=p?o.image[e].image:o.image[e],m[e]=ye(o,m[e]);let h=m[0],y=a.convert(o.format,o.colorSpace),x=a.convert(o.type),C=b(o.internalFormat,y,x,o.normalized,o.colorSpace),w=o.isVideoTexture!==!0,T=u.__version===void 0||c===!0,E=l.dataReady,D=S(o,h);I(e.TEXTURE_CUBE_MAP,o);let O;if(f){w&&T&&n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,h.width,h.height);for(let t=0;t<6;t++){O=m[t].mipmaps;for(let r=0;r<O.length;r++){let i=O[r];o.format===1023?w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,y,x,i.data):y===null?U(`WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()`):w?E&&n.compressedTexSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,0,0,i.width,i.height,y,i.data):n.compressedTexImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r,C,i.width,i.height,0,i.data)}}}else{if(O=o.mipmaps,w&&T){O.length>0&&D++;let t=be(m[0]);n.texStorage2D(e.TEXTURE_CUBE_MAP,D,C,t.width,t.height)}for(let t=0;t<6;t++)if(p){w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,m[t].width,m[t].height,y,x,m[t].data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,m[t].width,m[t].height,0,y,x,m[t].data);for(let r=0;r<O.length;r++){let i=O[r].image[t].image;w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,i.width,i.height,y,x,i.data):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,i.width,i.height,0,y,x,i.data)}}else{w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,0,0,y,x,m[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,0,C,y,x,m[t]);for(let r=0;r<O.length;r++){let i=O[r];w?E&&n.texSubImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,0,0,y,x,i.image[t]):n.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+t,r+1,C,y,x,i.image[t])}}}_(o)&&v(e.TEXTURE_CUBE_MAP),u.__version=l.version,o.onUpdate&&o.onUpdate(o)}t.__version=o.version}function R(t,i,o,c,l,u){let d=a.convert(o.format,o.colorSpace),f=a.convert(o.type),p=b(o.internalFormat,d,f,o.normalized,o.colorSpace),m=r.get(i),h=r.get(o);if(h.__renderTarget=i,!m.__hasExternalTextures){let t=Math.max(1,i.width>>u),r=Math.max(1,i.height>>u);l===e.TEXTURE_3D||l===e.TEXTURE_2D_ARRAY?n.texImage3D(l,u,p,t,r,i.depth,0,d,f,null):n.texImage2D(l,u,p,t,r,0,d,f,null)}n.bindFramebuffer(e.FRAMEBUFFER,t),B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,c,l,h.__webglTexture,0,_e(i)):(l===e.TEXTURE_2D||l>=e.TEXTURE_CUBE_MAP_POSITIVE_X&&l<=e.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&e.framebufferTexture2D(e.FRAMEBUFFER,c,l,h.__webglTexture,u),n.bindFramebuffer(e.FRAMEBUFFER,null)}function le(t,n,r){if(e.bindRenderbuffer(e.RENDERBUFFER,t),n.depthBuffer){let i=n.depthTexture,a=i&&i.isDepthTexture?i.type:null,o=x(n.stencilBuffer,a),c=n.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;B(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e(n),o,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e(n),o,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,o,n.width,n.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,c,e.RENDERBUFFER,t)}else{let t=n.textures;for(let i=0;i<t.length;i++){let o=t[i],c=a.convert(o.format,o.colorSpace),l=a.convert(o.type),u=b(o.internalFormat,c,l,o.normalized,o.colorSpace);B(n)?s.renderbufferStorageMultisampleEXT(e.RENDERBUFFER,_e(n),u,n.width,n.height):r?e.renderbufferStorageMultisample(e.RENDERBUFFER,_e(n),u,n.width,n.height):e.renderbufferStorage(e.RENDERBUFFER,u,n.width,n.height)}}e.bindRenderbuffer(e.RENDERBUFFER,null)}function ue(t,i,o){let c=i.isWebGLCubeRenderTarget===!0;if(n.bindFramebuffer(e.FRAMEBUFFER,t),!(i.depthTexture&&i.depthTexture.isDepthTexture))throw Error(`THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.`);let l=r.get(i.depthTexture);if(l.__renderTarget=i,(!l.__webglTexture||i.depthTexture.image.width!==i.width||i.depthTexture.image.height!==i.height)&&(i.depthTexture.image.width=i.width,i.depthTexture.image.height=i.height,i.depthTexture.needsUpdate=!0),c){if(l.__webglInit===void 0&&(l.__webglInit=!0,i.depthTexture.addEventListener(`dispose`,C)),l.__webglTexture===void 0){l.__webglTexture=e.createTexture(),n.bindTexture(e.TEXTURE_CUBE_MAP,l.__webglTexture),I(e.TEXTURE_CUBE_MAP,i.depthTexture);let t=a.convert(i.depthTexture.format),r=a.convert(i.depthTexture.type),o;i.depthTexture.format===1026?o=e.DEPTH_COMPONENT24:i.depthTexture.format===1027&&(o=e.DEPTH24_STENCIL8);for(let n=0;n<6;n++)e.texImage2D(e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0,o,i.width,i.height,0,t,r,null)}}else N(i.depthTexture,0);let u=l.__webglTexture,d=_e(i),f=c?e.TEXTURE_CUBE_MAP_POSITIVE_X+o:e.TEXTURE_2D,p=i.depthTexture.format===1027?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;if(i.depthTexture.format===1026)B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else if(i.depthTexture.format===1027)B(i)?s.framebufferTexture2DMultisampleEXT(e.FRAMEBUFFER,p,f,u,0,d):e.framebufferTexture2D(e.FRAMEBUFFER,p,f,u,0);else throw Error(`THREE.WebGLTextures: Unknown depthTexture format.`)}function de(t){let i=r.get(t),a=t.isWebGLCubeRenderTarget===!0;if(i.__boundDepthTexture!==t.depthTexture){let e=t.depthTexture;if(i.__depthDisposeCallback&&i.__depthDisposeCallback(),e){let t=()=>{delete i.__boundDepthTexture,delete i.__depthDisposeCallback,e.removeEventListener(`dispose`,t)};e.addEventListener(`dispose`,t),i.__depthDisposeCallback=t}i.__boundDepthTexture=e}if(t.depthTexture&&!i.__autoAllocateDepthBuffer){if(a)for(let e=0;e<6;e++)ue(i.__webglFramebuffer[e],t,e);else{let e=t.texture.mipmaps;e&&e.length>0?ue(i.__webglFramebuffer[0],t,0):ue(i.__webglFramebuffer,t,0)}}else if(a){i.__webglDepthbuffer=[];for(let r=0;r<6;r++)if(n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[r]),i.__webglDepthbuffer[r]===void 0)i.__webglDepthbuffer[r]=e.createRenderbuffer(),le(i.__webglDepthbuffer[r],t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,a=i.__webglDepthbuffer[r];e.bindRenderbuffer(e.RENDERBUFFER,a),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,a)}}else{let r=t.texture.mipmaps;if(r&&r.length>0?n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer[0]):n.bindFramebuffer(e.FRAMEBUFFER,i.__webglFramebuffer),i.__webglDepthbuffer===void 0)i.__webglDepthbuffer=e.createRenderbuffer(),le(i.__webglDepthbuffer,t,!1);else{let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,r=i.__webglDepthbuffer;e.bindRenderbuffer(e.RENDERBUFFER,r),e.framebufferRenderbuffer(e.FRAMEBUFFER,n,e.RENDERBUFFER,r)}}n.bindFramebuffer(e.FRAMEBUFFER,null)}function fe(t,n,i){let a=r.get(t);n!==void 0&&R(a.__webglFramebuffer,t,t.texture,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,0),i!==void 0&&de(t)}function pe(t){let i=t.texture,s=r.get(t),c=r.get(i);t.addEventListener(`dispose`,w);let l=t.textures,u=t.isWebGLCubeRenderTarget===!0,d=l.length>1;if(d||(c.__webglTexture===void 0&&(c.__webglTexture=e.createTexture()),c.__version=i.version,o.memory.textures++),u){s.__webglFramebuffer=[];for(let t=0;t<6;t++)if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer[t]=[];for(let n=0;n<i.mipmaps.length;n++)s.__webglFramebuffer[t][n]=e.createFramebuffer()}else s.__webglFramebuffer[t]=e.createFramebuffer()}else{if(i.mipmaps&&i.mipmaps.length>0){s.__webglFramebuffer=[];for(let t=0;t<i.mipmaps.length;t++)s.__webglFramebuffer[t]=e.createFramebuffer()}else s.__webglFramebuffer=e.createFramebuffer();if(d)for(let t=0,n=l.length;t<n;t++){let n=r.get(l[t]);n.__webglTexture===void 0&&(n.__webglTexture=e.createTexture(),o.memory.textures++)}if(t.samples>0&&B(t)===!1){s.__webglMultisampledFramebuffer=e.createFramebuffer(),s.__webglColorRenderbuffer=[],n.bindFramebuffer(e.FRAMEBUFFER,s.__webglMultisampledFramebuffer);for(let n=0;n<l.length;n++){let r=l[n];s.__webglColorRenderbuffer[n]=e.createRenderbuffer(),e.bindRenderbuffer(e.RENDERBUFFER,s.__webglColorRenderbuffer[n]);let i=a.convert(r.format,r.colorSpace),o=a.convert(r.type),c=b(r.internalFormat,i,o,r.normalized,r.colorSpace,t.isXRRenderTarget===!0),u=_e(t);e.renderbufferStorageMultisample(e.RENDERBUFFER,u,c,t.width,t.height),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+n,e.RENDERBUFFER,s.__webglColorRenderbuffer[n])}e.bindRenderbuffer(e.RENDERBUFFER,null),t.depthBuffer&&(s.__webglDepthRenderbuffer=e.createRenderbuffer(),le(s.__webglDepthRenderbuffer,t,!0)),n.bindFramebuffer(e.FRAMEBUFFER,null)}}if(u){n.bindTexture(e.TEXTURE_CUBE_MAP,c.__webglTexture),I(e.TEXTURE_CUBE_MAP,i);for(let n=0;n<6;n++)if(i.mipmaps&&i.mipmaps.length>0)for(let r=0;r<i.mipmaps.length;r++)R(s.__webglFramebuffer[n][r],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,r);else R(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,e.TEXTURE_CUBE_MAP_POSITIVE_X+n,0);_(i)&&v(e.TEXTURE_CUBE_MAP),n.unbindTexture()}else if(d){for(let i=0,a=l.length;i<a;i++){let a=l[i],o=r.get(a),c=e.TEXTURE_2D;(t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(c=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(c,o.__webglTexture),I(c,a),R(s.__webglFramebuffer,t,a,e.COLOR_ATTACHMENT0+i,c,0),_(a)&&v(c)}n.unbindTexture()}else{let r=e.TEXTURE_2D;if((t.isWebGL3DRenderTarget||t.isWebGLArrayRenderTarget)&&(r=t.isWebGL3DRenderTarget?e.TEXTURE_3D:e.TEXTURE_2D_ARRAY),n.bindTexture(r,c.__webglTexture),I(r,i),i.mipmaps&&i.mipmaps.length>0)for(let n=0;n<i.mipmaps.length;n++)R(s.__webglFramebuffer[n],t,i,e.COLOR_ATTACHMENT0,r,n);else R(s.__webglFramebuffer,t,i,e.COLOR_ATTACHMENT0,r,0);_(i)&&v(r),n.unbindTexture()}t.depthBuffer&&de(t)}function me(e){let t=e.textures;for(let i=0,a=t.length;i<a;i++){let a=t[i];if(_(a)){let t=y(e),i=r.get(a).__webglTexture;n.bindTexture(t,i),v(t),n.unbindTexture()}}}let he=[],ge=[];function z(t){if(t.samples>0){if(B(t)===!1){let i=t.textures,a=t.width,o=t.height,s=e.COLOR_BUFFER_BIT,l=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT,u=r.get(t),d=i.length>1;if(d)for(let t=0;t<i.length;t++)n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,null),n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,null,0);n.bindFramebuffer(e.READ_FRAMEBUFFER,u.__webglMultisampledFramebuffer);let f=t.texture.mipmaps;f&&f.length>0?n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer[0]):n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglFramebuffer);for(let n=0;n<i.length;n++){if(t.resolveDepthBuffer&&(t.depthBuffer&&(s|=e.DEPTH_BUFFER_BIT),t.stencilBuffer&&t.resolveStencilBuffer&&(s|=e.STENCIL_BUFFER_BIT)),d){e.framebufferRenderbuffer(e.READ_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.RENDERBUFFER,u.__webglColorRenderbuffer[n]);let t=r.get(i[n]).__webglTexture;e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,t,0)}e.blitFramebuffer(0,0,a,o,0,0,a,o,s,e.NEAREST),c===!0&&(he.length=0,ge.length=0,he.push(e.COLOR_ATTACHMENT0+n),t.depthBuffer&&t.resolveDepthBuffer===!1&&(he.push(l),ge.push(l),e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,ge)),e.invalidateFramebuffer(e.READ_FRAMEBUFFER,he))}if(n.bindFramebuffer(e.READ_FRAMEBUFFER,null),n.bindFramebuffer(e.DRAW_FRAMEBUFFER,null),d)for(let t=0;t<i.length;t++){n.bindFramebuffer(e.FRAMEBUFFER,u.__webglMultisampledFramebuffer),e.framebufferRenderbuffer(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.RENDERBUFFER,u.__webglColorRenderbuffer[t]);let a=r.get(i[t]).__webglTexture;n.bindFramebuffer(e.FRAMEBUFFER,u.__webglFramebuffer),e.framebufferTexture2D(e.DRAW_FRAMEBUFFER,e.COLOR_ATTACHMENT0+t,e.TEXTURE_2D,a,0)}n.bindFramebuffer(e.DRAW_FRAMEBUFFER,u.__webglMultisampledFramebuffer)}else if(t.depthBuffer&&t.resolveDepthBuffer===!1&&c){let n=t.stencilBuffer?e.DEPTH_STENCIL_ATTACHMENT:e.DEPTH_ATTACHMENT;e.invalidateFramebuffer(e.DRAW_FRAMEBUFFER,[n])}}}function _e(e){return Math.min(i.maxSamples,e.samples)}function B(e){let n=r.get(e);return e.samples>0&&t.has(`WEBGL_multisampled_render_to_texture`)===!0&&n.__useRenderToTexture!==!1}function ve(e){let t=o.render.frame;u.get(e)!==t&&(u.set(e,t),e.update())}function ye(e,t){let n=e.colorSpace,r=e.format,i=e.type;return e.isCompressedTexture===!0||e.isVideoTexture===!0||n!==`srgb-linear`&&n!==``&&(ri.getTransfer(n)===`srgb`?(r!==1023||i!==1009)&&U(`WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.`):W(`WebGLTextures: Unsupported texture color space:`,n)),t}function be(e){return typeof HTMLImageElement<`u`&&e instanceof HTMLImageElement?(l.width=e.naturalWidth||e.width,l.height=e.naturalHeight||e.height):typeof VideoFrame<`u`&&e instanceof VideoFrame?(l.width=e.displayWidth,l.height=e.displayHeight):(l.width=e.width,l.height=e.height),l}this.allocateTextureUnit=ee,this.resetTextureUnits=k,this.getTextureUnits=A,this.setTextureUnits=j,this.setTexture2D=N,this.setTexture2DArray=P,this.setTexture3D=te,this.setTextureCube=ne,this.rebindTextures=fe,this.setupRenderTarget=pe,this.updateRenderTargetMipmap=me,this.updateMultisampleRenderTarget=z,this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=R,this.useMultisampledRTT=B,this.isReversedDepthBuffer=function(){return n.buffers.depth.getReversed()}}function yf(e,t){function n(n,r=``){let i,a=ri.getTransfer(r);if(n===1009)return e.UNSIGNED_BYTE;if(n===1017)return e.UNSIGNED_SHORT_4_4_4_4;if(n===1018)return e.UNSIGNED_SHORT_5_5_5_1;if(n===35902)return e.UNSIGNED_INT_5_9_9_9_REV;if(n===35899)return e.UNSIGNED_INT_10F_11F_11F_REV;if(n===1010)return e.BYTE;if(n===1011)return e.SHORT;if(n===1012)return e.UNSIGNED_SHORT;if(n===1013)return e.INT;if(n===1014)return e.UNSIGNED_INT;if(n===1015)return e.FLOAT;if(n===1016)return e.HALF_FLOAT;if(n===1021)return e.ALPHA;if(n===1022)return e.RGB;if(n===1023)return e.RGBA;if(n===1026)return e.DEPTH_COMPONENT;if(n===1027)return e.DEPTH_STENCIL;if(n===1028)return e.RED;if(n===1029)return e.RED_INTEGER;if(n===1030)return e.RG;if(n===1031)return e.RG_INTEGER;if(n===1033)return e.RGBA_INTEGER;if(n===33776||n===33777||n===33778||n===33779){if(a===`srgb`){if(i=t.get(`WEBGL_compressed_texture_s3tc_srgb`),i!==null){if(n===33776)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null}else if(i=t.get(`WEBGL_compressed_texture_s3tc`),i!==null){if(n===33776)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===33777)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===33778)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===33779)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null}if(n===35840||n===35841||n===35842||n===35843){if(i=t.get(`WEBGL_compressed_texture_pvrtc`),i!==null){if(n===35840)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===35841)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===35842)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===35843)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null}if(n===36196||n===37492||n===37496||n===37488||n===37489||n===37490||n===37491){if(i=t.get(`WEBGL_compressed_texture_etc`),i!==null){if(n===36196||n===37492)return a===`srgb`?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(n===37496)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC;if(n===37488)return i.COMPRESSED_R11_EAC;if(n===37489)return i.COMPRESSED_SIGNED_R11_EAC;if(n===37490)return i.COMPRESSED_RG11_EAC;if(n===37491)return i.COMPRESSED_SIGNED_RG11_EAC}else return null}if(n===37808||n===37809||n===37810||n===37811||n===37812||n===37813||n===37814||n===37815||n===37816||n===37817||n===37818||n===37819||n===37820||n===37821){if(i=t.get(`WEBGL_compressed_texture_astc`),i!==null){if(n===37808)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===37809)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===37810)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===37811)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===37812)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===37813)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===37814)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===37815)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===37816)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===37817)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===37818)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===37819)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===37820)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===37821)return a===`srgb`?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null}if(n===36492||n===36494||n===36495){if(i=t.get(`EXT_texture_compression_bptc`),i!==null){if(n===36492)return a===`srgb`?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===36494)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===36495)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null}if(n===36283||n===36284||n===36285||n===36286){if(i=t.get(`EXT_texture_compression_rgtc`),i!==null){if(n===36283)return i.COMPRESSED_RED_RGTC1_EXT;if(n===36284)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===36285)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===36286)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null}return n===1020?e.UNSIGNED_INT_24_8:e[n]===void 0?null:e[n]}return{convert:n}}var bf=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,xf=`
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

}`,Sf=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let n=new ss(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new nc({vertexShader:bf,fragmentShader:xf,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new X(new Us(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Cf=class extends Sr{constructor(e,t){super();let n=this,r=null,i=1,a=null,o=`local-floor`,s=1,c=null,l=null,u=null,d=null,f=null,p=null,m=typeof XRWebGLBinding<`u`,h=new Sf,g={},_=t.getContextAttributes(),v=null,y=null,b=[],x=[],S=new G,C=null,w=new Hc;w.viewport=new mi;let T=new Hc;T.viewport=new mi;let E=[w,T],D=new Yc,O=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(e){let t=b[e];return t===void 0&&(t=new Ji,b[e]=t),t.getTargetRaySpace()},this.getControllerGrip=function(e){let t=b[e];return t===void 0&&(t=new Ji,b[e]=t),t.getGripSpace()},this.getHand=function(e){let t=b[e];return t===void 0&&(t=new Ji,b[e]=t),t.getHandSpace()};function A(e){let t=x.indexOf(e.inputSource);if(t===-1)return;let n=b[t];n!==void 0&&(n.update(e.inputSource,e.frame,c||a),n.dispatchEvent({type:e.type,data:e.inputSource}))}function j(){r.removeEventListener(`select`,A),r.removeEventListener(`selectstart`,A),r.removeEventListener(`selectend`,A),r.removeEventListener(`squeeze`,A),r.removeEventListener(`squeezestart`,A),r.removeEventListener(`squeezeend`,A),r.removeEventListener(`end`,j),r.removeEventListener(`inputsourceschange`,ee);for(let e=0;e<b.length;e++){let t=x[e];t!==null&&(x[e]=null,b[e].disconnect(t))}O=null,k=null,h.reset();for(let e in g)delete g[e];e.setRenderTarget(v),f=null,d=null,u=null,r=null,y=null,F.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:`sessionend`})}this.setFramebufferScaleFactor=function(e){i=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change framebuffer scale while presenting.`)},this.setReferenceSpaceType=function(e){o=e,n.isPresenting===!0&&U(`WebXRManager: Cannot change reference space type while presenting.`)},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(e){c=e},this.getBaseLayer=function(){return d===null?f:d},this.getBinding=function(){return u===null&&m&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return p},this.getSession=function(){return r},this.setSession=async function(l){if(r=l,r!==null){if(v=e.getRenderTarget(),r.addEventListener(`select`,A),r.addEventListener(`selectstart`,A),r.addEventListener(`selectend`,A),r.addEventListener(`squeeze`,A),r.addEventListener(`squeezestart`,A),r.addEventListener(`squeezeend`,A),r.addEventListener(`end`,j),r.addEventListener(`inputsourceschange`,ee),_.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(S),m&&`createProjectionLayer`in XRWebGLBinding.prototype){let n=null,a=null,o=null;_.depth&&(o=_.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,n=_.stencil?cn:sn,a=_.stencil?en:Yt);let s={colorFormat:t.RGBA8,depthFormat:o,scaleFactor:i};u=this.getBinding(),d=u.createProjectionLayer(s),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),y=new gi(d.textureWidth,d.textureHeight,{format:on,type:Wt,depthTexture:new as(d.textureWidth,d.textureHeight,a,void 0,void 0,void 0,void 0,void 0,void 0,n),stencilBuffer:_.stencil,colorSpace:e.outputColorSpace,samples:_.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let n={antialias:_.antialias,alpha:!0,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:i};f=new XRWebGLLayer(r,t,n),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new gi(f.framebufferWidth,f.framebufferHeight,{format:on,type:Wt,colorSpace:e.outputColorSpace,stencilBuffer:_.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(s),c=null,a=await r.requestReferenceSpace(o),F.setContext(r),F.start(),n.isPresenting=!0,n.dispatchEvent({type:`sessionstart`})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return h.getDepthTexture()};function ee(e){for(let t=0;t<e.removed.length;t++){let n=e.removed[t],r=x.indexOf(n);r>=0&&(x[r]=null,b[r].disconnect(n))}for(let t=0;t<e.added.length;t++){let n=e.added[t],r=x.indexOf(n);if(r===-1){for(let e=0;e<b.length;e++)if(e>=x.length){x.push(n),r=e;break}else if(x[e]===null){x[e]=n,r=e;break}if(r===-1)break}let i=b[r];i&&i.connect(n)}}let M=new K,N=new K;function P(e,t,n){M.setFromMatrixPosition(t.matrixWorld),N.setFromMatrixPosition(n.matrixWorld);let r=M.distanceTo(N),i=t.projectionMatrix.elements,a=n.projectionMatrix.elements,o=i[14]/(i[10]-1),s=i[14]/(i[10]+1),c=(i[9]+1)/i[5],l=(i[9]-1)/i[5],u=(i[8]-1)/i[0],d=(a[8]+1)/a[0],f=o*u,p=o*d,m=r/(-u+d),h=m*-u;if(t.matrixWorld.decompose(e.position,e.quaternion,e.scale),e.translateX(h),e.translateZ(m),e.matrixWorld.compose(e.position,e.quaternion,e.scale),e.matrixWorldInverse.copy(e.matrixWorld).invert(),i[10]===-1)e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse);else{let t=o+m,n=s+m,i=f-h,a=p+(r-h),u=c*s/n*t,d=l*s/n*t;e.projectionMatrix.makePerspective(i,a,u,d,t,n),e.projectionMatrixInverse.copy(e.projectionMatrix).invert()}}function te(e,t){t===null?e.matrixWorld.copy(e.matrix):e.matrixWorld.multiplyMatrices(t.matrixWorld,e.matrix),e.matrixWorldInverse.copy(e.matrixWorld).invert()}this.updateCamera=function(e){if(r===null)return;let t=e.near,n=e.far;h.texture!==null&&(h.depthNear>0&&(t=h.depthNear),h.depthFar>0&&(n=h.depthFar)),D.near=T.near=w.near=t,D.far=T.far=w.far=n,(O!==D.near||k!==D.far)&&(r.updateRenderState({depthNear:D.near,depthFar:D.far}),O=D.near,k=D.far),D.layers.mask=e.layers.mask|6,w.layers.mask=D.layers.mask&-5,T.layers.mask=D.layers.mask&-3;let i=e.parent,a=D.cameras;te(D,i);for(let e=0;e<a.length;e++)te(a[e],i);a.length===2?P(D,w,T):D.projectionMatrix.copy(w.projectionMatrix),ne(e,D,i)};function ne(e,t,n){n===null?e.matrix.copy(t.matrixWorld):(e.matrix.copy(n.matrixWorld),e.matrix.invert(),e.matrix.multiply(t.matrixWorld)),e.matrix.decompose(e.position,e.quaternion,e.scale),e.updateMatrixWorld(!0),e.projectionMatrix.copy(t.projectionMatrix),e.projectionMatrixInverse.copy(t.projectionMatrixInverse),e.isPerspectiveCamera&&(e.fov=Er*2*Math.atan(1/e.projectionMatrix.elements[5]),e.zoom=1)}this.getCamera=function(){return D},this.getFoveation=function(){if(d!==null||f!==null)return s},this.setFoveation=function(e){s=e,d!==null&&(d.fixedFoveation=e),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=e)},this.hasDepthSensing=function(){return h.texture!==null},this.getDepthSensingMesh=function(){return h.getMesh(D)},this.getCameraTexture=function(e){return g[e]};let re=null;function ie(t,i){if(l=i.getViewerPose(c||a),p=i,l!==null){let t=l.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let i=!1;t.length!==D.cameras.length&&(D.cameras.length=0,i=!0);for(let n=0;n<t.length;n++){let r=t[n],a=null;if(f!==null)a=f.getViewport(r);else{let t=u.getViewSubImage(d,r);a=t.viewport,n===0&&(e.setRenderTargetTextures(y,t.colorTexture,t.depthStencilTexture),e.setRenderTarget(y))}let o=E[n];o===void 0&&(o=new Hc,o.layers.enable(n),o.viewport=new mi,E[n]=o),o.matrix.fromArray(r.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.projectionMatrix.fromArray(r.projectionMatrix),o.projectionMatrixInverse.copy(o.projectionMatrix).invert(),o.viewport.set(a.x,a.y,a.width,a.height),n===0&&(D.matrix.copy(o.matrix),D.matrix.decompose(D.position,D.quaternion,D.scale)),i===!0&&D.cameras.push(o)}let a=r.enabledFeatures;if(a&&a.includes(`depth-sensing`)&&r.depthUsage==`gpu-optimized`&&m){u=n.getBinding();let e=u.getDepthInformation(t[0]);e&&e.isValid&&e.texture&&h.init(e,r.renderState)}if(a&&a.includes(`camera-access`)&&m){e.state.unbindTexture(),u=n.getBinding();for(let e=0;e<t.length;e++){let n=t[e].camera;if(n){let e=g[n];e||(e=new ss,g[n]=e);let t=u.getCameraImage(n);e.sourceTexture=t}}}}for(let e=0;e<b.length;e++){let t=x[e],n=b[e];t!==null&&n!==void 0&&n.update(t,i,c||a)}re&&re(t,i),i.detectedPlanes&&n.dispatchEvent({type:`planesdetected`,data:i}),p=null}let F=new ml;F.setAnimationLoop(ie),this.setAnimationLoop=function(e){re=e},this.dispose=function(){}}},wf=new yi,Tf=new q;Tf.set(-1,0,0,0,1,0,0,0,1);function Ef(e,t){function n(e,t){e.matrixAutoUpdate===!0&&e.updateMatrix(),t.value.copy(e.matrix)}function r(t,n){n.color.getRGB(t.fogColor.value,Qs(e)),n.isFog?(t.fogNear.value=n.near,t.fogFar.value=n.far):n.isFogExp2&&(t.fogDensity.value=n.density)}function i(e,t,n,r,i){t.isNodeMaterial?t.uniformsNeedUpdate=!1:t.isMeshBasicMaterial?a(e,t):t.isMeshLambertMaterial?(a(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshToonMaterial?(a(e,t),d(e,t)):t.isMeshPhongMaterial?(a(e,t),u(e,t),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)):t.isMeshStandardMaterial?(a(e,t),f(e,t),t.isMeshPhysicalMaterial&&p(e,t,i)):t.isMeshMatcapMaterial?(a(e,t),m(e,t)):t.isMeshDepthMaterial?a(e,t):t.isMeshDistanceMaterial?(a(e,t),h(e,t)):t.isMeshNormalMaterial?a(e,t):t.isLineBasicMaterial?(o(e,t),t.isLineDashedMaterial&&s(e,t)):t.isPointsMaterial?c(e,t,n,r):t.isSpriteMaterial?l(e,t):t.isShadowMaterial?(e.color.value.copy(t.color),e.opacity.value=t.opacity):t.isShaderMaterial&&(t.uniformsNeedUpdate=!1)}function a(e,r){e.opacity.value=r.opacity,r.color&&e.diffuse.value.copy(r.color),r.emissive&&e.emissive.value.copy(r.emissive).multiplyScalar(r.emissiveIntensity),r.map&&(e.map.value=r.map,n(r.map,e.mapTransform)),r.alphaMap&&(e.alphaMap.value=r.alphaMap,n(r.alphaMap,e.alphaMapTransform)),r.bumpMap&&(e.bumpMap.value=r.bumpMap,n(r.bumpMap,e.bumpMapTransform),e.bumpScale.value=r.bumpScale,r.side===1&&(e.bumpScale.value*=-1)),r.normalMap&&(e.normalMap.value=r.normalMap,n(r.normalMap,e.normalMapTransform),e.normalScale.value.copy(r.normalScale),r.side===1&&e.normalScale.value.negate()),r.displacementMap&&(e.displacementMap.value=r.displacementMap,n(r.displacementMap,e.displacementMapTransform),e.displacementScale.value=r.displacementScale,e.displacementBias.value=r.displacementBias),r.emissiveMap&&(e.emissiveMap.value=r.emissiveMap,n(r.emissiveMap,e.emissiveMapTransform)),r.specularMap&&(e.specularMap.value=r.specularMap,n(r.specularMap,e.specularMapTransform)),r.alphaTest>0&&(e.alphaTest.value=r.alphaTest);let i=t.get(r),a=i.envMap,o=i.envMapRotation;a&&(e.envMap.value=a,e.envMapRotation.value.setFromMatrix4(wf.makeRotationFromEuler(o)).transpose(),a.isCubeTexture&&a.isRenderTargetTexture===!1&&e.envMapRotation.value.premultiply(Tf),e.reflectivity.value=r.reflectivity,e.ior.value=r.ior,e.refractionRatio.value=r.refractionRatio),r.lightMap&&(e.lightMap.value=r.lightMap,e.lightMapIntensity.value=r.lightMapIntensity,n(r.lightMap,e.lightMapTransform)),r.aoMap&&(e.aoMap.value=r.aoMap,e.aoMapIntensity.value=r.aoMapIntensity,n(r.aoMap,e.aoMapTransform))}function o(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform))}function s(e,t){e.dashSize.value=t.dashSize,e.totalSize.value=t.dashSize+t.gapSize,e.scale.value=t.scale}function c(e,t,r,i){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.size.value=t.size*r,e.scale.value=i*.5,t.map&&(e.map.value=t.map,n(t.map,e.uvTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function l(e,t){e.diffuse.value.copy(t.color),e.opacity.value=t.opacity,e.rotation.value=t.rotation,t.map&&(e.map.value=t.map,n(t.map,e.mapTransform)),t.alphaMap&&(e.alphaMap.value=t.alphaMap,n(t.alphaMap,e.alphaMapTransform)),t.alphaTest>0&&(e.alphaTest.value=t.alphaTest)}function u(e,t){e.specular.value.copy(t.specular),e.shininess.value=Math.max(t.shininess,1e-4)}function d(e,t){t.gradientMap&&(e.gradientMap.value=t.gradientMap)}function f(e,t){e.metalness.value=t.metalness,t.metalnessMap&&(e.metalnessMap.value=t.metalnessMap,n(t.metalnessMap,e.metalnessMapTransform)),e.roughness.value=t.roughness,t.roughnessMap&&(e.roughnessMap.value=t.roughnessMap,n(t.roughnessMap,e.roughnessMapTransform)),t.envMap&&(e.envMapIntensity.value=t.envMapIntensity)}function p(e,t,r){e.ior.value=t.ior,t.sheen>0&&(e.sheenColor.value.copy(t.sheenColor).multiplyScalar(t.sheen),e.sheenRoughness.value=t.sheenRoughness,t.sheenColorMap&&(e.sheenColorMap.value=t.sheenColorMap,n(t.sheenColorMap,e.sheenColorMapTransform)),t.sheenRoughnessMap&&(e.sheenRoughnessMap.value=t.sheenRoughnessMap,n(t.sheenRoughnessMap,e.sheenRoughnessMapTransform))),t.clearcoat>0&&(e.clearcoat.value=t.clearcoat,e.clearcoatRoughness.value=t.clearcoatRoughness,t.clearcoatMap&&(e.clearcoatMap.value=t.clearcoatMap,n(t.clearcoatMap,e.clearcoatMapTransform)),t.clearcoatRoughnessMap&&(e.clearcoatRoughnessMap.value=t.clearcoatRoughnessMap,n(t.clearcoatRoughnessMap,e.clearcoatRoughnessMapTransform)),t.clearcoatNormalMap&&(e.clearcoatNormalMap.value=t.clearcoatNormalMap,n(t.clearcoatNormalMap,e.clearcoatNormalMapTransform),e.clearcoatNormalScale.value.copy(t.clearcoatNormalScale),t.side===1&&e.clearcoatNormalScale.value.negate())),t.dispersion>0&&(e.dispersion.value=t.dispersion),t.iridescence>0&&(e.iridescence.value=t.iridescence,e.iridescenceIOR.value=t.iridescenceIOR,e.iridescenceThicknessMinimum.value=t.iridescenceThicknessRange[0],e.iridescenceThicknessMaximum.value=t.iridescenceThicknessRange[1],t.iridescenceMap&&(e.iridescenceMap.value=t.iridescenceMap,n(t.iridescenceMap,e.iridescenceMapTransform)),t.iridescenceThicknessMap&&(e.iridescenceThicknessMap.value=t.iridescenceThicknessMap,n(t.iridescenceThicknessMap,e.iridescenceThicknessMapTransform))),t.transmission>0&&(e.transmission.value=t.transmission,e.transmissionSamplerMap.value=r.texture,e.transmissionSamplerSize.value.set(r.width,r.height),t.transmissionMap&&(e.transmissionMap.value=t.transmissionMap,n(t.transmissionMap,e.transmissionMapTransform)),e.thickness.value=t.thickness,t.thicknessMap&&(e.thicknessMap.value=t.thicknessMap,n(t.thicknessMap,e.thicknessMapTransform)),e.attenuationDistance.value=t.attenuationDistance,e.attenuationColor.value.copy(t.attenuationColor)),t.anisotropy>0&&(e.anisotropyVector.value.set(t.anisotropy*Math.cos(t.anisotropyRotation),t.anisotropy*Math.sin(t.anisotropyRotation)),t.anisotropyMap&&(e.anisotropyMap.value=t.anisotropyMap,n(t.anisotropyMap,e.anisotropyMapTransform))),e.specularIntensity.value=t.specularIntensity,e.specularColor.value.copy(t.specularColor),t.specularColorMap&&(e.specularColorMap.value=t.specularColorMap,n(t.specularColorMap,e.specularColorMapTransform)),t.specularIntensityMap&&(e.specularIntensityMap.value=t.specularIntensityMap,n(t.specularIntensityMap,e.specularIntensityMapTransform))}function m(e,t){t.matcap&&(e.matcap.value=t.matcap)}function h(e,n){let r=t.get(n).light;e.referencePosition.value.setFromMatrixPosition(r.matrixWorld),e.nearDistance.value=r.shadow.camera.near,e.farDistance.value=r.shadow.camera.far}return{refreshFogUniforms:r,refreshMaterialUniforms:i}}function Df(e,t,n,r){let i={},a={},o=[],s=e.getParameter(e.MAX_UNIFORM_BUFFER_BINDINGS);function c(e,t){let n=t.program;r.uniformBlockBinding(e,n)}function l(e,n){let o=i[e.id];o===void 0&&(g(e),o=u(e),i[e.id]=o,e.addEventListener(`dispose`,v));let s=n.program;r.updateUBOMapping(e,s);let c=t.render.frame;a[e.id]!==c&&(f(e),a[e.id]=c)}function u(t){let n=d();t.__bindingPointIndex=n;let r=e.createBuffer(),i=t.__size,a=t.usage;return e.bindBuffer(e.UNIFORM_BUFFER,r),e.bufferData(e.UNIFORM_BUFFER,i,a),e.bindBuffer(e.UNIFORM_BUFFER,null),e.bindBufferBase(e.UNIFORM_BUFFER,n,r),r}function d(){for(let e=0;e<s;e++)if(o.indexOf(e)===-1)return o.push(e),e;return W(`WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.`),0}function f(t){let n=i[t.id],r=t.uniforms,a=t.__cache;e.bindBuffer(e.UNIFORM_BUFFER,n);for(let e=0,t=r.length;e<t;e++){let t=r[e];if(Array.isArray(t))for(let n=0,r=t.length;n<r;n++)p(t[n],e,n,a);else p(t,e,0,a)}e.bindBuffer(e.UNIFORM_BUFFER,null)}function p(t,n,r,i){if(h(t,n,r,i)===!0){let n=t.__offset,r=t.value;if(Array.isArray(r)){let e=0;for(let n=0;n<r.length;n++){let i=r[n],a=_(i);m(i,t.__data,e),typeof i!=`number`&&typeof i!=`boolean`&&!i.isMatrix3&&!ArrayBuffer.isView(i)&&(e+=a.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(r,t.__data,0);e.bufferSubData(e.UNIFORM_BUFFER,n,t.__data)}}function m(e,t,n){typeof e==`number`||typeof e==`boolean`?t[0]=e:e.isMatrix3?(t[0]=e.elements[0],t[1]=e.elements[1],t[2]=e.elements[2],t[3]=0,t[4]=e.elements[3],t[5]=e.elements[4],t[6]=e.elements[5],t[7]=0,t[8]=e.elements[6],t[9]=e.elements[7],t[10]=e.elements[8],t[11]=0):ArrayBuffer.isView(e)?t.set(new e.constructor(e.buffer,e.byteOffset,t.length)):e.toArray(t,n)}function h(e,t,n,r){let i=e.value,a=t+`_`+n;if(r[a]===void 0)return r[a]=typeof i==`number`||typeof i==`boolean`?i:ArrayBuffer.isView(i)?i.slice():i.clone(),!0;{let e=r[a];if(typeof i==`number`||typeof i==`boolean`){if(e!==i)return r[a]=i,!0}else if(ArrayBuffer.isView(i))return!0;else if(e.equals(i)===!1)return e.copy(i),!0}return!1}function g(e){let t=e.uniforms,n=0;for(let e=0,r=t.length;e<r;e++){let r=Array.isArray(t[e])?t[e]:[t[e]];for(let e=0,t=r.length;e<t;e++){let t=r[e],i=Array.isArray(t.value)?t.value:[t.value];for(let e=0,r=i.length;e<r;e++){let r=i[e],a=_(r),o=n%16,s=o%a.boundary,c=o+s;n+=s,c!==0&&16-c<a.storage&&(n+=16-c),t.__data=new Float32Array(a.storage/Float32Array.BYTES_PER_ELEMENT),t.__offset=n,n+=a.storage}}}let r=n%16;return r>0&&(n+=16-r),e.__size=n,e.__cache={},this}function _(e){let t={boundary:0,storage:0};return typeof e==`number`||typeof e==`boolean`?(t.boundary=4,t.storage=4):e.isVector2?(t.boundary=8,t.storage=8):e.isVector3||e.isColor?(t.boundary=16,t.storage=12):e.isVector4?(t.boundary=16,t.storage=16):e.isMatrix3?(t.boundary=48,t.storage=48):e.isMatrix4?(t.boundary=64,t.storage=64):e.isTexture?U(`WebGLRenderer: Texture samplers can not be part of an uniforms group.`):ArrayBuffer.isView(e)?(t.boundary=16,t.storage=e.byteLength):U(`WebGLRenderer: Unsupported uniform value type.`,e),t}function v(t){let n=t.target;n.removeEventListener(`dispose`,v);let r=o.indexOf(n.__bindingPointIndex);o.splice(r,1),e.deleteBuffer(i[n.id]),delete i[n.id],delete a[n.id]}function y(){for(let t in i)e.deleteBuffer(i[t]);o=[],i={},a={}}return{bind:c,update:l,dispose:y}}var Of=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),kf=null;function Af(){return kf===null&&(kf=new zo(Of,16,16,dn,Zt),kf.name=`DFG_LUT`,kf.minFilter=Vt,kf.magFilter=Vt,kf.wrapS=It,kf.wrapT=It,kf.generateMipmaps=!1,kf.needsUpdate=!0),kf}var jf=class{constructor(e={}){let{canvas:t=hr(),context:n=null,depth:r=!0,stencil:i=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l=`default`,failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Wt}=e;this.isWebGLRenderer=!0;let p;if(n!==null){if(typeof WebGLRenderingContext<`u`&&n instanceof WebGLRenderingContext)throw Error(`THREE.WebGLRenderer: WebGL 1 is not supported since r163.`);p=n.getContextAttributes().alpha}else p=a;let m=f,h=new Set([pn,fn,un]),g=new Set([Wt,Yt,qt,en,Qt,$t]),_=new Uint32Array(4),v=new Int32Array(4),y=new K,b=null,x=null,S=[],C=[],w=null;this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=0,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let T=this,E=!1,D=null,O=null,k=null,A=null;this._outputColorSpace=ir;let j=0,ee=0,M=null,N=-1,P=null,te=new mi,ne=new mi,re=null,ie=new Y(0),F=0,I=t.width,L=t.height,ae=1,oe=null,se=null,ce=new mi(0,0,I,L),R=new mi(0,0,I,L),le=!1,ue=new ns,de=!1,fe=!1,pe=new yi,me=new K,he=new mi,ge={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},z=!1;function _e(){return M===null?ae:1}let B=n;function ve(e,n){return t.getContext(e,n)}try{let e={alpha:!0,depth:r,stencil:i,antialias:o,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:u};if(`setAttribute`in t&&t.setAttribute(`data-engine`,`three.js r185`),t.addEventListener(`webglcontextlost`,He,!1),t.addEventListener(`webglcontextrestored`,Ue,!1),t.addEventListener(`webglcontextcreationerror`,We,!1),B===null){let t=`webgl2`;if(B=ve(t,e),B===null)throw ve(t)?Error(`THREE.WebGLRenderer: Error creating WebGL context with your selected attributes.`):Error(`THREE.WebGLRenderer: Error creating WebGL context.`)}}catch(e){throw W(`WebGLRenderer: `+e.message),e}let ye,be,V,xe,H,Se,Ce,we,Te,Ee,De,Oe,ke,Ae,je,Me,Ne,Pe,Fe,Ie,Le,Re,ze;function Be(){ye=new Jl(B),ye.init(),Le=new yf(B,ye),be=new wl(B,ye,e,Le),V=new _f(B,ye),be.reversedDepthBuffer&&d&&V.buffers.depth.setReversed(!0),O=B.createFramebuffer(),k=B.createFramebuffer(),A=B.createFramebuffer(),xe=new Zl(B),H=new Xd,Se=new vf(B,ye,V,H,be,Le,xe),Ce=new ql(T),we=new hl(B),Re=new Sl(B,we),Te=new Yl(B,we,xe,Re),Ee=new $l(B,Te,we,Re,xe),Pe=new Ql(B,be,Se),je=new Tl(H),De=new Yd(T,Ce,ye,be,Re,je),Oe=new Ef(T,H),ke=new ef,Ae=new cf(ye),Ne=new xl(T,Ce,V,Ee,p,s),Me=new gf(T,Ee,be),ze=new Df(B,xe,be,V),Fe=new Cl(B,ye,xe),Ie=new Xl(B,ye,xe),xe.programs=De.programs,T.capabilities=be,T.extensions=ye,T.properties=H,T.renderLists=ke,T.shadowMap=Me,T.state=V,T.info=xe}Be(),m!==1009&&(w=new tu(m,t.width,t.height,o,r,i));let Ve=new Cf(T,B);this.xr=Ve,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){let e=ye.get(`WEBGL_lose_context`);e&&e.loseContext()},this.forceContextRestore=function(){let e=ye.get(`WEBGL_lose_context`);e&&e.restoreContext()},this.getPixelRatio=function(){return ae},this.setPixelRatio=function(e){e!==void 0&&(ae=e,this.setSize(I,L,!1))},this.getSize=function(e){return e.set(I,L)},this.setSize=function(e,n,r=!0){if(Ve.isPresenting){U(`WebGLRenderer: Can't change size while VR device is presenting.`);return}I=e,L=n,t.width=Math.floor(e*ae),t.height=Math.floor(n*ae),r===!0&&(t.style.width=e+`px`,t.style.height=n+`px`),w!==null&&w.setSize(t.width,t.height),this.setViewport(0,0,e,n)},this.getDrawingBufferSize=function(e){return e.set(I*ae,L*ae).floor()},this.setDrawingBufferSize=function(e,n,r){I=e,L=n,ae=r,t.width=Math.floor(e*r),t.height=Math.floor(n*r),this.setViewport(0,0,e,n)},this.setEffects=function(e){if(m===1009){W(`WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.`);return}if(e){for(let t=0;t<e.length;t++)if(e[t].isOutputPass===!0){U(`WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.`);break}}w.setEffects(e||[])},this.getCurrentViewport=function(e){return e.copy(te)},this.getViewport=function(e){return e.copy(ce)},this.setViewport=function(e,t,n,r){e.isVector4?ce.set(e.x,e.y,e.z,e.w):ce.set(e,t,n,r),V.viewport(te.copy(ce).multiplyScalar(ae).round())},this.getScissor=function(e){return e.copy(R)},this.setScissor=function(e,t,n,r){e.isVector4?R.set(e.x,e.y,e.z,e.w):R.set(e,t,n,r),V.scissor(ne.copy(R).multiplyScalar(ae).round())},this.getScissorTest=function(){return le},this.setScissorTest=function(e){V.setScissorTest(le=e)},this.setOpaqueSort=function(e){oe=e},this.setTransparentSort=function(e){se=e},this.getClearColor=function(e){return e.copy(Ne.getClearColor())},this.setClearColor=function(){Ne.setClearColor(...arguments)},this.getClearAlpha=function(){return Ne.getClearAlpha()},this.setClearAlpha=function(){Ne.setClearAlpha(...arguments)},this.clear=function(e=!0,t=!0,n=!0){let r=0;if(e){let e=!1;if(M!==null){let t=M.texture.format;e=h.has(t)}if(e){let e=M.texture.type,t=g.has(e),n=Ne.getClearColor(),r=Ne.getClearAlpha(),i=n.r,a=n.g,o=n.b;t?(_[0]=i,_[1]=a,_[2]=o,_[3]=r,B.clearBufferuiv(B.COLOR,0,_)):(v[0]=i,v[1]=a,v[2]=o,v[3]=r,B.clearBufferiv(B.COLOR,0,v))}else r|=B.COLOR_BUFFER_BIT}t&&(r|=B.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),n&&(r|=B.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),r!==0&&B.clear(r)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(e){e.setRenderer(this),D=e},this.dispose=function(){t.removeEventListener(`webglcontextlost`,He,!1),t.removeEventListener(`webglcontextrestored`,Ue,!1),t.removeEventListener(`webglcontextcreationerror`,We,!1),Ne.dispose(),ke.dispose(),Ae.dispose(),H.dispose(),Ce.dispose(),Ee.dispose(),Re.dispose(),ze.dispose(),De.dispose(),Ve.dispose(),Ve.removeEventListener(`sessionstart`,Ze),Ve.removeEventListener(`sessionend`,Qe),$e.stop()};function He(e){e.preventDefault(),_r(`WebGLRenderer: Context Lost.`),E=!0}function Ue(){_r(`WebGLRenderer: Context Restored.`),E=!1;let e=xe.autoReset,t=Me.enabled,n=Me.autoUpdate,r=Me.needsUpdate,i=Me.type;Be(),xe.autoReset=e,Me.enabled=t,Me.autoUpdate=n,Me.needsUpdate=r,Me.type=i}function We(e){W(`WebGLRenderer: A WebGL context could not be created. Reason: `,e.statusMessage)}function Ge(e){let t=e.target;t.removeEventListener(`dispose`,Ge),Ke(t)}function Ke(e){qe(e),H.remove(e)}function qe(e){let t=H.get(e).programs;t!==void 0&&(t.forEach(function(e){De.releaseProgram(e)}),e.isShaderMaterial&&De.releaseShaderCache(e))}this.renderBufferDirect=function(e,t,n,r,i,a){t===null&&(t=ge);let o=i.isMesh&&i.matrixWorld.determinantAffine()<0,s=lt(e,t,n,r,i);V.setMaterial(r,o);let c=n.index,l=1;if(r.wireframe===!0){if(c=Te.getWireframeAttribute(n),c===void 0)return;l=2}let u=n.drawRange,d=n.attributes.position,f=u.start*l,p=(u.start+u.count)*l;a!==null&&(f=Math.max(f,a.start*l),p=Math.min(p,(a.start+a.count)*l)),c===null?d!=null&&(f=Math.max(f,0),p=Math.min(p,d.count)):(f=Math.max(f,0),p=Math.min(p,c.count));let m=p-f;if(m<0||m===1/0)return;Re.setup(i,r,s,n,c);let h,g=Fe;if(c!==null&&(h=we.get(c),g=Ie,g.setIndex(h)),i.isMesh)r.wireframe===!0?(V.setLineWidth(r.wireframeLinewidth*_e()),g.setMode(B.LINES)):g.setMode(B.TRIANGLES);else if(i.isLine){let e=r.linewidth;e===void 0&&(e=1),V.setLineWidth(e*_e()),i.isLineSegments?g.setMode(B.LINES):i.isLineLoop?g.setMode(B.LINE_LOOP):g.setMode(B.LINE_STRIP)}else i.isPoints?g.setMode(B.POINTS):i.isSprite&&g.setMode(B.TRIANGLES);if(i.isBatchedMesh){if(ye.get(`WEBGL_multi_draw`))g.renderMultiDraw(i._multiDrawStarts,i._multiDrawCounts,i._multiDrawCount);else{let e=i._multiDrawStarts,t=i._multiDrawCounts,n=i._multiDrawCount,a=c?we.get(c).bytesPerElement:1,o=H.get(r).currentProgram.getUniforms();for(let r=0;r<n;r++)o.setValue(B,`_gl_DrawID`,r),g.render(e[r]/a,t[r])}}else if(i.isInstancedMesh)g.renderInstances(f,m,i.count);else if(n.isInstancedBufferGeometry){let e=n._maxInstanceCount===void 0?1/0:n._maxInstanceCount,t=Math.min(n.instanceCount,e);g.renderInstances(f,m,t)}else g.render(f,m)};function Je(e,t,n){e.transparent===!0&&e.side===2&&e.forceSinglePass===!1?(e.side=1,e.needsUpdate=!0,at(e,t,n),e.side=0,e.needsUpdate=!0,at(e,t,n),e.side=2):at(e,t,n)}this.compile=function(e,t,n=null){n===null&&(n=e),x=Ae.get(n),x.init(t),C.push(x),n.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),e!==n&&e.traverseVisible(function(e){e.isLight&&e.layers.test(t.layers)&&(x.pushLight(e),e.castShadow&&x.pushShadow(e))}),x.setupLights();let r=new Set;return e.traverse(function(e){if(!(e.isMesh||e.isPoints||e.isLine||e.isSprite))return;let t=e.material;if(t){if(Array.isArray(t))for(let i=0;i<t.length;i++){let a=t[i];Je(a,n,e),r.add(a)}else Je(t,n,e),r.add(t)}}),x=C.pop(),r},this.compileAsync=function(e,t,n=null){let r=this.compile(e,t,n);return new Promise(t=>{function n(){if(r.forEach(function(e){H.get(e).currentProgram.isReady()&&r.delete(e)}),r.size===0){t(e);return}setTimeout(n,10)}ye.get(`KHR_parallel_shader_compile`)===null?setTimeout(n,10):n()})};let Ye=null;function Xe(e){Ye&&Ye(e)}function Ze(){$e.stop()}function Qe(){$e.start()}let $e=new ml;$e.setAnimationLoop(Xe),typeof self<`u`&&$e.setContext(self),this.setAnimationLoop=function(e){Ye=e,Ve.setAnimationLoop(e),e===null?$e.stop():$e.start()},Ve.addEventListener(`sessionstart`,Ze),Ve.addEventListener(`sessionend`,Qe),this.render=function(e,t){if(t!==void 0&&t.isCamera!==!0){W(`WebGLRenderer.render: camera is not an instance of THREE.Camera.`);return}if(E===!0)return;D!==null&&D.renderStart(e,t);let n=Ve.enabled===!0&&Ve.isPresenting===!0,r=w!==null&&(M===null||n)&&w.begin(T,M);if(e.matrixWorldAutoUpdate===!0&&e.updateMatrixWorld(),t.parent===null&&t.matrixWorldAutoUpdate===!0&&t.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(w===null||w.isCompositing()===!1)&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(t),t=Ve.getCamera()),e.isScene===!0&&e.onBeforeRender(T,e,t,M),x=Ae.get(e,C.length),x.init(t),x.state.textureUnits=Se.getTextureUnits(),C.push(x),pe.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),ue.setFromProjectionMatrix(pe,dr,t.reversedDepth),fe=this.localClippingEnabled,de=je.init(this.clippingPlanes,fe),b=ke.get(e,S.length),b.init(),S.push(b),Ve.enabled===!0&&Ve.isPresenting===!0){let e=T.xr.getDepthSensingMesh();e!==null&&et(e,t,-1/0,T.sortObjects)}et(e,t,0,T.sortObjects),b.finish(),T.sortObjects===!0&&b.sort(oe,se,t.reversedDepth),z=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,z&&Ne.addToRenderList(b,e),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),de===!0&&je.beginShadows();let i=x.state.shadowsArray;if(Me.render(i,e,t),de===!0&&je.endShadows(),(r&&w.hasRenderPass())===!1){let n=b.opaque,r=b.transmissive;if(x.setupLights(),t.isArrayCamera){let i=t.cameras;if(r.length>0)for(let t=0,a=i.length;t<a;t++){let a=i[t];nt(n,r,e,a)}z&&Ne.render(e);for(let t=0,n=i.length;t<n;t++){let n=i[t];tt(b,e,n,n.viewport)}}else r.length>0&&nt(n,r,e,t),z&&Ne.render(e),tt(b,e,t)}M!==null&&ee===0&&(Se.updateMultisampleRenderTarget(M),Se.updateRenderTargetMipmap(M)),r&&w.end(T),e.isScene===!0&&e.onAfterRender(T,e,t),Re.resetDefaultState(),N=-1,P=null,C.pop(),C.length>0?(x=C[C.length-1],Se.setTextureUnits(x.state.textureUnits),de===!0&&je.setGlobalState(T.clippingPlanes,x.state.camera)):x=null,S.pop(),b=S.length>0?S[S.length-1]:null,D!==null&&D.renderEnd()};function et(e,t,n,r){if(e.visible===!1)return;if(e.layers.test(t.layers)){if(e.isGroup)n=e.renderOrder;else if(e.isLOD)e.autoUpdate===!0&&e.update(t);else if(e.isLightProbeGrid)x.pushLightProbeGrid(e);else if(e.isLight)x.pushLight(e),e.castShadow&&x.pushShadow(e);else if(e.isSprite){if(!e.frustumCulled||ue.intersectsSprite(e)){r&&he.setFromMatrixPosition(e.matrixWorld).applyMatrix4(pe);let t=Ee.update(e),i=e.material;i.visible&&b.push(e,t,i,n,he.z,null)}}else if((e.isMesh||e.isLine||e.isPoints)&&(!e.frustumCulled||ue.intersectsObject(e))){let t=Ee.update(e),i=e.material;if(r&&(e.boundingSphere===void 0?(t.boundingSphere===null&&t.computeBoundingSphere(),he.copy(t.boundingSphere.center)):(e.boundingSphere===null&&e.computeBoundingSphere(),he.copy(e.boundingSphere.center)),he.applyMatrix4(e.matrixWorld).applyMatrix4(pe)),Array.isArray(i)){let r=t.groups;for(let a=0,o=r.length;a<o;a++){let o=r[a],s=i[o.materialIndex];s&&s.visible&&b.push(e,t,s,n,he.z,o)}}else i.visible&&b.push(e,t,i,n,he.z,null)}}let i=e.children;for(let e=0,a=i.length;e<a;e++)et(i[e],t,n,r)}function tt(e,t,n,r){let{opaque:i,transmissive:a,transparent:o}=e;x.setupLightsView(n),de===!0&&je.setGlobalState(T.clippingPlanes,n),r&&V.viewport(te.copy(r)),i.length>0&&rt(i,t,n),a.length>0&&rt(a,t,n),o.length>0&&rt(o,t,n),V.buffers.depth.setTest(!0),V.buffers.depth.setMask(!0),V.buffers.color.setMask(!0),V.setPolygonOffset(!1)}function nt(e,t,n,r){if((n.isScene===!0?n.overrideMaterial:null)!==null)return;if(x.state.transmissionRenderTarget[r.id]===void 0){let e=ye.has(`EXT_color_buffer_half_float`)||ye.has(`EXT_color_buffer_float`);x.state.transmissionRenderTarget[r.id]=new gi(1,1,{generateMipmaps:!0,type:e?Zt:Wt,minFilter:Ut,samples:Math.max(4,be.samples),stencilBuffer:i,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:ri.workingColorSpace})}let a=x.state.transmissionRenderTarget[r.id],o=r.viewport||te;a.setSize(o.z*T.transmissionResolutionScale,o.w*T.transmissionResolutionScale);let s=T.getRenderTarget(),c=T.getActiveCubeFace(),l=T.getActiveMipmapLevel();T.setRenderTarget(a),T.getClearColor(ie),F=T.getClearAlpha(),F<1&&T.setClearColor(16777215,.5),T.clear(),z&&Ne.render(n);let u=T.toneMapping;T.toneMapping=0;let d=r.viewport;if(r.viewport!==void 0&&(r.viewport=void 0),x.setupLightsView(r),de===!0&&je.setGlobalState(T.clippingPlanes,r),rt(e,n,r),Se.updateMultisampleRenderTarget(a),Se.updateRenderTargetMipmap(a),ye.has(`WEBGL_multisampled_render_to_texture`)===!1){let e=!1;for(let i=0,a=t.length;i<a;i++){let{object:a,geometry:o,material:s,group:c}=t[i];if(s.side===2&&a.layers.test(r.layers)){let t=s.side;s.side=1,s.needsUpdate=!0,it(a,n,r,o,s,c),s.side=t,s.needsUpdate=!0,e=!0}}e===!0&&(Se.updateMultisampleRenderTarget(a),Se.updateRenderTargetMipmap(a))}T.setRenderTarget(s,c,l),T.setClearColor(ie,F),d!==void 0&&(r.viewport=d),T.toneMapping=u}function rt(e,t,n){let r=t.isScene===!0?t.overrideMaterial:null;for(let i=0,a=e.length;i<a;i++){let a=e[i],{object:o,geometry:s,group:c}=a,l=a.material;l.allowOverride===!0&&r!==null&&(l=r),o.layers.test(n.layers)&&it(o,t,n,s,l,c)}}function it(e,t,n,r,i,a){e.onBeforeRender(T,t,n,r,i,a),e.modelViewMatrix.multiplyMatrices(n.matrixWorldInverse,e.matrixWorld),e.normalMatrix.getNormalMatrix(e.modelViewMatrix),i.onBeforeRender(T,t,n,r,e,a),i.transparent===!0&&i.side===2&&i.forceSinglePass===!1?(i.side=1,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=0,i.needsUpdate=!0,T.renderBufferDirect(n,t,r,i,e,a),i.side=2):T.renderBufferDirect(n,t,r,i,e,a),e.onAfterRender(T,t,n,r,i,a)}function at(e,t,n){t.isScene!==!0&&(t=ge);let r=H.get(e),i=x.state.lights,a=x.state.shadowsArray,o=i.state.version,s=De.getParameters(e,i.state,a,t,n,x.state.lightProbeGridArray),c=De.getProgramCacheKey(s),l=r.programs;r.environment=e.isMeshStandardMaterial||e.isMeshLambertMaterial||e.isMeshPhongMaterial?t.environment:null,r.fog=t.fog;let u=e.isMeshStandardMaterial||e.isMeshLambertMaterial&&!e.envMap||e.isMeshPhongMaterial&&!e.envMap;r.envMap=Ce.get(e.envMap||r.environment,u),r.envMapRotation=r.environment!==null&&e.envMap===null?t.environmentRotation:e.envMapRotation,l===void 0&&(e.addEventListener(`dispose`,Ge),l=new Map,r.programs=l);let d=l.get(c);if(d!==void 0){if(r.currentProgram===d&&r.lightsStateVersion===o)return st(e,s),d}else s.uniforms=De.getUniforms(e),D!==null&&e.isNodeMaterial&&D.build(e,n,s),e.onBeforeCompile(s,T),d=De.acquireProgram(s,c),l.set(c,d),r.uniforms=s.uniforms;let f=r.uniforms;return(!e.isShaderMaterial&&!e.isRawShaderMaterial||e.clipping===!0)&&(f.clippingPlanes=je.uniform),st(e,s),r.needsLights=dt(e),r.lightsStateVersion=o,r.needsLights&&(f.ambientLightColor.value=i.state.ambient,f.lightProbe.value=i.state.probe,f.directionalLights.value=i.state.directional,f.directionalLightShadows.value=i.state.directionalShadow,f.spotLights.value=i.state.spot,f.spotLightShadows.value=i.state.spotShadow,f.rectAreaLights.value=i.state.rectArea,f.ltc_1.value=i.state.rectAreaLTC1,f.ltc_2.value=i.state.rectAreaLTC2,f.pointLights.value=i.state.point,f.pointLightShadows.value=i.state.pointShadow,f.hemisphereLights.value=i.state.hemi,f.directionalShadowMatrix.value=i.state.directionalShadowMatrix,f.spotLightMatrix.value=i.state.spotLightMatrix,f.spotLightMap.value=i.state.spotLightMap,f.pointShadowMatrix.value=i.state.pointShadowMatrix),r.lightProbeGrid=x.state.lightProbeGridArray.length>0,r.currentProgram=d,r.uniformsList=null,d}function ot(e){if(e.uniformsList===null){let t=e.currentProgram.getUniforms();e.uniformsList=cd.seqWithValue(t.seq,e.uniforms)}return e.uniformsList}function st(e,t){let n=H.get(e);n.outputColorSpace=t.outputColorSpace,n.batching=t.batching,n.batchingColor=t.batchingColor,n.instancing=t.instancing,n.instancingColor=t.instancingColor,n.instancingMorph=t.instancingMorph,n.skinning=t.skinning,n.morphTargets=t.morphTargets,n.morphNormals=t.morphNormals,n.morphColors=t.morphColors,n.morphTargetsCount=t.morphTargetsCount,n.numClippingPlanes=t.numClippingPlanes,n.numIntersection=t.numClipIntersection,n.vertexAlphas=t.vertexAlphas,n.vertexTangents=t.vertexTangents,n.toneMapping=t.toneMapping}function ct(e,t){if(e.length===0)return null;if(e.length===1)return e[0].texture===null?null:e[0];y.setFromMatrixPosition(t.matrixWorld);for(let t=0,n=e.length;t<n;t++){let n=e[t];if(n.texture!==null&&n.boundingBox.containsPoint(y))return n}return null}function lt(e,t,n,r,i){t.isScene!==!0&&(t=ge),Se.resetTextureUnits();let a=t.fog,o=r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial?t.environment:null,s=M===null?T.outputColorSpace:M.isXRRenderTarget===!0?M.texture.colorSpace:ri.workingColorSpace,c=r.isMeshStandardMaterial||r.isMeshLambertMaterial&&!r.envMap||r.isMeshPhongMaterial&&!r.envMap,l=Ce.get(r.envMap||o,c),u=r.vertexColors===!0&&!!n.attributes.color&&n.attributes.color.itemSize===4,d=!!n.attributes.tangent&&(!!r.normalMap||r.anisotropy>0),f=!!n.morphAttributes.position,p=!!n.morphAttributes.normal,m=!!n.morphAttributes.color,h=0;r.toneMapped&&(M===null||M.isXRRenderTarget===!0)&&(h=T.toneMapping);let g=n.morphAttributes.position||n.morphAttributes.normal||n.morphAttributes.color,_=g===void 0?0:g.length,v=H.get(r),y=x.state.lights;if(de===!0&&(fe===!0||e!==P)){let t=e===P&&r.id===N;je.setState(r,e,t)}let b=!1;r.version===v.__version?v.needsLights&&v.lightsStateVersion!==y.state.version?b=!0:v.outputColorSpace===s?i.isBatchedMesh&&v.batching===!1||!i.isBatchedMesh&&v.batching===!0||i.isBatchedMesh&&v.batchingColor===!0&&i.colorTexture===null||i.isBatchedMesh&&v.batchingColor===!1&&i.colorTexture!==null||i.isInstancedMesh&&v.instancing===!1||!i.isInstancedMesh&&v.instancing===!0||i.isSkinnedMesh&&v.skinning===!1||!i.isSkinnedMesh&&v.skinning===!0||i.isInstancedMesh&&v.instancingColor===!0&&i.instanceColor===null||i.isInstancedMesh&&v.instancingColor===!1&&i.instanceColor!==null||i.isInstancedMesh&&v.instancingMorph===!0&&i.morphTexture===null||i.isInstancedMesh&&v.instancingMorph===!1&&i.morphTexture!==null?b=!0:v.envMap===l?r.fog===!0&&v.fog!==a||v.numClippingPlanes!==void 0&&(v.numClippingPlanes!==je.numPlanes||v.numIntersection!==je.numIntersection)?b=!0:v.vertexAlphas===u&&v.vertexTangents===d&&v.morphTargets===f&&v.morphNormals===p&&v.morphColors===m&&v.toneMapping===h&&v.morphTargetsCount===_?!!v.lightProbeGrid!=x.state.lightProbeGridArray.length>0&&(b=!0):b=!0:b=!0:b=!0:(b=!0,v.__version=r.version);let S=v.currentProgram;b===!0&&(S=at(r,t,i),D&&r.isNodeMaterial&&D.onUpdateProgram(r,S,v));let C=!1,w=!1,E=!1,O=S.getUniforms(),k=v.uniforms;if(V.useProgram(S.program)&&(C=!0,w=!0,E=!0),r.id!==N&&(N=r.id,w=!0),v.needsLights){let e=ct(x.state.lightProbeGridArray,i);v.lightProbeGrid!==e&&(v.lightProbeGrid=e,w=!0)}if(C||P!==e){V.buffers.depth.getReversed()&&e.reversedDepth!==!0&&(e._reversedDepth=!0,e.updateProjectionMatrix()),O.setValue(B,`projectionMatrix`,e.projectionMatrix),O.setValue(B,`viewMatrix`,e.matrixWorldInverse);let t=O.map.cameraPosition;t!==void 0&&t.setValue(B,me.setFromMatrixPosition(e.matrixWorld)),be.logarithmicDepthBuffer&&O.setValue(B,`logDepthBufFC`,2/(Math.log(e.far+1)/Math.LN2)),(r.isMeshPhongMaterial||r.isMeshToonMaterial||r.isMeshLambertMaterial||r.isMeshBasicMaterial||r.isMeshStandardMaterial||r.isShaderMaterial)&&O.setValue(B,`isOrthographic`,e.isOrthographicCamera===!0),P!==e&&(P=e,w=!0,E=!0)}if(v.needsLights&&(y.state.directionalShadowMap.length>0&&O.setValue(B,`directionalShadowMap`,y.state.directionalShadowMap,Se),y.state.spotShadowMap.length>0&&O.setValue(B,`spotShadowMap`,y.state.spotShadowMap,Se),y.state.pointShadowMap.length>0&&O.setValue(B,`pointShadowMap`,y.state.pointShadowMap,Se)),i.isSkinnedMesh){O.setOptional(B,i,`bindMatrix`),O.setOptional(B,i,`bindMatrixInverse`);let e=i.skeleton;e&&(e.boneTexture===null&&e.computeBoneTexture(),O.setValue(B,`boneTexture`,e.boneTexture,Se))}i.isBatchedMesh&&(O.setOptional(B,i,`batchingTexture`),O.setValue(B,`batchingTexture`,i._matricesTexture,Se),O.setOptional(B,i,`batchingIdTexture`),O.setValue(B,`batchingIdTexture`,i._indirectTexture,Se),O.setOptional(B,i,`batchingColorTexture`),i._colorsTexture!==null&&O.setValue(B,`batchingColorTexture`,i._colorsTexture,Se));let A=n.morphAttributes;if((A.position!==void 0||A.normal!==void 0||A.color!==void 0)&&Pe.update(i,n,S),(w||v.receiveShadow!==i.receiveShadow)&&(v.receiveShadow=i.receiveShadow,O.setValue(B,`receiveShadow`,i.receiveShadow)),(r.isMeshStandardMaterial||r.isMeshLambertMaterial||r.isMeshPhongMaterial)&&r.envMap===null&&t.environment!==null&&(k.envMapIntensity.value=t.environmentIntensity),k.dfgLUT!==void 0&&(k.dfgLUT.value=Af()),w){if(O.setValue(B,`toneMappingExposure`,T.toneMappingExposure),v.needsLights&&ut(k,E),a&&r.fog===!0&&Oe.refreshFogUniforms(k,a),Oe.refreshMaterialUniforms(k,r,ae,L,x.state.transmissionRenderTarget[e.id]),v.needsLights&&v.lightProbeGrid){let e=v.lightProbeGrid;k.probesSH.value=e.texture,k.probesMin.value.copy(e.boundingBox.min),k.probesMax.value.copy(e.boundingBox.max),k.probesResolution.value.copy(e.resolution)}cd.upload(B,ot(v),k,Se)}if(r.isShaderMaterial&&r.uniformsNeedUpdate===!0&&(cd.upload(B,ot(v),k,Se),r.uniformsNeedUpdate=!1),r.isSpriteMaterial&&O.setValue(B,`center`,i.center),O.setValue(B,`modelViewMatrix`,i.modelViewMatrix),O.setValue(B,`normalMatrix`,i.normalMatrix),O.setValue(B,`modelMatrix`,i.matrixWorld),r.uniformsGroups!==void 0){let e=r.uniformsGroups;for(let t=0,n=e.length;t<n;t++){let n=e[t];ze.update(n,S),ze.bind(n,S)}}return S}function ut(e,t){e.ambientLightColor.needsUpdate=t,e.lightProbe.needsUpdate=t,e.directionalLights.needsUpdate=t,e.directionalLightShadows.needsUpdate=t,e.pointLights.needsUpdate=t,e.pointLightShadows.needsUpdate=t,e.spotLights.needsUpdate=t,e.spotLightShadows.needsUpdate=t,e.rectAreaLights.needsUpdate=t,e.hemisphereLights.needsUpdate=t}function dt(e){return e.isMeshLambertMaterial||e.isMeshToonMaterial||e.isMeshPhongMaterial||e.isMeshStandardMaterial||e.isShadowMaterial||e.isShaderMaterial&&e.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return ee},this.getRenderTarget=function(){return M},this.setRenderTargetTextures=function(e,t,n){let r=H.get(e);r.__autoAllocateDepthBuffer=e.resolveDepthBuffer===!1,r.__autoAllocateDepthBuffer===!1&&(r.__useRenderToTexture=!1),H.get(e.texture).__webglTexture=t,H.get(e.depthTexture).__webglTexture=r.__autoAllocateDepthBuffer?void 0:n,r.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(e,t){let n=H.get(e);n.__webglFramebuffer=t,n.__useDefaultFramebuffer=t===void 0},this.setRenderTarget=function(e,t=0,n=0){M=e,j=t,ee=n;let r=null,i=!1,a=!1;if(e){let o=H.get(e);if(o.__useDefaultFramebuffer!==void 0){V.bindFramebuffer(B.FRAMEBUFFER,o.__webglFramebuffer),te.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest,V.viewport(te),V.scissor(ne),V.setScissorTest(re),N=-1;return}if(o.__webglFramebuffer===void 0)Se.setupRenderTarget(e);else if(o.__hasExternalTextures)Se.rebindTextures(e,H.get(e.texture).__webglTexture,H.get(e.depthTexture).__webglTexture);else if(e.depthBuffer){let t=e.depthTexture;if(o.__boundDepthTexture!==t){if(t!==null&&H.has(t)&&(e.width!==t.image.width||e.height!==t.image.height))throw Error(`THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.`);Se.setupDepthRenderbuffer(e)}}let s=e.texture;(s.isData3DTexture||s.isDataArrayTexture||s.isCompressedArrayTexture)&&(a=!0);let c=H.get(e).__webglFramebuffer;e.isWebGLCubeRenderTarget?(r=Array.isArray(c[t])?c[t][n]:c[t],i=!0):r=e.samples>0&&Se.useMultisampledRTT(e)===!1?H.get(e).__webglMultisampledFramebuffer:Array.isArray(c)?c[n]:c,te.copy(e.viewport),ne.copy(e.scissor),re=e.scissorTest}else te.copy(ce).multiplyScalar(ae).floor(),ne.copy(R).multiplyScalar(ae).floor(),re=le;if(n!==0&&(r=O),V.bindFramebuffer(B.FRAMEBUFFER,r)&&V.drawBuffers(e,r),V.viewport(te),V.scissor(ne),V.setScissorTest(re),i){let r=H.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_CUBE_MAP_POSITIVE_X+t,r.__webglTexture,n)}else if(a){let r=t;for(let t=0;t<e.textures.length;t++){let i=H.get(e.textures[t]);B.framebufferTextureLayer(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0+t,i.__webglTexture,n,r)}}else if(e!==null&&n!==0){let t=H.get(e.texture);B.framebufferTexture2D(B.FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,t.__webglTexture,n)}N=-1},this.readRenderTargetPixels=function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);return}let c=H.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){V.bindFramebuffer(B.FRAMEBUFFER,c);try{let o=e.textures[s],c=o.format,l=o.type;if(e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s),!be.textureFormatReadable(c)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.`);return}if(!be.textureTypeReadable(l)){W(`WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.`);return}t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i&&B.readPixels(t,n,r,i,Le.convert(c),Le.convert(l),a)}finally{let e=M===null?null:H.get(M).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,e)}}},this.readRenderTargetPixelsAsync=async function(e,t,n,r,i,a,o,s=0){if(!(e&&e.isWebGLRenderTarget))throw Error(`THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.`);let c=H.get(e).__webglFramebuffer;if(e.isWebGLCubeRenderTarget&&o!==void 0&&(c=c[o]),c){if(t>=0&&t<=e.width-r&&n>=0&&n<=e.height-i){V.bindFramebuffer(B.FRAMEBUFFER,c);let o=e.textures[s],l=o.format,u=o.type;if(e.textures.length>1&&B.readBuffer(B.COLOR_ATTACHMENT0+s),!be.textureFormatReadable(l))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.`);if(!be.textureTypeReadable(u))throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.`);let d=B.createBuffer();B.bindBuffer(B.PIXEL_PACK_BUFFER,d),B.bufferData(B.PIXEL_PACK_BUFFER,a.byteLength,B.STREAM_READ),B.readPixels(t,n,r,i,Le.convert(l),Le.convert(u),0);let f=M===null?null:H.get(M).__webglFramebuffer;V.bindFramebuffer(B.FRAMEBUFFER,f);let p=B.fenceSync(B.SYNC_GPU_COMMANDS_COMPLETE,0);return B.flush(),await br(B,p,4),B.bindBuffer(B.PIXEL_PACK_BUFFER,d),B.getBufferSubData(B.PIXEL_PACK_BUFFER,0,a),B.deleteBuffer(d),B.deleteSync(p),a}throw Error(`THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.`)}},this.copyFramebufferToTexture=function(e,t=null,n=0){let r=2**-n,i=Math.floor(e.image.width*r),a=Math.floor(e.image.height*r),o=t===null?0:t.x,s=t===null?0:t.y;Se.setTexture2D(e,0),B.copyTexSubImage2D(B.TEXTURE_2D,n,0,0,o,s,i,a),V.unbindTexture()},this.copyTextureToTexture=function(e,t,n=null,r=null,i=0,a=0){let o,s,c,l,u,d,f,p,m,h=e.isCompressedTexture?e.mipmaps[a]:e.image;if(n!==null)o=n.max.x-n.min.x,s=n.max.y-n.min.y,c=n.isBox3?n.max.z-n.min.z:1,l=n.min.x,u=n.min.y,d=n.isBox3?n.min.z:0;else{let t=2**-i;o=Math.floor(h.width*t),s=Math.floor(h.height*t),c=e.isDataArrayTexture?h.depth:e.isData3DTexture?Math.floor(h.depth*t):1,l=0,u=0,d=0}r===null?(f=0,p=0,m=0):(f=r.x,p=r.y,m=r.z);let g=Le.convert(t.format),_=Le.convert(t.type),v;t.isData3DTexture?(Se.setTexture3D(t,0),v=B.TEXTURE_3D):t.isDataArrayTexture||t.isCompressedArrayTexture?(Se.setTexture2DArray(t,0),v=B.TEXTURE_2D_ARRAY):(Se.setTexture2D(t,0),v=B.TEXTURE_2D),V.activeTexture(B.TEXTURE0),V.pixelStorei(B.UNPACK_FLIP_Y_WEBGL,t.flipY),V.pixelStorei(B.UNPACK_PREMULTIPLY_ALPHA_WEBGL,t.premultiplyAlpha),V.pixelStorei(B.UNPACK_ALIGNMENT,t.unpackAlignment);let y=V.getParameter(B.UNPACK_ROW_LENGTH),b=V.getParameter(B.UNPACK_IMAGE_HEIGHT),x=V.getParameter(B.UNPACK_SKIP_PIXELS),S=V.getParameter(B.UNPACK_SKIP_ROWS),C=V.getParameter(B.UNPACK_SKIP_IMAGES);V.pixelStorei(B.UNPACK_ROW_LENGTH,h.width),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,h.height),V.pixelStorei(B.UNPACK_SKIP_PIXELS,l),V.pixelStorei(B.UNPACK_SKIP_ROWS,u),V.pixelStorei(B.UNPACK_SKIP_IMAGES,d);let w=e.isDataArrayTexture||e.isData3DTexture,T=t.isDataArrayTexture||t.isData3DTexture;if(e.isDepthTexture){let n=H.get(e),r=H.get(t),h=H.get(n.__renderTarget),g=H.get(r.__renderTarget);V.bindFramebuffer(B.READ_FRAMEBUFFER,h.__webglFramebuffer),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,g.__webglFramebuffer);for(let n=0;n<c;n++)w&&(B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,H.get(e).__webglTexture,i,d+n),B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,H.get(t).__webglTexture,a,m+n)),B.blitFramebuffer(l,u,o,s,f,p,o,s,B.DEPTH_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else if(i!==0||e.isRenderTargetTexture||H.has(e)){let n=H.get(e),r=H.get(t);V.bindFramebuffer(B.READ_FRAMEBUFFER,k),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,A);for(let e=0;e<c;e++)w?B.framebufferTextureLayer(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,n.__webglTexture,i,d+e):B.framebufferTexture2D(B.READ_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,n.__webglTexture,i),T?B.framebufferTextureLayer(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,r.__webglTexture,a,m+e):B.framebufferTexture2D(B.DRAW_FRAMEBUFFER,B.COLOR_ATTACHMENT0,B.TEXTURE_2D,r.__webglTexture,a),i===0?T?B.copyTexSubImage3D(v,a,f,p,m+e,l,u,o,s):B.copyTexSubImage2D(v,a,f,p,l,u,o,s):B.blitFramebuffer(l,u,o,s,f,p,o,s,B.COLOR_BUFFER_BIT,B.NEAREST);V.bindFramebuffer(B.READ_FRAMEBUFFER,null),V.bindFramebuffer(B.DRAW_FRAMEBUFFER,null)}else T?e.isDataTexture||e.isData3DTexture?B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h.data):t.isCompressedArrayTexture?B.compressedTexSubImage3D(v,a,f,p,m,o,s,c,g,h.data):B.texSubImage3D(v,a,f,p,m,o,s,c,g,_,h):e.isDataTexture?B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h.data):e.isCompressedTexture?B.compressedTexSubImage2D(B.TEXTURE_2D,a,f,p,h.width,h.height,g,h.data):B.texSubImage2D(B.TEXTURE_2D,a,f,p,o,s,g,_,h);V.pixelStorei(B.UNPACK_ROW_LENGTH,y),V.pixelStorei(B.UNPACK_IMAGE_HEIGHT,b),V.pixelStorei(B.UNPACK_SKIP_PIXELS,x),V.pixelStorei(B.UNPACK_SKIP_ROWS,S),V.pixelStorei(B.UNPACK_SKIP_IMAGES,C),a===0&&t.generateMipmaps&&B.generateMipmap(v),V.unbindTexture()},this.initRenderTarget=function(e){H.get(e).__webglFramebuffer===void 0&&Se.setupRenderTarget(e)},this.initTexture=function(e){e.isCubeTexture?Se.setTextureCube(e,0):e.isData3DTexture?Se.setTexture3D(e,0):e.isDataArrayTexture||e.isCompressedArrayTexture?Se.setTexture2DArray(e,0):Se.setTexture2D(e,0),V.unbindTexture()},this.resetState=function(){j=0,ee=0,M=null,V.reset(),Re.reset()},typeof __THREE_DEVTOOLS__<`u`&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent(`observe`,{detail:this}))}get coordinateSystem(){return dr}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ri._getDrawingBufferColorSpace(e),t.unpackColorSpace=ri._getUnpackColorSpace()}};function Mf(e,t=!1){let n=e[0].index!==null,r=new Set(Object.keys(e[0].attributes)),i=new Set(Object.keys(e[0].morphAttributes)),a={},o={},s=e[0].morphTargetsRelative,c=new Ja,l=0;for(let u=0;u<e.length;++u){let d=e[u],f=0;if(n!==(d.index!==null))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them.`),null;for(let e in d.attributes){if(!r.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. All geometries must have compatible attributes; make sure "`+e+`" attribute exists among all geometries, or in none of them.`),null;a[e]===void 0&&(a[e]=[]),a[e].push(d.attributes[e]),f++}if(f!==r.size)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. Make sure all geometries have the same number of attributes.`),null;if(s!==d.morphTargetsRelative)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. .morphTargetsRelative must be consistent throughout all geometries.`),null;for(let e in d.morphAttributes){if(!i.has(e))return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`.  .morphAttributes must be consistent throughout all geometries.`),null;o[e]===void 0&&(o[e]=[]),o[e].push(d.morphAttributes[e])}if(t){let e;if(n)e=d.index.count;else if(d.attributes.position!==void 0)e=d.attributes.position.count;else return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index `+u+`. The geometry must have either an index or a position attribute`),null;c.addGroup(l,e,u),l+=e}}if(n){let t=0,n=[];for(let r=0;r<e.length;++r){let i=e[r].index;for(let e=0;e<i.count;++e)n.push(i.getX(e)+t);t+=e[r].attributes.position.count}c.setIndex(n)}for(let e in a){let t=Nf(a[e]);if(!t)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` attribute.`),null;c.setAttribute(e,t)}for(let e in o){let t=o[e][0].length;if(t!==0){c.morphAttributes=c.morphAttributes||{},c.morphAttributes[e]=[];for(let n=0;n<t;++n){let t=[];for(let r=0;r<o[e].length;++r)t.push(o[e][r][n]);let r=Nf(t);if(!r)return console.error(`THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the `+e+` morphAttribute.`),null;c.morphAttributes[e].push(r)}}}return c}function Nf(e){let t,n,r,i=-1,a=0;for(let o=0;o<e.length;++o){let s=e[o];if(t===void 0&&(t=s.array.constructor),t!==s.array.constructor)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes.`),null;if(n===void 0&&(n=s.itemSize),n!==s.itemSize)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes.`),null;if(r===void 0&&(r=s.normalized),r!==s.normalized)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes.`),null;if(i===-1&&(i=s.gpuType),i!==s.gpuType)return console.error(`THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes.`),null;a+=s.count*n}let o=new t(a),s=new Na(o,n,r),c=0;for(let t=0;t<e.length;++t){let r=e[t];if(r.isInterleavedBufferAttribute){let e=c/n;for(let t=0,i=r.count;t<i;t++)for(let i=0;i<n;i++){let n=r.getComponent(t,i);s.setComponent(t+e,i,n)}}else o.set(r.array,c);c+=r.count*n}return i!==void 0&&(s.gpuType=i),s}var Pf=new K;function Ff(e,t,n,r,i,a){let o=2*Math.PI*i/4,s=Math.max(a-2*i,0),c=Math.PI/4;Pf.copy(t),Pf[r]=0,Pf.normalize();let l=.5*o/(o+s),u=1-Pf.angleTo(e)/c;return Math.sign(Pf[n])===1?u*l:s/(o+s)+l+l*(1-u)}var If=class e extends cs{constructor(e=1,t=1,n=1,r=2,i=.1){let a=r*2+1;if(i=Math.min(e/2,t/2,n/2,i),super(1,1,1,a,a,a),this.type=`RoundedBoxGeometry`,this.parameters={width:e,height:t,depth:n,segments:r,radius:i},a===1)return;let o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;let s=new K,c=new K,l=new K(e,t,n).divideScalar(2).subScalar(i),u=this.attributes.position.array,d=this.attributes.normal.array,f=this.attributes.uv.array,p=u.length/6,m=new K,h=.5/a;for(let r=0,a=0;r<u.length;r+=3,a+=2)switch(s.fromArray(u,r),c.copy(s),c.x-=Math.sign(c.x)*h,c.y-=Math.sign(c.y)*h,c.z-=Math.sign(c.z)*h,c.normalize(),u[r+0]=l.x*Math.sign(s.x)+c.x*i,u[r+1]=l.y*Math.sign(s.y)+c.y*i,u[r+2]=l.z*Math.sign(s.z)+c.z*i,d[r+0]=c.x,d[r+1]=c.y,d[r+2]=c.z,Math.floor(r/p)){case 0:m.set(1,0,0),f[a+0]=Ff(m,c,`z`,`y`,i,n),f[a+1]=1-Ff(m,c,`y`,`z`,i,t);break;case 1:m.set(-1,0,0),f[a+0]=1-Ff(m,c,`z`,`y`,i,n),f[a+1]=1-Ff(m,c,`y`,`z`,i,t);break;case 2:m.set(0,1,0),f[a+0]=1-Ff(m,c,`x`,`z`,i,e),f[a+1]=Ff(m,c,`z`,`x`,i,n);break;case 3:m.set(0,-1,0),f[a+0]=1-Ff(m,c,`x`,`z`,i,e),f[a+1]=1-Ff(m,c,`z`,`x`,i,n);break;case 4:m.set(0,0,1),f[a+0]=1-Ff(m,c,`x`,`y`,i,e),f[a+1]=1-Ff(m,c,`y`,`x`,i,t);break;case 5:m.set(0,0,-1),f[a+0]=Ff(m,c,`x`,`y`,i,e),f[a+1]=1-Ff(m,c,`y`,`x`,i,t)}}static fromJSON(t){return new e(t.width,t.height,t.depth,t.segments,t.radius)}},Lf=new Gs(1,24,16),Rf=new If(1,1,1,4,.16),zf=new Gs(1,24,12,0,Math.PI*2,0,Math.PI*.4),Bf=new Float32Array(Lf.attributes.position.count*3);for(let e=0;e<Lf.attributes.position.count;e++){let t=.84+.16*(Lf.attributes.position.getY(e)+1)/2;Bf.set([t,t,t],e*3)}Lf.setAttribute(`color`,new Na(Bf,3));function Vf(e=!1){let t=e=>new ic({color:e,roughness:.95,metalness:0,vertexColors:!0}),n=t(`#eeb58b`),r=t(`#d9917d`),i=t(`#6b3e29`),a=t(`#855337`),o=t(e?`#65987b`:`#ce624d`),s=t(e?`#80674f`:`#527b91`),c=t(e?`#ab9272`:`#8aa6af`),l=t(`#d6b66f`),u=t(`#b99352`),d=t(e?`#647f66`:`#986049`),f=t(`#d7a343`),p=t(`#bb853c`),m=t(`#815735`),h=t(`#574634`),g=t(`#fff2d6`),_=t(`#423328`),v=t(`#69482b`),y=t(`#e8c470`);function b(e,t,n,r,i,a=Lf){a.hasAttribute(`color`)||a.setAttribute(`color`,new Ia(new Float32Array(a.attributes.position.count*3).fill(1),3));let o=new X(a,n);return o.name=t,o.position.fromArray(r),o.scale.fromArray(i),e.add(o),o}function x(e,t,n){let r=new J;return r.name=t,r.position.fromArray(n),e.add(r),r}function S(e,t,n,r,i){return b(e,t,n,[0,0,0],[1,1,1],new qs(new Cs(r.map(e=>new K(...e))),16,i,6,!1))}let C=new J;C.name=`farmer-storybook`,C.scale.setScalar(.68);let w=x(C,`body`,[0,.73,0]);b(w,`soft-shirt`,o,[0,.32,0],[.32,.3,.22]),b(w,`overalls-seat`,s,[0,.09,0],[.32,.24,.24]),b(w,`bib`,s,[0,.26,.193],[.46,.37,.11],Rf),b(w,`bib-pocket`,s,[0,.2,.259],[.21,.15,.04],Rf),S(w,`pocket-stitch`,c,[[-.085,.24,.284],[-.085,.15,.287],[.085,.15,.287],[.085,.24,.284]],.006);for(let e of[-1,1])S(w,`overall-strap`,s,[[e*.19,.29,.24],[e*.19,.49,.18],[e*.19,.55,0],[e*.19,.38,-.21]],.032),b(w,`brass-button`,y,[e*.19,.35,.267],[.032,.032,.018]);b(w,`neck`,n,[0,.6,0],[.115,.15,.11]);let T=x(w,`head`,[0,.96,0]);b(T,`cheeks-and-face`,n,[0,0,.015],[.425,.405,.365]),b(T,`hair-back`,i,[0,.035,-.11],[.441,.413,.285]),b(T,`hair-crown`,i,[0,.02,.01],[.443,.416,.38],zf);for(let e of[-1,1])b(T,`ear`,n,[e*.408,-.035,.01],[.083,.116,.067]),b(T,`ear-inner`,r,[e*.442,-.035,.052],[.023,.064,.018]),b(T,`side-lock`,i,[e*.367,.06,.15],[.076,.21,.11]),b(T,`warm-cheek`,r,[e*.239,-.105,.302],[.084,.045,.023]),b(T,`eye-white`,g,[e*.148,.012,.341],[.074,.096,.032]),b(T,`eye-iris`,v,[e*.148,.008,.371],[.046,.068,.018]),b(T,`eye-pupil`,_,[e*.148,.009,.385],[.025,.048,.009]),b(T,`eye-catchlight`,g,[e*.148-.012,.039,.394],[.013,.018,.008]),S(T,`brow`,i,[[e*.21,.143,.324],[e*.15,.157,.353],[e*.1,.144,.35]],.018);let E=b(T,`swept-fringe`,a,[-.12,.246,.278],[.245,.11,.112]);E.rotation.z=-.24;let D=b(T,`fringe-tip`,i,[.18,.257,.272],[.135,.1,.1]);D.rotation.z=.3,b(T,`nose`,n,[0,-.066,.377],[.059,.057,.059]),S(T,`smile`,_,[[-.095,-.178,.326],[0,-.2,.35],[.095,-.178,.326]],.009);let O=x(T,`straw-hat`,[0,.06,0]);b(O,`straw-brim`,l,[0,0,-.015],[1,1,.9],new Hs([[0,.335],[.34,.335],[.45,.315],[.6,.29],[.65,.31],[.65,.335],[.59,.32],[.45,.345],[.34,.36],[0,.36]].map(e=>new G(e[0],e[1])),40)),b(O,`straw-crown`,l,[0,.39,-.03],[.413,.235,.345]),b(O,`hat-ribbon`,d,[0,.379,-.03],[1,1,.85],new us(.423,.431,.077,40,1,!0));for(let e of[.47,.54,.605]){let t=b(O,`woven-brim`,u,[0,.339-(e-.47)*.12,-.015],[1,.9,1],new Ks(e,.004,4,40));t.rotation.x=Math.PI/2}let k=x(w,`backpack`,[0,.25,-.28]);return b(k,`canvas-pack`,f,[0,0,-.06],[.47,.51,.25],Rf),b(k,`canvas-flap`,f,[0,.145,-.175],[.46,.18,.065],Rf),b(k,`pack-buckle`,y,[0,.028,-.212],[.07,.09,.025],Rf),S(k,`pack-handle`,p,[[-.08,.25,-.06],[-.07,.31,-.06],[.07,.31,-.06],[.08,.25,-.06]],.016),{root:C,body:w,head:T,arms:[-1,1].map(e=>{let t=x(w,e<0?`left-arm`:`right-arm`,[e*.33,.43,0]);return b(t,`round-sleeve`,o,[e*.025,-.08,0],[.142,.18,.15]),b(t,`sleeve-cuff`,o,[e*.032,-.19,0],[.126,.052,.135]),b(t,`forearm`,n,[e*.04,-.29,0],[.09,.16,.096]),b(t,`mitten-hand`,n,[e*.04,-.43,.02],[.1,.111,.1]),b(t,`thumb`,n,[e*-.032,-.412,.06],[.043,.067,.052]),t}),legs:[-1,1].map(e=>{let t=x(C,e<0?`left-leg`:`right-leg`,[e*.165,.73,0]);return b(t,`trouser-leg`,s,[0,-.24,0],[.153,.295,.163]),b(t,`rolled-hem`,c,[0,-.46,.005],[.16,.07,.174]),b(t,`rounded-boot`,m,[0,-.59,.055],[.166,.132,.236]),b(t,`boot-sole`,h,[0,-.685,.058],[.171,.041,.24]),t})}}function Hf(e=!0){let{root:t,body:n,head:r,arms:i,legs:a}=Vf(e),o=new J;i[1].add(o);let s=new X(new us(.025,.025,1,16),new ac({color:`#b79056`}));s.position.set(0,-.55,.05),o.add(s);let c=new X(new If(.3,.07,.19,3,.025),new ac({color:`#89978a`}));c.position.set(0,-1.02,.12),o.add(c);let l=new J;i[1].add(l);let u=new X(new us(.025,.025,1.05,16),new ac({color:`#b79056`}));u.position.y=-.55,l.add(u);let d=new X(new Ks(.3,.023,5,18),new ac({color:`#b39463`}));d.position.y=-1.2,l.add(d);let f=new X(new Gs(.29,8,6),new To({color:`#d9d4b5`,wireframe:!0,transparent:!0,opacity:.65}));f.scale.z=.6,f.position.set(0,-1.2,.12),l.add(f);function p(e,t,s,c){let u=s===`walking`?Math.sin(t*12)*.65:0,d=s===`pruning`||s===`picking`,f=s===`planting`,p=s===`harvesting`||s===`fishing`,m=s===`clearing`||s===`cleaning`,h=s===`tilling`||s===`repairing`;o.visible=h,l.visible=s===`fishing`;let g=Math.sin(c*Math.PI*4);n.rotation.y=Yr.lerp(n.rotation.y,m?g*.28:0,1-Math.exp(-18*e));let _=Math.sin(Math.min(c,1)*Math.PI),v=1-Math.exp(-18*e);n.position.y=Yr.lerp(n.position.y,.73+(u?Math.abs(u)*.065:0)-(p?_*.2:0),v),n.rotation.x=Yr.lerp(n.rotation.x,d?-.06:h?.25+Math.max(0,g)*.3:m?.35:f?_*.65:p?_*.28:0,v),r.rotation.x=Yr.lerp(r.rotation.x,d?-.18:f?_*.12:p?-_*.15:0,v),i.forEach((e,t)=>{let n=d?t?-1.5-_*.7:-.35-_*.4:h?-.6-g*.7:m?-.5+Math.sin(c*Math.PI*4+t)*.45:f?-.4-_*.5+Math.sin(c*Math.PI*4+t)*.16:p?-_*(t?1.6:1.2):u*(t?-1:1);e.rotation.x=Yr.lerp(e.rotation.x,n,v),e.rotation.z=Yr.lerp(e.rotation.z,(t?1:-1)*(m?.3+Math.abs(g)*.3:f?.12+_*.22:.13),v)}),a.forEach((e,t)=>{e.rotation.x=Yr.lerp(e.rotation.x,u*(t?1:-1)+(p?_*.35:0),v)})}return{root:t,animate:p}}function Uf(e){let t=Hf();t.animate(0,0,`idle`,0),t.root.scale.multiplyScalar(.88),t.root.updateMatrixWorld(!0);let n=new Set([`body`,`head`,`left-arm`,`right-arm`,`left-leg`,`right-leg`]),r=new Map,i=[];t.root.traverse(a=>{if(!(a instanceof X))return;i.push(a);let o=a,s=!0;for(;o;)s&&=o.visible,o=o.parent;if(!s)return;let c=a.material;if(!c.color)return;let l=a.parent;for(;l!==t.root&&!n.has(l.name);)l=l.parent;let u=a.geometry.index?a.geometry.toNonIndexed():a.geometry.clone();u.applyMatrix4(l.matrixWorld.clone().invert().multiply(a.matrixWorld));let d=c.color.getHex()===6658171?new Y(e):c.color,f=u.getAttribute(`color`),p=new Float32Array(u.getAttribute(`position`).count*3);for(let e=0;e<p.length/3;e++)p[e*3]=d.r*(f?.getX(e)??1),p[e*3+1]=d.g*(f?.getY(e)??1),p[e*3+2]=d.b*(f?.getZ(e)??1);u.setAttribute(`color`,new Na(p,3));for(let e of Object.keys(u.attributes))[`position`,`normal`,`color`].includes(e)||u.deleteAttribute(e);let m=r.get(l)??[];m.push(u),r.set(l,m)});for(let e of i)e.removeFromParent();let a=new ac({vertexColors:!0});for(let[e,t]of r){let n=Mf(t);t.forEach(e=>e.dispose()),e.add(new X(n,a))}return t}function Wf(e,t){let n=new J;n.name=`town-life`,e.add(n);function r(e,t,n,r,i,a,o,s){let c=new X(new cs(i,a,o),new ac({color:s}));return c.position.set(t,n,r),e.add(c),c}function i(e,t){let i=new J;i.position.set(t.x,0,t.z),n.add(i),r(i,0,.7,0,.08,1.4,.08,`#9b7753`);let a=document.createElement(`canvas`);a.width=512,a.height=160;let o=a.getContext(`2d`);o.fillStyle=`#e4d3a3`,o.fillRect(0,0,512,160),o.strokeStyle=`#916b48`,o.lineWidth=12,o.strokeRect(9,9,494,142),o.fillStyle=`#594a33`,o.textAlign=`center`,o.font=`bold 68px serif`,o.fillText(e,256,105);let s=new is(a);s.colorSpace=ir;let c=new ho(new eo({map:s}));return c.scale.set(2.4,.75,1),c.position.y=1.4,i.add(c),i}let a=i(`穂ノ浦`,c.sign),o=Oe.map(e=>{let t=new J;t.name=`episode-art-`+e.id;let i=e.point;t.position.set(i.x+1.6,0,i.z-.5),n.add(t),r(t,0,.55,0,1.15,.1,.65,`#b49061`);for(let e of[-.46,.46])r(t,e,.26,0,.08,.52,.55,`#93724c`);if(e.id===`market`||e.id===`orchard`){for(let e of[-.5,.5])r(t,e,1.1,-.24,.06,1.1,.06,`#967651`);r(t,0,1.65,0,1.45,.06,.95,e.id===`market`?`#c68164`:`#87a27a`)}for(let n=0;n<3;n++){let r=new X(new Gs(.11,7,5),new ac({color:e.id===`mina`?`#8a9a99`:n%2?`#d3ae60`:`#b66b48`}));r.position.set(-.3+n*.3,.72,0),t.add(r)}return{id:e.id,g:t}}),s=i(`収穫祭`,c.festivalSign);s.name=`harvest-festival`;let u=new J;n.add(u);for(let e=0;e<12;e++)r(u,-2,.026,-e*.6,.9,.025,.45,`#c7b99a`);let d=[c.market,c.canteen,c.family,c.cooperative,c.orchard,c.festival],f=Array.from({length:4},(e,t)=>{let r=Uf([`#bfa36b`,`#a08caf`,`#ae7866`,`#749cb0`][t]);r.root.name=`town-walker-`+t,n.add(r.root);let i=new X(new ls(.3,16),new To({color:`#384528`,transparent:!0,opacity:.16,depthWrite:!1}));return i.rotation.x=-Math.PI/2,n.add(i),{actor:r,shadow:i,position:{...d[t]},route:[],target:t,pause:3*t}});return{update(e,n){a.visible=t.restorationPercent>=40,s.visible=t.episodes.festival,o.forEach(({id:e,g:n})=>n.visible=t.episodes.done(e)),u.visible=t.episodes.done(`ren`),u.position.z=t.episodes.states.ren.choice===`south`?10:0;for(let[r,i]of f.entries()){if(i.actor.root.visible=i.shadow.visible=t.residentsArrived&&t.restorationPercent>=[20,40,60,80][r],!i.actor.root.visible)continue;let a=!1;if(i.pause>0)i.pause-=e;else{i.route.length||(i.target=(i.target+1)%d.length,i.route=Ge(i.position,d[i.target],e=>t.canStand(e),l)??[],i.route.length||(i.pause=4));let n=i.route[0];if(n){let t=n.x-i.position.x,r=n.z-i.position.z,o=Math.hypot(t,r),s=Math.min(o,e*.65);o<.03?(i.route.shift(),i.route.length||(i.pause=8)):(i.position.x+=t/o*s,i.position.z+=r/o*s,i.actor.root.rotation.y=Math.atan2(t,r),a=!0)}}i.actor.root.position.set(i.position.x,0,i.position.z),i.shadow.position.set(i.position.x,.021,i.position.z),i.actor.animate(e,n,a?`walking`:`idle`,0)}}}}var Gf=[`barn-neglected.png`,`tree-neglected.png`,`corn.png`,`grass.png`,`weeds.png`,`cottage-neglected.png`,`characters/farmer-walk.png`,`characters/farmer-work.png`,`characters/farmer-tools.png`];function Kf(e,t,n){let r=new J;r.name=`town-restoration-layers`,e.add(r);let i=Array.from({length:5},()=>[]),a=Array.from({length:5},()=>[]),o=Array.from({length:5},()=>[]);function s(e,t,n,r,i,a,o,s,c=0){let l=new cs(i,a,o).toNonIndexed();l.rotateY(c),l.translate(t,n,r);let u=new Y(s),d=new Float32Array(l.getAttribute(`position`).count*3);for(let e=0;e<d.length;e+=3)d[e]=u.r,d[e+1]=u.g,d[e+2]=u.b;l.setAttribute(`color`,new Na(d,3)),e.push(l)}let l=0;for(let e of g)for(let t=1;t<e.length;t++){let r=e[t-1],o=e[t],c=Math.hypot(o.x-r.x,o.z-r.z);for(let e=.5;e<c;e+=1.4){let t=l%2?1:-1,u={x:r.x+(o.x-r.x)*e/c+(o.z-r.z)/c*t,z:r.z+(o.z-r.z)*e/c-(o.x-r.x)/c*t};if(u.x>=31||_.some(e=>Math.abs(e.x-u.x)<1.6&&Math.abs(e.z-u.z)<1.6)||p.some(e=>m(u,e)))continue;let d=l++%5,f=a[d];s(f,u.x,.13,u.z,.75,.14,.14,`#90836b`,l*.8);let h=new Us(.75,.7);h.applyQuaternion(n),h.translate(u.x,.35,u.z+.18),i[d].push(h)}}for(let[e,t]of[[21,2.7],[24,7.5],[28,7.5],[12,-10.2],[-5,-10]]){s(o[1],e,.5,t,1.4,.15,.45,`#c9a16c`);for(let n of[-.5,.5])s(o[1],e+n,.23,t,.12,.46,.35,`#917849`);for(let n of[-1,1]){s(o[2],e+n,.22,t,.42,.44,.42,`#b78758`);for(let r=0;r<3;r++)s(o[2],e+n+(r-1)*.1,.56,t,.12,.28,.12,[`#7eab68`,`#edd082`,`#d98d77`][r])}for(let n of[-.8,.8])s(o[3],e+n,1.05,t-1,.06,2.1,.06,`#a88251`);s(o[3],e,2,t-1,1.6,.035,.035,`#dec690`);for(let n=0;n<5;n++)s(o[4],e-.6+n*.3,1.85,t-1,.22,.3,.025,[`#e1a56e`,`#dccb83`,`#8aa886`][n%3])}for(let[e,t,n,r]of[[22,2,7,3],[c[`seed-garden`].x,-10.5,3,2]])s(o[0],e,.008,t,n,.012,r,`#c5b285`);let u=document.createElement(`canvas`);u.width=u.height=128;let d=u.getContext(`2d`);d.fillStyle=`#ffffff`,d.fillRect(0,0,128,128);for(let e=0;e<950;e++)d.fillStyle=e%2?`#725b3222`:`#dac9a322`,d.fillRect(e*71%128,e*43%128,1+e%5,1);let f=new is(u);f.colorSpace=ir;let h=i.map(e=>{let n=Mf(e);e.forEach(e=>e.dispose());let i=new X(n,new To({map:t,alphaTest:.3}));return r.add(i),i}),v=(e,t,n)=>{let i=Mf(e);e.forEach(e=>e.dispose());let a=new X(i,new ac({vertexColors:!0,map:f}));return a.name=`${t}-${(n+1)*20}`,r.add(a),a},y=a.map((e,t)=>v(e,`neglect`,t)),b=o.map((e,t)=>v(e,`public-life`,t));return{update(e){let t=e.restorationPhase-1;y.forEach((e,n)=>e.visible=t<=n),h.forEach((e,n)=>e.visible=t<=n),b.forEach((e,n)=>e.visible=t>n),r.userData.stage=t*20}}}function qf(e){let t=new ac({color:`#759b84`}),n=new ac({color:`#ead6a0`}),r=new ac({color:`#6b8d8b`}),i=new ac({color:`#e8ba50`}),a=new cs(1,1,1);function o(e,t,n,r,i,o,s,c){let l=new X(a,c);return l.position.set(t,n,r),l.scale.set(i,o,s),e.add(l),l}let s=[1,2].map(a=>{let s=new J;e.add(s),o(s,7.35,.38,-1.1,.6,.65,.55,t),o(s,7.35,.83,-1.1,.8,.35,.75,n),o(s,7.35,1.01,-1.1,.55,.025,.5,i),o(s,3.9,1.03,-1.1,7,.06,.08,r);for(let e of[.4,7.4])o(s,e,.52,-1.1,.06,1,.06,r);let c=new J;return s.add(c),o(c,0,.96,-1.1,.22,.2,.3,t),o(c,0,.71,-.87,.1,.36,.12,n),{slot:a,root:s,head:c,grains:Array.from({length:6},()=>{let e=new X(new Gs(.035,5,4),i);return s.add(e),e})}});return{update(e,t,n,r){for(let i of s){let a=e.plantingLines[i.slot-1],o=e.plots[a.active]??e.plots[a.plots(e)[0]];if(i.root.visible=!t&&a.owned(e)&&!!o,!i.root.visible)continue;i.root.position.z=o.z;let s=e.plots[a.active]??o;i.head.position.x=Yr.damp(i.head.position.x,s.x,7,n),i.grains.forEach((e,t)=>{e.visible=!a.paused&&a.active>=0,e.position.set(s.x+Math.sin(t*7)*.12,.12+(1-(r*2+t/6)%1)*.5,-.85+Math.cos(t*3)*.1)})}}}}function Jf(e){let t=se.map(t=>{let n=new J;n.position.set(t.x,0,t.z),e.add(n);let r=(e,t,n,r,i,a,o,s)=>{let c=new X(new cs(i,a,o),new ac({color:s}));return c.position.set(t,n,r),e.add(c),c},i=new X(new ls(1.8,16),new To({color:`#b5a778`,transparent:!0,opacity:.48,depthWrite:!1}));i.scale.y=.78,i.rotation.x=-Math.PI/2,i.position.set(0,.009,-.8),n.add(i);let a=new J;n.add(a);for(let e=0;e<9;e++){let t=r(a,-1.2+e%3,.06+e%2*.05,-.5-Math.floor(e/3)*.45,.8,.1,.13,e%2?`#837a50`:`#a59868`);t.rotation.y=e*.83}let o=new J;n.add(o),r(o,-1.3,.4,.3,.055,.8,.055,`#997349`),r(o,-1.3,.8,.3,.6,.36,.05,`#f5e1a3`);let s=Array.from({length:3},(e,i)=>{let a=new J;if(n.add(a),i===0)for(let e=0;e<3;e++)r(a,-.8+e*.65,.21,-1.8,.48,.42,.45,`#bd955e`),r(a,-.8+e*.65,.43,-1.8,.4,.025,.37,`#7c6543`);if(i===0&&t.id===`seed-garden`){for(let e of[-.8,.8])for(let t of[-2.2,-.7])r(a,e,.85,t,.075,1.7,.075,`#d8c8a1`);for(let e of[.6,1.3]){r(a,0,e,-1.5,1.7,.08,1.3,`#b29a6a`);for(let t=0;t<7;t++)r(a,-.65+t*.22,e+.1,-1.5,.14,.15,.3,`#8eaf70`)}let e=r(a,0,1.8,-1.5,1.95,.055,2,`#a7d4c5`);e.material.transparent=!0,e.material.opacity=.6}if(i===0&&t.id===`canteen`)for(let e of[-1.1,1.1]){r(a,e,.6,.6,.85,.1,.65,`#d3b784`);for(let t of[.1,1.15])r(a,e,.32,t,.75,.12,.3,`#a88861`);for(let t of[-.25,.25])r(a,e+t,.68,.6,.19,.025,.2,`#f2e4bc`)}if(i===1)for(let e of[-1.15,1.15]){r(a,e,.2,-.8,.45,.4,.65,`#bd935d`);for(let t=0;t<3;t++){let n=new X(new Vs(.17,0),new ac({color:[`#8caa60`,`#a9bd67`,`#e9bf63`][t]}));n.position.set(e,.53+t*.04,-1+t*.2),a.add(n)}}if(i===2&&t.id===`depot`&&(r(a,ce.x-t.x,.3,ce.z-t.z,1,.6,.7,`#b88a4c`),r(a,ce.x-t.x,.62,ce.z-t.z,.8,.03,.5,`#e4c790`)),i===2){for(let e of[-1.3,1.3])r(a,e,.72,-2,.04,1.44,.04,`#d5b880`);r(a,0,1.4,-2,2.6,.025,.025,`#f3dfb6`);for(let e=0;e<7;e++){let t=new X(new ds(.13,.25,3),new ac({color:[`#e69c65`,`#ead879`,`#83b897`][e%3]}));t.rotation.z=Math.PI,t.position.set(-1.1+e*.36,1.26,-2),a.add(t)}}return a});return{id:t.id,rubble:a,stages:s,ground:i}});return{update(e,n){for(let r of t){let t=e.enterprises.states[r.id];r.rubble.visible=!n&&!t.cleared,r.ground.material.color.set(n||t.cleared?`#d6c295`:`#a49b6f`),r.stages.forEach((e,r)=>e.visible=n||t.level>r)}}}}function Yf(e,t=0){let n=new J;e.add(n);let r=new ac({color:`#799696`}),i=new ac({color:`#465959`}),a=new ac({color:`#e2b95f`}),o=new ac({color:`#e9d8a9`}),s=new To({color:`#80d3d2`}),c=new cs(1,1,1);function l(e,t,n,r,i,a,o,s){let l=new X(c,s);return l.position.set(t,n,r),l.scale.set(i,a,o),e.add(l),l}let u=new J;n.add(u),l(u,0,.32,0,.68,.55,.52,r),l(u,0,.76,0,.74,.43,.56,o),l(u,0,.79,.285,.48,.18,.025,s);for(let e of[-.18,.18])l(u,e,.81,.305,.055,.055,.015,i);l(u,0,1.08,0,.06,.25,.06,a);let d=new J;n.add(d);let f=new J;n.add(f),l(f,0,.85,0,.3,.22,.34,r),l(f,0,.55,0,.055,.5,.055,a);for(let e of[-.14,.14])l(f,e,.3,0,.05,.2,.15,o);let p=new J;n.add(p);let m=``,h=Array.from({length:12},()=>{let e=new J;l(e,0,.27,0,.23,.23,.23,o);let t=l(e,0,.395,0,.25,.025,.25,new ac({color:`#e7b53f`}));return n.add(e),{g:e,lid:t}});function g(e,t){let n=Math.hypot(e.x-t.x,e.z-t.z);if(n<.001)return;let o=new J;o.position.set((e.x+t.x)/2,0,(e.z+t.z)/2),o.rotation.y=Math.atan2(t.x-e.x,t.z-e.z),p.add(o),l(o,0,.11,0,.38,.15,n,i);for(let e of[-.23,.23])l(o,e,.16,0,.05,.12,n,a);for(let e=-n/2+.12;e<n/2;e+=.35)l(o,0,.193,e,.35,.025,.035,r)}return{update(e,i,o,c){let _=e.machineLines[t].owned(e);if(n.visible=!i&&(_||t===0&&e.harvesters.length>0),u.visible=_,!n.visible)return;let v=e.machineLines[t],y=e.plots[v.plots(e)[0]],b=Be[t].station;u.position.set(b.x,0,b.z),s.color.set(v.paused?`#89928c`:v.active>=0?`#8be5d0`:`#88babb`);let x=t===0?e.harvesters.flatMap(t=>[...t.plots(e).map(t=>({z:e.plots[t].z,destination:it(e.plots[t],e)})),...t.loads.map(t=>({z:e.plots[t.plot].z,destination:t.destination}))]):[],S=[...new Set(x.map(e=>e.z))].sort((e,t)=>e-t),C=[...new Set(x.map(e=>e.destination))].sort(),w=S.join(`,`)+`/`+C.join(`,`);if(w!==m){m=w,p.clear();for(let e of S)g({x:6.1,z:e+1.4},{x:-2,z:e+1.4});if(S.length){let e=[...S.map(e=>e+1.4),...C.map(e=>Xe(e).z)];g({x:-2,z:Math.min(...e)},{x:-2,z:Math.max(...e)});for(let e of C){let t=Xe(e);g({x:-2,z:t.z},t)}}}if(d.visible=f.visible=!!y,y){d.position.set(2.05,.95,y.z+1.4),d.children.length||(l(d,0,0,0,8.1,.08,.1,a),l(d,4.05,-.45,0,.09,.9,.09,r));let t=e.plots[v.active]??y;f.position.x=Yr.damp(f.position.x,t.x,4,o),f.position.z=Yr.damp(f.position.z,t.z+1.4,4,o),d.position.z=f.position.z,f.position.y=v.active>=0?-Math.sin(v.progress*Math.PI)*.2:0}h.forEach(({g:t,lid:n},r)=>{let i=v.loads[r];if(t.visible=!!i,!i)return;let a=ot(rt(e.plots[i.plot],i.destination),i.travelled);t.position.set(a.x,Math.sin(c*4+r)*.005,a.z),n.material.color.set([`#c9bc9a`,`#a1ba7e`,`#79beb5`,`#82a8d3`,`#b08ada`,`#edc552`][i.grade])})}}}function Xf(e){let t=new J;t.name=`fruit-tree-markers`,e.add(t);let n=y.map((e,n)=>{let r=new X(new Ws(.5,.64,32),new To({color:`#f5d97a`,side:2}));r.rotation.x=-Math.PI/2,r.position.set(e.x,.05,e.z),t.add(r);let i=document.createElement(`canvas`);i.width=512,i.height=112;let a=i.getContext(`2d`),o=new is(i);o.colorSpace=ir;let s=new ho(new eo({map:o,depthTest:!0}));return s.position.set(e.x,.6,e.z+.52),s.scale.set(2,.44,1),t.add(s),{i:n,bed:r,sign:s,ctx:a,texture:o,last:``}});return{update(e,t){for(let r of n){let n=e.orchard.unlocked(r.i,e),i=e.orchard.ripe(r.i,t),a=n?e.orchard.trees[r.i].tended?i?`収穫OK`:`生育中`:`手入れ`:`未開園`;if(r.last===a)continue;r.last=a,r.sign.userData.state=a;let o=n?i?`#ffe393`:`#e6f3cd`:`#ddd6bd`;r.bed.material.color.set(o);let s=r.ctx;s.clearRect(0,0,512,112),s.fillStyle=o,s.beginPath(),s.roundRect(2,2,508,108,18),s.fill(),s.fillStyle=`#3b502b`,s.font=`bold 38px sans-serif`,s.textAlign=`center`,s.textBaseline=`middle`,s.fillText(`${j[ee(r.i)].name} · ${a}`,256,56),r.texture.needsUpdate=!0}}}}function Zf(e){let t=new J;e.add(t);function n(e,t,n,r,i,a,o,s){let c=new X(new cs(i,a,o),new ac({color:s}));return c.position.set(t,n,r),e.add(c),c}let r=new J;r.position.set(ve.x,0,ve.z-.4),t.add(r),n(r,0,.85,0,1.1,.1,.12,`#b19059`);for(let e of[-.48,.48])n(r,e,.48,0,.1,.95,.12,`#887344`);for(let[e,t]of[[-.3,`#d4b369`],[.12,`#a6afb0`]])n(r,e,.53,.12,.055,.9,.055,`#d6bc84`),n(r,e,.14,.12,.28,.22,.13,t);for(let e=0;e<5;e++)n(r,.01+e*.055,.09,.12,.026,.16,.03,`#79898b`);let i=new X(new us(.16,.13,.24,12),new ac({color:`#75a3a2`}));i.position.set(.65,.12,.08),r.add(i);let a=new J;a.position.set(ye.x,0,ye.z-.4),t.add(a),n(a,0,.6,0,1.25,.16,.65,`#b38b50`);for(let e of[-.5,.5])for(let t of[-.23,.23])n(a,e,.27,t,.1,.54,.1,`#89764f`);n(a,.1,.79,0,.45,.25,.32,`#778e84`),n(a,-.37,.71,.09,.3,.06,.13,`#d7c27d`);let o=new J;o.position.set(fe.x,0,fe.z-.55),t.add(o),n(o,0,.65,0,1.5,.15,.7,`#b99159`);for(let e of[-.6,.6])for(let t of[-.25,.25])n(o,e,.29,t,.12,.58,.12,`#806c47`);for(let e of[-.45,0,.45]){let t=new X(new us(.16,.11,.23,12),new ac({color:`#d69661`}));t.position.set(e,.85,0),o.add(t),n(o,e,1.03,0,.035,.23,.035,`#619348`);let r=new X(new Gs(.11,8,6),new ac({color:`#a4c85b`}));r.scale.set(1,.35,.6),r.position.set(e+.05,1.1,0),o.add(r)}let s=V.map(e=>{let n=bt.find(t=>t.id===e.id),r=document.createElement(`canvas`);r.width=256,r.height=256;let i=r.getContext(`2d`);i.fillStyle=`#e4be62`,i.beginPath(),i.roundRect(8,8,240,240,42),i.fill(),i.strokeStyle=`#fff0b7`,i.lineWidth=8,i.stroke(),i.strokeStyle=`#9d7130`,i.lineWidth=9,i.beginPath(),i.arc(128,128,66,0,Math.PI*2),i.stroke(),i.font=`bold 100px sans-serif`,i.textAlign=`center`,i.textBaseline=`middle`,i.fillStyle=`#9d7130`,i.fillText(`M`,128,130);let a=new is(r);a.colorSpace=ir;let o=new X(new Us(1.08,1.08),new To({map:a,transparent:!0,depthWrite:!1}));o.rotation.x=-Math.PI/2,o.position.set(e.x,.04,e.z),t.add(o);let s=document.createElement(`canvas`);s.width=512,s.height=110;let c=s.getContext(`2d`);c.fillStyle=`#fff7df`,c.beginPath(),c.roundRect(4,4,504,102,24),c.fill(),c.textAlign=`center`,c.fillStyle=`#655738`,c.font=`bold 25px sans-serif`,c.fillText(n.title,256,44),c.font=`22px sans-serif`,c.fillText(`${n.price.toLocaleString()} メニー`,256,80);let l=new is(s);l.colorSpace=ir;let u=new ho(new eo({map:l,depthTest:!1}));return u.position.set(e.x,1.9,e.z),u.scale.set(2.5,.54,1),t.add(u),{p:e,mesh:o,label:u}}),c=document.createElement(`canvas`);c.width=64,c.height=64;let l=c.getContext(`2d`);l.fillStyle=`#efbb38`,l.beginPath(),l.arc(32,32,28,0,Math.PI*2),l.fill(),l.strokeStyle=`#fff2b0`,l.lineWidth=5,l.stroke(),l.fillStyle=`#80591d`,l.font=`bold 32px sans-serif`,l.textAlign=`center`,l.textBaseline=`middle`,l.fillText(`M`,32,34);let u=new is(c);u.colorSpace=ir;let d=new J;d.name=`payment-coins`,e.add(d);let f=Array.from({length:10},()=>{let e=new ho(new eo({map:u,depthTest:!1,transparent:!0}));return d.add(e),e}),p=0;return{update(e,n,r){let i=e.paymentPad;d.visible=!n&&!!i&&e.funding.target===i.id&&e.funding.dwell>1&&e.coins>0,d.visible&&i?(p+=r,f.forEach((t,n)=>{let r=(p*1.8+n/f.length)%1,a=r*r;t.position.set(Yr.lerp(e.player.x,i.x,a)+Math.sin(r*Math.PI*4+n)*.22*(1-r),Yr.lerp(1.1,.08,a)+Math.sin(r*Math.PI)*.65,Yr.lerp(e.player.z,i.z,a)+Math.cos(r*Math.PI*4+n)*.18*(1-r)),t.scale.setScalar(.26*(1-r*.8)),t.material.opacity=Math.min(1,r*8),t.material.rotation=r*5})):p=0,t.visible=!n;let a=new Set(xe(e).map(e=>e.id));for(let{p:t,mesh:n,label:r}of s)n.visible=a.has(t.id),n.material.opacity=1,n.material.color.set(e.paymentPad?.id===t.id?`#efffa8`:`#d4ffc0`),r.visible=!1,n.scale.setScalar(e.paymentPad?.id===t.id?1.12:1)}}}function Qf(e){let t=_e.map(t=>{let n=new J,r=t.id===`family`?[c.family.x+1.5,c.family.z-.2]:t.id===`market`?[-8.2,3.4]:[-1.5,-.6];n.position.set(r[0],0,r[1]),e.add(n);let i=Array.from({length:3},(e,t)=>{let r=[];function i(e,t,n,i,a){let o=e.toNonIndexed();e.dispose(),o.translate(n,i,a);let s=new Y(t),c=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<c.length;e+=3)c[e]=s.r,c[e+1]=s.g,c[e+2]=s.b;o.setAttribute(`color`,new Na(c,3)),r.push(o)}if(t===0){i(new cs(.85,.28,.38),`#c19561`,0,.15,0),i(new cs(.76,.035,.3),`#816847`,0,.31,0);for(let e=0;e<5;e++){let t=-.3+e*.15;i(new us(.015,.02,.24,5),`#628f48`,t,.4,0),i(new Gs(.11,7,5),e%2?`#f4c867`:`#e58b80`,t,.55,0)}}else if(t===1){i(new cs(1.05,.1,.7),`#bf955c`,0,.6,-.85),i(new cs(.52,.02,.65),`#eae3b0`,0,.665,-.85);for(let e of[-.4,.4])for(let t of[-1.1,-.6])i(new cs(.085,.58,.085),`#a37a49`,e,.29,t);for(let e of[-.28,.28])i(new us(.12,.12,.03,12),`#f8efcf`,e,.69,-.85);i(new Gs(.11,8,6),`#c9603c`,0,.76,-.85)}else{for(let e of[-.65,.65])i(new us(.03,.045,1.5,6),`#b89764`,e,.75,-1.45);let e=new us(.012,.012,1.3,5);e.rotateZ(Math.PI/2),i(e,`#dfd4a6`,0,1.45,-1.45);for(let e=0;e<5;e++){let t=new ds(.11,.25,3);t.rotateZ(Math.PI),i(t,[`#d98563`,`#ecce77`,`#84ab85`][e%3],-.5+e*.25,1.32,-1.45)}}let a=Mf(r);r.forEach(e=>e.dispose());let o=new X(a,new ac({vertexColors:!0}));return n.add(o),o});return{id:t.id,stages:i}});return{update(e,n){for(let{id:r,stages:i}of t)i.forEach((t,i)=>t.visible=n||e.requests.progress[r].chapter>i)}}}function $f(){let e=[];function t(t,n,r,i,a){let o=t.toNonIndexed();t.dispose(),o.translate(r,i,a);let s=new Y(n),c=new Float32Array(o.getAttribute(`position`).count*3);for(let e=0;e<c.length;e+=3)c[e]=s.r,c[e+1]=s.g,c[e+2]=s.b;o.setAttribute(`color`,new Na(c,3)),e.push(o)}let n=`#b6894f`,r=`#e1bd7c`;t(new cs(.58,.08,.65),n,0,.27,0);for(let e of[.36,.48]){for(let n of[-.28,.28])t(new cs(.045,.08,.68),r,n,e,0);for(let n of[-.32,.32])t(new cs(.6,.08,.045),r,0,e,n)}for(let e of[-.32,.32]){let n=new us(.16,.16,.055,12);n.rotateZ(Math.PI/2),t(n,`#5e6759`,e,.16,.08);let r=new us(.07,.07,.061,8);r.rotateZ(Math.PI/2),t(r,`#d3ae6c`,e,.16,.08)}for(let e of[-.23,.23]){let r=new cs(.035,.04,.65);r.rotateX(-.35),t(r,n,e,.41,-.57)}let i=Mf(e);return e.forEach(e=>e.dispose()),new X(i,new ac({vertexColors:!0}))}function ep(e,t,n){let r=e,i=new ea;i.position.x=c[`harbor-entry`].x-26,r.add(i),e=i;let a=document.createElement(`canvas`);a.width=a.height=512;let o=a.getContext(`2d`),s=o.createLinearGradient(0,0,512,0);s.addColorStop(0,`#badfc8`),s.addColorStop(.035,`#77c9bd`),s.addColorStop(.3,`#419fba`),s.addColorStop(1,`#347faf`),o.fillStyle=s,o.fillRect(0,0,512,512);for(let e=0;e<55;e++){o.strokeStyle=e%3?`#d8f5db22`:`#e5fbd640`,o.lineWidth=1,o.beginPath();for(let t=0;t<512;t+=3){let n=e*10+Math.sin(t*.045+e)*2.5;t?o.lineTo(t,n):o.moveTo(t,n)}o.stroke()}let l=new is(a);l.colorSpace=ir,l.wrapT=Ft,l.repeat.y=3;let u=e=>Math.sin(e*.6)*.22+Math.sin(e*1.4)*.07,d=new Us(50,40,1,100),f=d.getAttribute(`position`);for(let e=0;e<f.count;e++)f.getX(e)<0&&f.setX(e,f.getX(e)+u(-f.getY(e)));let p=new X(d,new To({map:l}));p.rotation.x=-Math.PI/2,p.position.set(54.5,-.016,0),e.add(p);let m=document.createElement(`canvas`);m.width=m.height=256;let h=m.getContext(`2d`),g=h.createLinearGradient(0,0,256,0);g.addColorStop(0,`#d4c49c00`),g.addColorStop(.16,`#d4c49c`),g.addColorStop(1,`#e4d6b4`),h.fillStyle=g,h.fillRect(0,0,256,256),h.globalCompositeOperation=`source-atop`;for(let e=0;e<2800;e++)h.fillStyle=e%2?`#9c8d6e30`:`#fff9dd50`,h.fillRect(e*73.7%256,e*37.3%256,1.1,1.3);let _=new is(m);_.colorSpace=ir,_.wrapT=Ft,_.repeat.y=8;let v=new Us(3.4,32,1,80),y=v.getAttribute(`position`);for(let e=0;e<y.count;e++)y.setX(e,y.getX(e)+u(-y.getY(e)));let b=new X(v,new To({map:_,transparent:!0,depthWrite:!1}));b.rotation.x=-Math.PI/2,b.position.set(29,-.022,0),e.add(b);let x=(t,n,r,i)=>{let a=new ho(new eo({map:t,alphaTest:.3,transparent:!1}));return a.center.set(.5,.035),a.position.set(n,.025,r),a.scale.set(i,i,1),e.add(a),a};x(t,26.5,-2.7,4.3);let S=x(n,31.5,5.5,3.4),C=document.createElement(`canvas`);C.width=64,C.height=256;let w=C.getContext(`2d`);w.fillStyle=`#ffffff`,w.fillRect(0,0,64,256);for(let e=0;e<90;e++)w.strokeStyle=e%2?`#73502533`:`#fff4ce66`,w.beginPath(),w.moveTo(e*.73,0),w.bezierCurveTo(e*.73+3,80,e*.73-3,180,e*.73+1,256),w.stroke();let T=new is(C);T.colorSpace=ir;let E=new J,D=new J,O=new J;e.add(E,D,O);let k=(e,t,n,r,i,a,o,s)=>{let c=new X(new cs(i,a,o),new ac({color:s,map:T}));return c.position.set(t,n,r),e.add(c),c};for(let[e,t]of[[E,!0],[D,!1]]){for(let n=0;n<17;n++){if(t&&n%5==2)continue;let r=k(e,29.25+n*.29,.08,3,.27,.16,2,t?`#877b60`:n%3?`#bb965e`:`#c9a976`);t&&(r.rotation.x=(n%3-1)*.08)}for(let n of[29.3,31.4,33.6])for(let r of[2,4])k(e,n,.15,r,.16,.8,.16,t?`#817861`:`#947447`),k(e,n,.6,r,.2,.08,.2,t?`#b0a183`:`#dfc696`)}for(let e=0;e<8;e++){let t=k(O,27.7+e%3*.4,.09,5.6+Math.floor(e/3)*.4,.65,.12,.15,e%2?`#82785d`:`#a49977`);t.rotation.y=e*.8}let A=(e,t,n)=>{let r=document.createElement(`canvas`);r.width=256,r.height=96;let i=r.getContext(`2d`);i.fillStyle=`#fff0ca`,i.fillRect(0,0,256,96),i.strokeStyle=`#97764d`,i.lineWidth=8,i.strokeRect(4,4,248,88),i.fillStyle=`#4d4c3c`,i.textAlign=`center`,i.font=`bold 32px sans-serif`,i.fillText(e,128,60);let a=new is(r);a.colorSpace=ir;let o=x(a,t,n,1.5);o.scale.set(1.8,.68,1),o.position.y=.8};A(`網を引く`,28.5,6.7),A(`桟橋の修理`,27.2,3),A(`水揚げ箱`,26,-.2);let j=new J;e.add(j);for(let e=0;e<12;e++){let t=new X(new Gs(.12,6,4),new ac({color:e%2?`#a9dad7`:`#e2ede4`}));t.scale.set(1.8,.7,.6),j.add(t)}S.name=`harbor-voyage-boat`,j.name=`harbor-unloading`;let ee=new J;e.add(ee),k(ee,26,.25,.5,.8,.5,.65,`#887f62`);for(let e of[.1,.3,.48])k(ee,26,e,.84,.86,.035,.03,`#c6b795`);let M=new J;e.add(M);for(let e=0;e<6;e++){let t=new X(new Gs(.13,8,5),new ac({color:e%2?`#9ebfc2`:`#bcd8ce`}));t.scale.set(1.7,.55,.6),t.position.set(25.78+e%3*.2,.52,.32+Math.floor(e/3)*.24),M.add(t)}return{update:(e,t,n,r)=>{l.offset.y=t*.003,E.visible=!r&&!n.pier,D.visible=r||n.pier,O.visible=!r&&!n.cleaned,S.visible=r||n.boat;let i=n.boatCargo>0&&n.voyageElapsed<600?Math.min(1,n.voyageElapsed/8,(600-n.voyageElapsed)/8):0;S.position.x=31.5+i*14,S.position.z=5.5-i*6,S.position.y=.02+Math.sin(t*1.1)*.035,j.visible=n.unloadSeconds>0,j.children.forEach((e,n)=>{let r=(t*1.2+n/12)%1;e.position.set(31.5+-5.5*r,.5+Math.sin(r*Math.PI)*1.5,5.5+-5*r)}),S.material.rotation=Math.sin(t*.8)*.009,M.visible=r||n.fish>0}}}function tp(e,t,n,r,i){let a=e-t,o=Math.cos(a)<0,s=Math.sin(a)>0,c=`walk`,l=0,u=Math.floor(Math.max(0,i)*6)%2;switch(r){case`walking`:l=[0,1,0,2][Math.floor(n*8)%4];break;case`planting`:case`clearing`:case`cleaning`:c=`work`,l=u;break;case`harvesting`:c=`work`,l=i<.52?2:3;break;case`tilling`:c=`tools`,l=u;break;case`repairing`:c=`tools`,l=Math.floor(n*4)%2;break;case`fishing`:c=`tools`,l=2;break;case`pruning`:case`picking`:c=`tools`,l=3}return{sheet:c,index:l+(o?c===`walk`?3:4:0),flip:s}}var np={walk:[[168,14,375,512,270,510],[628,14,872,510,750,502],[1100,14,1368,510,1244,502],[170,518,372,1015,270,1008],[624,515,874,1011,750,1005],[1130,517,1387,1010,1260,1005]],work:[[79,44,389,423,304,418],[477,48,844,423,754,418],[944,65,1246,435,1165,430],[1414,18,1651,442,1555,436],[96,472,378,870,285,864],[485,472,839,863,738,858],[964,493,1254,862,1152,857],[1442,455,1685,866,1560,861]],tools:[[103,4,365,432,235,428],[492,68,796,428,690,424],[904,52,1291,432,1190,427],[1434,19,1660,432,1580,427],[96,432,358,862,228,857],[482,499,797,857,685,852],[887,488,1290,856,1190,851],[1466,453,1679,862,1573,857]]},rp={walk:1.65/495,work:.0028,tools:.004};async function ip(e=new Oc){let t=[`walk`,`work`,`tools`],n=await Promise.all(t.map(t=>e.loadAsync(`./art/characters/farmer-${t}.png`)));return n.forEach(e=>{e.colorSpace=ir,e.generateMipmaps=!1,e.minFilter=Vt,e.magFilter=Vt}),Object.fromEntries(t.map((e,t)=>[e,n[t]]))}function ap(e,t=Math.atan2(12,20)){let n=new J;n.name=`painted-farmer`;let r=Object.fromEntries(Object.entries(e).map(([e,t])=>[e,t.clone()])),i=new eo({map:r.walk,alphaTest:.4,transparent:!1,depthWrite:!0,toneMapped:!1});i.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float key = min(diffuseColor.r, diffuseColor.b) - diffuseColor.g;
      if(key > 0.10) discard;
      if(key > 0.015) {
        diffuseColor.r = min(diffuseColor.r, diffuseColor.g * 1.8);
        diffuseColor.b = min(diffuseColor.b, diffuseColor.g * 0.65);
      }
    `)},i.customProgramCacheKey=()=>`painted-farmer-magenta-v1`;let a=new ho(i);n.add(a);let o=``;function s(e,s,c,l){let u=tp(n.rotation.y,t,s,c,l),d=`${u.sheet}:${u.index}:${u.flip}`;if(d!==o){let[e,t,s,c,l,f]=np[u.sheet][u.index],p=r[u.sheet],{width:m,height:h}=p.image;p.repeat.set((u.flip?-1:1)*(s-e)/m,(c-t)/h),p.offset.set((u.flip?s:e)/m,1-c/h),i.map=p,a.center.set(u.flip?1-(l-e)/(s-e):(l-e)/(s-e),(c-f)/(c-t)),a.scale.set((s-e)*rp[u.sheet],(c-t)*rp[u.sheet],1),n.userData.frame=u,o=d}let f=c===`walking`;a.position.y=.025+(f?Math.abs(Math.sin(s*Math.PI*4))*.025:0),i.rotation=c===`fishing`||c===`pruning`||c===`picking`?Math.sin(l*Math.PI*4)*.035:0}return s(0,0,`idle`,0),{root:n,animate:s}}var op=e=>`./art/${e}`;function sp(e){return()=>(e=Math.imul(e,1664525)+1013904223>>>0,e/4294967296)}function cp(e,t){let n=document.createElement(`canvas`);n.width=n.height=e,t(n.getContext(`2d`));let r=new is(n);return r.colorSpace=ir,r}var lp=()=>cp(64,e=>{let t=e.createRadialGradient(32,32,2,32,32,32);t.addColorStop(0,`rgba(31,53,19,.45)`),t.addColorStop(.4,`rgba(31,53,19,.27)`),t.addColorStop(1,`rgba(31,53,19,0)`),e.fillStyle=t,e.fillRect(0,0,64,64)});async function up(e,t){let n=new jf({canvas:e,antialias:!0,alpha:!1});n.setPixelRatio(Math.min(devicePixelRatio,2)),n.outputColorSpace=ir;let r=new ea;r.background=new Y(`#82a64c`);let i=new Uc(-10,10,7,-7,.1,100),a=new K(0,1.8,.5),o=new K(12,16,20);i.position.copy(a).add(o),i.lookAt(a),r.add(new Ac(`#fff7d5`,`#73904d`,2.3));let s=new Gc(`#fff2cf`,2);s.position.set(-8,14,10),r.add(s);let l=new Oc,u=ip(l),[d,f,p,m,h,v]=await Promise.all(Gf.filter(e=>!e.startsWith(`characters/`)).map(e=>l.loadAsync(op(e)))),b=e=>{e.colorSpace=ir,e.anisotropy=Math.min(8,n.capabilities.getMaxAnisotropy())};[d,f,p,m,h,v].forEach(b);let x=[];function S(e,t,n){let r=t.clone();return r.needsUpdate=!0,x.push({texture:r,name:e,needed:n,loading:!1,retryAt:0}),r}let C=S(`barn.png`,d,()=>t.projects.has(`barn-open`)||t.enterprises.level(`depot`)>0),w=S(`apple-tree.png`,f,()=>t.investments.has(`orchard`)),T=S(`barn-cleaned-keyed.png`,d,()=>t.projects.has(`barn-walls`)),E=S(`barn-roof-keyed.png`,d,()=>t.projects.has(`barn-roof`)),k=S(`turnip-keyed.png`,p,()=>t.plots.some(e=>e.crop===`turnip`&&e.stage!==`empty`)),A=S(`delivery-truck.png`,d,()=>t.investments.has(`truck`)),j=S(`cottage-restored-keyed.png`,v,()=>t.projects.has(`cottage-repair`)),M=S(`town-well.png`,f,()=>t.projects.has(`town-well`)),N=S(`farm-kitchen.png`,d,()=>t.investments.has(`kitchen`)||t.enterprises.level(`canteen`)>0),P=S(`apple-tree-picked.png`,f,()=>t.restorationPhase>=3||t.projects.has(`town-orchard`)||t.enterprises.level(`seed-garden`)>0||t.investments.has(`orchard`)),te=S(`pumpkin.png`,p,()=>t.plots.some(e=>e.crop===`pumpkin`&&e.stage!==`empty`)),ne=S(`kabumorokoshi.png`,p,()=>t.plots.some(e=>e.crop===`kabumorokoshi`&&e.stage!==`empty`)),re=S(`pear-tree-keyed.png`,f,()=>t.investments.has(`pear-grove`));async function F(e){e.loading=!0;try{let t=await l.loadAsync(op(e.name));b(t),e.texture.dispose(),e.texture.copy(t),e.texture.needsUpdate=!0,t.dispose(),e.retryAt=1/0}catch{e.loading=!1,e.retryAt=performance.now()+3e4}}await Promise.all(x.filter(e=>e.needed()).map(F)),m.wrapS=m.wrapT=Ft,m.repeat.set(105/6.5,105/6.5);let I=new X(new Us(105,105),new To({map:m,color:`#c7e3d3`}));I.rotation.x=-Math.PI/2,I.position.y=-.035,r.add(I);let L=null,ae=!1,oe=0;function ce(){L||ae||performance.now()<oe||(ae=!0,Promise.all([`fishing-shed.png`,`fishing-boat.png`].map(e=>l.loadAsync(op(e)))).then(([e,t])=>{for(let n of[e,t])n.colorSpace=ir;L=ep(r,e,t)}).catch(()=>{oe=performance.now()+3e4,t.message=`港の景色を読み込み直しています。`}).finally(()=>ae=!1))}let R=lp(),le=[],ue=new J,de=new J;r.add(ue,de);let fe=`both`;function pe(e,t,n,i){let a=new X(new Us(n,i),new To({map:R,transparent:!0,depthWrite:!1}));return a.rotation.x=-Math.PI/2,a.position.set(e,.013,t),r.add(a),a}let me=[];function he(e,t,n,i){let a=new ho(new eo({map:e,transparent:!1,alphaTest:.3,depthWrite:!0}));return a.center.set(.5,.035),a.position.set(t,.025,n),a.scale.set(i,i,1),r.add(a),me.push(a),a}function ge(e,t,n,i,a,o,s){let c=new X(new cs(i,a,o),new ac({color:s}));return c.position.set(e,t,n),c.userData.condition=fe,r.add(c),le.push(c),c}let z=sp(302),_e=cp(1024,e=>{let t=e=>(e+40)*1024/96;e.lineCap=`round`,e.lineJoin=`round`;let n=(n,r)=>{e.strokeStyle=r,e.lineWidth=n*1024/96;for(let n of g)e.beginPath(),n.forEach((n,r)=>r?e.lineTo(t(n.x),t(n.z)):e.moveTo(t(n.x),t(n.z))),e.stroke()};e.filter=`blur(5px)`,n(1.7,`#749349`),e.filter=`none`,n(1.52,`#c2af70`),n(1.34,`#dbc58d`),n(1.1,`#e1cf98`),e.globalCompositeOperation=`source-atop`;for(let t=0;t<18e3;t++)e.fillStyle=t%2?`rgba(136,107,55,.12)`:`rgba(255,247,196,.26)`,e.fillRect(z()*1024,z()*1024,1+z()*4,1+z()*2)}),B=new X(new Us(96,96),new To({map:_e,transparent:!0,depthWrite:!1}));B.rotation.x=-Math.PI/2,B.position.set(8,.004,8),r.add(B),pe(Ct.x,Ct.z,6.2,4.8);let ve=he(d,Ct.x,Ct.z,5.8),ye={value:0};ve.material.onBeforeCompile=e=>{e.uniforms.barnKey=ye,e.fragmentShader=`uniform float barnKey;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta = min(diffuseColor.r, diffuseColor.b);
      if(barnKey > 0.5 && magenta > 0.12 && diffuseColor.g < magenta * 0.8) discard;`)};let be=he(v,Ke.x,Ke.z,4.8);pe(Ke.x,Ke.z,4.8,3.3);let V={value:0};be.material.onBeforeCompile=e=>{e.uniforms.cottageKey=V,e.fragmentShader=`uniform float cottageKey;
`+e.fragmentShader,e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta=min(diffuseColor.r,diffuseColor.b);
      if(cottageKey>0.5&&magenta>0.12&&diffuseColor.g<magenta*0.8)discard;`)};let xe=qf(r),H=[0,1,2].map(e=>Yf(r,e)),Se=Zf(r),Ce=Xf(r),Te=Qf(r),Ee=Kf(r,h,i.quaternion),De=Jf(r),Oe=se.filter(e=>e.id!==`harbor-link`&&e.id!==`seed-garden`).map(e=>({id:e.id,prop:he(e.id===`canteen`?N:e.id===`depot`?C:P,e.x,e.z-1.5,e.id===`depot`?3.4:2.7)})),ke=Hf(!0);ke.root.position.set(c.cooperative.x,0,c.cooperative.z-.8),ke.root.rotation.y=.7,r.add(ke.root);let Ae=pe(c.cooperative.x,c.cooperative.z-.8,.9,.65),je=new J;r.add(je);let Me=Hf(!0);Me.root.position.set(c.family.x,0,c.family.z-.8),Me.root.rotation.y=-.6,je.add(Me.root);let Ne=pe(c.family.x,c.family.z-.8,.9,.65),Pe=new X(new cs(1.1,.12,.4),new ac({color:`#c29b60`}));Pe.position.set(Ke.x-2,.45,Ke.z+2.3),je.add(Pe);for(let e of[Ke.x-2.4,Ke.x-1.6]){let t=new X(new cs(.12,.4,.35),new ac({color:`#98794c`}));t.position.set(e,.2,Ke.z+2.3),je.add(t)}let Fe=he(M,c.well.x,c.well.z-1.2,2.25),Ie=pe(c.well.x,c.well.z-1.2,1.8,1.4),Le=Hf(!0);Le.root.position.set(-6.5,0,.2),Le.root.rotation.y=1.3,r.add(Le.root);let Re=pe(-6.5,.2,.9,.65),ze=he(A,O.x,O.z,2.9),Be=pe(O.x,O.z,2.6,1.3),Ve=Hf(!0);Ve.root.position.set(O.x+.9,0,O.z-.3),Ve.root.rotation.y=-1.6,r.add(Ve.root);let He=pe(O.x+.9,O.z-.3,.85,.65),Ue=he(N,ie.x,ie.z-.9,2.35),We=pe(ie.x,ie.z-.9,2.2,1.6),Ge=y.map((e,t)=>{pe(e.x,e.z,2.5,1.8);let n=he(f,e.x,e.z,2.9);return ee(t)===`pear`&&(n.material.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta=min(diffuseColor.r,diffuseColor.b);
      if(magenta>0.12&&diffuseColor.g<magenta*0.8)discard;`)}),n}),qe=new J;r.add(qe);let Je=new X(new cs(.65,.45,.55),new ac({color:`#bb9159`}));Je.position.set(we.sales.x,.23,we.sales.z),qe.add(Je);for(let e=0;e<6;e++){let t=new X(new Gs(.09,8,6),new ac({color:`#ce6843`}));t.position.set(we.sales.x-.2+e%3*.2,.49,we.sales.z-.13+Math.floor(e/3)*.22),qe.add(t)}let Ye=new J,Xe=new J;r.add(Ye,Xe);let Ze=new Map;for(let[e,t,n,i,a]of[[`lane-west`,-11,-2,0,7],[`lane-east`,-2,12,1.4,7],[`cottage-yard`,Ke.x-2,Ke.x+2,Ke.z+1,Ke.z+7]]){let o=new Us(n-t,a-i),s=o.getAttribute(`uv`);for(let e=0;e<s.count;e++)s.setXY(e,(t+s.getX(e)*(n-t)+40)/96,(56-a+s.getY(e)*(a-i))/96);let c=new X(o,new To({map:_e,transparent:!0,depthWrite:!1}));c.rotation.x=-Math.PI/2,c.position.set((t+n)/2,.009,(i+a)/2),r.add(c),Ze.set(e,c)}let Qe=[[-9,-8,4],[-6.8,-8.8,3.5],[-5,-14,3.8],[-5,-20,3.3],[0,-23.5,3.3],[3.4,-23.5,3.9],[6.7,-23.5,3.7],[10,-10,3.5],[10,-16,3.7],[10,-21,3.6],[19.6,-7.2,4.2],[14,-8,3.8],[17,-8.7,3.6],[-10,-4,3.9],[-9.7,0,3.5],[21,-3,3.7],[21,1,4.3],[-8,7.5,4.4],[22,8.5,3.4],[20.2,10.5,3.5],[-5.1,11.8,3.3],[-2.8,16.5,3.5],[1,17.5,3.9],[4.8,17.2,3.5],[8.6,16.2,3.7],[11.8,13,3.5]],$e=[];for(let[e,t,n]of Qe.filter(([e,t])=>!se.some(n=>Math.hypot(n.x-e,n.z-1.2-t)<2.8))){pe(e,t,n*.8,n*.5);let r=he(f,e,t,n);r.material.rotation=(z()-.5)*.04,$e.push(r)}function et(e,t,n,r){let i=Math.hypot(n-e,r-t),a=Math.ceil(i/.8);for(let i=0;i<=a;i++){let o=e+(n-e)*i/a,s=t+(r-t)*i/a,c=fe===`neglected`;if(c&&i%5==2)continue;let l=ge(o,c?.25:.3,s,.1,c?.5:.6,.1,c?`#948168`:`#f9edc7`);c&&(l.rotation.z=(i%3-1)*.22)}for(let o of[.22,.46]){if(fe===`neglected`){for(let s=0;s<a;s++){if(s%3==1||o>.3&&s%4==0)continue;let c=(s+.5)/a,l=ge(e+(n-e)*c,o*.8,t+(r-t)*c,i/a*.9,.075,.075,`#a59375`);l.rotation.y=-Math.atan2(r-t,n-e),l.rotation.z=(s%2?1:-1)*.22}continue}let s=ge((e+n)/2,o,(t+r)/2,i,.075,.075,`#eee1b4`);s.rotation.y=-Math.atan2(r-t,n-e)}}for(let e of[`restored`,`neglected`]){fe=e,et(-8.3,-6.4,-3,-6.4),et(-1,-20.7,8.2,-20.7),et(8.2,-20.7,8.2,1.2),et(-8.3,-6.4,-8.3,-.5);let t=le.length;et(-7.6,3.6,-4.9,4.9);for(let e of le.slice(t))e.userData.localFence=!0}fe=`both`;let tt=new Us(1,1);tt.translate(0,.465,0);let nt=new To({map:h,alphaTest:.3});function rt(e,t){let n=new Jo(tt,nt,e.length),r=new yi;e.forEach((e,t)=>{let a=.45+z()*.42;r.compose(new K(e.x,.11,e.z),i.quaternion,new K(a,a,1)),n.setMatrixAt(t,r),n.setColorAt(t,new Y(t%3?`#ffffff`:`#d7d1ab`))}),n.computeBoundingSphere(),t.add(n)}let it=new J;r.add(it),rt(Array.from({length:100},()=>({x:Ke.x-3+z()*7,z:Ke.z+2.3+z()*3})),it);let at=[];for(let e=0;e<210;e++){let e=z()*19-9.5,t=z()*14-6;_.some(n=>Math.abs(e-n.x)<1.5&&Math.abs(t-n.z)<1.5)||Math.hypot(e-St.x,t-St.z)<1||Math.abs(e+2)<.45&&t<2||at.push({x:e,z:t})}let ot=new Map,st=e=>e.x<-2&&e.z<.8?`barn-walls`:e.x<-2&&e.z<6?`lane-west`:e.x>=-2&&e.z>1.3?`lane-east`:void 0;rt(at.filter(e=>!st(e)),ue);for(let e of[`barn-walls`,`lane-west`,`lane-east`]){let t=new J;r.add(t),rt(at.filter(t=>st(t)===e),t),ot.set(e,t)}let ct=cp(512,e=>{for(let t=0;t<130;t++){let n=z()*512,r=z()*512,i=8+z()*38,a=e.createRadialGradient(n,r,0,n,r,i);a.addColorStop(0,t%2?`#a6976688`:`#baa47b88`),a.addColorStop(1,`#a6976600`),e.fillStyle=a,e.fillRect(n-i,r-i,i*2,i*2)}}),lt=new X(new Us(26,26),new To({map:ct,transparent:!0,depthWrite:!1}));lt.rotation.x=-Math.PI/2,lt.position.y=.007,ue.add(lt);let ut=cp(256,e=>{e.fillStyle=`#90612f`,e.fillRect(0,0,256,256);for(let t=0;t<6;t++){let n=t*43,r=e.createLinearGradient(0,n,0,n+43);r.addColorStop(0,`#765029`),r.addColorStop(.35,`#b78b4c`),r.addColorStop(.57,`#c39859`),r.addColorStop(1,`#83522b`),e.fillStyle=r,e.fillRect(0,n,256,43)}for(let t=0;t<6e3;t++)e.fillStyle=t%2?`rgba(61,35,16,.18)`:`rgba(255,226,163,.21)`,e.fillRect(z()*256,z()*256,1+z()*3,1+z()*2)}),dt=cp(256,e=>{e.fillStyle=`#b59a6b`,e.fillRect(0,0,256,256);for(let t=0;t<4500;t++)e.fillStyle=t%2?`#a28b6744`:`#dbc39966`,e.fillRect(z()*256,z()*256,1+z()*4,1+z()*3)}),ft=[],pt=new Us(1,1);pt.translate(0,.465,0);let mt=new Jo(pt,new To({map:p,alphaTest:.3}),_.length*12);mt.frustumCulled=!1,mt.instanceMatrix.setUsage(ur),r.add(mt);let ht=new To({map:k,alphaTest:.3});ht.onBeforeCompile=e=>{e.fragmentShader=e.fragmentShader.replace(`#include <map_fragment>`,`#include <map_fragment>
      float magenta = min(sampledDiffuseColor.r, sampledDiffuseColor.b);
      if(magenta > 0.12 && sampledDiffuseColor.g < magenta * 0.8) discard;`)};let gt=new Jo(pt,ht,_.length*12);gt.frustumCulled=!1,gt.instanceMatrix.setUsage(ur),r.add(gt);let _t=new Jo(pt,new To({map:ne,alphaTest:.3}),_.length*12);_t.frustumCulled=!1,_t.instanceMatrix.setUsage(ur),r.add(_t);let vt=new Jo(pt,new To({map:te,alphaTest:.3}),_.length*12);vt.frustumCulled=!1,vt.instanceMatrix.setUsage(ur),r.add(vt);let yt=0,bt=[],xt=[],wt=_.map(e=>{let t=new X(new cs(2.48,.1,2.62),new ac({color:`#785c32`}));t.position.set(e.x,.04,e.z),r.add(t),ft.push(t);let n=new X(new Us(2.4,2.54),new To({map:ut}));n.rotation.x=-Math.PI/2,n.position.set(e.x,.097,e.z),r.add(n),xt.push(n);let i=new J;r.add(i),bt.push(i),rt(Array.from({length:38},()=>({x:e.x+(z()-.5)*2.25,z:e.z+(z()-.5)*2.4})),i);for(let t of[-1.25,1.25])for(let n of[-1.32,1.32])ge(e.x+t,.18,e.z+n,.065,.32,.065,`#e2c38b`);let a=[];for(let t=0;t<3;t++)for(let n=0;n<4;n++)a.push({index:yt++,position:new K(e.x-.89+n*.59,.025,e.z-.86+t*.84),size:1.22+(z()-.5)*.09,phase:z()*Math.PI*2});return a}),Tt=[`#fff5d4`,`#f7d854`,`#e6aa86`];fe=`restored`;let Et=new Gs(.033,5,3);for(let e=0;e<150;e++){let t=z()*21-10.5,n=z()*17-8;if(t>-7&&t<8&&n>-6&&n<4.5)continue;let i=ge(t,.07,n,.015,.12,.015,`#678f38`),a=new X(Et,new To({color:Tt[e%3]}));a.position.copy(i.position).y=.15,a.userData.condition=`restored`,r.add(a),le.push(a)}fe=`both`;for(let[e,t,n]of[[-7,2.8,.35],[8.8,2.9,.3],[-3.5,5,.24],[7,-7,.3]]){let i=new X(new ps(n,1),new ac({color:`#a5a58a`}));i.scale.set(1,.65,.8),i.position.set(e,n*.4,t),r.add(i),le.push(i),pe(e,t,n*2,n*1.5)}ge(St.x,.25,St.z,.72,.5,.62,`#a67436`);for(let e of[.08,.24,.42])for(let t of[-.32,.32])ge(St.x,e,St.z+t,.77,.035,.02,`#e3b86f`);for(let e of le.filter(e=>e.userData.localFence))(e.userData.condition===`restored`?Ye:Xe).attach(e);for(let e of[`both`,`neglected`,`restored`]){let t=le.filter(t=>!t.userData.localFence&&(t.userData.condition??`both`)===e).map(e=>{e.updateMatrix();let t=e.geometry.clone().applyMatrix4(e.matrix),n=e.material.color,i=new Float32Array(t.getAttribute(`position`).count*3);for(let e=0;e<i.length;e+=3)i[e]=n.r,i[e+1]=n.g,i[e+2]=n.b;t.setAttribute(`color`,new Na(i,3));let a=t.index?t.toNonIndexed():t;return r.remove(e),e.geometry.dispose(),e.material.dispose(),a}),n=Mf(t);n&&(e===`neglected`?ue:e===`restored`?de:r).add(new X(n,new ac({vertexColors:!0})));for(let e of t)e.dispose()}let Dt=new X(new Ws(.66,.71,48),new To({color:`#fff4b9`,transparent:!0,opacity:.9,side:2}));Dt.rotation.x=-Math.PI/2,Dt.position.set(St.x,.02,St.z),r.add(Dt);let Ot=new J;r.add(Ot);let kt=(e,t,n,r,i,a,o)=>{let s=new X(new cs(e,t,n),new ac({color:r}));return s.position.set(i,a,o),Ot.add(s),s};kt(.46,.3,.4,`#8fa374`,0,.36,0),kt(.52,.06,.46,`#e1c796`,0,.52,0),kt(.32,.035,.26,`#dfb865`,0,.56,0);for(let e of[-.3,.3]){let t=new X(new us(.17,.17,.08,12),new ac({color:`#6b654b`}));t.rotation.z=Math.PI/2,t.position.set(e,.17,.04),Ot.add(t)}kt(.035,.5,.035,`#ad8750`,-.2,.62,.27).rotation.x=-.35,kt(.035,.5,.035,`#ad8750`,.2,.62,.27).rotation.x=-.35,kt(.45,.045,.045,`#ad8750`,0,.84,.36);let At=pe(0,0,.9,.7),jt=$f();r.add(jt);let Mt=pe(0,0,.8,.9),Nt=Hf(!0);r.add(Nt.root);let Pt=pe(0,0,.85,.65),It=Hf(!0);r.add(It.root),Nt.root.name=`worker-mina`,It.root.name=`worker-ren`,It.root.traverse(e=>{e instanceof X&&e.material instanceof ic&&e.material.color.getHex()===6658171&&e.material.color.set(`#a28cb5`)});let Lt=pe(0,0,.85,.65),Rt=ap(await u,Math.atan2(o.x,o.z));r.add(Rt.root);let zt=pe(0,0,.95,.75),Bt=new X(new Ws(1.23,1.29,4),new To({color:`#fff6b0`,side:2,transparent:!0,opacity:.9}));Bt.rotation.set(-Math.PI/2,0,Math.PI/4),Bt.scale.set(1.38,1.45,1),r.add(Bt),Bt.visible=!1;let Vt=new X(new Ws(.15,.19,32),new To({color:`#fff9cf`,transparent:!0,opacity:.9}));Vt.rotation.x=-Math.PI/2,r.add(Vt),Vt.visible=!1;let Ht=0,Ut=0;function Wt(){Ht=e.clientWidth,Ut=e.clientHeight,n.setSize(Ht,Ut,!1);let t=Ht/Ut,r=t<.8?15.5:13.3;i.left=-r*t/2,i.right=r*t/2,i.top=r/2,i.bottom=-r/2,i.updateProjectionMatrix()}Wt();let Gt=new ResizeObserver(Wt);Gt.observe(e);let Kt=new ll,qt=new Qo(new K(0,1,0),0);function Jt(t,n){let r=e.getBoundingClientRect();Kt.setFromCamera(new G((t-r.left)/r.width*2-1,-(n-r.top)/r.height*2+1),i);let a=Kt.ray.intersectPlane(qt,new K);return a?{x:a.x,z:a.z}:null}function Yt(e,t=0){let n=new K(e.x,t,e.z).project(i);return{x:(n.x+1)/2*Ht,y:(1-n.y)/2*Ut}}let Xt=new yi,Zt=new K,Qt=new Xr,$t=new Xr,en=new Y,tn,nn=Wf(r,t);function rn(e,s,c,l,u=!1){for(let e of x)!e.loading&&e.retryAt<=performance.now()&&e.needed()&&F(e);let p=`${u}/${t.restorationPhase}/${t.projects.has(`town-orchard`)}`;tn!==p&&(tn=p,ue.visible=!u&&t.restorationPhase<3,de.visible=u||t.restorationPhase>=3,$e.forEach((e,n)=>e.material.map=u||t.projects.has(`town-orchard`)||t.restorationPhase>=3+n%3?P:f),I.material.color.set(u?`#c7e3d3`:[`#cfbfaa`,`#cecaaf`,`#c8d0b7`,`#c7dac3`,`#c7dfcc`,`#c7e3d3`][t.restorationPhase-1]),B.material.opacity=u?1:[.56,.64,.72,.8,.9,1][t.restorationPhase-1],B.material.color.set(u?`#ffffff`:`#c8b997`)),qe.visible=u||t.investments.has(`orchard`),qe.children.slice(1).forEach((e,n)=>{e.visible=u||t.orchard.box>0,e.material.color.set(!u&&t.orchard.fruit.pear>0&&(t.orchard.fruit.apple===0||n>=3)?`#ddce56`:`#ce6843`)}),Ge.forEach((e,n)=>{e.material.map=u||t.orchard.ripe(n,c)?ee(n)===`pear`?re:w:t.orchard.trees[n].tended?P:f}),Ve.root.visible=He.visible=!u&&t.investments.has(`driver`)&&t.residentsArrived,Ve.animate(e,s,t.courier.progress>0?`harvesting`:`idle`,t.courier.progress),Ue.visible=We.visible=u||t.investments.has(`kitchen`),Fe.visible=Ie.visible=u||t.projects.has(`town-well`),Le.root.visible=Re.visible=u||t.residentsArrived&&t.projects.has(`town-market`),Le.animate(e,s,`idle`,0),Te.update(t,u),De.update(t,u);for(let{id:e,prop:n}of Oe)n.visible=u||t.enterprises.level(e)>0;ke.root.visible=Ae.visible=u||t.residentsArrived&&t.projects.has(`barn-open`),ke.animate(e,s,`idle`,0);let m=u||t.projects.has(`cottage-repair`);be.material.map=m?j:v,V.value=+!!m,it.visible=!u&&!t.projects.has(`cottage-yard`),je.visible=Ne.visible=u||t.projects.has(`cottage-welcome`),Me.animate(e,s,`idle`,0),ve.material.map=u||t.projects.has(`barn-open`)?C:t.projects.has(`barn-roof`)?E:t.projects.has(`barn-walls`)?T:d,ye.value=!u&&!t.projects.has(`barn-open`)&&t.projects.has(`barn-walls`)?1:0;for(let[e,n]of ot)n.visible=!u&&!t.projects.has(e);for(let[e,n]of Ze)n.visible=!u&&t.projects.has(e);if(Ye.visible=u||t.projects.has(`fence`),Xe.visible=!u&&!t.projects.has(`fence`),Ht/Ut<.8){let n=new K(t.player.x,1.8,t.player.z-.3);a.lerp(n,1-Math.exp(-3*e))}else t.player.z<-3.5?a.lerp(new K(t.player.x,1.8,t.player.z+.5),1-Math.exp(-3*e)):t.player.x>9.5&&t.player.x<23&&t.player.z>2.4?a.lerp(new K(t.player.x,1.8,t.player.z-.7),1-Math.exp(-3*e)):a.lerp(new K(t.player.z>6&&t.player.x<9.5?2:Math.max(0,Math.min(28,(t.player.x-7)*1.7)),1.8,Math.min(12.5,.5+Math.max(0,t.player.z-5)*1.5)),1-Math.exp(-3*e));i.position.copy(a).add(o),i.lookAt(a),i.updateMatrixWorld(),Rt.root.position.set(t.player.x,0,t.player.z),zt.position.set(t.player.x,.013,t.player.z),Rt.animate(e,s,u?`idle`:t.action,t.progress),wt.forEach((e,n)=>{let r=t.plots[n],a=t.isUnlocked(n);bt[n].visible=!u&&r.land===`overgrown`,xt[n].visible=u||a,ft[n].visible=u||a,xt[n].material.map=u||r.land===`tilled`?ut:dt,xt[n].material.color.set(!u&&r.land===`overgrown`?`#a6a07b`:`#ffffff`);let o=r.stage===`ready`?1:Math.max(.14,1-(r.readyAt-c)/(t.growSeconds(r.crop)*1e3));for(let t of e){let e=u?t.size:r.stage===`empty`?0:t.size*D[r.crop].size*(r.stage===`ready`?1:.22+o*.64);Zt.setScalar(u||r.crop===`corn`?e:0),en.set(u||r.stage===`ready`?`#ffffff`:`#91b65c`),$t.setFromAxisAngle(new K(0,0,1),Math.sin(s*1.3+t.phase)*.015),Qt.copy(i.quaternion).multiply($t),mt.setMatrixAt(t.index,Xt.compose(t.position,Qt,Zt)),mt.setColorAt(t.index,en),Zt.setScalar(!u&&r.crop===`turnip`?e:0),gt.setMatrixAt(t.index,Xt.compose(t.position,Qt,Zt)),gt.setColorAt(t.index,en),Zt.setScalar(!u&&r.crop===`kabumorokoshi`?e:0),_t.setMatrixAt(t.index,Xt.compose(t.position,Qt,Zt)),_t.setColorAt(t.index,en),Zt.setScalar(!u&&r.crop===`pumpkin`?e:0),vt.setMatrixAt(t.index,Xt.compose(t.position,Qt,Zt)),vt.setColorAt(t.index,en)}}),mt.instanceMatrix.needsUpdate=!0,mt.instanceColor&&(mt.instanceColor.needsUpdate=!0),gt.instanceMatrix.needsUpdate=!0,gt.instanceColor&&(gt.instanceColor.needsUpdate=!0),_t.instanceMatrix.needsUpdate=!0,_t.instanceColor&&(_t.instanceColor.needsUpdate=!0),vt.instanceMatrix.needsUpdate=!0,vt.instanceColor&&(vt.instanceColor.needsUpdate=!0),ze.visible=Be.visible=t.investments.has(`truck`)||u,Ot.visible=At.visible=!u&&t.investments.has(`seeder`);let h=t.plots[t.seederWorkingPlot]??t.plots[t.assignedPlots(`seeder`)[0]],g=h?{x:h.x-1.05,z:h.z+1.1}:{x:St.x+.9,z:St.z-.5};Ot.position.lerp(new K(g.x,t.seederProgress>0?Math.sin(s*18)*.015:0,g.z),1-Math.exp(-3*e)),At.position.set(Ot.position.x,.014,Ot.position.z);for(let[n,r,i]of[[0,Nt,Pt],[1,It,Lt]]){let a=t.workers.people[n];r.root.visible=i.visible=!u&&t.workers.enabled(a,t),r.root.position.set(a.position.x,0,a.position.z),r.root.rotation.y=a.heading,i.position.set(a.position.x,.013,a.position.z),r.animate(e,s,a.action===`returning`?a.route.length?`walking`:`idle`:a.action,a.progress)}if(jt.visible=Mt.visible=!1,Bt.scale.set(t.harbor.active?.7:1.38,t.harbor.active?.7:1.45,1),Bt.visible=!u&&t.isWorking,t.workPoint){let e=t.workPoint;Bt.position.set(e.x,.12,e.z)}Vt.visible=!!l,l&&Vt.position.set(l.x,.14,l.z),t.agricultureComplete&&ce(),L?.update(e,s,t.harbor,u),Ee.update(t),Se.update(t,u,e),Ce.update(t,c),xe.update(t,u,e,s),H.forEach(n=>n.update(t,u,e,s));let _=Yt(t.player,.75),y=new K(t.player.x,.75,t.player.z).applyMatrix4(i.matrixWorldInverse).z;for(let t of me){let n=Yt(t.position,t.position.y),r=t.scale.y*Ut/(i.top-i.bottom),a=t.position.clone().applyMatrix4(i.matrixWorldInverse).z,o=!u&&t.visible&&a>y+.05&&Math.abs(_.x-n.x)<r*.4&&_.y>n.y-r*.91&&_.y<n.y+r*.04?.24:1;t.material.opacity=Yr.lerp(t.material.opacity,o,1-Math.exp(-12*e));let s=t.material.opacity<.99;t.material.transparent!==s&&(t.material.transparent=s,t.material.needsUpdate=!0),t.material.depthWrite=!s,t.material.alphaTest=s?.03:.3}nn.update(e,s),n.render(r,i)}function an(){let e=n.getRenderTarget(),t=new gi(640,400);t.texture.colorSpace=ir;let i=new Uc(-24,24,15,-15,.1,200);i.position.set(30,35,46),i.lookAt(9,0,-1),i.updateMatrixWorld();try{n.setRenderTarget(t),n.render(r,i);let e=new Uint8Array(1024e3);n.readRenderTargetPixels(t,0,0,640,400,e);let a=document.createElement(`canvas`);a.width=640,a.height=400;let o=a.getContext(`2d`),s=o.createImageData(640,400);for(let t=0;t<400;t++)s.data.set(e.subarray((399-t)*640*4,(400-t)*640*4),t*640*4);return o.putImageData(s,0,0),a.toDataURL(`image/jpeg`,.7)}finally{n.setRenderTarget(e),t.dispose()}}return{readyForPhoto:()=>x.every(e=>!e.needed()||e.retryAt===1/0)&&(!t.agricultureComplete||!!L),captureTown:an,update:rn,groundPoint:Jt,screenPoint:Yt,farmer:Rt,renderer:n,scene:r,camera:i,dispose:()=>{Gt.disconnect(),n.dispose()}}}function dp(e){if(e.episodes.festival)return`収穫祭は開催済みです`;if(!e.agricultureComplete)return`農業地区を復興し、港への供給協定を完成させよう`;let t=Ne(e);return t.complete?``:`農業地区の仕事をあと${t.total-t.done}件叶えよう`}function fp(e){return dp(e)||Math.hypot(e.player.x-c.festival.x,e.player.z-c.festival.z)>1.35?!1:(e.episodes.festival=!0,e.revision++,e.message=`収穫祭が始まります。農業地区の仕事を、すべて叶えました。`,!0)}var pp={market:`ハルの売り場に商品が並びました。次は看板の作物を選んで、この街で初めての市を開きましょう。`,meal:`あなたが多く出荷してきた実りから、ユイが献立を思い出します。これからの日々に残る、食堂の味をつくりましょう。`,orchard:`古い帳面に、果樹園の手入れの記録が残っていました。木陰の道と売店を戻し、実りを次の人へつなぎましょう。`,mina:`ミナが、自分の農具で畑を任されたいと相談に来ました。農具を整えたあと、本人の新しい収穫24個を見届けましょう。`,ren:`レンは、箱を抱えて歩くときの段差が気になるそうです。北と南、よく使う道から整えましょう。`,family:`家と庭に暮らしが戻りました。ユイたちのお願いの続きに、野菜料理か果実のおやつを選び、家族の食卓を囲みましょう。`};function mp(e){let t=Ne(e),n=dp(e);return`<div class="restoration-summary"><small>農業地区の物語</small><strong>実りの先の、暮らしへ。</strong><p>6つの物語は、好きな順に。選んだ道や献立は、どちらでも完結できます。港へ出たあとも続けられます。</p><p>物語 ${e.episodes.finished}/6 · 農業地区の仕事 ${t.done}/${t.total}</p><button data-festival-jump>収穫祭の準備と残りの仕事を見る</button></div>
 ${Oe.map(t=>{let n=e.episodes.states[t.id],r=e.episodes.kind(t.id),i=e.episodes.reason(t.id,e),a=e.episodes.near(t.id,e),o=e.episodes.requirements(t.id),s=t.choices.find(e=>e.id===n.choice)?.title??(t.id===`meal`&&n.choice?L[n.choice].name:``);return`<article class="episode-card" id="episode-${t.id}"><header><img src="./art/story/${t.portrait}.jpg" alt="${t.person}" loading="lazy"><div><small>${t.person} · ${n.stage}/4</small><h3>${t.title}</h3></div></header><p>${r===`done`?`物語が完結しました。${t.person}から手紙が届いています。`:pp[t.id]}</p>${s?`<p>わたしたちの選択：${s}</p>`:``}<ol>${t.chapters.map((e,t)=>`<li class="${n.stage>t?`done`:``}">${n.stage>t?`✓ `:``}${e}</li>`).join(``)}</ol><p class="episode-reward">${r===`done`?`今の効果`:`完結すると`}：${t.reward}</p>
 ${i?`<p>${i}</p>`:r===`done`?`<details class="resident-letter"><summary>${t.person}からの手紙</summary><p>${t.letter}</p></details>`:a?r===`choice`?t.choices.length?t.choices.map(n=>`<button data-episode-choice="${t.id}" data-choice="${n.id}" ${t.id===`market`&&!e.cropUnlocked(n.id)||t.id===`family`&&n.id===`appleJam`&&!e.investments.has(`orchard`)?`disabled`:``}>${n.title}<small>${n.detail}</small></button>`).join(``):`<button data-episode-choice="${t.id}" data-choice="agreed">${t.id===`meal`?`献立を聞く · ${L[e.episodes.recipe()].name}`:`話を聞く`}</button>`:r===`work`?`<p>作業 ${Math.floor(n.work)}/30秒 · 離れても続きから再開</p><button data-episode-work="${t.id}">${t.chapters[1]}（作業開始）</button>`:r===`observe`?`<p>農具を整えた後のミナの収穫：${Math.min(24,Math.max(0,e.workers.people[0].harvested-n.baseline))}/24個。畑を耕して、ミナが働く様子を見届けよう。ほかの仕事へ行っても進みます。</p>`:r===`deliver`?`<p>${Object.entries(o).map(([e,t])=>`${ue(e)} ${n.delivered[e]??0}/${t}個`).join(`・`)}</p><small>作物はかごと倉庫、食品は加工台から。少しずつ渡せます。</small><button data-episode-deliver="${t.id}" ${Object.entries(o).some(([t,r])=>(n.delivered[t]??0)<r&&e.episodes.available(t,e)>0)?``:`disabled`}>持ち寄った実りを渡す</button>`:`<button data-episode-celebrate="${t.id}">${t.chapters[3]}</button>`:`<button data-episode-travel="${t.id}">${t.person}のところへ歩く</button>`}</article>`}).join(``)}
 <article class="episode-card festival-card"><small>農業地区の締めくくり</small><h3>${e.episodes.festival?`収穫祭の記念状`:`みんなの収穫祭`}</h3><p>${e.episodes.festival?`ひとりの畑から、みんなの農園へ。農業地区のすべての仕事と物語を叶えました。これからも、この農園で暮らせます。`:`復興・住民のお願い・6つの物語・料理帖を揃えて、広場で収穫祭を開きましょう。`}</p>${e.episodes.festival?`<button data-story="agriculture-harvest-festival">収穫祭を読み返す</button>`:`<p>${n||`準備が揃いました。広場に集まろう。`}</p><button data-festival-travel ${n?`disabled`:``}>広場へ歩く</button><button data-festival ${n||Math.hypot(e.player.x-c.festival.x,e.player.z-c.festival.z)>1.35?`disabled`:``}>ここで収穫祭を開く</button>`}</article>
 <details class="work-records"><summary>料理帖 · ${F.filter(t=>e.episodes.crafted[t]>0).length}/8</summary>${F.map(t=>`<p>${e.episodes.crafted[t]>0?`✓`:`○`} ${L[t].name} · ${e.episodes.crafted[t]}個調理</p>`).join(``)}<p>料理は加工台、果実は果樹園で用意できます。</p></details>
 <details class="work-records"><summary>残っている農業地区の仕事 · ${t.total-t.done}件</summary>${Me(e).filter(e=>!e.done).map(e=>`<p>○ ${e.title}</p>`).join(``)||`<p>すべて叶いました。</p>`}</details>`}var hp=e=>Oe.some(t=>t.id===e)?ke(e).point:null;function gp(e){let t=e.harbor,n=Math.hypot(e.player.x-ht.sales.x,e.player.z-ht.sales.z)<1.2;return`<div class="restoration-summary"><small>第2ステージ · 海産</small><strong>港の仕事</strong><p>農園で過ごす間も、船が実りを運びます。</p></div>
 <p class="note-intro">港の魚 ${t.fish} / ${t.capacity}匹 · 累計出荷 ${t.sold}匹</p>
 <article class="investment-card"><h3>浜で網を引く</h3><p>桟橋の南にある網の場所。止まると4秒で1匹ずつ水揚げします。</p><button id="sea-nets" data-sea="nets" ${t.reason(`nets`,e)?`disabled`:``}>${t.reason(`nets`,e)||`浜へ歩いて片付ける`}</button><button id="sea-fishing" ${t.cleaned?``:`disabled`}>網を引く場所へ</button></article>
 <article class="investment-card"><h3>桟橋を直す · 200メニー</h3><p>魚を累計12匹出荷すると修理できます。修理は5秒。桟橋が完成すると漁船を迎えられます。</p><button id="sea-pier" data-sea="pier" ${t.reason(`pier`,e)?`disabled`:``}>${t.reason(`pier`,e)||`桟橋へ歩いて修理する`}</button></article>
 <article class="investment-card"><h3>漁船の定期水揚げ</h3><p>一度迎えると自動で出漁。10分ごとに120匹をまとめて水揚げし、再出漁します。港の保管上限は600匹に増えます。</p>
 <button id="buy-boat" ${!t.pier||t.boat||e.coins<400?`disabled`:``}>${t.boat?`漁船を導入済み`:t.pier?e.coins<400?`漁船まであと`+(400-e.coins)+`メニー`:`400メニーで漁船を迎え、自動出漁`:`先に桟橋を直そう`}</button>
 ${t.boat?`<p id="voyage-status"><strong>${t.voyageState}</strong><br>${t.boatCargo>0?`帰港まで ${Math.floor(t.secondsLeft/60)}分${t.secondsLeft%60}秒 · 船の魚 ${t.boatCargo}匹`:``}<br>直近の漁獲 ${t.lastCatch}匹 · 帰港 ${t.trips}回</p><button id="sea-operation">${t.enabled?`次の出漁を休む`:`自動出漁を再開する`}</button>`:``}
 <small>出漁中に休止しても帰港と水揚げは行います。満杯のときは魚を船に残して待ちます。メニュー中・アプリを閉じている間の航海は進みません。</small></article>
 <article class="investment-card"><h3>水揚げ箱から届ける</h3><p>売ると1匹8メニー。片付け済みの共同食堂へ送ると、1匹につき復興の準備が8進みます。</p><button id="sea-sales">水揚げ箱へ歩く</button><button id="sea-sell" ${!n||!t.fish?`disabled`:``}>${n?`魚をすべて出荷する`:`水揚げ箱のそばで出荷`}</button><button id="sea-canteen" ${!n||!t.canteenOffer(e)?`disabled`:``}>共同食堂へ魚を${t.canteenOffer(e)||20}匹届ける</button><small>食堂の敷地が未整備・準備完了・全段階完成の場合は納品できません。</small></article>
 <div class="seeder-assignment"><h3>農園からの差し入れ</h3><p>出漁時に倉庫から最大6個を使用。1個につき漁獲量+10匹、最大180匹です。手作業は作物1個で1匹から2匹に。作物がなくても漁は続きます。</p><label for="sea-supply">使う作物</label><select id="sea-supply"><option value="none">差し入れを休む</option>${E.map(t=>`<option value="${t}">${D[t].name}（倉庫 ${e.stock[t]}個）</option>`).join(``)}</select><p>差し入れ ${t.supplied}個 · 食堂へ届けた魚 ${t.donated}匹</p></div>`}var _p=e=>[`expansion`,`pasture`,`north-meadow`,`north-ridge`].includes(e)?`land`:e.startsWith(`seeder`)||e.startsWith(`harvester`)?`machines`:e.startsWith(`helper`)?`people`:[`tools`,`basket`].includes(e)?`hands`:[`truck`,`driver`,`warehouse`].includes(e)?`sales`:`crops`,vp=e=>e.z<-8?e.x<0?`北の農道`:e.x<9?`北の農地`:`北東の設備置き場`:e.z>6?`南の土地`:e.x<0?`納屋と出荷道`:e.x>9?`住宅地のそば`:`畑の周辺`;function yp(e){let t=[],n=[],r=[],i=[],a=e.plots.map((e,t)=>({p:e,i:t})).filter(({i:t})=>e.isUnlocked(t)).sort((t,n)=>Tt(t.p,e.player)-Tt(n.p,e.player)),o=[{id:`harvest`,title:`実った作物を収穫する`,detail:`収穫の経験を積んで、作物と自分の品質を育てよう。`,find:({p:t})=>t.land===`tilled`&&t.stage===`ready`&&e.inventory+D[t.crop].yield<=e.capacity},{id:`clear`,title:`次の畑の草を刈る`,detail:`費用なしで片付けられます。歩きやすい土地へ。`,find:({p:e})=>e.land===`overgrown`},{id:`till`,title:`片付いた畑を耕す`,detail:`種をまける土地を増やそう。費用はかかりません。`,find:({p:e})=>e.land===`cleared`},{id:`plant`,title:`空いた畑に種をまく`,detail:`畑のそばで作物を選び、止まると種をまきます。`,find:({p:e,i:t})=>e.land===`tilled`&&e.stage===`empty`}];for(let e of o){let n=a.find(e.find);n&&t.push({id:e.id,title:e.title,detail:e.detail,place:`畑 ${n.i+1} · ${vp(n.p)}`,point:{x:n.p.x,z:n.p.z+1.02}})}if(e.inventory>0&&n.push({id:`shipping`,title:`かごの実りを出荷する`,detail:`${e.inventory}個を通常出荷。売り上げは ${E.reduce((t,n)=>t+e.cargoQuality.value(n,e.salePrice(n)),0)}メニー。`,place:`${vp(St)}の出荷箱`}),e.investments.has(`truck`)){let t=k.find(t=>!e.orderReason(t.id));t&&n.push({id:`order`,title:`「${t.title}」へ届ける`,detail:`揃っている作物を注文へ。通常出荷と売り先を選べます。`,place:`南の販売車`})}e.investments.has(`kitchen`)&&n.push({id:`cooking`,title:e.kitchen.stored?`食品の売り先を選ぶ`:`次に作る料理を選ぶ`,detail:e.kitchen.stored?`食品棚に${e.kitchen.stored}個。販売・食品注文・復興への持ち寄りに使えます。`:`原料を加工へ回すか、そのまま売るかを選ぼう。`,place:e.kitchen.stored?`販売車／復興事業の案内板`:`納屋の加工台`}),e.investments.has(`orchard`)&&t.push({id:`orchard`,title:`果樹園を見回る`,detail:`木の手入れと果実の収穫、集荷箱の出荷を選べます。`,place:`住宅地の南の果樹園`,point:we.sales});for(let t of b.filter(t=>!e.projectReason(t.id)))r.push({id:t.id,title:(w.includes(t.id)?`メイン · `:`サブ · `)+t.title,detail:t.cost?`${t.cost.toLocaleString()}メニー。${t.detail}`:t.detail,place:`掃除用具で仕事を選び、現地へ`});for(let t of se){let n=e.enterprises.states[t.id];if(e.enterprises.reason(t.id,e)||n.level===3)continue;let i=t.targets[n.level];n.cleared&&n.contributed<i&&!le.some(n=>e.enterprises.offer(t.id,n,e))||r.push({id:t.id,title:`${t.title} · ${n.cleared?n.contributed===i?`建築を進める`:`実りを持ち寄る`:`敷地の片付け`}`,detail:t.detail,place:t.id===`depot`?`北の集荷所の案内板`:t.id===`harbor-link`?`港の入口の案内板`:t.id===`seed-garden`?`北の畑・配合実験台の隣`:`住宅地の東・広場の食堂`})}for(let t of bt.filter(t=>!e.investmentReason(t.id,!0)).sort((t,n)=>t.price-(e.funding.paid[t.id]??0)-(n.price-(e.funding.paid[n.id]??0)))){if(e.coins<=0)break;let n=xe(e).find(e=>e.id===t.id);if(!n)continue;let r=t.price-(e.funding.paid[t.id]??0);i.push({id:t.id,title:t.title,detail:`あと ${r.toLocaleString()}メニー${r>e.coins?` · 今は途中まで納付できます`:``}。${t.detail}`,place:`${vp(n)}のMマス`})}let s=[];for(let t of _e){let n=e.requests.progress[t.id];e.residentsArrived&&e.projects.has(t.requires)&&n.chapter<t.chapters.length&&s.push({id:`request-`+t.id,title:t.name+` · `+t.chapters[n.chapter].title,detail:`現地で、作物・料理・メニーから持ち寄り方を選べます。`,place:t.name+`のところ`,point:t})}for(let t of Oe)!e.episodes.reason(t.id,e)&&!e.episodes.done(t.id)&&s.push({id:`episode-`+t.id,title:t.title,detail:t.chapters[e.episodes.states[t.id].stage]+`。「住民の物語」から進められます。`,place:t.person+`のところ`,point:t.point});let c=new Set,l=[],u=[];for(let e of i){let t=_p(e.id);c.has(t)?u.push(e):(l.push(e),c.add(t))}i.splice(0,i.length,...l,...u),(e.harvesters.length||e.residentsArrived&&e.investments.has(`helper`)||e.investments.has(`seeder`))&&i.push({id:`assignments`,title:`自動化の稼働状況を見る`,detail:`購入した地域の設備は常時稼働。品質や運搬状況を確認できます。`,place:`畑の東の機械置き場`});for(let a of[...t,...n,...r,...i])a.point??=b.find(e=>e.id===a.id)??se.find(e=>e.id===a.id)??V.find(e=>e.id===a.id)??{shipping:St,order:O,cooking:e.kitchen.stored?O:ie,orchard:we.sales,assignments:ye}[a.id];return[{id:`residents`,title:`住民のお願い・物語`,options:s},{id:`town`,title:`メインの復興・街の手入れ`,options:r},{id:`hands`,title:`日々の仕事 · 栽培`,options:t},{id:`sales`,title:`日々の仕事 · 出荷`,options:n},{id:`investments`,title:`サブクエスト · 農園の改善（任意）`,options:i}].filter(e=>e.options.length>0)}function bp(e){return`<div class="stage-requirements"><h3>農園から、街の産業へ</h3><p>農園の基盤30%・好きな2つの復興事業50%・港への供給協定20%。3つの事業を全部完成させる必要はありません。</p>${se.map(t=>{let n=e.enterprises.states[t.id];return`<p><strong>${n.level===3?`✓`:`○`} ${t.title}</strong> · ${n.level}/3段階<br><small>${t.detail} ${t.id===`depot`?`北の農道の西側`:t.id===`seed-garden`?`住宅地の北側`:t.id===`canteen`?`住宅地の東側`:`港の入口`}に案内板があります。</small></p>`}).join(``)}</div>`}function xp(e){let t=e.enterprises.nearby(e);if(!t)return``;let n=e.enterprises.states[t.id],r=e.enterprises.reason(t.id,e),i=t.targets[n.level];return`<div class="restoration-summary"><small>農園の実りで、暮らしを戻そう</small><strong>${t.title}</strong><p>${t.detail}</p></div>
 <div class="seeder-assignment"><h3>${n.level===3?`完成しました！`:t.chapters[n.level]}</h3><p>${r||(n.cleared?n.level===3?`街の新しい場所が使えます。`:n.contributed===i?`準備が整いました。画面を閉じ、この場所で止まると建築します。`:`準備 ${n.contributed.toLocaleString()} / ${i.toLocaleString()} · 少しずつ持ち寄れます。`:`画面を閉じて、この場所で止まると敷地を片付けます。`)}</p>
 ${t.benefits.map((e,t)=>`<p>${n.level>t?`✓`:`○`} 第${t+1}段階：${e}</p>`).join(``)}</div>
 ${n.cleared&&n.level<3&&!r&&n.contributed<i?`<p class="note-intro">作物はかご、果実は集荷箱、食品は加工台の棚から使います。低い品質から渡し、高品質ほど準備が進みます。残りを満たす最小個数を渡し、端数は次の段階に繰り越しません。</p><div class="investment-list">${le.filter(t=>e.enterprises.available(t,e)>0).map(n=>{let r=e.enterprises.offer(t.id,n,e);return r?`<button class="harbor-travel" data-enterprise="${t.id}" data-donation="${n}">${ue(n)} ${r.amount.toLocaleString()}${n===`coins`?`メニー`:`個`}を届ける · 準備 +${r.value.toLocaleString()}</button>`:``}).join(``)||`<p>かごに実りを集めるか、出荷してメニーを用意しよう。</p>`}</div>`:``}
 ${t.id===`depot`&&n.level>=1?`<div class="seeder-assignment"><h3>共同倉庫 · ${e.stored}/${e.storageCapacity}個</h3><button id="depot-deposit" ${e.transferReason(`deposit`)?`disabled`:``}>${e.transferReason(`deposit`)||`かごの作物を共同倉庫へ預ける`}</button>${E.filter(t=>e.stock[t]>0).map(t=>`<button data-depot-crop="${t}" ${e.transferReason(t)?`disabled`:``}>${D[t].name}をかごへ · 倉庫 ${e.stock[t]}個</button>`).join(``)}${n.level===3?`<p>通常出荷は南側の入口にある出荷箱へ。倉庫への預け入れと売却を選べます。</p>`:``}</div>`:``}`}var Sp=e=>`<article class="work-option" data-work-option="${e.id}"><h4>${e.title}</h4><p>${e.detail}</p><small>${e.place}</small>${e.point?`<button data-work-travel="${e.id}">ここへ歩く</button>`:``}</article>`,Cp=(e,t)=>{let n=t.completedTasks.has(e.id);return`<article class="task-card ${n?`done`:``}"><span class="task-check" aria-hidden="true">${n?`✓`:`○`}</span><div><h3>${e.title}</h3><p>${e.detail}</p><small>${n?`達成済み`:`${Math.min(e.target,e.count(t))} / ${e.target}`} · 実績 +${e.points}ポイント${e.coins?` · ${e.coins} メニー`:``}</small></div></article>`};function wp(e){let t=e.restorationPercent,n=Dt.filter(t=>e.completedTasks.has(t.id)),r=Dt.filter(t=>!e.completedTasks.has(t.id));return`<div class="restoration-summary"><small>メインストーリー · 街に暮らしを戻そう</small><strong>街の復興 ${t}%</strong><p>${e.restorationPhase} / 6 · ${C[e.restorationPhase-1]}</p><div class="progress-track"><i style="width:${t}%"></i></div><p>${e.agricultureComplete?`農業地区が復興しました。農園を残したまま、港の入口から次の産業へ進めます。`:e.foundationComplete?`基盤が整いました。好きな2つの復興事業を育て、港への供給協定へ。`:`農園の基盤を整え、好きな2つの復興事業を育てよう。すべての設備を買う必要はありません。`}</p></div>
 <h3 class="work-guide-title">${T(e).title}</h3><p>${T(e).detail}</p><h3>メインの復興とサブクエスト</h3><p class="note-intro">復興が本筋です。農具・機械・農地の拡大は任意。手作業を速めたり収量を増やしたり、好きな改善を選べます。</p><div class="work-guide">${yp(e).map(e=>`<section class="work-group" data-work-group="${e.id}"><h3>${e.title}</h3>${e.options.slice(0,e.id===`investments`?3:2).map(Sp).join(``)}${e.options.length>(e.id===`investments`?3:2)?`<details class="work-more"><summary>ほかの選択肢 ${e.options.length-(e.id===`investments`?3:2)}件</summary>${e.options.slice(e.id===`investments`?3:2).map(Sp).join(``)}</details>`:``}</section>`).join(``)||`<p>作物の成長を待つ間、各施設の分担や次の作付けを見回ろう。</p>`}</div>
 <details class="work-records" id="stage-requirements"><summary>ステージ全体の目標</summary><div class="stage-requirements"><h3>農園の再開と街の暮らし</h3><p>次の復興を進め、好きな2事業と港への供給協定を完成へ。サブクエストの購入・実績ポイントはクリア条件ではありません。</p>${w.map(t=>`<div>${e.projects.has(t)?`✓`:`○`} ${x(t).title}</div>`).join(``)}</div>${bp(e)}</details>
 <details class="work-records" id="pending-tasks"><summary>これからの達成記録 · ${r.length}件</summary><p class="note-intro">条件が整った仕事から達成できます。この順に進める必要はありません。</p><div class="task-list">${r.map(t=>Cp(t,e)).join(``)||`<p>基盤の仕事はすべて達成しました。</p>`}</div></details>
 <details class="work-records" id="completed-tasks"><summary>達成した仕事 · ${n.length}件</summary><div class="task-list">${n.map(t=>Cp(t,e)).join(``)||`<p>最初の仕事を終えると、ここに記録されます。</p>`}</div></details>
 <details class="work-records"><summary>全クエストの達成記録 · ${Ne(e).done}/${Ne(e).total}</summary><p>実装済みの有限の目標です。通常出荷の繰り返し回数や、未追加の物語は含みません。</p>${Me(e).map(e=>`<p>${e.done?`✓`:`○`} ${e.title}</p>`).join(``)}</details>
 <button id="task-episodes" class="harbor-travel">住民の物語・料理帖・収穫祭</button><button id="task-records" class="harbor-travel">プレイ記録・セーブ</button>`}function Tp(e){return Be.map((t,n)=>(n===0?e.investments.has(`seeder`):e.plantingLines[n-1].owned(e))?`<section class="seeder-assignment" data-planting-line="${n}"><h3>${t.title}の種まき設備</h3><p>畑 ${t.first+1}〜${t.last}の耕した区画に常時種をまきます。土地を広げると自動で対象が増えます。</p><p>${n===0&&e.investments.has(`seeder-area`)?`1.6`:`2.4`}秒で種まき。作物は畑のそばで選べます。自分や住人も同じ畑を手伝えます。</p></section>`:``).join(``)}function Ep(e){return!e.investments.has(`helper`)||!e.residentsArrived?``:`<div class="seeder-assignment"><h3>農園の仲間</h3><p>耕作した畑を歩き回り、種まき・収穫を手伝います。収穫物はかごに持ち、近い倉庫入口へ運びます。北の集荷所が開くと、北の農地から納屋まで往復せずに預けられます。人ごとに収穫経験を積んで、品質を磨きます。</p><label class="area-control"><input id="helpers-enabled" type="checkbox" ${e.helperPlot>=0?`checked`:``}> 農園の手伝いをお願いする</label>${e.workers.people.filter(t=>e.workers.enabled(t,e)).map(t=>`<p><strong>${t.id===`mina`?`ミナ`:`レン`} · 技能 ${M[e.expertise.personGrade(t.id)]}</strong><br>種まき ${t.planted}回 · 収穫 ${t.harvested}個 · 運搬中 ${t.count} / 12個${t.action===`returning`?` · ${Ye(t.destination)}へ`:``}</p>`).join(``)}<small>休みにすると新しい作業を止め、持っている収穫物を先に倉庫へ届けます。倉庫が満杯なら品物を保って待ちます。</small></div>`}function Dp(e){let t=e.kitchen;if(!e.investments.has(`kitchen`)||t.plan===`none`)return null;let n=L[t.plan],r=[],i=0,a=[];for(let t of E){let o=n.needs[t];o&&(r.push({id:t,name:D[t].name,required:o,available:e.stock[t],missing:Math.max(0,o-e.stock[t]),inBasket:e.cargo[t],source:`共同倉庫`}),i+=e.stockQuality.value(t,e.salePrice(t),o),e.stockQuality.peek(t,o).forEach((e,t)=>{e&&a.push(t)}))}for(let t of A){let o=n.fruit?.[t]??0;o&&(r.push({id:t,name:j[t].name,required:o,available:e.orchard.fruit[t],missing:Math.max(0,o-e.orchard.fruit[t]),inBasket:0,source:`果樹園の集荷箱`}),i+=e.orchard.quality.value(t,j[t].price,o),e.orchard.quality.peek(t,o).forEach((e,t)=>{e&&a.push(t)}))}let o=r.some(e=>e.missing>0),s=t.stored+n.yield>ie.capacity,c=Math.min(...r.map(e=>Math.floor(e.available/e.required))),l=o?null:Math.min(...a),u=l===null?null:n.yield*Math.round(t.salePrice(t.plan,e)*N[l]);return{ingredients:r,batches:c,shelfFree:ie.capacity-t.stored,output:n.yield,grade:l,rawValue:o?null:i,foodValue:u,difference:u===null?null:u-i,state:s?`shelf-full`:o?`ingredients`:`processing`,secondsLeft:Math.max(0,Math.ceil(n.seconds*(1-t.progress)))}}function Op(e,t){let n=t.plots(e),r=n.filter(t=>e.plots[t].stage===`empty`).length,i=n.filter(t=>e.plots[t].stage===`growing`).length,a=n.length-r-i,o=t.loads.filter(t=>t.travelled>=at(rt(e.plots[t.plot],t.destination))&&e.stored+t.count>e.storageCapacity).reduce((e,t)=>e+t.count,0),s,c;return o?(s=`倉庫の空き待ち`,c=`出口で${o}個が待っています。倉庫から出荷・加工するか、収納を増やすと運べます。`):n.length?t.active>=0?(s=`収穫中`,c=`畑 ${t.active+1} · あと約${Math.max(0,Math.ceil(tt[t.tier(e)].seconds*(1-t.progress)))}秒。収穫後はコンベアへ流します。`):a&&t.inTransit+Math.min(...n.filter(t=>e.plots[t].stage===`ready`).map(t=>D[e.plots[t].crop].yield))>12?(s=`コンベアの空き待ち`,c=`運搬中の荷物が倉庫へ届くと、次を収穫できます。設備を更新すると運搬も速くなります。`):a?(s=`次の収穫へ`,c=`自分や住民が作業している畑は、その作業が終わってから担当します。`):r?(s=`種まき待ち`,c=`空いた畑に種をまこう。住民や種まき設備へ任せることもできます。`):(s=`作物の成長待ち`,c=`育つまで別の作業を進められます。収穫できる状態になると動きます。`):(s=`農地の準備待ち`,c=`この地域の土地を開き、草刈りと耕作を終えると自動で動きます。`),{label:s,detail:c,empty:r,growing:i,ready:a,blocked:o}}function kp(e){let t=Dp(e);return t?`<section class="production-status" id="kitchen-supply"><h3>${t.state===`shelf-full`?`食品棚を空けよう`:t.state===`ingredients`?`次の料理の材料を集めよう`:`加工中 · あと約${t.secondsLeft}秒`}</h3><p>今ある材料で ${t.batches}回分 · 食品棚の空き ${t.shelfFree}個（1回で${t.output}個）</p><div class="ingredient-status">${t.ingredients.map(e=>`<div data-ingredient="${e.id}"><strong>${e.name}</strong><span>${e.source} ${e.available} / 必要 ${e.required}個</span><small>${e.missing?`あと${e.missing}個${e.inBasket?` · かごには${e.inBasket}個あります。共同倉庫へ預けよう。`:``}`:`次の1回分が揃っています`}</small></div>`).join(``)}</div>
 ${t.state===`shelf-full`?`<p>加工台で食品を売るか、販売車で注文に届けると、次の料理を作れます。</p>`:``}
 ${t.grade===null?`<p class="batch-value">材料が揃うと、次の料理の品質と売値を確認できます。</p>`:`<div class="batch-value"><strong>次の料理は ${M[t.grade]}ランクの見込み</strong><p>材料を通常出荷：${t.rawValue}メニー<br>料理を通常販売：${t.foodValue}メニー<br>加工による差額 ${t.difference>=0?`+`:``}${t.difference}メニー</p>${t.difference<0?`<small>今回は品質の組み合わせにより、材料をそのまま売る方が高くなります。</small>`:``}<small>現在の在庫を低い品質から使う計算です。ほかの担当者が在庫を使うと変わります。注文の報酬・定期便の手数料は含みません。</small></div>`}
 </section>`:``}function Ap(e,t){let n=Op(e,t);return`<section class="production-status" data-machine-status="${t.slot}"><h4>${n.label}</h4><p>${n.detail}</p><small>担当列：空き ${n.empty}区画 · 生育中 ${n.growing}区画 · 収穫待ち ${n.ready}区画<br>共同倉庫 ${e.stored} / ${e.storageCapacity}個</small></section>`}function jp(e){return e.harvesters.map(t=>{let n=tt[t.tier(e)],r=Be[t.slot];return`<section class="seeder-assignment" data-machine-line="${t.slot}"><h3>${r.title} · ${n.title}</h3><p>畑 ${r.first+1}〜${r.last}の耕した区画で常時稼働。${n.seconds}秒で収穫し、コンベアで倉庫へ運びます。</p><p>品質は到達品質から${n.penalty}ランク低下（下限E）。自分も種まき・収穫でき、近くで止まると自分の作業が優先されます。</p>${Ap(e,t)}<p>運搬中 ${t.inTransit}個 · 搬入済み ${t.delivered}個</p></section>`}).join(``)}var Mp=e=>e.map((e,t)=>e?`<span class="quality-badge grade-${t}" data-grade="${M[t]}">${M[t]} · ${e}個</span>`:``).reverse().join(` `)||`—`;function Np(e){return`<div class="quality-guide"><h3>人は経験で、作物は育てるほどに。</h3><p>収穫時の品質は、作物の熟練と収穫する人の技能の低い方です。設備で上限を解放し、経験を積んで磨きます。</p>${[{id:`player`,name:`あなた`},...e.investments.has(`helper`)&&e.residentsArrived?[{id:`mina`,name:`ミナ`},...e.investments.has(`helper-area`)?[{id:`ren`,name:`レン`}]:[]]:[]].map(t=>{let n=e.expertise.personGrade(t.id),r=e.expertise.people[t.id],i=P[n+1];return`<p><strong>${t.name}の収穫技能 ${M[n]}</strong> · 経験 ${r}回${i===void 0?``:` · 次まで${Math.max(0,i-r)}回`}</p>`}).join(``)}<p>育てるだけではBまで。A・Sには品種改良の研究設備が必要です。Cランクを収穫すると、最初の機械を導入できます。</p></div>`}function Pp(e,t){let n=e.harvestGrade(t),r=e.expertise.cropGrade(t,e.research);return`収穫見込み <strong>${M[n]}ランク</strong> · ${Math.round(e.salePrice(t)*N[n])}メニー/個<br>作物の熟練 ${M[r]} · 栽培経験 ${e.expertise.crops[t]}回`}function Fp(e){return`<div class="restoration-summary"><small>品質は収穫したときのまま</small><strong>収穫かご · ${e.inventory} / ${e.capacity}個</strong><p>納屋前の出荷箱で止まると売れます。倉庫へ預けても品質は変わりません。取り出し・注文・贈りものには低い品質から使います。</p></div>${E.filter(t=>e.cropUnlocked(t)).map(t=>`<article class="quality-stock"><h3>${D[t].name}</h3><p>${Mp(e.cargoQuality.peek(t))}</p><small>通常出荷の合計 ${e.cargoQuality.value(t,e.salePrice(t))}メニー</small></article>`).join(``)}<h3>加工台の食品棚</h3>${F.filter(t=>e.kitchen.goods[t]>0).map(t=>`<p>${L[t].name} ${Mp(e.kitchen.quality.peek(t))}</p>`).join(``)}<h3>果樹園の集荷箱</h3>${A.map(t=>`<p>${j[t].name} ${Mp(e.orchard.quality.peek(t))}</p>`).join(``)}${Np(e)}`}function Ip(e){return`<div class="restoration-summary"><small>実りの先に、誰かの暮らし。</small><strong>住人からのお願い</strong><p>家族、青果市、納屋の仲間。気になる人から、少しずつ。途中で別のお願いへ向かっても、届けた分は残ります。</p></div><p class="note-intro">作物・食品・リンゴを届けるか、メニーで準備を手伝えます。どの方法を組み合わせても同じ景観が戻ります。通常の出荷とは別の、街への贈りものです。</p>${_e.filter(t=>Math.hypot(e.player.x-t.x,e.player.z-t.z)<1.8).map(t=>{let n=e.requests.progress[t.id],r=t.chapters[n.chapter],i=e.residentsArrived&&e.projects.has(t.requires),a=r?Math.floor(n.contributed/r.target*100):100;return`<article class="investment-card resident-request" id="resident-${t.id}"><small>${t.name} · ${n.chapter} / ${t.chapters.length} のお願い</small><h3>${r?.title??`みんなの暮らす場所に`}</h3><p>${r?.detail??`この場所に、実りを分け合う暮らしが戻りました。`}</p>
   ${n.chapter>0?`<p class="resident-thanks">${t.chapters[n.chapter-1].thanks}</p>`:``}
   ${i?r?`<div class="progress-track"><i style="width:${a}%"></i></div><p>準備 ${a}% · 完了すると、この場所に${[`花が飾られます`,`食卓ができます`,`お祝いの飾りがつきます`][n.chapter]}。</p><div class="resident-offers">${Object.keys(r.accepts).map(i=>{let a=i,o=e.requests.offer(t.id,a,e),s=o?.amount??0,c=Math.min(100,Math.floor((n.contributed+s*r.accepts[a])/r.target*100));return`<button data-resident="${t.id}" data-contribution="${a}" ${o?``:`disabled`}>${o?`${z[a]} ${s}${a===`coins`?`メニーで支援`:`個を届ける`} · 準備 ${c}%へ`:`${z[a]}がありません`}</button>`}).join(``)}</div>`:`<p>この場所へのお願いは、すべて叶いました。</p>`:`<p class="order-hint">「${x(t.requires).title}」を終えたら、お話しできます。</p>`}
   <small>作物はかご、食品は加工台の棚、リンゴは果樹園の箱から。現地で渡した時に使います。移動中に取りやめても減りません。</small></article>`}).join(``)}`}function Lp(e){let t=Math.floor(e);return t<60?`${t}秒`:t<3600?`${Math.floor(t/60)}分 ${t%60}秒`:`${Math.floor(t/3600)}時間 ${Math.floor(t%3600/60)}分`}function Rp(e){return`<article class="investment-card play-journal"><h3>農園での歩み</h3><p>畑を育て、街を整えてきた記録です。時間の長さで仕事や次の地区が開くことはありません。</p>
    <strong id="journal-total">農園で遊んだ時間の目安 · ${Lp(e.activeSeconds)}</strong>
    ${e.partial?`<p class="order-hint">この農園は途中から計測しています。以前に遊んだ時間は含みません。</p>`:``}
    <dl class="journal-times">${Object.entries({moving:`移動`,working:`手作業`,looking:`農園を見渡す時間の目安`,notebook:`ノートを読む・選ぶ時間の目安`,idle:`しばらく操作がなかった時間`,unobserved:`画面更新が止まり、確認できない時間`}).map(([t,n])=>`<div><dt>${n}</dt><dd>${Lp(e.seconds[t])}</dd></div>`).join(``)}</dl>
    <p class="note-intro">最後の操作から30秒以内を目安にしています。考え中と放置は完全には区別できません。ノートの時間は別枠で、比較画面・別タブ・オフラインは合計に含みません。</p>
    <h4>農園の節目</h4><ol class="journal-milestones">${Object.entries(ut).map(([t,n])=>{let r=e.milestones[t];return`<li><strong>${n}</strong><span>${r===void 0?`これから`:r===null?`計測前に達成`:`${Lp(r.active)} · ノート ${Lp(r.notebook)}`}</span></li>`}).join(``)}</ol><p class="note-intro">記録ファイルにも含まれます。外部への自動送信はありません。</p></article>`}function zp(e,t){let n=e.orchard;return`<section id="orchard-section"><div class="restoration-summary"><small>植え直さずに、次の実りを待つ。</small><strong>住宅地の小さな果樹園</strong><p>枝を手入れすると何度でも実ります。リンゴは75秒で4個、ナシは105秒で3個。果実のまま出荷するか、加工台でお菓子にします。</p></div><div class="plot-grid">${n.trees.map((r,i)=>`<button data-tree="${i}" ${n.unlocked(i,e)?``:`disabled`}><strong>${j[ee(i)].name}の木 ${i+1}</strong><small>${n.unlocked(i,e)?r.tended?n.ripe(i,t)?`収穫できます`:`実りまで ${Math.max(0,Math.ceil((r.readyAt-t)/1e3))}秒`:`枝の手入れから`:`園の再開から`}</small></button>`).join(``)}</div><div class="seeder-assignment"><h3>果樹園の集荷箱 · ${n.box} / ${we.capacity}個</h3>${A.map(e=>`<p>${j[e].name} ${Mp(n.quality.peek(e))} · 合計 ${n.quality.value(e,j[e].price)}メニー</p>`).join(``)}<p>累計収穫 ${n.harvested}個 · 出荷 ${n.sold}個 · 加工 ${n.processed}個</p><button id="orchard-sell" ${n.box>0?``:`disabled`}>箱の果実をまとめて出荷する</button><small>加工台は必要な果実をこの箱から使います。出荷すると原料もなくなるので、加工したい分は先に料理へ。定期便は共同倉庫の作物を担当します。</small></div></section>`}function Bp(e){if(!e.investments.has(`driver`))return`<p class="order-hint">販売車と納屋が揃ったら、配達の仲間を迎えて倉庫の作物の出荷を任せられます。</p>`;let t=e.courier,n=t.reserves(e),r=E.reduce((e,t)=>e+n[t],0);return`<div class="seeder-assignment"><h3>販売車の定期便</h3><p>倉庫の作物を${pt.seconds}秒ごとに最大${pt.load}個出荷します。手数料は1個${pt.fee}メニー。かごと食品棚、果実の集荷箱は使いません。</p><label class="area-control"><input id="courier-enabled" type="checkbox" ${t.enabled?`checked`:``}> 定期便を動かす</label><label for="courier-policy">倉庫に残しておく作物</label><select id="courier-policy">${Object.keys(ft).map(e=>`<option value="${e}" ${t.policy===e?`selected`:``}>${ft[e].title}</option>`).join(``)}</select>
 ${t.policy===`custom`?`<p>0個なら、その作物はすべて出荷できます。1種類0〜240個で指定します。</p><div class="reserve-fields">${E.filter(t=>e.cropUnlocked(t)).map(e=>`<div class="reserve-field"><label for="reserve-${e}">${D[e].name}を残す数</label><input id="reserve-${e}" data-reserve-crop="${e}" type="number" inputmode="numeric" min="0" max="240" step="1" value="${t.custom[e]}"></div>`).join(``)}</div>`:``}
 ${t.policy===`kitchen`?`<p>${e.kitchen.plan===`none`?`加工がお休みの間は、コーン6個・カブ4個を残します。`:`${L[e.kitchen.plan].name}の材料1回分を確保します。加工台で料理を変えると、この確保数も変わります。`}</p>`:``}
 <p>残す作物：${E.filter(e=>n[e]>0).map(e=>`${D[e].name} ${n[e]}個`).join(`・`)||`なし`}<br>出荷できる余剰 ${t.available(e)}個 · 累計出荷 ${t.sold}個</p>${r>e.storageCapacity?`<p class="order-hint">確保数の合計が倉庫容量を超えています。全部を同時には蓄えられません。残す数を減らすか、収納を増やそう。</p>`:``}
 <small>低い品質から出荷し、残った高品質の作物を保管します。定期便の受取額 ${t.earned}メニー（手数料差引後）。設定変更や再開時は、途中の配達をはじめからやり直します。</small></div>`}function Vp(e,t,n){let r=document.createElement(`section`);r.id=`saves-panel`,r.setAttribute(`role`,`tabpanel`),r.setAttribute(`aria-labelledby`,`saves-tab`),r.hidden=!0,r.innerHTML=`<div class="restoration-summary"><small>育てた農園を、これからも。</small><strong>農園の記録</strong><p>このブラウザーには自動で保存しています。ファイルに書き出すと、別の端末や新しい試遊版へ農園を持っていけます。</p></div>
 <div id="play-journal"></div>
 <article class="investment-card"><h3>今の農園を書き出す</h3><p>畑・作物・所持品・購入した設備・街の復興を、ひとつのファイルにまとめます。</p><button id="export-save">記録ファイルを保存する</button></article>
 <article class="investment-card"><h3>記録から再開する</h3><p>ファイルを選ぶと、先に農園の内容を確認できます。再開を決めるまでは、今の農園は変わりません。</p><label class="save-file-label" for="import-save">農園の記録ファイル</label><input id="import-save" type="file" accept=".json,application/json"><button id="restore-import-backup">読み込み前の農園を確認する</button></article>
 <article id="import-preview" class="investment-card" hidden><h3>この農園を引き継ぎますか？</h3><p id="import-summary"></p><p>今の農園と置き換わります。読み込み前の農園も、このブラウザーに1つ残します。別の農園へ切り替えると、端末内の復興アルバムの写真は入れ替わります。</p><button id="confirm-import">この記録で再開する</button><button id="cancel-import">今の農園を続ける</button></article>
 <p id="save-status" role="status" aria-live="polite"></p><p class="note-intro">端末間の自動同期はありません。ファイルは手元で保管してください。</p>`;let i=null,a=0,o=!1,s=e=>r.querySelector(`#`+e),c=e=>{let t=s(`save-status`);t.textContent=e,t.scrollIntoView({block:`nearest`})};function l(){i=null,s(`import-preview`).hidden=!0,s(`import-save`).value=``,a++}function u(e){i=Mt(e);let t=new Ot;t.restore(i),s(`import-summary`).textContent=`${t.coins.toLocaleString(`ja-JP`)} メニー · 畑 ${t.plots.filter((e,n)=>t.isUnlocked(n)).length}区画 · 復興 ${t.restorationPercent}% · 累計出荷 ${t.shipped}個`,s(`import-preview`).hidden=!1,c(`内容を確認してから、再開を選んでください。`),s(`confirm-import`).focus()}return s(`export-save`).addEventListener(`click`,()=>{let t=URL.createObjectURL(new Blob([jt(e())],{type:`application/json`})),n=document.createElement(`a`);n.href=t,n.download=`farmer-mate-${new Date().toISOString().slice(0,10)}.json`,document.body.append(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),3e4),c(`今の農園を記録ファイルに書き出しました。`)}),s(`import-save`).addEventListener(`change`,async()=>{let e=s(`import-save`).files?.[0],t=++a;if(i=null,s(`import-preview`).hidden=!0,e){if(e.size>1048576){c(`このファイルは大きすぎます。農園の記録ファイルを選んでください。`);return}try{let n=await e.text();t===a&&u(n)}catch(e){t===a&&c(e instanceof Error?e.message:`記録を読めませんでした。`)}}}),s(`cancel-import`).addEventListener(`click`,()=>{l(),c(`今の農園を続けます。`)}),s(`confirm-import`).addEventListener(`click`,async()=>{if(!i||o)return;let e=i;o=!0,s(`confirm-import`).disabled=!0;try{await t(e),l(),c(`農園の記録を引き継ぎました。`)}catch{c(`記録を書き込めませんでした。今の農園は変更していません。`)}finally{o=!1,s(`confirm-import`).disabled=!1}}),s(`restore-import-backup`).addEventListener(`click`,async()=>{l();let e=a;try{let t=await n();if(e!==a)return;t?u(t):c(`読み込み前の記録は、まだありません。`)}catch{c(`読み込み前の記録を確認できませんでした。`)}}),{panel:r,reset:l}}function Hp(e,t=!1){let n=e.kitchen,r=e.investments.has(`kitchen`),i=e=>[...E.filter(t=>e.needs[t]>0).map(t=>`${D[t].name} ${e.needs[t]}個`),...A.filter(t=>(e.fruit?.[t]??0)>0).map(t=>`${j[t].name} ${e.fruit[t]}個`)].join(` + `),a=n.plan===`none`?null:L[n.plan],o=`<div class="restoration-summary"><small>農園から、街の食卓へ</small><strong>納屋の加工台</strong><p>作物をそのまま売るか、農園の味にするか。加工は作業台に任せて、別の仕事を進められます。</p></div>
 ${r?``:`<p class="order-hint">納屋を再開したら「農園への投資」から加工台を導入できます。</p>`}
 <div class="seeder-assignment"><label for="kitchen-plan">作り続ける食品</label><select id="kitchen-plan" ${r?``:`disabled`}><option value="none">加工をお休みする</option>${F.map(t=>`<option value="${t}" ${n.plan===t?`selected`:``} ${n.unlocked(t,e)?``:`disabled`}>${L[t].name}</option>`).join(``)}</select>${a?`<p>${i(a)} → ${a.seconds}秒で${a.yield}個</p>`:``}<p>${n.reason(e)||`${L[n.plan].name}を作っています · ${Math.floor(n.progress*100)}%`}</p><small>材料は低い品質から使い、料理の品質は使った材料の最低ランクになります。材料は完成時に倉庫と果樹園の集荷箱から使います。変更・お休み・再開時は、途中の加工をはじめからやり直します。</small></div>
 ${kp(e)}
 <details class="recipe-list"><summary>すべてのレシピ（8品）</summary><div class="crop-guide">${F.map(e=>{let t=L[e];return`<div><strong>${t.name}</strong><small>${[...E.filter(e=>t.needs[e]>0).map(e=>`${D[e].name} ${t.needs[e]}個`),...A.filter(e=>(t.fruit?.[e]??0)>0).map(e=>`${j[e].name} ${t.fruit[e]}個`)].join(` + `)}<br>${t.seconds}秒で${t.yield}個 · Eランクの販売 ${t.price}メニー/個</small></div>`}).join(``)}</div></details>
 <div class="seeder-assignment"><h3>食品棚 · ${n.stored} / ${ie.capacity}個</h3><p>${F.filter(e=>n.goods[e]>0).map(t=>`${L[t].name} ${Mp(n.quality.peek(t))} · 合計 ${n.quality.value(t,n.salePrice(t,e))}メニー`).join(`<br>`)||`食品はまだありません`}</p><p>これまでに作った食品 ${n.crafted}個</p><button id="kitchen-sell" data-food="all" ${n.deliveryReason(`all`,e)?`disabled`:``}>${n.deliveryReason(`all`,e)||`加工台へ向かい、食品をまとめて売る`}</button></div>
`,s=` <h3 class="section-label">街からの食品の注文</h3><p class="note-intro">食品棚から必要な分を販売車へ積んで届けます。普通に売る場合は、販売車は必要ありません。</p>${ae.filter(t=>F.every(r=>t.needs[r]===0||n.unlocked(r,e))).map(t=>`<article class="investment-card"><div class="investment-heading"><h3>${t.title}</h3><span>+${n.orderCoins(t.id)} メニー</span></div><p>${t.detail}</p><small>${F.filter(e=>t.needs[e]>0).map(e=>`${L[e].name} ${t.needs[e]}個`).join(` / `)} · 納品 ${n.orders[t.id]}回</small><button id="food-${t.id}" data-food="${t.id}" ${n.deliveryReason(t.id,e)?`disabled`:``}>${n.deliveryReason(t.id,e)||`販売車で届ける`}</button></article>`).join(``)}`;return t?s:o}function Up({farm:e,visitResident:t,pause:n,navigate:r,notify:i,visitProject:a,visitOrder:o,visitStore:s,visitSea:l,visitFood:u,snapshot:d,importSave:p,importBackup:m,now:h,visitOrchardSale:g,replayStory:_,visitEpisode:v}){let y=document.createElement(`dialog`);y.className=`notebook`,y.setAttribute(`aria-labelledby`,`notebook-title`),y.innerHTML=`<header class="notebook-heading"><div><small>ひだまり農園の記録</small><h2 id="notebook-title">農園ノート</h2></div><button class="close-note" aria-label="農園ノートを閉じる">×</button></header>
    <div class="note-tabs" hidden role="tablist" aria-label="農園ノート"><button id="tasks-tab" role="tab" aria-controls="tasks-panel" data-tab="tasks">できる仕事</button><button id="crops-tab" role="tab" aria-controls="crops-panel" data-tab="crops">作付け</button><button id="orders-tab" role="tab" aria-controls="orders-panel" data-tab="orders">注文</button><button id="restoration-tab" role="tab" aria-controls="restoration-panel" data-tab="restoration">街の手入れ</button><button id="investments-tab" role="tab" aria-controls="investments-panel" data-tab="investments">農園への投資</button><button id="kitchen-tab" role="tab" aria-controls="kitchen-panel" data-tab="kitchen">加工と食品</button><button id="residents-tab" role="tab" aria-controls="residents-panel" data-tab="residents">住人のお願い</button><button id="saves-tab" role="tab" aria-controls="saves-panel" data-tab="saves">記録</button><button id="harbor-tab" role="tab" aria-controls="harbor-panel" data-tab="harbor" hidden>港</button></div>
    <div class="note-content"><section id="episodes-panel" hidden></section><section id="enterprises-panel" hidden></section><section id="breeding-panel" hidden></section><section id="basket-panel" hidden></section><section id="storage-panel" hidden></section><section id="orchard-panel" hidden></section><section id="residents-panel" role="tabpanel" aria-labelledby="residents-tab" hidden></section><section id="kitchen-panel" role="tabpanel" aria-labelledby="kitchen-tab" hidden></section><section id="harbor-panel" role="tabpanel" aria-labelledby="harbor-tab" hidden></section><section id="tasks-panel" role="tabpanel" aria-labelledby="tasks-tab"></section><section id="crops-panel" role="tabpanel" aria-labelledby="crops-tab" hidden></section><section id="orders-panel" role="tabpanel" aria-labelledby="orders-tab" hidden></section><section id="restoration-panel" role="tabpanel" aria-labelledby="restoration-tab" hidden></section><section id="investments-panel" role="tabpanel" aria-labelledby="investments-tab" hidden></section></div>
    <p class="note-foot">施設や記録を開いている間、作業と成長はお休みです。</p>`,document.querySelector(`#app`).append(y);let x=Vp(d,async e=>{await p(e),y.close(),n(!1),i(`農園の記録を引き継ぎました。`)},m);y.querySelector(`.note-content`).append(x.panel);let S=null,C=null,w=`tasks`,T={episodes:`住民の物語・収穫祭`,enterprises:`街の復興事業`,breeding:`品種配合の実験台`,basket:`収穫かごと品質`,tasks:`街の目標`,saves:`農園の記録`,restoration:`掃除用具`,orders:`販売車の注文`,storage:`共同倉庫`,investments:`農園の設備`,crops:`この畑の作付け`,orchard:`果樹園`,kitchen:`加工台`,residents:`住人のお願い`,harbor:`港の仕事`};function A(t){return[`episodes`,`tasks`,`saves`,`basket`].includes(t)?!0:t===`enterprises`?!!e.enterprises.nearby(e):t===`breeding`?H(e.player,fe):t===`restoration`?H(e.player,ve):t===`orders`?H(e.player,O):t===`storage`?H(e.player,xt)&&e.projects.has(`barn-open`):t===`kitchen`?H(e.player,ie)&&e.investments.has(`kitchen`):t===`orchard`?H(e.player,we.sales)&&e.investments.has(`orchard`):t===`crops`?e.plots.some((t,n)=>e.isUnlocked(n)&&H(e.player,t,1.7)):t===`investments`?H(e.player,ye)||V.some(t=>H(e.player,t)):t===`residents`?e.residentsArrived&&_e.some(t=>e.projects.has(t.requires)&&H(e.player,t)):t===`harbor`&&e.agricultureComplete&&f(e.player)}function j(){y.querySelector(`[data-tab="${w}"]`)?.scrollIntoView({block:`nearest`,inline:`nearest`})}function ee(t){w=t,y.querySelector(`#notebook-title`).textContent=T[w]??`農園`,y.querySelector(`.note-content`).scrollTop=0,w===`saves`&&(y.querySelector(`#play-journal`).innerHTML=Rp(e.journal)),y.querySelectorAll(`[data-tab]`).forEach(e=>{e.setAttribute(`aria-selected`,String(e.dataset.tab===w)),e.tabIndex=e.dataset.tab===w?0:-1});for(let e of[`episodes`,`enterprises`,`crops`,`orders`,`harbor`,`kitchen`,`residents`,`saves`,`storage`,`orchard`,`basket`,`breeding`])y.querySelector(`#`+e+`-panel`).hidden=w!==e;y.querySelector(`#restoration-panel`).hidden=w!==`restoration`,y.querySelector(`#tasks-panel`).hidden=w!==`tasks`,y.querySelector(`#investments-panel`).hidden=w!==`investments`,y.open&&j()}function M(){y.querySelector(`#harbor-tab`).hidden=!e.agricultureComplete;let t=document.activeElement?.id;y.querySelector(`#episodes-panel`).innerHTML=mp(e),y.querySelector(`#breeding-panel`).innerHTML=ge(e),y.querySelector(`#enterprises-panel`).innerHTML=xp(e),y.querySelector(`#basket-panel`).innerHTML=Fp(e),y.querySelector(`#tasks-panel`).innerHTML=wp(e),y.querySelector(`#investments-panel`).innerHTML=`<p class="note-intro">かご ${e.inventory} / ${e.capacity}個 · 倉庫 ${e.stored} / ${e.storageCapacity}個<br>広げる、手作業を磨く、任せる。<br>どれを先に選んでも、ほかの投資をあとから組み合わせられます。</p><div class="investment-list">${bt.filter(t=>V.some(n=>n.id===t.id&&H(e.player,n,4.2))).map(t=>{let n=e.investments.has(t.id),r=e.investmentReason(t.id,!0);return`<article class="investment-card ${n?`owned`:``}"><div class="investment-heading"><span class="investment-symbol" aria-hidden="true">${t.id===`expansion`?`▦`:t.id===`tools`?`✧`:t.id===`truck`?`▰`:`❧`}</span><h3>${t.title}</h3><span>${t.price} メニー</span></div><p>${t.detail}</p><small>${t.tradeoff}</small><p class="funding-detail">${r||`納付済み ${e.funding.paid[t.id]??0} / ${t.price} メニー。床のMマスで1秒止まると、2秒で納付します（足りない分は後から続けられます）。`}</p></article>`}).join(``)}</div>`,y.querySelector(`#investments-panel`).insertAdjacentHTML(`afterbegin`,jp(e)+Tp(e));let n=y.querySelector(`#harvester-plot`);if(n&&(n.value=String(e.machinery.plots(e)[0]??-1)),y.querySelector(`#restoration-panel`).innerHTML=`<p class="note-intro">一か所ずつ、暮らしの戻る場所を増やそう。<br>片付けは無料。修理代は作業を終えたときに使います。仕事を選ぶと現地まで歩きます。長い修理は途中で離れても続きから再開できます。</p>${b.filter(t=>!e.projects.has(t.id)&&(!t.requires||e.projects.has(t.requires))).map(t=>{let n=e.projectReason(t.id);return`<article class="investment-card ${e.projects.has(t.id)?`owned`:``}"><div class="investment-heading"><h3>${t.title}</h3><span>${t.cost?t.cost+` メニー`:`無料`}</span></div><p>${t.detail}</p><small>作業 ${t.seconds}秒${e.projectWork[t.id]?` · ${Math.floor(e.projectWork[t.id]*100)}%まで修理済み`:``}</small>${t.supplies?`<small>かごから ${E.filter(e=>t.supplies[e]>0).map(e=>D[e].name+` `+t.supplies[e]+`個`).join(` / `)}（完了時に渡します）</small>`:``}<button id="project-${t.id}" data-project="${t.id}" ${n?`disabled`:``}>${n||`ここへ歩いて作業する`}</button></article>`}).join(``)}`,y.querySelector(`#crops-panel`).innerHTML=`${Np(e)}<p class="note-intro">種は無料です。育っている作物はそのままに、次の種まきから変更します。種まき機も、この作付けに従います。</p><div class="crop-guide">${E.map(t=>`<div><strong>${D[t].name}${e.cropUnlocked(t)?``:`（栽培未開始）`}</strong><small>${e.growSeconds(t)}秒で成長 · ${D[t].yield}個収穫<br>${Pp(e,t)}</small></div>`).join(``)}</div><div class="crop-plans">${e.plots.map((t,n)=>!e.isUnlocked(n)||!H(e.player,t,1.7)?``:`<label for="crop-${n}" class="crop-plan"><span><strong>${n>=15?`北の草原 · `:n>=9?`南の草地 · `:n>=6?`北の土地 · `:``}畑 ${n+1}</strong><small>${e.isUnlocked(n)?t.stage===`empty`?`次の種まきから`:D[t.crop].name+`を育てています`:`未購入`}</small></span><select id="crop-${n}" data-crop="${n}" ${e.isUnlocked(n)?``:`disabled`}>${E.map(n=>`<option value="${n}" ${e.cropUnlocked(n)?``:`disabled`} ${t.nextCrop===n?`selected`:``}>${D[n].name}</option>`).join(``)}</select></label>`).join(``)}</div>`,y.querySelector(`#orchard-panel`).innerHTML=zp(e,h()),y.querySelector(`#orders-panel`).innerHTML=`${Bp(e)}<p class="note-intro">かごの中：${E.map(t=>D[t].name+` `+e.cargo[t]+`個`).join(` / `)}<br>通常出荷と注文、どちらに届けても構いません。注文に必要な分だけを渡します。</p>${e.investments.has(`truck`)?``:`<p class="order-hint">「農園への投資」で販売車を購入すると、ここへ配達できます。</p>`}${k.map(t=>{let n=e.order(t.id),r=e.orderReason(t.id);return`<article class="investment-card"><div class="investment-heading"><h3>${n.title}</h3><span>+${n.coins} メニー</span></div><p>${n.detail}</p><small>${E.filter(e=>n.needs[e]>0).map(e=>D[e].name+` `+n.needs[e]+`個`).join(` / `)}</small><button id="order-${t.id}" data-order="${t.id}" ${r?`disabled`:``}>${r||`販売車へ届ける`}</button></article>`}).join(``)}${Hp(e,!0)}<p class="note-intro">納品実績 ${e.orderCount}回。6回ごとに注文が大きくなります（最大3倍）。</p>`,e.projects.has(`barn-open`)){let t=document.createElement(`div`);t.className=`seeder-assignment`,t.innerHTML=`<h3>納屋の共同倉庫 · ${e.stored} / ${e.storageCapacity}</h3><p>必要な作物をかごに入れて、出荷や注文に使えます。受け渡しは納屋の前で行います。</p><button id="store-deposit" data-store="deposit" ${e.transferReason(`deposit`)?`disabled`:``}>${e.transferReason(`deposit`)||`かごの作物を預けに行く`}</button>${E.map(t=>`<p>${D[t].name} ${e.stock[t]}個 · ${Mp(e.stockQuality.peek(t))}</p><button id="store-${t}" data-store="${t}" ${e.transferReason(t)?`disabled`:``}>${e.transferReason(t)||D[t].name+`をかごへ（6個まで）`}</button>`).join(``)}`,y.querySelector(`#storage-panel`).replaceChildren(t)}y.querySelector(`#investments-panel`).insertAdjacentHTML(`afterbegin`,Ep(e)),y.querySelector(`#residents-panel`).innerHTML=Ip(e),y.querySelector(`#kitchen-panel`).innerHTML=Hp(e);let r=e.harbor;y.querySelector(`#harbor-panel`).innerHTML=gp(e),y.querySelector(`#sea-supply`).value=r.supply;let i=y.querySelector(`#seeder-plot`);i&&(i.value=String(e.seederPlot)),y.querySelector(`#play-journal`).innerHTML=Rp(e.journal);let a=y.querySelector(`#story-letters`);if(a||(a=document.createElement(`article`),a.id=`story-letters`,a.className=`investment-card`,y.querySelector(`#play-journal`).after(a)),a.replaceChildren(),a.hidden=!e.stories.scripts.length,!a.hidden){let t=document.createElement(`h3`);t.textContent=`街の物語・読み返し`,a.append(t);for(let t of e.stories.scripts.filter(t=>e.stories.unlocked.has(t.id))){let n=document.createElement(`button`);n.dataset.story=t.id,n.textContent=t.title+(e.stories.read.has(t.id)?` · 読み返す`:` · 未読`),a.append(n)}}t&&y.querySelector(`#${t}`)?.focus()}return y.querySelector(`.close-note`).addEventListener(`click`,()=>y.close()),y.addEventListener(`close`,()=>{x.reset(),n(!1);let e=S;S=null,e&&_(e);let t=C;C=null,t?.()}),y.addEventListener(`click`,d=>{let f=d.target.closest(`button`);if(!f||f.disabled)return;if(f.hasAttribute(`data-festival-jump`)){y.querySelector(`.festival-card`).scrollIntoView({block:`start`});return}if(f.id===`task-episodes`){ee(`episodes`);return}let p=f.dataset.episodeChoice??f.dataset.episodeWork??f.dataset.episodeDeliver??f.dataset.episodeCelebrate;if(f.dataset.episodeTravel){let e=hp(f.dataset.episodeTravel);e&&(C=()=>v(e),y.close());return}if(f.hasAttribute(`data-festival-travel`)){C=()=>v(c.festival),y.close();return}if(f.hasAttribute(`data-festival`)){fp(e)&&y.close();return}if(p&&De.includes(p)){if(f.dataset.episodeWork){C=()=>e.episodes.start(p,e),y.close();return}f.dataset.episodeChoice&&e.episodes.choose(p,f.dataset.choice,e),f.dataset.episodeDeliver&&e.episodes.deliver(p,e),f.dataset.episodeCelebrate&&e.episodes.celebrate(p,e),M();return}if(f.dataset.story){S=f.dataset.story,y.close();return}if(f.dataset.resident&&f.dataset.contribution){let r=e.requests.offer(f.dataset.resident,f.dataset.contribution,e);r&&(y.close(),n(!1),t(r))}if(f.dataset.breed){let t=me.find(e=>e.crop===f.dataset.breed);t&&e.breed(...t.parents)&&(i(e.message),e.message=``,M())}if(f.id===`task-records`&&ee(`saves`),f.dataset.tab&&A(f.dataset.tab)&&ee(f.dataset.tab),f.id===`visit-harbor`&&(y.close(),n(!1),r(ht.entry)),f.id===`sea-sell`&&e.harbor.sell(e)&&(i(e.message),e.message=``,M()),f.id===`sea-canteen`&&e.harbor.deliverToCanteen(e)&&(i(e.message),e.message=``,M()),f.id===`sea-sales`&&(y.close(),n(!1),r(ht.sales)),f.id===`sea-operation`&&(e.harbor.configure(!e.harbor.enabled,e),M()),f.id===`sea-fishing`&&(y.close(),n(!1),r(ht.nets)),f.id===`buy-boat`&&e.harbor.buyBoat(e)&&(i(e.message),e.message=``,M()),f.dataset.tree!==void 0&&(y.close(),n(!1),r(Te(Number(f.dataset.tree)))),f.dataset.workTravel){let t=yp(e).flatMap(e=>e.options).find(e=>e.id===f.dataset.workTravel);t?.point&&(y.close(),n(!1),b.some(e=>e.id===t.id)?a(t.id):t.id.startsWith(`episode-`)?C=()=>v(t.point):r(t.point))}if(f.id===`orchard-sell`&&(y.close(),n(!1),g()),f.dataset.enterprise&&e.enterprises.donate(f.dataset.enterprise,f.dataset.donation,e)&&(i(e.message),e.message=``,M()),f.dataset.depotCrop&&e.transfer(f.dataset.depotCrop)&&(i(e.message),e.message=``,M()),f.id===`depot-deposit`&&e.transfer(`deposit`)&&(i(e.message),e.message=``,M()),f.dataset.food&&(y.close(),n(!1),u(f.dataset.food)),f.dataset.sea&&(y.close(),n(!1),l(f.dataset.sea)),f.dataset.store&&(y.close(),n(!1),s(f.dataset.store)),f.dataset.order&&(y.close(),n(!1),o(f.dataset.order)),f.dataset.project&&(y.close(),n(!1),a(f.dataset.project)),f.dataset.plot){let t=e.plots[Number(f.dataset.plot)];y.close(),n(!1),r({x:t.x,z:t.z+1.02})}}),y.querySelector(`.note-tabs`).addEventListener(`keydown`,t=>{let n=t;if(![`ArrowLeft`,`ArrowRight`].includes(n.key))return;n.preventDefault();let r=[`tasks`,`crops`,`orders`,`restoration`,`investments`,`kitchen`,`residents`,`saves`,...e.agricultureComplete?[`harbor`]:[]];ee(r[(r.indexOf(w)+(n.key===`ArrowRight`?1:r.length-1))%r.length]),y.querySelector(`[data-tab="${w}"]`).focus()}),y.addEventListener(`change`,t=>{let n=t.target;n.id===`helpers-enabled`&&(e.assignHelper(t.target.checked?e.plots.findIndex((t,n)=>e.isUnlocked(n)&&t.land===`tilled`):-1),M()),n.dataset.reserveCrop&&(e.courier.setReserve(n.dataset.reserveCrop,Number(n.value),e)||i(`残す数は0〜240個の整数で指定しよう。`),M()),n.id===`courier-enabled`&&(e.courier.configure(t.target.checked,e.courier.policy,e),M()),n.id===`courier-policy`&&(e.courier.configure(e.courier.enabled,n.value,e),M()),n.id===`kitchen-plan`&&(e.kitchen.setPlan(n.value,e),M()),n.id===`sea-supply`&&e.harbor.setSupply(n.value,e),n.id===`helper-plot`&&e.assignHelper(Number(n.value)),n.dataset.crop&&e.planCrop(Number(n.dataset.crop),n.value)}),{dialog:y,render:M,open:(e=`tasks`)=>{if(!A(e)){i(`${T[e]??`施設`}のそばまで歩いて利用しよう。`);return}n(!0),M(),ee(e),y.showModal()}}}var Wp={leaf:`<path d="M19 4C9 3 3 7 5 14c2 7 14 5 14-10Z"/><path d="m5 21 9-12M9 15l-1-5"/>`,coin:`<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><path d="M12 8v8m-2-7h4m-4 6h4"/>`,basket:`<path d="m3 10 2 10h14l2-10ZM7 10l5-7 5 7M9 13v4m6-4v4M2 10h20"/>`,arrow:`<path d="M5 12h14m-6-6 6 6-6 6"/>`,sun:`<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1"/>`,home:`<path d="m3 10 9-7 9 7v11H3Zm6 11v-9h6v9M6 8h12"/>`},Gp=e=>`<svg viewBox="0 0 24 24" aria-hidden="true">${Wp[e]}</svg>`;document.querySelector(`#app`).innerHTML=`
  <canvas id="farm" aria-label="ひだまり農園。スワイプまたはドラッグで移動し、離すと止まります。キーボードのWASDまたは矢印キーでも移動できます。" tabindex="0"></canvas>
  <div id="movement-stick" hidden aria-hidden="true"><i></i></div>
  <div class="vignette"></div>
  <header class="topbar">
    <button id="menu-toggle" aria-expanded="false" aria-controls="farm-menu" aria-label="メニューを開く">☰ <span>メニュー</span></button>
    <div class="wallet" aria-label="所持メニー"><span class="coin">${Gp(`coin`)}</span><div><small>メニー</small><strong id="coins">0</strong></div></div>
  </header>
  <nav id="farm-menu" class="farm-tools" aria-label="農園のメニュー" hidden>
    <h1>ひだまり農園</h1><div class="season"><span id="industry-label">第1ステージ：農業</span><span id="phase-label"></span></div>
    <button id="open-tasks">できる仕事・街の目標</button><button id="open-episodes">住民の物語・収穫祭</button><button id="open-records">記録・セーブ</button><button id="open-keepsakes">復興アルバム・音</button><button id="change-player-name">主人公の名前</button>
    <button id="district-toggle">街の場所へ歩く</button><button id="pasture-toggle">農地へ歩く</button><button id="harbor-toggle" hidden>港へ歩く</button>
  </nav>
  <button id="open-investments" class="context-action" hidden>施設を使う</button>
  <button id="upgrade-nearby" class="world-label" hidden></button><button id="project-nearby" class="world-label" hidden></button>
  <button id="sea-marker" class="world-label" hidden>港の仕事</button>
  <div id="ground-notice" class="ground-notice" role="status" hidden>草むらで足が遅くなっています · 草を刈ると歩きやすくなります</div>
  <button id="ship-marker" class="world-label">${Gp(`basket`)} 出荷する</button>
  <button id="truck-marker" class="world-label" hidden>注文を届ける</button>
  <button id="orchard-marker" class="world-label" hidden>果樹園</button>
  <button id="kitchen-marker" class="world-label" hidden>加工台</button>
  <button id="cottage-marker" class="world-label restoration-marker">住宅地の手入れ</button>
  <button id="restoration-marker" class="world-label restoration-marker">掃除用具</button><button id="storage-marker" class="world-label" hidden>共同倉庫</button><button id="workshop-marker" class="world-label">機械置き場</button><div id="payment" class="payment" hidden></div><div id="job-marker" class="world-label job-marker" hidden></div>
  <div id="action" class="action-label" hidden><span id="action-text"></span><div class="progress-track"><i id="action-fill"></i></div></div>
  <div id="toast" role="status" aria-live="polite"></div>
  <footer class="bottom-bar">
    <button id="quest-button" class="quest" aria-label="農園の仕事と復興を見る"><span class="quest-icon">${Gp(`home`)}</span><div><small>メインストーリー · 街に暮らしを戻そう</small><h2 id="quest-title">好きな畑から、片付けよう。</h2><p id="quest-description">草刈り → 耕作 → 種まき → 出荷</p><div class="quest-track"><i id="quest-fill"></i></div></div><span id="quest-count">0%</span></button>
    <button id="ship-button" class="basket-button"><span class="basket-icon">${Gp(`basket`)}</span><span><small id="basket-title">収穫かご</small><strong><span id="inventory">0</span><em> / ${yt.capacity}</em></strong><small id="cargo-summary"></small></span><span class="ship-action">かごを見る ${Gp(`arrow`)}</span></button>
  </footer>

  <div id="loading" class="loading"><span class="loading-leaf">${Gp(`leaf`)}</span><h2>農園に朝がやってきます</h2><p>草木と畑の準備をしています…</p></div>
`;var Q=e=>document.getElementById(e),Kp=document.createElement(`div`);Kp.id=`feedback`,Q(`app`).append(Kp);for(let e of[`payment`,`action`,`toast`,`ground-notice`])Kp.append(Q(e));Q(`app`).append(Q(`quest-button`));function qp(e,t){e.dataset.markup!==t&&(e.innerHTML=t,e.dataset.markup=t)}var Jp=Q(`farm`),$=new Ot,Yp=kt(new URL(`./`,document.baseURI).pathname),Xp=new t;async function Zp(){let e=await Xp.read(Yp);if(e)try{$.restore(JSON.parse(e))}catch{Xp.available=!1}}var Qp=0,$p=()=>{},em=performance.now();function tm(){$p();let e=$.save();if(Qp){let t=Date.now()-Qp;for(let n of e.plots)n.stage===`growing`&&(n.readyAt+=t);for(let n of e.orchard.trees)n.tended&&(n.readyAt+=t)}return e}function nm(){em=performance.now(),Xp.write(Yp,JSON.stringify(tm())).catch(()=>{})}var rm=0;function im(e){Q(`toast`).textContent=e,Q(`toast`).classList.add(`visible`),rm=performance.now()+4e3}async function am(){await Zp(),$.episodes.memoryId||=crypto.randomUUID();let e=await up(Jp,$);Q(`loading`).remove();let t=new Ce,r=Q(`movement-stick`);function o(){t.end(),r.hidden=!0,$.funding.reset()}let s=null,u=[],p=new Pt,m=null,h=null,g=null,_=null,v=null,y=null,S=!1,w=null,E=null,D=!1,k=document.hasFocus(),A=()=>document.hidden||!k||f($.player)?`excluded`:D?`notebook`:$.action===`walking`?`moving`:$.isWorking?`working`:`looking`,j=()=>[...$.shipped>0?[`shipment`]:[],...$.investments.size?[`investment`]:[],...[`seeder`,`helper`,`driver`,`harvester`].some(e=>$.investments.has(e))?[`automation`]:[],...[2,3,4].filter(e=>$.restorationPhase>=e).map(e=>`phase-${e}`),...$.agricultureComplete?[`complete`]:[]];$.journal.observe(j(),!0),$p=()=>{$.journal.sample(performance.now(),A()),$.journal.observe(j())},$p();for(let e of[`pointerdown`,`keydown`,`wheel`])document.addEventListener(e,()=>{$.journal.interact(performance.now(),A())},{capture:!0,passive:!0});addEventListener(`focus`,()=>{k=!0,$p()});function N(){E=null,s=null,u=[],h=null,g=null,_=null,v=null,y=null,S=!1,w=null}function P(e){D!==e&&(D=e,$p(),R.clear(),o(),N(),$.interrupt(),p.reset(performance.now()),e?Qp=Date.now():te())}function te(){Qp&&$.shiftGrowth(Date.now()-Qp),Qp=0,nm()}let ne=a(()=>$.stories,P,nm,()=>$.playerName),re=document.createElement(`div`);re.id=`depot-shipping-marker`,re.className=`world-label`,re.textContent=`北の出荷箱`,document.querySelector(`#app`).append(re);for(let e of se){let t=document.createElement(`button`);t.id=`enterprise-`+e.id,t.className=`world-label`,t.textContent=e.title,t.addEventListener(`click`,()=>{L(`enterprises`,e)}),document.querySelector(`#app`).append(t)}let F=Q(`farm-menu`),I=()=>{F.hidden=!0,Q(`menu-toggle`).setAttribute(`aria-expanded`,`false`)};Q(`menu-toggle`).addEventListener(`click`,()=>{F.hidden=!F.hidden,Q(`menu-toggle`).setAttribute(`aria-expanded`,String(!F.hidden)),R.clear(),o(),N()}),F.addEventListener(`click`,e=>{e.target.closest(`button`)&&I()});function L(e,t){I(),H($.player,t,1.25)?oe.open(e):de(t)&&(E=e)}let ae=n($,Yp,()=>e.readyForPhoto()?e.captureTown():null,P);Q(`open-keepsakes`).addEventListener(`click`,()=>ae.open());let oe=Up({farm:$,visitEpisode:e=>L(`episodes`,e),visitResident:fe,pause:P,navigate:de,notify:im,visitProject:pe,visitOrder:be,visitStore:B,visitSea:_e,visitFood:z,snapshot:tm,importSave:me,importBackup:()=>Xp.read(At(Yp)),now:()=>Qp||Date.now(),visitOrchardSale:ge,replayStory:e=>ne.replay(e)});Q(`open-tasks`).addEventListener(`click`,()=>{oe.open(f($.player)?`harbor`:`tasks`)}),Q(`quest-button`).addEventListener(`click`,()=>{oe.open(f($.player)?`harbor`:`tasks`)}),Q(`open-investments`).addEventListener(`click`,()=>{{let e=Se($);e?L(e.id,e):im(`掃除用具・畑・販売車など、使う場所へ近づこう。`)}}),Q(`upgrade-nearby`).addEventListener(`click`,()=>{let e=xe($).sort((e,t)=>Tt($.player,e)-Tt($.player,t))[0];e&&de(e)}),Q(`project-nearby`).addEventListener(`click`,()=>{let e=Q(`project-nearby`).dataset.project;if(e){let t=$.projectReason(e);t?im(t):pe(e)}}),Q(`open-episodes`).addEventListener(`click`,()=>oe.open(`episodes`)),Q(`open-records`).addEventListener(`click`,()=>{oe.open(`saves`)}),Q(`storage-marker`).addEventListener(`click`,()=>L(`storage`,xt)),Q(`workshop-marker`).addEventListener(`click`,()=>L(`investments`,ye));let R=new Set,le=[`w`,`a`,`s`,`d`,`arrowup`,`arrowleft`,`arrowdown`,`arrowright`];addEventListener(`keydown`,e=>{D||!le.includes(e.key.toLowerCase())||e.ctrlKey||e.metaKey||e.altKey||(e.preventDefault(),o(),R.add(e.key.toLowerCase()),N(),$.interrupt(),p.advance(performance.now(),!1,ke))}),addEventListener(`keyup`,e=>{R.delete(e.key.toLowerCase())&&p.advance(performance.now(),D||document.hidden,ke)});function ue(){R.clear(),o(),N(),$.interrupt(),p.reset(performance.now()),nm()}addEventListener(`blur`,()=>{k=!1,$p(),ue()}),addEventListener(`pagehide`,()=>{k=!1,$p(),ue()}),document.addEventListener(`visibilitychange`,()=>{$p(),p.reset(performance.now()),document.hidden&&ue()});function de(e){if(D)return!1;p.advance(performance.now(),document.hidden,ke);let t={x:Math.max(l.minX+.2,Math.min(l.maxX-.2,e.x)),z:Math.max(l.minZ+.2,Math.min(l.maxZ-.2,e.z))};if(!$.canStand(t))return im(`建物や海を避けて、地面を選ぼう。`),!1;let n=Ge($.player,t,e=>$.canStand(e),l);return n?(N(),u=n,s=u.shift()??null,s&&$.interrupt(),Jp.focus({preventScroll:!0}),!0):(im(`そこへ続く道が見つかりません。`),!1)}Jp.addEventListener(`pointerdown`,e=>{e.button===0&&!D&&t.begin(e.pointerId,e.clientX,e.clientY)&&(e.preventDefault(),I(),N(),R.clear(),$.interrupt(),p.advance(performance.now(),document.hidden,ke),Jp.setPointerCapture(e.pointerId),Jp.focus({preventScroll:!0}))}),Jp.addEventListener(`pointermove`,e=>{t.pointer===e.pointerId&&(t.move(e.pointerId,e.clientX,e.clientY),p.advance(performance.now(),D||document.hidden,ke),r.hidden=Math.hypot(t.offset.x,t.offset.y)<=8,r.style.left=`${t.origin.x}px`,r.style.top=`${t.origin.y}px`,r.firstElementChild.setAttribute(`style`,`transform:translate(${t.offset.x}px,${t.offset.y}px)`),$.journal.interact(performance.now(),A()),e.preventDefault())});for(let e of[`pointerup`,`pointercancel`,`lostpointercapture`])Jp.addEventListener(e,e=>{t.pointer===e.pointerId&&(o(),p.advance(performance.now(),D||document.hidden,ke))});document.addEventListener(`touchcancel`,o,{passive:!0}),Jp.addEventListener(`contextmenu`,e=>e.preventDefault()),document.addEventListener(`selectstart`,e=>{(e.target instanceof Element?e.target:e.target?.parentElement)?.closest(`input,textarea`)||e.preventDefault()});function fe(e){$.requests.deliver(e,$)||im(`住人のそばで、必要な品を渡そう。`)}function pe(e){let t=$.projectReason(e);if(t){im(t);return}de(x(e))&&(m=e,h=e,im(`仕事の場所へ向かっています。`))}async function me(e){let t=new Ot;if(!t.restore(e))throw Error(`Invalid farm`);t.episodes.memoryId||=crypto.randomUUID(),await Nt(Xp,Yp,tm(),t.save()),$.restore(t.save()),$.journal.observe(j(),!0),$.player={...Je},R.clear(),o(),N(),$.interrupt(),p.reset(performance.now()),Qp=Date.now()}let he=()=>$.investments.has(`orchard`)&&d($.player);function ge(){$.orchard.sell($)||im(`果樹園の集荷箱のそばで出荷しよう。`)}function z(e){$.kitchen.deliver(e,$)||im($.kitchen.deliveryReason(e,$)||`届け先のそばまで歩こう。`)}function _e(e){let t=$.harbor.reason(e,$);if(t){im(t);return}de(_t(e))&&(v=e)}function B(e){$.transfer(e)||im($.transferReason(e)||`共同倉庫のそばで受け渡ししよう。`)}function be(e){$.deliver(e)||im($.orderReason(e)||`販売車のそばで届けよう。`)}Q(`orchard-marker`).addEventListener(`click`,()=>L(`orchard`,we.sales)),Q(`kitchen-marker`).addEventListener(`click`,()=>L(`kitchen`,ie)),Q(`pasture-toggle`).addEventListener(`click`,()=>de(Je)),Q(`harbor-toggle`).addEventListener(`click`,()=>de(ht.entry)),Q(`sea-marker`).addEventListener(`click`,()=>L(`harbor`,ht.sales)),Q(`district-toggle`).addEventListener(`click`,()=>de(qe)),Q(`truck-marker`).addEventListener(`click`,()=>L(`orders`,O)),Q(`cottage-marker`).addEventListener(`click`,()=>{$.residentsArrived?L(`residents`,c.family):L(`restoration`,ve)}),Q(`restoration-marker`).addEventListener(`click`,()=>L(`restoration`,ve)),Q(`ship-button`).addEventListener(`click`,()=>{oe.open(`basket`)}),Q(`ship-marker`).addEventListener(`click`,()=>{if(he()){ge();return}de(f($.player)?ht.sales:St)});let V=performance.now(),Te=0,Ee=-1,De=0,Oe=(...e)=>+!!e.some(e=>R.has(e));function ke(n){$.stories.step(n);let r=Oe(`d`,`arrowright`)-Oe(`a`,`arrowleft`),i=Oe(`w`,`arrowup`)-Oe(`s`,`arrowdown`),a=t.pointer===null?{x:r*.8575-i*.5145,z:-r*.5145-i*.8575}:t.input;for(;s&&Tt($.player,s)<.075;)s=u.shift()??null;if(s){let e=Tt($.player,s),t=Math.min(1,e/(yt.speed*n));a={x:(s.x-$.player.x)/e*t,z:(s.z-$.player.z)/e*t}}if(E&&!s){let e=E;E=null,oe.open(e);return}h&&!s&&($.startProject(h)||im($.projectReason(h)||`仕事の場所へ近づこう。`),h=null),g&&!s&&($.deliver(g)||im($.orderReason(g)||`販売車へ近づこう。`),g=null),_&&!s&&($.transfer(_)||im($.transferReason(_)||`納屋へ近づこう。`),_=null),v&&!s&&($.harbor.start(v,$)||im($.harbor.reason(v,$)||`浜へ近づこう。`),v=null),y&&!s&&($.kitchen.deliver(y,$)||im($.kitchen.deliveryReason(y,$)||`届け先へ近づこう。`),y=null,S=!1,w=null),S&&!s&&($.orchard.sell($)||im(`集荷箱へ近づこう。`),S=!1),w&&!s&&($.requests.deliver(w,$)||im(`届ける品が変わりました。住人のお願いで、もう一度選ぼう。`),w=null),m&&$.projects.has(m)&&(m=null),m&&!$.isWorking&&Math.hypot(a.x,a.z)<=.08&&H($.player,x(m),yt.range)&&$.startProject(m);let o={...$.player};$.step(n,a,Date.now());let c=Tt(o,$.player);s&&c<1e-4?(De+=n,De>.3&&(N(),De=0,im(`ここからは進めません。近くの地面を選ぼう。`))):De=0;let l=$.movementFactor()<1?`草むらで足が遅くなっています · 草を刈ると歩きやすくなります`:$.blockedWorkReason;if(Q(`ground-notice`).hidden=!l||D,Q(`ground-notice`).textContent=l,$.action===`walking`)e.farmer.root.rotation.y=Math.atan2($.player.x-o.x,$.player.z-o.z);else if($.workPoint){let t=$.workPoint;e.farmer.root.rotation.y=Math.atan2(t.x-$.player.x,t.z-$.player.z)}}function Ae(t){let n=Math.max(0,Math.min((t-V)/1e3,.5));V=t,Te+=n,p.advance(t,D||document.hidden,ke),$p(),t-em>15e3&&nm();let r=u.length?u[u.length-1]:s;e.update(Math.min(n,.1),Te,Qp||Date.now(),r,!1),!document.hidden&&!D&&ae.tick();let i=f($.player);Q(`industry-label`).textContent=i?`第2ステージ：海産`:`第1ステージ：農業`,Q(`harbor-toggle`).hidden=!$.agricultureComplete,Q(`basket-title`).textContent=i?`水揚げ箱`:he()?`果樹園の箱`:`収穫かご`,Q(`ship-button`).querySelector(`em`).textContent=` / ${i?$.harbor.capacity:he()?we.capacity:$.capacity}`,Q(`inventory`).textContent=String(i?$.harbor.fish:he()?$.orchard.box:$.inventory),Q(`cargo-summary`).textContent=i?`魚 ${$.harbor.fish}匹 · 出荷${$.harbor.sold}匹`:he()?`リンゴ ${$.orchard.fruit.apple} · ナシ ${$.orchard.fruit.pear}`:`コーン ${$.cargo.corn} · カブ ${$.cargo.turnip}${$.investments.has(`pumpkin-seeds`)?` · カボチャ ${$.cargo.pumpkin}`:``}${$.hybrids.has(`kabumorokoshi`)?` · 配合 ${$.cargo.kabumorokoshi}`:``}`;let a=e.screenPoint(we.sales,1);Q(`orchard-marker`).style.left=`${a.x}px`,Q(`orchard-marker`).style.top=`${a.y}px`,Q(`orchard-marker`).hidden=!$.investments.has(`orchard`);let o=e.screenPoint(ie,1.8);Q(`kitchen-marker`).style.left=`${o.x}px`,Q(`kitchen-marker`).style.top=`${o.y}px`,Q(`kitchen-marker`).hidden=!$.investments.has(`kitchen`),Q(`kitchen-marker`).textContent=$.kitchen.progress>0?`食品を加工中`:`加工台`;let c=e.screenPoint(ht.sales,1.4);Q(`sea-marker`).style.left=`${c.x}px`,Q(`sea-marker`).style.top=`${c.y}px`,Q(`sea-marker`).hidden=!$.agricultureComplete,Q(`phase-label`).textContent=i?$.harbor.pier?`漁の戻る港`:$.harbor.cleaned?`網を引く浜`:`忘れられた浜`:`${$.restorationPhase}/6 · ${C[$.restorationPhase-1]}`;let l=i?$.harbor.percent:$.restorationPercent;Q(`quest-count`).textContent=`${l}%`,Q(`quest-fill`).style.width=`${l}%`,Q(`pasture-toggle`).textContent=`農地へ歩く`,Q(`pasture-toggle`).hidden=i,Q(`district-toggle`).textContent=`街の場所へ歩く`;let d=e.screenPoint(St,.92);Q(`ship-marker`).style.left=`${d.x}px`,Q(`ship-marker`).style.top=`${d.y}px`;let h=e.screenPoint(O,1.8);Q(`truck-marker`).style.left=`${h.x}px`,Q(`truck-marker`).style.top=`${h.y}px`,Q(`truck-marker`).hidden=!$.investments.has(`truck`);let g=e.screenPoint(qe,1.2);Q(`cottage-marker`).style.left=`${g.x}px`,Q(`cottage-marker`).style.top=`${g.y}px`,Q(`cottage-marker`).hidden=!1;let _=e.screenPoint(ve,1.3);Q(`restoration-marker`).style.left=`${_.x}px`,Q(`restoration-marker`).style.top=`${_.y}px`,Q(`restoration-marker`).hidden=!1;for(let[t,n]of[[`storage-marker`,xt],[`workshop-marker`,ye]]){let r=e.screenPoint(n,1.3);Q(t).style.left=`${r.x}px`,Q(t).style.top=`${r.y}px`,Q(t).hidden=t===`storage-marker`&&!$.projects.has(`barn-open`)}let v=e.screenPoint(ce,.7);re.style.left=v.x+`px`,re.style.top=v.y+`px`,re.hidden=$.enterprises.level(`depot`)<3||Tt($.player,ce)>12;for(let t of se){let n=e.screenPoint(t,.8),r=Q(`enterprise-`+t.id);r.style.left=n.x+`px`,r.style.top=n.y+`px`,r.hidden=D||Tt($.player,t)>12,r.textContent=t.title+` · `+$.enterprises.level(t.id)+`/3`}let y=Se($);Q(`open-investments`).hidden=!y||D||!F.hidden,Q(`open-investments`).textContent=y?y.title+` →`:`施設を使う`;let S=[[`ship-marker`,St,$.inventory>0,`出荷する`],[`truck-marker`,O,$.investments.has(`truck`),`注文を届ける`],[`orchard-marker`,we.sales,$.investments.has(`orchard`),`果実を出荷・手入れ`],[`kitchen-marker`,ie,$.investments.has(`kitchen`),`料理をつくる`],[`storage-marker`,xt,$.projects.has(`barn-open`),`作物を預ける・受け取る`],[`restoration-marker`,ve,!0,`掃除・修理を選ぶ`],[`workshop-marker`,ye,$.expertise.best>=1||$.investments.size>0,$.expertise.best===1?`Cランクの収穫で自動化を解放`:`設備を確認・強化`],[`cottage-marker`,qe,$.projects.has(`cottage-yard`),`家の修理・住人のお願い`],[`sea-marker`,ht.sales,$.agricultureComplete,`港の仕事`]],w=S.filter(([,e,t])=>t&&Tt($.player,e)<3.8).sort((e,t)=>Tt($.player,e[1])-Tt($.player,t[1]))[0];for(let[e,,t,n]of S)Q(e).hidden=D||!F.hidden||!t||w?.[0]!==e,Q(e).textContent=n;re.hidden=D||$.enterprises.level(`depot`)<3||Tt($.player,ce)>3.8;for(let e of se){let t=Q(`enterprise-`+e.id),n=$.enterprises.reason(e.id,$);t.hidden=D||!F.hidden||Tt($.player,e)>3.8||!!n,t.textContent=e.title+` · `+($.enterprises.level(e.id)===3?`復興済み`:`復興の仕事を見る`)}let E=xe($).sort((e,t)=>Tt($.player,e)-Tt($.player,t))[0],k=Q(`upgrade-nearby`);if(k.hidden=D||!F.hidden||!E||Tt($.player,E)>2.6||!!$.paymentPad||$.coins<=0,E){let t=bt.find(e=>e.id===E.id),n=e.screenPoint(E,1);k.style.left=n.x+`px`,k.style.top=n.y+`px`,qp(k,`<strong>${t.title}</strong><small>あと ${(t.price-($.funding.paid[t.id]??0)).toLocaleString()}メニー</small><span>${t.detail}</span><small>任意の改善 · ここへ歩いて納付</small>`)}let A=b.filter(e=>!$.projects.has(e.id)&&(!e.requires||$.projects.has(e.requires))).sort((e,t)=>Tt($.player,e)-Tt($.player,t))[0],j=Q(`project-nearby`);if(j.hidden=D||!F.hidden||!A||Tt($.player,A)>3.2||$.isWorking,A){let t=e.screenPoint(A,1);j.style.left=t.x+`px`,j.style.top=t.y+`px`,j.dataset.project=A.id,j.textContent=A.title+` · `+($.projectReason(A.id)||`ここへ歩いて作業`)}if(!j.hidden||!k.hidden)for(let[e]of S)Q(e).hidden=!0;let N=[...document.querySelectorAll(`.world-label`)].filter(e=>!e.hidden&&e.id!==`job-marker`);if(N.length>1){let e=j.hidden?k.hidden?N[0]:k:j;for(let t of N)t.hidden=t!==e}N.some(e=>!e.hidden)&&(Q(`open-investments`).hidden=!0);let P=$.paymentPad;if(Q(`payment`).hidden=D||!P,P){let e=bt.find(e=>e.id===P.id);qp(Q(`payment`),`<strong>${e.title}</strong><span>${e.detail}</span><small>${$.funding.paid[e.id]??0} / ${e.price} メニー · ${$.coins===0?`メニー不足。続きは後から`:$.funding.dwell<1?`1秒静止後、2秒で納付`:`納付中 · 移動で停止`}</small>`)}if(Q(`job-marker`).hidden=!0,m){let t=x(m),n=e.screenPoint(t,1.5);Q(`job-marker`).style.left=`${n.x}px`,Q(`job-marker`).style.top=`${n.y}px`,Q(`job-marker`).textContent=t.title}let te=Q(`action`);te.hidden=D||!$.isWorking,$.isWorking&&(Q(`action-text`).textContent=($.activeProject?x($.activeProject).title+` · `:``)+Et[$.action]+($.action===`harvesting`?` · ${M[$.harvestGrade($.plots[$.active].crop)]}見込み`:$.action===`picking`?` · ${M[$.harvestGrade(ee($.orchard.active))]}見込み`:``),Q(`action-fill`).style.width=`${Math.min(100,$.progress*100)}%`),$.message&&=(im($.message),``),$.stories.observe($)&&$.revision++,!D&&!document.hidden&&F.hidden&&$.action!==`walking`&&!$.isWorking&&!s&&!u.length&&ne.show();let I=T($);if(Q(`quest-title`).textContent=i?`港の復興`:I.title,Q(`quest-description`).textContent=i?$.harbor.boat?`${$.harbor.voyageState} · 次の帰港まで ${Math.floor($.harbor.secondsLeft/60)}:${String($.harbor.secondsLeft%60).padStart(2,`0`)} · 港 ${$.harbor.fish}/${$.harbor.capacity}匹`:`浜の片付け → 漁 → 出荷 → 桟橋と漁船`:I.detail,t>rm&&Q(`toast`).classList.remove(`visible`),$.isWorking||P){for(let e of N)e.hidden=!0;Q(`open-investments`).hidden=!0}Kp.hidden=D||!F.hidden;let L=Q(`quest-button`).getBoundingClientRect().bottom+16,R=Math.min(innerHeight-160,Kp.getBoundingClientRect().top-16);for(let t of N.filter(e=>!e.hidden)){let n=t.offsetWidth/2+12,r=t.offsetHeight;if(R-L<r){t.hidden=!0;continue}t.style.left=Math.round(Math.max(n,Math.min(innerWidth-n,parseFloat(t.style.left)||innerWidth/2)))+`px`,t.style.top=Math.round(Math.max(L+r,Math.min(R,parseFloat(t.style.top)||L+r)))+`px`;let i=e.screenPoint($.player,1.8),a=e.screenPoint($.player,0),o=t.getBoundingClientRect();o.left<a.x+28&&o.right>a.x-28&&o.bottom>i.y&&o.top<a.y&&(i.y-14-r>=L?t.style.top=Math.round(i.y-14)+`px`:a.y+14+r<=R?t.style.top=Math.round(a.y+14+r)+`px`:t.hidden=!0)}Ee!==$.revision&&(Ee=$.revision,nm(),Q(`coins`).textContent=$.coins.toLocaleString(`ja-JP`),D&&oe.render()),requestAnimationFrame(Ae)}let je=()=>{P(!0),i($.playerName,e=>{$.playerName=e,$.revision++,P(!1),nm()})};Q(`change-player-name`).addEventListener(`click`,je),$.playerName||je(),requestAnimationFrame(Ae),Xp.available||im(`このブラウザーでは保存を利用できません。`)}am().catch(e=>{console.error(e),Q(`loading`).innerHTML=`<h2>農園を開けませんでした</h2><p>ブラウザーの再読み込みをお試しください。</p><button id="retry">もう一度開く</button>`,Q(`retry`).addEventListener(`click`,()=>location.reload())});