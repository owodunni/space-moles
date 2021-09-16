import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {GameBoard} from "./components/game_board";
import {GameControl} from "./components/game_control";

import React, { useState } from 'react';
import Game from "./engine/game";

function App() {

    const [game, setGame] = useState(new Game({worldProps: {height:100, width:100, speedLimit:10 }, maxObjects:10}))
    const [bodies, setBodies] = useState([])

  return (
    <div className="App">
      <header className="App-header">
        <GameBoard game={game} bodies={bodies} />
        <GameControl game={game} bodies={bodies} setBodies={setBodies} />
      </header>
    </div>
  );
}

export default App;
