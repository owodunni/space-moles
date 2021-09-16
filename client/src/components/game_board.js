import {Body} from "./body";

export function GameBoard(props){
    const {game, bodies} = props

    function getPos(body){
        return game.getKinematics(body).p;
    }

    return (
        <div className="GameBoard">
            {bodies.map((body) => (
                <Body x={getPos(body)[0]} y={getPos(body)[1]} id={body.id}/>
            ))}
        </div>)
}