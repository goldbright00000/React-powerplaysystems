import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';

import classes from './index.module.scss';
import Button from '../Button';
import Ticket from '../../icons/Ticket';
import Token from '../../assets/token.png';
import Money from '../../icons/Money';
import ListItem from './ListItem';

const ListTitle = (Icon, isSvg, title) => (
    <span className={classes.list_left_side_1}>
        {
            Icon && isSvg ?
                <Icon />
                :
                Icon && !isSvg &&
                <img src={Icon} width={34} height={34} />
        }
        <span>{ title }</span>
    </span>
)

const ListHeader = (title, balance, btnTitle, Icon, isSvg) => {
    return (
        <div className={classes.list_container}>
            <div className={classes.list_left_side}>
                {ListTitle(Icon, isSvg, title)}
                <span className={classes.span}>
                    {balance}
                </span>
            </div>

            <div className={classes.list_right_side}>
                <Button title={btnTitle} />
                <span>Min. Amount: $100</span>
            </div>
        </div>
    )
}

function BalanceInfoComponent(props) {
    

    return (
        <>
            <div className={classes.list_header_wrapper}>
                {ListHeader('My Cash Balance', '$1,750', 'Redeem', Money, true)}
                {ListHeader('My Token Balance', '1,750', 'Transfer to Wallet', Token, false)}
            </div>
            <div className={classes.list_body}>
                {ListTitle(Ticket, true, 'My non-cash prizes')}                
                <ListItem title='3 nights stay at Fairmont Banff Springs' />
                <ListItem title='10 free meals at Macdonald’s' claimed={false} />
                <ListItem title="3 nights stay at Fairmont Banff Springs" />
            </div>
        </>
    )
}

BalanceInfoComponent.propTypes = {

}

export default BalanceInfoComponent

