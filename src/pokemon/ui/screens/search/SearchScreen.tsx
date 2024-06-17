import {useMemo, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {ActivityIndicator, Text, TextInput} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/PokemonCard';
import {useQuery} from '@tanstack/react-query';
import {
  GetPokemonsByIdsUseCase,
  GetPokemonsWithNameIdUseCase,
} from '../../../domain/use_case';
import {useDebouncedValue} from '../../../../ui/hooks/useDebouncedValue';
import {FullScreenLoader} from '../../../../ui/components/shared/FullScreenLoader';
import {PokemonBallBg} from '../../components/PokemonBallBg';

export const SearchScreen = () => {
  const {top} = useSafeAreaInsets();
  const [term, setTerm] = useState('');

  const debouncedValue = useDebouncedValue(term);

  const {isLoading, data: pokemonNameList = []} = useQuery({
    queryKey: ['pokemons', 'all'],
    queryFn: () => GetPokemonsWithNameIdUseCase(),
  });

  const pokemonNameIdList = useMemo(() => {
    if (!isNaN(Number(debouncedValue))) {
      const pokemon = pokemonNameList.find(
        pokemon => pokemon.id === Number(debouncedValue),
      );
      return pokemon ? [pokemon] : [];
    }

    if (debouncedValue.length === 0) return [];
    if (debouncedValue.length < 3) return [];

    return pokemonNameList.filter(pokemon =>
      pokemon.name.includes(debouncedValue.toLocaleLowerCase()),
    );
  }, [debouncedValue]);

  const {isLoading: isLoadingPokemons, data: pokemons = []} = useQuery({
    queryKey: ['pokemons', 'by', pokemonNameIdList],
    queryFn: () =>
      GetPokemonsByIdsUseCase(pokemonNameIdList.map(pokemon => pokemon.id)),
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return <FullScreenLoader />;
  }

  return (
    <View style={{paddingTop: top + 20}}>
      <TextInput
        placeholder="Search"
        mode="outlined"
        autoFocus
        autoCorrect={false}
        onChangeText={setTerm}
        value={term}
        style={styles.inputCustom}
      />

      {isLoadingPokemons && <ActivityIndicator style={{paddingTop: 20}} />}

      <FlatList
        data={pokemons}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={ <View style={{ height: 150 }} />}
      />

      <PokemonBallBg style={styles.pokeballBg} />
    </View>
  );
};

const styles = StyleSheet.create({
  inputCustom: {
    marginHorizontal: 10,
  },
  pokeballBg: {
    position: 'absolute',
    bottom: -50,
    left: -100,
    opacity: 0.5,
    width: 300,
    height: 300,
    zIndex: -1,
  },
});
