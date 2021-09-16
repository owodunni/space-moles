const assert = require('assert');
const Game = require("../../src/engine/game");

describe('Game', function() {
    it('should create bodies', function() {
        let game = new Game({worldProps: {width:10, height:10, speedLimit:4}, maxObjects:2});

        assert.equal(game.getBodies().length, 0);
        assert.notEqual(game.createBody(), null);
        assert.equal(game.getBodies().length, 1);
        assert.notEqual(game.createBody(), null);
        assert.equal(game.getBodies().length, 2);
        assert.equal(game.createBody(), null);
    });
});
