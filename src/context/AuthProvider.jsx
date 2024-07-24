import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const AuthContext = React.createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState({});
  const [sessionExpired, setSessionExpired] = useState(false);
  const navigateTo = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const allowedURLs = ["nair-web/inspiration/post"];
      if (allowedURLs.includes(location.pathname)) {
        return; // Skip redirection for allowed URLs
      }
      const handleFetch = async () => {
        let token = localStorage.getItem("token").replace(/^"|"$/g, '');
        let auth = "Bearer " + token;
        axios.get('https://nair-social-media-analytics-production.up.railway.app/api/v1/user', {
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
          }
        }).then((result) => {   
          setUser(result.data);
          navigateTo("/");
        }).catch((error) => {
          console.error(error);
          if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            setSessionExpired(true); 
          }
        });    
      };
      handleFetch();
    } else {
      if (location.pathname !== "/nair-web/signup") {
        setUser({});
        navigateTo("/nair-web/signin");
      }
    }
  }, [navigateTo, location.pathname]);

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
      {sessionExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Session Expired</h2>
            <p>Your session has expired. Please sign in again.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setSessionExpired(false); 
                navigateTo("/nair-web/signin");
              }}
            >
              Sign In
            </button>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}