import { View, Text, TouchableOpacity, FlatList, Pressable } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { Stethoscope, Syringe } from "@tamagui/lucide-icons";
import SubHeading from "./SubHeading";

export default function DoctorNurseBtn() {
  const btns = [
    {
      name: "Nurse",
      icon: "nurse",
      bgColor: Colors.tintGrey,
      color: Colors.tint,
    },
    {
      name: "Doctor",
      icon: "doctor",
      bgColor: Colors.tint,
      color: Colors.background,
    },
  ];

  return (
    <View style={{ gap: 10, marginBottom: 16 }}>
      <SubHeading title={"Explore"} more={false}/>

      <FlatList
        data={btns}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-between",
          gap: 10,
          paddingHorizontal: 20,
        }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => console.log(item.name + " Btn Pressed")}
            style={{
              alignItems: "center",
              backgroundColor: item.bgColor,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: Colors.border,
              width: "48%",
              padding: 8,
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 10,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.border,
                padding: 16,
                borderRadius: 14,
              }}
            >
              {item.icon == "nurse" ? (
                <Syringe size={22} color={item.color} style={{}} />
              ) : (
                <Stethoscope size={22} color={item.bgColor} />
              )}
            </View>
            <Text style={{ color: item.color, ...styles.h2title }}>
              {item.name}
            </Text>
          </Pressable>
        )}
      />
    </View>
  );
}
