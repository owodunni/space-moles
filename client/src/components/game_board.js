import '../App.css'
import {Body} from "./body";

export function GameBoard(props){
    const {game, bodies, setBodies} = props

    function getPos(body){
        return game.getPosition(body)
    }

    return (
        <div className="GameBoard">
            {bodies.map((body) => (
                <Body x={getPos(body)[0]} y={getPos(body)[1]} id={body.id}/>
            ))}
        </div>)
}