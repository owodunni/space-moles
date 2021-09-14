const assert = require('assert');
const {Force} = require("../../src/engine/force");
describe('Force', function() {
    describe('#ctr()', function() {
        it('should create a force', function() {
            let someMagnitude = [1,2]
            let force = new Force(someMagnitude, Date.now());
            assert.equal(force.magnitude, someMagnitude);
        });
    });
});
