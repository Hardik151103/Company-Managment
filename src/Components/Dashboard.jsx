import React, { useEffect, useState } from 'react';
import "../CSS/Dashboard.css"
import { Row, Col, Card } from 'react-bootstrap';
import { Routes, Route } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import ViewMaster from './ViewMaster';
import { getCardsData } from '../Redux/Slice/DashboardSlice';
import { useDispatch, useSelector } from 'react-redux';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [cardData, setCardData] = useState({
    employees: 0,
    projects: 0,
    clients: 0,
    managers: 0,
  });

  const dashboardCards = useSelector(state => state.dashboard.value);
  const dispatch = useDispatch()
  console.log(dashboardCards)
  useEffect(() => {
    dispatch(getCardsData())
  }, [])

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Employee Analysis',
        data: [10, 8, 0, 6, 9, 11, 7, 12, 14, 5, 7, 10],
        borderColor: 'blue',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Reality',
        data: [20, 30, 40, 50, 30, 70, 50, 90, 80, 60, 40, 50],
        backgroundColor: 'blue',
      },
      {
        label: 'Target',
        data: [30, 40, 50, 60, 40, 80, 60, 100, 90, 70, 50, 60],
        backgroundColor: 'green',
      },
    ],
  };
  // useEffect(() => {
  //   dispatch(getCardsData())
  // }, [])

  return (
    <ViewMaster>
      <div className="dashboard">
        <div className="dashboard-content">
          <div className='row'>
            {
              dashboardCards &&
              Object.keys(dashboardCards).map((x, i) => {
                return <div className='col-3' key={i}>
                  <div className="text-center">
                    <div className='myCard card p-3 ' >
                      <h4>{x}</h4>
                      <h3>{dashboardCards[x]}</h3>
                    </div>
                  </div>
                </div>
              })
            }
            <div className="mt-4 row">
              <div className='col-6'>
                <h5>Employee Analysis</h5>
                <Line data={lineData} />
              </div>
              <div className='col-6'>
                <h5>Reality & Target</h5>
                <Bar data={barData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ViewMaster >
  );
};

export default Dashboard;
