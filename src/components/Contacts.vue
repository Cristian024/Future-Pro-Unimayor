<script setup>
import ContactCard from '@/common/cards/ContactCard.vue';
import { showMessagePopup } from '@/lib/toasty';
import { executeConsult } from '@/services/api';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

var contacts = ref([]);
const store = useStore();

onMounted(async () => {
    const user_c = computed(()=>store.getters.user).value;
    if (user_c != null) {
        await executeConsult('contacts_by_user_id', user_c.user_id).then(
            function (value) {
                const data = value.data[0];
                const data_c = data.contact_info;

                if(data_c.length > 0){
                    contacts.value = data_c;
                }else{
                    contacts = null;
                }
            },
            function (error) {
                showMessagePopup('Error al cargar contactos', 'red')
            }
        )
    }
})

</script>

<template>
    <h2 class="text-[1.5rem] mb-[20px]">Contactos</h2>
    <div class="contacts-div" v-if="contacts != null" v-for="contact in contacts">
        <ContactCard :user="contact" @click="showActiveUserChat(contact)"/>
    </div>
    <div class="no_contacts-div" v-else>
        <p>No tienes contactos</p>
    </div>
</template> 

<style scoped></style>

<script>
    export default {
        methods: {
            showActiveUserChat(value){
                this.$emit('showActiveUserChat', value)
            }
        }
    }
</script>