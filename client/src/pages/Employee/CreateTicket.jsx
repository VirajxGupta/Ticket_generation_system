import React, { useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  CardHeader,
  Box,
  Grid,
  Link as MuiLink,
  useTheme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  createTheme,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import { ArrowBack, AutoFixHigh, Chat } from "@mui/icons-material";

// --- Theme Constants (Centralized definition for consistency) ---
const MAX_CONTENT_WIDTH = 900;
const ACCENT_COLOR = "#34d399"; // Vibrant Green
const ACCENT_HOVER_COLOR = "#10b981"; // Darker Green on hover
const TEXT_MUTED = "#9ca3af"; // Gray text for subtitles/descriptions
const MAIN_BG_COLOR = "#000000"; // Deep Black
const DARK_CARD_COLOR = "rgba(17, 24, 39, 0.8)"; // Dark, semi-transparent background for Card

// --- Styling constants matching the reference theme ---
const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.2)`;
const BUTTON_GLOW_SHADOW = `0 0 15px rgba(16, 185, 129, 0.5)`;

// Style for the Select component's dropdown menu background
const menuPropsStyle = {
  PaperProps: {
    sx: {
      // Use a solid dark color for the dropdown menu background
      backgroundColor: "rgba(17, 24, 39, 0.95)",
      border: "1px solid rgba(16, 185, 129, 0.2)",
      borderRadius: "8px",
    },
  },
};

// Styles for Select input base container to inherit TextField look
const selectInputContainerStyle = {
  // This replicates the TextField root input styling
  "& .MuiOutlinedInput-root": {
    border: "1px solid rgba(16, 185, 129, 0.2)",
    borderRadius: "0.5rem",
    "&:hover": {
      borderColor: ACCENT_COLOR,
    },
  },
};

const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: ACCENT_COLOR,
      light: ACCENT_HOVER_COLOR,
    },
    background: {
      default: MAIN_BG_COLOR,
      paper: DARK_CARD_COLOR,
    },
    text: {
      primary: "#ffffff",
      secondary: TEXT_MUTED,
    },
  },
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
    h4: {
      fontSize: "1.8rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.15rem",
      fontWeight: 600,
    },
    label: {
      fontSize: "0.875rem",
      fontWeight: 600,
      color: "white",
      mb: 0.5,
      display: "block",
    },
  },
  components: {
    MuiCard: { defaultProps: { elevation: 0 } },
    MuiButton: { styleOverrides: { root: { textTransform: "none" } } }, // --- THEMED INPUT BASE STYLES ---

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          bgcolor: "rgba(17, 24, 39, 0.7)",
          borderRadius: "8px",
          "& .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&:hover .MuiOutlinedInput-notchedOutline": { border: "none" },
          "&.Mui-focused": {
            boxShadow: `0 0 0 2px ${ACCENT_COLOR}`,
          },
        },
        input: {
          padding: "12.5px 14px",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        // Ensure the internal label is invisible
        root: { display: "none" },
      },
    },
    MuiSelect: {
      styleOverrides: {
        icon: { color: ACCENT_COLOR },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            border: "1px solid rgba(16, 185, 129, 0.2)",
            borderRadius: "0.5rem",
            "&:hover": {
              borderColor: ACCENT_COLOR,
            },
          },
        },
      },
    },
  },
});

// --- Layout Placeholder ---
const DashboardLayout = ({ children }) => (
  <Box sx={{ flexGrow: 1, p: 0, bgcolor: MAIN_BG_COLOR, minHeight: "100vh" }}>
        {children} {" "}
  </Box>
);

// --- Form Component ---
function CreateTicketForm() {
  const theme = useTheme(); // --- Form State ---

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("other");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting Ticket:", {
      title,
      description,
      category,
      priority,
    }); // NOTE: alert() is used here for mock demonstration only. Replace with custom UI/toast in a real app.
    alert(`Ticket "${title}" created! (Check console for submission data)`);
    setTitle("");
    setDescription("");
    setCategory("other");
    setPriority("medium");
  }; // --- Styles matching the reference theme ---

  const primaryButtonStyle = {
    background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
    color: "black",
    fontWeight: "700",
    borderRadius: "0.5rem",
    height: 44,
    py: 1.2,
    transition: "all 0.3s",
    "&:hover": {
      background: `linear-gradient(to right, ${ACCENT_HOVER_COLOR}, #059669)`,
      boxShadow: `0 0 20px rgba(16, 185, 129, 0.5)`,
      transform: "translateY(-2px)",
    },
  }; // Dedicated style for the Dashboard button in the header

  const dashboardButtonStyle = {
    // Replicate the primary button look but ensure a consistent height
    background: primaryButtonStyle.background,
    color: primaryButtonStyle.color,
    fontWeight: primaryButtonStyle.fontWeight,
    borderRadius: primaryButtonStyle.borderRadius,
    height: 40,
    px: 3,
    transition: primaryButtonStyle.transition,
    "&:hover": primaryButtonStyle["&:hover"],
  };

  const cardStyle = {
    background:
      "linear-gradient(to bottom right, rgba(17, 24, 39, 0.8), rgba(3, 7, 18, 0.6))",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    borderRadius: "1rem",
    boxShadow: "0 10px 30px rgba(16, 185, 129, 0.1), 0 0 10px rgba(0,0,0,0.5)",
    backdropFilter: "blur(10px)",
  };

  const aiPromoCardStyle = {
    bgcolor: `${ACCENT_COLOR}1A`,
    border: `1px solid ${ACCENT_COLOR}33`,
    borderRadius: "1rem",
    mt: 4,
    p: 3,
    boxShadow: `0 4px 15px ${ACCENT_COLOR}1A`,
  };

  const aiSuggestButtonStyle = {
    border: `1px solid ${ACCENT_COLOR}33`,
    color: ACCENT_COLOR,
    bgcolor: "rgba(17, 24, 39, 0.7)",
    borderRadius: "0.5rem",
    "&:hover": {
      bgcolor: "rgba(17, 24, 39, 0.9)",
      borderColor: ACCENT_HOVER_COLOR,
    },
  };
  const backButtonStyle = {
    color: TEXT_MUTED,
    mb: 2,
    py: 1,
    px: 2,
    fontWeight: "normal",
    borderRadius: "0.5rem",
    "&:hover": { bgcolor: `${ACCENT_COLOR}1A`, color: ACCENT_COLOR },
  };

  return (
    <Container
      maxWidth={false}
      sx={{ maxWidth: MAX_CONTENT_WIDTH, py: { xs: 2, sm: 4 } }}
    >
             {" "}
      <Box sx={{ maxWidth: "650px", mx: "auto" }}>
                                {/* --- Header Container (Flexed) --- */}       
           {" "}
        <Box
          sx={{
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left side: Back Button, Title, Subtitle */}
          <Box>
                               {" "}
            <MuiLink href="/employeeDashboardTicket" underline="none">
                                     {" "}
              <Button startIcon={<ArrowBack />} sx={backButtonStyle}>
                                          Back to Tickets                      
                 {" "}
              </Button>
                                 {" "}
            </MuiLink>
                               {" "}
            <Typography variant="h4" component="h1" color="white" gutterBottom>
                                      Create New Ticket                    {" "}
            </Typography>
                               {" "}
            <Typography variant="body1" color={TEXT_MUTED}>
                                      Submit a new IT support request          
                       {" "}
            </Typography>
          </Box>
          {/* Right side: Dashboard Button */}
          <MuiLink href="/employeeDashboard" underline="none" sx={{ mt: 0.5 }}>
            <Button
              variant="contained"
              disableElevation
              sx={dashboardButtonStyle}
            >
              Dashboard
            </Button>
          </MuiLink>
                     {" "}
        </Box>
                    {/* --- 1. Ticket Details Card (Form) --- */}           {" "}
        <Card sx={cardStyle}>
                         {" "}
          <CardHeader
            title={
              <Typography variant="h6" color="white">
                Ticket Details
              </Typography>
            }
            subheader={
              <Typography variant="body2" color={TEXT_MUTED}>
                                        Provide as much detail as possible to
                help us resolve your issue quickly                    {" "}
              </Typography>
            }
            sx={{
              borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
              pb: 2,
              pt: 3,
            }}
          />
                         {" "}
          <CardContent sx={{ pt: 3 }}>
                               {" "}
            <form onSubmit={handleSubmit}>
                                     {" "}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                                                                       {" "}
                {/* Title */}                           {" "}
                <Box>
                                                 {" "}
                  <Typography
                    component="label"
                    htmlFor="title"
                    sx={{ ...theme.typography.label }}
                  >
                                                        Title **                
                                   {" "}
                  </Typography>
                                                 {" "}
                  <TextField
                    fullWidth
                    id="title"
                    placeholder="Brief description of your issue"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    variant="outlined"
                  />
                                             {" "}
                </Box>
                                            {/* Description */}                 
                         {" "}
                <Box>
                                                 {" "}
                  <Typography
                    component="label"
                    htmlFor="description"
                    sx={{ ...theme.typography.label }}
                  >
                                                        Description **          
                                         {" "}
                  </Typography>
                                                 {" "}
                  <TextField
                    fullWidth
                    id="description"
                    placeholder="Provide detailed information about your issue, including any error messages or steps to reproduce"
                    required
                    multiline
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    variant="outlined"
                  />
                                             {" "}
                </Box>
                                           {" "}
                <Grid container spacing={3}>
                                                  {/* Category */}             
                                   {" "}
                  <Grid item xs={12} md={6}>
                                                       {" "}
                    <Box>
                                                             {" "}
                      <Typography
                        component="label"
                        id="category-label-static"
                        sx={{ ...theme.typography.label }}
                      >
                                                                    Category **
                                                               {" "}
                      </Typography>
                                                             {" "}
                      <FormControl
                        fullWidth
                        required
                        sx={selectInputContainerStyle}
                      >
                                                                   {" "}
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                                                                         {" "}
                          {/* Hidden label is still required for A11Y and MUI internal workings */}
                                                                         {" "}
                          <InputLabel
                            id="category-label"
                            shrink={false}
                            htmlFor="category-select"
                            sx={{ display: "none" }}
                          />
                                                                         {" "}
                          <Select
                            labelId="category-label"
                            id="category-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            variant="outlined"
                            sx={{ flexGrow: 1 }}
                            inputProps={{
                              sx: { py: 1.5, border: "none" },
                            }}
                            MenuProps={menuPropsStyle}
                          >
                                                                               {" "}
                            <MenuItem value="hardware">Hardware</MenuItem>     
                                                                         {" "}
                            <MenuItem value="software">Software</MenuItem>     
                                                                         {" "}
                            <MenuItem value="network">Network</MenuItem>       
                                                                       {" "}
                            <MenuItem value="access">Access</MenuItem>         
                                                                     {" "}
                            <MenuItem value="email">Email</MenuItem>           
                                                                   {" "}
                            <MenuItem value="vpn">VPN</MenuItem>               
                                                               {" "}
                            <MenuItem value="password">Password</MenuItem>     
                                                                         {" "}
                            <MenuItem value="other">Other</MenuItem>           
                                                               {" "}
                          </Select>
                                                                         {" "}
                          <IconButton
                            onClick={() =>
                              alert(
                                "AI Suggest Category functionality goes here!"
                              )
                            }
                            title="AI Suggest Category"
                            sx={{
                              ...aiSuggestButtonStyle,
                              width: 44,
                              height: 44,
                            }}
                          >
                                                                               {" "}
                            <AutoFixHigh sx={{ fontSize: 20 }} />               
                                                           {" "}
                          </IconButton>
                                                                     {" "}
                        </Box>
                                                                   {" "}
                        <Typography
                          variant="caption"
                          color={TEXT_MUTED}
                          sx={{ mt: 0.5 }}
                        >
                                                                          Click
                          the sparkle icon for AI suggestion                    
                                                 {" "}
                        </Typography>
                                                               {" "}
                      </FormControl>
                                                         {" "}
                    </Box>
                                                   {" "}
                  </Grid>
                                                  {/* Priority */}             
                                   {" "}
                  <Grid item xs={12} md={6}>
                                                       {" "}
                    <Box>
                                                             {" "}
                      <Typography
                        component="label"
                        id="priority-label-static"
                        sx={{ ...theme.typography.label }}
                      >
                                                                    Priority **
                                                               {" "}
                      </Typography>
                                                             {" "}
                      <FormControl
                        fullWidth
                        required
                        sx={selectInputContainerStyle}
                      >
                                                                     
                        {/* Hidden label is still required for A11Y and MUI internal workings */}
                                                                   {" "}
                        <InputLabel
                          id="priority-label"
                          shrink={false}
                          htmlFor="priority-select"
                          sx={{ display: "none" }}
                        />
                                                                   {" "}
                        <Select
                          labelId="priority-label"
                          id="priority-select"
                          value={priority}
                          onChange={(e) => setPriority(e.target.value)}
                          variant="outlined"
                          inputProps={{ sx: { py: 1.5 } }}
                          MenuProps={menuPropsStyle}
                        >
                                                                         {" "}
                          <MenuItem value="low">Low - Can wait</MenuItem>       
                                                                 {" "}
                          <MenuItem value="medium">Medium - Normal</MenuItem>   
                                                                     {" "}
                          <MenuItem value="high">High - Important</MenuItem>   
                                                                     {" "}
                          <MenuItem value="urgent">Urgent - Critical</MenuItem> 
                                                                   {" "}
                        </Select>
                                                               {" "}
                      </FormControl>
                                                         {" "}
                    </Box>
                                                   {" "}
                  </Grid>
                                             {" "}
                </Grid>
                                            {/* Action Buttons */}             
                             {" "}
                <Box sx={{ display: "flex", gap: 2, pt: 2 }}>
                                                 {" "}
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ ...primaryButtonStyle, flexGrow: 1 }}
                  >
                                                        Create Ticket          
                                         {" "}
                  </Button>
                                                 {" "}
                  <MuiLink
                    href="/dashboard/tickets"
                    underline="none"
                    sx={{ flexGrow: 1 }}
                  >
                                                       {" "}
                    <Button
                      variant="outlined"
                      sx={{
                        width: "100%",
                        height: 44,
                        borderColor: "rgba(255, 255, 255, 0.1)",
                        color: "white",
                        bgcolor: "rgba(0, 0, 0, 0.7)",
                        "&:hover": {
                          borderColor: TEXT_MUTED,
                          bgcolor: "rgba(0, 0, 0, 0.9)",
                        },
                      }}
                    >
                                                              Cancel            
                                             {" "}
                    </Button>
                                                   {" "}
                  </MuiLink>
                                             {" "}
                </Box>
                                       {" "}
              </Box>
                                 {" "}
            </form>
                           {" "}
          </CardContent>
                     {" "}
        </Card>
                    {/* --- 2. AI Assistant Promo Card --- */}           {" "}
        <Card sx={aiPromoCardStyle}>
                         {" "}
          <CardContent>
                               {" "}
            <Box sx={{ display: "flex", gap: 3 }}>
                                     {" "}
              <AutoFixHigh
                sx={{
                  width: 24,
                  height: 24,
                  color: ACCENT_COLOR,
                  flexShrink: 0,
                  mt: 0.5,
                }}
              />
                                     {" "}
              <Box sx={{ flexGrow: 1 }}>
                                           {" "}
                <Typography
                  variant="body1"
                  fontWeight="medium"
                  color="white"
                  sx={{ mb: 0.5 }}
                >
                                                  Need immediate help?          
                                   {" "}
                </Typography>
                                           {" "}
                <Typography variant="body2" color={TEXT_MUTED} sx={{ mb: 1.5 }}>
                                                  Try our AI Assistant for
                  instant solutions to common issues like password resets and
                  VPN problems.                            {" "}
                </Typography>
                                           {" "}
                <MuiLink href="employeeDashboardAIAssistant" underline="none">
                                                 {" "}
                  <Button
                    startIcon={<Chat sx={{ fontSize: 18 }} />}
                    sx={{
                      color: ACCENT_COLOR,
                      p: 0,
                      minWidth: 0,
                      "&:hover": {
                        bgcolor: "transparent",
                        textDecoration: "underline",
                      },
                    }}
                  >
                                                        Chat with AI Assistant  
                                                 {" "}
                  </Button>
                                             {" "}
                </MuiLink>
                                       {" "}
              </Box>
                                 {" "}
            </Box>
                           {" "}
          </CardContent>
                     {" "}
        </Card>
               {" "}
      </Box>
         {" "}
    </Container>
  );
}

// --- Application Wrapper (Applies Theme and Layout) ---
export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
                  <CssBaseline />           {" "}
      <DashboardLayout>
                        <CreateTicketForm />           {" "}
      </DashboardLayout>
             {" "}
    </ThemeProvider>
  );
}
