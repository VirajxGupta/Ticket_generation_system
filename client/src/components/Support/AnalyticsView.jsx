import * as React from 'react';
import { NavLink } from 'react-router-dom';

// MUI Core Components & Theming
import {
  Box, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Avatar,
  createTheme, ThemeProvider, CssBaseline, Drawer, IconButton, Divider,
} from '@mui/material';

// Lucide React Icons
import {
  Ticket, Users, Bot, Sparkles, BookOpen, TrendingUp, Clock,
  CheckCircle2, Settings, Menu as MenuIcon, LogOut, X,
} from 'lucide-react';

// MUI X Charts
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

// --- THEME CONSTANTS ---
const MAIN_BG_COLOR = '#000000'; 
const SIDEBAR_COLOR = '#030712'; 
const ACCENT_COLOR = '#34d399'; 
const ACCENT_HOVER_COLOR = '#10b981'; 
const TEXT_MUTED = '#9ca3af'; 
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)'; 
const CARD_HOVER_BG = 'rgba(52, 211, 153, 0.05)';
const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.15)`;
// ----------------------------------------------------------------------

// --- THEME DEFINITION ---
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT_COLOR },
    secondary: { main: ACCENT_HOVER_COLOR },
    background: { default: MAIN_BG_COLOR, paper: SIDEBAR_COLOR },
    text: { primary: 'white', secondary: TEXT_MUTED },
    divider: 'rgba(52, 211, 153, 0.2)',
  },
  
  components: {
    MuiCard: {
      styleOverrides: { 
        root: { 
          backgroundColor: DARK_CARD_COLOR, 
          border: `1px solid rgba(52, 211, 153, 0.15)`, 
          backgroundImage: 'none',
          borderRadius: 3,
        } 
      },
    },
    MuiTab: {
      styleOverrides: { 
        root: { 
          textTransform: 'none', 
          fontWeight: 600,
          color: TEXT_MUTED,
          '&.Mui-selected': {
            color: ACCENT_COLOR,
          }
        } 
      },
    },
    MuiTabs: {
      styleOverrides: { 
        indicator: { 
          background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})` 
        } 
      },
    },
  },
});

// --- MOCK DATA ---
const ticketTrendData = [
  { month: "Jul", created: 145, resolved: 132, avgTime: 4.2 },
  { month: "Aug", created: 168, resolved: 155, avgTime: 4.5 },
  { month: "Sep", created: 192, resolved: 178, avgTime: 4.1 },
  { month: "Oct", created: 156, resolved: 165, avgTime: 3.8 },
  { month: "Nov", created: 178, resolved: 182, avgTime: 3.5 },
  { month: "Dec", created: 203, resolved: 198, avgTime: 3.2 },
  { month: "Jan", created: 189, resolved: 195, avgTime: 3.0 },
];

const categoryData = [
  { id: 0, name: "Network", value: 245 },
  { id: 1, name: "Hardware", value: 189 },
  { id: 2, name: "Software", value: 167 },
  { id: 3, name: "Access", value: 134 },
  { id: 4, name: "Email", value: 98 },
];

const sourceData = [
  { source: "Email", count: 312 },
  { source: "GLPI", count: 278 },
  { source: "Chatbot", count: 245 },
  { source: "Solman", count: 198 },
];

const teamPerformanceData = [
  { team: "Network Team", resolved: 145, avgTime: 2.8, satisfaction: 4.5 },
  { team: "Hardware Team", resolved: 132, avgTime: 3.2, satisfaction: 4.3 },
  { team: "Software Team", resolved: 128, avgTime: 3.5, satisfaction: 4.4 },
  { team: "Access Team", resolved: 98, avgTime: 2.1, satisfaction: 4.7 },
];

const iconMap = {
  CheckCircle2: CheckCircle2,
  Clock: Clock,
  TrendingUp: TrendingUp,
  BookOpen: BookOpen,
};

const aiMetrics = [
    { label: "Auto-Resolved", value: "342", change: "+12%", icon: "CheckCircle2", color: "#34d399" },
    { label: "Avg Classification Time", value: "1.2s", change: "-0.3s", icon: "Clock", color: "#60a5fa" },
    { label: "AI Accuracy", value: "94.5%", change: "+2.1%", icon: "TrendingUp", color: "#c084fc" },
    { label: "KB Suggestions", value: "1,234", change: "+18%", icon: "BookOpen", color: "#f59e0b" },
];

