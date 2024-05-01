import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Yup from "yup";

import { getStorage } from "@/util/common";
import { defaultRadius } from "@/constants/Theme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { Input } from "@/components/Common/TextInput";
import axios from "axios";
import { Button } from "@/components/Common/Button";

interface CreateCommentType {
  content: string;
}

function createComment({ post }: { post: string | string[] }) {
  const router = useRouter();
  const toast = useToast();
  const { category, categoryName } = useLocalSearchParams();

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

  const formik = useFormik<CreateCommentType>({
    initialValues: {
      content: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const userLoggedIn = await getStorage();

        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/comment`,
          data: {
            content: values.content,
            owner: userLoggedIn.id,
            post,
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
    toast.show(`New comment added successfully`);
    setFieldValue("content", "");
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  return (
    <>
      <View style={styles.input}>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Write something..."
            value={values.content}
            onChange={(text: string) => setFieldValue("content", text)}
            error={errors.content}
            autoFocus
            inputStyle={{
              marginBottom: 0,
            }}
          />
        </View>
        <Button
          backgroundColor={Colors.primaryColor}
          icon="send"
          borderRadius={defaultRadius.lg}
          loading={isSubmitting}
          onPress={handleSubmit}
          iconStyles={{ color: Colors.light }}
          buttonStyle={{ paddingHorizontal: 16 }}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 32,
    backgroundColor: Colors.bgColor,
  },
});

export default createComment;
