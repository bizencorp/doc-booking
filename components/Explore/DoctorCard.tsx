import { View, Text, Image } from "react-native";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { Star, StarFull } from "@tamagui/lucide-icons";

export default function DoctorCard({ doctor }: any) {
  return (
    <View
      style={{
        backgroundColor: Colors.tintGrey,
        borderRadius: 24,
        padding: 4,
        gap: 2,
        alignItems: "center",
      }}
    >
      <View style={{ alignItems: "flex-start" }}>
        <Image
          source={{ uri: doctor.attributes.Profile_Img.data.attributes.url }}
          style={{
            width: 140,
            borderRadius: 20,
            aspectRatio: "5/6",
          }}
        />
        {doctor.attributes.Verified && (
          <View
            style={{
              backgroundColor: Colors.background,
              flexDirection: "row",
              paddingHorizontal: 6,
              borderRadius: 20,
              paddingVertical: 2,
              alignItems: "center",
              position: "absolute",
              bottom: 5,
              right: 5,
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

        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            right: 5,
            top: 5,
            paddingHorizontal: 6,
            borderRadius: 20,
            paddingVertical: 2,
            backgroundColor: Colors.background,
            alignItems:"center"
          }}
        >
          <StarFull color={Colors.rating} size={12} />
          <Text style={{ fontSize: 10, color: Colors.title, ...styles.title }}>
            {doctor.attributes.Rating}
          </Text>
        </View>
      </View>
      <Text style={{ color: Colors.title, fontSize: 12, ...styles.title }}>
        {doctor.attributes.Name}
      </Text>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text style={{ marginBottom: 8, fontSize: 12, ...styles.p }}>
          {doctor.attributes.category.data.attributes.Name}
        </Text>
      </View>

      {/* <View style={styles.ratingChip}>
          <Star color={Colors.rating} size={18} />
          <Text style={{ fontFamily: "Inter", color: Colors.rating }}>
            {doctor.attributes.Rating}
          </Text>
        </View> */}
    </View>
  );
}
