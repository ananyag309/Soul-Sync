import React from 'react'
import "./Summaries.css"
import { useState,useEffect } from 'react'
import { FaBagShopping } from 'react-icons/fa6'
import { MdOutlineArrowDropDown, MdOutlineArrowDropUp } from 'react-icons/md'
import Chart from 'react-apexcharts'
// import {useChartData} from '../../chart'
import chroma from 'chroma-js'
import { PiChartLineDownBold } from 'react-icons/pi'
import { HiShoppingCart } from 'react-icons/hi'
import { FaUsers } from 'react-icons/fa'
import { useUser } from '@clerk/clerk-react'
import { LuGlassWater } from "react-icons/lu"
import { FaRunning } from "react-icons/fa"
import { FaBrain } from "react-icons/fa"
import { MdAlarm } from "react-icons/md";

const Summaries = () => {
    const lightPrimaryColor = chroma("blue").alpha(0.1).css();
    const lightSuccessColor = chroma("#33c648").alpha(0.1).css();
    const lightDangerColor = chroma("#ff3b30").alpha(0.1).css();
    const [data, setData] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(true);
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
          if (!user?.primaryEmailAddress?.emailAddress) return;
          
          try {
            const response = await fetch(`http://localhost:3000/user/${user.primaryEmailAddress.emailAddress}`); //3000
            const result = await response.json();
            setData(result);
          } catch (error) {
            console.error('Error:', error);
          } finally {
            setIsLoading(false);
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
    // console.log(formatChartData(data?.waterIntake || []));
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
      data: formatChartData(data?.waterIntake)
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
      data: formatChartData(data?.physicalActivity || [])
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
      data: formatChartData(data?.sleepDuration || [])
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
      data: formatChartData(data?.meditationDuration || [])
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

  return ({data} &&
    <div className='summaries'>
        {/* Start summary */}
        <div className="summary">
            <div className="row">
                <div 
                className="icon__container"
                style={{
                    background: lightSuccessColor,
                    color: 'var(--color-success)',
                }}>
                    <LuGlassWater/>
                </div>
                <small></small>
            </div>
            {/* <small className='ratio'
            style={{
                background: lightSuccessColor,
                color: 'var(--color-success)',
            }}
            >
                <MdOutlineArrowDropUp/>
            </small> */}
            <div className="row">
                <div className="details">
                    <p className="text__muted">Water Intake</p>
                    <h1>{getLatestValue(data?.waterIntake)} Liters</h1>
                </div>
                <div className="chart">
                    <Chart
                    {...salesChart}
                    width={'100%'}
                    height={60}
                    type='area'
                    />
                </div>
            </div>
        </div>
        {/* End summary */}

        {/* Start summary */}
        <div className="summary">
            <div className="row">
                <div 
                className="icon__container"
                style={{
                    background: lightDangerColor,
                    color: 'var(--color-danger)',
                }}>
                    <FaRunning/>
                </div>
                <small></small>
            </div>
            {/* <small className='ratio'
            style={{
                background: lightDangerColor,
                color: 'var(--color-danger)',
            }}
            >
                <MdOutlineArrowDropDown/>
            </small> */}
            <div className="row">
                <div className="details">
                    <p className="text__muted">Physical Activity</p>
                    <h1>{getLatestValue(data?.physicalActivity)} minutes</h1>
                </div>
                <div className="chart">
                   <Chart
                    {...salesLost}
                    width={'100%'}
                    height={60}
                    type='area'
                    />
                </div>
            </div>
        </div>
        {/* End summary */}

        {/* Start summary */}
        <div className="summary">
            <div className="row">
                <div 
                className="icon__container"
                style={{
                    background: lightPrimaryColor,
                    color: 'var(--color-primary)',
                }}>
                    <FaBrain/>
                </div>
                <small></small>
            </div>
            {/* <small className='ratio'
            style={{
                background: lightPrimaryColor,
                color: 'var(--color-primary)',
            }}
            >
                <MdOutlineArrowDropUp/>
            </small> */}
            <div className="row">
                <div className="details">
                    <p className="text__muted">Sleep Tracker</p>
                    <h1>{getLatestValue(data?.sleepDuration)} hours</h1>
                </div>
                <div className="chart">
                    <Chart
                    {...ordersChart}
                    width={'100%'}
                    height={60}
                    type='area'
                    />
                </div>
            </div>
        </div>
        {/* End summary */}

        {/* Start summary */}
        <div className="summary">
            <div className="row">
                <div 
                className="icon__container"
                style={{
                    background: lightPrimaryColor,
                    color: 'var(--color-primary)',
                }}>
                    <MdAlarm/>
                </div>
                <small></small>
            </div>
            {/* <small className='ratio'
            style={{
                background: lightPrimaryColor,
                color: 'var(--color-primary)',
            }}
            >
                <MdOutlineArrowDropUp/>
            </small> */}
            <div className="row">
                <div className="details">
                    <p className="text__muted">MindLog</p>
                    <h1>{getLatestValue(data?.meditationDuration)} minutes</h1>
                </div>
                <div className="chart">
                    <Chart
                    {...newCustomersChart}
                    width={'100%'}
                    height={60}
                    type='area'
                    />
                </div>
            </div>
        </div>
        {/* End summary */}
    </div>
  )
}

export default Summaries