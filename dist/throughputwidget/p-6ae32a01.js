import{C as e,p as o,w as t,a as s,d as n,N as r}from"./p-9298363b.js";const a="undefined"!=typeof Deno,p=!(a||"undefined"==typeof global||"function"!=typeof require||!global.process||"string"!=typeof __filename||global.origin&&"string"==typeof global.origin),i=(a&&Deno,p?process:a&&Deno,p?process:a&&Deno,()=>e&&e.supports&&e.supports("color","var(--c)")?s():__sc_import_throughputwidget("./p-516c777c.js").then(()=>(o.o=t.__cssshim)?(!1).i():0)),c=()=>{o.o=t.__cssshim;const e=Array.from(n.querySelectorAll("script")).find(e=>RegExp(`/${r}(\\.esm)?\\.js($|\\?|#)`).test(e.src)||e.getAttribute("data-stencil-namespace")===r),a=e["data-opts"]||{};return"onbeforeload"in e&&!history.scrollRestoration?{then(){}}:(a.resourcesUrl=new URL(".",new URL(e.getAttribute("data-resources-url")||e.src,t.location.href)).href,l(a.resourcesUrl,e),t.customElements?s(a):__sc_import_throughputwidget("./p-621bed09.js").then(()=>a))},l=(e,o)=>{const s="__sc_import_"+r.replace(/\s|-/g,"_");try{t[s]=Function("w","return import(w);//"+Math.random())}catch(a){const r=new Map;t[s]=a=>{const p=new URL(a,e).href;let i=r.get(p);if(!i){const e=n.createElement("script");e.type="module",e.crossOrigin=o.crossOrigin,e.src=URL.createObjectURL(new Blob([`import * as m from '${p}'; window.${s}.m = m;`],{type:"application/javascript"})),i=new Promise(o=>{e.onload=()=>{o(t[s].m),e.remove()}}),r.set(p,i),n.head.appendChild(e)}return i}}};export{i as a,c as p}