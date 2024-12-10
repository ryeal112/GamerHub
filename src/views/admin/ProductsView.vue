<script setup>
    import Link from '@/components/Link.vue';
    import {useProductsStore} from '@/stores/products';
    import Product from '@/components/Product.vue';
    const products = useProductsStore();
</script>

<template>
    <div class=" mx-10">
        <Link
            to="new-product"
        >
        Nuevo Producto</Link>
        <h1 class="text-4xl font-black py-2">Productos</h1>

        <p v-if="products.noResults">No hay resultados</p>

        <div v-else class="w-full">
            <Product 
                v-for="product in products.productsCollection"
                :key="product.id"
                :product="product"
                class="bg-white"
            />
        </div>
    </div>
</template>