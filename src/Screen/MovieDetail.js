import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView, StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

const MovieDetailsScreen = ({route}) => {
  //   const {movieDetails} = route;
  console.log(route.params.imdbID);
  const [movieDetails, setMovieDetails] = useState();
  useEffect(() => {
    searchMovie();
  }, []);

  const [dataLoaded, setDataLoaded] = useState(false);
  const searchMovie = async () => {
    // Alert.alert('hello');
    // if (true) return;
    // const replacedString = searchTerm.replace(/ /g, '+');
    axios
      .get('https://www.omdbapi.com/', {
        params: {
          apikey: '6c9862c2',
          i: route.params.imdbID,
        },
      })
      .then(response => {
        console.log(response.data); // Do something with the data
        // console.log();
        // console.log(response.data.Search.length);
        setMovieDetails(response.data); // Do something with the data
        setDataLoaded(true);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };
  return (
    <ScrollView style={styles.container}>
      {dataLoaded ? (
        <View>
          <Text style={styles.title}>{movieDetails.Title}</Text>
          <View style={styles.imageContainer}>
            <Image source={{uri: movieDetails.Poster}} style={styles.poster} />
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.info}>Released: {movieDetails.Released}</Text>
            <Text style={styles.info}>Runtime: {movieDetails.Runtime}</Text>
            <Text style={styles.info}>Genre: {movieDetails.Genre}</Text>
            <Text style={styles.info}>Director: {movieDetails.Director}</Text>
            <Text style={styles.info}>Actors: {movieDetails.Actors}</Text>
            <Text style={styles.plot}>{movieDetails.Plot}</Text>
            <Text style={styles.info}>
              IMDb Rating: {movieDetails.imdbRating}
            </Text>
            <Text style={styles.info}>Awards: {movieDetails.Awards}</Text>
            <Text style={styles.info}>
              Box Office: {movieDetails.BoxOffice}
            </Text>
          </View>
        </View>
      ) : (
        <View>
          <LottieView
            source={require('./loading.json')}
            autoPlay
            loop
            style={{
              width: 250,
              aspectRatio: 1,
              // backgroundColor: 'red',
              alignSelf: 'center',
            }}
          />
          <Text
            style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 34,
              fontWeight: '900',
            }}>
            Loading Details
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#e4f2e8',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  poster: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 40,
    fontWeight: '900',
    marginTop: 10,
    alignSelf: 'center',
  },
  info: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  plot: {
    // fontSize: 16,
    marginBottom: 10,
    fontStyle: 'italic',
    textAlign: 'justify',
    color: '#c46d16',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default MovieDetailsScreen;
