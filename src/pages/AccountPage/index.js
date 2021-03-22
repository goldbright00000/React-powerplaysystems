import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useMediaQuery } from "react-responsive";


import http from "../../config/http";
import { URLS } from "../../config/urls";
import { CONSTANTS } from "../../utility/constants";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccountInfo from "../../components/AccountInfoComponent";
import BalanceInfoComponent from "../../components/BalanceInfoComponent";
import ResultsInforComponent from "../../components/ResultsInfoComponent";
import HistoryInfoComponent from "../../components/HistoryInfoComponent";

function AccountPage(props) {
  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });
  useEffect(() => {
    getUserAccount();
  }, []);
  const { user = "" } = useSelector((state) => state?.auth);
  const [userAccount, setUserAccount] = useState({});

  const getUserAccount = async () => {
    const response = await http.get(URLS.AUTH.ACCOUNT);
    if (response.data.status === false) {
      //has error
      console.log(response.data);
    } else {
      setUserAccount(response.data);
    }
  };

  return (
    <>
      <Header isStick />
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <h2>Settings</h2>
          <div className={classes.container_tabs}>
            <Tabs
              selectedIndex={activeTab}
              onSelect={(tabIndex) => {
                setActiveTab(tabIndex);
              }}
            >
              <TabList className={classes.tabs_header}>
                <Tab className={`${activeTab === 0 && classes.active}`}>
                  Account Info
                </Tab>
                <Tab className={`${activeTab === 1 && classes.active}`}>
                  Balance
                </Tab>
                <Tab className={`${activeTab === 2 && classes.active}`}>
                  Results <span>2</span>
                </Tab>
                <Tab className={`${activeTab === 3 && classes.active}`}>
                  History
                </Tab>
              </TabList>

              <div className={classes.tab_body}>
                <TabPanel>
                  <AccountInfo isMobile={isMobile} user={user} />
                </TabPanel>
                <TabPanel>
                  <BalanceInfoComponent
                    isMobile={isMobile}
                    balance={userAccount.balance}
                  />
                </TabPanel>
                <TabPanel>
                  <ResultsInforComponent
                    isMobile={isMobile}
                    transactions={userAccount.transactions}
                    balance={userAccount.balance}
                  />
                </TabPanel>
                <TabPanel>
                  <HistoryInfoComponent 
                    isMobile={isMobile}
                  />
                </TabPanel>
              </div>
            </Tabs>
          </div>
        </div>
      </div>
      <Footer isBlack logoOnly={false} />
    </>
  );
}

export default AccountPage;
