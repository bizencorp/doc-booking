import { View, Text, FlatList, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import ActionButtons from "./ActionButtons";
import { styles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Tabs, XStack, SizableText, Button } from "tamagui";
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock2,
  MapPin,
  Sparkle,
  Star,
  StarFull,
  Users,
} from "@tamagui/lucide-icons";
import moment from "moment";
import { useState } from "react";
import Review from "../Shared/Review";

export default function DoctorInfo({ doctor }: any) {
  const fromTime: any = doctor.attributes.Start_time;
  const toTime = doctor.attributes.End_time;
  const [readMore, setReadMore] = useState(true);
  const url =
    "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg?t=st=1731415129~exp=1731418729~hmac=f0c38061b0989b9787dc086bc63deeeecf9a0944a6cb1151d0fb0bcf8ac94211&w=740";

  function hrs(time: any) {
    let dt = moment();
    dt.hours(time.substring(0, 2));
    dt.minutes(time.substring(3, 5));
    dt.seconds(Number("00"));

    return dt;
  }

  return (
    <View style={{ gap: 20, marginBottom: 80 }}>
      {/* DOCTOR INFO */}
      <View
        style={{
          gap: 1,
          backgroundColor: Colors.tintGrey,
          paddingBottom: 40,
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: 150,
            height: 150,
            overflow: "hidden",
            borderRadius: 20,
            borderWidth: 1,
            borderColor: Colors.border,
          }}
        >
          <Image
            source={{ uri: doctor.attributes.Profile_Img.data.attributes.url }}
            style={{
              height: 200,
            }}
          />
          {doctor.attributes.Verified == true && (
            <View
              style={{
                backgroundColor: Colors.background,
                paddingVertical: 4,
                paddingHorizontal: 10,
                borderRadius: 50,
                flexDirection: "row",
                alignItems: "center",
                gap: 3,
                position: "absolute",
                right: 5,
                bottom: 5,
              }}
            >
              <MaterialIcons name="verified" size={18} color={Colors.tint} />
              <Text style={{ color: Colors.tint, fontFamily: "InterSemiBold" }}>
                Verified
              </Text>
            </View>
          )}
        </View>

        <Text style={styles.h2title}>{doctor.attributes.Name}</Text>

        <FlatList
          data={doctor.attributes.categories.data}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 8 }}
          renderItem={({ item }) => (
            <Text style={{ fontSize: 16, ...styles.p }}>
              {item.attributes.Name}
            </Text>
          )}
        />
        <ActionButtons />
      </View>

      <View
        style={{
          paddingTop: 20,
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
          backgroundColor: Colors.background,
          gap: 15,
          marginTop: -30,
        }}
      >
        {/* INFORMATION */}

        <View style={{ paddingHorizontal: 20, gap: 5 }}>
          <Text style={{ color: Colors.title, ...styles.h3title }}>
            Information
          </Text>

          <Text
            onPress={() => setReadMore(!readMore)}
            style={{ fontFamily: "InterRegular", color: Colors.text }}
          >
            {doctor.attributes.About.length > 80
              ? readMore
                ? doctor.attributes.About.substring(0, 80) + "..."
                : doctor.attributes.About
              : doctor.attributes.About}{" "}
            {doctor.attributes.About.length > 80 && (
              <Text
                onPress={() => setReadMore(!readMore)}
                style={{
                  fontFamily: "InterRegular",
                  color: Colors.tint,
                }}
              >
                {readMore ? "read more" : "read less"}
              </Text>
            )}
          </Text>
        </View>

        <XStack paddingHorizontal={20} justifyContent={"space-between"}>
          <View style={{ borderColor: Colors.border, ...styles.infocard }}>
            <Users
              style={{ position: "absolute", right: 10, top: 10 }}
              color={Colors.border}
              size={32}
            />
            <Text style={{ color: Colors.title, ...styles.h4title }}>
              {doctor.attributes.Patients}
            </Text>
            <Text style={{ ...styles.p }}>Patients</Text>
          </View>

          <View style={{ borderColor: Colors.border, ...styles.infocard }}>
            <BriefcaseBusiness
              style={{ position: "absolute", right: 10, top: 10 }}
              color={Colors.border}
              size={32}
            />
            <Text style={{ color: Colors.title, ...styles.h4title }}>
              {doctor.attributes.Year_of_Experience}
            </Text>
            <Text style={{ ...styles.p }}>Years of experience</Text>
          </View>

          <View style={{ borderColor: Colors.green, ...styles.infocard }}>
            <Star
              style={{ position: "absolute", right: 10, top: 10 }}
              opacity={1}
              color={Colors.green}
              size={32}
            />
            <Text style={{ color: Colors.title, ...styles.h4title }}>
              {doctor.attributes.Rating}
            </Text>
            <Text style={{ ...styles.p }}>Ratings</Text>
          </View>
        </XStack>

        <XStack paddingHorizontal={20} gap={13}>
          <View style={{ borderColor: Colors.border, ...styles.infocard }}>
            <Clock2
              style={{ position: "absolute", right: 10, top: 10 }}
              color={Colors.border}
              size={32}
            />
            <Text style={{ color: Colors.title, ...styles.h4title }}>Time</Text>
            <Text style={{ ...styles.p }}>
              {hrs(fromTime).format("h a")}
              {" - "}
              {hrs(toTime).format("h a")}
            </Text>
          </View>

          <View style={{ borderColor: Colors.border, ...styles.infocard }}>
            <Sparkle
              style={{ position: "absolute", right: 10, top: 10 }}
              color={Colors.border}
              size={32}
            />
            <Text style={{ color: Colors.title, ...styles.h4title }}>
              Speciality
            </Text>
            <Text style={{ ...styles.p }}>
              {doctor.attributes.categories.data[0].attributes.Name}
            </Text>
          </View>
        </XStack>

        <View style={{ marginVertical: 10, ...styles.line }} />

        {/* ADDRESS */}

        <View style={{ paddingHorizontal: 20, gap: 8 }}>
          <Text style={{ color: Colors.title, ...styles.h3title }}>
            Location
          </Text>
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
                {doctor.attributes.Address}
              </Text>
            </View>
          </XStack>
        </View>

        <View style={{ marginVertical: 10, ...styles.line }} />

        {/* REVIEWS */}

        <View style={{ paddingHorizontal: 20, gap: 12 }}>
          <Text style={{ color: Colors.title, ...styles.h3title }}>
            Reviews
          </Text>

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
            <Text
              style={{ color: Colors.title, fontSize: 50, ...styles.title }}
            >
              {doctor.attributes.Rating}
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
          
          <Review star={3} />
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
    </View>
  );
}
