// SettingsPage.jsx (Updated)
import React from "react";
import SettingsView from "../../components/Support/SettingsView.jsx";

function useMockAuth() {
    const [currentUser, setCurrentUser] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            // Pehle localStorage se try karo
            const storedUser = JSON.parse(localStorage.getItem("user"));
            const email = storedUser?.email || ""; // fallback email
            const uid = storedUser?.id || ""; // fallback uid

            const userObject = { uid, email };
            setCurrentUser(userObject);
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return { currentUser, isLoading };
}


export default function SettingsPage() {
    const { currentUser, isLoading } = useMockAuth();

    // Auth प्रॉप को उस स्ट्रक्चर में पास करें जिसकी SettingsView अपेक्षा करता है:
    const authProp = { currentUser }; 

    return <SettingsView auth={authProp} />;
}

// // Backend controller (updateProfile)
// import { db } from "../config/firebaseAdmin.js";

// export const updateProfile = async (req, res) => {
//   // console.log('PROFILE UPDATE: Server received body:', req.body); // Debugging ke liye
//   
//   try {
//     const { uid, firstName, lastName, phone, department, role } = req.body;
//     
//     if (!uid) {
//         return res.status(400).json({ success: false, error: "UID is required" });
//     }

//     const userRef = db.collection("users").doc(uid);
//     const docSnap = await userRef.get();
//     
//     // Data jo hum database mein daalna chahte hain
//     const profileData = {
//         firstName, 
//         lastName, 
//         phone, 
//         department, 
//         role,
//         updatedAt: new Date(), // Current timestamp
//     };

//     // 🚨 FIX: Agar document exist nahi karta hai, toh use 'set' se create karo.
//     if (!docSnap.exists) {
//         // Agar document nahi mila, toh 'set' use karke naya document banao.
//         // 'set' automatically document bana deta hai agar woh exist nahi karta.
//         await userRef.set({
//             ...profileData,
//             createdAt: new Date(), // Pehli baar bana rahe hain
//         });
//         console.log(`INFO: New profile created for UID: ${uid}`);

//     } else {
//         // Agar document pehle se hai, toh sirf 'update' karo.
//         await userRef.update(profileData);
//         console.log(`INFO: Existing profile updated for UID: ${uid}`);
//     }
//  
//     // Success response
//     res.json({ success: true, message: "Profile updated successfully!" });
//   } catch (error) {
//     console.error("Error updating profile (Catch Block):", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };