<script setup>
import ModeToggle from '../common/ui/mode-toggle/ModeToggle.vue'
import LoginButton from '@/components/buttons/LoginButton.vue'

</script>

<template>
    <header>
        <div class="logo-container"></div>
        <div class="buttons-container">
            <LoginButton/>
            <ModeToggle></ModeToggle>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100%;
    max-height: 50px;
    min-height: 50px;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    padding: 10px;
    -webkit-backdrop-filter: blur(14px);
    backdrop-filter: blur(14px);
    background-color: var(--header-background);
    z-index: 10;
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