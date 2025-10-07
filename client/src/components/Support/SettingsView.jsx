import * as React from 'react';
import { NavLink } from 'react-router-dom';

// MUI Core Components & Theming
import {
  Box, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar,
  createTheme, ThemeProvider, CssBaseline, TextField, Switch,
  FormControlLabel, Button, MenuItem, Divider, Drawer, IconButton, CircularProgress,
} from '@mui/material';

// Lucide React Icons
import {
  Ticket, Users, Bot, Sparkles, BookOpen, Bell, TrendingUp,
  User as UserIcon, Settings as SettingsIcon, Database as DatabaseIcon,
  Save as SaveIcon, Shield as ShieldIcon, Menu as MenuIcon, LogOut, // Added LogOut icon
} from 'lucide-react';

// --- THEME DEFINITION (Unchanged) ---
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#34d399' },
    secondary: { main: '#10b981' },
    background: { default: '#0a0a0a', paper: '#1a1a1a' },
    text: { primary: '#e5e5e5', secondary: '#9ca3af' },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: { fontFamily: 'inherit' },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { backgroundColor: '#000000', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundImage: 'none' },
      },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
    MuiTabs: {
      styleOverrides: { indicator: { background: 'linear-gradient(to right, #34d399, #10b981)' } },
    },
  },
});

// Helper component for Tab Panels
function TabPanel({ children, value, index }) {
  return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>;
}

const drawerWidth = 256;

// --- MOCK USER DATA & API CALL (Unchanged) ---
const mockUserData = {
    name: "yyyyyy",
    email: "yyyy@gmail.com",
    employeeId: "rvh63",
    role: "employee",
    phoneNumber: "", 
    department: "",
};
const fetchUserData = () => new Promise((resolve) => {
    setTimeout(() => {
        resolve(mockUserData);
    }, 1500);
});


function SettingsPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [profile, setProfile] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [autoAssign, setAutoAssign] = React.useState(true);
  const [aiClassification, setAiClassification] = React.useState(true);

  React.useEffect(() => {
    fetchUserData().then(data => {
      setProfile(data);
      setLoading(false);
    });
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleTabChange = (event, newValue) => setTabIndex(newValue);
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const navItems = [
    { text: 'All Tickets', icon: Ticket, href: '/supportdashboard' },
    { text: 'My Tickets', icon: Users, href: '/tickets' },
    { text: 'Employee Chatbot', icon: Bot, href: '/chatbot' },
    { text: 'AI Classification', icon: Sparkles, href: '/classify' },
    { text: 'Knowledge Base', icon: BookOpen, href: '/knowledgebase' },
    { text: 'Analytics', icon: TrendingUp, href: '/analytics' },
    { text: 'Settings', icon: SettingsIcon, href: '/settings' },
  ];
  
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Top section: Header and main navigation */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', height: 64, borderBottom: 1, borderColor: 'divider', px: 2, bgcolor: '#111' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Avatar sx={{ background: 'linear-gradient(to right, #34d399, #10b981)', width: 32, height: 32, bgcolor: 'transparent' }}>
              <Ticket size={18} color="#fff" />
            </Avatar>
            <Typography variant="h6" component="span" sx={{ fontWeight: 'bold', color: '#fff' }}>
              POWERGRID IT
            </Typography>
          </Box>
        </Box>
        <List sx={{ p: 1 }}>
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton component={NavLink} to={item.href} sx={{ borderRadius: 1, '&:hover': { background: 'linear-gradient(to right, #34d39922, #10b98122)' } }}>
                  <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
                    <IconComponent size={18} />
                  </ListItemIcon>
                  <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }} primary={item.text} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom section: Logout button */}
      <Box sx={{ marginTop: 'auto' }}>
        <Divider />
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton component={NavLink} to="/" sx={{ borderRadius: 1, '&:hover': { background: 'linear-gradient(to right, #34d39922, #10b98122)' } }}>
              <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
                <LogOut size={18} />
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{ variant: 'body2', color: '#fff' }} primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{ keepMounted: true }} sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' } }}>
          {drawerContent}
        </Drawer>
        <Drawer variant="permanent" sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' } }} open>
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <Box component="header" sx={{ display: 'flex', height: 64, alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', bgcolor: '#000', px: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }} >
                    <MenuIcon />
                </IconButton>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Settings</Typography>
                    <Typography variant="body2" color="text.secondary">Manage your account and system preferences</Typography>
                </Box>
            </Box>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, md: 3 } }}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tab icon={<UserIcon size={18} />} iconPosition="start" label="Profile" />
            <Tab icon={<Bell size={18} />} iconPosition="start" label="Notifications" />
            <Tab icon={<SettingsIcon size={18} />} iconPosition="start" label="System" />
            <Tab icon={<DatabaseIcon size={18} />} iconPosition="start" label="Integrations" />
            <Tab icon={<ShieldIcon size={18} />} iconPosition="start" label="Security" />
          </Tabs>

          {/* Profile Tab */}
          <TabPanel value={tabIndex} index={0}>
            {loading || !profile ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress color="primary" />
              </Box>
            ) : (
              <Card>
                <CardHeader title="Profile Information" subheader="Update your personal information and preferences" />
                <CardContent>
                  <TextField fullWidth name="name" label="Full Name" value={profile.name} onChange={handleProfileChange} sx={{ mb: 2 }} />
                  <TextField fullWidth name="email" label="Email" type="email" value={profile.email} onChange={handleProfileChange} sx={{ mb: 2 }} />
                  <TextField fullWidth name="employeeId" label="Employee ID" value={profile.employeeId} disabled sx={{ mb: 2 }} />
                  <TextField fullWidth name="phoneNumber" label="Phone Number" type="tel" value={profile.phoneNumber} onChange={handleProfileChange} sx={{ mb: 2 }} placeholder="Not available in database" />
                  
                  <TextField select fullWidth name="department" label="Department" value={profile.department} onChange={handleProfileChange} sx={{ mb: 2 }}>
                    <MenuItem value=""><em>None</em></MenuItem>
                    <MenuItem value="it-support">IT Support</MenuItem>
                    <MenuItem value="network">Network Team</MenuItem>
                    <MenuItem value="security">Security Team</MenuItem>
                    <MenuItem value="database">Database Team</MenuItem>
                  </TextField>
                  
                  <TextField select fullWidth name="role" label="Role" value={profile.role} onChange={handleProfileChange} >
                    <MenuItem value="employee">Employee</MenuItem>
                    <MenuItem value="agent">Support Agent</MenuItem>
                    <MenuItem value="senior">Senior Agent</MenuItem>
                    <MenuItem value="lead">Team Lead</MenuItem>
                    <MenuItem value="admin">Administrator</MenuItem>
                  </TextField>

                  <Divider sx={{ my: 3 }} />
                  <Box sx={{ textAlign: "right" }}><Button variant="contained" startIcon={<SaveIcon size={18} />}>Save Changes</Button></Box>
                </CardContent>
              </Card>
            )}
          </TabPanel>
          
          {/* Other Tabs (Unchanged) */}
          <TabPanel value={tabIndex} index={1}>
            <Card>
              <CardHeader title="Notification Preferences" subheader="Configure how you receive alerts and updates"/>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography>Email Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">Receive ticket updates via email</Typography>
                  </Box>
                  <Switch checked={emailNotifications} onChange={() => setEmailNotifications(!emailNotifications)} />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography>SMS Notifications</Typography>
                    <Typography variant="body2" color="text.secondary">Receive urgent alerts via SMS</Typography>
                  </Box>
                  <Switch checked={smsNotifications} onChange={() => setSmsNotifications(!smsNotifications)} />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{mb: 1}}>Email Notification Events</Typography>
                <Box>
                  {["New ticket assigned", "Ticket status updated", "New comment added", "SLA breach warning", "Daily summary report"].map((event, index) => (
                    <Box key={event} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                      <Typography>{event}</Typography>
                      <Switch defaultChecked={index !== 4} />
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ textAlign: "right" }}><Button variant="contained" startIcon={<SaveIcon size={18}/>}>Save Preferences</Button></Box>
              </CardContent>
            </Card>
          </TabPanel>
          
          <TabPanel value={tabIndex} index={2}>
            {/* System Tab Content... */}
          </TabPanel>
          
          <TabPanel value={tabIndex} index={3}>
            {/* Integrations Tab Content... */}
          </TabPanel>
          
          <TabPanel value={tabIndex} index={4}>
            {/* Security Tab Content... */}
          </TabPanel>
        </Box>
      </Box>
    </Box>
  );
}

// Main export with ThemeProvider
export default function ThemedSettingsPage() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <SettingsPage />
    </ThemeProvider>
  );
}