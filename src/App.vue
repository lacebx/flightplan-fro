<template>
  <div id="app">
    <!-- Header (Navbar) -->
    <header v-if="isLoggedIn && !isLoginRoute">
      <nav>
        <ul>
          <li><router-link to="/home" class="nav-link">Tasks & Events</router-link></li>
          <li><router-link to="/sw" class="nav-link">S&W</router-link></li>
          <li><router-link to="/experience" class="nav-link">Experience</router-link></li>
          <li><router-link to="/shop" class="nav-link">Shop</router-link></li>

          <li><router-link to="/profile" class="nav-link">Profile</router-link></li>
        </ul>
      </nav>
    </header>

    <!-- Main Content -->
    <main>
      <router-view @login="handleLogin" @logout="handleLogout" />
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

    // Determine if the current route is the login route
    const isLoginRoute = computed(() => route.path === '/');

    return { isLoggedIn, handleLogin, handleLogout, isLoginRoute };
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
  justify-content: center;
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
  /* Push content below the fixed header’s height */
  padding-top: 80px; 
  flex-grow: 1;
  background: transparent; /* Let the global #0a0a0a show through */
  padding-left: 20px;
  padding-right: 20px;
}

/* FOOTER */
footer {
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
    gap: 0.5rem;
  }
}
</style>
