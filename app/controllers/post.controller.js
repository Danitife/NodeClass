function index(req, res){
    console.log(req.headers);
    res.status(200).json({"route": "POST"})
}

module.exports = {
    index
}