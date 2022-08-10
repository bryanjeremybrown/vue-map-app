<script setup>
import { ref } from 'vue'
import { camps as campsAr } from '../assets/camps'
import { useRoute } from 'vue-router'

const route = useRoute()
console.log('id: ', route.params.id)

const routeId = parseInt(route.params.id)
const campObj = campsAr.find(camp => camp.id === routeId)
const camp = ref(campObj)
</script>

<template>
  <h1>{{ camp.name }}</h1>
</template>