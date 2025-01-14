import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { BriefcaseMedical, MapPin, StarFull } from "@tamagui/lucide-icons";
import { styles } from "@/constants/Styles";

export default function HospitalCard({ hospital }: any) {
  const adr = hospital.attributes.Address.split(",").reverse();
  let category = hospital.attributes.categories.data;
  category = category.slice(0,2);

  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 20,
        marginBottom: 16,
        padding: 8,
      }}
    >
      <View>
        <Image
          source={{ uri: hospital.attributes.Image.data[0].attributes.url }}
          style={{
            height: 170,
            width: "100%",
            borderRadius: 14,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: Colors.rating,
            borderRadius: 8,
            position: "absolute",
            right: 5,
            top: 5,
          }}
        >
          <StarFull size={16} color={Colors.background} />
          <Text style={{ color: Colors.background, ...styles.title }}>
            {hospital.attributes.Rating}
          </Text>
        </View>
      </View>

      <View style={{ gap: 4, padding: 8 }}>
        <Text style={styles.h3title}>{hospital.attributes.Name}</Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <BriefcaseMedical color={Colors.text} size={20} />
          <FlatList
            data={category}
            horizontal
            style={{ flexGrow: 0 }}
            ItemSeparatorComponent={() => <Text style={styles.p}>, </Text>}
            renderItem={({ item }: any) => (
              <Text style={styles.p}>{item.attributes.Name}</Text>
            )}
          />
          <Text style={styles.p}>
            ...{hospital.attributes.categories.data.length - category.length} more
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
          }}
        >
          <MapPin color={Colors.text} size={20} />
          <Text style={{ fontFamily: "InterRegular", color: Colors.text }}>
            {adr[2].substring(1)},{adr[1]},{adr[0]}
          </Text>
        </View>
      </View>
    </View>
  );
}
