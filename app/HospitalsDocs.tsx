import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useState } from "react";
import PageHeader from "../components/Shared/PageHeader";
import DoctorList from "../components/HospitalDoctorScreen/DoctorList";
import { useEffect } from "react";
import GlobalApi from "@/constants/GlobalApi";
import { Colors } from "@/constants/Colors";
import { useLocalSearchParams } from "expo-router";
import { styles } from "@/constants/Styles";

export default function HospitalDoctorList() {
  const { hospitalName } = useLocalSearchParams();

  const [doctorList, setDoctorList] = useState();

  useEffect(() => {
    getDoctorByHospital();
  }, []);

  const getDoctorByHospital = () => {
    GlobalApi.getDoctorByHospital(hospitalName).then((resp) => {
      setDoctorList(resp.data.data);
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.tintGrey }}>
      <View style={styles.pHeadwhite}>
        <PageHeader title={hospitalName} rightBtn={""} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!DoctorList?.length ? (
          <ActivityIndicator
            size={"large"}
            color={Colors.tint}
            style={{ marginTop: "50%" }}
          />
        ) : (
          <DoctorList doctorList={doctorList} Check={false} />
        )}
      </ScrollView>
    </View>
  );
}
