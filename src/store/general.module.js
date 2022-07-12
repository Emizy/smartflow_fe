import ApiService from "./../services/api.service";


// general state
const state = {
    user: {},
    sales: {results: [], count: 0, page: 1, total_pages: 1}
}

// general getter
const getters = {
    GET_USER(state) {
        return state.user
    },
    GET_SALES(state) {
        return state.sales
    }
}

// general action
const actions = {
    async FETCH_USER_ACCOUNT(context) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader()
            ApiService.get(`/user/me`)
                .then(response => {
                    context.commit('UPDATE_USER', {'data': response.data.data});
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async FETCH_SALES(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader()
            ApiService.get(`finance/sales/${payload.data}`)
                .then(response => {
                    context.commit('UPDATE_SALES', {'data': response.data});
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async CREATE_SALES(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader()
            ApiService.post(`finance/sales/`, payload)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async UPDATE_SALES(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader()
            ApiService.put(`finance/sales/${payload.id}/`, payload.data)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
    async DELETE_SALE(context, payload) {
        return new Promise((resolve, reject) => {
            ApiService.setHeader()
            ApiService.delete(`finance/sales/${payload.id}/`)
                .then(response => {
                    resolve(response);
                })
                .catch(error => {
                    reject(error);
                });
        });
    },
}

//general mutation
const mutations = {
    UPDATE_USER(state, payload) {
        state.user = payload.data;
    },
    UPDATE_SALES(state, payload) {
        state.sales = payload.data.data
    },
    PURGE_STATE(state) {
        state.sales = {results: [], count: 0, page: 1, total_pages: 1}
        state.user = {}
    }

}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
