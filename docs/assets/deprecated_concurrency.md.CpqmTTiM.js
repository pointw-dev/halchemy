import{_ as n,D as h,c as r,I as a,w as t,ab as E,o as p,l as i,a as s}from"./chunks/framework.BPd51-yL.js";const _=JSON.parse('{"title":"Optimistic Concurrency","description":"","frontmatter":{},"headers":[],"relativePath":"deprecated/concurrency.md","filePath":"deprecated/concurrency.md"}'),d={name:"deprecated/concurrency.md"},o=E('<h1 id="optimistic-concurrency" tabindex="-1">Optimistic Concurrency <a class="header-anchor" href="#optimistic-concurrency" aria-label="Permalink to &quot;Optimistic Concurrency&quot;">​</a></h1><div class="warning custom-block"><p class="custom-block-title">WARNING</p><p>This API is frozen and deprecated. Please use the fluent API from 0.9.4 on</p></div><p>When sending requests that are intended to change an existing resource (<code>PUT</code>, <code>PATCH</code>, <code>DELETE</code>) there is a chance someone else has made a change between your <code>GET</code> request the request with your intended changes. Halchemy relies on <strong>optimistic concurrency</strong> to handle this possibility. That is, it assumes no one else has made a change, but populates the <code>If-Match</code> header with the resource&#39;s ETag so the server can reject the request if a change to the resource has taken place - that is if the ETag of the resource on the server doesn&#39;t match the requested change.</p><p>For your client to handle this, you must handle exceptions thrown by the request. If the status code is 412 that means someone else has snuck in a change. What the client does is up to you. For example, you could:</p><ul><li>show the user the updated version, let them merge their change into it then resubmit the request</li><li>cancel the operation, advise the user they should refresh and start over</li><li>GET the updated resource, automatically merge the changes - or even overwrite them with the version you are trying to submit</li><li>etc.</li></ul><p>Here is an example that advises the user to refresh and try again.</p>',6),c=i("div",{class:"language-python vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"python"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," halchemy "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://example.org/api'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"root "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.get()  "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# get the root resource")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.get_from_rel_with_lookup(root, "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'customers'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", "),i("span",{style:{"--shiki-light":"#E36209","--shiki-dark":"#FFAB70"}},"lookup"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'A375'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"try"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"    # this patch simulates someone else making a change")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"    # the customer has a new ETag on the server, which throwaway_customer also has")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    throwaway_customer "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.patch_resource(customer, {"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'givenName'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'Lesley'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"    # customer still has the old ETag, so this request will fail")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    api.patch_resource(customer, {"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'givenName'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'Leslie'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"except"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," RuntimeError"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," as"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," ex:")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    if"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.last_error["),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'status_code'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"] "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"=="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 412"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"        print"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"f"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'Someone else has changed customer #"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"{"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer["),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"customerId"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"]"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"}"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},". Please refresh to see the changes, then try again if necessary.'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    else"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"        raise"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," RuntimeError"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"f"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'Could not patch customer #"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"{"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer["),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},'"customerId"'),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"]"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"}"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", ex)")])])])],-1),g=i("div",{class:"language-javascript vp-adaptive-theme"},[i("button",{title:"Copy Code",class:"copy"}),i("span",{class:"lang"},"javascript"),i("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Api"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"} "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," require"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'halchemy'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"async"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," function"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," patchExample"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"() {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," api"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," new"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Api"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://example.org/api'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," root"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()  "),i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"// get the root resource")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," customer"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"getFromRelWithLookup"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        resource: root,")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        rel: "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'customers'")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    }, lookup"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'A375'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    console."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(customer)")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    try"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"        // this patch simulates someone else making a change")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"        // the customer has a new ETag on the server, which throwaway_customer also has")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"        const"),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," throwawayCustomer"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"patchResource"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(customer, {"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'givenName'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'Lesley'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"        // customer still has the old ETag, so this request will fail")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"        await"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"patchResource"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(customer, {"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'givenName'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'Leslie'"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"catch"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(error) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"        if"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (api.lastError "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"&&"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.lastError.statusCode "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"=="),i("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 412"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"            console."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(api.lastError.statusCode)")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"            console."),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"`Someone else has changed customer #${"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"."),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customerId"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"}. Please refresh to see the changes, then try again if necessary.`"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        } "),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"else"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"            throw"),i("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," new"),i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Error"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"`Could not patch customer #${"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"."),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customerId"),i("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"}`"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", error)")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"patchExample"),i("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")])])])],-1);function y(F,u,m,C,A,D){const e=h("tab"),l=h("future-languages"),k=h("tabs");return p(),r("div",null,[o,a(k,null,{default:t(()=>[a(e,{name:"Python"},{default:t(()=>[c]),_:1}),a(e,{name:"JavaScript"},{default:t(()=>[g]),_:1}),a(l)]),_:1})])}const f=n(d,[["render",y]]);export{_ as __pageData,f as default};