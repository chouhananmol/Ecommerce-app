import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({children, isAuthenticated, adminRoute = false}) => {

    const {user} = useSelector(state => state.user);

    if(isAuthenticated === false){
        return <Navigate to="/login"/>;
    }

    if(adminRoute && user.role !== "admin"){
        return <Navigate to="/" />
    }

    return children ? children : <Outlet/>; 
}

export default ProtectedRoute;