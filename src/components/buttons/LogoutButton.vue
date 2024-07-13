<script setup>
import { Button } from '@/common/ui/button'
import { validateSessionCookie } from '@/lib/session';
import { showMessagePopup } from '@/lib/toasty';
import { executeInsert } from '@/services/api';
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const logout = async () => {
    const user = computed(() => store.getters.user).value
    await executeInsert('logout', { user_id: user.id })
    .then(
        function(value){
            showMessagePopup(value.data.message, 'green');
        },
        function(error){
            showMessagePopup('Error al cerrar sesión', 'red');
        }
    )
}

</script>

<script>
export default {
    name: 'LogoutButton',
    computed: {
        shouldShowButton() {
            const hasSessionCookie = validateSessionCookie();

            if (hasSessionCookie) {
                return true;
            } else {
                return false;
            }
        }
    }
}
</script>

<template>
    <Button class="roboto-regular" v-if="shouldShowButton" v-on:click="logout()">Cerrar sesión</Button>
</template>

<style scoped></style>