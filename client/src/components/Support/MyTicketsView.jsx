"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  InputBase,
  IconButton,
  Badge,
  Button,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  Search,
  Filter,
  Clock,
  CheckCircle2,
  AlertCircle,
  Ticket,
  Users,
  TrendingUp,
  Bot,
  BookOpen,
  Sparkles,
  Menu,
  X,
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
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
const CARD_GLOW_SHADOW = `0 15px 30px 0 rgba(16, 185, 129, 0.2)`;
// ----------------------------------------------------------------------

const myTickets = [
  {
    id: "TKT-2024-001",
    title: "VPN Connection Issues",
    description: "Unable to connect to corporate VPN from home",
    priority: "high",
    status: "in_progress",
    source: "Email",
    assignedAt: "2024-01-15T09:30:00Z",
    dueDate: "2024-01-16T17:00:00Z",
    category: "Network",
    requester: "Rajesh Kumar",
    department: "Operations",
  },
  {
    id: "TKT-2024-003",
    title: "Software Installation Request",
    description: "Need AutoCAD 2024 installed on workstation",
    priority: "medium",
    status: "open",
    source: "GLPI",
    assignedAt: "2024-01-15T11:00:00Z",
    dueDate: "2024-01-17T17:00:00Z",
    category: "Software",
    requester: "Priya Sharma",
    department: "Engineering",
  },
  {
    id: "TKT-2024-007",
    title: "Email Sync Problem",
    description: "Outlook not syncing emails properly",
    priority: "medium",
    status: "in_progress",
    source: "Chatbot",
    assignedAt: "2024-01-15T13:45:00Z",
    dueDate: "2024-01-16T17:00:00Z",
    category: "Email",
    requester: "Amit Patel",
    department: "Finance",
  },
  {
    id: "TKT-2024-012",
    title: "Printer Not Working",
    description: "HP LaserJet printer showing offline status",
    priority: "low",
    status: "open",
    source: "Solman",
    assignedAt: "2024-01-15T15:20:00Z",
    dueDate: "2024-01-18T17:00:00Z",
    category: "Hardware",
    requester: "Sneha Reddy",
    department: "HR",
  },
];

const stats = [
  { label: "Assigned to Me", value: "12", icon: Ticket },
  { label: "In Progress", value: "5", icon: Clock },
  { label: "Resolved Today", value: "8", icon: CheckCircle2 },
  { label: "Overdue", value: "2", icon: AlertCircle },
];

