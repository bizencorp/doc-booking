import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import GlobalApi from "../../constants/GlobalApi";
import {Colors} from "@/constants/Colors";
import SubHeading from "./SubHeading";
import { router } from "expo-router";

export default function Categories() {
  const [categoryList, setCategoryList] = useState([]);

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
  return (
    <View style={{ gap: 10, marginBottom:16 }}>
      <SubHeading title={"Categories"} />

      <FlatList
        data={categoryList}
        numColumns={4}
        columnWrapperStyle={{
          flex: 1,
          justifyContent: "space-between",
          paddingHorizontal: 20,
        }}
        renderItem={({ item, index }: any) =>
          index <= 3 && (
            <TouchableOpacity
              onPress={() =>
                router.navigate({
                  pathname: "/HospitalDoctorList",
                  params: { categoryName: item.attributes.Name },
                })
              }
              style={{ alignItems: "center" }}
            >
              <View
                style={{
                  borderColor: Colors.border,
                  borderWidth: 1,
                  backgroundColor: Colors.tintGrey,
                  padding: 24,
                  borderRadius: 20,
                }}
              >
                <Image
                  source={{ uri: item.attributes.Icon.data.attributes.url }}
                  style={{ width: 26, height: 26 }}
                />
              </View>
              <Text
                style={{
                  fontFamily: "InterRegular",
                  color: Colors.text,
                  fontSize: 14,
                }}
              >
                {item.attributes.Name.length > 7
                  ? item.attributes.Name.substring(0, 7) + "..."
                  : item.attributes.Name}
              </Text>
            </TouchableOpacity>
          )
        }
      />
    </View>
  );
}
