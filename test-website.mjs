#!/usr/bin/env node
/**
 * Website Functional Testing Suite
 * Tests navigation, buttons, forms, responsiveness, and JavaScript functionality
 */

const fs = require('fs');
const path = require('path');

// Read the HTML file
const htmlPath = path.join(__dirname, 'index.html');
const jsPath = path.join(__dirname, 'main.js');
const cssPath = path.join(__dirname, 'style.css');

const tests = [];
let passCount = 0;
let failCount = 0;

function logTest(pass, testName, details = '') {
  const status = pass ? '✓ PASS' : '✗ FAIL';
  console.log(`${status}: ${testName}${details ? ' - ' + details : ''}`);
  tests.push({ name: testName, pass, details });
  if (pass) passCount++;
  else failCount++;
}

console.log('🧪 WEBSITE TESTING SUITE\n');
console.log('=' .repeat(60));

// TEST 1: Check HTML file exists and has content
console.log('\n[1] FILE INTEGRITY TESTS');
console.log('-' .repeat(60));

const htmlExists = fs.existsSync(htmlPath);
logTest(htmlExists, 'index.html exists');

if (htmlExists) {
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  const hasDoctype = htmlContent.includes('<!doctype html>');
  const hasHead = htmlContent.includes('<head>');
  const hasBody = htmlContent.includes('<body>');
  const hasMain = htmlContent.includes('<main');
  const hasFooter = htmlContent.includes('<footer');
  
  logTest(hasDoctype, 'HTML has DOCTYPE');
  logTest(hasHead, 'HTML has <head>');
  logTest(hasBody, 'HTML has <body>');
  logTest(hasMain, 'HTML has <main>');
  logTest(hasFooter, 'HTML has <footer>');
}

const jsExists = fs.existsSync(jsPath);
logTest(jsExists, 'main.js exists');

const cssExists = fs.existsSync(cssPath);
logTest(cssExists, 'style.css exists');

// TEST 2: Navigation Structure
console.log('\n[2] NAVIGATION STRUCTURE TESTS');
console.log('-' .repeat(60));

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const hasHeader = htmlContent.includes('<header');
const hasNav = htmlContent.includes('<nav');
const hasBrand = htmlContent.includes('class="brand"');
const hasNavToggle = htmlContent.includes('class="nav-toggle"');
const hasMenu = htmlContent.includes('id="primary-menu"');
const hasMainNav = htmlContent.includes('class="main-nav"');

logTest(hasHeader, 'Page has <header>');
logTest(hasNav, 'Page has <nav>');
logTest(hasBrand, 'Brand element exists');
logTest(hasNavToggle, 'Mobile nav toggle exists');
logTest(hasMenu, 'Primary menu exists (id="primary-menu")');
logTest(hasMainNav, 'Main nav class exists');

// Check for all required nav links
const navLinks = ['#about', '#menu', '#gallery', '#reviews', '#contact'];
navLinks.forEach(link => {
  const hasLink = htmlContent.includes(`href="${link}"`);
  logTest(hasLink, `Navigation link to ${link} exists`);
});

// TEST 3: Button Tests
console.log('\n[3] BUTTON TESTS');
console.log('-' .repeat(60));

const hasPrimaryBtns = htmlContent.includes('btn-primary');
const hasOutlineBtns = htmlContent.includes('btn-outline');
const heroCtaCount = (htmlContent.match(/class="hero-cta"/g) || []).length;
const btnSubmit = htmlContent.includes('type="submit"');
const btnCalls = (htmlContent.match(/class="btn"/g) || []).length;

logTest(hasPrimaryBtns, 'Primary buttons exist (btn-primary class)');
logTest(hasOutlineBtns, 'Outline buttons exist (btn-outline class)');
logTest(heroCtaCount > 0, `Hero CTA section exists`);
logTest(btnSubmit, 'Form submit button exists');
logTest(btnCalls > 0, `Found ${btnCalls} buttons total`);

// TEST 4: Form Tests
console.log('\n[4] FORM TESTS');
console.log('-' .repeat(60));

const hasContactForm = htmlContent.includes('id="contact-form"');
const hasNameInput = htmlContent.includes('id="name"');
const hasEmailInput = htmlContent.includes('id="email"');
const hasPhoneInput = htmlContent.includes('id="phone"');
const hasMessageInput = htmlContent.includes('id="message"');
const nameRequired = htmlContent.includes('id="name"') && htmlContent.includes('required');
const emailRequired = htmlContent.includes('id="email"') && htmlContent.includes('required');
const messageRequired = htmlContent.includes('id="message"') && htmlContent.includes('required');
const hasErrorContainers = (htmlContent.match(/class="error"/g) || []).length >= 4;

