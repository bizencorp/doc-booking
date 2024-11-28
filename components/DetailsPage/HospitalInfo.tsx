import { View, Text, Image, FlatList, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import ActionButtons from "./ActionButtons";
import { styles } from "@/constants/Styles";
import moment from "moment";
import { Button, XStack } from "tamagui";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  CalendarDays,
  ChevronRight,
  Clock,
  Clock1,
  Clock10,
  Clock2,
  Globe,
  Mail,
  MapPin,
  Phone,
  Star,
  StarFull,
  Stethoscope,
} from "@tamagui/lucide-icons";
import { useState } from "react";
import Review from "../Shared/Review";
import { router } from "expo-router";

export default function HospitalInfo(props: { hospital: any }) {
  const hospital = props.hospital;
  const [readMore, setReadMore] = useState(true);

  const fromTime = hospital.attributes.From_Time;
  const toTime = hospital.attributes.to_Time;

  function hrs(time: any) {
    let dt = moment();
    dt.hours(time.substring(0, 2));
    dt.minutes(time.substring(3, 5));
    dt.seconds(Number("00"));

    return dt;
  }

  return (
    <View style={{ gap: 12, marginBottom: 20 }}>
      {/* Title and Description */}
      <View style={{ gap: 8, paddingHorizontal: 20 }}>
        <Text style={styles.h2title}>{hospital.attributes.Name}</Text>

        <Text
          onPress={() => setReadMore(!readMore)}
          style={{ fontFamily: "InterRegular", color: Colors.text }}
        >
          {hospital.attributes.Description.length > 80
            ? readMore
              ? hospital.attributes.Description.substring(0, 80) + "..."
              : hospital.attributes.Description
            : hospital.attributes.Description}{" "}
          {hospital.attributes.Description.length > 80 && (
            <Text
              onPress={() => setReadMore(!readMore)}
              style={{
                fontFamily: "InterSemiBold",
                color: Colors.tint,
              }}
            >
              {readMore ? " read more" : " read less"}
            </Text>
          )}
        </Text>
      </View>

      <XStack paddingHorizontal={20} justifyContent={"space-between"}>
        <View style={{ borderColor: Colors.border, ...styles.infocard }}>
          <Clock2
            style={{ position: "absolute", right: 10, top: 10 }}
            color={Colors.border}
            size={32}
          />
          <Text style={{ color: Colors.title, ...styles.h4title }}>
            {hospital.attributes.From_Date.substring(0, 3)} -{" "}
            {hospital.attributes.To_Date.substring(0, 3)}
          </Text>
          <Text style={{ ...styles.p }}>
            {hrs(fromTime).format("h a")}
            {" - "}
            {hrs(toTime).format("h a")}
          </Text>
        </View>

        <View style={{ borderColor: Colors.border, ...styles.infocard }}>
          <Stethoscope
            style={{ position: "absolute", right: 10, top: 10 }}
            color={Colors.border}
            size={32}
          />
          <Text style={{ color: Colors.title, ...styles.h4title }}>
            {hospital.attributes.doctors.data.length}+
          </Text>
          <Text style={{ ...styles.p }}>Doctors</Text>
        </View>

        <View style={{ borderColor: Colors.green, ...styles.infocard }}>
          <Star
            style={{ position: "absolute", right: 10, top: 10 }}
            opacity={1}
            color={Colors.green}
            size={32}
          />
          <Text style={{ color: Colors.title, ...styles.h4title }}>
            {hospital.attributes.Rating}
          </Text>
          <Text style={{ ...styles.p }}>Ratings</Text>
        </View>
      </XStack>

      <XStack paddingHorizontal={20} justifyContent={"space-between"}>
        <View style={{ borderColor: Colors.border, ...styles.infocard }}>
          <Mail
            style={{ position: "absolute", right: 10, top: 10 }}
            color={Colors.border}
            size={32}
          />
          <Text style={{ color: Colors.title, ...styles.h4title }}>Email</Text>
        </View>

        <View style={{ borderColor: Colors.border, ...styles.infocard }}>
          <Globe
            style={{ position: "absolute", right: 10, top: 10 }}
            color={Colors.border}
            size={32}
          />
          <Text style={{ color: Colors.title, ...styles.h4title }}>
            Website
          </Text>
        </View>

        <View style={{ borderColor: Colors.border, ...styles.infocard }}>
          <Phone
            style={{ position: "absolute", right: 10, top: 10 }}
            opacity={1}
            color={Colors.border}
            size={32}
          />
          <Text style={{ color: Colors.title, ...styles.h4title }}>Call</Text>
        </View>
      </XStack>

      <View style={{ marginVertical: 10, ...styles.line }} />

      {/* Specialities */}

      <View style={{ paddingHorizontal: 20, gap: 8 }}>
        <Text style={{ color: Colors.title, ...styles.h3title }}>
          Specialities
        </Text>
        <FlatList
          data={hospital.attributes.categories.data}
          scrollEnabled={false}
          numColumns={3}
          columnWrapperStyle={{gap:8}}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/HospitalsDocs",
                  params: { hospitalName: hospital.attributes.Name },
                })
              }
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: Colors.tintGrey,
                borderRadius: 6,
              }}
            >
              <Text style={styles.p}>{item.attributes.Name}</Text>
            </Pressable>
          )}
        />
      </View>

      <View style={{ marginVertical: 10, ...styles.line }} />

      {/* ADDRESS */}

      <View style={{ paddingHorizontal: 20, gap: 8 }}>
        <Text style={{ color: Colors.title, ...styles.h3title }}>Location</Text>
        <XStack gap={8} alignItems={"center"}>
          <View
            style={{
              padding: 14,
              backgroundColor: Colors.tintGrey,
              borderRadius: 16,
            }}
          >
            <MapPin color={Colors.text} size={26} />
          </View>

          <View>
            <Text style={{ paddingRight: 40, ...styles.p }}>
              {hospital.attributes.Address}
            </Text>
          </View>
        </XStack>
      </View>

      <View style={{ marginVertical: 10, ...styles.line }} />

      {/* REVIEWS */}

      <View style={{ paddingHorizontal: 20, gap: 12 }}>
        <Text style={{ color: Colors.title, ...styles.h3title }}>Reviews</Text>

        <View
          style={{
            paddingVertical: 8,
            paddingHorizontal: 16,
            backgroundColor: Colors.tintGrey,
            borderRadius: 16,
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
          }}
        >
          <StarFull color={Colors.rating} size={46} />
          <Text style={{ color: Colors.title, fontSize: 50, ...styles.title }}>
            {hospital.attributes.Rating}
          </Text>

          <View>
            <Text style={{ color: Colors.title, ...styles.h3title }}>
              Ratings
            </Text>
            <Text style={{ color: Colors.text, ...styles.h4title }}>
              (120 Reviews)
            </Text>
          </View>
        </View>

        {/* REVIEW COMPONENT */}

        <Review star={4} />

        <Button
          theme={"yellow"}
          color={Colors.title}
          iconAfter={ArrowRight}
          onPress={() => console.log("View all reviews")}
        >
          View all Reviews
        </Button>
      </View>
    </View>
  );
}
