import '../App.css'
import React, {useEffect, useState} from "react";
import {Button, Table} from 'react-bootstrap';

export function GameControl(props){
    const {game, bodies, setBodies} = props

    const [isStarted, setIsStarted] = useState(false)
    const [canNotCreateMoreBodies, setCanNotCreateMoreBodies] = useState(false);

    function createBody(){
        game.createBody();
        setBodies(game.getBodies());
        setCanNotCreateMoreBodies(game.canNotCreateMoreBodies())
    }

    function step(){
        game.step();
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

    return (
        <div className="GameControl">
            <Button disabled={canNotCreateMoreBodies} onClick={() => createBody()}>
                Create Body
            </Button>
            <Button disabled={isStarted} onClick={() => start()}>
                Start
            </Button>
            <Button disabled={!isStarted} onClick={() => stop()}>
                Stop
            </Button>
            <ul>
            </ul>
            <Table striped bordered hover size="sm" variant="dark" >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Mass</th>
                </tr>
                </thead>
                <tbody>
                {bodies.map((body) => (
                    <tr>
                        <td>{body.id}</td>
                        <td>{body.mass}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>)
}