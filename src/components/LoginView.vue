<template>
  <div class="login-container">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="particle" v-for="n in 20" :key="n"></div>
    </div>

    <!-- Login Card -->
    <div class="login-card glass-effect" data-tilt>
      <!-- Logo Section -->
      <div class="logo-section">
        <div class="logo-container">
          <img src="@/assets/oc-logo.png" alt="OC Logo" class="oc-logo" />
          <div class="logo-glow"></div>
        </div>
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
            <img src="@/assets/google-icon.svg" alt="Google" class="google-icon" />
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

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #363636 100%);
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #862633;
  border-radius: 50%;
  animation: float 8s infinite;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
}

/* Position particles randomly */
.particle:nth-child(3n) { animation-delay: 2s; left: 10%; }
.particle:nth-child(3n + 1) { animation-delay: 4s; left: 50%; }
.particle:nth-child(3n + 2) { animation-delay: 6s; left: 80%; }

/* Login Card */
.login-card {
  width: 90%;
  max-width: 450px;
  padding: 2.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 1;
  transform-style: preserve-3d;
}

.glass-effect {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Logo Section */
.logo-section {
  text-align: center;
  margin-bottom: 2rem;
}

.logo-container {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto 1rem;
}

.oc-logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: relative;
  z-index: 2;
}

.logo-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(134, 38, 51, 0.3) 0%, transparent 70%);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
  50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
}

h1 {
  color: white;
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.tagline {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

/* Login Content */
.login-content {
  text-align: center;
}

.welcome-text {
  margin-bottom: 2rem;
  color: white;
}

.welcome-text h2 {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.welcome-text p {
  color: rgba(255, 255, 255, 0.8);
}

/* Google Login Button */
.google-login-btn {
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  background: #862633;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  position: relative;
  z-index: 2;
}

.google-icon {
  width: 24px;
  height: 24px;
}

.btn-glow {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  transform: translate(-50%, -50%);
  animation: rotate 4s linear infinite;
}

@keyframes rotate {
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
}

.google-login-btn:hover {
  transform: translateY(-2px);
}

/* Requirements Section */
.requirements {
  margin-top: 2rem;
  color: white;
}

.requirement-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.5rem 0;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
}

.requirement-item i {
  color: #41b883;
}

/* Responsive Design */
@media (max-width: 480px) {
  .login-card {
    padding: 1.5rem;
  }

  h1 {
    font-size: 2rem;
  }

  .welcome-text h2 {
    font-size: 1.5rem;
  }
}
</style> 