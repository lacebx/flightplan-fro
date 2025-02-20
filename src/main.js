import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.config.globalProperties.$auth = {
  user: null,

  async checkAuth() {
    try {
      const response = await fetch("http://localhost:8082/auth/user", {
        credentials: "include",
      });
      if (response.ok) {
        this.user = await response.json();
      } else {
        this.user = null;
      }
    } catch (error) {
      console.error("Error checking auth:", error);
      this.user = null;
    }
  },

  async logout() {
    await fetch("http://localhost:8082/logout", { credentials: "include" });
    this.user = null;
    router.push("/login");
  },
};

// Check authentication on app startup
app.config.globalProperties.$auth.checkAuth();

app.use(router);
app.mount("#app");