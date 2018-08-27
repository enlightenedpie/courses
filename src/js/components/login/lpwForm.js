import React from 'react'
import * as _st from '../../classes/st'

export default function lpwForm() {
    return (
        <form id="stLoginWrapper" className="stFormWrapper row" onSubmit={this.submit}>
            <div className="stOverlay"></div>
            <div id="stLoginHeader" className="stFormHeader col s12">
                <h2>Reset your password</h2>
                <span>Please enter the email address associated with your account</span>
            </div>
            <div id="stLoginCredentials" className="col s12">
                <div className="input-field col s12">
                    <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" onBlur={this.setLoginState}/>
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button className="stFormButton pmt-button btn waves-effect waves-light">Reset your password</button>
            </div>
        </form>
    )
}