<template>
  <div class="experience-page">
    <!-- Reuse the floating spheres background -->
    <div class="animated-bg">
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere"></div>
    </div>
    
    <!-- Centered Hero Title -->
    <h1 class="hero-title">Professional Journey</h1>

    <div class="content-wrapper">
      <!-- Experience Cards -->
      <div class="experience-grid">
        <div class="experience-card" 
             v-for="exp in experiences" 
             :key="exp.experienceid">
          <div class="card-content">
            <div class="card-header">
              <span class="category-badge" :class="exp.category.toLowerCase()">
                {{ exp.category }}
              </span>
              <span class="date-badge">
                {{ formatDate(exp.createdAt) }}
              </span>
            </div>
            <h3 class="experience-name">{{ exp.name }}</h3>
            <p class="description">{{ exp.description }}</p>
          </div>
        </div>
      </div>

      <!-- Add Experience Button -->
      <button class="add-experience-btn" @click="showAddExperience">
        <i class="fas fa-plus"></i>
      </button>

      <!-- Add Experience Modal -->
      <div class="modal" v-if="showModal">
        <div class="modal-content glass-morphism">
          <h2>Add New Experience</h2>
          <form @submit.prevent="submitExperience">
            <div class="form-group">
              <label for="name">Experience Title</label>
              <input type="text" id="name" v-model="newExperience.name" required placeholder="Enter experience title">
            </div>
            
            <div class="form-group">
              <label for="category">Category</label>
              <select id="category" v-model="newExperience.category" required>
                <option value="Academic">Academic</option>
                <option value="Professional">Professional</option>
                <option value="Leadership">Leadership</option>
                <option value="Volunteer">Volunteer</option>
              </select>
            </div>

            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" v-model="newExperience.description" required 
                        placeholder="Describe your experience..."></textarea>
            </div>

            <div class="form-group">
              <label for="scheduling">Schedule Type</label>
              <select id="scheduling" v-model="newExperience.schedulingtype" required>
                <option value="Flexible">Flexible</option>
                <option value="Fixed">Fixed</option>
              </select>
            </div>

            <div class="form-group checkbox-group">
              <label>
                <input type="checkbox" v-model="newExperience.reflectionrequired">
                Requires Reflection
              </label>
            </div>

            <div class="modal-buttons">
              <button type="button" class="cancel-btn" @click="closeModal">Cancel</button>
              <button type="submit" class="submit-btn">Add Experience</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';


export default {
  name: 'ExperienceView',
  data() {
    return {
      totalYears: '3+',
      totalSkills: '13',
      totalProjects: '15',
      experiences: [],
      showModal: false,
      newExperience: {
        name: '',
        category: '',
        type: '',
        description: '',
        pointsearned: 0,
        reflectionrequired: false,
        schedulingtype: 'Flexible'
      }
    };
  },
  methods: {
    showAddExperience() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      // Reset form
      this.newExperience = {
        name: '',
        category: '',
        type: '',
        description: '',
        pointsearned: 0,
        reflectionrequired: false,
        schedulingtype: 'Flexible'
      };
    },
    async submitExperience() {
      try {
        const response = await axios.post('http://localhost:8082/api/experiences', this.newExperience, {
          withCredentials: true
        });
        // Add the new experience to the list
        this.experiences.push(response.data);
        this.closeModal();
        // You might want to add a success message here
      } catch (error) {
        console.error('Error creating experience:', error);
        // You might want to show an error message to the user
      }
     
      this.$router.push('/add-experience');

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
  padding: 2rem;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 300;
  text-align: center;
  margin: 2rem 0;
  color: #41b883;
}

.experience-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
  max-width: 1400px;
  margin: 0 auto;
}

.experience-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  border: 1px solid rgba(65, 184, 131, 0.1);
}

.experience-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(to right, #41b883, #3aa876);
  opacity: 0.7;
}

