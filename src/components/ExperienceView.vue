<template>
  <div class="experience-page">
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

      <!-- Experience Cards -->
      <div class="experience-grid">
        <div class="experience-card" 
             v-for="exp in experiences" 
             :key="exp.id"
             :class="{ 'highlight': exp.highlight }"
             @mouseenter="highlightCard(exp.id)"
             @mouseleave="removeHighlight(exp.id)">
          <div class="card-inner">
            <div class="card-front">
              <h3>{{ exp.title }}</h3>
              <div class="company-logo">{{ getCompanyInitials(exp.company) }}</div>
            </div>
            <div class="card-back">
              <h4>{{ exp.company }}</h4>
              <p>{{ exp.description }}</p>
              <div class="skills-wrapper">
                <span class="skill-pill" v-for="skill in exp.skills" :key="skill">
                  {{ skill }}
                </span>
              </div>
              <span class="date-chip">{{ exp.date }}</span>
            </div>
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
export default {
  name: 'ExperienceView',
  data() {
    return {
      totalYears: '2+',
      totalSkills: '12',
      totalProjects: '15',
      experiences: [
        {
          id: 1,
          title: 'Software Engineering Intern',
          company: 'Tech Solutions Inc.',
          description: 'Developed and maintained web applications using Vue.js and Node.js.',
          date: 'Jan 2024',
          skills: ['Vue.js', 'Node.js', 'Git'],
          highlight: false
        },
        {
          id: 2,
          title: 'Web Developer',
          company: 'Creative Agency',
          description: 'Created responsive websites for various clients.',
          date: 'Mar 2024',
          skills: ['HTML', 'CSS', 'JavaScript'],
          highlight: false
        },
        {
          id: 3,
          title: 'Research Assistant',
          company: 'University Lab',
          description: 'Conducted research on machine learning algorithms.',
          date: 'Feb 2024',
          skills: ['Python', 'TensorFlow', 'Data Analysis'],
          highlight: false
        }
      ]
    };
  },
  methods: {
    getCompanyInitials(company) {
      return company.split(' ').map(word => word[0]).join('');
    },
    highlightCard(id) {
      this.experiences = this.experiences.map(exp => ({
        ...exp,
        highlight: exp.id === id
      }));
    },
    removeHighlight() {
      this.experiences = this.experiences.map(exp => ({
        ...exp,
        highlight: false
      }));
    },
    showAddExperience() {
      // Implement add experience functionality
      console.log('Add experience clicked');
    }
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.experience-card {
  height: 300px;
  perspective: 1000px;
}

.card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.8s;
}

.experience-card:hover .card-inner {
  transform: rotateY(180deg);
}

.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 15px;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(65, 184, 131, 0.2);
}

.card-front {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.card-back {
  transform: rotateY(180deg);
  overflow: auto;
}

.company-logo {
  width: 80px;
  height: 80px;
  background: #41b883;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  font-weight: bold;
}

.skills-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
}

.skill-pill {
  background: rgba(65, 184, 131, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
}

.date-chip {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: #41b883;
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  font-size: 0.8rem;
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