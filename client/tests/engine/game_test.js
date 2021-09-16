const assert = require('assert');
const Game = require("../../src/engine/game");

describe('Game', function() {
    let game = null;

    beforeEach(function (){
        game = new Game({worldProps: {width:10, height:10, speedLimit:4}, maxObjects:2});
    })

    it('should create bodies', function() {
        assert.equal(game.getBodies().length, 0);
        assert.notEqual(game.createBody(), null);
        assert.equal(game.getBodies().length, 1);
        assert.notEqual(game.createBody(), null);
        assert.equal(game.getBodies().length, 2);
        assert.equal(game.createBody(), null);
    });

    it('should give p and v', function (){
        let body = game.createBody();
        assert.ok(game.getKinematics(body).p);
        assert.ok(game.getKinematics(body).v);
    })
});
