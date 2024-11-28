import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import moment from "moment";
import { Button,} from "tamagui";
import { BriefcaseBusiness, Clock, Star } from "@tamagui/lucide-icons";

export default function DoctorCard({ doctor }:any) {
  const [isFocused, setIsFocused] : any = useState();

  const onPress = () => setIsFocused(!isFocused)
 
  const fromTime = doctor.attributes.Start_time;
  const toTime = doctor.attributes.End_time;

  function hrs(time: any) {
    let dt = moment();
    dt.hours(time.substring(0, 2));
    dt.minutes(time.substring(3, 5));
    dt.seconds(Number("00"));

    return dt;
  }



  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 20,
        marginBottom: 16,
        padding: 20,
        gap:16
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: doctor.attributes.Profile_Img.data.attributes.url }}
          style={{
            width: 65,
            borderRadius: 50,
            display: "flex",
            aspectRatio: "1",
            borderColor: Colors.lighttint,
            borderWidth: 1,
          }}
        />

        <View
          style={{
            paddingHorizontal: 16,
            alignItems: "flex-start",
          }}
        >
          {doctor.attributes.Verified == true && (
            <View
              style={{
                backgroundColor: Colors.tintGrey,
                padding: 4,
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
              }}
            >
              <MaterialIcons name="verified" size={18} color={Colors.tint} />
              <Text style={{ color: Colors.tint, fontFamily: "InterSemiBold" }}>
                Verified
              </Text>
            </View>
          )}
          <Text
            style={{
              color: Colors.title,
              ...styles.h3title,
            }}
          >
            {doctor.attributes.Name}
          </Text>

          {/* <FlatList
            data={doctor.attributes.categories.data}
            style={{ flexGrow: 0 }}
            horizontal={true}
            renderItem={({ item, index }) =>
              index < 3 && ( */}
          <Text
            style={{
              marginRight: 5,
              color: Colors.text,
              fontFamily: "InterRegular",
            }}
          >
            {doctor.attributes.categories.data[0].attributes.Name}
          </Text>
          {/* )
            }
          /> */}
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

      <View
        style={{
          paddingTop: 14,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderTopWidth:2,
          borderColor:Colors.border
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
          <Text style={{ fontFamily: "InterSemiBold", color: Colors.rating }}>
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
          <Text style={{ fontFamily: "InterSemiBold", color: Colors.text }}>
            {doctor.attributes.Year_of_Experience} years
          </Text>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            gap: 3,
          }}
        >
          <Clock color={Colors.text} size={20} />
          <Text style={{ fontFamily: "InterSemiBold", color: Colors.text }}>
            {hrs(fromTime).format("h A")}
            {" - "}
            {hrs(toTime).format("h A")}
          </Text>
        </View>
      </View>

      {/* <TouchableOpacity
        onPress={() =>
          router.navigate({
            pathname: "/BookAppointment",
            params: { doctor: JSON.stringify(doctor) },
          })
        }
        style={{
          backgroundColor: Colors.lighttint,
          width: "100%",
          paddingVertical: 12,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.tint,
            fontFamily: "InterSemiBold",
            fontSize: 16,
          }}
        >
          Make Appointment
        </Text>
      </TouchableOpacity> */}

      {/* <Button
        onPress={() =>
          router.navigate({
            pathname: "/BookAppointment",
            params: { doctor: JSON.stringify(doctor) },
          })
        }
        size={"$5"}
        borderRadius={"$5"}
        theme={"gray"}
        backgroundColor={Colors.tintGrey}
        color={Colors.title}
        pressStyle={{backgroundColor:Colors.border}}
      >
        Make Appointment
      </Button> */}
    </View>
  );
}
