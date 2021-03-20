import React, { useEffect } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import classes from "./index.module.scss";

function ResultCard(props) {
  const { isMobile = false } = props || {};
  const { transactions = [] } = props || [];
  function TableRow(props) {
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
                <span>Game Type</span>
                <span>{transaction.gametype || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game Desc</span>
                <span>{transaction.description || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Amount Won</span>
                <span>{transaction.transaction_amount || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Results</span>
                <span>Verfied</span>
              </div>
            </div>
            <div className={classes.row_m_footer}>
              <button>View Results</button>{" "}
            </div>
          </>
        ) : (
          <>
            <div>{getDate(transaction.date_time)} </div>
            <div>{getTime(transaction.date_time)} </div>
            <div>{transaction.gametype || "--"} </div>
            <div>{transaction.description || "--"} </div>
            <div>{transaction.transaction_amount || "--"}</div>
            <div>Verfied </div>
            <div>
              <button>View Results</button>{" "}
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className={classes.table_wrapper}>
      <div className={classes.table_header}>
        <div className={classes.row}>
          <div>Date</div>
          <div>Time</div>
          <div>Game Type</div>
          <div>Game Desc</div>
          <div>Amount Won</div>
          <div>Results</div>
          <div>Actions</div>
        </div>
      </div>

      <div className={classes.table_body}>
        {transactions.map(function (row, index) {
          return <TableRow transaction={row} isMobile={isMobile} />;
        })}
      </div>
    </div>
  );
}

ResultCard.propTypes = {
  isMobile: PropTypes.bool,
};

export default ResultCard;
