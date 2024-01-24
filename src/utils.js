const { reject, chunk } = require("lodash")

const getRequestData = (req) => {
 // Write logic here to read the request body data
 return new Promise((resolve,reject)=>{
    try{
        let body=""
        req.on('data',(chunk)=>{
            body+=chunk.toString()
        })
        req.on('end',()=>{
            resolve(body)
        })

    }
    catch{
        reject(error)
    }
 })
}

module.exports = getRequestData