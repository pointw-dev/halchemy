import{_ as d,C as s,c as p,o as m,a7 as o,G as a,w as i,j as e,a as r}from"./chunks/framework.hQ1v-34E.js";const E=JSON.parse('{"title":"URL from rel","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://pointw-dev.github.io/halchemy/deprecated/methods/url_from_rel.html"}]]},"headers":[],"relativePath":"deprecated/methods/url_from_rel.md","filePath":"deprecated/methods/url_from_rel.md"}'),c={name:"deprecated/methods/url_from_rel.md"};function k(u,t,f,_,g,b){const l=s("tab"),h=s("future-languages"),n=s("tabs");return m(),p("div",null,[t[2]||(t[2]=o('<h1 id="url-from-rel" tabindex="-1">URL from rel <a class="header-anchor" href="#url-from-rel" aria-label="Permalink to &quot;URL from rel&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This API is frozen and deprecated. Please use the fluent API from 0.9.4 on</p></div><p>This method is used internally to resolve a resource&#39;s rel, with parameters and templates, into a URL to follow. It is available as a public method in the unlikely event you need to build URLs in a similar fashion.</p><h2 id="signature" tabindex="-1">Signature <a class="header-anchor" href="#signature" aria-label="Permalink to &quot;Signature&quot;">​</a></h2><p>The method signature for <strong>URL from rel</strong> is:</p>',5)),a(n,null,{default:i(()=>[a(l,{name:"Python"},{default:i(()=>t[0]||(t[0]=[e("div",{class:"language-python vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"python"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"@"),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"staticmethod")]),r(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"url_from_rel(resource, rel, "),e("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}},"parameters"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"{}, "),e("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}},"template"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"{}) "),e("span",{style:{"--shiki-light":"#B31D28","--shiki-light-font-style":"italic","--shiki-dark":"#FDAEB7","--shiki-dark-font-style":"italic"}},"->"),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," str")])])])],-1)])),_:1}),a(l,{name:"JavaScript"},{default:i(()=>t[1]||(t[1]=[e("div",{class:"language-javascript vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"javascript"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code",tabindex:"0"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"urlFromRel"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({resource, rel, parameters "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {}, template "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {}}: RelSpec): string")])])])],-1),e("blockquote",null,[e("p",null,[r("With JavaScript, the first four parameters are actually members of one parameter of type "),e("code",null,"RelSpec"),r(", with each being a member of that object.")])],-1)])),_:1}),a(h)]),_:1}),t[3]||(t[3]=o('<table tabindex="0"><thead><tr><th>parameter</th><th>description</th></tr></thead><tbody><tr><td><code>resource</code></td><td>The body of a response from a previous request, in HAL format</td></tr><tr><td><code>rel</code></td><td>The name of the link relation.</td></tr><tr><td><code>parameters</code></td><td>(optional) name/value pairs which will be used to create a query string.<br><a href="/halchemy/deprecated/parameters.html">[learn more]</a></td></tr><tr><td><code>template</code></td><td>(optional) if the link is templated, name/value pairs to fill the template.<br><a href="/halchemy/deprecated/templates.html">[learn more]</a></td></tr><tr><td>-&gt; <em>returns</em></td><td>the URL</td></tr></tbody></table><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2>',2))])}const v=d(c,[["render",k]]);export{E as __pageData,v as default};
