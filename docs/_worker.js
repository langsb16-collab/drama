var jt=Object.defineProperty;var Ue=e=>{throw TypeError(e)};var St=(e,t,s)=>t in e?jt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var g=(e,t,s)=>St(e,typeof t!="symbol"?t+"":t,s),$e=(e,t,s)=>t.has(e)||Ue("Cannot "+s);var l=(e,t,s)=>($e(e,t,"read from private field"),s?s.call(e):t.get(e)),m=(e,t,s)=>t.has(e)?Ue("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),p=(e,t,s,r)=>($e(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),x=(e,t,s)=>($e(e,t,"access private method"),s);var We=(e,t,s,r)=>({set _(a){p(e,t,a,s)},get _(){return l(e,t,r)}});var Je=(e,t,s)=>(r,a)=>{let n=-1;return o(0);async function o(c){if(c<=n)throw new Error("next() called multiple times");n=c;let i,d=!1,u;if(e[c]?(u=e[c][0][0],r.req.routeIndex=c):u=c===e.length&&a||void 0,u)try{i=await u(r,()=>o(c+1))}catch(f){if(f instanceof Error&&t)r.error=f,i=await t(f,r),d=!0;else throw f}else r.finalized===!1&&s&&(i=await s(r));return i&&(r.finalized===!1||d)&&(r.res=i),r}},Tt=Symbol(),Dt=async(e,t=Object.create(null))=>{const{all:s=!1,dot:r=!1}=t,n=(e instanceof dt?e.raw.headers:e.headers).get("Content-Type");return n!=null&&n.startsWith("multipart/form-data")||n!=null&&n.startsWith("application/x-www-form-urlencoded")?Ft(e,{all:s,dot:r}):{}};async function Ft(e,t){const s=await e.formData();return s?Nt(s,t):{}}function Nt(e,t){const s=Object.create(null);return e.forEach((r,a)=>{t.all||a.endsWith("[]")?It(s,a,r):s[a]=r}),t.dot&&Object.entries(s).forEach(([r,a])=>{r.includes(".")&&(Ct(s,r,a),delete s[r])}),s}var It=(e,t,s)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(s):e[t]=[e[t],s]:t.endsWith("[]")?e[t]=[s]:e[t]=s},Ct=(e,t,s)=>{let r=e;const a=t.split(".");a.forEach((n,o)=>{o===a.length-1?r[n]=s:((!r[n]||typeof r[n]!="object"||Array.isArray(r[n])||r[n]instanceof File)&&(r[n]=Object.create(null)),r=r[n])})},nt=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},$t=e=>{const{groups:t,path:s}=kt(e),r=nt(s);return At(r,t)},kt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(s,r)=>{const a=`@${r}`;return t.push([a,s]),a}),{groups:t,path:e}},At=(e,t)=>{for(let s=t.length-1;s>=0;s--){const[r]=t[s];for(let a=e.length-1;a>=0;a--)if(e[a].includes(r)){e[a]=e[a].replace(r,t[s][1]);break}}return e},Re={},Lt=(e,t)=>{if(e==="*")return"*";const s=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(s){const r=`${e}#${t}`;return Re[r]||(s[2]?Re[r]=t&&t[0]!==":"&&t[0]!=="*"?[r,s[1],new RegExp(`^${s[2]}(?=/${t})`)]:[e,s[1],new RegExp(`^${s[2]}$`)]:Re[r]=[e,s[1],!0]),Re[r]}return null},Pe=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,s=>{try{return t(s)}catch{return s}})}},Mt=e=>Pe(e,decodeURI),it=e=>{const t=e.url,s=t.indexOf("/",t.indexOf(":")+4);let r=s;for(;r<t.length;r++){const a=t.charCodeAt(r);if(a===37){const n=t.indexOf("?",r),o=t.slice(s,n===-1?void 0:n);return Mt(o.includes("%25")?o.replace(/%25/g,"%2525"):o)}else if(a===63)break}return t.slice(s,r)},Pt=e=>{const t=it(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},re=(e,t,...s)=>(s.length&&(t=re(t,...s)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),ot=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),s=[];let r="";return t.forEach(a=>{if(a!==""&&!/\:/.test(a))r+="/"+a;else if(/\:/.test(a))if(/\?/.test(a)){s.length===0&&r===""?s.push("/"):s.push(r);const n=a.replace("?","");r+="/"+n,s.push(r)}else r+="/"+a}),s.filter((a,n,o)=>o.indexOf(a)===n)},ke=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?Pe(e,ct):e):e,lt=(e,t,s)=>{let r;if(!s&&t&&!/[%+]/.test(t)){let o=e.indexOf("?",8);if(o===-1)return;for(e.startsWith(t,o+1)||(o=e.indexOf(`&${t}`,o+1));o!==-1;){const c=e.charCodeAt(o+t.length+1);if(c===61){const i=o+t.length+2,d=e.indexOf("&",i);return ke(e.slice(i,d===-1?void 0:d))}else if(c==38||isNaN(c))return"";o=e.indexOf(`&${t}`,o+1)}if(r=/[%+]/.test(e),!r)return}const a={};r??(r=/[%+]/.test(e));let n=e.indexOf("?",8);for(;n!==-1;){const o=e.indexOf("&",n+1);let c=e.indexOf("=",n);c>o&&o!==-1&&(c=-1);let i=e.slice(n+1,c===-1?o===-1?void 0:o:c);if(r&&(i=ke(i)),n=o,i==="")continue;let d;c===-1?d="":(d=e.slice(c+1,o===-1?void 0:o),r&&(d=ke(d))),s?(a[i]&&Array.isArray(a[i])||(a[i]=[]),a[i].push(d)):a[i]??(a[i]=d)}return t?a[t]:a},Ht=lt,Bt=(e,t)=>lt(e,t,!0),ct=decodeURIComponent,ze=e=>Pe(e,ct),ie,T,P,ut,ft,Le,B,Ve,dt=(Ve=class{constructor(e,t="/",s=[[]]){m(this,P);g(this,"raw");m(this,ie);m(this,T);g(this,"routeIndex",0);g(this,"path");g(this,"bodyCache",{});m(this,B,e=>{const{bodyCache:t,raw:s}=this,r=t[e];if(r)return r;const a=Object.keys(t)[0];return a?t[a].then(n=>(a==="json"&&(n=JSON.stringify(n)),new Response(n)[e]())):t[e]=s[e]()});this.raw=e,this.path=t,p(this,T,s),p(this,ie,{})}param(e){return e?x(this,P,ut).call(this,e):x(this,P,ft).call(this)}query(e){return Ht(this.url,e)}queries(e){return Bt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((s,r)=>{t[r]=s}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Dt(this,e))}json(){return l(this,B).call(this,"text").then(e=>JSON.parse(e))}text(){return l(this,B).call(this,"text")}arrayBuffer(){return l(this,B).call(this,"arrayBuffer")}blob(){return l(this,B).call(this,"blob")}formData(){return l(this,B).call(this,"formData")}addValidatedData(e,t){l(this,ie)[e]=t}valid(e){return l(this,ie)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Tt](){return l(this,T)}get matchedRoutes(){return l(this,T)[0].map(([[,e]])=>e)}get routePath(){return l(this,T)[0].map(([[,e]])=>e)[this.routeIndex].path}},ie=new WeakMap,T=new WeakMap,P=new WeakSet,ut=function(e){const t=l(this,T)[0][this.routeIndex][1][e],s=x(this,P,Le).call(this,t);return s&&/\%/.test(s)?ze(s):s},ft=function(){const e={},t=Object.keys(l(this,T)[0][this.routeIndex][1]);for(const s of t){const r=x(this,P,Le).call(this,l(this,T)[0][this.routeIndex][1][s]);r!==void 0&&(e[s]=/\%/.test(r)?ze(r):r)}return e},Le=function(e){return l(this,T)[1]?l(this,T)[1][e]:e},B=new WeakMap,Ve),qt={Stringify:1},pt=async(e,t,s,r,a)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const n=e.callbacks;return n!=null&&n.length?(a?a[0]+=e:a=[e],Promise.all(n.map(c=>c({phase:t,buffer:a,context:r}))).then(c=>Promise.all(c.filter(Boolean).map(i=>pt(i,t,!1,r,a))).then(()=>a[0]))):Promise.resolve(e)},Ut="text/plain; charset=UTF-8",Ae=(e,t)=>({"Content-Type":e,...t}),xe,ve,k,oe,A,S,be,le,ce,V,ye,we,q,ae,Xe,Wt=(Xe=class{constructor(e,t){m(this,q);m(this,xe);m(this,ve);g(this,"env",{});m(this,k);g(this,"finalized",!1);g(this,"error");m(this,oe);m(this,A);m(this,S);m(this,be);m(this,le);m(this,ce);m(this,V);m(this,ye);m(this,we);g(this,"render",(...e)=>(l(this,le)??p(this,le,t=>this.html(t)),l(this,le).call(this,...e)));g(this,"setLayout",e=>p(this,be,e));g(this,"getLayout",()=>l(this,be));g(this,"setRenderer",e=>{p(this,le,e)});g(this,"header",(e,t,s)=>{this.finalized&&p(this,S,new Response(l(this,S).body,l(this,S)));const r=l(this,S)?l(this,S).headers:l(this,V)??p(this,V,new Headers);t===void 0?r.delete(e):s!=null&&s.append?r.append(e,t):r.set(e,t)});g(this,"status",e=>{p(this,oe,e)});g(this,"set",(e,t)=>{l(this,k)??p(this,k,new Map),l(this,k).set(e,t)});g(this,"get",e=>l(this,k)?l(this,k).get(e):void 0);g(this,"newResponse",(...e)=>x(this,q,ae).call(this,...e));g(this,"body",(e,t,s)=>x(this,q,ae).call(this,e,t,s));g(this,"text",(e,t,s)=>!l(this,V)&&!l(this,oe)&&!t&&!s&&!this.finalized?new Response(e):x(this,q,ae).call(this,e,t,Ae(Ut,s)));g(this,"json",(e,t,s)=>x(this,q,ae).call(this,JSON.stringify(e),t,Ae("application/json",s)));g(this,"html",(e,t,s)=>{const r=a=>x(this,q,ae).call(this,a,t,Ae("text/html; charset=UTF-8",s));return typeof e=="object"?pt(e,qt.Stringify,!1,{}).then(r):r(e)});g(this,"redirect",(e,t)=>{const s=String(e);return this.header("Location",/[^\x00-\xFF]/.test(s)?encodeURI(s):s),this.newResponse(null,t??302)});g(this,"notFound",()=>(l(this,ce)??p(this,ce,()=>new Response),l(this,ce).call(this,this)));p(this,xe,e),t&&(p(this,A,t.executionCtx),this.env=t.env,p(this,ce,t.notFoundHandler),p(this,we,t.path),p(this,ye,t.matchResult))}get req(){return l(this,ve)??p(this,ve,new dt(l(this,xe),l(this,we),l(this,ye))),l(this,ve)}get event(){if(l(this,A)&&"respondWith"in l(this,A))return l(this,A);throw Error("This context has no FetchEvent")}get executionCtx(){if(l(this,A))return l(this,A);throw Error("This context has no ExecutionContext")}get res(){return l(this,S)||p(this,S,new Response(null,{headers:l(this,V)??p(this,V,new Headers)}))}set res(e){if(l(this,S)&&e){e=new Response(e.body,e);for(const[t,s]of l(this,S).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const r=l(this,S).headers.getSetCookie();e.headers.delete("set-cookie");for(const a of r)e.headers.append("set-cookie",a)}else e.headers.set(t,s)}p(this,S,e),this.finalized=!0}get var(){return l(this,k)?Object.fromEntries(l(this,k)):{}}},xe=new WeakMap,ve=new WeakMap,k=new WeakMap,oe=new WeakMap,A=new WeakMap,S=new WeakMap,be=new WeakMap,le=new WeakMap,ce=new WeakMap,V=new WeakMap,ye=new WeakMap,we=new WeakMap,q=new WeakSet,ae=function(e,t,s){const r=l(this,S)?new Headers(l(this,S).headers):l(this,V)??new Headers;if(typeof t=="object"&&"headers"in t){const n=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[o,c]of n)o.toLowerCase()==="set-cookie"?r.append(o,c):r.set(o,c)}if(s)for(const[n,o]of Object.entries(s))if(typeof o=="string")r.set(n,o);else{r.delete(n);for(const c of o)r.append(n,c)}const a=typeof t=="number"?t:(t==null?void 0:t.status)??l(this,oe);return new Response(e,{status:a,headers:r})},Xe),E="ALL",Jt="all",zt=["get","post","put","delete","options","patch"],gt="Can not add a route since the matcher is already built.",mt=class extends Error{},Yt="__COMPOSED_HANDLER",Kt=e=>e.text("404 Not Found",404),Ye=(e,t)=>{if("getResponse"in e){const s=e.getResponse();return t.newResponse(s.body,s)}return console.error(e),t.text("Internal Server Error",500)},F,_,xt,N,K,Oe,je,Qe,ht=(Qe=class{constructor(t={}){m(this,_);g(this,"get");g(this,"post");g(this,"put");g(this,"delete");g(this,"options");g(this,"patch");g(this,"all");g(this,"on");g(this,"use");g(this,"router");g(this,"getPath");g(this,"_basePath","/");m(this,F,"/");g(this,"routes",[]);m(this,N,Kt);g(this,"errorHandler",Ye);g(this,"onError",t=>(this.errorHandler=t,this));g(this,"notFound",t=>(p(this,N,t),this));g(this,"fetch",(t,...s)=>x(this,_,je).call(this,t,s[1],s[0],t.method));g(this,"request",(t,s,r,a)=>t instanceof Request?this.fetch(s?new Request(t,s):t,r,a):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${re("/",t)}`,s),r,a)));g(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,_,je).call(this,t.request,t,void 0,t.request.method))})});[...zt,Jt].forEach(n=>{this[n]=(o,...c)=>(typeof o=="string"?p(this,F,o):x(this,_,K).call(this,n,l(this,F),o),c.forEach(i=>{x(this,_,K).call(this,n,l(this,F),i)}),this)}),this.on=(n,o,...c)=>{for(const i of[o].flat()){p(this,F,i);for(const d of[n].flat())c.map(u=>{x(this,_,K).call(this,d.toUpperCase(),l(this,F),u)})}return this},this.use=(n,...o)=>(typeof n=="string"?p(this,F,n):(p(this,F,"*"),o.unshift(n)),o.forEach(c=>{x(this,_,K).call(this,E,l(this,F),c)}),this);const{strict:r,...a}=t;Object.assign(this,a),this.getPath=r??!0?t.getPath??it:Pt}route(t,s){const r=this.basePath(t);return s.routes.map(a=>{var o;let n;s.errorHandler===Ye?n=a.handler:(n=async(c,i)=>(await Je([],s.errorHandler)(c,()=>a.handler(c,i))).res,n[Yt]=a.handler),x(o=r,_,K).call(o,a.method,a.path,n)}),this}basePath(t){const s=x(this,_,xt).call(this);return s._basePath=re(this._basePath,t),s}mount(t,s,r){let a,n;r&&(typeof r=="function"?n=r:(n=r.optionHandler,r.replaceRequest===!1?a=i=>i:a=r.replaceRequest));const o=n?i=>{const d=n(i);return Array.isArray(d)?d:[d]}:i=>{let d;try{d=i.executionCtx}catch{}return[i.env,d]};a||(a=(()=>{const i=re(this._basePath,t),d=i==="/"?0:i.length;return u=>{const f=new URL(u.url);return f.pathname=f.pathname.slice(d)||"/",new Request(f,u)}})());const c=async(i,d)=>{const u=await s(a(i.req.raw),...o(i));if(u)return u;await d()};return x(this,_,K).call(this,E,re(t,"*"),c),this}},F=new WeakMap,_=new WeakSet,xt=function(){const t=new ht({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,p(t,N,l(this,N)),t.routes=this.routes,t},N=new WeakMap,K=function(t,s,r){t=t.toUpperCase(),s=re(this._basePath,s);const a={basePath:this._basePath,path:s,method:t,handler:r};this.router.add(t,s,[r,a]),this.routes.push(a)},Oe=function(t,s){if(t instanceof Error)return this.errorHandler(t,s);throw t},je=function(t,s,r,a){if(a==="HEAD")return(async()=>new Response(null,await x(this,_,je).call(this,t,s,r,"GET")))();const n=this.getPath(t,{env:r}),o=this.router.match(a,n),c=new Wt(t,{path:n,matchResult:o,env:r,executionCtx:s,notFoundHandler:l(this,N)});if(o[0].length===1){let d;try{d=o[0][0][0][0](c,async()=>{c.res=await l(this,N).call(this,c)})}catch(u){return x(this,_,Oe).call(this,u,c)}return d instanceof Promise?d.then(u=>u||(c.finalized?c.res:l(this,N).call(this,c))).catch(u=>x(this,_,Oe).call(this,u,c)):d??l(this,N).call(this,c)}const i=Je(o[0],this.errorHandler,l(this,N));return(async()=>{try{const d=await i(c);if(!d.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return d.res}catch(d){return x(this,_,Oe).call(this,d,c)}})()},Qe),vt=[];function Gt(e,t){const s=this.buildAllMatchers(),r=(a,n)=>{const o=s[a]||s[E],c=o[2][n];if(c)return c;const i=n.match(o[0]);if(!i)return[[],vt];const d=i.indexOf("",1);return[o[1][d],i]};return this.match=r,r(e,t)}var Te="[^/]+",me=".*",he="(?:|/.*)",ne=Symbol(),Vt=new Set(".\\+*[^]$()");function Xt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===me||e===he?1:t===me||t===he?-1:e===Te?1:t===Te?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var X,Q,I,Ze,Me=(Ze=class{constructor(){m(this,X);m(this,Q);m(this,I,Object.create(null))}insert(t,s,r,a,n){if(t.length===0){if(l(this,X)!==void 0)throw ne;if(n)return;p(this,X,s);return}const[o,...c]=t,i=o==="*"?c.length===0?["","",me]:["","",Te]:o==="/*"?["","",he]:o.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let d;if(i){const u=i[1];let f=i[2]||Te;if(u&&i[2]&&(f===".*"||(f=f.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(f))))throw ne;if(d=l(this,I)[f],!d){if(Object.keys(l(this,I)).some(h=>h!==me&&h!==he))throw ne;if(n)return;d=l(this,I)[f]=new Me,u!==""&&p(d,Q,a.varIndex++)}!n&&u!==""&&r.push([u,l(d,Q)])}else if(d=l(this,I)[o],!d){if(Object.keys(l(this,I)).some(u=>u.length>1&&u!==me&&u!==he))throw ne;if(n)return;d=l(this,I)[o]=new Me}d.insert(c,s,r,a,n)}buildRegExpStr(){const s=Object.keys(l(this,I)).sort(Xt).map(r=>{const a=l(this,I)[r];return(typeof l(a,Q)=="number"?`(${r})@${l(a,Q)}`:Vt.has(r)?`\\${r}`:r)+a.buildRegExpStr()});return typeof l(this,X)=="number"&&s.unshift(`#${l(this,X)}`),s.length===0?"":s.length===1?s[0]:"(?:"+s.join("|")+")"}},X=new WeakMap,Q=new WeakMap,I=new WeakMap,Ze),De,Ee,et,Qt=(et=class{constructor(){m(this,De,{varIndex:0});m(this,Ee,new Me)}insert(e,t,s){const r=[],a=[];for(let o=0;;){let c=!1;if(e=e.replace(/\{[^}]+\}/g,i=>{const d=`@\\${o}`;return a[o]=[d,i],o++,c=!0,d}),!c)break}const n=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let o=a.length-1;o>=0;o--){const[c]=a[o];for(let i=n.length-1;i>=0;i--)if(n[i].indexOf(c)!==-1){n[i]=n[i].replace(c,a[o][1]);break}}return l(this,Ee).insert(n,t,r,l(this,De),s),r}buildRegExp(){let e=l(this,Ee).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const s=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(a,n,o)=>n!==void 0?(s[++t]=Number(n),"$()"):(o!==void 0&&(r[Number(o)]=++t),"")),[new RegExp(`^${e}`),s,r]}},De=new WeakMap,Ee=new WeakMap,et),Zt=[/^$/,[],Object.create(null)],Se=Object.create(null);function bt(e){return Se[e]??(Se[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,s)=>s?`\\${s}`:"(?:|/.*)")}$`))}function es(){Se=Object.create(null)}function ts(e){var d;const t=new Qt,s=[];if(e.length===0)return Zt;const r=e.map(u=>[!/\*|\/:/.test(u[0]),...u]).sort(([u,f],[h,y])=>u?1:h?-1:f.length-y.length),a=Object.create(null);for(let u=0,f=-1,h=r.length;u<h;u++){const[y,w,v]=r[u];y?a[w]=[v.map(([R])=>[R,Object.create(null)]),vt]:f++;let b;try{b=t.insert(w,f,y)}catch(R){throw R===ne?new mt(w):R}y||(s[f]=v.map(([R,te])=>{const fe=Object.create(null);for(te-=1;te>=0;te--){const[C,Ie]=b[te];fe[C]=Ie}return[R,fe]}))}const[n,o,c]=t.buildRegExp();for(let u=0,f=s.length;u<f;u++)for(let h=0,y=s[u].length;h<y;h++){const w=(d=s[u][h])==null?void 0:d[1];if(!w)continue;const v=Object.keys(w);for(let b=0,R=v.length;b<R;b++)w[v[b]]=c[w[v[b]]]}const i=[];for(const u in o)i[u]=s[o[u]];return[n,i,a]}function se(e,t){if(e){for(const s of Object.keys(e).sort((r,a)=>a.length-r.length))if(bt(s).test(t))return[...e[s]]}}var U,W,Fe,yt,tt,ss=(tt=class{constructor(){m(this,Fe);g(this,"name","RegExpRouter");m(this,U);m(this,W);g(this,"match",Gt);p(this,U,{[E]:Object.create(null)}),p(this,W,{[E]:Object.create(null)})}add(e,t,s){var c;const r=l(this,U),a=l(this,W);if(!r||!a)throw new Error(gt);r[e]||[r,a].forEach(i=>{i[e]=Object.create(null),Object.keys(i[E]).forEach(d=>{i[e][d]=[...i[E][d]]})}),t==="/*"&&(t="*");const n=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const i=bt(t);e===E?Object.keys(r).forEach(d=>{var u;(u=r[d])[t]||(u[t]=se(r[d],t)||se(r[E],t)||[])}):(c=r[e])[t]||(c[t]=se(r[e],t)||se(r[E],t)||[]),Object.keys(r).forEach(d=>{(e===E||e===d)&&Object.keys(r[d]).forEach(u=>{i.test(u)&&r[d][u].push([s,n])})}),Object.keys(a).forEach(d=>{(e===E||e===d)&&Object.keys(a[d]).forEach(u=>i.test(u)&&a[d][u].push([s,n]))});return}const o=ot(t)||[t];for(let i=0,d=o.length;i<d;i++){const u=o[i];Object.keys(a).forEach(f=>{var h;(e===E||e===f)&&((h=a[f])[u]||(h[u]=[...se(r[f],u)||se(r[E],u)||[]]),a[f][u].push([s,n-d+i+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(l(this,W)).concat(Object.keys(l(this,U))).forEach(t=>{e[t]||(e[t]=x(this,Fe,yt).call(this,t))}),p(this,U,p(this,W,void 0)),es(),e}},U=new WeakMap,W=new WeakMap,Fe=new WeakSet,yt=function(e){const t=[];let s=e===E;return[l(this,U),l(this,W)].forEach(r=>{const a=r[e]?Object.keys(r[e]).map(n=>[n,r[e][n]]):[];a.length!==0?(s||(s=!0),t.push(...a)):e!==E&&t.push(...Object.keys(r[E]).map(n=>[n,r[E][n]]))}),s?ts(t):null},tt),J,L,st,rs=(st=class{constructor(e){g(this,"name","SmartRouter");m(this,J,[]);m(this,L,[]);p(this,J,e.routers)}add(e,t,s){if(!l(this,L))throw new Error(gt);l(this,L).push([e,t,s])}match(e,t){if(!l(this,L))throw new Error("Fatal error");const s=l(this,J),r=l(this,L),a=s.length;let n=0,o;for(;n<a;n++){const c=s[n];try{for(let i=0,d=r.length;i<d;i++)c.add(...r[i]);o=c.match(e,t)}catch(i){if(i instanceof mt)continue;throw i}this.match=c.match.bind(c),p(this,J,[c]),p(this,L,void 0);break}if(n===a)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(l(this,L)||l(this,J).length!==1)throw new Error("No active router has been determined yet.");return l(this,J)[0]}},J=new WeakMap,L=new WeakMap,st),ge=Object.create(null),z,j,Z,de,O,M,G,rt,wt=(rt=class{constructor(e,t,s){m(this,M);m(this,z);m(this,j);m(this,Z);m(this,de,0);m(this,O,ge);if(p(this,j,s||Object.create(null)),p(this,z,[]),e&&t){const r=Object.create(null);r[e]={handler:t,possibleKeys:[],score:0},p(this,z,[r])}p(this,Z,[])}insert(e,t,s){p(this,de,++We(this,de)._);let r=this;const a=$t(t),n=[];for(let o=0,c=a.length;o<c;o++){const i=a[o],d=a[o+1],u=Lt(i,d),f=Array.isArray(u)?u[0]:i;if(f in l(r,j)){r=l(r,j)[f],u&&n.push(u[1]);continue}l(r,j)[f]=new wt,u&&(l(r,Z).push(u),n.push(u[1])),r=l(r,j)[f]}return l(r,z).push({[e]:{handler:s,possibleKeys:n.filter((o,c,i)=>i.indexOf(o)===c),score:l(this,de)}}),r}search(e,t){var c;const s=[];p(this,O,ge);let a=[this];const n=nt(t),o=[];for(let i=0,d=n.length;i<d;i++){const u=n[i],f=i===d-1,h=[];for(let y=0,w=a.length;y<w;y++){const v=a[y],b=l(v,j)[u];b&&(p(b,O,l(v,O)),f?(l(b,j)["*"]&&s.push(...x(this,M,G).call(this,l(b,j)["*"],e,l(v,O))),s.push(...x(this,M,G).call(this,b,e,l(v,O)))):h.push(b));for(let R=0,te=l(v,Z).length;R<te;R++){const fe=l(v,Z)[R],C=l(v,O)===ge?{}:{...l(v,O)};if(fe==="*"){const H=l(v,j)["*"];H&&(s.push(...x(this,M,G).call(this,H,e,l(v,O))),p(H,O,C),h.push(H));continue}const[Ie,qe,pe]=fe;if(!u&&!(pe instanceof RegExp))continue;const $=l(v,j)[Ie],Ot=n.slice(i).join("/");if(pe instanceof RegExp){const H=pe.exec(Ot);if(H){if(C[qe]=H[0],s.push(...x(this,M,G).call(this,$,e,l(v,O),C)),Object.keys(l($,j)).length){p($,O,C);const Ce=((c=H[0].match(/\//))==null?void 0:c.length)??0;(o[Ce]||(o[Ce]=[])).push($)}continue}}(pe===!0||pe.test(u))&&(C[qe]=u,f?(s.push(...x(this,M,G).call(this,$,e,C,l(v,O))),l($,j)["*"]&&s.push(...x(this,M,G).call(this,l($,j)["*"],e,C,l(v,O)))):(p($,O,C),h.push($)))}}a=h.concat(o.shift()??[])}return s.length>1&&s.sort((i,d)=>i.score-d.score),[s.map(({handler:i,params:d})=>[i,d])]}},z=new WeakMap,j=new WeakMap,Z=new WeakMap,de=new WeakMap,O=new WeakMap,M=new WeakSet,G=function(e,t,s,r){const a=[];for(let n=0,o=l(e,z).length;n<o;n++){const c=l(e,z)[n],i=c[t]||c[E],d={};if(i!==void 0&&(i.params=Object.create(null),a.push(i),s!==ge||r&&r!==ge))for(let u=0,f=i.possibleKeys.length;u<f;u++){const h=i.possibleKeys[u],y=d[i.score];i.params[h]=r!=null&&r[h]&&!y?r[h]:s[h]??(r==null?void 0:r[h]),d[i.score]=!0}}return a},rt),ee,at,as=(at=class{constructor(){g(this,"name","TrieRouter");m(this,ee);p(this,ee,new wt)}add(e,t,s){const r=ot(t);if(r){for(let a=0,n=r.length;a<n;a++)l(this,ee).insert(e,r[a],s);return}l(this,ee).insert(e,t,s)}match(e,t){return l(this,ee).search(e,t)}},ee=new WeakMap,at),Y=class extends ht{constructor(e={}){super(e),this.router=e.router??new rs({routers:[new ss,new as]})}},ns=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ke=(e,t=os)=>{const s=/\.([a-zA-Z0-9]+?)$/,r=e.match(s);if(!r)return;let a=t[r[1]];return a&&a.startsWith("text")&&(a+="; charset=utf-8"),a},is={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},os=is,ls=(...e)=>{let t=e.filter(a=>a!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const s=t.split("/"),r=[];for(const a of s)a===".."&&r.length>0&&r.at(-1)!==".."?r.pop():a!=="."&&r.push(a);return r.join("/")||"."},Et={br:".br",zstd:".zst",gzip:".gz"},cs=Object.keys(Et),ds="index.html",us=e=>{const t=e.root??"./",s=e.path,r=e.join??ls;return async(a,n)=>{var u,f,h,y;if(a.finalized)return n();let o;if(e.path)o=e.path;else try{if(o=decodeURIComponent(a.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(o))throw new Error}catch{return await((u=e.onNotFound)==null?void 0:u.call(e,a.req.path,a)),n()}let c=r(t,!s&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(c)&&(c=r(c,ds));const i=e.getContent;let d=await i(c,a);if(d instanceof Response)return a.newResponse(d.body,d);if(d){const w=e.mimes&&Ke(c,e.mimes)||Ke(c);if(a.header("Content-Type",w||"application/octet-stream"),e.precompressed&&(!w||ns.test(w))){const v=new Set((f=a.req.header("Accept-Encoding"))==null?void 0:f.split(",").map(b=>b.trim()));for(const b of cs){if(!v.has(b))continue;const R=await i(c+Et[b],a);if(R){d=R,a.header("Content-Encoding",b),a.header("Vary","Accept-Encoding",{append:!0});break}}}return await((h=e.onFound)==null?void 0:h.call(e,c,a)),a.body(d)}await((y=e.onNotFound)==null?void 0:y.call(e,c,a)),await n()}},fs=async(e,t)=>{let s;t&&t.manifest?typeof t.manifest=="string"?s=JSON.parse(t.manifest):s=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?s=JSON.parse(__STATIC_CONTENT_MANIFEST):s=__STATIC_CONTENT_MANIFEST;let r;t&&t.namespace?r=t.namespace:r=__STATIC_CONTENT;const a=s[e]||e;if(!a)return null;const n=await r.get(a,{type:"stream"});return n||null},ps=e=>async function(s,r){return us({...e,getContent:async n=>fs(n,{manifest:e.manifest,namespace:e.namespace?e.namespace:s.env?s.env.__STATIC_CONTENT:void 0})})(s,r)},gs=e=>ps(e);const Ne=new Y;Ne.get("/",async e=>{var u;const{DB:t}=e.env,{region:s,category:r,delivery:a,search:n,limit:o="20",offset:c="0"}=e.req.query();let i=`
    SELECT 
      r.*,
      rg.name_ko as region_name,
      cat.name_ko as category_name,
      cat.icon as category_icon
    FROM restaurants r
    LEFT JOIN regions rg ON r.region_id = rg.id
    LEFT JOIN categories cat ON r.category_id = cat.id
    WHERE r.status = 'active'
  `;const d=[];if(s&&(i+=" AND r.region_id = ?",d.push(s)),r&&(i+=" AND r.category_id = ?",d.push(r)),a==="true"&&(i+=" AND r.delivery_available = 1"),n){i+=" AND (r.name LIKE ? OR r.description_ko LIKE ? OR r.signature_menu LIKE ?)";const f=`%${n}%`;d.push(f,f,f)}i+=" ORDER BY r.featured DESC, r.rating DESC, r.id DESC",i+=" LIMIT ? OFFSET ?",d.push(parseInt(o),parseInt(c));try{const f=await t.prepare(i).bind(...d).all();return e.json({success:!0,data:f.results,total:((u=f.results)==null?void 0:u.length)||0,limit:parseInt(o),offset:parseInt(c)})}catch(f){return e.json({success:!1,error:f.message},500)}});Ne.get("/:id",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const r=await t.prepare(`
      SELECT 
        r.*,
        rg.name_ko as region_name,
        rg.name_en as region_name_en,
        cat.name_ko as category_name,
        cat.name_en as category_name_en,
        cat.icon as category_icon
      FROM restaurants r
      LEFT JOIN regions rg ON r.region_id = rg.id
      LEFT JOIN categories cat ON r.category_id = cat.id
      WHERE r.id = ? AND r.status = 'active'
    `).bind(s).first();if(!r)return e.json({success:!1,error:"Restaurant not found"},404);const a=await t.prepare(`
      SELECT * FROM restaurant_menus
      WHERE restaurant_id = ? AND available = 1
      ORDER BY popular DESC, category, id
    `).bind(s).all();return await t.prepare(`
      UPDATE restaurants 
      SET view_count = view_count + 1 
      WHERE id = ?
    `).bind(s).run(),e.json({success:!0,data:{...r,menus:a.results||[]}})}catch(r){return e.json({success:!1,error:r.message},500)}});Ne.get("/stats",async e=>{const{DB:t}=e.env;try{const s=await t.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN delivery_available = 1 THEN 1 ELSE 0 END) as delivery_available,
        SUM(CASE WHEN verified = 1 THEN 1 ELSE 0 END) as verified,
        ROUND(AVG(rating), 2) as avg_rating
      FROM restaurants
      WHERE status = 'active'
    `).first(),r=await t.prepare(`
      SELECT 
        rg.name_ko as region,
        COUNT(*) as count
      FROM restaurants r
      LEFT JOIN regions rg ON r.region_id = rg.id
      WHERE r.status = 'active'
      GROUP BY r.region_id
      ORDER BY count DESC
    `).all(),a=await t.prepare(`
      SELECT 
        cat.name_ko as category,
        COUNT(*) as count
      FROM restaurants r
      LEFT JOIN categories cat ON r.category_id = cat.id
      WHERE r.status = 'active'
      GROUP BY r.category_id
      ORDER BY count DESC
    `).all();return e.json({success:!0,data:{total:s,byRegion:r.results,byCategory:a.results}})}catch(s){return e.json({success:!1,error:s.message},500)}});const He=new Y;He.get("/",async e=>{const{DB:t}=e.env;try{const s=await t.prepare(`
      SELECT * FROM regions
      ORDER BY province, id
    `).all();return e.json({success:!0,data:s.results})}catch(s){return e.json({success:!1,error:s.message},500)}});He.get("/provinces",async e=>{const{DB:t}=e.env;try{const s=await t.prepare(`
      SELECT DISTINCT province FROM regions
      ORDER BY province
    `).all();return e.json({success:!0,data:s.results})}catch(s){return e.json({success:!1,error:s.message},500)}});const _t=new Y;_t.get("/",async e=>{const{DB:t}=e.env;try{const s=await t.prepare(`
      SELECT * FROM categories
      ORDER BY id
    `).all();return e.json({success:!0,data:s.results})}catch(s){return e.json({success:!1,error:s.message},500)}});const ue=new Y;ue.post("/",async e=>{const{DB:t}=e.env;try{const s=await e.req.json(),{user_id:r,restaurant_id:a,order_type:n,items:o,total_amount:c,delivery_address:i,delivery_phone:d,customer_request:u,payment_method:f}=s;if(!r||!a||!n||!o||o.length===0)return e.json({success:!1,error:"필수 정보가 누락되었습니다."},400);if(n==="delivery"&&!i)return e.json({success:!1,error:"배달 주소가 필요합니다."},400);const h=new Date().toISOString().slice(0,10).replace(/-/g,""),y=Math.floor(Math.random()*1e3).toString().padStart(3,"0"),w=`ORD${h}${y}`,b=(await t.prepare(`
      INSERT INTO orders (
        order_number,
        user_id,
        restaurant_id,
        order_type,
        total_amount,
        delivery_address,
        delivery_phone,
        customer_request,
        payment_method,
        payment_status,
        order_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'pending')
    `).bind(w,r,a,n,c,i||null,d||null,u||null,f||"card").run()).meta.last_row_id;return await t.prepare(`
      UPDATE orders 
      SET items = ? 
      WHERE id = ?
    `).bind(JSON.stringify(o),b).run(),e.json({success:!0,data:{order_id:b,order_number:w,message:"주문이 접수되었습니다."}},201)}catch(s){return console.error("Order creation error:",s),e.json({success:!1,error:s.message},500)}});ue.get("/:id",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const r=await t.prepare(`
      SELECT 
        o.*,
        r.name as restaurant_name,
        r.phone as restaurant_phone,
        r.address as restaurant_address,
        u.name as customer_name,
        u.email as customer_email
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      LEFT JOIN users u ON o.user_id = u.id
      WHERE o.id = ?
    `).bind(s).first();if(!r)return e.json({success:!1,error:"주문을 찾을 수 없습니다."},404);if(r.items)try{r.items=JSON.parse(r.items)}catch{r.items=[]}return e.json({success:!0,data:r})}catch(r){return e.json({success:!1,error:r.message},500)}});ue.get("/",async e=>{const{DB:t}=e.env,{user_id:s,status:r,limit:a="20",offset:n="0"}=e.req.query();if(!s)return e.json({success:!1,error:"사용자 ID가 필요합니다."},400);try{let o=`
      SELECT 
        o.*,
        r.name as restaurant_name,
        r.image_url as restaurant_image
      FROM orders o
      LEFT JOIN restaurants r ON o.restaurant_id = r.id
      WHERE o.user_id = ?
    `;const c=[s];r&&(o+=" AND o.order_status = ?",c.push(r)),o+=" ORDER BY o.created_at DESC LIMIT ? OFFSET ?",c.push(parseInt(a),parseInt(n));const d=((await t.prepare(o).bind(...c).all()).results||[]).map(u=>{if(u.items)try{u.items=JSON.parse(u.items)}catch{u.items=[]}return u});return e.json({success:!0,data:d,total:d.length})}catch(o){return e.json({success:!1,error:o.message},500)}});ue.patch("/:id/status",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const{order_status:r}=await e.req.json();return r?["pending","confirmed","preparing","ready","delivering","completed","cancelled"].includes(r)?(await t.prepare(`
      UPDATE orders 
      SET order_status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(r,s).run(),e.json({success:!0,message:"주문 상태가 업데이트되었습니다."})):e.json({success:!1,error:"유효하지 않은 주문 상태입니다."},400):e.json({success:!1,error:"주문 상태가 필요합니다."},400)}catch(r){return e.json({success:!1,error:r.message},500)}});ue.delete("/:id",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const r=await t.prepare(`
      SELECT order_status FROM orders WHERE id = ?
    `).bind(s).first();return r?["preparing","ready","delivering","completed"].includes(r.order_status)?e.json({success:!1,error:"취소할 수 없는 주문 상태입니다. 가게에 직접 문의해주세요."},400):(await t.prepare(`
      UPDATE orders 
      SET order_status = 'cancelled',
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(s).run(),e.json({success:!0,message:"주문이 취소되었습니다."})):e.json({success:!1,error:"주문을 찾을 수 없습니다."},404)}catch(r){return e.json({success:!1,error:r.message},500)}});const _e=new Y;_e.post("/",async e=>{const{DB:t}=e.env;try{const s=await e.req.json(),{business_name:r,owner_name:a,phone:n,email:o,address:c,category_id:i,region_id:d,business_number:u,description:f,signature_menu:h,business_hours:y}=s;if(!r||!a||!n||!c)return e.json({success:!1,error:"필수 정보가 누락되었습니다."},400);const w=new Date().toISOString().slice(0,10).replace(/-/g,""),v=Math.floor(Math.random()*1e3).toString().padStart(3,"0"),b=`MER${w}${v}`,R=await t.prepare(`
      INSERT INTO merchant_applications (
        application_number,
        business_name,
        owner_name,
        phone,
        email,
        address,
        category_id,
        region_id,
        business_number,
        description,
        signature_menu,
        business_hours,
        status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
    `).bind(b,r,a,n,o||null,c,i||null,d||null,u||null,f||null,h||null,y||null).run();return e.json({success:!0,data:{id:R.meta.last_row_id,application_number:b,message:"가맹점 신청이 접수되었습니다. 영업일 기준 2-3일 내에 연락드리겠습니다."}},201)}catch(s){return console.error("Merchant application error:",s),e.json({success:!1,error:s.message},500)}});_e.get("/:id",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const r=await t.prepare(`
      SELECT 
        ma.*,
        r.name_ko as region_name,
        cat.name_ko as category_name
      FROM merchant_applications ma
      LEFT JOIN regions r ON ma.region_id = r.id
      LEFT JOIN categories cat ON ma.category_id = cat.id
      WHERE ma.id = ? OR ma.application_number = ?
    `).bind(s,s).first();return r?e.json({success:!0,data:r}):e.json({success:!1,error:"신청 내역을 찾을 수 없습니다."},404)}catch(r){return e.json({success:!1,error:r.message},500)}});_e.get("/",async e=>{const{DB:t}=e.env,{status:s,limit:r="20",offset:a="0"}=e.req.query();try{let n=`
      SELECT 
        ma.*,
        r.name_ko as region_name,
        cat.name_ko as category_name
      FROM merchant_applications ma
      LEFT JOIN regions r ON ma.region_id = r.id
      LEFT JOIN categories cat ON ma.category_id = cat.id
      WHERE 1=1
    `;const o=[];s&&(n+=" AND ma.status = ?",o.push(s)),n+=" ORDER BY ma.created_at DESC LIMIT ? OFFSET ?",o.push(parseInt(r),parseInt(a));const c=await t.prepare(n).bind(...o).all();return e.json({success:!0,data:c.results||[],total:(c.results||[]).length})}catch(n){return e.json({success:!1,error:n.message},500)}});_e.patch("/:id/status",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const{status:r,rejection_reason:a}=await e.req.json();return r?["pending","approved","rejected","contacted"].includes(r)?(await t.prepare(`
      UPDATE merchant_applications 
      SET status = ?,
          rejection_reason = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).bind(r,a||null,s).run(),e.json({success:!0,message:"신청 상태가 업데이트되었습니다."})):e.json({success:!1,error:"유효하지 않은 상태입니다."},400):e.json({success:!1,error:"상태 정보가 필요합니다."},400)}catch(r){return e.json({success:!1,error:r.message},500)}});const Be=new Y;Be.get("/",async e=>{var d;const{DB:t}=e.env,{region:s,category:r,month:a,limit:n="30",offset:o="0"}=e.req.query();let c=`
    SELECT 
      f.*,
      r.name_ko as region_name
    FROM festivals f
    LEFT JOIN regions r ON f.region_id = r.id
    WHERE f.status = 'active'
  `;const i=[];s&&(c+=" AND f.region_id = ?",i.push(s)),r&&(c+=" AND f.category = ?",i.push(r)),a&&(c+=` AND (
      strftime('%m', f.start_date) = ? OR 
      strftime('%m', f.end_date) = ?
    )`,i.push(a.padStart(2,"0"),a.padStart(2,"0"))),c+=" ORDER BY f.start_date ASC LIMIT ? OFFSET ?",i.push(parseInt(n),parseInt(o));try{const u=await t.prepare(c).bind(...i).all();return e.json({success:!0,data:u.results,total:((d=u.results)==null?void 0:d.length)||0})}catch(u){return e.json({success:!1,error:u.message},500)}});Be.get("/:id",async e=>{const{DB:t}=e.env,s=e.req.param("id");try{const r=await t.prepare(`
      SELECT 
        f.*,
        r.name_ko as region_name,
        r.name_en as region_name_en
      FROM festivals f
      LEFT JOIN regions r ON f.region_id = r.id
      WHERE f.id = ? AND f.status = 'active'
    `).bind(s).first();return r?e.json({success:!0,data:r}):e.json({success:!1,error:"Festival not found"},404)}catch(r){return e.json({success:!1,error:r.message},500)}});const D=new Y;D.use("/static/*",gs({root:"./public"}));D.route("/api/restaurants",Ne);D.route("/api/regions",He);D.route("/api/categories",_t);D.route("/api/orders",ue);D.route("/api/merchants",_e);D.route("/api/festivals",Be);D.get("/restaurants",async e=>{const{DB:t}=e.env;return e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>전라도 맛집 - 전라도 로컬 미식 슈퍼로드</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          }
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          .restaurant-card {
            background: white;
            border-radius: 1rem;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s;
          }
          .restaurant-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(255,107,53,0.2);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center space-x-2">
                        <i class="fas fa-arrow-left"></i>
                        <span>홈으로</span>
                    </a>
                    <h1 class="text-xl font-bold">전라도 맛집</h1>
                    <div></div>
                </div>
            </div>
        </header>

        <!-- Search & Filter -->
        <div class="bg-white shadow-md sticky top-0 z-10">
            <div class="container mx-auto px-4 py-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <select id="regionFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">전체 지역</option>
                    </select>
                    <select id="categoryFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">전체 카테고리</option>
                    </select>
                    <select id="deliveryFilter" class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                        <option value="">배달 전체</option>
                        <option value="true">배달 가능</option>
                    </select>
                    <input type="text" id="searchInput" placeholder="맛집 검색..." 
                           class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500">
                </div>
            </div>
        </div>

        <!-- Restaurant List -->
        <div class="container mx-auto px-4 py-8">
            <div id="restaurantList" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Loading -->
                <div class="col-span-full text-center py-12">
                    <i class="fas fa-spinner fa-spin text-4xl text-orange-500"></i>
                    <p class="mt-4 text-gray-600">맛집 정보를 불러오는 중...</p>
                </div>
            </div>
        </div>

        <script>
          let currentFilters = {
            region: '',
            category: '',
            delivery: '',
            search: ''
          };

          // Load regions and categories for filters
          async function loadFilters() {
            try {
              const regionsRes = await fetch('/api/regions');
              const regionsData = await regionsRes.json();
              
              const regionSelect = document.getElementById('regionFilter');
              regionsData.data.forEach(region => {
                const option = document.createElement('option');
                option.value = region.id;
                option.textContent = region.name_ko;
                regionSelect.appendChild(option);
              });

              // Load categories
              const categoriesRes = await fetch('/api/categories');
              const categoriesData = await categoriesRes.json();
              
              const categorySelect = document.getElementById('categoryFilter');
              categoriesData.data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.id;
                option.textContent = category.name_ko;
                categorySelect.appendChild(option);
              });
            } catch (error) {
              console.error('Failed to load filters:', error);
            }
          }

          // Load restaurants
          async function loadRestaurants() {
            const params = new URLSearchParams();
            if (currentFilters.region) params.append('region', currentFilters.region);
            if (currentFilters.category) params.append('category', currentFilters.category);
            if (currentFilters.delivery) params.append('delivery', currentFilters.delivery);
            if (currentFilters.search) params.append('search', currentFilters.search);
            params.append('limit', '50');

            try {
              const response = await fetch('/api/restaurants?' + params.toString());
              const data = await response.json();

              const container = document.getElementById('restaurantList');
              
              if (!data.data || data.data.length === 0) {
                container.innerHTML = \`
                  <div class="col-span-full text-center py-12">
                    <i class="fas fa-search text-4xl text-gray-400 mb-4"></i>
                    <p class="text-gray-600">검색 결과가 없습니다.</p>
                  </div>
                \`;
                return;
              }

              container.innerHTML = data.data.map(restaurant => \`
                <a href="/restaurants/\${restaurant.id}" class="restaurant-card block">
                  <div class="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                    \${restaurant.image_url ? \`
                      <img src="\${restaurant.image_url}" alt="\${restaurant.name}" 
                           class="w-full h-full object-cover">
                    \` : \`
                      <div class="w-full h-full flex items-center justify-center">
                        <i class="fas fa-utensils text-6xl text-orange-400"></i>
                      </div>
                    \`}
                    \${restaurant.verified ? \`
                      <div class="absolute top-3 right-3 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                        <i class="fas fa-check-circle"></i> 인증
                      </div>
                    \` : ''}
                    \${restaurant.delivery_available ? \`
                      <div class="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                        <i class="fas fa-motorcycle"></i> 배달
                      </div>
                    \` : ''}
                  </div>
                  <div class="p-4">
                    <h3 class="font-bold text-lg mb-2 text-gray-800">\${restaurant.name}</h3>
                    <div class="flex items-center mb-2">
                      <i class="fas fa-star text-yellow-500 mr-1"></i>
                      <span class="font-semibold">\${restaurant.rating || 0}</span>
                      <span class="text-gray-500 text-sm ml-2">(\${restaurant.review_count || 0})</span>
                    </div>
                    <div class="text-sm text-gray-600 mb-2">
                      <i class="fas fa-map-marker-alt text-orange-500 mr-1"></i>
                      \${restaurant.region_name || ''}
                    </div>
                    <div class="text-sm text-gray-600">
                      <i class="fas fa-tag text-orange-500 mr-1"></i>
                      \${restaurant.signature_menu || '대표메뉴'}
                    </div>
                  </div>
                </a>
              \`).join('');
            } catch (error) {
              console.error('Failed to load restaurants:', error);
            }
          }

          // Event listeners
          document.getElementById('regionFilter').addEventListener('change', (e) => {
            currentFilters.region = e.target.value;
            loadRestaurants();
          });

          document.getElementById('categoryFilter').addEventListener('change', (e) => {
            currentFilters.category = e.target.value;
            loadRestaurants();
          });

          document.getElementById('deliveryFilter').addEventListener('change', (e) => {
            currentFilters.delivery = e.target.value;
            loadRestaurants();
          });

          let searchTimeout;
          document.getElementById('searchInput').addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
              currentFilters.search = e.target.value;
              loadRestaurants();
            }, 500);
          });

          // Initial load
          loadFilters();
          loadRestaurants();
        <\/script>
    </body>
    </html>
  `)});D.get("/restaurants/:id",async e=>{const{DB:t}=e.env,s=e.req.param("id");return e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>맛집 상세 - 전라도 로컬 미식 슈퍼로드</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          }
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          .menu-item {
            background: white;
            border-radius: 0.75rem;
            padding: 1rem;
            border: 1px solid #e5e7eb;
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <a href="/restaurants" class="flex items-center space-x-2">
                        <i class="fas fa-arrow-left"></i>
                        <span>목록으로</span>
                    </a>
                    <h1 class="text-xl font-bold">맛집 상세</h1>
                    <div></div>
                </div>
            </div>
        </header>

        <div id="restaurantDetail" class="container mx-auto px-4 py-8">
            <!-- Loading -->
            <div class="text-center py-12">
                <i class="fas fa-spinner fa-spin text-4xl text-orange-500"></i>
                <p class="mt-4 text-gray-600">맛집 정보를 불러오는 중...</p>
            </div>
        </div>

        <script>
          const restaurantId = '${s}';

          async function loadRestaurantDetail() {
            try {
              const response = await fetch('/api/restaurants/' + restaurantId);
              const result = await response.json();

              if (!result.success || !result.data) {
                document.getElementById('restaurantDetail').innerHTML = \`
                  <div class="text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                    <p class="text-gray-600">맛집 정보를 찾을 수 없습니다.</p>
                  </div>
                \`;
                return;
              }

              const restaurant = result.data;
              
              document.getElementById('restaurantDetail').innerHTML = \`
                <!-- Main Image -->
                <div class="relative h-64 bg-gradient-to-br from-orange-100 to-orange-200 rounded-2xl overflow-hidden mb-6">
                  \${restaurant.image_url ? \`
                    <img src="\${restaurant.image_url}" alt="\${restaurant.name}" 
                         class="w-full h-full object-cover">
                  \` : \`
                    <div class="w-full h-full flex items-center justify-center">
                      <i class="fas fa-utensils text-8xl text-orange-400"></i>
                    </div>
                  \`}
                  \${restaurant.verified ? \`
                    <div class="absolute top-4 right-4 bg-blue-500 text-white px-3 py-2 rounded-full">
                      <i class="fas fa-check-circle mr-1"></i> 공식 인증
                    </div>
                  \` : ''}
                </div>

                <!-- Basic Info -->
                <div class="bg-white rounded-2xl p-6 mb-6 shadow-md">
                  <h1 class="text-3xl font-bold text-gray-800 mb-4">\${restaurant.name}</h1>
                  
                  <div class="flex items-center mb-4">
                    <div class="flex items-center">
                      <i class="fas fa-star text-yellow-500 text-xl mr-2"></i>
                      <span class="text-2xl font-bold">\${restaurant.rating || 0}</span>
                    </div>
                    <span class="text-gray-500 ml-3">(\${restaurant.review_count || 0} 리뷰)</span>
                  </div>

                  <p class="text-gray-700 mb-4">\${restaurant.description_ko || ''}</p>

                  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="flex items-start space-x-3">
                      <i class="fas fa-map-marker-alt text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">주소</p>
                        <p class="text-gray-600">\${restaurant.address || ''}</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <i class="fas fa-phone text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">전화번호</p>
                        <p class="text-gray-600">\${restaurant.phone || ''}</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <i class="fas fa-clock text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">영업시간</p>
                        <p class="text-gray-600">\${restaurant.opening_hours || '정보 없음'}</p>
                      </div>
                    </div>

                    <div class="flex items-start space-x-3">
                      <i class="fas fa-tag text-orange-500 text-xl mt-1"></i>
                      <div>
                        <p class="font-semibold text-gray-800">대표메뉴</p>
                        <p class="text-gray-600">\${restaurant.signature_menu || ''}</p>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery/Pickup Options -->
                  <div class="mt-6 pt-6 border-t flex flex-wrap gap-3">
                    \${restaurant.delivery_available ? \`
                      <div class="flex items-center bg-orange-100 text-orange-800 px-4 py-2 rounded-full">
                        <i class="fas fa-motorcycle mr-2"></i>
                        <span class="font-semibold">배달 가능</span>
                      </div>
                    \` : ''}
                    \${restaurant.pickup_available ? \`
                      <div class="flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
                        <i class="fas fa-shopping-bag mr-2"></i>
                        <span class="font-semibold">포장 가능</span>
                      </div>
                    \` : ''}
                    \${restaurant.reservation_available ? \`
                      <div class="flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full">
                        <i class="fas fa-calendar-check mr-2"></i>
                        <span class="font-semibold">예약 가능</span>
                      </div>
                    \` : ''}
                  </div>
                </div>

                <!-- Menu Section -->
                \${restaurant.menus && restaurant.menus.length > 0 ? \`
                  <div class="bg-white rounded-2xl p-6 mb-6 shadow-md">
                    <h2 class="text-2xl font-bold text-gray-800 mb-4">
                      <i class="fas fa-utensils text-orange-500 mr-2"></i>
                      메뉴
                    </h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                      \${restaurant.menus.map(menu => \`
                        <div class="menu-item">
                          <div class="flex justify-between items-start mb-2">
                            <h3 class="font-bold text-lg text-gray-800">
                              \${menu.name}
                              \${menu.popular ? '<span class="text-orange-500 ml-2"><i class="fas fa-fire"></i></span>' : ''}
                            </h3>
                            <span class="font-bold text-orange-500">\${menu.price.toLocaleString()}원</span>
                          </div>
                          \${menu.description ? \`<p class="text-sm text-gray-600">\${menu.description}</p>\` : ''}
                        </div>
                      \`).join('')}
                    </div>
                  </div>
                \` : ''}

                <!-- Map Section -->
                <div class="bg-white rounded-2xl p-6 shadow-md">
                  <h2 class="text-2xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-map text-orange-500 mr-2"></i>
                    위치
                  </h2>
                  <div class="bg-gray-200 h-64 rounded-lg flex items-center justify-center">
                    <a href="https://map.naver.com/v5/search/\${encodeURIComponent(restaurant.address || restaurant.name)}" 
                       target="_blank" 
                       class="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
                      <i class="fas fa-map-marked-alt mr-2"></i>
                      네이버 지도에서 보기
                    </a>
                  </div>
                </div>

                <!-- Order CTA -->
                <div class="mt-8 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl p-8 text-center">
                  <h3 class="text-2xl font-bold mb-2">배달 수수료 0원!</h3>
                  <p class="mb-6">지금 바로 주문하세요</p>
                  <button onclick="openOrderModal()" 
                          class="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition">
                    <i class="fas fa-shopping-cart mr-2"></i>
                    주문하기
                  </button>
                </div>
              \`;
            } catch (error) {
              console.error('Failed to load restaurant detail:', error);
              document.getElementById('restaurantDetail').innerHTML = \`
                <div class="text-center py-12">
                  <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-4"></i>
                  <p class="text-gray-600">맛집 정보를 불러오는데 실패했습니다.</p>
                </div>
              \`;
            }
          }

          // 주문 모달 열기
          function openOrderModal() {
            const modal = document.getElementById('orderModal');
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
          }

          // 주문 모달 닫기
          function closeOrderModal() {
            const modal = document.getElementById('orderModal');
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
          }

          // 주문 제출
          async function submitOrder(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            
            const orderData = {
              user_id: 1, // 임시 사용자 ID (실제로는 로그인 시스템에서 가져와야 함)
              restaurant_id: restaurantId,
              order_type: formData.get('order_type'),
              items: [], // 실제로는 선택된 메뉴를 추가해야 함
              total_amount: 0, // 실제로는 계산된 금액
              delivery_address: formData.get('delivery_address'),
              delivery_phone: formData.get('phone'),
              customer_request: formData.get('request'),
              payment_method: formData.get('payment_method')
            };

            // 배달 주문인 경우 주소 확인
            if (orderData.order_type === 'delivery' && !orderData.delivery_address) {
              alert('배달 주소를 입력해주세요.');
              return;
            }

            try {
              const response = await fetch('/api/orders', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(orderData)
              });

              const result = await response.json();

              if (result.success) {
                alert(\`주문이 완료되었습니다!\\n주문번호: \${result.data.order_number}\`);
                closeOrderModal();
                form.reset();
              } else {
                alert(\`주문 실패: \${result.error}\`);
              }
            } catch (error) {
              console.error('Order submission error:', error);
              alert('주문 처리 중 오류가 발생했습니다.');
            }
          }

          // 주문 유형 변경 시 주소 입력란 표시/숨김
          function handleOrderTypeChange(select) {
            const addressField = document.getElementById('addressField');
            if (select.value === 'delivery') {
              addressField.classList.remove('hidden');
            } else {
              addressField.classList.add('hidden');
            }
          }

          // 주문 모달 초기화
          document.addEventListener('DOMContentLoaded', () => {
            loadRestaurantDetail();
          });
        <\/script>

        <!-- 주문 모달 -->
        <div id="orderModal" class="hidden fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div class="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
              <h2 class="text-2xl font-bold text-gray-800">주문하기</h2>
              <button onclick="closeOrderModal()" class="text-gray-500 hover:text-gray-700">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>

            <form onsubmit="submitOrder(event)" class="p-6">
              <!-- 주문 유형 선택 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-shopping-bag text-orange-500 mr-2"></i>
                  주문 유형
                </label>
                <select name="order_type" onchange="handleOrderTypeChange(this)" 
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required>
                  <option value="delivery">배달</option>
                  <option value="pickup">포장</option>
                  <option value="reservation">예약</option>
                </select>
              </div>

              <!-- 연락처 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-phone text-orange-500 mr-2"></i>
                  연락처
                </label>
                <input type="tel" name="phone" placeholder="010-1234-5678" 
                       class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required>
              </div>

              <!-- 배달 주소 (배달 선택 시만 표시) -->
              <div id="addressField" class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-map-marker-alt text-orange-500 mr-2"></i>
                  배달 주소
                </label>
                <input type="text" name="delivery_address" placeholder="전라북도 전주시 완산구..." 
                       class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
              </div>

              <!-- 요청사항 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-comment text-orange-500 mr-2"></i>
                  요청사항
                </label>
                <textarea name="request" rows="3" placeholder="예: 문 앞에 놓아주세요" 
                          class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"></textarea>
              </div>

              <!-- 결제 방법 -->
              <div class="mb-6">
                <label class="block text-gray-700 font-semibold mb-2">
                  <i class="fas fa-credit-card text-orange-500 mr-2"></i>
                  결제 방법
                </label>
                <select name="payment_method" 
                        class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500" required>
                  <option value="card">카드 결제</option>
                  <option value="cash">현금 결제</option>
                  <option value="transfer">계좌 이체</option>
                </select>
              </div>

              <!-- 주의사항 -->
              <div class="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p class="text-sm text-orange-800">
                  <i class="fas fa-info-circle mr-2"></i>
                  <strong>배달 수수료 0원!</strong> 사장님께 직접 연결됩니다.
                </p>
              </div>

              <!-- 버튼 -->
              <div class="flex space-x-4">
                <button type="button" onclick="closeOrderModal()" 
                        class="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                  취소
                </button>
                <button type="submit" 
                        class="flex-1 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition font-semibold">
                  <i class="fas fa-check mr-2"></i>
                  주문하기
                </button>
              </div>
            </form>
          </div>
        </div>
    </body>
    </html>
  `)});D.get("/merchant-apply",async e=>e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>가맹점 신청 - 전라도 로컬 미식 슈퍼로드</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
          }
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-4">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <a href="/" class="flex items-center space-x-2">
                        <i class="fas fa-arrow-left"></i>
                        <span>홈으로</span>
                    </a>
                    <h1 class="text-xl font-bold">가맹점 신청</h1>
                    <div></div>
                </div>
            </div>
        </header>

        <div class="container mx-auto px-4 py-8 max-w-3xl">
            <!-- 안내 섹션 -->
            <div class="bg-white rounded-2xl p-8 mb-8 shadow-md">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 text-center">
                    <i class="fas fa-store text-orange-500 mr-2"></i>
                    배달 수수료 0원!
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div class="text-center">
                        <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-won-sign text-orange-500 text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">수수료 0원</h3>
                        <p class="text-sm text-gray-600">배달 수수료 없이<br>100% 매출 보장</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-rocket text-orange-500 text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">빠른 심사</h3>
                        <p class="text-sm text-gray-600">2-3일 내<br>심사 완료</p>
                    </div>
                    <div class="text-center">
                        <div class="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                            <i class="fas fa-headset text-orange-500 text-2xl"></i>
                        </div>
                        <h3 class="font-bold text-gray-800 mb-2">전담 지원</h3>
                        <p class="text-sm text-gray-600">1:1 맞춤<br>운영 지원</p>
                    </div>
                </div>
            </div>

            <!-- 신청 폼 -->
            <div class="bg-white rounded-2xl p-8 shadow-md">
                <h3 class="text-2xl font-bold text-gray-800 mb-6">신청 정보 입력</h3>
                
                <form id="merchantForm" onsubmit="submitApplication(event)">
                    <!-- 상호명 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            상호명 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="business_name" required
                               placeholder="예: 전주비빔밥" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 대표자명 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            대표자명 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="owner_name" required
                               placeholder="홍길동" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 연락처 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            연락처 <span class="text-red-500">*</span>
                        </label>
                        <input type="tel" name="phone" required
                               placeholder="010-1234-5678" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 이메일 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            이메일
                        </label>
                        <input type="email" name="email"
                               placeholder="example@email.com" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 주소 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            가게 주소 <span class="text-red-500">*</span>
                        </label>
                        <input type="text" name="address" required
                               placeholder="전북 전주시 완산구..." 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 지역 선택 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            지역
                        </label>
                        <select name="region_id" 
                                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                            <option value="">선택하세요</option>
                            <option value="1">광주광역시</option>
                            <option value="19">전주시</option>
                            <option value="20">군산시</option>
                            <option value="2">목포시</option>
                            <option value="3">여수시</option>
                            <option value="4">순천시</option>
                        </select>
                    </div>

                    <!-- 카테고리 선택 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            업종
                        </label>
                        <select name="category_id" 
                                class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                            <option value="">선택하세요</option>
                            <option value="1">한식당</option>
                            <option value="2">국밥/탕</option>
                            <option value="3">비빔밥</option>
                            <option value="4">회/해산물</option>
                            <option value="5">카페/디저트</option>
                        </select>
                    </div>

                    <!-- 사업자등록번호 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            사업자등록번호
                        </label>
                        <input type="text" name="business_number"
                               placeholder="123-45-67890" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 대표메뉴 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            대표메뉴
                        </label>
                        <input type="text" name="signature_menu"
                               placeholder="예: 전주비빔밥, 콩나물국밥" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 가게 소개 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            가게 소개
                        </label>
                        <textarea name="description" rows="4"
                                  placeholder="가게를 소개해주세요..." 
                                  class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500"></textarea>
                    </div>

                    <!-- 영업시간 -->
                    <div class="mb-6">
                        <label class="block text-gray-700 font-semibold mb-2">
                            영업시간
                        </label>
                        <input type="text" name="business_hours"
                               placeholder="예: 10:00-22:00" 
                               class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500">
                    </div>

                    <!-- 안내 메시지 -->
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p class="text-sm text-blue-800">
                            <i class="fas fa-info-circle mr-2"></i>
                            신청 후 2-3일 내에 담당자가 연락드립니다. 추가 서류가 필요할 수 있습니다.
                        </p>
                    </div>

                    <!-- 제출 버튼 -->
                    <button type="submit" 
                            class="w-full bg-orange-500 text-white py-4 rounded-lg hover:bg-orange-600 transition font-bold text-lg">
                        <i class="fas fa-paper-plane mr-2"></i>
                        신청하기
                    </button>
                </form>
            </div>
        </div>

        <script>
          async function submitApplication(event) {
            event.preventDefault();
            
            const form = event.target;
            const formData = new FormData(form);
            
            const data = {
              business_name: formData.get('business_name'),
              owner_name: formData.get('owner_name'),
              phone: formData.get('phone'),
              email: formData.get('email'),
              address: formData.get('address'),
              region_id: formData.get('region_id') ? parseInt(formData.get('region_id')) : null,
              category_id: formData.get('category_id') ? parseInt(formData.get('category_id')) : null,
              business_number: formData.get('business_number'),
              signature_menu: formData.get('signature_menu'),
              description: formData.get('description'),
              business_hours: formData.get('business_hours')
            };

            try {
              const response = await fetch('/api/merchants', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });

              const result = await response.json();

              if (result.success) {
                alert(\`\\n✅ 가맹점 신청이 완료되었습니다!\\n\\n신청번호: \${result.data.application_number}\\n\\n영업일 기준 2-3일 내에 연락드리겠습니다.\\n감사합니다.\`);
                window.location.href = '/';
              } else {
                alert(\`신청 실패: \${result.error}\`);
              }
            } catch (error) {
              console.error('Application submission error:', error);
              alert('신청 처리 중 오류가 발생했습니다.');
            }
          }
        <\/script>
    </body>
    </html>
  `));D.get("/",e=>e.html(`
    <!DOCTYPE html>
    <html lang="ko">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="theme-color" content="#FF6B35">
        <title>전라도 로컬 미식 슈퍼로드 - 맛집·축제·여행 올인원 플랫폼</title>
        
        <!-- Tailwind CSS -->
        <script src="https://cdn.tailwindcss.com"><\/script>
        
        <!-- Font Awesome -->
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
        
        <style>
          * {
            -webkit-tap-highlight-color: transparent;
          }
          
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
            margin: 0;
            padding: 0;
          }
          
          .gradient-orange {
            background: linear-gradient(135deg, #FF6B35 0%, #F7931E 100%);
          }
          
          .gradient-orange-soft {
            background: linear-gradient(135deg, #FFB399 0%, #FFCC99 100%);
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          .loading-pulse {
            animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .feature-card {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease;
          }
          
          .feature-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(255, 107, 53, 0.2);
          }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Header -->
        <header class="gradient-orange text-white py-6">
            <div class="container mx-auto px-4">
                <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-3">
                        <i class="fas fa-utensils text-3xl"></i>
                        <div>
                            <h1 class="text-2xl font-bold">전라도 로컬 미식 슈퍼로드</h1>
                            <p class="text-sm opacity-90">Jeonlado Local Food Superroad</p>
                        </div>
                    </div>
                    <div class="flex items-center space-x-2">
                        <span class="text-sm">🇰🇷 한국어</span>
                    </div>
                </div>
            </div>
        </header>
        
        <!-- Hero Section -->
        <section class="gradient-orange-soft py-20 text-center">
            <div class="container mx-auto px-4">
                <div class="loading-pulse mb-6">
                    <i class="fas fa-spinner fa-spin text-6xl text-orange-600"></i>
                </div>
                <h2 class="text-4xl font-bold text-gray-800 mb-4">프로젝트 로딩 중...</h2>
                <p class="text-xl text-gray-700 mb-8">전라도의 모든 맛과 여행을 한 곳에.</p>
                <p class="text-lg text-gray-600">맛집·축제·촬영지·숙박·농협까지, 전라도 생활지도의 새로운 기준</p>
            </div>
        </section>
        
        <!-- Features Preview -->
        <section class="py-16">
            <div class="container mx-auto px-4">
                <h3 class="text-3xl font-bold text-center text-gray-800 mb-12">
                    <i class="fas fa-star text-orange-500 mr-2"></i>
                    주요 기능
                </h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-utensils text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">53+ 드라마 촬영지</h4>
                        <p class="text-gray-600">오신의 사랑한 맛을 찾고 시군구별 정렬하세요</p>
                    </div>
                    
                    <!-- Feature 2 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-calendar-alt text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">30+ 지역 축제</h4>
                        <p class="text-gray-600">연중의 특별한 주를 경험하세요</p>
                    </div>
                    
                    <!-- Feature 3 -->
                    <div class="feature-card text-center">
                        <div class="mb-4">
                            <i class="fas fa-plane text-5xl text-orange-500"></i>
                        </div>
                        <h4 class="text-xl font-bold text-gray-800 mb-2">32+ 맞춤 여행사</h4>
                        <p class="text-gray-600">전문 가이드와 함께하는 특별한 여행</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Stats Section -->
        <section class="gradient-orange text-white py-16">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    <div>
                        <i class="fas fa-map-marked-alt text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">200+</p>
                        <p class="text-lg opacity-90">전라도 맛집</p>
                    </div>
                    <div>
                        <i class="fas fa-calendar-star text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">30+</p>
                        <p class="text-lg opacity-90">지역 축제</p>
                    </div>
                    <div>
                        <i class="fas fa-film text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">50+</p>
                        <p class="text-lg opacity-90">한류 촬영지</p>
                    </div>
                    <div>
                        <i class="fas fa-hotel text-4xl mb-3"></i>
                        <p class="text-4xl font-bold">100+</p>
                        <p class="text-lg opacity-90">숙박업소</p>
                    </div>
                </div>
            </div>
        </section>
        
        <!-- Featured Restaurants Section -->
        <section class="py-16 bg-gray-100">
            <div class="container mx-auto px-4">
                <div class="flex justify-between items-center mb-8">
                    <h3 class="text-3xl font-bold text-gray-800">
                        <i class="fas fa-utensils text-orange-500 mr-2"></i>
                        인기 맛집
                    </h3>
                    <a href="/restaurants" class="text-orange-500 hover:text-orange-600 font-semibold">
                        전체보기 <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                </div>
                <div id="featuredRestaurants" class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <!-- Will be loaded dynamically -->
                    <div class="text-center py-8 col-span-full">
                        <i class="fas fa-spinner fa-spin text-3xl text-orange-500"></i>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4 text-center">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">배달 수수료 0원!</h3>
                <p class="text-xl text-gray-600 mb-8">사장님 부담 없는 배달, 지금 무료로 입점하세요</p>
                <a href="/merchant-apply" class="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
                    <i class="fas fa-store mr-2"></i>
                    가맹점 신청하기
                </a>
            </div>
        </section>
        
        <script>
          // Load featured restaurants
          async function loadFeaturedRestaurants() {
            try {
              const response = await fetch('/api/restaurants?limit=6');
              const data = await response.json();
              
              const container = document.getElementById('featuredRestaurants');
              
              if (data.success && data.data && data.data.length > 0) {
                container.innerHTML = data.data.map(restaurant => \`
                  <a href="/restaurants/\${restaurant.id}" class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition block">
                    <div class="relative h-48 bg-gradient-to-br from-orange-100 to-orange-200">
                      \${restaurant.image_url ? \`
                        <img src="\${restaurant.image_url}" alt="\${restaurant.name}" 
                             class="w-full h-full object-cover">
                      \` : \`
                        <div class="w-full h-full flex items-center justify-center">
                          <i class="fas fa-utensils text-6xl text-orange-400"></i>
                        </div>
                      \`}
                      \${restaurant.delivery_available ? \`
                        <div class="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs">
                          <i class="fas fa-motorcycle"></i> 배달
                        </div>
                      \` : ''}
                    </div>
                    <div class="p-4">
                      <h4 class="font-bold text-lg mb-2">\${restaurant.name}</h4>
                      <div class="flex items-center mb-2">
                        <i class="fas fa-star text-yellow-500 mr-1"></i>
                        <span class="font-semibold">\${restaurant.rating || 0}</span>
                      </div>
                      <div class="text-sm text-gray-600">
                        <i class="fas fa-map-marker-alt text-orange-500 mr-1"></i>
                        \${restaurant.region_name || ''}
                      </div>
                    </div>
                  </a>
                \`).join('');
              }
            } catch (error) {
              console.error('Failed to load featured restaurants:', error);
            }
          }
          
          loadFeaturedRestaurants();
        <\/script>
        
        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-8">
            <div class="container mx-auto px-4 text-center">
                <p class="text-lg font-bold mb-2">전라도 로컬 미식 슈퍼로드</p>
                <p class="text-sm opacity-75">맛·여행·축제·촬영지까지, 전라도를 완성하는 단 하나의 슈퍼앱</p>
                <p class="text-sm opacity-75 mt-4">© 2024 Jeonlado Superroad. All rights reserved.</p>
            </div>
        </footer>
    </body>
    </html>
  `));const Ge=new Y,ms=Object.assign({"/src/index.tsx":D});let Rt=!1;for(const[,e]of Object.entries(ms))e&&(Ge.all("*",t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Ge.notFound(t=>{let s;try{s=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,s)}),Rt=!0);if(!Rt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{Ge as default};
