import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { Colors } from "@/constants/Colors";
import PageHeader from "@/components/Shared/PageHeader";
import { styles } from "@/constants/Styles";

export default function ProfileEdit() {
  const params: any = useLocalSearchParams();
  const info = JSON.parse(params?.userInfo);
  return (
    <View>
      <View style={styles.pHead}>
        <PageHeader title={"Edit profile"} rightBtn={"none"} />
      </View>
    </View>
  );
}
