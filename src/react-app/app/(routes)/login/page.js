"use client";
import { useState } from "react";
import { Box, TextField, Typography, Paper, Alert, Link } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import client from "../../(core)/plugins/client";
import { LoadingButton } from "@mui/lab";

const loginUser = async (credentials) => {
  await client.post("/auth/login/", credentials);
};

export default function LoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful", data);
      router.push("/");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Box
      className="content-wrapper"
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: "100%",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            mb: 3,
            textAlign: "center",
          }}
        >
          Welcome Back
        </Typography>

        {loginMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Invalid email or password. Please try again.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={credentials.email}
            onChange={handleChange}
            disabled={loginMutation.isPending}
            required
            sx={{ mb: 2 }}
          />

          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              value={credentials.password}
              onChange={handleChange}
              disabled={loginMutation.isPending}
              required
            />
            <Link sx={{ fontSize: "14px" }} href="/forgot-password">
              Forgot password?
            </Link>
          </Box>

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            sx={{ color: "white" }}
            loading={loginMutation.isPending}
          >
            Sign In
          </LoadingButton>
        </form>
      </Paper>
    </Box>
  );
}
