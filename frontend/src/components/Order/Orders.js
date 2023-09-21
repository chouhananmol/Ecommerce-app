import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { toast } from 'react-hot-toast';
import Loader from '../layout/Loader/Loader';
import MetaData from '../layout/MetaData';
import "./Orders.css";
import { Typography } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';


const Orders = () => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.user);
    const { loading, error, orders } = useSelector(state => state.myOrders);


    // Creating columns and rows for the data grid
    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },
        {
            field: 'status',
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            renderCell: (params) => {
                return params.row.status === "Delivered" ?
                    <div style={{ color: "green" }}>{params.value}</div> :
                    <div style={{ color: "red" }}>{params.value}</div>;
            }

        },
        {
            field: 'itemsQty',
            headerName: "Products",
            type: "number",
            minWidth: 150,
            flex: 0.5,

        },
        {
            field: 'amount',
            headerName: "Amount",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: 'actions',
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.row.id}`}>
                        <LaunchIcon />
                    </Link>
                );
            },
        },
    ]

    const rows = [];
    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    });

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, error])
    return (
        <>
            <MetaData title={`${user.name} - Orders`} />
            {loading ? <Loader /> : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />
                    <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                </div>
            )}
        </>
    )
}

export default Orders;
