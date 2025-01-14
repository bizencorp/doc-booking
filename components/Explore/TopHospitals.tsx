import { View, FlatList, Pressable } from "react-native";
import React from "react";
import { useEffect } from "react";
import GlobalApi from "../../constants/GlobalApi";
import { useState } from "react";
import { router } from "expo-router";
import SubHeading from "../Home/SubHeading";
import HospitalCard from "./HospitalCard";

export default function TopHospitals() {
  const [hospitalList, setHospitalList] = useState([]);

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = () => {
    GlobalApi.getHospital().then((resp) => {
      setHospitalList(resp.data.data);
    });
  };

  const sortedData = hospitalList.length
    ? hospitalList.sort(function (a: any, b: any) {
        return Number(b.attributes.Rating) - Number(a.attributes.Rating);
      })
    : hospitalList;

  return (
    hospitalList && (
      <View style={{ gap: 10, marginBottom: 16 }}>
        <SubHeading title={"Top rated hospitals"} />

        <FlatList
          style={{ overflow: "scroll", paddingBottom: 16 }}
          data={sortedData}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Pressable
              style={{ marginRight: 20, marginLeft: index == 0 ? 20 : 0 }}
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
    )
  );
}
