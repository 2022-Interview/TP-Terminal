import{m as f}from"./index-1dd44e23.js";import{A as v}from"./aplayer-fd5141c9.js";import{d as y,O as g,r,o as x,Q as m,R as n,a2 as h,Y as B,Z as M}from"./@vue-6bcad18c.js";import"./ant-design-vue-bce79523.js";import"./@babel-2553f0e6.js";import"./lodash-es-80ba6ea5.js";import"./dom-align-ecb06dd6.js";import"./resize-observer-polyfill-0f9f8adb.js";import"./@ant-design-559a3a45.js";import"./@ctrl-fb5a5473.js";import"./dayjs-d3e5c816.js";import"./vue-types-ef06c517.js";import"./@emotion-f7664732.js";import"./stylis-5efc5547.js";import"./pinia-8eb1303e.js";import"./vue-demi-71ba0ef2.js";import"./lodash-d7b3dfde.js";import"./index-813d8fb8.js";import"./vue-router-6383198c.js";import"./pinia-plugin-persistedstate-ed167f96.js";import"./axios-9cbf0d09.js";import"./plugin-vueexport-helper-c27b6911.js";import"./getopts-220bc5b6.js";const k=async t=>t?await f.post("/music/get",{keywords:t}):null,A={key:0},J=y({__name:"MusicBox",props:{name:{}},setup(t){const p=t,{name:u}=g(p),e=r(""),a=r(),i=r([]);return x(async()=>{const o=await k(u.value);if(typeof o.data=="string"){e.value=o.data;return}const{author:s,cover:c,id:l,mName:d,lrc:_}=o.data;i.value.push({name:d,artist:s.name,url:`https://music.163.com/song/media/outer/url?id=${l}.mp3`,cover:c,lrc:_}),new v({container:a.value,lrcType:1,audio:i.value})}),(o,s)=>(m(),n("div",null,[h("div",{ref_key:"aplayer",ref:a},null,512),e.value?(m(),n("div",A,B(e.value),1)):M("",!0)]))}});export{J as default};