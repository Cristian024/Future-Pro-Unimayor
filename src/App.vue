<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

</script>

<template>
  <title>{{ name }}</title>
  <Header />
  <RouterView />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['name']),
    },
};
</script>

<style scoped></style>
