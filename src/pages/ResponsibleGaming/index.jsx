import React from 'react';
import styles from './index.module.scss';
import Header from '../../components/Header/Header'
import SideBar from '../../components/ResponsibleGamingComponents/SideBar';
import ResponsibleGamesInstructionsSection from '../../components/ResponsibleGamingComponents/ResponsibleGamesInstructionsSection';

const ResponsibleGaming = props => {
    return (
        <div className={`${styles.root} __responsible-gaming-page`}>
            <Header isStick={true} />
            <main className={styles.main}>
                <SideBar />
                <ResponsibleGamesInstructionsSection />
            </main>
        </div>
    )
}

export default ResponsibleGaming