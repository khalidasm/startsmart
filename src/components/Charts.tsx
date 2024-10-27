import axios from "axios";
import { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import { useTranslation } from "react-i18next";

const Charts = () => {
  const [RegistrationsData, setRegistrationsData] = useState([]);
  const [ConsultationsData, setConsultationsData] = useState([]);
  const [WorkshopsData, setWorkshopsData] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    const url = "https://api.hayaksa.com/api/statistic/full/ss2/";
    axios
      .get(url)
      .then(({ data }) => {
        const { registrations, consultations, workshops } = data || {};
        setRegistrationsData(
          registrations.filter((d) => d.title != "total").sort((a, b) => b.count - a.count) || []
        );
        setConsultationsData(consultations.filter((d) => d.title != "total bookings").sort((a, b) => b.count - a.count) || []);
        setWorkshopsData(workshops.filter((d) => d.title != "total").sort((a, b) => b.count - a.count) || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getRandomColor = () => {
    const randomColor = () => Math.floor(Math.random() * 256);
    return `rgba(${randomColor()}, ${randomColor()}, ${randomColor()}, 0.6)`;
  };

  const dataRegistrationsDataChart = {
    labels: RegistrationsData.map((record) => record?.title),

    datasets: [
      {
        label: "Numner of Attendes",
        data: RegistrationsData.map((item) => item.count),
        backgroundColor: ["rgba(75, 192, 192, 0.4)", "rgba(255, 99, 132, 0.4)"],
         borderWidth: 0.5,
      },
    ],
  };

  const dataConsultationsDataChart = {
    labels: ConsultationsData.map((record) => record?.title),
    datasets: [
      {
        label: "Numner of Attendes",
        data: ConsultationsData.map((item) => item.count),
        borderWidth:2,
        backgroundColor: ConsultationsData.map(() => getRandomColor()), // Automatically generate colors
         borderColor: ConsultationsData.map(() => 'transparent'), 
      },
    ],
  };
  
  const dataWorkshopsDataChart ={
    labels: WorkshopsData.map((record) => record?.title),
    datasets: [
      {
        label: "Numner of Attendes",
        data: WorkshopsData.map((item) => item.count),
        borderWidth:4,
        backgroundColor: WorkshopsData.map(() => getRandomColor()), // Automatically generate colors
        borderColor: WorkshopsData.map(() => 'transparent'), 
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines for x-axis
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines for x-axis
        },
        ticks: {
          font: {
            family: 'Cairo', // Customize font family
            size: 14, // Customize font size
            weight: 'bold', // Customize font weight
            color: '#333', // Customize font color
          },
        },
      },
    
    },
  };

  const workShopOptions = {
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false, // Disable the legend
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines for x-axis
        },
        ticks: {
          font: {
            family: 'Cairo', // Customize font family
            size: 14, // Customize font size
            weight: 'bold', // Customize font weight
            color: '#333', // Customize font color
          },
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false, // Remove grid lines for x-axis
        },
      
      },
    },
  };

  const chartTitleSyle= "font-cairo text-[18px] md:text-[28px] font-bold text-black leading-normal text-center"

  return (
    <div className="flex justify-center flex-col gap-8 items-center relative h-full overflow-auto gradient px-8">
      <h1 className="font-cairo text-[22px] md:text-[35px] font-bold text-black leading-normal text-center">
      {t('charts.charts_title')}</h1>
     
      <h1 className={chartTitleSyle}>
        {t('charts.total_of_attendes_title')}</h1>
      <Bar data={dataRegistrationsDataChart} options={options as any}  width={100} height={20} />
     
      <h1 className={chartTitleSyle}>
        {t('charts.total_of_attendes_workshops_title')}</h1>
      <Bar data={dataWorkshopsDataChart} options={workShopOptions as any} height={200} />
     
      <h1 className={chartTitleSyle}>
        {t('charts.total_of_attendes_consultations_title')}</h1>
      <Bar data={dataConsultationsDataChart} options={workShopOptions as any} height={500} />
    
      ;
    </div>
  );
};
export default Charts;
