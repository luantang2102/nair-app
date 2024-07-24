import React, { useEffect } from 'react';
import {
  Routes,
  Route,
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import AuthProvider from './context/AuthProvider';
import FacebookProvider from './context/FacebookProvider';

function App() {
  useEffect(() => { 
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, []); // triggered on route change

  return (
    <>
      <AuthProvider>
        <FacebookProvider>
          <Routes>
            <Route exact path="/nair-web" element={<Dashboard/>} />
            <Route exact path="/nair-web/inspiration/post" element={<Dashboard route="inspiration/post"/>} />
            <Route exact path="/nair-web/signin" element={
              <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <LoginPage />
                </div>
              </div>
            } />
            <Route exact path="/nair-web/signup" element={
              <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                  <SignupPage />
                </div>
              </div>
            } />
          </Routes>
        </FacebookProvider>
      </AuthProvider>
    </>
  );
}

export default App;
