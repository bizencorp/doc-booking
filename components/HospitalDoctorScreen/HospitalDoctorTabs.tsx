import { View } from "react-native";
import { SizableText, Tabs, XStack } from "tamagui";

export default function HospitalDoctorTabs(props:{activeTab : any}) {

  return (
    <View style={{ marginTop: 10 }}>
      
      <XStack>
        <Tabs
          defaultValue="Hospital"
          orientation="horizontal"
          flexDirection="column"
          width={"100%"}
          borderRadius="$5"
          backgroundColor={"$gray1"}
          theme={"gray_alt1"}
          onValueChange={(value) => {
            props.activeTab(value);
          }}
        >
          <Tabs.List padding={"$2"}>
            <Tabs.Tab flex={1} value="Hospital" borderRadius={"$4"}>
              <SizableText fontFamily="$body" fontSize={16}>
                Hospitals
              </SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="Doctor" borderRadius={"$4"}>
              <SizableText fontFamily="$body" fontSize={16}>
                Doctors
              </SizableText>
            </Tabs.Tab>
            <Tabs.Tab flex={1} value="Nurse" borderRadius={"$4"}>
              <SizableText fontFamily="$body" fontSize={16}>
                Nurses
              </SizableText>
            </Tabs.Tab>
          </Tabs.List>
        </Tabs>
      </XStack>
    </View>
  );
}
