"use strict";(self.webpackChunkportfolio_cms_frontend=self.webpackChunkportfolio_cms_frontend||[]).push([[902],{902:(e,t,o)=>{o.r(t),o.d(t,{default:()=>s});var r=o(43),l=o(162),a=o(579);const s=()=>{const[e,t]=(0,r.useState)([]),[o,s]=(0,r.useState)(!0),[i,n]=(0,r.useState)(null),d=async()=>{try{s(!0),n(null),console.log("Starting portfolio fetch...");const e=await l.O.getPortfolio();console.log("Portfolio data received:",e),t(e)}catch(e){console.error("Portfolio fetch failed:",e),n(e.message)}finally{s(!1)}};return(0,r.useEffect)((()=>{d()}),[]),o?(0,a.jsx)("div",{className:"flex items-center justify-center min-h-screen",children:(0,a.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"})}):i?(0,a.jsxs)("div",{className:"text-center py-12",children:[(0,a.jsx)("h2",{className:"text-2xl font-bold text-red-600",children:"Error"}),(0,a.jsx)("p",{className:"mt-2 text-gray-600",children:i}),(0,a.jsx)("button",{onClick:d,className:"mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600",children:"Try Again"})]}):(0,a.jsxs)("div",{className:"container mx-auto px-4 py-8",children:[(0,a.jsx)("h2",{className:"text-3xl font-bold mb-8",children:"Portfolio"}),(0,a.jsx)("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.length>0?e.map((e=>(0,a.jsxs)("div",{className:"bg-white rounded-lg shadow-md p-6",children:[(0,a.jsx)("h3",{className:"text-xl font-semibold",children:e.title}),(0,a.jsx)("p",{className:"text-gray-600 mt-2",children:e.description})]},e._id))):(0,a.jsx)("div",{className:"col-span-full text-center text-gray-600",children:"No portfolio items found"})})]})}},162:(e,t,o)=>{o.d(t,{O:()=>l});var r=o(862);const l={getPortfolio:async()=>{try{return(await r.A.get("/portfolio")).data}catch(o){var e,t;throw console.error("Error fetching portfolio:",o),new Error((null===(e=o.response)||void 0===e||null===(t=e.data)||void 0===t?void 0:t.message)||"Failed to fetch portfolio items")}},createPortfolioItem:async e=>{try{return(await r.A.post("/portfolio",e)).data}catch(l){var t,o;throw new Error((null===(t=l.response)||void 0===t||null===(o=t.data)||void 0===o?void 0:o.message)||"Failed to create portfolio item")}},updatePortfolioItem:async(e,t)=>{try{return(await r.A.put(`/portfolio/${e}`,t)).data}catch(a){var o,l;throw new Error((null===(o=a.response)||void 0===o||null===(l=o.data)||void 0===l?void 0:l.message)||"Failed to update portfolio item")}},deletePortfolioItem:async e=>{try{return(await r.A.delete(`/portfolio/${e}`)).data}catch(l){var t,o;throw new Error((null===(t=l.response)||void 0===t||null===(o=t.data)||void 0===o?void 0:o.message)||"Failed to delete portfolio item")}}}}}]);
//# sourceMappingURL=902.3aaac772.chunk.js.map