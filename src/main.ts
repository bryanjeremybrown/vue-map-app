import { createApp } from "vue";
import App from "./App.vue";
// import router from "./router";
import { createRouter, createWebHistory } from 'vue-router'

import Camps from './components/Camps.vue'
import Home from './components/Home.vue'

import "./assets/main.css";

const routes = [
    {path: '/', component: Home},
    {path: '/camps/:id', component: Camps},
]
const router = createRouter({
    history: createWebHistory(),
    routes: routes,
})

const app = createApp(App);

app.use(router);

app.mount("#app");
