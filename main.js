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

  // Menu tabs
  const tabs = Array.from(document.querySelectorAll('.tab'));
  const panels = Array.from(document.querySelectorAll('.menu-panel'));
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active')); tab.classList.add('active');
      panels.forEach(p => p.hidden = p.id !== tab.dataset.target;
      );
      // ARIA
      tabs.forEach(t => t.setAttribute('aria-selected', String(t === tab)));
    });
  });

  // Gallery lightbox
  const lightbox = document.getElementById('lightbox');
  const lbImg = lightbox && lightbox.querySelector('img');
  document.querySelectorAll('.gallery-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.dataset.src;
      if(!lightbox || !lbImg) return;
      lbImg.src = src; lightbox.removeAttribute('hidden');
      // focus trap minimal
      const closeBtn = lightbox.querySelector('.lb-close'); closeBtn && closeBtn.focus();
    });
  });
  const closeLightbox = () => { if(!lightbox) return; lightbox.setAttribute('hidden',''); lightbox.querySelector('img').src = ''; };
  document.querySelectorAll('.lb-close, #lightbox').forEach(el => el.addEventListener('click', (e) => {
    if(e.target === el || el.classList.contains('lb-close')) closeLightbox();
  }));
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
      // clear errors
      form.querySelectorAll('.error').forEach(el => el.textContent = '');
      let valid = true;
      const name = form.querySelector('#name');
      const email = form.querySelector('#email');
      const phone = form.querySelector('#phone');
      const message = form.querySelector('#message');

      if(!name.value || name.value.trim().length < 2){ document.getElementById('err-name').textContent = 'Please enter your name.'; valid = false; }
      if(!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)){ document.getElementById('err-email').textContent = 'Please enter a valid email.'; valid = false; }
      if(phone.value && !/^[0-9+\-\s]{7,20}$/.test(phone.value)){ document.getElementById('err-phone').textContent = 'Please enter a valid phone number.'; valid = false; }
      if(!message.value || message.value.trim().length < 10){ document.getElementById('err-message').textContent = 'Please enter a brief message (10+ chars).'; valid = false; }

      if(!valid){ status && (status.textContent = 'Please fix the errors above.'); return; }

      // show sending state
      const btn = form.querySelector('button[type="submit"]'); btn.disabled = true; const original = btn.textContent; btn.textContent = 'Sending…';
      status && (status.textContent = 'Sending enquiry...');

      // Simulate network request — replace with real endpoint as needed
      setTimeout(() => {
        btn.disabled = false; btn.textContent = original; form.reset();
        status && (status.textContent = 'Thanks — your enquiry has been received. We will reply shortly.');
        console.info('Contact form submission simulated:', {name: name.value, email: email.value, phone: phone.value, message: message.value});
      }, 1100);
    });
  }

  // small enhancement: reveal fade-in elements on load
  document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));
});
