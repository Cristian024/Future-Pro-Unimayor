<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import NavigationHome from '@/components/NavigationHome.vue';
import Contacts from '@/components/Contacts.vue';
import ChatDesplegable from '@/components/chat/ChatDesplegable.vue';

var user = ref({});
var session = ref({});
const store = useStore();

onMounted(async () => {
    user.value = computed(() => store.getters.user).value
    session.value = computed(() => store.getters.session).value
})

</script>

<template>
    <div class="home-container">
        <section class="section-1 left-[20px]">
            <NavigationHome :session="session.valid" :user="user" type="" />
        </section>
        <section></section>
        <section class="section-3 right-[20px]">
            <Contacts @showActiveUserChat="listenerActiveUserChat" @showActiveChat="listenerActiveChat"/>
        </section>
        <ChatDesplegable class="fixed bottom-[0] right-[20px]" v-if="ActiveUserChat != null" :user="ActiveUserChat" :chat_id="ActiveChatId"/>
    </div>
</template>

<script>
import Contacts from '@/components/Contacts.vue';
export default {
    data() {
        return {
            ActiveUserChat: null,
            ActiveChatId: null
        }
    },
    components() {
        Contacts
    },
    methods: {
        listenerActiveUserChat(value) {
            this.ActiveUserChat = value;
        },
        listenerActiveChat(value){
            this.ActiveChatId = value;
        }
    }
}

</script>

<style>
.home-container {
    position: relative;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    min-height: 100vh;
    padding: 70px 20px 0px 20px;
    overflow: hidden;
}

.home-container section {
    height: calc(100% - 70px);
}

.home-container .section-1,
.home-container .section-3 {
    width: 20%;
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
}
</style>