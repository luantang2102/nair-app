import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import WelcomeBanner from '../partials/dashboard/WelcomeBanner';
import DashboardAvatars from '../partials/dashboard/DashboardAvatars';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import DashboardCard05 from '../partials/dashboard/DashboardCard05';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';
import DashboardCard07 from '../partials/dashboard/DashboardCard07';
import DashboardCard08 from '../partials/dashboard/DashboardCard08';
import DashboardCard09 from '../partials/dashboard/DashboardCard09';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard11 from '../partials/dashboard/DashboardCard11';
import DashboardCard12 from '../partials/dashboard/DashboardCard12';
import DashboardCard13 from '../partials/dashboard/DashboardCard13';
import DashboardCard14 from '../partials/dashboard/DashboardCard14';
import Banner from '../partials/Banner';
import AddDataButton from '../components/AddDataButton';
import DashboardCard15 from '../partials/dashboard/DashboardCard15';
import DashboardCard16 from '../partials/dashboard/DashboardCard16';
import DashboardCard17 from '../partials/dashboard/DashboardCard17';
import Inspiration from '../components/Inspiration';

function Dashboard({ route }) {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState([new Date(), new Date(new Date().getTime() + (24 * 60 * 60 * 1000))]);

  const navigateTo = useNavigate();

  useEffect(() => {
    if(!localStorage.getItem("token")) navigateTo("/signin")
  }, [])

  if (!localStorage.getItem("token")) return null;

  const handleDateSelect = (dates) => {
    setSelectedDate(dates);
  };

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {
          route === 'inspiration/post' ? 
          (
            <main>
              <Inspiration />
            </main>
          )
          :
          (
            <main>
              <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

                {/* Welcome banner */}
                <WelcomeBanner />

                {/* Dashboard actions */}
                <div className="sm:flex sm:justify-between sm:items-center mb-8">

                  {/* Left: Avatars */}
                  <DashboardAvatars />

                  {/* Right: Actions */}
                  <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                    {/* Datepicker built with flatpickr */}
                    <Datepicker onSelectDate={handleDateSelect}/>
                    {/* Add view button */}
                    <AddDataButton />              
                  </div>

                </div>

                {/* Cards */}
                <div className="grid grid-cols-12 gap-6">

                  {/* Line chart (Page likes) */}
                  <DashboardCard01/>

                  <DashboardCard16 selectedDate={selectedDate} />

                  <DashboardCard08 selectedDate={selectedDate} />

                  <DashboardCard15 selectedDate={ selectedDate} />

                  <DashboardCard17 selectedDate={ selectedDate} />
                  
                  <DashboardCard07 selectedDate={selectedDate} />
                
                  {/* <DashboardCard05 /> */}
              
                  {/* <DashboardCard06 /> */}
              
                  {/* <DashboardCard09 /> */}
              
                  {/* <DashboardCard10 /> */}
            
                  {/* <DashboardCard11 /> */}
              
                  {/* <DashboardCard12 /> */}
      
                  {/* <DashboardCard13 /> */}
                  
                </div>
              </div>
            </main>
          )
        }
        
      </div>
    </div>
  );
}

export default Dashboard;