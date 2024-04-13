import axios from 'axios';
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
  Image,
} from 'react-native';
import Snackbar from 'react-native-snackbar';

import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SearchResult from './movieList';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const [searchResult, setSearchResult] = useState([]);
  const searchMovie = async () => {
    // Alert.alert('hello');
    // if (true) return;
    Snackbar.show({
      text: 'Searching',
      duration: Snackbar.LENGTH_SHORT,
    });
    const replacedString = searchTerm.replace(/ /g, '+');
    axios
      .get('https://www.omdbapi.com/', {
        params: {
          apikey: '6c9862c2',
          s: replacedString,
        },
      })
      .then(response => {
        console.log(response.data); // Do something with the data
        // console.log();
        console.log(response.data.Search.length);
        setSearchResult(response.data.Search); // Do something with the data
        Snackbar.show({
          text: 'Search Complete',
          duration: Snackbar.LENGTH_SHORT,
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  const renderResultItem = ({item}) => (
    <View style={styles.resultContainer}>
      <Image source={{uri: item.Poster}} style={styles.poster} />
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{item.Title}</Text>
        <Text style={styles.year}>{item.Year}</Text>
        <Text style={styles.imdbID}>{item.imdbID}</Text>
      </View>
    </View>
  );
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          placeholder="Enter movie name"
          style={{
            backgroundColor: '#c0c0c0',
            borderRadius: 15,
            margin: 10,
            paddingHorizontal: 15,
            width: '65%',
          }}
          onChangeText={e => {
            setSearchTerm(e);
          }}
        />
        <TouchableOpacity
          onPress={() => searchMovie()}
          style={{
            backgroundColor: 'green',
            margin: 10,
            alignItems: 'center',
            borderRadius: 13,
            paddingHorizontal: 5,
            alignContent: 'center',
            justifyContent: 'center',
            // width
          }}>
          <Text style={{color: '#fff', fontWeight: '800', fontSize: 18}}>
            Search
          </Text>
        </TouchableOpacity>
      </View>

      <SearchResult searchResults={searchResult} />
      {/* <Text style={{color: 'black'}}>Home</Text> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  resultContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  year: {
    fontSize: 16,
    marginBottom: 3,
  },
  imdbID: {
    fontSize: 14,
    color: '#888',
  },
});
export default Home;
