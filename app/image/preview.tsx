import { useEffect, useState } from "react";

import { Button } from "@/components/Common/Button";
import { ImageComponent } from "@/components/Image";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import * as ImagePicker from "expo-image-picker";
import { View, Text, StyleSheet, Platform } from "react-native";
import { getStorage } from "@/util/common";
import * as FileSystem from "expo-file-system";

const userImagePlaceholder = require("@/assets/images/userphotoplaceholder.png");

const imgDir = FileSystem.documentDirectory + "/fprImages";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};

export default function profile() {
  const [image, setImage] = useState(null);
  const [userLoggedIn, setUserInfo] = useState({});

  useEffect(() => {
    (async () => {
      const user = await getStorage();

      setUserInfo(user);
    })();
  });

  const selectImage = async (useLibrary?: boolean) => {
    try {
      // No permissions request is necessary for launching the image library
      let result;

      if (useLibrary) {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.75,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.75,
        });
      }

      console.log(result);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={styles.profileImageContainer}>
        {image && (
          <ImageComponent
            imageSrc={{ uri: image }}
            imageStyles={styles.profileImage}
            alt={userLoggedIn && userLoggedIn?.firstName}
          />
        )}
      </View>
      <Button
        text="Pick from library"
        backgroundColor={Colors.primaryColor}
        onPress={() => selectImage()}
      />
      <Button
        text="Capture Photo"
        backgroundColor={Colors.primaryColor}
        onPress={() => selectImage(true)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: Platform.OS === "ios" ? 20 : 0,
  },
  profileImageContainer: {
    flex: 1,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.light,
    justifyContent: "center",
    alignItems: "center",
  },
});
