// Create the map and set the initial view to center on Japan
var map = L.map('map', { zoomControl: false, zoomAnimation: false }).setView([36.0048, 148.0529], 8); // Centered on Japan with zoom level 8

// Add a custom tile layer with simpler colors
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// Add markers and labels to the map
locations.forEach(function (location) {
    // Label
    var label = L.divIcon({
        className: 'label-div',
        html: location.label,
        iconAnchor: [50, 40] // Adjust the position of the label above and to the right of the marker
    });
    L.marker(location.coords, { icon: label }).addTo(map);
});

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

// Add landmarks without labels
landmarks.forEach(function (landmark) {
    L.marker(landmark.coords, {
        icon: L.divIcon({
            className: 'emoji-div-icon',
            html: landmark.emoji
        })
    }).addTo(map);
});

// Custom button click handler
function customButtonClick() {
    document.getElementById('modal').style.display = 'block';

    // Prefill the form fields with location labels and coordinates
    for (var i = 0; i < locations.length && i < 5; i++) {
        document.getElementById('field' + (i + 1) + '_label').value = locations[i].label;
        document.getElementById('field' + (i + 1) + '_lat').value = locations[i].coords[0];
        document.getElementById('field' + (i + 1) + '_lng').value = locations[i].coords[1];
    }
}

// Close the modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

// Adding the zoom control with empty text to hide the buttons
L.control.zoom({ position: 'topright', zoomInText: '', zoomOutText: '' }).addTo(map);
