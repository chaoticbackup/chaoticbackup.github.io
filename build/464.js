"use strict";(self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[]).push([[464],{61464:(e,t,n)=>{n.r(t),n.d(t,{default:()=>oe});var a,s,i,l,r,c,m=n(54167),o=n(793),h=n(58168),p=n(80045),u=n(96540),d=n(92291),g=n(22451),x=n(36607),E=n(87614),y=n.n(E),b=n(99746),v=n(44759);let $=(0,x.WQ)(((e,t,n)=>t))(a=(0,x.PA)((s=class extends u.Component{constructor(e){super(e),(0,m.A)(this,"loaded",i,this),(0,m.A)(this,"loading",l,this),(0,m.A)(this,"input",r,this),(0,m.A)(this,"collapsed",c,this),this.list=["sets","types","rarity","tribes","elements","mull","gender","exclusive"],this.fetchCollapsed=()=>{let e=localStorage.getItem("collapsed");e=e?JSON.parse(e):{energy:!0,bpmc:!0,types:!0,rarity:!1,sets:!1,exclusive:!1},this.collapsed=e},this.handleTriggerClick=e=>{const t=this.collapsed;t[e]=!this.collapsed[e],localStorage.setItem("collapsed",JSON.stringify(t))},this.cleanInput=()=>{const e={name:"",text:"",subtypes:"",flavor:!0,sets:{},types:{attack:!1,battlegear:!1,creature:!1,location:!1,mugic:!1},rarity:{common:!1,uncommon:!1,rare:!1,"super rare":!1,"ultra rare":!1,promo:!1},tribes:{danian:!1,"m'arrillian":!1,mipedian:!1,overworld:!1,underworld:!1,generic:!1},elements:{fire:!1,air:!1,earth:!1,water:!1,none:!1,and:!1},disciplines:{courage:"",power:"",wisdom:"",speed:"",max:!1},energy:{min:"",max:""},mcbp:{min:"",max:""},mull:{unique:!1,loyal:!1,legendary:!1,mixed:!1},exclusive:{starter:!1,printed:!1,online:!1},gender:{ambiguous:!1,female:!1,male:!1}};for(const t in d.A.sets)e.sets[t.toLowerCase()]=!1;this.input=e},this.parseQuery=()=>{const e=this.props.location.search.toLowerCase(),t={},n=("?"===e[0]?e.substr(1):e).split("&");for(let e=0;e<n.length;e++){const a=n[e].split("=");t[decodeURIComponent(a[0])]=decodeURIComponent(a[1]||"")}if(this.list.forEach((e=>{t[e]&&t[e].split(",").map((t=>{this.input[e][t]=!0}))})),t.hasOwnProperty("name")&&(this.input.name=t.name),t.hasOwnProperty("text")&&(this.input.text=t.text),t.hasOwnProperty("subtypes")&&(this.input.subtypes=t.subtypes),t.hasOwnProperty("courage")&&(this.input.disciplines.courage=t.courage),t.hasOwnProperty("power")&&(this.input.disciplines.power=t.power),t.hasOwnProperty("wisdom")&&(this.input.disciplines.wisdom=t.wisdom),t.hasOwnProperty("speed")&&(this.input.disciplines.speed=t.speed),t.hasOwnProperty("disc_max")&&(this.input.disciplines.max=!!t.disc_max),t.hasOwnProperty("energy")){const e=t.energy.split(",");e[0]>=0&&(this.input.energy.min=e[0]),e[1]>=0&&(this.input.energy.max=e[1])}if(t.hasOwnProperty("mcbp")){const e=t.mcbp.split(",");e[0]>=0&&(this.input.mcbp.min=e[0]),e[1]>=0&&(this.input.mcbp.max=e[1])}},this.reset=e=>{e.preventDefault(),e.stopPropagation(),this.cleanInput()},this.handleExclusiveChange=e=>{},this.handleChange=(e,t)=>{const{target:n}=e,a="checkbox"===n.type?n.checked:n.value,{name:s}=n;t?this.input[t][s]=a:this.input[s]=a},this.search=e=>{e&&(e.preventDefault(),e.stopPropagation(),this.updateQuery());const t=(0,b.A)(this.input);t.length>0?this.props.handleContent(t):this.props.handleContent([{text:"No Results Found"}])},this.formRef=e.formRef,this.search=this.search.bind(this),this.handleChange=this.handleChange.bind(this),this.reset=this.reset.bind(this),this.handleTriggerClick=this.handleTriggerClick.bind(this),this.props.handleContent([{text:"Loading..."}]),this.cleanInput(),this.parseQuery(),this.fetchCollapsed()}async updateQuery(){let e="";const t=e=>{let t="";return Object.keys(this.input[e]).forEach((n=>{1==this.input[e][n]&&(t+=n+",")})),t.length>0?e+"="+t.replace(/\,$/,"&"):""};this.list.forEach((n=>e+=t(n))),this.input.name&&(e+="name="+encodeURIComponent(this.input.name)+"&"),this.input.text&&(e+="text="+encodeURIComponent(this.input.text)+"&"),this.input.subtypes&&(e+="subtypes="+encodeURIComponent(this.input.subtypes)+"&"),this.input.disciplines.courage>0&&(e+="courage="+this.input.disciplines.courage+"&"),this.input.disciplines.power>0&&(e+="power="+this.input.disciplines.power+"&"),this.input.disciplines.wisdom>0&&(e+="wisdom="+this.input.disciplines.wisdom+"&"),this.input.disciplines.speed>0&&(e+="speed="+this.input.disciplines.speed+"&"),this.input.disciplines.max&&(e+="disc_max=true&"),""==this.input.energy.min&&""==this.input.energy.max||(e+="energy=",""!=this.input.energy.min&&this.input.energy.min>=0&&(e+=this.input.energy.min),e+=",",""!=this.input.energy.max&&this.input.energy.max>=0&&(e+=this.input.energy.max),e+="&"),""==this.input.mcbp.min&&""==this.input.mcbp.max||(e+="mcbp=",""!=this.input.mcbp.min&&this.input.mcbp.min>=0&&(e+=this.input.mcbp.min),e+=",",""!=this.input.mcbp.max&&this.input.mcbp.max>=0&&(e+=this.input.mcbp.max),e+="&"),e=e.replace(/\&$/,""),this.props.navigate("/collection/?"+e)}render(){if(0==this.loaded)return 0==this.loading&&(this.loading=!0,d.A.LoadDB([{cards:"attacks"},{cards:"battlegear"},{cards:"creatures"},{cards:"locations"},{cards:"mugic"}]).then((()=>{this.loaded=!0,this.loading=!1,this.search()})).catch((()=>{}))),u.createElement(v.Rh,null);const e=(e,t,n)=>{const a=[];return Object.keys(this.input[e]).forEach(((s,i)=>{a.push(u.createElement("label",{style:{display:t},key:i},u.createElement("input",{type:"checkbox",name:s,checked:this.input[e][s],onChange:t=>this.handleChange(t,e)}),n(s)))})),a},t=e("sets","block",(e=>d.A.sets[e.toUpperCase()])),n=e("types","block",(e=>e.charAt(0).toUpperCase()+e.slice(1))),a=e("rarity","block",(e=>e.split(" ").map((e=>e.charAt(0).toUpperCase()+e.slice(1))).join(" "))),s=e("tribes","inline",(e=>u.createElement("span",null,u.createElement("img",{className:"icon16",src:"/public/img/icons/tribes/"+e+".png"})))),i=e("elements","inline",(e=>u.createElement("span",null,u.createElement("img",{className:"icon20",src:"/public/img/icons/elements/"+e+".png"})," "))).slice(0,-2),l=[];return Object.keys(this.input.disciplines).forEach(((e,t)=>{4!=t&&l.push(u.createElement("label",{key:t,className:"disciplines"},u.createElement("input",{type:"text",name:e,value:this.input.disciplines[e],onChange:e=>this.handleChange(e,"disciplines")}),u.createElement("img",{className:"icon20",style:{verticalAlign:"middle",padding:"0px 2px"},src:"/public/img/icons/disciplines/"+e+".png"})))})),u.createElement("div",{className:"SearchForm"},u.createElement("form",{onSubmit:this.search},u.createElement("div",{className:"centeredButtons"},u.createElement("input",{id:"search",type:"submit",value:"Search",ref:this.formRef}),u.createElement("input",{id:"search",type:"button",value:"Reset",onClick:this.reset})),u.createElement("div",{className:"text-entry"},u.createElement("input",{type:"text",name:"name",placeholder:"Card Name",value:this.input.name,onChange:this.handleChange})),u.createElement("div",{className:"text-entry"},u.createElement("input",{type:"text",name:"text",placeholder:"Card Text",value:this.input.text,onChange:this.handleChange})),u.createElement("div",{className:"text-entry"},u.createElement("input",{type:"text",name:"subtypes",placeholder:"Subtypes | Initiative",value:this.input.subtypes,onChange:this.handleChange})),u.createElement("div",{className:"centeredCheckBox"},u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"flavor",value:!this.input.flavor,onChange:e=>{this.input.flavor=!e.target.checked}}),"Ignore Flavortext & Artist")),u.createElement("br",null),u.createElement("div",{className:"centeredCheckBox centeredSpacing"},u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"unique",checked:this.input.mull.unique,onChange:e=>this.handleChange(e,"mull")}),"Unique"),u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"loyal",checked:this.input.mull.loyal,onChange:e=>this.handleChange(e,"mull")}),"Loyal"),u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"legendary",checked:this.input.mull.legendary,onChange:e=>this.handleChange(e,"mull")}),"Legendary")),u.createElement("div",{className:"centeredCheckBox"},u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"mixed",checked:this.input.mull.mixed,onChange:e=>this.handleChange(e,"mull")}),"Non-Loyal")),u.createElement("hr",null),u.createElement("div",{className:"tribes"},s),u.createElement("hr",null),u.createElement("div",{className:"tribes"},i,u.createElement("label",{className:"none"},u.createElement("input",{type:"checkbox",name:"none",checked:this.input.elements.none,onChange:e=>this.handleChange(e,"elements")}),u.createElement("span",null,"None"))),u.createElement("div",{className:"centeredButtons"},u.createElement("input",{type:"button",value:this.input.elements.none?"not":"or",className:"and",disabled:!this.input.elements.and,onClick:e=>{this.input.elements.and=!1}}),u.createElement("input",{type:"button",value:this.input.elements.none?"only":"and",className:"and",disabled:this.input.elements.and,onClick:e=>{this.input.elements.and=!0}})),u.createElement("hr",null),u.createElement("div",{className:"disciplines"},l,u.createElement("label",null,"Max",u.createElement("input",{type:"checkbox",name:"max",style:{display:"inline",margin:"0px"},checked:this.input.disciplines.max,onChange:e=>this.handleChange(e,"disciplines")}))),u.createElement("hr",null),u.createElement(f,{type:"energy",title:"Energy",collapsed:this.collapsed,onClick:this.handleTriggerClick},u.createElement("div",{className:"minMax"},u.createElement("label",{className:"mcbp"},"Min ",u.createElement("input",{type:"text",name:"min",value:this.input.energy.min,onChange:e=>this.handleChange(e,"energy")})),u.createElement("label",{className:"mcbp"},"Max ",u.createElement("input",{type:"text",name:"max",value:this.input.energy.max,onChange:e=>this.handleChange(e,"energy")})))),u.createElement(f,{type:"bpmc",title:"Build Points\nMugic Counters/Cost",collapsed:this.collapsed,onClick:this.handleTriggerClick},u.createElement("div",{className:"minMax"},u.createElement("label",{className:"mcbp"},"Min ",u.createElement("input",{type:"text",name:"min",value:this.input.mcbp.min,onChange:e=>this.handleChange(e,"mcbp")})),u.createElement("label",{className:"mcbp"},"Max ",u.createElement("input",{type:"text",name:"max",value:this.input.mcbp.max,onChange:e=>this.handleChange(e,"mcbp")})))),u.createElement(f,{type:"types",title:"Card Type",collapsed:this.collapsed,onClick:this.handleTriggerClick},u.createElement("div",{className:"centeredCheckBox"},n)),u.createElement(f,{type:"rarity",title:"Rarity",collapsed:this.collapsed,onClick:this.handleTriggerClick},u.createElement("div",{className:"centeredCheckBox"},a)),u.createElement(f,{type:"sets",title:"Sets",collapsed:this.collapsed,onClick:this.handleTriggerClick},u.createElement("div",{className:"centeredCheckBox"},t)),u.createElement(f,{type:"exclusive",title:"Exclusive",collapsed:this.collapsed,onClick:this.handleTriggerClick},u.createElement("div",{className:"centeredCheckBox centeredSpacing",style:{width:"80%"}},u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"starter",checked:this.input.exclusive.starter,onChange:e=>this.handleChange(e,"exclusive")}),"Starter"),u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"printed",checked:this.input.exclusive.printed,onChange:e=>this.handleChange(e,"exclusive")}),"Printed"),u.createElement("label",{className:"mull"},u.createElement("input",{type:"checkbox",name:"online",checked:this.input.exclusive.online,onChange:e=>this.handleChange(e,"exclusive")}),"Online"))),u.createElement("hr",null),u.createElement("div",{className:"centeredButtons"},u.createElement("input",{id:"search",type:"submit",value:"Search"}),u.createElement("input",{id:"search",type:"button",value:"Reset",onClick:this.reset}))))}},i=(0,o.A)(s.prototype,"loaded",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),l=(0,o.A)(s.prototype,"loading",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),r=(0,o.A)(s.prototype,"input",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),c=(0,o.A)(s.prototype,"collapsed",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),a=s))||a)||a;class f extends u.Component{constructor(e){super(e),this.open=!1,this.trigger="";const{collapsed:t,type:n}=e;this.open=t[n],this.trigger=e.title}render(){const{type:e,children:t,onClick:n}=this.props;return u.createElement(y(),{trigger:this.trigger,open:this.open,onOpen:()=>n(e),onClose:()=>n(e)},t)}}var w,C=n(54705);function k(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function N(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?k(Object(n),!0).forEach((function(t){(0,C.A)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):k(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function A(e){let{card:t,setImage:n}=e;if(t.gsx$ic&&""!==t.gsx$ic){const e=(()=>{switch(t.gsx$type){case"Attacks":return{height:"206px",width:"112px",margin:"-22px 0px 0px -6px"};case"Battlegear":return{height:"204px",width:"112px",margin:"-22px 0px 0px -6px"};case"Creatures":return{height:"192px",width:"109px",margin:"-18px 0px -0px -4px"};case"Locations":return{height:"194px",width:"200px",margin:"-28px 0px 0px -50px"};case"Mugic":return{height:"188px",width:"100px",margin:"-18px 0px 0px 0px"}}})();return u.createElement("div",{className:"thumb",style:{overflow:"hidden"}},u.createElement("img",{src:t.gsx$ic,onClick:()=>n(t.gsx$ic),style:N({},e)}))}return u.createElement("img",{className:"thumb",src:d.A.base_image+(t.gsx$thumb||d.A.thumb_missing),onClick:()=>n(d.A.cardImage(t))})}let S=(0,x.WQ)(((e,t,n)=>t))(w=(0,x.PA)(w=class extends u.Component{render(){const{card:e}=this.props;return 0==this.props.ext?u.createElement("div",{className:"card attack"},u.createElement(A,this.props),u.createElement("div",{className:"left"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity}),u.createElement("span",null,u.createElement(v._w,{bp:e.gsx$bp})," Attack - ",e.gsx$bp),u.createElement("br",null),u.createElement("div",null,u.createElement("span",{className:"bp bigger"},e.gsx$base)," | ",u.createElement(v.YG,{element:"fire",value:e.gsx$fire}),e.gsx$fire," ",u.createElement(v.YG,{element:"air",value:e.gsx$air}),e.gsx$air," ",u.createElement(v.YG,{element:"earth",value:e.gsx$earth}),e.gsx$earth," ",u.createElement(v.YG,{element:"water",value:e.gsx$water}),e.gsx$water)),u.createElement("br",null),u.createElement("div",{className:"right"},u.createElement(v.Tj,{ability:e.gsx$ability}),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary}}),u.createElement(v.QM,{flavortext:e.gsx$flavortext}))):u.createElement("div",{className:"card attack"},u.createElement("div",{className:"fullcard"},u.createElement("img",{src:d.A.cardImage(e),width:"250px",height:"350px"})),u.createElement("div",{className:"right"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity,id:e.gsx$id}),u.createElement(v.Tj,{ability:e.gsx$ability}),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary}}),u.createElement(v.QM,{flavortext:e.gsx$flavortext}),u.createElement("div",null,"Art By: ",e.gsx$artist)))}})||w)||w;var O;let I=(0,x.WQ)(((e,t,n)=>t))(O=(0,x.PA)(O=class extends u.Component{render(){const{card:e}=this.props;return 0==this.props.ext?u.createElement("div",{className:"card battlegear"},u.createElement(A,this.props),u.createElement("div",{className:"left"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity}),u.createElement("span",null,u.createElement(v.dm,null)," Battlegear",e.gsx$types.length>0?" - "+e.gsx$types:null)),u.createElement("div",{className:"right"},u.createElement(v.Tj,{ability:e.gsx$ability}),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary}}),u.createElement(v.QM,{flavortext:e.gsx$flavortext}))):u.createElement("div",{className:"card battlegear"},u.createElement("div",{className:"fullcard"},u.createElement("img",{src:d.A.cardImage(e),width:"250px",height:"350px"})),u.createElement("div",{className:"right"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity,id:e.gsx$id}),u.createElement(v.Tj,{ability:e.gsx$ability}),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary}}),u.createElement(v.QM,{flavortext:e.gsx$flavortext}),u.createElement("div",null,"Art By: ",e.gsx$artist)))}})||O)||O;var T;let j=(0,x.WQ)(((e,t,n)=>t))(T=(0,x.PA)(T=class extends u.Component{render(){const{card:e,stats:t,hideStats:n}=this.props,a=[];for(let t=0;t<e.gsx$mugicability;t++)a.push(u.createElement(v.jd,{key:t,tribe:e.gsx$tribe}));const s=()=>{let t=e.gsx$types,n=!1;t.toLowerCase().includes("past")&&(n=!0,t=t.replace(/past /i,""));const a=" "+(n?"Past ":"")+t;return u.createElement("span",null,u.createElement(v.uZ,{tribe:e.gsx$tribe}),a)},i=(e,n)=>n&&"Aa'une the Oligarch, Avatar"==n?Number(e):"min"==t?Number(e)-10:"max"==t?Number(e)+10:Number(e),l=(e,n)=>n&&"Aa'une the Oligarch, Avatar"==n?Number(e):"min"==t?Number(e)-5:"max"==t?Number(e)+5:Number(e);return 0==this.props.ext?u.createElement("div",{className:"card creature"},u.createElement(A,this.props),u.createElement("div",{className:"left"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity}),u.createElement(s,null),u.createElement("br",null),u.createElement("div",null,u.createElement(v.YG,{element:"fire",value:e.gsx$elements.toLowerCase().indexOf("fire")>=0})," ",u.createElement(v.YG,{element:"air",value:e.gsx$elements.toLowerCase().indexOf("air")>=0})," ",u.createElement(v.YG,{element:"earth",value:e.gsx$elements.toLowerCase().indexOf("earth")>=0})," ",u.createElement(v.YG,{element:"water",value:e.gsx$elements.toLowerCase().indexOf("water")>=0})),u.createElement("span",null,a)),u.createElement("br",null),u.createElement("div",{className:"right"},u.createElement(v.Tj,{ability:e.gsx$ability,tribe:e.gsx$tribe}),e.gsx$brainwashed&&u.createElement(u.Fragment,null,u.createElement("div",{className:"text_brainwashed"},"Brainwashed"),u.createElement(v.Tj,{type:"brainwashed",tribe:e.gsx$tribe,ability:e.gsx$brainwashed})),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary,tribe:e.gsx$tribe}}),e.gsx$types.includes("Chieftain")&&u.createElement("div",{className:"chieftain"},"(Minions use Brainwashed text. Minions may only play Generic Mugic.)"),u.createElement(v.QM,{flavortext:e.gsx$flavortext})),u.createElement("br",null),u.createElement("div",{className:"stats"},u.createElement("div",{className:"energy"},i(e.gsx$courage,e.gsx$name),u.createElement(v.mT,{discipline:"courage"})),u.createElement("div",{className:"energy"},i(e.gsx$power,e.gsx$name),u.createElement(v.mT,{discipline:"power"})),u.createElement("div",{className:"energy"},i(e.gsx$wisdom,e.gsx$name),u.createElement(v.mT,{discipline:"wisdom"})),u.createElement("div",{className:"energy"},i(e.gsx$speed,e.gsx$name),u.createElement(v.mT,{discipline:"speed"})),u.createElement("div",{className:"energy",style:{fontWeight:"bold"}},l(e.gsx$energy,e.gsx$name)))):u.createElement("div",{className:"card creature"},u.createElement("div",{className:"fullcard"},u.createElement("img",{src:d.A.cardImage(e),width:"250px",height:"350px"}),!n&&u.createElement("div",{className:"image-cover"},u.createElement("div",null,u.createElement("span",(0,h.A)({key:"courage"},i(e.gsx$courage,e.gsx$name)>=100?{className:"long"}:null),i(e.gsx$courage,e.gsx$name)),u.createElement("span",(0,h.A)({key:"power"},i(e.gsx$power,e.gsx$name)>=100?{className:"long"}:null),i(e.gsx$power,e.gsx$name)),u.createElement("span",(0,h.A)({key:"wisdom"},i(e.gsx$wisdom,e.gsx$name)>=100?{className:"long"}:null),i(e.gsx$wisdom,e.gsx$name)),u.createElement("span",(0,h.A)({key:"speed"},i(e.gsx$speed,e.gsx$name)>=100?{className:"long"}:null),i(e.gsx$speed,e.gsx$name)),u.createElement("span",(0,h.A)({key:"energy"},l(e.gsx$energy,e.gsx$name)>=100?{className:"long"}:null),l(e.gsx$energy,e.gsx$name))))),u.createElement("div",{className:"right"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity,id:e.gsx$id}),u.createElement("span",null,i(e.gsx$courage,e.gsx$name)," ",u.createElement(v.mT,{discipline:"courage"}))," ",u.createElement("span",null,i(e.gsx$power,e.gsx$name)," ",u.createElement(v.mT,{discipline:"power"}))," ",u.createElement("span",null,i(e.gsx$wisdom,e.gsx$name)," ",u.createElement(v.mT,{discipline:"wisdom"}))," ",u.createElement("span",null,i(e.gsx$speed,e.gsx$name)," ",u.createElement(v.mT,{discipline:"speed"}))," ",u.createElement("span",{style:{fontWeight:"bold"}},l(e.gsx$energy,e.gsx$name)),u.createElement("br",null),u.createElement(v.Tj,{ability:e.gsx$ability,tribe:e.gsx$tribe}),e.gsx$brainwashed&&u.createElement(u.Fragment,null,u.createElement("div",{className:"text_brainwashed"},"Brainwashed"),u.createElement(v.Tj,{type:"brainwashed",tribe:e.gsx$tribe,ability:e.gsx$brainwashed})),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary,tribe:e.gsx$tribe}}),e.gsx$types.includes("Chieftain")&&u.createElement("div",{className:"chieftain"},"(Minions use Brainwashed text. Minions may only play Generic Mugic.)"),u.createElement(v.QM,{flavortext:e.gsx$flavortext}),u.createElement("div",null,"Art By: ",e.gsx$artist)))}})||T)||T;var M;let P=(0,x.WQ)(((e,t,n)=>t))(M=(0,x.PA)(M=class extends u.Component{render(){const{card:e}=this.props;return 0==this.props.ext?u.createElement("div",{className:"card location"},u.createElement(A,this.props),u.createElement("div",{className:"left"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity}),u.createElement("span",null,u.createElement(v.BT,null)," Location",e.gsx$types.length>0?" - "+e.gsx$types:null),u.createElement("br",null),u.createElement(v.T,{initiative:e.gsx$initiative})),u.createElement("div",{className:"right"},u.createElement(v.Tj,{ability:e.gsx$ability}),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary}}),u.createElement(v.QM,{flavortext:e.gsx$flavortext}))):u.createElement("div",{className:"card location"},u.createElement("div",{className:"fullcard"},u.createElement("img",{src:d.A.cardImage(e),height:"250px",width:"350px"})),u.createElement("div",{className:"right"},u.createElement(v.SX,{name:e.gsx$name}),u.createElement(v.Cl,{set:e.gsx$set,rarity:e.gsx$rarity,id:e.gsx$id}),u.createElement(v.T,{initiative:e.gsx$initiative}),u.createElement(v.Tj,{ability:e.gsx$ability}),u.createElement(v.Ew,{data:{unique:e.gsx$unique,loyal:e.gsx$loyal,legendary:e.gsx$legendary}}),u.createElement(v.QM,{flavortext:e.gsx$flavortext}),u.createElement("div",null,"Art By: ",e.gsx$artist)))}})||M)||M;var B=n(21631);class q{constructor(e,t,n,a){this.pitch=void 0,this.octave=void 0,this.time=void 0,this.duration=void 0,this.velocity=void 0,this.duration=e,this.time=t,this.pitch=n.pitch,this.octave=n.octave,a&&(this.velocity=a)}}const H=(e,t)=>{let n=(()=>{if(0===t.length)return 4;const n=t.length-1,{octave:a}=t[n],s=Q(e,a),i=Q(t[n]),l=L(i,s);if(l<3)return 0===l?a:i>Q(5,a)?s<Q(3,a)?a+1:a:i<Q(3,a)&&s>Q(5,a)?a-1:a;if(0===n){if(3===l)return s>i?a:a+1;if(s>i)return a;if(s<i)return a-1}return R(s,n,t)})();return n>5&&(n=5),{pitch:e,octave:n}},R=(e,t,n)=>{if(t<1)return n[t].octave;const a=Q(n[t]),s=Q(n[t-1]);return console.log(s,a,e),s>a?a<e?n[t].octave:n[t].octave-1:s<a?a<e?n[t].octave:n[t].octave+1:R(e,t-1,n)},L=(e,t)=>{const n=Math.abs(e-t);return n<4?n:n>3.5?n-1:n>4.5?n-2:n>5.5?n-3:n>6.5?n-4:n};function Q(e,t){let n,a;return e instanceof q?(n=z(e.pitch),a=e.octave):(n="number"==typeof e?e:z(e),a=t),n+8*(a-1)}const z=e=>{let t;switch(e.charAt(0).toUpperCase()){case"A":t=1;break;case"B":t=2;break;case"C":default:t=3;break;case"D":t=4;break;case"E":t=5;break;case"F":t=6;break;case"G":t=7}return e.length>1&&("b"===e.charAt(1).toLowerCase()?t-=.5:"#"===e.charAt(1)&&(t+=.5)),t};class F extends q{constructor(e){const{duration:t,time:n,pitch:a,octave:s,velocity:i}=e;super(t,n,{pitch:a,octave:s},i)}get value(){return{time:(0,B.gX)(this.time).quantize("4n")/4,pitch:this.pitch+this.octave.toString(),duration:(0,B.gX)(this.duration).quantize("4n")/4,velocity:this.velocity}}}class _{static getInstance(){return _.instance||(_.instance=new _),_.instance}constructor(){this.synth=void 0,this.part=void 0;this.synth=new B.RG({frequency:440,oscillator:{type:"sine"},envelope:{attack:.4,decay:.1,release:.5,sustain:1,attackCurve:"cosine",releaseCurve:"exponential",decayCurve:"exponential"},pitchDecay:.05}).toDestination(),B.oK.bpm.value=140}play(e){B.oK.stop(),this.part&&this.part.dispose();try{const t=(e=>{const t=[];let n=0;return console.log(e.split(" ")),e.split(" ").forEach((e=>{const a=/(?:[1-8]{1})/,s=e.match(a);if(null===s)throw new Error("invalid_input");const i=parseInt(s[0]),l=e.split(a)[1],r=/[1-8]{1}[A-Za-z#]{1,2}([1-8]{1})/;if(r.test(e)){const a=e.match(r);if(null===a)throw new Error("invalid_input");t.push(new q(i,n,{pitch:l,octave:parseInt(a[1])}))}else t.push(new q(i,n,H(l,t)));n+=i})),console.log((e=>e.map((e=>e.duration+e.pitch+e.octave.toString())))(t)),t})(e).map((e=>new F(e)));this.part=new B.eS(((e,t)=>{this.synth.triggerAttackRelease(t.pitch,t.duration,e,t.velocity)}),t.map((e=>e.value))).start(),B.oK.start()}catch(e){return void console.log(e)}}}_.instance=void 0;const X=_.getInstance(),D=e=>{const t=function(e,t){let n;return function(){for(var a=arguments.length,s=new Array(a),i=0;i<a;i++)s[i]=arguments[i];n&&clearTimeout(n),n=setTimeout((()=>{t(...s),n=null}),e)}}(200,(()=>{X.play(e.notes)}));return u.createElement("input",{type:"button",value:"Play",onClick:()=>{t()}})};var G;let U=(0,x.WQ)(((e,t,n)=>t))(G=(0,x.PA)(G=class extends u.Component{render(){var e,t;const{card:n}=this.props,a=[];if(0==n.gsx$cost)a.push(u.createElement(v.jd,{tribe:n.gsx$tribe,key:0,amount:"0"}));else if("x"==n.gsx$cost.toLowerCase())a.push(u.createElement(v.jd,{tribe:n.gsx$tribe,key:0,amount:"x"}));else if(n.gsx$cost>5)a.push(u.createElement(v.jd,{tribe:n.gsx$tribe,key:0,amount:n.gsx$cost}));else for(let e=0;e<n.gsx$cost;e++)a.push(u.createElement(v.jd,{tribe:n.gsx$tribe,key:e}));return 0==this.props.ext?u.createElement("div",{className:"card mugic"},u.createElement(A,this.props),u.createElement("div",{className:"left"},u.createElement(v.SX,{name:n.gsx$name}),u.createElement(v.Cl,{set:n.gsx$set,rarity:n.gsx$rarity}),u.createElement(v.uZ,{size:"icon16",tribe:n.gsx$tribe})," Mugic - ",n.gsx$tribe,u.createElement("br",null),u.createElement("span",null,a),u.createElement(D,{notes:(null==(e=n.gsx$shownotes)?void 0:e.length)>0?n.gsx$shownotes:n.gsx$notes}),u.createElement("br",null)),u.createElement("br",null),u.createElement("div",{className:"right"},u.createElement(v.Tj,{ability:n.gsx$ability,tribe:n.gsx$tribe}),u.createElement(v.Ew,{data:{unique:n.gsx$unique,loyal:n.gsx$loyal,legendary:n.gsx$legendary}}),u.createElement(v.QM,{flavortext:n.gsx$flavortext}))):u.createElement("div",{className:"card mugic"},u.createElement("div",{className:"fullcard"},u.createElement("img",{src:d.A.cardImage(n),width:"250px",height:"350px"})),u.createElement("div",{className:"right"},u.createElement(v.SX,{name:n.gsx$name}),u.createElement(v.Cl,{set:n.gsx$set,rarity:n.gsx$rarity,id:n.gsx$id}),u.createElement(v.Tj,{ability:n.gsx$ability,tribe:n.gsx$tribe}),u.createElement(v.Ew,{data:{unique:n.gsx$unique,loyal:n.gsx$loyal,legendary:n.gsx$legendary}}),u.createElement(v.QM,{flavortext:n.gsx$flavortext}),u.createElement("div",null,"Art By: ",n.gsx$artist),u.createElement("div",null,"Notes: ",n.gsx$notes),u.createElement(D,{notes:(null==(t=n.gsx$shownotes)?void 0:t.length)>0?n.gsx$shownotes:n.gsx$notes})))}})||G)||G;var W,Y,K,Z,J,V,ee,te,ne,ae,se,ie,le,re;const ce=["cards"],me=(0,g.sH)({style:{},get fixed(){return this.style},get isFixed(){return 0!==Object.entries(this.style).length},setFixed(e){if(!window.matchMedia("(min-width: 975px)").matches)return;const t=document.getElementById("player").getBoundingClientRect().left+4,n=document.querySelector(".collection > .left").getBoundingClientRect().width+2;this.style={position:"fixed",top:0,left:t+"px",overflowY:"auto",height:e+"px",width:n+"px"}},removeFixed(){this.style={}}},{setFixed:g.XI,removeFixed:g.XI},{deep:!1});let oe=(0,x.WQ)(((e,t,n)=>t))(Z=(0,x.PA)((J=class extends u.Component{constructor(){super(),(0,m.A)(this,"loaded",V,this),(0,m.A)(this,"n",ee,this),(0,m.A)(this,"p",te,this),(0,m.A)(this,"ext",ne,this),(0,m.A)(this,"stats",ae,this),(0,m.A)(this,"hideStats",se,this),(0,m.A)(this,"content",ie,this),(0,m.A)(this,"card_img",le,this),(0,m.A)(this,"fixedStyles",re,this),this.handleContent=e=>{this.content=e,this.p=1},this.setImage=e=>{this.card_img=e||d.A.card_back,this.changeImage()},this.setExt=()=>{this.ext=!this.ext,localStorage.setItem("extended",this.ext)},this.setStats=e=>{this.stats=e.target.value,localStorage.setItem("stats",this.stats)},this.setHideStats=()=>{this.hideStats=!this.hideStats,localStorage.setItem("hideStats",this.hideStats)},this.handleScroll=e=>{e.preventDefault();const t=document.documentElement,n="scrollHeight",a="clientHeight",s=document.querySelector(".collection > .right");if(window.pageYOffset>=235){const e=document.getElementById("side-menu"),i=t[n]-window.innerHeight-t.scrollTop;if(s[a]<=window.innerHeight?s.style.minHeight=window.innerHeight+"px":s.style.minHeight&&(s.style.minHeight=null),i<=90){const e=t[a]-(90-i);me.setFixed(e)}else(e[n]>t[a]||e[a]!==t[a])&&me.setFixed(window.innerHeight)}else s.style.minHeight&&(s.style.minHeight=null),me.isFixed&&me.removeFixed()},this.handleOutOfForm=e=>{this.formRef.current.focus()};const e=localStorage.getItem("extended");null!=e&&(this.ext=/true/i.test(e));const t=localStorage.getItem("stats");null!=t&&("min"==t&&(this.stats="min"),"max"==t&&(this.stats="max"));const n=localStorage.getItem("hideStats");this.hideStats=!!n&&"false"!==n,this.formRef=u.createRef()}componentDidMount(){window.addEventListener("scroll",this.handleScroll),window.addEventListener("resize",this.handleScroll)}componentWillUnmount(){window.removeEventListener("scroll",this.handleScroll),window.removeEventListener("resize",this.handleScroll)}render(){return u.createElement("div",{className:"collection "+(this.ext?"extended":"short")},u.createElement("div",{className:"left"},u.createElement("div",{id:"side-menu",style:me.fixed},u.createElement(ue,{url:this.card_img,ref:e=>{e&&(this.changeImage=e.getInstance().changeImage)}}),u.createElement($,(0,h.A)({formRef:this.formRef,handleContent:this.handleContent},this.props)))),u.createElement("div",{className:"right"},u.createElement("div",{className:"list-nav-top"},this.navigation(),u.createElement("select",{name:"stats-display",value:this.stats,onChange:this.setStats},u.createElement("option",{value:"min"},"Min Stats"),u.createElement("option",{value:"avg"},"Average Stats"),u.createElement("option",{value:"max"},"Max Stats")),u.createElement("select",{name:"full-card",value:this.ext,onChange:this.setExt},u.createElement("option",{value:!1},"Short Format"),u.createElement("option",{value:!0},"Extended Format")),u.createElement("div",null,u.createElement("label",{htmlFor:"hide-stats"},"Hide Stats"),u.createElement("br",null),u.createElement("input",{type:"checkbox",id:"hide-stats",checked:this.hideStats,onChange:this.setHideStats}))),u.createElement("br",null),u.createElement("div",{onClick:this.handleOutOfForm},u.createElement(he,{cards:this.content.slice(this.n*(this.p-1),this.n*this.p),setImage:this.setImage,ext:this.ext,stats:this.stats,hideStats:this.hideStats})),u.createElement("br",null),this.navigation()))}navigation(){const e=Math.ceil(this.content.length/this.n),t=()=>{document.getElementById("player").scrollIntoView()},n=e=>{this.n=e.target.value,this.p=1};return u.createElement("div",{className:"entries"},this.content.length," results - page ",this.p," of ",e," ",(()=>this.p>1?u.createElement("button",{className:"prev-button",onClick:()=>{this.p--,t()}},"prev"):u.createElement("button",{className:"prev-button",disabled:!0},"prev"))()," ",(()=>this.p<e?u.createElement("button",{className:"next-button",onClick:()=>{this.p++,t()}},"next"):u.createElement("button",{className:"next-button",disabled:!0},"next"))(),u.createElement("br",null),"Entries per page",u.createElement("input",{type:"button",value:"5",disabled:"5"==this.n,onClick:n})," ",u.createElement("input",{type:"button",value:"10",disabled:"10"==this.n,onClick:n})," ",u.createElement("input",{type:"button",value:"20",disabled:"20"==this.n,onClick:n})," ",u.createElement("input",{type:"button",value:"50",disabled:"50"==this.n,onClick:n}))}},V=(0,o.A)(J.prototype,"loaded",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),ee=(0,o.A)(J.prototype,"n",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 10}}),te=(0,o.A)(J.prototype,"p",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return 1}}),ne=(0,o.A)(J.prototype,"ext",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),ae=(0,o.A)(J.prototype,"stats",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return"avg"}}),se=(0,o.A)(J.prototype,"hideStats",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),ie=(0,o.A)(J.prototype,"content",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return[]}}),le=(0,o.A)(J.prototype,"card_img",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return d.A.card_back}}),re=(0,o.A)(J.prototype,"fixedStyles",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:null}),Z=J))||Z)||Z;const he=e=>{let{cards:t}=e,n=(0,p.A)(e,ce);return 1==t.length&&t[0].text?u.createElement("div",{style:{textAlign:"left"}},t[0].text):t.map(((e,t)=>{switch(e.gsx$type){case"Attacks":return u.createElement(S,(0,h.A)({card:e,key:e.gsx$name+e.gsx$set},n));case"Battlegear":return u.createElement(I,(0,h.A)({card:e,key:e.gsx$name+e.gsx$set},n));case"Creatures":return u.createElement(j,(0,h.A)({card:e,key:e.gsx$name+e.gsx$set},n));case"Locations":return u.createElement(P,(0,h.A)({card:e,key:e.gsx$name+e.gsx$set},n));case"Mugic":return u.createElement(U,(0,h.A)({card:e,key:e.gsx$name+e.gsx$set},n));default:return u.createElement("div",{key:t},"Invalid Card Type")}}))};let pe=(0,x.PA)((Y=class extends u.Component{constructor(){super(...arguments),(0,m.A)(this,"display",K,this),this.handleClickOutside=e=>{this.display=!1},this.changeImage=()=>{this.display=!0}}render(){return u.createElement("div",{className:"card_img"},u.createElement("img",{className:this.display?"":"hidden",src:this.props.url}))}},K=(0,o.A)(Y.prototype,"display",[g.sH],{configurable:!0,enumerable:!0,writable:!0,initializer:function(){return!1}}),W=Y))||W;const ue=(0,n(73908).A)(pe)}}]);