<template>
  <div id="app">
    <!-- Header (Navbar) -->
    <header v-if="isLoggedIn && !isLoginRoute">
      <nav>
        <ul>
          <li><router-link to="/home" class="nav-link">Tasks & Events</router-link></li>
          <li><router-link to="/sw" class="nav-link">S&W</router-link></li>
          <li><router-link to="/experience" class="nav-link">Experience</router-link></li>
          <li class="profile-dropdown">
            <router-link to="/profile" class="nav-link profile-button">
              <img :src="userPhoto" alt="Profile Icon" class="profile-icon" />
            </router-link>
            <div class="dropdown-content">
              <a href="#" @click.prevent="handleLogout" class="dropdown-item">
                <i class="fas fa-sign-out-alt"></i> Logout
              </a>
            </div>
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
import { useRoute } from 'vue-router'; // Import useRoute

export default {
  name: "App",
  setup() {
    const isLoggedIn = ref(false);
    const route = useRoute(); // Get the current route
    const userPhoto = ref(''); // Reactive variable for user photo

    // Check localStorage for logged-in state on mount
    onMounted(() => {
      isLoggedIn.value = localStorage.getItem('isLoggedIn') === 'true';
    });

    const handleLogin = () => {
      isLoggedIn.value = true;
      localStorage.setItem('isLoggedIn', 'true'); // Save logged-in state
    };

    const handleLogout = () => {
      isLoggedIn.value = false;
      localStorage.removeItem('isLoggedIn'); // Remove logged-in state
    };

    const setUserPhoto = (photoUrl) => {
      userPhoto.value = photoUrl; // Set the user photo URL
    };

    // Determine if the current route is the login route
    const isLoginRoute = computed(() => route.path === '/');

    return { isLoggedIn, handleLogin, handleLogout, isLoginRoute, userPhoto, setUserPhoto };
  },
};
</script>

<style>
/* Global Reset / Base */
html, body {
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Hide horizontal scrollbar if content overflows */
  background: #0a0a0a; /* Dark global background to match your theme */
  color: #ffffff;      /* Default text color */
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* HEADER (Navbar) */
header {
  /* Make the header fixed so it stays at the top */
  position: fixed;
  top: 0; 
  left: 0;
  width: 100%;
  z-index: 1000;

  /* Glass Morphism */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);

  /* Spacing */
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
  /* Push content below the fixed header's height */
  padding-top: 80px;
  /* Add padding at bottom to prevent content from being hidden behind fixed footer */
  padding-bottom: 100px; /* Increased padding to ensure content isn't hidden */
  flex-grow: 1;
  background: transparent;
  padding-left: 20px;
  padding-right: 20px;
}

/* FOOTER */
footer {
  /* Make footer fixed */
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 5; /* Even lower z-index */

  /* Glass Morphism */
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.2);

  /* Layout */
  display: flex;
  justify-content: space-between;
  align-items: center;

  /* Spacing */
  padding: 1rem;
  color: #fff;
}

/* Example styling for footer text */
.footer-left, .footer-right {
  font-weight: 500;
}

/* Adjust for responsiveness if needed */
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

/* PROFILE DROPDOWN */
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
  padding: 0; /* Remove padding to ensure proper circle shape */
}

.profile-button i {
  font-size: 1.2rem; /* Slightly smaller size for better fit */
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

/* Add styles for the profile icon */
.profile-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}
</style>
