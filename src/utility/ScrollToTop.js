import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom'

const ScrollToTop = props => {
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location])
    return null;
}

export default ScrollToTop;