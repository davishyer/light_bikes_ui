import React, { Component } from 'react';
import './App.css';

class GameTable extends Component {
  render() {
    const { board, players } = this.props

    return (
      <table className="Game-board">
        <tbody>
          { board.map((row, idx) => {
              return (
                <TableRow key={idx} row={row} player={players.find(p => p.x === idx)} />
              )
            }
          )}
        </tbody>
      </table>
    )
  }
}

const TableRow = ({row, player}) => {
  const activeColor = {
    "yellow": "darkkhaki",
    "blue": "darkblue",
    "green": "darkcyan",
    "red": "darkred"
  }

  return (
    <tr>
      { row.map((color, idx) => {
          let cellColor = color
          if (player && player.y === idx) {
            cellColor = activeColor[color]
          }
          return (
            <td
              className="Game-board-cell"
              key={idx}
              style={{background: `${cellColor}`}}
            />
          )
        }
      )}
    </tr>
  )
}

export default GameTable;