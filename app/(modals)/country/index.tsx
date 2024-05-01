import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import listOfCountries from "@/constants/Countries";
import Search from "@/components/Search";
import { defaultStyles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";
import { defaultRadius } from "@/constants/Theme";

export default function Page() {
  const router = useRouter();
  const { address } = useLocalSearchParams<any>();
  const [countries, setCountries] = useState(listOfCountries);
  const [selected, setSelected] = useState<{ [key: string]: string }>({});

  const handlePress = (item: any) => {
    router.dismiss();

    router.setParams({
      countryName: item.name,
      countryDialCode: item.dial_code,
      address,
    });
  };

  const handleSearch = (filtered: any) => {
    setCountries(filtered);
  };

  const renderSearch = () => {
    return <Search data={listOfCountries} onSearch={handleSearch} />;
  };

  return (
    <>
      {renderSearch()}
      <FlatList
        contentContainerStyle={defaultStyles.container}
        data={countries}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={defaultStyles.listItem}
            onPress={() => handlePress(item)}
          >
            <View style={styles.itemContent}>
              <Text style={[defaultStyles.listItemTitle, { flex: 1 }]}>
                {item.name}
              </Text>
              <View
                style={[
                  styles.checkboxContainer,
                  selected.name === item.name
                    ? { opacity: 1, backgroundColor: Colors.primaryColor }
                    : { opacity: 0.5 },
                ]}
              >
                <MaterialIcons
                  name="check"
                  color={Colors.light}
                  style={
                    selected.name === item.name
                      ? { opacity: 1 }
                      : { opacity: 0.5 }
                  }
                />
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
  },

  checkboxContainer: {
    width: 30,
    height: 30,
    borderRadius: defaultRadius.lg,
    backgroundColor: Colors.bgColor80,
    justifyContent: "center",
    alignItems: "center",
  },

  itemContent: {
    flex: 1,
    flexDirection: "row",
  },
});
