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
      <Text style={{ color: Colors.title, ...styles.h3title }}>{title}</Text>
      {more && (
        <Button
          icon={ChevronRight}
          scaleIcon={1.6}
          chromeless
          color={Colors.text}
          padding={0}
        />
      )}
    </View>
  );
}
