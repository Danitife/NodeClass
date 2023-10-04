// const express = require('express')
const cluster = require('cluster')
const os = require('os')
// const app = express()
// const PORT = 1234
const osLength = os.cpus().length
// console.log(os.cpus());

if(cluster.isMaster){
    console.log("Master running on " + process.pid);
    for (let index = 0; index < osLength; index++) {
        cluster.fork();        
    }
}else{
    require('./index')
}
// app.listen(PORT, (req, res)=>{
//     console.log("app running at port"+ PORT);
// })