const httpServer = require('http-server');
const path = require('path');

// Define the path to the HTML file
const filePath = path.join(__dirname, 'map.html');

// Create and start the HTTP server
const server = httpServer.createServer({ root: path.dirname(filePath) });
server.listen(8080, async () => {
    console.log('Server running at http://localhost:8080');
    
    // Dynamically import the 'open' module and open the URL in the default browser
    const open = (await import('open')).default;
    open('http://localhost:8080/map.html');
});