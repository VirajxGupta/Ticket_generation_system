"use client";

import React, { useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Chip,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  InputAdornment,
  Divider,
} from "@mui/material";
import {
  Search,
  Plus,
  Eye,
  ThumbsUp,
  Tag,
  BookOpen,
  Clock,
  Menu,
  X,
  Ticket,
  Users,
  Bot,
  Sparkles,
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
const LIGHTER_CARD_COLOR = 'rgba(17, 24, 39, 0.8)';
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.15)`;
// ----------------------------------------------------------------------

// --- Mock Data ---
const mockArticles = [
  {
    id: "1",
    title: "How to Reset Your Password",
    content: `To reset your password:\n1. Go to the self-service portal\n2. Click on "Forgot Password"\n3. Enter your employee ID\n4. Verify your identity using OTP\n5. Set a new password following the password policy\n\nPassword Policy:\n- Minimum 8 characters\n- Must include uppercase, lowercase, number, and special character\n- Cannot reuse last 5 passwords`,
    category: "Account Access",
    tags: ["password", "reset", "account"],
    viewCount: 245,
    helpfulCount: 189,
    createdAt: "2024-01-10",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    title: "VPN Setup Guide",
    content: `VPN Configuration Steps:\n1. Download VPN client from IT portal\n2. Install the client\n3. Enter server address: vpn.powergrid.in\n4. Use your domain credentials\n5. Enable "Remember credentials" for convenience\n\nTroubleshooting:\n- Error 809: Check firewall settings\n- Connection timeout: Verify internet connectivity\n- Authentication failed: Reset your password`,
    category: "Network",
    tags: ["vpn", "remote access", "network"],
    viewCount: 412,
    helpfulCount: 356,
    createdAt: "2024-01-08",
    updatedAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Email Quota Management",
    content: `Managing your email quota:\n1. Archive old emails to local folders\n2. Delete unnecessary emails and empty trash\n3. Remove large attachments\n4. Request quota increase if needed (requires manager approval)\n\nBest Practices:\n- Keep mailbox under 80% capacity\n- Archive emails older than 6 months\n- Use shared drives for large files instead of email attachments`,
    category: "Email",
    tags: ["email", "quota", "mailbox"],
    viewCount: 178,
    helpfulCount: 142,
    createdAt: "2024-01-12",
    updatedAt: "2024-01-13",
  },
  {
    id: "4",
    title: "Software Installation Request Process",
    content: `To request software installation:\n1. Submit a ticket through the IT portal\n2. Provide software name and version\n3. Justify business need\n4. Obtain manager approval\n5. Wait for IT team to verify license availability\n6. Schedule installation time\n\nTypical turnaround: 2-3 business days`,
    category: "Software",
    tags: ["software", "installation", "request"],
    viewCount: 156,
    helpfulCount: 98,
    createdAt: "2024-01-09",
    updatedAt: "2024-01-11",
  },
  {
    id: "5",
    title: "Printer Troubleshooting Guide",
    content: `Common printer issues and solutions:\n\nPrinter Offline:\n1. Check physical connections\n2. Restart printer\n3. Remove and re-add printer in Windows\n4. Update printer drivers\n\nPrint Quality Issues:\n1. Run printer cleaning cycle\n2. Check ink/toner levels\n3. Verify paper quality\n4. Contact IT if issues persist`,
    category: "Hardware",
    tags: ["printer", "hardware", "troubleshooting"],
    viewCount: 203,
    helpfulCount: 167,
    createdAt: "2024-01-07",
    updatedAt: "2024-01-10",
  },
];

export default function KnowledgeBasePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [tabValue, setTabValue] = useState("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // --- Sidebar Configuration ---
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
                selected={item.label === "Knowledge Base"} 
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
                    <item.icon size={18} color={item.label === "Knowledge Base" ? ACCENT_COLOR : TEXT_MUTED} /> 
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

  const filteredArticles = mockArticles.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const categories = Array.from(new Set(mockArticles.map((a) => a.category)));

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getArticlesByTab = (tab) => {
    if (tab === "popular") {
      return [...filteredArticles].sort((a, b) => b.viewCount - a.viewCount);
    } else if (tab === "recent") {
      return [...filteredArticles].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    } else {
      return filteredArticles;
    }
  };

  const dialogStyles = {
    PaperProps: {
      sx: {
        bgcolor: "#0a0f18ff",
        color: 'white',
        border: `1px solid rgba(52, 211, 153, 0.15)`,
        backgroundImage: 'none',
        borderRadius: 3
      }
    }
  };

  const inputStyle = {
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
    '& .MuiInputBase-input::placeholder': {
      color: TEXT_MUTED,
      opacity: 1,
    }
  };

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
      
      {/* Sidebar for large screens (md and up) */}
      <Box sx={{ display: { xs: "none", md: "block" }, borderRight: `1px solid rgba(52, 211, 153, 0.2)` }}>
        {SidebarContent}
      </Box>

      {/* Drawer for small screens (xs and sm) */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar} PaperProps={{ sx: { bgcolor: SIDEBAR_COLOR } }}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Navbar */}
        <Box
          component="header"
          sx={{
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`,
            bgcolor: MAIN_BG_COLOR,
            px: { xs: 2, md: 3 },
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
            position: "sticky",
            top: 0,
            zIndex: 1100,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              sx={{ display: { xs: "inline-flex", md: "none" }, color: ACCENT_COLOR }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
            <Box>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Knowledge Base
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Knowledge Base Body */}
        <Box component="main" sx={{ p: { xs: 2, md: 3 }, display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h4" fontWeight="bold">
                Knowledge Base
              </Typography>
              <Typography variant="body2" color={TEXT_MUTED}>
                Browse articles and solutions for common IT issues.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{
                background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                color: 'black',
                fontWeight: 700,
                borderRadius: 2,
                "&:hover": { opacity: 0.9 }
              }}
            >
              Create Article
            </Button>
          </Box>

          {/* Search */}
          <TextField
            placeholder="Search articles, categories, or tags..."
            fullWidth
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search size={20} color={TEXT_MUTED} />
                </InputAdornment>
              ),
            }}
            sx={inputStyle}
          />
          
          {/* Stats Cards - REFINED */}
          <Grid container spacing={3}>
            {[
              { icon: BookOpen, value: mockArticles.length, label: "Total Articles" },
              { icon: Eye, value: mockArticles.reduce((s, a) => s + a.viewCount, 0), label: "Total Views" },
              { icon: ThumbsUp, value: mockArticles.reduce((s, a) => s + a.helpfulCount, 0), label: "Helpful Votes" },
              { icon: Tag, value: categories.length, label: "Categories" },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card 
                  sx={{ 
                    bgcolor: DARK_CARD_COLOR, 
                    border: `1px solid rgba(52, 211, 153, 0.15)`, 
                    borderRadius: 3,
                    transition: 'all 0.3s',
                    minWidth: 240,
                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: CARD_GLOW_SHADOW,
                    }
                  }}
                >
                  <CardContent>
                    <Stack direction="row" spacing={3} alignItems="center">
                      <Avatar sx={{ bgcolor: CARD_HOVER_BG, color: ACCENT_COLOR }} variant="rounded">
                        <stat.icon size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight="bold" color="white">{stat.value}</Typography>
                        <Typography variant="caption" color={TEXT_MUTED}>{stat.label}</Typography>
                      </Box>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Tabs and Articles */}
          <Box>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              textColor="inherit"
              sx={{
                "& .MuiTabs-indicator": { background: ACCENT_COLOR },
                "& .MuiTab-root": { color: TEXT_MUTED, fontWeight: 'medium' },
                "& .Mui-selected": { color: ACCENT_COLOR, fontWeight: 'bold' },
              }}
            >
              <Tab label="All Articles" value="all" />
              <Tab label="Most Popular" value="popular" />
              <Tab label="Recently Updated" value="recent" />
            </Tabs>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={3}>
                {getArticlesByTab(tabValue).map((article) => (
                  <Grid item xs={12} sm={6} lg={4} key={article.id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        bgcolor: "#11182780",
                        border: `1px solid rgba(52, 211, 153, 0.1)`,
                        height: '100%',
                        borderRadius: 3,
                        transition: 'all 0.3s',
                        '&:hover': { 
                            borderColor: ACCENT_COLOR, 
                            boxShadow: CARD_GLOW_SHADOW,
                            transform: 'translateY(-2px)'
                        },
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <CardHeader
                        title={<Typography variant="subtitle1" fontWeight={700} color="white">{article.title}</Typography>}
                        action={<Chip label={article.category} size="small" sx={{ bgcolor: MAIN_BG_COLOR, color: ACCENT_COLOR }} />}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        
                        {/* Tags */}
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1 }}>
                          {article.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: `rgba(52, 211, 153, 0.2)`, color: TEXT_MUTED }}/>
                          ))}
                        </Stack>
                        
                        {/* Stats */}
                        <Stack direction="row" spacing={3} mt={1} alignItems="center" color={TEXT_MUTED}>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Eye size={14} color={ACCENT_COLOR} />
                            <Typography variant="caption" fontWeight={600}>{article.viewCount} Views</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <ThumbsUp size={14} color={ACCENT_COLOR} />
                            <Typography variant="caption" fontWeight={600}>{article.helpfulCount} Helpful</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ display: { xs: 'none', lg: 'flex'} }}>
                            <Clock size={14} />
                            <Typography variant="caption">Updated {new Date(article.updatedAt).toLocaleDateString()}</Typography>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* View Article Dialog */}
      <Dialog
        open={!!selectedArticle}
        onClose={() => setSelectedArticle(null)}
        maxWidth="md"
        fullWidth
        {...dialogStyles}
      >
        {selectedArticle && (
            <>
              <DialogTitle fontWeight="bold">{selectedArticle.title}</DialogTitle>
              <DialogContent>
                  <Stack spacing={2}>
                      <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          <Chip label={selectedArticle.category} size="small" sx={{ bgcolor: MAIN_BG_COLOR, color: ACCENT_COLOR }} />
                          {selectedArticle.tags.map((tag) => (
                          <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: `rgba(52, 211, 153, 0.2)`, color: TEXT_MUTED }} />
                          ))}
                      </Stack>
                      <Stack direction="row" spacing={3} alignItems="center" color={TEXT_MUTED}>
                          <Stack direction="row" spacing={0.5} alignItems="center"><Eye size={16} color={ACCENT_COLOR} /><Typography variant="body2">{selectedArticle.viewCount} views</Typography></Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center"><ThumbsUp size={16} color={ACCENT_COLOR} /><Typography variant="body2">{selectedArticle.helpfulCount} helpful</Typography></Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center"><Clock size={16} /><Typography variant="body2">Updated {new Date(selectedArticle.updatedAt).toLocaleDateString()}</Typography></Stack>
                      </Stack>
                      <Box sx={{ mt: 1, typography: "body2", whiteSpace: "pre-wrap", color: 'white', lineHeight: 1.7, p: 2, bgcolor: MAIN_BG_COLOR, borderRadius: 2 }}>
                          {selectedArticle.content}
                      </Box>
                      <Divider sx={{ bgcolor: 'rgba(52, 211, 153, 0.2)' }} />
                      <Stack direction="row" spacing={1.5} mt={2} alignItems="center">
                          <Typography variant="body2" color={TEXT_MUTED}>Was this article helpful?</Typography>
                          <Button 
                              size="small" 
                              variant="outlined" 
                              startIcon={<ThumbsUp size={14} />} 
                              sx={{ 
                                  color: ACCENT_COLOR, 
                                  borderColor: ACCENT_COLOR, 
                                  '&:hover': {borderColor: ACCENT_HOVER_COLOR, backgroundColor: CARD_HOVER_BG} 
                              }}
                          >Yes</Button>
                          <Button 
                              size="small" 
                              variant="outlined" 
                              sx={{ 
                                  color: TEXT_MUTED, 
                                  borderColor: `#34d39933`, 
                                  '&:hover': {borderColor: TEXT_MUTED, backgroundColor: CARD_HOVER_BG} 
                              }}
                          >No</Button>
                      </Stack>
                  </Stack>
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => setSelectedArticle(null)} sx={{ color: "white", bgcolor:"#11182780",border:"1.5px solid #34d39933" }}>Close</Button>
              </DialogActions>
            </>
        )}
      </Dialog>
      
      {/* ADDED: Create Article Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        maxWidth="md"
        fullWidth
        {...dialogStyles}
      >
        <DialogTitle fontWeight="bold">Create New Article</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField label="Title" variant="outlined" fullWidth sx={inputStyle} />
            <TextField label="Category" variant="outlined" fullWidth sx={inputStyle} />
            <TextField label="Tags (comma separated)" variant="outlined" fullWidth sx={inputStyle} />
            <TextField label="Content" variant="outlined" multiline rows={8} fullWidth sx={inputStyle} />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)} sx={{ color: TEXT_MUTED }}>Cancel</Button>
          <Button 
            onClick={() => setIsCreateDialogOpen(false)} 
            variant="contained" 
            sx={{
              background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
              color: 'black',
              fontWeight: 700,
              borderRadius: 2,
              "&:hover": { opacity: 0.9 }
            }}
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}