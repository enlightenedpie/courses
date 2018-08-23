import React from 'react'
import ReactDOM from 'react-dom'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {Switch, Route, Link, Redirect} from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Main from './Main'
import allYourBase from './allYourBase'

export default class ST extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading : true,
            auth : false
        }
    }

    verifySession() {
        fetch('https://api.supertutortv.com/v2/auth/verify', {
            method: 'POST',
            accept: 'application/vnd.sttv.app+json',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json())
        .then(response => {
            console.log(response)
        })
    }

    loading() {
        this.setState({loading : true})
    }

    active() {
        this.setState({loading : false})
    }

    componentDidMount() {
        this.verifySession()
    }

    render() {
        return (
            <div id="stAppInner" className={this.state.loading ? 'loading' : 'active'}>
                <Header />
                <Sidebar />
                <Main />
            </div>
        )
    }
}