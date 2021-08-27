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

    insert: (req, res) => {
        const city = { name: req.body.name}
        City.insert(city, (err, result) =>{
            if (err) throw err;
            res.send(city)
        })
    },

    update: (req, res) => {
        City.update(req.params.id, req.body.name, (err, result) => {
            if (err) throw err;
            res.sendStatus(200)
        })
    },

    delete: (req, res) => {
        City.delete(req.params.id, (err, result) => {
            if (err) throw arr;
            res.sendStatus(200)
        })
    }

}