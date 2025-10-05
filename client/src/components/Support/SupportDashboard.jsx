import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Tabs,
  Tab,
  InputBase,
  IconButton,
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
  TrendingUp,
  Users,
  Ticket,
  Sparkles,
  Bot,
  BookOpen,
  Settings,
  Menu,
  X,
} from "lucide-react";
import StatsCards from "./StatsCards.jsx";
import TicketList from "./TicketList.jsx";
import TicketDetails from "./TicketDetails.jsx";
import { Link } from "react-router-dom";

export default function SupportDashboard() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tabValue, setTabValue] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarItems = [
    { label: "All Tickets", icon: Ticket, href: "/supportdashboard" },
    { label: "My Tickets", icon: Users, href: "/tickets" },
    { label: "Employee Chatbot", icon: Bot, href: "/chatbot" },
    { label: "AI Classification", icon: Sparkles, href: "/classify" },
    { label: "Knowledge Base", icon: BookOpen, href: "/knowledgebase" },
    { label: "Analytics", icon: TrendingUp, href: "/analytics" },
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

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
            <Ticket size={18} color="#fff" />
          </Avatar>
          <Typography variant="subtitle1" fontWeight="600" color="#fff">
            POWERGRID IT
          </Typography>
        </Box>
      </Box>
      <List sx={{ p: 0 }}>
        {sidebarItems.map((item) => (
          <ListItemButton
            key={item.label}
            component={Link}
            to={item.href}
            sx={{
              "&:hover": {
                background: "linear-gradient(to right, #34d39933, #10b98133)",
              },
            }}
          >
            <ListItemIcon sx={{ color: "#fff" }}>
              <item.icon size={18} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color="#fff">
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0a0a", color: "#e5e5e5" }}>
      {/* Sidebar for large screens */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          width: 256,
          borderRight: "1px solid rgba(255,255,255,0.1)",
          flexDirection: "column",
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for small screens */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
        }}
      >
        {/* Navbar */}
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
            {/* Hamburger on mobile */}
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
                Support Dashboard
              </Typography>
              <Typography
                variant="body2"
                color="#9ca3af"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Manage and resolve IT tickets
              </Typography>
            </Box>
          </Box>

          {/* Search + Filter */}
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

        {/* Dashboard Body */}
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Stats Cards */}
          <Box sx={{ p: 3, pb: 2 }}>
            <StatsCards />
          </Box>

          {/* Ticket List + Details */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
              px: 3,
              pb: 3,
              overflow: "hidden",
            }}
          >
            {/* Ticket List */}
            <Box
              sx={{
                flex: { xs: 1, md: selectedTicket ? "0 0 55%" : 1 },
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                mb: { xs: 2, md: 0 },
              }}
            >
              <Card
                sx={{
                  bgcolor: "black",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                }}
              >
                <CardHeader
                  sx={{ pb: 1 }}
                  title={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: { xs: "column", md: "row" },
                        gap: { xs: 1, md: 0 },
                      }}
                    >
                      <Box>
                        <Typography variant="h6">Recent Tickets</Typography>
                        <Typography variant="body2" color="#9ca3af">
                          View and manage support tickets
                        </Typography>
                      </Box>

                      <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => setTabValue(newValue)}
                        textColor="inherit"
                        indicatorColor="secondary"
                        sx={{
                          "& .MuiTabs-indicator": {
                            background: "linear-gradient(to right, #34d399, #10b981)",
                          },
                        }}
                        variant="scrollable"
                        scrollButtons="auto"
                      >
                        <Tab label="All" value="all" />
                        <Tab label="Open" value="open" />
                        <Tab label="In Progress" value="in_progress" />
                        <Tab label="Resolved" value="resolved" />
                      </Tabs>
                    </Box>
                  }
                />
                <CardContent sx={{ flex: 1, overflowY: "auto" }}>
                  <TicketList
                    onSelectTicket={setSelectedTicket}
                    selectedTicket={selectedTicket}
                    searchQuery={searchQuery}
                  />
                </CardContent>
              </Card>
            </Box>

            {/* Ticket Details */}
            {selectedTicket && (
              <Box
                sx={{
                  flex: { xs: 1, md: "0 0 45%" },
                  maxHeight: { xs: "none", md: "calc(100vh - 180px)" },
                  overflowY: "auto",
                  overflowX: "hidden",
                  "&::-webkit-scrollbar": {
                    width: "8px",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "#1a1a1a",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    background: "#34d399",
                    borderRadius: "4px",
                  },
                  "&::-webkit-scrollbar-thumb:hover": {
                    background: "#10b981",
                  },
                }}
              >
                <TicketDetails ticketId={selectedTicket} />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
