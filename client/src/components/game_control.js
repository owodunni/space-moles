import '../App.css'
import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row, Table} from 'react-bootstrap';
import {GameButtons} from "./game_buttons";

export function GameControl(props){
    const {game, bodies, setBodies} = props


    function getP(body){
        return JSON.stringify(game.getKinematics(body).p)
    }

    function getV(body){
        return JSON.stringify(game.getKinematics(body).v)
    }

    return (
        <div className="GameControl">
            <GameButtons game={game} setBodies={setBodies}/>
            <br/>
            <Table striped bordered hover size="sm" variant="dark" >
                <thead>
                <tr>
                    <th>#</th>
                    <th>Mass</th>
                    <th>Position</th>
                    <th>Velocity</th>
                </tr>
                </thead>
                <tbody>
                {bodies.map((body) => (
                    <tr>
                        <td>{body.id}</td>
                        <td>{body.mass}</td>
                        <td>{getP(body)}</td>
                        <td>{getV(body)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="id">
                    <Form.Label column sm="2">
                        Id
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="0" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="magnitude">
                    <Form.Label column sm="2">
                        Magnitude
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="[2,3]" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="time">
                    <Form.Label column sm="2">
                        Time
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="34" />
                    </Col>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Queue Force
                </Button>
                <Button variant="primary" type="submit">
                    Update body
                </Button>
            </Form>
        </div>)
}