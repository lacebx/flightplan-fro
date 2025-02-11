import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import HomeView from '../components/HomeView.vue';
import TasksAndEventsView from '../components/TasksAndEventsView.vue';
import SWView from '../components/SWView.vue';
import ExperienceView from '../components/ExperienceView.vue';
import ProfileView from '../components/ProfileView.vue';

const routes = [
  { path: '/', component: LoginView },

  {
    path: '/home',
    component: HomeView,
    beforeEnter: (to, from, next) => {
      const auth = JSON.parse(localStorage.getItem("user"));
      if (!auth) next("/");
      else next();
    }
    
  },
  { path: '/tasks-events', component: TasksAndEventsView },
  { path: '/sw', component: SWView },
  { path: '/experience', component: ExperienceView },
  { path: '/profile', component: ProfileView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router; 