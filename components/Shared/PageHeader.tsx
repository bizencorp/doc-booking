import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { TabBarIcon } from "../navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { Feather, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { styles } from "@/constants/Styles";
import { ArrowLeft, Heart, Search } from "@tamagui/lucide-icons";
import { Button } from "tamagui";


export default function PageHeader({ title, rightBtn  }:any) {
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
        backgroundColor={Colors.tintGrey}
        color={Colors.title}
        padding={10}
        scaleIcon={1.6}
        borderRadius={12}
      />

      <Text style={styles.h4title}>{title}</Text>

      {rightBtn == "search" ? (
        <Button
          icon={Search}
          color={Colors.title}
          backgroundColor={Colors.tintGrey}
          padding={10}
          scaleIcon={1.6}
          borderRadius={12}
        />
      ) : rightBtn == "heart" ? (
        <Button
          icon={Heart}
          backgroundColor={Colors.tintGrey}
          color={Colors.title}
          padding={10}
          scaleIcon={1.6}
          borderRadius={12}
        />
      ) : (
        <View
          style={{
            padding: 10,
            borderRadius: 12,
          }}
        >
          <Ionicons name="heart" size={24} color={"transparent"} />
        </View>
      )}
    </View>
  );
}
