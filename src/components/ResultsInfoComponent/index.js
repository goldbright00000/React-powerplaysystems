import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Accordian from '../Accordian'
import Token from "../../assets/token.png";

const data = [
    { 
        title: 'Cash Prizes',
        cashTitle: 'Total:', 
        cash: '$4500' ,
        icon: ''
    },
    {
        title: 'Collected',
        cashTitle: 'Total Tokens:', 
        cash: '5,000',
        icon: Token
    }
    ,
    {
        title: 'Non-Cash Prizes',
        cashTitle: '', 
        cash: '',
        icon: ''
    }
]

function ResultsInforComponent(props) {
    const [activeTab, setActiveTab] = useState();

    const { isMobile = false } = props || {};

    const onClickAccordian = (index) => {
        setActiveTab(activeTab === null ? index : null)
    }

    return (
        <>
            {
                data.map((v, ind) => (
                    <Accordian 
                        title={v.title} 
                        icon={v.icon}
                        visible={ ind === activeTab } 
                        onClick={() => onClickAccordian(ind)} 
                        cashTitle={v.cashTitle} 
                        cash={v.cash} 
                        key={ind.toString()} 
                        isMobile={isMobile}     
                    />
                ))
            }
        </>
    )
}

ResultsInforComponent.propTypes = {
    isMobile: PropTypes.bool,
}

export default ResultsInforComponent

