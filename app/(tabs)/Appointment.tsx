import AppointmentCard from "@/components/OtherTabs/AppointmentCard";
import { Colors } from "@/constants/Colors";
import GlobalApi from "@/constants/GlobalApi";
import { styles } from "@/constants/Styles";
import { useUser } from "@clerk/clerk-expo";
import { Search } from "@tamagui/lucide-icons";
import { router } from "expo-router";
import moment from "moment";
import { useEffect, useState } from "react";
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

  const options = [
    { name: "All" },
    { name: "Upcoming" },
    { name: "Attended" },
    { name: "Cancelled" },
    // { name: "Others" },
  ];

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

  useEffect(() => {
    if (user.fullName) {
      AppointmentsList();
    }
  }, [user]);

  const sortedData = appointments.length
    ? appointments.sort(function (a: any, b: any) {
        return moment(b.attributes.Time).diff(a.attributes.Time);
      })
    : appointments;

  function filterValue(data: any) {
    return data.attributes.Status == status;
  }
  const filteredData = sortedData.filter(filterValue);

  // useEffect(()=>{
  //   console.log(appointments?.length);
  // },[appointments])

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.pHeadwhite}>
        <Text style={styles.h2title}>Appointments</Text>
      </View>

      {appointments != 0 ? (
        <ScrollView
          style={{
            marginTop: 90,
            marginBottom: 75,
            flex: 1,
          }}
          refreshControl={
            <RefreshControl
              onRefresh={onRefresh}
              refreshing={isLoading}
              enabled={filteredData.length > 0 || status == "All"}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          <FlatList
            style={{ paddingTop: 5 }}
            data={options}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item, index }: any) => (
              <TouchableOpacity
                onPress={() => setStatus(item.name)}
                style={{
                  marginLeft: index == 0 ? 20 : 0,
                  paddingHorizontal: 15,
                  paddingVertical: 8,
                  borderRadius: 50,
                  marginRight: 5,
                  borderWidth: 1,
                  borderColor:
                    status == item.name ? Colors.border : Colors.border,
                  backgroundColor:
                    status == item.name ? Colors.lighttint : Colors.tintGrey,
                }}
              >
                <Text
                  style={{
                    fontFamily:
                      status == item.name ? "InterSemiBold" : "InterRegular",
                    color: status == item.name ? Colors.tint : Colors.text,
                  }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />

          {filteredData.length > 0 || status == "All" ? (
            <FlatList
              style={{ height: "100%", paddingHorizontal: 20 }}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              data={status == "All" ? sortedData : filteredData}
              renderItem={({ item, index }) => (
                <Pressable style={[index == 0 && { marginTop: 16 }]}>
                  <AppointmentCard data={item} />
                </Pressable>
              )}
            />
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: Dimensions.get("screen").height * 0.75,
              }}
            >
              <Text style={styles.p}>No {status} Appointment</Text>
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: Dimensions.get("screen").height * 0.8,
            gap:8
          }}
        >
          <Text style={{fontSize:16,...styles.p}}>No Appointment</Text>
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
