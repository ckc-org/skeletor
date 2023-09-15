import {ref, computed} from 'vue'
import {useStorage} from '@vueuse/core'
import {UserT, UserWithoutPasswordT} from '~/types/authTypes'
import {useRequest} from '~/composables/useRequest'
import {navigateTo} from "#app";


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


    const fetchUser = async () => {
        const {data, error} = await useRequest('/users/me/')

        if (error.value?.statusCode === 401 || error.value?.statusCode === 403) {
            setUser(null)
            // delete cookie csrftoken
            eraseCookie('csrftoken')
            eraseCookie('sessionid')
            // navigateTo('/')
            // throw new Error(error.value as any)
        }
        if ((data?.value as any) as UserT) {
            setUser((data.value as any))
        }

        return {data, error}
    }

    return {
        setUser,
        login,
        logout,
        fetchUser,
        authUser,
        userFromStorage,
        isLoggedIn,
    }
}

function eraseCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
