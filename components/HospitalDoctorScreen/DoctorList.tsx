import { View, FlatList, Pressable } from "react-native";
import React from "react";
import DoctorCard from "./DoctorCard";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";

export default function DoctorList({ doctorList }: any) {
  return (
    <View style={{ paddingHorizontal: 20,}}>
      <FlatList
        scrollEnabled={false}
        data={doctorList}
        renderItem={({ item, index }) => (
          <Pressable
            style={[index == 0 && { marginTop: 16 }]}
            onPress={() =>
              router.navigate({
                pathname: "/DoctorDetail",
                params: { ddetail: JSON.stringify(item) },
              })
            }
          >
            <DoctorCard doctor={item} />
          </Pressable>
        )}
      />
    </View>
  );
}
