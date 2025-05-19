import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './index.css';
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/Homepage";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/homepage" element={<HomePage/>}/>
            </Routes>
        </Router>
    </StrictMode>,
);
