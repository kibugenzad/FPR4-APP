import { TouchableOpacity, View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Colors from "@/constants/Colors";

export const TogglePassword = ({
  setPasswordVisible,
  visible = false,
}: {
  visible: boolean;
  setPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <TouchableOpacity onPress={() => setPasswordVisible(!visible)}>
      <View>
        <FontAwesome6
          name={visible ? "eye" : "eye-slash"}
          color={Colors.textColor}
        />
      </View>
    </TouchableOpacity>
  );
};
