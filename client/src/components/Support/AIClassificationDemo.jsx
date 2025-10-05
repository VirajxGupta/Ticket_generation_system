"use client";

import React, { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  Alert,
  AlertTitle,
  CircularProgress,
  Avatar,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  Sparkles,
  CheckCircle2,
  Ticket,
  Users,
  Bot,
  BookOpen,
  Bell,
  Menu,
  X,
  TrendingUp,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AIClassificationPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleClassify = async () => {
    if (!title || !description) return;
    setLoading(true);
    setResult(null);

    // Mock API response
    setTimeout(() => {
      setResult({
        classification: {
          category: "IT Support",
          subcategory: "Password Issue",
          priority: "medium",
          confidence: 0.92,
          assignToTeam: "IT Helpdesk",
          estimatedResolutionTime: "2 hours",
          suggestedResolution: "Reset user password and notify user",
          autoResolutionSteps: ["Verify user identity", "Reset password", "Send confirmation email"],
        },
        autoResolve: {
          resolved: true,
          resolution: "User password has been reset automatically by the system.",
        },
      });
      setLoading(false);
    }, 1200);
  };

  const priorityColors = {
    low: { bgcolor: "#ECFDF5", color: "#16A34A" },
    medium: { bgcolor: "#FEF9C3", color: "#CA8A04" },
    high: { bgcolor: "#FED7AA", color: "#C2410C" },
    critical: { bgcolor: "#FECACA", color: "#991B1B" },
  };

  const sidebarItems = [
    { href: "/supportdashboard", icon: Ticket, label: "All Tickets" },
    { href: "/tickets", icon: Users, label: "My Tickets" },
    { href: "/chatbot", icon: Bot, label: "Employee Chatbot" },
    { href: "/classify", icon: Sparkles, label: "AI Classification" },
    { href: "/knowledgebase", icon: BookOpen, label: "Knowledge Base" },
    { href: "/analytics", icon: TrendingUp, label: "Analytics" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ];

  const SidebarContent = (
    <Box sx={{ width: 256, bgcolor: "#1a1a1a", height: "100%" }}>
      <Box
        sx={{
          height: 64,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          px: 3,
          display: "flex",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "transparent",
            background: "linear-gradient(to right, #34d399, #10b981)",
            width: 32,
            height: 32,
          }}
        >
          <Ticket size={16} color="#fff" />
        </Avatar>
        <Typography variant="subtitle1" fontWeight={600} color="#fff">
          POWERGRID IT
        </Typography>
      </Box>

      <List sx={{ p: 0 }}>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.href}
            component={Link}
            to={item.href}
            sx={{
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(to right, #34d39933, #10b98133)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <item.icon size={18} />
            </ListItemIcon>
            <ListItemText
              primary={<Typography variant="body2">{item.label}</Typography>}
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0a0a0a", color: "#f8fafc" }}>
      {/* Sidebar for large screens */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: 256,
          borderRight: "1px solid rgba(255,255,255,0.1)", // <--- separation border
          flexDirection: "column",
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        {SidebarContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <Box
          sx={{
            height: 64,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            px: 3,
            justifyContent: "space-between",
          }}
        >
          <IconButton
            sx={{ display: { xs: "inline-flex", md: "none" }, color: "#10b981" }}
            onClick={toggleSidebar}
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </IconButton>

          <Typography
            variant="h6"
            sx={{
              background: "linear-gradient(to right, #34d399, #10b981)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              fontWeight: 700,
            }}
          >
            AI Classification System
          </Typography>
        </Box>

        {/* Scrollable Main Area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 3 }}>
          {/* Input Card */}
          <Card sx={{ bgcolor: "#1a1a1a", mb: 3 }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Sparkles size={20} color="#10b981" />
                  <Typography variant="h6" >AI Ticket Classification</Typography>
                </Box>
              }
              subheader={
                <Typography variant="body2" color="#9ca3af">
                  Test the AI-powered ticket classification system
                </Typography>
              }
              sx={{ color: "#f8fafc" }}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                size="small"
                placeholder="Ticket Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{ sx: { bgcolor: "#0a0a0a", color: "#f8fafc" } }}
              />
              <TextField
                multiline
                minRows={4}
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                InputProps={{ sx: { bgcolor: "#0a0a0a", color: "#f8fafc" } }}
              />
<Button
  fullWidth
  onClick={handleClassify}
  disabled={loading || !title || !description}
  sx={{
    background: "linear-gradient(to right, #34d399, #1c7054ff)",
    color: "#fff",
    fontWeight: 600,
    textTransform: "none",
    borderRadius: 1.5,
    boxShadow: "none",
    "&:hover": {
      background: "linear-gradient(to right, #10b981, #125d41ff)",
      boxShadow: "none",
    },
    "&.Mui-disabled": {
      background: "linear-gradient(to right, #34d39966, #10b98166)",
      color: "#e5e5e5",
    },
    "& .MuiButton-startIcon": {
      color: "#fff",
    },
  }}
  startIcon={loading ? <CircularProgress size={16} sx={{ color: "#fff" }} /> : <Sparkles size={16} />}
>
  {loading ? "Classifying..." : "Classify Ticket"}
</Button>

            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card sx={{ bgcolor: "#1a1a1a" }}>
              <CardHeader
                title={<Typography variant="h6">Classification Results</Typography>}
                sx={{ color: "#f8fafc" }}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2, color: "#22e66aff" }}>
                {result.autoResolve?.resolved && (
                  <Alert severity="success" variant="outlined" sx={{ borderColor: "#22e66aff", color: "#22e66aff" }}>
                    <AlertTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#22e66aff" }}>
                      <CheckCircle2 size={18} color="#22e66aff" />
                      Auto-Resolved
                    </AlertTitle>
                    This ticket can be automatically resolved.
                  </Alert>
                )}
                <Box display="flex"  flexDirection="column" gap={1}>
                  <Chip  label={`Category: ${result.classification.category}`}
                  sx={{color : "white"}} 
                  />
                  <Chip label={`Subcategory: ${result.classification.subcategory}`} 
                   sx={{color : "white"}} />
                  <Chip
                    label={`Priority: ${result.classification.priority}`}
                    sx={priorityColors[result.classification.priority]}
                    
                  />
                  <Chip label={`Assign To: ${result.classification.assignToTeam}`} 
                   sx={{color : "white"}} />
                  <Typography  sx={{color : "white"}} >Est. Resolution: {result.classification.estimatedResolutionTime}</Typography>
                  <Typography  sx={{color : "white"}} >Suggested: {result.classification.suggestedResolution}</Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}
