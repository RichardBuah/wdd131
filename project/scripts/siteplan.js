document.addEventListener("DOMContentLoaded", () => {
    initializeRestaurants();
    getUserLocation();
    setupAutocomplete();

    setTimeout(() => {
        displayRestaurants(getRestaurants());
        if (window.location.pathname.includes("favs.html")) {
            loadFavorites(); 
        }
    }, 500);
});

const defaultRestaurants = [
    { name: "McDonald's", category: "fast food", hours: "6 AM - 12 AM", lat: 40.73061, lng: -73.935242, rating: 4.5 },
    { name: "Subway", category: "fast food", hours: "8 AM - 10 PM", lat: 40.741895, lng: -73.989308, rating: 4.2 },
    { name: "Starbucks", category: "fast food", hours: "5 AM - 10 PM", lat: 40.752998, lng: -73.977056, rating: 4.7 },
    { name: "KFC", category: "fast food", hours: "10 AM - 11 PM", lat: 40.758896, lng: -73.985130, rating: 4.3 },
    { name: "Burger King", category: "fast food", hours: "6 AM - 1 AM", lat: 40.761581, lng: -73.982736, rating: 4.0 },
    { name: "Pizza Hut", category: "italian", hours: "11 AM - 11 PM", lat: 40.712776, lng: -74.005974, rating: 4.1 },
    { name: "Domino's", category: "italian", hours: "10 AM - 12 AM", lat: 40.706192, lng: -74.008874, rating: 4.3 },
    { name: "Olive Garden", category: "italian", hours: "11 AM - 10 PM", lat: 40.759011, lng: -73.984472, rating: 4.4 },
    { name: "Panda Express", category: "asian", hours: "10:30 AM - 9:30 PM", lat: 40.748817, lng: -73.985428, rating: 4.2 },
    { name: "Chick-fil-A", category: "fast food", hours: "6:30 AM - 10 PM", lat: 40.7433, lng: -74.0324, rating: 4.8 },
    { name: "Shake Shack", category: "fast food", hours: "11 AM - 11 PM", lat: 40.741233, lng: -74.000876, rating: 4.7 },
    { name: "Taco Bell", category: "fast food", hours: "7 AM - 2 AM", lat: 40.678178, lng: -73.944158, rating: 4.0 },
    { name: "Chipotle", category: "fast food", hours: "10:45 AM - 10 PM", lat: 40.73061, lng: -73.935242, rating: 4.6 },
    { name: "Five Guys", category: "fast food", hours: "11 AM - 10 PM", lat: 40.712728, lng: -74.006015, rating: 4.5 },
    { name: "IHOP", category: "american", hours: "24 hours", lat: 40.715297, lng: -74.009396, rating: 4.2 },
    { name: "Denny's", category: "american", hours: "24 hours", lat: 40.706001, lng: -74.008701, rating: 4.1 },
    { name: "Benihana", category: "asian", hours: "12 PM - 10 PM", lat: 40.776927, lng: -73.981667, rating: 4.6 },
    { name: "Buffalo Wild Wings", category: "american", hours: "11 AM - 1 AM", lat: 40.742054, lng: -74.005973, rating: 4.3 },
    { name: "The Cheesecake Factory", category: "american", hours: "11 AM - 11 PM", lat: 40.758896, lng: -73.985130, rating: 4.5 },
    { name: "In-N-Out Burger", category: "fast food", hours: "10:30 AM - 1 AM", lat: 37.774929, lng: -122.419416, rating: 4.8 },
    { name: "Tim Hortons", category: "cafe", hours: "5 AM - 11 PM", lat: 43.65107, lng: -79.347015, rating: 4.2 },
    { name: "Dunkin'", category: "cafe", hours: "5 AM - 10 PM", lat: 40.712776, lng: -74.005974, rating: 4.1 },
    { name: "Peet's Coffee", category: "cafe", hours: "6 AM - 6 PM", lat: 37.774929, lng: -122.419416, rating: 4.3 },
    { name: "Joe's Coffee", category: "cafe", hours: "7 AM - 7 PM", lat: 40.7366, lng: -73.9885, rating: 4.5 },
    { name: "Eataly", category: "italian", hours: "10 AM - 10 PM", lat: 40.741895, lng: -73.989308, rating: 4.7 },
    { name: "Morton's Steakhouse", category: "american", hours: "11 AM - 11 PM", lat: 40.759011, lng: -73.984472, rating: 4.6 },
    { name: "Outback Steakhouse", category: "american", hours: "11 AM - 10 PM", lat: 40.758896, lng: -73.985130, rating: 4.4 },
    { name: "LongHorn Steakhouse", category: "american", hours: "11 AM - 10 PM", lat: 40.73061, lng: -73.935242, rating: 4.5 },
    { name: "P.F. Chang's", category: "asian", hours: "11 AM - 10 PM", lat: 40.759011, lng: -73.984472, rating: 4.3 },
    { name: "Nobu", category: "asian", hours: "5 PM - 11 PM", lat: 40.720852, lng: -74.004902, rating: 4.8 }
];

