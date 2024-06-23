<script setup>
import { useRoute } from 'vue-router';
import { Button } from '../common/ui/button'
import ModeToggle from '../common/ui/mode-toggle/ModeToggle.vue'
import { executeInsert } from '@/services/api';
import { computed, watch, ref } from 'vue';

const route = useRoute()
const hiddenRoutes = ['/login'];

const shouldShowButtonLogin = ref(true)

const validateLogin = async () => {
    let validSession = false
    await executeInsert('validateSession', null).then(
        () => {
            validSession = true
        },
        () => {
            validSession = false
        }
    )
    return validSession
}

const updateShouldShowButtonLogin = async () => {
    const includesHidden = hiddenRoutes.includes(route.path)
    if (includesHidden) {
        shouldShowButtonLogin.value = false
    } else {
        const validSession = await validateLogin()

        if (validSession) {
            shouldShowButtonLogin.value = false
        } else {
            shouldShowButtonLogin.value = true;
        }
    }
}

watch(
    () => route.path,
    async () => {
        await updateShouldShowButtonLogin()
    },
    { immediate: true }
)

const navigate = (route) => {
    window.location = `../${route}`
}

</script>

<template>
    <header>
        <div class="logo-container"></div>
        <div class="buttons-container">
            <Button class="roboto-regular" v-if="shouldShowButtonLogin" v-on:click="navigate('login')">Ingresa</Button>
            <ModeToggle></ModeToggle>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    padding: 10px;
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    background-color: var(--header-background)
}

Button {
    width: 100px;
    margin-right: 10px;
}

.buttons-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>