<template>
  <div class="profile-page">
    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>

    <!-- Main Profile Section -->
    <div class="profile-container">
      <!-- Profile Header -->
      <section class="profile-header glass-morphism" data-scroll>
        <div class="profile-avatar-wrapper">
          <div class="profile-avatar">
            <span class="avatar-text">MK</span>
            <div class="status-indicator"></div>
          </div>
          <div class="level-badge">
            <span class="level">Level 12</span>
            <div class="progress-ring">
              <svg viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" 
                      fill="none" stroke="#41b883" stroke-width="2" stroke-dasharray="75, 100"/>
              </svg>
            </div>
          </div>
        </div>
        
        <div class="profile-info">
          <h1>Mike Kobe</h1>
          <p class="title">Computer Science Major</p>
          <p class="graduation">Class of 2024</p>
        </div>

        <div class="achievement-badges">
          <div class="badge" v-for="(badge, index) in badges" :key="index"
               :style="{ '--delay': `${index * 0.2}s` }">
            <i :class="badge.icon"></i>
            <span class="badge-tooltip">{{ badge.name }}</span>
          </div>
        </div>
      </section>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card glass-morphism" v-for="stat in stats" :key="stat.label"
             :class="{ 'highlight': stat.highlight }">
          <div class="stat-icon">
            <i :class="stat.icon"></i>
          </div>
          <div class="stat-info">
            <h3>{{ stat.value }}</h3>
            <p>{{ stat.label }}</p>
          </div>
          <svg class="stat-wave" viewBox="0 0 100 25">
            <path :d="stat.wavePath" fill="rgba(65, 184, 131, 0.2)"/>
          </svg>
        </div>
      </div>

      <!-- Career Progress -->
      <section class="career-progress glass-morphism" data-scroll>
        <h2>Career Progress</h2>
        <div class="progress-timeline">
          <div class="milestone" v-for="milestone in milestones" :key="milestone.id"
               :class="{ 'completed': milestone.completed }">
            <div class="milestone-dot"></div>
            <div class="milestone-content">
              <h4>{{ milestone.title }}</h4>
              <p>{{ milestone.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Skills Matrix -->
      <section class="skills-matrix glass-morphism" data-scroll>
        <h2>Skills & Expertise</h2>
        <div class="skills-grid">
          <div class="skill-card" v-for="skill in skills" :key="skill.name"
               :style="{ '--progress': skill.level + '%' }">
            <div class="skill-info">
              <h4>{{ skill.name }}</h4>
              <span class="skill-level">{{ skill.level }}%</span>
            </div>
            <div class="skill-bar">
              <div class="skill-progress"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- Action Buttons -->
      <div class="action-buttons">
        <button class="action-btn edit-btn" @click="editProfile">
          <i class="fas fa-edit"></i>
          Edit Profile
        </button>
        <button class="action-btn logout-btn" @click="logout">
          <i class="fas fa-sign-out-alt"></i>
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileView',
  data() {
    return {
      badges: [
        { name: 'Resume Master', icon: 'fas fa-file-alt' },
        { name: 'Interview Pro', icon: 'fas fa-comments' },
        { name: 'Network Builder', icon: 'fas fa-network-wired' },
        { name: 'Skills Champion', icon: 'fas fa-award' }
      ],
      stats: [
        { 
          label: 'Total Points', 
          value: '850',
          icon: 'fas fa-star',
          highlight: true,
          wavePath: 'M 0 20 Q 25 5, 50 20 T 100 20 V 25 H 0 Z'
        },
        { 
          label: 'Events Attended', 
          value: '12',
          icon: 'fas fa-calendar-check',
          wavePath: 'M 0 15 Q 25 25, 50 15 T 100 15 V 25 H 0 Z'
        },
        { 
          label: 'Tasks Completed', 
          value: '24',
          icon: 'fas fa-tasks',
          wavePath: 'M 0 20 Q 25 15, 50 20 T 100 20 V 25 H 0 Z'
        }
      ],
      milestones: [
        {
          id: 1,
          title: 'Resume Completion',
          description: 'Created and refined professional resume',
          completed: true
        },
        {
          id: 2,
          title: 'Mock Interview',
          description: 'Completed 3 practice interviews',
          completed: true
        },
        {
          id: 3,
          title: 'Career Fair',
          description: 'Attend upcoming spring career fair',
          completed: false
        }
      ],
      skills: [
        { name: 'Leadership', level: 85 },
        { name: 'Communication', level: 90 },
        { name: 'Problem Solving', level: 88 },
        { name: 'Team Work', level: 92 },
        { name: 'Technical Skills', level: 87 },
        { name: 'Project Management', level: 80 }
      ]
    };
  },
  methods: {
    editProfile() {
      console.log('Edit profile clicked');
    },
    logout() {
      this.$emit('logout');
      this.$router.push('/');
    }
  },
  mounted() {
    // Initialize any animations or interactions
  }
};
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #0a0a0a;
  color: white;
  position: relative;
  overflow: hidden;
}

