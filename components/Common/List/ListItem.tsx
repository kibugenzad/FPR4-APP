import { ImageComponent } from "@/components/Image";
import Colors from "@/constants/Colors";
import { defaultRadius } from "@/constants/Theme";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { FontAwesome6, Feather } from "@expo/vector-icons";
import JoinCommunity from "@/app/community/join";
import Like from "@/app/post/like/like";
import { Link } from "expo-router";

const userPhotoPlaceholder = require("@/assets/images/userphotoplaceholder.png");

interface FooterAction {
  text: string;
  icon: string;
  count?: number;
  type?: string;
  liked?: boolean;
  route?: any;
}

interface ListItemProps {
  name: string;
  description?: string;
  files?: string[];
  icon?: string | undefined;
  iconBackground?: string;
  nameColor?: string;
  joinCommunity?: boolean;
  community?: string;
  footerActions?: FooterAction[];
  id?: string;
  userPhoto?: string;
}

export const ListItem: React.FC<ListItemProps> = ({
  name,
  description,
  files,
  icon,
  iconBackground,
  nameColor,
  joinCommunity,
  community,
  footerActions,
  id,
  userPhoto,
}) => {
  const renderFooterIcon = (el: FooterAction, index: number) => {
    return (
      <TouchableOpacity key={index}>
        <View style={styles.footerActionItem}>
          {el.icon && (
            <View style={styles.iconContainer}>
              <Feather name={el.icon} style={styles.icon} />
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 8 }}>
            {el.count !== 0 && el.count && (
              <Text style={styles.footerActionText}>{el.count}</Text>
            )}
            <Text style={styles.footerActionText}>{el.text}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {icon ? (
        <View
          style={[styles.photoContainer, { backgroundColor: iconBackground }]}
        >
          <FontAwesome6 name={icon} style={styles.icon} />
        </View>
      ) : (
        userPhoto && (
          <ImageComponent
            imageSrc={userPhoto}
            alt={name}
            imageStyles={styles.photoContainer}
          />
        )
      )}

      <View style={{ flex: 1, justifyContent: "center" }}>
        {files && files.length > 0 && (
          <View>
            {files.map((photo, p) => {
              if (photo === "") return;
              return (
                <View key={p}>
                  {/* <ImageComponent
                    imageSrc={{ uri: photo }}
                    imageStyles={styles.imageItem}
                  /> */}
                </View>
              );
            })}
          </View>
        )}
        <View style={styles.nameContainer}>
          <Text style={[styles.name, nameColor ? { color: nameColor } : {}]}>
            {name}
          </Text>
        </View>
        <View>
          {description !== "" && description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>
        {footerActions && (
          <View style={styles.footerActionContainer}>
            {footerActions.map((el, index) => {
              if (el.type === "like")
                return (
                  <Like
                    key={index}
                    post={id}
                    count={el.count}
                    icon={el.liked ? "heart" : "hearto"}
                    liked={el.liked || false}
                  />
                );

              if (el.route) {
                return (
                  <Link asChild href={el.route}>
                    {renderFooterIcon(el, index)}
                  </Link>
                );
              }
              return renderFooterIcon(el, index);
            })}
          </View>
        )}
      </View>
      {joinCommunity && <JoinCommunity community={community} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginBottom: 32,
  },

  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    color: Colors.textColor,
  },

  photoContainer: {
    width: 40,
    height: 40,
    borderRadius: defaultRadius.lg,
    backgroundColor: Colors.bgColor80,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },

  icon: {
    color: Colors.light,
    fontSize: 20,
  },

  description: {
    color: Colors.textColor,
    opacity: 0.5,
    paddingVertical: 6,
  },

  footerActionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
  },

  footerActionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  iconContainer: {},

  footerActionText: {
    color: Colors.textColor,
  },
});
