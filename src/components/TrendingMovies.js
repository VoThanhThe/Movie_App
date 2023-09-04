import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../api/MovieDB';

const MovieCard = ({item, handleClick}) => {
  console.log("item.poster_path: " , item.poster_path)
    return (
      <TouchableOpacity onPress={() => handleClick(item)}>
        <Image 
        style = {{width: 250, height: 350, borderRadius: 10, marginHorizontal: 8}} 
        // source={require('../assets/images/moviePoster1.png')} 
        source={{uri: image500(item.poster_path)}} 
        />
      </TouchableOpacity>
    )
  }

const TrendingMovies = ({data}) => {
    const navigation = useNavigation();
    const handleClick = (item) => {
        navigation.navigate('Movie', item);
    }
    
    return (
        <View>
            <Text style = {{fontSize: 20, fontWeight: '700', color: "white", paddingHorizontal: 16}}>Trending</Text>
            <FlatList
            contentContainerStyle = {{paddingHorizontal: 8, paddingVertical: 16}}
              data={data}
              renderItem={({item}) => <MovieCard item = {item} handleClick={handleClick}/>}
              keyExtractor={item => item.id}
              horizontal = {true}
              showsHorizontalScrollIndicator = {false}
            />
        </View>
    )
}

export default TrendingMovies

const styles = StyleSheet.create({})