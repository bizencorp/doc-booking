import { View, Text, Pressable, FlatList } from "react-native";
import React from "react";
import { styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import moment from "moment";

export default function AvailTime({
  timeList,
  setSelectedTime,
  selectedTime,
  setdisabled,
}: any) {
  return (
    <View style={{ gap: 10, paddingLeft: 10 }}>
      {timeList.length != 0 ? (
        <>
          <Text style={{ color: Colors.title, ...styles.title }}>
            Pick a time
          </Text>

          <FlatList
            data={timeList}
            numColumns={5}
            scrollEnabled={false}
            columnWrapperStyle={{ flex: 1, gap: 6, marginBottom: 6 }}
            renderItem={({ item }: any) => (
              <Pressable
                onPress={() => {
                  setSelectedTime(item);
                  setdisabled(false);
                }}
                style={[
                  styles.time,
                  selectedTime == item ? styles.selectedDT : null,
                ]}
              >
                <Text
                  style={{
                    color:
                      selectedTime == item
                        ? Colors.background
                        : Colors.text,
                    ...styles.title,
                  }}
                >
                  {moment(item, "HH:mm").format("HH:mm")}
                </Text>
              </Pressable>
            )}
          />
        </>
      ) : (
        <View style={{ alignItems: "center", padding: 14 }}>
          <Text style={{ paddingVertical: 14, ...styles.p }}>
            No available slot for selected date!
          </Text>
        </View>
      )}
    </View>
  );
}
