// Define the locations with latitude, longitude, labels, and nights
var locations = [
    { coords: [35.6602231, 139.7019877], name: 'Tokyo', hotel: 'Tokyo Rei Hotel', nights: 5, emoji: "📍" },
    { coords: [36.5748, 139.8836], name: 'Nikko', hotel: 'unknown', nights: 2, emoji: "📍" },
    { coords: [36.1468, 137.2529], name: 'Takayama', hotel: 'unknown', nights: 2, emoji: "📍" },
    { coords: [35.0116, 135.7681], name: 'Kyoto', hotel: 'unknown', nights: 4, emoji: "📍" },
    { coords: [34.6937, 135.5023], name: 'Osaka', hotel: 'unknown', nights: 4, emoji: "📍" },
    { coords: [35.6895, 139.6917], name: 'Tokyo', hotel: 'unknown', nights: 5, emoji: "📍" }
];

// Define the landmarks with latitude, longitude, and emojis
var landmarks = [
    { coords: [35.3606, 138.7274], name: "Mt Fuji", emoji: '🗻' }, // Mt. Fuji (Hakone)
    { coords: [36.7908146, 139.6973346], name: "Edo Wonderland Nikko Edomura", emoji: '🏯' },  
    { coords: [36.6760561, 137.915335], name: "Ashidaki Station", emoji: '🚇' },
    { coords: [35.7130602, 139.5602498], name: "Meidaimae Station", emoji: '🚅' },
];

// Define the invisible stops
var invisibleStops = [
    { coords: [35.8586447, 139.9301584], emoji: "" }, // Example invisible stop between Tokyo and Nikko
    { coords: [35.8586447, 139.9301584], emoji: "" } // Example invisible stop between Tokyo and Nikko
];

// Function to generate popup content for a location
function generatePopupContent(location) {
    return `<b>${location.name}</b><br>${location.nights} nights at ${location.hotel}`;
}