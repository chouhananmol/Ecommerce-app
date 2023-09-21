import React, {useEffect} from 'react';
import "./OrderDetails.css";
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { getOrderDetails, clearErrors } from '../../actions/orderAction';
import { toast } from 'react-hot-toast';

const OrderDetails = () => {
    const { id } = useParams();
    const {order, error, loading} = useSelector(state => state.orderDetails);
    const dispatch = useDispatch();

    useEffect(() => {
        if(error){
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, error, id]);
  return (
   <>
   {loading? (
    <Loader />
   ): (
    <>
        <MetaData title="Order Details" />
        <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
                <Typography component="h1">
                    Order # {order && order._id}
                </Typography>
                <Typography> Shipping Info </Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p>Name:</p>
                        <span>{order.user && order.user.name}</span>
                    </div>
                    <div>
                        <p>Phone:</p>
                        <span>{order.shippingInfo && order.shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                        <p>Address:</p>
                        <span>{`${order.shippingInfo && order.shippingInfo.address}, 
                        ${order.shippingInfo && order.shippingInfo.city}, 
                        ${order.shippingInfo && order.shippingInfo.state}, 
                        ${order.shippingInfo && order.shippingInfo.pinCode}, 
                        ${order.shippingInfo && order.shippingInfo.country}`}</span>
                    </div>
                </div>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                                ? "greenColor"
                                : "redColor"
                        }>
                            {order.paymentInfo && order.paymentInfo.status==="succeeded"? "PAID": "NOT PAID"}
                        </p>
                    </div>
                    <div>
                        <p>Amount:</p>
                        <span>{order.totalPrice && order.totalPrice}</span>
                    </div>
                </div>
                <Typography>Order Status:</Typography>
                <div className="orderDetailsContainerBox">
                    <div>
                        <p className={
                            order.orderStatus && String(order.orderStatus).includes("Delivered")
                                ? "greenColor"
                                : "redColor"
                        }>
                            {order.orderStatus && order.orderStatus}
                        </p>
                    
                    </div>
                </div>
            </div>
            <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                    {order.orderItems && order.orderItems.map((item) => (
                        <div key={item.product}>
                            <img src={item.image} alt={item.name} />
                            <Link to={`/product/${item.product}`}>
                                {item.name}
                            </Link>
                            <span>
                                {item.quantity} x ${item.price} = {" "}
                                <b> ${item.quantity * item.price} </b>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
       
    </>
   )}
   </>
  )
}

export default OrderDetails;
