const assert = require('assert');
const GameEngine = require("../../src/engine/game_engine");
const RigidBody = require("../../src/engine/rigid_body");
const {Force} = require("../../src/engine/force");
const RigidBodyState = require("../../src/engine/rigid_body_state");

describe('Game Engine', function() {
    it('should increment step', function() {
        let engine = new GameEngine(null)
        assert.equal(engine.step, 0);

        engine.incrementStep();

        assert.equal(engine.step, 1);
    });
    describe('RigidBody', function () {
        const someId = 1;
        const someStep = 1;
        const initialPosition = [0,0];
        const initialVelocity = [0,0];
        const initialState = new RigidBodyState(initialPosition, initialVelocity, 0);

        let engine = new GameEngine(null)
        let body = new RigidBody(1, someId)

        engine.registerBody(body, initialPosition, initialVelocity);

        it('should contain GameObject', function() {
            assert.equal(Object.keys(engine.gameObjectStates).length, 1);
            assert.deepEqual(engine.gameObjectStates[someId], initialState);
        });

        it('should move body', function() {
            const someMagnitude = [1,1]
            body.applyForce(new Force(someMagnitude, someStep))

            assert.deepEqual(engine.updateBody(body), initialState);

            engine.incrementStep();

            let resultState = engine.updateBody(body);
            assert.deepEqual(resultState.p[1], [1,1]);
            assert.deepEqual(resultState.v[1], [1,1]);
        });
    })
});
