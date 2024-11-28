import {
  View,
  ScrollView,
 
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/Shared/PageHeader";
import DoctorInfo from "@/components/BookingPage/DoctorInfo";
import BookingUI from "@/components/BookingPage/BookingUI";
import { styles } from "@/constants/Styles";

export default function BookAppointment() {
  const { doctor }: any = useLocalSearchParams();


  const info = JSON.parse(doctor);
  return (
    <View>
      <View style={styles.pHead}>
        <PageHeader title={"Book Appointment"} rightBtn={"none"} />
      </View>

      <ScrollView
        style={{ marginTop: 90 }}
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
      >
        <DoctorInfo doctor={info} />
        <BookingUI info={info} />
      </ScrollView>
    </View>
  );
}
