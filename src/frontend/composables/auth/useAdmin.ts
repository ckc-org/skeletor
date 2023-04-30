import {useAuthUser} from "~/composables/auth/useAuthUser";

export const useAdmin = () => {
    const authUser = useAuthUser()

    return computed(() => {
        if (!authUser.value)
            return false

        return authUser.value.roles.includes('ADMIN')
    })
}
