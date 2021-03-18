import React from 'react';
import classes from './historyInfoComponent.module.scss';

const HistoryInfoComponent = (props) => {
    const { isMobile = false } = props || {};

    const TableRow = () => {
        return (
            <div className={classes.row}>
                {
                    isMobile ?
                        <>
                        <div className={classes.row_m}>
                            <div className={classes.row_m1}>
                                <span>Date</span>
                                <span>15 June</span>
                            </div>
                            <div className={classes.row_m1}>
                                <span>Time</span>
                                <span>11:00 am</span>
                            </div>
                            <div className={classes.row_m1}>
                                <span>Description</span>
                                <span>Power-up</span>
                            </div>
                            <div className={classes.row_m1}>
                                <span>Type</span>
                                <span>Power Token</span>
                            </div>
                            <div className={classes.row_m1}>
                                <span>Amount</span>
                                <span>$200</span>
                            </div>
                            <div className={classes.row_m1}>
                                <span>Results</span>
                                <span>Verified</span>
                            </div>                            
                        </div>
                        </>
                        :
                        <>
                            <div>15 June</div>
                            <div>11:00 am</div>
                            <div>Power-up</div>
                            <div>Power Token</div>
                            <div>$200</div>
                            <div>Verified</div>
                        </>
                }
                </div>
        )
    }

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
                <TableRow />
                <TableRow />
                <TableRow />
                <TableRow />
            </div>
        </div>
    )
};

export default HistoryInfoComponent;