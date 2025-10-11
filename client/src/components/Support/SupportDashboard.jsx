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
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
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
  LogOut,
} from "lucide-react";
import StatsCards from "./StatsCards.jsx";
import TicketList from "./TicketList.jsx";
import TicketDetails from "./TicketDetails.jsx";
import { Link } from "react-router-dom";

// --- THEME CONSTANTS ---
const MAIN_BG_COLOR = '#000000'; 
const SIDEBAR_COLOR = '#030712'; 
const CARD_BG_COLOR = 'rgba(17, 24, 39, 0.8)';
const ACCENT_COLOR = '#34d399'; 
const ACCENT_HOVER_COLOR = '#10b981'; 
const TEXT_MUTED = '#9ca3af'; 
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)';
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
const CARD_GLOW_SHADOW = `0 15px 30px 0 rgba(16, 185, 129, 0.2)`;
// ----------------------------------------------------------------------

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
  ];

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
              animation: 'logoPulse 2s ease-in-out infinite', // Pulse animation for container
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
                  animation: 'float 3s ease-in-out infinite' // Float animation for icon
                }} 
              />
            </Box>
            <Typography variant="h6" fontWeight="bold" color="white">
              POWERGRID IT
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
                sx={{
                  borderRadius: 2, 
                  color: 'white',
                  py: 1.5,
                  "&:hover": {
                    background: CARD_HOVER_BG,
                    color: ACCENT_COLOR,
                  },
                }}
              >
                <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                  <Box sx={{ width: 32, height: 32, borderRadius: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', mr: 1 }}>
                    <item.icon size={18} color={TEXT_MUTED} /> 
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
          flexDirection: "column",
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for small screens */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: SIDEBAR_COLOR } }}>
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
                Support Dashboard
              </Typography>
              <Typography
                variant="body2"
                color={TEXT_MUTED}
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
              gap: 3, 
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
                  bgcolor: DARK_CARD_COLOR,
                  border: `1px solid rgba(52, 211, 153, 0.15)`,
                  color: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  overflow: "hidden",
                  borderRadius: 3, 
                }}
              >
                <CardHeader
                  sx={{ pb: 1, borderBottom: '1px solid #1a1a1a' , bgcolor:"#11182780"}} 
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
                        <Typography variant="h6" fontWeight="bold">Recent Tickets</Typography>
                        <Typography variant="body2" color={TEXT_MUTED}>
                          View and manage support tickets
                        </Typography>
                      </Box>

                      <Tabs
                        value={tabValue}
                        onChange={(e, newValue) => setTabValue(newValue)}
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
                        <Tab label="All" value="all" />
                        <Tab label="Open" value="open" />
                        <Tab label="In Progress" value="in_progress" />
                        <Tab label="Resolved" value="resolved" />
                      </Tabs>
                    </Box>
                  }
                />
                <CardContent sx={{ flex: 1, overflowY: "auto", p: 0 }}>
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
                  "&::-webkit-scrollbar": { width: "8px" },
                  "&::-webkit-scrollbar-track": { background: MAIN_BG_COLOR },
                  "&::-webkit-scrollbar-thumb": { background: ACCENT_COLOR, borderRadius: "4px" },
                  "&::-webkit-scrollbar-thumb:hover": { background: ACCENT_HOVER_COLOR },
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