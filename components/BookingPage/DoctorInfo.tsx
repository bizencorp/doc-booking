import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

export default function DoctorInfo({ doctor = {}, data = {}}:any) {
  const comma = () => {
    return <Text style={{ color: Colors.text }}>, </Text>;
  };

  const img = data.img ?? doctor.attributes.Profile_Img.data.attributes.url;

  return (
    <View style={{ paddingBottom: 20, gap: 20, paddingTop: 10 }}>
      <View
        style={{
          paddingHorizontal: 35,
          flexDirection: "row",
          gap: 15,
        }}
      >
        <View
          style={{
            width: "30%",
            height: 100,
            overflow: "hidden",
            borderRadius: 16,
          }}
        >
          <Image source={{ uri: img }} style={{ width: "100%", height: 100 }} />
        </View>

        <View style={{ width: "60%", justifyContent: "center", gap: 4 }}>
          <Text
            style={{
              fontFamily: "InterSemiBold",
              color: Colors.title,
              fontSize: 16,
            }}
          >
            {data.name ?? doctor.attributes.Name}
          </Text>
          
          <Text
            style={{
              color: Colors.text,
              fontFamily: "InterRegular",
            }}
          >
            {data.category ??
              doctor.attributes.categories.data[0].attributes.Name}
          </Text>

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
    </View>
  );
}
