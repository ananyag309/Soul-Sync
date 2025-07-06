import React, { useEffect } from 'react'
import "./Revenue.css"
import Chart from "react-apexcharts"
import {useChartData} from "../../chart"  
import { useUser } from '@clerk/clerk-react'

const Revenue = () => {
const {user}= useUser();
const [data,setData] = React.useState({});
const baseOptions = {
  chart: {
    type: 'area',
    sparkline: { enabled: true }
  },
  tooltip: { theme: 'dark' },
  stroke: { curve: "smooth" }
};
 useEffect(() => {
        const fetchData = async () => {
          if (!user?.primaryEmailAddress?.emailAddress) return;
          
          try {
            const response = await fetch(`http://localhost:3000/user/${user.primaryEmailAddress.emailAddress}`);//5174
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error:', error);
          } 
        };
        
        fetchData();
    }, [user]);

  const getLatestValue = (array: any[]) => {
    if (!array || array.length === 0) return 0;
    return array[array.length - 1].value;
};
const formatChartData = (array: any[]) => {
  if (!array || array.length === 0) return [0];
  return array.map(item => item.value);
};

  const revenue = {
    series: [{
      name: 'PSS',
      data: formatChartData(data?.pssScore) || [100,100]
    }],
    options: {
      ...baseOptions,
      chart: { ...baseOptions.chart, id: 'revenue', sparkline: { enabled: false } },
      title: {
        text: 'Progress Tracker',
        align: 'left',
        style: {
          fontSize:  '20px',
          fontWeight:  '600',
          color:  'var(--color-text)',
        },
      },
      grid:{
        show: false,
      },
      dataLabels: {
          enabled: true,
      },
      colors:['var(--color-primary)'],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            { offset: 0, opacity:1, color: "var(--color-primary)" },
            { offset: 40, opacity: 0.7, color: "var(--color-primary)" },
            { offset: 100, opacity: 0, color: "transparent" }
          ]
        }
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
      yaxis: {
        labels: {
          formatter: function (value) {
            return + value;
          }
        },
      },
    },
  };



  // const {revenue, loading} = useChartData()
  return (
    <div className='revenue'>
    <Chart
    {...revenue}
    type="area"
    width={"100%"}
    height={"100%"}
    />
    </div>
  )
}

export default Revenue