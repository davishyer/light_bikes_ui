import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './Game';

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
    axios.get(`http://localhost:8080/games/${window.location.hash.substr(1)}`).then(res => {
      this.setState({
        games: res.data.games
      })
    })
  }

  handleClick() {
    if (window.location.hash !== "") {
      window.location.hash = ""
    }
  }
}

export default App;
