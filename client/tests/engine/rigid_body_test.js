const assert = require('assert');
const Force = require("../../src/engine/force");
const RigidBody = require("../../src/engine/rigid_body");
describe('RigidBody', function() {
    it('should create a RigidBody', function() {
        let body = new RigidBody(10);
        assert.equal(body.mass, 10);
        assert.equal(body.forces.length, 0);

        body.applyForce(new Force([1,2], 0));
        assert.equal(body.forces.length, 1);
    });

    it('should create a RigidBody', function() {
        let body = new RigidBody(10);

        body.applyForce(new Force([1,2], 0));
        body.applyForce(new Force([1,2], 1));
        body.applyForce(new Force([1,2], 2));
        assert.equal(body.forces.length, 3);

        let forces = body.popForces(1);

        assert.equal(body.forces.length, 1);
        assert.equal(forces.length, 2);
    });
});
