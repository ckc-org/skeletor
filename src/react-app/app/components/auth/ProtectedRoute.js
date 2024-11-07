"use client";
import { Box, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { user, isLoading, error } = useAuth();
  console.log("user", user);

  // Show loading state
  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    const currentPath = encodeURIComponent(window.location.pathname);
    router.push(`/login?redirect=${currentPath}`);
    return null;
  }

  // If we have a user, render the protected content
  return user ? children : null;
};

export default ProtectedRoute;
