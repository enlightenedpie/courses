import React from 'react'
import Payment from './payment'
import Course from './CourseSelect'

const Details = () => {
    return <fieldset>Details</fieldset>
}

const Shipping = () => {
    return <fieldset>Shipping</fieldset>
}

const ThankYou = ({state,hist}) => {
    return (
        <div className="stSignupThankYou stSignupStep">
            <h1>Thank you!</h1>
            <div class="stSignupInner stFormWrapper">
                <div className="row">Your order code is <strong>{state.thankYou.id}</strong>. Keep this for your records.</div>
                <div className="row">
                    <div className="stuff">
                        <span>You will receive a payment receipt when your card is charged, either after your trial expires or very soon if you skipped the trial. You will also receive a welcome email with instructions for using the course. Or if you'd like to get started right now, just click the button below.</span>
                    </div>
                </div>
                <div className="stFormButtons">
                    <button id="stBtn_thankyou" className="stFormButton btn waves-effect waves-light" onClick={() => hist.replace('/dashboard')}>Go to dashboard</button>
                </div>
            </div>
        </div>
    )
}

export { Course, Details, Shipping, Payment, ThankYou }