import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home/Home.vue"),
  },
  {
    path: "/one",
    nama: "One",
    component: () => import("@/views/One/One.vue"),
  },
  {
    path: "/two",
    name: "Two",
    component: () => import("@/views/Two/Two.vue"),
  },
  {
    path: "/three",
    name: "Three",
    component: () => import("@/views/Three/Three.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
