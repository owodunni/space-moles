import {Button, Col, Form, Row} from 'react-bootstrap';
import {GameButtons} from "./game_buttons";
import {BodyTable} from "./BodyTable";
import {useState} from "react";
import {Force} from "../engine/force";

export function GameControl(props){
    const {game, bodies, setBodies} = props

    const [id, setId] = useState("");
    const [magnitude, setMagnitude] = useState("");
    const [time, setTime] = useState("");

    function magnitudeChanged(value){
        setMagnitude(value.target.value)
    }

    function idChanged(value){
        setId(value.target.value)
    }

    function timeChanged(value){
        setTime(value.target.value)
    }

    function queueForce(){
        game.applyForce(parseInt(id), new Force(magnitude.split(',').map(Number), parseInt(time)));
    }

    function update(){
        game.updateBody(parseInt(id));
        setBodies(game.getBodies());
    }

    return (
        <div className="GameControl">
            <GameButtons game={game} setBodies={setBodies}/>
            <br/>
            <BodyTable game={game} bodies={bodies}/>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId="id">
                    <Form.Label column sm="2">
                        Id
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="0" value={id} type="text" onChange={idChanged}/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="magnitude">
                    <Form.Label column sm="2">
                        Magnitude
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="2,3" value={magnitude} type="text" onChange={magnitudeChanged} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3" controlId="time">
                    <Form.Label column sm="2">
                        Time
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control placeholder="34" value={time} type="text" onChange={timeChanged} />
                    </Col>
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={queueForce}>
                Queue Force
            </Button>
            <Button variant="primary" type="submit" onClick={update}>
                Update body
            </Button>
        </div>)
}