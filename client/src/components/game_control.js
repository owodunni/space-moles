import '../App.css'
import React, {useState} from "react";

export function GameControl(props){
    const {game} = props
    const [bodies, setBodies] = useState([])

    function createBody(){
        game.createBody();
        setBodies(game.getBodies());
    }

    return (
        <div className="GameControl">
            <button onClick={() => createBody()}>
                Create Body
            </button>
            <ul>
                {bodies.map((body) => (
                    <div key={body.id}>
                        <p>{body.id}</p>
                        <p>{body.mass}</p>
                    </div>
                ))}
            </ul>
        </div>)
}