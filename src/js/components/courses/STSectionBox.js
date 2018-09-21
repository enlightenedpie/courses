import React from 'react'

const STSectionBox = ({icon = 'atom',title = 'boosh',color = '#109fda'}) => 
    <div className="stSectionBox">
        <div className="stSectionBoxInner z-depth-3" style={{backgroundColor:color}}>
            <div className="stSectionBoxContainer">
                <i className={"brainy-"+icon}></i>
                <div>{title}</div>
            </div>
        </div>
    </div>

export default STSectionBox