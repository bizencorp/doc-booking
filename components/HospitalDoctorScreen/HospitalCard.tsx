import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Clock, MapPin, StarFull, Verified } from "@tamagui/lucide-icons";
import { Button } from "tamagui";
import { styles } from "@/constants/Styles";

export default function HospitalCard(props: { hospital: any }) {
  const hospital = props.hospital;
  return (
    <View
      style={{
        backgroundColor: Colors.background,
        borderRadius: 20,
        overflow: "hidden",
        marginBottom: 16,
        padding: 16,
        gap: 8,
      }}
    >
      <View>
        <Image
          source={{ uri: hospital.attributes.Image.data[0].attributes.url }}
          style={{
            height: 160,
            width: "100%",
            borderRadius: 12,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 2,
            paddingVertical: 2,
            paddingHorizontal: 6,
            backgroundColor: Colors.green,
            borderRadius: 6,
            position: "absolute",
            right: 10,
            top: 10,
          }}
        >
          <StarFull size={16} color={Colors.background} />
          <Text style={{ color: Colors.background, ...styles.title }}>
            {hospital.attributes.Rating}
          </Text>
        </View>
      </View>

      <View>
        <Text
          style={{
            fontSize: 18,
            fontFamily: "InterSemiBold",
            color: Colors.title,
          }}
        >
          {hospital.attributes.Name}
        </Text>
        <FlatList
          data={hospital.attributes.categories.data}
          horizontal={true}
          ItemSeparatorComponent={() => (
            <Text style={{ color: Colors.text }}>, </Text>
          )}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) =>
            index <= 2 && (
              <Text
                style={{
                  color: Colors.text,
                  fontFamily: "InterRegular",
                }}
              >
                {item.attributes.Name}
              </Text>
            )
          }
        />
        <View
          style={{
            borderBottomWidth: 2,
            borderBottomColor: Colors.tintGrey,
            marginVertical: 10,
          }}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingBottom: 10,
          }}
        >
          <MapPin color={Colors.text} size={20} />
          <Text style={{ fontFamily: "InterLight", color: Colors.text }}>
            {hospital.attributes.Address.length > 43
              ? hospital.attributes.Address.substring(0, 43) + "..."
              : hospital.attributes.Address}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            paddingBottom: 10,
          }}
        >
          <Clock color={Colors.text} size={20} />
          <Text style={{ fontFamily: "InterRegular", color: Colors.text }}>
            15min - 1.5km
          </Text>
        </View>
      </View>
    </View>
  );
}
