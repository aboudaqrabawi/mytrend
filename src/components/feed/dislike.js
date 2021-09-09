import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Profile from "./profile";

function dislike(props) {
    return (
        <View>
            <Image
                style={styles.dislike}
                source={require("../../../assets/images/dislike.png")}
            />
            <Profile />
        </View>
    );
}

const styles = StyleSheet.create({
    dislike: {
        alignSelf: "flex-end",
        top: Dimensions.get("window").height / 1.9,
        width: 40,
        height: 40,
        marginVertical: 5,
    },
});

export default dislike;
