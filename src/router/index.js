import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import TasksAndEventsView from '../components/TasksAndEventsView.vue';
import SWView from '../components/SWView.vue';
import ExperienceView from '../components/ExperienceView.vue';
import ProfileView from '../components/ProfileView.vue';
import AddExperience from '../components/AddExperience.vue';
import Shop from '../components/ShopView.vue';


const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: TasksAndEventsView },
  { path: '/sw', component: SWView },
  { path: '/experience', component: ExperienceView },
  { path: '/profile', component: ProfileView },
  { path: '/add-experience', component: AddExperience },
    { path: '/shop', component: Shop }
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 