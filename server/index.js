// src/server.js
import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "./config/firebaseAdmin.js";
import { authenticate } from "./middlewares/authMiddleware.js";
import { register, login, logout, changePassword } from "./controllers/userController.js";
import cors from "cors";
import profileRoutes from "./routes/ProfileRoutes.js";
import ticketRoutes from "./routes/ticketRoutes.js";

dotenv.config(); // JWT_SECRET aur PORT ke liye

const app = express();
app.use(express.json());

// ✅ CORS enable
app.use(cors({
  origin: ["http://localhost:5173","https://ticket-generation-system-pv6k.vercel.app"],  // frontend URL
  credentials: true
}));

const PORT = process.env.PORT || 5000;

// ---------------- Test route ----------------
app.get("/", (req, res) => {
  res.send("Hello from Node.js backend! 🚀");
});

//---------------------------------------------

app.use("/profile", profileRoutes);
app.use("/api/tickets", ticketRoutes)

// ---------------- Auth Routes ----------------
app.post("/api/register", register);
app.post("/api/login", login);
app.post("/api/logout", logout); // POST logout
app.post("/api/change-password", changePassword);

// ---------------- Add User ----------------
app.post("/api/addUser", async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email)
    return res.status(400).json({ message: "Name and email are required" });

  try {
    const docRef = await db.collection("users").add({ name, email });
    res.json({ message: "User added successfully", id: docRef.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Get all users (JWT Protected) ----------------
app.get("/api/users", authenticate, async (req, res) => {
  try {
    console.log("JWT Payload:", req.user);
    const snapshot = await db.collection("users").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Server start ----------------
// app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
export default app;