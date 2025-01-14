import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function DoctorInfo({ doctor = {}, data = {} }: any) {

  const img = data.img ?? doctor.attributes.Profile_Img.data.attributes.url;

  return (
    <View
      style={{
        paddingHorizontal: 20,
        flexDirection: "row",
        gap: 15,
        height:140,
        paddingTop:10,
      }}
    >
      <Image
        source={{ uri: img }}
        style={{
          width: 90,
          borderRadius: 16,
          aspectRatio: "4/5",
        }}
      />

      <View style={{ justifyContent: "center", gap: 4 }}>
        <Text
          style={{
            fontFamily: "InterSemiBold",
            color: Colors.title,
            fontSize: 16,
          }}
        >
          {data.name ?? doctor.attributes.Name}
        </Text>

        {/* <Text
          style={{
            color: Colors.text,
            fontFamily: "InterRegular",
          }}
        >
          {data.category ??
            doctor.attributes.category.data.attributes.Name}
        </Text> */}

        {/* <Text
            style={{
              fontFamily: "InterRegular",
              color: Colors.text,
            }}
          >
            {data.adr ?? doctor.attributes.Address}
          </Text> */}
      </View>
    </View>
  );
}
