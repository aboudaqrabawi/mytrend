import { View, Text, StyleSheet, Dimensions } from "react-native";
import React, { useEffect } from "react";
import Likes from "./like";
import Footer2 from "../Footer";
import AsyncStorage from '@react-native-async-storage/async-storage';
function video(props) {
//     const userId = async ()=>{
//         console.log(await AsyncStorage.getItem('@Trend:token'))

//     }
//  useEffect(()=>{
//     userId()
//  },[])
    return (
        <View style={styles.container}>
            <View>
                <Likes />
            </View>

            <View
                style={{
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    paddingTop: "100%",
                }}
            >
                <Footer2 nav={props.navigation} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
    },
    like: {
        color: "#000",
        backgroundColor: "#fff",
        margin: 10,
    },
});

export default video;
