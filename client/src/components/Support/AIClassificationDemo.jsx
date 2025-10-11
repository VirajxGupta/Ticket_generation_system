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
  Menu,
  X,
  TrendingUp,
  Settings,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";

// --- THEME CONSTANTS ---
const MAIN_BG_COLOR = '#000000';
const SIDEBAR_COLOR = '#030712';
const ACCENT_COLOR = '#34d399';
const ACCENT_HOVER_COLOR = '#10b981';
const TEXT_MUTED = '#9ca3af';
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)';
const CARD_BG_COLOR = 'rgba(17, 24, 39, 0.8)';
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
// ----------------------------------------------------------------------

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
    low: { bgcolor: "#064e3b", color: "#6ee7b7" },
    medium: { bgcolor: "#78350f", color: "#fcd34d" },
    high: { bgcolor: "#7c2d12", color: "#fdba74" },
    critical: { bgcolor: "#450a0a", color: "#fca5a5" },
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
                selected={item.label === "AI Classification"}
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
                    <item.icon size={18} color={item.label === "AI Classification" ? ACCENT_COLOR : TEXT_MUTED} />
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
    <Box sx={{ display: "flex", height: "100vh", bgcolor: MAIN_BG_COLOR, color: "white" }}>
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
          display: { xs: "none", md: "block" },
          width: 256,
          borderRight: `1px solid rgba(52, 211, 153, 0.2)`,
          flexDirection: "column",
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: SIDEBAR_COLOR } }}>
        {SidebarContent}
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <Box
          sx={{
            height: 64,
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`,
            display: "flex",
            alignItems: "center",
            px: 3,
            justifyContent: "space-between",
            bgcolor: MAIN_BG_COLOR
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: ACCENT_COLOR, mr: 1 }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
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
              AI Classification
            </Typography>
          </Box>
        </Box>

        {/* Scrollable Main Area */}
        <Box sx={{ flex: 1, overflowY: "auto", p: { xs: 2, md: 3 } }}>
          {/* Input Card */}
          <Card sx={{ bgcolor: DARK_CARD_COLOR, mb: 3, border: `1px solid rgba(52, 211, 153, 0.15)`, borderRadius: 3 }}>
            <CardHeader
              title={
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                  <Sparkles size={20} color={ACCENT_COLOR} />
                  <Typography variant="h6" fontWeight="bold">AI Ticket Analysis</Typography>
                </Box>
              }
              subheader={
                <Typography variant="body2" color={TEXT_MUTED} sx={{ mt: 0.5 }}>
                  Enter the ticket details to get an AI-powered classification and resolution suggestion.
                </Typography>
              }
              sx={{ color: "white" }}
            />
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                fullWidth
                label="Ticket Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  '& label': { color: TEXT_MUTED },
                  '& label.Mui-focused': { color: ACCENT_COLOR },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: MAIN_BG_COLOR,
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': { borderColor: `rgba(52, 211, 153, 0.2)` },
                    '&:hover fieldset': { borderColor: ACCENT_COLOR },
                    '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' },
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
                  '& label': { color: TEXT_MUTED },
                  '& label.Mui-focused': { color: ACCENT_COLOR },
                  '& .MuiOutlinedInput-root': {
                    bgcolor: MAIN_BG_COLOR,
                    color: 'white',
                    borderRadius: 2,
                    '& fieldset': { borderColor: `rgba(52, 211, 153, 0.2)` },
                    '&:hover fieldset': { borderColor: ACCENT_COLOR },
                    '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR, borderWidth: '2px' },
                  },
                }}
              />
              <Button
                fullWidth
                onClick={handleClassify}
                disabled={loading || !title || !description}
                sx={{
                  background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                  border: `1px solid #676767ff`,
                  color: "black",
                  fontWeight: 700,
                  textTransform: "none",
                  borderRadius: 2,
                  py: 1.5,
                  boxShadow: `0 4px 15px 0 ${ACCENT_COLOR}4D`,
                  "&:hover": {
                    background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                    filter: 'brightness(1.1)',
                    boxShadow: `0 6px 20px 0 ${ACCENT_COLOR}66`,
                  },
                  "&.Mui-disabled": {
                    background: DARK_CARD_COLOR,
                    color: TEXT_MUTED,
                    boxShadow: 'none',
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
            <Card sx={{ bgcolor: DARK_CARD_COLOR, border: `1px solid rgba(52, 211, 153, 0.15)`, borderRadius: 3 }}>
              <CardHeader
                title={<Typography variant="h6" fontWeight="bold">Classification Results</Typography>}
                sx={{ color: "white" }}
              />
              <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {result.autoResolve?.resolved && (
                  <Alert
                    severity="success"
                    icon={<CheckCircle2 size={18} />}
                    sx={{
                      bgcolor: CARD_HOVER_BG,
                      color: ACCENT_COLOR,
                      border: `1px solid ${ACCENT_COLOR}33`,
                      '& .MuiAlert-icon': { color: ACCENT_COLOR },
                    }}
                  >
                    <AlertTitle sx={{ fontWeight: 700, color: ACCENT_COLOR }}>Auto-Resolved</AlertTitle>
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
                  <Chip label={`Category: ${result.classification.category}`} sx={{ bgcolor: MAIN_BG_COLOR, color: 'white', justifyContent: 'flex-start', p: 2, borderRadius: 2 }} />
                  <Chip label={`Subcategory: ${result.classification.subcategory}`} sx={{ bgcolor: MAIN_BG_COLOR, color: 'white', justifyContent: 'flex-start', p: 2, borderRadius: 2 }} />
                  <Chip
                    label={`Priority: ${result.classification.priority}`}
                    size="small"
                    sx={{
                      ...priorityColors[result.classification.priority],
                      textTransform: 'capitalize',
                      fontWeight: 700,
                      justifyContent: 'flex-start', p: 2, borderRadius: 2
                    }}
                  />
                  <Chip label={`Assign To: ${result.classification.assignToTeam}`} sx={{ bgcolor: MAIN_BG_COLOR, color: 'white', justifyContent: 'flex-start', p: 2, borderRadius: 2 }} />
                  <Chip label={`Confidence: ${result.classification.confidence * 100}%`} sx={{ bgcolor: MAIN_BG_COLOR, color: 'white', justifyContent: 'flex-start', p: 2, borderRadius: 2 }} />
                  <Chip label={`Est. Time: ${result.classification.estimatedResolutionTime}`} sx={{ bgcolor: MAIN_BG_COLOR, color: 'white', justifyContent: 'flex-start', p: 2, borderRadius: 2 }} />

                </Box>
                <Box sx={{ mt: 1, p: 2, bgcolor: MAIN_BG_COLOR, border: `1px solid rgba(52, 211, 153, 0.15)`, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color={ACCENT_COLOR} fontWeight="bold" gutterBottom>Suggested Resolution</Typography>
                  <Typography variant="body2">{result.classification.suggestedResolution}</Typography>
                </Box>
                <Box sx={{ mt: 1, p: 2, bgcolor: MAIN_BG_COLOR, border: `1px solid rgba(52, 211, 153, 0.15)`, borderRadius: 2 }}>
                  <Typography variant="subtitle2" color={ACCENT_COLOR} fontWeight="bold" gutterBottom>Auto Resolution Steps</Typography>
                  <List sx={{ color: TEXT_MUTED, p: 0 }}>
                      {result.classification.autoResolutionSteps.map((step, index) => (
                          <ListItem key={index} disablePadding sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 24, color: ACCENT_COLOR }}>•</ListItemIcon>
                              <ListItemText primary={<Typography variant="body2" color="white">{step}</Typography>} />
                          </ListItem>
                      ))}
                  </List>
                </Box>
              </CardContent>
            </Card>
          )}
        </Box>
      </Box>
    </Box>
  );
}