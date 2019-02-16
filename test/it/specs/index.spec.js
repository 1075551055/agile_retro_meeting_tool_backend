
const fs = require('fs')
const path = require('path')
const config = require('../../../config')
const testPath = path.join(config.root, 'test/it/specs')
// need to control the db connection to be closed, so include all test in here to execute
fs.readdirSync(testPath)
    .filter(file => ~file.search(/^[\s\S^]*\.spec\.js$/))
    .forEach(file => require(path.join(testPath, file)))
let dbConnection = require('../../../models/db');

describe('all test',function(){
    describe("close db connection",function(){
        it('should close db connection', function(){

        })
        after(function(){
            // dbConnection.on('disconnected',function(){
    
            // })
            // dbConnection.close()
            // use exit to close connection, because if use close method, it will retry connect in disconnected event, pls reference db.js
            process.exit(0)
        })
    })
})