import { useNavigation, useRoute } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

import MovieList from '../components/MovieList';
import Loading from '../components/Loading'

var { width, height } = Dimensions.get('window');
const PersonScreen = () => {
  const { params: person } = useRoute();
  const [isFavorite, setIsFavorite] = useState(false);
  const [personMovies, setPersonMovies] = useState([1, 2, 3, 4, 5, 6]);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  let personName = "Keanu Reeves";
  let characterName = "John Smith";
  useEffect(() => {
    //call the movie detail api
  }, [person])
  return (
    <ScrollView style={{ backgroundColor: "#272829", flex: 1 }}>
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
              <View style={{ alignItems: "center", width: 260, height: 260, overflow: "hidden", borderWidth: 2, borderColor: "gray", borderRadius: 1000 }}>
                <Image style={{
                  width: width * 0.74, height: height * 0.43
                }} source={require("../assets/images/castImage1.png")} />
              </View>
            </View>

            <View style={{ marginTop: 16 }}>
              <Text style={{ color: 'white', fontSize: 30, textAlign: 'center', fontWeight: "bold" }}>
                {personName}
              </Text>
              <Text style={{ color: '#D0C9C0', fontSize: 18, textAlign: 'center', fontWeight: "500" }}>
                London, United Kingdom
              </Text>
            </View>

            <View style={{
              marginTop: 16, marginHorizontal: 16, padding: 10, backgroundColor: "#383838", borderRadius: 50,
              flexDirection: "row", justifyContent: "space-evenly", alignItems: "center"
            }}>
              <View style={{ padding: 8, borderRightWidth: 2, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Gender</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>Male</Text>
              </View>
              <View style={{ padding: 8, borderRightWidth: 2, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Birthday</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>1964-09-02</Text>
              </View>
              <View style={{ padding: 8, borderRightWidth: 2, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Know for</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>Acting</Text>
              </View>
              <View style={{ padding: 8, alignItems: "center", borderColor: "white" }}>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "700" }}>Popularity</Text>
                <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: "700" }}>64.23</Text>
              </View>
            </View>
            <View style={{ marginTop: 16, marginHorizontal: 16, }}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: 'bold' }}>Biography</Text>
              <Text style={{ color: "#D0C9C0", fontSize: 16, fontWeight: 'bold', marginVertical: 16 }}>
                Finding himself in a new era, and approaching retirement, Indy wrestles with fitting into a world that seems to have outgrown him. But as the tentacles of an all-too-familiar evil return in the form of an old rival, Indy must don his hat and pick up his whip once more to make sure an ancient and powerful artifact doesn't fall into the wrong hands.
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