import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import { useFormik } from "formik";
import Yup from "yup";

import { getStorage } from "@/util/common";
import { defaultRadius } from "@/constants/Theme";
import { useLocalSearchParams, useRouter, Stack } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { Input } from "@/components/Common/TextInput";
import axios from "axios";
import { defaultStyles } from "@/constants/Styles";
import { Button } from "@/components/Common/Button";
import { Loading } from "@/components/Loader/Loading";
import PostImage from "@/app/image/postImage";
import { photoUploader } from "@/util/handler/cloudnary";

interface CreatePostType {
  content: string;
  file?: string;
}

function createTextStory() {
  const router = useRouter();
  const toast = useToast();
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [images, setSelectedImage] = useState([]);
  const [communityInfo, setCommunityInfo] = useState<{ name: string }>({
    name: "Loading...",
  });

  const [validationSchema, setValidationSchema] = useState<Yup.ObjectSchema<
    any,
    any,
    any,
    any
  > | null>(null);

  useEffect(() => {
    import("./validator").then((module) => {
      return setValidationSchema(module.default);
    });
  }, []);

  useEffect(() => {
    fetchCommunitybById(id);
  }, []);

  const fetchCommunitybById = async (id: any) => {
    try {
      setLoading(true);
      const userLoggedIn = await getStorage();

      const options = {
        url: `${process.env.EXPO_PUBLIC_API}/community`,
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
      setCommunityInfo(data.data.length > 0 ? data.data[0] : {});

      return data;
    } catch (error) {
      setLoading(false);

      if (axios.isAxiosError(error)) {
        toast.show(error.response?.data?.error || "An error occurred");
      } else {
        toast.show("An error occurred");
      }
    }
  };

  const formik = useFormik<CreatePostType>({
    initialValues: {
      content: "",
      file: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const userLoggedIn = await getStorage();

        let files = [];

        if (images.length > 0) {
          for (let image of images) {
            const response: any = await photoUploader(image);
            console.log("Successfully uploaded photo:", response.url);
            files.push(response.url);
          }
        }

        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/post`,
          data: {
            community: id,
            content: values.content,
            file: files,
          },
          headers: {
            Authorization: `Bearer ${userLoggedIn?.token}`,
          },
        };

        const response = await axios(options);
        onSuccess(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.show(error.response?.data?.error || "An error occurred");
        } else {
          toast.show("An error occurred");
        }
      }
    },
  });

  const onSuccess = async (response: any) => {
    toast.show(`New post added successfully`);
    router.navigate("(tabs)");
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  return (
    <View style={[defaultStyles.container]}>
      {loading ? (
        <Loading />
      ) : (
        <Stack.Screen
          options={{
            title: `Post in ${communityInfo.name}`,
          }}
        />
      )}
      <KeyboardAvoidingView behavior="padding">
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.input}>
            <PostImage
              showAdd
              getImages={(images: any) => setSelectedImage(images)}
            />

            <Input
              label=""
              required
              placeholder="What's on your mind?"
              value={values.content}
              onChange={(text: string) => setFieldValue("content", text)}
              error={errors.content}
              autoFocus
              multiline
            />
            <Button
              backgroundColor={Colors.primaryColor}
              text="Submit"
              borderRadius={defaultRadius.lg}
              loading={isSubmitting}
              onPress={handleSubmit}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 16,
    gap: 16,
  },

  saveBtn: {
    paddingHorizontal: 16,
    borderRadius: defaultRadius.md,
    borderWidth: 1,
    padding: 8,
    borderColor: Colors.light,
    backgroundColor: "transparent",
  },
});

export default createTextStory;
