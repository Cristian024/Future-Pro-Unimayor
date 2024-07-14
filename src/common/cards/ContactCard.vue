<script setup>
    defineProps ({
        user: {
            type: Object,
            required: true,
            default: null
        }
    })
</script>

<template>
    <div class="contact-div flex mt-[10px] w-[100%] h-[50px] items-center cursor-pointer p-[10px] transition-[0.2s] rounded-[0.5rem]" v-if="user != null">
        <img :src="user.img_profile" class="h-[25px] w-[25px] rounded-[100%] mr-[10px]">
        <p v-if="user.role === 'student'">{{ user.first_name }} {{ user.last_name }}</p>
        <p v-else-if="user.role === 'enterprise'">{{ user.name }}</p>
    </div>
</template>

<style scoped>
    div:hover{
        background-color: var(--buttons-home-bg);
    }    
</style>