import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './Game';

const serverUrl = 'http://light-bikes.inseng.net';
// const serverUrl = 'http://localhost:8080';

class App extends Component {
  state = {
    games: [],
  }

  componentDidMount() {
    // this.fetchGames()
    setInterval(() => this.fetchGames(), 50)
  }

  render() {
    const { games } = this.state

    return (
      <div className="App">
        <div className="App-header" onClick={this.handleClick}>
          Light Bikes!
        </div>
        <div className="App-games">
          {games.slice(0,12).map(g => <Game game={g} key={g.id} />)}
          {games.length === 0 && "no active games"}
        </div>
      </div>
    );
  }

  fetchGames() {
    axios.get(`${serverUrl}/games/${this.getCurrentGameId()}`).then(res => {
      this.setState({
        games: res.data.games
      })
    })
  }

  getCurrentGameId() {
    return window.location.hash.substr(1)
  }

  handleClick() {
    if (window.location.hash !== "") {
      window.location.hash = ""
    }
  }
}

export default App;
