import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Main from "./components/main";
import Rest from "./components/rest";

class App extends Component {
  constructor() {
    super();

    this.state = {
      party: [],
      pokemon: []
    };
    this.getParty = this.getParty.bind(this);
  }

  componentDidMount() {
    this.getParty();
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then(response => {
        this.setState({ pokemon: response.data.results });

        console.log(response.data.results);
      })
      .catch(console.error);
  }

  getParty() {
    axios.get("http://localhost:8080/pokemon").then(response => {
      this.setState({ party: response.data });
    });
  }

  removeMember(id) {
    this.getParty();
    axios
      .delete(`http://localhost:8080/pokemon/${id}`)
      .then(() => axios.get("http://localhost:8080/pokemon"))
      .then(response => {
        this.setState({ party: response.data });
      });
  }

  render() {
    console.log(this.state.party);
    return (
      <div className="App">
        <div className="main">
          <Main
            pokemon={this.state.pokemon}
            getParty={this.getParty}
            selectedPoke={this.state.party[0]}
          />
        </div>
        <div className="rest3">
          <Rest
            pokemon={this.state.pokemon}
            getParty={this.getParty}
            selectedPoke={this.state.party[1]}
          />
          <Rest
            pokemon={this.state.pokemon}
            getParty={this.getParty}
            selectedPoke={this.state.party[2]}
          />
          <Rest
            pokemon={this.state.pokemon}
            getParty={this.getParty}
            selectedPoke={this.state.party[3]}
          />
          <Rest
            pokemon={this.state.pokemon}
            getParty={this.getParty}
            selectedPoke={this.state.party[4]}
          />
          <Rest
            pokemon={this.state.pokemon}
            getParty={this.getParty}
            selectedPoke={this.state.party[5]}
          />
          <button className="wipe" onClick={() => this.removeMember()}>
            Remove Member
          </button>
        </div>
      </div>
    );
  }
}

export default App;
