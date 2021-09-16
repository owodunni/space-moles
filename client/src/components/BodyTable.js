import {Table} from "react-bootstrap";

export function BodyTable(props){
    const {game, bodies} = props

    function getP(body){
        return JSON.stringify(game.getKinematics(body).p)
    }

    function getV(body){
        return JSON.stringify(game.getKinematics(body).v)
    }

    return (
        <div>
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
                    <tr key={body.id}>
                        <td>{body.id}</td>
                        <td>{body.mass}</td>
                        <td>{getP(body)}</td>
                        <td>{getV(body)}</td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>)
}
