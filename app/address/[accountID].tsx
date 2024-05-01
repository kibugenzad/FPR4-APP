import { defaultStyles } from "@/constants/Styles";
import { View, StyleSheet, KeyboardAvoidingView } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { getStorage, setStorage, widthPercentage } from "@/util/common";
import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";
import { Dropdown } from "@/components/Common/Dropdown";
import { useState } from "react";
import { Button } from "@/components/Common/Button";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";

export default function Page() {
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const {
    countryName = "Rwanda",
    province,
    village,
    sector,
    cell,
    city,
    district,
    category,
    accountID,
    categoryName,
  } = useLocalSearchParams();

  const validateForm = async () => {
    if (category === "citizen") {
      if (!province) {
        setError({ province: "Province is required" });
        return false;
      }
      if (!district) {
        setError({ district: "District is required" });
        return false;
      }
      if (!sector) {
        setError({ sector: "Sector is required" });
        return false;
      }
      if (!cell) {
        setError({ cell: "Cell is required" });
        return false;
      }
      if (!village) {
        setError({ village: "Village is required" });
        return false;
      }
    }
    if (!countryName || countryName === "") {
      setError((prev) => ({
        ...prev,
        country: "Country is required",
      }));
    } else {
      setError((prev) => ({
        ...prev,
        city: "City is required",
      }));
    }
  };

  const onsubmit = async () => {
    try {
      await validateForm();

      if (Object.keys(error).length > 0) return;

      setLoading(true);

      const address = {
        country: countryName,
        province: province,
        city: city || "unspecified",
        district: district,
        sector: sector,
        cell: cell,
        village: village,
      };

      const options = {
        method: "PUT",
        url: `${process.env.EXPO_PUBLIC_API}/account`,
        data: {
          id: accountID,
          address,
          category,
          registrationLevel: 2,
        },
      };

      await axios(options);

      onSuccess(address);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.show(error.response?.data?.error || "An error occurred");
      } else {
        toast.show("An error occurred");
      }
      setLoading(false);
    }
  };

  const onSuccess = async (updatedAddressInfo: any) => {
    const userLoggedIn = await getStorage();

    if (userLoggedIn) {
      userLoggedIn["address"] = updatedAddressInfo;
    }
    await setStorage(userLoggedIn);

    toast.show(`Account updated successfully`);

    setLoading(false);

    router.navigate(`(tabs)`);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View style={[defaultStyles.container, styles.container]}>
        <View style={styles.headerContainer}></View>
        <View style={styles.form}>
          <View style={styles.profileImageUpload}></View>
          <View style={[styles.row]}>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() => router.push(`/nationality`)}
                label="Are you a Rwandan?"
                placeholder="Select"
                value={categoryName}
                error={error.category}
              />
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() => router.push("/(modals)/country")}
                label="Country"
                placeholder="Select"
                value={countryName}
                error={error.country}
              />
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() => router.push("/(modals)/province")}
                label="Province"
                placeholder="Select"
                value={province}
                error={error.province}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() =>
                  router.push(`/(modals)/province/district/${province}`)
                }
                label="District"
                placeholder="Select"
                value={district}
                error={error.district}
              />
            </View>
          </View>
          <View style={[styles.row]}>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() =>
                  router.push(
                    `/(modals)/province/district/${province}/sector/${district}`
                  )
                }
                label="Sector"
                placeholder="Select"
                value={sector}
                error={error.sector}
              />
            </View>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() =>
                  router.push(
                    `/(modals)/province/district/${province}/sector/${district}/cell/${sector}`
                  )
                }
                label="Cell"
                placeholder="Select"
                value={cell}
                error={error.cell}
              />
            </View>
          </View>
          {category !== "citizen" && (
            <View style={[styles.row]}>
              <View style={{ flex: 1 }}>
                <Dropdown
                  onPress={() =>
                    router.push(`/(modals)/country/city/${countryName}`)
                  }
                  label="City"
                  placeholder="Select"
                  value={city}
                  error={error.city}
                />
              </View>
            </View>
          )}
          <View style={[styles.row]}>
            <View style={{ flex: 1 }}>
              <Dropdown
                onPress={() =>
                  router.push(
                    `/(modals)/province/district/${province}/sector/${district}/cell/${sector}/village/${cell}`
                  )
                }
                label="Village"
                placeholder="Select"
                value={village}
                error={error.village}
              />
            </View>
          </View>
          <Button
            backgroundColor={Colors.primaryColor}
            text="Submit"
            borderRadius={defaultRadius.lg}
            loading={loading}
            onPress={onsubmit}
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
    gap: 16,
  },

  profileImageUpload: {},
});
