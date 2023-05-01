import { ref, Ref } from 'vue';
import { useAuthUser } from './useAuthUser';
import { User, UserWithoutPassword } from '@/types';


export const useAuth = () => {
  const authUser: Ref<UserWithoutPassword | null> = useAuthUser();

  const setUser = (user: User | null) => {
    authUser.value = user;
  };

  const login = async (
    email: string,
    password: string,
    rememberMe: boolean,
  ): Promise<Ref<UserWithoutPassword | null>> => {
    const data = await $fetch('/auth/login', {
      method: 'POST',
      body: {
        email,
        password,
        rememberMe,
      },
    });

    setUser(data.user);

    return authUser;
  };

  const logout = async () => {
    const data = await $fetch('/auth/logout', {
      method: 'POST',
    });

    setUser(data.user);
  };

  const me = async (): Promise<Ref<UserWithoutPassword | null>> => {
    if (!authUser.value) {
      try {
        const data = await $fetch('/auth/me', {
          headers: useRequestHeaders(['cookie']) as HeadersInit,
        });

        setUser(data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }

    return authUser;
  };

  return {
    login,
    logout,
    me,
  };
};
