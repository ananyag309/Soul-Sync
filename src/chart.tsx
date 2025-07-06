import { useEffect, useState } from "react";

export const useChartData = () => {
  const [data, setData] = useState({
    waterIntake: [],
    meditationDuration: [],
    sleepDuration: [],
    pssScore: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/john@example.com'); //3000
        const result = await response.json();
        setData(result);
        // console.log(result.pssScore);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

 

  const baseOptions = {
    chart: {
      type: 'area',
      sparkline: { enabled: true }
    },
    tooltip: { theme: 'dark' },
    stroke: { curve: "smooth" }
  };

  const salesChart = {
    series: [{
      name: 'Water Intake',
      data: data?.waterIntake || [100,100]
    }],
    type: 'area',
    options: {
      ...baseOptions,
      chart: { ...baseOptions.chart, id: 'salesChart' },
      colors: ["var(--color-success)"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            { offset: 0, opacity: 0.2, color: "var(--color-success)" },
            { offset: 100, opacity: 0, color: "transparent" }
          ]
        }
      }
    }
  };

  const salesLost = {    
    series: [{
      name: 'Physical Activity',
      data: data?.meditationDuration || [100,100]
    }],
    options: {
      ...baseOptions,
      chart: { ...baseOptions.chart, id: 'salesLost' },
      colors: ["var(--color-danger)"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            { offset: 0, opacity: 0.2, color: "var(--color-danger)" },
            { offset: 100, opacity: 0, color: "transparent" }
          ]
        }
      }
    }
  };

  const ordersChart = {    
    series: [{
      name: 'Sleep Tracker',
      data: data?.sleepDuration || [100,100]
    }],
    options: {
      ...baseOptions,
      chart: { ...baseOptions.chart, id: 'ordersChart' },
      colors: ["var(--color-primary)"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            { offset: 0, opacity: 0.7, color: "var(--color-primary)" },
            { offset: 100, opacity: 0, color: "transparent" }
          ]
        }
      }
    }
  };

  const newCustomersChart = {    
    series: [{
      name: 'MindLog',
      data: data?.pssScore || [100,100]
    }],
    options: {
      ...baseOptions,
      chart: { ...baseOptions.chart, id: 'newCustomersChart' },
      colors: ["var(--color-primary)"],
      fill: {
        type: "gradient",
        gradient: {
          type: "vertical",
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 100],
          colorStops: [
            { offset: 0, opacity: 0.5, color: "var(--color-primary-accent)" },
            { offset: 100, opacity: 0, color: "transparent" }
          ]
        }
      }
    }
  };

  const revenue = {
    series: [{
      name: 'PSS',
      data: data?.pssScore || [100,100]
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

  return {
    loading: false,
    salesChart,
    salesLost,
    ordersChart,
    newCustomersChart,
    revenue
  };
};

export default useChartData;