"use strict";(self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[]).push([[640],{8640:(e,t,n)=>{n.r(t),n.d(t,{default:()=>u});var a=n(7462),l=n(5603),r=n(7294),o=n(3727),c=n(2195),i=(n(2188),function(){return r.createElement("a",{href:"https://github.com/chaoticbackup",className:"name",rel:"noreferrer noopener",target:"_blank"},"Chaotic Backup Project")}),s=function(e){var t=e.block,n=e.text,a=e.sets;return r.createElement("div",{className:"lore"},r.createElement("div",{className:"block"},t),n.map((function(e,t){return r.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})})),a.map((function(e,t){if(e.text&&e.text.length>0)return r.createElement("div",{className:"set",key:t},r.createElement("div",{className:"title"},e.title),e.text.map((function(e,t){return r.createElement("div",{key:t},e)})))})))},u=function(e){function t(){for(var t,n=arguments.length,a=new Array(n),l=0;l<n;l++)a[l]=arguments[l];return(t=e.call.apply(e,[this].concat(a))||this).state={lore:[]},t}(0,l.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this;fetch("/public/json/starter_lore.json").then((function(e){return e.json()})).then((function(t){e.setState({lore:t})})).catch((function(){e.setState({lore:[{block:"Unable to load lore...",text:[]}]})}))},n.render=function(){return r.createElement("div",null,r.createElement("br",null),r.createElement("div",{className:"with-love"},r.createElement("div",null,"Welcome to the ",r.createElement(i,null),"."),r.createElement("span",null,"Built by fans for fans."),r.createElement("br",null),r.createElement("br",null),r.createElement("div",null,"Made with ",r.createElement("span",{className:"heart"},"♥")," by",r.createElement("br",null),"Danude Sandstorm (Project Lead)",r.createElement("br",null),"Chiodosin1 (Database Contributions)",r.createElement("br",null),"Afjak and Blitser (Art and Knowledge)"),r.createElement("div",null,"Do you like the site? You can donate to support it!"),r.createElement("div",{className:"donate"},r.createElement(c.U9,null)),r.createElement("div",{className:"lore"},"We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.  With an extensive lists of search options in the ",r.createElement(o.rU,{to:"/collection"},"collection"),", you'll find deck building mores streamlined than ever before.  Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the ",r.createElement(o.rU,{to:"/portal"},"Portal to Perim")," disapeared along with the official site. You can again explore the official lore and information!"),r.createElement("br",null),this.state.lore.length>0?this.state.lore.map((function(e,t){return r.createElement(s,(0,a.Z)({key:t},e))})):"Loading lore entries..."))},t}(r.Component)}}]);