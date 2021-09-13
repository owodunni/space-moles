module.exports = class RigidBody {
    constructor(mass, id) {
        this.id = id;
        this.mass = mass;
        this.forces = [];
    }

    applyForce(force){
        this.forces.push(force);
    }

    popForces(timeStamp){
        let pastForces = this.forces.filter(force => force.timeStamp <= timeStamp);
        this.forces = this.forces.filter(force => force.timeStamp > timeStamp);
        return pastForces;
    }
}
