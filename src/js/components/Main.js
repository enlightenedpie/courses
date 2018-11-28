import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { DataState } from './courses/StateContext'
import Course from './courses/Course'
import Dashboard from './courses/Dashboard'
import STModal from './modal/STModal'

export default class Main extends React.Component {
    constructor(props) {
        super(props)

        let sCD = localStorage.getItem('stCourseData') || false

        this.state = {
            data: !sCD || JSON.parse(sCD),
            loading: true,
            modal: {
                open: false,
                action: 'downloads',
                orientation: 'centered',
                color: false,
                mData: null,
                refr: null,
                test: ''
            }
        }

        this.dataSaveLocal = this.dataSaveLocal.bind(this)
        this.modalActive = this.modalActive.bind(this)
        this.setPlaylist = this.setPlaylist.bind(this)
        this.addDl = this.addDl.bind(this)
        this.addHistory = this.addHistory.bind(this)
        this.refreshData = this.refreshData.bind(this)

        //document.addEventListener( "contextmenu", (e) => e.preventDefault())
    }

    async componentDidMount() {
        _st.bodyClass = 'main'
        var obj = { loading: false }

        if (this.state.data === true) await _st.http.get('/courses/data',(h) => obj.data = h.data)

        this.setState(obj,() => this.dataSaveLocal())
    }

    componentDidUpdate() {
        _st.loading = false
        {/* <div id="stAppVidBlock" className="z-depth-2"></div> */}
    }

    dataSaveLocal() {
        return localStorage.setItem('stCourseData',JSON.stringify(this.state.data))
    }

    modalActive(modal = {}) {
        this.setState((state) => (Object.assign(state.modal,modal)))
    }

    setPlaylist(course,data) {
        this.setState((state) => {
            state.data.courses[course].playlist.push(data)
        }, () => this.dataSaveLocal())
    }

    addDl(course,data) {
        console.log(course)
        this.setState((state) => {
            state.data.courses[course].downloads.push(data)
        }, () => this.dataSaveLocal())
    }

    addHistory(course,obj) {
        this.setState((state) => {
            state.data.courses[course].history.push(obj.vidid)
        }, () => this.dataSaveLocal())
    }

    refreshData() {
        localStorage.removeItem('stCourseData')
        window.location.reload(true)
    }

    render() {
        if (this.state.data === true) return null

        return(
            <DataState.Provider value={this.state.data}>
                <Switch>
                    <Route exact path='/dashboard' render={props => <Dashboard refreshData={this.refreshData}/>} />
                    <Route exact path='/' render={() => <Redirect to="/dashboard" />} />
                    <Route exact path='/:courses/:collections?/:collection?/:tests?' render={props => <Course refreshData={this.refreshData} addHistory={this.addHistory} setPlaylist={this.setPlaylist} modalActive={this.modalActive} {...props} />} />
                    <Route exact path='/playlists/:playlist?' render={props => <Course modalActive={this.modalActive} {...props} />} />
                </Switch>
                <STModal {...this.state.modal} addDl={this.addDl} modalActive={this.modalActive} />
            </DataState.Provider>
        )
    }
}