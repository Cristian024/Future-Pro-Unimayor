<script setup>
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '@/common/ui/select';
import { showMessagePopup } from '@/lib/toasty';
import { navigate } from '@/lib/navigation';
import { executeConsult, executeUpdate } from '@/services/api';
import { ref, computed, onMounted } from 'vue';
import { useStore } from 'vuex';

onMounted(() => {
    const store = useStore();
    const session = computed(() => store.getters.session).value;

    if(session.valid){
        executeConsult('student_by_user_id', session.user_id).then(
            function(value){
                user.value = value.data[0];
            },
            function(error){
                showMessagePopup(error.error, 'red');
            }
        )
    }
})

var user = ref({})

const updateInfo = (e) => {
    e.preventDefault();

    var user_u = user.value;
    delete user_u.email;

    console.log(user_u);

    executeUpdate('student', user_u, user_u.id).then(
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
            <legend>Información Personal</legend>

            <label for="firstName">Nombre:</label>
            <Input type="text" id="firstName" name="firstName" required v-model:model-value="user.first_name" /><br><br>

            <label for="lastName">Apellido:</label>
            <Input type="text" id="lastName" name="lastName" required v-model:model-value="user.last_name" /><br><br>

            <label for="email">Correo Electrónico:</label>
            <Input type="email" id="email" name="email" required disabled v-model:model-value="user.email" /><br><br>

            <label for="phone">Teléfono:</label>
            <Input type="tel" id="phone" name="phone" /><br><br>

            <label for="dob">Fecha de Nacimiento:</label>
            <Input type="date" name="dob" id="dob" /><br><br>

            <label for="gender">Género:</label>
            <Select :value="user.gender">
                <SelectTrigger class="w-[180px]">
                    <SelectValue placeholder="Selecciona un genero" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="male">
                            Masculino
                        </SelectItem>
                        <SelectItem value="female">
                            Femenino
                        </SelectItem>
                        <SelectItem value="other">
                            Otro
                        </SelectItem>
                        <SelectItem value="prefer_not_to_say">
                            Prefiero no decirlo
                        </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select><br><br>
        </fieldset>

        <fieldset>
            <legend>Información Académica</legend>
            <label>Facultad</label>
            <Input type="text"></Input><br><br>

            <label for="course">Carrera:</label>
            <Input type="text" id="course" name="course" /><br><br>

            <label>Código estudiantil</label>
            <Input type="number"></Input><br><br>
        </fieldset>

        <Button type="submit" value="Registrar">Confirmar</Button>
    </form>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</template>

<style scoped>
form {
    padding: 20px;
    margin-top: 100px;
}

input[type="date"] {
    position: relative;
}

input[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
    cursor: pointer;
    position: absolute;
    right: 10px;
}

input[type="date"]::before {
    content: '\f073';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--input-form-text-color);
    pointer-events: none;
}
</style>