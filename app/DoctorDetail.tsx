import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/Shared/PageHeader";
import { Colors } from "@/constants/Colors";
import DoctorInfo from "@/components/DetailsPage/DoctorInfo";
import { router, useLocalSearchParams } from "expo-router";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from "react-native-reanimated";
import { styles } from "@/constants/Styles";

export default function DoctorDetail() {
  const params: any = useLocalSearchParams();
  const info = JSON.parse(params.ddetail);
  const [doctor, setDoctor]: any = useState();
  const [headerBG, setHeaderBG]: any = useState(false);

  useEffect(() => {
    setDoctor(info);
  }, []);

  const progress = useDerivedValue(() => {
    return headerBG ? withTiming(1) : withTiming(0);
  }, [headerBG]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [Colors.tintGrey, Colors.background]
    );
    return { backgroundColor };
  });

  const onScroll = (event: any) => {
    let scrollY = event.nativeEvent.contentOffset.y;
    scrollY > 180 ? setHeaderBG(true) : setHeaderBG(false);
  };

  return (
    doctor && (
      <>
        <Animated.View style={[styles.pHead, rStyle]}>
          <PageHeader
            title={headerBG ? doctor.attributes.Name : ""}
            rightBtn={"heart"}
          />
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
          overScrollMode="never"
        >
          <View
            style={{
              marginTop: 90,
              justifyContent: "center",
            }}
          >
            <DoctorInfo doctor={doctor} />
          </View>
        </ScrollView>

        <View
          style={{
            paddingHorizontal: 20,
            position: "absolute",
            width: "100%",
            bottom: 0,
            paddingVertical: 10,
            backgroundColor: "white",
          }}
        >
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/BookAppointment",
                params: { doctor: JSON.stringify(doctor) },
              })
            }
            style={{
              backgroundColor: Colors.tint,
              paddingVertical: 16,
              borderRadius: 12,
            }}
          >
            <Text
              style={{
                color: Colors.background,
                fontFamily: "InterRegular",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Book Appointment
            </Text>
          </TouchableOpacity>
        </View>
      </>
    )
  );
}
