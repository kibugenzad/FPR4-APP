import Colors from "@/constants/Colors";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { defaultStyles } from "@/constants/Styles";

export default function Page() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primaryColor,
        tabBarLabelStyle: {
          fontFamily: "bold",
        },
        tabBarStyle: {
          backgroundColor: Colors.bgColor,
          borderTopWidth: 0,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerTitle: "FPR Inkotanyi",
          headerStyle: {
            backgroundColor: Colors.bgColor,
          },
          headerTitleAlign: "left",
          headerTitleStyle: {
            color: Colors.textColor,
          },
          tabBarLabel: "Home",
          headerShadowVisible: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
          headerRight: () => {
            return (
              <View
                style={{ paddingHorizontal: 16, flexDirection: "row", gap: 32 }}
              >
                <TouchableOpacity onPress={() => console.log("Image posts")}>
                  <Ionicons
                    name="camera-outline"
                    style={defaultStyles.iconClose}
                    color={Colors.textColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("search")}>
                  <Ionicons
                    name="search"
                    style={defaultStyles.iconClose}
                    color={Colors.textColor}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("more")}>
                  <Feather
                    name="more-vertical"
                    style={defaultStyles.iconClose}
                    color={Colors.textColor}
                  />
                </TouchableOpacity>
              </View>
            );
          },
        }}
      />
      <Tabs.Screen
        name="communities"
        options={{
          tabBarLabel: "Communities",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-group-outline"
              size={size}
              color={color}
            />
          ),
          headerTitle: "Communities",
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          tabBarLabel: "Chats",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chat-outline"
              size={size}
              color={color}
            />
          ),
          headerTitle: "Chats",
        }}
      />
      <Tabs.Screen
        name="profile/[id]"
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-outline"
              size={size}
              color={color}
            />
          ),
          headerTitle: "Profile",
        }}
      />
    </Tabs>
  );
}