export default function MyTicketsView() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { label: "All Tickets", icon: Ticket, href: "/supportdashboard" },
    { label: "My Tickets", icon: Users, href: "/tickets" },
    { label: "Employee Chatbot", icon: Bot, href: "/chatbot" },
    { label: "AI Classification", icon: Sparkles, href: "/classify" },
    { label: "Knowledge Base", icon: BookOpen, href: "/knowledgebase" },
    { label: "Analytics", icon: TrendingUp, href: "/analytics" },
  ];

  const filteredTickets = myTickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "critical":
        return { bgcolor: "#450a0a", color: "#fca5a5" }; // dark red, light red
      case "high":
        return { bgcolor: "#5f200bff", color: "#feb362ff" }; // dark orange, light orange
      case "medium":
        return { bgcolor: "#78350f", color: "#fcd34d" }; // dark yellow, light yellow
      case "low":
        return { bgcolor: "#064e3b", color: "#6ee7b7" }; // dark green, light green
      default:
        return { bgcolor: "#1f2937", color: TEXT_MUTED };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return { bgcolor: "#1e3a8a", color: "#93c5fd" }; // dark blue, light blue
      case "in_progress":
        return { bgcolor: "#4c1d95", color: "#c4b5fd" }; // dark purple, light purple
      case "resolved":
        return { bgcolor: "#064e3b", color: "#6ee7b7" }; // dark green, light green
      case "closed":
        return { bgcolor: "#374151", color: TEXT_MUTED }; // dark gray, muted
      default:
        return { bgcolor: "#374151", color: TEXT_MUTED };
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const isOverdue = (dueDate) => new Date(dueDate) < new Date();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

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
                selected={item.label === "My Tickets"} 
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
                    <item.icon size={18} color={item.label === "My Tickets" ? ACCENT_COLOR : TEXT_MUTED} /> 
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
          borderRight: `1px solid rgba(52, 211, 153, 0.2)`,
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: SIDEBAR_COLOR } }}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Header/Navbar */}
        <Box
          sx={{
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`, 
            bgcolor: MAIN_BG_COLOR,
            px: 3,
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            py: 1,
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: ACCENT_COLOR }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                My Tickets
              </Typography>
              <Typography
                variant="body2"
                color={TEXT_MUTED}
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                Tickets assigned to you
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 1, sm: 0 },
            }}
          >
            <Box sx={{ position: "relative", flex: 1 }}>
              <Search
                size={16}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: TEXT_MUTED,
                }}
              />
              <InputBase
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  pl: 5,
                  width: "100%",
                  border: `1px solid rgba(52, 211, 153, 0.2)`,
                  borderRadius: 2, 
                  py: 0.5,
                  px: 4,
                  bgcolor: DARK_CARD_COLOR,
                  color: "white",
                  '& input::placeholder': { color: TEXT_MUTED }
                }}
              />
            </Box>
            <IconButton sx={{ color: ACCENT_COLOR, border: `1px solid rgba(52, 211, 153, 0.2)`, borderRadius: 2, p: 1 }}>
              <Filter size={16} />
            </IconButton>
          </Box>
        </Box>

        {/* Stats cards */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Grid container spacing={3}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Card
                  sx={{
                    bgcolor: "#11182780",
                    color: "white",
                    border: `1px solid rgba(52, 211, 153, 0.15)`,
                    borderRadius: 3,
                    p: 1,
                    transition: "all 0.3s ease",
                    boxShadow: `0 0 12px rgba(0,0,0,0.6)`,
                    "&:hover": {
                      border: `1px solid ${ACCENT_COLOR}`,
                      transform: "translateY(-4px)",
                      boxShadow: CARD_GLOW_SHADOW,
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="body2" color={TEXT_MUTED}>
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            mt: 1,
                            background: "white",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                      <Avatar
                        sx={{
                          width: 52,
                          height: 52,
                          bgcolor: ACCENT_COLOR,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: `0 0 10px ${ACCENT_COLOR}4D`,
                          color: "black",
                        }}
                      >
                        <stat.icon size={24} />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Ticket List */}
        <Box sx={{ px: 3, pb: 3, flex: 1, overflowY: 'auto' }}>
          <Card
            sx={{
              bgcolor: DARK_CARD_COLOR,
              border: `1px solid rgba(52, 211, 153, 0.15)`,
              color: "white",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
              boxShadow: `0 0 12px rgba(0,0,0,0.6)`,
              height: '100%'
            }}
          >
            <CardHeader
              sx={{ pb: 1, borderBottom: '1px solid #1a1a1a', bgcolor: "#11182780" }}
              title={
                <Typography variant="h6" fontWeight="bold">Your Assigned Tickets</Typography>
              }
              subheader={
                <Typography color={TEXT_MUTED} variant="body2">
                  Manage tickets assigned to you
                </Typography>
              }
              action={
                <Tabs
                  value={statusFilter}
                  onChange={(e, val) => setStatusFilter(val)}
                  textColor="inherit"
                  indicatorColor="primary"
                  sx={{
                    "& .MuiTabs-indicator": {
                      background: ACCENT_COLOR,
                    },
                    "& .MuiTab-root": { color: TEXT_MUTED, fontWeight: 'medium' },
                    "& .Mui-selected": { color: ACCENT_COLOR, fontWeight: 'bold' },
                  }}
                  variant="scrollable"
                  scrollButtons="auto"
                >
                  {["all", "open", "in_progress", "resolved"].map((status) => (
                    <Tab key={status} label={status.replace("_", " ").toUpperCase()} value={status} />
                  ))}
                </Tabs>
              }
            />
            <CardContent sx={{ flex: 1, overflowY: "auto", p: 2 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <Card
                      key={ticket.id}
                      sx={{
                        cursor: "pointer",
                        p: 2,
                        bgcolor: MAIN_BG_COLOR,
                        color: 'white', 
                        border:
                          selectedTicket === ticket.id ? `1px solid ${ACCENT_COLOR}` : `1px solid rgba(52, 211, 153, 0.15)`,
                        borderRadius: 3,
                        transition: "all 0.3s ease",
                        boxShadow: "0 0 12px rgba(0,0,0,0.6)",
                        "&:hover": {
                          border: `1px solid ${ACCENT_COLOR}`,
                          transform: "translateY(-2px)",
                          boxShadow: CARD_GLOW_SHADOW,
                          bgcolor: DARK_CARD_COLOR
                        },
                      }}
                      onClick={() => setSelectedTicket(ticket.id)}
                    >
                      <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                        <Box sx={{ flex: 1, color: 'white' }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                            <Typography fontWeight="bold">{ticket.title}</Typography>
                            <Badge
                              sx={{
                                bgcolor: getPriorityColor(ticket.priority).bgcolor,
                                color: getPriorityColor(ticket.priority).color,
                                px: 1,
                                borderRadius: '12px', 
                                fontSize: '0.75rem',
                                height: '20px',
                                lineHeight: '20px'
                              }}
                            >
                              {ticket.priority}
                            </Badge>
                            <Badge
                              sx={{
                                bgcolor: getStatusColor(ticket.status).bgcolor,
                                color: getStatusColor(ticket.status).color,
                                px: 1,
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                height: '20px',
                                lineHeight: '20px'
                              }}
                            >
                              {ticket.status.replace("_", " ")}
                            </Badge>
                          </Box>
                          <Typography variant="body2" color={TEXT_MUTED} sx={{ mt: 1 }}>
                            {ticket.description}
                          </Typography>
                          <Box
                            sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap", fontSize: 12, color: TEXT_MUTED }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                              <Ticket size={12} /> {ticket.id}
                            </Box>
                            <Box>Requester: {ticket.requester}</Box>
                            <Box>Dept: {ticket.department}</Box>
                            <Box>Source: {ticket.source}</Box>
                            <Box>Category: {ticket.category}</Box>
                          </Box>
                        </Box>
                        <Box sx={{ textAlign: "right", ml: 2, flexShrink: 0 }}>
                          <Typography fontSize={12} color={TEXT_MUTED}>Due: {formatDate(ticket.dueDate)}</Typography>
                          {isOverdue(ticket.dueDate) && (
                            <Badge sx={{ mt: 0.5, bgcolor: "#450a0a", color: "#fca5a5", borderRadius: '12px', px: 1, fontSize: '0.7rem' }}>Overdue</Badge>
                          )}
                          <Typography fontSize={10} color={TEXT_MUTED} sx={{ mt: 0.5 }}>
                            Assigned: {formatDate(ticket.assignedAt)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", gap: 1, mt: 2, flexWrap: "wrap" }}>
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ 
                            background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, 
                            color: "black", 
                            borderRadius: '12px',
                            fontWeight: 'bold',
                            '&:hover': {
                              opacity: 0.9,
                            }
                          }}
                        >
                          Update Status
                        </Button>
                        <Button 
                            size="small" 
                            variant="outlined" 
                            sx={{ 
                              borderColor: ACCENT_COLOR, 
                              color: ACCENT_COLOR, 
                              borderRadius: '12px',
                              '&:hover': {
                                bgcolor: CARD_HOVER_BG,
                                borderColor: ACCENT_HOVER_COLOR,
                              }
                            }}
                        >
                          Add Comment
                        </Button>
                        <Button 
                            size="small" 
                            variant="outlined" 
                            sx={{ 
                              borderColor: ACCENT_COLOR, 
                              color: ACCENT_COLOR, 
                              borderRadius: '12px',
                              '&:hover': {
                                bgcolor: CARD_HOVER_BG,
                                borderColor: ACCENT_HOVER_COLOR,
                              }
                            }}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Card>
                  ))
                ) : (
                    <Typography color={TEXT_MUTED} sx={{ p: 2, textAlign: 'center' }}>
                      No tickets found matching your criteria.
                    </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}