import { createStore } from 'vuex';
import { validateSession } from '@/lib/session';
import { executeConsult } from '@/services/api';

export default createStore({
    state: {
        session: null,
        user: null
    },
    mutations: {
        setSession(state, session) {
            state.session = session;
        },
        setUser(state, user){
            state.user = user;
        }
    },
    actions: {
        async validateSession({ commit }, type) {
            const session = await validateSession(type);
            commit('setSession', session);
            return session;
        },
        async consultUser({commit}, data){
            var user = null;
            await executeConsult(`${data.type}_by_user_id`, data.user_id).then(
                function(value){
                    if(value.data.length > 0){
                        user = value.data[0];
                    }
                },
                function(error){
                    user = null;
                }
            )
            commit('setUser', user)
            return user;
        }
    },
    getters: {
        session(state) {
            return state.session;
        },
        user(state){
            return state.user
        }
    },
});
