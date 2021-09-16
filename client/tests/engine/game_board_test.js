const GameBoard = require("../../src/engine/game_board");
const assert = require('assert');

describe('GameBoard', function() {
    const board = new GameBoard({width: 10, height:10, speedLimit: 4})
    it('getPosition', function() {
        assert.deepEqual(board.getPosition([9,9]), [9,9]);
        assert.deepEqual(board.getPosition([10,10]), [0,0]);
        assert.deepEqual(board.getPosition([21,21]), [1,1]);
    });

    it('getVelocity', function() {
        assert.deepEqual(board.getVelocity([2,2]), [2,2]);
        assert.deepEqual(board.getVelocity([4,4]), [4/Math.sqrt(2),4/Math.sqrt(2)]);
        assert.deepEqual(board.getVelocity([3,1]), [3,1]);
    });
});
