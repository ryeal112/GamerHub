<script setup>
    import {useCartStore} from '../stores/cart'
    import { formatCurrency } from '../helpers';

    const cart = useCartStore()

    defineProps({
        item: {
            type: Object
        }
    })
</script>


<template>
    <li class="flex space-x-6 py-6">
        <img 
            :src="item.image"
            :alt="'Imagen de ' + item.name"
            class="h-24 w-24 flex-none rounded-md"
        />

        <div class="flex-auto space-y-2">
            <h3 class="text-gray-900">{{ item.name }}</h3>
            <p>{{ formatCurrency( item.price) }}</p>

            <select
                class="w-32 text-center p-2 rounded-lg bg-white"
                @change="cart.updateQuantity(item.id, +$event.target.value)"
                :value="item.quantity"
            >
                <option 
                    v-for="n in cart.checkProductAvailability(item)"
                    :value="n"
                >{{ n }} </option>
            </select>
        </div>

        <div>
            <button
                type="button"
                @click="cart.removeItem(item.id)"
                class="rounded bg-red-500 border border-red-500 hover:bg-red-600 font-bold py-2 px-10"
            >
                Quitar
            </button>
        </div>
    </li>
</template>

