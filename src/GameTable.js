import React, { Component } from 'react';

class GameTable extends Component {
  render() {
    const { board } = this.props
    console.log(board)

    return (
      <table>
        { board.map(row => <TableRow row={row} />) }
      </table>
    )
  }
}

const TableRow = ({row}) => (
  <tr>
    { row.map(color => <td style={{background: `${color}`}} />) }
  </tr>
)

export default GameTable;