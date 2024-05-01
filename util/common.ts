import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width: wPercentage, height: hPercentage } = Dimensions.get("window");
const { EXPO_PUBLIC_APP_NAME = "FPR INKOTANYI" } = process.env;

export const widthPercentage = (value: number) => {
  const percentage = (value * wPercentage) / 100;

  return percentage;
};

export const heightPercentage = (value: number) => {
  const percentage = (value * hPercentage) / 100;

  return percentage;
};

export const setStorage = async (
  data: any,
  storageName: string = EXPO_PUBLIC_APP_NAME!
) => {
  console.log("storageName", storageName);
  await AsyncStorage.setItem(storageName, JSON.stringify(data));
};

export const getStorage = async (
  storageName: string = EXPO_PUBLIC_APP_NAME!
) => {
  const storedData = await AsyncStorage.getItem(storageName);
  const parsedData = storedData ? JSON.parse(storedData) : {};
  return parsedData;
};

export const clearStorage = async (): Promise<void> => {
  await AsyncStorage.clear();
};
