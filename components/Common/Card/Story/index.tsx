import { ImageComponent } from "@/components/Image";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { defaultRadius } from "@/constants/Theme";
import { addLightToColor } from "@/util/handler/colorHandler";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Story({
  userImage,
  color,
  imageBgURL,
  onPress,
  footer,
  content,
}: {
  userImage?: any;
  color?: string | undefined;
  imageBgURL?: any;
  onPress?: (item: any) => void;
  footer?: any;
  content?: string | undefined;
}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          defaultStyles.storyListItem,
          {
            backgroundColor: addLightToColor(color || Colors.bgColor, 30),
          },
        ]}
        onPress={onPress}
      >
        {imageBgURL && (
          <ImageComponent
            imageSrc={imageBgURL}
            imageStyles={styles.image}
            alt="User photo"
          />
        )}

        <View style={styles.overlay}>
          <View style={styles.storyHeader}>
            <View style={styles.userImageContainer}>
              {userImage && (
                <ImageComponent
                  imageSrc={userImage}
                  imageStyles={styles.userImage}
                  alt="User photo"
                />
              )}
            </View>
          </View>
          {content && (
            <View style={styles.textContent}>
              <Text style={styles.textContentText} numberOfLines={2}>
                {content}
              </Text>
            </View>
          )}
          {footer && (
            <View style={styles.storyFooter}>
              <Text
                style={{
                  fontFamily: "bold",
                  color: Colors.light,
                }}
                numberOfLines={1}
              >
                {footer.title}
              </Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  listItem: {
    width: 100,
    height: 150,
    borderRadius: defaultRadius.sm,
    position: "relative",
    backgroundColor: "white",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: defaultRadius.sm,
    padding: 8,
    zIndex: 10000,
  },

  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: defaultRadius.sm,
    zIndex: 100,
  },

  textContent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: defaultRadius.md,
    padding: 8,
  },

  textContentText: {
    color: Colors.light,
    opacity: 0.5,
  },

  storyHeader: {
    flex: 1,
  },

  storyFooter: {},

  userImage: {
    width: 28,
    height: 28,
    borderRadius: defaultRadius.lg,
  },

  userImageContainer: {
    width: 35,
    height: 35,
    borderRadius: defaultRadius.lg,
    padding: 4,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.primaryColor,
  },
});
