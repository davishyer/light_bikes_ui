import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './Game';
import BikeIcon from './BikeIcon'

const fetchInterval = 100
const serverUrl = 'http://light-bikes.inseng.net'
// const serverUrl = 'http://localhost:8080'

class App extends Component {
  state = {
    games: [],
    onDeadGame: false
  }

  componentDidMount() {
    this.triggerFetch()
  }

  render() {
    const { games } = this.state

    return (
      <div className="App">
        <div className="App-header" onClick={this.handleClick.bind(this)}>
          <h1 className="App-header-title">Light Bikes /</h1>
          <BikeIcon />
        </div>
        <div className="App-games">
          {games.slice(0,12).map(g => <Game game={g} key={g.id} />)}
          {games.length === 0 && this.renderEmptyGame()}
        </div>
      </div>
    );
  }

  renderEmptyGame() {
    const emptyGame = {
      board: [
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, "yellow", null, null, null, "yellow", null, "yellow", "yellow", "yellow", "yellow", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, "yellow", "yellow", null, null, "yellow", null, "yellow", null, null, "yellow", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, "yellow", null, "yellow", null, "yellow", null, "yellow", null, null, "yellow", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, "yellow", null, null, "yellow", "yellow", null, "yellow", null, null, "yellow", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, "yellow", null, null, null, "yellow", null, "yellow", "yellow", "yellow", "yellow", null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, "yellow", "yellow", "yellow", "yellow", null, null, "yellow", "yellow", null, null, "yellow", null, null, null, "yellow", null, "yellow", "yellow", "yellow", null, "yellow", "yellow", "yellow", "yellow", null],
        [null, "yellow", null, null, null, null, "yellow", null, null, "yellow", null, "yellow", "yellow", null, "yellow", "yellow", null, "yellow", null, null, null, "yellow", null, null, null, null],
        [null, "yellow", null, null, null, null, "yellow", null, null, "yellow", null, "yellow", null, "yellow", null, "yellow", null, "yellow", "yellow", null, null, "yellow", "yellow", "yellow", "yellow", null],
        [null, "yellow", null, "yellow", "yellow", null, "yellow", "yellow", "yellow", "yellow", null, "yellow", null, null, null, "yellow", null, "yellow", null, null, null, null, null, null, "yellow", null],
        [null, "yellow", null, null, "yellow", null, "yellow", null, null, "yellow", null, "yellow", null, null, null, "yellow", null, "yellow", null, null, null, null, null, null, "yellow", null],
        [null, "yellow", "yellow", "yellow", "yellow", null, "yellow", null, null, "yellow", null, "yellow", null, null, null, "yellow", null, "yellow", "yellow", "yellow", null, "yellow", "yellow", "yellow", "yellow", null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
      ],
      players: [{ name: `Start a game at ${serverUrl}`, color: 'yellow', alive: true }]
    }
    return (
      <Game game={emptyGame} />
    )
  }

  triggerFetch() {
    const { onDeadGame } = this.state
    if (!onDeadGame) {
      setTimeout(() => this.fetchGames(), fetchInterval)
    }
  }

  fetchGames() {
    axios.get(`${serverUrl}/games/${this.getCurrentGameId()}`).then(res => {
      this.setState({
        games: res.data.games
      })
      this.triggerFetch()
    }).catch(e => {
      // if the game isn't found, no need to continue polling for it
      if (e.response && e.response.status === 404) {
        this.setState({
          onDeadGame: true
        })
      }
      this.triggerFetch()
    })
  }

  getCurrentGameId() {
    return window.location.hash.substr(1)
  }

  handleClick() {
    if (window.location.hash !== "") {
      window.location.hash = ""

      // reset dead game tracking when navigating home
      this.setState({
        onDeadGame: false
      }, this.triggerFetch)
    }
  }
}

export default App;
