<script setup>
import { Button } from '@/common/ui/button'
import { navigate } from '@/lib/utils';
import { validateLogin } from '@/lib/session';
import { watch, ref, onMounted } from 'vue';

const props = defineProps({
    routePath: {
        type: String,
        required: true
    }
});

const hiddenRoutes = ['/login'];
const shouldShowButtonLogin = ref(false);

const updateShouldShowButtonLogin = async (routePath) => {
    console.log('entra');
    const includesHidden = hiddenRoutes.includes(routePath);
    if (includesHidden) {
        shouldShowButtonLogin.value = false;
    } else {
        const validSession = await validateLogin();
        shouldShowButtonLogin.value = !validSession.valid;
    }
};


watch(
    () => props.routePath,
    async (newRoutePath) => {
        await updateShouldShowButtonLogin(newRoutePath);
    }
);

</script>

<template>
    <Button class="roboto-regular" v-if="shouldShowButtonLogin" v-on:click="navigate('login')">Ingresa</Button>
</template>

<style></style>
