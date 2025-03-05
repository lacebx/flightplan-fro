<template>
  <div class="tasks-events">
    <!-- Reuse the floating spheres background -->
    <div class="animated-bg">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>
    <!-- Video Background -->
    <div class="video-background">
      <video autoplay loop muted playsinline>
        <source src="https://assets.mixkit.co/videos/preview/mixkit-people-working-in-a-creative-office-environment-42925-large.mp4" type="video/mp4">
      </video>
      <div class="overlay"></div>
    </div>

    <!-- Hero Section -->
    <div class="hero-section">
      <h1 class="glass-effect">Tasks & Events</h1>
    </div>

    <!-- Tasks Section -->
    <section class="tasks-section glass-effect" data-scroll>
      <h2>Current Tasks</h2>
      <div class="tasks-grid">
        <div class="task-card neumorphic" v-for="task in tasks" :key="task.Taskid">
          <h3>{{ task.name }}</h3>
          <p><strong>Category:</strong> {{ task.category }} | <strong>Type:</strong> {{ task.type }}</p>
          <p>{{ task.description }}</p>
          <p><strong>Points Earned:</strong> {{ task.pointsearned }}</p>
          <p><strong>Schedule:</strong> {{ task.schedulingtype }}</p>
          <button class="complete-btn" @click="completeTask(task)" :disabled="task.completed">
            <span v-if="!task.completed">Complete</span>
            <span v-else>Completed <i class="fas fa-check"></i></span>
          </button>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section class="events-section">
      <div class="events-container">
        <div class="event-item" v-for="event in events" :key="event.eventid" data-scroll>
          <div class="event-image">
            <img :src="getEventImage(event.eventid)" :alt="event.name">
          </div>
          <div class="event-content glass-effect">
            <h3>{{ event.name }}</h3>
            <p>{{ event.description }}</p>
            <p><strong>Type:</strong> {{ event.eventtype }}</p>
            <div class="event-details">
              <span>{{ event.date }}</span>
              <span>{{ event.starttime }} - {{ event.endtime }}</span>
            </div>
            <p><strong>Location:</strong> {{ event.location }}</p>
            <p><strong>Attendance:</strong> {{ event.attendancetype }}</p>
            <button class="register-button neumorphic">Register Now</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'TasksAndEventsView',
  data() {
    return {
      tasks: [],  // Fetched from backend
      events: []  // Fetched from backend
    };
  },
  methods: {
    getEventImage(id) {
      // Return images based on event id or fallback to a default URL
      const images = {
        1: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
        2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
      };
      return images[id] || 'https://via.placeholder.com/600x400?text=Event+Image';
    },
    fetchTasksAndEvents() {
      // Fetch tasks
      axios.get('http://localhost:8082/api/tasks', { withCredentials: true })
        .then(response => {
          // Set a "completed" flag on each task for UI state
          this.tasks = response.data.map(task => ({ ...task, completed: false }));
        })
        .catch(error => {
          console.error('Error fetching tasks:', error);
        });
      // Fetch events
      axios.get('http://localhost:8082/api/events', { withCredentials: true })
        .then(response => {
          this.events = response.data;
        })
        .catch(error => {
          console.error('Error fetching events:', error);
        });
    },
    completeTask(task) {
      // Mark the task as complete and add a cool effect
      task.completed = true;
      // Here you might also send a request to update the task status in the backend.
      // For now, we'll simply add a class to animate it.
      this.$nextTick(() => {
        const el = this.$el.querySelector(`[data-taskid="${task.Taskid}"]`);
        if (el) {
          el.classList.add('task-completed');
        }
      });
    },
    initScrollAnimations() {
      const scrollElements = document.querySelectorAll('[data-scroll]');
      const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
          elementTop <= ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100))
        );
      };
      const displayScrollElement = (element) => {
        element.classList.add('scrolled');
      };
      const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
          if (elementInView(el, 100)) {
            displayScrollElement(el);
          }
        });
      };
      window.addEventListener('scroll', handleScrollAnimation);
      handleScrollAnimation();
    }
  },
  mounted() {
    this.fetchTasksAndEvents();
    this.initScrollAnimations();
  }
};
</script>

<style scoped>
.tasks-events {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #1a1a1a;
  color: white;
}

/* Video Background */
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow-y: auto;
}

.video-background video {
  min-width: 100%;
  min-height: 100%;
  object-fit: cover;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* Hero Section */
.hero-section {
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.hero-section h1 {
  font-size: 4rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

/* Glassmorphism Effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Tasks Section */
.tasks-section {
  margin: 40px auto;
  max-width: 1200px;
  padding: 40px;
  z-index: 1;
  position: relative;
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.task-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.task-card:hover {
  transform: translateY(-5px);
}

.task-card.task-completed {
  opacity: 0.6;
  border: 2px solid #41b883;
}

.complete-btn {
  margin-top: 10px;
  padding: 10px 20px;
  background: #41b883;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.complete-btn:hover:not([disabled]) {
  background: #369f6b;
}

.complete-btn[disabled] {
  cursor: default;
}

/* Events Section */
.events-section {
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1);
  margin-top: 40px;
}

.events-container {
  max-width: 1200px;
  margin: 0 auto;
}

.event-item {
  display: flex;
  margin-bottom: 40px;
  opacity: 0;
  transform: translateY(50px);
  transition: all 0.6s ease;
}

.event-item.scrolled {
  opacity: 1;
  transform: translateY(0);
}

.event-item:nth-child(even) {
  flex-direction: row-reverse;
}

.event-image {
  flex: 1;
  height: 300px;
  overflow: hidden;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.event-content {
  flex: 1;
  padding: 40px;
  color: white;
}

.event-details {
  margin: 10px 0;
  font-weight: bold;
}

.register-button {
  margin-top: 20px;
  padding: 10px 20px;
  background: #41b883;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-button:hover {
  background: #369f6b;
}

/* Responsive Design */
@media (max-width: 768px) {
  .event-item {
    flex-direction: column !important;
  }
  
  .event-image, .event-content {
    width: 100%;
  }
}
</style>
