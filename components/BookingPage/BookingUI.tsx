import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Dimensions, ScrollView
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import moment from "moment";
import { useUser } from "@clerk/clerk-expo";
import GlobalApi from "@/constants/GlobalApi";
import { router } from "expo-router";
import { Button } from "tamagui";
import ThankYou from "../Shared/ThankYou";

export default function BookingUI(props: { info: any }) {
  const doctor = props.info;

  const [sevenDays, setSevenDays]: any = useState([]);
  const [timeList, setTimeList]: any = useState([]);
  const [selectedDate, setSelectedDate]: any = useState();
  const [selectedTime, setSelectedTime]: any = useState();
  const [notes, setNotes]: any = useState();
  const [isLoading, setIsloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [disabled, setdisabled] = useState(true);

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  function showToast(Msg: string) {
    ToastAndroid.show(Msg, ToastAndroid.TOP);
  }


  useEffect(() => {
    getDays();
  }, []);

  useEffect(() => {
    getTime();
    setSelectedTime(null);
    setdisabled(true);
  }, [selectedDate]);


  const getDays = () => {
    const today = moment(new Date());
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
    setSelectedDate(nextSevenDays[0].BookingDate);
  };

  const getTime = () => {
    var ctime = new Date();
    const timeList: any = [];
    let i = Number(doctor.attributes.Start_time.substring(0, 2));
    let n = Number(doctor.attributes.End_time.substring(0, 2));

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
  };


  function Appointment() {
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
        doctor: doctor.id,
        Note: notes || "Blank note",
        Phone: "+91" + 9512595125,
        Status: "Upcoming",
        doctorImg: doctor.attributes.Profile_Img.data.attributes.url,
        categories: doctor.attributes.categories.data.map(
          (data: any) => data.id
        ),
      },
    };
    console.log(data);

    GlobalApi.makeAppointment(data)
      .then(() => {
        setTimeout(() => {
          setIsloading(false);
          setSelectedTime(null);
          setShowSuccess(true);
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
        minHeight: Dimensions.get("screen").height * 0.73,
      }}
    >
      {showSuccess && <ThankYou />}

      <View style={{ gap: 12, paddingLeft: 20 }}>
        <Text style={styles.h4title}>Pick a day</Text>
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
        {timeList.length != 0 && (
          <Text style={styles.h4title}>Pick a time</Text>
        )}
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

      <View style={{ gap: 10, paddingHorizontal: 20, marginBottom: 50 }}>
        <Text style={styles.h4title}>Add note</Text>
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
          placeholder={"Write Notes Here!"}
        />
      </View>

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
          onPress={() => Appointment()}
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
            "Book Appointment"
          )}
        </Button>
      </View>
    </View>
  );
}
