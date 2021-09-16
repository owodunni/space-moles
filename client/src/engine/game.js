const Engine = require("./engine");
const World = require("./world");
const RigidBody = require("./rigid_body");

function randInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min
}

module.exports = class Game{
    constructor(props) {
        this.world = new World(props.worldProps);
        this.engine = new Engine(this.world);
        this.maxObjects = props.maxObjects
        this.bodies = Array(this.maxObjects);
        this.numbBoies = 0;
    }

    getBodies(){
        return this.bodies.filter(n => n);
    }

    createBody(){
        if(this.numbBoies === this.maxObjects)
            return null;
        const body = new RigidBody(randInt(1,100), this.lastId);
        this.engine.registerBody(body, [randInt(0,100), randInt(0,100)], [Math.random()*4, Math.random()*4])
        this.bodies[this.numbBoies] = body;
        this.numbBoies++;
        return body;
    }
}