import React from "react";
import classes from "./historyInfoComponent.module.scss";
import moment from "moment";
const HistoryInfoComponent = (props) => {
  const { isMobile = false, balance = {}, transactions = {} } = props || {};

  const TableRow = (props) => {
    const { transaction = {}, isMobile = false } = props || {};
    const getDate = (timestamp) => {
      return moment(timestamp).format("MMMM d");
    };
    const getTime = (timestamp) => {
      return moment(timestamp).format("hh:mm A");
    };
    return (
      <div className={classes.row}>
        {isMobile ? (
          <>
            <div className={classes.row_m}>
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
            </div>
          </>
        ) : (
          <>
            <div>{getDate(transaction.date_time)} </div>
            <div>{getTime(transaction.date_time)} </div>
            <div>{transaction.description || "--"} </div>
            <div>Power Token </div>

            <div>{transaction.transaction_amount || "--"}</div>
            <div>Verified</div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={classes.table_wrapper}>
      <div className={classes.table_header}>
        <div className={classes.row}>
          <div>Date</div>
          <div>Time</div>
          <div>Description</div>
          <div>Type</div>
          <div>Amount</div>
          <div>Results</div>
        </div>
      </div>

      <div className={classes.table_body}>
        {transactions.map(function (row, index) {
          return <TableRow transaction={row} isMobile={isMobile} />;
        })}
      </div>
    </div>
  );
};

export default HistoryInfoComponent;
