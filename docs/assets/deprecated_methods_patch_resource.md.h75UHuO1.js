import{_ as h,y as s,a as d,G as t,w as a,aa as r,o as n,h as e}from"./chunks/framework.o1OYiBFT.js";const v=JSON.parse('{"title":"PATCH resource","description":"","frontmatter":{},"headers":[{"level":2,"title":"Signature","slug":"signature","link":"#signature","children":[]},{"level":2,"title":"Examples","slug":"examples","link":"#examples","children":[]}],"relativePath":"deprecated/methods/patch_resource.md","filePath":"deprecated/methods/patch_resource.md"}'),c={name:"deprecated/methods/patch_resource.md"},p=r('<h1 id="patch-resource" tabindex="-1">PATCH resource <a class="header-anchor" href="#patch-resource" aria-label="Permalink to &quot;PATCH resource&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This API is frozen and deprecated. Please use the fluent API from 0.9.4 on</p></div><p>Sends a PATCH request with data to the resource&#39;s <code>self</code> rel.</p><blockquote><p>Note, you should handle exceptions thrown by the request. See [Optimistic Concurrency] for more details.</p></blockquote><h2 id="signature" tabindex="-1">Signature <a class="header-anchor" href="#signature" aria-label="Permalink to &quot;Signature&quot;">​</a></h2><p>The method signature for <strong>PATCH resource</strong> is:</p>',6),k=e("div",{class:"language-python vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"python"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"patch_resource(resource, data: "),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"JSON"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", headers: dict["),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"str"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", Any] "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"|"),e("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}}," None"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," None"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},") "),e("span",{style:{"--shiki-light":"#B31D28","--shiki-dark":"#FDAEB7","--shiki-light-font-style":"italic","--shiki-dark-font-style":"italic"}},"->"),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," JSON")])])])],-1),u=e("blockquote",null,[e("p",null,[e("code",null,'JSON: TypeAlias = dict[str, "JSON"] | list["JSON"] | str | int | float | bool | None')])],-1),_=e("div",{class:"language-javascript vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"javascript"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"patchResource"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(resource:HalResource, data:{}, headers "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {}): "),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Promise"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"<"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"any"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},">")])])])],-1),g=r('<table><thead><tr><th>parameter</th><th>description</th></tr></thead><tbody><tr><td><code>resource</code></td><td>The body of a response from a previous request, in HAL format</td></tr><tr><td><code>data</code></td><td>The payload to PATCH</td></tr><tr><td><code>headers</code></td><td>(optional) add to or override the default headers.<br><a href="/deprecated/headers.html">learn more</a></td></tr><tr><td>-&gt; <em>returns</em></td><td>the JSON from the payload of the response to this request</td></tr></tbody></table><h2 id="examples" tabindex="-1">Examples <a class="header-anchor" href="#examples" aria-label="Permalink to &quot;Examples&quot;">​</a></h2>',2);function m(y,E,f,b,C,A){const i=s("tab"),o=s("future-languages"),l=s("tabs");return n(),d("div",null,[p,t(l,null,{default:a(()=>[t(i,{name:"Python"},{default:a(()=>[k,u]),_:1}),t(i,{name:"JavaScript"},{default:a(()=>[_]),_:1}),t(o)]),_:1}),g])}const F=h(c,[["render",m]]);export{v as __pageData,F as default};
