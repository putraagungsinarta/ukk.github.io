import React , { useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const auth = {'token':true}
    return(
        auth.token? <Outlet/> : <Navigate to="/login" />
    )
}

export default ProtectedRoute;