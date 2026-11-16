const header = document.querySelector("header");
const toTop = document.querySelector(".to-top");
const btnMenu = document.getElementById("btn-menu");
const mobileNav = document.querySelector(".mobile-nav");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

let lastScrollTop = 0;

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (header) {
    header.classList.toggle("scrolled", scrollTop > 24);

    if (scrollTop > lastScrollTop && scrollTop > 120) {
      header.classList.add("hidden");
    } else {
      header.classList.remove("hidden");
    }
  }

  if (toTop) {
    toTop.classList.toggle("active", scrollTop > 500);
  }

  lastScrollTop = Math.max(scrollTop, 0);
};

const openMobileNav = () => {
  if (!mobileNav) {
    return;
  }

  mobileNav.classList.add("active");
  mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeMobileNav = () => {
  if (!mobileNav) {
    return;
  }

  mobileNav.classList.remove("active");
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

window.addEventListener("scroll", handleScroll);
handleScroll();

if (btnMenu && closeMobileNavBtn) {
  btnMenu.addEventListener("click", openMobileNav);
  closeMobileNavBtn.addEventListener("click", closeMobileNav);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav?.classList.contains("active")) {
      closeMobileNav();
    }
  });
}
