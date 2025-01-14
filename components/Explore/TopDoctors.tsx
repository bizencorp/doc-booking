import { View, FlatList, Pressable } from "react-native";
import React from "react";
import { useEffect } from "react";
import GlobalApi from "../../constants/GlobalApi";
import { useState } from "react";
import { router } from "expo-router";
import SubHeading from "../Home/SubHeading";
import DoctorCard from "./DoctorCard";

export default function TopDoctors() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = () => {
    GlobalApi.getDoctorList().then((resp) => {
      setDoctorList(resp.data.data);
    });
  };

  const sortedData = doctorList.length
    ? doctorList.sort(function (a: any, b: any) {
        return Number(b.attributes.Rating) - Number(a.attributes.Rating);
      })
    : doctorList;

  return (
    doctorList && (
      <View style={{ gap: 10, marginBottom: 16 }}>
        <SubHeading title={"Top rated doctors"} />
        <FlatList
          data={sortedData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }: any) => (
            <Pressable
              style={{ marginRight: 20, marginLeft: index == 0 ? 20 : 0 }}
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
    )
  );
}
