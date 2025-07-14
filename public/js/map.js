let coordinates = listing.geometry.coordinates;
const map = L.map("map").setView([coordinates[1], coordinates[0]], 13);
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const redIcon = L.icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [25, 41], // standard Leaflet icon size
  iconAnchor: [12, 41], // point of the icon which corresponds to marker location
  popupAnchor: [1, -34], // where popups open relative to the iconAnchor
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41], // same size as the icon
  shadowAnchor: [12, 41], // aligns shadow with icon
});


const marker = L.marker([coordinates[1], coordinates[0]], { icon: redIcon }).addTo(map);

marker.bindPopup(`<h4>${listing.title}</h4><p>Exact location will be provided after booking</p>`).openPopup();


