import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(""); // admin / employee
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !role) {
      toast.error("Email, password and role are required ❌");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Invalid credentials ❌");
      } else {
        // Successful login
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message || "Login successful ✅");

        // Redirect based on role returned by backend
        if (data.user.role === "admin") {
          navigate("/supportdashboard");
        } else if (data.user.role === "employee") {
          navigate("/Employeedashboard");
        } else {
          navigate("/"); // fallback
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#0b0b0b",
        overflow: "hidden",
        fontFamily: "'Inter','Roboto',sans-serif",
        color: "white",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        {/* Logo */}
        <Box sx={{ textAlign: "center", mb: 2 }}>
          <Box
            sx={{
              width: 44,
              height: 44,
              bgcolor: "white",
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mx: "auto",
              mb: 1,
            }}
          >
            <Bot size={22} color="black" />
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            POWERGRID IT Support
          </Typography>
          <Typography variant="body2" sx={{ color: "grey.400", fontSize: 12 }}>
            Sign in to your account
          </Typography>
        </Box>

        {/* Login Card */}
        <Card
          sx={{
            borderRadius: 2,
            backgroundColor: "#0b0b0b",
            border: "0.5px solid rgba(255,255,255,0.2)",
            boxShadow: "none",
            p: 1,
          }}
        >
          <CardHeader
            sx={{ py: 1 }}
            title={
              <Typography
                variant="subtitle1"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "white",
                  fontWeight: 600,
                  fontSize: 18,
                }}
              >
                Welcome Back
              </Typography>
            }
            subheader={
              <Typography
                variant="caption"
                sx={{ display: "flex", justifyContent: "center", color: "grey.400", fontSize: 11 }}
              >
                Enter your credentials to access the ticketing system
              </Typography>
            }
          />

          <CardContent sx={{ py: 1 }}>
            <form onSubmit={handleSubmit}>
              {/* Email */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  placeholder="employee@powergrid.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: "#0b0b0b",
                      border: "0.5px solid rgba(255,255,255,0.2)",
                      boxShadow: "none",
                      fontSize: 13,
                      color: "white",
                      "&::placeholder": { fontSize: 11, color: "rgba(255,255,255,0.6)" },
                    },
                  }}
                />
              </Box>

              {/* Role Dropdown */}
              <Box sx={{ mb: 1 }}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "grey.400", fontSize: 12 }}>Role</InputLabel>
                  <Select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    sx={{
                      borderRadius: 2,
                      backgroundColor: "#0b0b0b",
                      color: "white",
                      "& .MuiSelect-icon": { color: "white" },
                    }}
                  >
                    <MenuItem value="admin">Admin</MenuItem>
                    <MenuItem value="employee">Employee</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Password */}
              <Box sx={{ mb: 1 }}>
                <TextField
                  placeholder="Enter your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  fullWidth
                  margin="dense"
                  InputProps={{
                    sx: {
                      borderRadius: 2,
                      backgroundColor: "#0b0b0b",
                      border: "0.5px solid rgba(255,255,255,0.2)",
                      boxShadow: "none",
                      fontSize: 13,
                      color: "white",
                      "&::placeholder": { fontSize: 11, color: "rgba(255,255,255,0.6)" },
                    },
                  }}
                />
              </Box>

              {/* Sign In Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                fullWidth
                sx={{
                  mt: 1,
                  textTransform: "none",
                  borderRadius: 1.5,
                  fontSize: 13,
                  py: 0.7,
                  bgcolor: "white",
                  color: "black",
                  "&:hover": { bgcolor: "grey.200", color: "black" },
                }}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>

          <CardActions sx={{ justifyContent: "center", mb: 1, py: 0.5 }}>
            <Typography variant="caption" sx={{ color: "grey.400", fontSize: 11 }}>
              Don't have an account?{" "}
              <a href="/signup" style={{ color: "white", textDecoration: "underline" }}>
                Sign up
              </a>
            </Typography>
          </CardActions>
        </Card>

        <Typography
          variant="caption"
          sx={{ display: "block", textAlign: "center", color: "grey.500", mt: 2, fontSize: 11 }}
        >
          For IT support issues, contact helpdesk@powergrid.com
        </Typography>
      </Box>
    </Box>
  );
}
