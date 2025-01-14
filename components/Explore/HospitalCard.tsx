import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Heart, Star, StarFull } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";
import Animated from "react-native-reanimated";

export default function HospitalCard({ hospital }: any) {
  return (
    <View
      style={{
        borderRadius: 24,
        width: 260,
        overflow: "hidden",
      }}
    >
      <Animated.Image
        source={{ uri: hospital.attributes.Image.data[0].attributes.url }}
        style={{ aspectRatio: 5 / 4, width: 260 }}
        sharedTransitionTag="hospital"
      />

      <View
        style={{
          width: 260,
          backgroundColor: "#00000020",
          aspectRatio: 5 / 4,
          position: "absolute",
          top: 0,
        }}
      />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 2,
          backgroundColor: Colors.background,
          borderRadius: 30,
          paddingVertical: 4,
          paddingHorizontal: 8,
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <StarFull size={14} color={Colors.rating} />
        <Text style={{ color: Colors.title, fontSize: 10, ...styles.title }}>
          {hospital.attributes.Rating}
        </Text>
      </View>

      <View
        style={{
          paddingVertical: 12,
          paddingHorizontal: 12,
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      >
        <Text style={{ color: Colors.background, ...styles.h4title }}>
          {hospital.attributes.Name.length > 30
            ? hospital.attributes.Name.substring(0, 30) + "..."
            : hospital.attributes.Name}
        </Text>

        <Text style={{ fontFamily: "Inter", color: "#ffffff", opacity:0.85 }}>
          {hospital.attributes.Address.substring(0, 30) + "..."}
        </Text>

        <TouchableOpacity style={{}}>
          <Heart />
        </TouchableOpacity>
      </View>
    </View>
  );
}
