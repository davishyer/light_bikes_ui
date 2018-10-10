import React, { Component } from 'react';
import GameTable from './GameTable';
import './App.css';

class Game extends Component {
  render() {
    const { game: { board, players } } = this.props
    const contendors = players.map(this.formatPlayerName)

    return (
      <div className="Game">
        <GameTable board={board} players={players} />
        <div className="Game-players">
          {contendors}
        </div>
      </div>
    )
  }

  formatPlayerName(player) {
    const { name, color, alive } = player
    const lightColor = {
      "yellow": "yellow",
      "blue": "blue",
      "green": "lightgreen",
      "red": "red",
      "white": "white",
    }
    const effectiveColor = alive ? color : 'white'

    return (
      <span style={{ color: lightColor[effectiveColor] }}>
        {name}
      </span>
    );
  }
}

export default Game;
