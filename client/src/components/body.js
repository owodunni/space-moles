export function Body(props){
    const {x, y, id} = props;
    let xP = x + '%'
    let yP = y + '%'
    let color = '#'+Math.floor((id*62323435 +133799)).toString(16);
    color = color.substring(0,4)

    return <span className="dot" style={{top: xP, left: yP, backgroundColor: color}}/>
}
