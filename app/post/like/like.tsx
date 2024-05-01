import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFormik } from "formik";
import Yup from "yup";

import { getStorage } from "@/util/common";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import Colors from "@/constants/Colors";

function Like({
  post,
  count,
  icon,
  liked,
}: {
  post: string | undefined;
  count: number | undefined;
  icon: React.ComponentProps<typeof AntDesign>["name"];
  liked: boolean;
}) {
  const toast = useToast();

  const [validationSchema, setValidationSchema] = useState<Yup.ObjectSchema<
    any,
    any,
    any,
    any
  > | null>(null);

  useEffect(() => {
    import("./like-validator").then((module) => {
      return setValidationSchema(module.default);
    });
  }, []);

  const formik = useFormik({
    initialValues: {},
    onSubmit: async () => {
      try {
        const userLoggedIn = await getStorage();

        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/like-post`,
          data: {
            post,
            owner: userLoggedIn.id,
          },
          headers: {
            Authorization: `Bearer ${userLoggedIn?.token}`,
          },
        };

        await axios(options);
        onSuccess();
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.show(error.response?.data?.error || "An error occurred");
        } else {
          toast.show("An error occurred");
        }
      }
    },
  });

  const onSuccess = async () => {
    toast.show(`Liked successfully`);
  };

  if (!post) return <></>;

  return (
    <TouchableOpacity onPress={() => formik.handleSubmit()}>
      <View style={styles.footerActionItem}>
        {icon && (
          <View style={styles.iconContainer}>
            <AntDesign
              name={icon}
              style={[styles.icon, liked ? { color: Colors.primaryColor } : {}]}
            />
          </View>
        )}
        <View style={{ flexDirection: "row", gap: 8 }}>
          {count !== 0 && count && (
            <Text
              style={[
                styles.footerActionText,
                liked ? { color: Colors.primaryColor } : {},
              ]}
            >
              {count}
            </Text>
          )}
          <Text
            style={[
              styles.footerActionText,
              liked ? { color: Colors.primaryColor } : {},
            ]}
          >
            Likes
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  footerActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
  },

  footerActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconContainer: {},

  footerActionText: {
    color: Colors.textColor,
  },

  icon: {
    color: Colors.light,
    fontSize: 20,
  },
});

export default Like;
