(()=>{var e,t,n,r,a,i={2195:(e,t,n)=>{"use strict";n.d(t,{$U:()=>h,dR:()=>E,At:()=>b,I1:()=>d,U9:()=>B,W_:()=>m,Q$:()=>g,a3:()=>l,gb:()=>N,_t:()=>v,WC:()=>u,VG:()=>s,uW:()=>A,uq:()=>y,QZ:()=>k,Fo:()=>p,Ky:()=>w,kp:()=>i});var r=n(7294),a=n(7768);function i(e){var t="";return e.data.unique&&(t+="Unique, "),e.data.loyal&&(t+="Loyal","M'arrillian"==e.data.tribe&&(t+=" - M'arrillians or Minions"),"1"!=e.data.loyal&&(t+=" - "+e.data.loyal)),e.data.legendary&&(t=t?"Legendary, "+t:"Legendary"),""===(t=t.replace(/,\s+$/,""))?r.createElement(r.Fragment,null):r.createElement("div",{style:{fontWeight:"Bold"}},t)}function l(e){var t=e.initiative,n=null;return["Danian","Generic","Mipedian","OverWorld","UnderWorld","M'arrillian"].indexOf(t)>-1?n=r.createElement("img",{className:"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/tribes/"+t+".png").toLowerCase()}):["courage","power","speed","wisdom"].indexOf(t.toLowerCase())>-1?n=r.createElement("img",{className:"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/disciplines/"+t+".png").toLowerCase()}):["fire","air","earth","water"].indexOf(t.toLowerCase())>-1?n=r.createElement("img",{className:"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/elements/"+t+".png").toLowerCase()}):"mugic counter"==t.toLowerCase()&&(n=r.createElement("img",{className:"icon16",style:{verticalAlign:"middle"},src:"/public/img/icons/mugic/generic.png".toLowerCase()})),r.createElement("span",null,!e.notitle&&"Initiative: ",n," ",t)}var c=n(5934),o=n.n(c);function s(e){var t=e.name.split(",");return r.createElement("div",null,r.createElement("span",{className:"name"},r.createElement("span",{className:"bigger"},t[0]),t.length>1&&r.createElement(r.Fragment,null,r.createElement("span",{style:{opacity:"0"}},","),r.createElement("span",{className:"subname"},t[1]))))}function u(e){var t=("/public/img/icons/mugic/"+((e.tribe||"generic")+(null!=e.amount?"_"+e.amount:""))+".png").toLowerCase();return r.createElement("img",{className:e.size||"icon20",src:t,alt:"MC"})}function m(e){return e.value?r.createElement("img",{className:e.size||"icon20",src:("/public/img/icons/elements/"+e.element+".png").toLowerCase()}):r.createElement("img",{className:e.size||"icon20",src:("/public/img/icons/elements/"+e.element+"-inactive.png").toLowerCase()})}function p(e){return r.createElement("img",{className:e.size||"icon16",src:("/public/img/icons/tribes/"+e.tribe+".png").toLowerCase()})}function d(e){return r.createElement("img",{className:e.size||"icon16",src:("/public/img/icons/disciplines/"+e.discipline+".png").toLowerCase()})}function g(e){var t=e.flavortext;return t?r.createElement("div",{className:"flavortext"},t):r.createElement(r.Fragment,null)}function h(e){var t=[{regex:/([0-9x]*){{mc}}/i,fn:function(t,n){return n.length>1&&""!=n[1]?r.createElement(u,{key:t,tribe:e.tribe,amount:n[1].toLowerCase(),size:"icon14"}):r.createElement(u,{key:t,tribe:e.tribe,size:"icon14"})}},{regex:new RegExp(/(\b((fire)|(air)|(earth)|(water)))/i),fn:function(e,t){return r.createElement("span",{key:e},r.createElement(m,{element:t[0].replace(/\b/,""),value:"true",size:"icon14"}),t[0])}},{regex:/(courage)|(power)|(wisdom)|(speed)/i,fn:function(e,t){return r.createElement("span",{key:e},r.createElement(d,{discipline:t[0],size:"icon14"}),t[0])}},{regex:/(danian)|(generic)|(mipedian)|(overworld)|(underworld)|(m'arrillian)/i,fn:function(e,t){return r.createElement("span",{key:e},r.createElement(p,{tribe:t[0],size:"icon14"}),t[0])}}];return r.createElement("div",{className:e.type||"ability"},o()(t)(e.ability))}var f=n(7436);function E(e){var t="attack"+(e.bp&&e.bp>=0?"_"+e.bp:"");return r.createElement("img",{className:e.size||"icon16",src:"/public/img/icons/attack/"+t+".png"})}function b(e){return r.createElement("img",{className:e.size||"icon16",src:"/public/img/icons/battlegear.png"})}function v(e){return r.createElement("img",{className:e.size||"icon16",src:"/public/img/icons/location.png"})}function y(e){var t=e.set,n=e.rarity,a=e.iconOnly,i=void 0!==a&&a;return r.createElement("span",null,"PE1"!==t&&r.createElement("img",{className:e.size||"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/set/"+t+"/"+n+".png").toLowerCase()}),!i&&r.createElement(r.Fragment,null,f.Z.sets[e.set]," | ",e.rarity))}function w(e){return r.createElement("p",{style:a.Z.p},"This page is currently under construction")}function A(e){return r.createElement("p",{style:a.Z.p},"404 route not found - ",a.Z.code(e.location.pathname))}function N(e){return r.createElement("span",null,"Loading...")}function B(e){return r.createElement("form",{action:"https://www.paypal.com/cgi-bin/webscr",method:"post",target:"_blank"},r.createElement("input",{type:"hidden",name:"cmd",value:"_s-xclick"}),r.createElement("input",{type:"hidden",name:"encrypted",value:"-----BEGIN PKCS7-----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-----END PKCS7-----"}),r.createElement("a",{href:"https://www.paypal.com/cgi-bin/webscr"},r.createElement("input",{type:"image",src:"/public/img/btn_donate_SM.gif",border:"0",name:"submit",alt:"PayPal Donate"})))}function k(e){return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",className:"magnifying-glass"},r.createElement("g",{fillRule:"evenodd"},r.createElement("path",{d:"M21.747 20.524l-4.872-4.871a.864.864 0 1 0-1.222 1.222l4.871 4.872a.864.864 0 1 0 1.223-1.223z"}),r.createElement("path",{d:"M3.848 10.763a6.915 6.915 0 0 1 6.915-6.915 6.915 6.915 0 0 1 6.915 6.915 6.915 6.915 0 0 1-6.915 6.915 6.915 6.915 0 0 1-6.915-6.915zm-1.729 0a8.643 8.643 0 0 0 8.644 8.644 8.643 8.643 0 0 0 8.644-8.644 8.643 8.643 0 0 0-8.644-8.644 8.643 8.643 0 0 0-8.644 8.644z"})))}},7436:(e,t,n)=>{"use strict";n.d(t,{Z:()=>B});var r,a,i=n(5861),l=n(3269),c=n(3144),o=n(3229),s=n(7757),u=n.n(s),m=(n(7147),n(2188)),p=n(3050),d=n.n(p),g=new(n(9585).Z);const h=(r=function(){function e(e,t){var n=this;(0,l.Z)(this,"building",a,this),this.purgeDB=function(){["attacks","battlegear","creatures","locations","mugic"].forEach((function(e){n.db.removeCollection(e)})),n.db.saveDatabase()},this.api=e,this.format=t,this.setupDB(t)}var t=e.prototype;return t.setupType=function(){var e=(0,i.Z)(u().mark((function e(t,n,r){var a,l,c,o,s=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.building.hasOwnProperty(t)){e.next=22;break}if(a=t.charAt(0).toUpperCase()+t.slice(1),"built"!=(l=this.building[t].get())){e.next=7;break}return e.abrupt("return",this.api.getSpreadsheetTime(this.api.urls[a][this.format]).then((function(e){var a=g.get(s.format+"_"+t);return a?new Date(e)>new Date(a)?(s[t].clear(),s.building[t].set("setup"),s.setupType(t,n,r)):n():(g.set(s.format+"_"+t,e,{path:"/"}),n())})).catch((function(){return n()})));case 7:if("building"!=l){e.next=12;break}return c=(0,m.N7)(this.building[t],(function(e){c(),n()})),e.abrupt("return",c);case 12:if("setup"!=l){e.next=20;break}if(0!=this[t].data.length){e.next=18;break}return this.building[t].set("building"),e.abrupt("return",this.api.parseSpreadsheetData(this.api.urls[a][this.format],a,!0).then(function(){var e=(0,i.Z)(u().mark((function e(r){var i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s[t].insert(r),s.building[t].set("built"),e.prev=2,e.next=5,s.api.getSpreadsheetTime(s.api.urls[a][s.format]);case 5:i=e.sent,g.set(s.format+"_"+t,i,{path:"/"}),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(2);case 11:return e.abrupt("return",n());case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()).catch((function(){return r()})));case 18:return this.building[t].set("built"),e.abrupt("return",n());case 20:e.next=25;break;case 22:return this.building[t]=m.LO.box("wait"),o=(0,m.N7)(this.building[t],(function(){return o(),s.setupType(t,n)})),e.abrupt("return",o);case 25:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}(),t.setupDB=function(e){var t=new(d())("chaotic_"+e+".db",{autosave:!0,autoload:!0,autoloadCallback:function(){var e=this;["attacks","battlegear","creatures","locations","mugic"].forEach((function(n){var r=t.getCollection(n);null===r||0===r.data.length?(e[n]=t.addCollection(n),e.building[n]?e.building[n].set("setup"):e.building[n]=m.LO.box("setup")):(e[n]=r,e.building[n]?e.building[n].set("built"):e.building[n]=m.LO.box("built"))}))}.bind(this),autosaveInterval:4e3,persistenceMethod:"localStorage"});this.db=t},e}(),a=(0,o.Z)(r.prototype,"building",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),(0,o.Z)(r.prototype,"setupType",[m.aD],Object.getOwnPropertyDescriptor(r.prototype,"setupType"),r.prototype),(0,o.Z)(r.prototype,"setupDB",[m.aD],Object.getOwnPropertyDescriptor(r.prototype,"setupDB"),r.prototype),r),f=JSON.parse('[{"type":"Creatures","subtype":"cards","url":"1fUFYhG1NLLkSTzrdbevm6ZMKNP6xLiKUZvM1sY10pVI"},{"type":"Creatures","subtype":"portal","url":"1eGQsy2kYk7HfnQetsjobMqank4bg6iWOOaSYykg3Yec"},{"type":"Mugic","subtype":"cards","url":"1rOMFKnWaz6XmhD43YFpcemWGzEok9IgtKCoiPMwA35s"},{"type":"Mugic","subtype":"portal","url":"1tEuwPGixJH2A03YtYL6Ar-MSFvtfrlaveT98GwJhw1g"},{"type":"Attacks","subtype":"cards","url":"1yXFijC2hN1vybU3ejdINYoTOTG62qCkpPLPsiYUEEyo"},{"type":"Attacks","subtype":"portal","url":"1KUk5J-3ZeMlEBXOfDb2h4GUUJK_0_yOq0EUDitQgNa8"},{"type":"Battlegear","subtype":"cards","url":"1UUEPAEHZwmH52AJj2Jtskf6d4z5XIFEBb3HT-FTAcgs"},{"type":"Battlegear","subtype":"portal","url":"1S5AVw-E_sFO257uzajauP31bOI0LPmrbTcUzSpa2i60"},{"type":"Locations","subtype":"cards","url":"15QPS08iq6pkyMFsYuDsKIXX8LQmQ8MUoJeeNtjU54Xo"},{"type":"Locations","subtype":"portal","url":"1U07n2keHNxL-6y5zUcHlb220zT9A_MrVEansOAMQFCA"}]');var E,b,v,y,w,A;function N(e,t,n){return void 0===t&&(t=0),void 0===n&&(n=null),t<0?Promise.reject(n):e().catch((function(n){return N(e,t-1,n)}))}const B=(A=w=function(){function e(){(0,l.Z)(this,"portal",b,this),(0,l.Z)(this,"cards",v,this),(0,l.Z)(this,"urls",y,this);try{var e={};f.forEach((function(t){var n=t.type,r=t.subtype,a=t.url;e[n]||(e[n]={}),e[n][r]=a})),this.urls=e,this.portal=new h(this,"portal"),this.cards=new h(this,"cards")}catch(e){this.portal=null,this.cards=null,this.urls=null,console.error("setting up database failed",e)}}e.getInstance=function(){return e.instance||(e.instance=new e),e.instance};var t=e.prototype;return t.path=function(e){return"https://sheets.googleapis.com/v4/spreadsheets/"+e+"/values/Sheet1?key="+this.key},t.getSpreadsheetTime=function(){var e=(0,i.Z)(u().mark((function e(t){var n,r,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://content.googleapis.com/drive/v3/files/"+t+"?fields=modifiedTime&key="+this.key,e.next=3,fetch(n);case 3:if(200!==(r=e.sent).status){e.next=10;break}return e.next=7,r.json();case 7:if(!("modifiedTime"in(a=e.sent))){e.next=10;break}return e.abrupt("return",Promise.resolve(a.modifiedTime));case 10:return e.abrupt("return",Promise.reject());case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.getSpreadsheetData=function(){var e=(0,i.Z)(u().mark((function e(t,n){var r,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===n&&(n=!1),r=this.path(t),a=function(){var e=(0,i.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(r);case 2:if(404!==(t=e.sent).status){e.next=5;break}throw new Error("Can't Open File");case 5:return e.prev=5,e.next=8,t.json();case 8:return n=e.sent,e.abrupt("return",n.values);case 12:throw e.prev=12,e.t0=e.catch(5),new Error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(){return e.apply(this,arguments)}}(),e.abrupt("return",N(a,n?3:0));case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}(),t.parseSpreadsheetData=function(){var e=(0,i.Z)(u().mark((function e(t,n,r){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===r&&(r=!1),e.abrupt("return",this.getSpreadsheetData(t,r).then((function(e){if(e.length<2)return[];var t=e.shift().map((function(e){return e.toLowerCase().replace(" ","")}));return e.map((function(e){for(var r={gsx$type:n},a=0;a<t.length;a++)r["gsx$"+t[a]]=e[a];return r}))})));case 2:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}(),t.LoadDB=function(){var e=(0,i.Z)(u().mark((function e(t){var n=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.urls&&this.portal&&this.cards)){e.next=4;break}return e.abrupt("return",Promise.all(t.map((function(e){return new Promise((function(t,r){return"cards"in e?n.cards.setupType(e.cards,t,r):"portal"in e?n.portal.setupType(e.portal,t,r):(console.error("key must be cards or portal"),r())}))}))));case 4:return e.abrupt("return",Promise.reject());case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.cardImage=function(e){return e.gsx$ic&&""!==e.gsx$ic?e.gsx$ic:e.gsx$image&&""!==e.gsx$image?this.base_image+e.gsx$image:this.card_back},t.purgeDB=function(){this.cards&&this.cards.purgeDB(),this.portal&&this.portal.purgeDB(),setTimeout((function(){window.location.reload()}),300)},(0,c.Z)(e,[{key:"base_image",get:function(){return"https://drive.google.com/uc?id="}},{key:"thumb_missing",get:function(){return"1JYjPzkv74IhzlHTyVh2niTDyui73HSfp"}},{key:"card_back",get:function(){return"https://i.imgur.com/xbeDBRJ.png"}},{key:"key",get:function(){return["AIz","aSy","Bfq","09-","tBi","78b","nH6","6f1","Lkn","zGD","XM9","Zu9","JG0"].join("")}},{key:"tribes",get:function(){return["Danian","Generic","Mipedian","M'arrillian","OverWorld","UnderWorld"]}},{key:"sets",get:function(){return{DOP:"Dawn of Perim",ZOTH:"Zenith of the Hive",SS:"Silent Sands",MI:"Beyond the Doors",ROTO:"Rise of the Oligarch",TOTT:"Turn of the Tide",FUN:"Forged Unity",AU:"Alliance Unraveled",FAS:"Fire and Stone",OP1:"Organized Play 1",PE1:"Premium Edition 1",SAS:"Storm and Sea",EE:"Elemental Emperors",BR:"Beyond Rare",LR:"League Rewards",PROMO:"Promotional",PROTO:"Prototype"}}}]),e}(),w.instance=void 0,E=A,b=(0,o.Z)(E.prototype,"portal",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),v=(0,o.Z)(E.prototype,"cards",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),y=(0,o.Z)(E.prototype,"urls",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),E).getInstance()},8953:(e,t,n)=>{"use strict";var r,a=n(7294),i=n(3935),l=n(3727),c=n(5977),o=n(684),s=n(7436),u=n(2195),m=n(5603),p=n(798),d=(0,p.f3)((function(e,t,n){return t}))(r=(0,p.Pi)(r=function(e){function t(){return e.apply(this,arguments)||this}return(0,m.Z)(t,e),t.prototype.render=function(){return a.createElement("div",null,a.createElement("span",null,"This page is not yet available"))},t}(a.Component))||r)||r,g=(0,o.ZP)((function(){return Promise.all([n.e(736),n.e(631)]).then(n.bind(n,631))}),{fallback:a.createElement(u.gb,null)}),h=(0,o.ZP)((function(){return n.e(640).then(n.bind(n,8640))}),{fallback:a.createElement(u.gb,null)}),f=(0,o.ZP)((function(){return Promise.all([n.e(736),n.e(159)]).then(n.bind(n,159))}),{fallback:a.createElement(u.gb,null)}),E=(0,o.ZP)((function(){return Promise.all([n.e(736),n.e(510)]).then(n.bind(n,7510))}),{fallback:a.createElement(u.gb,null)});function b(){return a.createElement(c.rs,null,a.createElement(c.AW,{path:"/beta/collection",component:E}),a.createElement(c.AW,{path:"/beta"},(function(e){var t=e.location;return a.createElement(c.l_,{to:t.pathname.replace("/beta","")})})),a.createElement(c.AW,{component:v}))}function v(){return a.createElement(c.rs,null,a.createElement(c.AW,{exact:!0,path:"/",component:h}),a.createElement(c.AW,{path:"/PageNotFound",component:u.uW}),a.createElement(c.AW,{path:"/UnderConstruction",component:u.Ky}),a.createElement(c.AW,{path:"/EnterTheCode",component:g}),a.createElement(c.AW,{path:"/create",component:d}),a.createElement(c.AW,{path:"/collection",component:E}),a.createElement(c.AW,{path:"/portal",component:f}))}function y(e){var t="ENG",n=a.createElement(b,null);return a.createElement(a.Fragment,null,a.createElement("div",{className:"fix-pgBkgrnd-repeat-x"},a.createElement("div",{className:"fix-img-bkgrnd fix-img-bkgrnd_05"})),a.createElement("div",{className:"pgBkgrnd-repeat-x"},a.createElement("div",{className:"img-bkgrnd"},a.createElement("div",{className:"content-wrap"},a.createElement("div",{className:"legacy legacy-header"},a.createElement("div",{className:"header"},a.createElement("div",{id:"nav"},a.createElement("div",{className:"zero-clear-line headerSpriteNav-wrap"},a.createElement("ul",{id:"unity-sprite",className:t},a.createElement("li",{id:"unity-nav1",className:t}),a.createElement("li",{id:"unity-nav2",className:t},a.createElement(l.rU,{to:"/collection/"},a.createElement("span",null,"Collect"))),a.createElement("li",{id:"unity-nav3",className:t},a.createElement("a",{href:"https://chaoticbackup.forumotion.com/f11-deck-building"},a.createElement("span",null,"Build"))),a.createElement("li",{id:"unity-nav4",className:t},a.createElement("a",{href:"https://chaoticbackup.forumotion.com/f16-trading-buying-and-selling"},a.createElement("span",null,"Trade"))),a.createElement("li",{id:"unity-nav5",className:t},a.createElement(l.rU,{to:"/"},a.createElement("span",null,"Home"))),a.createElement("li",{id:"unity-nav6",className:t},a.createElement("a",{href:"https://chaoticbackup.forumotion.com"},a.createElement("span",null,"Forums"))),a.createElement("li",{id:"unity-nav7",className:t},a.createElement(l.rU,{to:"/portal/"},a.createElement("span",null,"Portal"))),a.createElement("li",{id:"unity-nav8",className:t},a.createElement("a",{href:"https://chaoticrecode.com"},a.createElement("span",null,"Play"))),a.createElement("li",{id:"unity-nav9",className:t})),a.createElement("ul",{id:"unityETC-sprite",className:t},a.createElement("li",{id:"unity-nav10",className:t},a.createElement(l.rU,{to:"/EnterTheCode"},a.createElement("span",null,"Enter the Code")))))))),a.createElement("div",{className:"banner-ad-top"}),a.createElement("div",{className:"legacy content"},a.createElement("div",{className:"left-column"},a.createElement("div",{className:"full-width clear-line",style:{marginBottom:"5px"}})),a.createElement("div",{className:"full-column"},a.createElement("div",{className:"pods-wrap pad5px-btm"},a.createElement("div",{className:"clear-line full-width"},a.createElement("div",{className:"adPod-top-wrap"},a.createElement("div",{className:"videoAdPod-topleft"},a.createElement("div",{className:"videoAdPod-topLeft-repeat-x"})),a.createElement("div",{className:"videoAdPod-topright"},a.createElement("div",{className:"videoAdPod-topRight-repeat-x"})))),a.createElement("div",{className:"content-area-repeat-xy"},a.createElement("div",{className:"content-area-top-repeat-x"},a.createElement("div",{className:"content-area-left-repeat-y"},a.createElement("div",{className:"content-area-right-repeat-y"},a.createElement("div",{className:"content-area-inner-space"},a.createElement("div",{id:"player"},n)))))),a.createElement("div",{className:"content-btm-wrap"},a.createElement("div",{className:"content-area-btm-left"},a.createElement("div",{className:"content-left-btm-repeat-x"})),a.createElement("div",{className:"content-area-btm-right"},a.createElement("div",{className:"content-right-btm-repeat-x"}))))),a.createElement("div",{className:"right-column"},a.createElement("div",{className:"full-width clear-line",style:{marginBottom:"5px"}}))),a.createElement("div",{className:"banner-ad-bottom"}),a.createElement("div",{className:"legacy legacy-footer"},a.createElement("div",{className:"footer-wrap"},a.createElement("div",{className:"footer-repeat-x"},a.createElement("div",{className:"footer-left"},a.createElement("div",{className:"footer-right"},a.createElement("div",{className:"footer-text"},a.createElement("div",{className:"footer-search"},a.createElement("br",null),a.createElement("br",null),a.createElement(u.U9,null)),a.createElement("div",{className:"footer-nav"},a.createElement("div",{className:"copyright"},"©2008 Chaotic USA Entertainment Group, Inc.",a.createElement("br",null),"U.S. Pat 5810666 and 5954332 and other pending patent applications. All Rights Reserved.")),a.createElement("div",{className:"footer-language"},a.createElement("a",{href:"#",onClick:function(e){e.stopPropagation(),e.preventDefault(),s.Z.purgeDB()},className:"page-options",title:"Change Language"},a.createElement("img",{src:"/public/img/flag_usa_.gif",alt:"English (Change Language)",width:"40",height:"27"}),a.createElement("br",null),"English (Change Language)"))))))))))))}(0,i.render)(a.createElement(l.VK,null,a.createElement(y,{path:"/*",href:"/"})),document.getElementById("root"))},7768:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(5403),a=Object.create(r.Z);a.root={backgroundColor:"#F0F0F0",fontFamily:"helvetica neue, helvetica, sans-serif",fontWeight:"300",fontSize:"16px",letterSpacing:"0.025em",padding:"3vh 0 12vh 0",width:"500px",maxWidth:"calc(100vw - 40px)",position:"relative",left:"50vw",WebkitTransform:"translate(-50%, 0)",MozTransform:"translate(-50%, 0)",msTransform:"translate(-50%, 0)",OTransform:"translate(-50%, 0)",transform:"translate(-50%, 0)",WebkitTextSizeAdjust:"none",MozTextSizeAdjust:"none",msTextSizeAdjust:"none",textSizeAdjust:"none"},a.title={fontSize:"20px",marginBottom:"0.5vh"};const i=a},5403:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(7462),a=n(7294),i={normal:{borderBottom:"1px dotted rgb(66, 140, 195)"},hover:{borderBottom:"1px solid rgb(66, 140, 195)",color:"rgb(66, 140, 195)"},active:"hover",touchActive:{borderBottom:"1px dashed rgb(66, 140, 195)",color:"rgb(66, 140, 195)"},focusFromTab:{outline:"2px solid rgb(0, 152, 0)",outlineOffset:"2px",color:"black"},touchActiveTapOnly:!0},l={};Object.keys(i).forEach((function(e){"touchActiveTapOnly"!==e&&(l["onParent"+e.slice(0,1).toUpperCase()+e.slice(1)]=i[e])}));const c={link:i,childLink:l,p:{margin:"3vh 0",lineHeight:"1.4"},code:function(e){return a.createElement("code",{style:{fontFamily:"monospace",fontSize:"15px",paddingLeft:"2px"}},e)},li:function(e,t){return a.createElement("li",(0,r.Z)({style:{paddingLeft:"18px",textIndent:"-15px",margin:"0.5vh 0",listStyle:"none"}},t),a.createElement("span",{style:{paddingRight:"7px"}},"–"),e)}}},693:()=>{}},l={};function c(e){var t=l[e];if(void 0!==t)return t.exports;var n=l[e]={exports:{}};return i[e].call(n.exports,n,n.exports,c),n.exports}c.m=i,e=[],c.O=(t,n,r,a)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,r,a]=e[u],l=!0,o=0;o<n.length;o++)(!1&a||i>=a)&&Object.keys(c.O).every((e=>c.O[e](n[o])))?n.splice(o--,1):(l=!1,a<i&&(i=a));if(l){e.splice(u--,1);var s=r();void 0!==s&&(t=s)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,r,a]},c.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return c.d(t,{a:t}),t},c.d=(e,t)=>{for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},c.f={},c.e=e=>Promise.all(Object.keys(c.f).reduce(((t,n)=>(c.f[n](e,t),t)),[])),c.u=e=>e+".js",c.miniCssF=e=>e+".css",c.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),t={},n="chaoticbackup:",c.l=(e,r,a,i)=>{if(t[e])t[e].push(r);else{var l,o;if(void 0!==a)for(var s=document.getElementsByTagName("script"),u=0;u<s.length;u++){var m=s[u];if(m.getAttribute("src")==e||m.getAttribute("data-webpack")==n+a){l=m;break}}l||(o=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.setAttribute("data-webpack",n+a),l.src=e),t[e]=[r];var p=(n,r)=>{l.onerror=l.onload=null,clearTimeout(d);var a=t[e];if(delete t[e],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((e=>e(r))),n)return n(r)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),o&&document.head.appendChild(l)}},c.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.p="/build/",r=e=>new Promise(((t,n)=>{var r=c.miniCssF(e),a=c.p+r;if(((e,t)=>{for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var a=(l=n[r]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(a===e||a===t))return l}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){var l;if((a=(l=i[r]).getAttribute("data-href"))===e||a===t)return l}})(r,a))return t();((e,t,n,r)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.onerror=a.onload=i=>{if(a.onerror=a.onload=null,"load"===i.type)n();else{var l=i&&("load"===i.type?"missing":i.type),c=i&&i.target&&i.target.href||t,o=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");o.code="CSS_CHUNK_LOAD_FAILED",o.type=l,o.request=c,a.parentNode.removeChild(a),r(o)}},a.href=t,document.head.appendChild(a)})(e,a,t,n)})),a={179:0},c.f.miniCss=(e,t)=>{a[e]?t.push(a[e]):0!==a[e]&&{159:1,510:1,631:1,640:1}[e]&&t.push(a[e]=r(e).then((()=>{a[e]=0}),(t=>{throw delete a[e],t})))},(()=>{var e={179:0};c.f.j=(t,n)=>{var r=c.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(((n,a)=>r=e[t]=[n,a]));n.push(r[2]=a);var i=c.p+c.u(t),l=new Error;c.l(i,(n=>{if(c.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,r[1](l)}}),"chunk-"+t,t)}},c.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[i,l,o]=n,s=0;for(r in l)c.o(l,r)&&(c.m[r]=l[r]);if(o)var u=o(c);for(t&&t(n);s<i.length;s++)a=i[s],c.o(e,a)&&e[a]&&e[a][0](),e[i[s]]=0;return c.O(u)},n=self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),c.O(void 0,[736],(()=>c(6981)));var o=c.O(void 0,[736],(()=>c(8953)));o=c.O(o)})();