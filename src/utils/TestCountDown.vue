<script setup>
import { useCountDown } from './useCountDown'

const { formatTime, start } = useCountDown()

// Start a 60 second countdown when component mounts
onMounted(() => {
  start(60) // Start countdown from 60 seconds
})
</script>

<template>
  <div>
    <h2>Countdown Test</h2>
    <p>Time remaining: {{ formatTime }}</p>
  </div>
</template>

<style scoped>
div {
  text-align: center;
  padding: 20px;
}

h2 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  font-size: 2rem;
  font-weight: bold;
}
</style>
