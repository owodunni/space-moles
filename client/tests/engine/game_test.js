const assert = require('assert');
const Game = require("../../src/engine/game");
const {Force} = require("../../src/engine/force");

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

    it('should apply force', function () {
        const someMass = 1;
        const somePosition = [0,0];
        const someVelocity = [0,0];

        game.mpvGenerator = () => { return {m: someMass, p: somePosition, v: someVelocity};};
        let body = game.createBody();
        let pv = game.getKinematics(body);

        assert.deepEqual(body.mass, someMass);
        assert.deepEqual(pv.p, somePosition);
        assert.deepEqual(pv.v, someVelocity);

        game.applyForce(body.id, new Force([1.5, 2], 2))
        let step = game.step();

        game.updateBody(body.id)

        pv = game.getKinematics(body);

        assert.equal(body.forces.length, 1)
        assert.equal(step, 1);
        assert.deepEqual(pv.p, somePosition);
        assert.deepEqual(pv.v, someVelocity);

        game.step();
        step = game.step();
        step = game.step();

        game.updateBody(body.id)

        pv = game.getKinematics(body);

        assert.equal(step, 4);
        assert.deepEqual(pv.p, [1.5*2,2*2]);
        assert.deepEqual(pv.v, [1.5, 2]);
    })
});
