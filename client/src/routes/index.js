import { createWebHistory,createRouter } from "vue-router";

const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:"/",
            name:'Home',
            component: ()=> import('../components/Home.vue')
        },
        {
            path:"/game",
            name:'Game',
            component: ()=> import('../components/Game.vue')
        }
    ]
});

export default router;