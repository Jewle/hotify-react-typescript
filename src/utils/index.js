function compose(...fns) {
    return (Component)=>{
        return fns.reduceRight((fn,fn1)=>{
            return fn1(fn)
        }, Component)
    }
}

export {
    compose
}
