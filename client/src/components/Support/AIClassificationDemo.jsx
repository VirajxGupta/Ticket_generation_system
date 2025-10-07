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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
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
  LogOut,
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
          suggestedResolution: "Reset user password and notify user.",
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
    <Box sx={{ width: 256, bgcolor: "#1a1a1a", height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Top section: Header and main navigation */}
      <Box>
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

        <List sx={{ p: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.href} disablePadding>
              <ListItemButton
                component={Link}
                to={item.href}
                sx={{
                  color: "#fff",
                  borderRadius: 1.5,
                  "&:hover": {
                    background: "linear-gradient(to right, #34d39922, #10b98122)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                  <item.icon size={18} />
                </ListItemIcon>
                <ListItemText
                  primary={<Typography variant="body2">{item.label}</Typography>}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      {/* Bottom section: Logout button */}
      <Box sx={{ marginTop: 'auto' }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }}/>
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                color: "#fff",
                borderRadius: 1.5,
                "&:hover": {
                  background: "linear-gradient(to right, #34d39922, #10b98122)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "#fff", minWidth: 40 }}>
                <LogOut size={18} />
              </ListItemIcon>
              <ListItemText
                primary={<Typography variant="body2">Logout</Typography>}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0a0a0a", color: "#f8fafc" }}>
      {/* Sidebar for large screens */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          width: 256,
          borderRight: "1px solid rgba(255,255,255,0.1)",
          flexDirection: "column",
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: "#1a1a1a" } }}>
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
            bgcolor: '#111'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#e5e5e5", mr: 1 }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </IconButton>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: '#e5e5e5'
              }}
            >
              AI Classification
            </Typography>
          </Box>
        </Box>

        {/* Scrollable Main Area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
          {/* Input Card */}
          <Card sx={{ bgcolor: "#1a1a1a", mb: 3, border: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Sparkles size={20} color="#34d399" />
                  <Typography variant="h6" >AI Ticket Analysis</Typography>
                </Box>
              }
              subheader={
                <Typography variant="body2" color="#9ca3af" sx={{ mt: 0.5 }}>
                  Enter the ticket details to get an AI-powered classification and resolution suggestion.
                </Typography>
              }
              sx={{ color: "#f8fafc" }}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Ticket Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  // Style the label
                  '& label': { color: '#9ca3af' },
                  '& label.Mui-focused': { color: '#34d399' },
                  // Style the input field
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: '#34d399' },
                    '&.Mui-focused fieldset': { borderColor: '#34d399' },
                  },
                }}
              />
              <TextField
                fullWidth
                multiline
                minRows={4}
                label="Describe the issue..."
                variant="outlined"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  // Style the label
                  '& label': { color: '#9ca3af' },
                  '& label.Mui-focused': { color: '#34d399' },
                  // Style the input field
                  '& .MuiOutlinedInput-root': {
                    color: '#f8fafc',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                    '&:hover fieldset': { borderColor: '#34d399' },
                    '&.Mui-focused fieldset': { borderColor: '#34d399' },
                  },
                }}
              />
              <Button
                fullWidth
                onClick={handleClassify}
                disabled={loading || !title || !description}
                sx={{
                  background: "linear-gradient(to right, #34d399, #10b981)",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 1.5,
                  py: 1.5,
                  boxShadow: "none",
                  "&:hover": {
                    background: "linear-gradient(to right, #34d399, #10b981)",
                    filter: 'brightness(1.2)'
                  },
                  "&.Mui-disabled": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
                startIcon={loading ? <CircularProgress size={16} color="inherit" /> : <Sparkles size={16} />}
              >
                {loading ? "Classifying..." : "Classify Ticket"}
              </Button>

            </CardContent>
          </Card>

          {/* Result Card */}
          {result && (
            <Card sx={{ bgcolor: "#1a1a1a", border: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <CardHeader
                title={<Typography variant="h6">Classification Results</Typography>}
                sx={{ color: "#f8fafc" }}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {result.autoResolve?.resolved && (
                  <Alert
                    severity="success"
                    icon={<CheckCircle2 size={18} />}
                    sx={{
                      bgcolor: 'rgba(52, 211, 153, 0.1)',
                      color: '#34d399',
                      border: '1px solid rgba(52, 211, 153, 0.2)'
                    }}
                  >
                    <AlertTitle sx={{ fontWeight: 600 }}>Auto-Resolved</AlertTitle>
                    {result.autoResolve.resolution}
                  </Alert>
                )}
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: 1.5
                  }}
                >
                  <Chip label={`Category: ${result.classification.category}`} sx={{ bgcolor: '#374151', color: 'white', justifyContent: 'flex-start', p: 2 }} />
                  <Chip label={`Subcategory: ${result.classification.subcategory}`} sx={{ bgcolor: '#374151', color: 'white', justifyContent: 'flex-start', p: 2 }} />
                  <Chip
                    label={`Priority: ${result.classification.priority}`}
                    size="small"
                    sx={{
                      ...priorityColors[result.classification.priority],
                      textTransform: 'capitalize',
                      fontWeight: 600,
                      justifyContent: 'flex-start', p: 2
                    }}
                  />
                  <Chip label={`Assign To: ${result.classification.assignToTeam}`} sx={{ bgcolor: '#374151', color: 'white', justifyContent: 'flex-start', p: 2 }} />
                </Box>
                <Box sx={{ mt: 1 }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>Suggested Resolution</Typography>
                  <Typography variant="body2">{result.classification.suggestedResolution}</Typography>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}