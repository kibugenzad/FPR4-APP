import { defaultStyles } from "@/constants/Styles";
import { View } from "react-native";
import ListStory from "@/app/story/lisStory";
import ListPost from "@/app/post/list";
import FloatButton from "@/components/Common/FloatButton";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  return (
    <View style={[defaultStyles.container, { gap: 32 }]}>
      <View style={{ padding: 16 }}>
        <ListStory />
      </View>
      <ListPost />
      <FloatButton
        icon="plus"
        onPress={() => router.navigate("/community/list")}
      />
    </View>
  );
}
