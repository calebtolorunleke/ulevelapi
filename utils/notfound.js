const notfound = (req, res) => {
    res.status(404).send('route notfound')
}

module.exports = notfound