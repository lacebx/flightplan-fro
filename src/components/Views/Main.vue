<template>
  <div class="home">
    <div class="grid-container">
      <div class="box green">
        <span class="icon">A</span>
      </div>
      <div class="box red"></div>
      <div class="box blue"></div>
      <div class="box orange"></div>
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
  padding: 20px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
}

.box {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  border-radius: 5px;
}

.green {
  background-color: #32cd32;
  position: relative;
}

.red {
  background-color: #b22222;
}

.blue {
  background-color: #0000cd;
  grid-row: span 2;
}

.orange {
  background-color: #ff8c00;
  grid-column: span 3;
}

.icon {
  background-color: white;
  color: #1e90ff;
  border-radius: 50%;
  padding: 5px;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
