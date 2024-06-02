// Create the map and set the initial view to center on Japan
var map = L.map('map', {
    zoomAnimation: false,
    dragging: true, // Allow dragging
    scrollWheelZoom: true, // Disable scroll wheel zoom
    doubleClickZoom: true, // Disable double-click zoom
    keyboard: false, // Disable keyboard navigation
    tap: true // Disable tap navigation
}).setView([36.2048, 138.2529], 2); // Adjust the coordinates to better center the map

// Define the bounds to restrict the map view
var bounds = L.latLngBounds([
    [20, 120], // Southwest corner (approximate)
    [45, 150]  // Northeast corner (approximate)
]);

// Snap back to the initial position when panning ends without affecting the zoom level
map.on('dragend', function () {
    var currentZoom = map.getZoom();
    map.setView([36.2048, 138.2529], currentZoom, { animate: true }); // Keep the current zoom level
});

// Add a custom tile layer with simpler colors
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO'
}).addTo(map);

// Add markers, labels, and popups to the map
// Add markers, labels, and popups to the map
function addMarkersAndLabels() {
    locations.forEach(function (location) {
        var marker = L.marker(location.coords, {
            icon: L.divIcon({
                className: location.class,
                html: location.emoji
            })
        }).addTo(map);
        var popupContent = generatePopupContent(location);
        marker.bindPopup(popupContent);
    });

    landmarks.forEach(function (landmark) {
        L.marker(landmark.coords, {
            icon: L.divIcon({
                className: landmark.class,
                html: landmark.emoji
            })
        }).addTo(map);
    });

    invisibleStops.forEach(function (stop) {
        L.marker(stop.coords, {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: stop.emoji
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
        var loc = locations.find(loc => loc.coords[0] === waypoint.latLng.lat && loc.coords[1] === waypoint.latLng.lng);
        return L.marker(waypoint.latLng, {
            icon: L.divIcon({
                className: 'custom-div-icon',
                html: loc ? loc.emoji : "📍"
            })
        });
    },
    lineOptions: {
        styles: [{ color: 'red', weight: 3, dashArray: '10, 10' }]
    },
    show: false
}).addTo(map);

L.control.zoom({ position: 'topright', zoomInText: '', zoomOutText: '' }).addTo(map);

// Create the text display element
var textDisplay = document.createElement('div');
textDisplay.id = 'text-display';
document.body.appendChild(textDisplay);

// Function to update text display position and content
function updateTextDisplay(e) {
    var latlng = e.latlng;
    var closestPoint = null;
    var closestDistance = Infinity;

    // Combine locations and landmarks for proximity check
    var points = locations.concat(landmarks);

    points.forEach(function (point) {
        var distance = latlng.distanceTo(L.latLng(point.coords));
        if (distance < closestDistance) {
            closestDistance = distance;
            closestPoint = point;
        }
    });

    if (closestPoint && closestDistance < 10000) { // Show only if close enough
        textDisplay.style.left = (e.originalEvent.pageX + 10) + 'px';
        textDisplay.style.top = (e.originalEvent.pageY + 10) + 'px';
        textDisplay.innerHTML = `<b>${closestPoint.name}</b><br>${closestPoint.nights ? closestPoint.nights + ' nights at ' + closestPoint.hotel : ''}`;
        textDisplay.style.display = 'block';
    } else {
        textDisplay.style.display = 'none';
    }
}

map.on('mousemove', updateTextDisplay);
