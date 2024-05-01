import{_ as d,y as s,a as c,G as a,w as i,h as t,J as e,aa as n,o as p}from"./chunks/framework.o1OYiBFT.js";const w=JSON.parse('{"title":"Query String Parameters","description":"","frontmatter":{"aside":false},"headers":[{"level":2,"title":"Parameters List Styles","slug":"parameters-list-styles","link":"#parameters-list-styles","children":[]}],"relativePath":"guide/parameters/list-style.md","filePath":"guide/parameters/list-style.md"}'),h={name:"guide/parameters/list-style.md"},m=t("h1",{id:"query-string-parameters",tabindex:"-1"},[e("Query String Parameters "),t("a",{class:"header-anchor",href:"#query-string-parameters","aria-label":'Permalink to "Query String Parameters"'},"​")],-1),u=t("h2",{id:"parameters-list-styles",tabindex:"-1"},[e("Parameters List Styles "),t("a",{class:"header-anchor",href:"#parameters-list-styles","aria-label":'Permalink to "Parameters List Styles"'},"​")],-1),y=t("p",null,[e("If you want to pass a list/array as a query string parameter, there is no universally accepted way to do this. By default, halchemy will serialize the list as multiple parameters with the same name. For example, "),t("code",null,'{"list":["a","b","c"]}'),e(" will be serialized as "),t("code",null,"list=a&list=b&list=c"),e(". You can change how lists are serialized by setting the "),t("code",null,"parameters list style"),e(".")],-1),_=t("div",{class:"language-python vp-adaptive-theme"},[t("button",{title:"Copy Code",class:"copy"}),t("span",{class:"lang"},"python"),t("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api.parameters_list_style "),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," 'comma'")])])])],-1),g=t("div",{class:"language-javascript vp-adaptive-theme"},[t("button",{title:"Copy Code",class:"copy"}),t("span",{class:"lang"},"javascript"),t("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api.parameterslistStyle "),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," 'comma'")])])])],-1),k=n("<p>Given this parameters object: <code>{&quot;list&quot;:[&quot;a&quot;,&quot;b&quot;,&quot;c&quot;]}</code>, each parameters list style serializes it to the query string as follows:</p><table><thead><tr><th>Style</th><th>Query String</th></tr></thead><tbody><tr><td><code>repeat_key</code> (default)</td><td><code>list=a&amp;list=b&amp;list=c</code></td></tr><tr><td><code>bracket</code></td><td><code>list[]=a&amp;list[]=b&amp;list[]=c</code></td></tr><tr><td><code>index</code></td><td><code>list[0]=a&amp;list[1]=b&amp;list[2]=c</code></td></tr><tr><td><code>comma</code></td><td><code>list=a,b,c</code></td></tr><tr><td><code>pipe</code></td><td><code>list=a|b|c</code></td></tr></tbody></table>",2);function b(f,v,S,P,q,E){const l=s("tab"),r=s("future-languages"),o=s("tabs");return p(),c("div",null,[m,u,y,a(o,null,{default:i(()=>[a(l,{name:"Python"},{default:i(()=>[_]),_:1}),a(l,{name:"JavaScript"},{default:i(()=>[g]),_:1}),a(r)]),_:1}),k])}const x=d(h,[["render",b]]);export{w as __pageData,x as default};
