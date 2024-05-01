import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import React from "react";
import { View, StyleSheet, Text, TextInput } from "react-native";
import FieldError from "../Error/FieldError";

interface InputProps {
  placeholder?: string;
  label?: string;
  required?: boolean;
  inputStyle?: any;
  rightContent?: React.ReactNode;
  keyboardType?: string | "default";
  autoCapitalize?: string | "none";
  autoCorrect?: boolean | false;
  secureTextEntry?: boolean | false;
  leftContent?: React.ReactNode;
  error: string | undefined;
  value: string;
  onChange: (event: any) => void;
  autoFocus?: boolean | false;
  multiline?: boolean | false;
}

export const Input: React.FC<InputProps> = ({
  error,
  placeholder,
  required,
  label,
  keyboardType,
  leftContent,
  autoCapitalize,
  inputStyle,
  autoCorrect,
  secureTextEntry,
  rightContent,
  onChange,
  value,
  autoFocus,
  multiline,
}) => {
  return (
    <View>
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
        <View style={styles.inputContent}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={Colors.textColor60}
            style={[styles.input, inputStyle]}
            keyboardType={keyboardType as any}
            autoCapitalize={autoCapitalize as any}
            autoCorrect={autoCorrect}
            secureTextEntry={secureTextEntry}
            onChangeText={onChange}
            value={value}
            autoFocus={autoFocus}
            multiline
          />
        </View>
        {rightContent && (
          <View style={styles.rightContainer}>{rightContent}</View>
        )}
      </View>
      <FieldError error={error} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },

  inputContent: {
    flex: 1,
    minHeight: 50,
    justifyContent: "center",
  },

  rightContainer: {
    paddingLeft: 16,
  },

  leftContent: { paddingRight: 16 },

  input: {
    color: Colors.textColor,
  },
});
