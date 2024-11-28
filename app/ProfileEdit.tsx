import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { Colors } from '@/constants/Colors'
import PageHeader from '@/components/Shared/PageHeader'

export default function ProfileEdit() {
    const params = useLocalSearchParams()
    const info = JSON.parse(params?.userInfo)
  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 0,
          paddingHorizontal: 20,
          paddingTop: 40,
          paddingBottom: 10,
          zIndex: 2,
          width: "100%",
          backgroundColor: Colors.background,
        }}
      >
        <PageHeader title={"Edit profile"} rightBtn={"none"} />
      </View>
    </>
  );
}