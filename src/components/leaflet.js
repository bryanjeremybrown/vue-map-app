import { camps } from '../assets/camps'

function setupMap() {
    var map = L.map('map')
        .setView([51.505, -0.09], 3);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    var markersAr = [];
    camps.forEach(camp => {
        const marker = L.marker([camp.y, camp.x])
            // .addTo(map)
            .bindPopup(camp.name);
            // .openPopup();
        markersAr.push(marker);
    })
    var markers = new L.featureGroup(markersAr)
        .addTo(map);

    map.fitBounds(markers.getBounds());
    map.zoomOut(2);
}

export { setupMap }