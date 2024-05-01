import Colors from "./Colors";
import { StyleSheet } from "react-native";
import { defaultRadius } from "./Theme";

export const defaultStyles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    minHeight: 45,
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
  },
  btnText: {
    fontFamily: "bold",
  },

  input: {
    paddingHorizontal: 16,
    borderRadius: defaultRadius.sm,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.bgColor80,
  },

  labelContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },

  textMuted: {
    opacity: 0.5,
  },

  iconClose: {
    fontSize: 24,
  },

  listItem: {
    backgroundColor: Colors.bgColor,
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },

  listItemTitle: {
    fontFamily: "bold",
    color: Colors.textColor,
  },

  storyListItem: {
    width: 100,
    height: 150,
    borderRadius: defaultRadius.sm,
    position: "relative",
    backgroundColor: "white",
  },
});