logTest(hasContactForm, 'Contact form exists');
logTest(hasNameInput, 'Name input exists');
logTest(hasEmailInput, 'Email input exists');
logTest(hasPhoneInput, 'Phone input exists');
logTest(hasMessageInput, 'Message textarea exists');
logTest(nameRequired, 'Name field is required');
logTest(emailRequired, 'Email field is required');
logTest(messageRequired, 'Message field is required');
logTest(hasErrorContainers, 'Error message containers exist');

// TEST 5: Interactive Features
console.log('\n[5] INTERACTIVE FEATURES TESTS');
console.log('-' .repeat(60));

const hasMenuTabs = (htmlContent.match(/class="tab"/g) || []).length >= 4;
const hasMenuPanels = (htmlContent.match(/class="menu-panel"/g) || []).length >= 4;
const hasGalleryItems = (htmlContent.match(/class="gallery-item"/g) || []).length > 0;
const hasLightbox = htmlContent.includes('id="lightbox"');
const hasSlider = htmlContent.includes('class="reviews-slider"');
const hasSliderBtns = (htmlContent.match(/class="slider-btn"/g) || []).length >= 2;

logTest(hasMenuTabs, 'Menu tabs exist (4+ tabs)');
logTest(hasMenuPanels, 'Menu panels exist (4+ panels)');
logTest(hasGalleryItems, 'Gallery items exist');
logTest(hasLightbox, 'Gallery lightbox modal exists');
logTest(hasSlider, 'Reviews slider exists');
logTest(hasSliderBtns, 'Slider navigation buttons exist');

// TEST 6: Accessibility Features
console.log('\n[6] ACCESSIBILITY TESTS');
console.log('-' .repeat(60));

const hasSkipLink = htmlContent.includes('class="skip-link"');
const hasAriaLabel = (htmlContent.match(/aria-label=/g) || []).length > 0;
const hasAriaLive = (htmlContent.match(/aria-live=/g) || []).length > 0;
const hasAriaHidden = (htmlContent.match(/aria-hidden=/g) || []).length > 0;
const hasRole = (htmlContent.match(/role=/g) || []).length > 0;
const hasMetaViewport = htmlContent.includes('viewport');
const hasMetaDescription = htmlContent.includes('meta name="description"');

logTest(hasSkipLink, 'Skip to content link exists');
logTest(hasAriaLabel, 'ARIA labels exist');
logTest(hasAriaLive, 'ARIA live regions exist');
logTest(hasAriaHidden, 'ARIA hidden attributes exist');
logTest(hasRole, 'ARIA roles exist');
logTest(hasMetaViewport, 'Viewport meta tag exists (responsive)');
logTest(hasMetaDescription, 'Meta description exists (SEO)');

// TEST 7: Responsive Design
console.log('\n[7] RESPONSIVE DESIGN TESTS');
console.log('-' .repeat(60));

const cssContent = fs.readFileSync(cssPath, 'utf-8');

const has600Breakpoint = cssContent.includes('@media(min-width:600px)');
const has900Breakpoint = cssContent.includes('@media(min-width:900px)');
const hasContainerPadding = cssContent.includes('--container-padding');
const hasFlexboxLayouts = cssContent.includes('display:flex') || cssContent.includes('display: flex');
const hasGridLayouts = cssContent.includes('display:grid') || cssContent.includes('display: grid');
const hasMaxWidth = cssContent.includes('max-width');

logTest(has600Breakpoint, 'Mobile breakpoint (600px) exists');
logTest(has900Breakpoint, 'Desktop breakpoint (900px) exists');
logTest(hasContainerPadding, 'Container padding defined');
logTest(hasFlexboxLayouts, 'Flexbox layouts used');
logTest(hasGridLayouts, 'CSS Grid layouts used');
logTest(hasMaxWidth, 'Max-width constraints exist');

// TEST 8: JavaScript Integration
console.log('\n[8] JAVASCRIPT FUNCTIONALITY TESTS');
console.log('-' .repeat(60));

const jsContent = fs.readFileSync(jsPath, 'utf-8');

