(self.webpackChunkchaoticbackup=self.webpackChunkchaoticbackup||[]).push([[767],{8640:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return g}});var r=n(7154),a=n.n(r),l=n(4575),o=n.n(l),c=n(3913),i=n.n(c),u=n(2205),s=n.n(u),f=n(8585),m=n.n(f),h=n(9754),d=n.n(h),p=n(7294),b=n(3727),v=n(2195);n(2188);function E(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=d()(e);if(t){var a=d()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return m()(this,n)}}var k=function(){return p.createElement("a",{href:"https://github.com/chaoticbackup",className:"name",rel:"noreferrer noopener",target:"_blank"},"Chaotic Backup Project")},y=function(e){var t=e.block,n=e.text,r=e.sets;return p.createElement("div",{className:"lore"},p.createElement("div",{className:"block"},t),n.map((function(e,t){return p.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})})),r.map((function(e,t){if(e.text&&e.text.length>0)return p.createElement("div",{className:"set",key:t},p.createElement("div",{className:"title"},e.title),e.text.map((function(e,t){return p.createElement("div",{key:t},e)})))})))},g=function(e){s()(n,e);var t=E(n);function n(){var e;o()(this,n);for(var r=arguments.length,a=new Array(r),l=0;l<r;l++)a[l]=arguments[l];return(e=t.call.apply(t,[this].concat(a))).state={lore:[]},e}return i()(n,[{key:"componentDidMount",value:function(){var e=this;fetch("/public/json/starter_lore.json").then((function(e){return e.json()})).then((function(t){e.setState({lore:t})})).catch((function(){e.setState({lore:[{block:"Unable to load lore...",text:[]}]})}))}},{key:"render",value:function(){return p.createElement("div",null,p.createElement("br",null),p.createElement("div",{className:"with-love"},p.createElement("div",null,"Welcome to the ",p.createElement(k,null),"."),p.createElement("span",null,"Built by fans for fans."),p.createElement("br",null),p.createElement("br",null),p.createElement("div",null,"Made with ",p.createElement("span",{className:"heart"},"♥")," by",p.createElement("br",null),"Danude Sandstorm (Project Lead)",p.createElement("br",null),"Chiodosin1 (Database Contributions)",p.createElement("br",null),"Afjak and Blitser (Art and Knowledge)"),p.createElement("div",null,"Do you like the site? You can donate to support it!"),p.createElement("div",{className:"donate"},p.createElement(v.U9,null)),p.createElement("div",{className:"lore"},"We were unsatisfied with the options on how to search for cards. I took the design of the old Chaotic website and added my own modernizations.  With an extensive lists of search options in the ",p.createElement(b.rU,{to:"/collection"},"collection"),", you'll find deck building mores streamlined than ever before.  Chaotic is full of rich lore, but unfortunately the best database of official lore disapeared when the ",p.createElement(b.rU,{to:"/portal"},"Portal to Perim")," disapeared along with the official site. You can again explore the official lore and information!"),p.createElement("br",null),this.state.lore.length>0?this.state.lore.map((function(e,t){return p.createElement(y,a()({key:t},e))})):"Loading lore entries..."))}}]),n}(p.Component)}}]);