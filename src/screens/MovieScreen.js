import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons'
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  let movieName = "Spider man Movie: Time Now";

  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([1,2,3,4,5,6]);
  const [similarMovies, setSimilarMovies] = useState([1,2,3,4,5,6]);
  useEffect(() => {
    //call the movie detail api
  }, [item])

  return (
    <ScrollView
    contentContainerStyle={{ backgroundColor: '#272829', paddingBottom: 20 }}>
      <View style={{ width: "100%"}}>
        <SafeAreaView style={{ position: 'absolute', top: 20, zIndex: 1, width: "100%", flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 16 }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: '#eab308', borderRadius: 15, padding: 7 }}>
            <Icon name='chevron-back-outline' size={28} color={"white"} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
            {
              isFavorite ? <Icon name='heart' size={35} color={"#eab308"} /> : <Icon name='heart' size={35} color={"white"} />
            }
          </TouchableOpacity>
        </SafeAreaView>
        <View>
          <Image style={{ width: width, height: height * 0.55 }}
            source={require("../assets/images/moviePoster2.png")}
            resizeMode='cover' />
        </View>
        <LinearGradient
          colors={['transparent', 'rgba(23,23,23,0.9)', '#272829']}
          style={{ width: width, height: height * 0.40, position: "absolute", bottom: 0}}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }} />
      </View>
      {/* Movie detail */}
      <View style = {{marginTop: -(height * 0.1)}}>
        {/* Title */}
        <Text style = {{textAlign: 'center', fontSize: 30, fontWeight: "bold", color: "white"}}>
            {movieName}
        </Text>
        {/* status, relese, runtime */}
        <Text style = {{textAlign: 'center', fontSize: 16, fontWeight: "400", color: "#D0C9C0", marginTop: 10}}>
          Relesed . 2020 . 170 min
        </Text>
        {/* genres */}
        <View style = {{flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 10}}>
          <Text style = {{textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0"}}>
            Action .
          </Text>
          <Text style = {{textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0"}}>
            Thrill .
          </Text>
          <Text style = {{textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0"}}>
            Comedy
          </Text>
        </View>
        {/* description */}
        <Text style = {{fontSize: 16, fontWeight: "400", color: "#D0C9C0", paddingHorizontal: 16, marginTop: 10}}>
        Follow Moiraine, a member of the shadowy and influential all-female organization called the “Aes Sedai” as she embarks on a dangerous, world-spanning journey with five young men and women. Moiraine believes one of them might be the reincarnation of an incredibly powerful individual, whom prophecies say will either save humanity or destroy it.
        </Text>
      </View>
      {/* cast */}
      <Cast cast = {cast} navigation = {navigation}/>
      {/* similar movie */}
      <MovieList title={"Similar Movies"} hideSeeAll = {true} data = {similarMovies} />
    </ScrollView>
  )
}

export default MovieScreen

const styles = StyleSheet.create({})