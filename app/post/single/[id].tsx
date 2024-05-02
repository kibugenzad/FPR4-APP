import { ListItem } from "@/components/Common/List/ListItem";
import { Empty } from "@/components/Empty";
import { Loading } from "@/components/Loader/Loading";
import { defaultStyles } from "@/constants/Styles";
import { getStorage } from "@/util/common";
import axios from "axios";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import { Post } from "../ListItemType";
import CreateComment from "../comment/add";
import List from "../comment/list";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

function ViewPost() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const toast = useToast();
  const [data, setData] = useState<Post | null>(null);

  const [loading, setLoading] = useState(false);

  console.log("ID", id);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userLoggedIn = await getStorage();

      const options = {
        url: `${process.env.EXPO_PUBLIC_API}/post`,
        method: "GET",
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${userLoggedIn?.token}`,
        },
      };

      const data = await axios(options);

      setLoading(false);

      if (data.data.length > 0) {
        setData(data.data[0]);
      }
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        toast.show(error.response?.data?.error || "An error occurred");
      } else {
        toast.show("An error occurred");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={[defaultStyles.container, styles.container]}>
          {loading ? (
            <Loading />
          ) : data && Object.keys(data)?.length > 0 ? (
            <>
              <ListItem
                name={
                  data.owner
                    ? data.owner.firstName + " " + data.owner.lastName
                    : ""
                }
                userPhoto={
                  data.file && data.file.length > 0 && data.file[0] !== ""
                    ? { uri: data.file[0] }
                    : userPhotoPlaceholder
                }
                files={data.file}
                description={data.content}
                id={data._id}
                footerActions={[
                  {
                    text: "Likes",
                    type: "like",
                    icon: data.liked ? "heart" : "hearto",
                    liked: data.liked,
                    count: data.likes,
                  },
                  {
                    text: "Comments",
                    count: data.comments,
                    type: "comment",
                    icon: "message-square",
                  },
                  {
                    text: "Share",
                    type: "share",
                    icon: "share-2",
                  },
                ]}
              />
            </>
          ) : (
            <Empty message="No data available" />
          )}
        </View>
        <List post={id} />
      </ScrollView>
      <CreateComment post={id} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },

  imageContainer: {},
});

export default ViewPost;
