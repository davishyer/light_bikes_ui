import React, { Component } from 'react';
import GameTable from './GameTable';
import './App.css';

class Game extends Component {
  render() {
    const { game: { board, id, players } } = this.props
    const contendors = players.map(this.formatPlayerName)

    return (
      <div className="Game" onClick={this.handleClick.bind(this, id)}>
        <div className="Game-header">
          <div className="Game-size_label">
            {board.length}<sup>2</sup>
          </div>
          <div className="Game-players">
            {contendors}
          </div>
        </div>
        <GameTable board={board} players={players} />
      </div>
    )
  }

  formatPlayerName(player) {
    const { name, color, alive } = player
    const lightColor = {
      "yellow": "#FABE08",
      "blue": "#54A9FF",
      "green": "#08C17D",
      "red": "#F26071",
      "white": "#BAC1CC",
    }
    const effectiveColor = alive ? color : 'white'

    return (
      <span key={color} style={{ color: lightColor[effectiveColor] }}>
        {name}
      </span>
    );
  }

  handleClick(id) {
    if (id && window.location.hash.substr(1) !== id) {
      window.location.hash = id
    }
  }
}

export default Game;
