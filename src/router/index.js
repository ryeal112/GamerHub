import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import ShopView from '@/views/ShopView.vue'
import AdminLayout from '@/views/admin/AdminLayout.vue'
import LoginAdminView from '@/views/LoginAdminView.vue'
import RegisterView from '@/views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ShopView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/:id',
      name: 'user',
      component: ShopView,
    },
    {
      path: '/loginAdmin',
      name: 'loginAdmin',
      component: LoginAdminView,
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: 'productos',
          name: 'products',
          component: () => import('../views/admin/ProductsView.vue')
        },
        {
          path: 'productos/nuevo',
          name: 'new-product',
          component: () => import('../views/admin/NewProductView.vue')
        },
        {
          path: 'productos/editar/:id',
          name: 'edit-product',
          component: () => import('../views/admin/EditProductView.vue')
        },
        {
          path: 'ventas',
          name: 'sales',
          component: () => import('../views/admin/SalesView.vue')
        }
      ]
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({name: 'login'})
    }
  } else {
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if(user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}

export default router
