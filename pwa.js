'use strict';
(() => {
  const bar=document.querySelector('#app-install-bar');
  const installButton=document.querySelector('#install-app');
  const help=document.querySelector('#install-help');
  const status=document.querySelector('#offline-status');
  const updateBar=document.querySelector('#app-update');
  const updateButton=document.querySelector('#update-app');
  const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
  let installPrompt=null,registration=null,offlineReady=false,reloading=false;
  function installed(){installButton.hidden=standalone();bar.querySelector('.install-copy').textContent=standalone()?'Sua Pokédex, sempre à mão.':'Leve sua Pokédex no celular.';}
  function cacheVisibleImages(){const controller=navigator.serviceWorker?.controller;if(controller)controller.postMessage({type:"CACHE_ARTWORK",urls:[...document.images].filter(img=>img.complete&&img.naturalWidth>0).map(img=>img.currentSrc||img.src)});}
  function showStatus(){status.classList.toggle('is-offline',!navigator.onLine);status.textContent=!navigator.onLine?(offlineReady?'Offline · dados disponíveis':'Você está offline'):offlineReady?'Dados prontos para uso offline':'Preparando acesso offline…';}
  installed();showStatus();
  addEventListener('online',showStatus);addEventListener('offline',showStatus);
  addEventListener('beforeinstallprompt',e=>{e.preventDefault();installPrompt=e;installButton.textContent='Instalar app ↓';});
  addEventListener('appinstalled',()=>{installPrompt=null;installButton.hidden=true;bar.querySelector('.install-copy').textContent='Aplicativo instalado. Boa aventura!';});
  matchMedia('(display-mode: standalone)').addEventListener('change',installed);
  installButton.addEventListener('click',async()=>{
    if(installPrompt){const prompt=installPrompt;installPrompt=null;try{await prompt.prompt();const choice=await prompt.userChoice;if(choice.outcome==='accepted')installButton.hidden=true;}catch{help.showModal();}}
    else help.showModal();
  });
  document.querySelector('#close-install-help').addEventListener('click',()=>help.close());
  help.addEventListener('click',e=>{if(e.target!==help)return;const r=help.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)help.close();});
  function offerUpdate(){if(registration?.waiting&&navigator.serviceWorker.controller){updateBar.hidden=false;updateButton.disabled=false;updateButton.textContent='Atualizar agora';}}
  updateButton.addEventListener('click',()=>{if(!registration?.waiting)return;reloading=true;updateButton.disabled=true;updateButton.textContent='Atualizando…';registration.waiting.postMessage({type:'SKIP_WAITING'});});
  if(!('serviceWorker' in navigator)){status.textContent='Uso offline indisponível neste navegador';return;}
  navigator.serviceWorker.addEventListener('controllerchange',()=>{if(reloading){location.reload();return;}offlineReady=Boolean(navigator.serviceWorker.controller);showStatus();cacheVisibleImages();});
  navigator.serviceWorker.register('./sw.js',{scope:'./',updateViaCache:'none'}).then(reg=>{
    registration=reg;offerUpdate();reg.addEventListener('updatefound',()=>{const worker=reg.installing;if(worker)worker.addEventListener('statechange',()=>{if(worker.state==='installed')offerUpdate();if(worker.state==='redundant'&&!offlineReady)status.textContent='Acesso offline ainda não preparado. Reabra com internet.';});});
    navigator.serviceWorker.ready.then(()=>{offlineReady=true;showStatus();offerUpdate();cacheVisibleImages();});
  }).catch(()=>{status.textContent='Não foi possível preparar o acesso offline';});
  let lastCheck=Date.now();document.addEventListener('visibilitychange',()=>{if(!document.hidden&&registration&&Date.now()-lastCheck>60000){lastCheck=Date.now();registration.update().catch(()=>{});}});
})();
