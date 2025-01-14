import AppointmentCard from "@/components/OtherTabs/AppointmentCard";
import { Colors } from "@/constants/Colors";
import GlobalApi from "@/constants/GlobalApi";
import { styles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import { Search } from "@tamagui/lucide-icons";
import { router, useFocusEffect } from "expo-router";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Dimensions,
} from "react-native";
import { Button } from "tamagui";

const Appointment = () => {
  const [appointments, setAppointments]: any = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("Upcoming");

  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }
  const email = user.primaryEmailAddress?.emailAddress;

  const options = ["All", "Upcoming", "Attended", "Cancelled", "Unattended"];

  const onRefresh = () => {
    setIsLoading(true);
    AppointmentsList();
    setIsLoading(false);
  };

  const AppointmentsList = () => {
    GlobalApi.Appointments(email).then((resp) => {
      setAppointments(resp.data.data);
    });
  };

  useFocusEffect(
    useCallback(() => {
      if (user.fullName) {
        AppointmentsList();
      }
    }, [user])
  );

  // useEffect(() => {}, [user]);

  const today = moment();

  const sortedData = appointments.length
    ? appointments.sort(function (a: any, b: any) {
        return moment(b.attributes.Time).diff(a.attributes.Time);
      })
    : appointments;

  function filterValue(data: any) {
    const bookingTime = moment(data.attributes.Time);

    const bookingStatus =
      moment.max(today, bookingTime) == today &&
      data.attributes.Status == "Upcoming"
        ? "Unattended"
        : data.attributes.Status;
    return bookingStatus == status;
  }
  const filteredData = sortedData.filter(filterValue);

  return (
    <View
      style={{ flex: 1, backgroundColor: Colors.background, marginBottom: 75 }}
    >
      <View style={styles.pHeadwhite}>
        <Text style={styles.h2title}>Appointments</Text>
      </View>

      {appointments != 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isLoading}
              enabled={filteredData.length >= 0 || status == "All"}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            data={options}
            style={{ paddingTop: 5 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: any) => (
              <Pressable
                onPress={() => setStatus(item)}
                style={{
                  marginLeft: index == 0 ? 20 : 0,
                  paddingHorizontal: 15,
                  justifyContent: "center",
                  borderRadius: 50,
                  marginRight: 5,
                  height: 35,
                  borderWidth: 1,
                  borderColor: status == item ? Colors.border : Colors.border,
                  backgroundColor:
                    status == item ? Colors.lighttint : Colors.tintGrey,
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      status == item ? "InterSemiBold" : "InterRegular",
                    color: status == item ? Colors.tint : Colors.text,
                  }}
                >
                  {item}
                </Text>
              </Pressable>
            )}
          />

          <FlatList
            data={status == "All" ? sortedData : filteredData}
            style={{ paddingHorizontal: 20 }}
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <Pressable style={[index == 0 && { marginTop: 16 }]}>
                <AppointmentCard data={item} />
              </Pressable>
            )}
            ListEmptyComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: Dimensions.get("screen").height * 0.75,
                }}
              >
                <Text style={styles.p}>No {status} Appointment</Text>
              </View>
            }
          />
          
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: Dimensions.get("screen").height * 0.8,
            gap: 12,
          }}
        >
          <Text style={{ fontSize: 16, ...styles.p }}>No Appointment</Text>
          <Button
            onPress={() => router.navigate("/(tabs)/Explore")}
            theme={"blue"}
            icon={Search}
            scaleIcon={1.2}
            borderRadius={"$10"}
          >
            Explore now
          </Button>
        </View>
      )}
    </View>
  );
};

export default Appointment;
