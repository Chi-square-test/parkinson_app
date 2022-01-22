import React, { Component } from "react";
import {
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";

import plussvg from "../icon/plus.svg";
import nosvg from "../icon/no.svg";
import { WithLocalSvg } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import DateTimePickerModal from "react-native-modal-datetime-picker";

const storeData = async (array) => {
  try {
    await AsyncStorage.setItem("@alarm", JSON.stringify(array));
    console.log("clear");
  } catch (e) {
    // saving error
    console.log("error");
  }
};

export default class alarm_add extends Component {
  constructor(props) {
    super(props);
    this.state = {
      apm: "",
      hour: "00",
      minute: "00",
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
      pickdate: new Date(),
      alarm_array: [],
    };
  }

  async componentDidMount() {
    try {
      const alarm_array = await AsyncStorage.getItem("@alarm");
      console.log(alarm_array);

      if (alarm_array !== null) {
        this.setState({ alarm_array: alarm_array });
      }
    } catch (e) {
      console.log("불러와지는 error");
    }
  }

  onPress_apm1 = () => {
    this.setState({ apm: "오전" });
  };

  onPress_apm2 = () => {
    this.setState({ apm: "오후" });
  };

  showDatePicker = () => {
    this.setState({ setDatePickerVisibility: true, isDatePickerVisible: true });
  };

  hideDatePicker = () => {
    this.setState({
      setDatePickerVisibility: false,
      isDatePickerVisible: false,
    });
  };

  handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    this.dateToStr(date);
    this.hideDatePicker();
  };

  dateToStr = (date) => {
    this.setState({ pickdate: date });
    var p_hours = date.getHours();
    var p_minute = date.getMinutes();

    console.log(p_hours + ":" + p_minute);

    if (p_minute === 0) this.setState({ minute: "00" });
    else this.setState({ minute: p_minute });
    if (p_hours === 24) this.setState({ apm: "오전", hour: 12 });
    else if (p_hours > 12) this.setState({ apm: "오후", hour: p_hours - 12 });
    else if (p_hours === 12) this.setState({ apm: "오후", hour: p_hours });
    else this.setState({ apm: "오전", hour: p_hours });
  };
  addalarm = () => {
    Alert.alert("알림창", "알림을 추가하시겠어요?", [
      {
        text: "취 소",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "추 가",
        onPress: () => {
          console.log("OK Pressed");
          if (this.state.apm === "" || this.state.hour == "00")
            Alert.alert("시간을 입력해주세요.");
          else {
            var add_clock = {
              apm: this.state.apm,
              hour: this.state.hour,
              minute: this.state.minute,
              click: 1,
            };

            if (this.state.alarm_array.length === 0) {
              var change_clock = [];
              change_clock.push(add_clock);
            } else {
              var change_clock = JSON.parse(this.state.alarm_array);
              console.log("?" + change_clock);
              console.log("?" + change_clock);
              change_clock.push(add_clock);
            }
            console.log("!" + JSON.stringify(change_clock));
            storeData(change_clock);

            //this.props.navigation.pop();
            this.props.navigation.push("TabNavigation1", {
              paramsName: this.props.route.params.paramsName,
            });
          }
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.finalView}>
        <View style={styles.menuView}>
          <AntDesign
            name="left"
            size={24}
            color="#808080"
            onPress={() => {
              this.props.navigation.pop();
            }}
          />
          <View style={styles.margin}></View>
          <Text style={styles.titleText}>나의 운동 알림</Text>
          <View style={styles.margin}></View>
          <AntDesign name="left" size={24} color="#FFFFFF" />
        </View>

        <View style={styles.secondView}>
          <View style={{ flex: 0.3 }}></View>
          <View style={{ margin: "5%" }}>
            <View style={styles.firstView}>
              <View
                style={{
                  alignItems: "center",
                  borderRightWidth: 3,
                  borderColor: "#E0E0E0",
                  flex: 5,
                }}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.onPress_apm1}
                >
                  <Text
                    style={
                      this.state.apm === "오전" ? styles.apm2 : styles.apm1
                    }
                  >
                    오 전
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 5, alignItems: "center" }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.onPress_apm2}
                >
                  <Text
                    style={
                      this.state.apm === "오후" ? styles.apm2 : styles.apm1
                    }
                  >
                    오 후
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ flex: 0.2 }}></View>
            <DateTimePickerModal
              isVisible={this.state.isDatePickerVisible}
              mode="time"
              date={this.state.pickdate}
              onConfirm={this.handleConfirm}
              onCancel={this.hideDatePicker}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                padding: "3%",
                borderColor: "#E0E0E0",
                borderRadius: 6,
                borderWidth: 2,
                marginBottom: "5%",
                marginTop: "5%",
                backgroundColor: "#ffffff",
                height: "20%",
              }}
            >
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.showDatePicker}
                >
                  <Text style={styles.time1}>{this.state.hour}</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text style={styles.time1}>:</Text>
              </View>
              <View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={this.showDatePicker}
                >
                  <Text style={styles.time1}>{this.state.minute}</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ flex: 2 }}></View>

            <View style={styles.threeview}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.pop();
                }}
              >
                <WithLocalSvg width={90} height={90} asset={nosvg} />
              </TouchableOpacity>
              <TouchableOpacity onPress={this.addalarm}>
                <WithLocalSvg width={90} height={90} asset={plussvg} />
              </TouchableOpacity>
            </View>
          </View>
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
  marginView: {
    flex: 1,
  },
  apm1: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#B5B5B5",
  },

  apm2: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#000000",
  },

  time1: {
    fontSize: 39,
    color: "#000000",
  },

  time2: {
    fontSize: 39,
    color: "#000000",
  },

  threeview: {
    padding: "3%",
    marginTop: "3%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
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
  margin: {
    // padding:30,
    alignItems: "flex-start",
    justifyContent: "center",
    flex: 1,
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
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: "3%",
    borderColor: "#E0E0E0",
    borderRadius: 6,
    borderWidth: 2,
    marginBottom: "4%",
    backgroundColor: "#ffffff",
    height: "15%",
  },
  secondView: {
    backgroundColor: "#F8F8F8",
    height: "100%",
  },

  text1View: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  margin1: {
    width: "90%",
    borderBottomWidth: 1,
    borderColor: "#E0E0E0",
  },
  text2: {
    fontSize: 23,
    fontWeight: "bold",
    borderColor: "#E0E0E0",
    color: "#B5B5B5",
  },
  text2_on: {
    fontSize: 23,
    fontWeight: "bold",
    borderColor: "#E0E0E0",
    color: "#000000",
  },
});
