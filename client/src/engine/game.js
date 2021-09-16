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

    canNotCreateMoreBodies(){
        return this.numbBoies === this.maxObjects
    }

    createBody(){
        if(this.canNotCreateMoreBodies())
            return null;
        const body = new RigidBody(this.numbBoies, randInt(1,100));
        this.engine.registerBody(body, [randInt(0,100), randInt(0,100)], [Math.random()*8-4, Math.random()*8-4])
        this.bodies[this.numbBoies] = body;
        this.numbBoies++;
        return body;
    }

    getPosition(body){
        const {p, v} =this.engine.getKinematics(body, this.engine.step);
        return p;
    }

    step(){
        this.engine.incrementStep();
    }
}