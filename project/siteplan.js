document.addEventListener("DOMContentLoaded", () => {
    initializeRestaurants();
    getUserLocation();
    setupAutocomplete();
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

function setupAutocomplete() {
    const addressInput = document.getElementById("restaurantAddress");
    addressInput.addEventListener("input", function () {
        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${addressInput.value}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    let suggestionList = document.getElementById("addressSuggestions");
                    suggestionList.innerHTML = "";
                    data.slice(0, 5).forEach(location => {
                        let option = document.createElement("div");
                        option.classList.add("suggestion");
                        option.innerText = location.display_name;
                        option.onclick = function () {
                            addressInput.value = location.display_name;
                            addressInput.dataset.lat = location.lat;
                            addressInput.dataset.lon = location.lon;
                            suggestionList.innerHTML = "";
                        };
                        suggestionList.appendChild(option);
                    });
                }
            })
            .catch(error => console.error("Error fetching location: ", error));
    });
}

function handleAddRestaurant() {
    const name = document.getElementById("restaurantName").value;
    const category = document.getElementById("restaurantCategory").value;
    const hours = document.getElementById("restaurantHours").value;
    const addressInput = document.getElementById("restaurantAddress");
    const address = addressInput.value;
    const lat = addressInput.dataset.lat;
    const lon = addressInput.dataset.lon;
    
    if (!name || !category || !hours || !address || !lat || !lon) {
        alert("Please fill in all fields and select a valid address.");
        return;
    }
    
    const newRestaurant = { name, category, hours, address, lat, lon, rating: 0 };
    let restaurants = getRestaurants();
    restaurants.push(newRestaurant);
    saveRestaurants(restaurants);
    displayRestaurants(restaurants);
    alert("Restaurant added successfully!");
}

function filterRestaurants() {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase();
    let category = document.getElementById("categoryFilter").value;
    let restaurants = getRestaurants().filter(restaurant => {
        let matchesCategory = category === "all" || restaurant.category.toLowerCase() === category.toLowerCase();
        let matchesSearch = restaurant.name.toLowerCase().includes(searchQuery) ||
                            restaurant.category.toLowerCase().includes(searchQuery) ||
                            restaurant.address.toLowerCase().includes(searchQuery);
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
                         <p>Address: ${restaurant.address}</p>
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
