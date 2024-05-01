import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import PostItem from "./PostItem";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";

function Posts() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData(true);
  });

  const getData = async (refreshing: boolean) => {
    try {
      const options = {
        method: "GET",
        url: `${process.env.EXPO_PUBLIC_API}/post`,
      };

      const response = await axios(options);

      setData(response.data);

      setLoading(false);
    } catch (error) {}
  };
  return (
    <View style={[defaultStyles.container, styles.container]}>
      <PostItem />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
  },
});

export default Posts;
