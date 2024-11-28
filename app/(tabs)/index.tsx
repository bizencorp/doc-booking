import { View, FlatList } from "react-native";
import Header from "@/components/Home/Header";
import SearchBar from "@/components/Home/SearchBar";
import Slider from "@/components/Home/Slider";
import Categories from "@/components/Home/Categories";
import Hospitals from "@/components/Home/Hospitals";
import { Colors } from "@/constants/Colors";
import DoctorNurseBtn from "@/components/Home/DoctorNurseBtn";
import { useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import GlobalApi from "@/constants/GlobalApi";
import moment from "moment";
import Doctors from "@/components/Home/Doctors";

export default function Home() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (isLoaded || isSignedIn) {
    const getUser = () => {
      GlobalApi.UserInfo(user?.primaryEmailAddress?.emailAddress)
    };
    useEffect(() => {
      getUser();
      if(!getUser){
        newUser()
      }
    }, [user?.primaryEmailAddress?.emailAddress]);

  }

  function newUser() {

    const data = {
      data: {
        fullname: user?.fullName,
        email: user?.primaryEmailAddress?.emailAddress,
        phone: user?.primaryPhoneNumber?.phoneNumber || "",
        patients: [],
        address: "",
        DOB: "2000-01-01",
      },
    };

    GlobalApi.makeUser(data).then().catch(function (error) {
      if (error.response) {
        console.log(
          "Server responded with status code:",
          error.response.status
        );
        console.log("Response data:", error.response.data);
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Error creating request:", error.message);
      }
    });
  }

  return (
    <View style={{ backgroundColor: Colors.background, paddingBottom: 75 }}>
      <FlatList
        data={[]}
        showsVerticalScrollIndicator={false}
        style={{}}
        // overScrollMode="never"
        renderItem={() => <></>}
        ListHeaderComponent={
          <>
            <Header />
            <SearchBar setSearchText={(value: any) => console.log(value)} />
            <Categories />
            <DoctorNurseBtn />
            {/* <Slider /> */}
            <Doctors/>
            <Hospitals />
          </>
        }
      />
    </View>
  );
}
