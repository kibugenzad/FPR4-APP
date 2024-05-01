import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Input } from "../Common/TextInput";
import Colors from "@/constants/Colors";
import { AntDesign } from "@expo/vector-icons";

function Search(props: any) {
  const { data = [], onSearch } = props;
  const [search, setSearch] = useState("");

  const handleSearch = (text: string) => {
    setSearch(text);

    const filteredData = data.filter((el: any) =>
      JSON.stringify(el).toLowerCase().includes(text.toLowerCase())
    );

    onSearch(filteredData);
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <Input
          leftContent={
            <View>
              <AntDesign name="search1" color={Colors.textColor} />
            </View>
          }
          value={search}
          onChangeText={handleSearch}
          placeholder="Search..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    backgroundColor: Colors.bgColor,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
});

export default Search;
