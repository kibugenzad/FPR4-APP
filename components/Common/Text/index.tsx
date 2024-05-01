import Colors from "@/constants/Colors";
import { defaultFontSize } from "@/constants/Theme";
import React from "react";
import { Text, StyleSheet } from "react-native";

interface TextProps {
  type?: string;
  variant?: string;
  style?: any;
  children: React.ReactNode;
}

export const TextCustom: React.FC<TextProps> = ({
  type,
  children,
  variant,
  style,
}) => {
  return (
    <Text
      style={[
        styles.text,
        style,
        type === "bold"
          ? { fontWeight: "900", fontFamily: "bold" }
          : { fontWeight: "normal" },
        variant === "title"
          ? { fontSize: defaultFontSize.md }
          : variant === "title-sm"
            ? { fontSize: defaultFontSize.sm }
            : variant === "title-md"
              ? { fontSize: defaultFontSize.md }
              : variant === "title-xl"
                ? { fontSize: defaultFontSize.xl }
                : variant === "title-xxl"
                  ? { fontSize: defaultFontSize.xxl }
                  : { fontSize: defaultFontSize.normal },
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.textColor,
  },
});
