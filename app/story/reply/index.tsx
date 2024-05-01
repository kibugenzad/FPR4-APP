import { Input } from "@/components/Common/TextInput";
import { getStorage } from "@/util/common";
import axios from "axios";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Yup from "yup";
import { useToast } from "react-native-toast-notifications";

interface CreateStoryReplyType {
  content: string;
}

function ReplyStory({ storyId }: { storyId: string | string[] }) {
  const toast = useToast();
  const router = useRouter();

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

  const formik = useFormik<CreateStoryReplyType>({
    initialValues: {
      content: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const userLoggedIn = await getStorage();

        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/chat`,
          data: {
            story: storyId,
            content: values.content,
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
    toast.show(`Story reply sent successfully`);
    router.back();
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  return (
    <View style={styles.container}>
      <Input
        placeholder="Write something..."
        value={values.content}
        onChange={(text: string) => setFieldValue("content", text)}
        error={errors.content}
        inputStyle={{
          marginBottom: 0,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default ReplyStory;
