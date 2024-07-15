import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const FacebookContext = React.createContext();

export default function FacebookProvider({ children }) {
  const [pageList, setPageList] = useState({ pages: [] });
  const [authExpired, setAuthExpired] = useState(false);

  useEffect(() => {
    if(localStorage.getItem("token")) {
      const handleFetch = async () => {
        let token = localStorage.getItem("token").replace(/^"|"$/g, '');
        let auth = "Bearer " + token;
        axios.get('http://localhost:8080/api/v1/user/facebook/pages/details', {
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
          }
        }).then((result) => {   
          setPageList(result.data)
        }).catch((error) => {
          if(error.response.data.message === "Authentication details expired") {
            setAuthExpired(true);
          }
        });    
      };
      handleFetch();
    }
  }, []);

  return (
    <FacebookContext.Provider value={{ pageList }}>
      {children}
      {authExpired && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Facebook Pages Authentication Expired</h2>
            <p>Your pages authentication has expired. Please verify it again.</p>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => {
                setAuthExpired(false); 
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </FacebookContext.Provider>
  );
}