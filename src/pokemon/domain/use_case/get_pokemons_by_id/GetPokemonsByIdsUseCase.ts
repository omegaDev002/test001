import {Pokemon} from '../../model/Pokemon';
import {GetPokemonByIdUseCase} from '../get_pokemon/GetPokemonUseCase';

export const GetPokemonsByIdsUseCase = async (
  ids: number[],
): Promise<Pokemon[]> => {
  try {
    const pokemonPromises: Promise<Pokemon>[] = ids.map(id => {
      return GetPokemonByIdUseCase(id);
    });

    return Promise.all(pokemonPromises);
  } catch (error) {
    console.log('error', error);
    throw new Error(`Error getting pokemons by ids: ${ids}`);
  }
};
