<script setup>
  import { onMounted, onUnmounted, ref } from 'vue';
  import { Demo } from '../js/Demo.js';
  import '../scss/Global.scss';

  const canvasRef = ref();
  const demo = new Demo();

  // Initialize app after canvas has been mounted
  onMounted(() => {
    // Replace canvas element
    canvasRef.value.replaceWith(demo.canvas);
  });
</script>

<template>
  <!-- Render page component using Routes.js -->
  <div class="page">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<style lang="scss" scoped>

</style>