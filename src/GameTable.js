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
                <TableRow key={idx} row={row} players={players.filter(p => p.x === idx)} />
              )
            }
          )}
        </tbody>
      </table>
    )
  }
}

const TableRow = ({row, players}) => {
  const activeColor = {
    "yellow": "lightsalmon",
    "blue": "darkblue",
    "green": "darkgreen",
    "red": "darkred"
  }

  return (
    <tr>
      { row.map((color, idx) => {
          let cellColor = color
          if (players.length > 0 && players.find(p => p.y === idx)) {
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
