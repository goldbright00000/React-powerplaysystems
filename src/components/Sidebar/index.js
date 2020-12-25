import React from 'react'

import Shuffle from '../../icons/Shuffle'
import Reload from '../../icons/Reload'
import SidebarButton from '../SidebarButton'
import PowerMatchImg from '../../assets/flash.png'
import ArrowUp from '../../icons/ArrowUp'
import ArrowDown from '../../icons/ArrowDown'
import "./sidebar.scss"

function Sidebar(props) {
    return (
        <div className="__sidebar_container">
            <div className="__sidebar_container_2">
                <div className="__sidebar_header">
                    <span className="__sidebar_header_title">My Powerplays</span>
                    <div className="__sidebar_header_balance">
                        <span>My Balance</span>
                        <span className="__sidebar_balance_text">$0.00</span>
                    </div>
                </div>

                <div className="__sidebar_button_wrapper">
                    <SidebarButton
                        success
                        title="Replace"
                        toolText="1 left"
                        icon={<Shuffle style={{ height: 'auto' }} />}
                    />

                    <SidebarButton
                        primary
                        title="Replace All"
                        toolText="$.25"
                        icon={<div className="__sidebar_reload_btn"><Reload bgColor={"#0ff"} style={{ height: 'auto' }} /></div>}
                    />

                    <SidebarButton
                        primary
                        title="Power Match"
                        toolText="$.25"
                        icon={<img src={PowerMatchImg} width={48} height={48} />}
                    />

                    <SidebarButton
                        primary
                        title="Increase"
                        toolText="$.25"
                        icon={<ArrowUp style={{ height: 'auto' }} />}
                    />

                    <SidebarButton
                        primary
                        title="Decrease"
                        toolText="$.25"
                        icon={<ArrowDown style={{ height: 'auto' }} />}
                    />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
