document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.querySelector(".gallery");
    const navLinks = document.querySelectorAll("nav ul li a");
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


    // Temple data array
    const temples = [
                {
                  templeName: "Aba Nigeria",
                  location: "Aba, Nigeria",
                  dedicated: "2005, August, 7",
                  area: 11500,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
                },
                {
                  templeName: "Manti Utah",
                  location: "Manti, Utah, United States",
                  dedicated: "1888, May, 21",
                  area: 74792,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
                },
                {
                  templeName: "Payson Utah",
                  location: "Payson, Utah, United States",
                  dedicated: "2015, June, 7",
                  area: 96630,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
                },
                {
                  templeName: "Yigo Guam",
                  location: "Yigo, Guam",
                  dedicated: "2020, May, 2",
                  area: 6861,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
                },
                {
                  templeName: "Washington D.C.",
                  location: "Kensington, Maryland, United States",
                  dedicated: "1974, November, 19",
                  area: 156558,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
                },
                {
                  templeName: "Lima Perú",
                  location: "Lima, Perú",
                  dedicated: "1986, January, 10",
                  area: 9600,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
                },
                {
                  templeName: "Mexico City Mexico",
                  location: "Mexico City, Mexico",
                  dedicated: "1983, December, 2",
                  area: 116642,
                  imageUrl:
                  "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
                },
                // Add more temple objects here...
                {
                    templeName: "Accra Ghana",
                    location: "Accra, Ghana",
                    dedicated: "2001, November, 16",
                    area: 17500,
                    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/accra-ghana-temple/accra-ghana-temple-13760-main.jpg"
                },
                {
                    templeName: "Barcelona spain",
                    location: "Barcelona, spain",
                    dedicated: "2022, April, 3",
                    area: 27500,
                    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/barcelona-spain-temple/barcelona-spain-temple-43015-main.jpg"
                },
                {
                    templeName: "Brussels Belgium",
                    location: "Brussels, Belgium",
                    dedicated: "2021, April, 4",
                    area: 25500,
                    imageUrl: "https://churchofjesuschristtemples.org/assets/img/temples/brussels-belgium-temple/brussels-belgium-temple-56533-main.jpg"
                }
              ];
    function displayTemples(filteredTemples) {
        gallery.innerHTML = ""; 
        filteredTemples.forEach(temple => {
            const figure = document.createElement("figure");
            figure.innerHTML = `
                <h3>${temple.templeName}</h3>
                <p><strong>Location:</strong> ${temple.location}</p>
                <p><strong>Dedicated:</strong> ${temple.dedicated}</p>
                <p><strong>Size:</strong> ${temple.area.toLocaleString()} sq ft</p>
                <img src="${temple.imageUrl}" alt="${temple.templeName} Temple" loading="lazy">
            `;
            gallery.appendChild(figure);
        });
    }
    displayTemples(temples);

    // Filtering objects
    function filterTemples(category) {
        let filteredObjects;
        switch (category) {
            case "Old":
                filteredObjects = temples.filter(t => parseInt(t.dedicated.split(",")[0]) < 1900);
                break;
            case "New":
                filteredObjects = temples.filter(t => parseInt(t.dedicated.split(",")[0]) > 2000);
                break;
            case "Large":
                filteredObjects = temples.filter(t => t.area > 90000);
                break;
            case "Small":
                filteredObjects = temples.filter(t => t.area < 10000);
                break;
            default:
                filteredObjects = temples;
        }
        displayTemples(filteredObjects);
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            filterTemples(link.textContent);
            nav.classList.remove("show-menu");
            menuToggle.textContent = "☰";
        });
    });
});
