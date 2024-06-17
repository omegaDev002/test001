import React from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {GetPokemonsUseCase} from '../../../domain/use_case';
import {PokemonBallBg} from '../../components/PokemonBallBg';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {PokemonCard} from '../../components/PokemonCard';

export const ListScreen = () => {
  const {top} = useSafeAreaInsets();
  const queryClient = useQueryClient();

  const {data, fetchNextPage} = useInfiniteQuery({
    queryKey: ['pokemons', 'infinite'],
    initialPageParam: 0,
    queryFn: async params => {
      const pokemons = await GetPokemonsUseCase(params.pageParam);
      pokemons.forEach(pokemon => {
        queryClient.setQueryData(['pokemon', pokemon.id], pokemon);
      });

      return pokemons;
    },
    getNextPageParam: (lastPage, pages) => pages.length,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <View>
      <PokemonBallBg style={styles.imgPosition} />

      <FlatList
        data={data?.pages.flat() ?? []}
        keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
        numColumns={2}
        style={{paddingTop: top + 20}}
        ListHeaderComponent={() => (
          <Text variant="displayMedium"> Pokedex </Text>
        )}
        renderItem={({item}) => <PokemonCard pokemon={item} />}
        ListFooterComponent={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator></ActivityIndicator>
          </View>
        )}
        onEndReachedThreshold={0.6}
        onEndReached={() => fetchNextPage()}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imgPosition: {
    position: 'absolute',
    top: -100,
    right: -100,
  },
  loadingContainer: {
    display: 'flex' ,
    height: 50,
    justifyContent: 'flex-start',
  },
});
