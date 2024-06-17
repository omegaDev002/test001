import {pokeApi} from '../../../../config/api/pokeApi';
import {PokemonPaginateDto} from '../../../data/dto/PokemonDto';

export const GetPokemonsWithNameIdUseCase = async () => {
  const url = '/pokemon';

  const {data} = await pokeApi.get<PokemonPaginateDto>(url, {
    params: {
      limit: 1000,
    },
  });

  return data.results.map(info => ({
    id: Number(info.url.split('/')[6]),
    name: info.name,
  }));
};
