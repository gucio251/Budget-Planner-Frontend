import React from 'react';
import {Link} from '@reach/router'
import {routes} from 'routes'

const ProtectedRoutes = ({component:Component}) => {
    //const Component = component
    const isAuthenticated = localStorage.getItem('token');
    return (
       isAuthenticated ? (<Component/>) : (<Link to = {{pathname: routes.loginPage}}/>)
    );
};

export default ProtectedRoutes;
