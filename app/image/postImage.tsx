import { ImageComponent } from "@/components/Image";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { widthPercentage } from "@/util/common";
import Colors from "@/constants/Colors";
import ModalComponent from "@/components/Common/Modal";
import { ListItem } from "@/components/Common/List/ListItem";
import { usePhotoPicker } from "@/hooks/useImagePicker";
import { photoUploader } from "@/util/handler/cloudnary";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { defaultRadius } from "@/constants/Theme";

interface PhotoType {
  image?: any;
  showAdd?: boolean;
  getImages?: any;
}

function PostImage({ image: defaultImage, showAdd, getImages }: PhotoType) {
  const [isModalPhotoVisible, setIsPhotoModalVisible] = useState(false);
  const { selectedImage, useImagePicker, setSelectedImage } = usePhotoPicker();
  const [images, setImages] = useState<string[]>([]);

  // useEffect(() => {
  //   if (defaultImage && !selectedImage) {
  //     setSelectedImage(defaultImage);
  //   }
  // }, [defaultImage]);

  useEffect(() => {
    if (selectedImage && isModalPhotoVisible) {
      setIsPhotoModalVisible(false);

      // handleSaveImage(selectedImage);

      const listImages = images.concat(selectedImage);

      setImages(listImages);

      getImages && getImages(images);
    }
  }, [selectedImage]);

  useEffect(() => {
    getImages && getImages(images);
  }, [images]);

  const actions = [
    {
      label: "Pick from library",
      value: "library",
      onPress: () =>
        useImagePicker(true, {
          allowsMultipleSelection: true,
          allowsEditing: false,
        }),
    },
    {
      label: "Take a photo",
      value: "camera",
      onPress: () =>
        useImagePicker(false, {
          allowsMultipleSelection: true,
          allowsEditing: false,
        }),
    },
    {
      label: "Cancel",
      value: "cancel",
      color: Colors.dangerColor,
      onPress: () => setIsPhotoModalVisible(false),
    },
  ];

  // console.log("selectedImage", images);

  const handleSaveImage = async (image: string) => {
    const result = await photoUploader(image);
    console.log("result", result);
  };

  return (
    <>
      <View style={styles.photoUploaderArea}>
        <ScrollView horizontal contentContainerStyle={{ gap: 16 }}>
          {showAdd && (
            <TouchableOpacity onPress={() => setIsPhotoModalVisible(true)}>
              <View style={styles.photoArea}>
                <MaterialCommunityIcons
                  name="camera-plus-outline"
                  size={24}
                  color={Colors.textColor}
                />
              </View>
            </TouchableOpacity>
          )}
          {images?.length > 0 &&
            images.map((image, index) => (
              <View key={index} style={styles.photoArea}>
                <ImageComponent
                  imageSrc={{ uri: image }}
                  imageStyles={styles.image}
                />
                <TouchableOpacity
                  onPress={() => {
                    images.splice(index, 1);
                    setImages([...images]);
                  }}
                >
                  <View style={styles.imagePlus}>
                    <Feather name="x" size={24} color={Colors.light} />
                  </View>
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>
      </View>
      <ModalComponent
        isVisible={isModalPhotoVisible}
        onClose={() => setIsPhotoModalVisible(false)}
      >
        <View style={styles.modalList}>
          {actions.map((action, index) => {
            return (
              <TouchableOpacity onPress={() => action.onPress()}>
                <ListItem
                  key={index}
                  name={action.label}
                  nameColor={action.color}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </ModalComponent>
    </>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: widthPercentage(30),
    height: widthPercentage(30),
    borderRadius: widthPercentage(30),
    backgroundColor: Colors.light,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  profileImageImage: {
    width: widthPercentage(30),
    height: widthPercentage(30),
    borderRadius: widthPercentage(30),
  },

  imagePlus: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    bottom: 10,
    borderWidth: 2,
    borderColor: Colors.light,
  },

  modalList: {
    paddingHorizontal: 16,
  },

  photoUploaderArea: {},

  photoArea: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: defaultRadius.md,
    borderWidth: 1,
    borderColor: Colors.bgColor80,
    backgroundColor: Colors.bgColor80,
  },

  imageContainer: {
    height: 80,
    width: 80,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: defaultRadius.md,
    borderWidth: 1,
    borderColor: Colors.bgColor80,
    backgroundColor: Colors.bgColor80,
  },

  image: {
    height: 80,
    width: 80,
    borderRadius: defaultRadius.md,
  },
});

export default PostImage;
