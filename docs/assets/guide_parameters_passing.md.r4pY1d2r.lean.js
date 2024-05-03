import{_ as n,D as a,c as o,I as s,w as i,l as t,a as e,aa as h,o as d}from"./chunks/framework.B-_8KZRP.js";const A=JSON.parse('{"title":"Query String Parameters","description":"","frontmatter":{"aside":false},"headers":[],"relativePath":"guide/parameters/passing.md","filePath":"guide/parameters/passing.md"}'),k={name:"guide/parameters/passing.md"},c=t("h1",{id:"query-string-parameters",tabindex:"-1"},[e("Query String Parameters "),t("a",{class:"header-anchor",href:"#query-string-parameters","aria-label":'Permalink to "Query String Parameters"'},"​")],-1),u=t("p",null,[e("When you need to add query string parameters to the URL of a request, halchemy makes it easy. You use the "),t("code",null,"with parameters"),e(" method. This method takes a dictionary/object of parameters and their values. Here are some examples:")],-1),g=t("div",{class:"language-python vp-adaptive-theme"},[t("button",{title:"Copy Code",class:"copy"}),t("span",{class:"lang"},"python"),t("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"root "),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.root.get()")]),e(`
`),t("span",{class:"line"}),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# get the first page of customers, 100 per page")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customers "),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.follow(root).to("),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'customers'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},").with_parameters({"),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'max_results'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":"),t("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"100"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},","),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'page'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":"),t("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}).get()")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# adds ?max_results=100&page=1 to the URL")])])])],-1),E=t("div",{class:"language-javascript vp-adaptive-theme"},[t("button",{title:"Copy Code",class:"copy"}),t("span",{class:"lang"},"javascript"),t("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),t("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," root"),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.root."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),e(`
`),t("span",{class:"line"}),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"// get the first page of customers, 100 per page")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"let"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," customers "),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"follow"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(root)")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"to"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'customers'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"withParameters"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({ max_results: "),t("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"100"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", page: "),t("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"1"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," })")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),e(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"// adds ?max_results=100&page=1 to the URL")])])])],-1),m=h("",5);function y(q,b,_,F,f,S){const r=a("tab"),l=a("future-languages"),p=a("tabs");return d(),o("div",null,[c,u,s(p,null,{default:i(()=>[s(r,{name:"Python"},{default:i(()=>[g]),_:1}),s(r,{name:"JavaScript"},{default:i(()=>[E]),_:1}),s(l)]),_:1}),m])}const D=n(k,[["render",y]]);export{A as __pageData,D as default};