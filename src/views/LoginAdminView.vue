<script setup>
    import {reactive} from 'vue'
    import {useAuthStore} from '@/stores/authAdmin'
    import { useUsersStore } from '@/stores/users'
    import MainNav from '@/components/MainNav.vue'

    const auth = useAuthStore()
    const user = useUsersStore()

    const formData = reactive({
        correoAdmin: '',
        contraseniaAdmin: ''
    })

    const submitHadler = async () => {
        const {correoAdmin, contraseniaAdmin} = formData;

        try {
        const userLoginResult = await user.login({ email: correoAdmin, password: contraseniaAdmin });

        if (userLoginResult) {
            console.log("Inicio de sesión con user exitoso");
            return;
        }
    } catch (error) {
        console.log("Error con user.login:", error);
    }

    try {
        const authLoginResult = await auth.login({ email: correoAdmin, password: contraseniaAdmin });
        console.log("Inicio de sesión con auth exitoso");
    } catch (error) {
        console.log("Error con auth.login:", error);
    }
    }
</script>

<template>
    <MainNav />

    <div class="pt-32 flex justify-center bg-white shadow">
            <div class="mt-10 p-10 pt-2 w-full 2xl:w-2/4">
            <h1 class="text-2xl font-black">Inicio de Sesión</h1>
            <nav class="my-5">
                <RouterLink
                    :to="{name: 'home'}"
                    class="rounded bg-orange-400 hover:bg-orange-500 font-bold py-2 px-10"
                >
                    Volver
                </RouterLink>
            </nav>
            <div v-if="auth.errorMsg" class="text-red-500 mb-4">
                <p>Correo o contraseña incorrectos</p>
            </div>
                <FormKit
                    type="form"
                    submit-label="Inicio sesión"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHadler"
                    :value="formData"
                >
                    <FormKit
                        type="email"
                        label="Correo"
                        name="correoAdmin"
                        placeholder="Correo del usuario"
                        validation="required"
                        :validation-messages="{required: 'El Correo del Usuario es Obligatorio'}"
                        v-model.trim="formData.correoAdmin"
                    />

                    <FormKit
                        type="password"
                        label="Contraseña"
                        name="contraseniaAdmin"
                        placeholder="Contraseña del usuario"
                        validation="required"
                        :validation-messages="{required: 'La Contraseña del Usuario es Obligatorio'}"
                        v-model.trim="formData.contraseniaAdmin"
                    />

                </FormKit>
            </div>
        </div>
</template>