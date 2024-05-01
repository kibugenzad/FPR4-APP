import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { defaultRadius } from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

interface ButtonProps {
  text?: string;
  backgroundColor: string;
  borderRadius?: number;
  marginBottom?: number;
  loading?: boolean;
  onPress?: () => void;
  loaderColor?: string;
  buttonTextColor?: string;
  disabled?: boolean;
  buttonStyle?: any;
  buttonTextStyle?: any;
  loaderStyle?: any;
  icon?: any;
  iconStyles?: any;
}

export const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor,
  borderRadius = defaultRadius.xs,
  marginBottom = 0,
  onPress,
  loading,
  loaderColor,
  buttonTextColor,
  disabled,
  buttonStyle,
  buttonTextStyle,
  loaderStyle,
  icon,
  iconStyles,
}) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} disabled={loading || disabled}>
        <View
          style={[
            defaultStyles.btn,
            {
              backgroundColor,
              borderRadius,
              marginBottom,
            },
            (loading || disabled) && styles.loadingBtn,
            buttonStyle,
          ]}
        >
          {icon && !loading && (
            <View>
              <Ionicons name={icon} style={[styles.icon, iconStyles]} />
            </View>
          )}
          {text && !loading && (
            <Text
              style={[
                defaultStyles.btnText,
                { color: buttonTextColor || Colors.light },
                buttonTextStyle,
              ]}
            >
              {text}
            </Text>
          )}
          {loading && (
            <ActivityIndicator
              size={"small"}
              color={loaderColor}
              style={loaderStyle}
            />
          )}
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 50,
  },

  loadingBtn: {
    opacity: 0.5,
  },

  icon: {
    fontSize: 18,
  },
});
