import React from 'react';
import PropTypes from 'prop-types';

import classes from './index.module.scss';

function ResultCard(props) {
    return (
        <div className={classes.table_wrapper}>
            <table>
                <thead>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                    <th>Date</th>
                </thead>
                <tbody>
                    <tr>
                        <td>15 June</td>
                        <td>15 June</td>
                        <td>15 June</td>
                        <td>15 June</td>
                        <td>15 June</td>
                        <td>15 June</td>
                        <td>15 June</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

ResultCard.propTypes = {

}

export default ResultCard

