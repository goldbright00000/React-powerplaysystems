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
      return moment(timestamp).format("MMM d");
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
                <span>{getDate(transaction.created_at)}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Time</span>
                <span>{getTime(transaction.created_at)}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game League</span>
                <span>{transaction?.power_dfs_games?.league || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game Type</span>
                <span>{transaction?.power_dfs_games?.game_type || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Game ID</span>
                <span>{transaction?.power_dfs_games?.game_id || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Points</span>
                <span>{transaction?.score || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Rank</span>
                <span>{transaction?.ranking || "--"}</span>
              </div>
              <div className={classes.row_m1}>
                <span>Amount Won</span>
                <span>{transaction.win_amount || "--"}</span>
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
            <div>{getDate(transaction.created_at)} </div>
            <div>{getTime(transaction.created_at)} </div>
            <div>{transaction?.power_dfs_games?.league || "--"} </div>
            <div>{transaction?.power_dfs_games?.game_type || "--"} </div>
            <div>{transaction?.power_dfs_games?.game_id || "--"} </div>
            <div>{transaction?.score || "--"}</div>
            <div>{transaction?.ranking || "--"}</div>
            <div>{transaction.win_amount || "--"}</div>
            <div>Verfied</div>
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
          <div>League</div>
          <div>Game Type</div>
          <div>Game ID</div>
          <div>Points</div>
          <div>Rank</div>
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
