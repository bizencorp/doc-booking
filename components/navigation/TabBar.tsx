import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Colors } from "@/constants/Colors";
import { TabBarIcon } from "./TabBarIcon";
import { styles } from "@/constants/Styles";
import { CalendarDays, Compass, Home, User } from "@tamagui/lucide-icons";

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label: any =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icon: any = {
          index: (props: any) => (
            <Home {...props} />
          ),
          Explore: (props: any) => (
            <Compass
              {...props}
            />
          ),
          Appointment: (props: any) => (
            <CalendarDays
              {...props}
            />
          ),
          Profile: (props: any) => (
            <User
              {...props}
            />
          ),
        };

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarItem}
          >
            <View
              style={{
                backgroundColor: isFocused ? Colors.lighttint : "transparent",
                ...styles.iconBar,
              }}
            >
              {icon[route.name]({
                color: isFocused ? Colors.tint : Colors.text,
                size: 23,
              })}
            </View>

            <Text
              style={{
                color: isFocused ? Colors.title : Colors.text,
                fontSize: 12,
                fontFamily: isFocused ? "InterSemiBold" : "InterRegular",
              }}
            >
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
