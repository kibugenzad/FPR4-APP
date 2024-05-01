import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { getStorage } from "@/util/common";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { ListItem } from "@/components/Common/List/ListItem";
import { defaultStyles } from "@/constants/Styles";
import { Loading } from "@/components/Loader/Loading";
import { Empty } from "@/components/Empty";
import { Comment } from "@/app/post/comment/ListItemType";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

function List({ post }: { post: string | string[] }) {
  const [data, setData] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userLoggedIn = await getStorage();

      const options = {
        url: `${process.env.EXPO_PUBLIC_API}/comment`,
        method: "GET",
        params: {
          limit: 10,
          page: 1,
          post,
          sortField: "createdAt",
          sortOrder: 1,
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

  const renderListItem = (item: Comment) => {
    return (
      <ListItem
        name={item.owner?.firstName + " " + item.owner?.lastName}
        description={item.content}
        photo={
          item.file && item.file.length > 0 && item.file[0] !== ""
            ? { uri: item.file[0] }
            : userPhotoPlaceholder
        }
        icon={item.icon}
        iconBackground={item.iconBackground}
      />
    );
  };

  return (
    <View style={[defaultStyles.container, styles.container]}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            scrollEnabled={false}
            data={data}
            ListEmptyComponent={<Empty message="No data available" />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: Comment }) => renderListItem(item)}
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
