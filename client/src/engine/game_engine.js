module.exports = class GameEngine {
    constructor(gameBoard) {
        this.gameBoard = gameBoard;
        this.gameObjectsPositions = {}
        this.step = 0
    }

    step(){
        this.step = this.step + 1;
    }

    getGameStep(){
        return this.step;
    }

    getPosition(body){

    }
}
