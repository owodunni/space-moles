const RigidBodyState = require("./rigid_body_state");

module.exports = class Engine {
    constructor(world) {
        this.world = world;
        this.gameObjectStates = {}
        this.step = 0
    }

    incrementStep(){
        this.step = this.step + 1;
    }

    registerBody(body, p, v){
        this.gameObjectStates[body.id] = new RigidBodyState(p, v, this.step, this.world);
    }

    updateBody(body){
        // get all forces
        // remove any forces that are not applied yet
        // sort the remaining forces and apply them in correct order
        let unAppliedForces = body.popForces(this.step);
        unAppliedForces = unAppliedForces.sort((f1, f2)=>{return f1.timeStamp < f2.timeStamp});
        let state = this.gameObjectStates[body.id];
        state.updateState(unAppliedForces, body.mass, this.step);
        return state;
    }

    getKinematics(body, timeStamp){
        let state = this.gameObjectStates[body.id];
        return state.getKinematics(timeStamp);
    }
}
