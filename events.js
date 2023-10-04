const express = require('express')
const events = require('events')
const nodemailer = require('nodemailer')
const PORT = 1110
const app = express()

const emmiter = new events.EventEmitter()

const mailer = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "78d58d3c06f79d",
        pass: "9587295d69b772"
    }
})

// SUSCRIBERS || EVENT LISTENERS
emmiter.on("sendmail", async (data)=>{
    try{
        const response = await mailer.sendMail({
            subject: "Daniel sends a mail",
            from: "daniel@gmail.com",
            to: data.email,
            text: "Testing the mail",
            html: "<h1>Testin nodemailer</h1>"
        })
        console.log(response);
    }catch(err){
        console.log(err);
    }
    console.log("emitter working");
})

app.get("withemit", (req, res)=>{
    let user = "dantif@gmail.com"
    emmiter.emit("sendmail", {email: user})
    res.send("email registered for sending")
})

app.get("/noemit", async (req, res)=>{
    try{
        const response = await mailer.sendMail({
            subject: "Daniel testing mail",
            from: "daniel@gmail.com",
            to: "daniel@gmail.com",
            text: "Testing the mail",
            html: "<h1>Testin nodemailer</h1>"
        })
        console.log(response);
    }catch(err){
        console.log(err);
        res.send("email not sent")
    }
})

emmiter.on("tolu", ()=>{
    setTimeout(()=>{
        console.log("TOLU");
    }, 5000)
})

emmiter.on("daniel", ()=>{
    console.log("Daniel");
})

app.get("/tolu", async (req, res)=>{
    emmiter.emit('tolu')
    emmiter.emit('daniel')
    res.send("event triggered")
})

app.listen(PORT, (req, res)=>{
    console.log("App listening at PORT "+ PORT);
})