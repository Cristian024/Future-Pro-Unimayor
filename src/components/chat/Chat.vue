<script setup>
import { ref, onMounted, computed } from 'vue'
import io from "socket.io-client";
import { useStore } from 'vuex';
import { executeInsert } from '@/services/api';
import { showMessagePopup } from '@/lib/toasty';
import { generateRandomID } from '@/lib/generalUtils'
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

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
                    <span>{{ item.cdate }}</span>
                </div>
                <div v-else class="user_external subcontainer">
                    <p>{{ item.phrase }}</p>
                    <span>{{ item.cdate }}</span>
                </div>
            </div>
        </div>
        <form class="input-conversation" v-on:submit="sendMessage($event)">
            <input type="text" v-model="message_to_send" name="chat-input" id="chat-input">
            <input type="submit" value="Enviar">
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';

export default {
    props: [
        'chat',
        'is_open'
    ],
    computed: {
        ...mapGetters(['user']),
    },
    data() {
        return {
            message_to_send: null,
            messages: null,
            limit: 50,
            offset: 0,
            socket: null
        }
    },
    created() {
        this.getMessages(this.chat.conversation.id, 50, 0);
        this.initSocket(this.chat.conversation.id);
    },
    watch: {
        chat(newVal, oldVal) {
            console.log(newVal);
        },
        is_open(newVal, oldVal) {
            if (newVal === false) {
                this.socket.disconnect();
            }
        }
    },
    methods: {
        async getMessages(chat_id, limit, offset) {
            const self = this;
            await executeInsert('message_by_conversation', { conversation_id: chat_id, limit: limit, offset: offset }).then(
                function (value) {
                    self.messages = value.data;
                },
                function (error) {
                    showMessagePopup('Error al cargar los mensajes', 'red')
                }
            )
        },
        async initSocket(chat_id) {
            this.socket = io('http://localhost:3000');

            this.socket.on(`message_event_${this.chat.conversation.id}`, (event) => {
                const state_msg = event.message.state

                switch (state_msg) {
                    case 'sended': {
                        const msg_bonding_index = this.messages.findIndex(msg => msg.id === event.msg_temp_id);
                        if (msg_bonding_index !== -1) {
                            this.messages.splice(msg_bonding_index, 1, event.message);
                        } else {
                            const msg_sended_index = this.messages.findIndex(msg => msg.id = event.message.id);
                            if (msg_sended_index !== -1) {
                                this.messages.push(event.message);
                            } else {
                                showMessagePopup('Error al envía el mensaje', 'red');
                            }
                        }
                        break;
                    }
                }
            })
        },
        async sendMessage(event) {
            event.preventDefault();
            if (this.message_to_send != null || this.message_to_send != '') {
                const msg_temp_id = generateRandomID(10);
                const date = new Date();
                const zonedDate = toZonedTime(date, 'America/Bogota');
                const formattedDate = format(zonedDate, 'yyyy-MM-dd HH:mm:ss');

                const message_event = {
                    message: this.message_to_send,
                    user_sender: this.user,
                    conversation_id: this.chat.conversation.id,
                    msg_temp_id: msg_temp_id
                }

                const msg_temp = {
                    id: msg_temp_id,
                    conversation_id: this.chat.conversation_id,
                    phrase: this.message_to_send,
                    user_post: this.user.user_id,
                    cdate: formattedDate,
                    state: 'bonding'
                }

                this.messages.push(msg_temp)
                this.socket.emit('message_event', message_event)
                this.message_to_send = '';
            }
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