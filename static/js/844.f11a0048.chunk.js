"use strict";(self.webpackChunkportfolio_cms_frontend=self.webpackChunkportfolio_cms_frontend||[]).push([[844],{844:(e,t,l)=>{l.r(t),l.d(t,{default:()=>r});var o=l(43),s=l(162),a=l(579);const i=e=>{let{item:t}=e;return(0,a.jsxs)("div",{children:[(0,a.jsx)("h3",{children:t.title}),(0,a.jsx)("img",{src:t.imageUrl,alt:t.title}),(0,a.jsx)("p",{children:t.description})]})},r=()=>{const[e,t]=(0,o.useState)([]),[l,r]=(0,o.useState)(!0),[c,d]=(0,o.useState)(null);return(0,o.useEffect)((()=>{(async()=>{try{r(!0);const e=await s.O.getPortfolio();t(e)}catch(e){console.error("Failed to fetch portfolio:",e),d("Failed to load portfolio items")}finally{r(!1)}})()}),[]),l?(0,a.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})}):c?(0,a.jsxs)("div",{className:"text-center py-12",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold text-red-600",children:c}),(0,a.jsx)("button",{onClick:()=>window.location.reload(),className:"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Retry"})]}):(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,a.jsx)("h2",{className:"text-3xl font-bold mb-8 text-gray-800",children:"Portfolio"}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.length>0?e.map((e=>(0,a.jsx)(i,{item:e},e._id))):(0,a.jsx)("div",{className:"col-span-full text-center py-12 text-gray-600",children:"No portfolio items found"})})]})}},162:(e,t,l)=>{l.d(t,{O:()=>a});var o=l(213);const s="http://localhost:5000/api/portfolio",a={getPortfolio:async()=>(await o.A.get(s)).data,addPortfolioItem:async(e,t,l)=>(await o.A.post(s,{title:e,description:t,imageUrl:l})).data,deletePortfolioItem:async e=>(await o.A.delete(`${s}/${e}`)).data}}}]);
//# sourceMappingURL=844.f11a0048.chunk.js.map