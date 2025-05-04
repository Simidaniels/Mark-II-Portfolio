let lastScrollTop = 0;
const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const heroSection = document.querySelector(".hero");
const btnMenu = document.getElementById("btn-menu");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffsscet || document.documentElement.scrollTop;
  const heroSectionOffsetTop = heroSection.offsetTop;

  if (scrollTop > heroSectionOffsetTop) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
  if (scrollTop > lastScrollTop) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = scrollTop;
});

btnMenu.addEventListener("click", () => {
  const mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.toggle("active");
});

closeMobileNavBtn.addEventListener("click", () => {
  const mobileNav = document.querySelector(".mobile-nav");
  mobileNav.classList.remove("active");
});