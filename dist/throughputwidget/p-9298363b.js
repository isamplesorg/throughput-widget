const e="throughputwidget";let t,n,l=!1;const o="undefined"!=typeof window?window:{},s=o.CSS,i=o.document||{head:{}},r={t:0,l:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,l)=>e.addEventListener(t,n,l),rel:(e,t,n,l)=>e.removeEventListener(t,n,l)},c=(()=>(i.head.attachShadow+"").indexOf("[native")>-1)(),a=e=>Promise.resolve(e),u=(()=>{try{return new CSSStyleSheet,!0}catch(e){}return!1})(),f=(e,t,n)=>{n&&n.map(([n,l,o])=>{const s=e,i=d(t,o),c=p(n);r.ael(s,l,i,c),(t.o=t.o||[]).push(()=>r.rel(s,l,i,c))})},d=(e,t)=>n=>{256&e.t?e.s[t](n):(e.i=e.i||[]).push([t,n])},p=e=>0!=(2&e),h=new WeakMap,$=e=>"sc-"+e.u,y={},m=e=>"object"==(e=typeof e)||"function"===e,b="undefined"!=typeof Deno,w=!(b||"undefined"==typeof global||"function"!=typeof require||!global.process||"string"!=typeof __filename||global.origin&&"string"==typeof global.origin),g=(b&&Deno,w?process:b&&Deno,w?process:b&&Deno,(e,t,...n)=>{let l=null,o=!1,s=!1,i=[];const r=t=>{for(let n=0;n<t.length;n++)l=t[n],Array.isArray(l)?r(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof e&&!m(l))&&(l+=""),o&&s?i[i.length-1].p+=l:i.push(o?_(null,l):l),s=o)};if(r(n),t){const e=t.className||t.class;e&&(t.class="object"!=typeof e?e:Object.keys(e).filter(t=>e[t]).join(" "))}const c=_(e,null);return c.h=t,i.length>0&&(c.$=i),c}),_=(e,t)=>({t:0,m:e,p:t,g:null,$:null,h:null}),j={},v=(e,t,n,l,s,i)=>{if(n!==l){let a=Q(e,t),u=t.toLowerCase();if("class"===t){const t=e.classList,o=M(n),s=M(l);t.remove(...o.filter(e=>e&&!s.includes(e))),t.add(...s.filter(e=>e&&!o.includes(e)))}else if(a||"o"!==t[0]||"n"!==t[1]){const o=m(l);if((a||o&&null!==l)&&!s)try{if(e.tagName.includes("-"))e[t]=l;else{let o=null==l?"":l;"list"===t?a=!1:null!=n&&e[t]==o||(e[t]=o)}}catch(c){}null==l||!1===l?!1===l&&""!==e.getAttribute(t)||e.removeAttribute(t):(!a||4&i||s)&&!o&&e.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):Q(o,u)?u.slice(2):u[2]+t.slice(3),n&&r.rel(e,t,n,!1),l&&r.ael(e,t,l,!1)}},S=/\s/,M=e=>e?e.split(S):[],k=(e,t,n,l)=>{const o=11===t.g.nodeType&&t.g.host?t.g.host:t.g,s=e&&e.h||y,i=t.h||y;for(l in s)l in i||v(o,l,s[l],void 0,n,t.t);for(l in i)v(o,l,s[l],i[l],n,t.t)},C=(e,n,l)=>{let o,s,r=n.$[l],c=0;if(null!==r.p)o=r.g=i.createTextNode(r.p);else if(o=r.g=i.createElement(r.m),k(null,r,!1),null!=t&&o["s-si"]!==t&&o.classList.add(o["s-si"]=t),r.$)for(c=0;c<r.$.length;++c)s=C(e,r,c),s&&o.appendChild(s);return o},O=(e,t,l,o,s,i)=>{let r,c=e;for(c.shadowRoot&&c.tagName===n&&(c=c.shadowRoot);s<=i;++s)o[s]&&(r=C(null,l,s),r&&(o[s].g=r,c.insertBefore(r,t)))},D=(e,t,n,l)=>{for(;t<=n;++t)(l=e[t])&&l.g.remove()},P=(e,t)=>e.m===t.m,R=(e,t)=>{const n=t.g=e.g,l=e.$,o=t.$,s=t.p;null===s?(k(e,t,!1),null!==l&&null!==o?((e,t,n,l)=>{let o,s=0,i=0,r=t.length-1,c=t[0],a=t[r],u=l.length-1,f=l[0],d=l[u];for(;s<=r&&i<=u;)null==c?c=t[++s]:null==a?a=t[--r]:null==f?f=l[++i]:null==d?d=l[--u]:P(c,f)?(R(c,f),c=t[++s],f=l[++i]):P(a,d)?(R(a,d),a=t[--r],d=l[--u]):P(c,d)?(R(c,d),e.insertBefore(c.g,a.g.nextSibling),c=t[++s],d=l[--u]):P(a,f)?(R(a,f),e.insertBefore(a.g,c.g),a=t[--r],f=l[++i]):(o=C(t&&t[i],n,i),f=l[++i],o&&c.g.parentNode.insertBefore(o,c.g));s>r?O(e,null==l[u+1]?null:l[u+1].g,n,l,i,u):i>u&&D(t,s,r)})(n,l,t,o):null!==o?(null!==e.p&&(n.textContent=""),O(n,null,t,o,0,o.length-1)):null!==l&&D(l,0,l.length-1)):e.p!==s&&(n.data=s)},W=(e,t,n)=>{const l=(e=>I(e)._)(e);return{emit:e=>x(l,t,{bubbles:!!(4&n),composed:!!(2&n),cancelable:!!(1&n),detail:e})}},x=(e,t,n)=>{const l=new CustomEvent(t,n);return e.dispatchEvent(l),l},E=(e,t)=>{t&&!e.j&&t["s-p"]&&t["s-p"].push(new Promise(t=>e.j=t))},L=(e,t)=>{if(e.t|=16,!(4&e.t))return E(e,e.v),re(()=>T(e,t));e.t|=512},T=(e,t)=>{const n=e.s;let l;return t&&(e.t|=256,e.i&&(e.i.map(([e,t])=>F(n,e,t)),e.i=null),l=F(n,"componentWillLoad")),l=H(l,()=>F(n,"componentWillRender")),H(l,()=>U(e,n,t))},U=(e,l,o)=>{const s=e._,r=s["s-rc"];o&&(e=>{const t=e.S,n=e._,l=t.t,o=((e,t)=>{let n=$(t),l=ee.get(n);if(e=11===e.nodeType?e:i,l)if("string"==typeof l){let t,o=h.get(e=e.head||e);o||h.set(e,o=new Set),o.has(n)||(t=i.createElement("style"),t.innerHTML=l,e.insertBefore(t,e.querySelector("link")),o&&o.add(n))}else e.adoptedStyleSheets.includes(l)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,l]);return n})(c&&n.shadowRoot?n.shadowRoot:n.getRootNode(),t);10&l&&(n["s-sc"]=o,n.classList.add(o+"-h"))})(e);((e,l)=>{const o=e._,s=e.M||_(null,null),i=(e=>e&&e.m===j)(l)?l:g(null,null,l);n=o.tagName,i.m=null,i.t|=4,e.M=i,i.g=s.g=o.shadowRoot||o,t=o["s-sc"],R(s,i)})(e,q(e,l)),r&&(r.map(e=>e()),s["s-rc"]=void 0);{const t=s["s-p"],n=()=>A(e);0===t.length?n():(Promise.all(t).then(n),e.t|=4,t.length=0)}},q=(e,t)=>{try{t=t.render(),e.t&=-17,e.t|=2}catch(n){X(n)}return t},A=e=>{const t=e._,n=e.v;64&e.t||(e.t|=64,V(t),e.k(t),n||N()),e.j&&(e.j(),e.j=void 0),512&e.t&&ie(()=>L(e,!1)),e.t&=-517},N=()=>{V(i.documentElement),ie(()=>x(o,"appload",{detail:{namespace:"throughputwidget"}}))},F=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(l){X(l)}},H=(e,t)=>e&&e.then?e.then(t):t(),V=e=>e.classList.add("hydrated"),z=(e,t,n)=>{if(t.C){const l=Object.entries(t.C),o=e.prototype;if(l.map(([e,[l]])=>{(31&l||2&n&&32&l)&&Object.defineProperty(o,e,{get(){return((e,t)=>I(this).O.get(t))(0,e)},set(n){((e,t,n,l)=>{const o=I(e),s=o.O.get(t),i=o.t,r=o.s;n=((e,t)=>null==e||m(e)?e:4&t?"false"!==e&&(""===e||!!e):1&t?e+"":e)(n,l.C[t][0]),8&i&&void 0!==s||n===s||(o.O.set(t,n),r&&2==(18&i)&&L(o,!1))})(this,e,n,t)},configurable:!0,enumerable:!0})}),1&n){const t=new Map;o.attributeChangedCallback=function(e,n,l){r.jmp(()=>{const n=t.get(e);this[n]=(null!==l||"boolean"!=typeof this[n])&&l})},e.observedAttributes=l.filter(([e,t])=>15&t[0]).map(([e,n])=>{const l=n[1]||e;return t.set(l,e),l})}}return e},B=(e,t={})=>{const n=[],l=t.exclude||[],s=o.customElements,a=i.head,d=a.querySelector("meta[charset]"),p=i.createElement("style"),h=[];let y,m=!0;Object.assign(r,t),r.l=new URL(t.resourcesUrl||"./",i.baseURI).href,e.map(e=>e[1].map(t=>{const o={t:t[0],u:t[1],C:t[2],D:t[3]};o.C=t[2],o.D=t[3],!c&&1&o.t&&(o.t|=8);const i=o.u,a=class extends HTMLElement{constructor(e){super(e),K(e=this,o),1&o.t&&(c?e.attachShadow({mode:"open"}):"shadowRoot"in e||(e.shadowRoot=e))}connectedCallback(){y&&(clearTimeout(y),y=null),m?h.push(this):r.jmp(()=>(e=>{if(0==(1&r.t)){const t=I(e),n=t.S,l=()=>{};if(1&t.t)f(e,t,n.D);else{t.t|=1;{let n=e;for(;n=n.parentNode||n.host;)if(n["s-p"]){E(t,t.v=n);break}}n.C&&Object.entries(n.C).map(([t,[n]])=>{if(31&n&&e.hasOwnProperty(t)){const n=e[t];delete e[t],e[t]=n}}),ie(()=>(async(e,t,n,l,o)=>{if(0==(32&t.t)){{if(t.t|=32,(o=Z(n)).then){const e=()=>{};o=await o,e()}o.isProxied||(z(o,n,2),o.isProxied=!0);const e=()=>{};t.t|=8;try{new o(t)}catch(r){X(r)}t.t&=-9,e()}if(o.style){let e=o.style;const t=$(n);if(!ee.has(t)){const l=()=>{};8&n.t&&(e=await __sc_import_throughputwidget("./p-829b4581.js").then(n=>n.scopeCss(e,t,!1))),((e,t,n)=>{let l=ee.get(e);u&&n?(l=l||new CSSStyleSheet,l.replace(t)):l=t,ee.set(e,l)})(t,e,!!(1&n.t)),l()}}}const s=t.v,i=()=>L(t,!0);s&&s["s-rc"]?s["s-rc"].push(i):i()})(0,t,n))}l()}})(this))}disconnectedCallback(){r.jmp(()=>(()=>{if(0==(1&r.t)){const e=I(this);e.o&&(e.o.map(e=>e()),e.o=void 0)}})())}forceUpdate(){(()=>{{const e=I(this);e._.isConnected&&2==(18&e.t)&&L(e,!1)}})()}componentOnReady(){return I(this).P}};o.R=e[0],l.includes(i)||s.get(i)||(n.push(i),s.define(i,z(a,o,1)))})),p.innerHTML=n+"{visibility:hidden}.hydrated{visibility:inherit}",p.setAttribute("data-styles",""),a.insertBefore(p,d?d.nextSibling:a.firstChild),m=!1,h.length?h.map(e=>e.connectedCallback()):r.jmp(()=>y=setTimeout(N,30))},G=new WeakMap,I=e=>G.get(e),J=(e,t)=>G.set(t.s=e,t),K=(e,t)=>{const n={t:0,_:e,S:t,O:new Map};return n.P=new Promise(e=>n.k=e),e["s-p"]=[],e["s-rc"]=[],f(e,n,t.D),G.set(e,n)},Q=(e,t)=>t in e,X=e=>console.error(e),Y=new Map,Z=e=>{const t=e.u.replace(/-/g,"_"),n=e.R,l=Y.get(n);return l?l[t]:__sc_import_throughputwidget(`./${n}.entry.js`).then(e=>(Y.set(n,e),e[t]),X)},ee=new Map,te=[],ne=[],le=(e,t)=>n=>{e.push(n),l||(l=!0,t&&4&r.t?ie(se):r.raf(se))},oe=e=>{for(let n=0;n<e.length;n++)try{e[n](performance.now())}catch(t){X(t)}e.length=0},se=()=>{oe(te),oe(ne),(l=te.length>0)&&r.raf(se)},ie=e=>a().then(e),re=le(ne,!0);export{s as C,e as N,a,B as b,W as c,i as d,g as h,r as p,J as r,o as w}