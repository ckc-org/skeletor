// app/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import client from "../plugins/client";
import {
  clearUser,
  setAuthError,
  setAuthLoading,
  setUser,
} from "../store/auth/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const query = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      try {
        dispatch(setAuthLoading(true));
        const response = await client.get("/users/me/");
        dispatch(setUser(response.data));
        dispatch(setAuthError(null));
        return response.data;
      } catch (error) {
        dispatch(clearUser());
        dispatch(setAuthError(error.message));
        throw error;
      } finally {
        dispatch(setAuthLoading(false));
      }
    },
    // Disable caching
    gcTime: 0,
    staleTime: 0,
    cacheTime: 0,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  return {
    ...query,
    user, // Return the user from Redux store instead of query data
  };
}
