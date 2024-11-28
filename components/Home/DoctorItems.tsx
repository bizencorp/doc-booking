import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { Clock, MoveRight, Star } from "@tamagui/lucide-icons";

export default function DoctorItems({ doctor }: any) {
  const fromTime = doctor.attributes.Start_time;
  const toTime = doctor.attributes.End_time;

  function hrs(time: any) {
    let dt = moment();
    dt.hours(time.substring(0, 2));
    dt.minutes(time.substring(3, 5));
    dt.seconds(Number("00"));

    return dt;
  }

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 20,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.border,
        width: 300,
        gap: 8,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: 8,
        }}
      >
        <Image
          source={{ uri: doctor.attributes.Profile_Img.data.attributes.url }}
          style={{
            width: 60,
            borderRadius: 50,
            display: "flex",
            aspectRatio: "1",
            borderColor: Colors.lighttint,
            borderWidth: 1,
          }}
        />
        {doctor.attributes.Verified && (
          <View
            style={{
              position: "absolute",
              left: 50,
              top: 5,
            }}
          >
            <MaterialIcons name="verified" size={18} color={Colors.tint} />
          </View>
        )}

        <View
          style={{
            paddingHorizontal: 16,
            alignItems: "flex-start",
          }}
        >
          <Text
            style={{
              color: Colors.title,
              ...styles.h4title,
            }}
          >
            {doctor.attributes.Name}
          </Text>

          <Text
            style={{
              marginRight: 5,
              color: Colors.text,
              fontFamily: "InterRegular",
            }}
          >
            {doctor.attributes.categories.data[0].attributes.Name}
          </Text>
          <Text
            style={{
              marginRight: 5,
              color: Colors.text,
              fontFamily: "InterRegular",
            }}
          >
            {doctor.attributes.Year_of_Experience} years
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 12,
          paddingBottom: 8,
          borderTopWidth: 1,
          borderTopColor: Colors.tintGrey,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent:"center",
            gap: 2,
          }}
        >
          <Star color={Colors.rating} size={20} />
          <Text style={{ fontFamily: "InterRegular", color: Colors.rating }}>
            {doctor.attributes.Rating} (120 reviews)
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Clock color={Colors.tint} size={20} />
          <Text style={{ fontFamily: "InterRegular", color: Colors.tint }}>
            Opens at {hrs(fromTime).format("h A")}
          </Text>
        </View>
      </View>
    </View>
  );
}
