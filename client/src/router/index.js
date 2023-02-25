import {createRouter, createWebHistor} from 'vue-router'
//import Home from '../components/Home.vue'
import LoginView from '../views/LoginView.vue'


const routes = [
    {
        path: '/LoginView',
        name: 'LoginView',
        component: LoginView
    }
]


const router = createRouter({
    history: createWebHistor(process.env.BASE_URL),
    routes
})

export default router