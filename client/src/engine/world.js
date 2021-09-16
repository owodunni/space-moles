function mod(n, m) {
    return ((n % m) + m) % m;
}

module.exports = class World{
    constructor(props) {
        this.width = props.width;
        this.height = props.height;
        this.speedLimit = props.speedLimit;
    }

    getPosition(p){
        return [mod(p[0], this.width), mod(p[1], this.height)]
    }

    getVelocity(v){
        const absV = Math.sqrt(v[0]*v[0]+v[1]*v[1]);
        if (absV < this.speedLimit){
            return v;
        }

        const speedRedux = this.speedLimit/absV;

        return [v[0]*speedRedux, v[1]*speedRedux]
    }
}