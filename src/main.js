import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'


//createApp(App).use(router).mount('#app')

const app = createApp(App);

// Global authentication state (shared across components)
app.config.globalProperties.$auth = reactive({
  user: JSON.parse(localStorage.getItem("user")) || null,
  login(username, password) {
    // Hardcoded credentials (replace later with API)
    if (username === "admin" && password === "1234") {
      this.user = { username };
      localStorage.setItem("user", JSON.stringify(this.user));
      return true;
    }
    return false;
  },
  logout() {
    this.user = null;
    localStorage.removeItem("user");
  },
});

app.use(router);
app.mount("#app");
