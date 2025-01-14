import { Tabs } from "expo-router";
import { TabBar } from "@/components/navigation/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{  headerShown: false }}
    
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="Explore"
        options={{
          title: "Explore",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="Appointment"
        options={{
          title: "Appointment",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? 'calendar' : 'calendar-outline'} color={color} />
          // ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          // tabBarIcon: ({ color, focused }) => (
          //   <TabBarIcon name={focused ? 'account' : 'account-outline'} color={color} />
          // ),
        }}
      />
    </Tabs>
  );
}
