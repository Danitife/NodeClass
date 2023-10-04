const express = require('express')
const cors = require('cors')
const PORT = 4400
const crypto = require('crypto')
const app = express()

app.use(cors())

// app.post("/crypto", async (req, res)=>{
//     let pin = []
//     for (let index = 0; index < 21; index++) {
//         let pinned = Math.random() * 20
//         pinned = Math.floor(pinned)

//         if(pin.includes(pinned) == false){
//             pin.push(pinned)
//         }
//     }
// })

app.post("/crypto", async (req, res)=>{
    let random = []
    for (let index = 0; index < 1000; index++) {
        let randommed = crypto.randomBytes(2).toString("hex") + "-"
                        + crypto.randomBytes(2).toString("hex")+ "-"
                        +crypto.randomBytes(2).toString("hex")
        // randommed = Math.floor(randommed)
        random.push(randommed)
    }

    res.status(200).json(random)
})

// app.post("/crypto", async (req, res)=>{
//     let nn = "Daniel Coder"
//     let coder = nn.replace(" ", "_")+ "_" + crypto.randomBytes(2).toString('hex')
//     res.status(200).json(coder)
// })

// app.post("/crypto", async (req, res)=>{
//     let names = ["Daniel", "Daniel", "Daniel", "Daniel"]
//     let username = []
//     for (let index = 0; index < names.length; index++) {
//         // let named = crypto.randomBytes(3).toString('hex')
//         let named = names[index] + crypto.randomBytes(2).toString('hex')
//         username.push(named)
//     }
//     res.status(200).json(username)
// })

app.listen(PORT, (req, res)=>{
    console.log(`Created on port ${PORT}`);
})