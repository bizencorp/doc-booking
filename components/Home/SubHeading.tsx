import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Button } from "tamagui";
import { ChevronRight } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";

export default function SubHeading({ title, more = true }: any) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
      }}
    >
      <Text style={{ color: Colors.title, ...styles.h4title }}>{title}</Text>
      {more && (
        <Button
          // iconAfter={ChevronRight}
          scaleIcon={1.6}
          chromeless
          color={Colors.text}
          padding={0}
          borderWidth={0}
          height={30}
          fontSize={12}
          pressStyle={{backgroundColor:"transparent"}}
        >See all</Button>
      )}
    </View>
  );
}
