import { defaultRadius } from "@/constants/Theme";
import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import Colors from "@/constants/Colors";
import { ImageComponent } from "../Image";
import { Link } from "expo-router";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

function AddStory() {
  return (
    <Link asChild href={"/story/createTextStory/"}>
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <ImageComponent
              imageSrc={userPhotoPlaceholder}
              imageStyles={styles.image}
              alt="User photo"
            />
          </View>
          <View style={styles.footer}>
            <View style={styles.actionContainer}>
              <View style={styles.iconContainer}>
                <Feather name="plus" style={styles.icon} />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.add}>Create Story</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 150,
    borderRadius: defaultRadius.md,
    position: "relative",
    backgroundColor: "white",
  },

  //   overlay: {
  //     position: "absolute",
  //     // top: 0,
  //     left: 0,
  //     right: 0,
  //     bottom: 0,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     borderRadius: defaultRadius.md,
  //     padding: 8,
  //   },

  image: {
    width: 100,
    height: 150,
    borderRadius: defaultRadius.md,
  },

  icon: {
    fontSize: 24,
    color: Colors.light,
  },

  textContainer: {
    // marginTop: 8,
  },

  add: {
    fontFamily: "bold",
    color: Colors.primaryColor,
    fontSize: 11,
  },

  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: defaultRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    borderWidth: 2,
    borderColor: "#f5f5f5",
    marginBottom: 8,
  },

  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
  },

  footer: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 8,
    backgroundColor: Colors.light,
    borderRadius: defaultRadius.sm,
    paddingBottom: 16,
    position: "relative",
    height: 60,
  },
});

export default AddStory;
