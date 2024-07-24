import React, { useState } from 'react';
import axios from 'axios';

function Inspiration() {
  
  const [data, setData] = useState({
    topic: '',
    tone: ''
  });

  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const [createdCaptionOpen, setCreatedCaptionOpen] = useState(false);
  const [postDialogOpen, setPostDialogOpen] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleCreateCaption = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true before making the API call

    const payload = {
      text: data['topic'],
      tone: data['tone']
    };

    const token = localStorage.getItem('token').replace(/^"|"$/g, '');
    const auth = 'Bearer ' + token;
    axios
      .post('https://nair-social-media-analytics-production.up.railway.app/api/v1/user/inspiration/caption', JSON.stringify(payload), {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setLoading(false); // Set loading state to false after successful response
        setCaption(response.data.generatedText); // Set the caption state with fetched data
        setCreatedCaptionOpen(true);
      })
      .catch((error) => {
        setLoading(false); // Set loading state to false if there's an error
        if (error.response && error.response.status === 400) {
          setError('Failed');
        } else {
          console.error('An error occurred:', error.message);
        }
      });
  };

  const handlePost = (e) => {
    e.preventDefault();
    setPostDialogOpen(true);
  };

  const addLineBreaks = (text) => {
    const result = [];
    let count = 0;

    for (let i = 0; i < text.length; i++) {
      result.push(text[i]);
      count++;

      if (count >= 75 && text[i] === ' ') {
        result.push(<br key={i} />);
        count = 0;
      }
    }

    return result;
  };

  return (
    <main className="grid justify-center items-top dark:bg-gray-900">
      <form className="w-full p-4 rounded " onSubmit={handleCreateCaption}>
        <h2 className="text-2xl mb-4 tracking-wider font-lighter text-gray-900 dark:text-gray-200">Facebook Post</h2>
        <p className="text-gray-600 dark:text-white font-bold mb-2">What do you want to write about?</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="mb-4 col-span-1 md:col-span-3">
            <textarea
              id="topic"
              name="topic"
              value={data.topic}
              onChange={handleChange}
              className="w-full lg:w-112 px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-1px border-gray-300 focus:outline-none border-solid resize-none"
              placeholder="Simple tips to build a gundam"
              rows="5"
              required
            ></textarea>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 dark:text-white lg:w-112 font-bold mb-2">What tone do you want?</p>
            <select
              id="tone"
              name="tone"
              value={data.tone}
              onChange={handleChange}
              className="w-full px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-1px border-gray-300 focus:outline-none border-solid focus:border-dashed"
              required
            >
              <option value="">Select tone...</option>
              <option value="friendly">Friendly</option>
              <option value="luxury">Luxury</option>
              <option value="relaxed">Relaxed</option>
              <option value="professional">Professional</option>
              <option value="bold">Bold</option>
              <option value="adventurous">Adventurous</option>
              <option value="witty">Witty</option>
              <option value="persuasive">Persuasive</option>
              <option value="empathetic">Empathetic</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-4 px-6 bg-blue-950 text-white rounded-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800"
            disabled={loading} // Disable button while loading
          >
            {loading ? 'Processing...' : 'Create caption →'}
          </button>
        </div>
      </form>
      {createdCaptionOpen ? (
        <div className="w-full p-4 rounded mb-5">
          <h2 className="text-2xl mb-4 tracking-wider font-lighter text-gray-900 dark:text-gray-200">Captions created for you</h2>
          <form onSubmit={handlePost}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className=" col-span-1 md:col-span-3">
                <p className="w-full lg:w-112 px-3 py-2 dark:bg-gray-900 rounded-sm border dark:border-1px border-gray-300 focus:outline-none border-solid resize-none">
                  {addLineBreaks(caption)}
                </p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="text-lg py-2 px-6 rounded-sm hover:bg-blue-9050 hover:text-black dark:hover:text-white hover:underline focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 "
              >
                Create post →
              </button>
            </div>
          </form>
        </div>
      ) : null}
      {postDialogOpen ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-xl font-semibold mb-4">Hello</h2>
            <button
              className="mt-4 bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              onClick={() => setPostDialogOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Inspiration;
