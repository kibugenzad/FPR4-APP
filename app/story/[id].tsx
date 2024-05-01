import { Empty } from "@/components/Empty";
import { Loading } from "@/components/Loader/Loading";
import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { getStorage, widthPercentage } from "@/util/common";
import { addLightToColor } from "@/util/handler/colorHandler";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Yup from "yup";
import { useToast } from "react-native-toast-notifications";
import ReplyStory from "./reply";

function viewStory() {
  const { id } = useLocalSearchParams();
  const toast = useToast();

  const [validationSchema, setValidationSchema] = useState<Yup.ObjectSchema<
    any,
    any,
    any,
    any
  > | null>(null);

  useEffect(() => {
    import("./reply/validator").then((module) => {
      return setValidationSchema(module.default);
    });
  }, []);

  console.log("ID", id);

  const fetchData = async () => {
    const userLoggedIn = await getStorage();

    const options = {
      url: `${process.env.EXPO_PUBLIC_API}/story?_id=${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${userLoggedIn?.token}`,
      },
    };

    return await axios(options);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["singleStory"],
    queryFn: fetchData,
  });

  let story: { color?: string; file?: string; content?: string } = {};

  if (data?.data?.length > 0) {
    story = data?.data[0] || {};
  }

  const color = story?.color || Colors.bgColor;

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={defaultStyles.container}>
        <Stack.Screen
          options={{
            headerStyle: {
              backgroundColor: color,
            },
            headerShadowVisible: false,
          }}
        />
        {isLoading ? (
          <Loading />
        ) : data?.data?.length > 0 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={[
                styles.container,
                { backgroundColor: story?.color || Colors.bgColor },
              ]}
            >
              <View style={{ flex: 1 }}>
                {story?.file && story?.file?.length > 0 && (
                  <View style={styles.imageContainer}></View>
                )}
                {story.content && (
                  <View style={styles.contentContainer}>
                    <Text
                      style={[
                        styles.text,
                        { color: addLightToColor(color, 80) },
                      ]}
                    >
                      {story.content}
                    </Text>
                  </View>
                )}
              </View>
              <ReplyStory storyId={id} />
            </View>
          </ScrollView>
        ) : (
          <Empty message="No data available" />
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1,
  },

  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: widthPercentage(16),
  },

  text: {
    fontSize: 24,
  },
});

export default viewStory;
