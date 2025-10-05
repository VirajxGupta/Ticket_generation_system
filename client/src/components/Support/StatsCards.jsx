import React from "react";
import { Box, Card, CardContent, Typography, Grid, Avatar } from "@mui/material";
import { Ticket, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      title: "Total Tickets",
      value: "248",
      change: "+12%",
      icon: Ticket,
    },
    {
      title: "Open Tickets",
      value: "64",
      change: "+8%",
      icon: Clock,
    },
    {
      title: "Resolved Today",
      value: "32",
      change: "+24%",
      icon: CheckCircle2,
    },
    {
      title: "Critical",
      value: "8",
      change: "-15%",
      icon: AlertCircle,
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat) => {
        const Icon = stat.icon;
        const isPositive = stat.change.startsWith("+");

        return (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <Card
              sx={{
                bgcolor: "#000",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 3,
                p: 1,
                transition: "all 0.3s ease",
                boxShadow: "0 0 12px rgba(0,0,0,0.6)",
                "&:hover": {
                  border: "1px solid #34d399",
                  transform: "translateY(-4px)",
                  boxShadow: "0 0 20px rgba(52,211,153,0.3)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                      {stat.title}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        mt: 1,
                        background: "linear-gradient(to right, #34d399, #10b981)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 0.5,
                        color: isPositive ? "#34d399" : "#f87171",
                      }}
                    >
                      {stat.change} from last week
                    </Typography>
                  </Box>

                  {/* Gradient icon container */}
                  <Avatar
                    sx={{
                      width: 52,
                      height: 52,
                      background:
                        "linear-gradient(to right, #34d399, #10b981)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: "0 0 10px rgba(52,211,153,0.4)",
                    }}
                  >
                    <Icon size={24} color="#fff" />
                  </Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
