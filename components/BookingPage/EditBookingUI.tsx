import {
  View,
  Text,
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
import { Edit3 } from "@tamagui/lucide-icons";
import AvailDate from "./AvailDate";
import AvailTime from "./AvailTime";

export default function EditBookingUI({ data, status, color }: any) {
  const id = data.attributes.doctor.data.id;

  const [workingDays, setWorkingDays]: any = useState([]);
  const [timeSlots, setTimeSlots]: any = useState([]);
  const [selectedDate, setSelectedDate]: any = useState();
  const [selectedTime, setSelectedTime]: any = useState();
  const [notes, setNotes]: any = useState();
  const [isLoading, setIsloading] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const [edit, setEdit] = useState(false);
  const timeInterval = Number(data.attributes.Interval_for_Booking);

  const today = moment();
  const bookingTime = moment(
    data.attributes.Date + data.attributes.Time,
    "YYYY-MM-DD" + "HH:mm"
  )

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  function showToast(Msg: string) {
    ToastAndroid.show(Msg, ToastAndroid.TOP);
  }

    // useEffect(() => {
    //   generateWorkingDays();
    // }, []);

    // useEffect(() => {
    //   generateTimeSlots();
    //   setSelectedTime(null);
    //   setdisabled(true);
    // }, [selectedDate]);
  

  const generateWorkingDays = () => {
    let currentDate = moment();
    const workingDates: any = [];
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const startIndex = daysOfWeek.indexOf("Mon");
    const endIndex = daysOfWeek.indexOf("Sat");

    while (workingDates.length < 7) {
      const currentDay = currentDate.format("ddd");
      const currentDayIndex = daysOfWeek.indexOf(currentDay);

      if (
        (startIndex <= endIndex &&
          currentDayIndex >= startIndex &&
          currentDayIndex <= endIndex) ||
        (startIndex > endIndex &&
          (currentDayIndex >= startIndex || currentDayIndex <= endIndex))
      ) {
        workingDates.push(currentDate.format("YYYY-MM-DD"));
      }
      currentDate.add(1, "day");
    }

    setWorkingDays(workingDates);
    setSelectedDate(workingDates[0]);
  };

  const generateTimeSlots = () => {
    const ctime = moment().format("HH:mm");
    const interval = timeInterval;
    const slots = [];
    let current = moment(data.attributes.doctor.data.attributes.Start_time.substring(0, 5), "HH:mm");
    const end = moment(data.attributes.doctor.data.attributes.End_time.substring(0, 5), "HH:mm");

    while (current.isBefore(end)) {
      slots.push(current.format("HH:mm"));
      current.add(interval, "minutes");
    }

    const filteredSlots = slots.filter(function (e) {
      return e >= ctime;
    });

    if (selectedDate != workingDays[0]) {
      setTimeSlots(slots);
    } else {
      setTimeSlots(filteredSlots);
    }
  };

  // function EditAppointment() {
  //   if (!selectedTime) {
  //     showToast("Please select time for Appointment");
  //     return null;
  //   }

  //   setIsloading(true);
  //   const data = {
  //     data: {
  //       PatientName: user?.fullName,
  //       Email: user?.primaryEmailAddress?.emailAddress,
  //       Date: selectedDate,
  //       Time: selectedTime,
  //       data: data.attributes.data.data.id,
  //       Note: notes || null,
  //       Phone: 9512595125,
  //       Status: "Upcoming",
  //       doctorImg:
  //         data.attributes.data.data.attributes.Profile_Img.data.attributes
  //           .url,
  //       categories: data.attributes.categories.data.map(
  //         (data: any) => data.id
  //       ),
  //       patient: 2,
  //     },
  //   };

  //   console.log(data)
  //   // GlobalApi.updateAppointment( data, id )
  //   //   .then(() => {
  //   //     setTimeout(() => {
  //   //       setIsloading(false);
  //   //       router.back();
  //   //     }, 2000);
  //   //   })
  //   //   .catch((error) => console.log(error));
  // }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <ScrollView
        overScrollMode="never"
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: Colors.background,
          paddingTop: 10,
          borderRadius: 20,
          borderWidth: 2,
          borderColor: Colors.border,
          height:
            moment.max(today, bookingTime) == bookingTime
              ? Dimensions.get("screen").height * 0.63
              : Dimensions.get("screen").height * 0.6,
        }}
      >
        {edit ? (
          <View style={{ gap: 12 }}>
            <Text
              style={{
                color: Colors.title,
                paddingLeft: 10,
                ...styles.h4title,
              }}
            >
              Update Appointment
            </Text>

            {/* DATE */}

            <AvailDate
              sevenDays={workingDays}
              setSelectedDate={(value: any) => setSelectedDate(value)}
              selectedDate={selectedDate}
            />

            {/* TIME */}

            <AvailTime
              timeList={timeSlots}
              setSelectedTime={(value: any) => setSelectedTime(value)}
              selectedTime={selectedTime}
              setdisabled={(value: any) => setdisabled(value)}
            />

            {/* NOTES */}

            <View style={{ gap: 10, paddingHorizontal: 10, marginBottom: 25 }}>
              <Text style={{ color: Colors.title + "90", ...styles.title }}>
                Add Note(if any)
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
                placeholder={
                  data.attributes.Note != "Blank note" &&
                  data.attributes.Note
                }
                editable={
                  moment.max(today, bookingTime) != bookingTime ? false : true
                }
              />
            </View>
          </View>
        ) : (
          <View style={{ gap: 16, paddingHorizontal: 20 }}>
            {/* DATE & TIME */}
            <View style={{ flexDirection: "row" }}>
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
                    {moment(bookingTime).format("ddd")}
                  </Text>
                  <Text style={[{ color: Colors.text, ...styles.h3title }]}>
                    {moment(bookingTime).format("DD MMM")}
                  </Text>
                </View>
              </View>

              <View style={{ gap: 12, width: "50%" }}>
                <Text style={{ color: Colors.text, ...styles.h4title }}>
                  Booking Time
                </Text>
                <View style={[styles.time, { width: 100 }]}>
                  <Text style={[{ color: Colors.text, ...styles.h4title }]}>
                    {moment(bookingTime).format("HH:mm")}
                  </Text>
                </View>
              </View>
            </View>

            {/* STATUS */}
            <View style={{ gap: 12, alignItems: "flex-start" }}>
              <Text style={{ color: Colors.text, ...styles.h4title }}>
                Appointment Status
              </Text>
              <Text
                style={{
                  fontFamily: "Inter",
                  fontSize: 15,
                  color: color,
                  paddingHorizontal: 16,
                  paddingVertical: 4,
                  borderWidth: 1,
                  borderColor: color,
                  borderRadius: 50,
                  backgroundColor: color + "10",
                }}
              >
                {status}
              </Text>
            </View>

            {/* NOTES */}
            <View style={{ gap: 12 }}>
              <Text style={{ color: Colors.text, ...styles.h4title }}>
                Your Note
              </Text>
              <Text style={{ ...styles.p }}>
                {data.attributes.Note != "Blank note"
                  ? data.attributes.Note
                  : "No notes"}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* BUTTONS */}
      {moment.max(today, bookingTime) == bookingTime && (
        <View style={{ paddingTop: 10 }}>
          {edit ? (
            <Button
              // onPress={() => EditAppointment()}
              borderRadius={50}
              disabled={disabled}
              size={"$5"}
              color={"white"}
              backgroundColor={Colors.tint}
              opacity={disabled ? 0.5 : 1}
              borderWidth={0}
              pressStyle={{ backgroundColor: Colors.tint + "90" }}
            >
              {isLoading ? (
                <ActivityIndicator size={"small"} color={Colors.background} />
              ) : (
                "Update"
              )}
            </Button>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Button
                onPress={() => console.log("Cancelled Appointment")}
                borderRadius={50}
                width={"49%"}
                size={"$5"}
                color={Colors.red}
                backgroundColor={Colors.red + "10"}
                borderWidth={0}
                pressStyle={{ backgroundColor: Colors.red + "20" }}
              >
                Cancel
              </Button>

              <Button
                onPress={() => setEdit(true)}
                borderRadius={50}
                width={"49%"}
                size={"$5"}
                color={Colors.tint}
                backgroundColor={Colors.tint + 10}
                borderWidth={0}
                icon={Edit3}
                pressStyle={{ backgroundColor: Colors.tint + "20" }}
              >
                Edit
              </Button>
            </View>
          )}
        </View>
      )}
    </View>
  );
}
