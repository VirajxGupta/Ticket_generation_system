// SettingsView.jsx
import * as React from 'react';
import { NavLink, Link } from 'react-router-dom'; // Added Link import

// MUI
import {
  Box, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar,
  createTheme, ThemeProvider, CssBaseline, TextField, Switch,
  Button, MenuItem, Divider, Drawer, IconButton
} from '@mui/material';

// Icons
import {
  Ticket, Users, Bot, Sparkles, BookOpen, Bell, TrendingUp,
  User as UserIcon, Settings as SettingsIcon, Database as DatabaseIcon,
  Save as SaveIcon, Shield as ShieldIcon, Menu as MenuIcon,
  LogOut, X
} from 'lucide-react';

import axios from 'axios'; // Ensure axios is imported

// --- THEME CONSTANTS from SupportDashboard (Used for strict adherence) ---
const MAIN_BG_COLOR = '#000000'; 
const SIDEBAR_COLOR = '#030712'; 
const ACCENT_COLOR = '#34d399'; 
const ACCENT_HOVER_COLOR = '#10b981'; 
const TEXT_MUTED = '#9ca3af'; 
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)'; // Used for main ticket list/details/darker elements
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
// ----------------------------------------------------------------------

// --- THEME (Keeping the darkTheme but adding constants for overrides) ---
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT_COLOR },
    secondary: { main: ACCENT_HOVER_COLOR },
    background: { default: MAIN_BG_COLOR, paper: SIDEBAR_COLOR }, // Adjusted paper to SIDEBAR_COLOR
    text: { primary: '#e5e5e5', secondary: TEXT_MUTED },
    divider: 'rgba(255, 255, 255, 0.1)'
  },
  
  components: {
    MuiCard: { 
        styleOverrides: { 
            root: { 
                backgroundColor: DARK_CARD_COLOR, // Using themed dark card color
                border: `1px solid rgba(52, 211, 153, 0.15)`, // Themed border
                boxShadow: '0 0 12px rgba(0,0,0,0.6)'
            } 
        } 
    },
    MuiTab: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
    MuiTabs: { styleOverrides: { indicator: { background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})` } } }
  }
});
// --- END OF THEME ---


function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>;
}

const drawerWidth = 256;

function SettingsPage({ auth }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleTabChange = (e, newValue) => setTabIndex(newValue);

  // --- EDIT STATES ---
  const [editingProfile, setEditingProfile] = React.useState(false);
  const [editingNotifications, setEditingNotifications] = React.useState(false);
  const [editingSystem, setEditingSystem] = React.useState(false);
  const [editingIntegrations, setEditingIntegrations] = React.useState(false);
  const [editingSecurity, setEditingSecurity] = React.useState(false);

  const userEmail = auth?.currentUser?.email || "loading@email.com";
  const userId = auth?.currentUser?.uid;
  
  // --- PROFILE STATES ---
  const [name, setname] = React.useState("Loading...");
  const [phone, setPhone] = React.useState("");
  const [department, setDepartment] = React.useState("");
  const [role, setRole] = React.useState("");

  // useEffect Hook to fetch profile data on component load
  React.useEffect(() => {
    if (!userId) {
        setname("User not found");
        return;
    }
    const fetchProfileData = async () => {
      try {
        // NOTE: This API call is being kept as per original code structure
        const res = await axios.get(`http://localhost:5000/profile/getProfile/${userId}`);
        if (res.data.success && res.data.profile) {
          const profile = res.data.profile;
          setname(profile.name || "");
          setPhone(profile.phone || "");
          setDepartment(profile.department || "it-support");
          setRole(profile.role || "agent");
        } else {
          console.error("Failed to fetch profile:", res.data.error);
          setname("Profile not found");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setname("Error loading profile");
      }
    };
    fetchProfileData();
  }, [userId]);

  // --- OTHER STATES ---
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [autoAssign, setAutoAssign] = React.useState(true);
  const [aiClassification, setAiClassification] = React.useState(true);
  const [slaThresholds, setSlaThresholds] = React.useState({ Critical: 4, High: 8, Medium: 24, Low: 48 });
  const [emailServer, setEmailServer] = React.useState("mail.powergrid.in");
  const [emailPort, setEmailPort] = React.useState(993);
  const [emailProtocol, setEmailProtocol] = React.useState("imap");
  const [supportEmail, setSupportEmail] = React.useState("support@powergrid.in");
  const [enableEmailIntegration, setEnableEmailIntegration] = React.useState(true);
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const sidebarItems = [
    { label: "All Tickets", icon: Ticket, href: "/supportdashboard" },
    { label: "My Tickets", icon: Users, href: "/tickets" },
    { label: "Employee Chatbot", icon: Bot, href: "/chatbot" },
    { label: "AI Classification", icon: Sparkles, href: "/classify" },
    { label: "Knowledge Base", icon: BookOpen, href: "/knowledgebase" },
    { label: "Analytics", icon: TrendingUp, href: "/analytics" },
  ];

  // --- INTEGRATED SIDEBAR CONTENT USING THEME CONSTANTS ---
  const SidebarContent = (
    <Box sx={{ width: drawerWidth, bgcolor: SIDEBAR_COLOR, height: "100%", display: 'flex', flexDirection: 'column', color: 'white' }}>
      <Box>
        <Box
          sx={{
            height: 64,
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`, // Themed border
            px: 3,
            display: "flex",
            alignItems: "center",
            bgcolor: DARK_CARD_COLOR, // Themed header BG
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar
              sx={{
                bgcolor: ACCENT_COLOR, // Themed accent color
                width: 32,
                height: 32,
                color: 'black'
              }}
            >
              <Ticket size={18} />
            </Avatar>
            <Typography variant="h6" fontWeight="bold" color="white">
              POWERGRID IT
            </Typography>
          </Box>
        </Box>
        <List sx={{ p: 1 }}>
          {sidebarItems.map((item) => (
            <ListItem key={item.label} disablePadding>
              <ListItemButton
                component={Link}
                to={item.href}
                sx={{
                  borderRadius: 2, 
                  color: TEXT_MUTED, // Changed from 'white' to TEXT_MUTED for consistency
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
                    <item.icon size={18} /> 
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

      {/* This is the updated bottom section */}
      <Box sx={{ marginTop: 'auto' }}>
        <Divider sx={{ bgcolor: 'rgba(52, 211, 153, 0.2)' }} /> 
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={Link}
              to="/settings"
              selected={true} // Always selected on settings page
              sx={{
                borderRadius: 2,
                color: TEXT_MUTED, 
                py: 1.5,
                "&.Mui-selected": {
                    background: CARD_HOVER_BG, 
                    color: ACCENT_COLOR,
                    fontWeight: 'bold',
                    "& .MuiListItemIcon-root": { color: ACCENT_COLOR },
                },
                "&:hover": {
                  background: CARD_HOVER_BG, 
                  color: ACCENT_COLOR,
                  "& .MuiListItemIcon-root": { color: ACCENT_COLOR },
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                <SettingsIcon size={18} />
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
                  color: '#ef4444', // Red for logout
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
  // --- END OF INTEGRATED SIDEBAR CONTENT ---


  const handleProfileSave = async () => {
    if (!userId) {
      alert("User not logged in or User ID is missing!");
      return;
    }
    const dataToSend = { uid: userId, name, phone, department, role };
    try {
      // NOTE: This API call is being kept as per original code structure
      const res = await axios.post("http://localhost:5000/profile/updateProfile", dataToSend);
      if(res.data.success) {
        alert("Profile updated successfully! 🎉");
        setEditingProfile(false);
      } else {
        alert(res.data.error || "Failed to update profile");
      }
    } catch(err) { 
      console.error("Error updating profile:", err); 
      alert("Server error updating profile"); 
    }
  };

  const handleIntegrationsSave = () => {
    alert("Integrations saved!");
    setEditingIntegrations(false);
  };
  
  const handleSecuritySave = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }
    alert("Password change logic executed");
    setEditingSecurity(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  return (
    <Box sx={{ display:'flex', height:'100vh', bgcolor: MAIN_BG_COLOR }}>
      {/* Sidebar for large screens */}
      <Box 
        component="nav" 
        sx={{ 
            width:{md:drawerWidth}, 
            flexShrink:{md:0}, 
            display: { xs: "none", md: "flex" }, 
            borderRight: `1px solid rgba(52, 211, 153, 0.2)`,
        }}
      >
        {SidebarContent}
      </Box>

      {/* Drawer for mobile */}
      <Drawer 
        variant="temporary" 
        open={mobileOpen} 
        onClose={handleDrawerToggle} 
        ModalProps={{keepMounted:true}} 
        sx={{ 
            display:{xs:'block',md:'none'}, 
            '& .MuiDrawer-paper':{
                boxSizing:'border-box',
                width:drawerWidth,
                bgcolor: SIDEBAR_COLOR // Themed background
            }
        }}
      >
        {SidebarContent}
      </Drawer>


      <Box component="main" sx={{ flexGrow:1,width:{md:`calc(100% - ${drawerWidth}px)`}, display:'flex', flexDirection:'column', overflow:'hidden'}}>
        {/* Header/Navbar */}
        <Box 
          component="header" 
          sx={{ 
            display:'flex', 
            height:64, 
            alignItems:'center', 
            justifyContent:'space-between', 
            borderBottom: `1px solid rgba(52, 211, 153, 0.2)`, 
            bgcolor: MAIN_BG_COLOR, 
            px:{xs:2,md:3},
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}>
          <Box sx={{ display:'flex', alignItems:'center'}}>
            <IconButton 
                color="inherit" 
                onClick={handleDrawerToggle} 
                sx={{ mr:2, display:{md:'none'}, color: ACCENT_COLOR }} // Themed icon
            >
                <MenuIcon/>
            </IconButton>
            <Box>
              <Typography 
                variant="h5" 
                sx={{ 
                    fontWeight:'bold',
                    background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
              >
                Settings
              </Typography>
              <Typography variant="body2" color={TEXT_MUTED}>Manage your account and system preferences</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex:1, overflow:'auto', p:{xs:2,md:3}}}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange} 
            variant="scrollable" 
            scrollButtons="auto" 
            sx={{ 
                borderBottom:1, 
                borderColor:'rgba(52, 211, 153, 0.2)', // Themed border
                "& .MuiTabs-indicator": {
                    background: ACCENT_COLOR, // Themed indicator
                },
                "& .MuiTab-root": { color: TEXT_MUTED, fontWeight: 'medium' },
                "& .Mui-selected": { color: ACCENT_COLOR, fontWeight: 'bold' },
            }}
          >
            <Tab icon={<UserIcon size={18}/>} iconPosition="start" label="Profile"/>
            <Tab icon={<Bell size={18}/>} iconPosition="start" label="Notifications"/>
            <Tab icon={<SettingsIcon size={18}/>} iconPosition="start" label="System"/>
            <Tab icon={<DatabaseIcon size={18}/>} iconPosition="start" label="Integrations"/>
            <Tab icon={<ShieldIcon size={18}/>} iconPosition="start" label="Security"/>
          </Tabs>

          {/* -------------- PROFILE -------------- */}
          <TabPanel value={tabIndex} index={0}>
            <Card>
              <CardHeader title="Profile Information" subheader="Update your personal information" 
                action={!editingProfile && <Button variant="outlined" size="small" onClick={()=>setEditingProfile(true)} sx={{borderColor:ACCENT_COLOR, color:ACCENT_COLOR}}>Edit</Button>}/>
              <CardContent>
                <TextField fullWidth label="Full Name" value={name} onChange={e=>setname(e.target.value)} InputProps={{ readOnly: !editingProfile }} sx={{mb:2}}/>
                <TextField fullWidth label="Email" type="email" value={userEmail} InputProps={{ readOnly:true }} sx={{mb:2}}/>
                <TextField fullWidth label="Phone Number" type="tel" value={phone} onChange={e=>setPhone(e.target.value)} InputProps={{ readOnly:!editingProfile }} sx={{mb:2}}/>
                <TextField select fullWidth label="Department" value={department} onChange={e=>setDepartment(e.target.value)} InputProps={{readOnly:!editingProfile}} sx={{mb:2}}>
                  <MenuItem value="it-support">IT Support</MenuItem>
                  <MenuItem value="network">Network Team</MenuItem>
                  <MenuItem value="security">Security Team</MenuItem>
                  <MenuItem value="database">Database Team</MenuItem>
                </TextField>
                <TextField select fullWidth label="Role" value={role} onChange={e=>setRole(e.target.value)} InputProps={{readOnly:!editingProfile}}>
                  <MenuItem value="agent">Support Agent</MenuItem>
                  <MenuItem value="senior">Senior Agent</MenuItem>
                  <MenuItem value="lead">Team Lead</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </TextField>
                <Divider sx={{my:3, bgcolor: 'rgba(52, 211, 153, 0.2)'}}/>
                {editingProfile && <Box sx={{textAlign:'right'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveIcon size={18}/>} 
                        onClick={handleProfileSave}
                        sx={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, color: "black", fontWeight: 'bold' }}
                    >
                        Save Changes
                    </Button>
                </Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- NOTIFICATIONS ---------------- */}
          <TabPanel value={tabIndex} index={1}>
            <Card>
              <CardHeader title="Notification Preferences" subheader="Configure alerts" 
                action={!editingNotifications && <Button variant="outlined" size="small" onClick={()=>setEditingNotifications(true)} sx={{borderColor:ACCENT_COLOR, color:ACCENT_COLOR}}>Edit</Button>}/>
              <CardContent>
                {["Email Notifications","SMS Notifications"].map((label,idx)=>(
                  <Box key={label} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                    <Box><Typography>{label}</Typography></Box>
                    <Switch checked={idx===0?emailNotifications:smsNotifications} disabled={!editingNotifications} onChange={()=>idx===0?setEmailNotifications(!emailNotifications):setSmsNotifications(!smsNotifications)} color="primary"/>
                  </Box>
                ))}
                <Divider sx={{my:3, bgcolor: 'rgba(52, 211, 153, 0.2)'}}/>
                {editingNotifications && <Box sx={{textAlign:'right'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveIcon size={18}/>} 
                        onClick={()=>setEditingNotifications(false)}
                        sx={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, color: "black", fontWeight: 'bold' }}
                    >
                        Save Notifications
                    </Button>
                </Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- SYSTEM ---------------- */}
          <TabPanel value={tabIndex} index={2}>
            <Card>
              <CardHeader title="System Configuration" subheader="Configure system options" 
                action={!editingSystem && <Button variant="outlined" size="small" onClick={()=>setEditingSystem(true)} sx={{borderColor:ACCENT_COLOR, color:ACCENT_COLOR}}>Edit</Button>}/>
              <CardContent>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                  <Typography>Auto Assign</Typography>
                  <Switch checked={autoAssign} disabled={!editingSystem} onChange={()=>setAutoAssign(!autoAssign)} color="primary"/>
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                  <Typography>AI Classification</Typography>
                  <Switch checked={aiClassification} disabled={!editingSystem} onChange={()=>setAiClassification(!aiClassification)} color="primary"/>
                </Box>
                <Typography variant="subtitle1" sx={{mt: 3, mb:1}}>SLA Thresholds (Hours)</Typography>
                <Grid container spacing={2}>
                    {Object.keys(slaThresholds).map(lvl=>(
                        <Grid item xs={6} sm={3} key={lvl}>
                            <TextField fullWidth type="number" size="small" label={lvl} value={slaThresholds[lvl]} disabled={!editingSystem} onChange={e=>setSlaThresholds(prev=>({...prev,[lvl]:Number(e.target.value)}))} />
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{my:3, bgcolor: 'rgba(52, 211, 153, 0.2)'}}/>
                {editingSystem && <Box sx={{textAlign:'right'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveIcon size={18}/>} 
                        onClick={()=>setEditingSystem(false)}
                        sx={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, color: "black", fontWeight: 'bold' }}
                    >
                        Save System
                    </Button>
                </Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- INTEGRATIONS ---------------- */}
          <TabPanel value={tabIndex} index={3}>
            <Card>
              <CardHeader title="Email Integration" subheader="Configure email settings" 
                action={!editingIntegrations && <Button variant="outlined" size="small" onClick={()=>setEditingIntegrations(true)} sx={{borderColor:ACCENT_COLOR, color:ACCENT_COLOR}}>Edit</Button>}/>
              <CardContent>
                <TextField fullWidth label="Email Server" value={emailServer} onChange={e=>setEmailServer(e.target.value)} disabled={!editingIntegrations} sx={{mb:2}}/>
                <TextField fullWidth label="Port" type="number" value={emailPort} onChange={e=>setEmailPort(Number(e.target.value))} disabled={!editingIntegrations} sx={{mb:2}}/>
                <TextField select fullWidth label="Protocol" value={emailProtocol} onChange={e=>setEmailProtocol(e.target.value)} disabled={!editingIntegrations} sx={{mb:2}}>
                  {["imap","pop3"].map(p=><MenuItem key={p} value={p}>{p.toUpperCase()}</MenuItem>)}
                </TextField>
                <TextField fullWidth label="Support Email" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)} disabled={!editingIntegrations} sx={{mb:2}}/>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                    <Typography>Enable Email Integration</Typography>
                    <Switch checked={enableEmailIntegration} disabled={!editingIntegrations} onChange={()=>setEnableEmailIntegration(!enableEmailIntegration)} color="primary"/>
                </Box>
                <Divider sx={{my:3, bgcolor: 'rgba(52, 211, 153, 0.2)'}}/>
                {editingIntegrations && <Box sx={{textAlign:'right'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveIcon size={18}/>} 
                        onClick={handleIntegrationsSave}
                        sx={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, color: "black", fontWeight: 'bold' }}
                    >
                        Save Integration
                    </Button>
                </Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- SECURITY ---------------- */}
          <TabPanel value={tabIndex} index={4}>
            <Card>
              <CardHeader title="Change Password" subheader="Update your account password" 
                action={!editingSecurity && <Button variant="outlined" size="small" onClick={()=>setEditingSecurity(true)} sx={{borderColor:ACCENT_COLOR, color:ACCENT_COLOR}}>Edit</Button>}/>
              <CardContent>
                <TextField fullWidth label="Current Password" type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} disabled={!editingSecurity} sx={{mb:2}}/>
                <TextField fullWidth label="New Password" type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} disabled={!editingSecurity} sx={{mb:2}}/>
                <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} disabled={!editingSecurity} sx={{mb:2}}/>
                <Divider sx={{my:3, bgcolor: 'rgba(52, 211, 153, 0.2)'}}/>
                {editingSecurity && <Box sx={{textAlign:'right'}}>
                    <Button 
                        variant="contained" 
                        startIcon={<SaveIcon size={18}/>} 
                        onClick={handleSecuritySave}
                        sx={{ background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, color: "black", fontWeight: 'bold' }}
                    >
                        Change Password
                    </Button>
                </Box>}
              </CardContent>
            </Card>
          </TabPanel>

        </Box>
      </Box>
    </Box>
  )
}

export default function ThemedSettingsPage({ auth }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>
      <SettingsPage auth={auth}/>
    </ThemeProvider>
  )
}