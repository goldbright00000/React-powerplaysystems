import React from 'react'

import "./pageHeaderCard.scss"
import Card from '../Card'
import Time from '../../icons/Time'

function PageHeaderCard(props) {
    return (
        <Card>
            <div className="__card_header">
                <small>Jackpot</small>
            </div>
            <div className="__card_body">               
                <div className="__card_body_left">
                    <div className="__card_body_top">
                        <h1>$2000</h1><span>CAD</span>
                    </div>
                    <p>
                        Odds of winning depend on <br />
                        <strong>Powerplay usage</strong>
                    </p>
                </div>
                <div className="__divider" />
                <div className="__card_body_right">
                    <span>Live Draw in Progress</span>
                    <div className="__card_body_right_bottom">
                        <Time size={25} style={{height: 'auto', marginRight: 10}} />
                        <p>
                        Pay attention, you will have <br />
                        12 seconds to match each card.
                        </p>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default PageHeaderCard
