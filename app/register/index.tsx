import { defaultStyles } from "@/constants/Styles";
import { View, StyleSheet, KeyboardAvoidingView, Text } from "react-native";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import Yup from "yup";
import { useFormik } from "formik";

import { setStorage, widthPercentage } from "@/util/common";
import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";
import { Input } from "@/components/Common/TextInput";
import { Dropdown } from "@/components/Common/Dropdown";
import { useState, useEffect } from "react";
import { Button } from "@/components/Common/Button";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import { TogglePassword } from "@/components/Common/Password/TogglePassword";

interface RegisterType {
  firstName: string;
  password: string;
  email: string;
  lastName: string;
  phoneNumber: string;
}

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { countryDialCode = "+250" } = useLocalSearchParams();

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

  const formik = useFormik<RegisterType>({
    initialValues: {
      firstName: "",
      password: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/account`,
          data: {
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password,
            phoneNumber: countryDialCode + "" + values.phoneNumber,
            registrationLevel: 1,
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
    const user = response;

    await setStorage(user);

    toast.show(
      `Authentication successful, welcome to ${process.env.EXPO_PUBLIC_APP_NAME}`
    );
    router.navigate("(tabs)");
  };

  const { setFieldValue, errors, handleSubmit, isSubmitting, values } = formik;

  // const validateForm = async () => {
  //   if (!email || email === "") {
  //     setError((prev) => ({
  //       ...prev,
  //       email: "Email address is required",
  //     }));
  //   }

  //   if (!firstName || firstName === "") {
  //     setError((prev) => ({
  //       ...prev,
  //       firstName: "First name is required",
  //     }));
  //   }

  //   if (!lastName || lastName === "") {
  //     setError((prev) => ({
  //       ...prev,
  //       lastName: "Last name is required",
  //     }));
  //   }

  //   if (!phoneNumber || phoneNumber === "") {
  //     setError((prev) => ({
  //       ...prev,
  //       phoneNumber: "Phone number is required",
  //     }));
  //   }

  //   if (!password || password === "") {
  //     setError((prev) => ({
  //       ...prev,
  //       password: "Password is required",
  //     }));
  //   }

  //   if (!email || email === "") {
  //     setError((prev) => ({
  //       ...prev,
  //       email: "Email address is required",
  //     }));
  //   } else if (!email.includes("@") || !email.includes(".")) {
  //     setError((prev) => ({
  //       ...prev,
  //       email: "Invalid Email address",
  //     }));
  //   }
  // };

  // const onsubmit = async () => {
  //   try {
  //     await validateForm();

  //     if (Object.keys(error).length > 0) return;

  //     setLoading(true);

  //     const options = {
  //       method: "POST",
  //       url: `${process.env.EXPO_PUBLIC_API}/account`,
  //       data: {
  //         firstName,
  //         lastName,
  //         email,
  //         password,
  //         phoneNumber: countryDialCode + "" + phoneNumber,
  //         registrationLevel: 1,
  //       },
  //     };

  //     await axios(options);

  //     onLogin();
  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.show(error.response?.data?.error || "An error occurred");
  //     } else {
  //       toast.show("An error occurred");
  //     }
  //     setLoading(false);
  //   }
  // };

  const onLogin = async () => {
    try {
      setLoading(true);

      const options = {
        method: "POST",
        url: `${process.env.EXPO_PUBLIC_API}/authentication/account`,
        data: {
          email: values.email,
          password: values.password,
        },
      };

      const response = await axios(options);

      const user = response.data;

      setStorage(user);

      toast.show(
        `Authentication successful, welcome to ${process.env.EXPO_PUBLIC_APP_NAME}`
      );

      setLoading(false);

      router.navigate(`/address/${user.id}`);
    } catch (error) {}
  };

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
                value={countryDialCode}
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
          <Input
            value={values.password}
            label="Password"
            required
            placeholder="Enter Password"
            onChange={(e) => setFieldValue("password", e)}
            rightContent={
              <TogglePassword
                visible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
            }
            autoCapitalize="none"
            autoCorrect={false}
            error={errors.password}
            secureTextEntry={!passwordVisible}
          />
          <Button
            backgroundColor={Colors.primaryColor}
            text="Login"
            borderRadius={defaultRadius.lg}
            loading={loading}
            onPress={() => handleSubmit()}
          />
          <Link href={"/login/"} asChild>
            <Button
              backgroundColor="transparent"
              text="Already have an account? Login"
              borderRadius={defaultRadius.lg}
              buttonTextColor={Colors.primaryColor}
            />
          </Link>
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
