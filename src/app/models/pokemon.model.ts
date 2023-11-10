export interface PokemonTypes {
    type: {
        name: string
    }
}
export interface PokemonSprites {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}
export interface PokemonAbilities {
    ability: {
        name: string
    }
}
export interface Pokemon {
    id: number,
    name: string;
    types: PokemonTypes[];
    base_experience: number;
    height: number,
    weight: number,
    sprites: PokemonSprites;
    abilities: PokemonAbilities[],
    favorite: boolean,
    url: string
}
