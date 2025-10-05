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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  InputAdornment,
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
} from "lucide-react";
import { Link } from "react-router-dom"; // Assuming react-router-dom is used for navigation

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
    { label: "Settings", icon: Settings, href: "/settings" },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const SidebarContent = (
    <Box sx={{ width: 256, bgcolor: "#1a1a1a", height: "100%", display: 'flex', flexDirection: 'column' }}>
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
      <List sx={{ p: 0, flexGrow: 1 }}>
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
            <ListItemIcon sx={{ color: item.href === "/knowledgebase" ? '#34d399' : "#fff", minWidth: 40 }}>
              <item.icon size={18} />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2" color={item.href === "/knowledgebase" ? '#34d399' : "#fff"}>
                  {item.label}
                </Typography>
              }
            />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  // --- Knowledge Base Logic ---
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
        bgcolor: '#1a1a1a',
        color: '#e5e5e5',
        border: '1px solid rgba(255,255,255,0.1)',
        backgroundImage: 'none' // MUI Dialogs can have a default gradient
      }
    }
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0a0a0a", color: "#e5e5e5" }}>
      {/* Sidebar for large screens (md and up) */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>{SidebarContent}</Box>

      {/* Drawer for small screens (xs and sm) */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar}>
        {SidebarContent}
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", overflowY: "auto" }}>
        {/* Navbar */}
        <Box
          component="header"
          sx={{
            borderBottom: "1px solid rgba(255,255,255,0.1)",
            bgcolor: "rgba(0,0,0,0.8)",
            backdropFilter: 'blur(8px)',
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
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#10b981" }}
              onClick={toggleSidebar}
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </IconButton>
            <Box>
              <Typography
                variant="h6"
                fontWeight="600"
                sx={{
                  background: "linear-gradient(to right, #34d399, #10b981)",
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
              <Typography variant="body2" color="#9ca3af">
                Browse articles and solutions for common IT issues.
              </Typography>
            </Box>
            <Button
              variant="contained"
              startIcon={<Plus size={16} />}
              onClick={() => setIsCreateDialogOpen(true)}
              sx={{
                background: "linear-gradient(to right, #34d399, #10b981)",
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
                  <Search size={20} color="#9ca3af" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#1a1a1a",
                color: "#e5e5e5",
                "& fieldset": { borderColor: "rgba(255, 255, 255, 0.1)" },
                "&:hover fieldset": { borderColor: "rgba(255, 255, 255, 0.3)" },
                "&.Mui-focused fieldset": { borderColor: "#10b981" },
              },
            }}
          />
          
          {/* Stats Cards */}
          <Grid container spacing={2}>
            {[
              { icon: BookOpen, value: mockArticles.length, label: "Total Articles" },
              { icon: Eye, value: mockArticles.reduce((s, a) => s + a.viewCount, 0), label: "Total Views" },
              { icon: ThumbsUp, value: mockArticles.reduce((s, a) => s + a.helpfulCount, 0), label: "Helpful Votes" },
              { icon: Tag, value: categories.length, label: "Categories" },
            ].map((stat, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ bgcolor: "#111", border: "1px solid rgba(255,255,255,0.1)" }}>
                  <CardContent>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar sx={{ bgcolor: 'rgba(52, 211, 153, 0.1)', color: '#34d399' }} variant="rounded">
                        <stat.icon size={20} />
                      </Avatar>
                      <Box>
                        <Typography variant="h5" fontWeight="bold">{stat.value}</Typography>
                        <Typography variant="caption" color="#9ca3af">{stat.label}</Typography>
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
                "& .MuiTabs-indicator": { background: "linear-gradient(to right, #34d399, #10b981)" },
              }}
            >
              <Tab label="All Articles" value="all" />
              <Tab label="Most Popular" value="popular" />
              <Tab label="Recently Updated" value="recent" />
            </Tabs>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                {getArticlesByTab(tabValue).map((article) => (
                  <Grid item xs={12} sm={6} lg={4} key={article.id}>
                    <Card
                      sx={{
                        cursor: "pointer",
                        bgcolor: "#111",
                        border: "1px solid rgba(255,255,255,0.1)",
                        height: '100%',
                        "&:hover": { borderColor: "rgba(52, 211, 153, 0.5)" },
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      onClick={() => setSelectedArticle(article)}
                    >
                      <CardHeader
                        title={<Typography variant="subtitle1" fontWeight={600}>{article.title}</Typography>}
                        action={<Chip label={article.category} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#e5e5e5' }} />}
                      />
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                          {article.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#9ca3af' }}/>
                          ))}
                        </Stack>
                        <Stack direction="row" spacing={3} mt={2} alignItems="center" color="#9ca3af">
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <Eye size={14} />
                            <Typography variant="caption">{article.viewCount}</Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.5} alignItems="center">
                            <ThumbsUp size={14} />
                            <Typography variant="caption">{article.helpfulCount}</Typography>
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
                        <Chip label={selectedArticle.category} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: '#e5e5e5' }} />
                        {selectedArticle.tags.map((tag) => (
                        <Chip key={tag} label={tag} size="small" variant="outlined" sx={{ borderColor: 'rgba(255,255,255,0.2)', color: '#9ca3af' }} />
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={3} alignItems="center" color="#9ca3af">
                        <Stack direction="row" spacing={0.5} alignItems="center"><Eye size={16} /><Typography variant="body2">{selectedArticle.viewCount} views</Typography></Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center"><ThumbsUp size={16} /><Typography variant="body2">{selectedArticle.helpfulCount} helpful</Typography></Stack>
                        <Stack direction="row" spacing={0.5} alignItems="center"><Clock size={16} /><Typography variant="body2">Updated {new Date(selectedArticle.updatedAt).toLocaleDateString()}</Typography></Stack>
                    </Stack>
                    <Box sx={{ mt: 1, typography: "body2", whiteSpace: "pre-wrap", color: '#d4d4d4', lineHeight: 1.7 }}>
                        {selectedArticle.content}
                    </Box>
                    <Stack direction="row" spacing={1.5} mt={2} alignItems="center">
                        <Typography variant="body2" color="#9ca3af">Was this article helpful?</Typography>
                        <Button size="small" variant="outlined" startIcon={<ThumbsUp size={14} />} sx={{ color: '#34d399', borderColor: '#34d399', '&:hover': {borderColor: '#34d399', backgroundColor: 'rgba(52, 211, 153, 0.1)'} }}>Yes</Button>
                        <Button size="small" variant="outlined" sx={{ color: '#9ca3af', borderColor: 'rgba(255,255,255,0.2)', '&:hover': {borderColor: '#9ca3af', backgroundColor: 'rgba(156, 163, 175, 0.1)'} }}>No</Button>
                    </Stack>
                  </Stack>
              </DialogContent>
              <DialogActions>
                  <Button onClick={() => setSelectedArticle(null)} sx={{ color: '#e5e5e5' }}>Close</Button>
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
            <TextField label="Title" variant="outlined" fullWidth />
            <TextField label="Category" variant="outlined" fullWidth />
            <TextField label="Tags (comma separated)" variant="outlined" fullWidth />
            <TextField label="Content" variant="outlined" multiline rows={8} fullWidth />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsCreateDialogOpen(false)} sx={{ color: '#9ca3af' }}>Cancel</Button>
          <Button onClick={() => setIsCreateDialogOpen(false)} variant="contained" sx={{
            background: "linear-gradient(to right, #34d399, #10b981)",
            "&:hover": { opacity: 0.9 }
          }}>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}