<template>
    <div ref="loader" class="loader-container fixed top-[0px] w-full h-full z-50 flex items-center justify-center">
        <div class="loader"></div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    computed: {
        ...mapGetters(['isLoading'])
    },
    watch: {
        isLoading(newVal) {
            if (newVal === 1) {
                const loader = this.$refs.loader;
                loader.classList.add('inactive');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 1000);
            }
        }
    }
}

</script>

<style scoped>
.loader-container {
    background-color: var(--bg-page-loader);
}

.loader-container.inactive {
    transition: 0.5s ease;
    opacity: 0;
}

.loader {
    width: 65px;
    aspect-ratio: 1;
    --g: radial-gradient(farthest-side, var(--bg-page-loader) calc(95% - 3px), var(--bg-page-loader-draw) calc(100% - 3px) 98%, var(--bg-page-loader) 101%) no-repeat;
    background: var(--g), var(--g), var(--g);
    background-size: 30px 30px;
    animation: l10 1.5s infinite;
}

@keyframes l10 {
    0% {
        background-position: 0 0, 0 100%, 100% 100%;
    }

    25% {
        background-position: 100% 0, 0 100%, 100% 100%;
    }

    50% {
        background-position: 100% 0, 0 0, 100% 100%;
    }

    75% {
        background-position: 100% 0, 0 0, 0 100%;
    }

    100% {
        background-position: 100% 100%, 0 0, 0 100%;
    }
}
</style>