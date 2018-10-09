import React, { Component } from 'react';
import GameTable from './GameTable';
import './App.css';

class Game extends Component {
  render() {
    const { game: { board, players } } = this.props
    const contendors = players.map(p => p.name).join(' vs. ')

    return (
      <div className="Game">
        <GameTable board={board} players={players} />
        <div>
          {contendors}
        </div>
      </div>
    )
  }
}

export default Game;