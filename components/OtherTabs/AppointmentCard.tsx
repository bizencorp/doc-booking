import { View, Text, Image, Dimensions } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import moment from "moment";
import { Button } from "tamagui";
import { CalendarClock, Clock, NotepadText } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";
import { router } from "expo-router";

export default function AppointmentCard({ data, btnShow = false }: any) {

  const today = moment()
  const bookingTime = moment(data.attributes.Date+data.attributes.Time, "YYYY-MM-DD"+"HH:mm");

  const status =
    moment.max(today, bookingTime) == today && data.attributes.Status == "Upcoming" ? "Unattended" :data.attributes.Status;
  const color =
    status == "Upcoming"
      ? Colors.rating
      : status == "Attended"
      ? Colors.green
      : Colors.red;

  return (
    <>
      <View
        style={{
          backgroundColor:
            status == "Upcoming" ? Colors.background : Colors.tintGrey,
          borderRadius: 20,
          marginBottom: 16,
          padding: 12,
          gap: 14,
          borderWidth: status == "Upcoming" ? 2 : 0,
          borderColor: Colors.tintGrey,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingBottom: status == "Upcoming" ? 12 : 0,
            borderBottomColor: Colors.tintGrey,
            borderBottomWidth: status == "Upcoming" ? 2 : 0,
          }}
        >
          <Image
            source={{ uri: data.attributes.doctorImg }}
            style={{
              width: 70,
              borderRadius: 14,
              aspectRatio: "1",
              borderColor: Colors.lighttint,
              borderWidth: 1,
            }}
          />

          <View
            style={{
              paddingHorizontal: 16,
              alignItems: "flex-start",
              justifyContent: "center",
              gap:4
            }}
          >
            <Text style={{ color: Colors.title, ...styles.h4title }}>
              {data.attributes.doctor.data.attributes.Name}
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 3,
                alignItems: "center",
              }}
            >
              <CalendarClock size={18} color={Colors.text} />
              <Text
                style={{
                  fontFamily: "Inter",
                  color: Colors.text,
                  fontSize: 12,
                }}
              >
                {bookingTime.format("DD MMM")} • {bookingTime.format("h:mm a")}
              </Text>
            </View>
            {/* <Text
              style={{
                marginRight: 5,
                color: Colors.text,
                fontFamily: "InterRegular",
              }}
            >
              {data.attributes.category.data.attributes.Name}
            </Text> */}
          </View>
          <Text
            style={{
              color: color,
              backgroundColor: color + "10",
              ...styles.status,
            }}
          >
            {status}
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: status == "Upcoming" ? "space-between" : "center",
          }}
        >
          {status == "Upcoming" && !btnShow && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 3,
                alignItems: "center",
              }}
            >
              <CalendarClock size={20} color={Colors.text} />
              <Text
                style={{
                  fontFamily: "Inter",
                  color: Colors.text,
                  fontSize: 14,
                }}
              >
                {bookingTime.format("DD MMM")} • {bookingTime.format("h:mm a")}
              </Text>
            </View>
          )}

          {!btnShow && (
            <Button
              onPress={() =>
                router.navigate({
                  pathname: "/EditBooking",
                  params: { doctor: JSON.stringify(data) },
                })
              }
              size="$4"
              theme={"blue"}
              backgroundColor={
                status == "Upcoming" ? Colors.tintGrey : Colors.border
              }
              pressStyle={{
                backgroundColor: Colors.lighttint,
                borderColor: Colors.border,
              }}
              width={
                status == "Upcoming"
                  ? "50%"
                  : Dimensions.get("screen").width - 72
              }
              borderRadius={30}
              fontSize={15}
              color={Colors.tint}
              scaleIcon={1.3}
              icon={NotepadText}
            >
              View details
            </Button>
          )}
        </View>

        {btnShow && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              paddingHorizontal: 4,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 5,
                alignItems: "center",
              }}
            >
              <CalendarClock size={20} color={Colors.text} />
              <Text
                style={{
                  fontFamily: "InterSemiBold",
                  color: Colors.text,
                  fontSize: 14,
                }}
              >
                {bookingTime.format("DD/MM/YYYY")}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                gap: 5,
              }}
            >
              <Clock size={20} color={Colors.text} />
              <Text
                style={{
                  fontFamily: "InterSemiBold",
                  color: Colors.text,
                  fontSize: 14,
                }}
              >
                {bookingTime.format("hh:mm A")}
              </Text>
            </View>
          </View>
        )}
      </View>
    </>
  );
}
