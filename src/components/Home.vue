<script setup>
import { ref, watch } from 'vue'
import { camps as campsAr } from '../assets/camps'
import Map from './Map.vue'

const camps = ref(campsAr)
const activeCamp = ref(null)

watch(activeCamp, (newActiveCamp) => {
  // console.log('new active camp:' + newActiveCamp)
})
</script>

<template>
  <div id="sidebar">
    <h2>Camps</h2>
    <ul>
      <li class="camp" v-for="camp in camps"
        :data-is-active="camp.id == activeCamp"
        @click="activeCamp = camp.id">
        {{camp.name}}</li>
    </ul>
  </div>

  <Map :camps="camps" :activeCamp="activeCamp"
       @clickMarker="(id) => {activeCamp = id}" />
</template>

<style scoped>
li.camp {
  padding: 0.5em 0;
}
li.camp[data-is-active="true"] {
  /*font-weight: bold;*/
  background: #73a9d5;
  color: white;
  padding: 0.5em 1em;
}
</style>