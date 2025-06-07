import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import VerifyEmailPage from "./routes/VerifyEmailPage";
import HomePage from "./routes/Homepage";
import SettingsPage from './routes/SettingsPage';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/verify-email" element={<VerifyEmailPage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Routes>
  );
};

export default App;
