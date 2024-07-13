<script setup>
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

var user = ref({});
var session = ref({});

const store = useStore();

onMounted(async () => {
    user.value = computed(() => store.getters.user).value
    session.value = computed(() => store.getters.session).value
    console.log(session.value);
})

</script>

<template>
    <div class="home-container">
        <section>
            <div class="profile-resume">
                <img id="profile-image">
                <h2 id="profile-name"></h2>
            </div>
        </section>
        <section></section>
        <section></section>
    </div>
</template>

<style></style>