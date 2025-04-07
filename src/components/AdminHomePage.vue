<template>
  <div class="admin-homepage">
   
    <!-- Task Creation Form -->
    <div class="task-creation">
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
        <button type="submit" class="submit-btn">Publish Task</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AdminHomePage',
  data() {
    return {
      newTask: {
        name: '',
        description: '',
        points: 0
      }
    };
  },
  methods: {
    async createTask() {
      try {
        const response = await axios.post('http://localhost:8082/api/tasks', this.newTask, {
          withCredentials: true
        });
        console.log('Task created:', response.data);
        // Optionally, notify the user of success
        this.newTask = { name: '', description: '', points: 0 }; // Reset form
      } catch (error) {
        console.error('Error creating task:', error);
        // Optionally, notify the user of the error
      }
    }
  }
};
</script>

<style scoped>
.admin-homepage {
  padding: 20px;
  background: #1a1a1a;
  color: white;
  min-height: 100vh;
}

.admin-navbar {
  background: rgba(255, 255, 255, 0.1);
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.admin-navbar ul {
  list-style: none;
  padding: 0;
  display: flex;
  gap: 10px;
}

.admin-navbar li {
  display: inline;
}

.admin-navbar a {
  color: #41b883;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 3px;
  transition: background 0.3s ease;
}

.admin-navbar a:hover {
  background: rgba(255, 255, 255, 0.2);
}

.task-creation {
  background: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 5px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.submit-btn {
  background: #41b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #3aa876;
}
</style> 