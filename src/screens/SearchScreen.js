import { Dimensions, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, useAnimatedValue } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/Loading'
import { fallbackMoviePoster, image185, image500, searchMovies } from '../api/MovieDB'

var { width, height } = Dimensions.get('window');

const SearchScreen = () => {
  let movieName = "Spider man Movie: Time Now";
  const navigation = useNavigation();
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSearch = value => {
    setSearch(value);
    if(search && search.length > 2) {
      setIsLoading(true);
      searchMovies({
        query: search,
        include_adult: 'false',
        language: "en-US",
        page: '1'
      }).then(data => {
        setIsLoading(false);
        console.log("got movie: ", data);
        if(data && data.results) setResults(data.results);
      })
    }else {
      setIsLoading(false);
      setResults([])
    }
  }
  console.log(search);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#272829", padding: 16 }}>
      <View style={{ marginBottom: 16 }}>
        <TextInput 
        style={{ width: "100%", height: 56, fontSize: 18, color: "white", paddingStart: 20, paddingEnd: 70, borderWidth: 2, borderColor: "white", borderRadius: 1000, }} 
        placeholder='Search Movie' 
        placeholderTextColor={"white"}
        onChangeText={handleSearch}
        value= {search}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Home')}
          style={{ position: "absolute", top: 5, right: 5, bottom: 5 }}>
          <View style={{
            justifyContent: "center", alignItems: "center", backgroundColor: "gray", width: 45, height: 45, borderRadius: 1000,
          }}>
            <Icon name='close' size={25} color={"white"} />
          </View>
        </TouchableOpacity>
      </View>
      {
        isLoading ? (
          <Loading />
        ) : 
          results.length > 0 ?
            (<ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{}}>
              <Text style={{ color: "white", fontSize: 16, fontWeight: "500" }}>Result ({results.length})</Text>
              <View style={{ marginTop: 16, flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" }}>
                {
                  results.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => navigation.push("Movie", item)}>
                        <View style={{ marginBottom: 16 }}>
                          <Image 
                          style={{ width: width * 0.44, height: height * 0.3, borderRadius: 20 }} 
                          // source={require("../assets/images/moviePoster2.png")} 
                          resizeMode='stretch'
                          source={{uri: image500(item?.poster_path) || fallbackMoviePoster}} 
                          />
                          <Text style={{ color: "white", fontSize: 16, fontWeight: "500", marginTop: 4 }}>
                            {item?.title.length > 22 ? item?.title.slice(0, 20) + "..." : item?.title}
                          </Text>
                        </View>

                      </TouchableOpacity>
                    )
                  })
                }
              </View>
            </ScrollView>) : (
              <View style={{ alignItems: "center" }}>
                <Image style={{ width: 400, height: 300 }} source={require('../assets/images/movieTime.png')} />
              </View>
            )
        
      }



    </SafeAreaView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({})