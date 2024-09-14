export interface PokeCard {
  name: string;
  cardImage: string;
  clicked: boolean;
}

export interface Poke {
  species: {
    name: string;
  };
  sprites: {
    front_default: string;
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
}
