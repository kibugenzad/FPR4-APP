import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { getStorage } from "@/util/common";
import axios from "axios";
import { useRouter } from "expo-router";
import { ListItem } from "@/components/Common/List/ListItem";
import { defaultStyles } from "@/constants/Styles";
import { Loading } from "@/components/Loader/Loading";
import { Empty } from "@/components/Empty";
import { Post } from "./ListItemType";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

function List() {
  const router = useRouter();
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userLoggedIn = await getStorage();

      const options = {
        url: `${process.env.EXPO_PUBLIC_API}/post`,
        method: "GET",
        params: {
          limit: 10,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${userLoggedIn?.token}`,
        },
      };

      const data = await axios(options);

      setLoading(false);
      setData(data.data.data);

      return data;
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePress = (item: any) => {
    if (item.route) {
      return router.navigate(item.route);
    }

    router.navigate(`/post/single/${item._id}`);
  };

  const onRefresh = () => {
    setFetching(false);

    fetchData();
  };

  const renderListItem = (item: Post) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <ListItem
          name={
            item.owner ? item.owner.firstName + " " + item.owner.lastName : ""
          }
          userPhoto={userPhotoPlaceholder}
          files={item.file}
          description={item.content}
          id={item._id}
          footerActions={[
            {
              text: "Likes",
              count: item.likes,
              type: "like",
              icon: item.liked ? "heart" : "hearto",
              liked: item.liked,
            },
            {
              text: "Comments",
              count: item.comments,
              type: "comment",
              icon: "message-square",
              route: `/post/single/${item._id}`,
            },
            {
              text: "Share",
              type: "share",
              icon: "share-2",
            },
          ]}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            data={data}
            onRefresh={onRefresh}
            refreshing={isFetching}
            ListEmptyComponent={<Empty message="No data available" />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: Post }) => renderListItem(item)}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

export default List;
