<template>
  <div class="tasks">
    <div class="task-container">
      <div class="task-item" v-for="task in tasks" :key="task.id">
        <div class="task-content">
          <h3>{{ task.name }}</h3>
          <p>{{ task.description }}</p>
          <div class="task-status">Due: {{ task.dueDate }}</div>
        </div>
        <div class="task-reward">
          <h4>Reward</h4>
          <p>{{ task.points }} Points</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TasksView',
  data() {
    return {
      tasks: [
        { 
          id: 1, 
          name: 'Resume Review', 
          description: 'Submit your resume for professional review',
          dueDate: 'March 30, 2024',
          points: 50
        },
        { 
          id: 2, 
          name: 'Mock Interview', 
          description: 'Complete a practice interview session',
          dueDate: 'April 5, 2024',
          points: 75
        },
        { 
          id: 3, 
          name: 'LinkedIn Profile', 
          description: 'Update your LinkedIn profile',
          dueDate: 'April 10, 2024',
          points: 30
        },
        { 
          id: 4, 
          name: 'Career Workshop', 
          description: 'Attend the networking workshop',
          dueDate: 'April 15, 2024',
          points: 60
        },
      ],
    };
  },
};
</script>

<style scoped>
.tasks {
  padding: 20px;
}

.task-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.task-item {
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.task-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.task-content {
  flex: 3;
  text-align: left;
}

.task-content h3 {
  margin: 0 0 10px 0;
  color: #2c3e50;
}

.task-content p {
  margin: 0 0 15px 0;
  color: #666;
}

.task-status {
  font-size: 0.9em;
  color: #666;
}

.task-reward {
  flex: 1;
  border-left: 1px solid #ddd;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.task-reward h4 {
  margin: 0 0 5px 0;
  color: #41b883;
}

.task-reward p {
  margin: 0;
  font-weight: bold;
  color: #2c3e50;
}
</style>