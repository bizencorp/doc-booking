import { View, Text, Image } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import SignInWithOAuth from "../components/SingInAuth";
import { styles } from "@/constants/Styles";

export default function Login() {
  return (
    <View style={{ alignItems: "center", backgroundColor: Colors.background, padding:10}}>

      <View style={styles.imgContainer}>
        <Image
          source={require("@/assets/images/Doc-App.jpg")}
          style={styles.appImage}
        />
      </View>

      <View style={styles.headContainer}>
        <Text style={styles.heading}>Your Ultimate Doctor</Text>
        <Text style={styles.heading}>Appointment Booking App</Text>
        <Text
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "InterRegular",
            color: Colors.text,
            fontSize: 15,
          }}
        >
          Book Appointments Effortlessly and manage your health journey
        </Text>
        <SignInWithOAuth />
      </View>
    </View>
  );
}
