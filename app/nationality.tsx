import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { defaultStyles } from "@/constants/Styles";
import { defaultRadius } from "@/constants/Theme";
import { MaterialIcons } from "@expo/vector-icons";
import nationalities from "@/constants/nationalities";

export default function Page() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const handlePress = (item: any) => {
    setSelected(item.value);

    router.dismiss();

    router.setParams({
      category: item.value,
      categoryName: item.label,
    });
  };

  return (
    <>
      <FlatList
        contentContainerStyle={defaultStyles.container}
        data={nationalities}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={defaultStyles.listItem}
            onPress={() => handlePress(item)}
          >
            <View style={styles.itemContent}>
              <Text style={[defaultStyles.listItemTitle, { flex: 1 }]}>
                {item.label}
              </Text>
              <View
                style={[
                  styles.checkboxContainer,
                  selected === item.value
                    ? { opacity: 1, backgroundColor: Colors.primaryColor }
                    : { opacity: 0.5 },
                ]}
              >
                <MaterialIcons
                  name="check"
                  color={Colors.light}
                  style={
                    selected === item.value ? { opacity: 1 } : { opacity: 0.5 }
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
