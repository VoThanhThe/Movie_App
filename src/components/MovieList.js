import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { fallbackMoviePoster, image185 } from '../api/MovieDB';

const { width, height } = Dimensions.get('window');

const MovieList = ({ title, data, hideSeeAll }) => {
  const navigation = useNavigation();
  let movieName = "Spider man Movie: Time Now";
  return (
    <View style={{ marginHorizontal: 16 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 20, fontWeight: "700" }}>{title}</Text>
        {
          !hideSeeAll && (
            <TouchableOpacity>
              <Text style={{ color: '#eab308', fontSize: 20, }}>See All</Text>
            </TouchableOpacity>
          )
        }

      </View>
      {/* Movie row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {
          data.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.push("Movie", item)}
              >
                <View style={{ marginVertical: 16, marginEnd: 16 }}>
                  <Image 
                  style={{ borderRadius: 10, width: width * 0.33, height: height * 0.22 }} 
                  // source={require("../assets/images/moviePoster2.png")} 
                  source={{uri: image185(item.poster_path) || fallbackMoviePoster}} 
                  />
                  <Text style={{ color: "white", fontSize: 16, fontWeight: "500", marginTop: 4 }}>
                    {
                      item.title.length > 14 ? item.title.slice(0, 14) + "..." : item.title
                    }
                  </Text>
                </View>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

export default MovieList

const styles = StyleSheet.create({})