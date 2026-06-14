const revealItems = document.querySelectorAll(".reveal");
const ambienceButton = document.querySelector("[data-ambience]");

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

if (ambienceButton) {
  ambienceButton.addEventListener("click", () => {
    document.body.classList.toggle("ice-active");
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
