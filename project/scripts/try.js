document.addEventListener("DOMContentLoaded", () => {
    ensureLocalStorageInitialized();
    getUserLocation();
    setupAutocomplete();
    setTimeout(() => {
        displayRestaurants(getRestaurants());
    }, 500);
});

const defaultRestaurants = [
    { name: "McDonald's", category: "fast food", hours: "6 AM - 12 AM", address: "New York, NY", rating: 4.5 },
    { name: "Subway", category: "fast food", hours: "8 AM - 10 PM", address: "Los Angeles, CA", rating: 4.2 },
    { name: "Starbucks", category: "cafe", hours: "5 AM - 10 PM", address: "San Francisco, CA", rating: 4.7 },
    { name: "KFC", category: "fast food", hours: "10 AM - 11 PM", address: "Chicago, IL", rating: 4.3 },
    { name: "Burger King", category: "fast food", hours: "6 AM - 1 AM", address: "Houston, TX", rating: 4.0 }
];

function ensureLocalStorageInitialized() {
    let storedRestaurants = localStorage.getItem("restaurants");
    if (!storedRestaurants) {
        console.warn("Local storage empty. Initializing default restaurants.");
        localStorage.setItem("restaurants", JSON.stringify(defaultRestaurants));
    } else {
        try {
            let parsedRestaurants = JSON.parse(storedRestaurants);
            if (!Array.isArray(parsedRestaurants) || parsedRestaurants.length === 0) {
                throw new Error("Invalid or empty data");
            }
        } catch (error) {
            console.error("Corrupt local storage detected. Resetting.", error);
            localStorage.setItem("restaurants", JSON.stringify(defaultRestaurants));
        }
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
                         <p>Address: ${restaurant.address}</p>
                         <p class="rating">⭐ ${restaurant.rating}</p>
                         <button onclick="toggleFavorite('${restaurant.name}')">${isFavorite(restaurant.name) ? "❤️ Unfavorite" : "🤍 Favorite"}</button>`;
        list.appendChild(div);
    });
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

function isFavorite(name) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(name);
}
