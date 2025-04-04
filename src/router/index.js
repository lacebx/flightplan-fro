import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../components/LoginView.vue';
import TasksAndEventsView from '../components/TasksAndEventsView.vue';
import SWView from '../components/SWView.vue';
import ExperienceView from '../components/ExperienceView.vue';
import ProfileView from '../components/ProfileView.vue';
import LeaderboardView from '../components/LeaderboardView.vue';
import AdminLogin from '../components/AdminLogin.vue';
import ManageStudents from '../components/ManageStudents.vue';
import ManageEvents from '../components/ManageEvents.vue';
import ManagePoints from '../components/ManagePoints.vue';
import ViewStudentPlans from '../components/ViewStudentPlans.vue';

const routes = [
  { path: '/', component: LoginView },
  { path: '/home', component: TasksAndEventsView },
  { path: '/sw', component: SWView },
  { path: '/experience', component: ExperienceView },
  { path: '/profile', component: ProfileView },
  { path: '/leaderboard', component: LeaderboardView },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: AdminLogin,
  },
  {
    path: '/admin/manage-students',
    name: 'ManageStudents',
    component: ManageStudents,
    // meta: { requiresAdmin: true }, // Comment out or remove this line
  },
  {
    path: '/admin/manage-events',
    name: 'ManageEvents',
    component: ManageEvents,
    // meta: { requiresAdmin: true }, // Comment out or remove this line
  },
  {
    path: '/admin/manage-points',
    name: 'ManagePoints',
    component: ManagePoints,
    // meta: { requiresAdmin: true }, // Comment out or remove this line
  },
  {
    path: '/admin/view-student-plans',
    name: 'ViewStudentPlans',
    component: ViewStudentPlans,
    // meta: { requiresAdmin: true }, // Comment out or remove this line
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Comment out or remove the navigation guard
// router.beforeEach((to, from, next) => {
//   const isAdmin = localStorage.getItem('userRole') === 'admin';
//   if (to.matched.some(record => record.meta.requiresAdmin) && !isAdmin) {
//     next('/admin/login'); // Redirect to admin login if not an admin
//   } else {
//     next(); // Proceed to the route
//   }
// });

export default router; 