const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
const lastModified = document.lastModified;
document.querySelector('.lastModified').textContent = `Last Modified: ${lastModified}`;

// wind chill
function calculateWindChill(tempC, windSpeedKm) {
    return 13.12 + 0.6215 * tempC - 11.37 * Math.pow(windSpeedKm, 0.16) + 0.3965 * tempC * Math.pow(windSpeedKm, 0.16);
}
const temperature = 28; // °C
const windSpeed = 10;   // km/h
const windChillElement = document.getElementById('windchill');
if (temperature <= 10 && windSpeed > 4.8) {
    const windChillFactor = calculateWindChill(temperature, windSpeed).toFixed(1);
    windChillElement.textContent = `Wind Chill: ${windChillFactor} °C`;
} else {
    windChillElement.textContent = 'Wind Chill: N/A';
} 
