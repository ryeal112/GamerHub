<script setup>
    import  { useSalesStore } from '../../stores/sales'
    import SaleDetails from '../../components/SaleDetails.vue'

    const sales = useSalesStore()

</script>

<template>
    <h1 class="text-4xl font-black my-10">Resumen de Ventas</h1>
    
    <div class="md:flex md:items-start">
        <div class="md:w-full lg:w-full space-y-5 lg:h-screen p-5 pb-32">
            <div v-if="sales.salesCollection.length" class="space-y-5">
                <SaleDetails 
                    v-for="sale in sales.salesCollection"
                    :key="sale.id"
                    :sale="sale"
                />
            </div>
            <p v-else-if="sales.noSales" class="text-lg text-center">
                No hay ventas.
            </p>
        </div>
    </div>
</template>

