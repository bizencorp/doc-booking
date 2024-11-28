import { View, Text, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import PageHeader from "../components/Shared/PageHeader";
import HospitalDoctorTabs from "../components/HospitalDoctorScreen/HospitalDoctorTabs";
import HospitalListBig from "../components/HospitalDoctorScreen/HospitalListBig";
import DoctorList from "../components/HospitalDoctorScreen/DoctorList";
import { useEffect } from "react";
import GlobalApi from "@/constants/GlobalApi";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";


export default function HospitalDoctorList() {
  const {categoryName} = useLocalSearchParams();

  const [hospitalList, setHospitalList] : any[] = useState()
  const [doctorList, setDoctorList] = useState()
  const [activeTab, setActiveTab] = useState('Hospital')

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
    <View>
      <View
        style={{
          position: "absolute",
          top: 0,
          backgroundColor: Colors.background,
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 10,
          gap: 6,
          zIndex: 2,
          width:'100%'
        }}
      >
        <PageHeader title={categoryName} rightBtn={"search"} />
        <HospitalDoctorTabs
          activeTab={(value: string) => setActiveTab(value)}
        />
      </View>

      <View style={{ marginTop: 165}}>
        {activeTab == "Hospital" ? (
          !hospitalList?.length ? (
            <ActivityIndicator
              size={"large"}
              color={Colors.tint}
              style={{ marginTop: "50%" }}
            />
          ) : (
            <HospitalListBig hospitalList={hospitalList}/>
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
      </View>
    </View>
  );
}
 