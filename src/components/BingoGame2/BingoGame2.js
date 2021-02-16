import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import './BingoGame2.scss';
import { isEmpty } from 'lodash';

const BingoGame2 = props => {
    const { bingo: { b = [], i = [], n = [], g = [], o = [] } = {} } = props || {};
    
    const renderTableRow = (list) => {
        return (
            list && list?.length && list?.map((value, index) =>
                <div key={index + ' ' + value}>{ value }</div>
            )
        )
    }
    
    return (
        <div className='__bingo-game-2 __primary-color __h2 __mediam-on-small'>
            <div className='__bold'>B</div>
            {renderTableRow(b)}

            <div className='__bold'>I</div>
            {renderTableRow(i)}

            <div className='__bold'>N</div>
            {renderTableRow(n)}

            <div className='__bold'>G</div>
            {renderTableRow(g)}

            <div className='__bold'>O</div>
            {renderTableRow(o)}
        </div>
    )
}

BingoGame2.propTypes = {
    bingo: PropTypes.object
}

export default React.memo(BingoGame2);