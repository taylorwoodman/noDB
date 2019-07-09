import React, { Component } from "react";
import "./main.css";
import axios from "axios";
import "./pokeball.png";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      level: 70
    };

    this.selectPoke = this.selectPoke.bind(this);
  }

  selectPoke(e) {
    axios.get(e.target.value).then(response => {
      const poke = {
        id: response.data.id,
        name: response.data.name,
        sprites: response.data.sprites,
        level: 70
      };
      console.log(response.data);
      axios.post("http://localhost:8080/pokemon", poke).then(() => {
        this.props.getParty();
      })
      .catch(console.error);
    });
  }

  pokeImage(e) {
    return (
      <div className="poke1">
        <img
          height="100px"
          width="125px"
          src={this.props.selectedPoke.sprites.front_default}
        />
      </div>
    );
  }

  levelUp = () => {
    if (this.state.level < 100) {
      this.setState({ level: this.state.level + 1 });
    }
  };

  render() {
    const og151 = this.props.pokemon.map(pokemon => {
      return <option value={pokemon.url}>{pokemon.name}</option>;
    });

    return (
      <div>
        <div>
          {this.props.selectedPoke ? (
            <div className="slot1">
              <div className="pokeInfo1">
                {this.pokeImage()}
                <div className="pokeName1">{this.props.selectedPoke.name}</div>
                <form className="pokeForm1">
                  <input
                    className="pokeLevel1"
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
            <div className="slot1">
              <div className="">
                <div className="dropbox1">
                  <select className="dropdown1" onChange={this.selectPoke}>
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

export default Main;
