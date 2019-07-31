import React, { Component } from "react";
import User from "../interfaces/User.interface";

interface SearchState {
  error: boolean;
  pokemon: Pokemon;
}
interface Pokemon {
  namepok: string;
  numberOfAbilities: number;
  baseExperience: number;
  imgUrl: string;
}

class PokemonSearch extends Component<User, SearchState> {
  pokemonRef: React.RefObject<HTMLInputElement>;

  constructor(props: User) {
    super(props);
    this.state = {
      error: false,
      pokemon: null
    };
    this.pokemonRef = React.createRef();
  }
  onSerchClick = () => {
    const inpuValue = this.pokemonRef.current.value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${inpuValue}`).then(res => {
      if (res.status !== 200) {
        this.setState({ error: true });
        return;
      }
      res.json().then(data => {
        this.setState({
          error: false,
          pokemon: {
            namepok: data.name,
            numberOfAbilities: data.abilities.length,
            baseExperience: data.base_experience,
            imgUrl: data.sprites.front_default
          }
        });
      });
    });
  };

  render() {
    const { name, numberOfPokemons } = this.props;
    const { error, pokemon } = this.state;
    let result;
    if (error) {
      result = <p>Pokemon not found ,please try again</p>;
    } else if (this.state.pokemon) {
      result = (
        <div>
          <img src={pokemon.imgUrl} alt="pokemon" className="pokImg" />
          <p>
            {pokemon.namepok} has {pokemon.numberOfAbilities} abilities and{" "}
            {pokemon.baseExperience} base experience point
          </p>
        </div>
      );
    }
    return (
      <div>
        <p>
          {" "}
          User {name}{" "}
          {numberOfPokemons && <span>has {numberOfPokemons} Pokemons</span>}
        </p>
        <input type="text" ref={this.pokemonRef} />
        <button onClick={this.onSerchClick} className="my-btn">
          {" "}
          Search
        </button>
        {result}
      </div>
    );
  }
}
export default PokemonSearch;
