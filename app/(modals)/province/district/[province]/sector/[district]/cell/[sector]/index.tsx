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
import { Cells } from "rwanda";
import { defaultRadius } from "@/constants/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import Search from "@/components/Search";
import { defaultStyles } from "@/constants/Styles";
import { Empty } from "@/components/Empty";

export default function Page() {
  const router = useRouter();
  const { province, district, sector } = useLocalSearchParams<any>();
  const [selected, setSelected] = useState();
  const [data, setData] = useState(Cells(province, district, sector));

  const handlePress = (item: any) => {
    setSelected(item);
    router.dismiss();
    router.setParams({
      cell: item,
    });
  };

  const handleSearch = (filtered: any) => {
    setData(filtered);
  };

  const renderSearch = () => {
    return <Search data={data} onSearch={handleSearch} />;
  };

  if (!province || !district || !sector)
    return (
      <Empty message="Province or district or sector not found, go back and choose province and district and sector first and try again" />
    );

  return (
    <>
      {renderSearch()}
      <FlatList
        contentContainerStyle={defaultStyles.container}
        data={data}
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
