<template>
  <div class="home">
    <div class="hero-section">
      <video autoplay loop muted playsinline class="hero-video">
        <source src="https://dlegner52rpsg.cloudfront.net/hero_video.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay">
        <h1>Oklahoma Christian University</h1>
        <p>Transforming Lives for Christian Faith, Scholarship, and Service</p>
      </div>
    </div>

    <div class="grid-container">
      <div class="box green">
        <span class="icon">A</span>
        <h3>Career Development</h3>
        <p>Build your professional future with OC's career services and resources</p>
      </div>
      <div class="box red">
        <h3>Upcoming Events</h3>
        <p>Join our career fairs, workshops, and networking opportunities</p>
      </div>
      <div class="box blue">
        <h3>Quick Links</h3>
        <ul>
          <li>Career Resources</li>
          <li>Job Board</li>
          <li>Schedule Appointment</li>
          <li>Resume Templates</li>
        </ul>
      </div>
      <div class="box orange">
        <h3>OC Career Success</h3>
        <p>96% of OC graduates are employed or in graduate school within 6 months of graduation</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
};
</script>

<style scoped>
.home {
  padding: 0;
}

.hero-section {
  position: relative;
  height: 60vh;
  overflow: hidden;
  margin-bottom: 40px;
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
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  padding: 20px;
  z-index: 1;
}

.hero-overlay h1 {
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.hero-overlay p {
  font-size: 1.5em;
  max-width: 800px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 200px);
  gap: 20px;
  margin: 20px;
  padding: 0 20px;
}

.box {
  border-radius: 8px;
  padding: 20px;
  color: white;
  display: flex;
  flex-direction: column;
  position: relative;
  transition: transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.box:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.box h3 {
  margin: 0 0 10px 0;
  font-size: 1.4em;
}

.box p {
  margin: 0;
  line-height: 1.4;
}

.green {
  background-color: #32cd32;
  grid-column: span 1;
}

.red {
  background-color: #b22222;
  grid-column: span 1;
}

.blue {
  background-color: #0000cd;
  grid-row: span 2;
}

.blue ul {
  list-style: none;
  padding: 0;
  margin: 10px 0 0 0;
}

.blue ul li {
  margin: 10px 0;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.blue ul li:hover {
  opacity: 0.8;
}

.orange {
  background-color: #ff8c00;
  grid-column: span 2;
}

.icon {
  background-color: white;
  color: #1e90ff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  left: 10px;
  font-weight: bold;
}

@media (max-width: 768px) {
  .grid-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }

  .blue, .orange {
    grid-column: span 1;
    grid-row: span 1;
  }

  .hero-overlay h1 {
    font-size: 2em;
  }

  .hero-overlay p {
    font-size: 1.2em;
  }
}
</style> 