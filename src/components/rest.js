import React, { Component } from "react";
import "./rest.css";
import axios from "axios";
import pokeball from "./pokeball.png";

class Rest extends Component {
  constructor() {
    super();
    this.state = {
      level: 70
    };
    this.pokeImage = this.pokeImage.bind(this);
    this.selectPoke = this.selectPoke.bind(this);
  }

  selectPoke(e) {
    axios.get(e.target.value).then(response => {
      const poke = {
        id: response.data.id,
        name: response.data.name,
        sprites: response.data.sprites,
        level: response.data.level
      };
      console.log(response.data);
      axios.post("http://localhost:8080/pokemon", poke)
      .then(() => {
        this.props.getParty();
      })
      .catch(console.error);
    });
  }

  levelUp = () => {
    if (this.state.level < 100) {
      this.setState({ level: this.state.level + 1 });
    }
  };

  pokeImage(e) {
    return (
      <div className="poke">
        <img
          height="100px"
          width="125px"
          src={this.props.selectedPoke.sprites.front_default}
        />
      </div>
    );
  }

  render() {
    const og151 = this.props.pokemon.map(pokemon => {
      return <option value={pokemon.url}>{pokemon.name}</option>;
    });

    return (
      <div>
        <div>
          {this.props.selectedPoke ? (
            <div className="slot2">
              <div className="pokeInfo">
                {this.pokeImage()}
                <div className="pokeName">{this.props.selectedPoke.name}</div>
                <form className="pokeForm">
                  <input
                    className="pokeLevel"
                    type="text"
                    id="number"
                    value={this.state.level}
                  />
                  <input
                    className="levelUp"
                    type="button"
                    value="Level Up!"
                    onClick={() => this.levelUp()}
                  />
                </form>
              </div>
            </div>
          ) : (
            <div className="slot2">
              <div className="">
                <div className="dropbox">
                  <select className="dropdown" onChange={this.selectPoke}>
                    <option>Choose a Pokemon!</option>
                    {og151}
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Rest;
