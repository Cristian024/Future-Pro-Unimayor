<script setup>
import io from "socket.io-client";
import { executeInsert } from '@/services/api';
import { showMessagePopup } from '@/lib/toasty';
import { generateRandomID } from '@/lib/generalUtils'
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import Message from '@/components/chat/Message.vue'
import Input from "@/common/ui/input/Input.vue";
import Button from "@/common/ui/button/Button.vue";
import { Icon } from "@iconify/vue";

</script>

<template>
    <div class="chat w-full h-full grid grid-cols-1 grid-rows-2 pb-2 gap-2">
        <div class="conversations overflow-y-auto row-span-2 scroll-smooth" v-scroll-to-bottom="messages">
            <div class="message w-full flex items-center" v-for="(item, index) in messages">
                <Message :user="user" :message="item" />
            </div>
        </div>
        <form class="w-full h-[40px] grid grid-cols-4 gap-2 pl-[5px] pr-[5px]" v-on:submit="sendMessage($event)">
            <Input type="text" v-model="message_to_send" class="col-span-3" name="chat-input" id="chat-input" />
            <Button type="submit">
                <Icon icon="radix-icons:paper-plane" variant="ghost"
                    class="w-[15px] h-[15px] rotate-0 scale-100 transition-all" />
            </Button>
        </form>
    </div>
</template>

<script>

import { mapGetters } from 'vuex';
import messageNotification from '@/assets/sounds/message_notification.mp3'

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
    directives: {
        scrollToBottom(el, binding) {
            console.log(binding.oldValue === binding.value);
            el.scrollTop = el.scrollHeight;
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
                        if (this.messages.length > 0) {
                            if (msg_bonding_index !== -1) {
                                this.playNotificationSound(event.message.user_post);
                                this.messages.splice(msg_bonding_index, 1, event.message);
                            } else {
                                this.playNotificationSound(event.message.user_post);
                                this.messages.push(event.message);
                            }
                        } else {
                            this.playNotificationSound(event.message.user_post);
                            this.messages.push(event.message)
                        }

                        break;
                    }

                }
            })
        },
        async sendMessage(event) {
            event.preventDefault();
            if (this.message_to_send != null && this.message_to_send != '') {
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

                await this.messages.push(msg_temp);
                this.socket.emit('message_event', message_event)
                this.message_to_send = '';
            }
        },
        playNotificationSound(user_post) {
            if (this.user.user_id != user_post) {
                const audio = new Audio(messageNotification);
                audio.play();
            }
        }
    }
}
</script>

<style scoped>

#chat-input {
    font-size: 15px;
    background-color: var(--input-chat-bg);
    border: none;
    outline-style: none;
    outline: none;
    border-style: none;
    color: var(--input-chat-txt);
}
</style>