const revealItems = document.querySelectorAll(".reveal");
const themeButton = document.querySelector("[data-theme-toggle]");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

function applyTheme(theme) {
  const nextTheme = theme === "light" ? "light" : "dark";
  document.body.classList.toggle("light", nextTheme === "light");
  document.body.classList.toggle("dark", nextTheme === "dark");

  if (!themeButton) {
    return;
  }

  const icon = themeButton.querySelector("i");
  const label = themeButton.querySelector("span");
  const isLight = nextTheme === "light";

  themeButton.setAttribute("aria-label", `Switch to ${isLight ? "dark" : "light"} theme`);
  if (label) {
    label.textContent = isLight ? "Dark Theme" : "Light Theme";
  }
  if (icon) {
    icon.classList.toggle("fa-sun", isLight);
    icon.classList.toggle("fa-moon", !isLight);
  }
}

try {
  applyTheme(localStorage.getItem("theme") || "dark");
} catch {
  applyTheme("dark");
}

if (themeButton) {
  themeButton.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // Ignore private browsing storage failures.
    }
  });
}

const yearSpan = document.getElementById("copyright-year");
if (yearSpan) {
  yearSpan.textContent = `© ${new Date().getFullYear()}`;
}

const metaVersion = document.querySelector('meta[name="version"]');
const metaTimestamp = document.querySelector('meta[name="timestamp"]');
const htmlVersionSpan = document.getElementById("html-version");
const htmlTimestampSpan = document.getElementById("html-timestamp");

if (metaVersion && htmlVersionSpan) {
  htmlVersionSpan.textContent = metaVersion.getAttribute("content");
}

if (metaTimestamp && htmlTimestampSpan) {
  htmlTimestampSpan.textContent = metaTimestamp.getAttribute("content");
}
