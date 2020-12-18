import React from 'react';
<<<<<<< HEAD
import {Redirect} from 'react-router-dom'

const ProtectedRoutes = ({component}) => {
    const Component = component
    const isAuthenticated = localStorage.getItem('token');
    return (
       isAuthenticated ? (<Component/>) : (<Redirect to = {{pathname:"/login"}}/>)
    );
};

export {ProtectedRoutes};
=======
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
>>>>>>> c6ad148a2ecfaac525fdf265c0de8230d298eab2
