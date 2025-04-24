<template>
  <div id="app">
    <div style="display:none;">
      <RedemptionPage />
      <TransactionHistory />
    </div>
    <!-- Conditional Navbar -->
    <header v-if="isAdmin && isAdminView">
      <nav>
        <ul>
          <li>
            <router-link to="/admin" class="nav-link">
              &#x1F3E0;
            </router-link>
          </li>
          <li><router-link to="/admin/manage-events" class="nav-link">Manage Events</router-link></li>
          <li><router-link to="/admin/manage-students" class="nav-link">Manage Students</router-link></li>
          <li><router-link to="/admin/manage-tasks" class="nav-link">Manage Tasks</router-link></li>
          <li><router-link to="/admin/reports" class="nav-link">Reports</router-link></li>
          <li><router-link to="/admin/task-approvals" class="nav-link">Task Approvals</router-link></li>
          <li class="nav-link" @click="toggleDropdown">
            Admin View
            <ul v-if="showDropdown" class="dropdown-menu">
              <li @click="switchToStudentView">Student View</li>
            </ul>
          </li>
          <li class="logout-container">
            <button @click="handleLogout" class="logout-btn">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
    <header v-else-if="isLoggedIn && !isLoginRoute">
      <nav><!--Student Navbar-->
        <ul>
          <li><router-link to="/home" class="nav-link">Tasks & Events</router-link></li>
          <li><router-link to="/sw" class="nav-link">S&W</router-link></li>
          <li><router-link to="/experience" class="nav-link">Experience</router-link></li>
          <li><router-link to="/shop" class="nav-link">Shop</router-link></li>
          <li><router-link to="/profile" class="nav-link">Profile</router-link></li>
          <li v-if="isAdmin" @click="switchToAdminView" class="nav-link">
            Return to Admin View
          </li>
          <li class="nav-link notification-icon" @click="toggleNotifications">
            <i class="fas fa-bell"></i>
            <span v-if="unreadNotifications.length" class="notification-count">
              {{ unreadNotifications.length }}
            </span>
            <div v-if="showNotifications" class="notification-dropdown">
              <ul>
                <li v-if="unreadNotifications.length === 0">
                  <i class="fas fa-check-circle"></i>
                  No new notifications
                </li>
                <li v-for="notification in unreadNotifications" :key="notification.id">
                  <i class="fas fa-info-circle"></i>
                  {{ notification.message }}
                </li>
              </ul>
            </div>
          </li>
          <li class="logout-container">
            <button @click="handleLogout" class="logout-btn">
              <i class="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <router-view @login="handleLogin" @logout="handleLogout" @userPhotoLoaded="setUserPhoto" />
    </main>
  </div>
</template>

<script>
import { ref, onMounted, computed, provide } from 'vue';
import axios from 'axios';

import { useRoute, useRouter } from 'vue-router';
import RedemptionPage from './components/ShopView.vue';
import TransactionHistory from './components/TransactionHistory.vue';

export default {

  name: "App",  
  name: "App",
  components: {
    RedemptionPage,
    TransactionHistory,
  },    
  setup() {
    const isLoggedIn = ref(false);
    const route = useRoute();
    const router = useRouter();
    const showNotifications = ref(false);
    const unreadNotifications = ref([
      {
        id: 1,
        message: "Welcome to your dashboard!",
        timestamp: new Date()
      }
    ]);
    const showDropdown = ref(false);
    const userRole = ref(null);
    const isStudentView = ref(false);

    RedemptionPage;

    // Create a reactive array to store redeemed items

    const redeemedItems = ref([]);
    // Provide the reactive array to descendant components
    provide('redeemedItems', redeemedItems);

   
  
    // Method to add a redeemed item
    const addRedeemedItem = (item) => {
      redeemedItems.value.push({
        ...item,
        date: new Date().toLocaleString(),
      });
    };

    // Provide the reactive array and the method

    provide('redeemedItems', redeemedItems);
    provide('addRedeemedItem', addRedeemedItem);



    const userPhoto = ref('');
    

    const fetchNotifications = () => {
      const userId = localStorage.getItem('userId');
      if (!userId) {
        console.error('User ID not found in localStorage');
        return;
      }

      // First set some default notifications while waiting for API
      unreadNotifications.value = [
        {
          id: 1,
          message: "Welcome to your dashboard!",
          timestamp: new Date()
        },
        {
          id: 2,
          message: "You have a new task waiting for review",
          timestamp: new Date()
        }
      ];

      axios.get(`http://localhost:8082/api/notifications/${userId}`, { withCredentials: true })
        .then(response => {
          if (response.data && Array.isArray(response.data)) {
            unreadNotifications.value = response.data;
          } else {
            console.warn('Unexpected notifications format:', response.data);
          }
        })
        .catch(error => {
          console.error('Error fetching notifications:', error);
        });
    };

    const toggleNotifications = () => {
      showNotifications.value = !showNotifications.value;
      // Close dropdown when clicking outside
      if (showNotifications.value) {
        const closeDropdown = (e) => {
          if (!e.target.closest('.notification-icon')) {
            showNotifications.value = false;
            document.removeEventListener('click', closeDropdown);
          }
        };
        // Add slight delay to prevent immediate closure
        setTimeout(() => {
          document.addEventListener('click', closeDropdown);
        }, 100);
      }
    };

    const toggleDropdown = () => {
      showDropdown.value = !showDropdown.value;
    };

    const switchToStudentView = () => {
      showDropdown.value = false;
      isStudentView.value = true;
      router.push('/home');
    };

    const switchToAdminView = () => {
      isStudentView.value = false;
      router.push('/admin');
    };

    const fetchUserRole = () => {
      axios.get('http://localhost:8082/auth/user', { withCredentials: true })
        .then(response => {
          userRole.value = response.data.role;
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
        });
    };

    onMounted(() => {
      isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
      fetchNotifications();
      fetchUserRole();
    });

    const handleLogin = () => {
      isLoggedIn.value = true;
      localStorage.setItem('isLoggedIn', 'true');
      fetchNotifications();
      fetchUserRole();
    };

    const handleLogout = () => {
      isLoggedIn.value = false;
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('userData');
      router.push('/');
    };
    

    const setUserPhoto = (photoUrl) => {
      userPhoto.value = photoUrl;
    };

    const isLoginRoute = computed(() => route.path === '/');
    const isAdmin = computed(() => userRole.value === 'admin');
    const isAdminView = computed(() => {
      return isAdmin.value && !isStudentView.value;
    });

    return { isLoggedIn, handleLogin, handleLogout, isLoginRoute, userPhoto, setUserPhoto, showNotifications, toggleNotifications, unreadNotifications, isAdmin, toggleDropdown, showDropdown, switchToStudentView, switchToAdminView, isAdminView, isStudentView };
  },
};
</script>

