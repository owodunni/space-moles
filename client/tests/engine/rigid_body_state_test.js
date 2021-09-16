const assert = require('assert');
const RigidBodyState = require("../../src/engine/rigid_body_state");
const {Force} = require("../../src/engine/force");
const GameBoard = require("../../src/engine/game_board");

describe('RigidBodyState', function() {
    it('should update state', function() {
        const gameBoard = new GameBoard({width:10, height:10, speedLimit:10});
        const state = new RigidBodyState([0,0], [0,0], 0, gameBoard);
        const someForce = new Force([1,0], 1)

        state.updateState([someForce], 1, 1);

        assert.deepEqual(state.v, [1, 0]);
        assert.deepEqual(state.p, [1, 0]);
    });
});
