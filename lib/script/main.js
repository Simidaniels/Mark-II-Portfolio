const header = document.querySelector("header");
const timeText = document.querySelector(".time");
const yearText = document.getElementById("year");
const btnMenu = document.getElementById("btn-menu");
const mobileNav = document.querySelector(".mobile-nav");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");

let lastScrollTop = 0;

const setLagosTime = () => {
  if (!timeText) {
    return;
  }

  const now = new Date();
  const formatted = now.toLocaleTimeString("en-GB", {
    timeZone: "Africa/Lagos",
    hour: "2-digit",
    minute: "2-digit",
  });

  timeText.textContent = `${formatted} GMT+1`;
};

const handleHeaderState = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  header.classList.toggle("scrolled", scrollTop > 24);

  if (scrollTop > lastScrollTop && scrollTop > 120) {
    header.classList.add("hidden");
  } else {
    header.classList.remove("hidden");
  }

  lastScrollTop = Math.max(scrollTop, 0);
};

const openMobileNav = () => {
  mobileNav.classList.add("active");
  mobileNav.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
};

const closeMobileNav = () => {
  mobileNav.classList.remove("active");
  mobileNav.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

setLagosTime();
setInterval(setLagosTime, 1000);

if (yearText) {
  yearText.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", handleHeaderState);
handleHeaderState();

if (btnMenu && mobileNav && closeMobileNavBtn) {
  btnMenu.addEventListener("click", openMobileNav);
  closeMobileNavBtn.addEventListener("click", closeMobileNav);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileNav.classList.contains("active")) {
      closeMobileNav();
    }
  });
}
