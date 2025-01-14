import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import moment from "moment";

export default function AvailDate({
  workingDays,
  setSelectedDate,
  selectedDate,
}: any) {
  return (
    <View style={{ gap: 12 }}>
      <Text style={{ color: Colors.title, paddingLeft: 10, ...styles.title }}>
        Pick a date
      </Text>
      <FlatList
        data={workingDays}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{ paddingLeft: 10 }}
        renderItem={({ item, index }: any) => (
          <TouchableOpacity
            onPress={() => setSelectedDate(item)}
            style={[
              styles.dates,
              selectedDate == item ? styles.selectedDT : null,
              index == 6 && { marginRight: 20 },
            ]}
          >
            <Text
              style={[
                { fontFamily: "InterRegular" },
                {
                  color: selectedDate == item ? Colors.background : Colors.text,
                },
              ]}
            >
              {index == 0 ? "Today" : moment(item).format("ddd")}
            </Text>
            <Text
              style={{
                color: selectedDate == item ? Colors.background : Colors.text,
                ...styles.h4title,
              }}
            >
              {moment(item).format("D MMM")}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
