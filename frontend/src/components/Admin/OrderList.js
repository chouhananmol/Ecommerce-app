import React, { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./productList.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDER_RESET } from '../../constants/orderConstants';
import { useNavigate } from 'react-router-dom';


const OrderList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, orders } = useSelector(state => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector(state => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            toast.success('Order deleted successfully');
            navigate('/admin/orders');
            dispatch({ type: DELETE_ORDER_RESET });
        }
        dispatch(getAllOrders());
    }, [dispatch, error, deleteError, isDeleted, navigate]);

    const columns = [
        {
            field: 'id',
            headerName: 'Order ID',
            minWidth: 300,
            flex: 1
        },
        {
            field: 'status', headerName: 'Status', minWidth: 150, flex: 0.5,
            renderCell: (params) => {
                return params.row.status === 'Delivered' ? <div style={{ color: "green" }} >{params.row.status}</div>
                    : <div style={{ color: "red" }}>{params.row.status}</div>;
            },
        },
        { field: "itemsQty", headerName: "Items Qty", type: "number", minWidth: 150, flex: 0.4 },
        { field: "amount", headerName: "Amount", type: "number", minWidth: 270, flex: 0.5 },
        {
            field: "actions", headerName: "Actions", minWidth: 150, flex: 0.3, sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/order/${params.row.id}`}>
                            <EditIcon />
                        </Link>
                        <Button onClick={() =>
                            deleteOrderHandler(params.row.id)}>
                            <DeleteIcon />
                        </Button>
                    </>
                );
            },
        }
    ];
    const rows = [];
    orders && orders.forEach((item) => {
        rows.push({
            id: item._id,
            itemsQty: item.orderItems.length,
            amount: item.totalPrice,
            status: item.orderStatus
        });
    });

    return (
        <>
            <MetaData title={'All Orders'} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id="productListHeading">All Orders</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableRowSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default OrderList;
