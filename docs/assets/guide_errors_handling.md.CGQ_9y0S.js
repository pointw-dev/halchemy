import{_ as n,y as k,a as r,G as a,w as t,aa as E,h as s,J as i,o}from"./chunks/framework.Bu-ijBxq.js";const H=JSON.parse('{"title":"Handling Errors","description":"","frontmatter":{},"headers":[{"level":2,"title":"Default configuration","slug":"default-configuration","link":"#default-configuration","children":[{"level":3,"title":"Network errors","slug":"network-errors","link":"#network-errors","children":[]},{"level":3,"title":"Status Codes","slug":"status-codes","link":"#status-codes","children":[]}]},{"level":2,"title":"Per call raise for status code","slug":"per-call-raise-for-status-code","link":"#per-call-raise-for-status-code","children":[]}],"relativePath":"guide/errors/handling.md","filePath":"guide/errors/handling.md"}'),p={name:"guide/errors/handling.md"},d=E('<h1 id="handling-errors" tabindex="-1">Handling Errors <a class="header-anchor" href="#handling-errors" aria-label="Permalink to &quot;Handling Errors&quot;">​</a></h1><p>When you make a request to the API there is a possibility the it will not succeed. There are, generally speaking, two ways in which things could go wrong:</p><ol><li>The request did not receive a response (network error)</li><li>The request received a response, but the response was not what you were expecting (status code error)</li></ol><p>By default, halchemy will raise an exception in the event of network errors. When the API responses with a status code, halchemy assumes the request/response was successful and lets you decide how to handle a non 2xx status code.</p><h2 id="default-configuration" tabindex="-1">Default configuration <a class="header-anchor" href="#default-configuration" aria-label="Permalink to &quot;Default configuration&quot;">​</a></h2><p>You can change this default behaviour: There are two settings you can change to control how errors are handled.</p><h3 id="network-errors" tabindex="-1">Network errors <a class="header-anchor" href="#network-errors" aria-label="Permalink to &quot;Network errors&quot;">​</a></h3><p>When there is a network error, your request did not receive a response. By default, halchemy will raise an exception in this case. You change by setting <code>raise on network failure</code> to false. Now, when there is a network error, halchemy will not raise an exception. You can check for this by looking at <code>resource._halchemy.error</code></p>',8),c=s("div",{class:"language-python vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"python"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," halchemy "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://non-existent-server'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api.error_handling.raise_on_network_failure "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," False")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"resource "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.root.get()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," resource._halchemy.error:")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    print"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'a network error occurred'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")])])])],-1),g=s("div",{class:"language-javascript vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"javascript"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Api"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"} "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," require"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'halchemy'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," api"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," new"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Api"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://non-existent-server'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api.errorHandling.raiseOnNetworkFailure "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," false")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," resource"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.root."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (resource._halchemy.error) {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'a network error occurred'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")])])])],-1),y=s("h3",{id:"status-codes",tabindex:"-1"},[i("Status Codes "),s("a",{class:"header-anchor",href:"#status-codes","aria-label":'Permalink to "Status Codes"'},"​")],-1),u=s("p",null,"By default, if the API successfully receives the request and successfully delivers a response, that is considered a success - even if the status code of the response is not what your code is expecting. Most HTTP libraries behave this way, but some (like Axios) will throw an exception if the status code is not 2xx.",-1),F=s("p",null,[i("You can decide, however, which status codes you want halchemy to consider as errors and thus raise an exception. You do this by setting the "),s("code",null,"raise on status codes"),i(" to indicate which status codes are errors.")],-1),C=s("p",null,"To indicate a set of status codes, use a combination of ranges, individual status codes, and greater-than/less-than symbols.",-1),f=s("p",null,"A common problem this helps you solve is: If you are performing a search and you know there may be no results (i.e. a status code of 404) you may not want to have the request throw an exception - but you do want to for all other codes 400 and above. Here is how you can tell halchemy this is what you want:",-1),m=s("div",{class:"language-python vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"python"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"from"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," halchemy "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"import"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," Api("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://example.org/api'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api.error_handling.raise_on_status_codes "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," '400-403, >404'")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"root "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.root.get()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"try"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    resource "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.follow(root).to("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'search'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},").get()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," resource._halchemy.response.status_code "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"=="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 404"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"        print"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'no results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    else"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"        print"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", resource)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"except"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," Exception"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," as"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," e:")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    print"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'an error occurred'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", e)")])])])],-1),_=s("div",{class:"language-javascript vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"javascript"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"Api"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"} "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," require"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'halchemy'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," api"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," new"),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}}," Api"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'http://example.org/api'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"api.errorHandling.raiseOnStatusCodes "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}}," '400-403, >404'")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," root"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.root."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),i(`
`),s("span",{class:"line"}),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"try"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    resource "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"follow"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(root)."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"to"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'search'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"    if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (resource._halchemy.response.status_code "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"=="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 404"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},") {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'no results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    } "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"else"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"        console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", resource)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    }")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"} "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"catch"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (e) {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'an error occurred'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", e)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")])])])],-1),B=s("div",{class:"tip custom-block"},[s("p",{class:"custom-block-title"},"TIP"),s("p",null,"The commas separating the parts of your status code set are optional. You can use them for readability, but they are not required.")],-1),A=s("h2",{id:"per-call-raise-for-status-code",tabindex:"-1"},[i("Per call raise for status code "),s("a",{class:"header-anchor",href:"#per-call-raise-for-status-code","aria-label":'Permalink to "Per call raise for status code"'},"​")],-1),w=s("p",null,[i("In addition to setting the default status codes halchemy will raise exceptions for, you can also manually raise exceptions for specific status codes on a per-call basis. After your request, you can call "),s("code",null,"raise for status codes"),i(", indicating which status codes should cause an exception.")],-1),v=s("div",{class:"language-python vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"python"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"="),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api.follow(customers).to("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'item'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},").with_template_values({"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'customerId'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'A375'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}).get()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer._halchemy.raise_for_status_codes("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'400-403, >404'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"# if we make it here, we know the status code is not 400-403 or 405 or above, but might be 404")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," customer._halchemy.response.status_code "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"=="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 404"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    print"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'no results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"else"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},":")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}},"    print"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", customer)")])])])],-1),D=s("div",{class:"language-javascript vp-adaptive-theme"},[s("button",{title:"Copy Code",class:"copy"}),s("span",{class:"lang"},"javascript"),s("pre",{class:"shiki shiki-themes github-light github-dark vp-code"},[s("code",null,[s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"const"),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," customer"),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," ="),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}}," await"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," api."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"follow"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"(customers)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"to"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'item'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"withTemplateValues"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"({"),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'customerId'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},": "),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'A375'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"})")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    ."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"get"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"()")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"customer._halchemy."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"raiseForStatusCodes"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'400-403, >404'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#6A737D","--shiki-dark":"#6A737D"}},"// if we make it here, we know the status code is not 400-403 or 405 or above, but might be 404")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"if"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," (customer._halchemy.response.status "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"==="),s("span",{style:{"--shiki-light":"#005CC5","--shiki-dark":"#79B8FF"}}," 404"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},") {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'no results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},")")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"} "),s("span",{style:{"--shiki-light":"#D73A49","--shiki-dark":"#F97583"}},"else"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}}," {")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"    console."),s("span",{style:{"--shiki-light":"#6F42C1","--shiki-dark":"#B392F0"}},"log"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"("),s("span",{style:{"--shiki-light":"#032F62","--shiki-dark":"#9ECBFF"}},"'results found'"),s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},", customer)")]),i(`
`),s("span",{class:"line"},[s("span",{style:{"--shiki-light":"#24292E","--shiki-dark":"#E1E4E8"}},"}")])])])],-1);function b(x,P,q,T,S,N){const e=k("tab"),h=k("future-languages"),l=k("tabs");return o(),r("div",null,[d,a(l,null,{default:t(()=>[a(e,{name:"Python"},{default:t(()=>[c]),_:1}),a(e,{name:"JavaScript"},{default:t(()=>[g]),_:1}),a(h)]),_:1}),y,u,F,C,f,a(l,null,{default:t(()=>[a(e,{name:"Python"},{default:t(()=>[m]),_:1}),a(e,{name:"JavaScript"},{default:t(()=>[_]),_:1}),a(h)]),_:1}),B,A,w,a(l,null,{default:t(()=>[a(e,{name:"Python"},{default:t(()=>[v]),_:1}),a(e,{name:"JavaScript"},{default:t(()=>[D]),_:1}),a(h)]),_:1})])}const V=n(p,[["render",b]]);export{H as __pageData,V as default};