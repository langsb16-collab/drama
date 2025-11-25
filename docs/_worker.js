var yt=Object.defineProperty;var Ie=e=>{throw TypeError(e)};var wt=(e,t,r)=>t in e?yt(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var u=(e,t,r)=>wt(e,typeof t!="symbol"?t+"":t,r),Pe=(e,t,r)=>t.has(e)||Ie("Cannot "+r);var a=(e,t,r)=>(Pe(e,t,"read from private field"),r?r.call(e):t.get(e)),g=(e,t,r)=>t.has(e)?Ie("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),f=(e,t,r,s)=>(Pe(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),x=(e,t,r)=>(Pe(e,t,"access private method"),r);var Me=(e,t,r,s)=>({set _(n){f(e,t,n,r)},get _(){return a(e,t,s)}});var ke=(e,t,r)=>(s,n)=>{let i=-1;return c(0);async function c(l){if(l<=i)throw new Error("next() called multiple times");i=l;let o,h=!1,d;if(e[l]?(d=e[l][0][0],s.req.routeIndex=l):d=l===e.length&&n||void 0,d)try{o=await d(s,()=>c(l+1))}catch(p){if(p instanceof Error&&t)s.error=p,o=await t(p,s),h=!0;else throw p}else s.finalized===!1&&r&&(o=await r(s));return o&&(s.finalized===!1||h)&&(s.res=o),s}},Et=Symbol(),Rt=async(e,t=Object.create(null))=>{const{all:r=!1,dot:s=!1}=t,i=(e instanceof nt?e.raw.headers:e.headers).get("Content-Type");return i!=null&&i.startsWith("multipart/form-data")||i!=null&&i.startsWith("application/x-www-form-urlencoded")?jt(e,{all:r,dot:s}):{}};async function jt(e,t){const r=await e.formData();return r?Ot(r,t):{}}function Ot(e,t){const r=Object.create(null);return e.forEach((s,n)=>{t.all||n.endsWith("[]")?St(r,n,s):r[n]=s}),t.dot&&Object.entries(r).forEach(([s,n])=>{s.includes(".")&&(Ct(r,s,n),delete r[s])}),r}var St=(e,t,r)=>{e[t]!==void 0?Array.isArray(e[t])?e[t].push(r):e[t]=[e[t],r]:t.endsWith("[]")?e[t]=[r]:e[t]=r},Ct=(e,t,r)=>{let s=e;const n=t.split(".");n.forEach((i,c)=>{c===n.length-1?s[i]=r:((!s[i]||typeof s[i]!="object"||Array.isArray(s[i])||s[i]instanceof File)&&(s[i]=Object.create(null)),s=s[i])})},Ze=e=>{const t=e.split("/");return t[0]===""&&t.shift(),t},At=e=>{const{groups:t,path:r}=Pt(e),s=Ze(r);return Tt(s,t)},Pt=e=>{const t=[];return e=e.replace(/\{[^}]+\}/g,(r,s)=>{const n=`@${s}`;return t.push([n,r]),n}),{groups:t,path:e}},Tt=(e,t)=>{for(let r=t.length-1;r>=0;r--){const[s]=t[r];for(let n=e.length-1;n>=0;n--)if(e[n].includes(s)){e[n]=e[n].replace(s,t[r][1]);break}}return e},ye={},_t=(e,t)=>{if(e==="*")return"*";const r=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(r){const s=`${e}#${t}`;return ye[s]||(r[2]?ye[s]=t&&t[0]!==":"&&t[0]!=="*"?[s,r[1],new RegExp(`^${r[2]}(?=/${t})`)]:[e,r[1],new RegExp(`^${r[2]}$`)]:ye[s]=[e,r[1],!0]),ye[s]}return null},$e=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,r=>{try{return t(r)}catch{return r}})}},Nt=e=>$e(e,decodeURI),et=e=>{const t=e.url,r=t.indexOf("/",t.indexOf(":")+4);let s=r;for(;s<t.length;s++){const n=t.charCodeAt(s);if(n===37){const i=t.indexOf("?",s),c=t.slice(r,i===-1?void 0:i);return Nt(c.includes("%25")?c.replace(/%25/g,"%2525"):c)}else if(n===63)break}return t.slice(r,s)},Ft=e=>{const t=et(e);return t.length>1&&t.at(-1)==="/"?t.slice(0,-1):t},te=(e,t,...r)=>(r.length&&(t=te(t,...r)),`${(e==null?void 0:e[0])==="/"?"":"/"}${e}${t==="/"?"":`${(e==null?void 0:e.at(-1))==="/"?"":"/"}${(t==null?void 0:t[0])==="/"?t.slice(1):t}`}`),tt=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(":"))return null;const t=e.split("/"),r=[];let s="";return t.forEach(n=>{if(n!==""&&!/\:/.test(n))s+="/"+n;else if(/\:/.test(n))if(/\?/.test(n)){r.length===0&&s===""?r.push("/"):r.push(s);const i=n.replace("?","");s+="/"+i,r.push(s)}else s+="/"+n}),r.filter((n,i,c)=>c.indexOf(n)===i)},Te=e=>/[%+]/.test(e)?(e.indexOf("+")!==-1&&(e=e.replace(/\+/g," ")),e.indexOf("%")!==-1?$e(e,st):e):e,rt=(e,t,r)=>{let s;if(!r&&t&&!/[%+]/.test(t)){let c=e.indexOf("?",8);if(c===-1)return;for(e.startsWith(t,c+1)||(c=e.indexOf(`&${t}`,c+1));c!==-1;){const l=e.charCodeAt(c+t.length+1);if(l===61){const o=c+t.length+2,h=e.indexOf("&",o);return Te(e.slice(o,h===-1?void 0:h))}else if(l==38||isNaN(l))return"";c=e.indexOf(`&${t}`,c+1)}if(s=/[%+]/.test(e),!s)return}const n={};s??(s=/[%+]/.test(e));let i=e.indexOf("?",8);for(;i!==-1;){const c=e.indexOf("&",i+1);let l=e.indexOf("=",i);l>c&&c!==-1&&(l=-1);let o=e.slice(i+1,l===-1?c===-1?void 0:c:l);if(s&&(o=Te(o)),i=c,o==="")continue;let h;l===-1?h="":(h=e.slice(l+1,c===-1?void 0:c),s&&(h=Te(h))),r?(n[o]&&Array.isArray(n[o])||(n[o]=[]),n[o].push(h)):n[o]??(n[o]=h)}return t?n[t]:n},$t=rt,Dt=(e,t)=>rt(e,t,!0),st=decodeURIComponent,Le=e=>$e(e,st),ne,A,M,it,at,Ne,L,Be,nt=(Be=class{constructor(e,t="/",r=[[]]){g(this,M);u(this,"raw");g(this,ne);g(this,A);u(this,"routeIndex",0);u(this,"path");u(this,"bodyCache",{});g(this,L,e=>{const{bodyCache:t,raw:r}=this,s=t[e];if(s)return s;const n=Object.keys(t)[0];return n?t[n].then(i=>(n==="json"&&(i=JSON.stringify(i)),new Response(i)[e]())):t[e]=r[e]()});this.raw=e,this.path=t,f(this,A,r),f(this,ne,{})}param(e){return e?x(this,M,it).call(this,e):x(this,M,at).call(this)}query(e){return $t(this.url,e)}queries(e){return Dt(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;const t={};return this.raw.headers.forEach((r,s)=>{t[s]=r}),t}async parseBody(e){var t;return(t=this.bodyCache).parsedBody??(t.parsedBody=await Rt(this,e))}json(){return a(this,L).call(this,"text").then(e=>JSON.parse(e))}text(){return a(this,L).call(this,"text")}arrayBuffer(){return a(this,L).call(this,"arrayBuffer")}blob(){return a(this,L).call(this,"blob")}formData(){return a(this,L).call(this,"formData")}addValidatedData(e,t){a(this,ne)[e]=t}valid(e){return a(this,ne)[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[Et](){return a(this,A)}get matchedRoutes(){return a(this,A)[0].map(([[,e]])=>e)}get routePath(){return a(this,A)[0].map(([[,e]])=>e)[this.routeIndex].path}},ne=new WeakMap,A=new WeakMap,M=new WeakSet,it=function(e){const t=a(this,A)[0][this.routeIndex][1][e],r=x(this,M,Ne).call(this,t);return r&&/\%/.test(r)?Le(r):r},at=function(){const e={},t=Object.keys(a(this,A)[0][this.routeIndex][1]);for(const r of t){const s=x(this,M,Ne).call(this,a(this,A)[0][this.routeIndex][1][r]);s!==void 0&&(e[r]=/\%/.test(s)?Le(s):s)}return e},Ne=function(e){return a(this,A)[1]?a(this,A)[1][e]:e},L=new WeakMap,Be),Ht={Stringify:1},ot=async(e,t,r,s,n)=>{typeof e=="object"&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));const i=e.callbacks;return i!=null&&i.length?(n?n[0]+=e:n=[e],Promise.all(i.map(l=>l({phase:t,buffer:n,context:s}))).then(l=>Promise.all(l.filter(Boolean).map(o=>ot(o,t,!1,s,n))).then(()=>n[0]))):Promise.resolve(e)},It="text/plain; charset=UTF-8",_e=(e,t)=>({"Content-Type":e,...t}),pe,ge,$,ie,D,S,xe,ae,oe,V,me,ve,z,re,Ke,Mt=(Ke=class{constructor(e,t){g(this,z);g(this,pe);g(this,ge);u(this,"env",{});g(this,$);u(this,"finalized",!1);u(this,"error");g(this,ie);g(this,D);g(this,S);g(this,xe);g(this,ae);g(this,oe);g(this,V);g(this,me);g(this,ve);u(this,"render",(...e)=>(a(this,ae)??f(this,ae,t=>this.html(t)),a(this,ae).call(this,...e)));u(this,"setLayout",e=>f(this,xe,e));u(this,"getLayout",()=>a(this,xe));u(this,"setRenderer",e=>{f(this,ae,e)});u(this,"header",(e,t,r)=>{this.finalized&&f(this,S,new Response(a(this,S).body,a(this,S)));const s=a(this,S)?a(this,S).headers:a(this,V)??f(this,V,new Headers);t===void 0?s.delete(e):r!=null&&r.append?s.append(e,t):s.set(e,t)});u(this,"status",e=>{f(this,ie,e)});u(this,"set",(e,t)=>{a(this,$)??f(this,$,new Map),a(this,$).set(e,t)});u(this,"get",e=>a(this,$)?a(this,$).get(e):void 0);u(this,"newResponse",(...e)=>x(this,z,re).call(this,...e));u(this,"body",(e,t,r)=>x(this,z,re).call(this,e,t,r));u(this,"text",(e,t,r)=>!a(this,V)&&!a(this,ie)&&!t&&!r&&!this.finalized?new Response(e):x(this,z,re).call(this,e,t,_e(It,r)));u(this,"json",(e,t,r)=>x(this,z,re).call(this,JSON.stringify(e),t,_e("application/json",r)));u(this,"html",(e,t,r)=>{const s=n=>x(this,z,re).call(this,n,t,_e("text/html; charset=UTF-8",r));return typeof e=="object"?ot(e,Ht.Stringify,!1,{}).then(s):s(e)});u(this,"redirect",(e,t)=>{const r=String(e);return this.header("Location",/[^\x00-\xFF]/.test(r)?encodeURI(r):r),this.newResponse(null,t??302)});u(this,"notFound",()=>(a(this,oe)??f(this,oe,()=>new Response),a(this,oe).call(this,this)));f(this,pe,e),t&&(f(this,D,t.executionCtx),this.env=t.env,f(this,oe,t.notFoundHandler),f(this,ve,t.path),f(this,me,t.matchResult))}get req(){return a(this,ge)??f(this,ge,new nt(a(this,pe),a(this,ve),a(this,me))),a(this,ge)}get event(){if(a(this,D)&&"respondWith"in a(this,D))return a(this,D);throw Error("This context has no FetchEvent")}get executionCtx(){if(a(this,D))return a(this,D);throw Error("This context has no ExecutionContext")}get res(){return a(this,S)||f(this,S,new Response(null,{headers:a(this,V)??f(this,V,new Headers)}))}set res(e){if(a(this,S)&&e){e=new Response(e.body,e);for(const[t,r]of a(this,S).headers.entries())if(t!=="content-type")if(t==="set-cookie"){const s=a(this,S).headers.getSetCookie();e.headers.delete("set-cookie");for(const n of s)e.headers.append("set-cookie",n)}else e.headers.set(t,r)}f(this,S,e),this.finalized=!0}get var(){return a(this,$)?Object.fromEntries(a(this,$)):{}}},pe=new WeakMap,ge=new WeakMap,$=new WeakMap,ie=new WeakMap,D=new WeakMap,S=new WeakMap,xe=new WeakMap,ae=new WeakMap,oe=new WeakMap,V=new WeakMap,me=new WeakMap,ve=new WeakMap,z=new WeakSet,re=function(e,t,r){const s=a(this,S)?new Headers(a(this,S).headers):a(this,V)??new Headers;if(typeof t=="object"&&"headers"in t){const i=t.headers instanceof Headers?t.headers:new Headers(t.headers);for(const[c,l]of i)c.toLowerCase()==="set-cookie"?s.append(c,l):s.set(c,l)}if(r)for(const[i,c]of Object.entries(r))if(typeof c=="string")s.set(i,c);else{s.delete(i);for(const l of c)s.append(i,l)}const n=typeof t=="number"?t:(t==null?void 0:t.status)??a(this,ie);return new Response(e,{status:n,headers:s})},Ke),y="ALL",kt="all",Lt=["get","post","put","delete","options","patch"],ct="Can not add a route since the matcher is already built.",lt=class extends Error{},zt="__COMPOSED_HANDLER",Ut=e=>e.text("404 Not Found",404),ze=(e,t)=>{if("getResponse"in e){const r=e.getResponse();return t.newResponse(r.body,r)}return console.error(e),t.text("Internal Server Error",500)},P,w,dt,T,W,we,Ee,We,ht=(We=class{constructor(t={}){g(this,w);u(this,"get");u(this,"post");u(this,"put");u(this,"delete");u(this,"options");u(this,"patch");u(this,"all");u(this,"on");u(this,"use");u(this,"router");u(this,"getPath");u(this,"_basePath","/");g(this,P,"/");u(this,"routes",[]);g(this,T,Ut);u(this,"errorHandler",ze);u(this,"onError",t=>(this.errorHandler=t,this));u(this,"notFound",t=>(f(this,T,t),this));u(this,"fetch",(t,...r)=>x(this,w,Ee).call(this,t,r[1],r[0],t.method));u(this,"request",(t,r,s,n)=>t instanceof Request?this.fetch(r?new Request(t,r):t,s,n):(t=t.toString(),this.fetch(new Request(/^https?:\/\//.test(t)?t:`http://localhost${te("/",t)}`,r),s,n)));u(this,"fire",()=>{addEventListener("fetch",t=>{t.respondWith(x(this,w,Ee).call(this,t.request,t,void 0,t.request.method))})});[...Lt,kt].forEach(i=>{this[i]=(c,...l)=>(typeof c=="string"?f(this,P,c):x(this,w,W).call(this,i,a(this,P),c),l.forEach(o=>{x(this,w,W).call(this,i,a(this,P),o)}),this)}),this.on=(i,c,...l)=>{for(const o of[c].flat()){f(this,P,o);for(const h of[i].flat())l.map(d=>{x(this,w,W).call(this,h.toUpperCase(),a(this,P),d)})}return this},this.use=(i,...c)=>(typeof i=="string"?f(this,P,i):(f(this,P,"*"),c.unshift(i)),c.forEach(l=>{x(this,w,W).call(this,y,a(this,P),l)}),this);const{strict:s,...n}=t;Object.assign(this,n),this.getPath=s??!0?t.getPath??et:Ft}route(t,r){const s=this.basePath(t);return r.routes.map(n=>{var c;let i;r.errorHandler===ze?i=n.handler:(i=async(l,o)=>(await ke([],r.errorHandler)(l,()=>n.handler(l,o))).res,i[zt]=n.handler),x(c=s,w,W).call(c,n.method,n.path,i)}),this}basePath(t){const r=x(this,w,dt).call(this);return r._basePath=te(this._basePath,t),r}mount(t,r,s){let n,i;s&&(typeof s=="function"?i=s:(i=s.optionHandler,s.replaceRequest===!1?n=o=>o:n=s.replaceRequest));const c=i?o=>{const h=i(o);return Array.isArray(h)?h:[h]}:o=>{let h;try{h=o.executionCtx}catch{}return[o.env,h]};n||(n=(()=>{const o=te(this._basePath,t),h=o==="/"?0:o.length;return d=>{const p=new URL(d.url);return p.pathname=p.pathname.slice(h)||"/",new Request(p,d)}})());const l=async(o,h)=>{const d=await r(n(o.req.raw),...c(o));if(d)return d;await h()};return x(this,w,W).call(this,y,te(t,"*"),l),this}},P=new WeakMap,w=new WeakSet,dt=function(){const t=new ht({router:this.router,getPath:this.getPath});return t.errorHandler=this.errorHandler,f(t,T,a(this,T)),t.routes=this.routes,t},T=new WeakMap,W=function(t,r,s){t=t.toUpperCase(),r=te(this._basePath,r);const n={basePath:this._basePath,path:r,method:t,handler:s};this.router.add(t,r,[s,n]),this.routes.push(n)},we=function(t,r){if(t instanceof Error)return this.errorHandler(t,r);throw t},Ee=function(t,r,s,n){if(n==="HEAD")return(async()=>new Response(null,await x(this,w,Ee).call(this,t,r,s,"GET")))();const i=this.getPath(t,{env:s}),c=this.router.match(n,i),l=new Mt(t,{path:i,matchResult:c,env:s,executionCtx:r,notFoundHandler:a(this,T)});if(c[0].length===1){let h;try{h=c[0][0][0][0](l,async()=>{l.res=await a(this,T).call(this,l)})}catch(d){return x(this,w,we).call(this,d,l)}return h instanceof Promise?h.then(d=>d||(l.finalized?l.res:a(this,T).call(this,l))).catch(d=>x(this,w,we).call(this,d,l)):h??a(this,T).call(this,l)}const o=ke(c[0],this.errorHandler,a(this,T));return(async()=>{try{const h=await o(l);if(!h.finalized)throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return h.res}catch(h){return x(this,w,we).call(this,h,l)}})()},We),ft=[];function qt(e,t){const r=this.buildAllMatchers(),s=(n,i)=>{const c=r[n]||r[y],l=c[2][i];if(l)return l;const o=i.match(c[0]);if(!o)return[[],ft];const h=o.indexOf("",1);return[c[1][h],o]};return this.match=s,s(e,t)}var je="[^/]+",fe=".*",ue="(?:|/.*)",se=Symbol(),Bt=new Set(".\\+*[^]$()");function Kt(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1||e===fe||e===ue?1:t===fe||t===ue?-1:e===je?1:t===je?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var J,Y,_,Ge,Fe=(Ge=class{constructor(){g(this,J);g(this,Y);g(this,_,Object.create(null))}insert(t,r,s,n,i){if(t.length===0){if(a(this,J)!==void 0)throw se;if(i)return;f(this,J,r);return}const[c,...l]=t,o=c==="*"?l.length===0?["","",fe]:["","",je]:c==="/*"?["","",ue]:c.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);let h;if(o){const d=o[1];let p=o[2]||je;if(d&&o[2]&&(p===".*"||(p=p.replace(/^\((?!\?:)(?=[^)]+\)$)/,"(?:"),/\((?!\?:)/.test(p))))throw se;if(h=a(this,_)[p],!h){if(Object.keys(a(this,_)).some(m=>m!==fe&&m!==ue))throw se;if(i)return;h=a(this,_)[p]=new Fe,d!==""&&f(h,Y,n.varIndex++)}!i&&d!==""&&s.push([d,a(h,Y)])}else if(h=a(this,_)[c],!h){if(Object.keys(a(this,_)).some(d=>d.length>1&&d!==fe&&d!==ue))throw se;if(i)return;h=a(this,_)[c]=new Fe}h.insert(l,r,s,n,i)}buildRegExpStr(){const r=Object.keys(a(this,_)).sort(Kt).map(s=>{const n=a(this,_)[s];return(typeof a(n,Y)=="number"?`(${s})@${a(n,Y)}`:Bt.has(s)?`\\${s}`:s)+n.buildRegExpStr()});return typeof a(this,J)=="number"&&r.unshift(`#${a(this,J)}`),r.length===0?"":r.length===1?r[0]:"(?:"+r.join("|")+")"}},J=new WeakMap,Y=new WeakMap,_=new WeakMap,Ge),Oe,be,Ve,Wt=(Ve=class{constructor(){g(this,Oe,{varIndex:0});g(this,be,new Fe)}insert(e,t,r){const s=[],n=[];for(let c=0;;){let l=!1;if(e=e.replace(/\{[^}]+\}/g,o=>{const h=`@\\${c}`;return n[c]=[h,o],c++,l=!0,h}),!l)break}const i=e.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let c=n.length-1;c>=0;c--){const[l]=n[c];for(let o=i.length-1;o>=0;o--)if(i[o].indexOf(l)!==-1){i[o]=i[o].replace(l,n[c][1]);break}}return a(this,be).insert(i,t,s,a(this,Oe),r),s}buildRegExp(){let e=a(this,be).buildRegExpStr();if(e==="")return[/^$/,[],[]];let t=0;const r=[],s=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(n,i,c)=>i!==void 0?(r[++t]=Number(i),"$()"):(c!==void 0&&(s[Number(c)]=++t),"")),[new RegExp(`^${e}`),r,s]}},Oe=new WeakMap,be=new WeakMap,Ve),Gt=[/^$/,[],Object.create(null)],Re=Object.create(null);function ut(e){return Re[e]??(Re[e]=new RegExp(e==="*"?"":`^${e.replace(/\/\*$|([.\\+*[^\]$()])/g,(t,r)=>r?`\\${r}`:"(?:|/.*)")}$`))}function Vt(){Re=Object.create(null)}function Jt(e){var h;const t=new Wt,r=[];if(e.length===0)return Gt;const s=e.map(d=>[!/\*|\/:/.test(d[0]),...d]).sort(([d,p],[m,R])=>d?1:m?-1:p.length-R.length),n=Object.create(null);for(let d=0,p=-1,m=s.length;d<m;d++){const[R,C,v]=s[d];R?n[C]=[v.map(([O])=>[O,Object.create(null)]),ft]:p++;let b;try{b=t.insert(C,p,R)}catch(O){throw O===se?new lt(C):O}R||(r[p]=v.map(([O,Z])=>{const le=Object.create(null);for(Z-=1;Z>=0;Z--){const[N,Ce]=b[Z];le[N]=Ce}return[O,le]}))}const[i,c,l]=t.buildRegExp();for(let d=0,p=r.length;d<p;d++)for(let m=0,R=r[d].length;m<R;m++){const C=(h=r[d][m])==null?void 0:h[1];if(!C)continue;const v=Object.keys(C);for(let b=0,O=v.length;b<O;b++)C[v[b]]=l[C[v[b]]]}const o=[];for(const d in c)o[d]=r[c[d]];return[i,o,n]}function ee(e,t){if(e){for(const r of Object.keys(e).sort((s,n)=>n.length-s.length))if(ut(r).test(t))return[...e[r]]}}var U,q,Se,pt,Je,Yt=(Je=class{constructor(){g(this,Se);u(this,"name","RegExpRouter");g(this,U);g(this,q);u(this,"match",qt);f(this,U,{[y]:Object.create(null)}),f(this,q,{[y]:Object.create(null)})}add(e,t,r){var l;const s=a(this,U),n=a(this,q);if(!s||!n)throw new Error(ct);s[e]||[s,n].forEach(o=>{o[e]=Object.create(null),Object.keys(o[y]).forEach(h=>{o[e][h]=[...o[y][h]]})}),t==="/*"&&(t="*");const i=(t.match(/\/:/g)||[]).length;if(/\*$/.test(t)){const o=ut(t);e===y?Object.keys(s).forEach(h=>{var d;(d=s[h])[t]||(d[t]=ee(s[h],t)||ee(s[y],t)||[])}):(l=s[e])[t]||(l[t]=ee(s[e],t)||ee(s[y],t)||[]),Object.keys(s).forEach(h=>{(e===y||e===h)&&Object.keys(s[h]).forEach(d=>{o.test(d)&&s[h][d].push([r,i])})}),Object.keys(n).forEach(h=>{(e===y||e===h)&&Object.keys(n[h]).forEach(d=>o.test(d)&&n[h][d].push([r,i]))});return}const c=tt(t)||[t];for(let o=0,h=c.length;o<h;o++){const d=c[o];Object.keys(n).forEach(p=>{var m;(e===y||e===p)&&((m=n[p])[d]||(m[d]=[...ee(s[p],d)||ee(s[y],d)||[]]),n[p][d].push([r,i-h+o+1]))})}}buildAllMatchers(){const e=Object.create(null);return Object.keys(a(this,q)).concat(Object.keys(a(this,U))).forEach(t=>{e[t]||(e[t]=x(this,Se,pt).call(this,t))}),f(this,U,f(this,q,void 0)),Vt(),e}},U=new WeakMap,q=new WeakMap,Se=new WeakSet,pt=function(e){const t=[];let r=e===y;return[a(this,U),a(this,q)].forEach(s=>{const n=s[e]?Object.keys(s[e]).map(i=>[i,s[e][i]]):[];n.length!==0?(r||(r=!0),t.push(...n)):e!==y&&t.push(...Object.keys(s[y]).map(i=>[i,s[y][i]]))}),r?Jt(t):null},Je),B,H,Ye,Xt=(Ye=class{constructor(e){u(this,"name","SmartRouter");g(this,B,[]);g(this,H,[]);f(this,B,e.routers)}add(e,t,r){if(!a(this,H))throw new Error(ct);a(this,H).push([e,t,r])}match(e,t){if(!a(this,H))throw new Error("Fatal error");const r=a(this,B),s=a(this,H),n=r.length;let i=0,c;for(;i<n;i++){const l=r[i];try{for(let o=0,h=s.length;o<h;o++)l.add(...s[o]);c=l.match(e,t)}catch(o){if(o instanceof lt)continue;throw o}this.match=l.match.bind(l),f(this,B,[l]),f(this,H,void 0);break}if(i===n)throw new Error("Fatal error");return this.name=`SmartRouter + ${this.activeRouter.name}`,c}get activeRouter(){if(a(this,H)||a(this,B).length!==1)throw new Error("No active router has been determined yet.");return a(this,B)[0]}},B=new WeakMap,H=new WeakMap,Ye),de=Object.create(null),K,j,X,ce,E,I,G,Xe,gt=(Xe=class{constructor(e,t,r){g(this,I);g(this,K);g(this,j);g(this,X);g(this,ce,0);g(this,E,de);if(f(this,j,r||Object.create(null)),f(this,K,[]),e&&t){const s=Object.create(null);s[e]={handler:t,possibleKeys:[],score:0},f(this,K,[s])}f(this,X,[])}insert(e,t,r){f(this,ce,++Me(this,ce)._);let s=this;const n=At(t),i=[];for(let c=0,l=n.length;c<l;c++){const o=n[c],h=n[c+1],d=_t(o,h),p=Array.isArray(d)?d[0]:o;if(p in a(s,j)){s=a(s,j)[p],d&&i.push(d[1]);continue}a(s,j)[p]=new gt,d&&(a(s,X).push(d),i.push(d[1])),s=a(s,j)[p]}return a(s,K).push({[e]:{handler:r,possibleKeys:i.filter((c,l,o)=>o.indexOf(c)===l),score:a(this,ce)}}),s}search(e,t){var l;const r=[];f(this,E,de);let n=[this];const i=Ze(t),c=[];for(let o=0,h=i.length;o<h;o++){const d=i[o],p=o===h-1,m=[];for(let R=0,C=n.length;R<C;R++){const v=n[R],b=a(v,j)[d];b&&(f(b,E,a(v,E)),p?(a(b,j)["*"]&&r.push(...x(this,I,G).call(this,a(b,j)["*"],e,a(v,E))),r.push(...x(this,I,G).call(this,b,e,a(v,E)))):m.push(b));for(let O=0,Z=a(v,X).length;O<Z;O++){const le=a(v,X)[O],N=a(v,E)===de?{}:{...a(v,E)};if(le==="*"){const k=a(v,j)["*"];k&&(r.push(...x(this,I,G).call(this,k,e,a(v,E))),f(k,E,N),m.push(k));continue}const[Ce,He,he]=le;if(!d&&!(he instanceof RegExp))continue;const F=a(v,j)[Ce],bt=i.slice(o).join("/");if(he instanceof RegExp){const k=he.exec(bt);if(k){if(N[He]=k[0],r.push(...x(this,I,G).call(this,F,e,a(v,E),N)),Object.keys(a(F,j)).length){f(F,E,N);const Ae=((l=k[0].match(/\//))==null?void 0:l.length)??0;(c[Ae]||(c[Ae]=[])).push(F)}continue}}(he===!0||he.test(d))&&(N[He]=d,p?(r.push(...x(this,I,G).call(this,F,e,N,a(v,E))),a(F,j)["*"]&&r.push(...x(this,I,G).call(this,a(F,j)["*"],e,N,a(v,E)))):(f(F,E,N),m.push(F)))}}n=m.concat(c.shift()??[])}return r.length>1&&r.sort((o,h)=>o.score-h.score),[r.map(({handler:o,params:h})=>[o,h])]}},K=new WeakMap,j=new WeakMap,X=new WeakMap,ce=new WeakMap,E=new WeakMap,I=new WeakSet,G=function(e,t,r,s){const n=[];for(let i=0,c=a(e,K).length;i<c;i++){const l=a(e,K)[i],o=l[t]||l[y],h={};if(o!==void 0&&(o.params=Object.create(null),n.push(o),r!==de||s&&s!==de))for(let d=0,p=o.possibleKeys.length;d<p;d++){const m=o.possibleKeys[d],R=h[o.score];o.params[m]=s!=null&&s[m]&&!R?s[m]:r[m]??(s==null?void 0:s[m]),h[o.score]=!0}}return n},Xe),Q,Qe,Qt=(Qe=class{constructor(){u(this,"name","TrieRouter");g(this,Q);f(this,Q,new gt)}add(e,t,r){const s=tt(t);if(s){for(let n=0,i=s.length;n<i;n++)a(this,Q).insert(e,s[n],r);return}a(this,Q).insert(e,t,r)}match(e,t){return a(this,Q).search(e,t)}},Q=new WeakMap,Qe),xt=class extends ht{constructor(e={}){super(e),this.router=e.router??new Xt({routers:[new Yt,new Qt]})}},Zt=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i,Ue=(e,t=tr)=>{const r=/\.([a-zA-Z0-9]+?)$/,s=e.match(r);if(!s)return;let n=t[s[1]];return n&&n.startsWith("text")&&(n+="; charset=utf-8"),n},er={aac:"audio/aac",avi:"video/x-msvideo",avif:"image/avif",av1:"video/av1",bin:"application/octet-stream",bmp:"image/bmp",css:"text/css",csv:"text/csv",eot:"application/vnd.ms-fontobject",epub:"application/epub+zip",gif:"image/gif",gz:"application/gzip",htm:"text/html",html:"text/html",ico:"image/x-icon",ics:"text/calendar",jpeg:"image/jpeg",jpg:"image/jpeg",js:"text/javascript",json:"application/json",jsonld:"application/ld+json",map:"application/json",mid:"audio/x-midi",midi:"audio/x-midi",mjs:"text/javascript",mp3:"audio/mpeg",mp4:"video/mp4",mpeg:"video/mpeg",oga:"audio/ogg",ogv:"video/ogg",ogx:"application/ogg",opus:"audio/opus",otf:"font/otf",pdf:"application/pdf",png:"image/png",rtf:"application/rtf",svg:"image/svg+xml",tif:"image/tiff",tiff:"image/tiff",ts:"video/mp2t",ttf:"font/ttf",txt:"text/plain",wasm:"application/wasm",webm:"video/webm",weba:"audio/webm",webmanifest:"application/manifest+json",webp:"image/webp",woff:"font/woff",woff2:"font/woff2",xhtml:"application/xhtml+xml",xml:"application/xml",zip:"application/zip","3gp":"video/3gpp","3g2":"video/3gpp2",gltf:"model/gltf+json",glb:"model/gltf-binary"},tr=er,rr=(...e)=>{let t=e.filter(n=>n!=="").join("/");t=t.replace(new RegExp("(?<=\\/)\\/+","g"),"");const r=t.split("/"),s=[];for(const n of r)n===".."&&s.length>0&&s.at(-1)!==".."?s.pop():n!=="."&&s.push(n);return s.join("/")||"."},mt={br:".br",zstd:".zst",gzip:".gz"},sr=Object.keys(mt),nr="index.html",ir=e=>{const t=e.root??"./",r=e.path,s=e.join??rr;return async(n,i)=>{var d,p,m,R;if(n.finalized)return i();let c;if(e.path)c=e.path;else try{if(c=decodeURIComponent(n.req.path),/(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(c))throw new Error}catch{return await((d=e.onNotFound)==null?void 0:d.call(e,n.req.path,n)),i()}let l=s(t,!r&&e.rewriteRequestPath?e.rewriteRequestPath(c):c);e.isDir&&await e.isDir(l)&&(l=s(l,nr));const o=e.getContent;let h=await o(l,n);if(h instanceof Response)return n.newResponse(h.body,h);if(h){const C=e.mimes&&Ue(l,e.mimes)||Ue(l);if(n.header("Content-Type",C||"application/octet-stream"),e.precompressed&&(!C||Zt.test(C))){const v=new Set((p=n.req.header("Accept-Encoding"))==null?void 0:p.split(",").map(b=>b.trim()));for(const b of sr){if(!v.has(b))continue;const O=await o(l+mt[b],n);if(O){h=O,n.header("Content-Encoding",b),n.header("Vary","Accept-Encoding",{append:!0});break}}}return await((m=e.onFound)==null?void 0:m.call(e,l,n)),n.body(h)}await((R=e.onNotFound)==null?void 0:R.call(e,l,n)),await i()}},ar=async(e,t)=>{let r;t&&t.manifest?typeof t.manifest=="string"?r=JSON.parse(t.manifest):r=t.manifest:typeof __STATIC_CONTENT_MANIFEST=="string"?r=JSON.parse(__STATIC_CONTENT_MANIFEST):r=__STATIC_CONTENT_MANIFEST;let s;t&&t.namespace?s=t.namespace:s=__STATIC_CONTENT;const n=r[e]||e;if(!n)return null;const i=await s.get(n,{type:"stream"});return i||null},or=e=>async function(r,s){return ir({...e,getContent:async i=>ar(i,{manifest:e.manifest,namespace:e.namespace?e.namespace:r.env?r.env.__STATIC_CONTENT:void 0})})(r,s)},cr=e=>or(e);const De=new xt;De.use("/static/*",cr({root:"./public"}));De.get("/",e=>e.html(`
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
        
        <!-- CTA Section -->
        <section class="py-16 bg-white">
            <div class="container mx-auto px-4 text-center">
                <h3 class="text-3xl font-bold text-gray-800 mb-4">배달 수수료 0원!</h3>
                <p class="text-xl text-gray-600 mb-8">사장님 부담 없는 배달, 지금 무료로 입점하세요</p>
                <button class="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full text-lg font-bold transition-all shadow-xl">
                    <i class="fas fa-store mr-2"></i>
                    가맹점 신청하기
                </button>
            </div>
        </section>
        
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
  `));const qe=new xt,lr=Object.assign({"/src/index.tsx":De});let vt=!1;for(const[,e]of Object.entries(lr))e&&(qe.all("*",t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),qe.notFound(t=>{let r;try{r=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,r)}),vt=!0);if(!vt)throw new Error("Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']");export{qe as default};
