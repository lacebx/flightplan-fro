<template>
  <div class="experience-page">
    <!-- Reuse the floating spheres background -->
    <div class="animated-bg">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>
    
    <!-- 3D Hero Section -->
    <div class="hero-3d">
      <div class="cube-container">
        <div class="cube">
          <div class="cube-face front">Experience</div>
          <div class="cube-face back">Journey</div>
          <div class="cube-face right">Skills</div>
          <div class="cube-face left">Growth</div>
          <div class="cube-face top">Career</div>
          <div class="cube-face bottom">Path</div>
        </div>
      </div>
      <h1 class="hero-title">Professional Journey</h1>
    </div>

    <div class="content-wrapper">
      <!-- Floating Stats -->
      <div class="floating-stats" data-scroll>
        <div class="stat-bubble">
          <span class="stat-value">{{ totalYears }}</span>
          <span class="stat-label">Years</span>
        </div>
        <div class="stat-bubble">
          <span class="stat-value">{{ totalSkills }}</span>
          <span class="stat-label">Skills</span>
        </div>
        <div class="stat-bubble">
          <span class="stat-value">{{ totalProjects }}</span>
          <span class="stat-label">Projects</span>
        </div>
      </div>

      <!-- Experience Cards (Static info now on a single side) -->
      <div class="experience-grid">
        <div class="experience-card" 
             v-for="exp in experiences" 
             :key="exp.experienceid">
          <div class="card-content">
            <h3>{{ exp.name }}</h3>
            <p><strong>Category:</strong> {{ exp.category }}</p>
            <p><strong>Type:</strong> {{ exp.type }}</p>
            <p>{{ exp.description }}</p>
            <p><strong>Points Earned:</strong> {{ exp.pointsearned }}</p>
            <p><strong>Start Date:</strong> {{ formatDate(exp.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Add Experience Button -->
      <button class="add-experience-btn" @click="showAddExperience">
        <span class="btn-content">
          <span class="plus">+</span>
          <span class="text">Add Experience</span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'ExperienceView',
  data() {
    return {
      totalYears: '2+',
      totalSkills: '12',
      totalProjects: '15',
      experiences: []
    };
  },
  methods: {
    showAddExperience() {
      console.log('Add experience clicked');
    },
    fetchExperiences() {
      axios.get('http://localhost:8082/api/experiences', { withCredentials: true })
        .then(response => {
          this.experiences = response.data;
        })
        .catch(error => {
          console.error('Error fetching experiences:', error);
        });
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  },
  mounted() {
    this.fetchExperiences();
    // Initialize scroll animations if needed...
  }
};
</script>

<style scoped>
.experience-page {
  min-height: 100vh;
  background: #1a1a1a;
  color: white;
  overflow-x: hidden;
}

/* 3D Hero Section */
.hero-3d {
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  perspective: 1000px;
}

.cube-container {
  width: 200px;
  height: 200px;
  position: relative;
  transform-style: preserve-3d;
  animation: rotate 20s infinite linear;
}

.cube {
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
}

.cube-face {
  position: absolute;
  width: 200px;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  background: rgba(65, 184, 131, 0.1);
  border: 2px solid #41b883;
  backdrop-filter: blur(5px);
}

.front  { transform: rotateY(0deg) translateZ(100px); }
.back   { transform: rotateY(180deg) translateZ(100px); }
.right  { transform: rotateY(90deg) translateZ(100px); }
.left   { transform: rotateY(-90deg) translateZ(100px); }
.top    { transform: rotateX(90deg) translateZ(100px); }
.bottom { transform: rotateX(-90deg) translateZ(100px); }

@keyframes rotate {
  from { transform: rotateX(-20deg) rotateY(0deg); }
  to { transform: rotateX(-20deg) rotateY(360deg); }
}

.hero-title {
  position: absolute;
  font-size: 4rem;
  text-shadow: 0 0 10px rgba(65, 184, 131, 0.5);
}

/* Floating Stats */
.floating-stats {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin: -50px 0 50px;
}

.stat-bubble {
  background: linear-gradient(145deg, #41b883, #3aa876);
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 10px 20px rgba(65, 184, 131, 0.2);
  animation: float 3s ease-in-out infinite;
}

.stat-bubble:nth-child(2) { animation-delay: 0.2s; }
.stat-bubble:nth-child(3) { animation-delay: 0.4s; }

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

.stat-value {
  font-size: 2em;
  font-weight: bold;
}

.stat-label {
  font-size: 0.9em;
  opacity: 0.8;
}

/* Experience Grid */
.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2.5rem; /* Increased gap for extra spacing between cards */
  padding: 2rem;
}

.experience-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(65, 184, 131, 0.2);
  border-radius: 15px;
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.experience-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* Add Experience Button */
.add-experience-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background: #41b883;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  transition: all 0.3s ease;
  overflow: hidden;
}

.add-experience-btn:hover {
  width: 200px;
  border-radius: 30px;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 200px;
  color: white;
}

.plus {
  font-size: 2em;
  margin-right: 10px;
}

.text {
  display: none;
}

.add-experience-btn:hover .text {
  display: inline;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .floating-stats {
    flex-direction: column;
    align-items: center;
  }
  .stat-bubble {
    width: 100px;
    height: 100px;
  }
}
</style>
