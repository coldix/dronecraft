/*
  Project:     Drone Craft ~ dronecraft.au
  Author:      Colin Dixon BSc, DipEd, Cert IV TAE
  Contact:     crdixon@gmail.com
  Timestamp:   27/10/2025 12:16 PM AEDT (Mallacoota)
  Version:     25.10.001
  File Name:   script.js
  Description: Handles theme switching and dynamic footer content.
*/

/**
 * Toggles the page theme between 'dark' and 'light'
 * and saves the preference to localStorage.
 */
function toggleTheme() {
  const body = document.body;
  const button = document.querySelector(".toggle-theme");
  const icon = button.querySelector("i");

  if (body.classList.contains("dark")) {
    body.classList.remove("dark");
    body.classList.add("light");
    icon.classList.replace("fa-moon", "fa-sun");
    button.querySelector("span").textContent = "Dark Theme";
    localStorage.setItem("theme", "light");
  } else {
    body.classList.remove("light");
    body.classList.add("dark");
    icon.classList.replace("fa-sun", "fa-moon");
    button.querySelector("span").textContent = "Light Theme";
    localStorage.setItem("theme", "dark");
  }
}

/**
 * Runs when the page finishes loading.
 * 1. Loads the saved theme from localStorage.
 * 2. Populates dynamic footer content.
 */
window.onload = () => {
  // 1. Load saved theme from localStorage
  try {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const body = document.body;
    const button = document.querySelector(".toggle-theme");
    const icon = button.querySelector("i");

    if (savedTheme === "light") {
      body.classList.remove("dark");
      body.classList.add("light");
      icon.classList.replace("fa-moon", "fa-sun");
      button.querySelector("span").textContent = "Dark Theme";
    } else {
      body.classList.add("dark");
      icon.classList.add("fa-moon");
      button.querySelector("span").textContent = "Light Theme";
    }
  } catch (error) {
    console.error("Error loading theme:", error);
  }

  // 2. Populate dynamic footer content (as per OzeGlass spec)
  try {
    // Set Copyright Year
    const yearSpan = document.getElementById("copyright-year");
    if (yearSpan) {
      yearSpan.textContent = `© ${new Date().getFullYear()}`;
    }

    // Get version info from <meta> tags
    const metaVersion = document.querySelector('meta[name="version"]');
    const metaTimestamp = document.querySelector('meta[name="timestamp"]');

    // Populate file info spans
    const htmlVersionSpan = document.getElementById("html-version");
    const htmlTimestampSpan = document.getElementById("html-timestamp");

    if (metaVersion && htmlVersionSpan) {
      htmlVersionSpan.textContent = metaVersion.getAttribute("content");
    }

    if (metaTimestamp && htmlTimestampSpan) {
      htmlTimestampSpan.textContent = metaTimestamp.getAttribute("content");
    }
  } catch (error) {
    console.error("Error populating footer info:", error);
  }
};
