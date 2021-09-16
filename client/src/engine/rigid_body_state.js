const {splitForces} = require("./force");

function calculatePosition(p, v, deltaT){
    return [p[0] + deltaT * v[0], p[1] + deltaT * v[1]];
}

module.exports = class RigidBodyState {
    constructor(p, v, t, world) {
        this.v = v
        this.p = p;
        this.t = t;
        this.world = world;
    }

    updateState(forces, mass, t){

        // Remove all forces that have not happened
        const {pastForces, _} = splitForces(forces, t);

        // Remove all forces that have already happened
        let {__, futureForces} = splitForces(pastForces, this.t);

        futureForces.forEach( force => {
            this.v = this.world.getVelocity([
                this.v[0] + force.magnitude[0]/mass,
                this.v[1] + force.magnitude[1]/mass]);
            let deltaT = force.timeStamp - this.t;
            this.p = this.world.getPosition(calculatePosition(this.p, this.v, deltaT));
            this.t = force.timeStamp;
        });
    }

    getKinematics(t){
        let p = calculatePosition(this.p, this.v, t - this.t);
        let v = this.v
        return {p, v};
    }
}