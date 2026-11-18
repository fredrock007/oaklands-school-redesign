document.addEventListener('DOMContentLoaded',()=>{
const menuButton=document.querySelector('.menu-button'),nav=document.querySelector('#site-nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));}
const search=document.getElementById('subject-search'),cards=[...document.querySelectorAll('.subject-card')],filters=[...document.querySelectorAll('[data-filter]')],empty=document.getElementById('subject-empty');let selected='All';
function update(){if(!cards.length)return;const q=(search?.value||'').trim().toLowerCase();let shown=0;cards.forEach(c=>{const match=(selected==='All'||c.dataset.category===selected)&&(!q||c.dataset.search.includes(q));c.hidden=!match;if(match)shown++});if(empty)empty.hidden=shown!==0;}
if(search)search.addEventListener('input',update);filters.forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.filter;filters.forEach(t=>t.setAttribute('aria-pressed',String(t===b)));update()}));
const form=document.getElementById('enquiry-form');if(form)form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const name=document.getElementById('person-name').value.trim(),email=document.getElementById('person-email').value.trim(),sub=document.getElementById('subject').value,body=document.getElementById('message').value.trim();const message=`From: ${name} (${email})\n\n${body}`;const url=`mailto:oaklandshigh55@gmail.com?subject=${encodeURIComponent(sub)}&body=${encodeURIComponent(message)}`;const status=document.getElementById('form-status');if(status)status.textContent='Opening your email app. Please review and send the draft there; this website has not sent a message.';window.location.href=url;});
});

// Soft, lagging pointer illumination in the decorative banners only.
// No tracking or network requests. Idle and out-of-bounds motion is faded out.
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || window.matchMedia('(hover: none)').matches) return;
  const sections = document.querySelectorAll('.hero, .page-hero');
  for (const section of sections) {
    const layer=document.createElement('div');
    layer.className='elegant-pointer-layer'; layer.setAttribute('aria-hidden','true');
    const points=[['primary',.13],['secondary',.065],['tertiary',.03]].map(([cls,speed]) => {
      const node=document.createElement('span'); node.className='elegant-pointer-light '+cls;
      layer.appendChild(node); return {node,speed,x:0,y:0};
    });
    section.appendChild(layer);
    let targetX=0,targetY=0,active=false,running=false,raf=0;
    function frame(){
      if (!active){running=false;return}
      for(const p of points){p.x+=(targetX-p.x)*p.speed;p.y+=(targetY-p.y)*p.speed;p.node.style.transform=`translate3d(${p.x}px,${p.y}px,0) translate(-50%,-50%)`}
      raf=requestAnimationFrame(frame);
    }
    section.addEventListener('pointerenter',ev=>{
      if(ev.pointerType==='touch')return;
      const r=section.getBoundingClientRect();targetX=ev.clientX-r.left;targetY=ev.clientY-r.top;
      points.forEach(p=>{p.x=targetX;p.y=targetY});
      active=true;layer.classList.add('is-active');if(!running){running=true;frame()}
    });
    section.addEventListener('pointermove',ev=>{
      if(!active)return;const r=section.getBoundingClientRect();targetX=ev.clientX-r.left;targetY=ev.clientY-r.top;
    },{passive:true});
    function leave(){active=false;layer.classList.remove('is-active');if(raf)cancelAnimationFrame(raf);running=false}
    section.addEventListener('pointerleave',leave);
    document.addEventListener('visibilitychange',()=>{if(document.hidden)leave()});
  }
})();
