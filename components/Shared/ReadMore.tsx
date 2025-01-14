import { Text } from "react-native";
import { useState } from "react";
import { Colors } from "@/constants/Colors";

export default function ReadMore({ data, length }: any) {
  const [readMore, setReadMore] = useState(true);

  return (
    <Text
    //   onPress={() => setReadMore(!readMore)}
      style={{
        fontFamily: "InterRegular",
        color: Colors.text,
        lineHeight: 20,
      }}
    >
      {data.length > length
        ? readMore
          ? data.substring(0, length) + "..."
          : data
        : data}{" "}
      {data.length > length && (
        <Text
          onPress={() => setReadMore(!readMore)}
          style={{
            fontFamily: "InterSemiBold",
            color: Colors.tint,
          }}
        >
          {readMore ? " read more" : " read less"}
        </Text>
      )}
    </Text>
  );
}
