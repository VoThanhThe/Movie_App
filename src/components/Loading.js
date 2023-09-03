import { ActivityIndicator, Dimensions, ProgressBarAndroid, ProgressBarAndroidBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';

var {width, height} = Dimensions.get('window');
const Loading = () => {
  return (
    <View style = {{width, height, justifyContent: "center", alignItems: 'center'}}>
      <ActivityIndicator size={120} color={"#eab308"} />
      <Text style = {{color: "#eab308", fontSize: 30, fontWeight: "bold"}}>
        Loading...
      </Text>
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})