.experience-card.academic::before {
  background: linear-gradient(to right, #4CAF50, #41b883);
}

.experience-card.professional::before {
  background: linear-gradient(to right, #41b883, #2196F3);
}

.experience-card.leadership::before {
  background: linear-gradient(to right, #FF9800, #41b883);
}

.experience-card.volunteer::before {
  background: linear-gradient(to right, #E91E63, #41b883);
}

.experience-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 20px rgba(65, 184, 131, 0.15);
  border-color: rgba(65, 184, 131, 0.3);
  background: rgba(65, 184, 131, 0.05);
}

.card-content {
  padding: 1.2rem;
  position: relative;
  background: linear-gradient(
    180deg, 
    rgba(65, 184, 131, 0.05) 0%,
    rgba(26, 26, 26, 0) 100%
  );
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.category-badge {
  font-size: 0.75rem;
  padding: 0.3rem 0.8rem;
  border-radius: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Updated category badge colors with gradients */
.academic { 
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.1) 0%, rgba(65, 184, 131, 0.1) 100%);
  color: #4CAF50;
  border: 1px solid rgba(76, 175, 80, 0.2);
}

.professional { 
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.1) 0%, rgba(65, 184, 131, 0.1) 100%);
  color: #2196F3;
  border: 1px solid rgba(33, 150, 243, 0.2);
}

.leadership { 
  background: linear-gradient(135deg, rgba(255, 152, 0, 0.1) 0%, rgba(65, 184, 131, 0.1) 100%);
  color: #FF9800;
  border: 1px solid rgba(255, 152, 0, 0.2);
}

.volunteer { 
  background: linear-gradient(135deg, rgba(233, 30, 99, 0.1) 0%, rgba(65, 184, 131, 0.1) 100%);
  color: #E91E63;
  border: 1px solid rgba(233, 30, 99, 0.2);
}

.experience-name {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0.5rem 0;
  color: #fff;
  position: relative;
  display: inline-block;
}

.experience-name::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, #41b883, transparent);
  opacity: 0.3;
}

.description {
  font-size: 0.9rem;
  color: #bbb;
  line-height: 1.6;
  margin: 0.8rem 0 0;
  padding-left: 0.5rem;
  border-left: 2px solid rgba(65, 184, 131, 0.2);
}

.date-badge {
  font-size: 0.75rem;
  color: #41b883;
  background: rgba(65, 184, 131, 0.1);
  padding: 0.2rem 0.6rem;
  border-radius: 12px;
  border: 1px solid rgba(65, 184, 131, 0.2);
}

/* Update the add button with a gradient */
.add-experience-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background: linear-gradient(135deg, #41b883, #3aa876);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(65, 184, 131, 0.3);
}

.add-experience-btn:hover {
  transform: translateY(-2px) rotate(90deg);
  box-shadow: 0 6px 20px rgba(65, 184, 131, 0.4);
}

.add-experience-btn i {
  font-size: 1.2rem;
}

/* Modal Styles */
.modal-content {
  background: rgba(26, 26, 26, 0.95);
  border-radius: 16px;
  border: 1px solid rgba(65, 184, 131, 0.2);
  box-shadow: 0 8px 32px rgba(65, 184, 131, 0.1);
}

.modal-content h2 {
  font-size: 1.5rem;
  font-weight: 300;
  margin-bottom: 1.5rem;
  color: #41b883;
}

.form-group {
  margin-bottom: 1.2rem;
}

.form-group label {
  font-size: 0.9rem;
  color: #aaa;
  margin-bottom: 0.4rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 0.6rem;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #41b883;
  box-shadow: 0 0 0 2px rgba(65, 184, 131, 0.1);
}

.checkbox-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.checkbox-group input[type="checkbox"] {
  width: auto;
  margin-right: 0.5rem;
}

.modal-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-btn,
.cancel-btn {
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.submit-btn {
  background: linear-gradient(135deg, #41b883, #3aa876);
  color: white;
  border: none;
  box-shadow: 0 2px 8px rgba(65, 184, 131, 0.2);
}

.submit-btn:hover {
  background: linear-gradient(135deg, #3aa876, #41b883);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(65, 184, 131, 0.3);
}

.cancel-btn {
  background: transparent;
  border: 1px solid #666;
  color: #666;
}

.cancel-btn:hover {
  border-color: #888;
  color: #888;
}

@media (max-width: 768px) {
  .experience-grid {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }

  .hero-title {
    font-size: 2rem;
    margin: 1.5rem 0;
  }

  .experience-card {
    margin: 0 auto;
    max-width: 100%;
  }

  .modal-content {
    padding: 1.5rem;
    margin: 1rem;
  }
}
</style>
