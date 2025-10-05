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
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  Bell,
  Sparkles,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

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
        return { bgcolor: "#450a0a", color: "#fca5a5" };
      case "high":
        return { bgcolor: "#7c2d12", color: "#fdba74" };
      case "medium":
        return { bgcolor: "#78350f", color: "#fcd34d" };
      case "low":
        return { bgcolor: "#064e3b", color: "#6ee7b7" };
      default:
        return { bgcolor: "#1f2937", color: "#9ca3af" };
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return { bgcolor: "#1e3a8a", color: "#93c5fd" };
      case "in_progress":
        return { bgcolor: "#4c1d95", color: "#c4b5fd" };
      case "resolved":
        return { bgcolor: "#064e3b", color: "#6ee7b7" };
      case "closed":
        return { bgcolor: "#374151", color: "#9ca3af" };
      default:
        return { bgcolor: "#374151", color: "#9ca3af" };
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
    <Box sx={{ width: 256, bgcolor: "#1a1a1a", height: "100%" }}>
      <Box
        sx={{
          height: 64,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          px: 3,
          display: "flex",
          alignItems: "center",
          bgcolor: "#111",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
          <Typography variant="subtitle1" fontWeight="600" color="#fff">
            POWERGRID IT
          </Typography>
        </Box>
      </Box>

      <List sx={{ p: 0 }}>
        {[
          { href: "/supportdashboard", icon: Ticket, label: "All Tickets" },
          { href: "/tickets", icon: Users, label: "My Tickets" },
          { href: "/chatbot", icon: Bot, label: "Employee Chatbot" },
          { href: "/classify", icon: Sparkles, label: "AI Classification" },
          { href: "/knowledgebase", icon: BookOpen, label: "Knowledge Base" },
          { href: "/analytics", icon: TrendingUp, label: "Analytics" },
          { href: "/settings", icon: Settings, label: "Settings" },
        ].map((nav) => (
          <ListItemButton
            key={nav.href}
            component={Link}
            to={nav.href}
            sx={{
              color: "#fff",
              "&:hover": {
                background: "linear-gradient(to right, #34d39933, #10b98133)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <nav.icon size={18} />
            </ListItemIcon>
            <ListItemText primary={nav.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0a0a", color: "#e5e5e5" }}>
      {/* Sidebar for large screens */}
      <Box sx={{ display: { xs: "none", md: "flex" }, width: 256 }}>{SidebarContent}</Box>
      {/* Drawer for mobile */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
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
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%" }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#10b981" }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  background: "linear-gradient(to right, #34d399, #10b981)",
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
                color="#9ca3af"
                sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
              >
                Tickets assigned to you
              </Typography>
            </Box>
          </Box>

          {/* Search */}
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
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#9CA3AF",
                }}
              />
              <InputBase
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{
                  pl: 5,
                  width: "100%",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 1,
                  py: 0.5,
                  px: 1,
                  bgcolor: "#1a1a1a",
                  color: "#fff",
                }}
              />
            </Box>
            <IconButton sx={{ color: "#10b981" }}>
              <Filter size={16} />
            </IconButton>
          </Box>
        </Box>

        {/* Stats cards */}
        <Box sx={{ p: 3, pb: 2 }}>
          <Grid container spacing={2}>
            {stats.map((stat) => (
              <Grid item xs={12} sm={6} md={3} key={stat.label}>
                <Card
                  sx={{
                    bgcolor: "#000",
                    color: "#fff",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 3,
                    p: 1,
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 12px rgba(0,0,0,0.6)",
                    "&:hover": {
                      border: "1px solid #34d399",
                      transform: "translateY(-4px)",
                      boxShadow: "0 0 20px rgba(52,211,153,0.3)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <Box>
                        <Typography variant="body2" color="#9ca3af">
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="h4"
                          fontWeight="bold"
                          sx={{
                            mt: 1,
                            background: "linear-gradient(to right, #34d399, #10b981)",
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
                          background: "linear-gradient(to right, #34d399, #10b981)",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0 0 10px rgba(52,211,153,0.4)",
                        }}
                      >
                        <stat.icon size={24} color="#fff" />
                      </Avatar>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Ticket List */}
        <Box sx={{ px: 3, pb: 3 }}>
          <Card
            sx={{
              bgcolor: "#000",
              border: "1px solid rgba(255,255,255,0.1)",
              color: "#fff",
              borderRadius: 3,
              display: "flex",
              flexDirection: "column",
              overflow: "visible",
              boxShadow: "0 0 12px rgba(0,0,0,0.6)",
            }}
          >
            <CardHeader
              sx={{ pb: 1 }}
              title="Your Assigned Tickets"
              subheader="Manage tickets assigned to you"
              subheaderTypographyProps={{ color: "#9ca3af" }}
              action={
                <Tabs
                  value={statusFilter}
                  onChange={(e, val) => setStatusFilter(val)}
                  textColor="inherit"
                  indicatorColor="primary"
                  sx={{
                    "& .MuiTab-root": { color: "#9ca3af" },
                    "& .Mui-selected": { color: "#10b981 !important" },
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
            <CardContent sx={{ flex: "none", overflow: "visible" }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {filteredTickets.map((ticket) => (
                  <Card
                    key={ticket.id}
                    sx={{
                      cursor: "pointer",
                      p: 2,
                      bgcolor: "#000",
                      color: "#10b981",
                      border:
                        selectedTicket === ticket.id ? "1px solid #10b981" : "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 3,
                      transition: "all 0.3s ease",
                      boxShadow: "0 0 12px rgba(0,0,0,0.6)",
                      "&:hover": {
                        border: "1px solid #34d399",
                        transform: "translateY(-2px)",
                        boxShadow: "0 0 20px rgba(52,211,153,0.3)",
                      },
                    }}
                    onClick={() => setSelectedTicket(ticket.id)}
                  >
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap" }}>
                      <Box sx={{ flex: 1 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                          <Typography fontWeight="bold">{ticket.title}</Typography>
                          <Badge
                            sx={{
                              bgcolor: getPriorityColor(ticket.priority).bgcolor,
                              color: getPriorityColor(ticket.priority).color,
                              px: 1,
                            }}
                          >
                            {ticket.priority}
                          </Badge>
                          <Badge
                            sx={{
                              bgcolor: getStatusColor(ticket.status).bgcolor,
                              color: getStatusColor(ticket.status).color,
                              px: 1,
                            }}
                          >
                            {ticket.status.replace("_", " ")}
                          </Badge>
                        </Box>
                        <Typography variant="body2" color="#9ca3af" sx={{ mt: 1 }}>
                          {ticket.description}
                        </Typography>
                        <Box
                          sx={{ display: "flex", gap: 2, mt: 1, flexWrap: "wrap", fontSize: 12, color: "#9ca3af" }}
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
                      <Box sx={{ textAlign: "right", ml: 2 }}>
                        <Typography fontSize={12}>Due: {formatDate(ticket.dueDate)}</Typography>
                        {isOverdue(ticket.dueDate) && (
                          <Badge sx={{ mt: 0.5, bgcolor: "#450a0a", color: "#fca5a5" }}>Overdue</Badge>
                        )}
                        <Typography fontSize={10} color="#9ca3af" sx={{ mt: 0.5 }}>
                          Assigned: {formatDate(ticket.assignedAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1, mt: 1, flexWrap: "wrap" }}>
                      <Button
                        size="small"
                        variant="contained"
                        sx={{ background: "linear-gradient(to right, #34d399, #10b981)", color: "black" }}
                      >
                        Update Status
                      </Button>
                      <Button size="small" variant="outlined" sx={{ borderColor: "#10b981", color: "#10b981" }}>
                        Add Comment
                      </Button>
                      <Button size="small" variant="outlined" sx={{ borderColor: "#10b981", color: "#10b981" }}>
                        View Details
                      </Button>
                    </Box>
                  </Card>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}
