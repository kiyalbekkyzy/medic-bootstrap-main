console.log("=== Running tests for About Page ===");

// --- Test 1: Check if page title is correct ---
const pageTitle = document.querySelector("title");
if (pageTitle && pageTitle.textContent.trim() === "О НАС") {
    console.log("✔ Test 1 Passed: Page title is correct");
} else {
    console.error("❌ Test 1 Failed: Page title is missing or incorrect");
}

// --- Test 2: Check if main navigation exists with 4 links ---
const navLinks = document.querySelectorAll("nav.main-nav ul li a");
if (navLinks.length >= 4) {
    console.log("✔ Test 2 Passed: Main navigation has 4 or more links");
} else {
    console.error("❌ Test 2 Failed: Navigation links missing");
}

// --- Test 3: Check if Admin button exists ---
const adminBtn = document.querySelector(".admin-btn");
if (adminBtn && adminBtn.getAttribute("href") === "admin-login.html") {
    console.log("✔ Test 3 Passed: Admin button exists with correct link");
} else {
    console.error("❌ Test 3 Failed: Admin button missing or wrong link");
}

// --- Test 4: Check if main H1 exists ---
const mainH1 = document.querySelector(".page-title h1");
if (mainH1 && mainH1.textContent.trim() === "О нас") {
    console.log("✔ Test 4 Passed: Main H1 found");
} else {
    console.error("❌ Test 4 Failed: Main H1 missing or incorrect");
}

// --- Test 5: Check if CTA buttons exist ---
const registerBtn = document.querySelector('a[href="register.html"]');
const loginBtn = document.querySelector('a[href="login.html"]');
if (registerBtn && loginBtn) {
    console.log("✔ Test 5 Passed: Register and Login buttons exist");
} else {
    console.error("❌ Test 5 Failed: CTA buttons missing");
}

// --- Test 6: Check if story section has images ---
const storyImages = document.querySelectorAll(".story img");
if (storyImages.length >= 2) {
    console.log(`✔ Test 6 Passed: Story section has ${storyImages.length} images`);
} else {
    console.error("❌ Test 6 Failed: Story section images missing");
}

// --- Test 7: Check if features section exists with 3 items ---
const featureItems = document.querySelectorAll(".features-list .feature-item");
if (featureItems.length >= 3) {
    console.log("✔ Test 7 Passed: Features section has 3 or more items");
} else {
    console.error("❌ Test 7 Failed: Features section items missing");
}

// --- Test 8: Check footer text ---
const footerText = document.querySelector("footer p");
if (footerText && footerText.textContent.includes("© 2025 AnalizGO")) {
    console.log("✔ Test 8 Passed: Footer text is correct");
} else {
    console.error("❌ Test 8 Failed: Footer text missing or incorrect");
}

console.log("=== About Page Tests Completed ===");
