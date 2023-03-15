import { createStore } from "vuex"



export default createStore({
    state: {
        data: null,
        signOut: false
    },
    getters: {
        getData(state) {
            return state.data?.displayName
        },
        getUserLoggedin(state) {
            // To check if user id is not null (returns a boolean)
            return !!state.data?.uid
        },
        getAuth(state){
            return state.signOut
        },

    },
    mutations: {
        SetUser(state, user) {
            state.data = user
        },
        setAuth(state, auth){
            state.signOut = auth
        },

    },
    actions: {
        UpdateUser({ commit }, user) {
            commit("SetUser", user)
        },
        updateAuth({commit},auth){
            commit("setAuth",auth)
        },

    }

})