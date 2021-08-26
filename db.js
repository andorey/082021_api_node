const MongoClient = require( 'mongodb' ).MongoClient;
const url = "mongodb://localhost:27017";

const state = {
    db: null
};

module.exports = {

    connect: callback  => {
        MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
            state.db = client.db('myapi');
            return callback( err );
        } );
    },

    get: () => {
        return state.db;
    }
};
