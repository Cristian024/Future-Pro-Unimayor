import { validateSession, validateSessionCookie } from '@/lib/session';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
})

router.beforeEach(async (to, from, next) =>{
    if(to.matched.some(route => route.meta.requireAuto)){
        const hasCookie = validateSessionCookie();
        if(hasCookie){
            const type = to.meta.type
            const session = await validateSession(type);

            if(session.valid){
                next();
            }else{
                next('../')
            }
        }else{
            next('../')
        }
    }else{
        next()
    }
})


export default router;
