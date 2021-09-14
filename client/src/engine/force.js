
function splitForces(forces, timeStamp){
    let pastForces = forces.filter(force => force.timeStamp <= timeStamp);
    let futureForces = forces.filter(force => force.timeStamp > timeStamp);
    return {pastForces, futureForces};
}

class Force {
    constructor(magnitude, timeStamp) {
        this.magnitude = magnitude;
        this.timeStamp = timeStamp;
    }
};

module.exports = {Force, splitForces};