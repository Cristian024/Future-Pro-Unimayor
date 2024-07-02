import { createStore } from 'vuex';
import { validateSession } from '@/lib/session';

export default createStore({
    state: {
        session: null,
    },
    mutations: {
        setSession(state, session) {
            state.session = session;
        },
    },
    actions: {
        async validateSession({ commit }, type) {
            const session = await validateSession(type);
            commit('setSession', session);
            return session;
        },
    },
    getters: {
        session(state) {
            return state.session;
        },
    },
});
