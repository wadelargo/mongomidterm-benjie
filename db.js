const {MongoClient} = require('mongodb');

let dbConnection

module.exports = {
    connectDb: (cbFunc) => {
        MongoClient.connect('mongodb://localhost:27017/inventory')
            .then((client)=> {
                dbConnection = client.db();
                return cbFunc();
            })
            .catch((err)=> {
                console.error(err);
                return cbFunc(err);
            }) 
    },

    getDb: () => dbConnection
}