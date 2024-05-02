import { defaultStyles } from "@/constants/Styles";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Yup from "yup";
import { useFormik } from "formik";

import { getStorage, setStorage, widthPercentage } from "@/util/common";
import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";
import { Input } from "@/components/Common/TextInput";
import { Dropdown } from "@/components/Common/Dropdown";
import { useState, useEffect } from "react";
import { Button } from "@/components/Common/Button";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import Countries from "@/constants/Countries";

interface RegisterType {
  firstName: string;
  email: string;
  lastName: string;
  phoneNumber: string;
}

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const { countryDialCode = "+250" } = useLocalSearchParams();

  const [dialCode, setDialCode] = useState(countryDialCode);

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
    setDialCode(countryDialCode);
  }, [countryDialCode]);

  useEffect(() => {
    async function getUserInfo() {
      const userInfo = await getStorage();

      setFieldValue("firstName", userInfo.firstName);
      setFieldValue("lastName", userInfo.lastName);
      setFieldValue("email", userInfo.email);

      const phoneNumber = userInfo.phoneNumber;

      if (phoneNumber) {
        const phone = splitPhone("+" + userInfo.phoneNumber);

        setDialCode(phone?.countryCode || "");
        setFieldValue("phoneNumber", phone?.number);
      }
    }

    getUserInfo();
  }, []);

  const splitPhone = (
    phoneNumber: string
  ): { countryCode: string; number: string } | undefined => {
    try {
      // Find the country based on the dial code
      const country = Countries.find((country) =>
        phoneNumber.startsWith(country.dial_code)
      );

      if (country) {
        // Extract the dial code length
        const dialCodeLength = country.dial_code.length;

        // Extract the country code
        const countryCode = phoneNumber.substring(0, dialCodeLength);

        // Extract the phone number without the dial code
        const phoneNumberWithoutDialCode =
          phoneNumber.substring(dialCodeLength);

        console.log("Country:", country.name);
        console.log("Country Code:", countryCode);
        console.log(
          "Phone Number without Dial Code:",
          phoneNumberWithoutDialCode
        );

        return {
          countryCode,
          number: phoneNumberWithoutDialCode,
        };
      } else {
        console.log("Country not found for the given dial code");
      }
    } catch (error) {
      console.log("====================================");
      console.log(error);
      console.log("====================================");
    }
  };

  const formik = useFormik<RegisterType>({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const options = {
          method: "PUT",
          url: `${process.env.EXPO_PUBLIC_API}/account`,
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            phoneNumber: dialCode + "" + values.phoneNumber,
            email: values.email,
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
    let user = await getStorage();

    user.firstName = response.firstName;
    user.lastName = response.lastName;
    user.email = response.email;
    user.phoneNumber = response.phoneNumber;

    await setStorage(user);

    toast.show("Account updated successfully");

    router.navigate("(tabs)");
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={[defaultStyles.container, styles.container]}>
        <View style={styles.headerContainer}></View>
        <View style={styles.form}>
          <Input
            value={values.firstName}
            label="First Name"
            placeholder="First Name"
            required
            onChange={(e) => setFieldValue("firstName", e)}
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.firstName}
          />
          <Input
            value={values.lastName}
            label="Last Name"
            required
            placeholder="Enter Last Name"
            onChange={(e) => setFieldValue("lastName", e)}
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.lastName}
          />
          <Input
            value={values.email}
            label="Email Address"
            required
            placeholder="Email Address"
            onChange={(e) => setFieldValue("email", e)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType=""
            email-address
            error={errors.email}
          />
          <View style={[styles.row, { gap: 16 }]}>
            <View>
              <Dropdown
                onPress={() => router.push("/(modals)/country")}
                label="Dial code"
                placeholder="+250"
                value={dialCode}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Input
                value={values.phoneNumber}
                label="Phone Number"
                placeholder="Your Phone Number"
                required
                onChange={(e) => setFieldValue("phoneNumber", e)}
                autoCapitalize="none"
                autoCorrect={false}
                error={errors.phoneNumber}
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <Button
            backgroundColor={Colors.primaryColor}
            text="Update"
            borderRadius={defaultRadius.lg}
            loading={isSubmitting}
            onPress={() => handleSubmit()}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(6),
    gap: 16,
  },

  headerContainer: {
    flex: 0.5,
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    paddingVertical: 16,
    gap: 16,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },
});