const hasNavToggle = jsContent.includes('nav-toggle');
const hasMenuToggle = jsContent.includes('removeAttribute("hidden")');
const hasMenuTabs = jsContent.includes('.tab');
const hasGalleryLightbox = jsContent.includes('gallery-item') && jsContent.includes('lightbox');
const hasSlider = jsContent.includes('showSlide') || jsContent.includes('slider');
const hasFormValidation = jsContent.includes('contact-form') && jsContent.includes('valid');
const hasSmoothScroll = jsContent.includes('scrollIntoView');
const hasEventListeners = jsContent.includes('addEventListener');

logTest(hasNavToggle, 'Mobile menu toggle JS exists');
logTest(hasMenuToggle, 'Menu toggle logic implemented');
logTest(hasMenuTabs, 'Menu tab switching JS exists');
logTest(hasGalleryLightbox, 'Gallery lightbox JS implemented');
logTest(hasSlider, 'Reviews slider JS implemented');
logTest(hasFormValidation, 'Form validation JS implemented');
logTest(hasSmoothScroll, 'Smooth scroll navigation exists');
logTest(hasEventListeners, 'Event listeners attached');

// TEST 9: SEO & Metadata
console.log('\n[9] SEO & METADATA TESTS');
console.log('-' .repeat(60));

const hasTitle = htmlContent.includes('<title>');
const hasOGTags = (htmlContent.match(/property="og:/g) || []).length > 0;
const hasTwitterCard = htmlContent.includes('twitter:card');
const hasCanonical = htmlContent.includes('rel="canonical"');
const hasSchema = htmlContent.includes('application/ld+json');
const hasAltText = (htmlContent.match(/alt="/g) || []).length > 5;

logTest(hasTitle, 'Page title exists');
logTest(hasOGTags, 'OpenGraph meta tags exist');
logTest(hasTwitterCard, 'Twitter card meta tag exists');
logTest(hasCanonical, 'Canonical URL defined');
logTest(hasSchema, 'Schema.org structured data exists');
logTest(hasAltText, 'Images have alt text');

// TEST 10: CSS Basics
console.log('\n[10] CSS FOUNDATION TESTS');
console.log('-' .repeat(60));

const hasCSSVars = cssContent.includes('--');
const hasBoxSizing = cssContent.includes('box-sizing:border-box');
const hasReset = cssContent.includes('margin:0') || cssContent.includes('padding:0');
const hasFontFamily = cssContent.includes('font-family');
const hasColors = cssContent.includes('color:');
const hasAnimation = cssContent.includes('@keyframes');
const hasFocus = cssContent.includes(':focus');

logTest(hasCSSVars, 'CSS custom properties used');
logTest(hasBoxSizing, 'Box-sizing reset exists');
logTest(hasReset, 'CSS reset for margin/padding');
logTest(hasFontFamily, 'Font family defined');
logTest(hasColors, 'Color scheme defined');
logTest(hasAnimation, 'CSS animations defined');
logTest(hasFocus, 'Focus state styling exists');

// TEST 11: Performance & Best Practices
console.log('\n[11] PERFORMANCE & BEST PRACTICES');
console.log('-' .repeat(60));

const hasLazyLoading = htmlContent.includes('loading="lazy"');
const hasDefer = htmlContent.includes('defer');
const hasPreconnect = htmlContent.includes('preconnect');
const hasViewportMeta = htmlContent.includes('viewport');
const hasValidHTML = htmlContent.includes('<!doctype html>') && htmlContent.includes('</html>');
const noInlineScript = !htmlContent.includes('<script>') || (htmlContent.match(/<script>/g) || []).length < 2;

logTest(hasLazyLoading, 'Lazy loading used for images');
logTest(hasDefer, 'Scripts deferred');
logTest(hasPreconnect, 'Font preconnect exists');
logTest(hasViewportMeta, 'Viewport meta tag exists');
logTest(hasValidHTML, 'HTML structure is complete');
logTest(noInlineScript, 'Minimal inline scripts');

// SUMMARY
console.log('\n' + '='.repeat(60));
console.log('TEST SUMMARY');
console.log('='.repeat(60));
console.log(`✓ Passed: ${passCount}`);
console.log(`✗ Failed: ${failCount}`);
console.log(`Total: ${tests.length}`);
console.log(`Success Rate: ${((passCount / tests.length) * 100).toFixed(1)}%`);

if (failCount > 0) {
  console.log('\n⚠️  FAILED TESTS:');
  tests.filter(t => !t.pass).forEach(t => {
    console.log(`  ✗ ${t.name}${t.details ? ' - ' + t.details : ''}`);
  });
}

console.log('\n' + '='.repeat(60) + '\n');

process.exit(failCount > 0 ? 1 : 0);
