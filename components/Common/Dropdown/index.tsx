import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { widthPercentage } from "@/util/common";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import EvilIcons from "@expo/vector-icons/FontAwesome6";
import FieldError from "../Error/FieldError";

interface DropdownProps {
  placeholder?: string;
  value: string | string[];
  label?: string;
  required?: boolean;
  error?: string;
  selectStyle?: any;
  rightContent?: React.ReactNode;
  leftContent?: React.ReactNode;
  onPress?: (event: any) => void;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  label,
  required,
  error,
  rightContent,
  leftContent,
  placeholder,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ marginBottom: 16 }}>
        {label && (
          <View style={defaultStyles.labelContainer}>
            <Text style={{ color: Colors.textColor }}>{label}</Text>
            {required && <Text style={{ color: Colors.dangerColor }}>*</Text>}
          </View>
        )}
        <View
          style={[
            defaultStyles.input,
            styles.container,
            error ? { borderColor: Colors.dangerColor } : {},
          ]}
        >
          {leftContent && <View style={styles.leftContent}>{leftContent}</View>}
          <View
            style={[styles.inputContent, { flexDirection: "row", gap: 16 }]}
          >
            {value ? (
              <Text style={{ color: Colors.textColor, flex: 1 }}>{value}</Text>
            ) : (
              <Text style={{ color: Colors.textColor60, flex: 1 }}>
                {placeholder}
              </Text>
            )}
            <View>
              <EvilIcons name="chevron-down" color={Colors.textColor} />
            </View>
          </View>
          {rightContent && (
            <View style={styles.rightContainer}>{rightContent}</View>
          )}
        </View>
        <FieldError error={error} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
    minWidth: widthPercentage(24),
    paddingRight: 16,
  },

  inputContent: {
    flex: 1,
  },

  rightContainer: {
    paddingLeft: 16,
  },

  leftContent: { paddingRight: 16 },

  input: {
    color: Colors.textColor,
  },
});
