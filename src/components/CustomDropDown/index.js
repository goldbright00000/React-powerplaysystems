import React, { useRef, useState, useEffect } from 'react';
import classes from './customDropDown.module.scss';

const CustomDropDown = (props) => {
    const { value = '', options = [{}], onChange = () => { } } = props || {};
    const wrapperRef = useRef();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('mousedown', handleOutSideClick);
    }, [wrapperRef]);

    const handleOutSideClick = (e) => {
        if (!wrapperRef.current?.contains(e?.target)) {
            setIsVisible(false);
        }
    };

    return (
        <div className={classes.__custom_drop_down_wrapper} ref={wrapperRef}>
            <div className={classes.__custom_drop_down_wrapper_header} onClick={() => setIsVisible(!isVisible)}>
                <div className={classes.__custom_drop_down_wrapper_header_title}>
                    {value} <span className={classes.__custom_drop_down_wrapper_header_down_arrow}></span>
                </div>
            </div>
            {
                isVisible
                &&
                <div className={classes.__custom_drop_down_wrapper_list}>
                    {
                        options.map((item, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        `${classes.__custom_drop_down_wrapper_list_item}
                                         ${item.value === value && classes.__custom_drop_down_wrapper_list_item_selected}
                                         ${index == 0 && classes.__custom_drop_down_wrapper_list_item_border_radius_top}
                                         ${options.length - 1 == index && classes.__custom_drop_down_wrapper_list_item_border_radius_bottom}
                                        `}
                                    onClick={() => {
                                        onChange(item.value);
                                        setIsVisible(!isVisible);
                                    }}>
                                    {item.label}
                                </div>
                            );
                        })
                    }
                </div>
            }
        </div>
    );
};

export default CustomDropDown;