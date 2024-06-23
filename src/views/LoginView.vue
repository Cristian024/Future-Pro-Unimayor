<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs';
import { Input } from '@/common/ui/input';
import { Button } from '@/common/ui/button';
import * as api from '../services/api';
import { showMessagePopup } from '@/lib/toasty';
import { navigate } from '@/lib/utils';
import ActionLoader from '@/components/ActionLoader.vue';
import { ref } from 'vue';

var messageLoader = ref("")
var showLoader = ref(false)

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
    ). finally(
        function(){
            showLoader.value = false
        }
    )
}

const validateRegister = async(e) =>{
    e.preventDefault();

    messageLoader.value = "Estamos creando tu usuario"
    showLoader.value = true;

    const elements = e.target.elements;
    var user = {
        name: elements['name-register'].value,
        email: elements['email-register'].value,
        password: elements['password-register'].value,
    }

    api.executeInsert('register', user).then(
        function(value){
            navigate('formUserNew');
        },
        function(error){
            showMessagePopup(error.error, 'red');
        }
    ).finally(
        function(){
            showLoader.value = false
        }
    )
}

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
                        <form v-on:submit="validateRegister($event)">
                            <Input type="text" placeholder="Nombre" id="name-register" class="input-form mt-12 h-[50px]"
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
    width: 45%;
    height: 80%;
    padding: 5vmin 12vmin;
    background-color: var(--login-form-background);
    box-shadow: var(--login-form-background) 0px 0px 50px 10px;
    border-radius: 10px 0 0 10px;
}

.login-container .input-form {
    border: solid var(--input-form-background) 1px;
}
</style>