/* Animated Background */
.animated-bg {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  overflow: hidden;
}

.gradient-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(60px);
  opacity: 0.5;
  animation: float 20s infinite ease-in-out;
}

.gradient-sphere:nth-child(1) {
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, #41b883 0%, transparent 70%);
  top: -200px;
  left: -200px;
  animation-delay: -5s;
}

.gradient-sphere:nth-child(2) {
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, #3aa876 0%, transparent 70%);
  bottom: -150px;
  right: -150px;
  animation-delay: -10s;
}

.gradient-sphere:nth-child(3) {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, #2c3e50 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -15s;
}

@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(50px, 50px); }
  50% { transform: translate(0, 100px); }
  75% { transform: translate(-50px, 50px); }
}

.profile-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

/* Glass Morphism Effect */
.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  margin-bottom: 2rem;
}

/* Profile Header */
.profile-header {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
}

.profile-avatar-wrapper {
  position: relative;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  background: linear-gradient(145deg, #41b883, #3aa876);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.avatar-text {
  font-size: 2.5em;
  font-weight: bold;
  color: white;
}

.status-indicator {
  position: absolute;
  bottom: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background: #4CAF50;
  border-radius: 50%;
  border: 3px solid rgba(255, 255, 255, 0.2);
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(76, 175, 80, 0); }
  100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
}

.level-badge {
  position: absolute;
  top: -10px;
  right: -10px;
  background: #2c3e50;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.level {
  font-size: 0.8em;
  font-weight: bold;
}

.progress-ring {
  position: absolute;
  width: 100%;
  height: 100%;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  position: relative;
  padding: 1.5rem;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
}

.stat-icon {
  font-size: 1.5em;
  color: #41b883;
  margin-bottom: 1rem;
}

.stat-info h3 {
  font-size: 2em;
  margin: 0;
  color: #41b883;
}

.stat-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 25px;
}

/* Career Progress */
.career-progress {
  margin-bottom: 2rem;
}

.progress-timeline {
  position: relative;
  padding: 2rem 0;
}

.progress-timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 2px;
  height: 100%;
  background: rgba(65, 184, 131, 0.3);
}

.milestone {
  position: relative;
  padding-left: 2rem;
  margin-bottom: 2rem;
}

.milestone-dot {
  position: absolute;
  left: -5px;
  top: 0;
  width: 12px;
  height: 12px;
  background: #41b883;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.milestone.completed .milestone-dot {
  background: #4CAF50;
}

.milestone:hover .milestone-dot {
  transform: scale(1.5);
}

/* Skills Matrix */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.skill-card {
  --progress: 0%;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}

.skill-info {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.skill-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  width: var(--progress);
  background: #41b883;
  border-radius: 3px;
  transition: width 1s ease;
}

/* Action Buttons */
.action-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.action-btn {
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.edit-btn {
  background: #41b883;
  color: white;
}

.logout-btn {
  background: #e74c3c;
  color: white;
}

.action-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .profile-header {
    grid-template-columns: 1fr;
    text-align: center;
  }

  .profile-avatar-wrapper {
    justify-self: center;
  }

  .achievement-badges {
    justify-content: center;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .action-buttons {
    flex-direction: column;
  }
}
</style>