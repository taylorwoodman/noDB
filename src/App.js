import React, { Component } from "react";
import "./App.css";
import "./reset.css";
import axios from "axios";
import Main from "./components/main";
import Rest from "./components/rest";
import Stateless from "./components/stateless";

class App extends Component {
  constructor() {
    super();

    this.state = {
      party: [],
      pokemon: [],
    };
    this.getParty = this.getParty.bind(this);
  }

  componentDidMount() {
    this.getParty();
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        this.setState({ pokemon: response.data.results });

        console.log(response.data.results);
      })
      .catch(console.error);
  }

  getParty() {
    axios
      .get("http://localhost:8080/pokemon")
      .then((response) => {
        this.setState({ party: response.data });
      })
      .catch(console.error);
  }

  removeMember(id) {
    this.getParty();
    axios
      .delete(`http://localhost:8080/pokemon/${id}`)
      .then(() => axios.get("http://localhost:8080/pokemon"))
      .then((response) => {
        this.setState({ party: response.data });
      })
      .catch(console.error);
  }

  render() {
    const { pokemon } = this.state;
    const [first, second, third, fourth, fifth, sixth] = this.state.party;
    return (
      <div className="App">
        <div className="main">
          <Main
            pokemon={pokemon}
            getParty={this.getParty}
            selectedPoke={first}
          />
          <Stateless />
        </div>
        <div className="rest3">
          <Rest
            pokemon={pokemon}
            getParty={this.getParty}
            selectedPoke={second}
          />
          <Rest
            pokemon={pokemon}
            getParty={this.getParty}
            selectedPoke={third}
          />
          <Rest
            pokemon={pokemon}
            getParty={this.getParty}
            selectedPoke={fourth}
          />
          <Rest
            pokemon={pokemon}
            getParty={this.getParty}
            selectedPoke={fifth}
          />
          <Rest
            pokemon={pokemon}
            getParty={this.getParty}
            selectedPoke={sixth}
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
