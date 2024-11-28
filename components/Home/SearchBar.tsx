import { View, Text, TextInput, Dimensions } from "react-native";
import React from "react";
import {Colors} from "@/constants/Colors";
import { useState } from "react";
import { Search } from "@tamagui/lucide-icons";

export default function SearchBar({ setSearchText }: any) {
  const [searchInput, setSearchInput] = useState();
  return (
    <View style={{ paddingHorizontal: 20,paddingVertical:16, backgroundColor:Colors.tint,marginBottom:6 }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 6,
            alignItems: "center",
            padding: 16,
            borderRadius: 16,
            backgroundColor: "#ffffff30",
            // borderWidth: 1,
            // borderColor: Colors.tintGrey,
          }}
        >
          <Search color={Colors.background} />
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
            onChangeText={(value: any) => setSearchInput(value)}
            onSubmitEditing={() => setSearchText(searchInput)}
          />
        </View>
    </View>
  );
}
