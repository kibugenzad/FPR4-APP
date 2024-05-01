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

function viewStory() {
  const { id } = useLocalSearchParams();
  const toast = useToast();

  console.log("ID", id);

  const fetchData = async () => {
    const userLoggedIn = await getStorage();

    const options = {
      url: `${process.env.EXPO_PUBLIC_API}/post?_id=${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${userLoggedIn?.token}`,
      },
    };

    return await axios(options);
  };

  const { isLoading, data } = useQuery({
    queryKey: ["singlePost"],
    queryFn: fetchData,
  });

  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <View style={defaultStyles.container}>
        <Stack.Screen
          options={{
            headerShadowVisible: false,
          }}
        />
        {isLoading ? (
          <Loading />
        ) : data?.data?.length > 0 ? (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={[styles.container]}>
              <View style={{ flex: 1 }}></View>
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

  imageContainer: {},
});

export default viewStory;
