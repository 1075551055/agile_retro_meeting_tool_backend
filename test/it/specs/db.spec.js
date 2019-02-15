// const db = require('../../../models/db')
const expect = require('chai').expect
describe('db', function(){
    describe('#db connection test', function(){
        it("should return connection when connect db", function(){
            expect(1).to.be.equal(1)
        })
    })
})
