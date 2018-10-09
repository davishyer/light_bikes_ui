import React, { Component } from 'react';
import GameTable from './GameTable';

class Game extends Component {
  render() {
    const { game: { board, players } } = this.props
    const contendors = players.map(p => p.name).join(' vs. ')

    return (
      <div>
        <GameTable board={board} />
        <div>
          {contendors}
        </div>
      </div>
    )
  }
}

export default Game;