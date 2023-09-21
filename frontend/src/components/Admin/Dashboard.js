import React, {useEffect} from 'react';
import Sidebar from './Sidebar.js';
import "./Dashboard.css";
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, CategoryScale,
     LinearScale, PointElement, LineElement, Title, Legend } from "chart.js";
import { Doughnut} from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import { getAdminProduct } from '../../actions/productAction.js';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData.js';
import { getAllOrders } from '../../actions/orderAction.js';
import { getAllUsers } from '../../actions/userAction.js';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

const Dashboard = () => {
    const dispatch = useDispatch();

    const {products} = useSelector(state => state.products);
    const {orders} = useSelector(state => state.allOrders);
    const {users} = useSelector(state => state.allUsers);

    let totalAmount = 0;
    let outOfStock = 0;
    products && products.forEach((item)=>{
        if(item.Stock ===0){
            outOfStock += 1;
        }
    })

    orders && orders.forEach((item) => {
            totalAmount += item.totalPrice;
     });

    useEffect(()=> {
        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());
    }, [dispatch]);

    //GRaphs
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets:[
            {
                label: "Total Amount",
                backgroundColor: ["rgba(0, 0, 255, 0.75)"],
                hoverBackgroundColor: ["rgba(0, 0, 255, 1)"],
                data:[0, totalAmount],
            },
        ],
    };

    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets:[
            {
                backgroundColor: ["#f44336", "#4caf50"],
                hoverBackgroundColor: ["#ff5722", "#8bc34a"],
                data:[outOfStock, products?.length-outOfStock],
            }
        ],
    };

  return (
    <div className="dashboard">
        <MetaData title='Admin Dashboard' />
        <Sidebar />
        <div className="dashboardContainer">
            <Typography component="h1">DashBoard</Typography>
            <div className='dashboardSummary'>
                <div>
                    <p>
                        Total Amount <br /> ${totalAmount}
                    </p>
                </div>
                <div className="dashboardSummaryBox2">
                    <Link to="/admin/products">
                        <p>Products</p>
                        <p>{products && products?.length}</p>
                    </Link>
                    <Link to="/admin/orders">
                        <p>Orders</p>
                        <p>{orders && orders?.length}</p>
                    </Link>
                    <Link to="/admin/users">
                        <p>Users</p>
                        <p>{users && users?.length}</p>
                    </Link>
                </div>
            </div>
            <div className="lineChart">
                <Line data={lineState} />
            </div>
            <div className='doughnutChart'>
                <Doughnut data={doughnutState} />
            </div>
        </div>
    </div>
  )
}

export default Dashboard;
