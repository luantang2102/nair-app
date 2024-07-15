import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../images/thumbs-up-solid.svg';
import EditMenu from '../../components/DropdownEditMenu';

import axios from 'axios'


function DashboardCard01() {
  
  const [total, setTotal] = useState();

  useEffect(() => {
    const handleFetch = async () => {
      const formattedSinceDate = (new Date()).toISOString().split('T')[0]
      const formattedUntilDate = (new Date(new Date().getTime() + (24 * 60 * 60 * 1000))).toISOString().split('T')[0]
      let token = localStorage.getItem("token").replace(/^"|"$/g, '');
      let auth = "Bearer " + token;
      axios.get(`http://localhost:8080/api/v1/user/facebook/pages/page-fans?since=${formattedSinceDate}&until=${formattedUntilDate}`, {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      }).then((result) => {
        const pageFan = result.data[0].pageFan;
        setTotal(pageFan.totalFan);
      });
    };
    handleFetch();
  }, []);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 xl:col-span-4 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <div className="px-5 pt-5">
        <header className="flex justify-between items-start mb-2">
          {/* Icon */}
          <img src={Icon} width="32" height="32" alt="Icon 01" />
          {/* Menu button */}
          <EditMenu align="right" className="relative inline-flex">
            <li>
              <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                Option 1
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-200 flex py-1 px-3" to="#0">
                Option 2
              </Link>
            </li>
            <li>
              <Link className="font-medium text-sm text-rose-500 hover:text-rose-600 flex py-1 px-3" to="#0">
                Remove
              </Link>
            </li>
          </EditMenu>
        </header>
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Total Page Likes</h2>
        <div className="flex items-start">
          <div className="text-5xl font-bold text-slate-800 dark:text-slate-100 mr-2">{total}</div>
          {/* <div className="text-sm font-semibold text-white px-1.5 bg-emerald-500 rounded-full">+0%  </div> */}
        </div>
      </div>  
    </div>
  );
}

export default DashboardCard01;
