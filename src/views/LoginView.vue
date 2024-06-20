<script setup>
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../common/ui/tabs'
import { Input } from '@/common/ui/input';
import { Button } from '@/common/ui/button';
import * as api from '../services/api'

var emailLogin;
var passwordLogin;

const validateLogin = async () => {
    emailLogin = document.querySelector('#email-login');
    passwordLogin = document.querySelector('#password-login');

    api.executeConsult('users', null).then(
        function (value) {
            console.log(value);
        },
        function (error) {

        }
    )
}
</script>

<template>
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
                    <Input type="email" placeholder="Correo institucional" id="email-login"
                        class="input-form-login mt-12 h-[50px]" />
                    <Input type="password" placeholder="Contraseña" id="password-login"
                        class="input-form-login mt-8 h-[50px]" />
                    <Button class="w-full mt-[80px]" v-on:click="validateLogin()">Ingresar</Button>
                </TabsContent>
                <TabsContent value="signup">
                    Change your password here.
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

.login-container .input-form-login {
    background-color: var(--input-form-background);
    color: var(--input-form-text-color);
}
</style>