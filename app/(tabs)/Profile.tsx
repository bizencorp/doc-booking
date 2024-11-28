import { Colors } from "@/constants/Colors";
import GlobalApi from "@/constants/GlobalApi";
import { styles } from "@/constants/Styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Feather } from "@expo/vector-icons";
import {
  ArrowLeftRight,
  ChevronRight,
  Edit3,
  Heart,
  LogOut,
  ScrollText,
  Settings,
  Shapes,
  Siren,
  Users,
} from "@tamagui/lucide-icons";
import { router } from "expo-router";

import moment from "moment";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Dimensions,
} from "react-native";
import {
  AlertDialog,
  Button,
  ListItem,
  Separator,
  XStack,
  YGroup,
  YStack,
} from "tamagui";

const Profile = () => {
  const [userInfo, setUserInfo]: any = useState();

  const { signOut } = useAuth();
  const { isLoaded, isSignedIn, user } = useUser();
  if (!isLoaded || !isSignedIn) {
    return null;
  }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    GlobalApi.UserInfo(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        setUserInfo(resp.data.data);
      })
      .catch((error) => console.log(error));
  };

  const options = [
    { name: "Patients", url: "/", icon: <Users color={Colors.title} /> },
    { name: "Favourites", url: "/", icon: <Heart color={Colors.title} /> },
    {
      name: "Payment history",
      url: "/",
      icon: <ArrowLeftRight color={Colors.title} />,
    },
    {
      name: "Privacy policy",
      url: "/",
      icon: <ScrollText color={Colors.title} />,
    },
    {
      name: "Report a problem",
      url: "/",
      icon: <Siren color={Colors.title} />,
    },
    { name: "Refer a friend", url: `/`, icon: <Shapes color={Colors.title} /> },
  ];

  const cta = [
    { name: "Patients", url: "/", icon: <Users color={Colors.title} /> },
    { name: "Favourites", url: "/", icon: <Heart color={Colors.title} /> },
    {
      name: "Settings",
      url: "/",
      icon: <Settings color={Colors.title} />,
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={{ ...styles.pHeadwhite }}>
        <Text style={styles.h2title}>Profile</Text>
      </View>

      <ScrollView
        scrollEnabled
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 75 }}
      >
        {/* User Info */}
        {userInfo && (
          <View
            style={{
              marginTop: 90,
              alignItems: "center",
              padding: 20,
              flexDirection: "row",
              height: 120,
              gap: 8,
            }}
          >
            <Image
              source={{ uri: user?.imageUrl }}
              style={{
                width: 80,
                borderRadius: 50,
                aspectRatio: "1",
                borderColor: Colors.lighttint,
                borderWidth: 1,
              }}
            />

            <View
              style={{
                alignItems: "flex-start",
                gap: 3,
              }}
            >
              <Text style={{ color: Colors.title, ...styles.h4title }}>
                {userInfo[0]?.attributes?.fullname}
              </Text>
              <Text style={{ ...styles.p }}>
                {userInfo[0]?.attributes?.email}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: "/ProfileEdit",
                    params: { userInfo: JSON.stringify(userInfo) },
                  })
                }
                style={{
                  backgroundColor: Colors.tintGrey,
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: Colors.border,
                  flexDirection: "row",
                  gap: 6,
                  alignItems: "center",
                }}
              >
                <Edit3 size={16} color={Colors.text} />
                <Text style={styles.p}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* CTA */}
        <View
          style={{
            marginBottom: 20,
            paddingHorizontal: 20,
          }}
        >
          <FlatList
            data={cta}
            numColumns={3}
            columnWrapperStyle={{ justifyContent: "space-between", gap: 5 }}
            scrollEnabled={false}
            renderItem={({ item }: any) => (
              <TouchableOpacity
                onPress={() => router.navigate(item.url)}
                style={{
                  paddingVertical: 20,
                  alignItems: "center",
                  gap: 8,
                  backgroundColor: Colors.tintGrey,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: Colors.border,
                  width: Dimensions.get("screen").width * 0.28,
                }}
              >
                {item.icon}
                <Text
                  style={{ fontFamily: "InterRegular", color: Colors.title }}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* More Options */}
        <View style={{ paddingHorizontal: 20, marginBottom: 20, gap: 12 }}>
          <Text style={{ color: Colors.title, ...styles.h4title }}>
            More Options
          </Text>

          <FlatList
            data={options}
            scrollEnabled={false}
            contentContainerStyle={{
              borderRadius: 12,
              overflow: "hidden",
              borderWidth: 1,
              borderColor: Colors.border,
            }}
            renderItem={({ item }: any) => (
              <ListItem
                title={item.name}
                pressStyle={{ backgroundColor: Colors.border }}
                icon={item.icon}
                iconAfter={ChevronRight}
                color={Colors.title}
                scaleIcon={1.5}
                size={"$5"}
                backgroundColor={Colors.tintGrey}
                onPress={() => router.push(item.url)}
              />
            )}
          />
        </View>

        <AlertDialog>
          <View style={{ paddingHorizontal: 20 }}>
            <AlertDialog.Trigger asChild marginBottom="$5">
              <Button
                backgroundColor={"$colorTransparent"}
                size={"$5"}
                pressStyle={{
                  backgroundColor: Colors.tintGrey,
                  borderWidth: 0,
                }}
                icon={LogOut}
                scaleIcon={1.2}
                color={"$red10"}
              >
                Logout
              </Button>
            </AlertDialog.Trigger>
          </View>

          <AlertDialog.Portal>
            <AlertDialog.Overlay
              key="overlay"
              animation="quick"
              opacity={0.2}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <AlertDialog.Content
              width={"90%"}
              bordered
              borderRadius={"$6"}
              key="content"
              animation={[
                "quick",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              x={0}
              scale={1}
              opacity={1}
              y={0}
            >
              <YStack>
                <AlertDialog.Title>Logout</AlertDialog.Title>
                <AlertDialog.Description>
                  Are you sure, you really want to logout?
                </AlertDialog.Description>

                <XStack gap="$3" justifyContent="flex-end">
                  <AlertDialog.Cancel asChild width={"$8"}>
                    <Button borderRadius={"$5"}>No</Button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action
                    asChild
                    width={"$8"}
                    borderRadius={"$5"}
                    onPress={() => signOut()}
                  >
                    <Button theme="red">Yes</Button>
                  </AlertDialog.Action>
                </XStack>
              </YStack>
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog>
        
      </ScrollView>
    </View>
  );
};

export default Profile;
