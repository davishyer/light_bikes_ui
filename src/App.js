import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './Game';

class App extends Component {
  state = {
    games: [],
  }

  componentDidMount() {
    setInterval(() => this.fetchGames(), 50)
  }

  render() {
    const { games } = this.state

    return (
      <div className="App">
        <div className="App-header">
          Light Bikes!
        </div>
        <div className="App-games">
          {games.map(g => <Game game={g} key={g.id} />)}
        </div>
      </div>
    );
  }

  fetchGames() {
    axios.get('http://localhost:8080/games').then(res => {
      this.setState({
        games: res.data.games
      })
    })
  }
}

export default App;
