<script setup>
import { ref, onMounted, computed } from 'vue'
import io from "socket.io-client";
import { useStore } from 'vuex';
import { executeInsert } from '@/services/api';
import { showMessagePopup } from '@/lib/toasty';

const store = useStore();

var user = ref({});

onMounted(() => {
    user.value = computed(() => store.getters.user).value;
})

</script>

<template>
    <div class="chat">
        <div class="conversations">
            <div class="message" v-for="(item, index) in messages">
                <div v-if="item.user_post === user.user_id" class="user_session subcontainer">
                    <p>{{ item.phrase }}</p>
                    <span>{{ item.userName }}</span>
                </div>
                <div v-else class="user_external subcontainer">
                    <p>{{ item.phrase }}</p>
                    <span>{{ item.userName }}</span>
                </div>
            </div>
        </div>
        <form class="input-conversation" v-on:submit="sendMessage($event)">
            <input type="text" name="chat-input" id="chat-input">
            <input type="submit" value="Enviar">
        </form>
    </div>
</template>

<script>
export default {
    props: [
        'chat'
    ],
    data() {
        return{
            messages: null
        }
    },
    created() {
        this.getMessages(this.chat.id)
    },
    watch: {
        chat(newVal, oldVal) {
            console.log(newVal);
        }
    },
    methods: {
        async getMessages(chat_id){
            const self = this;
            await executeInsert('message_by_conversation',{conversation_id: chat_id}).then(
                function(value){
                    self.messages = value.data;
                },
                function(error){
                    showMessagePopup('Error al cargar los mensajes', 'red')
                }
            )
        }
    }
}
</script>

<style scoped>
.chat {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.chat .conversations {
    height: calc(100% - 50px);
    width: 100%;
    overflow-y: scroll;
    scroll-behavior: smooth;
}

.conversations .message {
    width: 100%;
    display: flex;
    align-items: center;
}

.conversations .message .subcontainer {
    max-width: 45%;
    width: fit-content;
    height: auto;
    margin: 10px;
    border-radius: 1vmin;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.message .subcontainer p {
    font-size: 2.5vmin;
    height: auto;
    text-align: left;
    max-width: 100%;
    width: 100%;
    word-wrap: break-word;
}

.message .subcontainer span {
    font-size: 1.5vmin;
    width: 100%;
}

.conversations .message .subcontainer.user_session {
    background-color: rgb(169, 137, 6);
    color: black;
    margin-left: auto;
}

.conversations .message .subcontainer.user_external {
    background-color: rgb(24, 24, 24);
    color: white;
    margin-right: auto;
}

.conversations .message .subcontainer.user_session span {
    text-align: right;
}

.conversations .message .subcontainer.user_external span {
    text-align: left;
}

.chat .input-conversation {
    width: 100%;
    height: 40px;
    display: grid;
    grid-template-columns: 80% 20%;
}

.chat .input-conversation input[type='submit'] {
    background-color: black;
    color: white;
    border: none;
    outline: none;
    cursor: pointer;
    font-size: 15px;
    font-weight: 600;
    margin: 0 10px;
    border-radius: 2vmin;
}

#chat-input {
    font-size: 15px;
    border-radius: 2vmin;
    margin: 0 10px;
    background-color: rgb(19, 19, 19);
    border: none;
    color: white;
}
</style>