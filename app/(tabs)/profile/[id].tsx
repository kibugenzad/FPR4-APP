import { useEffect, useState } from "react";

import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { View, StyleSheet, Text, FlatList } from "react-native";
import { getStorage, widthPercentage } from "@/util/common";
import { UserType } from "@/util/handler/nextScreenBasedAuth";
import { defaultRadius } from "@/constants/Theme";
import PhotoProfile from "@/app/image/photoProfile";
import AccountCount from "@/app/profile/counts";
import { Link, useLocalSearchParams } from "expo-router";
import { Button } from "@/components/Common/Button";
import ListPost from "@/app/post/list";

export default function profile() {
  const [isRefreshing, setRefreshing] = useState(false);
  const [userLoggedIn, setUserInfo] = useState<UserType | null>(null);
  const { id } = useLocalSearchParams();

  useEffect(() => {
    (async () => {
      const user = await getStorage();

      setUserInfo(user);
    })();
  });

  if (!userLoggedIn?.token) return;

  const handleRefresh = () => {
    setRefreshing(true);
  };

  const doneRefreshing = () => {
    console.log("Refreshing done!");
    setRefreshing(false);
  };

  console.log("isrefreshing", isRefreshing);

  return (
    <FlatList
      data={[1]}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      keyExtractor={(item: any) => item.toString()}
      renderItem={({ item }) => {
        return (
          <View style={defaultStyles.container}>
            <View style={styles.header}>
              <PhotoProfile image={userLoggedIn.file} />
              <View style={styles.nameContainer}>
                <Text style={styles.name}>{userLoggedIn?.firstName}</Text>
                <Text style={styles.name}>{userLoggedIn?.lastName}</Text>
              </View>
              <View style={styles.countsContainer}>
                <AccountCount
                  type="following"
                  id={id}
                  isRefreshing={isRefreshing}
                />
                <AccountCount
                  type="follower"
                  id={id}
                  isRefreshing={isRefreshing}
                />
              </View>
              <View>
                <Link asChild href={`/profile/edit/${id}`}>
                  <Button
                    backgroundColor={Colors.grayLight}
                    text="Edit Profile"
                    buttonTextColor={Colors.dark}
                  />
                </Link>
              </View>
            </View>
            {id && (
              <View style={{ flex: 1 }}>
                <ListPost
                  scroll={false}
                  owner={id}
                  doneRefreshing={doneRefreshing}
                />
              </View>
            )}
          </View>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  profileImage: {
    width: widthPercentage(30),
    height: widthPercentage(30),
    borderRadius: widthPercentage(30),
    backgroundColor: Colors.light,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  profileImageImage: {
    width: widthPercentage(30),
    height: widthPercentage(30),
    borderRadius: widthPercentage(30),
  },

  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  name: {
    color: Colors.textColor,
  },

  imagePlus: {
    width: 30,
    height: 30,
    borderRadius: defaultRadius.lg,
    backgroundColor: Colors.primaryColor,
    justifyContent: "center",
    alignItems: "center",
    right: 0,
    bottom: 10,
    position: "absolute",
    borderWidth: 2,
    borderColor: Colors.light,
  },

  countsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
  },
});
