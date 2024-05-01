import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { widthPercentage } from "@/util/common";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import FieldError from "../Error/FieldError";
import { defaultRadius } from "@/constants/Theme";

interface CheckboxProps {
  checked: boolean;
  title?: string;
  required?: boolean;
  error?: string;
  checkStyle?: any;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  title,
  error,
  checked,
}) => {
  return (
    <View style={{ marginBottom: 16 }}>
      <View style={styles.checkbox}>
        <View
          style={[
            styles.check,
            checked ? { backgroundColor: Colors.primaryColor } : {},
          ]}
        >
          <Feather name="check" color={Colors.light} />
        </View>
        <Text style={[styles.title, { color: Colors.textColor, flex: 1 }]}>
          {title}
        </Text>
      </View>
      <FieldError error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  checkbox: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  check: {
    width: 30,
    height: 30,
    borderRadius: defaultRadius.lg,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  title: {},
});
