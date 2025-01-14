import { View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import PageHeader from "@/components/Shared/PageHeader";
import DoctorInfo from "@/components/BookingPage/DoctorInfo";
import EditBookingUI from "@/components/BookingPage/EditBookingUI";
import { styles } from "@/constants/Styles";
import moment from "moment";
import DoctorInfoBig from "@/components/BookingPage/DoctorInfoBig";
import { Colors } from "@/constants/Colors";

export default function EditBooking() {
  const { doctor }: any = useLocalSearchParams();
  const info = JSON.parse(doctor);

  const today = moment();
  const bookingTime = moment(
    info.attributes.Date + info.attributes.Time,
    "YYYY-MM-DD" + "HH:mm"
  );
    const status =
      moment.max(today, bookingTime) == today &&
      info.attributes.Status == "Upcoming"
        ? "Unattended"
        : info.attributes.Status;

    const color =
      status == "Upcoming"
        ? Colors.rating
        : status == "Attended"
        ? Colors.green
        : Colors.red;

  const doctorData = {
    name: info.attributes.doctor.data.attributes.Name,
    adr: info.attributes.doctor.data.attributes.Address,
    verified: info.attributes.doctor.data.attributes.Verified,
    // category: info.attributes.category.data.attributes.Name,
    img: info.attributes.doctorImg,
  };

  return (
    <View>
      <View style={styles.pHead}>
        <PageHeader
          title={
            moment.max(today, bookingTime) == bookingTime
              ? "Edit Booking"
              : "Appointment Details"
          }
          rightBtn={"none"}
        />
      </View>
      {moment.max(today, bookingTime) == bookingTime ? (
        <DoctorInfo data={doctorData} />
      ) : (
        <DoctorInfoBig data={doctorData} />
      )}
      <EditBookingUI data={info} status={status} color={color}/>
    </View>
  );
}
