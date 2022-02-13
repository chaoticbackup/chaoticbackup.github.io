(()=>{var e,t,n,r,a,i,l,c={1684:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var r=n(7462),a=n(3366),i=n(7294),l=n(6974),c=["component"];const o=function(e){var t=e.component,n=(0,a.Z)(e,c),o=(0,l.TH)(),s=(0,l.s0)();return i.createElement(t,(0,r.Z)({location:o,navigate:s},n))}},5601:(e,t,n)=>{"use strict";n.d(t,{dR:()=>a,At:()=>i,_t:()=>l,H7:()=>c,lB:()=>o,ZD:()=>s,uy:()=>u,cq:()=>m,nB:()=>p});var r=n(7294);function a(e){var t="attack"+(e.bp&&e.bp>=0?"_"+e.bp:"");return r.createElement("img",{className:e.size||"icon16",src:"/public/img/icons/attack/"+t+".png"})}function i(e){return r.createElement("img",{className:e.size||"icon16",src:"/public/img/icons/battlegear.png"})}function l(e){return r.createElement("img",{className:e.size||"icon16",src:"/public/img/icons/location.png"})}function c(e){var t=e.set,n=e.rarity,a=e.size;return r.createElement(r.Fragment,null,"PE1"!==t&&r.createElement("img",{className:a||"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/set/"+t+"/"+n+".png").toLowerCase()}))}function o(e){var t=("/public/img/icons/mugic/"+((e.tribe||"generic")+(null!=e.amount?"_"+e.amount:""))+".png").toLowerCase();return r.createElement("img",{className:e.size||"icon20",src:t,alt:"MC"})}function s(e){return e.value?r.createElement("img",{className:e.size||"icon20",src:("/public/img/icons/elements/"+e.element+".png").toLowerCase()}):r.createElement("img",{className:e.size||"icon20",src:("/public/img/icons/elements/"+e.element+"-inactive.png").toLowerCase()})}function u(e){return r.createElement("img",{className:e.size||"icon16",src:("/public/img/icons/tribes/"+e.tribe+".png").toLowerCase()})}function m(e){return r.createElement("img",{className:e.size||"icon16",src:("/public/img/icons/disciplines/"+e.discipline+".png").toLowerCase()})}function p(e){var t=e.initiative,n=r.createElement(r.Fragment,null);return["Danian","Generic","Mipedian","OverWorld","UnderWorld","M'arrillian"].indexOf(t)>-1?n=r.createElement("img",{className:e.size||"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/tribes/"+t+".png").toLowerCase()}):["courage","power","speed","wisdom"].indexOf(t.toLowerCase())>-1?n=r.createElement("img",{className:e.size||"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/disciplines/"+t+".png").toLowerCase()}):["fire","air","earth","water"].indexOf(t.toLowerCase())>-1?n=r.createElement("img",{className:e.size||"icon16",style:{verticalAlign:"middle"},src:("/public/img/icons/elements/"+t+".png").toLowerCase()}):"mugic counter"==t.toLowerCase()&&(n=r.createElement("img",{className:e.size||"icon16",style:{verticalAlign:"middle"},src:"/public/img/icons/mugic/generic.png".toLowerCase()})),n}},2508:(e,t,n)=>{"use strict";n.d(t,{c:()=>c});var r=n(7294),a=n(5934),i=n.n(a),l=n(5601);function c(e){if(!e.ability||0===e.ability.length)return"";var t=[{regex:/([0-9x]*){{mc}}/i,fn:function(t,n){return n.length>1&&""!=n[1]?r.createElement(l.lB,{key:t,tribe:e.tribe,amount:n[1].toLowerCase(),size:e.size||"icon14"}):r.createElement(l.lB,{key:t,tribe:e.tribe,size:e.size||"icon14"})}},{regex:new RegExp(/(\b((fire)|(air)|(earth)|(water))\b)/i),fn:function(t,n){return r.createElement("span",{key:t},r.createElement(l.ZD,{element:n[0].replace(/\b/,""),value:"true",size:e.size||"icon14"}),n[0])}},{regex:/(courage)|(power)|(wisdom)|(speed)/i,fn:function(t,n){return r.createElement("span",{key:t},r.createElement(l.cq,{discipline:n[0],size:e.size||"icon14"}),n[0])}},{regex:/(danian)|(generic)|(mipedian)|(overworld)|(underworld)|(m'arrillian)/i,fn:function(t,n){return r.createElement("span",{key:t},r.createElement(l.uy,{tribe:n[0],size:e.size||"icon14"}),n[0])}}];return i()(t)(e.ability)}},9637:(e,t,n)=>{"use strict";n.d(t,{$U:()=>d,dR:()=>l.dR,At:()=>l.At,cq:()=>l.cq,U9:()=>v,ZD:()=>l.ZD,Q$:()=>p,a3:()=>h,nB:()=>l.nB,gb:()=>b,_t:()=>l._t,lB:()=>l.lB,VG:()=>u,uW:()=>E,uq:()=>m,H7:()=>l.H7,QZ:()=>y,uy:()=>l.uy,Ky:()=>f,kp:()=>g});var r=n(7294),a=n(6974),i=n(7768),l=n(5601),c=n(2196),o=n(2508),s=n(3999);function u(e){var t=e.name.split(",");return r.createElement("div",null,r.createElement("span",{className:"name"},r.createElement("span",{className:"bigger"},t[0]),t.length>1&&r.createElement(r.Fragment,null,r.createElement("span",{style:{opacity:"0"}},","),r.createElement("span",{className:"subname"},t[1]))))}function m(e){var t=e.set,n=e.rarity,a=e.id,i=void 0===a?-1:a;return r.createElement("div",null,r.createElement(l.H7,e),-1===i?r.createElement(r.Fragment,null,c.Z.sets[e.set]," | ",e.rarity):r.createElement(r.Fragment,null," "+c.Z.sets[t]+" ",r.createElement("span",{style:{fontWeight:"bold"}},"# "+i)," | "+n))}function p(e){var t=e.flavortext;return t?r.createElement("div",{className:"flavortext"},t):r.createElement(r.Fragment,null)}function d(e){return r.createElement("div",{className:e.type||"ability"},(0,o.c)(e))}function g(e){var t=(0,s.G)(e);return""===t?r.createElement(r.Fragment,null):r.createElement("div",{style:{fontWeight:"Bold"}},t)}function h(e){return r.createElement("span",null,!e.notitle&&"Initiative: ",(0,l.nB)(e)," ",e.initiative)}function f(){return r.createElement("p",{style:i.Z.p},"This page is currently under construction")}function E(){var e=(0,a.TH)().pathname;return r.createElement("p",{style:i.Z.p},"404 route not found - ",i.Z.code(e))}function b(){return r.createElement("span",null,"Loading...")}function v(){return r.createElement("form",{action:"https://www.paypal.com/cgi-bin/webscr",method:"post",target:"_blank"},r.createElement("input",{type:"hidden",name:"cmd",value:"_s-xclick"}),r.createElement("input",{type:"hidden",name:"encrypted",value:"-----BEGIN PKCS7-----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-----END PKCS7-----"}),r.createElement("a",{href:"https://www.paypal.com/cgi-bin/webscr"},r.createElement("input",{type:"image",src:"/public/img/btn_donate_SM.gif",border:"0",name:"submit",alt:"PayPal Donate"})))}function y(){return r.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:"24",height:"24",viewBox:"0 0 24 24",className:"magnifying-glass"},r.createElement("g",{fillRule:"evenodd"},r.createElement("path",{d:"M21.747 20.524l-4.872-4.871a.864.864 0 1 0-1.222 1.222l4.871 4.872a.864.864 0 1 0 1.223-1.223z"}),r.createElement("path",{d:"M3.848 10.763a6.915 6.915 0 0 1 6.915-6.915 6.915 6.915 0 0 1 6.915 6.915 6.915 6.915 0 0 1-6.915 6.915 6.915 6.915 0 0 1-6.915-6.915zm-1.729 0a8.643 8.643 0 0 0 8.644 8.644 8.643 8.643 0 0 0 8.644-8.644 8.643 8.643 0 0 0-8.644-8.644 8.643 8.643 0 0 0-8.644 8.644z"})))}},3999:(e,t,n)=>{"use strict";function r(e){var t="";return e.data.unique&&(t+="Unique, "),e.data.loyal&&(t+="Loyal","M'arrillian"==e.data.tribe&&(t+=" - M'arrillians or Minions"),"1"!=e.data.loyal&&(t+=" - "+e.data.loyal)),e.data.legendary&&(t=t?"Legendary, "+t:"Legendary"),t=t.replace(/,\s+$/,"")}n.d(t,{G:()=>r})},7426:(e,t,n)=>{"use strict";n.d(t,{Z:()=>N,v:()=>k});var r,a,i=n(5861),l=n(3269),c=n(3144),o=n(3229),s=n(7757),u=n.n(s),m=(n(7147),n(2188)),p=n(3050),d=n.n(p),g=new(n(9585).Z),h=(r=function(){function e(e,t){var n=this;(0,l.Z)(this,"building",a,this),this.purgeDB=function(){["attacks","battlegear","creatures","locations","mugic"].forEach((function(e){n.db.removeCollection(e)})),n.db.saveDatabase()},this.api=e,this.format=t,this.setupDB(t)}var t=e.prototype;return t.setupType=function(){var e=(0,i.Z)(u().mark((function e(t,n,r){var a,l,c,o,s=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.building.hasOwnProperty(t)){e.next=22;break}if(a=t.charAt(0).toUpperCase()+t.slice(1),"built"!=(l=this.building[t].get())){e.next=7;break}return e.abrupt("return",this.api.getSpreadsheetTime(this.api.urls[a][this.format]).then((function(e){var a=g.get(s.format+"_"+t);return a?new Date(e)>new Date(a)?(s[t].clear(),s.building[t].set("setup"),s.setupType(t,n,r)):n():(g.set(s.format+"_"+t,e,{path:"/"}),n())})).catch((function(){return n()})));case 7:if("building"!=l){e.next=12;break}return c=(0,m.N7)(this.building[t],(function(e){c(),n()})),e.abrupt("return",c);case 12:if("setup"!=l){e.next=20;break}if(0!=this[t].data.length){e.next=18;break}return this.building[t].set("building"),e.abrupt("return",this.api.parseSpreadsheetData(this.api.urls[a][this.format],a,!0).then(function(){var e=(0,i.Z)(u().mark((function e(r){var i;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s[t].insert(r),s.building[t].set("built"),e.prev=2,e.next=5,s.api.getSpreadsheetTime(s.api.urls[a][s.format]);case 5:i=e.sent,g.set(s.format+"_"+t,i,{path:"/"}),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(2);case 11:return e.abrupt("return",n());case 12:case"end":return e.stop()}}),e,null,[[2,9]])})));return function(t){return e.apply(this,arguments)}}()).catch((function(){return r()})));case 18:return this.building[t].set("built"),e.abrupt("return",n());case 20:e.next=25;break;case 22:return this.building[t]=m.LO.box("wait"),o=(0,m.N7)(this.building[t],(function(){return o(),s.setupType(t,n)})),e.abrupt("return",o);case 25:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}(),t.setupDB=function(e){var t=new(d())("chaotic_"+e+".db",{autosave:!0,autoload:!0,autoloadCallback:function(){var e=this;["attacks","battlegear","creatures","locations","mugic"].forEach((function(n){var r=t.getCollection(n);null===r||0===r.data.length?(e[n]=t.addCollection(n),e.building[n]?e.building[n].set("setup"):e.building[n]=m.LO.box("setup")):(e[n]=r,e.building[n]?e.building[n].set("built"):e.building[n]=m.LO.box("built"))}))}.bind(this),autosaveInterval:4e3,persistenceMethod:"localStorage"});this.db=t},e}(),a=(0,o.Z)(r.prototype,"building",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return{}}}),(0,o.Z)(r.prototype,"setupType",[m.aD],Object.getOwnPropertyDescriptor(r.prototype,"setupType"),r.prototype),(0,o.Z)(r.prototype,"setupDB",[m.aD],Object.getOwnPropertyDescriptor(r.prototype,"setupDB"),r.prototype),r);const f=h,E=JSON.parse('[{"type":"Creatures","subtype":"cards","url":"1fUFYhG1NLLkSTzrdbevm6ZMKNP6xLiKUZvM1sY10pVI"},{"type":"Creatures","subtype":"portal","url":"1eGQsy2kYk7HfnQetsjobMqank4bg6iWOOaSYykg3Yec"},{"type":"Mugic","subtype":"cards","url":"1rOMFKnWaz6XmhD43YFpcemWGzEok9IgtKCoiPMwA35s"},{"type":"Mugic","subtype":"portal","url":"1tEuwPGixJH2A03YtYL6Ar-MSFvtfrlaveT98GwJhw1g"},{"type":"Attacks","subtype":"cards","url":"1yXFijC2hN1vybU3ejdINYoTOTG62qCkpPLPsiYUEEyo"},{"type":"Attacks","subtype":"portal","url":"1KUk5J-3ZeMlEBXOfDb2h4GUUJK_0_yOq0EUDitQgNa8"},{"type":"Battlegear","subtype":"cards","url":"1UUEPAEHZwmH52AJj2Jtskf6d4z5XIFEBb3HT-FTAcgs"},{"type":"Battlegear","subtype":"portal","url":"1S5AVw-E_sFO257uzajauP31bOI0LPmrbTcUzSpa2i60"},{"type":"Locations","subtype":"cards","url":"15QPS08iq6pkyMFsYuDsKIXX8LQmQ8MUoJeeNtjU54Xo"},{"type":"Locations","subtype":"portal","url":"1U07n2keHNxL-6y5zUcHlb220zT9A_MrVEansOAMQFCA"}]');var b,v,y,w,A,x;function B(e,t,n){return void 0===t&&(t=0),void 0===n&&(n=null),t<0?Promise.reject(n):e().catch((function(n){return B(e,t-1,n)}))}var k={DOP:"Dawn of Perim",ZOTH:"Zenith of the Hive",SS:"Silent Sands",MI:"Beyond the Doors",ROTO:"Rise of the Oligarch",TOTT:"Turn of the Tide",FUN:"Forged Unity",AU:"Alliance Unraveled",FAS:"Fire and Stone",OP1:"Organized Play 1",PE1:"Premium Edition 1",SAS:"Storm and Sea",EE:"Elemental Emperors",BR:"Beyond Rare",LR:"League Rewards",PROMO:"Promotional",PROTO:"Prototype"};const N=(x=A=function(){function e(){var e=this;(0,l.Z)(this,"portal",v,this),(0,l.Z)(this,"cards",y,this),(0,l.Z)(this,"urls",w,this),this.hasFullart=function(e){return Boolean(void 0!==e.gsx$if&&""!==e.gsx$if)||Boolean(void 0!==e.gsx$splash&&""!==e.gsx$splash)||Boolean(void 0!==e.gsx$alt&&""!==e.gsx$alt)},this.cardFullart=function(t){return t.gsx$if&&""!==t.gsx$if?t.gsx$if:t.gsx$splash&&""!==t.gsx$splash?e.base_image+t.gsx$splash:t.gsx$alt?t.gsx$alt:e.card_back};try{var t={};E.forEach((function(e){var n=e.type,r=e.subtype,a=e.url;t[n]||(t[n]={}),t[n][r]=a})),this.urls=t,this.portal=new f(this,"portal"),this.cards=new f(this,"cards")}catch(e){this.portal=null,this.cards=null,this.urls=null,console.error("setting up database failed",e)}}e.getInstance=function(){return e.instance||(e.instance=new e),e.instance};var t=e.prototype;return t.path=function(e){return"https://sheets.googleapis.com/v4/spreadsheets/"+e+"/values/Sheet1?key="+this.key},t.getSpreadsheetTime=function(){var e=(0,i.Z)(u().mark((function e(t){var n,r,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="https://content.googleapis.com/drive/v3/files/"+t+"?fields=modifiedTime&key="+this.key,e.next=3,fetch(n);case 3:if(200!==(r=e.sent).status){e.next=10;break}return e.next=7,r.json();case 7:if(!("modifiedTime"in(a=e.sent))){e.next=10;break}return e.abrupt("return",Promise.resolve(a.modifiedTime));case 10:return e.abrupt("return",Promise.reject());case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.getSpreadsheetData=function(){var e=(0,i.Z)(u().mark((function e(t,n){var r,a;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===n&&(n=!1),r=this.path(t),a=function(){var e=(0,i.Z)(u().mark((function e(){var t,n;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(r);case 2:if(404!==(t=e.sent).status){e.next=5;break}throw new Error("Can't Open File");case 5:return e.prev=5,e.next=8,t.json();case 8:return n=e.sent,e.abrupt("return",n.values);case 12:throw e.prev=12,e.t0=e.catch(5),new Error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[5,12]])})));return function(){return e.apply(this,arguments)}}(),e.abrupt("return",B(a,n?3:0));case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}(),t.parseSpreadsheetData=function(){var e=(0,i.Z)(u().mark((function e(t,n,r){return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return void 0===r&&(r=!1),e.abrupt("return",this.getSpreadsheetData(t,r).then((function(e){if(e.length<2)return[];var t=e.shift().map((function(e){return e.toLowerCase().replace(" ","")}));return e.map((function(e){for(var r={gsx$type:n},a=0;a<t.length;a++)r["gsx$"+t[a]]=e[a];return r}))})));case 2:case"end":return e.stop()}}),e,this)})));return function(t,n,r){return e.apply(this,arguments)}}(),t.LoadDB=function(){var e=(0,i.Z)(u().mark((function e(t){var n=this;return u().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(this.urls&&this.portal&&this.cards)){e.next=4;break}return e.abrupt("return",Promise.all(t.map((function(e){return new Promise((function(t,r){return"cards"in e?n.cards.setupType(e.cards,t,r):"portal"in e?n.portal.setupType(e.portal,t,r):(console.error("key must be cards or portal"),r())}))}))));case 4:return e.abrupt("return",Promise.reject());case 5:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}(),t.cardImage=function(e){return e.gsx$ic&&""!==e.gsx$ic?e.gsx$ic:e.gsx$image&&""!==e.gsx$image?this.base_image+e.gsx$image:this.card_back},t.purgeDB=function(){this.cards&&this.cards.purgeDB(),this.portal&&this.portal.purgeDB(),setTimeout((function(){window.location.reload()}),300)},(0,c.Z)(e,[{key:"base_image",get:function(){return"https://drive.google.com/uc?id="}},{key:"thumb_missing",get:function(){return"1JYjPzkv74IhzlHTyVh2niTDyui73HSfp"}},{key:"card_back",get:function(){return"https://i.imgur.com/xbeDBRJ.png"}},{key:"key",get:function(){return["AIz","aSy","Bfq","09-","tBi","78b","nH6","6f1","Lkn","zGD","XM9","Zu9","JG0"].join("")}},{key:"tribes",get:function(){return["Danian","Generic","Mipedian","M'arrillian","OverWorld","UnderWorld"]}},{key:"sets",get:function(){return k}}]),e}(),A.instance=void 0,b=x,v=(0,o.Z)(b.prototype,"portal",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),y=(0,o.Z)(b.prototype,"cards",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),w=(0,o.Z)(b.prototype,"urls",[m.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),b).getInstance()},2196:(e,t,n)=>{"use strict";n.d(t,{Z:()=>r});const r=n(7426).Z},5654:(e,t,n)=>{"use strict";var r=n(7294),a=n(3935),i=n(9711),l=n(6974),c=n(1684);const o=function(){var e=(0,r.useState)(window.innerWidth),t=e[0],n=e[1],a=function(){n(window.innerWidth)};return(0,r.useEffect)((function(){return window.addEventListener("resize",a),function(){window.removeEventListener("resize",a)}}),[]),t<975};var s=n(9637);function u(){return r.createElement("div",null,r.createElement("span",null,"This page is not yet available"))}var m=n(7462),p=n(1721),d=function(){return r.createElement("a",{href:"https://github.com/chaoticbackup",className:"name",rel:"noreferrer noopener",target:"_blank"},"Chaotic Backup Project")},g=function(e){var t=e.block,n=e.text,a=e.sets;return r.createElement("div",{className:"lore"},r.createElement("div",{className:"block"},t),n.map((function(e,t){return r.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})})),a.map((function(e,t){if(e.text&&e.text.length>0)return r.createElement("div",{className:"set",key:t},r.createElement("div",{className:"title"},e.title),e.text.map((function(e,t){return r.createElement("div",{key:t},e)})))})))},h=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),a=0;a<n;a++)r[a]=arguments[a];return(t=e.call.apply(e,[this].concat(r))||this).state={lore:[]},t}(0,p.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;fetch("/public/json/starter_lore.json").then((function(e){return e.json()})).then((function(t){e.setState({lore:t})})).catch((function(){e.setState({lore:[{block:"Unable to load lore...",text:[]}]})}))},n.render=function(){return r.createElement("div",null,r.createElement("br",null),r.createElement("div",{className:"with-love"},r.createElement("div",null,"Welcome to the ",r.createElement(d,null),"."),r.createElement("span",null,"Built by fans for fans."),r.createElement("br",null),r.createElement("br",null),r.createElement("div",null,"Made with ",r.createElement("span",{className:"heart"},"♥")," by",r.createElement("br",null),"Danude Sandstorm (Project Lead)",r.createElement("br",null),"Chiodosin1 and IvanArial98 (Data Contributions)",r.createElement("br",null),"Blitser, Afjak, and Chiodosin1 (Art and Knowledge)"),r.createElement("div",null,"Do you like the site? You can donate to support it!"),r.createElement("div",{className:"donate"},r.createElement(s.U9,null)),r.createElement("div",{className:"lore"},"We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.  With an extensive lists of search options in the ",r.createElement(i.rU,{to:"/collection"},"collection"),", you'll find deck building mores streamlined than ever before.  Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the ",r.createElement(i.rU,{to:"/portal"},"Portal to Perim")," disapeared along with the official site. You can again explore the official lore and information!"),r.createElement("br",null),this.state.lore.length>0?this.state.lore.map((function(e,t){return r.createElement(g,(0,m.Z)({key:t},e))})):"Loading lore entries..."))},t}(r.Component),f=n(2196);function E(){var e="ENG";return r.createElement(r.Fragment,null,r.createElement("div",{className:"fix-pgBkgrnd-repeat-x"},r.createElement("div",{className:"fix-img-bkgrnd fix-img-bkgrnd_05"})),r.createElement("div",{className:"pgBkgrnd-repeat-x"},r.createElement("div",{className:"img-bkgrnd"},r.createElement("div",{className:"content-wrap"},r.createElement("div",{className:"legacy legacy-header"},r.createElement("div",{className:"header"},r.createElement("div",{id:"nav"},r.createElement("div",{className:"zero-clear-line headerSpriteNav-wrap"},r.createElement("ul",{id:"unity-sprite",className:e},r.createElement("li",{id:"unity-nav1",className:e}),r.createElement("li",{id:"unity-nav2",className:e},r.createElement(i.rU,{to:"/collection/"},r.createElement("span",null,"Collect"))),r.createElement("li",{id:"unity-nav3",className:e},r.createElement("a",{href:"https://chaoticbackup.forumotion.com/f11-deck-building"},r.createElement("span",null,"Build"))),r.createElement("li",{id:"unity-nav4",className:e},r.createElement("a",{href:"https://chaoticbackup.forumotion.com/f16-trading-buying-and-selling"},r.createElement("span",null,"Trade"))),r.createElement("li",{id:"unity-nav5",className:e},r.createElement(i.rU,{to:"/"},r.createElement("span",null,"Home"))),r.createElement("li",{id:"unity-nav6",className:e},r.createElement("a",{href:"https://chaoticbackup.forumotion.com"},r.createElement("span",null,"Forums"))),r.createElement("li",{id:"unity-nav7",className:e},r.createElement(i.rU,{to:"/portal/"},r.createElement("span",null,"Portal"))),r.createElement("li",{id:"unity-nav8",className:e},r.createElement("a",{href:"https://chaoticrecode.com"},r.createElement("span",null,"Play"))),r.createElement("li",{id:"unity-nav9",className:e})),r.createElement("ul",{id:"unityETC-sprite",className:e},r.createElement("li",{id:"unity-nav10",className:e},r.createElement(i.rU,{to:"/EnterTheCode"},r.createElement("span",null,"Enter the Code")))))))),r.createElement("div",{className:"banner-ad-top"}),r.createElement("div",{className:"legacy content"},r.createElement("div",{className:"left-column"},r.createElement("div",{className:"full-width clear-line",style:{marginBottom:"5px"}})),r.createElement("div",{className:"full-column"},r.createElement("div",{className:"pods-wrap pad5px-btm"},r.createElement("div",{className:"clear-line full-width"},r.createElement("div",{className:"adPod-top-wrap"},r.createElement("div",{className:"videoAdPod-topleft"},r.createElement("div",{className:"videoAdPod-topLeft-repeat-x"})),r.createElement("div",{className:"videoAdPod-topright"},r.createElement("div",{className:"videoAdPod-topRight-repeat-x"})))),r.createElement("div",{className:"content-area-repeat-xy"},r.createElement("div",{className:"content-area-top-repeat-x"},r.createElement("div",{className:"content-area-left-repeat-y"},r.createElement("div",{className:"content-area-right-repeat-y"},r.createElement("div",{className:"content-area-inner-space"},r.createElement("div",{id:"player"},r.createElement(l.j3,null))))))),r.createElement("div",{className:"content-btm-wrap"},r.createElement("div",{className:"content-area-btm-left"},r.createElement("div",{className:"content-left-btm-repeat-x"})),r.createElement("div",{className:"content-area-btm-right"},r.createElement("div",{className:"content-right-btm-repeat-x"}))))),r.createElement("div",{className:"right-column"},r.createElement("div",{className:"full-width clear-line",style:{marginBottom:"5px"}}))),r.createElement("div",{className:"banner-ad-bottom"}),r.createElement("div",{className:"legacy legacy-footer"},r.createElement("div",{className:"footer-wrap"},r.createElement("div",{className:"footer-repeat-x"},r.createElement("div",{className:"footer-left"},r.createElement("div",{className:"footer-right"},r.createElement("div",{className:"footer-text"},r.createElement("div",{className:"footer-search"},r.createElement("br",null),r.createElement("br",null),r.createElement(s.U9,null)),r.createElement("div",{className:"footer-nav"},r.createElement("div",{className:"copyright"},"©2008 Chaotic USA Entertainment Group, Inc.",r.createElement("br",null),"U.S. Pat 5810666 and 5954332 and other pending patent applications. All Rights Reserved.")),r.createElement("div",{className:"footer-language"},r.createElement("a",{href:"#",onClick:function(e){e.stopPropagation(),e.preventDefault(),f.Z.purgeDB()},className:"page-options",title:"Change Language"},r.createElement("img",{src:"/public/img/flag_usa_.gif",alt:"English (Change Language)",width:"40",height:"27"}),r.createElement("br",null),"English (Change Language)"))))))))))))}var b=(0,r.lazy)((function(){return Promise.all([n.e(736),n.e(631)]).then(n.bind(n,631))})),v=(0,r.lazy)((function(){return Promise.all([n.e(736),n.e(159)]).then(n.bind(n,159))})),y=(0,r.lazy)((function(){return Promise.all([n.e(736),n.e(592),n.e(465)]).then(n.bind(n,4465))})),w=(0,r.lazy)((function(){return Promise.all([n.e(736),n.e(592),n.e(669)]).then(n.bind(n,1669))})),A=function(){var e=(0,l.TH)().pathname;return r.createElement(l.Fg,{to:e.replace("/beta",""),replace:!0})};function x(){var e=o();return(0,r.useEffect)((function(){document.styleSheets[0].disabled=!!e}),[e]),r.createElement(l.Z5,null,r.createElement(l.AW,{path:"/beta/collection",element:r.createElement(r.Suspense,{fallback:r.createElement(s.gb,null)},r.createElement(y,null))}),r.createElement(l.AW,{path:"/beta/*",element:r.createElement(A,null)}),e&&r.createElement(l.AW,{path:"/collection",element:r.createElement(r.Suspense,{fallback:r.createElement(s.gb,null)},r.createElement(w,null))}),r.createElement(l.AW,{path:"/",element:r.createElement(E,null)},r.createElement(l.AW,{index:!0,element:r.createElement(h,null)}),r.createElement(l.AW,{path:"PageNotFound",element:r.createElement(s.uW,null)}),r.createElement(l.AW,{path:"UnderConstruction",element:r.createElement(s.Ky,null)}),r.createElement(l.AW,{path:"EnterTheCode/*",element:r.createElement(r.Suspense,{fallback:r.createElement(s.gb,null)},r.createElement(b,null))}),r.createElement(l.AW,{path:"create/*",element:r.createElement(u,null)}),r.createElement(l.AW,{path:"collection/*",element:r.createElement(r.Suspense,{fallback:r.createElement(s.gb,null)},r.createElement(c.Z,{component:y}))}),r.createElement(l.AW,{path:"portal/*",element:r.createElement(r.Suspense,{fallback:r.createElement(s.gb,null)},r.createElement(v,null))})))}var B=document.getElementById("root");a.render(r.createElement(i.VK,null,r.createElement(x,null)),B)},7768:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var r=n(5403),a=Object.create(r.Z);a.root={backgroundColor:"#F0F0F0",fontFamily:"helvetica neue, helvetica, sans-serif",fontWeight:"300",fontSize:"16px",letterSpacing:"0.025em",padding:"3vh 0 12vh 0",width:"500px",maxWidth:"calc(100vw - 40px)",position:"relative",left:"50vw",WebkitTransform:"translate(-50%, 0)",MozTransform:"translate(-50%, 0)",msTransform:"translate(-50%, 0)",OTransform:"translate(-50%, 0)",transform:"translate(-50%, 0)",WebkitTextSizeAdjust:"none",MozTextSizeAdjust:"none",msTextSizeAdjust:"none",textSizeAdjust:"none"},a.title={fontSize:"20px",marginBottom:"0.5vh"};const i=a},5403:(e,t,n)=>{"use strict";n.d(t,{Z:()=>c});var r=n(7462),a=n(7294),i={normal:{borderBottom:"1px dotted rgb(66, 140, 195)"},hover:{borderBottom:"1px solid rgb(66, 140, 195)",color:"rgb(66, 140, 195)"},active:"hover",touchActive:{borderBottom:"1px dashed rgb(66, 140, 195)",color:"rgb(66, 140, 195)"},focusFromTab:{outline:"2px solid rgb(0, 152, 0)",outlineOffset:"2px",color:"black"},touchActiveTapOnly:!0},l={};Object.keys(i).forEach((function(e){"touchActiveTapOnly"!==e&&(l["onParent"+e.slice(0,1).toUpperCase()+e.slice(1)]=i[e])}));const c={link:i,childLink:l,p:{margin:"3vh 0",lineHeight:"1.4"},code:function(e){return a.createElement("code",{style:{fontFamily:"monospace",fontSize:"15px",paddingLeft:"2px"}},e)},li:function(e,t){return a.createElement("li",(0,r.Z)({style:{paddingLeft:"18px",textIndent:"-15px",margin:"0.5vh 0",listStyle:"none"}},t),a.createElement("span",{style:{paddingRight:"7px"}},"–"),e)}}},693:()=>{}},o={};function s(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={exports:{}};return c[e].call(n.exports,n,n.exports,s),n.exports}s.m=c,e=[],s.O=(t,n,r,a)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,r,a]=e[u],l=!0,c=0;c<n.length;c++)(!1&a||i>=a)&&Object.keys(s.O).every((e=>s.O[e](n[c])))?n.splice(c--,1):(l=!1,a<i&&(i=a));if(l){e.splice(u--,1);var o=r();void 0!==o&&(t=o)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,r,a]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},n=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,s.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var a=Object.create(null);s.r(a);var i={};t=t||[null,n({}),n([]),n(n)];for(var l=2&r&&e;"object"==typeof l&&!~t.indexOf(l);l=n(l))Object.getOwnPropertyNames(l).forEach((t=>i[t]=()=>e[t]));return i.default=()=>e,s.d(a,i),a},s.d=(e,t)=>{for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.f={},s.e=e=>Promise.all(Object.keys(s.f).reduce(((t,n)=>(s.f[n](e,t),t)),[])),s.u=e=>(592===e?"common":e)+".js",s.miniCssF=e=>e+".css",s.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r={},a="chaoticbackup:",s.l=(e,t,n,i)=>{if(r[e])r[e].push(t);else{var l,c;if(void 0!==n)for(var o=document.getElementsByTagName("script"),u=0;u<o.length;u++){var m=o[u];if(m.getAttribute("src")==e||m.getAttribute("data-webpack")==a+n){l=m;break}}l||(c=!0,(l=document.createElement("script")).charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.setAttribute("data-webpack",a+n),l.src=e),r[e]=[t];var p=(t,n)=>{l.onerror=l.onload=null,clearTimeout(d);var a=r[e];if(delete r[e],l.parentNode&&l.parentNode.removeChild(l),a&&a.forEach((e=>e(n))),t)return t(n)},d=setTimeout(p.bind(null,void 0,{type:"timeout",target:l}),12e4);l.onerror=p.bind(null,l.onerror),l.onload=p.bind(null,l.onload),c&&document.head.appendChild(l)}},s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="/build/",i=e=>new Promise(((t,n)=>{var r=s.miniCssF(e),a=s.p+r;if(((e,t)=>{for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var a=(l=n[r]).getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(a===e||a===t))return l}var i=document.getElementsByTagName("style");for(r=0;r<i.length;r++){var l;if((a=(l=i[r]).getAttribute("data-href"))===e||a===t)return l}})(r,a))return t();((e,t,n,r)=>{var a=document.createElement("link");a.rel="stylesheet",a.type="text/css",a.onerror=a.onload=i=>{if(a.onerror=a.onload=null,"load"===i.type)n();else{var l=i&&("load"===i.type?"missing":i.type),c=i&&i.target&&i.target.href||t,o=new Error("Loading CSS chunk "+e+" failed.\n("+c+")");o.code="CSS_CHUNK_LOAD_FAILED",o.type=l,o.request=c,a.parentNode.removeChild(a),r(o)}},a.href=t,document.head.appendChild(a)})(e,a,t,n)})),l={179:0},s.f.miniCss=(e,t)=>{l[e]?t.push(l[e]):0!==l[e]&&{159:1,465:1,631:1,669:1}[e]&&t.push(l[e]=i(e).then((()=>{l[e]=0}),(t=>{throw delete l[e],t})))},(()=>{var e={179:0};s.f.j=(t,n)=>{var r=s.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else{var a=new Promise(((n,a)=>r=e[t]=[n,a]));n.push(r[2]=a);var i=s.p+s.u(t),l=new Error;s.l(i,(n=>{if(s.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var a=n&&("load"===n.type?"missing":n.type),i=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",l.name="ChunkLoadError",l.type=a,l.request=i,r[1](l)}}),"chunk-"+t,t)}},s.O.j=t=>0===e[t];var t=(t,n)=>{var r,a,[i,l,c]=n,o=0;if(i.some((t=>0!==e[t]))){for(r in l)s.o(l,r)&&(s.m[r]=l[r]);if(c)var u=c(s)}for(t&&t(n);o<i.length;o++)a=i[o],s.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return s.O(u)},n=self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})(),s.O(void 0,[736],(()=>s(6981)));var u=s.O(void 0,[736],(()=>s(5654)));u=s.O(u)})();