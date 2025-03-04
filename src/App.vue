<template>
  <div id="app">
    <header v-if="isLoggedIn" style="position: absolute; top: 0; width: 100%; z-index: 1000;">
      <nav>
        <ul>
          <li><router-link to="/home" class="nav-link">Home</router-link></li>
          <li><router-link to="/tasks-events" class="nav-link">Tasks & Events</router-link></li>
          <li><router-link to="/sw" class="nav-link">S&W</router-link></li>
          <li><router-link to="/experience" class="nav-link">Experience</router-link></li>
          <li><router-link to="/profile" class="nav-link">Profile</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view @login="handleLogin" @logout="handleLogout" />
    </main>
    <footer v-if="isLoggedIn">
      <div class="footer-left">Overview and comments</div>
      <div class="footer-right">Current Points</div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: "App",
  setup() {
    const isLoggedIn = ref(false);

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

    return { isLoggedIn, handleLogin, handleLogout };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #f6fff0;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

header {
  margin-bottom: 80px;
  background-color: #d3d3d3;
  padding: 10px;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

h1 {
  color: #41b883; /* Vue's green */
  font-size: 2.5rem;
  margin: 10px 0;
}

.tagline {
  font-size: 1.2rem;
  color: #3c3c3c;
}

.google-login {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #41b883;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 580px;
}

.google-login:hover {
  background-color: #369f6b;
}

.google-icon {
  width: 20px;
  margin-right: 10px;
}

.note {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #666;
}

nav ul {
  display: flex;
  list-style-type: none;
  padding: 0;
  margin: 0;
  gap: 20px;
  justify-content: center;
}

nav li {
  cursor: pointer;
}

.nav-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #d3d3d3;
  color: #333;
  text-decoration: none;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #c0c0c0;
}

.router-link-active {
  background-color: #b0b0b0;
  font-weight: bold;
}

main {
  flex-grow: 1;
  background-color: white;
  padding: 20px;
}

footer {
  display: flex;
  justify-content: space-between;
  background-color: #d3d3d3;
  padding: 10px;
}
</style>
