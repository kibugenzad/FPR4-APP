import OptionCard from "@/components/Common/Card/Story/OptionCard";
import Gallery from "@/components/Gallery";
import Colors from "@/constants/Colors";
import Options from "@/constants/Stories/Options";
import { useImagePicker } from "@/hooks/useImagePicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Page() {
  const router = useRouter();
  const { image, onImagePicker } = useImagePicker();

  const handleOptionItemPress = async (item: any) => {
    if (item.type === "imagePicker") {
      await onImagePicker();

      console.log(image);
    } else {
      router.dismiss();
      router.push(item.route);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={Options}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: "100%",
                width: 16,
              }}
            />
          );
        }}
        renderItem={({ item }) => {
          return (
            <OptionCard {...item} onPress={() => handleOptionItemPress(item)} />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
    padding: 16,
  },
});
