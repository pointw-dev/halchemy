import{_ as h,D as l,c as o,I as i,w as a,l as e,a as t,ab as d,o as u}from"./chunks/framework.BPd51-yL.js";const S=JSON.parse('{"title":"Configuration Properties","description":"","frontmatter":{"aside":false},"headers":[],"relativePath":"guide/configuration/properties.md","filePath":"guide/configuration/properties.md"}'),p={name:"guide/configuration/properties.md"},c=e("h1",{id:"configuration-properties",tabindex:"-1"},[t("Configuration Properties "),e("a",{class:"header-anchor",href:"#configuration-properties","aria-label":'Permalink to "Configuration Properties"'},"​")],-1),k=e("p",null,[t("Halchemy takes a batteries-included approach to configuration. It starts with sensible defaults, and allows you to configure everything the way you like. This page shows you what you can change, and the "),e("a",{href:"./changing.html"},"next page"),t(" show you how you can change them.")],-1),g=e("p",null,[t("The "),e("code",null,"Api"),t(" object gives you the following configuration properties:")],-1),y=e("table",null,[e("thead",null,[e("tr",null,[e("th",null,"Setting"),e("th",null,"Description"),e("th",null,"Default")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("code",null,"base_url")]),e("td",null,"The base URL to the API you are working with. This default matches the default URL for a hypermea API running locally"),e("td",null,[e("code",null,"http://localhost:2112")])]),e("tr",null,[e("td",null,[e("code",null,"parameters_list_style")]),e("td",null,[t("When creating a query string, this setting determines how lists are serialzied. The options are:"),e("br"),e("code",null,"repeat_key"),t(", "),e("code",null,"bracket"),t(", "),e("code",null,"index"),t(", "),e("code",null,"comma"),t(", "),e("code",null,"pipe"),e("br"),t("See "),e("a",{href:"/halchemy/guide/parameters/passing.html"},"Query String Parameters"),t(" for more details.")]),e("td",null,[e("code",null,"repeat_key")])]),e("tr",null,[e("td",null,[e("code",null,"etag_field")]),e("td",null,[t("This is the field used to populate "),e("code",null,"If-Match"),t(" on a change request if ETag header is missing. This default is tuned for use with a hypermea API."),e("br"),t("See "),e("a",{href:"/halchemy/guide/concurrency/using.html"},"Optimistic Concurrency"),t(" for more details.")]),e("td",null,[e("code",null,"_etag")])]),e("tr",null,[e("td",null,[e("code",null,"headers")]),e("td",null,[t("A set of default headers to include with each request. You can use this API property directly, and there are helper functions too."),e("br"),t("See "),e("a",{href:"/halchemy/guide/headers/request.html"},"Request Headers"),t(" for more details.")]),e("td",null,[t("("),e("a",{href:"#default-headers"},"details below"),t(")")])]),e("tr",null,[e("td",null,[e("code",null,"error_handling")]),e("td",null,[t("Determines when exceptions are thrown/raised. There are two properties: "),e("br"),e("code",null,"raise_for_network_errors"),e("br"),e("code",null,"raise_for_status_codes")]),e("td",null,[t("("),e("a",{href:"#default-error-handling"},"details below"),t(")")])])])],-1),f=e("table",null,[e("thead",null,[e("tr",null,[e("th",null,"Setting"),e("th",null,"Description"),e("th",null,"Default")])]),e("tbody",null,[e("tr",null,[e("td",null,[e("code",null,"baseUrl")]),e("td",null,"The base URL to the API you are working with. This default matches the default URL for a hypermea API running locally"),e("td",null,[e("code",null,"http://localhost:2112")])]),e("tr",null,[e("td",null,[e("code",null,"parametersListStyle")]),e("td",null,[t("When creating a query string, this setting determines how lists are serialzied. The options are:"),e("br"),e("code",null,"repeat_key"),t(", "),e("code",null,"bracket"),t(", "),e("code",null,"index"),t(", "),e("code",null,"comma"),t(", "),e("code",null,"pipe"),e("br"),t("See "),e("a",{href:"/halchemy/guide/parameters/passing.html"},"Query String Parameters"),t(" for more details.")]),e("td",null,[e("code",null,"repeat_key")])]),e("tr",null,[e("td",null,[e("code",null,"etagField")]),e("td",null,[t("This is the field used to populate "),e("code",null,"If-Match"),t(" on a change request if ETag header is missing. This default is tuned for use with a hypermea API."),e("br"),t("See "),e("a",{href:"/halchemy/guide/concurrency/using.html"},"Optimistic Concurrency"),t(" for more details.")]),e("td",null,[e("code",null,"_etag")])]),e("tr",null,[e("td",null,[e("code",null,"headers")]),e("td",null,[t("A set of default headers to include with each request. You can use this API property directly, and there are helper functions too."),e("br"),t("See "),e("a",{href:"/halchemy/guide/headers/request.html"},"Request Headers"),t(" for more details.")]),e("td",null,[t("("),e("a",{href:"#default-headers"},"details below"),t(")")])]),e("tr",null,[e("td",null,[e("code",null,"errorHandling")]),e("td",null,[t("Determines when exceptions are thrown/raised. There are two properties: "),e("br"),e("code",null,"raiseForNetworkErrors"),e("br"),e("code",null,"raiseForStatusCodes")]),e("td",null,[t("("),e("a",{href:"#default-error-handling"},"details below"),t(")")])])])],-1),m=d(`<h2 id="default-headers" tabindex="-1">Default Headers <a class="header-anchor" href="#default-headers" aria-label="Permalink to &quot;Default Headers&quot;">​</a></h2><p>These are the headers that by default are sent with every request:</p><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span>Content-type: application/json</span></span>
<span class="line"><span>Accept: application/hal+json, application/json;q=0.9, */*;q=0.8</span></span>
<span class="line"><span>Authorization: Basic cm9vdDpwYXNzd29yZA==</span></span></code></pre></div><p>See the <a href="/halchemy/guide/headers/request.html">Request Headers</a> page for more details.</p><h2 id="default-error-handling" tabindex="-1">Default Error Handling <a class="header-anchor" href="#default-error-handling" aria-label="Permalink to &quot;Default Error Handling&quot;">​</a></h2><p>There are two settings for <code>error handling</code>. Here are their defaults:</p>`,6),E=e("div",{class:"language-python vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"python"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," halchemy "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api")]),t(`
`),e("span",{class:"line"}),t(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api("),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://example.org/api'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),t(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"print"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(api.error_handling.raise_on_network_failure)  "),e("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# True")]),t(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"print"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(api.error_handling.raise_on_status_codes)     "),e("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# None")])])])],-1),_=e("div",{class:"language-javascript vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"javascript"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {"),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Api"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"} "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," require"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'halchemy'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),t(`
`),e("span",{class:"line"}),t(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," api"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," new"),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Api"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://example.org/api'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),t(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"console."),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(api.errorHandling.raiseOnNetworkFailure)  "),e("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"// true")]),t(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"console."),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(api.errorHandling.raiseOnStatusCodes)     "),e("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"// null")])])])],-1),b=e("p",null,[t("See the "),e("a",{href:"/halchemy/guide/errors/handling.html"},"Handling Errors"),t(" page for more details.")],-1);function w(A,F,C,D,T,v){const s=l("tab"),n=l("future-languages"),r=l("tabs");return u(),o("div",null,[c,k,g,i(r,null,{default:a(()=>[i(s,{name:"Python"},{default:a(()=>[y]),_:1}),i(s,{name:"JavaScript"},{default:a(()=>[f]),_:1}),i(n)]),_:1}),m,i(r,null,{default:a(()=>[i(s,{name:"Python"},{default:a(()=>[E]),_:1}),i(s,{name:"JavaScript"},{default:a(()=>[_]),_:1}),i(n)]),_:1}),b])}const q=h(p,[["render",w]]);export{S as __pageData,q as default};