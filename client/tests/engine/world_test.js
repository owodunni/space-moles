const World = require("../../src/engine/world");
const assert = require('assert');

describe('World', function() {
    const board = new World({width: 10, height:10, speedLimit: 4})
    it('getPosition', function() {
        assert.deepEqual(board.getPosition([9,9]), [9,9]);
        assert.deepEqual(board.getPosition([10,10]), [0,0]);
        assert.deepEqual(board.getPosition([21,21]), [1,1]);
    });

    it('getVelocity', function() {
        assert.deepEqual(board.getVelocity([2,2]), [2,2]);
        assert.deepEqual(board.getVelocity([4,4]), [2.83,2.83]);
        assert.deepEqual(board.getVelocity([3,1]), [3,1]);
    });
});
