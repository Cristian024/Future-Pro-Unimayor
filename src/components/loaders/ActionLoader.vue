<script setup>
defineProps({
  message: {
    type: String,
    required: true
  },
  show:{
    type: Boolean,
    required: true
  }
})
</script>

<template>
    <div class="loader-container" v-show="show">
        <h2><b>{{ message }}</b></h2>
    </div>
</template>

<style>
    .loader-container{
        position: fixed;
        top: 0;
        z-index: 1000;
        background-color: var(--action-loader-background);
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>