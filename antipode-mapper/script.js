document.addEventListener("DOMContentLoaded", () => {
    // Set the map container to fill the entire viewport height
    let map_element = document.getElementById("map");
    map_element.style.height = `${window.innerHeight}px`;

    // Store the user's coordinates and their antipode
    let current_coordinates = [];
    let antipode_coordinates;

    // Get the user's current location
    navigator.geolocation.getCurrentPosition((position) => {
        current_coordinates[0] = position.coords.latitude;
        current_coordinates[1] = position.coords.longitude;

        // Calculate the antipode coordinates
        antipode_coordinates = calculateAntipode(current_coordinates[0], current_coordinates[1]);
        console.log("Latitude: " + current_coordinates[0] + " Longitude: " + current_coordinates[1]);
        console.log("Antipode Latitude: " + antipode_coordinates[0] + " Antipode Longitude: " + antipode_coordinates[1]);

        // Initialize the map, centered at (0,0) by default
        let map = L.map("map").setView([0, 0], 2);

        // Load OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Add a marker for the user's location
        L.marker([current_coordinates[0], current_coordinates[1]]).addTo(map)
            .bindPopup("Your Location: (" + current_coordinates[0] + ', ' + current_coordinates[1] + ')')
            .openPopup();

        // Add a marker for the antipode location
        L.marker(antipode_coordinates).addTo(map)
            .bindPopup("Antipode Location: (" + antipode_coordinates[0] + ', ' + antipode_coordinates[1] + ')')
            .openPopup();

        // Adjust the map view to show both locations
        map.fitBounds([current_coordinates, antipode_coordinates]);

    }, (error) => {
        console.error("An error has occurred: " + error.message);
    });

    // Function to calculate the antipode of a given latitude and longitude
    function calculateAntipode(current_latitude, current_longitude) {
        let antipode_latitude = -current_latitude;
        let antipode_longitude = current_longitude < 0 ? current_longitude + 180 : current_longitude - 180;
        return [antipode_latitude, antipode_longitude];
    }
});
