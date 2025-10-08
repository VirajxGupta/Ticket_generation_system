import bcrypt from "bcryptjs";
import { createUser, getUserByEmail, getUserById, updateUserPassword } from "../models/userModel.js";
import { auth } from "../config/firebaseAdmin.js";

// REGISTER

export const register = async (req, res) => {
  const { name, email, password, employeeId, role } = req.body;

  try {
    const existingUser = await getUserByEmail(email);
    if (existingUser)
      return res.status(400).json({ message: "User already exists ❌" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Use role directly from request, fallback to employee
    let finalRole = "employee"; // default
    if (role) {
      const requestedRole = role.toLowerCase();
      if (requestedRole === "admin") finalRole = "admin";
      else if (requestedRole === "support team") finalRole = "support team";
      else finalRole = "employee";
    }

    const user = await createUser({
      name,
      email,
      password: hashedPassword,
      employeeId,
      role: finalRole,
    });

    const { password: pwd, ...safeUser } = user;
    res.status(201).json({
      user: safeUser,
      message: `User registered successfully 🚀 with role ${finalRole}`,
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  const { email, password, role } = req.body; // role frontend se

  try {
    const user = await getUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found ❌" });

    // Check if role matches
    if (user.role.toLowerCase() !== role.toLowerCase()) {
      return res.status(403).json({ message: `This user is not a ${role} ❌` });
    }

    // Password check
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials ❌" });

    const { password: pwd, ...safeUser } = user;

    // Firebase custom token
    const firebaseToken = await auth.createCustomToken(user.id);

    // Redirect based on role
    let redirect = "/dashboard";
    if (safeUser.role.toLowerCase() === "admin") redirect = "/adminDashboard";

    res.status(200).json({
      user: safeUser,
      redirect,
      firebaseToken,
      message: "Login successful ✅",
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
};




// LOGOUT
export const logout = async (req, res) => {
  try {
    // Stateless logout: frontend just deletes the token
    res.status(200).json({ message: "Logout successful ✅" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const changePassword = async (req, res) => {
  try {
    const { id, currentPassword, newPassword } = req.body;

    if (!id || !currentPassword || !newPassword) {
      return res.status(400).json({ message: "Missing required fields ❌" });
    }

    // Step 1️⃣: Find user by ID
    const user = await getUserById(id);
    if (!user) return res.status(404).json({ message: "User not found ❌" });

    // Step 2️⃣: Compare old password
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ message: "Current password incorrect ❌" });

    // Step 3️⃣: Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Step 4️⃣: Update in DB
    await updateUserPassword(id, hashedPassword);

    // Step 5️⃣: Optional - Sync with Firebase Admin (if using Firebase tokens)
    try {
      await auth.updateUser(id, { password: newPassword });
    } catch (err) {
      console.log("Firebase password update skipped or failed:", err.message);
    }

    res.status(200).json({ message: "Password updated successfully ✅" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ message: error.message });
  }
};