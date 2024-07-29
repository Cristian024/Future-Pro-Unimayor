<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
    <div v-if="message.user_post === user.user_id" class="user_session subcontainer text-right">
        <p>{{ message.phrase }}</p>
        <span class="flex items-center justify-end">
            {{ message.cdate }}
            <Icon icon="radix-icons:clock" v-if="message.state == 'bonding'" class="ml-[5px]" />
            <Icon icon="radix-icons:circle" v-else-if="message.state == 'sended'" class="ml-[5px]"/>
            <Icon icon="radix-icons:cross-circled" v-else-if="message.state == 'failed'" class="ml-[5px]"/>
            <Icon icon="radix-icons:check-circled" v-else-if="message.state == 'viewed'" class="ml-[5px]"/>
        </span>
    </div>
    <div v-else class="user_external subcontainer text-left">
        <p>{{ message.phrase }}</p>
        <span class="flex items-center justify-end">
            {{ message.cdate }}
        </span>
    </div>
</template>-

<style scoped>
.subcontainer {
    max-width: 60%;
    width: fit-content;
    height: auto;
    margin: 10px;
    border-radius: 1vmin;
    padding: 10px 15px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
}

.subcontainer p {
    font-size: 1rem;
    height: auto;
    text-align: left;
    max-width: 100%;
    width: 100%;
    word-wrap: break-word;
}

.subcontainer span {
    font-size: 0.6rem;
    width: 100%;
}

.subcontainer.user_session {
    background-color: var(--message-user-user-bg);
    color: var(--message-user-user-txt);
    margin-left: auto;
}

.subcontainer.user_external {
    background-color: var(--message-external-user-bg);
    color: var(--message-external-user-txt);
    margin-right: auto;
}
</style>

<script>
export default {
    props: [
        'user',
        'message'
    ],
}
</script>