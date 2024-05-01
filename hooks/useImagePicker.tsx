import { useState } from "react";
import * as ImagePicker from "expo-image-picker";

export const usePhotoPicker = () => {
  const [selectedImage, setSelectedImage] = useState<string | string[] | null>(
    null
  );

  const useImagePicker = async (useLibrary?: boolean, params?: any) => {
    try {
      let result;

      if (useLibrary) {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.75,
          ...params,
        });
      } else {
        await ImagePicker.requestCameraPermissionsAsync();

        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.75,
          ...params,
        });
      }

      if (!result.canceled) {
        if (params && params.allowsMultipleSelection) {
          const images: string[] = result.assets.map((asset: any) => asset.uri);
          setSelectedImage(images);
        } else {
          setSelectedImage(result.assets[0].uri);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { selectedImage, useImagePicker, setSelectedImage };
};
