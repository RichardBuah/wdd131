document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");
    const currentYearSpan = document.getElementById("currentyear");
    const lastModifiedSpan = document.querySelector(".lastModified");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    if (lastModifiedSpan) {
        lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    }
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", function () {
            nav.classList.toggle("show-menu");
            menuToggle.textContent = nav.classList.contains("show-menu") ? "✖" : "☰";
        });
    }
});
