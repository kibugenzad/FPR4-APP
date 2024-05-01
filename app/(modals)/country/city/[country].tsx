import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { Loading } from "@/components/Loader/Loading";
import Search from "@/components/Search";
import { defaultRadius } from "@/constants/Theme";
import { defaultStyles } from "@/constants/Styles";
import { MaterialIcons } from "@expo/vector-icons";

export default function Page() {
  const router = useRouter();
  const { country } = useLocalSearchParams();
  const [cities, setCity] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState();
  const toast = useToast();

  useEffect(() => {
    getCities(true);
  }, []);

  const getCities = (loading: boolean) => {
    const cityAPI = "https://countriesnow.space/api/v0.1/countries/cities";

    setLoading(loading);

    const options = {
      method: "POST",
      url: cityAPI,
      data: {
        country,
      },
    };

    axios(options)
      .then((data) => {
        setLoading(false);
        setCity(data.data.data);
      })
      .catch((error) => {
        console.error(error.response);
        setLoading(false);
        toast.show("unable to fetch cities");
      });
  };
  if (loading) {
    return <Loading />;
  }

  const renderSearch = () => {
    return (
      <Search data={cities} onSearch={(filtered: any) => setCity(filtered)} />
    );
  };

  const handlePress = (item: any) => {
    router.dismiss();

    router.setParams({
      city: item,
    });
  };

  return (
    <>
      {renderSearch()}
      <FlatList
        contentContainerStyle={defaultStyles.container}
        data={cities}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={defaultStyles.listItem}
            onPress={() => handlePress(item)}
          >
            <View style={styles.itemContent}>
              <Text style={[defaultStyles.listItemTitle, { flex: 1 }]}>
                {item}
              </Text>
              <View
                style={[
                  styles.checkboxContainer,
                  selected === item
                    ? { opacity: 1, backgroundColor: Colors.primaryColor }
                    : { opacity: 0.5 },
                ]}
              >
                <MaterialIcons
                  name="check"
                  color={Colors.light}
                  style={selected === item ? { opacity: 1 } : { opacity: 0.5 }}
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
