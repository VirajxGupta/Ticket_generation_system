"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Badge,
  Typography,
  Drawer,
  List,
  ListItem, // Added
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  Divider, // Added
} from "@mui/material";
import {
  Ticket,
  Users,
  Bot,
  BookOpen,
  Bell,
  Sparkles,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut, // Added
} from "lucide-react";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

export default function EmployeeChatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const scrollRef = useRef(null);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const sendMessage = (text) => {
    if (!text) return;
    const userMessage = { id: Date.now(), role: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        text: `Mock Response for: "${text}"`,
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input.trim());
    setInput("");
  };

  const quickActions = [
    { label: "Password Reset", query: "I need to reset my password" },
    { label: "VPN Issues", query: "I am having VPN connection problems" },
    { label: "Software Installation", query: "I need software installed on my computer" },
    { label: "Email Problems", query: "I am having email issues" },
  ];

  const handleQuickAction = (query) => {
    sendMessage(query);
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
      <Box>
        <Box
          sx={{
            height: 64,
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            px: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
            bgcolor: "#111",
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
                  "&:hover": {
                    background: "linear-gradient(to right, #34d39933, #10b98133)",
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

      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                color: "#fff",
                "&:hover": {
                  background: "linear-gradient(to right, #34d39933, #10b98133)",
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
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: "#0a0a0a", color: "#e5e5e5" }}>
      {/* Sidebar for large screens */}
      <Box sx={{ display: { xs: "none", md: "flex" }, width: 256, flexDirection: "column", borderRight: "1px solid rgba(255,255,255,0.1)" }}>
        {SidebarContent}
      </Box>
      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: "#1a1a1a" } }}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Header */}
        <Box
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "#000",
            px: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            py: 1,
            flexShrink: 0, // Prevent header from shrinking
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#10b981" }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
            <Typography
              variant="h6"
              fontWeight="600"
              sx={{
                background: "linear-gradient(to right, #34d399, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Employee Chatbot
            </Typography>
          </Box>
        </Box>

        {/* Chat messages */}
        <Box
          ref={scrollRef}
          sx={{
            flex: 1,
            overflowY: "auto",
            p: 3,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {messages.length === 0 && (
            <Box sx={{ textAlign: 'center', color: "#9ca3af", my: 4 }}>
              <SmartToyIcon sx={{ fontSize: 48, color: '#34d399' }} />
              <Typography variant="h6" sx={{ mt: 1 }}>How can I help you today?</Typography>
              <Typography variant="body2">Start a conversation or use a quick action below.</Typography>
            </Box>
          )}

          {messages.map((msg) => {
            const isUser = msg.role === "user";
            return (
              <Box
                key={msg.id}
                sx={{
                  display: "flex",
                  justifyContent: isUser ? "flex-end" : "flex-start",
                  gap: 1,
                }}
              >
                {!isUser && (
                  <Avatar sx={{ bgcolor: "#34d399", width: 32, height: 32 }}>
                    <SmartToyIcon sx={{ fontSize: 16, color: "#fff" }} />
                  </Avatar>
                )}

                <Box
                  sx={{
                    maxWidth: "70%",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: isUser ? "#10b981" : "#1a1a1a",
                    color: "#fff",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <Typography fontSize={14}>{msg.text}</Typography>
                </Box>

                {isUser && (
                  <Avatar sx={{ bgcolor: "#f3f4f6", color: "#111827", width: 32, height: 32 }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Input area */}
        <Box sx={{ borderTop: "1px solid rgba(255,255,255,0.1)", p: 2, flexShrink: 0, bgcolor: '#111' }}>
          {messages.length === 0 && (
            <Grid container spacing={1} sx={{ mb: 2 }}>
              {quickActions.map((action) => (
                <Grid item xs={12} sm={6} md={3} key={action.label}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ color: "#9ca3af", borderColor: "rgba(255,255,255,0.2)", textTransform: "none", '&:hover': {borderColor: '#34d399', bgcolor: 'rgba(52, 211, 153, 0.1)'} }}
                    onClick={() => handleQuickAction(action.query)}
                  >
                    {action.label}
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 1 }}>
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Describe your IT issue..."
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  bgcolor: "#000",
                  color: "#fff",
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&:hover fieldset': { borderColor: '#34d399' },
                }
              }}
            />
            <IconButton type="submit" sx={{ bgcolor: '#34d399', color: 'black', '&:hover': { bgcolor: '#10b981' } }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}