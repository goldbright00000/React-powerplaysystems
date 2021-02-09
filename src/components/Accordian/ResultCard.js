import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

function ResultCard(props) {

    const TableRow = () => {
        return (
            <div className={classes.row}>
                    <div>15 June </div>
                    <div>11:00 am </div>
                    <div>Lottery </div>
                    <div>747 </div>
                    <div>$200 </div>
                    <div>Verfied </div>
                    <div><button>View Results</button> </div>
                </div>
        )
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
                <TableRow />
                <TableRow />
                <TableRow />
            </div>
        </div>
    )
}

ResultCard.propTypes = {

}

export default ResultCard

