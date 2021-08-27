const City = require('../models/cities_mod');

module.exports = {
    all: (req, res) => {
        City.all((err, docs) => {
            if (err) throw err;
            res.send(docs)
        })
    },

    findById: (req, res) => {
        City.findById( req.params.id, (err, docs) => {
            if (err) throw err;
            res.send(docs)
        })
    },


}