import Colors from "@/constants/Colors";
import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import PostCard from "../Common/Card/Post";

function PostItem() {
  return (
    <View style={styles.container}>
      <Header />
      <PostCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
  },
});

export default PostItem;
