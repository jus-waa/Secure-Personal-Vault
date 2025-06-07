import { React, useEffect} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from './store/authStore';

import LoginPage from "./routes/LoginPage";
import SignUpPage from "./routes/SignUpPage";
import VerifyEmailPage from "./routes/VerifyEmailPage";
import HomePage from "./routes/Homepage";
import SettingsPage from './routes/SettingsPage';
import ForgotPasswordPage from './routes/ForgotPasswordPage';

// protecting routes to unAuth users
    const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};
// protecting routes to Auth users redirect to home
const RedirectUser = ({children}) => {
    const { isAuthenticated, user } = useAuthStore();

    if(isAuthenticated && user.isVerified){
        return <Navigate to="/" replace /> //auto replace to homepage 
    }

    return children;
}

const App = () => {
    //check if user is verified
    const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

    console.log("isAuth", isAuthenticated);
    console.log("user", user);
    return (
        <div>
            <Routes>
                <Route path="/login" 
                 element={ 
                        <RedirectUser>
                            <LoginPage/>
                        </RedirectUser>} />
                <Route path="/signup" 
                    element={ 
                        <RedirectUser>
                            <SignUpPage/>
                        </RedirectUser>} />
                <Route path="/" 
                    element={
                          <ProtectedRoute>
                            <HomePage/>
                        </ProtectedRoute>
                        } />
                <Route path="/settings" 
                    element={
                        <ProtectedRoute>
                            <SettingsPage/>
                        </ProtectedRoute>
                    } />
                <Route path="/verify-email" 
                 element={ 
                        <RedirectUser>
                            <VerifyEmailPage/>
                        </RedirectUser>} />
                <Route path="/forgot-password" 
                 element={ 
                       
                            <ForgotPasswordPage/> }
                       />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