const drawerWidth = 256;

function AnalyticsView() {
  const [tabValue, setTabValue] = React.useState('7days');
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleTabChange = (event, newValue) => { setTabValue(newValue); };
  
  const totalCategoryValue = categoryData.reduce((acc, item) => acc + item.value, 0);
  const pieChartData = categoryData.map(item => ({ ...item, label: item.name }));
  
  const navItems = [
    { text: 'All Tickets', icon: Ticket, href: '/supportdashboard' },
    { text: 'My Tickets', icon: Users, href: '/tickets' },
    { text: 'Employee Chatbot', icon: Bot, href: '/chatbot' },
    { text: 'AI Classification', icon: Sparkles, href: '/classify' },
    { text: 'Knowledge Base', icon: BookOpen, href: '/knowledgebase' },
    { text: 'Analytics', icon: TrendingUp, href: '/analytics' },
  ];

  const drawerContent = (
    <Box 
      sx={{ 
        width: drawerWidth, 
        bgcolor: SIDEBAR_COLOR, 
        height: "100%", 
        display: 'flex', 
        flexDirection: 'column', 
        color: 'white',
        overflowX: 'hidden'
      }}
    >
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
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isSelected = item.text === 'Analytics'; 

            return (
              <ListItem key={item.text} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.href}
                  selected={isSelected}
                  sx={{
                    borderRadius: 2, 
                    color: 'white',
                    py: 1.5,
                    overflow: 'hidden', 
                    whiteSpace: 'nowrap',
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
                      <IconComponent size={18} color={isSelected ? ACCENT_COLOR : TEXT_MUTED} /> 
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="body2" color="inherit" fontWeight="medium" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ marginTop: 'auto' }}>
        <Divider sx={{ bgcolor: 'rgba(52, 211, 153, 0.2)' }} /> 
        <List sx={{ p: 1 }}>
          <ListItem disablePadding>
            <ListItemButton
              component={NavLink}
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
              component={NavLink}
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
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: MAIN_BG_COLOR }}>
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

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: SIDEBAR_COLOR, overflowX: 'hidden' } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ 
            display: { xs: 'none', md: 'block' }, 
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box', 
              width: drawerWidth, 
              bgcolor: SIDEBAR_COLOR,
              borderRight: `1px solid rgba(52, 211, 153, 0.2)`,
              overflowX: 'hidden'
            } 
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Box 
          component="header" 
          sx={{ 
            display: 'flex', 
            height: 64, 
            alignItems: 'center', 
            justifyContent: 'space-between', 
            borderBottom: 1, 
            borderColor: 'divider', 
            bgcolor: MAIN_BG_COLOR, 
            px: { xs: 2, md: 3 } 
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' }, color: ACCENT_COLOR }}>
              {mobileOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Analytics Dashboard
              </Typography>
              <Typography variant="body2" color={TEXT_MUTED}>
                Ticket metrics and performance insights
              </Typography>
            </Box>
          </Box>
          <Tabs value={tabValue} onChange={handleTabChange} sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Tab label="7 Days" value="7days" />
            <Tab label="30 Days" value="30days" />
            <Tab label="90 Days" value="90days" />
          </Tabs>
        </Box>

        <Box sx={{ flex: 1, overflow: 'auto', p: { xs: 2, md: 3 } }}>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>AI Performance Metrics</Typography>
            <br />
            <Grid container spacing={3}>
              {aiMetrics.map((metric) => {
                const IconComponent = iconMap[metric.icon];
                return (
                  <Grid item xs={12} sm={6} lg={3} key={metric.label}>
                    <Card sx={{ transition: 'all 0.3s',borderRadius:"20px", minWidth:260 , bgcolor: "#11182780", '&:hover': { transform: 'translateY(-4px)', boxShadow: CARD_GLOW_SHADOW,  } }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body2" color={TEXT_MUTED} fontWeight="medium">{metric.label}</Typography>
                            <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>{metric.value}</Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, color: ACCENT_COLOR }}>{metric.change}</Typography>
                          </Box>
                          <Avatar sx={{ bgcolor: CARD_HOVER_BG, color: metric.color }}>
                            <IconComponent size={24} />
                          </Avatar>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
          <br />
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card sx={{bgcolor: "#11182780", borderRadius:"20px"}}>
                <CardHeader title="Ticket Trends" subheader="Created vs Resolved tickets over time" />
                <CardContent>
                  <Box sx={{ height: 320 }}>
                    <LineChart
                      dataset={ticketTrendData}
                      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                      series={[
                        { dataKey: 'created', label: 'Created', color: ACCENT_COLOR },
                        { dataKey: 'resolved', label: 'Resolved', color: '#a78bfa' },
                      ]}
                      grid={{ vertical: false, horizontal: true }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{bgcolor: "#11182780", borderRadius:"20px"}}>
                <CardHeader title="Tickets by Category" subheader="Distribution of ticket categories" />
                <CardContent>
                  <Box sx={{ height: 320 }}>
                    <PieChart
                      colors={[ACCENT_COLOR, '#60a5fa', '#f59e0b', '#a78bfa', '#f472b6']}
                      series={[{
                        data: pieChartData,
                        highlightScope: { faded: 'global', highlighted: 'item' },
                        faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                        arcLabel: (item) => `${(item.value / totalCategoryValue * 100).toFixed(0)}%`,
                        outerRadius: 110,
                      }]}
                      legend={{
                        direction: 'row',
                        position: { vertical: 'bottom', horizontal: 'middle' },
                        padding: 0,
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{bgcolor: "#11182780", borderRadius:"20px"}}>
                <CardHeader title="Tickets by Source" subheader="Ticket ingestion from different platforms" />
                <CardContent>
                  <Box sx={{ height: 320 }}>
                   <BarChart
                      dataset={sourceData}
                      yAxis={[{ scaleType: 'band', dataKey: 'source' }]}
                      series={[{ dataKey: 'count', label: 'Tickets', color: ACCENT_COLOR }]}
                      layout="horizontal"
                      grid={{ vertical: true, horizontal: false }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{bgcolor: "#11182780", borderRadius:"20px"}} >
                <CardHeader title="Average Resolution Time" subheader="Resolution time trend in hours" />
                <CardContent>
                  <Box sx={{ height: 320 }}>
                    <LineChart
                      dataset={ticketTrendData}
                      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                      series={[{ dataKey: 'avgTime', label: 'Avg Time (hours)', color: '#f59e0b' }]}
                      grid={{ vertical: false, horizontal: true }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Card sx={{ mt: 3, borderRadius: "20px" }}>
            <CardHeader title="Team Performance" subheader="Performance metrics by support team" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {teamPerformanceData.map((team) => (
                  <Box
                    key={team.team}
                    sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', sm: 'row' }, 
                      alignItems: 'center', 
                      justifyContent: 'space-between', 
                      border: `1px solid rgba(52, 211, 153, 0.1)`, 
                      p: 2, 
                      borderRadius: 2,
                      bgcolor: MAIN_BG_COLOR,
                      transition: 'all 0.2s',
                      '&:hover': {
                        bgcolor: DARK_CARD_COLOR,
                        borderColor: ACCENT_COLOR
                      }
                    }}
                  >
                    <Box sx={{ flex: 1, width: '100%', mb: { xs: 2, sm: 0 } }}>
                      <Typography variant="subtitle1" fontWeight="bold">{team.team}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 3, color: TEXT_MUTED, typography: 'body2' }}>
                        <span>Resolved: {team.resolved}</span>
                        <span>Avg Time: {team.avgTime}h</span>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: 180 } }}>
                      <LinearProgress
                        variant="determinate"
                        value={(team.satisfaction / 5) * 100}
                        sx={{ width: '100%', height: 8, borderRadius: 4, bgcolor: MAIN_BG_COLOR, '& .MuiLinearProgress-bar': { background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})` } }}
                      />
                      <Typography variant="body2" fontWeight="medium" color={ACCENT_COLOR}>{team.satisfaction}</Typography>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

// Wrap the main component with the ThemeProvider
export default function ThemedAnalyticsView() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AnalyticsView />
    </ThemeProvider>
  );
}