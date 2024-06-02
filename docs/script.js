// Create the map and set the initial view to center on Japan
var map = L.map('map', { zoomControl: false, zoomAnimation: false }).setView([36.0048, 148.0529], 8); // Centered on Japan with zoom level 8

// Add a custom tile layer with simpler colors
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO'
}).addTo(map);

// Add markers, labels, and tooltips to the map
function addMarkersAndLabels() {
    locations.forEach(function (location) {
        var label = L.divIcon({
            className: 'label-div',
            html: location.label,
            iconAnchor: [50, 40] // Adjust the position of the label above and to the right of the marker
        });
        var marker = L.marker(location.coords, { icon: label }).addTo(map);
        marker.bindTooltip(`${location.label} - ${location.nights} days`, {
            permanent: false,
            direction: 'top',
            className: 'custom-tooltip' // Add a custom class for further customization
        });
    });

    // Add landmarks without labels but with tooltips
    landmarks.forEach(function (landmark) {
        var marker = L.marker(landmark.coords, {
            icon: L.divIcon({
                className: 'emoji-div-icon',
                html: landmark.emoji
            })
        }).addTo(map);
        marker.bindTooltip(`${landmark.nights} days`, {
            permanent: false,
            direction: 'top',
            className: 'custom-tooltip' // Add a custom class for further customization
        });
    });
}

addMarkersAndLabels();

// Combine locations and invisible stops for routing
var waypoints = locations.map(loc => loc.coords).slice(0, 1)
    .concat(invisibleStops.map(stop => stop.coords))
    .concat(locations.map(loc => loc.coords).slice(1));

// Add routing control
L.Routing.control({
    waypoints: waypoints.map(loc => L.latLng(loc)),
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    createMarker: function (i, waypoint) {
        if (invisibleStops.some(stop => stop.coords[0] === waypoint.latLng.lat && stop.coords[1] === waypoint.latLng.lng)) {
            return null; // Do not create marker for invisible stops
        }
        return L.marker(waypoint.latLng, {
            icon: L.divIcon({
                className: 'custom-div-icon'
            })
        });
    },
    lineOptions: {
        styles: [{ color: '#FF69B4', weight: 4, dashArray: '10, 10' }] // Dashed line
    },
    show: false // Hide the navigation panel
}).addTo(map);

// Adding the zoom control with empty text to hide the buttons
L.control.zoom({ position: 'topright', zoomInText: '', zoomOutText: '' }).addTo(map);

// Countdown Timer
function updateCountdown() {
    var targetDate = new Date('2024-10-18T00:00:00'); // Set your target date here
    var now = new Date();
    var timeDifference = targetDate - now;

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    var hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById('countdown').innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

    if (timeDifference < 0) {
        document.getElementById('countdown').innerHTML = "EXPIRED";
    }
}

// Update the countdown every second
setInterval(updateCountdown, 1000);
