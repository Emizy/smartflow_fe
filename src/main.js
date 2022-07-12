import Vue from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'
import ApiService from './services/api.service'

Vue.config.productionTip = false
import {
    Input,
    Message,
    Button,
    Slider,
    Loading,
    Select,
    Option,
    Notification, Pagination, MessageBox,
} from 'element-ui'

locale.use(lang)
ApiService.init();
window.Bus = new Vue()
Vue.use(Loading.directive)
Vue.use(Select)
Vue.use(Slider)
Vue.use(Option)
Vue.use(Button)
Vue.use(Input)
Vue.use(Pagination)
Vue.prototype.$loading = Loading.service
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
