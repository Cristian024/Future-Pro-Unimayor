import { validateSessionCookie } from '@/lib/session';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach(async (to, from, next) => {
    if (to.matched.some(route => route.meta.requireAuto)) {
        const hasCookie = validateSessionCookie();
        if (hasCookie) {
            const type = to.meta.type;
            const session = await store.dispatch('validateSession', type);

            if (session.valid) {
                next();
            } else {
                next('/');
            }
        } else {
            next('/');
        }
    } else {
        next();
    }
});


export default router;
