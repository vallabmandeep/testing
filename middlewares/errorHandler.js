module.exports.notFound = (req, res, next)=>{
    res.status(404).send('page not found');
}

module.exports.handleError = (err, req, res, next) => {
    console.log(err);
    res.status(500).send("something went wrong");
}