import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import PageHeader from "@/components/Shared/PageHeader";
import { Colors } from "@/constants/Colors";
import HospitalInfo from "@/components/DetailsPage/HospitalInfo";
import { router, useLocalSearchParams } from "expo-router";
import Animated, { interpolateColor, useAnimatedStyle, useDerivedValue, withTiming } from "react-native-reanimated";
import { styles } from "@/constants/Styles";

export default function HospitalDetail() {
  const params: any = useLocalSearchParams();
  const info = JSON.parse(params.detail);
  const [hospital, setHospital]: any = useState();
    const [headerBG, setHeaderBG]: any = useState(false);


  useEffect(() => {
    setHospital(info);
  }, []);

  const progress = useDerivedValue(() => {
    return headerBG ? withTiming(1) : withTiming(0);
  }, [headerBG]);

  const rStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", Colors.background]
    );
    return { backgroundColor };
  });

  const onScroll = (event: any) => {
    let scrollY = event.nativeEvent.contentOffset.y;
    scrollY > 100 ? setHeaderBG(true) : setHeaderBG(false);
  };

  return (
    hospital && (
      <View>
        <Animated.View style={[styles.pHead, rStyle]}>
          <PageHeader title={headerBG ? hospital.attributes.Name : ""} rightBtn="heart" />
        </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}
          scrollEventThrottle={16}
        >
          <View style={{ padding: 10 }}>
            <Animated.Image
              source={{ uri: hospital.attributes.Image.data[0].attributes.url }}
              style={{ width: "100%", height: 260, borderRadius: 20 }}
              sharedTransitionTag="hospital"
            />
          </View>

          <View
            style={{
              backgroundColor: Colors.background,
              paddingVertical: 20,
            }}
          >
            <HospitalInfo hospital={hospital} />
          </View>
        </ScrollView>
      </View>
    )
  );
}
