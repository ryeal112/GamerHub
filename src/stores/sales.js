import { computed } from 'vue'
import { defineStore } from 'pinia'
import { query, collection } from 'firebase/firestore'
import { useFirestore, useCollection} from 'vuefire'

export const useSalesStore = defineStore('sales', () => {

    const db = useFirestore()

    const sales = computed(() => {
            const q = query(
                collection(db, 'sales'),
            )
            return q
    })

    const salesCollection = useCollection(sales)
    
    const noSales = computed(() => !salesCollection.length)

    return {
        salesCollection,
        noSales,
    }
})