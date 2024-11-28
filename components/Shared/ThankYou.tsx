import { View, Text, Dimensions, Pressable, Modal } from "react-native";
import React, { useState } from "react";
import { Colors } from "@/constants/Colors";
import { Calendar, CalendarDays, CircleCheckBig, X } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";
import { Button } from "tamagui";
import { router } from "expo-router";

export default function ThankYou() {
  const [modalVisible, setModalVisible] = useState(true);

  if(!modalVisible){
    setTimeout(()=>setModalVisible(true),2000)
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent={true}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View
          style={styles.modalView}
        >
          <Pressable
            onPress={() => { setModalVisible(false); router.back()}}
            style={styles.closeBtn}
          >
            <X color={Colors.title} size={22} />
          </Pressable>
          <CircleCheckBig size={64} color={Colors.green} />
          <Text style={{ textAlign: "center", ...styles.h2title }}>
            Appointment booked successfully!
          </Text>

          <View style={{ flexDirection: "row", gap: 8 }}>
            <Button onPress={()=> router.navigate("/(tabs)/Appointment")} theme={"blue"} icon={CalendarDays} scaleIcon={1.2} borderRadius={"$10"}>
              My Appointments
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
