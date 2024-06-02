// Define the locations with latitude, longitude, labels, and nights
var locations = [
    { coords: [35.658034, 139.701636], class: "location-icon", name: 'Tokyo (Shibuya)', hotel: 'Tokyo Rei Hotel', nights: 4, emoji: "🏨" }, // Adjusted
    { coords: [36.561325, 136.656206], class: "location-icon", name: 'Kanazawa', hotel: 'Soki Kanazawa', nights: 2, emoji: "🏨" }, // Adjusted
    { coords: [36.146783, 137.251999], class: "location-icon", name: 'Takayama', hotel: 'Hut in Takayama', nights: 1, emoji: "🏨" }, // Adjusted
    { coords: [35.011564, 135.768149], class: "location-icon", name: 'Kyoto', hotel: 'Hotel Ms Kyoto', nights: 3, emoji: "🏨" }, // Verified
    { coords: [34.693737, 135.502165], class: "location-icon", name: 'Osaka', hotel: 'unknown', nights: 3, emoji: "🏨" }, // Verified
    { coords: [35.191075, 139.028509], class: "location-icon", name: 'Hakone', hotel: 'unknown', nights: 2, emoji: "🏨" }, // Adjusted
    { coords: [35.443707, 139.638031], class: "location-icon", name: 'Yokohama', hotel: 'unknown', nights: 6, emoji: "🏨" } // Updated to Yokohama
];

// Define the landmarks with latitude, longitude, and emojis
var landmarks = [
    { coords: [35.6585805, 139.7454329], class: "landmark-icon", name: "Tokyo Tower", emoji: '🗼' }, // Corrected
    { coords: [36.1572, 137.6006], class: "landmark-icon", name: "Mt Yake", emoji: '🌋' }, // Corrected
    { coords: [35.360555, 138.727778], class: "landmark-icon", name: "Mt Fuji", emoji: '🗻' }, // Verified
    { coords: [35.549393, 139.779839], class: "landmark-icon", name: "Haneda Airport", emoji: '✈️' } // Adjusted    
];

// Define the invisible stops
var invisibleStops = [
    //
];

// Function to generate popup content for a location
function generatePopupContent(location) {
    return `<b>${location.name}</b><br>${location.nights} nights at ${location.hotel}`;
}