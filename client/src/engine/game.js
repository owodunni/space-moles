const Engine = require("./engine");
const World = require("./world");
const RigidBody = require("./rigid_body");

function randInt(min,max){
    return Math.floor(Math.random()*(max-min)) + min
}

function statsGenerator(){
    return {m: randInt(0,100), p: [randInt(0,100), randInt(0,100)], v: [Math.random()*8-4, Math.random()*8-4]};
}

module.exports = class Game{
    constructor(props) {
        this.world = new World(props.worldProps);
        this.engine = new Engine(this.world);
        this.maxObjects = props.maxObjects
        this.bodies = Array(this.maxObjects);
        this.numbBoies = 0;
        if(props.mpvGenerator === undefined){
            this.mpvGenerator = statsGenerator;
        }else{
            this.mpvGenerator = props.mpvGenerator;
        }
    }

    getBodies(){
        return this.bodies.filter(n => n);
    }

    containsBody(id, success){
        if(this.bodies[id] === undefined)
        {
            console.error("No body with id: " + id);
            return;
        }
        success(this.bodies[id])
    }

    applyForce(id, force){
        this.containsBody(id, (body) => {body.applyForce(force)});
    }

    updateBody(id){
        this.containsBody(id, (body) => {this.engine.updateBody(body)});
    }

    canNotCreateMoreBodies(){
        return this.numbBoies === this.maxObjects
    }

    createBody(){
        if(this.canNotCreateMoreBodies())
            return null;
        const mpv = this.mpvGenerator();
        const body = new RigidBody(this.numbBoies, mpv.m);
        this.engine.registerBody(body, mpv.p, mpv.v);
        this.bodies[this.numbBoies] = body;
        this.numbBoies++;
        return body;
    }

    getKinematics(body){
        return this.engine.getKinematics(body, this.engine.step);
    }

    step(){
        this.engine.incrementStep();
        return this.engine.step;
    }
}