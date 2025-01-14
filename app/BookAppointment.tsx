import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/Shared/PageHeader";
import DoctorInfo from "@/components/BookingPage/DoctorInfo";
import BookingUI from "@/components/BookingPage/BookingUI";
import { styles } from "@/constants/Styles";

export default function BookAppointment() {
  const { doctor }: any = useLocalSearchParams();
  

  const info = JSON.parse(doctor);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.pHead}>
        <PageHeader title={"Book Appointment"} rightBtn={"none"} />
      </View>

      <DoctorInfo doctor={info} />
      <BookingUI info={info} />
    </KeyboardAvoidingView>
  );
}
