import{_ as r,D as i,c,I as t,w as a,aa as o,o as d,l as e,a as s}from"./chunks/framework.B-_8KZRP.js";const T=JSON.parse('{"title":"Templated Links","description":"","frontmatter":{"head":[["link",{"rel":"canonical","href":"https://pointw-dev.github.io/halchemy/deprecated/templates.html"}]]},"headers":[],"relativePath":"deprecated/templates.md","filePath":"deprecated/templates.md"}'),p={name:"deprecated/templates.md"},k=o(`<h1 id="templated-links" tabindex="-1">Templated Links <a class="header-anchor" href="#templated-links" aria-label="Permalink to &quot;Templated Links&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This API is frozen and deprecated. Please use the fluent API from 0.9.4 on</p></div><p>When a resource&#39;s <code>_links</code> object contains templated links, you provide the values to fill the template using the <code>template</code> parameter of the method.</p><p>For example, if you have a collection resource for, say <code>customers</code> resource like this:</p><pre class="json-table">{
  &quot;_items&quot;: [
    ...
    ...
  ],
  &quot;_links&quot;: {
    &quot;self: {
      &quot;href&quot;: &quot;/customers&quot;
    },
    &quot;item&quot;: {
        &quot;href&quot;: &quot;/customers/{id}&quot;,
        &quot;templated&quot;: true
    }
}
</pre><p>You can send a <code>GET</code> request to the <code>item</code> rel of the collection by providing an <code>id</code> to fill the template:</p>`,6),u=e("div",{class:"language-python vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"python"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer "),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.get_from_rel(customers, "),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'item'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),e("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}},"template"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"{"),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'id'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":"),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'12345'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")])])])],-1),E=e("div",{class:"language-javascript vp-adaptive-theme"},[e("button",{title:"Copy Code",class:"copy"}),e("span",{class:"lang"},"javascript"),e("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[e("code",null,[e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),e("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," customers"),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),e("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),e("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"getFromRel"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({")]),s(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    resource: customers,")]),s(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    rel: "),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'item'"),e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},",")]),s(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    template: {")]),s(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        id: "),e("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'1'")]),s(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    }")]),s(`
`),e("span",{class:"line"},[e("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")])])])],-1),m=o("<blockquote><p>NOTE: when this is a common pattern in hypermea&#39;s collection resources. If you have an ID from a previous session and want to <code>GET</code> the collection without its <code>_items</code> populated, you can do this:<br>   <code>customers = api.get_from_rel(root, &#39;customers&#39;, parameters={&#39;where&#39;:&#39;{&#39;1&#39;:-1}&#39;})</code><br> In other words, search for all customers whose <code>1</code> field is equal to <code>-1</code>, returning an empty <code>_items</code></p></blockquote>",1);function _(g,y,f,F,q,v){const l=i("tab"),n=i("future-languages"),h=i("tabs");return d(),c("div",null,[k,t(h,null,{default:a(()=>[t(l,{name:"Python"},{default:a(()=>[u]),_:1}),t(l,{name:"JavaScript"},{default:a(()=>[E]),_:1}),t(n)]),_:1}),m])}const C=r(p,[["render",_]]);export{T as __pageData,C as default};