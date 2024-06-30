<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs';
import { Input } from '@/common/ui/input';
import { Button } from '@/common/ui/button';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/common/ui/select';
import * as api from '../services/api';
import { showMessagePopup } from '@/lib/toasty';
import { navigate } from '@/lib/utils';
import ActionLoader from '@/components/ActionLoader.vue';
import { ref } from 'vue';

var messageLoader = ref("")
var showLoader = ref(false)
var selectedValue = ref('');

const validateLogin = async (e) => {
    e.preventDefault();

    messageLoader.value = "Validando credenciales"
    showLoader.value = true;

    const elements = e.target.elements;
    var user = {
        query: elements['email-login'].value,
        password: elements['password-login'].value,
    }

    api.executeInsert('login', user).then(
        function (value) {

        },
        function (error) {
            showMessagePopup(error.error, 'red');
        },
    ).finally(
        function () {
            showLoader.value = false
        }
    )
}

const validateRegister = async (e, type) => {
    e.preventDefault();

    messageLoader.value = "Estamos creando tu usuario"
    showLoader.value = true;

    const elements = e.target.elements;

    var user;

    if (type == 'student') {
        user = {
            name: elements['name-register'].value,
            last_name: elements['last_name-register'].value,
            email: elements['email-register'].value,
            password: elements['password-register'].value,
        }
    } else if(type == 'enterprise'){
        user = {
            name: elements['name-register'].value,
            last_name: elements['nit-register'].value,
            email: elements['email-register'].value,
            password: elements['password-register'].value,
        }
    }

    api.executeInsert('register', user).then(
        function (value) {
            var route = (type=='student') ? 'formStudentNew' || (type == 'enterprise') : 'formEnterpriseNew';
            navigate(route);
        },
        function (error) {
            showMessagePopup('Ocurrió un error al registrar el usuario', 'red');
        }
    ).finally(
        function () {
            showLoader.value = false
        }
    )
}

</script>
<script>
export default {
    data() {
        return {
            selectedValue: 'student',
        };
    }
};
</script>

<template>
    <ActionLoader :message="messageLoader" :show="showLoader"></ActionLoader>

    <div class="login-container">
        <div class="form-login-container">
            <h1 class="roboto-bold">Future Pro Unimayor</h1>
            <Tabs default-value="login">
                <TabsList class="w-full">
                    <TabsTrigger value="login" class="w-6/12">
                        Ingresa
                    </TabsTrigger>
                    <TabsTrigger value="signup" class="w-6/12">
                        Registrate
                    </TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <form v-on:submit="validateLogin($event)">
                        <Input type="text" placeholder="Nombre o correo" id="email-login" class="input-form mt-12 h-[50px]"
                            required />
                        <Input type="password" placeholder="Contraseña" id="password-login" class="input-form mt-8 h-[50px]"
                            required />
                        <Button type="submit" class=" w-full mt-[80px]" value="Ingresar">Ingresar</Button>
                    </form>
                </TabsContent>
                <TabsContent value="signup">
                    <TabsContent value="signup">
                        <Select v-model="selectedValue">
                            <SelectTrigger class="w-full h-[50px] mt-10 input-form">
                                <SelectValue placeholder="Selecciona el tipo de usuario" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="student">
                                        Estudiante
                                    </SelectItem>
                                    <SelectItem value="enterprise">
                                        Empresa
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <form v-on:submit="validateRegister($event, 'student')" v-if="selectedValue == 'student'">
                            <Input type="text" placeholder="Nombres" id="name-register" class="input-form mt-12 h-[50px]"
                                required />
                            <Input type="text" placeholder="Apellidos" id="last_name-register"
                                class="input-form mt-8 h-[50px]" required />
                            <Input type="email" placeholder="Correo" id="email-register" class="input-form mt-8 h-[50px]"
                                required />
                            <Input type="password" placeholder="Contraseña" id="password-register"
                                class="input-form mt-8 h-[50px]" required />
                            <Button type="submit" class=" w-full mt-[80px]" value="Ingresar">Registrar</Button>
                        </form>

                        <form v-on:submit="validateRegister($event, 'enterprise')" v-if="selectedValue == 'enterprise'">
                            <Input type="text" placeholder="Nombre" id="name-register" class="input-form mt-12 h-[50px]"
                                required />
                            <Input type="number" placeholder="NIT" id="nit-register" class="input-form mt-8 h-[50px]"
                                required />
                            <Input type="email" placeholder="Correo" id="email-register" class="input-form mt-8 h-[50px]"
                                required />
                            <Input type="password" placeholder="Contraseña" id="password-register"
                                class="input-form mt-8 h-[50px]" required />
                            <Button type="submit" class=" w-full mt-[80px]" value="Ingresar">Registrar</Button>
                        </form>
                    </TabsContent>
                </TabsContent>
            </Tabs>
        </div>

    </div>
</template>

<style scoped>
.login-container {
    width: 100%;
    min-height: 100vh;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.login-container h1 {
    width: 100%;
    text-align: center;
    font-size: clamp(1rem, 2.5vw, 5rem);
    margin-bottom: 30px;
}

.login-container .form-login-container {
    width: 100%;
    margin: 0 20vw;
    padding: 5vmin 12vmin;
    background-color: var(--login-form-background);
    box-shadow: var(--login-form-background) 0px 0px 50px 10px;
    border-radius: 10px 0 0 10px;
}

.login-container .input-form {
    border: solid var(--input-form-background) 1px;
}
</style>