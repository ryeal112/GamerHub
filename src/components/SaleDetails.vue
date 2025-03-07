<script setup>
    import { ref, watchEffect, defineProps } from 'vue';
    import { formatCurrency } from '../helpers';
    import Amount from './Amount.vue';
    import { useUsersStore } from '@/stores/users';

    const userStore = useUsersStore();
    const userData = ref(null);

    const props = defineProps({
        sale: {
            type: Object
        }
    })

    watchEffect(async () => {
    if (props.sale?.userId) {
        userData.value = await userStore.getUserData(props.sale.userId);
        console.log("Datos de usuario cargados:", userData.value);
    }
});

</script>

<template>
    <div class="border-t border-gray-200 space-y-6 py-6">
        <h2 class="text-2xl font-black">Detalles Venta:</h2>
        <p v-if="userData" class="text-xl font-black text-gray-500">Usuario: {{ userData.nombre }}</p>
        <p v-if="userData" class="text-xl font-black text-gray-500">Correo: {{ userData.correo }}</p>
        <p v-if="userData" class="text-xl font-black text-gray-500">Dirección: {{ userData.direccion }}</p>
        <p v-if="userData" class="text-xl font-black text-gray-500">Teléfono: {{ userData.telefono }}</p>
        <p class="text-xl font-black text-gray-500">Fecha de compra: {{ sale.date }}</p>
        <p class="text-xl font-black text-gray-500">Productos Vendidos</p>

        <ul role="list" class="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-gray-500">
            <li
                v-for="item in sale.items"
                class="flex space-x-6 py-6"
            >
                <img 
                    :src="item.image" 
                    :alt="'Imagen de ' + item.name"
                    class="h-24 w-24 flex-none rounded-lg"
                >

                <div class="flex-auto space-y-2">
                    <h3 class="text-black text-lg"> {{ item.name }}</h3>
                    <p>{{ formatCurrency( item.price ) }}</p>
                    <p>Cantidad: {{ item.quantity }} </p>
                </div>
            </li>
        </ul>

        <dl class="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-gray-500">
            <Amount>
                <template #label>Subtotal:</template>
                {{ formatCurrency(sale.subtotal) }}
            </Amount>

            <Amount v-if="sale.discount">
                <template #label>Descuento:</template>
                {{ formatCurrency(sale.discount) }}
            </Amount>
        
            <Amount>
                <template #label>Total Pagado:</template>
                {{ formatCurrency(sale.total) }}
            </Amount>
        </dl>


    </div>
</template>

