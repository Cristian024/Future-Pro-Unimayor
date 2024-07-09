<script setup>
import { Input } from '@/common/ui/input';
import { Button } from '@/common/ui/button';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { executeUpdate } from '@/services/api';
import { showMessagePopup } from '@/lib/toasty';

var user = ref({})

const store = useStore();

onMounted(async () => {
    user.value = computed(() => store.getters.user).value
})

const updateInfo = (e) => {
    e.preventDefault();

    var user_u = Object.assign({}, user.value);
    delete user_u.email;

    executeUpdate('enterprise', user_u, user_u.id).then(
        function (value) {

        },
        function (error) {
            showMessagePopup(error.error, 'red')
        }
    )
}
</script>

<template>
    <form v-on:submit="updateInfo($event)">
        <fieldset>
            <legend>Información empresarial</legend>

            <label for="name">Nombre:</label>
            <Input type="text" id="name" name="name" required v-model:model-value="user.name" /><br><br>

            <label for="nit">NIT:</label>
            <Input type="number" id="nit" name="nit" required v-model:model-value="user.nit" /><br><br>

            <label for="email">Email:</label>
            <Input type="email" id="email" name="email" disabled required v-model:model-value="user.email" /><br><br>

            <label for="cellphone">Teléfono de contacto:</label>
            <Input type="number" id="cellphone" name="cellphone" required v-model:model-value="user.cellphone" /><br><br>

            <label for="web">Página Web (opcional):</label>
            <Input type="text" id="web" name="web" v-model:model-value="user.web" /><br><br>

            <label for="direction">Dirección:</label>
            <Input type="text" id="direction" name="direction" required v-model:model-value="user.direction" /><br><br>

            <Button type="submit" value="Registrar">Confirmar</Button>
        </fieldset>
    </form>
</template>

<style scoped>
form {
    padding: 20px;
    margin-top: 100px;
}
</style>