<script setup>
    import { RouterLink } from 'vue-router';
    import Logo from './Logo.vue';
    import {useAuthStore} from '@/stores/authAdmin'

    const auth = useAuthStore()
</script>


<template>
    <header class="px-10 py-5 bg-slate-700 flex justify-between absolute top-0 w-full z-10">
        <div>
            <Logo />
        </div>

        <nav>
            <RouterLink
                :to="{name: 'products'}"
                class="rounded text-white font-bold p-2"
            >
                Productos
            </RouterLink>
            <RouterLink
                :to="{name: 'sales'}"
                class="rounded text-white font-bold p-2"
            >
                Ventas
            </RouterLink>
            <button
                class="rounded bg-orange-400 hover:bg-orange-500 font-bold py-2 px-10"
                @click="auth.logout"
            >
                Cerrar sesión
            </button>
        </nav>
    </header>
</template>

