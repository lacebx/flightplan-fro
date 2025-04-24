<template>
  <div class="leaderboard-page">
    <!-- Overview Section: Personal Performance -->
<!-- Animated Background -->
<div class="animated-bg">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>
    <!-- Flex container for Leaderboard and Percentile Metrics -->
    <div class="flex-container">
      <!-- Leaderboard Section: Top 10 -->
      <section class="leaderboard-section glass-morphism">
        <h2>LEADERBOARD</h2>
        <ul class="leaderboard-list">
          <li class="leaderboard-header">
            <span class="name-header">Name</span>
            <span class="xp-header">XP</span>
          </li>
          <li v-for="(entry, index) in leaderboard" :key="entry.id">
            <span class="rank">{{ index + 1 }}</span>
            <img :src="entry.avatar" alt="Avatar" class="leaderboard-avatar"/>
            <span class="name">{{ entry.name }}</span>
            <span class="xp">{{ entry.xp.toLocaleString() }}</span>
          </li>
        </ul>
      </section>

      <!-- New Card: Percentile Metrics -->
      <section class="percentile-metrics glass-morphism">
        <div class="metrics-header">
          <h2>Performance Analytics</h2>
          <p class="subtitle">Your progress insights and achievements</p>
        </div>

        <div class="metrics-content">
          <!-- Performance Overview -->
          <div class="performance-overview">
            <div class="rank-card">
              <div class="rank-indicator">
                <i class="fas fa-crown"></i>
                <span class="rank-label">Current Rank</span>
                <span class="rank-value">Diamond</span>
              </div>
              <div class="progress-bar">
                <div class="progress" :style="{ width: '75%' }"></div>
              </div>
              <span class="progress-text">75% to next rank</span>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
              <div class="stat-item">
                <i class="fas fa-chart-line"></i>
                <div class="stat-details">
                  <span class="stat-value">95th</span>
                  <span class="stat-label">Percentile</span>
                </div>
              </div>
              <div class="stat-item">
                <i class="fas fa-trophy"></i>
                <div class="stat-details">
                  <span class="stat-value">Top 5%</span>
                  <span class="stat-label">Overall</span>
                </div>
              </div>
              <div class="stat-item">
                <i class="fas fa-star"></i>
                <div class="stat-details">
                  <span class="stat-value">500</span>
                  <span class="stat-label">XP to Next</span>
                </div>
              </div>
              <div class="stat-item">
                <i class="fas fa-tasks"></i>
                <div class="stat-details">
                  <span class="stat-value">23</span>
                  <span class="stat-label">Tasks Done</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Timeline -->
          <div class="activity-timeline">
            <h3>Recent Activity</h3>
            <div class="timeline">
              <div class="timeline-item" v-for="(activity, index) in recentActivities" :key="index">
                <div class="timeline-icon">
                  <i :class="activity.icon"></i>
                </div>
                <div class="timeline-content">
                  <h4>{{ activity.title }}</h4>
                  <p>{{ activity.description }}</p>
                  <span class="timeline-date">{{ activity.date }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Earnable Badges Section -->
    <section class="badges-section glass-morphism">
      <h2>EARNABLE BADGES</h2>
      <div class="badges-grid">
        <div class="badge" v-for="badge in earnableBadges" :key="badge.id">
          <img :src="badge.icon" alt="Badge" class="badge-image"/>
          <div class="badge-info">
            <span class="badge-name">{{ badge.name }}</span>
            <span class="badge-progress">{{ badge.progress }}%</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import ActivityChart from './ActivityChart.vue';
import axios from 'axios';

export default {
  name: "LeaderboardView",
  components: {
    ActivityChart
  },
  data() {
    return {
      user: {
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocIh5fG54ltKXN56NmPbuxk4Z-fIIdEiHhlFffB-wpJ0jakZ4_CX=s96-c",
        xp: 12350,
        tasksCompleted: 23,
        eventsAttended: 12,
        percentile: 25
      },
      leaderboard: [
        { id: 1, name: "Emma Johnson", avatar: require('@/assets/girl1.jpeg'), xp: 15200 },
        { id: 2, name: "William Brown", avatar: require('@/assets/boy1.jpg'), xp: 14750 },
        { id: 3, name: "Olivia Davis", avatar: require('@/assets/girl2.jpeg'), xp: 14100 },
        { id: 4, name: "Liam Wilson", avatar: require('@/assets/boy2.jpeg'), xp: 13800 },
        { id: 5, name: "Sophia Martinez", avatar: require('@/assets/girl3.jpeg'), xp: 13500 },
        { id: 6, name: "James Anderson", avatar: require('@/assets/boy3.jpg'), xp: 12950 },
        { id: 7, name: "Isabella Taylor", avatar: require('@/assets/girl4.jpg'), xp: 12700 },
        { id: 8, name: "Benjamin Thomas", avatar: require('@/assets/boy4.jpg'), xp: 12400 },
        { id: 9, name: "Mia White", avatar: require('@/assets/girl5.jpeg'), xp: 12150 },
        { id: 10, name: "Ethan Harris", avatar: require('@/assets/boy5.jpg'), xp: 11900 }
      ],
      earnableBadges: [
        { id: 1, name: "Achiever", icon: require('@/assets/Media/Badges/YOLO/PNG/YOLO_Badge.png'), progress: 75 },
        { id: 2, name: "Hustler", icon: require('@/assets/Media/Badges/Star-Struck/PNG/StarStruck_Gold.png'), progress: 40 },
        { id: 3, name: "Scholar", icon: require('@/assets/Media/Badges/Pull-Shark/GIF/PullShark_Animated.gif'), progress: 0 }
      ],
      chartData: [
        {
          labels: ['XP', 'Tasks', 'Events'],
          datasets: [
            {
              data: [12350, 23, 12],
              backgroundColor: ['#41b883', '#ff6384', '#36a2eb']
            }
          ]
        }
      ],
      activityData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: []
          }
        ]
      },
      recentActivities: [
        {
          icon: 'fas fa-award',
          title: 'Achievement Unlocked',
          description: 'Earned "Code Master" badge',
          date: '2 hours ago'
        },
        {
          icon: 'fas fa-tasks',
          title: 'Task Completed',
          description: 'Finished "Advanced JavaScript" module',
          date: 'Yesterday'
        },
        {
          icon: 'fas fa-users',
          title: 'Event Participation',
          description: 'Attended "Tech Talk: AI in Modern World"',
          date: '3 days ago'
        }
      ]
    };
  },
  computed: {
    // Calculate rotation for the gauge based on the user's percentile (100% = 360deg)
    gaugeRotation() {
      return (this.user.percentile / 100) * 360;
    }
  },
  methods: {
    // Helper method to generate last 7 days for labels
    getLastSevenDays() {
      const days = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push(date.toLocaleDateString('en-US', { weekday: 'short' }));
      }
      return days;
    },
    async fetchActivityData() {
      try {
        const response = await axios.get('your-api-endpoint/activity-data');
        this.activityData.datasets[0].data = response.data.points;
        this.activityData.labels = response.data.dates;
      } catch (error) {
        console.error('Error fetching activity data:', error);
        // Use default data if API call fails
        this.activityData.labels = this.getLastSevenDays();
      }
    }
  },
  mounted() {
    this.activityData.labels = this.getLastSevenDays();
    this.fetchActivityData();
  }
};
</script>

