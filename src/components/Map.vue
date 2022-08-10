<script setup>
import { onMounted, watch } from 'vue'
// import { setupMap } from './leaflet'

const props = defineProps({
  camps: Array,
  activeCamp: Number,
})

var blueMarkerIcon  = L.icon({iconUrl: 'src/assets/icons/blue.png'});
var redMarkerIcon   = L.icon({iconUrl: 'src/assets/icons/red.png'});
var greenMarkerIcon = L.icon({iconUrl: 'src/assets/icons/green.png'});

const emit = defineEmits(['clickMarker'])

let markersAr = [];

function setupMap() {
  var map = L.map('map')
      .setView([51.505, -0.09], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  props.camps.forEach(camp => {
    const marker = L.marker([camp.y, camp.x])
        .bindPopup(camp.name);
    marker.setIcon(blueMarkerIcon)
    marker.campId = camp.id
    marker.on('click', () => {
      emit('clickMarker', camp.id)
    })
    markersAr.push(marker);
  })
  var markers = new L.featureGroup(markersAr)
      .addTo(map);

  map.fitBounds(markers.getBounds());
  map.zoomOut(2);
}

watch(() => props.activeCamp, () => {
  markersAr.forEach(marker => marker.setIcon(blueMarkerIcon))

  const activeMarker = markersAr.find(marker => marker.campId === props.activeCamp)
  activeMarker.openPopup()
  activeMarker.setIcon(redMarkerIcon)
})

onMounted(setupMap)
</script>

<template>
  <div id="map"></div>
</template>

<style scoped></style>