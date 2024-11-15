"use client";

import { LoadingButton } from "@mui/lab";
import { Alert, AlertTitle, Box, Paper, TextField, Typography } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import client from "../../../plugins/client";

const confirmPasswordReset = async ({ uid, token, passwords }) => {
  await client.post(`/passwordreset/confirm/${uid}/${token}/`, passwords);
};

export default function ResetPasswordConfirmPage() {
  const router = useRouter();
  const params = useParams();
  const { uid, token } = params;

  const [passwords, setPasswords] = useState({
    new_password_1: "",
    new_password_2: "",
  });
  const [errors, setErrors] = useState({});

  const resetMutation = useMutation({
    mutationFn: (passwords) => confirmPasswordReset({ uid, token, passwords }),
    onSuccess: () => {
      setErrors({});
      router.push("/");
    },
    onError: (error) => {
      // Assuming the error response structure matches your Vue implementation
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({
          non_field_errors: ["An unexpected error occurred. Please try again."],
        });
      }
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetMutation.mutate(passwords);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear field-specific error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "grey.50",
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
            mb: 1,
            textAlign: "center",
          }}
        >
          Confirm Password
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 3,
            textAlign: "center",
          }}
        >
          Welcome back! Let&apos;s get started
        </Typography>

        {errors.non_field_errors && (
          <Alert severity="error" sx={{ mb: 2 }}>
            <AlertTitle>Error</AlertTitle>
            <ul style={{ margin: 0, paddingLeft: "1rem" }}>
              {errors.non_field_errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="New Password"
            name="new_password_1"
            type="password"
            variant="outlined"
            value={passwords.new_password_1}
            onChange={handleChange}
            error={!!errors.new_password_1}
            helperText={errors.new_password_1?.join(" ")}
            disabled={resetMutation.isPending}
            required
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            label="Confirm New Password"
            name="new_password_2"
            type="password"
            variant="outlined"
            value={passwords.new_password_2}
            onChange={handleChange}
            error={!!errors.new_password_2}
            helperText={errors.new_password_2?.join(" ")}
            disabled={resetMutation.isPending}
            required
            sx={{ mb: 3 }}
          />

          <LoadingButton
            fullWidth
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            loading={resetMutation.isPending}
          >
            Set New Password
          </LoadingButton>
        </form>
      </Paper>
    </Box>
  );
}
