<template>
  <div class="experience">
    <div class="experience-container">
      <div class="experience-header">
        <h2>Professional Experience</h2>
        <button class="add-button">+ Add Experience</button>
      </div>

      <div class="experience-list">
        <div class="experience-item" v-for="exp in experiences" :key="exp.id">
          <div class="experience-content">
            <h3>{{ exp.title }}</h3>
            <p class="company">{{ exp.company }}</p>
            <p class="description">{{ exp.description }}</p>
            <div class="skills">
              <span class="skill-tag" v-for="skill in exp.skills" :key="skill">{{ skill }}</span>
            </div>
          </div>
          <div class="experience-date">
            <p>{{ exp.date }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExperienceView',
  data() {
    return {
      experiences: [
        {
          id: 1,
          title: 'Software Engineering Intern',
          company: 'Tech Solutions Inc.',
          description: 'Developed and maintained web applications using Vue.js and Node.js',
          date: 'Jan 2024',
          skills: ['Vue.js', 'Node.js', 'Git']
        },
        {
          id: 2,
          title: 'Web Developer',
          company: 'Creative Agency',
          description: 'Created responsive websites for various clients',
          date: 'Mar 2024',
          skills: ['HTML', 'CSS', 'JavaScript']
        },
        {
          id: 3,
          title: 'Research Assistant',
          company: 'University Lab',
          description: 'Conducted research on machine learning algorithms',
          date: 'Feb 2024',
          skills: ['Python', 'TensorFlow', 'Data Analysis']
        },
        {
          id: 4,
          title: 'UI/UX Design Intern',
          company: 'Design Studio',
          description: 'Created user interfaces for mobile applications',
          date: 'Apr 2024',
          skills: ['Figma', 'Adobe XD', 'Prototyping']
        }
      ]
    };
  }
};
</script>

<style scoped>
.experience {
  padding: 20px;
}

.experience-container {
  max-width: 1200px;
  margin: 0 auto;
}

.experience-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.add-button {
  background-color: #41b883;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.add-button:hover {
  background-color: #3aa876;
}

.experience-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.experience-item {
  display: flex;
  justify-content: space-between;
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: transform 0.2s ease;
}

.experience-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.experience-content {
  flex: 1;
}

.experience-content h3 {
  margin: 0 0 5px 0;
  color: #2c3e50;
}

.company {
  color: #666;
  font-weight: 500;
  margin: 0 0 10px 0;
}

.description {
  color: #666;
  margin: 0 0 15px 0;
  line-height: 1.4;
}

.experience-date {
  min-width: 100px;
  text-align: right;
  color: #666;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background-color: #e8f5e9;
  color: #41b883;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.9em;
}
</style>