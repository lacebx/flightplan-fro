import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../components/HomeView.vue';
import LoginView from '../components/LoginView.vue';
import TasksView from '../components/TasksView.vue';
import SWView from '../components/SWView.vue';
import ExperienceView from '../components/ExperienceView.vue';
import EventsView from '../components/EventsView.vue';
import ProfileView from '../components/ProfileView.vue';

const routes = [
  { path: '/', component: LoginView },
   { path: '/home', component: HomeView },
  { path: '/tasks', component: TasksView },
  { path: '/sw', component: SWView },
  { path: '/experience', component: ExperienceView },
  { path: '/events', component: EventsView },
  { path: '/profile', component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 