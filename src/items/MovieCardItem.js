import { StyleSheet, Text, View, Dimensions, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const MovieCardItem = (props) => {
    const {item, navigation} = props;
  return (
    <View>
      <TouchableOpacity onPress={() => {navigation.navigate("Movie", item)}}>
            <Image style = {{width: 250, height: 350, borderRadius: 10, marginHorizontal: 8}} source={require('../assets/images/moviePoster1.png')} />
          </TouchableOpacity>
    </View>
  )
}

export default MovieCardItem

const styles = StyleSheet.create({})