let dbConnection = require('../../../models/db');
const expect = require('chai').expect
describe('db', function(){
    describe('#db connection test', function(){
        it("should return connection when connect db", function(){
            expect(dbConnection).not.to.be.empty
        })
    })
})
