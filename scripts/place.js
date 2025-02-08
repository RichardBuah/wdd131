// JavaScript to display the current year in the footer
const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

// JavaScript to display the last modified date of the document
const lastModified = document.lastModified;
document.querySelector('.lastModified').textContent = `Last Modified: ${lastModified}`;

// Function to calculate wind chill
function calculateWindChill(tempC, windSpeedKmh) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windSpeedKmh, 0.16) + 0.3965 * tempC * Math.pow(windSpeedKmh, 0.16);
}

// Static values matching the displayed weather content
const temperature = 28; // °C
const windSpeed = 10;   // km/h

// Display wind chill if conditions are met
const windChillElement = document.createElement('li');

if (temperature <= 10 && windSpeed > 4.8) {
    const windChill = calculateWindChill(temperature, windSpeed).toFixed(1);
    windChillElement.textContent = `Wind Chill: ${windChill} °C`;
} else {
    windChillElement.textContent = 'Wind Chill: N/A';
}

document.querySelector('.weather').appendChild(windChillElement);
