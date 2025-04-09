<template>
  <div id="app">
    <!-- Conditional Navbar -->
    <header v-if="isAdminRoute">
      <nav>
        <ul>
          <li><router-link to="/admin/manage-events" class="nav-link">Manage Events</router-link></li>
          <li><router-link to="/admin/manage-students" class="nav-link">Manage Students</router-link></li>
        </ul>
      </nav>
    </header>
    <header v-else-if="isLoggedIn && !isLoginRoute">
      <nav>
        <ul>
          <li><router-link to="/home" class="nav-link">Tasks & Events</router-link></li>
          <li><router-link to="/sw" class="nav-link">S&W</router-link></li>
          <li><router-link to="/experience" class="nav-link">Experience</router-link></li>
          <li class="profile-dropdown">
            <router-link to="/profile" class="nav-link profile-button">
              <img :src="userPhoto" alt="Profile Icon" class="profile-icon" />
            </router-link>
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <router-view @login="handleLogin" @logout="handleLogout" @userPhotoLoaded="setUserPhoto" />
    </main>

    <!-- Footer -->
    <footer v-if="isLoggedIn && !isLoginRoute">
      <div class="footer-left">Overview and comments</div>
      <div class="footer-right">Current Points</div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';

export default {
  name: "App",
  setup() {
    const isLoggedIn = ref(false);
    const route = useRoute();
    const userPhoto = ref('');

    onMounted(() => {
      isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
    });

    const handleLogin = () => {
      isLoggedIn.value = true;
      localStorage.setItem('isLoggedIn', 'true');
    };

    const handleLogout = () => {
      isLoggedIn.value = false;
      localStorage.removeItem('isLoggedIn');
    };

    const setUserPhoto = (photoUrl) => {
      userPhoto.value = photoUrl;
    };

    const isLoginRoute = computed(() => route.path === '/');
    const isAdminRoute = computed(() => route.path.startsWith('/admin'));

    return { isLoggedIn, handleLogin, handleLogout, isLoginRoute, isAdminRoute, userPhoto, setUserPhoto };
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
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  padding: 0 2rem;
}

.nav-link {
  color: #ffffff;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.2);
}

.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
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

/* FOOTER */
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  color: #fff;
}

.footer-left, .footer-right {
  font-weight: 500;
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
</style>
