import React, { useEffect, useState } from 'react';
import axios from 'axios';

function AddDataButton() {
  const [showDialog, setShowDialog] = useState(false);
  const [url, setUrl] = useState(false);

  useEffect(() => { 
    const handleFetch = () => {
      let token = localStorage.getItem("token").replace(/^"|"$/g, '')
      let auth = "Bearer " + token
      axios.get('https://nair-social-media-analytics-production.up.railway.app/api/v1/user/facebook/authorize-url', {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        },
      }).then((result) => {
          setUrl(result.data.url)
      }).catch((error) => {
        console.error("An error occurred:", error.message);
      });
    };
    handleFetch();
  }, [])

  const handleAddPage = () => {
    let ieWindow = window.open(url, "myWindow", "scrollbars=yes,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=600,height=700,left=0,top=0");
    if (ieWindow) {
        ieWindow.focus();
        setTimeout(() => {
            ieWindow.close();
            setShowDialog(false);
            window.focus();
            window.location.reload(); 
        }, 100000); // 10 seconds in milliseconds
    } else {
        console.error("Failed to open Internet Explorer window.");
    }
  }

  return (
    <>
      <button className="btn bg-indigo-500 hover:bg-indigo-600 text-white" onClick={() => setShowDialog(true)}>
        <svg className="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
          <path d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
        </svg>
        <span className="hidden xs:block ml-2">Add data source</span>
      </button>

      {/* Dialog for adding a new user */}
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Dialog content */}
          <div className="dark:bg-gray-600 bg-white p-8 rounded-lg text-center">
            <h2 className="dark:text-white text-xl font-semibold mb-4">Add Data Source</h2>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-4"
              onClick={handleAddPage}
            >
              Add Facebook page
            </button>
            <button
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setShowDialog(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AddDataButton;
