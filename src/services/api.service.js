import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwt.service";
import Cookies from "js-cookie";

var CSRF_TOKEN = Cookies.get("csrftoken");

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = process.env.VUE_APP_ENDPOINT;
        Vue.axios.defaults.headers.common["X-CSRFToken"] = CSRF_TOKEN

    },
    /**
     * Set the default HTTP request headers
     */
    setHeader() {
        // eslint-disable-next-line no-console
        Vue.axios.defaults.headers.common[
            "Authorization"
            ] = `Bearer ${JwtService.getToken()}`;
    },
    /**
     * UnSet the default HTTP request headers
     */
    UnsetHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
            ] = null;
    },
    /**
     * Send the GET HTTP request
     * @param resource
     * @returns {*}
     */
    get(resource = "") {
        return Vue.axios.get(`${resource}`);
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @returns {*}
     */
    post(resource, params) {
        return Vue.axios.post(`${resource}`, params);
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params) {
        return Vue.axios.put(`${resource}/${slug}`, params);
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params) {
        return Vue.axios.put(`${resource}`, params);
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @returns {*}
     */
    delete(resource) {
        return Vue.axios.delete(resource).catch(error => {
            // console.log(error);
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }


};

export default ApiService;
