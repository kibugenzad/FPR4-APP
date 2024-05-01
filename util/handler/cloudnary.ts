import { Cloudinary } from "@cloudinary/url-gen";
import { upload } from "cloudinary-react-native";

const configs = {
  CLOUD_NAME: "dwqhmch33",
  API_KEY: "762865677562485",
  API_SECRET: "F1k0tpJycyoc-InmbHghWtgVB5w",
};

const cld = new Cloudinary({
  cloud: {
    cloudName: configs.CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

const options = {
  upload_preset: "jom5r4k8",
  unsigned: true,
  folder: "fpr/v5",
};

export const photoUploader = async (file: any) => {
  return new Promise((resolve, reject) => {
    upload(cld, {
      file,
      options: options,
      callback: (error: any, response: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      },
    });
  });
};
