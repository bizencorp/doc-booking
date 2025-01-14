import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { useState } from "react";
import { Dimensions, FlatList, Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export default function HospitalDoctorTabs({ activeTab, options }: any) {
  const [tab, setTab] = useState(0);

  const position = (Dimensions.get("screen").width - 56) / 3;
  const offset = useSharedValue<number>(tab);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  const handlePress = (tab: number) => {
    const newOffset = (() => {
      switch (tab) {
        case 1:
          return position * tab;
        case 2:
          return position * tab;
        default:
          return tab;
      }
    })();

    offset.value = withTiming(newOffset);
  };

  return (
    <View
      style={{
        paddingBottom: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.background,
      }}
    >
      <View
        style={{
          backgroundColor: Colors.tintGrey,
          borderRadius: 50,
          padding: 8,
        }}
      >
        <FlatList
          data={options}
          numColumns={3}
          style={{ flexGrow: 0, zIndex: 1 }}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item, index }) => (
            <Pressable
              onPress={() => {
                activeTab(item);
                setTab(index);
                handlePress(index);
              }}
              style={{
                paddingVertical: 8,
                // backgroundColor: tab == index ? Colors.tint : "transparent",
                borderRadius: 50,
                width: "33.33%",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: tab == index ? "white" : Colors.text,
                  ...styles.title,
                }}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
        <Animated.View style={[styles.selectedTab, animatedStyles]} />
      </View>
    </View>
  );
}
