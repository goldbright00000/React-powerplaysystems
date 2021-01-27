import React from 'react'
import PropTypes from 'prop-types'
import Accordian from '../Accordian'

function ResultsInforComponent(props) {
    return (
        <div>
            <Accordian title="Cash Prizes" cashTitle={"Total: "} cash={'$4500'} />
            <Accordian title="Cash Prizes" cashTitle={"Total: "} cash={'$4500'} />
        </div>
    )
}

ResultsInforComponent.propTypes = {

}

export default ResultsInforComponent

