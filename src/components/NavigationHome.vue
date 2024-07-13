<script setup>
import { Icon } from '@iconify/vue'
import LogoutButton from './buttons/LogoutButton.vue';
defineProps({
    session: {
        type: Boolean,
        required: true,
        default: false
    },
    type: {
        type: String,
        required: true,
        default: ''
    },
    user: {
        type: Object,
        required: false,
        default: null
    }
})
</script>

<template>
    <div class="profile-resume mb-[30px]">
        <Icon icon="radix-icons:person" v-if="user == null" class="w-[30px] h-[30px] rotate-0 scale-100 transition-all" />
        <img v-else-if="user.img_profile != null" :src="user.img_profile"
            class="w-[30px] h-[30px] border-none rounded-[100%]">
        <Icon icon="radix-icons:person" v-else class="w-[30px] h-[30px] rotate-0 scale-100 transition-all" />

        <h2 class="ml-[10px]" v-if="user != null">
            {{ user.first_name }} {{ user.last_name }}
        </h2>
        <h2 class="ml-[10px]" v-else>
            Invitado
        </h2>
    </div>
    <div class="home-div mb-[10px]">
        <Icon icon="radix-icons:home" class="w-[30px] h-[30px] rotate-0 scale-100 transition-all" />
        <h2 class="ml-[10px]">Inicio</h2>
    </div>
    <div class="home-div mb-[10px]" v-if="session">
        <Icon icon="radix-icons:bookmark" class="w-[30px] h-[30px] rotate-0 scale-100 transition-all" />
        <h2 class="ml-[10px]">Guardado</h2>
    </div>
    <div class="home-div mb-[10px]" v-if="session">
        <Icon icon="radix-icons:bell" class="w-[30px] h-[30px] rotate-0 scale-100 transition-all" />
        <h2 class="ml-[10px]">Notificaciones</h2>
    </div>
    <div class="home-div mb-[10px]" v-if="session">
        <Icon icon="radix-icons:chat-bubble" class="w-[30px] h-[30px] rotate-0 scale-100 transition-all" />
        <h2 class="ml-[10px]">Mensajes</h2>
    </div>

    <LogoutButton class="absolute bottom-[70px] w-full"/>
</template>

<style scoped>
div {
    cursor: pointer;
    width: 100%;
    height: 60px;
    padding: 5px 10px;
    border-radius: 1rem;
    display: flex;
    align-items: center;
    transition: 0.2s ease-in;
}

div:hover {
    background-color: var(--buttons-home-bg);
}
</style>

<script>

</script>