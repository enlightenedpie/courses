export default function getSet(param,cb) {
    console.log(this)
    return {
        get [param]() {
            return this._state[param]
        },
        set [param](val) {
            this._state[param] = val
            typeof cb === 'function' && cb()
        }
    }
}