<template>
  <div class="tasks-events">
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

    <!-- Tasks Section with Glassmorphism -->
    <section class="tasks-section glass-effect" data-scroll>
      <h2>Current Tasks</h2>
      <div class="tasks-grid">
        <div class="task-card neumorphic" v-for="task in tasks" :key="task.id">
          <h3>{{ task.name }}</h3>
          <p>Due: {{ task.dueDate }}</p>
          <button class="neumorphic-button">Complete</button>
        </div>
      </div>
    </section>

    <!-- Events Section with Parallax -->
    <section class="events-section">
      <div class="events-container">
        <div class="event-item" v-for="event in events" :key="event.id" data-scroll>
          <div class="event-image">
            <img :src="getEventImage(event.id)" :alt="event.name">
          </div>
          <div class="event-content glass-effect">
            <h3>{{ event.name }}</h3>
            <p>{{ event.description }}</p>
            <div class="event-details">
              <span>{{ event.date }}</span>
              <span>{{ event.time }}</span>
            </div>
            <button class="register-button neumorphic">Register Now</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TasksAndEventsView',
  data() {
    return {
      tasks: [
        { 
          id: 1, 
          name: 'Complete Resume',
          dueDate: 'March 30, 2024'
        },
        { 
          id: 2, 
          name: 'Interview Prep',
          dueDate: 'April 5, 2024'
        },
      ],
      events: [
        {
          id: 1,
          name: 'Resume Writing Workshop',
          description: 'Learn how to create a professional resume that stands out to employers.',
          date: 'April 15, 2024',
          time: '2:00 PM',
        },
        {
          id: 2,
          name: 'Spring Career Fair',
          description: 'Meet with representatives from top companies across various industries.',
          date: 'April 20, 2024',
          time: '10:00 AM',
        },
      ],
    };
  },
  methods: {
    getEventImage(id) {
      // Placeholder images - replace with your own
      const images = {
        1: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4',
        2: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87'
      };
      return images[id];
    },
    initScrollAnimations() {
      const scrollElements = document.querySelectorAll('[data-scroll]');
      
      const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
          elementTop <= 
          ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
        );
      };

      const displayScrollElement = (element) => {
        element.classList.add('scrolled');
      };

      const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
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
    this.initScrollAnimations();
  }
};
</script>

<style scoped>
.tasks-events {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: #1a1a1a; /* Match ExperienceView background */
  color: white; /* Match text color */
}

/* Video Background */
.video-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
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
  display: flex; /* Center content */
  align-items: center;
  justify-content: center;
}

.hero-section h1 {
  font-size: 4rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

/* Glassmorphism Effect */
.glass-effect {
  background: rgba(255, 255, 255, 0.1); /* Glassmorphism effect */
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
}

.tasks-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

/* Neumorphic Effect */
.neumorphic {
  background: #f0f0f0;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 
    8px 8px 15px rgba(0,0,0,0.1),
    -8px -8px 15px rgba(255,255,255,0.5);
}

.neumorphic-button {
  background: #f0f0f0;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 
    5px 5px 10px rgba(0,0,0,0.1),
    -5px -5px 10px rgba(255,255,255,0.5);
  cursor: pointer;
  transition: all 0.3s ease;
}

.neumorphic-button:hover {
  box-shadow: 
    inset 5px 5px 10px rgba(0,0,0,0.1),
    inset -5px -5px 10px rgba(255,255,255,0.5);
}

/* Events Section */
.events-section {
  padding: 40px 20px;
  background: rgba(255, 255, 255, 0.1); /* Glassmorphism effect */
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

.register-button {
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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