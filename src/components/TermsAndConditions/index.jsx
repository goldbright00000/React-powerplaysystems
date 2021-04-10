import React from 'react';
import styles from './index.module.scss';
import SideBar from './SideBar';
import Terms from './Terms';

const TermsAndConditions = () => {
    return(
        <div className={`${styles.root} Terms-and-Conditions-Page`}>
            <SideBar />
            <Terms />
        </div>
    )
}

export default TermsAndConditions;