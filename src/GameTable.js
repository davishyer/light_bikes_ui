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
    "yellow": "#9B7C2A",
    "blue": "#4872A7",
    "green": "#217E66",
    "red": "#964D60"
  }
  const trailColor = {
    "yellow": "#FABE08",
    "blue": "#54A9FF",
    "green": "#08C17D",
    "red": "#F26071"
  }

  return (
    <tr>
      { row.map((color, idx) => {
          let cellColor = trailColor[color]
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
