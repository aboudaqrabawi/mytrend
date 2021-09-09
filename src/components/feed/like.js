import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Dislike from "./dislike";
function like(props) {
    return (
        <View>
            <Image
                style={styles.like}
                source={require("../../../assets/images/like.png")}
            />
            <Dislike />
        </View>
    );
}

const styles = StyleSheet.create({
    like: {
        alignSelf: "flex-end",
        top: Dimensions.get("window").height / 2,
        width: 40,
        height: 40,
        marginVertical: 5,
    },
});

export default like;
