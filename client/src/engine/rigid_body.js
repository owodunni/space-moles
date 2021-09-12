module.exports = class RigidBody {
    constructor(mass, id) {
        this.mass = mass;
        this.forces = [];
    }

    applyForce(force){
        this.forces.push(force);
    }
}
