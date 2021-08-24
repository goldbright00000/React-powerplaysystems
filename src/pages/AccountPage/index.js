import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { useMediaQuery } from "react-responsive";

import http from "../../config/http";
import { URLS } from "../../config/urls";
import { CONSTANTS } from "../../utility/constants";
import { getLocalStorage } from "../../utility/shared";

import classes from "./index.module.scss";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AccountInfo from "../../components/AccountInfoComponent";
import BalanceInfoComponent from "../../components/BalanceInfoComponent";
import ResultsInforComponent from "../../components/ResultsInfoComponent";
import HistoryInfoComponent from "../../components/HistoryInfoComponent";
import AccountLimits from "../../components/AccountLimits";
import { printLog } from "../../utility/shared";
import SnackbarAlert from "../../components/SnackbarAlert";
import { showDepositForm } from "../../actions/uiActions";
import * as MLbActions from "../../actions/MLBActions";

function AccountPage(props) {
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState(0);
  const isMobile = useMediaQuery({ query: "(max-width: 540px)" });

  useEffect(() => {
    getUserAccount();
    getUserGames();
  }, []);

  const { user = "" } = useSelector((state) => state?.auth);
  const showDepositModal = useSelector((state) => state.ui?.showDepositForm);

  const [userAccount, setUserAccount] = useState({});
  const { getUserSavedGames } = useSelector((state) => state?.mlb);

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

  useEffect(() => {
    const obj = { ...userAccount };

    if (getUserSavedGames?.length > 0) {
      getUserSavedGames.forEach((element) => {
        obj?.transactions?.push({
          balance_result: "decrease",
          balance_type: element?.game?.currency,
          date_time: element?.game?.createdAt,
          description: "Entered into Game",
          transaction_amount: element?.game?.entry_fee,
          transaction_type_details: { type: "Game Entry" },
        });
      });
      setUserAccount(obj);
    }
  }, [getUserSavedGames]);

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
                  <h6 className="m-0">Results</h6>
                </Tab>
                <Tab className={`${activeTab === 3 && classes.active}`}>
                  <h6 className="m-0">History</h6>
                </Tab>
                <Tab className={`${activeTab === 4 && classes.active}`}>
                  <h6 className="m-0">Withdrawal History</h6>
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
                    transactions={userAccount.transactions}
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
                  <HistoryInfoComponent
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
