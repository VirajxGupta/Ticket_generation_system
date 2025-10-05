import * as React from 'react';
import { NavLink } from 'react-router-dom';

// MUI Core Components & Theming
import {
  Box, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab, List,
  ListItem, ListItemButton, ListItemIcon, ListItemText, LinearProgress, Avatar,
  createTheme, ThemeProvider, CssBaseline, Drawer, IconButton,
} from '@mui/material';

// Lucide React Icons
import {
  Ticket, Users, Bot, Sparkles, BookOpen, Bell, TrendingUp, Clock,
  CheckCircle2, Settings, Menu as MenuIcon,
} from 'lucide-react';

// MUI X Charts
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { PieChart } from '@mui/x-charts/PieChart';

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
      styleOverrides: { root: { backgroundColor: '#000000', border: '1px solid rgba(255, 255, 255, 0.1)', backgroundImage: 'none' } },
    },
    MuiTab: {
      styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } },
    },
    MuiTabs: {
      styleOverrides: { indicator: { background: 'linear-gradient(to right, #34d399, #10b981)' } },
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
    { text: 'Settings', icon: Settings, href: '/settings' },
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
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' } }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{ display: { xs: 'none', md: 'block' }, '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: 'background.paper' } }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{ flexGrow: 1, width: { md: `calc(100% - ${drawerWidth}px)` }, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
      >
        <Box component="header" sx={{ display: 'flex', height: 64, alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', bgcolor: '#000', px: { xs: 2, md: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { md: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 'bold', background: 'linear-gradient(to right, #34d399, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Analytics Dashboard
              </Typography>
              <Typography variant="body2" color="text.secondary">
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
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>AI Performance Metrics</Typography>
            <Grid container spacing={2}>
              {aiMetrics.map((metric) => {
                const IconComponent = iconMap[metric.icon];
                return (
                  <Grid item xs={12} sm={6} lg={3} key={metric.label}>
                    <Card>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Box>
                            <Typography variant="body2" color="text.secondary" fontWeight="medium">{metric.label}</Typography>
                            <Typography variant="h4" sx={{ mt: 1, fontWeight: 'bold' }}>{metric.value}</Typography>
                            <Typography variant="body2" sx={{ mt: 0.5, color: '#34d399' }}>{metric.change}</Typography>
                          </Box>
                          <Avatar sx={{ bgcolor: 'rgba(52, 211, 153, 0.1)', color: metric.color }}>
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

          <Grid container spacing={3}>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Ticket Trends" subheader="Created vs Resolved tickets over time" />
                <CardContent>
                  <Box sx={{ height: 320 }}>
                    <LineChart
                      dataset={ticketTrendData}
                      xAxis={[{ scaleType: 'band', dataKey: 'month' }]}
                      series={[
                        { dataKey: 'created', label: 'Created', color: '#34d399' },
                        { dataKey: 'resolved', label: 'Resolved', color: '#a78bfa' },
                      ]}
                      grid={{ vertical: false, horizontal: true }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
                <CardHeader title="Tickets by Category" subheader="Distribution of ticket categories" />
                <CardContent>
                  <Box sx={{ height: 320 }}>
                    <PieChart
                      colors={['#34d399', '#60a5fa', '#f59e0b', '#a78bfa', '#f472b6']}
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
              <Card>
                <CardHeader title="Tickets by Source" subheader="Ticket ingestion from different platforms" />
                <CardContent>
                   <Box sx={{ height: 320 }}>
                    <BarChart
                        dataset={sourceData}
                        yAxis={[{ scaleType: 'band', dataKey: 'source' }]}
                        series={[{ dataKey: 'count', label: 'Tickets', color: '#34d399' }]}
                        layout="horizontal"
                        grid={{ vertical: true, horizontal: false }}
                    />
                   </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card>
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
          
          <Card sx={{ mt: 3 }}>
            <CardHeader title="Team Performance" subheader="Performance metrics by support team" />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {teamPerformanceData.map((team) => (
                  <Box
                    key={team.team}
                    sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', border: 1, borderColor: 'divider', p: 2, borderRadius: 2 }}
                  >
                    <Box sx={{ flex: 1, width: '100%', mb: { xs: 2, sm: 0 } }}>
                      <Typography variant="subtitle1" fontWeight="bold">{team.team}</Typography>
                      <Box sx={{ mt: 1, display: 'flex', gap: 3, color: 'text.secondary', typography: 'body2' }}>
                        <span>Resolved: {team.resolved}</span>
                        <span>Avg Time: {team.avgTime}h</span>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: { xs: '100%', sm: 180 } }}>
                      <LinearProgress
                        variant="determinate"
                        value={(team.satisfaction / 5) * 100}
                        sx={{ width: '100%', height: 8, borderRadius: 4, '& .MuiLinearProgress-bar': { background: 'linear-gradient(to right, #34d399, #10b981)' } }}
                      />
                      <Typography variant="body2" fontWeight="medium">{team.satisfaction}</Typography>
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