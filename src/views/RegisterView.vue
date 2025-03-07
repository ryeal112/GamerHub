<script setup>
    import {reactive} from 'vue'
    import { useRouter } from 'vue-router';
    import MainNav from '@/components/MainNav.vue'
    import { useUsersStore } from '@/stores/users';

    const users = useUsersStore()
    const router = useRouter()

    const formData = reactive({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
        contrasenia: '',
    })

    const submitHadler = async data => {
        const {...values} = data;

        try{
            await users.createUser({
                ...values,
            })
            router.push({name: 'home'})
        }catch(error){
            console.log(error)
        }
    }
</script>

<template>
    <MainNav />

    <div class="pt-32 flex justify-center bg-white shadow">
            <div class="mt-10 p-10 pt-2 w-full 2xl:w-2/4">
            <h1 class="text-2xl font-black">Registro de usuario</h1>
            <nav class="my-5">
                <RouterLink
                    :to="{name: 'home'}"
                    class="rounded bg-orange-400 hover:bg-orange-500 font-bold py-2 px-10"
                >
                    Volver
                </RouterLink>
            </nav>
                <FormKit
                    type="form"
                    submit-label="Registro usuario"
                    incomplete-message="No se pudo enviar, revisa los mensajes"
                    @submit="submitHadler"
                    :value="formData"
                >
                    <FormKit
                        type="text"
                        label="Nombre"
                        name="nombre"
                        placeholder="Nombre del usuario"
                        validation="required"
                        :validation-messages="{required: 'El Nombre del Usuario es Obligatorio'}"
                    />

                    <FormKit
                        type="text"
                        label="Dirección"
                        name="direccion"
                        placeholder="Dirección del usuario"
                        validation="required"
                        :validation-messages="{required: 'La Dirección del Usuario es Obligatorio'}"
                    />

                    <FormKit
                        type="number"
                        label="Teléfono"
                        name="telefono"
                        placeholder="Teléfono del usuario"
                        validation="required"
                        :validation-messages="{required: 'El Teléfono del Usuario es Obligatorio'}"
                    />

                    <FormKit
                        type="email"
                        label="Correo"
                        name="correo"
                        placeholder="Correo del usuario"
                        validation="required"
                        :validation-messages="{required: 'El Correo del Usuario es Obligatorio'}"
                    />

                    <FormKit
                        type="password"
                        label="Contraseña"
                        name="contrasenia"
                        placeholder="Contraseña del usuario"
                        validation="required"
                        :validation-messages="{required: 'La Contraseña del Usuario es Obligatorio'}"
                    />

                </FormKit>
            </div>
        </div>
</template>