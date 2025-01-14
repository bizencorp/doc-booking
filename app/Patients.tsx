import { View, Text, ScrollView, FlatList } from "react-native";
import React, { useState } from "react";
import PageHeader from "@/components/Shared/PageHeader";
import { styles } from "@/constants/Styles";
import { Colors } from "@/constants/Colors";
import { Plus, Trash2, UserPlus } from "@tamagui/lucide-icons";
import { X } from "@tamagui/lucide-icons";
import {
  AlertDialog,
  Button,
  Dialog,
  Fieldset,
  Input,
  Label,
  Unspaced,
  XStack,
  YStack,
} from "tamagui";
import { useLocalSearchParams } from "expo-router";

export default function Patients() {
  const params :any = useLocalSearchParams();
  const patients = JSON.parse(params?.patients)
  const [deleteItem, setDeleteItem] = useState()

  return (
    <View style={{ flex: 1 }}>
      <AlertDialog modal>
        <View style={styles.pHead}>
          <PageHeader title={"Patients"} rightBtn={"none"} />
        </View>
        <ScrollView
          style={{ backgroundColor: Colors.tintGrey, flex: 1, padding: 10 }}
        >
          <FlatList
            data={patients.data}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <View style={styles.patientCard}>
                <View
                  style={{
                    backgroundColor: Colors.tintGrey,
                    padding: 20,
                    borderRadius: 16,
                  }}
                >
                  <UserPlus size={28} color={Colors.text} />
                </View>
                <View style={{ justifyContent: "center" }}>
                  <Text style={{ color: Colors.title, ...styles.title }}>
                    {item.attributes.Name}
                  </Text>
                  <Text style={{ fontSize: 12, ...styles.p }}>
                    {item.attributes.Phone}
                  </Text>
                  <Text style={{ fontSize: 12, ...styles.p }}>
                    {item.attributes.Email}
                  </Text>
                </View>

                <AlertDialog.Trigger
                  asChild
                  marginBottom="$5"
                  position="absolute"
                  bottom={0}
                  right="$3"
                >
                  <Button
                    onPress={() => setDeleteItem(item.id)}
                    size="$2"
                    scale={1.6}
                    circular
                    icon={Trash2}
                    theme={"red"}
                  />
                </AlertDialog.Trigger>
              </View>
            )}
          />
        </ScrollView>

        <Dialog modal>
          <Dialog.Trigger asChild>
            <Button
              theme={"blue"}
              icon={Plus}
              scaleIcon={1.6}
              color={Colors.title}
              elevate
              style={{
                position: "absolute",
                bottom: 20,
                right: 20,
                alignSelf: "center",
                borderRadius: 16,
              }}
              size={"$5"}
            >
              Add Patient
            </Button>
          </Dialog.Trigger>

          <Dialog.Portal>
            <Dialog.Overlay
              key="overlay"
              animation="slow"
              opacity={0.5}
              enterStyle={{ opacity: 0 }}
              exitStyle={{ opacity: 0 }}
            />
            <Dialog.Content
              bordered
              elevate
              key="content"
              animateOnly={["transform", "opacity"]}
              animation={[
                "quicker",
                {
                  opacity: {
                    overshootClamping: true,
                  },
                },
              ]}
              enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
              exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
              gap="$3"
              borderRadius={"$6"}
            >
              <Dialog.Title>Add Patient</Dialog.Title>
              <Dialog.Description style={styles.p}>
                Fill out details of Patient. Click add when you're done.
              </Dialog.Description>
              <Fieldset gap="$4" horizontal>
                <Label width={100} justifyContent="flex-end" htmlFor="name">
                  Name
                </Label>
                <Input
                  textContentType={"name"}
                  flex={1}
                  id="name"
                  placeholder="Nate Wienert"
                />
              </Fieldset>
              <Fieldset gap="$4" horizontal>
                <Label width={100} justifyContent="flex-end" htmlFor="name">
                  Phone
                </Label>
                <Input
                  textContentType="telephoneNumber"
                  inputMode={"numeric"}
                  maxLength={10}
                  flex={1}
                  id="phone"
                  placeholder="9512494512"
                />
              </Fieldset>
              <Fieldset gap="$4" horizontal>
                <Label width={100} justifyContent="flex-end" htmlFor="name">
                  Email
                </Label>
                <Input
                  textContentType={"emailAddress"}
                  inputMode={"email"}
                  flex={1}
                  id="email"
                  placeholder="abc@gmail.com"
                />
              </Fieldset>

              <XStack alignSelf="flex-end" gap="$4">
                <Dialog.Close displayWhenAdapted asChild>
                  <Button
                    theme="blue_active"
                    borderRadius={"$5"}
                    aria-label="Close"
                  >
                    Add
                  </Button>
                </Dialog.Close>
              </XStack>

              <Unspaced>
                <Dialog.Close asChild>
                  <Button
                    position="absolute"
                    top="$3"
                    right="$3"
                    size="$3"
                    circular
                    icon={X}
                  />
                </Dialog.Close>
              </Unspaced>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>

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
            <YStack gap={"$2"}>
              <AlertDialog.Title>Delete Patient</AlertDialog.Title>
              <AlertDialog.Description>
                Are you sure, you really want to delete this patient's details?
              </AlertDialog.Description>

              <XStack gap="$3" justifyContent="flex-end">
                <AlertDialog.Cancel asChild width={"$10"}>
                  <Button borderRadius={"$5"}>Cancel</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action
                  asChild
                  width={"$10"}
                  borderRadius={"$5"}
                  onPress={() => console.log(deleteItem)}
                >
                  <Button theme="red">Delete</Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
    </View>
  );
}
