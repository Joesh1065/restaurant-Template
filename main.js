// Luna Bistro - main JS (mobile menu, tabs, gallery lightbox, form validation, reviews slider)
document.addEventListener('DOMContentLoaded', () => {
  // Set year
  const yearEl = document.getElementById('year'); if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('primary-menu');
  if(navToggle && menu){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      if(menu.hasAttribute('hidden')) menu.removeAttribute('hidden'); else menu.setAttribute('hidden','');
    });
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth',block:'start'});
        // close mobile menu on navigation
        if(window.innerWidth < 900 && menu && !menu.hasAttribute('hidden')){
          menu.setAttribute('hidden',''); navToggle && navToggle.setAttribute('aria-expanded','false');
        }
      }
    });
  });

  // Menu tabs - accessible initialization
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.menu-panel'));
  tabs.forEach((tab, i) => {
    // ensure each tab has an id for aria linking
    if(!tab.id) tab.id = `tab-${i+1}`;
    const targetId = tab.dataset.target;
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', targetId);
    tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
    tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');

    const panel = document.getElementById(targetId);
    if(panel){
      panel.setAttribute('role','tabpanel');
      panel.setAttribute('aria-labelledby', tab.id);
      panel.hidden = !tab.classList.contains('active');
      panel.setAttribute('aria-hidden', panel.hidden ? 'true' : 'false');
    }

    tab.addEventListener('click', () => {
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected','false');
        t.setAttribute('tabindex','-1');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      tab.setAttribute('tabindex','0');

      panels.forEach(p => {
        const visible = p.id === targetId;
        p.hidden = !visible;
        p.setAttribute('aria-hidden', visible ? 'false' : 'true');
      });
      tab.focus();
    });
  });

  // Gallery lightbox - accessible behavior
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('img');
  const mainEl = document.querySelector('main');
  document.querySelectorAll('.gallery-item').forEach(btn => {
    const img = btn.querySelector('img');
    if(img && !btn.getAttribute('aria-label')) btn.setAttribute('aria-label', `Open image: ${img.alt || 'gallery image'}`);
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      if(!lightbox || !lbImg) return;
      // remember last focused element to restore focus on close
      window.__lastFocusedBeforeLightbox = document.activeElement;
      lbImg.src = src;
      lightbox.setAttribute('role','dialog');
      lightbox.setAttribute('aria-modal','true');
      lightbox.removeAttribute('hidden');
      lightbox.setAttribute('aria-hidden','false');
      if(mainEl) mainEl.setAttribute('aria-hidden','true');
      // focus trap minimal
      const closeBtn = lightbox.querySelector('.lb-close'); closeBtn && closeBtn.focus();
    });
  });
  const closeLightbox = () => {
    if(!lightbox) return;
    lightbox.setAttribute('hidden','');
    lightbox.setAttribute('aria-hidden','true');
    const imgEl = lightbox.querySelector('img'); if(imgEl) imgEl.src = '';
    if(mainEl) mainEl.removeAttribute('aria-hidden');
    // restore focus
    try { if(window.__lastFocusedBeforeLightbox && window.__lastFocusedBeforeLightbox.focus) window.__lastFocusedBeforeLightbox.focus(); } catch(e){}
  };

  // close when clicking close button or backdrop
  const lbCloseBtn = document.querySelector('.lb-close');
  if(lbCloseBtn) lbCloseBtn.addEventListener('click', (e) => { e.preventDefault(); closeLightbox(); });
  const lbOverlay = document.getElementById('lightbox');
  if(lbOverlay) lbOverlay.addEventListener('click', (e) => { if(e.target === lbOverlay) closeLightbox(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLightbox(); });

  // Reviews slider simple
  const slidesWrap = document.querySelector('.slides');
  const slides = slidesWrap ? Array.from(slidesWrap.children) : [];
  let current = 0;
  const showSlide = (idx) => {
    if(!slidesWrap) return;
    current = (idx + slides.length) % slides.length;
    slidesWrap.style.transform = `translateX(-${current*100}%)`;
  }
  showSlide(0);
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  prevBtn && prevBtn.addEventListener('click', ()=> showSlide(current-1));
  nextBtn && nextBtn.addEventListener('click', ()=> showSlide(current+1));
  let sliderInterval = setInterval(()=> showSlide(current+1), 6000);
  [prevBtn,nextBtn].forEach(b => b && b.addEventListener('click', ()=>{ clearInterval(sliderInterval); sliderInterval = setInterval(()=> showSlide(current+1), 8000); }));

  // Contact form validation + simulated submit
  const form = document.getElementById('contact-form');
  const status = form && form.querySelector('.form-status');
  if(form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();
        // clear errors and aria-invalid states
      form.querySelectorAll('.error').forEach(el => el.textContent = '');
        const name = form.querySelector('#name');
        const email = form.querySelector('#email');
        const phone = form.querySelector('#phone');
        const message = form.querySelector('#message');
        [name,email,phone,message].forEach(el => { if(el) el.removeAttribute('aria-invalid'); });

        let valid = true;

        if(!name.value || name.value.trim().length < 2){ document.getElementById('err-name').textContent = 'Please enter your name.'; name.setAttribute('aria-invalid','true'); valid = false; }
        if(!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ document.getElementById('err-email').textContent = 'Please enter a valid email.'; email.setAttribute('aria-invalid','true'); valid = false; }
        if(phone.value && !/^[0-9+\-\s]{7,20}$/.test(phone.value)){ document.getElementById('err-phone').textContent = 'Please enter a valid phone number.'; phone.setAttribute('aria-invalid','true'); valid = false; }
        if(!message.value || message.value.trim().length < 10){ document.getElementById('err-message').textContent = 'Please enter a brief message (10+ chars).'; message.setAttribute('aria-invalid','true'); valid = false; }

        if(!valid){ status && (status.textContent = 'Please fix the errors above.'); return; }

      // show sending state
      const btn = form.querySelector('button[type="submit"]'); btn.disabled = true; const original = btn.textContent; btn.textContent = 'Sending…';
      status && (status.textContent = 'Sending enquiry...');

      // Simulate network request — replace with real endpoint as needed
      const submittedData = {name: name.value, email: email.value, phone: phone.value, message: message.value};
      setTimeout(() => {
        btn.disabled = false; btn.textContent = original; form.reset();
        status && (status.textContent = 'Thanks — your enquiry has been received. We will reply shortly.');
        console.info('Contact form submission simulated:', submittedData);
      }, 1100);
    });
  }

  // small enhancement: reveal fade-in elements on load
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));

  // Image load fallback: replace broken images with a simple SVG placeholder and ensure they are visible
  const placeholderSvg = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-size="20">Image unavailable</text></svg>');
  document.querySelectorAll('img').forEach(img => {
    if(!img.complete || img.naturalWidth === 0){ /* don't rely solely on these, still attach handler */ }
    img.addEventListener('error', (e) => {
      const target = e.target;
      if(target && target.tagName === 'IMG'){
        target.src = placeholderSvg;
        target.alt = target.alt || 'Image unavailable';
      }
    });
  });

  // Defensive: ensure lightbox starts hidden (in case HTML hidden attribute ignored by CSS)
  const lightboxEl = document.getElementById('lightbox');
  if(lightboxEl && !lightboxEl.hasAttribute('hidden')){
    lightboxEl.setAttribute('hidden','');
    lightboxEl.setAttribute('aria-hidden','true');
  }

});
