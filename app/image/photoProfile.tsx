import { ImageComponent } from "@/components/Image";
import React, { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { widthPercentage } from "@/util/common";
import Colors from "@/constants/Colors";
import ModalComponent from "@/components/Common/Modal";
import { ListItem } from "@/components/Common/List/ListItem";
import { usePhotoPicker } from "@/hooks/useImagePicker";
import { photoUploader } from "@/util/handler/cloudnary";

const userImagePlaceholder = require("@/assets/images/userphotoplaceholder.png");

interface PhotoType {
  image: any;
}

function PhotoProfile({ image: defaultImage }: PhotoType) {
  const [isModalPhotoVisible, setIsPhotoModalVisible] = useState(false);
  const { selectedImage, useImagePicker, setSelectedImage } = usePhotoPicker();

  useEffect(() => {
    if (defaultImage && !selectedImage) {
      setSelectedImage(defaultImage);
    }
  }, [defaultImage]);

  useEffect(() => {
    if (selectedImage && isModalPhotoVisible) {
      setIsPhotoModalVisible(false);

      handleSaveImage(selectedImage);
    }
  }, [selectedImage, isModalPhotoVisible]);

  const actions = [
    {
      label: "Pick from library",
      value: "library",
      onPress: () => useImagePicker(true),
    },
    {
      label: "Take a photo",
      value: "camera",
      onPress: () => useImagePicker(),
    },
    {
      label: "Cancel",
      value: "cancel",
      color: Colors.dangerColor,
      onPress: () => setIsPhotoModalVisible(false),
    },
  ];

  console.log("selectedImage", selectedImage);

  const handleSaveImage = async (image: string) => {
    const result = await photoUploader(image);
    console.log("result", result);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.profileImage}
        onPress={() => setIsPhotoModalVisible(true)}
      >
        <ImageComponent
          imageSrc={
            selectedImage ? { uri: selectedImage } : userImagePlaceholder
          }
          imageStyles={styles.profileImageImage}
          alt="Profile"
        />

        <View style={styles.imagePlus}>
          <Feather name="plus" size={24} color={Colors.light} />
        </View>
      </TouchableOpacity>
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
});

export default PhotoProfile;
