const db = require('../db');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    all: (callback) => {
        db.get().collection('cities').find().toArray((err, docs) => {
            callback(err, docs)
        })
    },

    findById: (id, callback) => {
        db.get().collection('cities').findOne({ _id: ObjectId(id)}, (err, docs) => {
            callback(err, docs)
        })
    },

    insert: (city, callback) => {
        db.get().collection('cities').insertOne(city, (err, result) => {
            callback(err, result)
        })
    },

    update: (id, newData, callback) => {
        db.get().collection('cities').updateOne(
            { _id: ObjectId(id) },
            { $set: {name: newData} },
            (err, result) => {
                callback(err, result)
            }
        )
    },

    delete: (id, callback) => {
        db.get().collection('cities').deleteOne( { _id: ObjectId(id)}, (err, result) => {
            callback(err, result)
        })
    }

}