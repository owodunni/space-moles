const assert = require('assert');
const Force = require("../../src/engine/force");
const Rigid_body_test = require("../../src/engine/rigid_body");
describe('RigidBody', function() {
    describe('#ctr()', function() {
        it('should create a RigidBody', function() {
            let body = new Rigid_body_test(10);
            assert.equal(body.mass, 10);
            assert.equal(body.forces.length, 0);

            body.applyForce(new Force([1,2], Date.now()));
            assert.equal(body.forces.length, 1);
        });
    });
});
