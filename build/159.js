(self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[]).push([[159],{159:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>Ze});var r=n(2122),a=n(6610),l=n(5991),c=n(379),i=n(6089),o=n(7608),s=n(7294),u=n(2188),m=n(798),p=n(5977),g=n(1637),f=n(3727),d=n(2195);function h(){function e(e){e.preventDefault(),e.stopPropagation()}var t=g.Z.tribes.map((function(t,n){return s.createElement("li",{key:n,className:"dropdown"},s.createElement(f.rU,{to:" ",className:"dropbtn",onClick:e},t),s.createElement("div",{className:"dropdown-content"},s.createElement(f.rU,{to:"/portal/"+t},"All"),s.createElement(f.rU,{to:"/portal/Creatures/"+t}," Creatures"),s.createElement(f.rU,{to:"/portal/Mugic/"+t}," Mugic")))}));return s.createElement("div",{className:"navbar"},s.createElement("ul",null,s.createElement("li",null,s.createElement(f.rU,{to:"/portal/"},"Home")),s.createElement("li",null,s.createElement(f.rU,{to:"/portal/Search"},s.createElement(d.QZ,null),"Search")),s.createElement("li",{className:"dropdown"},s.createElement(f.rU,{to:" ",onClick:e,className:"dropbtn"},"Types"),s.createElement("div",{className:"dropdown-content"},s.createElement(f.rU,{to:"/portal/Attacks"},"Attacks"),s.createElement(f.rU,{to:"/portal/Battlegear"},"Battlegear"),s.createElement(f.rU,{to:"/portal/Creatures"},"Creatures"),s.createElement(f.rU,{to:"/portal/Locations"},"Locations"),s.createElement(f.rU,{to:"/portal/Mugic"},"Mugic"))),t))}var E,x,v=n(5770),$=n(3349),y=n(3473);function Z(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var b,w,R,k,C,B,N,U=(E=function(e){(0,c.Z)(n,e);var t=Z(n);function n(){var e;(0,a.Z)(this,n);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return e=t.call.apply(t,[this].concat(l)),(0,v.Z)(e,"coin",x,(0,$.Z)(e)),e}return(0,l.Z)(n,[{key:"updateCanvas",value:function(e){var t=this;if(e){e.style.width="100%",e.style.height="100%",e.width=e.offsetWidth,e.height=e.offsetHeight;var n=e.getContext("2d"),r=new Image;r.src="/public/img/portal.png";var a=new Image;a.src=g.Z.base_image+"1iu0GFaJQ0UsSN8yYWi77VY1cXsQpM4o7",a.onload=function(){n.drawImage(a,0,0),function(){var t=new Image;t.src=g.Z.base_image+"0B6oyUfwoM3u1LWtvNUZ2NVdjTGc",t.onload=function(){n.drawImage(t,50,350)};var a=new Image;a.src=g.Z.base_image+"0B6oyUfwoM3u1bFVIclZscHlHTVE",a.onload=function(){n.drawImage(a,e.width-300,350)};var l=new Image;l.src=g.Z.base_image+"0B6oyUfwoM3u1YzNhLUdSMHlmdFE",l.onload=function(){n.drawImage(l,e.width-350,r.height+10)};var c=new Image;c.src=g.Z.base_image+"0B6oyUfwoM3u1MVVqQlpqYldsVDQ",c.onload=function(){n.drawImage(c,50,r.height+10)}}(),n.drawImage(r,e.width/2-r.width/2,0)};var l=new Image;this.coin=function(t){var n={},r=0,l=0,c=0,i=t.ticksPerFrame||0,o=t.frames||1,s=t.w_frames||1,u=t.h_frames||1;n.context=t.context,n.width=t.width,n.height=t.height,n.image=t.image;var m=0;return n.update=function(){(c+=1)>i&&(c=0,m++,r+1<s?r+=1:(r=0,l+=1),m+1>o&&(r=0,l=0,m=0))},n.render=function(){var t=n.width/s,c=n.height/u,i=e.width/2-t/2,o=e.height/2-c/2;n.context.clearRect(i,o,t,c),n.context.drawImage(a,i,o,t,c,i,o,t,c),n.context.drawImage(n.image,t*r,c*l,t,c,i,o,t,c)},n}({context:e.getContext("2d"),width:448,height:448,image:l,w_frames:7,h_frames:7,frames:47,ticksPerFrame:4}),l.addEventListener("load",(function e(){t.coin&&(window.requestAnimationFrame(e),t.coin.update(),t.coin.render())})),l.src=g.Z.base_image+"0B6oyUfwoM3u1cC1vaGVkU1J1ZzQ"}}},{key:"render",value:function(){return s.createElement(s.Fragment,null,s.createElement("canvas",{ref:this.updateCanvas.bind(this),height:"600px"}))}}]),n}(s.Component),x=(0,y.Z)(E.prototype,"coin",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return null}}),E),I=n(3050),F=n.n(I),_=n(5351),L=n.n(_),O=n(7768);function W(e,t){return e.gsx$name.toLowerCase().replace(/\(unused\)[ ]/,"")>t.gsx$name.toLowerCase().replace(/\(unused\)[ ]/,"")?1:-1}function A(e,t){var n;return["Attacks","Battlegear","Creatures","Locations","Mugic"].includes(e.gsx$type)&&(n="/portal/".concat(e.gsx$type,"/").concat(e.gsx$name)),n?s.createElement("div",{key:t},s.createElement(L(),(0,r.Z)({as:f.rU},O.Z.link,{to:n}),e.gsx$name),s.createElement("br",null)):s.createElement("div",{key:t,style:{display:"none"}})}function P(e,t,n){var a=null;return["Attacks","Battlegear","Creatures","Locations","Mugic"].includes(e.gsx$type)&&(n||(n="/portal/".concat(e.gsx$type,"/").concat(e.gsx$name)),a=g.Z.cards[e.gsx$type.toLowerCase()].findOne({gsx$name:e.gsx$name})),a&&n?s.createElement("div",{key:t,className:"nav_item"},s.createElement(L(),(0,r.Z)({as:f.rU,to:n},O.Z.link),s.createElement("span",null,a.gsx$name.split(",")[0].replace(/\(Unused\)[ ]/,"")),s.createElement("br",null),s.createElement("img",{className:"thumb",src:g.Z.base_image+(a.gsx$thumb?a.gsx$thumb:g.Z.thumb_missing)}))):(console.warn("missing: ".concat(e.gsx$name)),s.createElement("div",{key:t,style:{display:"none"},className:"nav_item"}))}function M(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var D,S,q,V=(0,m.f3)((function(e,t,n){return t}))(k=(0,m.Pi)((C=function(e){(0,c.Z)(n,e);var t=M(n);function n(e){var r;return(0,a.Z)(this,n),r=t.call(this,e),(0,v.Z)(r,"input",B,(0,$.Z)(r)),(0,v.Z)(r,"query",N,(0,$.Z)(r)),r.search=function(e){e.preventDefault(),e.stopPropagation(),r.props.history.push("/portal/Search/?"+encodeURIComponent(r.query)),r.input=r.query},r.query=r.input=decodeURIComponent(r.props.location.search.substr(1)),r}return(0,l.Z)(n,[{key:"render",value:function(){var e=this;return s.createElement("div",{className:"search"},s.createElement("form",{onSubmit:this.search},s.createElement("input",{type:"text",value:this.query,autoFocus:!0,onChange:function(t){return e.query=t.target.value}}),s.createElement("button",{type:"submit"},s.createElement(d.QZ,null))),s.createElement(z,{string:this.input}))}}]),n}(s.Component),B=(0,y.Z)(C.prototype,"input",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),N=(0,y.Z)(C.prototype,"query",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),k=C))||k)||k,z=(0,m.f3)((function(e,t,n){return t}))(b=(0,m.Pi)((w=function(e){(0,c.Z)(n,e);var t=M(n);function n(){var e;return(0,a.Z)(this,n),e=t.call(this),(0,v.Z)(e,"loaded",R,(0,$.Z)(e)),e.filter=new(F())("filter.db"),e}return(0,l.Z)(n,[{key:"render",value:function(){var e=this;if(0==this.loaded)return g.Z.LoadDB([{portal:"attacks"},{portal:"battlegear"},{portal:"creatures"},{portal:"locations"},{portal:"mugic"},{cards:"attacks"},{cards:"battlegear"},{cards:"creatures"},{cards:"locations"},{cards:"mugic"}]).then((function(){e.loaded=!0})).catch((function(){})),s.createElement("span",null,"Loading...");var t=this.props.string;if(""==t)return s.createElement("div",{style:{minHeight:"50px"}});var n=this.filter.addCollection("filter"),r=n.addDynamicView("filter");r.applySimpleSort("gsx$name");var a,l=g.Z.portal.attacks.chain(),c=g.Z.portal.battlegear.chain(),i=g.Z.portal.creatures.chain(),o=g.Z.portal.locations.chain(),u=g.Z.portal.mugic.chain();l=l.find({$or:[{gsx$attributes:{$regex:new RegExp(t,"i")}},{gsx$background:{$regex:new RegExp(t,"i")}},{gsx$details:{$regex:new RegExp(t,"i")}}]}),c=c.find({$or:[{gsx$attributes:{$regex:new RegExp(t,"i")}},{gsx$background:{$regex:new RegExp(t,"i")}},{gsx$details:{$regex:new RegExp(t,"i")}}]}),i=i.find({$or:[{gsx$appearance:{$regex:new RegExp(t,"i")}},{gsx$background:{$regex:new RegExp(t,"i")}},{gsx$specialabilities:{$regex:new RegExp(t,"i")}},{gsx$details:{$regex:new RegExp(t,"i")}}]}),o=o.find({$or:[{gsx$localfeatures:{$regex:new RegExp(t,"i")}},{gsx$background:{$regex:new RegExp(t,"i")}},{gsx$details:{$regex:new RegExp(t,"i")}}]}),u=u.find({$or:[{gsx$background:{$regex:new RegExp(t,"i")}},{gsx$details:{$regex:new RegExp(t,"i")}}]}),(a=l.data()).forEach((function(e){delete e.$loki})),n.insert(a),(a=c.data()).forEach((function(e){delete e.$loki})),n.insert(a),(a=i.data()).forEach((function(e){delete e.$loki})),n.insert(a),(a=o.data()).forEach((function(e){delete e.$loki})),n.insert(a),(a=u.data()).forEach((function(e){delete e.$loki})),n.insert(a);var m,p=r.data().map((function(e,t){return A(e,t)}));this.filter.removeCollection("filter");var f=[].concat(g.Z.portal.attacks.find({gsx$name:{$regex:new RegExp(t,"i")}}),g.Z.portal.battlegear.find({gsx$name:{$regex:new RegExp(t,"i")}}),g.Z.portal.creatures.find({gsx$name:{$regex:new RegExp(t,"i")}}),g.Z.portal.locations.find({gsx$name:{$regex:new RegExp(t,"i")}}),g.Z.portal.mugic.find({gsx$name:{$regex:new RegExp(t,"i")}}),g.Z.cards.attacks.chain().find({gsx$name:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.battlegear.chain().find({gsx$name:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.creatures.chain().find({gsx$name:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.locations.chain().find({gsx$name:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.mugic.chain().find({gsx$name:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data()).sort(W).filter((function(e,t,n){return 0==t||e.gsx$name!=n[t-1].gsx$name})).map((function(e,t){return P(e,t)}));if(0==p.length){var d=[].concat(g.Z.cards.attacks.chain().find({gsx$artist:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.battlegear.chain().find({gsx$artist:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.creatures.chain().find({gsx$artist:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.locations.chain().find({gsx$artist:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data(),g.Z.cards.mugic.chain().find({gsx$artist:{$regex:new RegExp(t,"i")}}).where((function(e){return""!=e.gsx$splash})).data()).sort((function(e,t){return e.gsx$name>t.gsx$name?1:-1})).map((function(e,t){return A(e,t)}));d.length>0?(m="Art contributed by ".concat(t,":"),p=d):m="No Results Found"}else m="Results containing ".concat(t,":");return s.createElement("div",{className:"results"},s.createElement("hr",null),f.length>0&&s.createElement(s.Fragment,null,s.createElement("div",{className:"entry_nav"},f),s.createElement("hr",null)),s.createElement("div",null,m),p)}}]),n}(s.Component),R=(0,y.Z)(w.prototype,"loaded",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),b=w))||b)||b;function T(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var H,Q,Y,G=(0,m.f3)((function(e,t,n){return t}))(D=(0,m.Pi)((S=function(e){(0,c.Z)(n,e);var t=T(n);function n(){var e;(0,a.Z)(this,n);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return e=t.call.apply(t,[this].concat(l)),(0,v.Z)(e,"loaded",q,(0,$.Z)(e)),e}return(0,l.Z)(n,[{key:"scrollLeft",value:function(e){document.getElementsByClassName("bottom_nav")[0].scrollLeft=e}},{key:"render",value:function(){var e=this,t=this.props.type.toLowerCase();if(0==this.loaded)return g.Z.LoadDB([{cards:t},{portal:t}]).then((function(){e.loaded=!0})).catch((function(){})),s.createElement(d.gb,null);var n=!0,r="",a=s.createElement("div",null),l=[],c=this.props.location.pathname.split("/");if(""==c[c.length-1]&&c.pop(),"creatures"==t||"mugic"==t){var i=c.length>=4&&g.Z.tribes.includes(c[3])?c[3]:null;i?c.length>4&&(n=!1,a=s.createElement(p.AW,{path:"".concat(this.props.match.url,"/").concat(i,"/:card"),component:this.props.component})):c.length>3&&(n=!1,a=s.createElement(p.AW,{path:"".concat(this.props.match.url,"/:card"),component:this.props.component})),r=i?"".concat(i," ").concat(this.props.type):this.props.type,l=(i?g.Z.portal[t].chain().find({gsx$tribe:i}).data():g.Z.portal[t].chain().data()).sort(W).map((function(t,n){return P(t,n,i?"/portal/".concat(e.props.type,"/").concat(t.gsx$tribe,"/").concat(encodeURIComponent(t.gsx$name)):"/portal/".concat(e.props.type,"/").concat(encodeURIComponent(t.gsx$name)))}))}else c.length>3&&(n=!1,a=s.createElement(p.AW,{path:"".concat(this.props.match.url,"/:card"),component:this.props.component})),r=this.props.type,l=g.Z.portal[t].data.sort(W).map((function(e,t){return P(e,t)}));return n?s.createElement("div",{className:"entry ".concat(t," base_path")},s.createElement("div",{className:"cat_title"},r),s.createElement("div",{className:"entry_nav"},l)):s.createElement("div",{className:"entry ".concat(t)},s.createElement("div",{className:"entry_content"},a),s.createElement("div",{className:"cat_title"},s.createElement(f.rU,{to:"/portal/".concat(this.props.type)},r)),s.createElement("div",{className:"entry_nav"},l))}}]),n}(s.Component),q=(0,y.Z)(S.prototype,"loaded",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),D=S))||D)||D;function J(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}function X(e){var t=e.name.split(",");return s.createElement(s.Fragment,null,s.createElement("span",null,t[0]),t.length>1&&s.createElement("span",{className:"bigger"},s.createElement("br",null),t[1].trim()))}function j(e){var t=[];return e.artist.split(/(?=, )/).forEach((function(e,n){t.push(s.createElement(f.rU,{key:n,to:"/portal/Search/?".concat(e.replace(", ",""))},e))})),s.createElement("div",{className:"artist"},t)}var K,ee=(0,m.f3)((function(e,t,n){return t}))(H=(0,m.Pi)((Q=function(e){(0,c.Z)(n,e);var t=J(n);function n(){var e;(0,a.Z)(this,n);for(var r=arguments.length,l=new Array(r),c=0;c<r;c++)l[c]=arguments[c];return e=t.call.apply(t,[this].concat(l)),(0,v.Z)(e,"fullscreen",Y,(0,$.Z)(e)),e.expand=function(t){e.fullscreen=!0},e.close=function(t){e.fullscreen=!1},e}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.card;return s.createElement(s.Fragment,null,s.createElement("div",{className:"modal"+(this.fullscreen?"":" hidden")},s.createElement("span",{className:"close",onClick:this.close},"×"),s.createElement("img",{className:"modal-content",src:g.Z.base_image+e.gsx$splash})),e.gsx$splash&&s.createElement("div",{className:"entry_splash"},e.gsx$splash&&s.createElement("img",{onClick:this.expand,src:g.Z.base_image+e.gsx$splash})),s.createElement("div",{className:"entry_body"},s.createElement("div",{className:"title"},s.createElement(X,{name:e.gsx$name}),s.createElement("hr",null)),s.createElement("div",{className:"column"},e.gsx$artist&&s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Artist(s):"),s.createElement(j,{artist:e.gsx$artist})),s.createElement("hr",null)),e.gsx$set&&s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Set: "),"".concat(g.Z.sets[e.gsx$set]," (").concat(e.gsx$set,")")),s.createElement("hr",null)),e.gsx$rarity&&s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Rarity: "),s.createElement(d.uq,{set:e.gsx$set,rarity:e.gsx$rarity,iconOnly:!0})," ",e.gsx$rarity),s.createElement("hr",null)),e.gsx$id&&s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Card ID: "),e.gsx$id),s.createElement("hr",null)),this.props.col0&&s.createElement(s.Fragment,null,this.props.col0),e.gsx$ability&&s.createElement(s.Fragment,null,s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Ability:"),s.createElement(d.$U,{ability:e.gsx$ability}))),e.gsx$flavortext&&s.createElement(s.Fragment,null,s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Card Flavor:"),s.createElement("br",null),e.gsx$flavortext)),this.props.col1&&s.createElement(s.Fragment,null,s.createElement("hr",null),"this.props.col1")),s.createElement("div",{className:"column"},this.props.col2)))}}]),n}(s.Component),Y=(0,y.Z)(Q.prototype,"fullscreen",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),H=Q))||H)||H;function te(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var ne,re=(0,m.f3)((function(e,t,n){return t}))(K=(0,m.Pi)(K=function(e){(0,c.Z)(n,e);var t=te(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.location.pathname.split("/");""==e[e.length-1]&&e.pop();var t=e.length>=5?decodeURIComponent(e[4]):4==e.length?decodeURIComponent(e[3]):void 0,n=g.Z.portal.creatures.findOne({gsx$name:t}),a=g.Z.cards.creatures.findOne({gsx$name:t});if(n){for(var l=n.gsx$tribe,c=[],i=0;i<parseInt(a.gsx$mugicability||0);i++)c.push(s.createElement(d.WC,{key:i,tribe:l}));var o=[];return n.gsx$attributes&&o.push(["Appearance",n.gsx$attributes]),n.gsx$background&&o.push(["Background",n.gsx$background]),n.gsx$details&&o.push(["Details",n.gsx$details]),n.gsx$battlegear&&o.push(["Favorite Battlegear(s)",n.gsx$battlegear.split(/[;]+\s*/).map((function(e,t){return s.createElement("p",{key:t},s.createElement(L(),(0,r.Z)({as:f.rU},O.Z.link,{to:"/portal/Battlegear/"+e}),s.createElement("span",null,e)))}))]),n.gsx$location&&o.push(["Favorite Location(s)",n.gsx$location.split(/[;]+\s*/).map((function(e,t){return s.createElement("p",{key:t},s.createElement(L(),(0,r.Z)({as:f.rU},O.Z.link,{to:"/portal/Locations/"+e}),s.createElement("span",null,e)))}))]),n.gsx$height&&o.push(["Height (ft)",n.gsx$height]),n.gsx$specialabilities&&o.push(["Special Abilities",n.gsx$specialabilities]),n.gsx$weight&&o.push(["Weight (lb)",n.gsx$weight]),s.createElement(ee,{card:a,col0:s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Tribe: "),s.createElement(d.Fo,{tribe:l})," ",l),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Disciplines: "),a.gsx$courage,s.createElement(d.I1,{discipline:"courage"})," ",a.gsx$power,s.createElement(d.I1,{discipline:"power"})," ",a.gsx$speed,s.createElement(d.I1,{discipline:"speed"})," ",a.gsx$wisdom,s.createElement(d.I1,{discipline:"wisdom"})),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Energy: "),a.gsx$energy),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Elements: "),s.createElement(d.W_,{element:"fire",value:a.gsx$elements.toLowerCase().indexOf("fire")>=0})," ",s.createElement(d.W_,{element:"air",value:a.gsx$elements.toLowerCase().indexOf("air")>=0})," ",s.createElement(d.W_,{element:"earth",value:a.gsx$elements.toLowerCase().indexOf("earth")>=0})," ",s.createElement(d.W_,{element:"water",value:a.gsx$elements.toLowerCase().indexOf("water")>=0})),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Mugic Ability: "),c)),col2:o.map((function(e,t){return s.createElement(s.Fragment,{key:t},s.createElement("div",null,s.createElement("strong",null,e[0],":"),s.createElement("br",null),e[1]),t!==o.length-1&&s.createElement("hr",null))}))})}if(a&&a.gsx$splash){for(var u=a.gsx$tribe,m=[],p=0;p<parseInt(a.gsx$mugicability||0);p++)m.push(s.createElement(d.WC,{key:p,tribe:u}));return s.createElement(ee,{card:a,col0:s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Tribe: "),s.createElement(d.Fo,{tribe:u})," ",u),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Disciplines: "),a.gsx$courage,s.createElement(d.I1,{discipline:"courage"})," ",a.gsx$power,s.createElement(d.I1,{discipline:"power"})," ",a.gsx$speed,s.createElement(d.I1,{discipline:"speed"})," ",a.gsx$wisdom,s.createElement(d.I1,{discipline:"wisdom"})),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Energy: "),a.gsx$energy),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Elements: "),s.createElement(d.W_,{element:"fire",value:a.gsx$elements.toLowerCase().indexOf("fire")>=0})," ",s.createElement(d.W_,{element:"air",value:a.gsx$elements.toLowerCase().indexOf("air")>=0})," ",s.createElement(d.W_,{element:"earth",value:a.gsx$elements.toLowerCase().indexOf("earth")>=0})," ",s.createElement(d.W_,{element:"water",value:a.gsx$elements.toLowerCase().indexOf("water")>=0})),s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Mugic Ability: "),m))})}return s.createElement(d.uW,{location:this.props.location})}}]),n}(s.Component))||K)||K;function ae(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var le,ce,ie,oe=(0,m.f3)((function(e,t,n){return t}))(ne=(0,m.Pi)(ne=function(e){(0,c.Z)(n,e);var t=ae(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.location.pathname.split("/");""==e[e.length-1]&&e.pop();var t=e.length>=5?decodeURIComponent(e[4]):4==e.length?decodeURIComponent(e[3]):void 0,n=g.Z.portal.mugic.findOne({gsx$name:t}),r=g.Z.cards.mugic.findOne({gsx$name:t}),a=function(e){var t=[];if(0==r.gsx$cost)t.push(s.createElement("span",{key:0},"0"));else if("x"==r.gsx$cost.toLowerCase())t.push(s.createElement("span",{key:0},"X"));else for(var n=0;n<parseInt(r.gsx$cost);n++)t.push(s.createElement(d.WC,{tribe:e,key:n}));return t};if(n){var l=n.gsx$tribe;return s.createElement(ee,{card:r,col0:s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Tribe: "),s.createElement(d.Fo,{tribe:l})," ",l),""!==r.gsx$cost&&s.createElement(s.Fragment,null,s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Cost: "),a(l)))),col2:s.createElement(s.Fragment,null,n.gsx$background&&s.createElement("div",null,s.createElement("strong",null,"Background:"),s.createElement("br",null),n.gsx$background),n.gsx$background&&n.gsx$details&&s.createElement("hr",null),n.gsx$details&&s.createElement("div",null,s.createElement("strong",null,"Details:"),s.createElement("br",null),n.gsx$details))})}if(r&&r.gsx$splash){var c=r.gsx$tribe;return s.createElement(ee,{card:r,col0:s.createElement(s.Fragment,null,s.createElement("div",null,s.createElement("strong",null,"Tribe: "),s.createElement(d.Fo,{tribe:c})," ",c),""!==r.gsx$cost&&s.createElement(s.Fragment,null,s.createElement("hr",null),s.createElement("div",null,s.createElement("strong",null,"Cost: "),a(c))))})}return s.createElement(d.uW,{location:this.props.location})}}]),n}(s.Component))||ne)||ne;function se(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var ue,me=(0,m.f3)((function(e,t,n){return t}))(le=(0,m.Pi)((ce=function(e){(0,c.Z)(n,e);var t=se(n);function n(){var e;return(0,a.Z)(this,n),e=t.call(this),(0,v.Z)(e,"loaded",ie,(0,$.Z)(e)),e.filter=new(F())("filter.db"),e}return(0,l.Z)(n,[{key:"render",value:function(){var e=this;if(0==this.loaded)return g.Z.LoadDB([{cards:"creatures"},{portal:"creatures"},{cards:"mugic"},{portal:"mugic"}]).then((function(){e.loaded=!0})).catch((function(){})),s.createElement(d.gb,null);var t=this.props.location.pathname.split("/");""==t[t.length-1]&&t.pop();var n,r=t[2],a=this.filter.addCollection("filter"),l=a.addDynamicView("filter");(n=g.Z.portal.creatures.find({gsx$tribe:r})).forEach((function(e){delete e.$loki})),a.insert(n),(n=g.Z.portal.mugic.find({gsx$tribe:r})).forEach((function(e){delete e.$loki})),a.insert(n);var c=l.data();this.filter.removeCollection("filter");var i=c.sort(W).map((function(e,t){var n;return"Mugic"==e.gsx$type?n="/portal/"+r+"/Mugic/"+encodeURIComponent(e.gsx$name):"Creatures"==e.gsx$type&&(n="/portal/"+r+"/Creatures/"+encodeURIComponent(e.gsx$name)),P(e,t,n)}));return!(t.length>4)?s.createElement("div",{className:"entry tribe base_path"},s.createElement("div",{className:"cat_title"},r),s.createElement("div",{className:"entry_nav"},i)):s.createElement("div",{className:"entry tribe"},s.createElement("div",{className:"entry_content"},s.createElement(p.AW,{path:"".concat(this.props.match.url,"/Creatures/:card"),component:re}),s.createElement(p.AW,{path:"".concat(this.props.match.url,"/Mugic/:card"),component:oe})),s.createElement("div",{className:"cat_title"},s.createElement(f.rU,{to:"/portal/".concat(r)},r)),s.createElement("div",{className:"entry_nav"},i))}}]),n}(s.Component),ie=(0,y.Z)(ce.prototype,"loaded",[u.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),le=ce))||le)||le;function pe(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var ge,fe=(0,m.f3)((function(e,t,n){return t}))(ue=(0,m.Pi)(ue=function(e){(0,c.Z)(n,e);var t=pe(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.location.pathname.split("/");if(""==e[e.length-1]&&e.pop(),4!==e.length)return s.createElement(d.uW,{location:this.props.location});var t=decodeURIComponent(e[3]),n=g.Z.portal.attacks.findOne({gsx$name:t}),r=g.Z.cards.attacks.findOne({gsx$name:t});if(n){var a=[];return n.gsx$attributes&&a.push(["Attributes",n.gsx$attributes]),n.gsx$background&&a.push(["Background",n.gsx$background]),n.gsx$details&&a.push(["Details",n.gsx$details]),s.createElement(ee,{card:r,col2:a.map((function(e,t){return s.createElement(s.Fragment,{key:t},s.createElement("div",null,s.createElement("strong",null,e[0],":"),s.createElement("br",null),e[1]),t!==a.length-1&&s.createElement("hr",null))}))})}return r&&r.gsx$splash?s.createElement(ee,{card:r}):s.createElement(d.uW,{location:this.props.location})}}]),n}(s.Component))||ue)||ue;function de(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var he,Ee=(0,m.f3)((function(e,t,n){return t}))(ge=(0,m.Pi)(ge=function(e){(0,c.Z)(n,e);var t=de(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.location.pathname.split("/");if(""==e[e.length-1]&&e.pop(),4!==e.length)return s.createElement(d.uW,{location:this.props.location});var t=decodeURIComponent(e[3]),n=g.Z.portal.battlegear.findOne({gsx$name:t}),r=g.Z.cards.battlegear.findOne({gsx$name:t});if(n){var a=[];return n.gsx$attributes&&a.push(["Attributes",n.gsx$attributes]),n.gsx$background&&a.push(["Background",n.gsx$background]),n.gsx$details&&a.push(["Details",n.gsx$details]),s.createElement(ee,{card:r,col2:a.map((function(e,t){return s.createElement(s.Fragment,{key:t},s.createElement("div",null,s.createElement("strong",null,e[0],":"),s.createElement("br",null),e[1]),t!==a.length-1&&s.createElement("hr",null))}))})}return r&&r.gsx$splash?s.createElement(ee,{card:r}):s.createElement(d.uW,{location:this.props.location})}}]),n}(s.Component))||ge)||ge;function xe(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var ve,$e=(0,m.f3)((function(e,t,n){return t}))(he=(0,m.Pi)(he=function(e){(0,c.Z)(n,e);var t=xe(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"render",value:function(){var e=this.props.location.pathname.split("/");if(""==e[e.length-1]&&e.pop(),4!==e.length)return s.createElement(d.uW,{location:this.props.location});var t=decodeURIComponent(e[3]),n=g.Z.portal.locations.findOne({gsx$name:t}),r=g.Z.cards.locations.findOne({gsx$name:t});if(n){var a=[];return n.gsx$localfeatures&&a.push(["Local Features",n.gsx$localfeatures]),n.gsx$background&&a.push(["Background",n.gsx$background]),n.gsx$details&&a.push(["Details",n.gsx$details]),s.createElement(ee,{card:r,col0:s.createElement(s.Fragment,null,r.gsx$initiative&&s.createElement("div",null,s.createElement("strong",null,"Initiative: "),s.createElement(d.a3,{initiative:r.gsx$initiative,notitle:"true"}))),col2:a.map((function(e,t){return s.createElement(s.Fragment,{key:t},s.createElement("div",null,s.createElement("strong",null,e[0],":"),s.createElement("br",null),e[1]),t!==a.length-1&&s.createElement("hr",null))}))})}return r&&r.gsx$splash?s.createElement(ee,{card:r,col0:s.createElement(s.Fragment,null,r.gsx$initiative&&s.createElement("div",null,s.createElement("strong",null,"Initiative: "),s.createElement(d.a3,{initiative:r.gsx$initiative,notitle:"true"})))}):s.createElement(d.uW,{location:this.props.location})}}]),n}(s.Component))||he)||he;function ye(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=(0,o.Z)(e);if(t){var a=(0,o.Z)(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return(0,i.Z)(this,n)}}var Ze=(0,m.f3)((function(e,t,n){return t}))(ve=(0,m.Pi)(ve=function(e){(0,c.Z)(n,e);var t=ye(n);function n(){return(0,a.Z)(this,n),t.apply(this,arguments)}return(0,l.Z)(n,[{key:"componentDidUpdate",value:function(){window.scrollTo({top:220,left:0,behavior:"smooth"})}},{key:"render",value:function(){var e=this.props.match.url,t=g.Z.tribes.map((function(t,n){return s.createElement(p.AW,{key:n,path:"".concat(e,"/").concat(t),component:me})}));return s.createElement("div",{className:"portal"},s.createElement(h,null),s.createElement(p.rs,null,s.createElement(p.AW,{exact:!0,path:e,component:U}),s.createElement(p.AW,{path:"".concat(e,"/Search"),component:V}),s.createElement(p.AW,{path:"".concat(e,"/Attacks"),render:function(e){return s.createElement(G,(0,r.Z)({},e,{type:"Attacks",component:fe}))}}),s.createElement(p.AW,{path:"".concat(e,"/Battlegear"),render:function(e){return s.createElement(G,(0,r.Z)({},e,{type:"Battlegear",component:Ee}))}}),s.createElement(p.AW,{path:"".concat(e,"/Creatures"),render:function(e){return s.createElement(G,(0,r.Z)({},e,{type:"Creatures",component:re}))}}),s.createElement(p.AW,{path:"".concat(e,"/Locations"),render:function(e){return s.createElement(G,(0,r.Z)({},e,{type:"Locations",component:$e}))}}),s.createElement(p.AW,{path:"".concat(e,"/Mugic"),render:function(e){return s.createElement(G,(0,r.Z)({},e,{type:"Mugic",component:oe}))}}),t))}}]),n}(s.Component))||ve)||ve}}]);