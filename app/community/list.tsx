import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View, TouchableOpacity } from "react-native";
import { getStorage } from "@/util/common";
import axios from "axios";
import { Link, useRouter } from "expo-router";
import { ListItem } from "@/components/Common/List/ListItem";
import { defaultStyles } from "@/constants/Styles";
import { Loading } from "@/components/Loader/Loading";
import { Empty } from "@/components/Empty";
import Search from "@/components/Search";
import Colors from "@/constants/Colors";
import { useToast } from "react-native-toast-notifications";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

interface ListItemProps {
  _id: string;
  name: string;
  photo?: string | { uri: string };
  icon?: string;
  iconBackground?: string;
  nameColor?: string;
  file?: string;
  membership?: string;
  type?: string;
  route?: string;
}

function List() {
  const router = useRouter();
  const [data, setData] = useState<ListItemProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFetching, setFetching] = useState(false);
  const toast = useToast();

  const fetchData = async () => {
    try {
      setLoading(true);
      const userLoggedIn = await getStorage();

      const options = {
        url: `${process.env.EXPO_PUBLIC_API}/community`,
        method: "GET",
        params: {
          limit: 10,
          page: 1,
          audience: userLoggedIn.category,
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

  const handleSearch = (filtered: any) => {
    setData(filtered);
  };

  const renderSearch = () => {
    return <Search data={data} onSearch={handleSearch} />;
  };

  const handlePress = (item: any) => {
    if (item.route) {
      return router.navigate(item.route);
    }

    if (!item.membership)
      return toast.show(
        "To access this group, membership is required. Please join the group to proceed."
      );

    router.navigate(`/post/community/${item._id}`);
  };

  const onRefresh = () => {
    setFetching(false);

    fetchData();
  };

  const renderListItem = (item: ListItemProps) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item)}>
        <ListItem
          name={item.name}
          photo={item.file ? { uri: item.file } : userPhotoPlaceholder}
          icon={item.icon}
          iconBackground={item.iconBackground}
          nameColor={item.nameColor}
          joinCommunity={item.type !== "static" && !item.membership}
          community={item._id}
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
          {renderSearch()}
          <FlatList
            data={[
              {
                _id: new Date().getTime().toString(),
                icon: "plus",
                name: "Create Community",
                iconBackground: Colors.primaryColor,
                nameColor: Colors.primaryColor,
                route: "/community/add",
                type: "static",
              },
              ...data,
            ]}
            onRefresh={onRefresh}
            refreshing={isFetching}
            ListEmptyComponent={<Empty message="No data available" />}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }: { item: ListItemProps }) =>
              renderListItem(item)
            }
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
