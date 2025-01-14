import { View, Text, Image, FlatList, Pressable } from "react-native";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import moment from "moment";
import { Button, XStack } from "tamagui";
import {
  ArrowRight,
  BriefcaseMedical,
  Clock,
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
import ReadMore from "../Shared/ReadMore";

export default function HospitalInfo({ hospital }: any) {

  const fromTime = hospital.attributes.From_Time;
  const toTime = hospital.attributes.to_Time;
  const email: any = "mailto:" + hospital.attributes.Email;
  const tel: any = "tel:" + hospital.attributes.Phone;

  function hrs(time: any) {
    let dt = moment();
    dt.hours(time.substring(0, 2));
    dt.minutes(time.substring(3, 5));
    dt.seconds(Number("00"));

    return dt;
  }

  return (
    <View style={{ gap: 14, marginBottom: 20 }}>
      {/* Title and Description */}

      <View style={{ gap: 14, paddingHorizontal: 20 }}>
        <Text style={styles.h3title}>{hospital.attributes.Name}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <Clock color={Colors.text} size={20} />
          <Text style={styles.p}>
            {hospital.attributes.From_Date.substring(0, 3)} -{" "}
            {hospital.attributes.To_Date.substring(0, 3)}
            {"  "}
            {hrs(fromTime).format("h a")}
            {" - "}
            {hrs(toTime).format("h a")}
          </Text>
        </View>

        <XStack justifyContent={"space-between"}>
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

          <Pressable
            onPress={() =>
              router.push({
                pathname: "/HospitalsDocs",
                params: { hospitalName: hospital.attributes.Name },
              })
            }
            style={{ borderColor: Colors.border, ...styles.infocard }}
          >
            <ArrowRight
              // style={{ position: "absolute", right: 10, bottom: 10 }}
              size={16}
              color={Colors.text}
            />
            <Stethoscope
              style={{ position: "absolute", right: 10, top: 10 }}
              color={Colors.border}
              size={32}
            />
            <Text style={{ color: Colors.title, ...styles.h4title }}>
              {hospital.attributes.doctors.data.length}+
            </Text>
            <Text style={{ ...styles.p }}>Doctors</Text>
          </Pressable>

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

        <View style={{ gap: 8 }}>
          <Text style={{ color: Colors.title + "90", ...styles.title }}>
            About
          </Text>

          <ReadMore data={hospital.attributes.Description} length={120} />
        </View>
      </View>

      {/* QUICK LINKS */}
      <View style={{ paddingHorizontal: 20, gap: 8 }}>
        <Text style={{ color: Colors.title + "90", ...styles.title }}>
          Quick Links
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            borderRadius: 16,
            overflow: "hidden",
          }}
        >
          <Pressable
            onPress={() => router.navigate(email)}
            style={{ ...styles.quickLink }}
          >
            <Mail style={{}} color={Colors.title + "80"} size={24} />
            <View>
              <Text style={{ color: Colors.title + "80", ...styles.title }}>
                Mail us
              </Text>
              <Text style={{ fontSize: 10, ...styles.p }}>
                {hospital.attributes.Email.substring(0, 11)}..
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.navigate(hospital.attributes.Website)}
            style={{ ...styles.quickLink }}
          >
            <Globe style={{}} color={Colors.title + "80"} size={24} />
            <View>
              <Text style={{ color: Colors.title + "80", ...styles.title }}>
                Visit us
              </Text>
              <Text style={{ fontSize: 10, ...styles.p }}>
                {hospital.attributes.Website.substring(12, 24)}..
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={() => router.navigate(tel)}
            style={{ ...styles.quickLink }}
          >
            <Phone style={{}} color={Colors.title + "80"} size={24} />
            <View>
              <Text style={{ color: Colors.title + "80", ...styles.title }}>
                Call
              </Text>
              <Text style={{ fontSize: 10, ...styles.p }}>
                +91 {hospital.attributes.Phone.substring(0, 5)}..
              </Text>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ marginVertical: 10, ...styles.line }} />

      {/* Specialities */}

      <View style={{ paddingHorizontal: 20, gap: 8 }}>
        <Text style={{ color: Colors.title, ...styles.h4title }}>
          Specialities
        </Text>
        <FlatList
          data={hospital.attributes.categories.data}
          scrollEnabled={false}
          numColumns={3}
          columnWrapperStyle={{ gap: 8 }}
          contentContainerStyle={{ gap: 8 }}
          renderItem={({ item }) => (
            <View
              style={{
                paddingHorizontal: 8,
                paddingVertical: 4,
                backgroundColor: Colors.tintGrey,
                borderRadius: 6,
              }}
            >
              <Text style={styles.p}>{item.attributes.Name}</Text>
            </View>
          )}
        />
      </View>

      <View style={{ marginVertical: 10, ...styles.line }} />

      {/* ADDRESS */}

      <View style={{ paddingHorizontal: 20, gap: 8 }}>
        <Text style={{ color: Colors.title, ...styles.h4title }}>Location</Text>
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
        <Text style={{ color: Colors.title, ...styles.h4title }}>Reviews</Text>

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
            <Text style={{ color: Colors.text, fontFamily: "Inter" }}>
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
