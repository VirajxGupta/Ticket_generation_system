// SettingsView.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// MUI
import {
    Box, Card, CardContent, CardHeader, Grid, Typography, Tabs, Tab,
    CssBaseline, TextField, Switch, Button, MenuItem, Divider,
    CircularProgress, Link as MuiLink,
} from '@mui/material';

// Icons
import {
    Bell, User as UserIcon, Settings as SettingsIcon, Database as DatabaseIcon,
    Save as SaveIcon, Shield as ShieldIcon
} from 'lucide-react';

// --- Theme Constants (Green Theme) ---
const ACCENT_COLOR = "#34d399";
const ACCENT_HOVER_COLOR = "#10b981";
const TEXT_MUTED = "#9ca3af";
const MAIN_BG_COLOR = "#0a0a0a";
const DARK_CARD_COLOR = 'rgba(3, 7, 18, 0.6)';
const CARD_GLOW_SHADOW = `0 10px 20px 0 rgba(16, 185, 129, 0.2)`;

// --- Custom Styles ---
const themedCardStyle = {
    borderRadius: 3,
    background: DARK_CARD_COLOR,
    border: '1px solid rgba(52, 211, 153, 0.2)',
    transition: 'border 0.3s, box-shadow 0.3s',
    '&:hover': { boxShadow: CARD_GLOW_SHADOW, borderColor: "rgba(52, 211, 153, 0.4)" },
    p: 2,
};

const themedInputStyle = {
    '& .MuiInputBase-input': {
        color: 'white',
        fontSize: 14,
        '&.Mui-disabled': {
            '-webkit-text-fill-color': 'rgba(255, 255, 255, 0.9)',
            color: 'rgba(255, 255, 255, 0.9)',
        },
    },
    '& .MuiInputLabel-root': {
        color: TEXT_MUTED,
        '&.Mui-disabled': {
            color: 'rgba(255, 255, 255, 0.5)',
        },
    },
    '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        '& fieldset': { borderColor: 'rgba(52, 211, 153, 0.2)' },
        '&:hover fieldset': { borderColor: ACCENT_COLOR },
        '&.Mui-focused fieldset': { borderColor: ACCENT_COLOR },
        '&.Mui-disabled': { backgroundColor: 'rgba(50, 50, 50, 0.5)' }
    },
};

const primaryButtonStyle = {
    background: `linear-gradient(to right, ${ACCENT_COLOR}, ${ACCENT_HOVER_COLOR})`,
    color: "black",
    fontWeight: "bold",
    borderRadius: 2,
    py: 1.5,
    px: 3,
    transition: "background-color 0.3s, box-shadow 0.3s, transform 0.3s",
    '&:hover': {
        background: ACCENT_HOVER_COLOR,
        boxShadow: `0 0 15px 0 ${ACCENT_COLOR}`,
        transform: "translateY(-2px)",
    },
    '&.Mui-disabled': {
        background: 'rgba(52, 211, 153, 0.5)',
        color: '#333333',
        transform: 'none',
    }
};

const switchStyle = {
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: ACCENT_COLOR,
        '&:hover': { backgroundColor: 'rgba(52, 211, 153, 0.1)' },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { backgroundColor: ACCENT_COLOR },
    '& .MuiSwitch-track': { backgroundColor: TEXT_MUTED },
};

const tabTriggerStyle = {
    color: TEXT_MUTED,
    minWidth: 100,
    py: 1.5,
    fontWeight: 'bold',
    borderRadius: 1,
    transition: 'color 0.3s, background-color 0.3s',
    '&.Mui-selected': {
        color: ACCENT_COLOR,
        bgcolor: 'rgba(52, 211, 153, 0.1)',
        boxShadow: `0 0 8px rgba(52, 211, 153, 0.2)`
    },
    '&:hover': {
        color: ACCENT_HOVER_COLOR,
        bgcolor: 'rgba(52, 211, 153, 0.05)',
    },
};

function TabPanel({ children, value, index }) {
    return <div hidden={value !== index}>{value === index && <Box sx={{ pt: 3, pb: 2 }}>{children}</Box>}</div>;
}