<style scoped>
.leaderboard-page {
  padding: 2rem;
  background: #0a0a0a;
  color: white;
  min-height: 100vh;
}

/* Flex container for Leaderboard and Percentile Metrics */
.flex-container {
  display: flex;
  gap: 2rem;
}

/* Glass Morphism Base */
.glass-morphism {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 1.5rem;
  margin-bottom: 2rem;
  flex: 1;
}

/* Overview Section */
.overview-section h2 {
  margin-bottom: 1rem;
  font-size: 2em;
  text-align: center;
}

.personal-stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat .label {
  font-size: 0.9em;
  color: #aaa;
}

.stat .value {
  font-size: 1.5em;
  font-weight: bold;
}

.gauge {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  /* Use conic-gradient with CSS variable --rotate for progress */
  background: conic-gradient(#41b883 var(--rotate), transparent var(--rotate));
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1rem;
  transition: background 0.5s ease;
}

.gauge-cover {
  width: 80%;
  height: 80%;
  border-radius: 50%;
  background: #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  font-weight: bold;
}

/* Leaderboard Section */
.leaderboard-section h2 {
  margin-bottom: 1rem;
  font-size: 1.8em;
  text-align: center;
}

.leaderboard-list {
  list-style: none;
  padding: 0;
}

.leaderboard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: bold;
  padding: 0.8rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.2);
}

.leaderboard-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  padding: 0.8rem 0;
}

.rank {
  font-size: 1.2em;
  width: 30px;
  text-align: center;
}

.avatar-header, .name-header {
  flex: 1;
  text-align: left;
}

.xp-header {
  flex: 1;
  text-align: right;
}

.leaderboard-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 1rem;
}

.name {
  flex: 1;
  font-weight: bold;
  font-size: 1em;
}

.xp {
  font-size: 1em;
}

/* Earnable Badges Section */
.badges-section h2 {
  margin-bottom: 1rem;
  font-size: 1.8em;
  text-align: center;
}

.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
}

.badge-image {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 0.5rem;
}

.badge-info {
  text-align: center;
}

.badge-name {
  font-size: 1em;
  font-weight: bold;
}

.badge-progress {
  font-size: 0.9em;
  color: #aaa;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
  .stats {
    flex-direction: column;
  }
  .leaderboard-list li {
    flex-direction: column;
    align-items: flex-start;
  }
  .xp {
    margin-top: 0.5rem;
  }
}

.percentile-metrics {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.metrics-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
}

.metrics {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.metric {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.metric .label {
  font-size: 0.9em;
  color: #aaa;
}

.metric .value {
  font-size: 1.2em;
  font-weight: bold;
}

.activity-graph {
  margin-top: 1rem;
  height: 200px;
  width: 100%;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;
}

/* Enhanced Percentile Metrics Styles */
.metrics-header {
  text-align: center;
  margin-bottom: 2rem;
}

.metrics-header h2 {
  font-size: 2em;
  color: #41b883;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #888;
  font-size: 1rem;
}

.performance-overview {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
}

.rank-card {
  background: rgba(65, 184, 131, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
}

.rank-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.rank-indicator i {
  font-size: 2.5rem;
  color: #ffd700;
}

.rank-label {
  color: #888;
  font-size: 0.9rem;
}

.rank-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #41b883;
}

.progress-bar {
  height: 8px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 1rem 0;
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #41b883, #3aa876);
  border-radius: 4px;
  transition: width 0.3s ease;
}

.progress-text {
  color: #888;
  font-size: 0.9rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.stat-item {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: transform 0.3s ease;
}

.stat-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 255, 255, 0.08);
}

.stat-item i {
  font-size: 1.5rem;
  color: #41b883;
}

.stat-details {
  display: flex;
  flex-direction: column;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.stat-label {
  font-size: 0.8rem;
  color: #888;
}

.activity-timeline {
  margin-top: 2rem;
}

.activity-timeline h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #41b883;
}

.timeline {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  position: relative;
}

.timeline-icon {
  width: 40px;
  height: 40px;
  background: rgba(65, 184, 131, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.timeline-icon i {
  color: #41b883;
  font-size: 1.2rem;
}

.timeline-content {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 1rem;
  flex-grow: 1;
}

.timeline-content h4 {
  margin: 0 0 0.5rem 0;
  color: white;
}

.timeline-content p {
  margin: 0;
  color: #888;
  font-size: 0.9rem;
}

.timeline-date {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: #666;
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .timeline-item {
    flex-direction: column;
  }

  .timeline-icon {
    margin-bottom: 0.5rem;
  }
}
</style>