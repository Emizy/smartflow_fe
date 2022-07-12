const routes = [
    {
        path: "",
        component: () => import(/* webpackChunkName: "chunck" */ '../../views/Main'),
        meta: {
            requireAuth: true,
            title: 'Dashboard | Business section',
        },
        children: [
            {
                path: "",
                name: "dashboard",
                component: () => import(/* webpackChunkName: "chunck" */ '../../views/DashboardVue'),
                meta: {
                    requireAuth: true,
                    title: 'Dashboard',
                },
            },
        ]
    },
    {
        path: "*",
        redirect: {
            name: 'login'
        }
    },
]


export default routes
