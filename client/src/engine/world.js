function round(v){
    return Math.round(v*100)/(100)
}

function mod(n, m) {
    return round(((n % m) + m) % m);
}

function roundV(v){
    return[round(v[0]), round(v[1])];
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
            return roundV(v)
        }

        const speedRedux = this.speedLimit/absV;

        return roundV([v[0]*speedRedux, v[1]*speedRedux])
    }
}