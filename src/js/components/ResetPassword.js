import React from 'react'


/* const ResetPassword = ({setLoginState}) => 
    (<div>
        
    </div>) */

export default class ResetPassword extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        //if (this.props.match.params.key)

        _st.loading = false
    }

    render() {
        if (this.props.match.params.key) return null
        return (
            <React.Fragment>
            <div id="stLoginHeader" className="stFormHeader col s12">
                <h2>Reset your password</h2>
                <span>Please enter the email address associated with your account</span>
            </div>
            <div id="stLoginCredentials" className="col s12">
                <div className="input-field col s12">
                    <input className="browser-default validate email" type="email" name="username" placeholder="Email Address" />
                </div>
            </div>
            <div className="stFormButtons col s12">
                <button className="stFormButton btn waves-effect waves-light">Reset your password</button>
            </div>
            </React.Fragment>
        )
    }
}