import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/Ionicons'
import Cast from '../components/Cast';
import MovieList from '../components/MovieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchMovieSimilar, image500 } from '../api/MovieDB';
import Loading from '../components/Loading';

const { width, height } = Dimensions.get("window");

const MovieScreen = () => {
  const { params: item } = useRoute();
  const navigation = useNavigation();
  let movieName = "Spider man Movie: Time Now";

  const [isFavorite, setIsFavorite] = useState(false);
  const [cast, setCast] = useState([]);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [movie, setMovie] = useState({});
  useEffect(() => {
    //call the movie detail api
    setIsLoading(true);
    console.log("item id: ", item.id)
    getMovieDetails(item.id);
    getMovieCredits(item.id);
    getSimilarMovies(item.id);

  }, [item])

  const getMovieDetails = async id => {
    const data = await fetchMovieDetails(id);
    // console.log(data);
    if (data) setMovie(data);
    setIsLoading(false);
  }

  const getMovieCredits = async id => {
    const data = await fetchMovieCredits(id);
    // console.log("data credits: ", data);
    if (data && data.cast) setCast(data.cast);
  }
  const getSimilarMovies = async id => {
    const data = await fetchMovieSimilar(id);
    // console.log("data similar: ", data);
    if (data && data.results) setSimilarMovies(data.results);
  }
  return (
    <ScrollView
      contentContainerStyle={{ backgroundColor: '#272829', paddingBottom: 20 }}>
      {
        isLoading ? (
          <Loading />
        ) : (
          <View>
            <View style={{ width: "100%" }}>
              <SafeAreaView style={{ position: 'absolute', top: 20, zIndex: 1, width: "100%", flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 16 }}>
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={{ backgroundColor: '#eab308', borderRadius: 15, padding: 7 }}>
                  <Icon name='chevron-back-outline' size={28} color={"white"} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
                  <Icon name='heart' size={35} color={isFavorite ? "#eab308" : "white"} />
                </TouchableOpacity>
              </SafeAreaView>
              <View>
                <Image style={{ width: width, height: height * 0.55 }}
                  // source={require("../assets/images/moviePoster2.png")}
                  source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                  resizeMode='stretch' />
              </View>
              <LinearGradient
                colors={['transparent', 'rgba(23,23,23,0.9)', '#272829']}
                style={{ width: width, height: height * 0.40, position: "absolute", bottom: 0 }}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }} />
            </View>
            {/* Movie detail */}
            <View style={{ marginTop: -(height * 0.1) }}>
              {/* Title */}
              <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: "bold", color: "white" }}>
                {movie?.title}
              </Text>
              {/* status, relese, runtime */}
              {
                movie?.id ? (
                  <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: "400", color: "#D0C9C0", marginTop: 10 }}>
                    {movie?.status} . {movie?.release_date?.split('-')[0]} . {movie?.runtime} min
                  </Text>
                ) : null
              }

              {/* genres */}
              <View style={{ flexDirection: 'row', justifyContent: "center", alignItems: 'center', marginTop: 10 }}>
                {
                  movie?.genres?.map((genre, index) => {
                    let showDot = index + 1 != movie.genres.length;
                    return (
                      <Text key={index} style={{ textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0" }}>
                        {genre?.name} {showDot ? " . " : null}
                      </Text>
                    )
                  })
                }
                {/* <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0" }}>
            Action .
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0" }}>
            Thrill .
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 18, fontWeight: "400", color: "#D0C9C0" }}>
            Comedy
          </Text> */}
              </View>
              {/* description */}
              <Text style={{ fontSize: 16, fontWeight: "400", color: "#D0C9C0", paddingHorizontal: 16, marginTop: 10 }}>
                {movie?.overview}
              </Text>
            </View>
            {/* cast */}
            <Cast cast={cast} navigation={navigation} />
            {/* similar movie */}
            <MovieList title={"Similar Movies"} hideSeeAll={true} data={similarMovies} />
          </View>
        )
      }

    </ScrollView>

  )
}

export default MovieScreen

const styles = StyleSheet.create({})