function initializeRestaurants() {
    let storedRestaurants = JSON.parse(localStorage.getItem("restaurants"));
    if (!storedRestaurants || storedRestaurants.length === 0) {
        localStorage.setItem("restaurants", JSON.stringify(defaultRestaurants));
    }
}

function getRestaurants() {
    let restaurants = JSON.parse(localStorage.getItem("restaurants"));
    return restaurants ? restaurants : [];
}

function displayRestaurants(filteredList) {
    const list = document.getElementById("restaurant-list");
    if (!list) return;

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
                         <p>Address: ${restaurant.address ? restaurant.address : 'Not Available'}</p>
                         <p class="rating">⭐ ${restaurant.rating}</p>
                         <button onclick="toggleFavorite('${restaurant.name}')">${isFavorite(restaurant.name) ? "❤️ Unfavorite" : "🤍 Favorite"}</button>`;
        list.appendChild(div);
    });
}

function saveRestaurants(restaurants) {
    localStorage.setItem("restaurants", JSON.stringify(restaurants));
}

function isFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(name);
}

function setupAutocomplete() {
    const addressInput = document.getElementById("restaurantAddress");
    if (!addressInput) return;

    const suggestionList = document.getElementById("addressSuggestions");

    addressInput.addEventListener("input", function () {
        if (addressInput.value.length < 3) {
            suggestionList.innerHTML = "";
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${addressInput.value}`)
            .then(response => response.json())
            .then(data => {
                suggestionList.innerHTML = "";
                if (data.length > 0) {
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

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("User's Location:", position.coords.latitude, position.coords.longitude);
            },
            (error) => {
                console.warn("Error getting location:", error);
            }
        );
    } else {
        console.warn("Geolocation is not supported by this browser.");
    }
}

function filterRestaurants() {
    let searchQuery = document.getElementById("searchBar").value.toLowerCase().trim();
    let category = document.getElementById("categoryFilter").value;
    let restaurants = getRestaurants();

    if (!restaurants || restaurants.length === 0) {
        console.error("No restaurant data found.");
        return;
    }

    let filteredList = restaurants.filter(restaurant => {
        let matchesCategory = category === "all" || restaurant.category.toLowerCase() === category.toLowerCase();
        let matchesSearch = restaurant.name.toLowerCase().includes(searchQuery) ||
                            (restaurant.category && restaurant.category.toLowerCase().includes(searchQuery)) ||
                            (restaurant.address && restaurant.address.toLowerCase().includes(searchQuery));

        return matchesCategory && matchesSearch;
    });

    displayRestaurants(filteredList);
}

async function fetchAddress(lat, lon) {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        return data.display_name || "Address not found";
    } catch (error) {
        console.error("Error fetching address:", error);
        return "Address unavailable";
    }
}

function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    if (nav) {
        nav.classList.toggle("active");
    } else {
        console.error("Navigation menu not found.");
    }
}

function toggleFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (favorites.includes(name)) {
        favorites = favorites.filter(fav => fav !== name);
    } else {
        favorites.push(name);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    displayRestaurants(getRestaurants());
}

function loadFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let allRestaurants = getRestaurants();
    let favoriteRestaurants = allRestaurants.filter(restaurant => favorites.includes(restaurant.name));

    const favoritesList = document.getElementById("favorites-list");
    if (!favoritesList) return;

    favoritesList.innerHTML = ""; 

    if (favoriteRestaurants.length === 0) {
        favoritesList.innerHTML = "<p style='text-align: center;'>No favorite restaurants yet.</p>";
        return;
    }
    favoriteRestaurants.forEach(restaurant => {
        const div = document.createElement("div");
        div.classList.add("restaurant-card");
        div.innerHTML = `<h2>${restaurant.name}</h2>
                         <p>Category: ${restaurant.category}</p>
                         <p>Hours: ${restaurant.hours}</p>
                         <p>Address: ${restaurant.address ? restaurant.address : 'Not Available'}</p>
                         <p class="rating">⭐ ${restaurant.rating}</p>
                         <button onclick="toggleFavorite('${restaurant.name}')">❤️ Remove</button>`;
        favoritesList.appendChild(div);
    });
}

