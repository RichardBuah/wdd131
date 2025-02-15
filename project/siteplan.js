document.addEventListener("DOMContentLoaded", () => {
    initializeRestaurants();
    getUserLocation();
});

function initializeRestaurants() {
    if (!localStorage.getItem("restaurants")) {
        localStorage.setItem("restaurants", JSON.stringify([]));
    }
    displayRestaurants(getRestaurants());
}

function getRestaurants() {
    return JSON.parse(localStorage.getItem("restaurants")) || [];
}

function saveRestaurants(restaurants) {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

function handleAddRestaurant() {
    const name = document.getElementById("restaurantName").value;
    const category = document.getElementById("restaurantCategory").value;
    const hours = document.getElementById("restaurantHours").value;
    const postalCode = document.getElementById("postalCode").value;
    
    if (!name || !category || !hours || !postalCode) {
        alert("Please fill in all fields.");
        return;
    }
    
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${postalCode}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lng = data[0].lon;
                const newRestaurant = { name, category, hours, lat, lng, rating: 0 };
                let restaurants = getRestaurants();
                restaurants.push(newRestaurant);
                saveRestaurants(restaurants);
                displayRestaurants(restaurants);
                alert("Restaurant added successfully!");
            } else {
                alert("Invalid postal code, could not retrieve location.");
            }
        })
        .catch(error => console.error("Error fetching location: ", error));
}

function filterRestaurants() {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;
    let restaurants = getRestaurants().filter(restaurant => {
        let matchesCategory = category === "all" || restaurant.category.toLowerCase() === category.toLowerCase();
        let matchesSearch = restaurant.name.toLowerCase().includes(searchQuery) ||
                            restaurant.category.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    displayRestaurants(restaurants);
}

function displayRestaurants(filteredList) {
    const list = document.getElementById("restaurant-list");
    list.innerHTML = "";
    if (filteredList.length === 0) {
        list.innerHTML = "<p style='text-align: center;'>No restaurants found.</p>";
        return;
    }
    filteredList.forEach(restaurant => {
        const div = document.createElement("div");
        div.classList.add("restaurant-card");
        div.innerHTML = `<h2>${restaurant.name}</h2>
                         <p>Category: ${restaurant.category}</p>
                         <p>Hours: ${restaurant.hours}</p>
                         <p>Distance: ${restaurant.distance || "Calculating..."} km</p>
                         <p class="rating">⭐ ${restaurant.rating}</p>
                         <button onclick="toggleFavorite('${restaurant.name}')">${isFavorite(restaurant.name) ? "❤️ Unfavorite" : "🤍 Favorite"}</button>`;
        list.appendChild(div);
    });
}

function toggleFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(name)) {
        favorites = favorites.filter(fav => fav !== name);
    } else {
        favorites.push(name);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Updated favorites list!");
}
