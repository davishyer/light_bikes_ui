import React, { Component } from 'react';
import GameTable from './GameTable';
import './App.css';

class Game extends Component {
  render() {
    const { game: { board, id, players } } = this.props
    const contendors = players.map(this.formatPlayerName)

    return (
      <div className="Game" onClick={this.handleClick.bind(this, id)}>
        <GameTable board={board} players={players} />
        <div className="Game-footer">
          <div className="Game-size_label">
            {board.length}<sup>2</sup>
          </div>
          <div className="Game-players">
            {contendors}
          </div>
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
      <span key={color} style={{ color: lightColor[effectiveColor] }}>
        {name}
      </span>
    );
  }

  handleClick(id) {
    if (window.location.hash.substr(1) !== id) {
      window.location.hash = id
    }
  }
}

export default Game;
