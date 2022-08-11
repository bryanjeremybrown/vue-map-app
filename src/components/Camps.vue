<script setup lang="ts">
import { ref } from 'vue'
import { camps as campsAr } from '../assets/camps'
import { useRoute } from 'vue-router'

import type { Camp } from '../assets/camps'

const route = useRoute()
// console.log('id: ', route.params.id)

const routeId: number = parseInt(route.params.id as string)
const campObj: Camp | undefined = campsAr.find(camp => camp.id === routeId)
const camp = ref<Camp | undefined>(campObj)
</script>

<template>
  <h1 v-if="camp">{{ camp.name }}</h1>
</template>