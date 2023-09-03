import React, { useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import TrendingMovies from '../components/TrendingMovies'
import MovieList from '../components/MovieList'
import { useNavigation } from '@react-navigation/native'

const data = [
  {
    id: '1',
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvera.com.vn%2Fpages%2Fverabychipu&psig=AOvVaw3h3zbi2NnfWbURuFATt3UZ&ust=1693672953661000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIin_cjtiYEDFQAAAAAdAAAAABAE",
    title: "Photos 1",
  },
  {
    id: '2',
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvera.com.vn%2Fpages%2Fverabychipu&psig=AOvVaw3h3zbi2NnfWbURuFATt3UZ&ust=1693672953661000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIin_cjtiYEDFQAAAAAdAAAAABAE",
    title: "Photos 2",
  },
  {
    id: '3',
    img: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fvera.com.vn%2Fpages%2Fverabychipu&psig=AOvVaw3h3zbi2NnfWbURuFATt3UZ&ust=1693672953661000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCIin_cjtiYEDFQAAAAAdAAAAABAE",
    title: "Photos 3",
  },
]


const HomeScreen = () => {
  const [trending, setTrending] = useState(data);
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: "#272829" }}>
      {/* search bar and logo */}
      <SafeAreaView style={{ margin: 16 }}>
        <StatusBar
          animated={true}
          backgroundColor="#272829"
          barStyle={"light-content"}
          showHideTransition={"fade"}
          hidden={false}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Icon size={30} name='menu' color={'#ffffff'} />
          <Text style={styles.header}>
            <Text style={[styles.header, { color: '#eab308' }]}>M</Text>ovie
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <Icon size={30} name='search' color={'#ffffff'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        {/* Trending Movies  */}
        <TrendingMovies data={trending} />
        {/* Upcoming movie now */}
        <MovieList title="Upcoming" data={trending} />

        {/* Toprate movie now */}
        <MovieList title="Top Rated" data={trending} />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  }
})