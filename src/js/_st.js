import config from './config'
import * as form from './utilities/form'
import Http from './utilities/http'
import plans from './data/static/plans'
//import udata from './utilities/userActions'

const objectifyURLParams = (params = '?void=0') => params.slice(1).split('&').map(p => p.split('=')).reduce((obj, pair) => {
  const [key, value] = pair.map(decodeURIComponent);
  return ({ ...obj, [key]: value })
}, {});

const env = process.env.APP_MODE

// FUNCTION START //

function STTV() {
    this._appStart = Math.floor(Date.now()/1000)
}

STTV.prototype = {
    plans: plans,
    stripe : config[env].stripe.publicKey,
    root : config[env].root,
    api : config[env].api,
    _state : {
        lang: 'EN',
        loading: false,
        bodyClass: 'default'
    },
    get loading() {
        return this._state.loading
    },
    set loading(val) {
        this._state.loading = val
        const loader = document.querySelector('st-app').classList
        return this._state.loading ? loader.replace('active','loading') : loader.replace('loading','active')
    },
    get bodyClass() {
        return this._state.bodyClass
    },
    set bodyClass(val) {
        this._state.bodyClass = document.body.className = val
    },
    get loggedIn() {
        return this._state.loggedIn
    },
    set loggedIn(val) {
        this._state.loggedIn = val
        return this._state.loggedIn
    },
    randKey: () => Math.floor(Math.random()*1000000000000).toString(36),
    objectifyURLParams,
    form,
    http: new Http(config[env].api)
}

export default new STTV