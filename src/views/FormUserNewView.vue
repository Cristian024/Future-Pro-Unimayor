<script setup>
import { Button } from '@/common/ui/button';
import { Input } from '@/common/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue, } from '@/common/ui/select';
import { validateLogin } from '@/lib/session';
import { showMessagePopup } from '@/lib/toasty';
import { navigate } from '@/lib/utils';
import { executeConsult } from '@/services/api';
import { onMounted, ref } from 'vue';

var user = ref({})

onMounted(async()=>{
    const session = await validateLogin()

    if(session.valid){
        const userId = session.user_id;
        executeConsult('user', userId).then(
            function(value){
                user.value = value.data[0]
            },
            function(error){
                showMessagePopup(error.error, 'red')
            }
        )
    }else{
        navigate('../');
    }
})

</script>

<template>
    <form>
        <fieldset>
            <legend>Información Personal</legend>

            <label for="firstName">Nombre:</label>
            <Input type="text" id="firstName" name="firstName" required :value="user.name"/><br><br>

            <label for="lastName">Apellido:</label>
            <Input type="text" id="lastName" name="lastName" required :value="user.last_name" /><br><br>

            <label for="email">Correo Electrónico:</label>
            <Input type="email" id="email" name="email" required  :value="user.email" /><br><br>

            <label for="phone">Teléfono:</label>
            <Input type="tel" id="phone" name="phone" :value="user.cellphone"/><br><br>

            <label for="dob">Fecha de Nacimiento:</label>
            <Input type="date" name="dob" id="dob" :value="user.date_of_birth" /><br><br>

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
            <Input type="text" ></Input><br><br>

            <label for="course">Carrera:</label>
            <Input type="text" id="course" name="course" required /><br><br>

            <label>Código estudiantil</label>
            <Input type="number"></Input><br><br>
        </fieldset>

        <Button type="submit" value="Registrar" >Confirmar</Button>
    </form>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
</template>

<style scoped>
form{
    padding: 20px;
    margin-top: 100px;
}

input[type="date"]{
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