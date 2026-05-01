const header = document.querySelector("header");
const timeText = document.querySelector(".time");
const yearText = document.getElementById("year");
const btnMenu = document.getElementById("btn-menu");
const mobileNav = document.querySelector(".mobile-nav");
const closeMobileNavBtn = document.querySelector(".close-mobile-nav");
const mobileLinks = document.querySelectorAll(".mobile-nav a");
const themeToggle = document.getElementById("theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
const themeStorageKey = "markii-theme";

let lastScrollTop = 0;

const updateThemeControls = (isLightTheme) => {
  const label = isLightTheme ? "Dark Mode" : "Light Mode";
  const icon = isLightTheme ? "moon" : "sun";
  const ariaLabel = `Switch to ${isLightTheme ? "dark" : "light"} mode`;

  [themeToggle, mobileThemeToggle].forEach((toggle) => {
    if (!toggle) {
      return;
    }

    toggle.setAttribute("aria-label", ariaLabel);
    toggle.setAttribute("aria-pressed", String(isLightTheme));

    const iconNode = toggle.querySelector("box-icon");
    if (iconNode) {
      iconNode.setAttribute("name", icon);
    }

    const textNode = toggle.querySelector("span");
    if (textNode) {
      textNode.textContent = label;
    }
  });
};

const applyTheme = (theme) => {
  const isLightTheme = theme === "light";
  document.body.classList.toggle("light-theme", isLightTheme);
  updateThemeControls(isLightTheme);
};

const toggleTheme = () => {
  const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
  applyTheme(nextTheme);
  window.localStorage.setItem(themeStorageKey, nextTheme);
};

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

applyTheme(window.localStorage.getItem(themeStorageKey) || "dark");

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

[themeToggle, mobileThemeToggle].forEach((toggle) => {
  if (toggle) {
    toggle.addEventListener("click", toggleTheme);
  }
});
