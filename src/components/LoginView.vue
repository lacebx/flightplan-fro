<template>
  <div class="login">
    <h1>Welcome to Career Services</h1>
    <p class="tagline">Helping OC students prepare for their future, one step at a time.</p>
    <img alt="Career Services logo" src="@/assets/google-icon.svg" class="logo" />

 <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
     <div><input v-model="username" type="text" placeholder="Username" required /></div><br>

     <div> <input v-model="password" type="password" placeholder="Password" required /></div><br>
      <button type="submit" class="nav-link">Login</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>


<br>
Or 

    <button class="google-login" @click="loginWithGoogle">
      Login with Google
    </button>
    <p class="note">* Only users with an @oc.edu email can use this app</p>
  </div>
</template>

<script>
import { ref, getCurrentInstance } from "vue";
import { useRouter } from "vue-router";

export default {

setup() {
    const username = ref("");
    const password = ref("");
    const errorMessage = ref("");
    const router = useRouter();

    // Access globalProperties.$auth inside setup()
    const { appContext } = getCurrentInstance();
    const auth = appContext.config.globalProperties.$auth;

    const handleLogin = () => {
      if (auth.login(username.value, password.value)) {
        router.push("/home"); // Redirect after login
      } else {
        errorMessage.value = "Invalid username or password.";
      }
    };

    return { username, password, errorMessage, handleLogin };
  },



  name: "LoginView",
  methods: {
    loginWithGoogle() {
      // Placeholder function for Google login
      alert("Redirecting to Google Login...");
    },
  },
};
</script>




    




<style scoped>
.login {
  text-align: center;
  background-color: #d3d3d3;
  padding: 20px;
  border-radius: 5px;
}

.logo {
  width: 120px;
  margin-bottom: 20px;
}

h1 {
  color: #41b883;
  font-size: 2.5rem;
  margin: 10px 0;
}

.tagline {
  font-size: 1.2rem;
  color: #3c3c3c;
}

.google-login {
  background-color: #41b883;
  color: #fff;
  font-size: 1rem;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.google-login:hover {
  background-color: #369f6b;
}

.note {
  margin-top: 15px;
  font-size: 0.9rem;
  color: #666;
}
</style> 