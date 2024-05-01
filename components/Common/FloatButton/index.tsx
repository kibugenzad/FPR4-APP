import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";

interface FButton {
  icon: string;
  iconType?: string;
  onPress: () => void;
}

function FloatButton({ icon = "plus", iconType, onPress }: FButton) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Entypo
        name={icon as any}
        style={styles.icon}
        color={Colors.textColor}
        size={24}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: defaultRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primaryColor,
    elevation: 5,
    position: "absolute",
    right: 16,
    bottom: 16,
  },

  icon: {
    fontSize: 24,
  },
});

export default FloatButton;
