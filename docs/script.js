// Create the map and set the initial view to center on Japan
var map = L.map('map', { 
    zoomControl: false, 
    zoomAnimation: false,
    dragging: false, // Disable dragging
    scrollWheelZoom: false, // Disable scroll wheel zoom
    doubleClickZoom: false, // Disable double-click zoom
    boxZoom: false, // Disable box zoom
    keyboard: false, // Disable keyboard navigation
    tap: false // Disable tap navigation
}).setView([36.0048, 148.0529], 8);

// Define the bounds to restrict the map view
var bounds = L.latLngBounds([
    [20, 120], // Southwest corner (approximate)
    [45, 150]  // Northeast corner (approximate)
]);

// Apply the bounds to the map
map.setMaxBounds(bounds);
map.on('drag', function() {
    map.panInsideBounds(bounds, { animate: false });
});

// Add a custom tile layer with simpler colors
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO'
}).addTo(map);

// Add markers, labels, and popups to the map
function addMarkersAndLabels() {
    locations.forEach(function (location) {
        var label = L.divIcon({
            className: 'label-div',
            html: location.label,
            iconAnchor: [50, 40]
        });
        var marker = L.marker(location.coords, { icon: label }).addTo(map);
        marker.bindPopup(`<b>${location.label}</b><br>${location.nights} days`);
    });

    landmarks.forEach(function (landmark) {
        L.marker(landmark.coords, {
            icon: L.divIcon({
                className: 'emoji-div-icon',
                html: landmark.emoji
            })
        }).addTo(map);
    });
}

addMarkersAndLabels();

var waypoints = locations.map(loc => loc.coords).slice(0, 1)
    .concat(invisibleStops.map(stop => stop.coords))
    .concat(locations.map(loc => loc.coords).slice(1));

L.Routing.control({
    waypoints: waypoints.map(loc => L.latLng(loc)),
    routeWhileDragging: false,
    addWaypoints: false,
    draggableWaypoints: false,
    createMarker: function (i, waypoint) {
        if (invisibleStops.some(stop => stop.coords[0] === waypoint.latLng.lat && stop.coords[1] === waypoint.latLng.lng)) {
            return null;
        }
        return L.marker(waypoint.latLng, {
            icon: L.divIcon({
                className: 'custom-div-icon'
            })
        });
    },
    lineOptions: {
        styles: [{ color: '#FF69B4', weight: 4, dashArray: '10, 10' }]
    },
    show: false
}).addTo(map);

L.control.zoom({ position: 'topright', zoomInText: '', zoomOutText: '' }).addTo(map);

function updateCountdown() {
    var targetDate = new Date('2024-10-18T00:00:00');
    var now = new Date();
    var timeDifference = targetDate - now;

    if (timeDifference < 0) {
        document.getElementById('countdown').innerHTML = "EXPIRED";
        return;
    }

    var months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    timeDifference -= months * (1000 * 60 * 60 * 24 * 30);

    var days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    timeDifference -= days * (1000 * 60 * 60 * 24);

    var hours = Math.floor(timeDifference / (1000 * 60 * 60));

    document.getElementById('countdown').innerHTML = "Still " + months + " months, " + days + " days and " + hours + " hours to go!";
}

// Update the countdown every hour
setInterval(updateCountdown, 3600000);
updateCountdown(); // Initial call to set the timer immediately
