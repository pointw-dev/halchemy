import{X as _e,d as Le,D as z,aq as ue,f as K,r as A,ar as Ce,as as Be,m as De,l as de,at as Ae,g as J,Q as $,P as F,au as $e,av as Ee,W as Pe,a3 as He,o as w,c as Ve,h as t,a0 as Ie,i as r,B as Re,aw as je,ax as Oe,a as T,A as he,b as N,z as ve,F as pe,J as E,t as P,ay as ze,p as Ke,j as Fe,az as fe,aA as Ne,af as Ue,V as qe,_ as Qe}from"./framework.o1OYiBFT.js";import{l as We,u as Je,M as Xe,a as Ze}from"./index.B7C_WfyG.js";import{s as me,u as Ge,c as Ye,e as et}from"./theme.-ZfZrMcx.js";class tt{constructor(s=10){this.max=s,this.cache=new Map}get(s){let h=this.cache.get(s);return h!==void 0&&(this.cache.delete(s),this.cache.set(s,h)),h}set(s,h){this.cache.has(s)?this.cache.delete(s):this.cache.size===this.max&&this.cache.delete(this.first()),this.cache.set(s,h)}first(){return this.cache.keys().next().value}clear(){this.cache.clear()}}function at(S){let s=S.replace(/\.html$/,"");if(s=decodeURIComponent(s),s=s.replace(/\/$/,"/index"),_e){const h="/";s=me(s.slice(h.length).replace(/\//g,"_")||"index")+".md";let x=__VP_HASH_MAP__[s.toLowerCase()];return x||(s=s.endsWith("_index.md")?s.slice(0,-9)+".md":s.slice(0,-3)+"_index.md",x=__VP_HASH_MAP__[s.toLowerCase()]),x?`${h}assets/${s}.${x}.js`:null}return`./${me(s.slice(1).replace(/\//g,"_"))}.md.js`}const m=S=>(Ke("data-v-218e7cd3"),S=S(),Fe(),S),st=["aria-owns"],ot={class:"shell"},lt=["title"],rt=m(()=>t("svg",{class:"search-icon",width:"18",height:"18",viewBox:"0 0 24 24","aria-hidden":"true"},[t("g",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"},[t("circle",{cx:"11",cy:"11",r:"8"}),t("path",{d:"m21 21l-4.35-4.35"})])],-1)),nt=[rt],it={class:"search-actions before"},ct=["title"],ut=m(()=>t("svg",{width:"18",height:"18",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M19 12H5m7 7l-7-7l7-7"})],-1)),dt=[ut],ht=["placeholder"],vt={class:"search-actions"},pt=["title"],ft=m(()=>t("svg",{width:"18",height:"18",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M3 14h7v7H3zM3 3h7v7H3zm11 1h7m-7 5h7m-7 6h7m-7 5h7"})],-1)),mt=[ft],_t=["disabled","title"],bt=m(()=>t("svg",{width:"18",height:"18",viewBox:"0 0 24 24","aria-hidden":"true"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M20 5H9l-7 7l7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-2 4l-6 6m0-6l6 6"})],-1)),gt=[bt],kt=["id","role","aria-labelledby"],wt=["aria-selected"],xt=["href","aria-label","onMouseenter","onFocusin"],yt={class:"titles"},Tt=m(()=>t("span",{class:"title-icon"},"#",-1)),St=["innerHTML"],Mt=m(()=>t("svg",{width:"18",height:"18",viewBox:"0 0 24 24"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m9 18l6-6l-6-6"})],-1)),Lt={class:"title main"},Ct=["innerHTML"],Bt={key:0,class:"excerpt-wrapper"},Dt={key:0,class:"excerpt",inert:""},At=["innerHTML"],$t=m(()=>t("div",{class:"excerpt-gradient-bottom"},null,-1)),Et=m(()=>t("div",{class:"excerpt-gradient-top"},null,-1)),Pt={key:0,class:"no-results"},Ht={class:"search-keyboard-shortcuts"},Vt=["aria-label"],It=m(()=>t("svg",{width:"14",height:"14",viewBox:"0 0 24 24"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 19V5m-7 7l7-7l7 7"})],-1)),Rt=[It],jt=["aria-label"],Ot=m(()=>t("svg",{width:"14",height:"14",viewBox:"0 0 24 24"},[t("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M12 5v14m7-7l-7 7l-7-7"})],-1)),zt=[Ot],Kt=["aria-label"],Ft=m(()=>t("svg",{width:"14",height:"14",viewBox:"0 0 24 24"},[t("g",{fill:"none",stroke:"currentcolor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2"},[t("path",{d:"m9 10l-5 5l5 5"}),t("path",{d:"M20 4v7a4 4 0 0 1-4 4H4"})])],-1)),Nt=[Ft],Ut=["aria-label"],qt=Le({__name:"VPLocalSearchBox",emits:["close"],setup(S,{emit:s}){var te,ae;const h=s,x=z(),H=z(),be=z(We),V=Ge(),{activate:ge}=Je(x,{immediate:!0,allowOutsideClick:!0,clickOutsideDeactivates:!0,escapeDeactivates:!0}),{localeIndex:X,theme:i}=V,ke=ue(async()=>{var e,a,l,v,_,u,o,d,g;return fe(Xe.loadJSON((l=await((a=(e=be.value)[X.value])==null?void 0:a.call(e)))==null?void 0:l.default,{fields:["title","titles","text"],storeFields:["title","titles"],searchOptions:{fuzzy:.2,prefix:!0,boost:{title:4,text:2,titles:1},...((v=i.value.search)==null?void 0:v.provider)==="local"&&((u=(_=i.value.search.options)==null?void 0:_.miniSearch)==null?void 0:u.searchOptions)},...((o=i.value.search)==null?void 0:o.provider)==="local"&&((g=(d=i.value.search.options)==null?void 0:d.miniSearch)==null?void 0:g.options)}))}),b=K(()=>{var e,a;return((e=i.value.search)==null?void 0:e.provider)==="local"&&((a=i.value.search.options)==null?void 0:a.disableQueryPersistence)===!0}).value?A(""):Ce("vitepress:local-search-filter",""),B=Be("vitepress:local-search-detailed-list",((te=i.value.search)==null?void 0:te.provider)==="local"&&((ae=i.value.search.options)==null?void 0:ae.detailedView)===!0),Z=K(()=>{var e,a,l;return((e=i.value.search)==null?void 0:e.provider)==="local"&&(((a=i.value.search.options)==null?void 0:a.disableDetailedView)===!0||((l=i.value.search.options)==null?void 0:l.detailedView)===!1)}),G=K(()=>{var a,l,v,_,u,o,d;const e=((a=i.value.search)==null?void 0:a.options)??i.value.algolia;return((u=(_=(v=(l=e==null?void 0:e.locales)==null?void 0:l[X.value])==null?void 0:v.translations)==null?void 0:_.button)==null?void 0:u.buttonText)??((d=(o=e==null?void 0:e.translations)==null?void 0:o.button)==null?void 0:d.buttonText)??"Search"});De(()=>{Z.value&&(B.value=!1)});const n=z([]),U=A(!1);de(b,()=>{U.value=!1});const Y=ue(async()=>{if(H.value)return fe(new Ze(H.value))},null),I=new tt(16);Ae(()=>[ke.value,b.value,B.value],async([e,a,l],v,_)=>{var j,se,oe,le;(v==null?void 0:v[0])!==e&&I.clear();let u=!1;if(_(()=>{u=!0}),!e)return;n.value=e.search(a).slice(0,16),U.value=!0;const o=l?await Promise.all(n.value.map(p=>we(p.id))):[];if(u)return;for(const{id:p,mod:M}of o){const L=p.slice(0,p.indexOf("#"));let y=I.get(L);if(y)continue;y=new Map,I.set(L,y);const k=M.default??M;if(k!=null&&k.render||k!=null&&k.setup){const C=Ne(k);C.config.warnHandler=()=>{},C.provide(Ue,V),Object.defineProperties(C.config.globalProperties,{$frontmatter:{get(){return V.frontmatter.value}},$params:{get(){return V.page.value.params}}});const re=document.createElement("div");C.mount(re),re.querySelectorAll("h1, h2, h3, h4, h5, h6").forEach(D=>{var ce;const O=(ce=D.querySelector("a"))==null?void 0:ce.getAttribute("href"),ne=(O==null?void 0:O.startsWith("#"))&&O.slice(1);if(!ne)return;let ie="";for(;(D=D.nextElementSibling)&&!/^h[1-6]$/i.test(D.tagName);)ie+=D.outerHTML;y.set(ne,ie)}),C.unmount()}if(u)return}const d=new Set;if(n.value=n.value.map(p=>{const[M,L]=p.id.split("#"),y=I.get(M),k=(y==null?void 0:y.get(L))??"";for(const C in p.match)d.add(C);return{...p,text:k}}),await $(),u)return;await new Promise(p=>{var M;(M=Y.value)==null||M.unmark({done:()=>{var L;(L=Y.value)==null||L.markRegExp(Me(d),{done:p})}})});const g=((j=x.value)==null?void 0:j.querySelectorAll(".result .excerpt"))??[];for(const p of g)(se=p.querySelector('mark[data-markjs="true"]'))==null||se.scrollIntoView({block:"center"});(le=(oe=H.value)==null?void 0:oe.firstElementChild)==null||le.scrollIntoView({block:"start"})},{debounce:200,immediate:!0});async function we(e){const a=at(e.slice(0,e.indexOf("#")));try{if(!a)throw new Error(`Cannot find file for id: ${e}`);return{id:e,mod:await qe(()=>import(a),[])}}catch(l){return console.error(l),{id:e,mod:{}}}}const q=A(),xe=K(()=>{var e;return((e=b.value)==null?void 0:e.length)<=0});function Q(e=!0){var a,l;(a=q.value)==null||a.focus(),e&&((l=q.value)==null||l.select())}J(()=>{Q()});function ye(e){e.pointerType==="mouse"&&Q()}const c=A(-1),R=A(!1);de(n,e=>{c.value=e.length?0:-1,W()});function W(){$(()=>{const e=document.querySelector(".result.selected");e&&e.scrollIntoView({block:"nearest"})})}F("ArrowUp",e=>{e.preventDefault(),c.value--,c.value<0&&(c.value=n.value.length-1),R.value=!0,W()}),F("ArrowDown",e=>{e.preventDefault(),c.value++,c.value>=n.value.length&&(c.value=0),R.value=!0,W()});const Te=$e();F("Enter",e=>{if(e.isComposing||e.target instanceof HTMLButtonElement&&e.target.type!=="submit")return;const a=n.value[c.value];if(e.target instanceof HTMLInputElement&&!a){e.preventDefault();return}a&&(Te.go(a.id),h("close"))}),F("Escape",()=>{h("close")});const f=Ye({modal:{displayDetails:"Display detailed list",resetButtonTitle:"Reset search",backButtonTitle:"Close search",noResultsText:"No results for",footer:{selectText:"to select",selectKeyAriaLabel:"enter",navigateText:"to navigate",navigateUpKeyAriaLabel:"up arrow",navigateDownKeyAriaLabel:"down arrow",closeText:"to close",closeKeyAriaLabel:"escape"}}});J(()=>{window.history.pushState(null,"",null)}),Ee("popstate",e=>{e.preventDefault(),h("close")});const ee=Pe(_e?document.body:null);J(()=>{$(()=>{ee.value=!0,$().then(()=>ge())})}),He(()=>{ee.value=!1});function Se(){b.value="",$().then(()=>Q(!1))}function Me(e){return new RegExp([...e].sort((a,l)=>l.length-a.length).map(a=>`(${et(a)})`).join("|"),"gi")}return(e,a)=>{var l,v,_,u;return w(),Ve(ze,{to:"body"},[t("div",{ref_key:"el",ref:x,role:"button","aria-owns":(l=n.value)!=null&&l.length?"localsearch-list":void 0,"aria-expanded":"true","aria-haspopup":"listbox","aria-labelledby":"localsearch-label",class:"VPLocalSearchBox"},[t("div",{class:"backdrop",onClick:a[0]||(a[0]=o=>e.$emit("close"))}),t("div",ot,[t("form",{class:"search-bar",onPointerup:a[4]||(a[4]=o=>ye(o)),onSubmit:a[5]||(a[5]=Ie(()=>{},["prevent"]))},[t("label",{title:G.value,id:"localsearch-label",for:"localsearch-input"},nt,8,lt),t("div",it,[t("button",{class:"back-button",title:r(f)("modal.backButtonTitle"),onClick:a[1]||(a[1]=o=>e.$emit("close"))},dt,8,ct)]),Re(t("input",{ref_key:"searchInput",ref:q,"onUpdate:modelValue":a[2]||(a[2]=o=>Oe(b)?b.value=o:null),placeholder:G.value,id:"localsearch-input","aria-labelledby":"localsearch-label",class:"search-input"},null,8,ht),[[je,r(b)]]),t("div",vt,[Z.value?N("",!0):(w(),T("button",{key:0,class:he(["toggle-layout-button",{"detailed-list":r(B)}]),type:"button",title:r(f)("modal.displayDetails"),onClick:a[3]||(a[3]=o=>c.value>-1&&(B.value=!r(B)))},mt,10,pt)),t("button",{class:"clear-button",type:"reset",disabled:xe.value,title:r(f)("modal.resetButtonTitle"),onClick:Se},gt,8,_t)])],32),t("ul",{ref_key:"resultsEl",ref:H,id:(v=n.value)!=null&&v.length?"localsearch-list":void 0,role:(_=n.value)!=null&&_.length?"listbox":void 0,"aria-labelledby":(u=n.value)!=null&&u.length?"localsearch-label":void 0,class:"results",onMousemove:a[7]||(a[7]=o=>R.value=!1)},[(w(!0),T(pe,null,ve(n.value,(o,d)=>(w(),T("li",{key:o.id,role:"option","aria-selected":c.value===d?"true":"false"},[t("a",{href:o.id,class:he(["result",{selected:c.value===d}]),"aria-label":[...o.titles,o.title].join(" > "),onMouseenter:g=>!R.value&&(c.value=d),onFocusin:g=>c.value=d,onClick:a[6]||(a[6]=g=>e.$emit("close"))},[t("div",null,[t("div",yt,[Tt,(w(!0),T(pe,null,ve(o.titles,(g,j)=>(w(),T("span",{key:j,class:"title"},[t("span",{class:"text",innerHTML:g},null,8,St),Mt]))),128)),t("span",Lt,[t("span",{class:"text",innerHTML:o.title},null,8,Ct)])]),r(B)?(w(),T("div",Bt,[o.text?(w(),T("div",Dt,[t("div",{class:"vp-doc",innerHTML:o.text},null,8,At)])):N("",!0),$t,Et])):N("",!0)])],42,xt)],8,wt))),128)),r(b)&&!n.value.length&&U.value?(w(),T("li",Pt,[E(P(r(f)("modal.noResultsText"))+' "',1),t("strong",null,P(r(b)),1),E('" ')])):N("",!0)],40,kt),t("div",Ht,[t("span",null,[t("kbd",{"aria-label":r(f)("modal.footer.navigateUpKeyAriaLabel")},Rt,8,Vt),t("kbd",{"aria-label":r(f)("modal.footer.navigateDownKeyAriaLabel")},zt,8,jt),E(" "+P(r(f)("modal.footer.navigateText")),1)]),t("span",null,[t("kbd",{"aria-label":r(f)("modal.footer.selectKeyAriaLabel")},Nt,8,Kt),E(" "+P(r(f)("modal.footer.selectText")),1)]),t("span",null,[t("kbd",{"aria-label":r(f)("modal.footer.closeKeyAriaLabel")},"esc",8,Ut),E(" "+P(r(f)("modal.footer.closeText")),1)])])])],8,st)])}}}),Yt=Qe(qt,[["__scopeId","data-v-218e7cd3"]]);export{Yt as default};
