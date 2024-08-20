import { createStore } from 'vuex';
import { createTemporalSession, validateSession } from '@/lib/session';
import { executeConsult } from '@/services/api';

export default createStore({
    state: {
        name: null,
        session: null,
        user: null,
        activeUserChat: null,
        isLoading: false
    },
    mutations: {
        setName(state, name) {
            state.name = name;
        },
        setSession(state, session) {
            state.session = session;
        },
        setUser(state, user) {
            state.user = user;
        },
        setActiveUserChat(state, activeUserChat) {
            state.activeUserChat = activeUserChat
        },
        setLoading(state, isLoading) {
            state.isLoading = isLoading;
        }
    },
    actions: {
        async validateSession({ commit }, type) {
            const session = await validateSession(type);
            commit('setSession', session);
            return session;
        },
        async temporalSession({ commit }) {
            const session = createTemporalSession();
            commit('setSession', session);
            return session;
        },
        async consultUser({ commit }, data) {
            var user = null;
            await executeConsult(`${data.type}_by_user_id`, data.user_id).then(
                function (value) {
                    if (value.data.length > 0) {
                        user = value.data[0];
                    }
                },
                function (error) {
                    user = null;
                }
            )
            commit('setUser', user)
            return user;
        },
        setName({ commit }, name) {
            commit('setName', name)
            return name;
        },
        async activeUserChat({ commit }, data) {
            commit('setActiveUserChat', data)
            return data;
        }
    },
    getters: {
        session(state) {
            return state.session;
        },
        user(state) {
            return state.user
        },
        name(state) {
            return state.name;
        },
        activeUserChat(state) {
            return state.activeUserChat;
        },
        isLoading(state){
            return state.isLoading;
        }
    },
});
