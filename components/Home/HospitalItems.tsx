import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Star, StarFull } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";
import Animated from "react-native-reanimated";

export default function HospitalItems({ hospital }: any) {
  return (
    <View
      style={{
        width: 250,
        borderRadius: 20,
        overflow: "visible",
        backgroundColor: Colors.background,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: 10,
      }}
    >
      <View>
        <Animated.Image
          source={{ uri: hospital.attributes.Image.data[0].attributes.url }}
          style={{ width: "100%", height: 150, borderRadius: 12 }}
          sharedTransitionTag="hospital"
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: Colors.green,
            borderRadius:6,
            position:"absolute",
            right:10,
            top:10
          }}
        >
          <StarFull size={16} color={Colors.background}/>
          <Text style={{ color:Colors.background,...styles.title }}>{hospital.attributes.Rating}</Text>
        </View>
      </View>
      <View style={{ paddingVertical: 12 }}>
        <Text
          style={{
            fontFamily: "InterSemiBold",
            fontSize: 16,
            color: Colors.title,
          }}
        >
          {hospital.attributes.Name.length > 25
            ? hospital.attributes.Name.substring(0, 25) + "..."
            : hospital.attributes.Name}
        </Text>
        <Text style={{ color: Colors.text, fontFamily: "InterRegular" }}>
          {hospital.attributes.Address.length > 55
            ? hospital.attributes.Address.substring(0, 55) + "..."
            : hospital.attributes.Address}
        </Text>
      </View>
    </View>
  );
}
