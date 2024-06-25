<script setup>
import { Button } from '@/common/ui/button'
import { navigate } from '@/lib/utils';
import { validateSessionCookie } from '@/lib/session';

</script>

<script>
export default {
    name: 'LoginButton',
    computed: {
        shouldShowButton() {
            const hideOnRoutes = ['/login'];
            const hide = hideOnRoutes.includes(this.$route.path);
            const hasSessionCookie = validateSessionCookie();

            if(hide){
                return false;
            } else if(hasSessionCookie) {
                return false;
            } else{
                return true;
            }
        }
    }
}
</script>

<template>
    <Button class="roboto-regular" v-if="shouldShowButton" v-on:click="navigate('login')">Ingresa</Button>
</template>

<style></style>
