<template>
  <div id="app">
    <header>
      <h1>Welcome to Career Services</h1>
      <p class="tagline">Helping OC students prepare for their future, one step at a time.</p>
      <img alt="Career Services logo" src="./assets/google-icon.svg" class="logo" />
      <button class="google-login" @click="loginWithGoogle">
        Login with Google
      </button>
      <p class="note">* Only users with an @oc.edu email can use this app</p>
    </header>
    <main v-if="!isLoggedIn">
      <!-- Login view -->
    </main>
    <main v-else>
      <h2>Home View</h2>
      <p>Welcome to the home page!</p>
    </main>
  </div>
</template>

<script>
import { ref } from 'vue'; // Import ref for reactive state

export default {
  name: "App",
  setup() {
    const isLoggedIn = ref(false); // Reactive state for login status

    const loginWithGoogle = () => {
      // Placeholder function for Google login
      setTimeout(() => {
      }, 2);
      isLoggedIn.value = true; // Simulate successful login
    };

    return { loginWithGoogle, isLoggedIn };
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
}

header {
  margin-bottom: 80px;
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
</style>
