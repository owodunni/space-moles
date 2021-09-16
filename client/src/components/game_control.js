import '../App.css'
import React, {useState} from "react";
import {Button, Table} from 'react-bootstrap';

export function GameControl(props){
    const {game, bodies, setBodies} = props

    function createBody(){
        game.createBody();
        setBodies(game.getBodies());
    }

    return (
        <div className="GameControl">
            <Button onClick={() => createBody()}>
                Create Body
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