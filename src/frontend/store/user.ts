// @ts-nocheck
import {defineStore} from 'pinia';
import {UserT, UserWithoutPasswordT} from '~/types/authTypes'
import {useRequest} from '~/composables/useRequest'
import {navigateTo} from "#app";


export const userStore = defineStore('user', {
    id: 'user',
    state: () => {
        const hasSession = useCookie('sessionid').value

        return {
            user: null,
            isLoggedIn: Boolean(hasSession),
            fetchUserHasBeenRan: false,
        }
    },
    actions: {
        setUser(user: UserT | UserWithoutPasswordT | null) {
            this.$patch({
                user: user,
                isLoggedIn: Boolean(user)
            })
        },
        async createUser(body: any) {
            const res = await useRequest("/users/", {
                method: "POST",
                body: body,
            });

            const userData = res.data?.value;

            if (userData?.user) {
                this.setUser(userData.user);
            }

            return res;
        },
        async login(email: string, password: string, rememberMe?: boolean) {
            const res = await useRequest("/auth/login/", {
                method: "POST",
                body: {
                    email,
                    password,
                    rememberMe,
                },
            });

            const userData = res.data?.value as any;

            if (userData?.user) {
                this.setUser(userData.user);
            }

            return res;
        },
        async logout() {
            const csrftoken = useCookie('csrftoken')
            const res = await useRequest('/auth/logout/', {method: 'POST'})
            this.setUser(null)
            csrftoken.value = null
            navigateTo('/')
            return res
        },
        async fetchUser() {
            console.log('fetching user')
            const {data, error} = await useRequest('/users/me/', {key: Math.random().toString()})
            console.log("????????? error", error.value)
            console.log("????????? data", data.value)

            // const resp = await useRequest('/users/me/')
            // const {execute} = useRequest('/users/me/')
            // const resp = await execute()
            // console.log("????????? resp", resp)
            // const {data, error} = resp
            // console.log("????????? error", error.value)
            // console.log("????????? data", data.value)

            if (error.value) {
                this.setUser(null)
                eraseCookie('csrftoken')
                eraseCookie('sessionid')
                throw new Error(error.value as any)
            }

            if (data?.value as UserT) {
                this.setUser(data.value)
                this.isLoggedIn = true
            }

            this.fetchUserHasBeenRan = true

            return {data, error}
        }
    }
});

function eraseCookie(name: string) {
    document.cookie = name + '=; Max-Age=-99999999;';
}
