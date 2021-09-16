const assert = require('assert');
const Engine = require("../../src/engine/engine");
const RigidBody = require("../../src/engine/rigid_body");
const {Force} = require("../../src/engine/force");
const RigidBodyState = require("../../src/engine/rigid_body_state");
const GameBoard = require("../../src/engine/world");

const someGameBoard = new GameBoard({width:10, height:10, speedLimit:10});

describe('Engine', function() {
    it('should increment step', function() {
        let engine = new Engine(someGameBoard)
        assert.equal(engine.step, 0);

        engine.incrementStep();

        assert.equal(engine.step, 1);
    });

    describe('RigidBody', function () {
        const someId = 1;
        const someStep = 1;
        const someMagnitude = [1,1]
        const someForce = new Force([...someMagnitude], someStep)
        const initialPosition = [0,0];
        const initialVelocity = [0,0];
        const initialState = new RigidBodyState(initialPosition, initialVelocity, 0, someGameBoard);

        let engine = null;
        let body = null;

        beforeEach(function () {
            engine = new Engine(someGameBoard);
            body = new RigidBody(1, someId);

            engine.registerBody(body, [...initialPosition], [...initialVelocity]);
        });

        it('should contain GameObject', function() {
            assert.equal(Object.keys(engine.gameObjectStates).length, 1);
            assert.deepEqual(engine.gameObjectStates[someId], initialState);
        });

        it('should move body', function() {
            body.applyForce(someForce)

            assert.deepEqual(engine.updateBody(body), initialState);

            engine.incrementStep();

            let resultState = engine.updateBody(body);
            assert.deepEqual(resultState.p, someMagnitude);
            assert.deepEqual(resultState.v, someMagnitude);
        });

        it('should extrapolate position', function (){
            body.applyForce(someForce)
            engine.incrementStep();
            engine.updateBody(body);

             let{p, v} = engine.getKinematics(body, 3);
             assert.deepEqual(p, [3,3]);
             assert.deepEqual(v, someMagnitude)
        });
    })
});
