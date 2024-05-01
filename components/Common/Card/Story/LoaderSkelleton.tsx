import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { defaultRadius } from "@/constants/Theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function LoaderSkelleton({}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={defaultStyles.storyListItem}>
        <View style={styles.overlay}>
          <View style={styles.storyHeader}>
            <View style={styles.userImageContainer}></View>
          </View>
          <View style={styles.storyFooter}></View>
          <View
            style={[styles.storyFooter, { marginTop: 8, marginRight: 32 }]}
          ></View>
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
    borderBottomRightRadius: defaultRadius.sm,
    borderBottomLeftRadius: defaultRadius.sm,
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

  storyHeader: {
    flex: 1,
  },

  storyFooter: {
    backgroundColor: Colors.grayLight,
    height: 10,
    borderRadius: defaultRadius.sm,
  },

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
