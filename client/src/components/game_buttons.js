import {Button} from "react-bootstrap";
import React, {useEffect, useState} from "react";

export function GameButtons(props){
    const {game, setBodies} = props
    const [isStarted, setIsStarted] = useState(false)
    const [canNotCreateMoreBodies, setCanNotCreateMoreBodies] = useState(false);
    const [stepValue, setStep] = useState(0);

    function createBody(){
        game.createBody();
        setBodies(game.getBodies());
        setCanNotCreateMoreBodies(game.canNotCreateMoreBodies())
    }

    function step(){
        setStep(game.step());
        setBodies(game.getBodies())
    }

    useEffect(() => {
        let interval = null;
        if(isStarted){
            interval = setInterval(() => {
                step();
            }, 100);
        }else if(interval != null){
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isStarted]);

    function start(){
        setIsStarted(true);
    }

    function stop(){
        setIsStarted(false);
    }

    return (<div>
                <Button disabled={canNotCreateMoreBodies} onClick={() => createBody()}>
                    Create Body
                </Button>
                <Button disabled={isStarted} onClick={() => start()}>
                    Start
                </Button>
                <Button disabled={!isStarted} onClick={() => stop()}>
                    Stop
                </Button>
                <br/>
                <label>
                    TimeStamp: {stepValue}
                </label>
            </div>)
}
