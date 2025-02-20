const products = [
    { id: "fc-1888", name: "flux capacitor", averagerating: 4.5 },
    { id: "fc-2050", name: "power laces", averagerating: 4.7 },
    { id: "fs-1987", name: "time circuits", averagerating: 3.5 },
    { id: "ac-2000", name: "low voltage reactor", averagerating: 3.9 },
    { id: "jj-1969", name: "warp equalizer", averagerating: 5.0 }
];

// Populate product dropdown
const productSelect = document.getElementById("product");
products.forEach(product => {
    let option = document.createElement("option");
    option.value = product.id;
    option.textContent = product.name;
    productSelect.appendChild(option);
});

// Handle form submission count
document.getElementById("reviewForm").addEventListener("submit", function() {
    let count = localStorage.getItem("reviewCount") || 0;
    localStorage.setItem("reviewCount", parseInt(count) + 1);
});
