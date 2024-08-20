<script setup>
import ContactCard from '@/common/cards/ContactCard.vue';
import { validateSession } from '@/lib/session';
import { showMessagePopup } from '@/lib/toasty';
import { executeConsult, executeInsert } from '@/services/api';
import { Skeleton } from '@/common/ui/skeleton'

</script>

<template>
    <h2 class="text-[1.5rem] mb-[20px]">Contactos</h2>

    <div class="contacts-loader" v-if="!contactsLoaded">
        <div
            class="contact-load flex mt-[10px] w-[100%] h-[50px] items-center p-[10px] transition-[0.2s] rounded-[0.5rem]">
            <Skeleton class="h-[25px] w-[30px] rounded-[100%] mr-[10px]" />
            <Skeleton class="w-full h-[20px]" />
        </div>
        <div
            class="contact-load flex mt-[10px] w-[100%] h-[50px] items-center p-[10px] transition-[0.2s] rounded-[0.5rem]">
            <Skeleton class="h-[25px] w-[30px] rounded-[100%] mr-[10px]" />
            <Skeleton class="w-full h-[20px]" />
        </div>
        <div
            class="contact-load flex mt-[10px] w-[100%] h-[50px] items-center p-[10px] transition-[0.2s] rounded-[0.5rem]">
            <Skeleton class="h-[25px] w-[30px] rounded-[100%] mr-[10px]" />
            <Skeleton class="w-full h-[20px]" />
        </div>
    </div>
    <div class="contacts-div" v-if="contacts != null" v-for="contact in contacts">
        <ContactCard :user="contact" @click="showActiveUserChat(contact, this.user)" />
    </div>
    <div class="no_contacts-div" v-else>
        <p>No tienes contactos</p>
    </div>
</template>

<style scoped></style>

<script>
import { mapGetters } from 'vuex';


export default {
    data() {
        return {
            contactsLoaded: false,
            contacts: []
        }
    },
    computed: {
        ...mapGetters(['user'])
    },
    created() {
        this.loadContacts();
    },
    methods: {
        async loadContacts() {
            const self = this;
            const user_c = this.user;
            if (user_c != null) {
                await executeConsult('contacts_by_user_id', user_c.user_id).then(
                    function (value) {
                        const data = value.data[0];
                        const data_c = data.contact_info;

                        if (data_c.length > 0) {
                            self.contacts = data_c;
                        } else {
                            contacts = null;
                        }
                    },
                    function (error) {
                        showMessagePopup('Error al cargar contactos', 'red')
                    }
                ).finally(
                    function () {
                        self.contactsLoaded = true;
                    }
                )
            }
        },
        async showActiveUserChat(contact, user) {
            const self = this;
            await validateSession('any').then(
                async function (value) {
                    await executeInsert('conversation_by_users', { user_one_id: user.user_id, user_two_id: contact.user_id }).then(
                        function (value) {
                            self.$emit('showActiveChat', value.data);
                        },
                        function (error) {
                            showMessagePopup('Error al cargar chat', 'red')
                        }
                    )
                    self.$emit('showActiveUserChat', contact)
                },
                function (error) {
                    showMessagePopup('Tu sesión se ha vencido', 'red');
                }
            )
        }
    }
}
</script>