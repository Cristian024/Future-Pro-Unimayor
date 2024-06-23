import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("../views/HomeView.vue")
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/LoginView.vue')
        },{
            path: '/formUserNew',
            name: 'formUserNew',
            component: () => import('../views/FormUserNew.vue')
        }
    ]
})

export default router;
