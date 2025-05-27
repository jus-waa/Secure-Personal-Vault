import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import HomePage from "./routes/Homepage";
import SideNav from './components/SideNav';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<SideNav/>}/>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signUp" element={<SignUpPage/>}/>
                <Route path="/home" element={<HomePage/>}/>
            </Routes>
        </Router>
    </StrictMode>,
);
