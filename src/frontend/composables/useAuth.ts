import {ref, computed} from 'vue'
import {useStorage} from '@vueuse/core'
import {User, UserWithoutPassword} from '~/types'
import {useRequest} from '~/composables/useRequest'
import {navigateTo} from "#app";

interface LoginResponseData {
    user: UserWithoutPassword
}

export const useAuth = () => {
    const userFromStorage = useStorage<string | null>('user', null)
    const authUser = ref<User | UserWithoutPassword | null>(
        userFromStorage.value ? JSON.parse(userFromStorage.value) : null
    )

    const setUser = (user: User | UserWithoutPassword | null) => {
        userFromStorage.value = user ? JSON.stringify(user) : null
        authUser.value = user
    }

    const isLoggedIn = computed(() => Boolean(authUser.value))

    const login = async (
        email: string,
        password: string,
        rememberMe?: boolean
    ) => {
        const res = await useRequest<LoginResponseData>('/auth/login/', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                rememberMe,
            }),
        })

        if (res.data?.value?.user) {
            setUser(res.data.value.user)
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
            throw new Error(error.value)
        }

        if (data?.value?.user) {
            setUser(data.value.user)
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
