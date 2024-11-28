import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import moment from "moment";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "@/constants/GlobalApi";
import { router } from "expo-router";
import { Button } from "tamagui";
import { TabBarIcon } from "../navigation/TabBarIcon";

export default function EditBookingUI({ doctor }: any) {
  const id = doctor.id;

  const [sevenDays, setSevenDays]: any = useState([]);
  const [timeList, setTimeList]: any = useState([]);
  const [selectedDate, setSelectedDate]: any = useState();
  const [selectedTime, setSelectedTime]: any = useState();
  const [notes, setNotes]: any = useState();
  const [isLoading, setIsloading] = useState(false);
  const [disabled, setdisabled] = useState(true);

  const today = moment();
  const bookingTime = moment(doctor.attributes.Time);
  
  const status = doctor.attributes.Status;
  const color =
    status == "Upcoming"
      ? Colors.rating
      : status == "Attended"
      ? Colors.green
      : Colors.red;

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  function dateSelected(date: any) {
    return (
      moment(date.BookingDate).format("YYYY-MM-DD") ==
      moment(doctor.attributes.Date).format("YYYY-MM-DD")
    );
  }

  function showToast(Msg: string) {
    ToastAndroid.show(Msg, ToastAndroid.TOP);
  }

  if (moment.max(today, bookingTime) == bookingTime) {
    useEffect(() => {
      getDays();
    }, []);

    useEffect(() => {
      getTime();
      setSelectedTime(null);
      setdisabled(true);
    }, [selectedDate]);
  }

  const getDays = () => {
    const today = moment();
    const nextSevenDays: any = [];

    for (let i = 0; i < 7; i++) {
      nextSevenDays.push({
        day: today.format("ddd"),
        formatedDate: today.format("D MMM"),
        BookingDate: today.format(),
        date: today.add(1, "day"),
      });
    }

    setSevenDays(nextSevenDays);
    setSelectedDate(nextSevenDays.filter(dateSelected)[0].BookingDate);
  };

  const getTime = () => {
    var ctime = moment();
    const timeList: any = [];
    let i = Number(
      doctor.attributes.doctor.data.attributes.Start_time.substring(0, 2)
    );
    let n = Number(
      doctor.attributes.doctor.data.attributes.End_time.substring(0, 2)
    );

    function time(Time: any) {
      let dt = moment(selectedDate);
      dt.hours(Time[0]);
      dt.minutes(Time[1]);
      dt.seconds(0);
      return dt;
    }

    {
      n == 0 ? (n = 24) : null;
    }

    for (i; i < n; i++) {
      timeList.push({
        time: time([i, "00"]),
      });
      timeList.push({
        time: time([i, "30"]),
      });
    }

    function filterValue(time: any) {
      return time.time >= ctime;
    }

    const newTime = timeList.filter(filterValue);

    if (selectedDate != sevenDays[0]?.BookingDate) {
      setTimeList(timeList);
    } else {
      setTimeList(newTime);
    }

    setSelectedTime(moment(doctor.attributes.Time));
  };

  function EditAppointment() {
    if (!selectedTime) {
      showToast("Please select time for Appointment");
      return null;
    }

    setIsloading(true);
    const data = {
      data: {
        PatientName: user?.fullName,
        Email: user?.primaryEmailAddress?.emailAddress,
        Date: selectedDate,
        Time: selectedTime,
        doctor: doctor.attributes.doctor.data.id,
        Note: notes || "",
        Phone: "+91" + 9512595125,
        Status: "Upcoming",
        doctorImg:
          doctor.attributes.doctor.data.attributes.Profile_Img.data.attributes
            .url,
        categories: doctor.attributes.categories.data.map(
          (data: any) => data.id
        ),
      },
    };
    // console.log();

    GlobalApi.updateAppointment({ data, id })
      .then(() => {
        setTimeout(() => {
          setIsloading(false);
          setSelectedTime(null);
          router.back();
          showToast("Appointment Booked Succesfully");
        }, 2000);
      })
      .catch((error) => console.log(error));
  }

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        gap: 20,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        minHeight: Dimensions.get("screen").height * 0.61,
      }}
    >
      {moment.max(today, bookingTime) == bookingTime ? (
        <View>
          <View style={{ gap: 12, paddingLeft: 20 }}>
            <Text style={{ color: Colors.title, ...styles.h3title }}>
              Appointment Details
            </Text>

            <Text style={{ color: Colors.text, ...styles.h4title }}>
              {moment.max(today, bookingTime) == bookingTime
                ? "Pick a day"
                : "Booking Date"}
            </Text>

            <FlatList
              data={sevenDays}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }: any) => (
                <TouchableOpacity
                  onPress={() => setSelectedDate(item.BookingDate)}
                  style={[
                    styles.dates,
                    selectedDate == item.BookingDate ? styles.selectedDT : null,
                  ]}
                >
                  <Text
                    style={[
                      { color: Colors.text, fontFamily: "InterRegular" },
                      selectedDate == item.BookingDate
                        ? { color: Colors.tintGrey }
                        : null,
                    ]}
                  >
                    {index == 0 ? "Today" : item.day}
                  </Text>
                  <Text
                    style={[
                      { color: Colors.title, ...styles.h3title },
                      selectedDate == item.BookingDate
                        ? { color: Colors.background }
                        : null,
                    ]}
                  >
                    {item.formatedDate}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={{ gap: 10, paddingLeft: 20 }}>
            <Text style={{ color: Colors.text, ...styles.h4title }}>
              "Booking Time"
            </Text>
            {timeList.length != 0 ? (
              <FlatList
                data={timeList}
                numColumns={5}
                scrollEnabled={false}
                columnWrapperStyle={{ flex: 1, gap: 6, marginBottom: 6 }}
                renderItem={({ item }: any) => (
                  <Pressable
                    onPress={() => {
                      setSelectedTime(item.time);
                      setdisabled(false);
                    }}
                    style={[
                      styles.time,
                      selectedTime == item.time ? styles.selectedDT : null,
                    ]}
                  >
                    <Text
                      style={[
                        { color: Colors.title, ...styles.h4title },
                        selectedTime == item.time
                          ? { color: Colors.background }
                          : null,
                      ]}
                    >
                      {item.time.format("HH:mm")}
                    </Text>
                  </Pressable>
                )}
              />
            ) : (
              <View style={{ alignItems: "center", padding: 14 }}>
                <Text style={{ paddingVertical: 14, ...styles.p }}>
                  No available slot for selected date!
                </Text>
              </View>
            )}
          </View>

          <View style={{ gap: 10, paddingHorizontal: 20, marginBottom: 80 }}>
            <Text style={{ color: Colors.text, ...styles.h4title }}>
              "Your Note"
            </Text>

            <TextInput
              numberOfLines={4}
              onChangeText={(value) => setNotes(value)}
              style={{
                backgroundColor: Colors.tintGrey,
                padding: 10,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: Colors.border,
                textAlignVertical: "top",
                color: Colors.text,
              }}
              placeholderTextColor={Colors.text}
              value={
                doctor.attributes.Note != "Blank note" && doctor.attributes.Note
              }
              editable={
                moment.max(today, bookingTime) != bookingTime ? false : true
              }
            />
          </View>
        </View>
      ) : (
        <View style={{ gap: 16, paddingHorizontal: 30 }}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ gap: 12, width: "50%" }}>
              <Text style={{ color: Colors.text, ...styles.h4title }}>
                Booking Date
              </Text>
              <View
                style={[
                  styles.dates,
                  { backgroundColor: Colors.tintGrey, width: 100 },
                ]}
              >
                <Text
                  style={[{ color: Colors.text, fontFamily: "InterRegular" }]}
                >
                  {moment(doctor.attributes.Time).format("ddd")}
                </Text>
                <Text style={[{ color: Colors.text, ...styles.h3title }]}>
                  {moment(doctor.attributes.Time).format("DD MMM")}
                </Text>
              </View>
            </View>

            <View style={{ gap: 12, width: "50%" }}>
              <Text style={{ color: Colors.text, ...styles.h4title }}>
                Booking Time
              </Text>
              <View style={[styles.time, { width: 100 }]}>
                <Text style={[{ color: Colors.text, ...styles.h4title }]}>
                  {moment(doctor.attributes.Time).format("HH:mm")}
                </Text>
              </View>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ color: Colors.text, ...styles.h4title }}>
              Appointment Status
            </Text>
            <View
              style={{
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <TabBarIcon name="circle" color={color} size={10} />
              <Text
                style={{
                  fontFamily: "InterRegular",
                  color: Colors.text,
                  fontSize: 15,
                }}
              >
                {status}
              </Text>
            </View>
          </View>

          <View style={{ gap: 12 }}>
            <Text style={{ color: Colors.text, ...styles.h4title }}>
              Your Note
            </Text>
            <Text style={{ ...styles.p }}>
              {doctor.attributes.Note != "Blank note" ? doctor.attributes.Note : "No notes"}
            </Text>
          </View>
        </View>
      )}

      {moment.max(today, bookingTime) == bookingTime && (
        <View
          style={{
            paddingHorizontal: 20,
            position: "absolute",
            width: "100%",
            bottom: 0,
            paddingVertical: 10,
            backgroundColor: "white",
          }}
        >
          <Button
            onPress={() => EditAppointment()}
            borderRadius={12}
            theme={"blue"}
            disabled={disabled}
            size={"$5"}
            color={"white"}
            backgroundColor={Colors.tint}
            opacity={disabled ? 0.5 : 1}
            pressStyle={{ backgroundColor: "#0c5adb90" }}
          >
            {isLoading ? (
              <ActivityIndicator size={"small"} color={Colors.background} />
            ) : (
              "Update Appointment"
            )}
          </Button>
        </View>
      )}
    </View>
  );
}
