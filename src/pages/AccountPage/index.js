import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useMediaQuery } from "react-responsive";

import http from "../../config/http";
import { URLS } from "../../config/urls";
import { getLocalStorage } from "../../utility/shared";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccountInfo from "../../components/AccountInfoComponent";
import BalanceInfoComponent from "../../components/BalanceInfoComponent";
import ResultsInforComponent from "../../components/ResultsInfoComponent";
import HistoryInfoComponent from "../../components/HistoryInfoComponent";
import DepositWithdrawComponent from '../../components/DepositWithdrawComponent';
import AccountLimits from "../../components/AccountLimits";
import { printLog } from "../../utility/shared";
import SnackbarAlert from "../../components/SnackbarAlert";
import { showDepositForm } from "../../actions/uiActions";
import * as MLbActions from "../../actions/MLBActions";
import { getUserWinnigs } from "../../actions/userActions";

function AccountPage(props) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });

  useEffect(() => {
    getUserAccount();
    getUserGames();
    getuserWinnigs();
  }, []);

  const { user = "" } = useSelector((state) => state?.auth);

  const { userWinnigs } = useSelector((state) => state?.user)

  const [userAccount, setUserAccount] = useState({});

  const getUserAccount = async () => {
    const response = await http.get(URLS.AUTH.ACCOUNT);
    if (response.data.status === false) {
      //has error
      printLog(response.data);
    } else {
      setUserAccount(response.data);
    }
  };

  const getUserGames = async () => {
    const user_id = getLocalStorage("PERSONA_USER_ID");
    if (user_id) {
      dispatch(MLbActions.getUserGames(user_id));
    }
  };

  const getuserWinnigs = async () => {
    const user_id = getLocalStorage("PERSONA_USER_ID");
    if (user_id) {
      dispatch(getUserWinnigs(user_id));
    }
  };

  return (
    <>
      <Header isStick isMobile={isMobile} />
      <SnackbarAlert />
      <div className={classes.wrapper}>
        <div className={`${classes.container} container`}>
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
                  <h6 className="m-0">Account Info</h6>
                </Tab>
                <Tab className={`${activeTab === 1 && classes.active}`}>
                  <h6 className="m-0">Balance/Deposit</h6>
                </Tab>
                <Tab className={`${activeTab === 2 && classes.active}`}>
                  <h6 className="m-0">Winnings</h6>
                </Tab>
                <Tab className={`${activeTab === 3 && classes.active}`}>
                  <h6 className="m-0">Contest History</h6>
                </Tab>
                <Tab className={`${activeTab === 4 && classes.active}`}>
                  <h6 className="m-0">Deposit/Withdrawal History</h6>
                </Tab>
                <Tab className={`${activeTab === 5 && classes.active}`}>
                  <h6 className="m-0">Account Limits</h6>
                </Tab>
              </TabList>

              <div className={classes.tab_body}>
                <TabPanel>
                  <AccountInfo isMobile={isMobile} user={user} />
                </TabPanel>
                <TabPanel>
                  <BalanceInfoComponent
                    openDepositModal={(val) => dispatch(showDepositForm(val))}
                    isMobile={isMobile}
                    balance={userAccount.balance}
                  />
                </TabPanel>
                <TabPanel>
                  <ResultsInforComponent
                    isMobile={isMobile}
                    userWinnigs={userWinnigs}
                    balance={userAccount.balance}
                  />
                </TabPanel>
                <TabPanel>
                  <HistoryInfoComponent
                    isMobile={isMobile}
                    transactions={userAccount.transactions}
                    balance={userAccount.balance}
                  />
                </TabPanel>
                <TabPanel>
                  <DepositWithdrawComponent
                    isMobile={isMobile}
                    transactions={userAccount.transactions}
                    balance={userAccount.balance}
                  />
                </TabPanel>
                <TabPanel>
                  <AccountLimits
                    isMobile={isMobile}
                    accountLimit={userAccount.accountLimit}
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
