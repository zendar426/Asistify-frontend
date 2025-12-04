import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/feature/home/views/HomeView.vue";
import LandingLayout from "@/feature/landing/views/LandingLayout.vue";
import MembershipView from "@/feature/membership/views/MembershipView.vue";
import AppLayout from "@/views/AppLayout.vue";
import ReceptionistLayout from '@/feature/receptionist/views/ReceptionistLayout.vue';
import ReceptionistConfigLayout from '@/feature/receptionist/views/ReceptionistConfigLayout.vue';
import ReceptionistDetailView from '@/feature/receptionist/views/ReceptionistDetailView.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            name: 'landing',
            path: '/',
            component: LandingLayout,
        },
        {
            name: 'membership',
            path: '/planes',
            component: MembershipView,
        },
        {
            path: '/auth',
            children: [
                {
                    name: 'login',
                    path: 'login',
                    component: () => import('@/feature/auth/views/LoginView.vue'),
                },
                {
                    name: 'register',
                    path: 'register',
                    component: () => import('@/feature/auth/views/RegisterView.vue'),
                },
            ],
        },
        {
            path: '/app',
            component: AppLayout,
            children: [
                {
                    name: 'home',
                    path: '/home',
                    component: HomeView,
                },
                {
                    name: 'receptionist',
                    path: '/recepcionistas',
                    component: ReceptionistLayout,
                },
                {
                    name: 'receptionistConfig',
                    path: '/recepcionistas/configuracion',
                    component: ReceptionistConfigLayout,
                },
                {
                    name: 'receptionistConfigEdit',
                    path: '/recepcionistas/configuracion/:id',
                    component: () => import('@/feature/receptionist/views/ReceptionistConfigEditView.vue'),
                },
                {
                    name: 'receptionistDetailt',
                    path: '/recepcionistas/:id?',
                    component: () => import('@/feature/receptionist/views/ReceptionistDetailView.vue'),
                },
                {
                    name: 'account',
                    path: 'account',
                    component: () => import('@/feature/account/views/AccountView.vue'),
                },
                {
                    name: 'editaccount',
                    path: 'editProfile',
                    component: () => import('@/feature/account/views/EditAccountView.vue'),
                },
                {
                    name: 'rag',
                    path: '/base-de-conocimiento',
                    component: () => import('@/feature/base-knowledge/views/KnowledgeBaseView.vue'),
                },
                {
                    name: 'enterprise',
                    path: 'empresa',
                    component: () => import('@/feature/enterprise/views/EnterpriseView.vue')
                }
            ],
        },
    ],
})

export default router
