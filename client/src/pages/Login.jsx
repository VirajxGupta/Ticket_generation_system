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
  CircularProgress,
  Link,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Bot, LogIn, Eye, EyeOff } from "lucide-react";

/* ---------------- THEME STYLES ---------------- */

const themeStyles = {
  page: {
    minHeight: "100dvh", // mobile-safe viewport
    width: "100%",
    backgroundColor: "#000000",
    color: "#ffffff",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    padding: { xs: "1.5rem 1rem", sm: "3rem 1rem" },
    position: "relative",
  },

  wrapper: {
    width: "100%",
    maxWidth: 420,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 10,
  },

  card: {
    width: "100%",
    borderRadius: "1rem",
    background:
      "linear-gradient(to bottom right, rgba(17,24,39,0.85), rgba(3,7,18,0.7))",
    border: "1px solid rgba(16,185,129,0.3)",
    boxShadow: "0 10px 30px rgba(16,185,129,0.15)",
    backdropFilter: "blur(12px)",
  },

  inputField: {
    backgroundColor: "rgba(17,24,39,0.7)",
    borderRadius: "0.5rem",
    "& fieldset": { border: "none" },
    "& input": { color: "white", fontSize: 14 },
  },

  primaryButton: {
    mt: 2,
    py: 1.2,
    textTransform: "none",
    borderRadius: "0.5rem",
    fontWeight: 600,
    background: "linear-gradient(to right, #34d399, #10b981)",
    color: "#000",
    "&:hover": {
      background: "linear-gradient(to right, #10b981, #059669)",
    },
  },

  logoBox: {
    width: { xs: 42, sm: 48 },
    height: { xs: 42, sm: 48 },
    borderRadius: 2,
    background: "linear-gradient(to bottom right, #34d399, #10b981)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 18px rgba(16,185,129,0.6)",
    marginBottom: 1,
  },

  title: {
    fontWeight: 800,
    fontSize: { xs: 22, sm: 26 },
    background: "linear-gradient(to right, #fff, #d1d5db)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    color: "#9ca3af",
    fontSize: 13,
  },

  orb1: {
    position: "absolute",
    top: "10%",
    left: "15%",
    width: 300,
    height: 300,
    background: "rgba(16,185,129,0.12)",
    borderRadius: "50%",
    filter: "blur(90px)",
    zIndex: 0,
  },

  orb2: {
    position: "absolute",
    bottom: "5%",
    right: "15%",
    width: 300,
    height: 300,
    background: "rgba(16,185,129,0.1)",
    borderRadius: "50%",
    filter: "blur(90px)",
    zIndex: 0,
  },
};

/* ---------------- COMPONENT ---------------- */

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !role) return alert("Fill all fields");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert("Login successful");
  };

  return (
    <Box sx={themeStyles.page}>
      <Box sx={themeStyles.orb1} />
      <Box sx={themeStyles.orb2} />

      <Box sx={themeStyles.wrapper}>
        {/* HEADER */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box sx={themeStyles.logoBox}>
            <Bot size={22} color="black" />
          </Box>
          <Typography sx={themeStyles.title}>
            POWERGRID IT Support
          </Typography>
          <Typography sx={themeStyles.subtitle}>
            Sign in to your account
          </Typography>
        </Box>

        {/* CARD */}
        <Card sx={themeStyles.card}>
          <CardHeader
            title="Welcome Back"
            subheader="Enter credentials to continue"
            sx={{
              textAlign: "center",
              "& .MuiCardHeader-title": { color: "white", fontWeight: 600 },
              "& .MuiCardHeader-subheader": { color: "#6b7280" },
            }}
          />

          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                margin="dense"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{ sx: themeStyles.inputField }}
              />

              <FormControl fullWidth margin="dense">
                <InputLabel>Role</InputLabel>
                <Select
                  value={role}
                  label="Role"
                  onChange={(e) => setRole(e.target.value)}
                  sx={themeStyles.inputField}
                >
                  <MenuItem value="admin">IT Support</MenuItem>
                  <MenuItem value="employee">Employee</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Password"
                margin="dense"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  sx: themeStyles.inputField,
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                sx={themeStyles.primaryButton}
              >
                {loading ? (
                  <CircularProgress size={20} />
                ) : (
                  <>
                    <LogIn size={16} style={{ marginRight: 6 }} />
                    Sign In
                  </>
                )}
              </Button>
            </form>
          </CardContent>

          <CardActions sx={{ justifyContent: "center" }}>
            <Typography variant="caption" sx={{ color: "#6b7280" }}>
              Don’t have an account?{" "}
              <Link component="button" sx={{ color: "#34d399" }}>
                Sign up
              </Link>
            </Typography>
          </CardActions>
        </Card>

        {/* FOOTER */}
        <Typography
          variant="caption"
          sx={{ mt: 3, color: "#4b5563", textAlign: "center" }}
        >
          Contact{" "}
          <a href="mailto:helpdesk@powergrid.com" style={{ color: "#34d399" }}>
            helpdesk@powergrid.com
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
