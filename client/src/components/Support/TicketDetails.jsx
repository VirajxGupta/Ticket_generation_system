import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Badge,
  Divider,
  Avatar,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  Clock,
  User,
  Mail,
  Building,
  Tag,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  MoreVertical,
} from "lucide-react";

const mockTicketDetails = {
  "1": {
    ticketNumber: "TKT-000001",
    title: "Password Reset Request",
    description:
      'Unable to login to my account. Need password reset for SAP system. I have tried multiple times but getting "Invalid credentials" error.',
    status: "open",
    priority: "high",
    category: "Account Access",
    source: "chatbot",
    requester: {
      name: "Suresh Reddy",
      email: "suresh.reddy@powergrid.in",
      department: "Finance",
    },
    assignedTo: {
      name: "Rajesh Kumar",
      email: "rajesh.kumar@powergrid.in",
    },
    createdAt: "2024-01-15 10:30 AM",
    updatedAt: "2024-01-15 12:15 PM",
    aiClassification: {
      confidence: 0.95,
      category: "Account Access",
      subcategory: "Password Reset",
    },
    aiSuggestedResolution:
      "This appears to be a standard password reset request. Please verify user identity and reset password through Active Directory. Estimated resolution time: 15 minutes.",
    comments: [
      {
        id: "1",
        user: "Rajesh Kumar",
        comment:
          "I have verified the user identity. Proceeding with password reset.",
        timestamp: "2024-01-15 11:00 AM",
        isInternal: false,
      },
      {
        id: "2",
        user: "System",
        comment: "Ticket assigned to Rajesh Kumar",
        timestamp: "2024-01-15 10:35 AM",
        isInternal: true,
      },
    ],
  },
};

