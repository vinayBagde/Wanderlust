var map = L.map("map").setView([28.6139, 77.209], 13);

// 2. Add OpenStreetMap tile layer
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);


// 3. Add a marker
L.marker([28.6139, 77.209])
  .addTo(map)
  .bindPopup("You're here in Delhi!")
  .openPopup();
