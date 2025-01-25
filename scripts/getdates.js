const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;
document.querySelector('.lastModified').textContent = `Last Modified: ${document.lastModified}`;
