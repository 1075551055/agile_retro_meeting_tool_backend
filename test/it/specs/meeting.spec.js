const Meeting = require('../../../models/meeting')
const uuid = require('uuid/v1')
const expect = require('chai').expect

describe("meeting model test",function(){
    describe("meeting model creation test", function(){
        it("should create meeting successfully", function(done){
            // need to set timeout because saveOrUpdate is an async method, and its testing time > 2000ms
            // it will popup error, so must set timeout > 2000ms. Can also set to package.json --timeout
            // this.timeout(10000)
            let meeting  = new Meeting({
                meetingName: 'test meeting name'
            })
            meeting.saveOrUpdate().then(function(){
                expect(meeting.isNew).not.to.be.ok
                done()
            })
        })

        it("should load nothing when meetingId does not exist", async function(){
            let _id = '41224d776a326fb40f000001'
            if(Meeting.validateObjectId(_id)){
                let meeting = await Meeting.load(_id)
                expect(meeting).to.be.equal(null)
            }else{
                expect(Meeting.validateObjectId(_id)).to.not.be.ok
            }
        })
    })
})