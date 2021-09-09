import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

function dislike(props) {
    return (
        <View>
            <Image
                style={styles.profile}
                source={require("../../../assets/images/person.jpg")}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    profile: {
        alignSelf: "flex-end",
        top: Dimensions.get("window").height / 3.8,
        width: 40,
        height: 40,
        marginVertical: 5,
    },
});

export default dislike;
