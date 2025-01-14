import { View, Text, BackHandler } from "react-native";
import { Colors } from "@/constants/Colors";
import { styles } from "@/constants/Styles";
import { Button } from "tamagui";
import { Bell } from "@tamagui/lucide-icons";

export default function Header() {
  return (
    <View
      style={{
        height: 90,
        justifyContent:"flex-end",
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
    
        <Text style={{ color:Colors.background,...styles.h1title }}>InstaMeds</Text>
        <Button
          backgroundColor={"#ffffff30"}
          icon={Bell}
          color={Colors.background}
          padding={10}
          scaleIcon={1.6}
          borderRadius={12}
          pressStyle={{backgroundColor:"#ffffff90"}}
        />
      </View>
    </View>
  );
}
