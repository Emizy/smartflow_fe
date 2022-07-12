import ApiService from "@/services/api.service";
import JwtService from "./../services/jwt.service";

// Authentication state
const state = {
    is_authenticated: false,
    user: {},
    token: null,
    refresh_token: null
}

// Authentication getter
const getters = {
    IS_AUTHENTICATED(state) {
        return state.is_authenticated
    },

}

// Authentication action
const actions = {
    async register(context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("register/", credentials)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    login(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post(`token/`, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    refresh_token(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.post(`token/refresh/`, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
}

//Authentication mutation
const mutations = {
    UPDATE_AUTH(state, payload) {
        state.is_authenticated = true;
        state.token = payload.access;
        state.refresh_token = payload.refresh;
        JwtService.saveToken(payload.access);
    },
    PURGE_TOKEN(state) {
        state.is_authenticated = false;
        state.token = null;
        state.refresh_token = null;

        JwtService.destroyToken();
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
