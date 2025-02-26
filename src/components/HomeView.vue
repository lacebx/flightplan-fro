<template>
  <div class="home">
    <!-- Hero Video Section -->
    <section class="hero">
      <video autoplay loop muted playsinline class="hero-video">
        <source src="https://dlegner52rpsg.cloudfront.net/hero_video.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay">
        <h1>FLIGHT PLAN</h1>
        <p>Your Journey to Career Success Starts Here</p>
        <div class="hero-buttons">
          <button class="primary-btn">Start Your Journey</button>
          <button class="secondary-btn">Schedule Appointment</button>
        </div>
      </div>
    </section>

    <!-- Quick Links Grid -->
    <section class="quick-links">
      <div class="link-card">
        <i class="fas fa-file-alt"></i>
        <h3>Resume Building</h3>
        <p>Create a standout professional resume</p>
      </div>
      <div class="link-card">
        <i class="fas fa-handshake"></i>
        <h3>Mock Interviews</h3>
        <p>Practice and perfect your interview skills</p>
      </div>
      <div class="link-card">
        <i class="fas fa-briefcase"></i>
        <h3>Job Board</h3>
        <p>Find internships and job opportunities</p>
      </div>
      <div class="link-card">
        <i class="fas fa-chart-line"></i>
        <h3>Career Planning</h3>
        <p>Map your professional development</p>
      </div>
    </section>

    <!-- Featured Content -->
    <section class="featured-content">
      <div class="content-grid">
        <div class="feature-card large">
          <img src="career.jpg" alt="Career Success">
          <div class="card-content">
            <h2>Career Success</h2>
            <p>96% of OC graduates employed or in graduate school within 6 months</p>
            <a href="#" class="learn-more">Explore Resources →</a>
          </div>
        </div>
        <div class="feature-card">
          <img src="https://www.oc.edu/images/home/campus-life.jpg" alt="Networking">
          <div class="card-content">
            <h3>Networking Events</h3>
            <p>Connect with industry professionals</p>
          </div>
        </div>
        <div class="feature-card">
          <img src="https://www.oc.edu/images/home/athletics.jpg" alt="Career Development">
          <div class="card-content">
            <h3>Skills Development</h3>
            <p>Build your professional toolkit</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section">
      <div class="stat-item">
        <h2>500+</h2>
        <p>Partner Companies</p>
      </div>
      <div class="stat-item">
        <h2>1000+</h2>
        <p>Career Appointments</p>
      </div>
      <div class="stat-item">
        <h2>50+</h2>
        <p>Annual Workshops</p>
      </div>
      <div class="stat-item">
        <h2>96%</h2>
        <p>Career Placement Rate</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
};
</script>

<style scoped>
.home {
  overflow-x: hidden;
  background: #1a1a1a;
  color: white;
}

/* Hero Section */
.hero {
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  z-index: 0;
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
}

.hero-overlay h1 {
  font-size: 4rem;
  margin-bottom: 1rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-overlay p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.hero-buttons {
  display: flex;
  gap: 1rem;
}

.primary-btn, .secondary-btn {
  padding: 1rem 2rem;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
  text-transform: uppercase;
  background: #41b883;
  color: white;
}

.primary-btn:hover, .secondary-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

/* Quick Links */
.quick-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
}

.link-card {
  text-align: center;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.link-card:hover {
  transform: translateY(-5px);
}

.link-card i {
  font-size: 2.5rem;
  color: #862633;
  margin-bottom: 1rem;
}

/* Featured Content */
.featured-content {
  padding: 4rem 2rem;
  background: rgba(255, 255, 255, 0.1);
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  position: relative;
  overflow: hidden;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.feature-card.large {
  grid-column: span 2;
  height: 500px;
}

.feature-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.feature-card:hover img {
  transform: scale(1.05);
}

.card-content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  color: white;
}

/* Stats Section */
.stats-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  background: #41b883;
  color: white;
  text-align: center;
}

.stat-item h2 {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .hero-overlay h1 {
    font-size: 2.5rem;
  }

  .hero-buttons {
    flex-direction: column;
  }

  .content-grid {
    grid-template-columns: 1fr;
  }

  .feature-card.large {
    grid-column: span 1;
    height: 300px;
  }
}
</style> 