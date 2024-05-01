import { defaultRadius } from "@/constants/Theme";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
} from "react-native";
import Colors from "@/constants/Colors";
import AddStory from "../../components/Story/AddStory";
import stories from "@/assets/dymmies/stories";
import { ImageComponent } from "../../components/Image";
import Story from "../../components/Common/Card/Story";
import { useQuery } from "@tanstack/react-query";
import { getStorage } from "@/util/common";
import axios from "axios";
import LoaderSkelleton from "@/components/Common/Card/Story/LoaderSkelleton";
import { Link } from "expo-router";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

function ListStory() {
  const fetchData = async () => {
    const userLoggedIn = await getStorage();

    const options = {
      url: `${process.env.EXPO_PUBLIC_API}/story`,
      method: "GET",
      params: {
        limit: 10,
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${userLoggedIn?.token}`,
      },
    };

    return await axios(options);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["stories"],
    queryFn: fetchData,
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={
          isLoading
            ? [
                { type: "add" },
                { type: "loading" },
                { type: "loading" },
                { type: "loading" },
                { type: "loading" },
              ]
            : data?.data?.data.length === 0
            ? [{ type: "add" }]
            : [{ type: "add" }, ...(data?.data?.data || [])]
        }
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => {
          return (
            <View
              style={{
                height: "100%",
                width: 10,
              }}
            />
          );
        }}
        renderItem={({ item }) => {
          if (item && item.type === "add") {
            return <AddStory />;
          }

          if (item && item.type === "loading") {
            return <LoaderSkelleton />;
          }

          return (
            <Link asChild href={`/story/${item._id}`}>
              <Story
                color={item.color}
                imageBgURL={
                  item?.file &&
                  item?.file?.length > 0 &&
                  item.file[0] && {
                    uri: item.content[0].url,
                  }
                }
                content={item.content}
                userImage={item?.owner?.file || userPhotoPlaceholder}
                footer={{ title: item.owner?.firstName }}
              />
            </Link>
          );
        }}
      />
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

export default ListStory;
