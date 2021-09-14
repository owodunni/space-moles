const assert = require('assert');
const RigidBodyState = require("../../src/engine/rigid_body_state");
const {Force} = require("../../src/engine/force");
describe('RigidBodyState', function() {
    it('should update state', function() {
    const state = new RigidBodyState([0,0], [0,0], 0);
    const someForce = new Force([1,0], 1)

    state.updateState([someForce], 1, 1);

    assert.deepEqual(state.v[1], [1, 0]);
    assert.deepEqual(state.p[1], [1, 0]);
    });
});
