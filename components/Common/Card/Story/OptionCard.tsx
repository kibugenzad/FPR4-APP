import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { defaultRadius } from "@/constants/Theme";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function OptionCard({
  onPress,
  color,
  symbol,
  title,
  iconColor,
}: {
  onPress?: (item: any) => void;
  color?: string;
  symbol?: string;
  title?: string;
  iconColor?: string;
}) {
  return (
    <View style={[defaultStyles.container, styles.container]}>
      <TouchableOpacity onPress={onPress}>
        <View style={[defaultStyles.storyListItem, { backgroundColor: color }]}>
          <View style={styles.itemContent}>
            <View
              style={[styles.symbolContainer, { backgroundColor: iconColor }]}
            >
              <Text style={styles.symbol}>{symbol}</Text>
            </View>
            <View>
              <Text style={styles.title}>{title}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  itemContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  symbol: {
    fontSize: 14,
    color: Colors.light,
  },

  title: {
    fontSize: 16,
    color: Colors.light,
  },

  symbolContainer: {
    width: 45,
    height: 45,
    borderRadius: defaultRadius.lg,
    backgroundColor: Colors.primaryColor60,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
});
