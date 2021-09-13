const assert = require('assert');
const GameEngine = require("../../src/engine/game_engine");
const RigidBody = require("../../src/engine/rigid_body");
const Force = require("../../src/engine/force");

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

        let engine = new GameEngine(null)
        let body = new RigidBody(1, someId)

        engine.registerBody(body, initialPosition);

        it('should contain GameObject', function() {
            assert.equal(Object.keys(engine.gameObjectsPositions).length, 1);
            assert.equal(engine.gameObjectsPositions[someId], initialPosition);
        });

        it('should move body', function() {
            const someMagnitude = [1,1]
            body.applyForce(new Force(someMagnitude, someStep))

            assert.equal(engine.getPosition(body), initialPosition);

            engine.incrementStep();

            assert.equal(engine.getPosition(body), initialPosition + someMagnitude);
        });
    })
});
