"use strict";(self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[]).push([[465],{4465:(e,t,n)=>{n.r(t),n.d(t,{default:()=>pe});var a,i,r,l,s,c,o,m,u,p,d=n(3269),g=n(7326),h=n(1721),x=n(3229),y=n(7462),f=n(3366),E=n(7294),b=n(2196),v=n(2188),$=n(798),w=n(5861),C=n(7757),k=n.n(C),N=n(7893),Z=n.n(N),q=n(9637),S=n(8660),I=(0,$.f3)((function(e,t,n){return t}))(a=(0,$.Pi)((i=function(e){function t(t){var n;return n=e.call(this,t)||this,(0,d.Z)(n,"loaded",r,(0,g.Z)(n)),(0,d.Z)(n,"loading",l,(0,g.Z)(n)),(0,d.Z)(n,"input",s,(0,g.Z)(n)),(0,d.Z)(n,"collapsed",c,(0,g.Z)(n)),n.list=["sets","types","rarity","tribes","elements","mull","gender"],n.fetchCollapsed=function(){var e=localStorage.getItem("collapsed");e=e?JSON.parse(e):{disciplines:!0,energy:!0,bpmc:!0,types:!0,rarity:!1,sets:!1},n.collapsed=e},n.handleTriggerClick=function(e){var t=n.collapsed;t[e]=!n.collapsed[e],localStorage.setItem("collapsed",JSON.stringify(t))},n.cleanInput=function(){var e={name:"",text:"",subtypes:"",flavor:!0,sets:{},types:{attack:!1,battlegear:!1,creature:!1,location:!1,mugic:!1},rarity:{common:!1,uncommon:!1,rare:!1,"super rare":!1,"ultra rare":!1,promo:!1},tribes:{danian:!1,"m'arrillian":!1,mipedian:!1,overworld:!1,underworld:!1,generic:!1},elements:{fire:!1,air:!1,earth:!1,water:!1,none:!1,and:!1},disciplines:{courage:"",power:"",wisdom:"",speed:"",max:!1},energy:{min:"",max:""},mcbp:{min:"",max:""},mull:{unique:!1,loyal:!1,legendary:!1,mixed:!1},gender:{ambiguous:!1,female:!1,male:!1}};for(var t in b.Z.sets)e.sets[t.toLowerCase()]=!1;n.input=e},n.parseQuery=function(){for(var e=n.props.location.search.toLowerCase(),t={},a=("?"===e[0]?e.substr(1):e).split("&"),i=0;i<a.length;i++){var r=a[i].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1]||"")}if(n.list.forEach((function(e){t[e]&&t[e].split(",").map((function(t){n.input[e][t]=!0}))})),t.hasOwnProperty("name")&&(n.input.name=t.name),t.hasOwnProperty("text")&&(n.input.text=t.text),t.hasOwnProperty("subtypes")&&(n.input.subtypes=t.subtypes),t.hasOwnProperty("courage")&&(n.input.disciplines.courage=t.courage),t.hasOwnProperty("power")&&(n.input.disciplines.power=t.power),t.hasOwnProperty("wisdom")&&(n.input.disciplines.wisdom=t.wisdom),t.hasOwnProperty("speed")&&(n.input.disciplines.speed=t.speed),t.hasOwnProperty("disc_max")&&(n.input.disciplines.max=!!t.disc_max),t.hasOwnProperty("energy")){var l=t.energy.split(",");l[0]>=0&&(n.input.energy.min=l[0]),l[1]>=0&&(n.input.energy.max=l[1])}if(t.hasOwnProperty("mcbp")){var s=t.mcbp.split(",");s[0]>=0&&(n.input.mcbp.min=s[0]),s[1]>=0&&(n.input.mcbp.max=s[1])}},n.reset=function(e){e.preventDefault(),e.stopPropagation(),n.cleanInput()},n.handleChange=function(e,t){var a=e.target,i="checkbox"===a.type?a.checked:a.value,r=a.name;t?n.input[t][r]=i:n.input[r]=i},n.search=function(e){e&&(e.preventDefault(),e.stopPropagation(),n.updateQuery());var t=(0,S.Z)(n.input);t.length>0?n.props.handleContent(t):n.props.handleContent([{text:"No Results Found"}])},n.formRef=t.formRef,n.search=n.search.bind((0,g.Z)(n)),n.handleChange=n.handleChange.bind((0,g.Z)(n)),n.reset=n.reset.bind((0,g.Z)(n)),n.handleTriggerClick=n.handleTriggerClick.bind((0,g.Z)(n)),n.props.handleContent([{text:"Loading..."}]),n.cleanInput(),n.parseQuery(),n.fetchCollapsed(),n}(0,h.Z)(t,e);var n=t.prototype;return n.updateQuery=function(){var e=(0,w.Z)(k().mark((function e(){var t,n,a=this;return k().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t="",n=function(e){var t="";return Object.keys(a.input[e]).forEach((function(n){1==a.input[e][n]&&(t+=n+",")})),t.length>0?e+"="+t.replace(/\,$/,"&"):""},this.list.forEach((function(e){return t+=n(e)})),this.input.name&&(t+="name="+encodeURIComponent(this.input.name)+"&"),this.input.text&&(t+="text="+encodeURIComponent(this.input.text)+"&"),this.input.subtypes&&(t+="subtypes="+encodeURIComponent(this.input.subtypes)+"&"),this.input.disciplines.courage>0&&(t+="courage="+this.input.disciplines.courage+"&"),this.input.disciplines.power>0&&(t+="power="+this.input.disciplines.power+"&"),this.input.disciplines.wisdom>0&&(t+="wisdom="+this.input.disciplines.wisdom+"&"),this.input.disciplines.speed>0&&(t+="speed="+this.input.disciplines.speed+"&"),this.input.disciplines.max&&(t+="disc_max=true&"),""==this.input.energy.min&&""==this.input.energy.max||(t+="energy=",""!=this.input.energy.min&&this.input.energy.min>=0&&(t+=this.input.energy.min),t+=",",""!=this.input.energy.max&&this.input.energy.max>=0&&(t+=this.input.energy.max),t+="&"),""==this.input.mcbp.min&&""==this.input.mcbp.max||(t+="mcbp=",""!=this.input.mcbp.min&&this.input.mcbp.min>=0&&(t+=this.input.mcbp.min),t+=",",""!=this.input.mcbp.max&&this.input.mcbp.max>=0&&(t+=this.input.mcbp.max),t+="&"),t=t.replace(/\&$/,""),this.props.history.push("/collection/?"+t);case 15:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}(),n.render=function(){var e=this;if(0==this.loaded)return 0==this.loading&&(this.loading=!0,b.Z.LoadDB([{cards:"attacks"},{cards:"battlegear"},{cards:"creatures"},{cards:"locations"},{cards:"mugic"}]).then((function(){e.loaded=!0,e.loading=!1,e.search()})).catch((function(){}))),E.createElement(q.gb,null);var t=function(t,n,a){var i=[];return Object.keys(e.input[t]).forEach((function(r,l){i.push(E.createElement("label",{style:{display:n},key:l},E.createElement("input",{type:"checkbox",name:r,checked:e.input[t][r],onChange:function(n){return e.handleChange(n,t)}}),a(r)))})),i},n=t("sets","block",(function(e){return b.Z.sets[e.toUpperCase()]})),a=t("types","block",(function(e){return e.charAt(0).toUpperCase()+e.slice(1)})),i=t("rarity","block",(function(e){return e.split(" ").map((function(e){return e.charAt(0).toUpperCase()+e.slice(1)})).join(" ")})),r=t("tribes","inline",(function(e){return E.createElement("span",null,E.createElement("img",{className:"icon16",src:"/public/img/icons/tribes/"+e+".png"}))})),l=t("elements","inline",(function(e){return E.createElement("span",null,E.createElement("img",{className:"icon20",src:"/public/img/icons/elements/"+e+".png"})," ")})).slice(0,-2),s=[];return Object.keys(this.input.disciplines).forEach((function(t,n){4!=n&&s.push(E.createElement("label",{key:n,className:"disciplines"},E.createElement("input",{type:"text",name:t,value:e.input.disciplines[t],onChange:function(t){return e.handleChange(t,"disciplines")}}),E.createElement("img",{className:"icon20",style:{verticalAlign:"middle",padding:"0px 2px"},src:"/public/img/icons/disciplines/"+t+".png"})))})),E.createElement("div",{className:"SearchForm"},E.createElement("form",{onSubmit:this.search},E.createElement("div",{className:"centeredButtons"},E.createElement("input",{id:"search",type:"submit",value:"Search",ref:this.formRef}),E.createElement("input",{id:"search",type:"button",value:"Reset",onClick:this.reset})),E.createElement("div",{className:"text-entry"},E.createElement("input",{type:"text",name:"name",placeholder:"Card Name",value:this.input.name,onChange:this.handleChange})),E.createElement("div",{className:"text-entry"},E.createElement("input",{type:"text",name:"text",placeholder:"Card Text",value:this.input.text,onChange:this.handleChange})),E.createElement("div",{className:"text-entry"},E.createElement("input",{type:"text",name:"subtypes",placeholder:"Subtypes | Initiative",value:this.input.subtypes,onChange:this.handleChange})),E.createElement("div",{className:"centeredCheckBox"},E.createElement("label",{className:"mull"},E.createElement("input",{type:"checkbox",name:"flavor",value:!this.input.flavor,onChange:function(t){e.input.flavor=!t.target.checked}}),"Ignore Flavortext & Artist")),E.createElement("br",null),E.createElement("div",{className:"centeredCheckBox centeredSpacing"},E.createElement("label",{className:"mull"},E.createElement("input",{type:"checkbox",name:"unique",checked:this.input.mull.unique,onChange:function(t){return e.handleChange(t,"mull")}}),"Unique"),E.createElement("label",{className:"mull"},E.createElement("input",{type:"checkbox",name:"loyal",checked:this.input.mull.loyal,onChange:function(t){return e.handleChange(t,"mull")}}),"Loyal"),E.createElement("label",{className:"mull"},E.createElement("input",{type:"checkbox",name:"legendary",checked:this.input.mull.legendary,onChange:function(t){return e.handleChange(t,"mull")}}),"Legendary")),E.createElement("div",{className:"centeredCheckBox"},E.createElement("label",{className:"mull"},E.createElement("input",{type:"checkbox",name:"mixed",checked:this.input.mull.mixed,onChange:function(t){return e.handleChange(t,"mull")}}),"Non-Loyal")),E.createElement("hr",null),E.createElement("div",{className:"tribes"},r),E.createElement("hr",null),E.createElement("div",{className:"tribes"},l,E.createElement("label",{className:"none"},E.createElement("input",{type:"checkbox",name:"none",checked:this.input.elements.none,onChange:function(t){return e.handleChange(t,"elements")}}),E.createElement("span",null,"None"))),E.createElement("div",{className:"centeredButtons"},E.createElement("input",{type:"button",value:this.input.elements.none?"none":"or",className:"and",disabled:!this.input.elements.and,onClick:function(t){e.input.elements.and=!1}}),E.createElement("input",{type:"button",value:this.input.elements.none?"only":"and",className:"and",disabled:this.input.elements.and,onClick:function(t){e.input.elements.and=!0}})),E.createElement("hr",null),E.createElement(O,{type:"disciplines",title:"Disciplines",collapsed:this.collapsed,onClick:this.handleTriggerClick},E.createElement("div",{className:"disciplines"},s,E.createElement("label",null,"Max",E.createElement("input",{type:"checkbox",name:"max",style:{display:"inline",margin:"0px"},checked:this.input.disciplines.max,onChange:function(t){return e.handleChange(t,"disciplines")}})))),E.createElement(O,{type:"energy",title:"Energy",collapsed:this.collapsed,onClick:this.handleTriggerClick},E.createElement("div",{className:"minMax"},E.createElement("label",{className:"mcbp"},"Min ",E.createElement("input",{type:"text",name:"min",value:this.input.energy.min,onChange:function(t){return e.handleChange(t,"energy")}})),E.createElement("label",{className:"mcbp"},"Max ",E.createElement("input",{type:"text",name:"max",value:this.input.energy.max,onChange:function(t){return e.handleChange(t,"energy")}})))),E.createElement(O,{type:"bpmc",title:"Build Points\nMugic Counters/Cost",collapsed:this.collapsed,onClick:this.handleTriggerClick},E.createElement("div",{className:"minMax"},E.createElement("label",{className:"mcbp"},"Min ",E.createElement("input",{type:"text",name:"min",value:this.input.mcbp.min,onChange:function(t){return e.handleChange(t,"mcbp")}})),E.createElement("label",{className:"mcbp"},"Max ",E.createElement("input",{type:"text",name:"max",value:this.input.mcbp.max,onChange:function(t){return e.handleChange(t,"mcbp")}})))),E.createElement(O,{type:"types",title:"Card Type",collapsed:this.collapsed,onClick:this.handleTriggerClick},E.createElement("div",{className:"centeredCheckBox"},a)),E.createElement(O,{type:"rarity",title:"Rarity",collapsed:this.collapsed,onClick:this.handleTriggerClick},E.createElement("div",{className:"centeredCheckBox"},i)),E.createElement(O,{type:"sets",title:"Sets",collapsed:this.collapsed,onClick:this.handleTriggerClick},E.createElement("div",{className:"setBox"},E.createElement("div",{className:"centeredCheckBox",id:"sets"},n))),E.createElement("div",{className:"centeredButtons"},E.createElement("input",{id:"search",type:"submit",value:"Search"}),E.createElement("input",{id:"search",type:"button",value:"Reset",onClick:this.reset}))))},t}(E.Component),r=(0,x.Z)(i.prototype,"loaded",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),l=(0,x.Z)(i.prototype,"loading",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),s=(0,x.Z)(i.prototype,"input",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),c=(0,x.Z)(i.prototype,"collapsed",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=i))||a)||a,O=function(e){function t(t){var n;(n=e.call(this,t)||this).open=!1,n.trigger="";var a=t.collapsed,i=t.type;return n.open=a[i],n.trigger=t.title,n}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this.props,t=e.type,n=e.children,a=e.onClick;return E.createElement(Z(),{trigger:this.trigger,open:this.open,onOpen:function(){return a(t)},onClose:function(){return a(t)}},n)},t}(E.Component),L=(0,$.f3)((function(e,t,n){return t}))(o=(0,$.Pi)(o=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this,t=this.props.card;return 0==this.props.ext?E.createElement("div",{className:"card attack"},E.createElement("img",{className:"thumb",src:b.Z.base_image+(t.gsx$thumb||b.Z.thumb_missing),onClick:function(){return e.props.setImage(b.Z.cardImage(t))}}),E.createElement("div",{className:"left"},E.createElement(q.VG,{name:t.gsx$name}),E.createElement(q.uq,{set:t.gsx$set,rarity:t.gsx$rarity}),E.createElement("span",null,E.createElement(q.dR,{bp:t.gsx$bp})," Attack - ",t.gsx$bp),E.createElement("br",null),E.createElement("div",null,E.createElement("span",{className:"bp bigger"},t.gsx$base)," | ",E.createElement(q.ZD,{element:"fire",value:t.gsx$fire}),t.gsx$fire," ",E.createElement(q.ZD,{element:"air",value:t.gsx$air}),t.gsx$air," ",E.createElement(q.ZD,{element:"earth",value:t.gsx$earth}),t.gsx$earth," ",E.createElement(q.ZD,{element:"water",value:t.gsx$water}),t.gsx$water)),E.createElement("br",null),E.createElement("div",{className:"right"},E.createElement(q.$U,{ability:t.gsx$ability}),E.createElement(q.kp,{data:{unique:t.gsx$unique,loyal:t.gsx$loyal,legendary:t.gsx$legendary}}),E.createElement(q.Q$,{flavortext:t.gsx$flavortext}))):E.createElement("div",{className:"card attack"},E.createElement("div",{className:"fullcard"},E.createElement("img",{src:b.Z.cardImage(t)})),E.createElement("div",{className:"right"},E.createElement(q.VG,{name:t.gsx$name}),E.createElement(q.uq,{set:t.gsx$set,rarity:t.gsx$rarity,id:t.gsx$id}),E.createElement(q.$U,{ability:t.gsx$ability}),E.createElement(q.kp,{data:{unique:t.gsx$unique,loyal:t.gsx$loyal,legendary:t.gsx$legendary}}),E.createElement(q.Q$,{flavortext:t.gsx$flavortext}),E.createElement("div",null,"Art By: ",t.gsx$artist)))},t}(E.Component))||o)||o,B=(0,$.f3)((function(e,t,n){return t}))(m=(0,$.Pi)(m=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this,t=this.props.card;return 0==this.props.ext?E.createElement("div",{className:"card battlegear"},E.createElement("img",{className:"thumb",style:{float:"left"},src:b.Z.base_image+(t.gsx$thumb||b.Z.thumb_missing),onClick:function(){return e.props.setImage(b.Z.cardImage(t))}}),E.createElement("div",{className:"left"},E.createElement(q.VG,{name:t.gsx$name}),E.createElement(q.uq,{set:t.gsx$set,rarity:t.gsx$rarity}),E.createElement("span",null,E.createElement(q.At,null)," Battlegear",t.gsx$types.length>0?" - "+t.gsx$types:null)),E.createElement("div",{className:"right"},E.createElement(q.$U,{ability:t.gsx$ability}),E.createElement(q.kp,{data:{unique:t.gsx$unique,loyal:t.gsx$loyal,legendary:t.gsx$legendary}}),E.createElement(q.Q$,{flavortext:t.gsx$flavortext}))):E.createElement("div",{className:"card battlegear"},E.createElement("div",{className:"fullcard"},E.createElement("img",{src:b.Z.cardImage(t)})),E.createElement("div",{className:"right"},E.createElement(q.VG,{name:t.gsx$name}),E.createElement(q.uq,{set:t.gsx$set,rarity:t.gsx$rarity,id:t.gsx$id}),E.createElement(q.$U,{ability:t.gsx$ability}),E.createElement(q.kp,{data:{unique:t.gsx$unique,loyal:t.gsx$loyal,legendary:t.gsx$legendary}}),E.createElement(q.Q$,{flavortext:t.gsx$flavortext}),E.createElement("div",null,"Art By: ",t.gsx$artist)))},t}(E.Component))||m)||m,A=(0,$.f3)((function(e,t,n){return t}))(u=(0,$.Pi)(u=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){for(var e=this,t=this.props,n=t.card,a=t.stats,i=t.hideStats,r=[],l=0;l<n.gsx$mugicability;l++)r.push(E.createElement(q.lB,{key:l,tribe:n.gsx$tribe}));var s=function(){var e=n.gsx$types,t=!1;e.toLowerCase().includes("past")&&(t=!0,e=e.replace(/past /i,""));var a=" "+(t?"Past ":"")+e;return E.createElement("span",null,E.createElement(q.uy,{tribe:n.gsx$tribe}),a)},c=function(e,t){return t&&"Aa'une the Oligarch, Avatar"==t?Number(e):"min"==a?Number(e)-10:"max"==a?Number(e)+10:Number(e)},o=function(e,t){return t&&"Aa'une the Oligarch, Avatar"==t?Number(e):"min"==a?Number(e)-5:"max"==a?Number(e)+5:Number(e)};return 0==this.props.ext?E.createElement("div",{className:"card creature"},E.createElement("img",{className:"thumb",style:{float:"left"},src:b.Z.base_image+(n.gsx$thumb||b.Z.thumb_missing),onClick:function(){return e.props.setImage(b.Z.cardImage(n))}}),E.createElement("div",{className:"left"},E.createElement(q.VG,{name:n.gsx$name}),E.createElement(q.uq,{set:n.gsx$set,rarity:n.gsx$rarity}),E.createElement(s,null),E.createElement("br",null),E.createElement("div",null,E.createElement(q.ZD,{element:"fire",value:n.gsx$elements.toLowerCase().indexOf("fire")>=0})," ",E.createElement(q.ZD,{element:"air",value:n.gsx$elements.toLowerCase().indexOf("air")>=0})," ",E.createElement(q.ZD,{element:"earth",value:n.gsx$elements.toLowerCase().indexOf("earth")>=0})," ",E.createElement(q.ZD,{element:"water",value:n.gsx$elements.toLowerCase().indexOf("water")>=0})),E.createElement("span",null,r)),E.createElement("br",null),E.createElement("div",{className:"right"},E.createElement(q.$U,{ability:n.gsx$ability,tribe:n.gsx$tribe}),n.gsx$brainwashed&&E.createElement(E.Fragment,null,E.createElement("div",{className:"text_brainwashed"},"Brainwashed"),E.createElement(q.$U,{type:"brainwashed",tribe:n.gsx$tribe,ability:n.gsx$brainwashed})),E.createElement(q.kp,{data:{unique:n.gsx$unique,loyal:n.gsx$loyal,legendary:n.gsx$legendary,tribe:n.gsx$tribe}}),n.gsx$types.includes("Chieftain")&&E.createElement("div",{className:"chieftain"},"(Minions use Brainwashed text. Minions may only play Generic Mugic.)"),E.createElement(q.Q$,{flavortext:n.gsx$flavortext})),E.createElement("br",null),E.createElement("div",{className:"stats"},E.createElement("div",{className:"energy"},c(n.gsx$courage,n.gsx$name),E.createElement(q.cq,{discipline:"courage"})),E.createElement("div",{className:"energy"},c(n.gsx$power,n.gsx$name),E.createElement(q.cq,{discipline:"power"})),E.createElement("div",{className:"energy"},c(n.gsx$wisdom,n.gsx$name),E.createElement(q.cq,{discipline:"wisdom"})),E.createElement("div",{className:"energy"},c(n.gsx$speed,n.gsx$name),E.createElement(q.cq,{discipline:"speed"})),E.createElement("div",{className:"energy",style:{fontWeight:"bold"}},o(n.gsx$energy,n.gsx$name)))):E.createElement("div",{className:"card creature"},E.createElement("div",{className:"fullcard"},E.createElement("img",{src:b.Z.cardImage(n)}),!i&&E.createElement("div",{className:"image-cover"},E.createElement("div",null,E.createElement("span",(0,y.Z)({key:"courage"},c(n.gsx$courage,n.gsx$name)>=100?{className:"long"}:null),c(n.gsx$courage,n.gsx$name)),E.createElement("span",(0,y.Z)({key:"power"},c(n.gsx$power,n.gsx$name)>=100?{className:"long"}:null),c(n.gsx$power,n.gsx$name)),E.createElement("span",(0,y.Z)({key:"wisdom"},c(n.gsx$wisdom,n.gsx$name)>=100?{className:"long"}:null),c(n.gsx$wisdom,n.gsx$name)),E.createElement("span",(0,y.Z)({key:"speed"},c(n.gsx$speed,n.gsx$name)>=100?{className:"long"}:null),c(n.gsx$speed,n.gsx$name)),E.createElement("span",(0,y.Z)({key:"energy"},o(n.gsx$energy,n.gsx$name)>=100?{className:"long"}:null),o(n.gsx$energy,n.gsx$name))))),E.createElement("div",{className:"right"},E.createElement(q.VG,{name:n.gsx$name}),E.createElement(q.uq,{set:n.gsx$set,rarity:n.gsx$rarity,id:n.gsx$id}),E.createElement("span",null,c(n.gsx$courage,n.gsx$name)," ",E.createElement(q.cq,{discipline:"courage"}))," ",E.createElement("span",null,c(n.gsx$power,n.gsx$name)," ",E.createElement(q.cq,{discipline:"power"}))," ",E.createElement("span",null,c(n.gsx$wisdom,n.gsx$name)," ",E.createElement(q.cq,{discipline:"wisdom"}))," ",E.createElement("span",null,c(n.gsx$speed,n.gsx$name)," ",E.createElement(q.cq,{discipline:"speed"}))," ",E.createElement("span",{style:{fontWeight:"bold"}},o(n.gsx$energy,n.gsx$name)),E.createElement("br",null),E.createElement(q.$U,{ability:n.gsx$ability,tribe:n.gsx$tribe}),n.gsx$brainwashed&&E.createElement(E.Fragment,null,E.createElement("div",{className:"text_brainwashed"},"Brainwashed"),E.createElement(q.$U,{type:"brainwashed",tribe:n.gsx$tribe,ability:n.gsx$brainwashed})),E.createElement(q.kp,{data:{unique:n.gsx$unique,loyal:n.gsx$loyal,legendary:n.gsx$legendary,tribe:n.gsx$tribe}}),n.gsx$types.includes("Chieftain")&&E.createElement("div",{className:"chieftain"},"(Minions use Brainwashed text. Minions may only play Generic Mugic.)"),E.createElement(q.Q$,{flavortext:n.gsx$flavortext}),E.createElement("div",null,"Art By: ",n.gsx$artist)))},t}(E.Component))||u)||u,_=(0,$.f3)((function(e,t,n){return t}))(p=(0,$.Pi)(p=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e=this,t=this.props.card;return 0==this.props.ext?E.createElement("div",{className:"card location"},E.createElement("img",{className:"thumb",style:{float:"left",width:"100px",height:"98px"},src:b.Z.base_image+(t.gsx$thumb||b.Z.thumb_missing),onClick:function(){return e.props.setImage(b.Z.cardImage(t))}}),E.createElement("div",{className:"left"},E.createElement(q.VG,{name:t.gsx$name}),E.createElement(q.uq,{set:t.gsx$set,rarity:t.gsx$rarity}),E.createElement("span",null,E.createElement(q._t,null)," Location",t.gsx$types.length>0?" - "+t.gsx$types:null),E.createElement("br",null),E.createElement(q.a3,{initiative:t.gsx$initiative})),E.createElement("div",{className:"right"},E.createElement(q.$U,{ability:t.gsx$ability}),E.createElement(q.kp,{data:{unique:t.gsx$unique,loyal:t.gsx$loyal,legendary:t.gsx$legendary}}),E.createElement(q.Q$,{flavortext:t.gsx$flavortext}))):E.createElement("div",{className:"card location"},E.createElement("div",{className:"fullcard"},E.createElement("img",{src:b.Z.cardImage(t)})),E.createElement("div",{className:"right"},E.createElement(q.VG,{name:t.gsx$name}),E.createElement(q.uq,{set:t.gsx$set,rarity:t.gsx$rarity,id:t.gsx$id}),E.createElement(q.a3,{initiative:t.gsx$initiative}),E.createElement(q.$U,{ability:t.gsx$ability}),E.createElement(q.kp,{data:{unique:t.gsx$unique,loyal:t.gsx$loyal,legendary:t.gsx$legendary}}),E.createElement(q.Q$,{flavortext:t.gsx$flavortext}),E.createElement("div",null,"Art By: ",t.gsx$artist)))},t}(E.Component))||p)||p;var P=n(3144),U=n(8563),M=function(e,t,n,a){this.pitch=void 0,this.octave=void 0,this.time=void 0,this.duration=void 0,this.velocity=void 0,this.duration=e,this.time=t,this.pitch=n.pitch,this.octave=n.octave,a&&(this.velocity=a)},z=function(e,t){var n=function(){if(0===t.length)return 4;var n=t.length-1,a=t[n].octave,i=D(e,a),r=D(t[n]),l=F(r,i);if(l<3)return 0===l?a:r>D(5,a)?i<D(3,a)?a+1:a:r<D(3,a)&&i>D(5,a)?a-1:a;if(0===n){if(3===l)return i>r?a:a+1;if(i>r)return a;if(i<r)return a-1}return R(i,n,t)}();return n>5&&(n=5),{pitch:e,octave:n}},R=function e(t,n,a){if(n<1)return a[n].octave;var i=D(a[n]),r=D(a[n-1]);return console.log(r,i,t),r>i?i<t?a[n].octave:a[n].octave-1:r<i?i<t?a[n].octave:a[n].octave+1:e(t,n-1,a)},F=function(e,t){var n=Math.abs(e-t);return n<4?n:n>3.5?n-1:n>4.5?n-2:n>5.5?n-3:n>6.5?n-4:n};function D(e,t){var n,a;return e instanceof M?(n=T(e.pitch),a=e.octave):(n="number"==typeof e?e:T(e),a=t),n+8*(a-1)}var T=function(e){var t;switch(e.charAt(0).toUpperCase()){case"A":t=1;break;case"B":t=2;break;default:t=3;break;case"D":t=4;break;case"E":t=5;break;case"F":t=6;break;case"G":t=7}return e.length>1&&("b"===e.charAt(1).toLowerCase()?t-=.5:"#"===e.charAt(1)&&(t+=.5)),t},Q=function(e){function t(t){var n=t.duration,a=t.time,i=t.pitch,r=t.octave,l=t.velocity;return e.call(this,n,a,{pitch:i,octave:r},l)||this}return(0,h.Z)(t,e),(0,P.Z)(t,[{key:"value",get:function(){return{time:(0,U.qp)(this.time).quantize("4n")/4,pitch:this.pitch+this.octave.toString(),duration:(0,U.qp)(this.duration).quantize("4n")/4,velocity:this.velocity}}}]),t}(M),G=function(){function e(){this.synth=void 0,this.part=void 0;this.synth=new U.WV({frequency:440,oscillator:{type:"sine"},envelope:{attack:.4,decay:.1,release:.5,sustain:1,attackCurve:"cosine",releaseCurve:"exponential",decayCurve:"exponential"},pitchDecay:.05}).toDestination(),U.J7.bpm.value=140}return e.getInstance=function(){return e.instance||(e.instance=new e),e.instance},e.prototype.play=function(e){var t=this;U.J7.stop(),this.part&&this.part.dispose();try{var n=function(e){var t=[],n=0;return console.log(e.split(" ")),e.split(" ").forEach((function(e){var a=/(?:[1-8]{1})/,i=e.match(a);if(null===i)throw new Error("invalid_input");var r=parseInt(i[0]),l=e.split(a)[1],s=/[1-8]{1}[A-Za-z#]{1,2}([1-8]{1})/;if(s.test(e)){var c=e.match(s);if(null===c)throw new Error("invalid_input");t.push(new M(r,n,{pitch:l,octave:parseInt(c[1])}))}else t.push(new M(r,n,z(l,t)));n+=r})),console.log(function(e){return e.map((function(e){return e.duration+e.pitch+e.octave.toString()}))}(t)),t}(e).map((function(e){return new Q(e)}));this.part=new U.Lz((function(e,n){t.synth.triggerAttackRelease(n.pitch,n.duration,e,n.velocity)}),n.map((function(e){return e.value}))).start(),U.J7.start()}catch(e){return void console.log(e)}},e}();G.instance=void 0;var H=G.getInstance();const V=function(e){var t,n,a,i=(t=200,n=function(){H.play(e.notes)},function(){for(var e=arguments.length,i=new Array(e),r=0;r<e;r++)i[r]=arguments[r];a&&clearTimeout(a),a=setTimeout((function(){n.apply(void 0,i),a=null}),t)});return E.createElement("input",{type:"button",value:"Play",onClick:function(){i()}})};var j,J,W,Y,K,X,ee,te,ne,ae,ie,re,le,se,ce,oe=(0,$.f3)((function(e,t,n){return t}))(j=(0,$.Pi)(j=function(e){function t(){return e.apply(this,arguments)||this}return(0,h.Z)(t,e),t.prototype.render=function(){var e,t,n=this,a=this.props,i=a.card,r=(a.history,[]);if(0==i.gsx$cost)r.push(E.createElement(q.lB,{tribe:i.gsx$tribe,key:0,amount:"0"}));else if("x"==i.gsx$cost.toLowerCase())r.push(E.createElement(q.lB,{tribe:i.gsx$tribe,key:0,amount:"x"}));else if(i.gsx$cost>5)r.push(E.createElement(q.lB,{tribe:i.gsx$tribe,key:0,amount:i.gsx$cost}));else for(var l=0;l<i.gsx$cost;l++)r.push(E.createElement(q.lB,{tribe:i.gsx$tribe,key:l}));return 0==this.props.ext?E.createElement("div",{className:"card mugic"},E.createElement("img",{className:"thumb",style:{float:"left"},src:b.Z.base_image+(i.gsx$thumb||b.Z.thumb_missing),onClick:function(){return n.props.setImage(b.Z.cardImage(i))}}),E.createElement("div",{className:"left"},E.createElement(q.VG,{name:i.gsx$name}),E.createElement(q.uq,{set:i.gsx$set,rarity:i.gsx$rarity}),E.createElement(q.uy,{size:"icon16",tribe:i.gsx$tribe})," Mugic - ",i.gsx$tribe,E.createElement("br",null),E.createElement("span",null,r),E.createElement(V,{notes:(null==(e=i.gsx$shownotes)?void 0:e.length)>0?i.gsx$shownotes:i.gsx$notes}),E.createElement("br",null)),E.createElement("br",null),E.createElement("div",{className:"right"},E.createElement(q.$U,{ability:i.gsx$ability,tribe:i.gsx$tribe}),E.createElement(q.kp,{data:{unique:i.gsx$unique,loyal:i.gsx$loyal,legendary:i.gsx$legendary}}),E.createElement(q.Q$,{flavortext:i.gsx$flavortext}))):E.createElement("div",{className:"card mugic"},E.createElement("div",{className:"fullcard"},E.createElement("img",{src:b.Z.cardImage(i)})),E.createElement("div",{className:"right"},E.createElement(q.VG,{name:i.gsx$name}),E.createElement(q.uq,{set:i.gsx$set,rarity:i.gsx$rarity,id:i.gsx$id}),E.createElement(q.$U,{ability:i.gsx$ability,tribe:i.gsx$tribe}),E.createElement(q.kp,{data:{unique:i.gsx$unique,loyal:i.gsx$loyal,legendary:i.gsx$legendary}}),E.createElement(q.Q$,{flavortext:i.gsx$flavortext}),E.createElement("div",null,"Art By: ",i.gsx$artist),E.createElement("div",null,"Notes: ",i.gsx$notes),E.createElement(V,{notes:(null==(t=i.gsx$shownotes)?void 0:t.length)>0?i.gsx$shownotes:i.gsx$notes})))},t}(E.Component))||j)||j,me=["cards"],ue=(0,v.LO)({style:{},get fixed(){return this.style},get isFixed(){return 0!==Object.entries(this.style).length},setFixed:function(e){if(window.matchMedia("(min-width: 975px)").matches){var t=document.getElementById("player").getBoundingClientRect().left+4,n=document.querySelector(".collection > .left").getBoundingClientRect().width+2;this.style={position:"fixed",top:0,left:t+"px",overflowY:"auto",height:e+"px",width:n+"px"}}},removeFixed:function(){this.style={}}},{setFixed:v.aD,removeFixed:v.aD},{deep:!1}),pe=(0,$.f3)((function(e,t,n){return t}))(K=(0,$.Pi)((X=function(e){function t(){var t;t=e.call(this)||this,(0,d.Z)(t,"loaded",ee,(0,g.Z)(t)),(0,d.Z)(t,"n",te,(0,g.Z)(t)),(0,d.Z)(t,"p",ne,(0,g.Z)(t)),(0,d.Z)(t,"ext",ae,(0,g.Z)(t)),(0,d.Z)(t,"stats",ie,(0,g.Z)(t)),(0,d.Z)(t,"hideStats",re,(0,g.Z)(t)),(0,d.Z)(t,"content",le,(0,g.Z)(t)),(0,d.Z)(t,"card_img",se,(0,g.Z)(t)),(0,d.Z)(t,"fixedStyles",ce,(0,g.Z)(t)),t.handleContent=function(e){t.content=e,t.p=1},t.setImage=function(e){t.card_img=e||b.Z.card_back,t.changeImage()},t.setExt=function(){t.ext=!t.ext,localStorage.setItem("extended",t.ext)},t.setStats=function(){"min"==t.stats?t.stats="avg":"avg"==t.stats?t.stats="max":"max"==t.stats&&(t.stats="min"),localStorage.setItem("stats",t.stats)},t.setHideStats=function(){t.hideStats=!t.hideStats,localStorage.setItem("hideStats",t.hideStats)},t.handleScroll=function(e){if(e.preventDefault(),window.pageYOffset>=235){var t=document.documentElement,n="scrollHeight",a="clientHeight",i=document.getElementById("side-menu"),r=document.querySelector(".collection > .right"),l=t[n]-window.innerHeight-t.scrollTop;if(l<=90){var s=t[a]-(90-l);ue.setFixed(s)}else(i[n]>t[a]||i[a]!==t[a])&&ue.setFixed(window.innerHeight);!function(e){if(r[a]<window.innerHeight)r.style.minHeight=e+"px";else{if(r[a]===window.innerHeight)return;r.style.minHeight&&(r.style.minHeight=null)}}(window.innerHeight)}else ue.isFixed&&ue.removeFixed()},t.handleOutOfForm=function(){t.formRef.current.focus()};var n=localStorage.getItem("extended");null!=n&&(t.ext=/true/i.test(n));var a=localStorage.getItem("stats");null!=a&&("min"==a&&(t.stats="min"),"max"==a&&(t.stats="max"));var i=localStorage.getItem("hideStats");return t.hideStats=!!i&&"false"!==i,t.formRef=E.createRef(),t}(0,h.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleScroll)},n.componentWillUnmount=function(){window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleScroll)},n.render=function(){var e=this;return E.createElement("div",{className:"collection "+(this.ext?"extended":"short")},E.createElement("div",{className:"left"},E.createElement("div",{id:"side-menu",style:ue.fixed},E.createElement(he,{url:this.card_img,ref:function(t){t&&(e.changeImage=t.getInstance().changeImage)}}),E.createElement(I,(0,y.Z)({formRef:this.formRef,handleContent:this.handleContent},this.props)))),E.createElement("div",{className:"right",onClick:this.handleOutOfForm},E.createElement("div",{className:"list-nav-top"},this.navigation(),E.createElement("div",null,E.createElement("label",{htmlFor:"hide-stats"},"Hide Stats"),E.createElement("br",null),E.createElement("input",{type:"checkbox",id:"hide-stats",checked:this.hideStats,onChange:this.setHideStats})),E.createElement("button",{className:"stats-button",onClick:this.setStats},"min"==this.stats&&"Min Stats","avg"==this.stats&&"Average Stats","max"==this.stats&&"Max Stats"),E.createElement("button",{className:"ext-button",onClick:this.setExt},this.ext?"Extended Format":"Short Format")),E.createElement("br",null),E.createElement(de,{cards:this.content.slice(this.n*(this.p-1),this.n*this.p),setImage:this.setImage,ext:this.ext,stats:this.stats,hideStats:this.hideStats}),E.createElement("br",null),this.navigation()))},n.navigation=function(){var e=this,t=Math.ceil(this.content.length/this.n);return E.createElement("div",{className:"entries"},this.content.length," results - page ",this.p," of ",t," ",e.p>1?E.createElement("button",{className:"prev-button",onClick:function(){e.p--,window.scrollTo(0,0)}},"prev"):E.createElement("button",{className:"prev-button",disabled:!0},"prev")," ",e.p<t?E.createElement("button",{className:"next-button",onClick:function(){e.p++,window.scrollTo(0,0)}},"next"):E.createElement("button",{className:"next-button",disabled:!0},"next"),E.createElement("br",null),"Entries per page",E.createElement("input",{type:"button",value:"5",disabled:"5"==this.n,onClick:function(t){return e.n=t.target.value}})," ",E.createElement("input",{type:"button",value:"10",disabled:"10"==this.n,onClick:function(t){return e.n=t.target.value}})," ",E.createElement("input",{type:"button",value:"20",disabled:"20"==this.n,onClick:function(t){return e.n=t.target.value}})," ",E.createElement("input",{type:"button",value:"50",disabled:"50"==this.n,onClick:function(t){return e.n=t.target.value}}))},t}(E.Component),ee=(0,x.Z)(X.prototype,"loaded",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),te=(0,x.Z)(X.prototype,"n",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 10}}),ne=(0,x.Z)(X.prototype,"p",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),ae=(0,x.Z)(X.prototype,"ext",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),ie=(0,x.Z)(X.prototype,"stats",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"avg"}}),re=(0,x.Z)(X.prototype,"hideStats",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),le=(0,x.Z)(X.prototype,"content",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),se=(0,x.Z)(X.prototype,"card_img",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return b.Z.card_back}}),ce=(0,x.Z)(X.prototype,"fixedStyles",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),K=X))||K)||K,de=function(e){var t=e.cards,n=(0,f.Z)(e,me);return 1==t.length&&t[0].text?E.createElement("div",{style:{textAlign:"left"}},t[0].text):t.map((function(e,t){switch(e.gsx$type){case"Attacks":return E.createElement(L,(0,y.Z)({card:e,key:t},n));case"Battlegear":return E.createElement(B,(0,y.Z)({card:e,key:t},n));case"Creatures":return E.createElement(A,(0,y.Z)({card:e,key:t},n));case"Locations":return E.createElement(_,(0,y.Z)({card:e,key:t},n));case"Mugic":return E.createElement(oe,(0,y.Z)({card:e,key:t},n));default:return E.createElement("div",{key:t},"Invalid Card Type")}}))},ge=(0,$.Pi)((W=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),i=0;i<n;i++)a[i]=arguments[i];return t=e.call.apply(e,[this].concat(a))||this,(0,d.Z)(t,"display",Y,(0,g.Z)(t)),t.handleClickOutside=function(e){t.display=!1},t.changeImage=function(){t.display=!0},t}return(0,h.Z)(t,e),t.prototype.render=function(){return E.createElement("div",{className:"card_img"},E.createElement("img",{className:this.display?"":"hidden",src:this.props.url}))},t}(E.Component),Y=(0,x.Z)(W.prototype,"display",[v.LO],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),J=W))||J,he=(0,n(8949).Z)(ge)}}]);