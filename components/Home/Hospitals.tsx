import { View, FlatList, Pressable } from "react-native";
import React from "react";
import SubHeading from "./SubHeading";
import { useEffect } from "react";
import GlobalApi from "../../constants/GlobalApi";
import { useState } from "react";
import HospitalItems from "./HospitalItems";
import { router } from "expo-router";

export default function Hospitals() {
  const [hospitalList, setHospitalList] = useState([]);

  useEffect(() => {
    getHospitals();
  }, []);

  const getHospitals = () => {
    GlobalApi.getHospital().then((resp) => {
      setHospitalList(resp.data.data);
    });
  };

  return (
    hospitalList && (
      <View style={{ gap: 10,marginBottom:16 }}>
        <SubHeading title={"Our Premium Hospitals"} />

        <FlatList
          style={{ overflow: "scroll", paddingBottom: 16 }}
          data={hospitalList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item,index }) => (
            <Pressable
              style={{ marginRight: 20, marginLeft:index == 0 ? 20 : 0 }}
              onPress={() =>
                router.navigate({
                  pathname: "/HospitalDetail",
                  params: { detail: JSON.stringify(item) },
                })
              }
            >
              <HospitalItems hospital={item} />
            </Pressable>
          )}
        />
      </View>
    )
  );
}
