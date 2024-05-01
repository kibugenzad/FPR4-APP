import Colors from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFormik } from "formik";
import Yup from "yup";

import { getStorage } from "@/util/common";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { defaultStyles } from "@/constants/Styles";
import { Button } from "@/components/Common/Button";

function JoinCommunity({ community }: { community: string | undefined }) {
  const toast = useToast();

  const [validationSchema, setValidationSchema] = useState<Yup.ObjectSchema<
    any,
    any,
    any,
    any
  > | null>(null);

  useEffect(() => {
    import("./join-validator").then((module) => {
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
          url: `${process.env.EXPO_PUBLIC_API}/community-member`,
          data: {
            community,
            user: userLoggedIn.id,
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
    toast.show(`Joined successfully`);
  };

  if (!community)
    return <Text style={{ color: Colors.textColor }}>Community Missing</Text>;

  return (
    <View>
      <Button
        backgroundColor={Colors.primaryColor}
        text="Join"
        buttonStyle={{ minHeight: 35 }}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

export default JoinCommunity;
