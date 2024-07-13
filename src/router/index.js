import { validateSessionCookie } from '@/lib/session';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
import store from '@/store';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes
})

router.beforeEach(async (to, from, next) => {
    store.dispatch('setName', to.name);
    if (to.matched.some(route => route.meta.requireAuto)) {
        const hasCookie = validateSessionCookie();
        if (hasCookie) {
            const type = to.meta.type;
            const session = await store.dispatch('validateSession', type);

            if (session.valid) {
                await store.dispatch('consultUser', {type: type, user_id: session.user_id})
                next();
            } else if(!session.valid && to.meta.autoOptional){
                next();
            } else if(!session.valid && !to.meta.autoOptional){
                next('/login');
            }
        } else if(to.meta.autoOptional) {
            await store.dispatch('temporalSession');
            next();
        } else{
            next('/');
        }
    } else {
        next();
    }
});


export default router;
