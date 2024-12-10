<script setup>
    import { formatCurrency } from '../helpers';
    import { useCartStore } from '../stores/cart';

    const cart = useCartStore()

    defineProps({
        product: {
            type: Object
        }
    })
</script>

<template>
    <div
        class="rounded bg-white shadow relative items-center"
    >
        <img 
            :src="product.image"
            :alt="'Imagen de ' + product.name"
            class=" w-64 h-64 m-5 mb-0"
        />

        <div class="p-3 space-y-2">
            <h3 class="text-xl font-black text-gray-900">{{ product.name }}</h3>
            <p class="text-gray-500">Disponibles: {{ product.availability }}</p>
            <p class="text-2xl font-extrabold text-gray-900"> {{ formatCurrency( product.price ) }} </p>
        </div>

        <button
            type="button"
            class=" border border-black hover:bg-orange-500 bg-orange-400 rounded p-2 items-center w-full"
            @click="cart.addItem(product)"
        >
            Agregar Carrito
        </button>
    </div>
</template>

