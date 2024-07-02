export const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/LoginView.vue')
    }, {
        path: '/formStudentNew',
        name: 'formStudentNew',
        component: () => import('../views/FormStudentNewView.vue'),
        meta: {requireAuto: true, type: 'student'}
    }
]