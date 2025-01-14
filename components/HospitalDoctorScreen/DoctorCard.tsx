import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BriefcaseBusiness, Clock, Star } from "@tamagui/lucide-icons";

export default function DoctorCard({ doctor }: any) {
  const [isFocused, setIsFocused]: any = useState();

  const onPress = () => setIsFocused(!isFocused);
  

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 20,
        marginBottom: 16,
        padding: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Image
          source={{ uri: doctor.attributes.Profile_Img.data.attributes.url }}
          style={{
            width: 90,
            borderRadius: 14,
            display: "flex",
            aspectRatio: "4/5",
            borderColor: Colors.lighttint,
            borderWidth: 1,
          }}
        />

        <View style={{ justifyContent: "space-between",alignItems:"flex-start" }}>
          <View>
            {doctor.attributes.Verified == true && (
              <View
                style={{
                  flexDirection: "row",
                  gap: 4,
                }}
              >
                <MaterialIcons name="verified" size={16} color={Colors.tint} />
                <Text
                  style={{ color: Colors.tint, fontFamily: "Inter",fontSize:12 }}
                >
                  Verified
                </Text>
              </View>
            )}

            <Text style={{ color: Colors.title, ...styles.h4title }}>
              {doctor.attributes.Name}
            </Text>

            <Text style={styles.p}>
              {doctor.attributes.category.data.attributes.Name}
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 8,
              backgroundColor: Colors.border+"50",
              width: "84%",
              borderRadius: 12,
              borderColor:Colors.tintGrey
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <Star color={Colors.rating} size={22} />
              <Text style={{ fontFamily: "Inter", color: Colors.rating }}>
                {doctor.attributes.Rating} star
              </Text>
            </View>

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 2,
              }}
            >
              <BriefcaseBusiness color={Colors.text} size={22} />
              <Text style={{ fontFamily: "Inter", color: Colors.text }}>
                {doctor.attributes.Year_of_Experience} years
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={onPress}
          style={{
            padding: 5,
            backgroundColor: Colors.tintGrey,
            borderRadius: 50,
            position: "absolute",
            right: 0,
            top: 0,
          }}
        >
          <Ionicons
            name={isFocused ? "heart" : "heart-outline"}
            size={24}
            color={Colors.tint}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
