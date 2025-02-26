<template>
  <div class="login-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>

    <!-- Login Card -->
    <div class="login-card glass-effect" data-tilt>
      <!-- Title Section (Logo Removed) -->
      <div class="logo-section">
        <h1>Flight Plan</h1>
        <p class="tagline">Your Career Journey Begins Here</p>
      </div>

      <!-- Login Form -->
      <div class="login-content">
        <div class="welcome-text">
          <h2>Welcome Back</h2>
          <p>Sign in with your OC email</p>
        </div>

        <button class="google-login-btn" @click="login">
          <div class="btn-content">
            <span>Sign in with Google</span>
          </div>
          <div class="btn-glow"></div>
        </button>

        <!-- Login Requirements -->
        <div class="requirements">
          <div class="requirement-item">
            <i class="fas fa-check-circle"></i>
            <span>Use your @oc.edu email</span>
          </div>
          <div class="requirement-item">
            <i class="fas fa-shield-alt"></i>
            <span>Secure authentication</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VanillaTilt from 'vanilla-tilt';

export default {
  name: "LoginView",
  methods: {
    login() {
      this.$emit('login');
      this.$router.push('/home');
    }
  },
  mounted() {
    // Initialize tilt effect if using vanilla-tilt.js
    if (typeof VanillaTilt !== 'undefined') {
      VanillaTilt.init(document.querySelector("[data-tilt]"), {
        max: 5,
        speed: 400,
        glare: true,
        "max-glare": 0.2
      });
    }
  }
};
</script>
