import { View, Text, Image } from 'react-native'
import React from 'react'
import { Star, StarFull } from '@tamagui/lucide-icons';
import { Colors } from '@/constants/Colors';
import { styles } from '@/constants/Styles';

export default function Review({star}:any) {
    const url =
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611765.jpg?t=st=1731415129~exp=1731418729~hmac=f0c38061b0989b9787dc086bc63deeeecf9a0944a6cb1151d0fb0bcf8ac94211&w=740";



  return (
    <View style={{ paddingVertical: 10, gap: 5 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: url }} width={50} height={50} borderRadius={40} />

        <View style={{ flexDirection: "row" }}>
            {Array.from({length : star}).map((_, index) =>(
          <StarFull key={index} color={Colors.rating} size={22} />
            ))}
            {5 - star != 0 && Array.from({length : 5 - star}).map((_, index) =>(
                <Star key={index} color={Colors.rating} size={22} />
            ))}
          
        </View>
        
      </View>
      <Text style={{ color: Colors.text, ...styles.title }}>Sarah Wilson</Text>

      <Text style={{ ...styles.p }}>
        Dr. John provided outstanding care throughout my treatment. He explained
        everything in detail and made me feel comfortable with every step of the
        process. I couldn’t be more grateful for his expertise and compassion.
      </Text>
    </View>
  );
}