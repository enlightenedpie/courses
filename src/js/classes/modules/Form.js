export default class Form {
    constructor(obj = {}) {
        this.state = obj
    }

    overlay() {
        return typeof document.querySelector('.stOverlay').classList.toggle('active') === 'boolean'
    }

    prepare(el) {
        return this.setState([{
            name: el.name,
            value: el.value
        }])
    }

    clearError() {
        return !(document.querySelector('#stFormErrors').innerHTML = '')
    }

    printError(msg) {
        return !!(document.querySelector('#stFormErrors').innerHTML = msg)
    }

    setIndex(itm,ind,val) {
		var nInd = ind[0]
		if (typeof ind == 'string')
			return this.setIndex(itm,ind.split('-'), val)
		else if (ind.length==1 && typeof val !== 'undefined') {
			return itm[nInd] =  val
		} else if (ind.length==0)
			return itm;
		else
			if (typeof itm[nInd] === 'undefined') itm[nInd] = {}
			return this.setIndex(itm[nInd],ind.slice(1), val)
    }
    
    setState(arr) {
        if (typeof arr === 'undefined') return false
        if (!Array.isArray(arr)) arr = [arr]
        for (let a = 0; a < arr.length; a++) {
            let v = arr[a].name.split('|')
            for (let i = 0; i < v.length; i++) {
                this.setIndex(this.state,v[i].replace('st-','').split('-'),arr[a].value)
            }
        }
		return true
    }
    
    get(rt,cb) {
        _st.request({
            route : rt,
            success : (d) => {
                typeof cb === 'function' && cb(d)
            },
            error : (x) => {
                console.log(x)
            }
        })
    }

    post(rt,dt,cb) {return this.send('POST',rt,dt,cb)}
    patch(rt,dt,cb) {return this.send('PATCH',rt,dt,cb)}
    put(rt,dt,cb) {return this.send('PUT',rt,dt,cb)}
    delete(rt,dt,cb) {return this.send('DELETE',rt,dt,cb)}

    send(mth,rt,dt,cb) {
        _st.request({
            route : rt,
            method : mth,
            cdata : dt,
            success : (d) => {
                typeof cb === 'function' && cb(d)
            },
            error : (x) => {
                console.log(x)
            }
        })
    }
}