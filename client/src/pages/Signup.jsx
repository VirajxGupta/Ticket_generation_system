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
} from "@mui/material";
import { Bot } from "lucide-react";
import axios from "axios";

export default function SignupPage() {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/register", {
        name: name,
        email,
        employeeId,
        password,
        role,
      });

      console.log(res.data);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setIsLoading(false);

      alert(res.data.message); // success message
      window.location.href = "/login"; // ya login page
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Something went wrong");
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#0b0b0b",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Inter','Roboto',sans-serif",
        color: "white",
        overflow: "hidden",
        position: "relative",
        p: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 400 }}>
        <Box sx={{ textAlign: "center", mb: 2, mt: 0 }}>
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
            Create your account
          </Typography>
        </Box>

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
                sx={{ textAlign: "center", color: "white", fontWeight: 600, fontSize: 18 }}
              >
                Get Started
              </Typography>
            }
            subheader={
              <Typography
                variant="caption"
                sx={{ display: "flex", justifyContent: "center", color: "white", fontSize: 14 }}
              >
                Register to access the unified ticketing system
              </Typography>
            }
          />
          <CardContent sx={{ py: 1 }}>
            <form onSubmit={handleSubmit}>
              {[
                { value: name, setter: setname, placeholder: "Full Name", type: "text" },
                { value: email, setter: setEmail, placeholder: "Email", type: "email" },
                { value: employeeId, setter: setEmployeeId, placeholder: "Employee ID", type: "text" },
                { value: password, setter: setPassword, placeholder: "Password", type: "password" },
              ].map((field, i) => (
                <Box sx={{ mb: 1 }} key={i}>
                  <TextField
                    placeholder={field.placeholder}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => field.setter(e.target.value)}
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
              ))}

              <Box sx={{ mb: 1 }}>
                <TextField
                  select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
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
                    },
                  }}
                >
                  <MenuItem value="employee">employee</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </TextField>
              </Box>

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
                {isLoading ? "Signing up..." : "Sign Up"}
              </Button>
            </form>
          </CardContent>

          <CardActions sx={{ justifyContent: "center", mb: 1, py: 0.5 }}>
            <Typography variant="caption" sx={{ color: "grey.400", fontSize: 11 }}>
              Already have an account?{" "}
              <a href="/login" style={{ color: "white", textDecoration: "underline" }}>
                Login
              </a>
            </Typography>
          </CardActions>
        </Card>
      </Box>

      <Typography
        variant="caption"
        sx={{
          position: "absolute",
          bottom: 8,
          textAlign: "center",
          color: "grey.500",
          fontSize: 11,
          width: "100%",
        }}
      >
        For IT support issues, contact helpdesk@powergrid.com
      </Typography>
    </Box>
  );
}
