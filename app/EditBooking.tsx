import { View, ScrollView, Image, Text, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/Shared/PageHeader";
import DoctorInfo from "@/components/BookingPage/DoctorInfo";
import EditBookingUI from "@/components/BookingPage/EditBookingUI";
import { styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import DoctorInfoBig from "@/components/BookingPage/DoctorInfoBig";

export default function EditBooking() {
  const { doctor }: any = useLocalSearchParams();
  const info = JSON.parse(doctor);

  const today = moment();
  const bookingTime = moment(info.attributes.Time);

  const data = {
    name: info.attributes.doctor.data.attributes.Name,
    adr: info.attributes.doctor.data.attributes.Address,
    verified: info.attributes.doctor.data.attributes.Verified,
    category: info.attributes.categories.data[0].attributes.Name,
    img: info.attributes.doctorImg,
  };

  return (
    <View style={{ borderRadius: 30 }}>
      <View style={styles.pHead}>
        <PageHeader title={moment.max(today, bookingTime) == bookingTime ? "Edit Booking" :"Appointment Details"} rightBtn={"none"} />
      </View>
      <ScrollView
        style={{ marginTop: 85 }}
        showsVerticalScrollIndicator={false}
      >
        {moment.max(today, bookingTime) == bookingTime ? (
          <DoctorInfo data={data} />
        ) : (
          <DoctorInfoBig data={data} />
        )}
        <EditBookingUI doctor={info} />
      </ScrollView>
    </View>
  );
}
