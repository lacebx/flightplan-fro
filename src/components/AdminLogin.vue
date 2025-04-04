<template>
  <div class="admin-login">
    <h1>Admin Login</h1>
    <form @submit.prevent="login">
      <input type="email" v-model="email" placeholder="Email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post('http://localhost:8082/api/admin/login', {
          email: this.email,
          password: this.password,
        });
        localStorage.setItem('userRole', response.data.role); // Assuming the response contains the user role
        this.$router.push('/admin/manage-students'); // Redirect to manage students page
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
  },
};
</script>

<style scoped>
.admin-login {
  /* Add styles for the login page */
}
</style> 