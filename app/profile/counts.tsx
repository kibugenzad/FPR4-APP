import React, { useEffect, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { getStorage } from "@/util/common";
import axios from "axios";
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

interface AccountCountProps {
  type: string;
  id: string | string[];
}

function AccountCount({ type, id }: AccountCountProps) {
  const router = useRouter();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const userLoggedIn = await getStorage();

      const options = {
        url: `${process.env.EXPO_PUBLIC_API}/account`,
        method: "GET",
        params: {
          id,
        },
        headers: {
          Authorization: `Bearer ${userLoggedIn?.token}`,
        },
      };

      const data = await axios(options);

      setLoading(false);

      if (data.data.length > 0 && type) {
        setCount(data.data[0][type]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePress = (item: any) => {
    router.navigate(`/account/${type}/${item._id}`);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.textColor} />
      ) : (
        <TouchableOpacity onPress={handlePress} style={styles.itemContainer}>
          <Text style={styles.count}>{count}</Text>
          <Text style={styles.title}>{type}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  title: {
    color: Colors.textColor,
    textTransform: "capitalize",
  },
  count: {
    color: Colors.primaryColor,
    fontWeight: "bold",
    fontSize: 18,
  },

  itemContainer: {
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
});

export default AccountCount;
