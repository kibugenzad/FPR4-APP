import { ImageComponent } from "@/components/Image";
import { defaultStyles } from "@/constants/Styles";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { heightPercentage, widthPercentage } from "@/util/common";
import { Stack, useLocalSearchParams } from "expo-router";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import * as FileSystem from "expo-file-system";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { useToast } from "react-native-toast-notifications";

const menus = [{ label: "Download", value: "download" }];

export default function preview() {
  const { image } = useLocalSearchParams();
  const toast = useToast();

  const handleMenuSelection = (item: any) => {
    console.log(item);
    if (item.value === "download") {
      downloadFile(image);
    }
  };

  const downloadFile = async (url: string) => {
    const filename = url.split("/").pop(); // Extract filename from URL
    console.log(`Downloading ${filename}`);
    if (!filename) return;
    const fileUri = FileSystem.cacheDirectory + filename; // File path to save the image

    try {
      const downloadObject = FileSystem.createDownloadResumable(url, fileUri);
      const { uri } = await downloadObject.downloadAsync();
      toast.show("Image downloaded to:" + uri);
    } catch (error) {
      toast.show("Error downloading image:" + JSON.stringify(error));
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => {
            return (
              <>
                <Menu>
                  <MenuTrigger>
                    <Feather
                      name="more-vertical"
                      style={defaultStyles.iconClose}
                      color={Colors.textColor}
                    />
                  </MenuTrigger>
                  <MenuOptions>
                    {menus.map((item, index) => {
                      return (
                        <MenuOption
                          key={index}
                          onSelect={() => handleMenuSelection(item)}
                          text={item.label}
                        />
                      );
                    })}
                  </MenuOptions>
                </Menu>
              </>
            );
          },
        }}
      />
      <View style={[defaultStyles.container, styles.container]}>
        <ImageComponent
          imageSrc={
            image.includes("http") || image.includes("https")
              ? { uri: image }
              : image
          }
          imageStyles={styles.image}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: widthPercentage(100),
    height: heightPercentage(100),
  },
});
