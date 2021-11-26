import React, { Component } from "react";
import {
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  View,
  Text,
  Image,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import { WithLocalSvg } from "react-native-svg";
import Task5 from "../screens1/task_home";

import firstsvg from "../icon/first.svg";
import secondsvg from "../icon/second.svg";
import thirdsvg from "../icon/third.svg";
import crownsvg from "../icon/crown.svg";
import Task from "../screens1/task_text";

export default class patient_Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // id: "",
      // name: "",
      // gender: "",
      // birth: "",
      // progress: 0,
    };
  }
  componentDidMount() {
    fetch("http://152.70.233.113/chamuser", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((json) => {
        console.log("여기 잘 들어가나 확인 ~~ 한다~~");
        this.setState({
          data: json,
          // id: json.id,
          // name: json.name,
          // gender: json.gender,
          // birth: json.birth,
          // progress: json.progress,
        });
        this.setState({ data: Array.from(data) });
        // this.setState({
        //   id: data.id,
        //   name: Array.from(data.name),
        //   gender: Array.from(data.gender),
        //   birth: Array.from(data.birth),
        //   progress: Array.from(data.progress),
        // });
      });
    // console.log("cogus");
  }
  render() {
    return (
      <View style={styles.finalView}>
        <View style={styles.menuView}>
          <Ionicons name="person-circle-sharp" size={35} color="#ffffff" />
          <View style={styles.margin}></View>
          <Text style={styles.titleText}>굿나잇 파킨슨</Text>
          <View style={styles.margin}></View>

          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("patient_profile");
            }}
          >
            <Ionicons name="person-circle-sharp" size={35} color="#5CB405" />
          </TouchableOpacity>
        </View>
        <View style={styles.secondView}>
          {/* 환자 1~3 */}
          <View style={{ height: "27%", marginTop: "3%" }}>
            <View
              style={{
                margin: "5%",
                flexDirection: "row",
                alignContent: "flex-end",
                justifyContent: "space-evenly",
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: "7%",
                  margin: "1%",
                }}
              >
                <View
                  style={{
                    borderRadius: 400 / 2,
                    borderColor: "#C4C4C4",
                    borderWidth: 10,
                    // position: "absolute",
                    // top: "20%",
                  }}
                >
                  <Image
                    source={require("../image/ch.jpg")}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 400 / 2,
                    }}
                  />
                </View>
                <WithLocalSvg
                  style={{ top: "80%", position: "absolute" }}
                  width={30}
                  height={30}
                  asset={secondsvg}
                />

                {/* <Task
                 
                  name={this.state.data.slice(1, 2).name}
                  progress={Array.from(this.state.data.slice(1, 2))["progress"]}
                ></Task> */}
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "1%",
                }}
              >
                <WithLocalSvg
                  width={50}
                  height={40}
                  asset={crownsvg}
                  style={{ top: "-20%", position: "absolute" }}
                />
                <View
                  style={{
                    borderRadius: 400 / 2,
                    borderColor: "#F8D500",
                    borderWidth: 10,
                    // top: "40%",
                    // position: "absolute",
                  }}
                >
                  <Image
                    source={require("../image/ch.jpg")}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 400 / 2,
                    }}
                  />
                </View>
                <WithLocalSvg
                  style={{ top: "80%", position: "absolute" }}
                  width={30}
                  height={30}
                  asset={firstsvg}
                />
                <Text style={styles.prizetext}>1위</Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  top: "7%",
                  margin: "1%",
                }}
              >
                <View
                  style={{
                    borderRadius: 400 / 2,
                    borderColor: "#DA9B73",
                    borderWidth: 10,
                  }}
                >
                  <Image
                    source={require("../image/ch.jpg")}
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: 400 / 2,
                    }}
                  />
                </View>
                <WithLocalSvg
                  style={{ top: "80%", position: "absolute" }}
                  width={30}
                  height={30}
                  asset={thirdsvg}
                />
                <Text style={styles.prizetext}>이영현[65%]</Text>
              </View>
            </View>
          </View>
          {/* 환자 순위 4~ */}
          <ScrollView
            style={{
              backgroundColor: "#ffffff",
              margin: "5%",
              borderRadius: 7,
              marginBottom: 200,
            }}
          >
            <FlatList
              data={this.state.data.slice(3)}
              renderItem={({ item }) => {
                return (
                  // <TouchableOpacity
                  //   onPress={() => {
                  //     this.props.navigation.navigate("user_setting");
                  //   }}
                  // >
                  <Task5
                    record={item.id}
                    name={item.name}
                    age={item.birth}
                    sex={item.gender}
                  ></Task5>
                  // </TouchableOpacity>
                );
              }}
            />
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  finalView: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  menuView: {
    backgroundColor: "#FFFFFF",
    height: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    marginTop: "10%",
    justifyContent: "flex-start",
    borderBottomWidth: 1.8,
    borderColor: "#E5E5E5",
  },

  titleText: {
    alignItems: "flex-start",
    fontSize: 21,
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },

  firstView: {
    // padding:30,
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "row",
    flex: 1,
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  margin: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
  },
  secondView: {
    backgroundColor: "#F8F8F8",
    height: "100%",
  },
  image: {
    width: "10%",
    height: "10%",
  },
  prizetext: {
    position: "absolute",
    bottom: "-30%",
    fontSize: 17,
    fontWeight: "bold",
  },
});
