import { View, Text, FlatList, Pressable } from "react-native";
import React from "react";
import HospitalCard from "./HospitalCard";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function HospitalListBig({ hospitalList} : any) {
  return (
    <View style={{ paddingHorizontal: 20}}>
      <FlatList
        style={{  }}
        scrollEnabled={false}
        data={hospitalList}
        renderItem={({ item, index }) => (
          <Pressable
            style={[index == 0 && { marginTop: 16 }]}
            onPress={() =>
              router.navigate({
                pathname: "/HospitalDetail",
                params: { detail: JSON.stringify(item) },
              })
            }
          >
            <HospitalCard hospital={item} />
          </Pressable>
        )}
      />
    </View>
  );
}
