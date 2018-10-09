import React, { Component } from 'react';
import GameTable from './GameTable';
import './App.css';

class Game extends Component {
  render() {
    const { game: { board, players, winner } } = this.props
    const contendors = players.map(
      this.formatPlayerName.bind(this, winner)
    )

    return (
      <div className="Game">
        <GameTable board={board} players={players} />
        <div className="Game-players">
          {contendors}
        </div>
      </div>
    )
  }

  formatPlayerName(winnerColor, player) {
    const { name, color } = player
    const lightColor = {
      "yellow": "yellow",
      "blue": "blue",
      "green": "lightgreen",
      "red": "red"
    }

    return winnerColor === color ?
      (
        <span style={{ color: lightColor[color] }}>
          {name}
        </span>
      ) :
      (<span>{name}</span>)
  }
}

export default Game;
