// =========================================================
// LANDING PAGE - 30 EKSPERIMEN ANAK & ORANG TUA
// File: script.js
// =========================================================

// Smooth scroll untuk semua link anchor
const anchorLinks = document.querySelectorAll('a[href^="#"]');

anchorLinks.forEach((anchor) => {
  anchor.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (!targetElement) return;

    event.preventDefault();

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Efek header saat discroll
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!siteHeader) return;

  if (window.scrollY > 20) {
    siteHeader.classList.add("is-scrolled");
  } else {
    siteHeader.classList.remove("is-scrolled");
  }
});

// Tombol kembali ke atas
const backToTopButton = document.querySelector(".back-to-top");

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}