// changeStep
export function changeStep(inc = true,e) {
    if (typeof e !== 'undefined') e.preventDefault()
    this.setState({
        step : inc ? this.state.step + 1 : this.state.step - 1
    })
}

// createAccount
export default function createAccount(e) {
    _st.loading = true
    e.preventDefault()
    var account = this.state.session.customer.account
    _st.http.post('/signup/account',account,(d) => {
        if (d.code === 'signupError') return this.setState({
            error: {
                id: d.code,
                message: d.message
            }
        })

        Object.assign(this.state.session.customer,d.update)
        this.changeStep()
    })
}

// initSession
export function initSession(plan) {
    _st.loading = true
    var planId = (typeof plan === 'string') ? plan : plan.target.id.replace('stPlan-',''),
        thePlan = {}

    _st.plans.some((obj) => {
        if (obj.id === planId || obj.slug === planId)
            return thePlan = obj
    })

    if (!Object.keys(thePlan).length) {
        delete this.state.params.plan
        this.props.history.replace('/signup')
    } else {
        Object.assign(this.state,{
            init: true,
            session: {
                valid: false,
                id: Date.now(),
                signature: btoa(navigator.userAgent+'|'+navigator.platform+'|'+navigator.product).replace(/=/g,''),
                card : {
                    valid : false,
                    obj : null
                },
                stripe : null,
                plan : thePlan,
                customer : {
                    account : {
                        email: '',
                        firstname: '',
                        lastname: '',
                        password: ''
                    },
                    shipping : {},
                    billing : {},
                    token: ''
                },
                pricing : {
                    total : thePlan.price,
                    shipping : 0,
                    taxable : thePlan.taxable,
                    tax : {
                        id: '',
                        value: 0
                    },
                    coupon : {
                        id: '',
                        value: ''
                    }
                }
            }
        })
        this.changeStep()
    }
    return null
}

// submitPayment
export function submitPayment() {
    _st.http.post('/signup/pay',dt,cb)
}

// updateInp
export function updateInp({target: el}) {
    this.state.update = false
    this.setState(prev => {
        var params = el.name.split('|'),
            newObj = {[params[0]] : {...prev.session[params[0]]}}

            params.reduce((obj,key,i,arr) => {
                if (i+1 === arr.length) obj[key] = el.value
                else return obj[key]
            },newObj)
        return Object.assign(prev.session,newObj)
    },() => this.state.update = true)
}