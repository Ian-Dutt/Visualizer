export function delay(ms){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('done')
        }, ms)
    })
}