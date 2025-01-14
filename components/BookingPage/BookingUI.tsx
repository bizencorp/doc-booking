import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  ToastAndroid,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
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
import AvailDate from "./AvailDate";
import AvailTime from "./AvailTime";

export default function BookingUI({ info }: any) {
  const doctor = info;

  const [workingDays, setWorkingDays]: any = useState([]);
  const [timeSlots, setTimeSlots]: any = useState([]);
  const [selectedDate, setSelectedDate]: any = useState();
  const [selectedTime, setSelectedTime]: any = useState();
  const [notes, setNotes]: any = useState();
  const [isLoading, setIsloading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [disabled, setdisabled] = useState(true);
  const timeInterval = Number(
    doctor.attributes.Interval_for_Booking.substring(1, 3)
  );

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  function showToast(Msg: string) {
    ToastAndroid.show(Msg, ToastAndroid.TOP);
  }

  useEffect(() => {
    generateWorkingDays();
  }, []);

  useEffect(() => {
    generateTimeSlots();
    setSelectedTime(null);
    setdisabled(true);
  }, [selectedDate]);

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
    let current = moment(doctor.attributes.Start_time.substring(0, 5), "HH:mm");
    const end = moment(doctor.attributes.End_time.substring(0, 5), "HH:mm");

    while (current.isBefore(end)) {
      slots.push(current.format("HH:mm"));
      current.add(interval, "minutes");
    }

    const filteredSlots = slots.filter((e) => {return e >= ctime});

    if (selectedDate != workingDays[0]) {
      setTimeSlots(slots);
    } else {
      setTimeSlots(filteredSlots);
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
        patient: 2,
        // categories: doctor.attributes.categories.data.map(
        //   (data: any) => data.id
        // ),
      },
    };
    // console.log(data);

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ paddingHorizontal: 10, flex: 1, paddingBottom: 10 }}>
        {showSuccess && <ThankYou />}

        <ScrollView
          overScrollMode="never"
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: Colors.background,
            paddingTop: 20,
            borderRadius: 24,
            borderWidth: 2,
            borderColor: Colors.border,
            height: Dimensions.get("screen").height * 0.63,
          }}
        >
          <View style={{ gap: 12 }}>
            <AvailDate
              workingDays={workingDays}
              setSelectedDate={(value: any) => setSelectedDate(value)}
              selectedDate={selectedDate}
            />

            <AvailTime
              timeList={timeSlots}
              setSelectedTime={(value: any) => setSelectedTime(value)}
              selectedTime={selectedTime}
              setdisabled={(value: any) => setdisabled(value)}
            />

            {/* ADD NOTES */}
 
            <View style={{ gap: 10, paddingHorizontal: 10, marginBottom: 30 }}>
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
          </View>
        </ScrollView>

        {/* BUTTON */}
        <View style={{ paddingTop: 10 }}>
          <Button
            onPress={() => Appointment()}
            borderRadius={50}
            theme={"blue"}
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
              "Book Appointment"
            )}
          </Button>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
