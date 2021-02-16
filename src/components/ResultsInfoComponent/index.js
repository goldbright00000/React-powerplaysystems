import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Accordian from '../Accordian'

const data = [
    { cashTitle: 'Total: ', cash: '$4500' },
    {cashTitle: 'Total: ', cash: '$4500'}
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
                    <Accordian title="Cash Prizes" visible={ ind === activeTab } onClick={() => onClickAccordian(ind)} cashTitle={v.cashTitle} cash={v.cash} key={ind.toString()} isMobile={isMobile} />
                ))
            }
        </>
    )
}

ResultsInforComponent.propTypes = {
    isMobile: PropTypes.bool,
}

export default ResultsInforComponent

