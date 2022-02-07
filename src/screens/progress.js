import React, { Component } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Alert,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";

import Task from "./task3";
import { Entypo } from "@expo/vector-icons";
import ddaysvg from "../icon/dday.svg";
import { AntDesign } from "@expo/vector-icons";
import SimplePopupMenu from "react-native-simple-popup-menu";
import Context from "../Context/context";
const m_items = [
  { id: "1", label: "1월" },
  { id: "2", label: "2월" },
  { id: "3", label: "3월" },
  { id: "4", label: "4월" },
  { id: "5", label: "5월" },
  { id: "6", label: "6월" },
  { id: "7", label: "7월" },
  { id: "8", label: "8월" },
  { id: "9", label: "9월" },
  { id: "10", label: "10월" },
  { id: "11", label: "11월" },
  { id: "12", label: "12월" },
];

const items = [
  { id: "alarm", label: "최근알림순" },
  { id: "progress", label: "진도율순" },
];

var now = new Date();
var thisdate2 = new Date(
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate()
).getDate();

var myHeaders = new Headers();
export default class progress extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);
    this.state = {
      daytext: ["일", "월", "화", "수", "목", "금", "토"],
      year: parseInt(now.getFullYear()),
      year1: "2022",
      month: parseInt(now.getMonth() + 1),
      month1: "01",
      day1: "01",
      day: parseInt(now.getDate()),
      yoil: parseInt(now.getDay()), //(0:일요일 ~ 6: 토요일)
      lastdate: 0,
      thisdate: thisdate2,
      lastdate2: 0,
      thisdate2: 0,
      // yoil: 0,
      data: [],
      data1: [],
      alarmtime: [],
      user_progress: 0,
      first: [],
      second: [],
    };
  }
  componentDidMount() {
    myHeaders.append("Authorization", "Bearer " + this.context.manager_token);
    myHeaders.append("Content-Type", "application/json");
    this.setState(
      {
        year1: String(this.state.year),
        month1:
          String(this.state.month).length == 1
            ? "0" + String(this.state.month)
            : String(this.state.month),
        day1:
          String(this.state.day).length == 1
            ? "0" + String(this.state.day)
            : String(this.state.day),
      },
      () => {
        this.userfunc();
      }
    );
    this.setState({
      lastdate: new Date(this.state.year, this.state.month - 1, 0).getDate(),
      thisdate: new Date(this.state.year, this.state.month, 0).getDate(),
    });
  }
  // sortJSON = function (data, key) {
  //   return data.sort(function (a, b) {
  //     var x = a[key];
  //     var y = b[key];
  //     return x < y ? -1 : x > y ? 1 : 0;
  //   });
  // };

  dayy = (num) => {
    while (num < 0) {
      num += 7;
    }
    while (num > 6) {
      num -= 7;
    }
    switch (num) {
      case 0:
        return "일";
        break;
      case 1:
        return "월";
        break;
      case 2:
        return "화";
        break;
      case 3:
        return "수";
        break;
      case 4:
        return "목";
        break;
      case 5:
        return "금";
        break;
      case 6:
        return "토";
        break;
    }
  };
  daynum = (num) => {
    if (num < 1) {
      return this.state.lastdate + num;
    } else if (num > this.state.thisdate) {
      return num - this.state.thisdate;
    } else {
      return num;
    }
  };
  todaynum = (num) => {
    // 다음달로 넘어갈 경우
    if (num >= this.state.thisdate + 1) {
      // 다음 해로 넘어갈 경우
      if (this.state.month == 12) {
        this.setState({ year: this.state.year + 1, month: 1 });
      }
      // 같은 해에서 이동할 경우
      else {
        this.setState({ month: this.state.month + 1 });
      }

      this.setState({
        day: num - this.state.thisdate,
        lastdate: this.state.thisdate,
        thisdate: new Date(this.state.year, this.state.month + 1, 0).getDate(),
      });

      return this.state.day;
    }
    // 이전달로 넘어갈 경우
    else if (num <= 0) {
      // 이전 해로 넘어갈 경우
      if (this.state.month == 1) {
        this.setState({ year: this.state.year - 1, month: 12 });
      }
      // 같은해에서 이동할 경우
      else {
        this.setState({ month: this.state.month - 1 });
      }
      this.setState({
        day: this.state.lastdate + num,
        thisdate: new Date(this.state.year, this.state.month - 1, 0).getDate(),
        lastdate: new Date(this.state.year, this.state.month - 2, 0).getDate(),
      });

      return this.state.day;
    }

    // 현재 달에서 이동할 경우
    else {
      return num;
    }
  };

  // this.userfunc());
  // };
  datare = () => {
    console.log(
      "날짜: ",
      this.state.year1 + "-" + this.state.month1 + "-" + this.state.day1
    );
    fetch(
      "http://hccparkinson.duckdns.org:19737/onlymanager/userlist/progress?date=" +

        this.state.year1 +

        "-" +
        this.state.month1 +
        "-" +
        this.state.day1,
      {
        method: "GET",
        headers: myHeaders,
      }
    )
      .then((res) => res.json())
      .then((json) => {
        this.setState({ data: json.data }, () => {
          console.log("데이터:", this.state.data);

          this.setState({
            // data1: this.state.data.sort(function (a, b) {
            //   return parseFloat(a.percent) - parseFloat(b.percent);
            // }),
            // data1: this.sortJSON(this.state.data, "percent"),
            data1: this.state.data,
          });
        });
      });
  };
  userfunc = () => {
    this.setState(
      {
        year1: String(this.state.year),
        month1:
          String(this.state.month).length == 1
            ? "0" + String(this.state.month)
            : String(this.state.month),
        day1:
          String(this.state.day).length == 1
            ? "0" + String(this.state.day)
            : String(this.state.day),
      },
      () => {
        this.datare();
        console.log(
          "마이너스 날짜: ",
          String(this.state.year1) +
            "-" +
            String(this.state.month1) +
            "-" +
            String(this.state.day1)
        );
      }
    );
  };

  onmonthPress = (id) => {
    this.setState({ month: id });
  };

  onMenuPress = (id) => {
    if (id === "alarm") {
      // 최근알림순 클릭했을 때
      // 주소 변경필요
      fetch("http://152.70.233.113/chamuser?sort=name", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((json) => {
          this.setState({ data: json });
          return this.state.data;
        });
    } else if (id === "progress") {
      // 진도율 낮은 순

      fetch(
        "http://hccparkinson.duckdns.org:19737/onlymanager/userlist/progress",
        {
          method: "GET",
          headers: myHeaders,
        }
      )
        .then((res) => res.json())
        .then((json) => {
          this.setState({ data: json.data }, () => {
            this.setState({
              // data1: this.state.data.sort(function (a, b) {
              //   return parseFloat(a.percent) - parseFloat(b.percent);
              // }),
              // data1: this.sortJSON(this.state.data, "percent"),
              data1: this.state.data,
            });
          });
        });
    }
  };
  plusdata = () => {
    if (this.state.day >= this.state.thisdate + 1) {
      // 다음 해로 넘어갈 경우
      if (this.state.month == 12) {
        this.setState({ year: this.state.year + 1, month: 1 });
        this.setState(
          {
            day: this.state.day - this.state.thisdate,
            lastdate: this.state.thisdate,
            thisdate: new Date(
              this.state.year,
              this.state.month + 1,
              0
            ).getDate(),
          },
          () => {
            this.userfunc();
          }
        );
      }
      // 같은 해에서 이동할 경우
      else {
        this.setState({ month: this.state.month + 1 });
        this.setState(
          {
            day: this.state.day - this.state.thisdate,
            lastdate: this.state.thisdate,
            thisdate: new Date(
              this.state.year,
              this.state.month + 1,
              0
            ).getDate(),
          },
          () => {
            this.userfunc();
          }
        );
      }
    } else {
      this.userfunc();
    }
  };

  minusdata = () => {
    if (this.state.day <= 0) {
      // 이전 해로 넘어갈 경우
      if (this.state.month == 1) {
        this.setState({ year: this.state.year - 1, month: 12 });
        this.setState(
          {
            day: this.state.lastdate + this.state.day,
            thisdate: new Date(
              this.state.year,
              this.state.month - 1,
              0
            ).getDate(),
            lastdate: new Date(
              this.state.year,
              this.state.month - 2,
              0
            ).getDate(),
          },
          () => {
            this.userfunc();
          }
        );
      }
      // 같은해에서 이동할 경우
      else {
        this.setState({ month: this.state.month - 1 });
        this.setState(
          {
            day: this.state.lastdate + this.state.day,
            thisdate: new Date(
              this.state.year,
              this.state.month - 1,
              0
            ).getDate(),
            lastdate: new Date(
              this.state.year,
              this.state.month - 2,
              0
            ).getDate(),
          },
          () => {
            this.userfunc();
          }
        );
      }
    }

    // 현재 달에서 이동할 경우
    else {
      this.userfunc();
    }
  };
  // 이전 일자 눌렀을 떄
  pressday = (yoilnum, daynum) => {
    this.setState({ yoil: yoilnum, day: daynum }, () => {
      this.minusdata();
    });
  };
  // 이전 주 눌렀을 때
  minus = () => {
    this.setState(
      { yoil: this.state.yoil - 7, day: this.state.day - 7 },
      () => {
        this.minusdata();
      }
    );
  };
  plus = () => {
    this.setState(
      { yoil: this.state.yoil + 7, day: this.state.day + 7 },
      () => {
        this.plusdata();
      }
    );
  };

  render() {
    return (
      <View style={styles.finalView}>
        <View style={styles.menuView}>
          <View style={styles.margin}></View>
          <Text style={styles.titleText}>환자 진도율</Text>
          <SimplePopupMenu
            style={styles.margin}
            items={items}
            cancelLabel={"취소"}
            onSelect={(items) => {
              this.onMenuPress(items.id);
            }}
            onCancel={() => console.log("onCancel")}
          >
            <Entypo name="dots-three-vertical" size={24} color="#595959" />
          </SimplePopupMenu>
        </View>

        <View style={styles.twoView}>
          <SimplePopupMenu
            items={m_items}
            cancelLabel={"취소"}
            onSelect={(m_items) => {
              this.onmonthPress(m_items.id);
            }}
            onCancel={() => console.log("onCancel")}
          >
            <Text style={{ fontSize: 21 }}>{this.state.month} 월</Text>
          </SimplePopupMenu>
        </View>

        <View style={styles.threeView}>
          <View style={styles.fourView}>
            <TouchableOpacity onPress={() => this.minus()}>
              <AntDesign name="left" size={30} color="#808080" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.pressday(this.state.yoil - 3, this.state.day - 3)
              }
            >
              <View style={styles.dayview}>
                <Text style={styles.lasttext1}>
                  {this.dayy(this.state.yoil - 3)}
                </Text>
                <Text style={styles.lasttext}>
                  {this.daynum(this.state.day - 3)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.pressday(this.state.yoil - 2, this.state.day - 2)
              }
            >
              <View style={styles.dayview}>
                <Text style={styles.lasttext1}>
                  {this.dayy(this.state.yoil - 2)}
                </Text>
                <Text style={styles.lasttext}>
                  {this.daynum(this.state.day - 2)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.pressday(this.state.yoil - 1, this.state.day - 1)
              }
            >
              <View style={styles.dayview}>
                <Text style={styles.lasttext1}>
                  {this.dayy(this.state.yoil - 1)}
                </Text>
                <Text style={styles.lasttext}>
                  {this.daynum(this.state.day - 1)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.pressday(this.state.yoil, this.state.day)}
            >
              <View style={styles.todayview}>
                <Text style={styles.ddaytext1}>
                  {this.dayy(this.state.yoil)}
                </Text>
                <Text style={styles.ddaytext}>
                  {this.todaynum(this.state.day)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.pressday(this.state.yoil + 1, this.state.day + 1)
              }
            >
              <View style={styles.dayview}>
                <Text style={styles.lasttext1}>
                  {this.dayy(this.state.yoil + 1)}
                </Text>
                <Text style={styles.lasttext}>
                  {this.daynum(this.state.day + 1)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.pressday(this.state.yoil + 2, this.state.day + 2)
              }
            >
              <View style={styles.dayview}>
                <Text style={styles.lasttext1}>
                  {this.dayy(this.state.yoil + 2)}
                </Text>
                <Text style={styles.lasttext}>
                  {this.daynum(this.state.day + 2)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                this.pressday(this.state.yoil + 3, this.state.day + 3)
              }
            >
              <View style={styles.dayview}>
                <Text style={styles.lasttext1}>
                  {this.dayy(this.state.yoil + 3)}
                </Text>
                <Text style={styles.lasttext}>
                  {this.daynum(this.state.day + 3)}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.plus}>
              <AntDesign name="right" size={30} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.fouuview}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={this.state.data1}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.8} //깜빡임을 조절하는 기능
                  onPress={() => {
                    this.props.navigation.navigate("user_progress", {
                      paramName1: item.id,
                    });
                  }}
                >
                  <Task
                    id={item.uid}
                    user={item.uname}
                    age={item.birthday}
                    sex={item.gender}
                    progress={item.percent}
                    minute={item.time_send}
                    // 알림 보낸 시간으로 부터 몇분 지났는지 계산해야함 , 1분마다 갱신
                  ></Task>
                </TouchableOpacity>
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
    marginTop: "10%",
    justifyContent: "flex-start",
    borderBottomWidth: 1.8,
    borderColor: "#E5E5E5",
  },
  titleText: {
    alignItems: "flex-start",
    fontSize: 20,
    alignItems: "center",
    color: "#000000",
    justifyContent: "center",
    fontWeight: "bold",
  },
  fouuview: {
    paddingTop: 10,
    marginBottom: 295,
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#ffffff",
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
    height: 300,
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  nexttext1: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#B5B5B5",
    paddingBottom: "2%",
  },
  ddaytext1: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFFFFF",
    paddingBottom: "2%",
  },
  lasttext1: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#484848",
    paddingBottom: "2%",
  },
  lasttext: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#484848",
    // paddingBottom: "2%",
  },
  dayview: {
    alignItems: "center",
    marginHorizontal: "2%",
  },
  todayview: {
    alignItems: "center",
    backgroundColor: "#7AC819",
    marginHorizontal: "3%",
    // paddingHorizontal: "%",
    paddingVertical: "5%",
    borderWidth: 2,
    borderRadius: 30,
    borderColor: "#7AC819",
  },
  nexttext: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#B5B5B5", // paddingBottom: "2%",
  },
  ddaytext: {
    fontWeight: "bold",
    fontSize: 15,
    color: "#FFFFFF",
    // borderRadius: 19,
  },
  twoView: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: "3%",
    backgroundColor: "#F8F8F8",
  },
  threeView: {
    borderRadius: 19,
    backgroundColor: "#FFFFFF",
  },
  fourView: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    marginTop: "5%",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: "2%",
  },
});
