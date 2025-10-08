
import { db } from "../config/firebaseAdmin.js";
export const updateProfile = async (req, res) => {
  try {
    // 🔹 Use 'uid' instead of 'id' to match frontend
    const { uid, name, phone, department, role } = req.body;

    if (!uid) {
      return res.status(400).json({ success: false, error: "User UID is required" });
    }

    // 🔹 Reference Firestore document for this UID
    const userRef = db.collection("users").doc(uid);
    const docSnap = await userRef.get();

    // 🔹 Data to update or create
    const profileData = {
      name: name || "",
      phone: phone || "",
      department: department || "",
      role: role || "",
      updatedAt: new Date(),
    };

    if (!docSnap.exists) {
      await userRef.set({
        ...profileData,
        createdAt: new Date(),
      });
      console.log(`INFO: New profile created for UID: ${uid}`);
    } else {
      // Update existing document
      await userRef.update(profileData);
      console.log(`INFO: Existing profile updated for UID: ${uid}`);
    }

    res.json({ success: true, message: "Profile updated successfully!" });

  } catch (error) {
    console.error("Error updating profile (Catch Block):", error);
    res.status(500).json({ success: false, error: error.message });
  }
};


export const getProfile = async (req, res) => {
  try {
    // URL से यूजर की UID प्राप्त करें
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ success: false, error: "User UID is required in URL" });
    }

    const userRef = db.collection("users").doc(uid);
    const docSnap = await userRef.get();

    if (docSnap.exists) {
      res.json({ success: true, profile: docSnap.data() });
    } else {

      res.status(404).json({ success: false, error: "Profile not found" });
    }

  } catch (error) {
    console.error("Error fetching profile (Catch Block):", error);
    res.status(500).json({ success: false, error: error.message });
  }
};