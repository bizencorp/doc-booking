import { View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "@/constants/Colors";
import { router } from "expo-router";
import GlobalApi from "@/constants/GlobalApi";
import SubHeading from "../Home/SubHeading";
import { styles } from "@/constants/Styles";
import { ChevronDown, ChevronUp } from "@tamagui/lucide-icons";
import Animated, { useSharedValue, withSpring } from "react-native-reanimated";

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);
  const [seeMore, setSeeMore] = useState(false);

  useEffect(() => {
    getCategory();
  }, []);

  const getCategory = () => {
    GlobalApi.getCategory().then((resp) => {
      setCategoryList(resp.data.data);
    });
  };
  if (!categoryList) {
    return null;
  }

  const height = useSharedValue<number>(226);

  const onPress = () => {
    setSeeMore(!seeMore);
    if (!seeMore && categoryList.length > 6) {
      let n = Math.round(categoryList.length / 2);
      height.value = withSpring((70 + 8) * n - 8, { stiffness: 60 });
    } else {
      height.value = withSpring(226, { stiffness: 60 });
    }
  };

  return (
    <View style={{ gap: 10, marginBottom: 16 }}>
      <SubHeading title={"Categories"} more={false} />

      <Animated.FlatList
        data={categoryList}
        numColumns={2}
        scrollEnabled={false}
        columnWrapperStyle={{
          paddingHorizontal: 20,
          justifyContent: "space-between",
        }}
        style={{ height }}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            onPress={() =>
              router.navigate({
                pathname: "/HospitalDoctorList",
                params: { categoryName: item.attributes.Name },
              })
            }
          >
            <View
              style={{
                borderColor: Colors.border,
                backgroundColor: Colors.tintGrey,
                padding: 20,
                borderRadius: 20,
                flexDirection: "row",
                gap: 6,
                width: (Dimensions.get("screen").width - 40) / 2 - 4,
                height: 70,
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Image
                source={{ uri: item.attributes.Icon.data.attributes.url }}
                style={{ width: 24, height: 24 }}
              />
              <Text
                style={{
                  fontFamily: "InterRegular",
                  color: Colors.text,
                  fontSize: 14,
                }}
              >
                {item.attributes.Name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {categoryList.length > 6 && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!seeMore ? (
            <ChevronDown size={20} color={Colors.tint} />
          ) : (
            <ChevronUp size={20} color={Colors.tint} />
          )}
          <Text style={{ color: Colors.tint, fontSize: 12, ...styles.title }}>
            {!seeMore ? "View all" : "View less"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
