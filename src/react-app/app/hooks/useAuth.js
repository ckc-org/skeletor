// app/hooks/useAuth.ts
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import client from "../plugins/client";
import { clearUser, setUser } from "../store/auth/authSlice";

export function useAuth() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const query = useQuery({
    queryKey: ["auth"],
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
    // Don't refetch on window focus since we're managing auth state
    refetchOnWindowFocus: false,
    // Cache the auth state for 5 minutes
    staleTime: 5 * 60 * 1000,
  });

  return {
    ...query,
    user, // Return the user from Redux store instead of query data
  };
}
