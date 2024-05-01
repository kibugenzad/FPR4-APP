import Colors from "@/constants/Colors";
import React from "react";
import { View, StyleSheet, Text } from "react-native";

function FieldError({ error }: { error: string | undefined }) {
  if (!error) return <></>;
  return (
    <View style={[styles.container, error ? { minHeight: 40 } : {}]}>
      <Text style={{ color: Colors.dangerColor }}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    minHeight: 40,
  },
});

export default FieldError;
