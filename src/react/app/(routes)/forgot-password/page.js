"use client"
import { LoadingButton } from "@mui/lab"
import { Alert, Box, Link, Paper, TextField, Typography } from "@mui/material"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import client from "../plugins/client"

const requestPasswordReset = async (email) => {
  await client.post("/passwordreset/", { email })
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")

  const resetMutation = useMutation({
    mutationFn: requestPasswordReset,
    onSuccess: () => {
      // You might want to show a success message or redirect
      console.log("Password reset instructions sent")
    },
    onError: (error) => {
      console.error("Failed to send reset instructions", error)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    resetMutation.mutate(email)
  }

  const handleChange = (e) => {
    setEmail(e.target.value)
  }

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
        <Typography variant="h4" component="h1">
          Reset Password
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{
            mb: 2,
          }}
        >
          Add your email to get instructions
        </Typography>

        {resetMutation.isSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            Password reset instructions have been sent to your email.
          </Alert>
        )}

        {resetMutation.isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            Failed to send reset instructions. Please try again.
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            variant="outlined"
            value={email}
            onChange={handleChange}
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
            sx={{ color: "white", mb: "4px" }}
            loading={resetMutation.isPending}
          >
            Send Instructions
          </LoadingButton>
          <Link sx={{ fontSize: "12px" }} href="/login">
            Back to login
          </Link>
        </form>
      </Paper>
    </Box>
  )
}
