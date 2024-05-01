import{_ as r,y as e,a as d,G as s,w as a,aa as l,o as h,h as t,J as i}from"./chunks/framework.o1OYiBFT.js";const C=JSON.parse('{"title":"Templated Links","description":"","frontmatter":{"aside":false},"headers":[],"relativePath":"guide/templates/using.md","filePath":"guide/templates/using.md"}'),u={name:"guide/templates/using.md"},k=l(`<h1 id="templated-links" tabindex="-1">Templated Links <a class="header-anchor" href="#templated-links" aria-label="Permalink to &quot;Templated Links&quot;">​</a></h1><p>One of the features of HAL is the ability to use templated links. These are links whose href has one or more placeholders that you can fill in with values. For example, an <code>orders</code> collection resource may have the following links:</p><div class="language-json vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">json</span><pre class="shiki shiki-themes github-light github-dark vp-code"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">{</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">  &quot;_links&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;self&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;href&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/orders&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    },</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">    &quot;item&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: {</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;href&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;/orders/{order_number}&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">      &quot;templated&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">true</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  }</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>With halchemy you supply values for the template placeholders using <code>with template values</code>:</p>`,4),c=t("div",{class:"language-python vp-adaptive-theme"},[t("button",{title:"Copy Code",class:"copy"}),t("span",{class:"lang"},"python"),t("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"order "),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.follow("),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'orders'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},").to("),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'item'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},").with_template_values({"),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'order_number'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'XH123'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}).get()")])])])],-1),q=t("div",{class:"language-javascript vp-adaptive-theme"},[t("button",{title:"Copy Code",class:"copy"}),t("span",{class:"lang"},"javascript"),t("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[t("code",null,[t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),t("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," order"),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),t("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"follow"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'orders'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"to"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'item'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"withTemplateValues"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({order_number: "),t("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'XH123'"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),i(`
`),t("span",{class:"line"},[t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),t("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),t("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"();")])])])],-1),E=l(`<p>If you do not supply a value for a template placeholder, the placeholder is simply removed.</p><p>The syntax for templated links is specified in <a href="https://datatracker.ietf.org/doc/html/rfc6570" target="_blank" rel="noreferrer">RFC 6570</a> and is very expressive. Here are some sample templates, and what the URL looks like when filled with these values:</p><table><tr><td class="header">Templated URL</td><td class="header">Values</td><td class="header">Resulting URL</td></tr><tr><td><pre class="tableSnippet">/path/{foo}</pre></td><td><pre class="tableSnippet">{&quot;foo&quot;:&quot;321&quot;}</pre></td><td><pre class="tableSnippet">/path/321</pre></td></tr><tr><td><pre class="tableSnippet">/has/{foo}/multiples/{bar}</pre></td><td><pre class="tableSnippet">{
  &quot;foo&quot;:&quot;value&quot;,
  &quot;bar&quot;:&quot;value&quot;
}</pre></td><td><pre class="tableSnippet">/has/value/multiples/value</pre></td></tr><tr><td><pre class="tableSnippet">/orders{?id}</pre></td><td><pre class="tableSnippet">{&quot;id&quot;:&quot;123&quot;}</pre></td><td><pre class="tableSnippet">/orders?id=123</pre></td></tr><tr><td><pre class="tableSnippet">/search{?query,type}</pre></td><td><pre class="tableSnippet">{
  &quot;query&quot;:&quot;hal&quot;,
  &quot;type&quot;:&quot;specification&quot;
}</pre></td><td><pre class="tableSnippet">/search?query=hal&amp;type=specification</pre></td></tr><tr><td><pre class="tableSnippet">/items/{itemId}{?lang,format}</pre></td><td><pre class="tableSnippet">{
  &quot;itemId&quot;:&quot;42&quot;,
  &quot;lang&quot;:&quot;en&quot;,
  &quot;format&quot;:&quot;json&quot;
}</pre></td><td><pre class="tableSnippet">/items/42?lang=en&amp;format=json</pre></td></tr><tr><td><pre class="tableSnippet">/country/{countryCode}/cities{?page,limit}</pre></td><td><pre class="tableSnippet">{
  &quot;countryCode&quot;:&quot;US&quot;,
  &quot;page&quot;:&quot;1&quot;,
  &quot;limit&quot;:&quot;10&quot;
}</pre></td><td><pre class="tableSnippet">/country/US/cities?page=1&amp;limit=10</pre></td></tr><tr><td><pre class="tableSnippet">/profile/{userId}{?fields}</pre></td><td><pre class="tableSnippet">{
  &quot;userId&quot;:&quot;789&quot;,
  &quot;fields&quot;:&quot;name,age&quot;
}</pre></td><td><pre class="tableSnippet">/profile/789?fields=name%2Cage</pre></td></tr><tr><td><pre class="tableSnippet">/search{?keys*}</pre></td><td><pre class="tableSnippet">{
  &quot;keys&quot;: {
    &quot;role&quot;: &quot;admin&quot;,
    &quot;status&quot;: &quot;active&quot;
  }
}</pre></td><td><pre class="tableSnippet">/search?role=admin&amp;status=active</pre></td></tr><tr><td><pre class="tableSnippet">/find{#section}</pre></td><td><pre class="tableSnippet">{&quot;section&quot;:&quot;results&quot;}</pre></td><td><pre class="tableSnippet">/find#results</pre></td></tr><tr><td><pre class="tableSnippet">/browse/{.format}</pre></td><td><pre class="tableSnippet">{&quot;format&quot;:&quot;json&quot;}</pre></td><td><pre class="tableSnippet">/browse/.json</pre></td></tr><tr><td><pre class="tableSnippet">/location/{country}/{city}/{?coords*}</pre></td><td><pre class="tableSnippet">{
  &quot;country&quot;:&quot;Canada&quot;,
  &quot;city&quot;:&quot;Toronto&quot;,
  &quot;coords&quot;: {
    &quot;lat&quot;:43.7,
    &quot;long&quot;:-79.42
  }
}</pre></td><td><pre class="tableSnippet">/location/Canada/Toronto/?lat=43.7&amp;long=-79.42</pre></td></tr><tr><td><pre class="tableSnippet">/files{/year,month,day,filename}</pre></td><td><pre class="tableSnippet">{
  &quot;year&quot;:&quot;2023&quot;,
  &quot;month&quot;:&quot;04&quot;,
  &quot;day&quot;:&quot;01&quot;,
  &quot;filename&quot;:&quot;report.pdf&quot;
}</pre></td><td><pre class="tableSnippet">/files/2023/04/01/report.pdf</pre></td></tr><tr><td><pre class="tableSnippet">/tags{?list*}</pre></td><td><pre class="tableSnippet">{
  &quot;list&quot;:[
    &quot;api&quot;,
    &quot;hal&quot;,
    &quot;rfc6570&quot;
  ]
}</pre></td><td><pre class="tableSnippet">/tags?list=api&amp;list=hal&amp;list=rfc6570</pre></td></tr><tr><td><pre class="tableSnippet">/users/{userId}/posts{/postId}{?comments}</pre></td><td><pre class="tableSnippet">{
  &quot;userId&quot;:&quot;100&quot;,
  &quot;postId&quot;:&quot;200&quot;,
  &quot;comments&quot;:&quot;all&quot;
}</pre></td><td><pre class="tableSnippet">/users/100/posts/200?comments=all</pre></td></tr><tr><td><pre class="tableSnippet">/path?fixedParam=value{&amp;foo}</pre></td><td><pre class="tableSnippet">{&quot;foo&quot;:&quot;bar&quot;}</pre></td><td><pre class="tableSnippet">/path?fixedParam=value&amp;foo=bar</pre></td></tr></table>`,3);function g(y,m,b,f,_,F){const p=e("tab"),n=e("future-languages"),o=e("tabs");return h(),d("div",null,[k,s(o,null,{default:a(()=>[s(p,{name:"Python"},{default:a(()=>[c]),_:1}),s(p,{name:"JavaScript"},{default:a(()=>[q]),_:1}),s(n)]),_:1}),E])}const v=r(u,[["render",g]]);export{C as __pageData,v as default};
