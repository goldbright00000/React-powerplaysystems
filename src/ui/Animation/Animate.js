import React, { useEffect, useMemo, useRef } from 'react';
import './Animate.scss';

const Animate = ({ className, children, isTest }) => {
    const elm = useRef();
    const onScroll = () => {
        const { offsetTop, offsetHeight, classList } = elm.current;

        const { scrollY, innerHeight } = window;
        if (!classList.contains('active') && scrollY >= offsetTop - innerHeight && scrollY <= offsetTop + offsetHeight) {
            classList.add('active');
        }
    }
    useEffect(() => {
        window.addEventListener('scroll', onScroll)
        onScroll();
    }, [])
    return (
        <div className={`__Animate ${className}`} ref={elm}>
            {useMemo(() => children, [])}
        </div>
    )
}

export default Animate;