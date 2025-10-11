import React from "react";
import {
  Box,
  Card,
  Typography,
  Avatar,
  Chip,
} from "@mui/material";
import { Clock, AlertCircle } from "lucide-react";

const mockTickets = [
  {
    id: "1",
    ticketNumber: "TKT-000001",
    title: "Password Reset Request",
    description: "Unable to login to my account. Need password reset for SAP system.",
    status: "open",
    priority: "high",
    category: "Account Access",
    source: "chatbot",
    requester: "Suresh Reddy",
    assignedTo: "Rajesh Kumar",
    createdAt: "2 hours ago",
    aiConfidence: 0.95,
  },
  {
    id: "2",
    ticketNumber: "TKT-000002",
    title: "VPN Connection Issues",
    description: "VPN is not connecting from home. Getting error code 809.",
    status: "in_progress",
    priority: "critical",
    category: "Network",
    source: "email",
    requester: "Anjali Verma",
    assignedTo: "Amit Patel",
    createdAt: "4 hours ago",
    aiConfidence: 0.88,
  },
  {
    id: "3",
    ticketNumber: "TKT-000003",
    title: "Software Installation - AutoCAD",
    description: "Need AutoCAD 2024 installed on my workstation for new project.",
    status: "open",
    priority: "medium",
    category: "Software",
    source: "web",
    requester: "Vikram Singh",
    assignedTo: "Priya Sharma",
    createdAt: "6 hours ago",
    aiConfidence: 0.92,
  },
  {
    id: "4",
    ticketNumber: "TKT-000004",
    title: "Email Not Receiving",
    description: "Not receiving emails since morning. Mailbox appears to be full.",
    status: "pending",
    priority: "high",
    category: "Email",
    source: "glpi",
    requester: "Suresh Reddy",
    assignedTo: "Rajesh Kumar",
    createdAt: "8 hours ago",
    aiConfidence: 0.9,
  },
  {
    id: "5",
    ticketNumber: "TKT-000005",
    title: "Printer Not Working",
    description: "Printer on 3rd floor (HP-301) is showing offline status.",
    status: "resolved",
    priority: "low",
    category: "Hardware",
    source: "solman",
    requester: "Anjali Verma",
    assignedTo: "Amit Patel",
    createdAt: "1 day ago",
    aiConfidence: 0.85,
  },
  {
    id: "6",
    ticketNumber: "TKT-000006",
    title: "SAP Access Request",
    description: "Need access to SAP MM module for procurement activities.",
    status: "open",
    priority: "medium",
    category: "Access Request",
    source: "email",
    requester: "Vikram Singh",
    assignedTo: "Priya Sharma",
    createdAt: "1 day ago",
    aiConfidence: 0.93,
  },
];

const gradientText = {
  background: "linear-gradient(to right, #ffffffff, #10b981)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const priorityColors = {
  low: "#436c9aff",
  medium: "#b38921ff",
  high: "#a14300ff",
  critical: "#8f2626ff",
};

const statusColors = {
  open: "#129263ff",
  in_progress: "#5d4a97ff",
  pending: "#ab821bdf",
  resolved: "#11883dff",
  closed: "#9CA3AF",
};

export default function TicketList({ onSelectTicket, selectedTicket, searchQuery }) {
  const filteredTickets = mockTickets.filter(
    (ticket) =>
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      display="flex"
      flexDirection="column"
      gap={1.5}
      sx={{ bgcolor: "#000", p: 2, borderRadius: 2 }}
    >
      {filteredTickets.map((ticket) => (
        <Card
          key={ticket.id}
          onClick={() => onSelectTicket(ticket.id)}
          sx={{
            cursor: "pointer",
            p: 2,
            borderRadius: 2,
            bgcolor: "#00000080",
            border: selectedTicket === ticket.id
              ? "1px solid #10b981"
              : "1px solid rgba(27, 43, 36, 1)",
            boxShadow: "0 0 8px rgba(0,0,0,0.4)",
            color: "#fff",
            transition: "all 0.3s ease",
            "&:hover": {
              border: "1px solid #34d399",
              transform: "translateY(-4px)",
              boxShadow: "0 0 15px rgba(52,211,153,0.3)",
            },
          }}
        >
          <Box display="flex" justifyContent="space-between" gap={2}>
            <Box flex={1} display="flex" flexDirection="column" gap={1}>
              <Box display="flex" alignItems="center" gap={1}>
                <Typography
                  variant="caption"
                  sx={{ fontFamily: "monospace", color: "#9CA3AF" }}
                >
                  {ticket.ticketNumber}
                </Typography>

                {/* Priority Chip */}
                <Chip
                  label={ticket.priority}
                  size="small"
                  sx={{
                    bgcolor: "transparent",
                    border: `1px solid ${priorityColors[ticket.priority]}`,
                    color: priorityColors[ticket.priority],
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                />

                {/* Status Chip */}
                <Chip
                  label={ticket.status.replace("_", " ")}
                  size="small"
                  sx={{
                    bgcolor: "transparent",
                    border: `1px solid ${statusColors[ticket.status]}`,
                    color: statusColors[ticket.status],
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                />

                {ticket.priority === "critical" && (
                  <AlertCircle size={16} color="#EF4444" />
                )}
              </Box>

              <Typography variant="subtitle2" sx={{ fontWeight: 600, ...gradientText }}>
                {ticket.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{ color: "#9CA3AF" }}
                noWrap
              >
                {ticket.description}
              </Typography>

              <Box
                display="flex"
                alignItems="center"
                gap={1}
                fontSize={12}
                sx={{ color: "#6B7280" }}
              >
                <Clock size={12} color="#34d399" />
                <span>{ticket.createdAt}</span>
                <span>•</span>
                <span>{ticket.category}</span>
                <span>•</span>
                <span>{ticket.source}</span>
              </Box>

              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  sx={{
                    width: 24,
                    height: 24,
                    fontSize: 12,
                    bgcolor: "#10b981",
                    color: "#000",
                  }}
                >
                  {ticket.assignedTo
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar>
                <Typography variant="caption" sx={{ color: "#9CA3AF" }}>
                  Assigned to {ticket.assignedTo}
                </Typography>
              </Box>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-end"
              gap={1}
            >
              <Chip
                label={`AI: ${(ticket.aiConfidence * 100).toFixed(0)}%`}
                size="small"
                sx={{
                  bgcolor: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#34d399",
                  fontWeight: 600,
                }}
              />
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}
