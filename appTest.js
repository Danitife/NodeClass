const express = require('express')
const { formidable } = require('formidable')
const fs = require('fs')
const util = require('util')
const app = express()
const PORT = 3300

app.get("/math", (req, res)=>{
    return res.sendFile(__dirname + '/views/index.html')
})

app.get("/readFiles", async (req, res)=>{

    //CHECK IF FILE EXIST
    if(!fs.existsSync("text.txt")){
        res.send("file no dey oo")
        throw "File does not exist"
    }
    try{
        const readFile = util.promisify(fs.readFile)
        const data = await readFile('text.txt', {encoding: 'utf-8'});
        console.log(data);
    }catch(error){
        res.send("Error occured")
        throw error
    }
    // fs.readFile("./text.txt", {encoding: 'utf8'}, (err, data)=>{
    //     if(err) throw err
    //     console.log(data);
    // })
    res.send("working")
})

app.get("/writeFiles", (req, res)=>{
    const content = `If Bitcoin breaks and confirms above 65K and we get a real bull run, then I’ve outlined a Game Plan for the next few months. It isn’t so easy as buying quality alts and waiting. According to
                previous bull runs, the proper way to maximize profits is outlined in the Game Plan.`
    fs.writeFile("sample.txt", content, {encoding: 'utf8', flag: "a+"}, (err)=>{
        if (err) throw err
        console.log("Data Saved");
        res.send("working")
    })
})

app.get("/copyFiles", async (req, res)=>{
    if(!fs.existsSync("text.txt")){
        res.send("File unavailable")
        throw "File unavailable"
    }
    try {
        const readFile = util.promisify(fs.readFile);
        const data = await readFile("text.txt", {encoding: 'utf-8'})
        console.log(data);
        const writeFile = util.promisify(fs.writeFile)
        await writeFile("sample.txt", data, {encoding: 'utf-8', flag: "a+"})
        
        console.log(writeFile);
    } catch (error) {
        res.send("Error occured")
        throw error
    }

    res.send("Data Copied")
})

app.post('/upload', (req, res)=>{
    //PARSE THE MULTIPART/FORMDATA
    let form = new formidable.IncomingForm();
    form.parse(req, async function(err, fields, files){
        const oldPath = files.file.path;
        const file_name = await `${Date.now()}_${String(files.file.name).replace(" ", "_")}`;
        const newPath = `${path.join(__dirname, 'videos')}/${file_name}`

        //READ THE RIGHT STREAM
        const writeable = await fs.createWriteStream(newPath)
        const readable = await fs.createReadStream(oldPath).pipe(writeable)
    })
})

app.listen(PORT, (req, res)=>{
    console.log(`app created at port ${PORT}`);
})