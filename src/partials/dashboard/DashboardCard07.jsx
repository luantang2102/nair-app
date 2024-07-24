import React,{useState,useEffect} from 'react';

import axios from 'axios'

function DashboardCard07({ selectedDate }) {

  const [data,setData]=useState([])

  useEffect(() => { 
    const handleFetch = async () => {
      const formattedSinceDate = selectedDate[0];
      const formattedUntilDate = selectedDate[1];
      let token = localStorage.getItem("token").replace(/^"|"$/g, '')
      let auth = "Bearer " + token
      axios.get(`https://nair-social-media-analytics-production.up.railway.app/api/v1/user/facebook/pages/page-post-performance?since=${formattedSinceDate}&until=${formattedUntilDate}`, {
          headers: {
            'Authorization': auth,
            'Content-Type': 'application/json'
          }
        }).then((result) => {   
            result.data.map(page => setData(page.postPerformance))
        })
    }
    handleFetch()
  }, [selectedDate])

  return (
    <div className="col-span-full 2xl:col-span-8 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4   border-b border-slate-100 dark:border-slate-700">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Top Post Performance</h2>
      </header>
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-slate-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-700 dark:bg-opacity-50 rounded-sm">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">No</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Title</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-left">Date created</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Reaction</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Total Comment</div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-slate-100 dark:divide-slate-700">
  
              {
                data.map((post, index) => (
                  <tr key={post.id}>
                    <td className="p-2">
                      <div className="text-center text-violet-500">{index + 1}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left">{post.caption.length <= 30 ? post.caption : post.caption.substr(0,100)+"..." }</div>
                    </td>
                    <td className="p-2">
                      <div className="text-left text-emerald-500">{post.createdTime}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center">{post.totalReaction}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-sky-500">{post.totalComment}</div>
                    </td>
                  </tr>
                ))
              }    
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardCard07;
