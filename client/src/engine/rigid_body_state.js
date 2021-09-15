const {splitForces} = require("./force");

function calculatePosition(p, v, deltaT){
    return [p[0] + deltaT * v[0], p[1] + deltaT * v[1]];
}

module.exports = class RigidBodyState {
    constructor(p, v, t) {
        this.v = {};
        this.v[t] = v;
        this.p = {};
        this.p[t] = p;
    }

    getLatestKinematics(){
        let latestT = Math.max.apply(null, Object.keys(this.v));
        let latestP = this.p[latestT];
        let latestV = this.v[latestT]
        return {latestT, latestP, latestV}
    }

    updateState(forces, mass, t){
        let {latestT, latestP, latestV} = this.getLatestKinematics();

        // Remove all forces that have not happened
        const {pastForces, _} = splitForces(forces, t);

        // Remove all forces that have already happened
        let {__, futureForces} = splitForces(pastForces, latestT);

        futureForces.forEach( force => {
            latestV[0] = latestV[0] + force.magnitude[0]/mass;
            latestV[1] = latestV[1] + force.magnitude[1]/mass;
            let deltaT = force.timeStamp - latestT;
            latestP = calculatePosition(latestP, latestV, deltaT)
            latestT = force.timeStamp;
        });
        this.p[latestT] = latestP;
        this.v[latestT] = latestV;
    }

    getKinematics(t){
        let {latestT, latestP, latestV} = this.getLatestKinematics();
        let p = calculatePosition(latestP, latestV, t - latestT);
        let v = latestV
        return {p, v};
    }
}