export default function SettingsPage({ auth }) {
    const [tabIndex, setTabIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const handleTabChange = (e, newValue) => setTabIndex(newValue);

    const [editingProfile, setEditingProfile] = useState(false);
    const [editingNotifications, setEditingNotifications] = useState(false);
    const [editingSecurity, setEditingSecurity] = useState(false);

    const userEmail = auth?.currentUser?.email || "loading@email.com";
    const userId = auth?.currentUser?.uid;

    const [name, setname] = useState("Loading...");
    const [phone, setPhone] = useState("");
    const [department, setDepartment] = useState("");
    const [role, setRole] = useState("");

    useEffect(() => {
        if (!userId) {
            setname("Loading user name....");
            return;
        }
        const fetchProfileData = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/profile/getProfile/${userId}`);
                if (res.data.success && res.data.profile) {
                    const profile = res.data.profile;
                    setname(profile.name || "");
                    setPhone(profile.phone || "");
                    setDepartment(profile.department || "it-support");
                    setRole(profile.role || "agent");
                } else {
                    toast.error("Failed to fetch profile.");
                }
            } catch (error) {
                toast.error("Error loading profile.");
            }
        };
        fetchProfileData();
    }, [userId]);

    const [emailNotifications, setEmailNotifications] = useState(true);
    const [smsNotifications, setSmsNotifications] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSave = async (saveFunction, successMessage) => {
        setIsSaving(true);
        try {
            await saveFunction();
            toast.success(successMessage);
        } catch (error) {
            toast.error(error.message || "An error occurred.");
        } finally {
            setIsSaving(false);
        }
    };

    const handleProfileSave = async () => {
        if (!userId) throw new Error("User ID is missing!");
        const dataToSend = { uid: userId, name, phone, department, role };
        const res = await axios.post("http://localhost:5000/profile/updateProfile", dataToSend);
        if (!res.data.success) throw new Error(res.data.error || "Failed to update profile");
        setEditingProfile(false);
    };

    const handleNotificationsSave = () => {
        return new Promise(resolve => setTimeout(() => {
            setEditingNotifications(false);
            resolve();
        }, 1000));
    };
    
    const handleSecuritySave = async () => {
        if (newPassword !== confirmPassword) {
            toast.error("New passwords do not match!");
            return;
        }
        if (!currentPassword || !newPassword) {
            toast.error("Please fill all password fields!");
            return;
        }
        try {
            setIsSaving(true);
            const res = await axios.post("http://localhost:5000/api/change-password", {
                id: userId,
                currentPassword: currentPassword,
                newPassword: newPassword
            });
            toast.success(res.data.message);
            setEditingSecurity(false);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            console.error("Password update error:", error.response?.data || error.message);
            toast.error(error.response?.data?.message || "Something went wrong ❌");
        } finally {
            setIsSaving(false);
        }
    };
    
    const dashboardButtonStyle = { ...primaryButtonStyle, height: 40, py: 0.5, px: 3 };
    
    // ========== EDIT BUTTON STYLE WITH BLUE BORDER BOX ==========
    const outlinedButtonStyle = {
        color: "#3b82f6", // Text color is blue
        border: '1px solid #3b82f6', // Blue border
        padding: '6px 16px', // Adjust padding as needed
        '&:hover': {
           borderColor: "#2563eb", // Darker blue on hover
           backgroundColor: 'rgba(59, 130, 246, 0.1)' // Light blue background on hover
        }
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: MAIN_BG_COLOR, color: "white", p: { xs: 2, sm: 4 } }}>
            <CssBaseline />
            <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold" color="white">Settings</Typography>
                        <Typography sx={{ color: TEXT_MUTED }}>Manage your account and system preferences</Typography>
                    </Box>
                    <Button component={MuiLink} href="/employeeDashboard" variant="contained" disableElevation sx={dashboardButtonStyle}>
                        Dashboard
                    </Button>
                </Box>
                <Tabs value={tabIndex} onChange={handleTabChange} TabIndicatorProps={{ style: { backgroundColor: ACCENT_COLOR, height: 3 } }} variant="fullWidth" sx={{ mb: 2, '& .MuiTabs-flexContainer': { gap: 1.5 } }}>
                    <Tab sx={tabTriggerStyle} label={<Box display="flex" alignItems="center" gap={1}><UserIcon size={16} />Profile</Box>} />
                    <Tab sx={tabTriggerStyle} label={<Box display="flex" alignItems="center" gap={1}><Bell size={16} />Notifications</Box>} />
                    <Tab sx={tabTriggerStyle} label={<Box display="flex" alignItems="center" gap={1}><ShieldIcon size={16} />Security</Box>} />
                </Tabs>

                {/* --- Profile Tab --- */}
                <TabPanel value={tabIndex} index={0}>
                    <Card sx={themedCardStyle}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="bold">Profile Information</Typography>}
                            subheader={<Typography sx={{ color: TEXT_MUTED }}>Update your personal information</Typography>}
                            action={!editingProfile && <Button sx={outlinedButtonStyle} size="small" onClick={() => setEditingProfile(true)}>Edit</Button>}
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField fullWidth label="Full Name" value={name} onChange={e => setname(e.target.value)} disabled={!editingProfile} sx={themedInputStyle} />
                                <TextField fullWidth label="Email" type="email" value={userEmail} disabled sx={themedInputStyle} />
                                <TextField fullWidth label="Phone Number" type="tel" value={phone} onChange={e => setPhone(e.target.value)} disabled={!editingProfile} sx={themedInputStyle} />
                            </Box>
                            {editingProfile && (
                                <>
                                    <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button onClick={() => handleSave(handleProfileSave, "Profile updated!")} disabled={isSaving} sx={primaryButtonStyle} startIcon={isSaving ? <CircularProgress size={18} sx={{ color: 'black' }} /> : <SaveIcon size={18} />}>
                                            {isSaving ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabPanel>

                {/* --- Notifications Tab --- */}
                <TabPanel value={tabIndex} index={1}>
                    <Card sx={themedCardStyle}>
                        <CardHeader
                            title={<Typography variant="h6" fontWeight="bold" color="white">Notification Preferences</Typography>}
                            subheader={<Typography sx={{ color: TEXT_MUTED }}>Configure alerts</Typography>}
                           action={!editingNotifications && <Button sx={outlinedButtonStyle} size="small" onClick={() => setEditingNotifications(true)}>Edit</Button>}
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography color="white">Email Notifications</Typography>
                                <Switch sx={switchStyle} checked={emailNotifications} disabled={!editingNotifications} onChange={() => setEmailNotifications(p => !p)} />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                                <Typography color="white">SMS Notifications</Typography>
                                <Switch sx={switchStyle} checked={smsNotifications} disabled={!editingNotifications} onChange={() => setSmsNotifications(p => !p)} />
                            </Box>
                            {editingNotifications && (
                                <>
                                    <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button onClick={() => handleSave(handleNotificationsSave, "Notifications saved!")} disabled={isSaving} sx={primaryButtonStyle} startIcon={isSaving ? <CircularProgress size={16} sx={{ color: 'black' }} /> : <SaveIcon size={18} />}>
                                            {isSaving ? "Saving..." : "Save Notifications"}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabPanel>
                
                {/* --- Security Tab --- */}
                <TabPanel value={tabIndex} index={2}>
                    <Card sx={themedCardStyle}>
                        <CardHeader
                            title={<Typography sx={{color: TEXT_MUTED, fontWeight: 500}}>Change Password</Typography>}
                            subheader={<Typography sx={{ color: TEXT_MUTED, fontSize: '0.9rem' }}>Update your account password</Typography>}
                            action={!editingSecurity && <Button sx={outlinedButtonStyle} size="small" onClick={() => setEditingSecurity(true)}>Edit</Button>}
                        />
                        <CardContent>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <TextField fullWidth label="Current Password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} disabled={!editingSecurity} sx={themedInputStyle} />
                                <TextField fullWidth label="New Password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} disabled={!editingSecurity} sx={themedInputStyle} />
                                <TextField fullWidth label="Confirm Password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} disabled={!editingSecurity} sx={themedInputStyle} />
                            </Box>
                            {editingSecurity && (
                                <>
                                    <Divider sx={{ my: 3, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button onClick={handleSecuritySave} disabled={isSaving} sx={primaryButtonStyle} startIcon={isSaving ? <CircularProgress size={18} sx={{ color: 'black' }} /> : <ShieldIcon size={18} />}>
                                            {isSaving ? "Updating..." : "Change Password"}
                                        </Button>
                                    </Box>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </TabPanel>
            </Box>
        </Box>
    );
}