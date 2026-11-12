const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.main-nav');
toggle.addEventListener('click',()=>{const opened=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(opened));toggle.textContent=opened?'×':'☰';});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}));
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('.filter').forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  const category=button.dataset.filter;
  document.querySelectorAll('.menu-card').forEach(card=>{
    card.hidden=category!=='todos' && card.dataset.category!==category;
  });
}));
