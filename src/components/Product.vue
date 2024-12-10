<script setup>
    import {useProductsStore} from '@/stores/products'
    import {formatCurrency} from '@/helpers'

    const products = useProductsStore()
    defineProps({
        product:{
            type:Object
        }
    })
</script>

<template>
    <div>
        <div class="rounded border border-black mb-2 flex items-center">
            <img
                :src="product.image"
                :alt="product.name"
                class="h-24 w-24 m-2"
            >
            <div class=" flex-auto">
                <h2>{{ product.name }}</h2>
                <p class="font-bold">{{ formatCurrency(product.price) }}</p>
                <p>{{ product.availability }} en existencia</p>
            </div>
            <div class="flex">
                <RouterLink
                    :to="{name: 'edit-product', params: {id: product.id}}"
                >
                    <button class="rounded border border-blue-600 bg-blue-600 text-white font-bold p-2 m-1">Editar</button>
                </RouterLink>
                
                <button
                    type="button"
                    @click="products.deleteProduct(product.id)" 
                    class="rounded border border-red-600 bg-red-600 text-white font-bold p-2 m-1"
                >Eliminar</button>
            </div>
        </div>
    </div>
</template>