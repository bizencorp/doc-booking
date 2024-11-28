import {
  View,
  Text,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import { Button } from "tamagui";
import { Globe, Mail, Map,  Phone, Share } from "@tamagui/lucide-icons";
import { router } from "expo-router";

const ActionButtons = () => {
  const actions = [
    { icon: Globe, name: "Website", url: "http://google.com" },
    { icon: Mail, name: "Email", url: "mailto:sa7@gmail.com" },
    { icon: Phone, name: "Phone", url: "tel:9990365860" },
    // {
    //   icon: Map,
    //   name: "Location",
    //   url: "https://maps.app.goo.gl/hTAkgqHGKQGsrt887",
    // },
    // { icon: Share, name: "Share", url: "http://google.com" },
  ];




  return (
    <View style={{ flexDirection: "row",justifyContent:"center", alignItems:"center" }}>
      <FlatList
        data={actions}
        scrollEnabled={false}
        horizontal
        style={{flexGrow:0, }}
        renderItem={({ item, index } : any) => 
          <View style={{ alignItems: "center", marginLeft:index == 0 ? 0 : 10 }}>
            <Button onPress={()=>router.navigate(item.url)} icon={item.icon} style={styles.IconBtn} color={Colors.tint} scaleIcon={1.8}/>
            <Text style={{ fontFamily: "InterRegular", color: Colors.text }}>
              {item.name}
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  IconBtn: {
    padding: 15,
    backgroundColor: Colors.background,
    borderRadius: 50,
  },
});

export default ActionButtons;
