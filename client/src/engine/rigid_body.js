const {splitForces} = require("./force");

module.exports = class RigidBody {
    constructor(id, mass) {
        this.id = id;
        this.mass = mass;
        this.forces = [];
    }

    applyForce(force){
        this.forces.push(force);
    }

    popForces(timeStamp){
        let {pastForces, futureForces} = splitForces(this.forces, timeStamp);
        this.forces = futureForces;
        return pastForces;
    }
}
