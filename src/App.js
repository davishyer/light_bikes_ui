import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Game from './Game';

class App extends Component {
  state = {
    games: [],
  }

  componentDidMount() {
    setInterval(() => this.fetchGames(), 5000)
  }

  render() {
    const { games } = this.state

    return (
      <div className="App">
        <header className="App-header">
          {games.map(g => <Game game={g} key={g.id} />)}
        </header>
      </div>
    );
  }

  fetchGames() {
    axios.get('http://localhost:8080/games').then(res => {
      console.log(res.data.games)
      this.setState({
        games: res.data.games
      })
    })
  }
}

export default App;
