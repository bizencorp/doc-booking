import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "@/constants/Styles";

export default function DoctorInfoBig({ data }: any) {
  return (
    <View
      style={{
        gap: 1,
        backgroundColor: Colors.tintGrey,
        paddingBottom: 20,
        alignItems: "center",
        paddingHorizontal: 20,
      }}
    >
      <View
        style={{
          width: 150,
          height: 150,
          overflow: "hidden",
          borderRadius: 20,
          borderWidth: 1,
          borderColor: Colors.border,
        }}
      >
        <Image
          source={{ uri: data.img }}
          style={{
            height: 200,
          }}
        />
        {data.verified == true && (
          <View
            style={{
              backgroundColor: Colors.background,
              paddingVertical: 4,
              paddingHorizontal: 10,
              borderRadius: 50,
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
              position: "absolute",
              right: 5,
              bottom: 5,
            }}
          >
            <MaterialIcons name="verified" size={18} color={Colors.tint} />
            <Text style={{ color: Colors.tint, fontFamily: "InterSemiBold" }}>
              Verified
            </Text>
          </View>
        )}
      </View>

      <Text style={styles.h2title}>{data.name}</Text>

      {/* <Text style={{ fontSize: 16, ...styles.p }}>{data.category}</Text> */}
    </View>
  );
}
