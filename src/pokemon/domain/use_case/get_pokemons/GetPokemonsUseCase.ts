import {pokeApi} from '../../../../config/api/pokeApi';
import type {
  PokemonDto,
  PokemonPaginateDto,
} from '../../../data/dto/PokemonDto';
import {PokemonMapper} from '../../../data/mappers/pokemon.mapper';
import type {Pokemon} from '../../model/Pokemon';

export const GetPokemonsUseCase = async (
  page: number,
  limit: number = 20,
): Promise<Pokemon[]> => {
  try {
    const url = '/pokemon';

    const {data} = await pokeApi.get<PokemonPaginateDto>(url, {
      params: {
        offset: page * 10,
        limit,
      },
    });

    const pokemonPromises = data.results.map(info => {
      return pokeApi.get<PokemonDto>(info.url);
    });

    const pokemonsApi = await Promise.all(pokemonPromises);

    const pokemonsPromises = pokemonsApi.map(item =>
      PokemonMapper.PokemonDtotoPokemon(item.data),
    );
    return await Promise.all(pokemonsPromises);
  } catch (error) {
    console.log('error GetPokemonsUseCase', error);
    throw new Error('Error getting pokemons');
  }
};