export default function TicketDetails({ ticketId }) {
  const ticket = mockTicketDetails[ticketId];
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const openMenu = Boolean(menuAnchorEl);
  const handleMenuOpen = (event) => setMenuAnchorEl(event.currentTarget);
  const handleMenuClose = () => setMenuAnchorEl(null);

  if (!ticket) {
    return (
      <Box
        sx={{
          flex: 1,
          width: "100%",
          bgcolor: "#0A0A0A",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography color="gray">Ticket not found</Typography>
      </Box>
    );
  }

  const priorityColors = {
    low: { bgcolor: "#DBEAFE", color: "#1D4ED8" },
    medium: { bgcolor: "#FEF3C7", color: "#B45309" },
    high: { bgcolor: "#FFEDD5", color: "#C2410C" },
    critical: { bgcolor: "#FEE2E2", color: "#991B1B" },
  };

  return (
<Box
  sx={{
    width: "100%",
    minWidth: 0,
    bgcolor: "#0A0A0A",
    color: "#fff",
    borderLeft: "1px solid #222",
    display: "flex",
    flexDirection: "column",
  }}
>
<Card
  sx={{
    width: "100%",
    bgcolor: "#0F0F0F",
    color: "#fff",
    boxShadow: "none",
    borderRadius: 0,
    display: "flex",
    flexDirection: "column",
  }}
>
        <CardHeader
          sx={{ p: 2, borderBottom: "1px solid #222" }}
          action={
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: "#aaa" }}>
                <MoreVertical size={20} />
              </IconButton>
              <Menu
                anchorEl={menuAnchorEl}
                open={openMenu}
                onClose={handleMenuClose}
              >
                <MenuItem>Edit Ticket</MenuItem>
                <MenuItem>Reassign</MenuItem>
                <MenuItem>Change Priority</MenuItem>
                <MenuItem sx={{ color: "error.main" }}>Close Ticket</MenuItem>
              </Menu>
            </>
          }
          title={
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="subtitle1" fontWeight={600}>
                {ticket.ticketNumber}
              </Typography>
              <Badge
                sx={{
                  bgcolor: priorityColors[ticket.priority].bgcolor,
                  color: priorityColors[ticket.priority].color,
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 1,
                  textTransform: "capitalize",
                }}
              >
                {ticket.priority}
              </Badge>
            </Box>
          }
          subheader={
            <Typography variant="body2" color="gray">
              {ticket.title}
            </Typography>
          }
        />

        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3, p: 3 }}>
          {/* Description */}
          <Box>
            <Typography variant="subtitle2" gutterBottom color="#bbb">
              Description
            </Typography>
            <Typography variant="body2" color="#ccc">
              {ticket.description}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#222" }} />

          {/* Ticket Info */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {[
              { icon: <User size={16} />, label: "Requester", value: ticket.requester.name },
              { icon: <Mail size={16} />, label: "Email", value: ticket.requester.email },
              { icon: <Building size={16} />, label: "Department", value: ticket.requester.department },
              { icon: <Tag size={16} />, label: "Category", value: ticket.category },
              { icon: <Clock size={16} />, label: "Created", value: ticket.createdAt },
            ].map((item, i) => (
              <Box key={i} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Box
                  sx={{
                    background: "linear-gradient(135deg, #6366F1, #EC4899)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.icon}
                </Box>
                <Typography variant="caption" color="gray">
                  {item.label}:
                </Typography>
                <Typography variant="body2" color="#ddd">
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>

          <Divider sx={{ borderColor: "#222" }} />

          {/* AI Insights */}
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#111",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Sparkles
                size={16}
                style={{
                  background: "linear-gradient(135deg, #10B981, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
              <Typography variant="subtitle2" color="#fff">
                AI Insights
              </Typography>
              <Badge
                sx={{
                  ml: "auto",
                  px: 1,
                  py: 0.5,
                  fontSize: 10,
                  textTransform: "none",
                  bgcolor: "#1E3A8A",
                  color: "#fff",
                }}
              >
                {(ticket.aiClassification.confidence * 100).toFixed(0)}% confidence
              </Badge>
            </Box>
            <Typography variant="body2" color="#ccc">
              <strong>Classification:</strong> {ticket.aiClassification.category} →{" "}
              {ticket.aiClassification.subcategory}
            </Typography>
            <Typography variant="body2" color="#ccc">
              <strong>Suggested Resolution:</strong> {ticket.aiSuggestedResolution}
            </Typography>
          </Box>

          <Divider sx={{ borderColor: "#222" }} />

          {/* Comments */}
          <Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <MessageSquare
                size={16}
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #EC4899)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              />
              <Typography variant="subtitle2" color="#fff">
                Activity
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {ticket.comments.map((comment) => (
                <Box key={comment.id} sx={{ display: "flex", gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, fontSize: 12, bgcolor: "#222" }}>
                    {comment.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography variant="body2" fontWeight={500}>
                        {comment.user}
                      </Typography>
                      <Typography variant="caption" color="gray">
                        {comment.timestamp}
                      </Typography>
                      {comment.isInternal && (
                        <Badge
                          variant="outlined"
                          sx={{
                            ml: 1,
                            fontSize: 10,
                            textTransform: "none",
                            borderColor: "#444",
                            color: "#aaa",
                          }}
                        >
                          Internal
                        </Badge>
                      )}
                    </Box>
                    <Typography variant="body2" color="#bbb">
                      {comment.comment}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Add Comment */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <TextField
              placeholder="Add a comment..."
              multiline
              minRows={3}
              variant="outlined"
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "#111",
                  color: "#fff",
                  "& fieldset": { borderColor: "#333" },
                  "&:hover fieldset": { borderColor: "#555" },
                },
              }}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<MessageSquare size={16} />}
                sx={{
                  bgcolor: "#2563EB",
                  "&:hover": { bgcolor: "#1E40AF" },
                }}
              >
                Add Comment
              </Button>
              <Button
                variant="outlined"
                size="small"
                startIcon={<CheckCircle2 size={16} />}
                sx={{
                  borderColor: "#2563EB",
                  color: "#2563EB",
                  "&:hover": { borderColor: "#1E3A8A", color: "#1E3A8A" },
                }}
              >
                Resolve
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
