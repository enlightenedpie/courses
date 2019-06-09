import React from 'react'
import { StripeProvider, Elements, CardElement } from 'react-stripe-elements'
import methods from './checkout/methods'

export default class Checkout extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            init: false,
            completed: false,
            step: 0,
            update: true,
            loading: true,
            plan: null,
            item: null,
            card: false,
            valid: false,
            stripe: null
        }

        this.state.error = {
            id: '',
            message: ''
        }

        this.state.customer = {
            uid: '',
            stripeid: '',
            account: {
                email: '',
                firstname: '',
                lastname: ''
            },
            shipping: {
                phone: '',
                name: '',
                address: {}
            },
            options: {},
            token: '',
            nameOnCard: ''
        }

        Object.keys(methods).forEach((method) => {
            this[method] = methods[method].bind(this)
        })
    }

    componentDidMount() {
        document.body.classList.add('checkout')
        const key = _st.stripe
        this.session = {
            id: Date.now(),
            signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,'')
        }

        if (!window.Stripe) {
            const s = document.createElement('script')
            s.type = 'text/javascript'
            s.id = 'stStripeScript'
            s.async = true
            s.src = 'https://js.stripe.com/v3/'
            document.body.appendChild(s)
        }

        this.setState((state) => {
            return {
                init: true,
                stripe: (window.Stripe) ? window.Stripe(key) : null
            }
        }, () => {
            if (!window.Stripe) document.querySelector('#stStripeScript').addEventListener('load', () => {
                this.setState({stripe: window.Stripe(key)})
            })
        })
        _st.loading = false
    }

    shouldComponentUpdate(np, ns) {
        return ns.update;
    }

    componentWillUnmount() {
        document.body.classList.remove('checkout')
        let els = document.querySelectorAll('[name*="__privateStripe"]')
        for (let i = 0; i < els.length; i++) els.parentNode.removeChild(els)
    }

    render() {
        if (!this.state.init) return null

        let {children} = this.props
            //ಠ_ಠ = this['step'+step]

        return(
            <StripeProvider stripe={this.state.stripe}>
                <Elements>
                    <section className="stCheckoutWindow" onClick={(e) => this.props.closeCheckout()}>
                        <div className="stCheckoutInner" onClick={(e) => e.stopPropagation()}>
                            {children}
                        </div>
                    </section>
                </Elements>
            </StripeProvider>
        )
    }
}