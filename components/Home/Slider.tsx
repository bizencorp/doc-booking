import { View, Image, FlatList, Dimensions } from "react-native";
import React, { useEffect, useState } from "react"; 
import GlobalApi from "@/constants/GlobalApi";

export default function Slider() {
  const [sliderList, setSliderList] = useState();
  
  // const SliderList = [
  //   {
  //     id: 1,
  //     name: "Slider 1",
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/gradient-hospital-template-design_23-2149635816.jpg?t=st=1710246723~exp=1710250323~hmac=a095963c3db7d3d56afc7d3eb895683dc5479cb3c68afd50ae3b41cdc292da74&w=1380",
  //   },
  //   {
  //     id: 2,
  //     name: "Slider 2",
  //     imageUrl:
  //       "https://img.freepik.com/free-vector/flat-design-healthcare-establishment-facebook-template_23-2149671669.jpg?t=st=1710302471~exp=1710306071~hmac=5cb180e92f12d352dc4a49e281aa8cb304630764aa4079ab68f378077e5f65f2&w=1380",
  //   },
  // ];

  useEffect(()=>{
    getSlider();
  },[])

  const getSlider=()=>{
    GlobalApi.getSlider().then(resp=>{
      setSliderList(resp.data.data);
    })
  }
  return (
    <View style={{ marginTop: 10 }}>
      <FlatList
        data={sliderList}
        horizontal={true}
        
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.attributes.ImageUrl.data.attributes.url }}
            style={{
              width: Dimensions.get("screen").width * 0.85,
              height: 190,
              borderRadius: 12,
              marginRight: 5,
              
            }}
          />
        )}
      />
    </View>
  );
}
