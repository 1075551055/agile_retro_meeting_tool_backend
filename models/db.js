const config = require('../config')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

function connect(){
    let dbConnectionOptions = {poolSize: 5, useNewUrlParser: true, server: {socketOptions: {keepAlive: true}}}
    let connection = mongoose.createConnection(config.db, dbConnectionOptions)
    connection.on('connected', function(){
        // user log api
        console.log('Mongoose connect successfully to open ' + config.db)
    }).on('disconnected', function(){
        console.log('Mongoose default connection disconnected')
        //retry connect
        connect()
    }).on('error', function(){
        console.log('Mongoose default connection error: ' + err)
    })

    process.on('SIGINT', function(){
        connection.close(function(){
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        })
    })

    return connection
}

let conn = connect()

module.exports = conn