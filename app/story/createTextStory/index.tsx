import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFormik } from "formik";
import Yup from "yup";

import { beautifulColors } from "@/constants/Colors";
import { getStorage } from "@/util/common";
import { defaultRadius } from "@/constants/Theme";
import { addLightToColor } from "@/util/handler/colorHandler";
import { Stack, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import { Input } from "@/components/Common/TextInput";
import axios from "axios";
import { defaultStyles } from "@/constants/Styles";
import { Button } from "@/components/Common/Button";

interface CreateStoryType {
  content: string;
  file?: string;
}

function createTextStory() {
  const router = useRouter();
  const [color, setColor] = useState(Colors.bgColor);
  const toast = useToast();

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

  const handleColorPress = (item: any) => {
    setColor(item);
  };

  const formik = useFormik<CreateStoryType>({
    initialValues: {
      content: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const userLoggedIn = await getStorage();

        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/story`,
          data: {
            content: values.content,
            color,
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
    toast.show(`New story added successfully`);
    router.back();
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  return (
    <View
      style={[
        defaultStyles.container,
        { backgroundColor: color, paddingBottom: 32 },
      ]}
    >
      <Stack.Screen
        options={{
          title: "Create story",
          headerStyle: {
            backgroundColor: color,
          },
          headerShadowVisible: false,
          headerRight: () => {
            return (
              <Button
                backgroundColor={Colors.primaryColor}
                text="Save"
                borderRadius={defaultRadius.lg}
                loading={isSubmitting}
                onPress={handleSubmit}
                buttonStyle={styles.saveBtn}
                buttonTextStyle={{
                  color: Colors.textColor,
                  fontFamily: "bold",
                }}
                loaderStyle={addLightToColor(color, 80)}
                disabled={values.content == ""}
              />
            );
          },
        }}
      />
      <KeyboardAvoidingView behavior="padding">
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.input}>
            <Input
              placeholder="Write something..."
              value={values.content}
              onChange={(text: string) => setFieldValue("content", text)}
              error={errors.content}
              inputStyle={{
                marginBottom: 0,
                borderColor: addLightToColor(color, 30),
              }}
              autoFocus
            />
          </View>
          <ScrollView horizontal keyboardShouldPersistTaps={"always"}>
            <View style={styles.colorsContainer}>
              {beautifulColors.map((item, i) => {
                return (
                  <TouchableOpacity
                    key={i}
                    style={[
                      styles.listItem,
                      {
                        backgroundColor: item,
                        borderColor: addLightToColor(color, 30),
                      },
                    ]}
                    onPress={() => handleColorPress(item)}
                  >
                    {color === item && (
                      <View>
                        <Ionicons
                          name="checkmark"
                          size={24}
                          color={addLightToColor(color, 80)}
                        />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
  },

  colorsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
    paddingHorizontal: 16,
    // paddingBottom: 16,
    minHeight: 50,
  },

  listItem: {
    width: 60,
    height: 60,
    borderRadius: defaultRadius.lg,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
  },

  input: {
    padding: 16,
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
