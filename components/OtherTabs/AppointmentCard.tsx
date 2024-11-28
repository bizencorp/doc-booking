import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "../navigation/TabBarIcon";
import moment from "moment";
import { AlertDialog, Button, XStack, YStack } from "tamagui";
import { CalendarClock, Clock, NotepadText } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";
import { router } from "expo-router";

export default function AppointmentCard({ data, btnShow = false }: any) {
  const comma = () => {
    return <Text style={{ color: Colors.text }}>, </Text>;
  };

  const time = moment(data.attributes.Time);

  const status = data.attributes.Status;
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
          padding: 16,
          gap: 14,
          borderWidth: status == "Upcoming" ? 2 : 0,
          borderColor: Colors.tintGrey,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            // backgroundColor:
            //   status == "Upcoming" ? Colors.tintGrey : Colors.background,
            // paddingHorizontal: 8,
            paddingBottom: 12,
            borderBottomColor: Colors.tintGrey,
            borderBottomWidth: 2,
          }}
        >
          <Image
            source={{ uri: data.attributes.doctorImg }}
            style={{
              width: 60,
              borderRadius: 15,
              display: "flex",
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
            }}
          >
            <Text style={{ color: Colors.title, ...styles.h3title }}>
              {data.attributes.doctor.data.attributes.Name}
            </Text>

            <Text
              style={{
                marginRight: 5,
                color: Colors.text,
                fontFamily: "InterRegular",
              }}
            >
              {data.attributes.categories.data[0].attributes.Name}
            </Text>
          </View>
        </View>

        {status == "Upcoming" && !btnShow &&
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
              {time.format("DD/MM/YYYY")}
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
              {time.format("hh:mm A")}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              gap: 5,
              alignItems: "center",
            }}
          >
            <TabBarIcon name="circle" color={color} size={10} />
            <Text
              style={{
                fontFamily: "InterSemiBold",
                color: Colors.text,
                fontSize: 14,
              }}
            >
              {status}
            </Text>
          </View>
        </View>
        }

        {btnShow&&
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
              {time.format("DD/MM/YYYY")}
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
              {time.format("hh:mm A")}
            </Text>
          </View>

        </View>
        }

        {!btnShow &&
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
          borderRadius={30}
          fontSize={15}
          color={Colors.tint}
          scaleIcon={1.3}
          icon={NotepadText}
        >
          View details
        </Button>}
      </View>
    </>
  );
}
