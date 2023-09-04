import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { fallbackMoviePoster, fallbackPersonImage, image185 } from '../api/MovieDB';

const Cast = ({ cast, navigation}) => {
    let personName = "Keanu Reeves";
    let characterName = "John Smith";
    return (
        <View style={{ paddingVertical: 16, paddingHorizontal: 8 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', marginStart: 8 }}>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle = {{marginTop: 16}}
                >
                {
                    cast && cast.map((person, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{ marginHorizontal: 8, alignItems: 'center' }}
                                onPress={() => navigation.navigate("Person", person)}
                            >
                                <View>
                                    <Image 
                                    resizeMode='contain'
                                    style = {{width: 100, height: 100, borderRadius: 50, borderWidth: 1, borderColor: 'white'}}
                                    // source={require('../assets/images/castImage1.png')} 
                                    source={{uri: image185(person?.profile_path) || fallbackPersonImage}}
                                    />
                                </View>
                                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center', marginTop: 4 }}>
                                    {
                                        person?.character.length > 10 ? person?.character.slice(0,10)+"..." : person?.character
                                    }
                                </Text>
                                <Text style={{ color: '#D0C9C0', fontSize: 16, textAlign: 'center', marginTop: 4 }}>
                                    {
                                        person?.original_name.length > 10 ? person?.original_name.slice(0,10)+"..." : person?.original_name
                                    }
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }

            </ScrollView>
        </View>
    )
}

export default Cast

const styles = StyleSheet.create({})