import { View, FlatList, Pressable } from "react-native";
import React from "react";
import SubHeading from "./SubHeading";
import { useEffect } from "react";
import GlobalApi from "../../constants/GlobalApi";
import { useState } from "react";
import { router } from "expo-router";
import DoctorItems from "./DoctorItems";

export default function Doctors() {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    getDoctors();
  }, []);

  const getDoctors = () => {
    GlobalApi.getDoctorList().then((resp) => {
      setDoctorList(resp.data.data);
    });
  };

  return (
    doctorList && (
      <View style={{ gap: 10,marginBottom:16 }}>
        <SubHeading title={"Verified doctors"} />
        <FlatList
          data={doctorList}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }: any) =>
            item.attributes.Verified &&
            index <= 4 && (
              <Pressable
                style={{ marginRight: 20, marginLeft:index == 1 ? 20 : 0 }}
                onPress={() =>
                  router.navigate({
                    pathname: "/DoctorDetail",
                    params: { ddetail: JSON.stringify(item) },
                  })
                }
              >
                <DoctorItems doctor={item} />
              </Pressable>
            )
          }
        />
      </View>
    )
  );
}
