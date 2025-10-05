import * as React from 'react';
import { NavLink } from 'react-router-dom';

// MUI Core Components & Theming
import {
  Box, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar,
  createTheme, ThemeProvider, CssBaseline, TextField, Switch,
  FormControlLabel, Button, MenuItem, Divider, Drawer, IconButton,
} from '@mui/material';

// Lucide React Icons
import {
  Ticket, Users, Bot, Sparkles, BookOpen, Bell, TrendingUp,
  User as UserIcon, Settings as SettingsIcon, Database as DatabaseIcon,
  Save as SaveIcon, Shield as ShieldIcon, Menu as MenuIcon,
} from 'lucide-react';

// --- THEME DEFINITION ---
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

function SettingsPage() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [tabIndex, setTabIndex] = React.useState(0);
  const [emailNotifications, setEmailNotifications] = React.useState(true);
  const [smsNotifications, setSmsNotifications] = React.useState(false);
  const [autoAssign, setAutoAssign] = React.useState(true);
  const [aiClassification, setAiClassification] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const handleTabChange = (event, newValue) => setTabIndex(newValue);

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
    <div>
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
    </div>
  );

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' } }}
        >
          {drawerContent}
        </Drawer>
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Header */}
        <Box component="header" sx={{ display: 'flex', height: 64, alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', bgcolor: '#000', px: { xs: 2, md: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Settings</Typography>
                    <Typography variant="body2" color="text.secondary">Manage your account and system preferences</Typography>
                </Box>
            </Box>
        </Box>

        {/* Settings Page Content */}
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
            <Card>
              <CardHeader title="Profile Information" subheader="Update your personal information and preferences" />
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}><TextField fullWidth label="First Name" defaultValue="Rajesh" /></Grid>
                  <Grid item xs={12} md={6}><TextField fullWidth label="Last Name" defaultValue="Kumar" /></Grid>
                </Grid>
                <TextField fullWidth label="Email" type="email" defaultValue="rajesh.kumar@powergrid.in" sx={{ mt: 2 }} />
                <TextField fullWidth label="Phone Number" type="tel" defaultValue="+91 98765 43210" sx={{ mt: 2 }} />
                <TextField select fullWidth label="Department" defaultValue="it-support" sx={{ mt: 2 }}>
                  <MenuItem value="it-support">IT Support</MenuItem>
                  <MenuItem value="network">Network Team</MenuItem>
                  <MenuItem value="security">Security Team</MenuItem>
                  <MenuItem value="database">Database Team</MenuItem>
                </TextField>
                <TextField select fullWidth label="Role" defaultValue="agent" sx={{ mt: 2 }}>
                  <MenuItem value="agent">Support Agent</MenuItem>
                  <MenuItem value="senior">Senior Agent</MenuItem>
                  <MenuItem value="lead">Team Lead</MenuItem>
                  <MenuItem value="admin">Administrator</MenuItem>
                </TextField>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ textAlign: "right" }}><Button variant="contained" startIcon={<SaveIcon size={18} />}>Save Changes</Button></Box>
              </CardContent>
            </Card>
          </TabPanel>
          
          {/* Notifications Tab */}
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
          
          {/* System Tab */}
          <TabPanel value={tabIndex} index={2}>
            <Card>
              <CardHeader title="System Configuration" subheader="Configure ticket management and AI settings"/>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography>Auto-Assign Tickets</Typography>
                    <Typography variant="body2" color="text.secondary">Automatically assign tickets to available agents</Typography>
                  </Box>
                  <Switch checked={autoAssign} onChange={() => setAutoAssign(!autoAssign)} />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography>AI Classification</Typography>
                    <Typography variant="body2" color="text.secondary">Use AI to automatically classify and route tickets</Typography>
                  </Box>
                  <Switch checked={aiClassification} onChange={() => setAiClassification(!aiClassification)} />
                </Box>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{mb: 2}}>SLA Thresholds (in hours)</Typography>
                  {["Critical", "High", "Medium", "Low"].map((level, idx) => (
                    <Grid container spacing={2} key={level} sx={{ alignItems: "center", mb: 2 }}>
                      <Grid item xs={4} md={2}><Typography>{level}</Typography></Grid>
                      <Grid item xs={8} md={10}>
                        <TextField type="number" size="small" label={`Hours for ${level} priority`} defaultValue={[4, 8, 24, 48][idx]} sx={{ maxWidth: 200 }}/>
                      </Grid>
                    </Grid>
                  ))}
                <Divider sx={{ my: 3 }} />
                <Box sx={{ textAlign: "right" }}><Button variant="contained" startIcon={<SaveIcon size={18}/>}>Save Configuration</Button></Box>
              </CardContent>
            </Card>
          </TabPanel>
          
          {/* Integrations Tab */}
          <TabPanel value={tabIndex} index={3}>
            <Card>
              <CardHeader title="Email Integration" subheader="Configure email ticket ingestion" />
              <CardContent>
                <TextField fullWidth label="Email Server" defaultValue="mail.powergrid.in" sx={{ mb: 2 }} />
                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={12} md={6}><TextField fullWidth label="Port" type="number" defaultValue="993" /></Grid>
                  <Grid item xs={12} md={6}>
                    <TextField select fullWidth label="Protocol" defaultValue="imap">
                      <MenuItem value="imap">IMAP</MenuItem>
                      <MenuItem value="pop3">POP3</MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
                <TextField fullWidth label="Support Email Address" type="email" defaultValue="support@powergrid.in" sx={{ mb: 2 }} />
                 <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: 'center', mb: 2 }}>
                  <Box>
                    <Typography>Enable Email Integration</Typography>
                    <Typography variant="body2" color="text.secondary">Accept tickets via email</Typography>
                  </Box>
                  <Switch defaultChecked />
                </Box>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ textAlign: "right" }}><Button variant="contained" startIcon={<SaveIcon size={18}/>}>Save Integration</Button></Box>
              </CardContent>
            </Card>
          </TabPanel>
          
          {/* Security Tab */}
          <TabPanel value={tabIndex} index={4}>
            <Card>
              <CardHeader title="Change Password" subheader="Update your account password" />
              <CardContent>
                <TextField fullWidth type="password" label="Current Password" sx={{ mb: 2 }} />
                <TextField fullWidth type="password" label="New Password" sx={{ mb: 2 }} />
                <TextField fullWidth type="password" label="Confirm New Password" sx={{ mb: 2 }} />
                <Divider sx={{ my: 2 }} />
                <Box sx={{ textAlign: "right" }}><Button variant="contained" startIcon={<SaveIcon size={18} />}>Update Password</Button></Box>
              </CardContent>
            </Card>
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