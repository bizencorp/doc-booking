import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "@/constants/Styles";
import { ArrowLeft, Heart, Search } from "@tamagui/lucide-icons";
import { Button } from "tamagui";

export default function PageHeader({ title, rightBtn }: any) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button
        onPress={() => router.back()}
        icon={ArrowLeft}
        backgroundColor={"white"}
        borderWidth={0}
        color={Colors.title}
        padding={10}
        scaleIcon={1.6}
        borderRadius={12}
        pressStyle={{ backgroundColor: Colors.tintGrey }}
      />

      <Text style={styles.h4title}>{title}</Text>

      {rightBtn == "search" ? (
        <Button
          icon={Search}
          color={Colors.title}
          borderWidth={0}
          backgroundColor={"white"}
          padding={10}
          scaleIcon={1.6}
          borderRadius={12}
          pressStyle={{ backgroundColor: Colors.tintGrey }}
        />
      ) : rightBtn == "heart" ? (
        <Button
          icon={Heart}
          borderWidth={0}
          backgroundColor={"white"}
          color={Colors.title}
          padding={10}
          scaleIcon={1.6}
          borderRadius={12}
          pressStyle={{ backgroundColor: Colors.border }}
        />
      ) : (
        <View style={{width: 42,}}/>
      )}
    </View>
  );
}
