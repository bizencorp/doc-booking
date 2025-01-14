import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import PageHeader from "../components/Shared/PageHeader";
import HospitalDoctorTabs from "../components/HospitalDoctorScreen/HospitalDoctorTabs";
import HospitalListBig from "../components/HospitalDoctorScreen/HospitalListBig";
import DoctorList from "../components/HospitalDoctorScreen/DoctorList";
import { useEffect } from "react";
import GlobalApi from "@/constants/GlobalApi";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { styles } from "@/constants/Styles";

export default function HospitalDoctorList() {
  const { categoryName } = useLocalSearchParams();

  const [hospitalList, setHospitalList]: any[] = useState();
  const [doctorList, setDoctorList] = useState();
  const [activeTab, setActiveTab] = useState("Hospital");

  useEffect(() => {
    getHospitalByCategory();
    getDoctorByCategory();
  }, []);

  const getHospitalByCategory = () => {
    GlobalApi.getHospitalByCategories(categoryName).then((resp) => {
      setHospitalList(resp.data.data);
    });
  };

  const getDoctorByCategory = () => {
    GlobalApi.getDoctorByCategories(categoryName).then((resp) => {
      setDoctorList(resp.data.data);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pHeadwhite}>
        <PageHeader title={categoryName} rightBtn={"search"} />
      </View>
      <HospitalDoctorTabs
        activeTab={(value: string) => setActiveTab(value)}
        options={["Hospital", "Doctor", "Nurse"]}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
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
        ) : !DoctorList?.length ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.tint}
            style={{ marginTop: "50%" }}
          />
        ) : (
          <DoctorList doctorList={doctorList} />
        )}
      </ScrollView>
    </View>
  );
}
