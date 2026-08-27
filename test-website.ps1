# Website Testing Suite - PowerShell Version
param(
    [string]$HtmlPath = "$PSScriptRoot\index.html",
    [string]$CssPath = "$PSScriptRoot\style.css",
    [string]$JsPath = "$PSScriptRoot\main.js"
)

$passCount = 0
$failCount = 0
$tests = @()

function Test-Result {
    param(
        [bool]$Pass,
        [string]$TestName,
        [string]$Details = ""
    )
    
    $status = if ($Pass) { "✓ PASS" } else { "✗ FAIL" }
    $message = $TestName
    if ($Details) { $message += " - $Details" }
    
    Write-Host "$status : $message"
    
    $tests += @{
        name = $TestName
        pass = $Pass
        details = $Details
    }
    
    if ($Pass) { $script:passCount++ } else { $script:failCount++ }
}

Write-Host "🧪 WEBSITE TESTING SUITE`n"
Write-Host "=" * 60

# TEST 1: FILE INTEGRITY
Write-Host "`n[1] FILE INTEGRITY TESTS"
Write-Host "-" * 60

$htmlExists = Test-Path $HtmlPath
Test-Result $htmlExists "index.html exists"

$cssExists = Test-Path $CssPath
Test-Result $cssExists "style.css exists"

$jsExists = Test-Path $JsPath
Test-Result $jsExists "main.js exists"

# TEST 2: HTML STRUCTURE
Write-Host "`n[2] HTML STRUCTURE TESTS"
Write-Host "-" * 60

