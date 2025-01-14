import { View, Text, TextInput, Dimensions } from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import { Search } from "@tamagui/lucide-icons";

export default function SearchBar({ setSearchText, bg=false }: any) {
  return (
    <View
      style={{
        paddingHorizontal: bg ? 0 : 20,
        paddingVertical: bg ? 0 : 16,
        marginBottom: bg ? 0 : 6,
      }}
    >
      {bg ? (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            paddingHorizontal: 16,
            paddingVertical:8,
            borderRadius:50,
            backgroundColor: bg ? Colors.tintGrey : Colors.background + "30",
          }}
        >
          <Search color={bg ? Colors.text : Colors.background} size={22} />
          <TextInput
            style={{
              width: "100%",
              fontFamily: "InterRegular",
              color: bg ? Colors.text : Colors.background,
              fontSize: 14,
            }}
            clearButtonMode="always"
            placeholder="Search by doctor or category"
            placeholderTextColor={bg ? Colors.text : Colors.background}
            onChangeText={(value: any) => setSearchText(value)}
          />
        </View>
      ) : (
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            padding: 16,
            borderRadius: 16,
            backgroundColor: Colors.background+"30",
          }}
        >
          <Search color={bg ? Colors.text : Colors.background} />
          <TextInput
            style={{
              width: "100%",
              fontFamily: "InterRegular",
              color: Colors.background,
              fontSize: 15,
            }}
            clearButtonMode="always"
            placeholder="Search Doctor or Health issue"
            placeholderTextColor={Colors.background}
            onChangeText={(value: any) => setSearchText(value)}
          />
        </View>
      )}
    </View>
  );
}
