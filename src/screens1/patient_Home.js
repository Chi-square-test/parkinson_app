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
import { WithLocalSvg } from "react-native-svg";
import Task5 from "../screens1/task_home";

import firstsvg from "../icon/first.svg";
import secondsvg from "../icon/second.svg";
import thirdsvg from "../icon/third.svg";
import crownsvg from "../icon/crown.svg";

import Context from "../Context/context";

var myHeaders = new Headers();
myHeaders.append(
  "Authorization",
  "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJjaGFtIiwiUm9sZXMiOlsiUk9MRV9VU0VSIl0sImlzcyI6IkhDQyBMYWIiLCJpYXQiOjE2NDQxNjk1MDMsImV4cCI6MTY0NDc3NDMwM30.22m7OlYWBKcSc3mh0S3Vvm_ObbPoTAuvZUqKsTOeP-oMyFD20HvsPAK5DdBA73KsMu25lTB2e4u3DJUmV5F-pA"
);
myHeaders.append("Content-Type", "application/json");

export default class patient_Home extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      first: [],
      second: [],
      third: [],
      User_name: "",
    };
  }

  componentDidMount() {
    this.userfunc();
    // this.findname();
  }
  userfunc = () => {
    fetch("http://hccparkinson.duckdns.org:19737/progress/rank", {
      method: "GET",
      headers: myHeaders,
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState(
          {
            data: json.data,
            first: json.data[0],
            second: json.data[1],
            third: json.data[2],
          },

          // 랭킹 참여하는 사람만 필터링
          // ,() => {
          //   let res = this.state.data.filter((it) => it.ranking === 1);
          //   this.setState({ data: res });
          // }
          () => {
            console.log(this.state.first);
          }
        );
      });
  };

  // findname = () => {
  //   fetch("http://152.70.233.113/chamuser/uid/" + this.context.user_id, {
  //     method: "GET",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((json) => {
  //       this.setState({
  //         User_name: json.info.name,
  //       });
  //       this.context.changeNAME(json.info.name);
  //     });
  // };

  render() {
    return (
      <View style={styles.finalView}>
        <View style={styles.menuView}>
          <Ionicons name="person-circle-sharp" size={35} color="#ffffff" />
          <View style={styles.margin}></View>
          <Text style={styles.titleText}>헬로우 파킨슨</Text>
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
                  }}
                >
                  <Image
                    source={require("../image/i1.png")}
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
                <Text style={styles.prizetext}>
                  {this.state.second == null
                    ? "x"
                    : String(this.state.second["uname"]) +
                      "[" +
                      String(this.state.second["percent"]) +
                      "%]"}
                </Text>
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
                  }}
                >
                  <Image
                    source={require("../image/i2.png")}
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
                <Text style={styles.prizetext}>
                  {this.state.first["uname"]}[{this.state.first["percent"]}%]
                </Text>
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
                    source={require("../image/i3.png")}
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
                <Text style={styles.prizetext}>
                  {this.state.third == null
                    ? "x"
                    : String(this.state.third["uname"]) +
                      "[" +
                      String(this.state.third["percent"]) +
                      "%]"}
                </Text>
              </View>
            </View>
          </View>
          {/* 환자 순위 4~ */}

          <FlatList
            style={{
              backgroundColor: "#ffffff",
              margin: "5%",
              borderRadius: 7,
              marginBottom: 175,
            }}
            data={this.state.data.slice(3)}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <Task5
                  record={index + 4}
                  name={item.uname}
                  age={item.birthday}
                  sex={item.gender}
                  check={this.context.user_name}
                ></Task5>
              );
            }}
          />
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
    marginTop: "3%",
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
