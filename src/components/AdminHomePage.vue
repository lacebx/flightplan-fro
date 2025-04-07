<template>
  <div class="admin-homepage">
    <!-- Admin Navigation -->
    <nav class="admin-navbar">
      <div class="logo">
        <h1>Admin Dashboard</h1>
      </div>
      <ul class="nav-links">
        <li><router-link to="/admin/manage-students">Manage Students</router-link></li>
        <li><router-link to="/admin/manage-events">Manage Events</router-link></li>
        <li><router-link to="/admin/manage-points">Manage Points</router-link></li>
        <li><router-link to="/admin/view-student-plans">View Plans</router-link></li>
        <li><router-link to="/roles">Manage Roles</router-link></li>
        <li><button @click="logout" class="logout-btn">Logout</button></li>
      </ul>
    </nav>

    <!-- Dashboard Overview -->
    <div class="dashboard-overview">
      <div class="stats-grid">
        <div class="stat-card">
          <h3>Total Students</h3>
          <p class="stat-number">{{ stats.totalStudents }}</p>
        </div>
        <div class="stat-card">
          <h3>Active Events</h3>
          <p class="stat-number">{{ stats.activeEvents }}</p>
        </div>
        <div class="stat-card">
          <h3>Pending Tasks</h3>
          <p class="stat-number">{{ stats.pendingTasks }}</p>
        </div>
        <div class="stat-card">
          <h3>Total Points Awarded</h3>
          <p class="stat-number">{{ stats.totalPoints }}</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="quick-actions">
        <h2>Quick Actions</h2>
        <div class="action-buttons">
          <button @click="showTaskForm = true" class="action-btn">
            <i class="fas fa-plus"></i> Create Task
          </button>
          <button @click="showEventForm = true" class="action-btn">
            <i class="fas fa-calendar-plus"></i> Add Event
          </button>
          <button @click="showStudentForm = true" class="action-btn">
            <i class="fas fa-user-plus"></i> Add Student
          </button>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="recent-activity">
        <h2>Recent Activity</h2>
        <div class="activity-list">
          <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
            <span class="activity-icon" :class="activity.type">
              <i :class="getActivityIcon(activity.type)"></i>
            </span>
            <div class="activity-details">
              <p class="activity-text">{{ activity.description }}</p>
              <span class="activity-time">{{ activity.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Task Creation Modal -->
    <div v-if="showTaskForm" class="modal">
      <div class="modal-content">
        <h2>Create a New Task</h2>
        <form @submit.prevent="createTask">
          <div class="form-group">
            <label for="taskName">Task Name</label>
            <input type="text" id="taskName" v-model="newTask.name" required />
          </div>
          <div class="form-group">
            <label for="taskDescription">Description</label>
            <textarea id="taskDescription" v-model="newTask.description" required></textarea>
          </div>
          <div class="form-group">
            <label for="taskPoints">Points</label>
            <input type="number" id="taskPoints" v-model="newTask.points" required min="0" />
          </div>
          <div class="modal-buttons">
            <button type="submit" class="submit-btn">Create Task</button>
            <button type="button" class="cancel-btn" @click="showTaskForm = false">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminHomePage',
  data() {
    return {
      showTaskForm: false,
      showEventForm: false,
      showStudentForm: false,
      newTask: {
        name: '',
        description: '',
        points: 0
      },
      stats: {
        totalStudents: 0,
        activeEvents: 0,
        pendingTasks: 0,
        totalPoints: 0
      },
      recentActivities: []
    };
  },
  methods: {
    async fetchDashboardStats() {
      try {
        const response = await axios.get('http://localhost:8082/api/admin/stats', { withCredentials: true });
        this.stats = response.data;
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    },
    async fetchRecentActivities() {
      try {
        const response = await axios.get('http://localhost:8082/api/admin/activities', { withCredentials: true });
        this.recentActivities = response.data;
      } catch (error) {
        console.error('Error fetching recent activities:', error);
      }
    },
    getActivityIcon(type) {
      const icons = {
        task: 'fas fa-tasks',
        event: 'fas fa-calendar',
        student: 'fas fa-user',
        points: 'fas fa-star'
      };
      return icons[type] || 'fas fa-info-circle';
    },
    async createTask() {
      try {
        const response = await axios.post('http://localhost:8082/api/tasks', this.newTask, {
          withCredentials: true
        });
        console.log('Task created:', response.data);
        this.showTaskForm = false;
        this.newTask = { name: '', description: '', points: 0 };
        await this.fetchDashboardStats();
        await this.fetchRecentActivities();
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    logout() {
      // Redirect to login page
      this.$router.push('/admin/login');
    }
  },
  mounted() {
    this.fetchDashboardStats();
    this.fetchRecentActivities();
  }
};
</script>

<style scoped>
.admin-homepage {
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
}

.admin-navbar {
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.nav-links a:hover {
  background: rgba(255, 255, 255, 0.1);
}

.dashboard-overview {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-number {
  font-size: 2.5rem;
  font-weight: bold;
  color: #41b883;
  margin: 0.5rem 0;
}

.quick-actions {
  margin-bottom: 2rem;
}

.action-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.action-btn {
  background: #41b883;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.3s;
}

.action-btn:hover {
  transform: translateY(-2px);
}

.recent-activity {
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
}

.activity-list {
  margin-top: 1rem;
}

.activity-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(65, 184, 131, 0.2);
}

.activity-details {
  flex: 1;
}

.activity-time {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: #2a2a2a;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  border: none;
}

.submit-btn {
  background: #41b883;
  color: white;
}

.cancel-btn {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.logout-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #ff6666;
}
</style> 