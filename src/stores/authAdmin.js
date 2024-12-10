import { ref, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)
    const router = useRouter()

    const errorMsg = ref('')

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if(user) {
                authUser.value = user
            }
        })
    })

    const login = ({email, password}) => {
        if (!email || !password) {
            errorMsg.value = "Correo y contraseña son requeridos";
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then( (userCredential) => {
                const user = userCredential.user
                authUser.value = user
                if(email === "correo\@correo.com" && password == "123456"){
                    router.push({name: 'products'})
                }else{
                    router.push({name: 'home'})
                }     
            })
            .catch(error => {
                console.log(error)
                errorMsg.value = "Correo o contraseña incorrectos"
            })
    }

    const logout = () => {
        signOut(auth).then( () => {
            authUser.value = null
            router.push({name: 'home'})
        }).catch( error => {
            console.log(error)
        })
    }


    return {
        login,
        logout,
        errorMsg
    }
})