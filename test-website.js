// Comprehensive website testing suite
const TestRunner = {
  results: [],
  passCount: 0,
  failCount: 0,

  // Test 1: Check if all navigation links work
  testNavigation() {
    console.log('\n=== TESTING NAVIGATION ===');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      const pass = target !== null;
      this.results.push({ test: `Navigation link to ${href}`, pass });
      this.logTest(pass, `Navigation link ${href} ${pass ? 'resolves' : 'BROKEN'}`);
    });
  },

  // Test 2: Check header and hamburger menu
  testMobileMenu() {
    console.log('\n=== TESTING MOBILE MENU ===');
    const navToggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');
    
    if (!navToggle || !menu) {
      this.logTest(false, 'Mobile menu elements not found');
      this.results.push({ test: 'Mobile menu structure', pass: false });
      return;
    }

    // Check initial hidden state
    const initialHidden = menu.hasAttribute('hidden');
    this.logTest(initialHidden, `Menu initially hidden: ${initialHidden}`);
    this.results.push({ test: 'Menu starts hidden', pass: initialHidden });

    // Simulate click
    navToggle.click();
    const afterClick = !menu.hasAttribute('hidden');
    this.logTest(afterClick, `Menu toggle works on click: ${afterClick}`);
    this.results.push({ test: 'Menu toggle on click', pass: afterClick });

    // Toggle again
    navToggle.click();
    const toggleBack = menu.hasAttribute('hidden');
    this.logTest(toggleBack, `Menu toggle back works: ${toggleBack}`);
    this.results.push({ test: 'Menu toggle back', pass: toggleBack });
  },

  // Test 3: Check menu tabs
  testMenuTabs() {
    console.log('\n=== TESTING MENU TABS ===');
    const tabs = document.querySelectorAll('.tab');
    const panels = document.querySelectorAll('.menu-panel');

    if (tabs.length === 0) {
      this.logTest(false, 'No menu tabs found');
      this.results.push({ test: 'Menu tabs exist', pass: false });
      return;
    }

    this.logTest(true, `Found ${tabs.length} menu tabs`);
    this.results.push({ test: 'Menu tabs exist', pass: true });

    // Check first tab is active
    const firstTabActive = tabs[0].classList.contains('active');
    this.logTest(firstTabActive, 'First tab is active by default');
    this.results.push({ test: 'First tab active', pass: firstTabActive });

    // Click second tab
    if (tabs.length > 1) {
      tabs[1].click();
      const secondTabActive = tabs[1].classList.contains('active');
      const secondPanelVisible = !panels[1].hidden;
      this.logTest(secondTabActive, 'Second tab becomes active on click');
      this.logTest(secondPanelVisible, 'Second panel becomes visible');
      this.results.push({ test: 'Tab click activation', pass: secondTabActive });
      this.results.push({ test: 'Panel visibility on tab click', pass: secondPanelVisible });
    }
  },

  // Test 4: Check gallery lightbox
  testGalleryLightbox() {
    console.log('\n=== TESTING GALLERY LIGHTBOX ===');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');

    if (!lightbox || galleryItems.length === 0) {
      this.logTest(false, 'Gallery or lightbox not found');
      this.results.push({ test: 'Gallery lightbox exists', pass: false });
      return;
    }

    this.logTest(true, `Gallery has ${galleryItems.length} items`);
    this.results.push({ test: 'Gallery items exist', pass: true });

    // Check lightbox initially hidden
    const initiallyHidden = lightbox.hasAttribute('hidden');
    this.logTest(initiallyHidden, 'Lightbox initially hidden');
    this.results.push({ test: 'Lightbox starts hidden', pass: initiallyHidden });

    // Click first gallery item
    galleryItems[0].click();
    const lightboxOpen = !lightbox.hasAttribute('hidden');
    this.logTest(lightboxOpen, 'Lightbox opens on gallery click');
    this.results.push({ test: 'Lightbox opens on click', pass: lightboxOpen });

    // Click close button
    const closeBtn = lightbox.querySelector('.lb-close');
    if (closeBtn) {
      closeBtn.click();
      const lightboxClosed = lightbox.hasAttribute('hidden');
      this.logTest(lightboxClosed, 'Lightbox closes on close button');
      this.results.push({ test: 'Lightbox closes', pass: lightboxClosed });
    }
  },

  // Test 5: Check reviews slider
  testReviewsSlider() {
    console.log('\n=== TESTING REVIEWS SLIDER ===');
    const slider = document.querySelector('.reviews-slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');

    if (!slider || slides.length === 0) {
      this.logTest(false, 'Reviews slider not found');
      this.results.push({ test: 'Reviews slider exists', pass: false });
      return;
    }

    this.logTest(true, `Slider has ${slides.length} reviews`);
    this.results.push({ test: 'Slider reviews exist', pass: true });

    // Check navigation buttons
    const hasNavButtons = prevBtn && nextBtn;
    this.logTest(hasNavButtons, 'Slider has navigation buttons');
    this.results.push({ test: 'Slider nav buttons exist', pass: hasNavButtons });

    if (hasNavButtons) {
      // Get initial transform
      const slidesWrap = document.querySelector('.slides');
      const initialTransform = slidesWrap.style.transform;
      
      // Click next
      nextBtn.click();
      const afterNext = slidesWrap.style.transform;
      const nextWorks = afterNext !== initialTransform;
      this.logTest(nextWorks, 'Next button moves slider');
      this.results.push({ test: 'Slider next button works', pass: nextWorks });
    }
  },

  // Test 6: Check contact form validation
  testContactForm() {
    console.log('\n=== TESTING CONTACT FORM ===');
    const form = document.getElementById('contact-form');

    if (!form) {
      this.logTest(false, 'Contact form not found');
      this.results.push({ test: 'Contact form exists', pass: false });
      return;
    }

    this.logTest(true, 'Contact form found');
    this.results.push({ test: 'Contact form exists', pass: true });

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Test required fields
    const hasRequiredFields = nameInput && emailInput && messageInput;
    this.logTest(hasRequiredFields, 'Form has required input fields');
    this.results.push({ test: 'Form has required fields', pass: hasRequiredFields });

    if (!hasRequiredFields) return;

    // Test empty form submission
    form.reset();
    form.dispatchEvent(new Event('submit'));
    const err = form.querySelector('.error');
    const showsError = err && err.textContent.length > 0;
    this.logTest(showsError, 'Form shows error on invalid submission');
    this.results.push({ test: 'Form validation works', pass: showsError });

    // Test invalid email
    emailInput.value = 'invalid-email';
    nameInput.value = 'Test Name';
    messageInput.value = 'This is a test message';
    form.dispatchEvent(new Event('submit'));
    const emailErr = document.getElementById('err-email');
    const emailShowsError = emailErr && emailErr.textContent.length > 0;
    this.logTest(emailShowsError, 'Email validation works');
    this.results.push({ test: 'Email validation', pass: emailShowsError });
  },

  // Test 7: Check button visibility and styles
  testButtons() {
    console.log('\n=== TESTING BUTTONS ===');
    const primaryBtns = document.querySelectorAll('.btn-primary');
    const outlineBtns = document.querySelectorAll('.btn-outline');

    const hasPrimaryBtns = primaryBtns.length > 0;
    const hasOutlineBtns = outlineBtns.length > 0;

    this.logTest(hasPrimaryBtns, `Primary buttons exist (${primaryBtns.length})`);
    this.logTest(hasOutlineBtns, `Outline buttons exist (${outlineBtns.length})`);
    this.results.push({ test: 'Primary buttons exist', pass: hasPrimaryBtns });
    this.results.push({ test: 'Outline buttons exist', pass: hasOutlineBtns });

    // Check buttons are visible
    if (primaryBtns.length > 0) {
      const firstBtn = primaryBtns[0];
      const isVisible = firstBtn.offsetParent !== null;
      this.logTest(isVisible, 'Primary button is visible');
      this.results.push({ test: 'Buttons are visible', pass: isVisible });
    }
  },

  // Test 8: Check DOM elements and structure
  testDOMStructure() {
    console.log('\n=== TESTING DOM STRUCTURE ===');
    const sections = ['hero', 'featured', 'menu', 'about', 'gallery', 'reviews', 'hours-contact', 'contact'];
    
    sections.forEach(id => {
      const el = document.getElementById(id);
      const exists = el !== null;
      this.logTest(exists, `Section #${id} exists`);
      this.results.push({ test: `Section #${id}`, pass: exists });
    });

    // Check header and footer
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    this.logTest(!!header, 'Header exists');
    this.logTest(!!footer, 'Footer exists');
    this.logTest(!!main, 'Main content exists');
    this.results.push({ test: 'Header exists', pass: !!header });
    this.results.push({ test: 'Footer exists', pass: !!footer });
    this.results.push({ test: 'Main exists', pass: !!main });
  },

  // Test 9: Check accessibility
  testAccessibility() {
    console.log('\n=== TESTING ACCESSIBILITY ===');
    const skipLink = document.querySelector('.skip-link');
    const ariaLabels = document.querySelectorAll('[aria-label]');
    const ariaLive = document.querySelectorAll('[aria-live]');
    const buttons = document.querySelectorAll('button');

    this.logTest(!!skipLink, 'Skip link present');
    this.logTest(ariaLabels.length > 0, `ARIA labels present (${ariaLabels.length})`);
    this.logTest(ariaLive.length > 0, `ARIA live regions (${ariaLive.length})`);
    this.results.push({ test: 'Skip link present', pass: !!skipLink });
    this.results.push({ test: 'ARIA labels present', pass: ariaLabels.length > 0 });
    this.results.push({ test: 'ARIA live regions', pass: ariaLive.length > 0 });

    // Check buttons have proper attributes
    let buttonAccessibilityPass = true;
    buttons.forEach(btn => {
      if (!btn.textContent.trim() && !btn.getAttribute('aria-label')) {
        buttonAccessibilityPass = false;
      }
    });
    this.logTest(buttonAccessibilityPass, 'Buttons have text or aria-label');
    this.results.push({ test: 'Button accessibility', pass: buttonAccessibilityPass });
  },

  // Test 10: Check footer year is updated
  testFooterYear() {
    console.log('\n=== TESTING FOOTER ===');
    const yearEl = document.getElementById('year');
    const currentYear = new Date().getFullYear().toString();
    
    if (yearEl) {
      const yearMatches = yearEl.textContent === currentYear;
      this.logTest(yearMatches, `Footer year is current (${yearEl.textContent})`);
      this.results.push({ test: 'Footer year updated', pass: yearMatches });
    } else {
      this.logTest(false, 'Year element not found');
      this.results.push({ test: 'Footer year updated', pass: false });
    }
  },

  logTest(pass, message) {
    const status = pass ? '✓ PASS' : '✗ FAIL';
    console.log(`${status}: ${message}`);
    if (pass) this.passCount++;
    else this.failCount++;
  },

  generateReport() {
    console.log('\n\n=== TEST SUMMARY ===');
    console.log(`Total Tests: ${this.results.length}`);
    console.log(`✓ Passed: ${this.passCount}`);
    console.log(`✗ Failed: ${this.failCount}`);
    console.log(`Success Rate: ${((this.passCount / this.results.length) * 100).toFixed(1)}%`);
    
    if (this.failCount > 0) {
      console.log('\n=== FAILED TESTS ===');
      this.results.filter(r => !r.pass).forEach(r => {
        console.log(`✗ ${r.test}`);
      });
    }
    
    return {
      total: this.results.length,
      passed: this.passCount,
      failed: this.failCount,
      successRate: ((this.passCount / this.results.length) * 100).toFixed(1),
      results: this.results
    };
  },

  runAll() {
    console.log('🧪 Starting comprehensive website tests...\n');
    this.testDOMStructure();
    this.testNavigation();
    this.testMobileMenu();
    this.testMenuTabs();
    this.testGalleryLightbox();
    this.testReviewsSlider();
    this.testContactForm();
    this.testButtons();
    this.testAccessibility();
    this.testFooterYear();
    
    return this.generateReport();
  }
};

// Run all tests
const report = TestRunner.runAll();
window.__testReport = report;
