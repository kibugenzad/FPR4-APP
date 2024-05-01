import { ImageComponent } from "@/components/Image";
import { defaultStyles } from "@/constants/Styles";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { Link } from "expo-router";

// import LogoImage from "@/assets/images/logo.png";
import { heightPercentage, widthPercentage } from "@/util/common";
import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";

export default function Page() {
  return (
    <View style={[defaultStyles.container, styles.container]}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          {/* <ImageComponent
              imageSrc={LogoImage}
              alt="Logo"
              imageStyles={styles.logoStyle}
            /> */}
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Link href={"/login/"} asChild>
          <TouchableOpacity>
            <View
              style={[
                defaultStyles.btn,
                {
                  backgroundColor: Colors.primaryColor,
                  borderRadius: defaultRadius.lg,
                  marginBottom: 16,
                },
              ]}
            >
              <Text style={[defaultStyles.btnText, { color: Colors.light }]}>
                Login
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
        <Link href={"/register/"} asChild>
          <TouchableOpacity>
            <View
              style={[
                defaultStyles.btn,
                {
                  borderRadius: defaultRadius.lg,
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: Colors.primaryColor,
                },
              ]}
            >
              <Text
                style={[defaultStyles.btnText, { color: Colors.primaryColor }]}
              >
                Join Community
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: widthPercentage(20),
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  logoContainer: {
    width: widthPercentage(40),
    height: heightPercentage(40),
  },

  logoStyle: {
    resizeMode: "contain",
  },

  footerContainer: {
    paddingVertical: heightPercentage(6),
  },
});