if ($htmlExists) {
    $html = Get-Content $HtmlPath -Raw
    
    Test-Result ($html -match "<!doctype html>") "HTML has DOCTYPE"
    Test-Result ($html -match "<head") "HTML has <head>"
    Test-Result ($html -match "<body") "HTML has <body>"
    Test-Result ($html -match "<main") "HTML has <main>"
    Test-Result ($html -match "<footer") "HTML has <footer>"
    Test-Result ($html -match "<header") "HTML has <header>"
    Test-Result ($html -match "<nav") "HTML has <nav>"
    Test-Result ($html -match 'id="primary-menu"') "Primary menu exists"
    Test-Result ($html -match 'class="brand"') "Brand element exists"
    
    # TEST 3: NAVIGATION
    Write-Host "`n[3] NAVIGATION TESTS"
    Write-Host "-" * 60
    
    $navLinks = @("#about", "#menu", "#gallery", "#reviews", "#contact")
    foreach ($link in $navLinks) {
        Test-Result ($html -match "href=`"$link`"") "Navigation link to $link exists"
    }
    
    # TEST 4: BUTTONS
    Write-Host "`n[4] BUTTON TESTS"
    Write-Host "-" * 60
    
    Test-Result ($html -match "btn-primary") "Primary buttons exist"
    Test-Result ($html -match "btn-outline") "Outline buttons exist"
    Test-Result ($html -match 'class="hero-cta"') "Hero CTA section exists"
    Test-Result ($html -match 'type="submit"') "Form submit button exists"
    
    # TEST 5: FORMS
    Write-Host "`n[5] FORM TESTS"
    Write-Host "-" * 60
    
    Test-Result ($html -match 'id="contact-form"') "Contact form exists"
    Test-Result ($html -match 'id="name"') "Name input exists"
    Test-Result ($html -match 'id="email"') "Email input exists"
    Test-Result ($html -match 'id="phone"') "Phone input exists"
    Test-Result ($html -match 'id="message"') "Message textarea exists"
    
    $nameReq = ($html -match 'id="name"[^>]*required')
    Test-Result $nameReq "Name field is required"
    
    $emailReq = ($html -match 'id="email"[^>]*required')
    Test-Result $emailReq "Email field is required"
    
    $msgReq = ($html -match 'id="message"[^>]*required')
    Test-Result $msgReq "Message field is required"
    
    $errorContainers = ([regex]::Matches($html, 'class="error"').Count)
    Test-Result ($errorContainers -ge 4) "Error message containers exist ($errorContainers found)"
    
    # TEST 6: INTERACTIVE FEATURES
    Write-Host "`n[6] INTERACTIVE FEATURES TESTS"
    Write-Host "-" * 60
    
    $tabCount = ([regex]::Matches($html, 'class="tab"').Count)
    Test-Result ($tabCount -ge 4) "Menu tabs exist ($tabCount tabs)"
    
    $panelCount = ([regex]::Matches($html, 'class="menu-panel"').Count)
    Test-Result ($panelCount -ge 4) "Menu panels exist ($panelCount panels)"
    
    Test-Result ($html -match 'class="gallery-item"') "Gallery items exist"
    Test-Result ($html -match 'id="lightbox"') "Gallery lightbox modal exists"
    Test-Result ($html -match 'class="reviews-slider"') "Reviews slider exists"
    
    $sliderBtns = ([regex]::Matches($html, 'class="slider-btn"').Count)
    Test-Result ($sliderBtns -ge 2) "Slider navigation buttons exist ($sliderBtns buttons)"
    
    # TEST 7: ACCESSIBILITY
    Write-Host "`n[7] ACCESSIBILITY TESTS"
    Write-Host "-" * 60
    
    Test-Result ($html -match 'class="skip-link"') "Skip to content link exists"
    Test-Result ($html -match 'aria-label=') "ARIA labels exist"
    Test-Result ($html -match 'aria-live=') "ARIA live regions exist"
    Test-Result ($html -match 'aria-hidden=') "ARIA hidden attributes exist"
    Test-Result ($html -match 'role=') "ARIA roles exist"
    Test-Result ($html -match 'viewport') "Viewport meta tag exists"
    Test-Result ($html -match 'meta name="description"') "Meta description exists"
    
    # TEST 8: SEO & METADATA
    Write-Host "`n[8] SEO & METADATA TESTS"
    Write-Host "-" * 60
    
    Test-Result ($html -match "<title>") "Page title exists"
    Test-Result ($html -match 'property="og:') "OpenGraph tags exist"
    Test-Result ($html -match 'twitter:card') "Twitter card meta tag exists"
    Test-Result ($html -match 'rel="canonical"') "Canonical URL defined"
    Test-Result ($html -match 'application/ld\+json') "Schema.org structured data exists"
    
    $altCount = ([regex]::Matches($html, 'alt="').Count)
    Test-Result ($altCount -gt 5) "Images have alt text ($altCount alts found)"
}

# TEST 9: CSS
Write-Host "`n[9] CSS TESTS"
Write-Host "-" * 60

if ($cssExists) {
    $css = Get-Content $CssPath -Raw
    
    Test-Result ($css -match "--") "CSS custom properties used"
    Test-Result ($css -match "box-sizing:\s*border-box") "Box-sizing reset exists"
    Test-Result ($css -match "(margin|padding):\s*0") "CSS reset for margins/padding"
    Test-Result ($css -match "font-family") "Font family defined"
    Test-Result ($css -match "color:") "Color scheme defined"
    Test-Result ($css -match "@keyframes") "CSS animations defined"
    Test-Result ($css -match ":focus") "Focus state styling exists"
    Test-Result ($css -match "@media") "Media queries defined"
    Test-Result ($css -match "display:\s*flex|display:\s*grid") "Flexbox/Grid layouts used"
}

# TEST 10: JAVASCRIPT
Write-Host "`n[10] JAVASCRIPT FUNCTIONALITY TESTS"
Write-Host "-" * 60

if ($jsExists) {
    $js = Get-Content $JsPath -Raw
    
    Test-Result ($js -match "nav-toggle") "Mobile menu toggle JS exists"
    Test-Result ($js -match 'removeAttribute.*hidden') "Menu toggle logic implemented"
    Test-Result ($js -match 'class="tab"') "Menu tab switching JS exists"
    Test-Result ($js -match "gallery-item") "Gallery lightbox JS implemented"
    Test-Result ($js -match "slider|showSlide") "Reviews slider JS implemented"
    Test-Result ($js -match "contact-form.*valid") "Form validation JS implemented"
    Test-Result ($js -match "scrollIntoView") "Smooth scroll navigation exists"
    Test-Result ($js -match "addEventListener") "Event listeners attached"
    
    # Check for common issues
    $hasConsoleLog = ($js -match "console\.")
    Test-Result $hasConsoleLog "Console logging for debugging"
}

# SUMMARY
Write-Host "`n" + "=" * 60
Write-Host "TEST SUMMARY"
Write-Host "=" * 60
Write-Host "✓ Passed: $passCount"
Write-Host "✗ Failed: $failCount"
Write-Host "Total: $($passCount + $failCount)"
Write-Host "Success Rate: $('{0:F1}' -f (($passCount / ($passCount + $failCount)) * 100))%"

if ($failCount -gt 0) {
    Write-Host "`n⚠️  FAILED TESTS:"
    $tests | Where-Object { -not $_.pass } | ForEach-Object {
        Write-Host "  ✗ $($_.name)$(if($_.details) { ' - ' + $_.details } else { '' })"
    }
}

Write-Host "`n" + "=" * 60 + "`n"

# Export results
$results = @{
    passed = $passCount
    failed = $failCount
    total = $passCount + $failCount
    successRate = '{0:F1}' -f (($passCount / ($passCount + $failCount)) * 100)
    tests = $tests
}

$results | ConvertTo-Json | Out-File -FilePath "$PSScriptRoot\test-results.json" -Force
Write-Host "Results saved to test-results.json"

exit if ($failCount -gt 0) { 1 } else { 0 }
