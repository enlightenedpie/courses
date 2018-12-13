import React from 'react'
import FAIco from '../FAIco'
import VidPlayer from '../VidPlayer'
import ToggleSwitch from '../pieces/toggleSwitch'

export default class MyStudyList extends React.Component {
    constructor(props) {
        super(props)

        this.playlist = this.props.data

        this.state = {
            vindex : 0,
            video : this.playlist[0].vidid,
            autoplay: this.props.autoplay
        }

        this.changeVid = this.changeVid.bind(this)
    }

    changeVid(i) {
        this.setState((state) => {return {vindex: (typeof i === 'undefined') ? state.vindex + 1 : i}})
    }

    render() {
        let { playlist } = this,
            { updateSettings } = this.props,
            list = []

        playlist.forEach((o,i) => {
            let clsHl = (this.state.vindex === i) ? ' highlight' : ''
            list.push(
                <div className={"stCourseStudyListItem"+clsHl} onClick={() => this.changeVid(i)}>
                    <img src={"https://i.vimeocdn.com/video/"+o.thumb+"_295x166.jpg?r=pad"} />
                    <div class="listItemTitle">{o.name}</div>
                    <div class="listRemoveItem" onClick={(e) => {
                        e.stopPropagation()
                        let el = e.target.parentNode
                        if (window.confirm('Are you sure you want to delete this video?')) {
                            console.log(o)
                            el.style = "opacity:0"
                            window.setTimeout(() => el.style = 'display:none',100)
                        }
                    }}>x</div>
                </div>
            ) 
        })

        return (
            <div className="stCourseTop">
                <div className="stCourseIntro">
                    <VidPlayer ind={(n) => this.setState({vindex: n})} autoplay={this.state.autoplay.msl} getNextVid={this.changeVid} video={playlist[this.state.vindex].vidid} />
                </div>
                <div className="stCourseMSL">
                    <div className="stCourseMSLInner">
                        <div className="stCourseStudyListHeading">My Study List</div>
                        <div className="stCourseStudyList">
                            <div className="stCourseStudyListInner">{list}</div>
                        </div>
                        <div className="stCourseStudyListFooter">
                            <ToggleSwitch label="autoplay" on={this.state.autoplay.msl} onClick={(e) => {
                                this.setState((prev) => {
                                    let obj = Object.assign(prev.autoplay,{'msl':!prev.autoplay.msl})
                                    updateSettings('autoplay',obj)
                                    return obj
                                })
                            }}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}