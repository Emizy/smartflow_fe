import Vue from 'vue'
import VueRouter from 'vue-router'
import AppRoutes from './routes'

let routes = []
routes = routes.concat(AppRoutes)

Vue.use(VueRouter)


const routerPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(() => console.log('terminated'))
}

VueRouter.prototype.replace = function push(location) {
    return routerPush.call(this, location).catch(() => console.log('terminated'))
}

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    linkExactActiveClass: "link-active",
    routes,
    scrollBehavior() {
        return {x: 0, y: 0}
    }
})

router.beforeEach((to, from, next) => {
    window.document.title = to.meta && to.meta.title ? to.meta.title : 'SMART FLOW'
    next()
})

export default router
