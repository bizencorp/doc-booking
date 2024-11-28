import React from "react";
import * as WebBrowser from "expo-web-browser";
import { Dimensions, Text, TouchableOpacity } from "react-native";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
import {Colors} from "@/constants/Colors";
import {Button} from 'tamagui'

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } : any =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    // <TouchableOpacity
    //   onPress={onPress}
    //   style={{
    //     padding: 16,
    //     backgroundColor: Colors.tint,
    //     borderRadius: 12,
    //     alignItems: "center",
    //     marginTop: 20,
    //     width: Dimensions.get("screen").width * 0.8,
    //   }}
    // >
    //   <Text
    //     style={{ fontSize: 17, color: Colors.background, fontFamily: "Inter_Regular" }}
    //   >
    //     Login with Google
    //   </Text>
    // </TouchableOpacity>

    <Button
      onPress={onPress}
      theme={"blue"}
      alignSelf={"center"}
      width={Dimensions.get("screen").width * 0.9}
      size={"$6"}
      backgroundColor={Colors.tint}
      color={Colors.background}
      marginTop={10}
      fontFamily={"$body"}
      pressStyle={{backgroundColor:Colors.pressed}}
    >
      Login with Google
    </Button>
  );
};
export default SignInWithOAuth;
