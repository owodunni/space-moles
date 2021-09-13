const {unmountComponentAtNode} = require("react-dom");
module.exports = class GameEngine {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.gameObjectsPositions = {}
        this.step = 0
    }

    incrementStep(){
        this.step = this.step + 1;
    }

    registerBody(body, position){
        this.gameObjectsPositions[body.id] = position
    }

    getPosition(body){
        // get all forces
        // remove any forces that are not applied yet
        // sort the remaining forces and apply them in correct order
        let unAppliedForces = body.popForces(this.step);
        unAppliedForces = unAppliedForces.sort((f1, f2)=>{return f1.timeStamp < f2.timeStamp});
    }
}
