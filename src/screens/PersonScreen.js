import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import MovieList from '../components/MovieList';
import Loading from '../components/Loading'
import { fallbackPersonImage, fetchDetailPeople, fetchPersonMovie, image342 } from '../api/MovieDB'

var { width, height } = Dimensions.get('window');
const PersonScreen = () => {
  const { params: person } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const [people, setPeople] = useState({});
  let personName = "Keanu Reeves";
  let characterName = "John Smith";
  useEffect(() => {
    //call the person detail api
    setIsLoading(true);
    console.log("person", person);
    getDetailPeople(person.id);
    getPersonMovies(person.id);
  }, [person]);

  const getDetailPeople = async id => {
    const data = await fetchDetailPeople(id);
    // console.log("Data", data);
    if (data) setPeople(data);
    setIsLoading(false);
  }
  const getPersonMovies = async id => {
    const data = await fetchPersonMovie(id);
    console.log("Data", data);
    if (data && data.cast) setPersonMovies(data.cast);
    setIsLoading(false);
  }
  return (
    <ScrollView style={{ backgroundColor: "#272829", flex: 1 }} showsVerticalScrollIndicator={false}>
      <SafeAreaView style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center", paddingHorizontal: 16, position: 'relative', zIndex: 1, marginTop: 20 }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: '#eab308', borderRadius: 15, padding: 7 }}>
          <Icon name='chevron-back-outline' size={28} color={"white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(!isFavorite)}>
          <Icon name='heart' size={35} color={isFavorite ? "#eab308" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* person detail */}
      {
        isLoading ? (
          <Loading />
        ) : (
          <View>
            <View style={{
              flexDirection: 'row', justifyContent: 'center',
            }}>
              <View style={{ alignItems: "center"}}>
                <Image
                  style={{
                    width: 260, height: 260, borderRadius: 1000, borderWidth: 2, borderColor: 'white',
                  }}
                  // source={require("../assets/images/castImage1.png")} 
                  resizeMode='contain'
                  source={{ uri: image342(people?.profile_path) || fallbackPersonImage }}
                />
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', fontWeight: "bold" }}>
                {people?.name}
              </Text>
              <Text style={{ color: '#D0C9C0', fontSize: 18, textAlign: 'center', fontWeight: "500" }}>
                {
                  people?.place_of_birth
                }
              </Text>
            </View>

            <View style={{
              marginTop: 16, marginHorizontal: 16, padding: 10, backgroundColor: "#383838", borderRadius: 50,
              flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"
            }}>
              <View style={{ padding: 8, borderRightWidth: 2, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Gender</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>
                  {
                    people?.gender == 2 ? "Male" : "Female"
                  }
                </Text>
              </View>
              <View style={{ padding: 8, borderRightWidth: 2, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Birthday</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>{people?.birthday}</Text>
              </View>
              <View style={{ padding: 8, borderRightWidth: 2, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Know for</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>{people?.known_for_department}</Text>
              </View>
              <View style={{ padding: 8, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Popularity</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>{people?.popularity}</Text>
              </View>
            </View>
            <View style={{ marginTop: 16, marginHorizontal: 16, }}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Biography</Text>
              <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: 'bold', marginVertical: 16 }}>
                {
                  people?.biography
                }
              </Text>
            </View>
            {/* Movies */}
            <MovieList title={"Movies"} data={personMovies} hideSeeAll={true} />
          </View>
        )
      }

    </ScrollView>
  )
}

export default PersonScreen

const styles = StyleSheet.create({})