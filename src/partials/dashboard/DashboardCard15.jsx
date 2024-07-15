import React, { useState, useEffect } from 'react';
import LineChart from '../../charts/LineChart02';
import axios from 'axios';
import { tailwindConfig } from '../../utils/Utils';

function DashboardCard15({ selectedDate }) {
  const [chartData, setChartData] = useState({});
  const [total, setTotal] = useState();

  useEffect(() => {
    const handleFetch = async () => {
      const formattedSinceDate = selectedDate[0];
      const formattedUntilDate = selectedDate[1];
      let token = localStorage.getItem("token").replace(/^"|"$/g, '');
      let auth = "Bearer " + token;
      axios.get(`http://localhost:8080/api/v1/user/facebook/pages/page-post-engagements?since=${formattedSinceDate}&until=${formattedUntilDate}`, {
        headers: {
          'Authorization': auth,
          'Content-Type': 'application/json'
        }
      }).then((result) => {
        const pagePostEngagements = result.data[0].pagePostEngagements;
        setTotal(pagePostEngagements.totalEngagement);
        const labels = pagePostEngagements.engagementByDayList.map((entry) => entry.date);
        const data = pagePostEngagements.engagementByDayList.map((entry) => entry.value);
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Engagements',
              data: data,
              borderColor: tailwindConfig().theme.colors.indigo[500],
              fill: false,
              borderWidth: 2,
              tension: 0,
              pointRadius: 0,
              pointHoverRadius: 3,
              pointBackgroundColor: tailwindConfig().theme.colors.indigo[500],
              pointHoverBackgroundColor: tailwindConfig().theme.colors.indigo[500],
              pointBorderWidth: 0,
              pointHoverBorderWidth: 0,
              clip: 20,
            },
          ],
        });
      });
    };
    handleFetch();
  }, [selectedDate]);

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-slate-800 shadow-lg rounded-sm border border-slate-200 dark:border-slate-700">
      <header className="px-5 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center">
        <h2 className="font-semibold text-slate-800 dark:text-slate-100">Page Post Engagements</h2>
      </header>
      <LineChart total={total} data={chartData} width={800} height={248} />
    </div>
  );
}

export default DashboardCard15;
