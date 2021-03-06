const {splitForces} = require("./force");

function calculatePosition(p, v, deltaT){
    return [p[0] + deltaT * v[0], p[1] + deltaT * v[1]];
}

module.exports = class RigidBodyState {
    constructor(p, v, t, world) {
        this.v = world.getVelocity(v);
        this.p = world.getPosition(p);
        this.t = t;
        this.world = world;
    }

    updateState(forces, mass, now){

        // Remove all forces that have not happened
        const {pastForces, _} = splitForces(forces, now);

        // Remove all forces that have already happened
        let {__, futureForces} = splitForces(pastForces, this.t);

        futureForces.forEach( force => {
            let deltaT = force.timeStamp - this.t;
            //Calculate position of the time of the forces impact
            this.p = this.world.getPosition(calculatePosition(this.p, this.v, deltaT))
            this.v = this.world.getVelocity([
                this.v[0] + force.magnitude[0]/mass,
                this.v[1] + force.magnitude[1]/mass]);
            this.t = force.timeStamp;
        });
        const {p, v} = this.getKinematics(now);
        this.p = p;
        this.v = v;
        this.t = now;
    }

    getKinematics(t){
        let p = this.world.getPosition(calculatePosition(this.p, this.v, t - this.t));
        return {p: p, v: this.v};
    }
}