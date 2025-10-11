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
  ListItem, 
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  Divider, 
} from "@mui/material";
import {
  Ticket,
  Users,
  Bot,
  BookOpen,
  Sparkles,
  TrendingUp,
  Settings,
  Menu,
  X,
  LogOut, 
} from "lucide-react";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";

// --- THEME CONSTANTS ---
const MAIN_BG_COLOR = '#000000'; 
const SIDEBAR_COLOR = '#030712'; 
const ACCENT_COLOR = '#34d399'; 
const ACCENT_HOVER_COLOR = '#10b981'; 
const TEXT_MUTED = '#9ca3af'; 
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)';
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
// ----------------------------------------------------------------------

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
  ];

  const SidebarContent = (
    <Box sx={{ width: 256, bgcolor: SIDEBAR_COLOR, height: "100%", display: 'flex', flexDirection: 'column', color: 'white' }}>
      <Box>
        <Box
          sx={{
            height: 64,
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`,
            px: 3,
            display: "flex",
            alignItems: "center",
            bgcolor: DARK_CARD_COLOR,
          }}
        >
          {/* --- LOGO UPDATED HERE --- */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{
                  position: 'relative',
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: ACCENT_COLOR,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  animation: 'logoPulse 2s ease-in-out infinite' // Pulse animation
              }}>
                  <Box sx={{
                      position: 'absolute',
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(2px)',
                  }} />
                  <Bot 
                    size={24} 
                    color="#000000" 
                    strokeWidth={2.5} 
                    style={{ 
                      position: 'relative', 
                      zIndex: 10,
                      animation: 'float 3s ease-in-out infinite' // Float animation
                    }} 
                  />
              </Box>
              <Typography variant="h6" fontWeight="bold" color="white">
                  POWERGRID
              </Typography>
          </Box>
          {/* --- END OF LOGO UPDATE --- */}
        </Box>

        <List sx={{ p: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.href}
                selected={item.label === "Employee Chatbot"} 
                sx={{
                  borderRadius: 2, 
                  color: 'white',
                  py: 1.5,
                  "&.Mui-selected": {
                    background: CARD_HOVER_BG,
                    color: ACCENT_COLOR,
                    "& .MuiListItemIcon-root": {
                      color: ACCENT_COLOR,
                    }
                  },
                  "&:hover": {
                    background: CARD_HOVER_BG,
                    color: ACCENT_COLOR,
                    "& .MuiListItemIcon-root": {
                      color: ACCENT_COLOR,
                    }
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                    <item.icon size={18} color={item.label === "Employee Chatbot" ? ACCENT_COLOR : TEXT_MUTED} /> 
                  </Box>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" color="inherit" fontWeight="medium">
                      {item.label}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ marginTop: 'auto' }}>
        <Divider sx={{ bgcolor: 'rgba(52, 211, 153, 0.2)' }} /> 
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/settings"
              sx={{
                borderRadius: 2,
                color: TEXT_MUTED, 
                py: 1.5,
                "&:hover": {
                  background: CARD_HOVER_BG, 
                  color: ACCENT_COLOR,
                  "& .MuiListItemIcon-root": { color: ACCENT_COLOR },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <Settings size={18} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" color="inherit" fontWeight="medium">
                    Settings
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/"
              sx={{
                borderRadius: 2,
                color: TEXT_MUTED, 
                py: 1.5,
                "&:hover": {
                  background: CARD_HOVER_BG, 
                  color: '#ef4444',
                  "& .MuiListItemIcon-root": { color: '#ef4444' },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <LogOut size={18} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography variant="body2" color="inherit" fontWeight="medium">
                    Logout
                  </Typography>
                }
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden", bgcolor: MAIN_BG_COLOR, color: "white" }}>
        <style>{`
            @keyframes logoPulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(52, 211, 153, 0);
                }
            }

            @keyframes float {
                0%, 100% {
                    transform: translateY(0px);
                }
                50% {
                    transform: translateY(-3px);
                }
            }
      `}</style>
      
      {/* Sidebar for large screens */}
      <Box 
        sx={{ 
          display: { xs: "none", md: "flex" }, 
          width: 256, 
          flexDirection: "column", 
          borderRight: `1px solid rgba(52, 211, 153, 0.2)`
        }}
      >
        {SidebarContent}
      </Box>
      
      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: SIDEBAR_COLOR } }}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        
        {/* Header (Navbar) */}
        <Box
          sx={{
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`,
            bgcolor: MAIN_BG_COLOR,
            px: 3,
            display: "flex",
            alignItems: "center",
            py: 1,
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: ACCENT_COLOR }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{
                background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
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
            bgcolor: MAIN_BG_COLOR,
          }}
        >
          {messages.length === 0 && (
            <Box sx={{ textAlign: 'center', color: TEXT_MUTED, my: 4 }}>
              <SmartToyIcon sx={{ fontSize: 48, color: ACCENT_COLOR }} />
              <Typography variant="h6" sx={{ mt: 1, color: 'white' }}>How can I help you today?</Typography>
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
                  <Avatar sx={{ bgcolor: ACCENT_COLOR, width: 32, height: 32, color: 'black' }}>
                    <SmartToyIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                )}

                <Box
                  sx={{
                    maxWidth: "70%",
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    bgcolor: isUser ? ACCENT_COLOR : DARK_CARD_COLOR, 
                    color: isUser ? 'black' : 'white',
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <Typography fontSize={14}>{msg.text}</Typography>
                </Box>

                {isUser && (
                  <Avatar sx={{ bgcolor: TEXT_MUTED, color: MAIN_BG_COLOR, width: 32, height: 32 }}>
                    <PersonIcon sx={{ fontSize: 16 }} />
                  </Avatar>
                )}
              </Box>
            );
          })}
        </Box>

        {/* Input area */}
        <Box sx={{ borderTop: `1px solid rgba(52, 211, 153, 0.2)`, p: 2, flexShrink: 0, bgcolor: DARK_CARD_COLOR }}>
          {messages.length === 0 && (
            <Grid container spacing={2} sx={{ mb: 2 }}>
              {quickActions.map((action) => (
                <Grid item xs={12} sm={6} md={3} key={action.label}>
                  <Button
                    fullWidth
                    variant="outlined"
                    sx={{ 
                      color: TEXT_MUTED, 
                      bgcolor: "#11182780",
                      borderColor: `rgba(52, 211, 153, 0.2)`, 
                      textTransform: "none", 
                      borderRadius: 2,
                      '&:hover': {
                        borderColor: ACCENT_COLOR, 
                        bgcolor: CARD_HOVER_BG
                      } 
                    }}
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
                  bgcolor: "#11182780",
                  color: "white",
                  '& fieldset': { borderColor: `rgba(52, 211, 153, 0.2)` },
                  '&:hover fieldset': { borderColor: ACCENT_COLOR },
                  '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' },
                },
                '& .MuiInputBase-input::placeholder': {
                    color: TEXT_MUTED,
                    opacity: 1,
                }
              }}
            />
            <IconButton 
              type="submit" 
              sx={{ 
                bgcolor: ACCENT_COLOR, 
                color: 'black', 
                borderRadius: 2,
                '&:hover': { bgcolor: ACCENT_HOVER_COLOR } 
              }}
              disabled={!input.trim()}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}