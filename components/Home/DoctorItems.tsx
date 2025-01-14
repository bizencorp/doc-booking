import { View, Text, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Star } from "@tamagui/lucide-icons";

export default function DoctorItems({ doctor }: any) {
  return (
    <View
      style={{
        backgroundColor: Colors.tintGrey,
        borderRadius: 20,
        padding: 8,
        // borderWidth: 1,
        borderColor: Colors.border,
        width: 280,
        gap: 5,
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 8,
        }}
      >
        <Image
          source={{ uri: doctor.attributes.Profile_Img.data.attributes.url }}
          style={{
            width: 90,
            borderRadius: 14,
            aspectRatio: "4/5",
          }}
        />

        <View style={{ alignItems: "flex-start" }}>
          {doctor.attributes.Verified && (
            <View
              style={{
                // backgroundColor: Colors.background,
                flexDirection: "row",
                // paddingHorizontal: 6,
                // borderRadius: 20,
                // paddingVertical: 2,
                alignItems: "center",
              }}
            >
              <MaterialIcons name="verified" size={18} color={Colors.tint} />
              <Text
                style={{
                  fontFamily: "Inter",
                  color: Colors.text,
                  fontSize: 12,
                }}
              >
                Verified
              </Text>
            </View>
          )}
          <Text style={{ color: Colors.title, ...styles.title }}>
            {doctor.attributes.Name}
          </Text>

          <Text style={{ marginRight: 5, ...styles.p }}>
            {doctor.attributes.category.data.attributes.Name}
          </Text>

          <Text style={{ marginRight: 5, ...styles.p }}>
            {doctor.attributes.Year_of_Experience} years
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
            position: "absolute",
            right: 0,
            bottom: 0,
            paddingVertical: 2,
            paddingHorizontal: 4,
            borderRadius: 6,
            backgroundColor: Colors.rating+"30",
          }}
        >
          <Star color={Colors.rating} size={18} />
          <Text style={{ fontFamily: "Inter", color: Colors.rating }}>
            {doctor.attributes.Rating}
          </Text>
        </View>
      </View>
    </View>
  );
}
