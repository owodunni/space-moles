const {splitForces} = require("./force");

module.exports = class RigidBodyState {
    constructor(p, v, t) {
        this.v = {};
        this.v[t] = v;
        this.p = {};
        this.p[t] = p;
    }

    updateState(forces, mass, t){
        let latestT = Math.max.apply(null, Object.keys(this.v));
        let latestP = this.p[latestT];
        let latestV = this.v[latestT];

        // Remove all forces that have not happened
        const {pastForces, _} = splitForces(forces, t);

        // Remove all forces that have already happened
        let {__, futureForces} = splitForces(pastForces, latestT);

        futureForces.forEach( force => {
            latestV[0] = latestV[0] + force.magnitude[0]/mass;
            latestV[1] = latestV[1] + force.magnitude[1]/mass;
            let deltaT = force.timeStamp - latestT;
            latestP[0] = deltaT * latestV[0];
            latestP[1] = deltaT * latestV[1];
            latestT = force.timeStamp;
        });
        this.p[latestT] = latestP;
        this.v[latestT] = latestV;
    }
}