function init() {
    // Create a map and set its view to a given geographical coordinates and zoom level
    var map = L.map('map').setView([40.69847032728747, -73.9514422416687], 7);

    // Add a tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }).addTo(map);

    var addresses = ['Brooklyn'];
    var geocodeUrl = 'https://nominatim.openstreetmap.org/search?format=json&q=';

    addresses.forEach(function (address) {
        fetch(geocodeUrl + encodeURIComponent(address))
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    var p = data[0];
                    var latlng = [p.lat, p.lon];
                    L.marker(latlng, { icon: L.icon({ iconUrl: 'images/loc.png' }) }).addTo(map);
                } else {
                    console.error('No results found for address:', address);
                }
            })
            .catch(error => console.error('Geocoding error:', error));
    });
}

window.addEventListener('load', init);
