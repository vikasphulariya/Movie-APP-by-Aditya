/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import {HeartIcon} from 'react-native-heroicons/solid';
import Snackbar from 'react-native-snackbar';
import {AsyncStorage} from 'react-native';

const SearchResult = ({searchResults}) => {
  const navigation = useNavigation();

  const addToFavs = async item => {
    try {
      // Fetch existing favorites from AsyncStorage
      const existingFavorites = await AsyncStorage.getItem('favorites');
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];

      // Check if the item already exists in favorites
      const isAlreadyFavorite = favorites.some(
        favItem => favItem.imdbID === item.imdbID,
      );

      if (!isAlreadyFavorite) {
        // Add the item to favorites
        favorites.push(item);

        // Save the updated favorites list to AsyncStorage
        await AsyncStorage.setItem('favorites', JSON.stringify(favorites));

        // Show a success message
        Snackbar.show({
          text: 'Added to Favorites',
          duration: Snackbar.LENGTH_SHORT,
        });
      } else {
        // Show a message indicating that the item is already in favorites
        Snackbar.show({
          text: 'This item is already in Favorites',
          duration: Snackbar.LENGTH_SHORT,
        });
      }
    } catch (error) {
      // Handle errors, e.g., AsyncStorage errors
      console.error('Error adding to favorites:', error);
      // Optionally, show an error message using Snackbar or any other method
      Snackbar.show({
        text: 'An error occurred. Please try again later.',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const sw = jj => {
    navigation.navigate('MovieDetails', {
      imdbID: jj,
    });
  };

  const addToFav = item => {};

  const renderResultItem = ({item}) => (
    <TouchableOpacity
      onPress={() => sw(item.imdbID)}
      style={styles.resultContainer}>
      <TouchableOpacity
        onPress={() => {
          console.log('sdd');
          Snackbar.show({
            text: 'Added to Favurite',
            duration: Snackbar.LENGTH_SHORT,
          });
          addToFav(item);
        }}
        style={{
          position: 'absolute',
          // backgroundColor: 'red',
          right: 0,
          bottom: 0,
          padding: 10,
        }}>
        <HeartIcon size={50} color="rgba(25,25,55,.2)" style={{padding: 20}} />
      </TouchableOpacity>
      <Image source={{uri: item.Poster}} style={styles.poster} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.year}>{item.Year}</Text>
        {/* <Text style={styles.imdbID}>{item.imdbID}</Text> */}
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={searchResults}
      renderItem={renderResultItem}
      keyExtractor={item => item.imdbID}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // marginVertical: 30,
  },
  resultContainer: {
    backgroundColor: '#e4f2e8',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
    borderRadius: 12,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  year: {
    fontSize: 16,
    color: '#888',
    marginBottom: 3,
  },
  imdbID: {
    fontSize: 14,
    color: '#888',
  },
});

export default SearchResult;
