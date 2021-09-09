import React, { Component } from "react";
import {
    TouchableOpacity,
    View,
    Image,
    Text,
    StyleSheet,
    Dimensions,
    Alert,
    Modal,

    // ImageBackground,
} from "react-native";

const deviceHeight = Dimensions.get("window").height;
export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
    }
    showcomp() {
        this.setState({ show: !this.state.show });
    }

    movetoupload() {
        this.props.nav.navigate("uploadVideo");
        this.setState({
            show: false,
        });
    }

    movetoRecord() {
        this.props.nav.navigate("recordVideo");
        this.setState({
            show: false,
        });
    }

    render() {
        return (
            <View
                style={{
                    width: "100%",
                    // alignSelf: 'center',
                    backgroundColor: "#0149AF",
                    // padding: 20,
                    flexDirection: "row",
                    // backgroundColor: 'transparent',

                    // justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "35%",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.nav.navigate("TrendsScreen")}
                    >
                        <Image
                            source={require("../../assets/images/home.png")}
                            style={{
                                height: 20,
                                width: 25,
                                alignSelf: "center",
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.nav.navigate("MapScreen")}
                    >
                        <Image
                            source={require("../../assets/images/map.png")}
                            style={{
                                height: 20,
                                width: 25,
                                alignSelf: "center",
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        width: "30%",
                        alignItems: "center",
                    }}
                >
                    <TouchableOpacity onPress={() => this.showcomp()}>
                        <Modal
                            animationType={"fade"}
                            transparent={true}
                            visible={this.state.show}
                        >
                            <View
                                style={{
                                    flex: 1,
                                    backgroundColor: "#000000AA",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <View
                                    style={{
                                        backgroundColor: "#FFFFFF",
                                        width: "100%",
                                        borderTopRightRadius: 10,
                                        borderTopLeftRadius: 10,
                                        paddingHorizontal: 20,
                                        maxHeight: deviceHeight * 0.4,
                                    }}
                                >
                                    <View
                                        style={{
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => this.showcomp()}
                                        >
                                            <Text style={{ marginLeft: "90%" }}>
                                                close{" "}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.movetoRecord()}
                                        >
                                            <Text
                                                style={{
                                                    color: "#182E44",
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    margin: 20,
                                                }}
                                            >
                                                record video
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => this.movetoupload()}
                                        >
                                            <Text
                                                style={{
                                                    color: "#182E44",
                                                    fontSize: 15,
                                                    fontWeight: "500",
                                                    margin: 20,
                                                }}
                                            >
                                                upload Video
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                        <Image
                            source={require("../../assets/images/Webp.net-resizeimage.png")}
                            resizeMode="contain"
                            style={{
                                height: 50,
                                width: 70,
                                backgroundColor: "transparent",
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-around",
                        width: "35%",
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.nav.navigate("Dashboard")}
                    >
                        <Image
                            source={require("../../assets/images/chatIcon.png")}
                            style={{
                                height: 20,
                                width: 25,
                                alignSelf: "center",
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.props.nav.navigate("UserProfile")}
                    >
                        <Image
                            source={require("../../assets/images/profile.png")}
                            style={{
                                height: 20,
                                width: 25,
                                alignSelf: "center",
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
