import { useFormik } from "formik";
import Yup from "yup";
import { Button } from "@/components/Common/Button";
import { Input } from "@/components/Common/TextInput";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import { defaultStyles } from "@/constants/Styles";
import { TogglePassword } from "@/components/Common/Password/TogglePassword";
import { setStorage } from "@/util/common";

interface LoginType {
  username: string;
  password: string;
}

export default function LoginPage() {
  const toast = useToast();
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const formik = useFormik<LoginType>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema!,
    onSubmit: async (values) => {
      try {
        const options = {
          method: "POST",
          url: `${process.env.EXPO_PUBLIC_API}/authentication/account`,
          data: {
            email: values.username,
            password: values.password,
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

  return (
    <KeyboardAvoidingView behavior="padding" style={defaultStyles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.form}>
          <Input
            placeholder="Email Address"
            autoCapitalize="none"
            autoCorrect={false}
            label="Email Address"
            required
            value={values.username}
            onChange={(text: string) => setFieldValue("username", text)}
            error={errors.username}
          />

          <Input
            placeholder="Password"
            autoCapitalize="none"
            autoCorrect={false}
            label="Password"
            secureTextEntry={!passwordVisible}
            required
            error={errors.password}
            value={values.password}
            onChange={(text: string) => setFieldValue("password", text)}
            rightContent={
              <TogglePassword
                visible={passwordVisible}
                setPasswordVisible={setPasswordVisible}
              />
            }
          />

          <Button
            backgroundColor={Colors.primaryColor}
            text="Login"
            borderRadius={defaultRadius.lg}
            loading={isSubmitting}
            onPress={handleSubmit}
          />
          <Link href={"/register/"} asChild>
            <Button
              backgroundColor="transparent"
              text="Don't have an account? Register"
              borderRadius={defaultRadius.lg}
              buttonTextColor={Colors.primaryColor}
            />
          </Link>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  form: {
    width: "80%",
    gap: 16,
  },
});
