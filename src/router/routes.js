export const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import("../views/HomeView.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/formStudentNew',
        name: 'FormStudentNew',
        component: () => import('../views/FormStudentNewView.vue'),
        meta: { requireAuto: true, type: 'student' }
    }
]