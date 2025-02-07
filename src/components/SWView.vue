<template>
  <div class="sw">
    <div class="sw-container">
      <div class="info-section">
        <h2>Strengths & Weaknesses Assessment</h2>
        <div class="description">
          <p>The Clifton Strengths assessment helps you discover your unique combination of talents. 
             Understanding your strengths can help you perform better in your career and daily life.</p>
        </div>
      </div>

      <div class="test-section">
        <div class="test-info">
          <h3>Take the Assessment</h3>
          <p>Duration: ~45 minutes</p>
          <p>Get detailed insights about your top strengths</p>
          <a href="#" class="test-link">Start Assessment</a>
        </div>
      </div>

      <div class="results-section">
        <h3>Your Results</h3>
        <div class="strengths-grid">
          <div class="strength-item">
            <span class="strength-icon">1</span>
            <p>Strategic Thinking</p>
          </div>
          <div class="strength-item">
            <span class="strength-icon">2</span>
            <p>Relationship Building</p>
          </div>
          <div class="strength-item">
            <span class="strength-icon">3</span>
            <p>Executing</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SWView',
};
</script>

<style scoped>
.sw {
  padding: 20px;
}

.sw-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.info-section, .test-section, .results-section {
  background-color: #f5f5f5;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.info-section h2 {
  color: #2c3e50;
  margin-bottom: 15px;
}

.description {
  color: #666;
  line-height: 1.6;
}

.test-section {
  background-color: #41b883;
  color: white;
}

.test-info {
  text-align: center;
}

.test-info h3 {
  margin-bottom: 15px;
}

.test-info p {
  margin: 10px 0;
}

.test-link {
  display: inline-block;
  background-color: white;
  color: #41b883;
  padding: 12px 24px;
  border-radius: 25px;
  text-decoration: none;
  margin-top: 15px;
  font-weight: bold;
  transition: transform 0.2s ease;
}

.test-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.strengths-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.strength-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.strength-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.strength-icon {
  background-color: #41b883;
  color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.strength-item p {
  margin: 0;
  color: #2c3e50;
  font-weight: 500;
}
</style>