<style>
/* Existing styles for the navbar */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  background: #0a0a0a;
  color: #ffffff;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* HEADER (Navbar) */
header {
  position: fixed;
  top: 0; 
  left: 0;
  width: 100%;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1rem;
}

/* Nav Styles */
nav ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
  justify-content: flex-start;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  padding: 0 2rem;
}

.nav-link {
  position: relative;
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

.logout-container {
  margin-left: auto;
}

.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
}

.logout-btn:hover {
  background: #c0392b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(231, 76, 60, 0.2);
}

.logout-btn i {
  font-size: 1rem;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    align-items: stretch;
    padding: 1rem;
  }

  .logout-container {
    margin-left: 0;
    margin-top: 1rem;
  }

  .logout-btn {
    width: 100%;
    justify-content: center;
  }
}

/* MAIN CONTENT */
main {
  padding-top: 80px;
  padding-bottom: 100px;
  flex-grow: 1;
  background: transparent;
  padding-left: 20px;
  padding-right: 20px;
}

@media (max-width: 768px) {
  nav ul {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }

  .profile-dropdown {
    position: relative;
    right: auto;
    align-self: flex-end;
    margin-top: 1rem;
  }
}

.profile-dropdown {
  position: absolute;
  right: 2rem;
}

.profile-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
  padding: 0;
}

.profile-button i {
  font-size: 1.2rem;
  color: #ffffff;
}

.profile-button:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.dropdown-content {
  margin-top: 8px;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 100%;
  right: 0;
  min-width: 150px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(10px);
  transition: all 0.3s ease;
  z-index: 1100;
}

.profile-dropdown:hover .dropdown-content {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.dropdown-item {
  color: #ffffff;
  text-decoration: none;
  padding: 0.8rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
}

.dropdown-item:hover {
  background: rgba(255, 255, 255, 0.2);
}

.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.home-icon {
  font-size: 1.5rem; /* Adjust size as needed */
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-icon {
  position: relative;
  cursor: pointer;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
}

.notification-icon:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.notification-icon i {
  font-size: 1.2rem;
  color: #ffffff;
}

.notification-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #e74c3c;
  color: white;
  border-radius: 50%;
  padding: 0.2rem 0.5rem;
  font-size: 0.75rem;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #1a1a1a;
  font-weight: bold;
}

.notification-dropdown {
  position: absolute;
  top: calc(100% + 10px);
  right: 0;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 300px;
  max-width: 400px;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  z-index: 1000;
}

.notification-dropdown::before {
  content: '';
  position: absolute;
  top: -8px;
  right: 20px;
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-bottom: 8px solid rgba(30, 30, 30, 0.95);
}

.notification-dropdown ul {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 400px;
  overflow-y: auto;
}

.notification-dropdown li {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  transition: background-color 0.3s ease;
}

.notification-dropdown li:last-child {
  border-bottom: none;
}

.notification-dropdown li:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Dropdown Menu */
.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background: rgba(30, 30, 30, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  z-index: 1100;
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 10px;
  color: white;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background: rgba(255, 255, 255, 0.1);
}
</style>
