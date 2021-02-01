import React from 'react'
import { Redirect, Route } from 'react-router-dom';

import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import {  getToken } from '../../utility/shared';

function ProtectedRoute({ component: Component, ...rest }) {
    const { use: { token = '' } = {} } = useSelector((state) => state?.auth);
    let isAuthenticated = !isEmpty(token) || getToken()
    
    return <Route {...rest} render={(props) => {
        return (
            isAuthenticated ?
                <Component {...props} />
                :
                <Redirect to={{
                    pathname: '/login',
                    state: {from: props?.location}
                }} />
            )
        }} />
}

export default ProtectedRoute

