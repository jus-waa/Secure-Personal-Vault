import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import VerifyEmailPage from "./routes/VerifyEmailPage";
import HomePage from "./routes/Homepage";
import SettingsPage from './routes/SettingsPage';
import { useAuthStore } from './store/authStore';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignUpPage/>}/>
                <Route path="/verify-email" element={<VerifyEmailPage/>}/>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/settings" element={<SettingsPage/>}/>
            </Routes>
        </Router>
    </StrictMode>,
);
