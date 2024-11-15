"use client";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import client from "./plugins/client";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const logout = async () => {
  await client.post("/auth/logout/");
};
export default function Home() {
  const router = useRouter();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: (data) => {
      console.log("Logout successful", data);

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
