import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import GlobalApi from "@/constants/GlobalApi";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import HospitalDoctorTabs from "@/components/HospitalDoctorScreen/HospitalDoctorTabs";
import HospitalListBig from "@/components/HospitalDoctorScreen/HospitalListBig";
import DoctorList from "@/components/HospitalDoctorScreen/DoctorList";

export default function Explore() {
  const [hospitalList, setHospitalList]: any = useState();
  const [doctorList, setDoctorList] :any = useState();
  const [activeTab, setActiveTab] = useState("Hospital");

  useEffect(() => {
    getHospitals();
    getDoctors();
  }, []);

  const getHospitals = () => {
    GlobalApi.getHospitalList().then((resp) => {
      setHospitalList(resp.data.data);
    });
  };

  const getDoctors = () => {
    GlobalApi.getDoctorList().then((resp) => {
      setDoctorList(resp.data.data);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: Colors.background,
          paddingHorizontal: 20,
          paddingTop: 45,
          alignItems: "center",
          paddingBottom: 10,
          zIndex: 2,
          width: "100%",
        }}
      >
        <Text style={styles.h1title}>Explore</Text>
        <HospitalDoctorTabs
          activeTab={(value: string) => setActiveTab(value)}
        />
      </View>

      <View style={{ marginTop: 155, paddingBottom: 75 }}>
        {activeTab == "Hospital" ? (
          !hospitalList?.length ? (
            <ActivityIndicator
              size={"large"}
              color={Colors.tint}
              style={{ marginTop: "50%" }}
            />
          ) : (
            <HospitalListBig hospitalList={hospitalList} />
          )
        ) : !doctorList?.length ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.tint}
            style={{ marginTop: "50%" }}
          />
        ) : (
          <DoctorList doctorList={doctorList} />
        )}
      </View>
    </View>
  );
}
