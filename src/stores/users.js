import { ref } from "vue";
import { defineStore} from 'pinia'
import { useFirestore, useCollection} from 'vuefire'
import { doc, collection, query, addDoc, getDocs, getDoc} from 'firebase/firestore'
import { useRouter } from 'vue-router'

export const useUsersStore = defineStore('users', () => {

    const db = useFirestore()
    const router = useRouter()
    const errorMsg = ref("");

    const q = query(
        collection(db, 'users'),
    )

    const usersCollection = useCollection(q)

    async function createUser(user) {
        await addDoc( collection( db, 'users'), user)
    }

    const login = async ({ email, password }) => {
        
        if (!email || !password) {
            errorMsg.value = "Correo y contraseña son requeridos";
            return false;
        }

        try {
            const querySnapshot = await getDocs(q)

            if (querySnapshot.empty) {
                errorMsg.value = "Correo o contraseña incorrectos";
                return false;
            }

            let userFound = null;
            let userId = null;
            querySnapshot.forEach((doc) => {
                const userData = doc.data();
                if (userData.correo === email && userData.contrasenia === password) {
                    userFound = userData;
                    userId = doc.id
                }
            });

            if (userFound) {
                router.push({ name: 'user', params: { id: userId } });
                return true;
            } else {
                errorMsg.value = "Correo o contraseña incorrectos";
                return false;
            }

        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            errorMsg.value = "Ocurrió un error, intenta de nuevo";
            return false;
        }
    };

    const logout = () => {
        authUser.value = null
        router.push({ name: 'home' })
    }

    const getUserData = async (userId) => {
        try {
            const userRef = doc(db, "users", userId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                return userSnap.data();
            } else {
                console.log("No se encontró el usuario");
                return null;
            }
        } catch (error) {
            console.error("Error obteniendo datos del usuario:", error);
            return null;
        }
    };

    return {
        createUser,
        login,
        logout,
        getUserData,
        usersCollection
    }
})