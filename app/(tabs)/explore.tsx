import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import { useEffect } from "react";
import GlobalApi from "@/constants/GlobalApi";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import HospitalDoctorTabs from "@/components/HospitalDoctorScreen/HospitalDoctorTabs";
import HospitalListBig from "@/components/HospitalDoctorScreen/HospitalListBig";
import DoctorList from "@/components/HospitalDoctorScreen/DoctorList";
import SearchBar from "@/components/Home/SearchBar";
import Categories from "@/components/Explore/Categories";
import TopDoctors from "@/components/Explore/TopDoctors";
import TopHospitals from "@/components/Explore/TopHospitals";

export default function Explore() {
  const [hospitalList, setHospitalList]: any = useState();
  const [doctorList, setDoctorList]: any = useState();
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
    <View
      style={{ backgroundColor: Colors.background, flex: 1, paddingBottom: 75 }}
    >
      <View style={styles.pHeadwhite}>
        <SearchBar bg={true} setSearchText={(value: any) => console.log(value)} />
      </View>
      {/* <HospitalDoctorTabs
        activeTab={(value: string) => setActiveTab(value)}
        options={["Hospital", "Doctor", "Nurse"]}
      /> */}

      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* {activeTab == "Hospital" ? (
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
        )} */}
        <Categories/>
        <TopDoctors/>
        <TopHospitals/>
      </ScrollView>
    </View>
  );
}
