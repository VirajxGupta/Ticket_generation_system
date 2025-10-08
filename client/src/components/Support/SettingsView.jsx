// SettingsView.jsx
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

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
  Save as SaveIcon, Shield as ShieldIcon, Menu as MenuIcon
} from 'lucide-react';

// --- THEME ---
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#34d399' },
    secondary: { main: '#10b981' },
    background: { default: '#0a0a0a', paper: '#1a1a1a' },
    text: { primary: '#e5e5e5', secondary: '#9ca3af' },
    divider: 'rgba(255, 255, 255, 0.1)'
  },
  typography: { fontFamily: 'inherit' },
  components: {
    MuiCard: { styleOverrides: { root: { backgroundColor: '#000000', border: '1px solid rgba(255,255,255,0.1)' } } },
    MuiTab: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
    MuiTabs: { styleOverrides: { indicator: { background: 'linear-gradient(to right,#34d399,#10b981)' } } }
  }
});

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
          <Avatar sx={{ background: 'linear-gradient(to right,#34d399,#10b981)', width: 32, height: 32 }}>
            <Ticket size={18} color="#fff"/>
          </Avatar>
          <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#fff' }}>POWERGRID IT</Typography>
        </Box>
      </Box>
      <List sx={{ p: 1 }}>
        {navItems.map((item)=> {
          const IconComponent = item.icon;
          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={NavLink} to={item.href} sx={{ borderRadius:1,'&:hover':{background:'linear-gradient(to right,#34d39922,#10b98122)'}}}>
                <ListItemIcon sx={{ color:'#fff', minWidth:36 }}><IconComponent size={18}/></ListItemIcon>
                <ListItemText primaryTypographyProps={{ variant:'body2', color:'#fff'}} primary={item.text}/>
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
    </div>
  );

  const handleProfileSave = async () => {
    if (!userId) {
      alert("User not logged in or User ID is missing!");
      return;
    }
    const dataToSend = { uid: userId, name, phone, department, role };
    try {
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
    <Box sx={{ display:'flex', height:'100vh'}}>
      <Box component="nav" sx={{ width:{md:drawerWidth}, flexShrink:{md:0}}}>
        <Drawer variant="temporary" open={mobileOpen} onClose={handleDrawerToggle} ModalProps={{keepMounted:true}} sx={{ display:{xs:'block',md:'none'}, '& .MuiDrawer-paper':{boxSizing:'border-box',width:drawerWidth,bgcolor:'background.paper'}}}>
          {drawerContent}
        </Drawer>
        <Drawer variant="permanent" sx={{ display:{xs:'none',md:'block'}, '& .MuiDrawer-paper':{boxSizing:'border-box',width:drawerWidth,bgcolor:'background.paper'}}} open>
          {drawerContent}
        </Drawer>
      </Box>

      <Box component="main" sx={{ flexGrow:1,width:{md:`calc(100% - ${drawerWidth}px)`}, display:'flex', flexDirection:'column', overflow:'hidden'}}>
        <Box component="header" sx={{ display:'flex', height:64, alignItems:'center', justifyContent:'space-between', borderBottom:1, borderColor:'divider', bgcolor:'#000', px:{xs:2,md:3}}}>
          <Box sx={{ display:'flex', alignItems:'center'}}>
            <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr:2, display:{md:'none'}}}><MenuIcon/></IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight:'bold'}}>Settings</Typography>
              <Typography variant="body2" color="text.secondary">Manage your account and system preferences</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ flex:1, overflow:'auto', p:{xs:2,md:3}}}>
          <Tabs value={tabIndex} onChange={handleTabChange} variant="scrollable" scrollButtons="auto" sx={{ borderBottom:1, borderColor:'divider'}}>
            <Tab icon={<UserIcon size={18}/>} iconPosition="start" label="Profile"/>
            <Tab icon={<Bell size={18}/>} iconPosition="start" label="Notifications"/>
            <Tab icon={<SettingsIcon size={18}/>} iconPosition="start" label="System"/>
            <Tab icon={<DatabaseIcon size={18}/>} iconPosition="start" label="Integrations"/>
            <Tab icon={<ShieldIcon size={18}/>} iconPosition="start" label="Security"/>
          </Tabs>

          {/* -------------- PROFILE -------------- */}
          <TabPanel value={tabIndex} index={0}>
            <Card>
              <CardHeader title="Profile Information" subheader="Update your personal information" action={!editingProfile && <Button variant="outlined" size="small" onClick={()=>setEditingProfile(true)}>Edit</Button>}/>
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
                <Divider sx={{my:3}}/>
                {editingProfile && <Box sx={{textAlign:'right'}}><Button variant="contained" startIcon={<SaveIcon size={18}/>} onClick={handleProfileSave}>Save Changes</Button></Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- NOTIFICATIONS ---------------- */}
          <TabPanel value={tabIndex} index={1}>
            <Card>
              <CardHeader title="Notification Preferences" subheader="Configure alerts" action={!editingNotifications && <Button variant="outlined" size="small" onClick={()=>setEditingNotifications(true)}>Edit</Button>}/>
              <CardContent>
                {["Email Notifications","SMS Notifications"].map((label,idx)=>(
                  <Box key={label} sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                    <Box><Typography>{label}</Typography></Box>
                    <Switch checked={idx===0?emailNotifications:smsNotifications} disabled={!editingNotifications} onChange={()=>idx===0?setEmailNotifications(!emailNotifications):setSmsNotifications(!smsNotifications)}/>
                  </Box>
                ))}
                <Divider sx={{my:3}}/>
                {editingNotifications && <Box sx={{textAlign:'right'}}><Button variant="contained" startIcon={<SaveIcon size={18}/>} onClick={()=>setEditingNotifications(false)}>Save Notifications</Button></Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- SYSTEM ---------------- */}
          <TabPanel value={tabIndex} index={2}>
            <Card>
              <CardHeader title="System Configuration" subheader="Configure system options" action={!editingSystem && <Button variant="outlined" size="small" onClick={()=>setEditingSystem(true)}>Edit</Button>}/>
              <CardContent>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                  <Typography>Auto Assign</Typography>
                  <Switch checked={autoAssign} disabled={!editingSystem} onChange={()=>setAutoAssign(!autoAssign)}/>
                </Box>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}>
                  <Typography>AI Classification</Typography>
                  <Switch checked={aiClassification} disabled={!editingSystem} onChange={()=>setAiClassification(!aiClassification)}/>
                </Box>
                <Typography variant="subtitle1" sx={{mt: 3, mb:1}}>SLA Thresholds (Hours)</Typography>
                <Grid container spacing={2}>
                    {Object.keys(slaThresholds).map(lvl=>(
                        <Grid item xs={6} sm={3} key={lvl}>
                            <TextField fullWidth type="number" size="small" label={lvl} value={slaThresholds[lvl]} disabled={!editingSystem} onChange={e=>setSlaThresholds(prev=>({...prev,[lvl]:Number(e.target.value)}))} />
                        </Grid>
                    ))}
                </Grid>
                <Divider sx={{my:3}}/>
                {editingSystem && <Box sx={{textAlign:'right'}}><Button variant="contained" startIcon={<SaveIcon size={18}/>} onClick={()=>setEditingSystem(false)}>Save System</Button></Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- INTEGRATIONS ---------------- */}
          <TabPanel value={tabIndex} index={3}>
            <Card>
              <CardHeader title="Email Integration" subheader="Configure email settings" action={!editingIntegrations && <Button variant="outlined" size="small" onClick={()=>setEditingIntegrations(true)}>Edit</Button>}/>
              <CardContent>
                <TextField fullWidth label="Email Server" value={emailServer} onChange={e=>setEmailServer(e.target.value)} disabled={!editingIntegrations} sx={{mb:2}}/>
                <TextField fullWidth label="Port" type="number" value={emailPort} onChange={e=>setEmailPort(Number(e.target.value))} disabled={!editingIntegrations} sx={{mb:2}}/>
                <TextField select fullWidth label="Protocol" value={emailProtocol} onChange={e=>setEmailProtocol(e.target.value)} disabled={!editingIntegrations} sx={{mb:2}}>
                  {["imap","pop3"].map(p=><MenuItem key={p} value={p}>{p.toUpperCase()}</MenuItem>)}
                </TextField>
                <TextField fullWidth label="Support Email" value={supportEmail} onChange={e=>setSupportEmail(e.target.value)} disabled={!editingIntegrations} sx={{mb:2}}/>
                <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'center',mb:2}}><Typography>Enable Email Integration</Typography><Switch checked={enableEmailIntegration} disabled={!editingIntegrations} onChange={()=>setEnableEmailIntegration(!enableEmailIntegration)}/></Box>
                <Divider sx={{my:3}}/>
                {editingIntegrations && <Box sx={{textAlign:'right'}}><Button variant="contained" startIcon={<SaveIcon size={18}/>} onClick={handleIntegrationsSave}>Save Integration</Button></Box>}
              </CardContent>
            </Card>
          </TabPanel>

          {/* ---------------- SECURITY ---------------- */}
          <TabPanel value={tabIndex} index={4}>
            <Card>
              <CardHeader title="Change Password" subheader="Update your account password" action={!editingSecurity && <Button variant="outlined" size="small" onClick={()=>setEditingSecurity(true)}>Edit</Button>}/>
              <CardContent>
                <TextField fullWidth label="Current Password" type="password" value={currentPassword} onChange={e=>setCurrentPassword(e.target.value)} disabled={!editingSecurity} sx={{mb:2}}/>
                <TextField fullWidth label="New Password" type="password" value={newPassword} onChange={e=>setNewPassword(e.target.value)} disabled={!editingSecurity} sx={{mb:2}}/>
                <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} disabled={!editingSecurity} sx={{mb:2}}/>
                <Divider sx={{my:3}}/>
                {editingSecurity && <Box sx={{textAlign:'right'}}><Button variant="contained" startIcon={<SaveIcon size={18}/>} onClick={handleSecuritySave}>Change Password</Button></Box>}
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