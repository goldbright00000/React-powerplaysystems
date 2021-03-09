import React from 'react'
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import DocIcon from '../../icons/Doc';
import Trophy from '../../icons/Trophy';

function Header3(props) {
    const { onClickContest = () => {}, onClickPrize = () => {}, titleMain1 = '', titleMain2 = '', subHeader1 = '', subHeader2 = '', contestBtnTitle = '', prizeBtnTitle = '', bgImageUri } = props || {};

    return (
        <div className={classes.header_container} style={{backgroundImage: 'url(' + bgImageUri + ')'}}>
            {
                titleMain1 &&
                <div className={classes.header_title}>
                    <span className={classes.line} /><h2>{titleMain1} <span>{titleMain2}</span></h2><span className={classes.line} />
                </div>
            }
            { subHeader1 && <p>{subHeader1}</p> }
            { subHeader2 && <p className={classes.p2}>{subHeader2}</p> }

            <div className={classes.header_buttons}>
                { contestBtnTitle && <button onClick={onClickContest}><DocIcon /> Contest Rules</button> }
                { prizeBtnTitle && <button onClick={onClickPrize}><Trophy /> Prize Grid</button> }
            </div>
        </div>
    )
}

Header3.propTypes = {
    onClickContest: PropTypes.func,
    onClickPrize: PropTypes.func,
    titleMain1: PropTypes.string,
    titleMain2: PropTypes.string,
    subHeader1: PropTypes.string,
    subHeader2: PropTypes.string,
    contestBtnTitle: PropTypes.string,
    prizeBtnTitle: PropTypes.string,
    bgImageUri: PropTypes.string,
}

export default Header3

