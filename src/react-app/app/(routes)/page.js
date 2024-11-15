"use client";

import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../(core)/components/auth/ProtectedRoute";
import client from "../(core)/plugins/client";

const logout = async () => {
  await client.post("/auth/logout/");
};
export default function Home() {
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (_data) => {
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout failed", error);
    },
  });
  return (
    <ProtectedRoute>
      <Box className="content-wrapper">
        <h1>Signed in</h1>
        <LoadingButton
          loading={logoutMutation.isLoading}
          onClick={logoutMutation.mutate}
        >
          Sign out
        </LoadingButton>
      </Box>
    </ProtectedRoute>
  );
}
