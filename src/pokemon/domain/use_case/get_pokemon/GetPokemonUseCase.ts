import {pokeApi} from '../../../../config/api/pokeApi';
import {PokemonDto} from '../../../data/dto/PokemonDto';
import {PokemonMapper} from '../../../data/mappers/pokemon.mapper';
import {Pokemon} from '../../model/Pokemon';

export const GetPokemonByIdUseCase = async (id: number): Promise<Pokemon> => {
  try {
  
    const {data} = await pokeApi.get<PokemonDto>(`/pokemon/${id}`);
    
    const pokemon = await PokemonMapper.PokemonDtotoPokemon(data);

    return pokemon;
  } catch (error) {
    console.log('error GetPokemonByIdUseCase ', error);
    throw new Error(`Error getting pokemon by id: ${id} `);
  }
};
