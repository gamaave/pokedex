'use strict';
const RELEASE="dc2d487865b4";
const SHELL_FILES=["style.css?v=de594cc7bc5e","app.js?v=405d1e12ae95","data.js?v=34c7e6b8ba66","extras.js?v=02333b81c2e2","encounters.js?v=4ab33b62392e","pwa.js?v=f857676cd436","manifest.webmanifest?v=63e945b97d3b","app-icon-pokeball-flat-192.png","app-icon-pokeball-flat-512.png","apple-touch-pokeball-flat.png","app-icon-pokeball-flat.svg"];
const ROOT=self.registration.scope;
const PREFIX='gamaave-pokedex-'+new URL(ROOT).pathname.replace(/\W/g,'_')+'-';
const SHELL=PREFIX+'shell-'+RELEASE;
const MEDIA=PREFIX+'images';
const ART_PREFIX='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/';
const MAX_IMAGES=120;
let writes=Promise.resolve();
const absolute=file=>new URL(file,ROOT).href;
self.addEventListener('install',event=>event.waitUntil((async()=>{
  const html=await fetch(absolute('index.html?release='+RELEASE),{cache:'reload'});
  if(!html.ok)throw Error('App shell unavailable');
  const text=await html.clone().text();
  if(!text.includes('name="app-release" content="'+RELEASE+'"'))throw Error('App release is not ready');
  const cache=await caches.open(SHELL);
  try{await cache.addAll(SHELL_FILES.map(file=>new Request(absolute(file),{cache:'reload'})));await cache.put(absolute('./'),html.clone());await cache.put(absolute('index.html'),html);}catch(error){await caches.delete(SHELL);throw error;}
})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{
  for(const name of await caches.keys())if(name.startsWith(PREFIX+'shell-')&&name!==SHELL)await caches.delete(name);
  await self.clients.claim();
})()));
function allowedArt(url){return url.startsWith(ART_PREFIX)&&new URL(url).origin==='https://raw.githubusercontent.com';}
function storeImage(url,response){const copy=response.clone();const operation=writes.catch(()=>{}).then(async()=>{const cache=await caches.open(MEDIA);await cache.put(url,copy);const keys=await cache.keys();for(let i=0;i<keys.length-MAX_IMAGES;i++)await cache.delete(keys[i]);});writes=operation;return operation;}
async function artwork(url,event){const cache=await caches.open(MEDIA);const saved=await cache.match(url);if(saved)return saved;try{const response=await fetch(url,{mode:'cors',credentials:'omit'});if(response.ok)event.waitUntil(storeImage(url,response).catch(()=>{}));return response;}catch{return new Response('<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240" viewBox="0 0 240 240"><rect width="240" height="240" rx="24" fill="#c4cec01c"/><circle cx="120" cy="92" r="27" fill="none" stroke="#8c9b85" stroke-width="3"/><path d="m105 91 10 10 23-23" fill="none" stroke="#8c9b85" stroke-width="3"/><text x="120" y="153" text-anchor="middle" fill="#8c9b85" font-family="sans-serif" font-size="12">Imagem não salva</text><text x="120" y="173" text-anchor="middle" fill="#8c9b85" font-family="sans-serif" font-size="11">Abra com internet</text></svg>',{status:200,headers:{'Content-Type':'image/svg+xml','Cache-Control':'no-store'}});}}
self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url),base=new URL(ROOT);
  if(allowedArt(url.href)){event.respondWith(artwork(url.href,event));return;}
  if(url.origin!==base.origin)return;
  const navigation=request.mode==='navigate'&&(url.pathname===base.pathname||url.pathname===new URL('index.html',ROOT).pathname);
  if(navigation){event.respondWith((async()=>{const cache=await caches.open(SHELL);return await cache.match(absolute('./'))||fetch(request);})());return;}
  if(SHELL_FILES.some(file=>absolute(file)===url.href)){event.respondWith((async()=>{const cache=await caches.open(SHELL);return await cache.match(request)||fetch(request);})());}
});
self.addEventListener('message',event=>{
  if(event.data?.type==='SKIP_WAITING'){self.skipWaiting();return;}
  if(event.data?.type==='CACHE_ARTWORK'&&Array.isArray(event.data.urls)){const urls=[...new Set(event.data.urls)].filter(url=>typeof url==='string'&&allowedArt(url)).slice(0,25);event.waitUntil(Promise.allSettled(urls.map(url=>artwork(url,event))));}
});
