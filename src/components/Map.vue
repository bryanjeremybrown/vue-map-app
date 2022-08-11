<script setup lang="ts">
// ES module imports
import { onMounted, watch } from 'vue'

// TypeScript imports
import type { PropType } from 'vue'
import type { Camp } from '../assets/camps'

// import { setupMap } from './leaflet'
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const props = defineProps({
  camps: Array as PropType<Camp[]>,
  activeCamp: Number as PropType<number | null>,
})

let blueMarkerIcon  = L.icon({iconUrl: 'src/assets/icons/blue.png'});
let redMarkerIcon   = L.icon({iconUrl: 'src/assets/icons/red.png'});
let greenMarkerIcon = L.icon({iconUrl: 'src/assets/icons/green.png'});

const emit = defineEmits(['clickMarker'])

let markersAr: L.Marker[] = [];

function setupMap() {
  let map = L.map('map')
      .setView([51.505, -0.09], 3);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  if (typeof props.camps !== 'undefined') {
    props.camps.forEach((camp: Camp) => {
      const marker: any = L.marker([camp.y, camp.x])
      marker.bindPopup(camp.name)
      marker.setIcon(blueMarkerIcon)
      marker.campId = camp.id
      marker.on('click', () => {
        emit('clickMarker', camp.id)
      })
      markersAr.push(marker);
    })
  }
  var markers: L.FeatureGroup = new (L.featureGroup as any)(markersAr)
      .addTo(map);

  map.fitBounds(markers.getBounds());
  map.zoomOut(2);
}

watch(() => props.activeCamp, () => {
  markersAr.forEach(marker => marker.setIcon(blueMarkerIcon))

  const activeMarker = markersAr.find((marker: any) => marker.campId === props.activeCamp)
  if (typeof activeMarker === 'undefined') {
    return
  }
  activeMarker.openPopup()
  activeMarker.setIcon(redMarkerIcon)
})

onMounted(setupMap)
</script>

<template>
  <div id="map"></div>
</template>

<style scoped></style>