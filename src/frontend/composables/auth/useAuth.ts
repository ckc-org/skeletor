import {ref, Ref} from 'vue';
import {useAuthUser} from './useAuthUser';
import {User, UserWithoutPassword} from '@/types';
import {useRequest} from '@/composables/useRequest';

export const useAuth = () => {
    const authUser: Ref<UserWithoutPassword | null> = useAuthUser();

    const setUser = (user: User | null) => {
        authUser.value = user;
    };


    const login = async (
        email: string,
        password: string,
        rememberMe: boolean,
    ): Promise<typeof useFetch> => {
        const res = await useRequest('/auth/login/', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password,
                rememberMe,
            }),
        });
        if (res.error.value) {
            throw new Error(res.error)
            return res
        } else {
            setUser(res.data.value.user);
        }

        return res;
    };


    const logout = async (): Promise<typeof useFetch> => {
        try {
            const res = useRequest('/auth/logout', {method: 'POST'});
            await res.isFetching;

            if (res.error.value) {
                throw new Error(res.error);
            }

            setUser(null);
            return res;
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    };

    const me = async (): Promise<typeof useFetch> => {
        try {
            const res = useRequest('/users/me/', {method: 'GET'});

            if (res.error.value) {
                throw new Error(res.error);
            }

            setUser(null);
            return res;
        } catch (error) {
            console.error('Error during logout:', error);
            throw error;
        }
    };

    return {
        login,
        logout,
        me,
    };
};
