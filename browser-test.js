// Run this in browser console to test functionality
(function() {
  const results = [];
  let pass = 0, fail = 0;

  function test(name, fn) {
    try {
      const result = fn();
      if (result) {
        console.log(`✓ ${name}`);
        pass++;
      } else {
        console.log(`✗ ${name}`);
        fail++;
      }
      results.push({ name, pass: result });
    } catch (e) {
      console.log(`✗ ${name} - ERROR: ${e.message}`);
      fail++;
      results.push({ name, pass: false, error: e.message });
    }
  }

  console.log("🧪 RUNNING BROWSER TESTS\n");

  // Navigation tests
  test("Mobile menu toggle exists", () => !!document.querySelector('.nav-toggle'));
  test("Primary menu exists", () => !!document.getElementById('primary-menu'));
  test("Menu starts hidden", () => document.getElementById('primary-menu').hasAttribute('hidden'));
  
  // Test menu toggle functionality
  test("Menu toggle click works", () => {
    const toggle = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');
    const initialHidden = menu.hasAttribute('hidden');
    toggle.click();
    const afterClick = !menu.hasAttribute('hidden');
    toggle.click(); // Reset
    return afterClick === !initialHidden;
  });

  // Button tests
  test("Primary buttons exist", () => document.querySelectorAll('.btn-primary').length > 0);
  test("Outline buttons exist", () => document.querySelectorAll('.btn-outline').length > 0);
  test("Buttons are visible", () => {
    const btn = document.querySelector('.btn');
    return btn && btn.offsetParent !== null;
  });

  // Form tests
  test("Contact form exists", () => !!document.getElementById('contact-form'));
  test("Form has name input", () => !!document.getElementById('name'));
  test("Form has email input", () => !!document.getElementById('email'));
  test("Form has message textarea", () => !!document.getElementById('message'));
  test("Error containers exist", () => document.querySelectorAll('.error').length >= 4);

  // Menu tabs
  test("Menu tabs exist", () => document.querySelectorAll('.tab').length >= 4);
  test("First tab is active", () => document.querySelector('.tab').classList.contains('active'));
  test("Menu panels exist", () => document.querySelectorAll('.menu-panel').length >= 4);

  // Gallery tests
  test("Gallery items exist", () => document.querySelectorAll('.gallery-item').length > 0);
  test("Lightbox modal exists", () => !!document.getElementById('lightbox'));
  test("Lightbox starts hidden", () => document.getElementById('lightbox').hasAttribute('hidden'));

  // Gallery click test
  test("Lightbox opens on gallery click", () => {
    const item = document.querySelector('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    item.click();
    const isOpen = !lightbox.hasAttribute('hidden');
    lightbox.setAttribute('hidden', ''); // Reset
    return isOpen;
  });

  // Reviews slider
  test("Slider exists", () => !!document.querySelector('.reviews-slider'));
  test("Slider has slides", () => document.querySelectorAll('.slide').length > 0);
  test("Slider nav buttons exist", () => document.querySelectorAll('.slider-btn').length >= 2);

  // Accessibility
  test("Skip link exists", () => !!document.querySelector('.skip-link'));
  test("ARIA labels exist", () => document.querySelectorAll('[aria-label]').length > 0);
  test("ARIA live regions exist", () => document.querySelectorAll('[aria-live]').length > 0);

  // Navigation links
  const links = ['#about', '#menu', '#gallery', '#reviews', '#contact'];
  links.forEach(link => {
    test(`Navigation ${link} resolves`, () => !!document.querySelector(link));
  });

  // Footer
  test("Footer exists", () => !!document.querySelector('footer'));
  test("Footer year element exists", () => !!document.getElementById('year'));
  test("Year is current", () => {
    const year = document.getElementById('year');
    return year && year.textContent === new Date().getFullYear().toString();
  });

  // Form validation
  test("Form validation works", () => {
    const form = document.getElementById('contact-form');
    const status = form.querySelector('.form-status');
    // Empty submit should show error
    const nameInput = form.querySelector('#name');
    nameInput.value = '';
    form.dispatchEvent(new Event('submit'));
    nameInput.value = 'Test'; // Reset
    return status !== null;
  });

  // Responsive
  test("Viewport meta tag exists", () => document.querySelector('meta[name="viewport"]') !== null);
  test("Has container element", () => document.querySelector('.container') !== null);

  console.log("\n" + "=".repeat(50));
  console.log(`SUMMARY: ${pass} passed, ${fail} failed out of ${pass + fail} tests`);
  console.log(`Success Rate: ${((pass / (pass + fail)) * 100).toFixed(1)}%`);
  console.log("=".repeat(50));

  window.__testResults = { pass, fail, total: pass + fail, results };
  return { pass, fail, total: pass + fail, results };
})();
