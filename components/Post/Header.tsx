import React from "react";

import { View, StyleSheet, Text } from "react-native";
import { ImageComponent } from "../Image";
import { defaultRadius } from "@/constants/Theme";
import Colors from "@/constants/Colors";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

function Header() {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <ImageComponent
            imageSrc={userPhotoPlaceholder}
            alt=""
            imageStyles={styles.userPhoto}
          />
          <View style={{ gap: 4 }}>
            <Text style={styles.userName}>Kibugenza Didier</Text>
            <Text style={styles.date}>{moment().format("lll")}</Text>
          </View>
        </View>
        <View style={styles.headerRightInfo}>
          <MaterialIcons color={Colors.textColor} name="more-horiz" size={24} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 45,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  headerRightInfo: {},

  userPhoto: {
    width: 50,
    height: 50,
    borderRadius: defaultRadius.lg,
    backgroundColor: Colors.bgColor80,
    justifyContent: "center",
    alignItems: "center",
  },

  userName: {
    color: Colors.textColor,
    fontFamily: "bold",
  },

  date: {
    color: Colors.textColor,
    opacity: 0.5,
  },
});

export default Header;
