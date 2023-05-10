import {ref, computed} from 'vue'
import {useStorage} from '@vueuse/core'
import {UserT, UserWithoutPasswordT} from '~/types/authTypes'
import {useRequest} from '~/composables/useRequest'
import {navigateTo} from "#app";


interface UserDataT {
    user: UserT | UserWithoutPasswordT
}

export const useAuth = () => {
    const userFromStorage = useStorage<string | null>('user', null)
    const authUser = ref<UserT | UserWithoutPasswordT | null>(
        userFromStorage.value ? JSON.parse(userFromStorage.value) : null
    )

    const setUser = (user: UserT | UserWithoutPasswordT | null) => {
        userFromStorage.value = user ? JSON.stringify(user) : null
        authUser.value = user
    }

    const isLoggedIn = computed(() => Boolean(authUser.value))

    const login = async (
        email: string,
        password: string,
        rememberMe?: boolean
    ) => {
        const res = await useRequest<any>("/auth/login/", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                rememberMe,
            }),
        });

        const userData = res.data?.value as any;

        if (userData?.user) {
            setUser(userData.user);
        }


        return res
    }

    const logout = async () => {
        const csrftoken = useCookie('csrftoken')
        const res = await useRequest('/auth/logout/', {method: 'POST'})
        setUser(null)
        csrftoken.value = null
        navigateTo('/')
        return res
    }


    const fetchUserRequest = useRequest('/users/me/')
    const fetchUser = async () => {
        const {data, error, execute} = fetchUserRequest
        await execute()

        if (error.value) {
            setUser(null)
            throw new Error(error.value as any)
        }

        if ((data?.value as any)?.user as UserT) {
            setUser((data.value as any).user)
        }

        return {data, error, execute}
    }

    return {
        login,
        logout,
        fetchUser,
        authUser,
        userFromStorage,
        isLoggedIn,
    }
}
