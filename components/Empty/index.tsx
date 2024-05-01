import Colors from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

interface EmptyProps {
  message?: string;
}

export const Empty: React.FC<EmptyProps> = ({ message }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: Colors.textColor }}>{message || "No data"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.bgColor,
  },
});
