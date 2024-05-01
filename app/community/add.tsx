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
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { Input } from "@/components/Common/TextInput";
import axios from "axios";
import { defaultStyles } from "@/constants/Styles";
import { Button } from "@/components/Common/Button";
import { Dropdown } from "@/components/Common/Dropdown";
import nationalities from "@/constants/nationalities";
import { Checkbox } from "@/components/Common/Checkbox";

interface CreatePostType {
  name: string;
  audience?: string;
  description?: string;
  availability: string;
}

const availabilities = [
  {
    label: "Public",
    value: "public",
  },
  {
    label: "Private",
    value: "private",
  },
];

function createTextStory() {
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

  useEffect(() => {
    (async () => {
      const userLoggedIn = await getStorage();

      setFieldValue("audience", userLoggedIn.category);
    })();
  }, []);

  useEffect(() => {
    setFieldValue("availability", availabilities[0].value);
  }, []);

  const formik = useFormik<CreatePostType>({
    initialValues: {
      name: "",
      audience: "",
      availability: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const userLoggedIn = await getStorage();

        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/community`,
          data: {
            name: values.name,
            audience: values.audience,
            description: values.description,
            category: values.availability,
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
    toast.show(`New community added successfully`);
    router.back();
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  if (category) {
    setFieldValue("audience", category);
  }

  return (
    <View style={[defaultStyles.container]}>
      <KeyboardAvoidingView behavior="padding">
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.input}>
            <Input
              label="Name"
              required
              placeholder="Enter name"
              value={values.name}
              onChange={(text: string) => setFieldValue("name", text)}
              error={errors.name}
              autoFocus
            />

            <Input
              label="Description"
              required
              placeholder="Enter description"
              value={values.description || ""}
              onChange={(text: string) => setFieldValue("description", text)}
              error={errors.description}
              multiline
            />

            <Dropdown
              onPress={() => router.push(`/nationality`)}
              label="Audience"
              placeholder="Select"
              value={
                categoryName ||
                nationalities.find(
                  (nationality) => nationality.value === values.audience
                )?.label ||
                ""
              }
              error={errors.audience}
            />
            {availabilities.map((type, index) => {
              return (
                <TouchableOpacity
                  onPress={() => setFieldValue("availability", type.value)}
                >
                  <Checkbox
                    title={type.label}
                    key={index}
                    checked={values.availability === type.value}
                  />
                </TouchableOpacity>
              );
            })}
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
