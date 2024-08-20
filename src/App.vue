<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import PageLoader from '@/components/loaders/PageLoader.vue'
</script>

<template>
  <title>{{ name }}</title>
  <Header />
  <PageLoader />
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
