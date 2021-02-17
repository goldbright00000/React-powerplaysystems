import React, {useState, useEffect} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { useMediaQuery } from 'react-responsive';

import classes from './index.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import AccountInfo from '../../components/AccountInfoComponent';
import BalanceInfoComponent from '../../components/BalanceInfoComponent';
import ResultsInforComponent from '../../components/ResultsInfoComponent';

function AccountPage(props) {
    const [activeTab, setActiveTab] = useState(0)
    const isMobile = useMediaQuery({ query: '(max-width: 540px)' });
    useEffect(() => { 
        
    }, [])
    return (
        <>
            <Header isStick />
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <h2>Settings</h2>
                    <div className={classes.container_tabs}>
                        <Tabs selectedIndex={activeTab} onSelect={(tabIndex) => {
                            setActiveTab(tabIndex)
                        }}>
                            <TabList className={classes.tabs_header}>
                                <Tab className={`${activeTab === 0 && classes.active}`}>Account Info</Tab>
                                <Tab className={`${activeTab === 1 && classes.active}`}>Balance</Tab>
                                <Tab className={`${activeTab === 2 && classes.active}`}>Results <span>2</span></Tab>
                            </TabList>

                            <div className={classes.tab_body}>
                                <TabPanel>
                                    <AccountInfo isMobile={isMobile} />
                                </TabPanel>
                                <TabPanel>
                                    <BalanceInfoComponent isMobile={isMobile} />
                                </TabPanel>
                                <TabPanel>
                                    <ResultsInforComponent isMobile={isMobile} />
                                </TabPanel>
                            </div>
                        </Tabs>
                    </div>
                </div>
            </div>
            <Footer isBlack logoOnly={false} />
        </>
    )
}

export default AccountPage
