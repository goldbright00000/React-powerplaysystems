import React from "react";
import classes from "./historyInfoComponent.module.scss";
import moment from "moment";

import TickIcon from "../../assets/icons/correct-copy.png";

const HistoryInfoComponent = (props) => {
  let { isMobile = false, transactions = [] } = props || {};

  transactions = transactions.filter(el => el?.transaction_type_details?.type === "Game Entry" || el?.transaction_type_details?.type === "Game Exit");


  const TableRow = (props) => {
    const { transaction = {}, isMobile = false } = props || {};

    const getDate = (timestamp) => {
      return moment(timestamp).format("MMM D");
    };
    const getTime = (timestamp) => {
      return moment(timestamp).format("hh:mm A");
    };

    return (
      <>
        {isMobile ? (
          <>
            {/* <div className={classes.row_m}>
              <div className={classes.row_m1}>
                <span>Date</span>
                <span>{getDate(transaction.date_time)}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Time</span>
                <span>{getTime(transaction.date_time)}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Description</span>
                <span>{transaction.description || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Type</span>
                <span>Power Token</span>
              </div>
              <div className={classes.row_m1}>
                <span>Amount</span>
                <span>{transaction.transaction_amount || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Results</span>
                <span>Verified</span>
              </div>
            </div> */}
            <div className={classes.row_mobile}>
              <div className={classes.col_details}>
                <span className={classes.details}>
                  {getDate(transaction.date_time)}{" "}
                  {getTime(transaction.date_time)}{" "}
                </span>{" "}
                <br />{" "}
                <span className={classes.values}>
                  {" "}
                  {transaction?.transaction_type_details?.type || "--"}{" "}
                </span>{" "}
              </div>
              <div className={classes.col_details}>
                <span>{transaction.balance_type}: </span> <br />
                <span className={classes.values}>
                  {" "}
                  {transaction.transaction_amount || "--"}{" "}
                </span>
              </div>
              <div className={classes.col_details}>
                <img src={TickIcon} width="30px" height="30px" alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className={classes.row}>
              <div className="mx-1 text-left text-ellipsis">{getDate(transaction.date_time)} </div>
              <div className="mx-1 text-left text-ellipsis">{getTime(transaction.date_time)} </div>
              <div className="mx-1 text-left text-ellipsis">{transaction?.transaction_type_details?.type || "--"} </div>
              <div className="mx-1 text-left text-ellipsis">{transaction?.game_id || "--"} </div>
              <div className="mx-1 text-left text-ellipsis">{transaction.balance_type?.toUpperCase()}</div>
              <div className="mx-1 text-left text-ellipsis">{transaction.transaction_amount || transaction.transaction_amount === 0 ? '' : transaction.balance_result === 'increase' ? ` + ` : ' - '} {transaction.transaction_amount > 0 ? transaction.transaction_amount : "Free"}</div>
              <div className="mx-1 text-left text-ellipsis">{transaction.balance_result === 'increase' ? `Verified` : 'Entered'}</div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className={`${classes.table_wrapper} w-100`} style={{ transform: 'none' }}>
      <div className={`${classes.table_header} w-100`}>
        <div className={classes.row}>
          <div className="mx-1 text-left">Date</div>
          <div className="mx-1 text-left">Time</div>
          <div className="mx-1 text-left">Type</div>
          <div className="mx-1 text-left">Game Id</div>
          <div className="mx-1 text-left">Currency</div>
          <div className="mx-1 text-left">Amount</div>
          <div className="mx-1 text-left">Results</div>
        </div>
      </div>

      <div className={`${classes.table_body} w-100`}>
        {transactions.map(function (row, index) {
          return <TableRow transaction={row} isMobile={isMobile} />;
        })}
      </div>
    </div>
  );
};

export default HistoryInfoComponent;
